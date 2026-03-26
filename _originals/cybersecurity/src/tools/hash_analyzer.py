"""
CYBERSEC AI v4.0 - Hash Analyzer
Generates and analyzes cryptographic hashes with security assessments.
Supports MD5, SHA-1, SHA-256, SHA-512, and bcrypt.
"""

from __future__ import annotations

import hashlib
from dataclasses import dataclass
from enum import Enum

import bcrypt


class HashAlgorithm(str, Enum):
    MD5 = "md5"
    SHA1 = "sha1"
    SHA256 = "sha256"
    SHA512 = "sha512"
    BCRYPT = "bcrypt"


class SecurityStatus(str, Enum):
    BROKEN = "broken"
    DEPRECATED = "deprecated"
    SECURE = "secure"
    RECOMMENDED = "recommended"


@dataclass
class HashResult:
    algorithm: HashAlgorithm
    input_text: str
    hash_value: str
    security_status: SecurityStatus
    security_label: str
    use_cases: list[str]
    warnings: list[str]
    recommendations: list[str]


# Algorithm security metadata
ALGORITHM_INFO: dict[HashAlgorithm, dict] = {
    HashAlgorithm.MD5: {
        "status": SecurityStatus.BROKEN,
        "label": "BROKEN - Collision attacks practical since 2004",
        "output_bits": 128,
        "use_cases": ["Non-security checksums only", "Legacy system compatibility"],
        "warnings": [
            "Collision attacks are computationally trivial",
            "Pre-image attacks feasible with sufficient resources",
            "Rainbow tables widely available for common inputs",
            "NOT suitable for password hashing or integrity verification",
        ],
        "recommendations": [
            "Use SHA-256 for file integrity checks",
            "Use bcrypt or Argon2 for password hashing",
            "Migrate away from MD5 in all security contexts",
        ],
    },
    HashAlgorithm.SHA1: {
        "status": SecurityStatus.DEPRECATED,
        "label": "DEPRECATED - Collision demonstrated (SHAttered, 2017)",
        "output_bits": 160,
        "use_cases": ["Legacy git commit hashing", "Non-critical checksums"],
        "warnings": [
            "Practical collision attacks demonstrated (Google/CWI SHAttered)",
            "Chosen-prefix collisions now feasible",
            "Certificate authorities no longer issue SHA-1 certificates",
        ],
        "recommendations": [
            "Upgrade to SHA-256 or SHA-512",
            "Git is transitioning to SHA-256",
            "Do not use for digital signatures or certificates",
        ],
    },
    HashAlgorithm.SHA256: {
        "status": SecurityStatus.SECURE,
        "label": "SECURE - Current industry standard",
        "output_bits": 256,
        "use_cases": [
            "File integrity verification",
            "Digital signatures",
            "Certificate fingerprints",
            "Blockchain (Bitcoin uses double SHA-256)",
        ],
        "warnings": [
            "Not designed for password hashing (too fast)",
            "Use with HMAC for message authentication",
        ],
        "recommendations": [
            "Preferred for file integrity and digital signatures",
            "For passwords, use bcrypt/Argon2 instead",
        ],
    },
    HashAlgorithm.SHA512: {
        "status": SecurityStatus.SECURE,
        "label": "SECURE - Extended security margin",
        "output_bits": 512,
        "use_cases": [
            "High-security file integrity",
            "Digital signatures with extra margin",
            "Key derivation input",
        ],
        "warnings": [
            "Larger output but same security class as SHA-256 for most uses",
            "Still not suitable for direct password hashing",
        ],
        "recommendations": [
            "Use when extra collision resistance margin is needed",
            "Good for long-term digital signatures",
        ],
    },
    HashAlgorithm.BCRYPT: {
        "status": SecurityStatus.RECOMMENDED,
        "label": "RECOMMENDED - Purpose-built for password hashing",
        "output_bits": 184,
        "use_cases": [
            "Password hashing (primary use case)",
            "Credential storage",
            "Authentication systems",
        ],
        "warnings": [
            "72-byte input limit (truncation beyond that)",
            "Cost factor should be tuned for ~250ms on target hardware",
        ],
        "recommendations": [
            "Use cost factor of 12+ for production systems",
            "Consider Argon2id for new systems (memory-hard)",
            "Always use unique salt per password (built into bcrypt)",
        ],
    },
}


class HashAnalyzer:
    """Generates cryptographic hashes and provides security analysis."""

    def generate_hash(
        self, text: str, algorithm: HashAlgorithm, bcrypt_rounds: int = 12
    ) -> HashResult:
        """Generate a hash and return it with a security assessment."""
        if algorithm == HashAlgorithm.MD5:
            hash_value = hashlib.md5(text.encode()).hexdigest()
        elif algorithm == HashAlgorithm.SHA1:
            hash_value = hashlib.sha1(text.encode()).hexdigest()
        elif algorithm == HashAlgorithm.SHA256:
            hash_value = hashlib.sha256(text.encode()).hexdigest()
        elif algorithm == HashAlgorithm.SHA512:
            hash_value = hashlib.sha512(text.encode()).hexdigest()
        elif algorithm == HashAlgorithm.BCRYPT:
            salt = bcrypt.gensalt(rounds=bcrypt_rounds)
            hash_value = bcrypt.hashpw(text.encode(), salt).decode()
        else:
            raise ValueError(f"Unsupported algorithm: {algorithm}")

        info = ALGORITHM_INFO[algorithm]

        return HashResult(
            algorithm=algorithm,
            input_text=text,
            hash_value=hash_value,
            security_status=info["status"],
            security_label=info["label"],
            use_cases=info["use_cases"],
            warnings=info["warnings"],
            recommendations=info["recommendations"],
        )

    def identify_hash_type(self, hash_string: str) -> list[str]:
        """Attempt to identify the hash algorithm based on length and format."""
        length = len(hash_string)
        candidates: list[str] = []

        if hash_string.startswith("$2b$") or hash_string.startswith("$2a$"):
            candidates.append("bcrypt")
        elif hash_string.startswith("$argon2"):
            candidates.append("Argon2")
        elif hash_string.startswith("$6$"):
            candidates.append("SHA-512 crypt")
        elif hash_string.startswith("$5$"):
            candidates.append("SHA-256 crypt")
        elif length == 32 and _is_hex(hash_string):
            candidates.extend(["MD5", "NTLM"])
        elif length == 40 and _is_hex(hash_string):
            candidates.append("SHA-1")
        elif length == 64 and _is_hex(hash_string):
            candidates.extend(["SHA-256", "BLAKE2s-256"])
        elif length == 128 and _is_hex(hash_string):
            candidates.extend(["SHA-512", "BLAKE2b-512"])

        return candidates or ["Unknown hash format"]

    def format_analysis(self, result: HashResult) -> str:
        """Format a HashResult into a readable analysis string."""
        status_icon = {
            SecurityStatus.BROKEN: "[BROKEN]",
            SecurityStatus.DEPRECATED: "[DEPRECATED]",
            SecurityStatus.SECURE: "[SECURE]",
            SecurityStatus.RECOMMENDED: "[RECOMMENDED]",
        }

        lines = [
            f"Hash Analysis: {result.algorithm.value.upper()}",
            f"Status: {status_icon.get(result.security_status, '?')} {result.security_label}",
            f"Hash: {result.hash_value}",
            "",
            "Use Cases:",
        ]
        for uc in result.use_cases:
            lines.append(f"  - {uc}")

        if result.warnings:
            lines.append("\nWarnings:")
            for w in result.warnings:
                lines.append(f"  - {w}")

        if result.recommendations:
            lines.append("\nRecommendations:")
            for r in result.recommendations:
                lines.append(f"  - {r}")

        return "\n".join(lines)


def _is_hex(s: str) -> bool:
    try:
        int(s, 16)
        return True
    except ValueError:
        return False
