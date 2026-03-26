"""
CYBERSEC AI v4.0 - CVE Tracker
Tracks vulnerabilities via NVD (National Vulnerability Database)
and CISA KEV (Known Exploited Vulnerabilities) catalog.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any

import httpx
import structlog

logger = structlog.get_logger()


@dataclass
class CVEEntry:
    cve_id: str
    description: str
    cvss_score: float | None = None
    cvss_vector: str = ""
    severity: str = "UNKNOWN"
    cwe_id: str = ""
    published: datetime | None = None
    modified: datetime | None = None
    references: list[str] = field(default_factory=list)
    affected_products: list[str] = field(default_factory=list)
    is_kev: bool = False  # In CISA Known Exploited Vulnerabilities
    kev_due_date: str = ""
    exploit_available: bool = False


class CVETracker:
    """Tracks and enriches CVE data from NVD and CISA KEV.

    - NVD API 2.0: Comprehensive CVE details with CVSS scores
    - CISA KEV: Identifies actively exploited vulnerabilities
    """

    NVD_API_BASE = "https://services.nvd.nist.gov/rest/json/cves/2.0"
    CISA_KEV_URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"

    def __init__(self) -> None:
        self._client = httpx.AsyncClient(timeout=30.0)
        self._kev_cache: dict[str, dict] = {}
        self._kev_loaded = False

    async def close(self) -> None:
        await self._client.aclose()

    async def _load_kev_catalog(self) -> None:
        """Load the CISA KEV catalog for cross-referencing."""
        if self._kev_loaded:
            return

        try:
            resp = await self._client.get(self.CISA_KEV_URL)
            resp.raise_for_status()
            data = resp.json()

            for vuln in data.get("vulnerabilities", []):
                cve_id = vuln.get("cveID", "")
                if cve_id:
                    self._kev_cache[cve_id] = vuln

            self._kev_loaded = True
            logger.info("CISA KEV catalog loaded", count=len(self._kev_cache))
        except httpx.HTTPError as e:
            logger.error("Failed to load CISA KEV catalog", error=str(e))

    async def lookup_cve(self, cve_id: str) -> CVEEntry | None:
        """Look up a specific CVE by ID from NVD and enrich with KEV data."""
        await self._load_kev_catalog()

        try:
            resp = await self._client.get(
                self.NVD_API_BASE,
                params={"cveId": cve_id},
            )
            resp.raise_for_status()
            data = resp.json()

            vulnerabilities = data.get("vulnerabilities", [])
            if not vulnerabilities:
                return None

            cve_data = vulnerabilities[0].get("cve", {})
            return self._parse_nvd_entry(cve_data)
        except httpx.HTTPError as e:
            logger.error("NVD CVE lookup failed", cve_id=cve_id, error=str(e))
            return None

    async def search_recent_cves(
        self,
        keyword: str | None = None,
        days: int = 7,
        severity: str | None = None,
        limit: int = 20,
    ) -> list[CVEEntry]:
        """Search for recent CVEs with optional filters."""
        await self._load_kev_catalog()

        params: dict[str, Any] = {"resultsPerPage": limit}
        if keyword:
            params["keywordSearch"] = keyword
        if severity:
            params["cvssV3Severity"] = severity.upper()

        try:
            resp = await self._client.get(self.NVD_API_BASE, params=params)
            resp.raise_for_status()
            data = resp.json()

            entries = []
            for vuln in data.get("vulnerabilities", []):
                cve_data = vuln.get("cve", {})
                entry = self._parse_nvd_entry(cve_data)
                if entry:
                    entries.append(entry)

            return entries
        except httpx.HTTPError as e:
            logger.error("NVD search failed", error=str(e))
            return []

    async def get_kev_entries(self, limit: int = 20) -> list[CVEEntry]:
        """Get the most recent CISA KEV entries (actively exploited vulns)."""
        await self._load_kev_catalog()

        entries = []
        kev_list = sorted(
            self._kev_cache.values(),
            key=lambda x: x.get("dateAdded", ""),
            reverse=True,
        )

        for kev in kev_list[:limit]:
            entries.append(
                CVEEntry(
                    cve_id=kev.get("cveID", ""),
                    description=kev.get("shortDescription", ""),
                    severity="CRITICAL",
                    is_kev=True,
                    kev_due_date=kev.get("dueDate", ""),
                    affected_products=[
                        f"{kev.get('vendorProject', '')} {kev.get('product', '')}"
                    ],
                )
            )

        return entries

    def _parse_nvd_entry(self, cve_data: dict) -> CVEEntry | None:
        """Parse a raw NVD CVE entry into a CVEEntry dataclass."""
        cve_id = cve_data.get("id", "")
        if not cve_id:
            return None

        # Description
        descriptions = cve_data.get("descriptions", [])
        description = ""
        for desc in descriptions:
            if desc.get("lang") == "en":
                description = desc.get("value", "")
                break

        # CVSS score
        metrics = cve_data.get("metrics", {})
        cvss_score = None
        cvss_vector = ""
        severity = "UNKNOWN"

        for version_key in ("cvssMetricV31", "cvssMetricV30", "cvssMetricV2"):
            metric_list = metrics.get(version_key, [])
            if metric_list:
                cvss_data = metric_list[0].get("cvssData", {})
                cvss_score = cvss_data.get("baseScore")
                cvss_vector = cvss_data.get("vectorString", "")
                severity = cvss_data.get("baseSeverity", "UNKNOWN")
                break

        # CWE
        weaknesses = cve_data.get("weaknesses", [])
        cwe_id = ""
        if weaknesses:
            cwe_descriptions = weaknesses[0].get("description", [])
            if cwe_descriptions:
                cwe_id = cwe_descriptions[0].get("value", "")

        # References
        refs = [
            r.get("url", "")
            for r in cve_data.get("references", [])
            if r.get("url")
        ]

        # KEV enrichment
        is_kev = cve_id in self._kev_cache
        kev_due_date = ""
        if is_kev:
            kev_due_date = self._kev_cache[cve_id].get("dueDate", "")

        return CVEEntry(
            cve_id=cve_id,
            description=description,
            cvss_score=cvss_score,
            cvss_vector=cvss_vector,
            severity=severity,
            cwe_id=cwe_id,
            references=refs[:5],
            is_kev=is_kev,
            kev_due_date=kev_due_date,
        )

    def format_cve_summary(self, cve: CVEEntry) -> str:
        """Format a CVE entry into a human-readable summary for AI context."""
        lines = [
            f"CVE: {cve.cve_id}",
            f"Severity: {cve.severity} (CVSS: {cve.cvss_score or 'N/A'})",
        ]

        if cve.is_kev:
            lines.append("CISA KEV: YES - Actively exploited in the wild")
            if cve.kev_due_date:
                lines.append(f"  Remediation due: {cve.kev_due_date}")

        lines.append(f"Description: {cve.description[:300]}")

        if cve.cwe_id:
            lines.append(f"Weakness: {cve.cwe_id}")
        if cve.cvss_vector:
            lines.append(f"CVSS Vector: {cve.cvss_vector}")

        return "\n".join(lines)
