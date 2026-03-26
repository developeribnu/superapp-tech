"""
CYBERSEC AI v4.0 - Encryption Tools
Provides AES-256-GCM symmetric encryption and RSA key pair generation
with security guidance on algorithm selection and key management.
"""

from __future__ import annotations

import base64
import os
from dataclasses import dataclass, field
from enum import Enum

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding, rsa
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC


class EncryptionAlgorithm(str, Enum):
    AES_256_GCM = "aes-256-gcm"
    RSA_2048 = "rsa-2048"
    RSA_4096 = "rsa-4096"


class EncryptionModeStatus(str, Enum):
    RECOMMENDED = "recommended"
    ACCEPTABLE = "acceptable"
    DANGEROUS = "dangerous"


@dataclass
class EncryptionResult:
    algorithm: str
    ciphertext_b64: str
    metadata: dict[str, str] = field(default_factory=dict)
    security_notes: list[str] = field(default_factory=list)


@dataclass
class DecryptionResult:
    algorithm: str
    plaintext: str
    success: bool
    error: str = ""


ALGORITHM_GUIDANCE: dict[str, dict] = {
    "aes-256-gcm": {
        "name": "AES-256-GCM",
        "type": "Symmetric (authenticated encryption)",
        "key_size": 256,
        "status": "RECOMMENDED",
        "notes": [
            "Industry standard authenticated encryption",
            "Provides both confidentiality and integrity",
            "Hardware-accelerated (AES-NI) on modern CPUs",
            "NIST-approved, suitable for government use",
            "Use unique nonce (IV) for every encryption operation",
        ],
        "key_management": [
            "Never hard-code keys in source code",
            "Use KMS (AWS KMS, Azure Key Vault) in production",
            "Derive keys from passwords using PBKDF2/Argon2",
            "Rotate keys quarterly for long-lived data",
        ],
    },
    "rsa-2048": {
        "name": "RSA-2048",
        "type": "Asymmetric (public-key cryptography)",
        "key_size": 2048,
        "status": "ACCEPTABLE",
        "notes": [
            "Widely supported and understood",
            "Suitable for key exchange and digital signatures",
            "Minimum recommended key size (2048 bits)",
            "Vulnerable to future quantum computing attacks",
            "Consider RSA-4096 or ECC for higher security",
        ],
        "key_management": [
            "Keep private key strictly confidential",
            "Use OAEP padding (not PKCS#1 v1.5) for encryption",
            "Consider ECC (P-256, Ed25519) for new systems",
        ],
    },
    "rsa-4096": {
        "name": "RSA-4096",
        "type": "Asymmetric (public-key cryptography)",
        "key_size": 4096,
        "status": "RECOMMENDED",
        "notes": [
            "Higher security margin than RSA-2048",
            "Suitable for long-term key pairs",
            "Slower than RSA-2048 (acceptable trade-off)",
            "Still vulnerable to quantum computing (Shor's algorithm)",
        ],
        "key_management": [
            "Keep private key strictly confidential",
            "Use OAEP padding for encryption",
            "Monitor post-quantum cryptography standards (NIST PQC)",
        ],
    },
}


class EncryptionTools:
    """Encryption utilities with security-aware guidance."""

    def encrypt_aes_gcm(self, plaintext: str, password: str) -> EncryptionResult:
        """Encrypt with AES-256-GCM using a password-derived key.

        Uses PBKDF2 for key derivation from the password, ensuring the key
        has the full 256-bit security strength regardless of password quality.
        """
        salt = os.urandom(16)
        nonce = os.urandom(12)

        # Derive key from password
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=600_000,
        )
        key = kdf.derive(password.encode())

        # Encrypt
        aesgcm = AESGCM(key)
        ciphertext = aesgcm.encrypt(nonce, plaintext.encode(), None)

        # Pack salt + nonce + ciphertext into a single base64 string
        packed = salt + nonce + ciphertext
        ciphertext_b64 = base64.b64encode(packed).decode()

        guidance = ALGORITHM_GUIDANCE["aes-256-gcm"]
        return EncryptionResult(
            algorithm="AES-256-GCM",
            ciphertext_b64=ciphertext_b64,
            metadata={
                "key_derivation": "PBKDF2-SHA256 (600,000 iterations)",
                "nonce_size": "96 bits",
                "salt_size": "128 bits",
            },
            security_notes=guidance["notes"],
        )

    def decrypt_aes_gcm(self, ciphertext_b64: str, password: str) -> DecryptionResult:
        """Decrypt AES-256-GCM ciphertext using a password."""
        try:
            packed = base64.b64decode(ciphertext_b64)
            salt = packed[:16]
            nonce = packed[16:28]
            ciphertext = packed[28:]

            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=salt,
                iterations=600_000,
            )
            key = kdf.derive(password.encode())

            aesgcm = AESGCM(key)
            plaintext = aesgcm.decrypt(nonce, ciphertext, None)

            return DecryptionResult(
                algorithm="AES-256-GCM",
                plaintext=plaintext.decode(),
                success=True,
            )
        except Exception as e:
            return DecryptionResult(
                algorithm="AES-256-GCM",
                plaintext="",
                success=False,
                error=f"Decryption failed: {e}",
            )

    def generate_rsa_keypair(self, key_size: int = 2048) -> dict[str, str]:
        """Generate an RSA key pair and return PEM-encoded strings."""
        if key_size not in (2048, 4096):
            raise ValueError("Key size must be 2048 or 4096")

        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=key_size,
        )

        private_pem = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption(),
        ).decode()

        public_pem = private_key.public_key().public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        ).decode()

        return {
            "private_key": private_pem,
            "public_key": public_pem,
            "key_size": str(key_size),
        }

    def get_algorithm_guidance(self, algorithm: str) -> dict | None:
        """Get security guidance for a specific algorithm."""
        return ALGORITHM_GUIDANCE.get(algorithm)

    def format_guidance(self, algorithm: str) -> str:
        """Format algorithm guidance into a readable summary."""
        guidance = ALGORITHM_GUIDANCE.get(algorithm)
        if not guidance:
            return f"No guidance available for: {algorithm}"

        lines = [
            f"Algorithm: {guidance['name']}",
            f"Type: {guidance['type']}",
            f"Key Size: {guidance['key_size']} bits",
            f"Status: {guidance['status']}",
            "",
            "Security Notes:",
        ]
        for note in guidance["notes"]:
            lines.append(f"  - {note}")

        lines.append("\nKey Management:")
        for km in guidance["key_management"]:
            lines.append(f"  - {km}")

        return "\n".join(lines)
