"""
CYBERSEC AI v4.0 - Encoding Tools
Provides encoding/decoding utilities for Base64, Hex, URL, and Binary
with security-awareness context (encoding != encryption).
"""

from __future__ import annotations

import base64
import binascii
import urllib.parse
from dataclasses import dataclass
from enum import Enum


class EncodingFormat(str, Enum):
    BASE64 = "base64"
    HEX = "hex"
    URL = "url"
    BINARY = "binary"


@dataclass
class EncodingResult:
    format: EncodingFormat
    operation: str  # "encode" or "decode"
    input_text: str
    output_text: str
    use_cases: list[str]
    security_warning: str


ENCODING_INFO: dict[EncodingFormat, dict] = {
    EncodingFormat.BASE64: {
        "use_cases": [
            "Email attachments (MIME)",
            "Embedding binary data in JSON/XML",
            "Data URIs in HTML/CSS",
            "JWT token payload encoding",
        ],
        "security_warning": (
            "Base64 is NOT encryption. It provides zero confidentiality - "
            "anyone can decode it instantly. Never use it to 'protect' sensitive data."
        ),
    },
    EncodingFormat.HEX: {
        "use_cases": [
            "Displaying cryptographic keys and hashes",
            "Low-level debugging and memory inspection",
            "Network protocol analysis",
            "Color codes in web development (#RRGGBB)",
        ],
        "security_warning": (
            "Hex encoding is a simple representation format, not a security mechanism. "
            "It provides no protection for sensitive data."
        ),
    },
    EncodingFormat.URL: {
        "use_cases": [
            "Encoding special characters in URLs",
            "Form data submission (application/x-www-form-urlencoded)",
            "Query string parameters",
            "API request parameters",
        ],
        "security_warning": (
            "URL encoding only makes strings URL-safe. It does not provide security. "
            "Be aware of double-encoding vulnerabilities in web applications."
        ),
    },
    EncodingFormat.BINARY: {
        "use_cases": [
            "Understanding binary representation of data",
            "Low-level data analysis",
            "Educational purposes",
            "Bit manipulation exercises",
        ],
        "security_warning": (
            "Binary is the lowest-level data representation. "
            "It provides no security whatsoever."
        ),
    },
}


class EncodingTools:
    """Encode and decode data with Base64, Hex, URL, and Binary formats."""

    def encode(self, text: str, encoding_format: EncodingFormat) -> EncodingResult:
        """Encode text into the specified format."""
        if encoding_format == EncodingFormat.BASE64:
            output = base64.b64encode(text.encode()).decode()
        elif encoding_format == EncodingFormat.HEX:
            output = text.encode().hex()
        elif encoding_format == EncodingFormat.URL:
            output = urllib.parse.quote(text)
        elif encoding_format == EncodingFormat.BINARY:
            output = " ".join(f"{byte:08b}" for byte in text.encode())
        else:
            raise ValueError(f"Unsupported format: {encoding_format}")

        info = ENCODING_INFO[encoding_format]
        return EncodingResult(
            format=encoding_format,
            operation="encode",
            input_text=text,
            output_text=output,
            use_cases=info["use_cases"],
            security_warning=info["security_warning"],
        )

    def decode(self, encoded: str, encoding_format: EncodingFormat) -> EncodingResult:
        """Decode text from the specified format."""
        if encoding_format == EncodingFormat.BASE64:
            output = base64.b64decode(encoded).decode()
        elif encoding_format == EncodingFormat.HEX:
            output = bytes.fromhex(encoded).decode()
        elif encoding_format == EncodingFormat.URL:
            output = urllib.parse.unquote(encoded)
        elif encoding_format == EncodingFormat.BINARY:
            binary_values = encoded.split()
            output = "".join(chr(int(b, 2)) for b in binary_values)
        else:
            raise ValueError(f"Unsupported format: {encoding_format}")

        info = ENCODING_INFO[encoding_format]
        return EncodingResult(
            format=encoding_format,
            operation="decode",
            input_text=encoded,
            output_text=output,
            use_cases=info["use_cases"],
            security_warning=info["security_warning"],
        )

    def detect_encoding(self, text: str) -> list[str]:
        """Attempt to detect the encoding format of a given string."""
        candidates: list[str] = []

        # Base64 check
        try:
            decoded = base64.b64decode(text, validate=True)
            decoded.decode("utf-8")
            if len(text) % 4 == 0:
                candidates.append("Base64")
        except Exception:
            pass

        # Hex check
        try:
            if len(text) % 2 == 0 and all(c in "0123456789abcdefABCDEF" for c in text):
                bytes.fromhex(text)
                candidates.append("Hex")
        except Exception:
            pass

        # URL encoded check
        if "%" in text:
            candidates.append("URL-encoded")

        # Binary check
        if all(c in "01 " for c in text) and "0" in text:
            candidates.append("Binary")

        return candidates or ["Plain text / Unknown encoding"]

    def format_result(self, result: EncodingResult) -> str:
        """Format an EncodingResult into a readable summary."""
        lines = [
            f"Encoding: {result.format.value.upper()} ({result.operation})",
            f"Input: {result.input_text[:100]}",
            f"Output: {result.output_text[:200]}",
            "",
            f"Security Warning: {result.security_warning}",
            "",
            "Use Cases:",
        ]
        for uc in result.use_cases:
            lines.append(f"  - {uc}")

        return "\n".join(lines)
