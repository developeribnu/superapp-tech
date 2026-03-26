"""
CYBERSEC AI v4.0 - Threat Feed Aggregator
Aggregates threat intelligence from multiple open-source feeds including
OTX (AlienVault), abuse.ch, and community threat feeds.
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum
from typing import Any

import httpx
import structlog

from config.settings import settings

logger = structlog.get_logger()


class ThreatSeverity(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"


@dataclass
class ThreatIndicator:
    indicator_type: str  # ip, domain, url, hash, cve
    value: str
    source: str
    severity: ThreatSeverity
    description: str = ""
    tags: list[str] = field(default_factory=list)
    first_seen: datetime | None = None
    last_seen: datetime | None = None
    metadata: dict[str, Any] = field(default_factory=dict)


class ThreatFeedAggregator:
    """Aggregates IOCs and threat data from multiple open-source feeds.

    Supported sources:
    - OTX (AlienVault Open Threat Exchange) - 180K+ contributors
    - abuse.ch URLhaus - malicious URL tracking
    - abuse.ch ThreatFox - IOC sharing
    """

    OTX_BASE_URL = "https://otx.alienvault.com/api/v1"
    URLHAUS_API = "https://urlhaus-api.abuse.ch/v1"
    THREATFOX_API = "https://threatfox-api.abuse.ch/api/v1"

    def __init__(self) -> None:
        self._client = httpx.AsyncClient(timeout=30.0)
        self._otx_key = settings.otx_api_key

    async def close(self) -> None:
        await self._client.aclose()

    async def get_otx_pulses(self, limit: int = 10) -> list[dict[str, Any]]:
        """Fetch latest threat pulses from OTX."""
        if not self._otx_key:
            logger.warning("OTX API key not configured, skipping OTX feed")
            return []

        try:
            resp = await self._client.get(
                f"{self.OTX_BASE_URL}/pulses/subscribed",
                headers={"X-OTX-API-KEY": self._otx_key},
                params={"limit": limit, "modified_since": ""},
            )
            resp.raise_for_status()
            data = resp.json()
            return data.get("results", [])
        except httpx.HTTPError as e:
            logger.error("OTX feed fetch failed", error=str(e))
            return []

    async def search_otx_indicator(
        self, indicator_type: str, indicator: str
    ) -> dict[str, Any]:
        """Search OTX for a specific indicator (IP, domain, hash, URL)."""
        if not self._otx_key:
            return {"error": "OTX API key not configured"}

        type_map = {
            "ip": f"indicators/IPv4/{indicator}/general",
            "domain": f"indicators/domain/{indicator}/general",
            "hash": f"indicators/file/{indicator}/general",
            "url": f"indicators/url/{indicator}/general",
        }

        endpoint = type_map.get(indicator_type)
        if not endpoint:
            return {"error": f"Unknown indicator type: {indicator_type}"}

        try:
            resp = await self._client.get(
                f"{self.OTX_BASE_URL}/{endpoint}",
                headers={"X-OTX-API-KEY": self._otx_key},
            )
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPError as e:
            logger.error("OTX indicator search failed", error=str(e))
            return {"error": str(e)}

    async def get_urlhaus_recent(self, limit: int = 25) -> list[ThreatIndicator]:
        """Fetch recent malicious URLs from URLhaus."""
        try:
            resp = await self._client.post(
                f"{self.URLHAUS_API}/urls/recent/",
                data={"limit": limit},
            )
            resp.raise_for_status()
            data = resp.json()

            indicators = []
            for entry in data.get("urls", []):
                indicators.append(
                    ThreatIndicator(
                        indicator_type="url",
                        value=entry.get("url", ""),
                        source="URLhaus",
                        severity=ThreatSeverity.HIGH,
                        description=entry.get("threat", "Malicious URL"),
                        tags=entry.get("tags", []) or [],
                        first_seen=_parse_datetime(entry.get("date_added")),
                        metadata={
                            "url_status": entry.get("url_status"),
                            "reporter": entry.get("reporter"),
                        },
                    )
                )
            return indicators
        except httpx.HTTPError as e:
            logger.error("URLhaus fetch failed", error=str(e))
            return []

    async def get_threatfox_recent(self, days: int = 1) -> list[ThreatIndicator]:
        """Fetch recent IOCs from ThreatFox."""
        try:
            resp = await self._client.post(
                self.THREATFOX_API,
                json={"query": "get_iocs", "days": days},
            )
            resp.raise_for_status()
            data = resp.json()

            indicators = []
            for entry in data.get("data", []):
                severity = _map_confidence_to_severity(
                    entry.get("confidence_level", 50)
                )
                indicators.append(
                    ThreatIndicator(
                        indicator_type=entry.get("ioc_type", "unknown"),
                        value=entry.get("ioc", ""),
                        source="ThreatFox",
                        severity=severity,
                        description=entry.get("threat_type_desc", ""),
                        tags=entry.get("tags", []) or [],
                        first_seen=_parse_datetime(entry.get("first_seen_utc")),
                        last_seen=_parse_datetime(entry.get("last_seen_utc")),
                        metadata={
                            "malware": entry.get("malware"),
                            "malware_printable": entry.get("malware_printable"),
                            "confidence": entry.get("confidence_level"),
                        },
                    )
                )
            return indicators
        except httpx.HTTPError as e:
            logger.error("ThreatFox fetch failed", error=str(e))
            return []

    async def aggregate_all(self) -> dict[str, list[ThreatIndicator]]:
        """Fetch from all feeds concurrently and return aggregated results."""
        urlhaus_task = self.get_urlhaus_recent()
        threatfox_task = self.get_threatfox_recent()

        urlhaus_results, threatfox_results = await asyncio.gather(
            urlhaus_task, threatfox_task, return_exceptions=True
        )

        return {
            "urlhaus": urlhaus_results if isinstance(urlhaus_results, list) else [],
            "threatfox": threatfox_results if isinstance(threatfox_results, list) else [],
        }

    def format_indicators_summary(
        self, indicators: list[ThreatIndicator], max_items: int = 10
    ) -> str:
        """Format threat indicators into a human-readable summary for AI context."""
        if not indicators:
            return "No recent threat indicators available."

        lines = [f"Recent Threat Indicators ({len(indicators)} total):"]
        for ioc in indicators[:max_items]:
            severity_icon = {
                ThreatSeverity.CRITICAL: "[CRITICAL]",
                ThreatSeverity.HIGH: "[HIGH]",
                ThreatSeverity.MEDIUM: "[MEDIUM]",
                ThreatSeverity.LOW: "[LOW]",
                ThreatSeverity.INFO: "[INFO]",
            }.get(ioc.severity, "[?]")

            lines.append(
                f"  {severity_icon} [{ioc.indicator_type.upper()}] {ioc.value}"
            )
            if ioc.description:
                lines.append(f"    Description: {ioc.description}")
            if ioc.tags:
                lines.append(f"    Tags: {', '.join(ioc.tags)}")

        return "\n".join(lines)


def _parse_datetime(value: str | None) -> datetime | None:
    if not value:
        return None
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%d"):
        try:
            return datetime.strptime(value, fmt).replace(tzinfo=timezone.utc)
        except ValueError:
            continue
    return None


def _map_confidence_to_severity(confidence: int) -> ThreatSeverity:
    if confidence >= 90:
        return ThreatSeverity.CRITICAL
    if confidence >= 70:
        return ThreatSeverity.HIGH
    if confidence >= 50:
        return ThreatSeverity.MEDIUM
    if confidence >= 25:
        return ThreatSeverity.LOW
    return ThreatSeverity.INFO
