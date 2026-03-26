"""
Cybersec Knowledge Base - API Routes
FastAPI endpoints for cybersecurity knowledge base, tools, and threat intelligence.

All heavy imports are deferred to first use so the app can start even if
an optional dependency (cryptography, bcrypt, …) fails to install.
"""

from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()

# ── Lazy singletons ─────────────────────────────────────────────────
_cache: dict[str, Any] = {}


def _get(key: str) -> Any:
    """Return a lazily-initialised singleton, importing on first call."""
    if key not in _cache:
        if key == "hash_analyzer":
            from src.tools.hash_analyzer import HashAnalyzer
            _cache[key] = HashAnalyzer()
        elif key == "password_analyzer":
            from src.tools.password_analyzer import PasswordAnalyzer
            _cache[key] = PasswordAnalyzer()
        elif key == "encoding_tools":
            from src.tools.encoding_tools import EncodingTools
            _cache[key] = EncodingTools()
        elif key == "encryption_tools":
            from src.tools.encryption_tools import EncryptionTools
            _cache[key] = EncryptionTools()
        elif key == "network_tools":
            from src.tools.network_tools import NetworkTools
            _cache[key] = NetworkTools()
        elif key == "news_fetcher":
            from src.threat_intel.news_fetcher import SecurityNewsFetcher
            _cache[key] = SecurityNewsFetcher()
        elif key == "cve_tracker":
            from src.threat_intel.cve_tracker import CVETracker
            _cache[key] = CVETracker()
        elif key == "feed_aggregator":
            from src.threat_intel.feed_aggregator import ThreatFeedAggregator
            _cache[key] = ThreatFeedAggregator()
    return _cache[key]


# ── Request Models ──────────────────────────────────────────────────


class HashRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=10000)
    algorithm: str = "sha256"
    bcrypt_rounds: int = Field(default=12, ge=4, le=31)


class PasswordRequest(BaseModel):
    password: str = Field(..., min_length=1, max_length=1000)


class EncodingRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=50000)
    format: str = "base64"
    operation: str = "encode"  # "encode" or "decode"


class EncryptionRequest(BaseModel):
    plaintext: str = Field(..., min_length=1, max_length=50000)
    password: str = Field(..., min_length=1, max_length=1000)


class DecryptionRequest(BaseModel):
    ciphertext: str = Field(..., min_length=1)
    password: str = Field(..., min_length=1, max_length=1000)


class PortAnalysisRequest(BaseModel):
    ports: list[int] = Field(..., min_length=1)


class CVERequest(BaseModel):
    cve_id: str = Field(..., pattern=r"^CVE-\d{4}-\d{4,}$")


# ── Security Tools Endpoints ─────────────────────────────────────────


@router.post("/tools/hash")
async def generate_hash(request: HashRequest) -> dict[str, Any]:
    """Generate a cryptographic hash with security analysis."""
    from src.tools.hash_analyzer import HashAlgorithm

    try:
        algo = HashAlgorithm(request.algorithm.lower())
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported algorithm: {request.algorithm}. "
            f"Supported: {[a.value for a in HashAlgorithm]}",
        )

    result = _get("hash_analyzer").generate_hash(request.text, algo, request.bcrypt_rounds)
    return {
        "algorithm": result.algorithm.value,
        "hash": result.hash_value,
        "security_status": result.security_status.value,
        "security_label": result.security_label,
        "use_cases": result.use_cases,
        "warnings": result.warnings,
        "recommendations": result.recommendations,
    }


@router.post("/tools/hash/identify")
async def identify_hash(hash_string: str) -> dict[str, list[str]]:
    """Identify the likely algorithm of a hash string."""
    candidates = _get("hash_analyzer").identify_hash_type(hash_string)
    return {"possible_algorithms": candidates}


@router.post("/tools/password/analyze")
async def analyze_password(request: PasswordRequest) -> dict[str, Any]:
    """Analyze password strength with entropy and crack-time estimation."""
    result = _get("password_analyzer").analyze(request.password)
    return {
        "length": result.password_length,
        "entropy_bits": result.entropy_bits,
        "strength": result.strength.value,
        "score": result.score,
        "crack_time": result.crack_time_display,
        "charset_size": result.charset_size,
        "character_sets": {
            "uppercase": result.has_uppercase,
            "lowercase": result.has_lowercase,
            "digits": result.has_digits,
            "symbols": result.has_symbols,
        },
        "patterns_found": result.patterns_found,
        "improvements": result.improvements,
    }


@router.post("/tools/encode")
async def encode_decode(request: EncodingRequest) -> dict[str, Any]:
    """Encode or decode text with Base64, Hex, URL, or Binary."""
    from src.tools.encoding_tools import EncodingFormat

    try:
        fmt = EncodingFormat(request.format.lower())
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported format: {request.format}. "
            f"Supported: {[f.value for f in EncodingFormat]}",
        )

    tools = _get("encoding_tools")
    if request.operation == "encode":
        result = tools.encode(request.text, fmt)
    elif request.operation == "decode":
        result = tools.decode(request.text, fmt)
    else:
        raise HTTPException(
            status_code=400,
            detail="Operation must be 'encode' or 'decode'",
        )

    return {
        "format": result.format.value,
        "operation": result.operation,
        "input": result.input_text,
        "output": result.output_text,
        "use_cases": result.use_cases,
        "security_warning": result.security_warning,
    }


@router.post("/tools/encrypt")
async def encrypt(request: EncryptionRequest) -> dict[str, Any]:
    """Encrypt text with AES-256-GCM."""
    result = _get("encryption_tools").encrypt_aes_gcm(request.plaintext, request.password)
    return {
        "algorithm": result.algorithm,
        "ciphertext": result.ciphertext_b64,
        "metadata": result.metadata,
        "security_notes": result.security_notes,
    }


@router.post("/tools/decrypt")
async def decrypt(request: DecryptionRequest) -> dict[str, Any]:
    """Decrypt AES-256-GCM ciphertext."""
    result = _get("encryption_tools").decrypt_aes_gcm(request.ciphertext, request.password)
    if not result.success:
        raise HTTPException(status_code=400, detail=result.error)
    return {
        "algorithm": result.algorithm,
        "plaintext": result.plaintext,
        "success": result.success,
    }


@router.post("/tools/ports/analyze")
async def analyze_ports(request: PortAnalysisRequest) -> dict[str, Any]:
    """Analyze open ports for security implications."""
    results = _get("network_tools").analyze_open_ports(request.ports)
    return {
        "total_ports": len(results),
        "ports": [
            {
                "port": p.port,
                "service": p.service,
                "protocol": p.protocol,
                "risk": p.risk_if_exposed.value,
                "description": p.description,
                "security_notes": p.security_notes,
                "mitigations": p.mitigations,
            }
            for p in results
        ],
    }


# ── Threat Intelligence Endpoints ────────────────────────────────────


@router.get("/threat-intel/news")
async def get_security_news(limit: int = 5) -> dict[str, Any]:
    """Fetch latest cybersecurity news from trusted sources."""
    articles = _get("news_fetcher").fetch_all_flat(limit_per_feed=limit)
    return {
        "total": len(articles),
        "articles": [
            {
                "title": a.title,
                "source": a.source,
                "link": a.link,
                "published": a.published,
                "summary": a.summary,
                "tags": a.tags,
            }
            for a in articles
        ],
    }


@router.get("/threat-intel/news/search")
async def search_news(keyword: str) -> dict[str, Any]:
    """Search security news for a specific keyword."""
    articles = _get("news_fetcher").search_articles(keyword)
    return {
        "keyword": keyword,
        "total": len(articles),
        "articles": [
            {
                "title": a.title,
                "source": a.source,
                "link": a.link,
                "summary": a.summary,
            }
            for a in articles
        ],
    }


@router.get("/threat-intel/cve/{cve_id}")
async def lookup_cve(cve_id: str) -> dict[str, Any]:
    """Look up a specific CVE with NVD + CISA KEV enrichment."""
    entry = await _get("cve_tracker").lookup_cve(cve_id)
    if not entry:
        raise HTTPException(status_code=404, detail=f"CVE {cve_id} not found")
    return {
        "cve_id": entry.cve_id,
        "description": entry.description,
        "cvss_score": entry.cvss_score,
        "cvss_vector": entry.cvss_vector,
        "severity": entry.severity,
        "cwe_id": entry.cwe_id,
        "is_kev": entry.is_kev,
        "kev_due_date": entry.kev_due_date,
        "references": entry.references,
    }


@router.get("/threat-intel/kev")
async def get_kev_entries(limit: int = 20) -> dict[str, Any]:
    """Get recent CISA Known Exploited Vulnerabilities."""
    entries = await _get("cve_tracker").get_kev_entries(limit=limit)
    return {
        "total": len(entries),
        "vulnerabilities": [
            {
                "cve_id": e.cve_id,
                "description": e.description,
                "severity": e.severity,
                "due_date": e.kev_due_date,
                "affected": e.affected_products,
            }
            for e in entries
        ],
    }


# ── Knowledge Base Endpoints ─────────────────────────────────────────


@router.get("/knowledge/owasp")
async def get_owasp_top10() -> dict[str, Any]:
    """Get the OWASP Top 10 (2021) vulnerability categories."""
    from src.knowledge.owasp_top10 import OwaspKB

    kb = OwaspKB()
    categories = kb.get_all()
    return {
        "version": "2021",
        "categories": [
            {
                "id": c.id,
                "name": c.name,
                "severity": c.severity,
                "description": c.description,
                "prevention": c.prevention,
            }
            for c in categories
        ],
    }


@router.get("/knowledge/certifications")
async def get_certifications() -> dict[str, Any]:
    """Get cybersecurity certification paths."""
    from src.knowledge.certifications import CertificationKB

    kb = CertificationKB()
    certs = kb.get_progression_path()
    return {
        "progression": [
            {
                "id": c.id,
                "name": c.name,
                "short_name": c.short_name,
                "level": c.level,
                "provider": c.provider,
                "cost": c.cost_estimate,
                "study_time": c.study_time,
                "salary_range": c.salary_range,
                "career_roles": c.career_roles,
            }
            for c in certs
        ],
    }


@router.get("/library/books")
async def get_library_books() -> dict[str, Any]:
    """Get the curated cybersecurity library catalog for the public UI."""
    from src.knowledge.library_books import get_library_catalog

    return get_library_catalog()


@router.get("/knowledge/killchain")
async def get_killchain() -> dict[str, Any]:
    """Get the Cyber Kill Chain phases."""
    from src.knowledge.attack_frameworks import MitreAttackKB

    kb = MitreAttackKB()
    phases = kb.get_kill_chain()
    return {
        "framework": "Lockheed Martin Cyber Kill Chain",
        "phases": [
            {
                "order": p.order,
                "name": p.name,
                "description": p.description,
                "attacker_actions": p.attacker_actions,
                "defender_actions": p.defender_actions,
                "tools": p.tools,
            }
            for p in phases
        ],
    }


# ── System Endpoints ─────────────────────────────────────────────────


@router.get("/health")
async def health_check() -> dict[str, Any]:
    """Health check with diagnostic information."""
    import sys

    module_status: dict[str, str] = {}
    for mod in ["fastapi", "pydantic", "httpx", "cryptography", "bcrypt", "feedparser", "structlog"]:
        try:
            __import__(mod)
            module_status[mod] = "ok"
        except ImportError as e:
            module_status[mod] = f"MISSING: {e}"

    return {
        "status": "healthy",
        "version": "4.0.0",
        "system": "Cybersec Knowledge Base",
        "python_version": sys.version,
        "modules": module_status,
    }
