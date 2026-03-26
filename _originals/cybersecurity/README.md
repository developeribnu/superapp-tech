# Cybersec Knowledge Base v4.0

**Cybersecurity Knowledge Base & Tools** — Production-grade system providing security knowledge bases, hands-on security tools, and real-time threat intelligence.

## Overview

Cybersec Knowledge Base is a Python-based cybersecurity platform designed to integrate with the [heyibnu.com](https://heyibnu.com) platform. It provides:

- **Knowledge Bases** — OWASP Top 10, MITRE ATT&CK, Cyber Kill Chain, certification paths
- **Security Tools** — Hash generation, password analysis, encoding/decoding, AES-256-GCM encryption, port analysis
- **Real-time Threat Intelligence** — Integration with OTX, CISA KEV, NVD, URLhaus, and ThreatFox

## Architecture

```
cybersecurity/
├── config/                     # Configuration files
│   ├── settings.py             # Application settings (pydantic-settings)
│   └── tools.yaml              # heyibnu.com tool integration map
├── src/
│   ├── app.py                  # FastAPI application entry point
│   ├── threat_intel/
│   │   ├── feed_aggregator.py  # OTX, URLhaus, ThreatFox feeds
│   │   ├── cve_tracker.py      # NVD + CISA KEV tracking
│   │   ├── news_fetcher.py     # Security news RSS aggregation
│   │   └── mitre_attack.py     # MITRE ATT&CK technique mapper
│   ├── tools/
│   │   ├── hash_analyzer.py    # Hash generation & security analysis
│   │   ├── password_analyzer.py# Password strength (entropy, crack time)
│   │   ├── encoding_tools.py   # Base64, Hex, URL, Binary
│   │   ├── encryption_tools.py # AES-256-GCM, RSA key generation
│   │   └── network_tools.py    # Port security analysis
│   ├── knowledge/
│   │   ├── owasp_top10.py      # OWASP Top 10 (2021) knowledge base
│   │   ├── certifications.py   # Security+, CEH, OSCP, CISSP paths
│   │   └── attack_frameworks.py# Cyber Kill Chain + MITRE ATT&CK
│   └── api/
│       ├── routes.py           # FastAPI REST endpoints
│       └── middleware.py       # Rate limiting, security headers
├── tests/
│   ├── test_tools.py           # Security tools tests
│   └── test_threat_intel.py    # Threat intel & knowledge base tests
├── api/
│   └── index.py                # Vercel serverless entry point
├── vercel.json                 # Vercel deployment config
├── requirements.txt
├── .env.example
└── .gitignore
```

## Quick Start

### 1. Clone and install

```bash
git clone <repo-url>
cd cybersecurity
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your API keys (optional, for threat feeds):
#   OTX_API_KEY=your_otx_key
```

### 3. Run the server

```bash
python -m src.app
# Server starts at http://localhost:8000
```

### 4. Run tests

```bash
pytest tests/ -v
```

## API Endpoints

### Security Tools

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/tools/hash` | Generate hash with security analysis |
| POST | `/api/v1/tools/hash/identify` | Identify hash algorithm |
| POST | `/api/v1/tools/password/analyze` | Password strength analysis |
| POST | `/api/v1/tools/encode` | Encode/decode (Base64, Hex, URL, Binary) |
| POST | `/api/v1/tools/encrypt` | AES-256-GCM encryption |
| POST | `/api/v1/tools/decrypt` | AES-256-GCM decryption |
| POST | `/api/v1/tools/ports/analyze` | Port security analysis |

### Threat Intelligence

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/threat-intel/news` | Latest security news (RSS) |
| GET | `/api/v1/threat-intel/news/search?keyword=` | Search security news |
| GET | `/api/v1/threat-intel/cve/{cve_id}` | CVE lookup (NVD + CISA KEV) |
| GET | `/api/v1/threat-intel/kev` | CISA Known Exploited Vulnerabilities |

### Knowledge Base

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/knowledge/owasp` | OWASP Top 10 (2021) |
| GET | `/api/v1/knowledge/certifications` | Certification paths |
| GET | `/api/v1/knowledge/killchain` | Cyber Kill Chain phases |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Health check |

## Threat Intelligence

Real-time feeds from:
- **OTX** (AlienVault) — 180K+ security researchers
- **URLhaus** — Malicious URL tracking
- **ThreatFox** — IOC sharing platform
- **NVD** — CVE details with CVSS scoring
- **CISA KEV** — Actively exploited vulnerabilities
- **RSS feeds** — The Hacker News, Dark Reading, SecurityWeek, Bleeping Computer, Krebs on Security

## Deployment

This project is configured for Vercel deployment. See `vercel.json` for configuration.

## Security

- AES-256-GCM encryption with PBKDF2 key derivation (600K iterations)
- Rate limiting middleware
- Security headers (HSTS, CSP, X-Frame-Options)
- CORS configuration
- No secrets in source code — all via environment variables

## License

All rights reserved. Built for heyibnu.com cybersecurity platform.


---
**Deployed on Vercel** 🚀
 
