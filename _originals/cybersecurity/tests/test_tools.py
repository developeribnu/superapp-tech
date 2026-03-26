"""Tests for security tools: HashAnalyzer, PasswordAnalyzer, EncodingTools, etc."""

import pytest

from src.tools.encoding_tools import EncodingFormat, EncodingTools
from src.tools.encryption_tools import EncryptionTools
from src.tools.hash_analyzer import HashAlgorithm, HashAnalyzer, SecurityStatus
from src.tools.network_tools import NetworkTools, PortRisk
from src.tools.password_analyzer import PasswordAnalyzer, PasswordStrength


class TestHashAnalyzer:
    def setup_method(self) -> None:
        self.analyzer = HashAnalyzer()

    def test_md5_hash(self) -> None:
        result = self.analyzer.generate_hash("test", HashAlgorithm.MD5)
        assert result.hash_value == "098f6bcd4621d373cade4e832627b4f6"
        assert result.security_status == SecurityStatus.BROKEN

    def test_sha256_hash(self) -> None:
        result = self.analyzer.generate_hash("test", HashAlgorithm.SHA256)
        assert len(result.hash_value) == 64
        assert result.security_status == SecurityStatus.SECURE

    def test_sha512_hash(self) -> None:
        result = self.analyzer.generate_hash("test", HashAlgorithm.SHA512)
        assert len(result.hash_value) == 128
        assert result.security_status == SecurityStatus.SECURE

    def test_bcrypt_hash(self) -> None:
        result = self.analyzer.generate_hash("test", HashAlgorithm.BCRYPT, bcrypt_rounds=4)
        assert result.hash_value.startswith("$2b$")
        assert result.security_status == SecurityStatus.RECOMMENDED

    def test_identify_md5(self) -> None:
        candidates = self.analyzer.identify_hash_type("098f6bcd4621d373cade4e832627b4f6")
        assert "MD5" in candidates

    def test_identify_sha256(self) -> None:
        candidates = self.analyzer.identify_hash_type(
            "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
        )
        assert "SHA-256" in candidates

    def test_identify_bcrypt(self) -> None:
        candidates = self.analyzer.identify_hash_type(
            "$2b$12$LJ3m4ys3Lk0TSwMvkCFNzuN1FnMrFOpEv1bXCGKJNZTExpmv1Sei"
        )
        assert "bcrypt" in candidates

    def test_format_analysis(self) -> None:
        result = self.analyzer.generate_hash("test", HashAlgorithm.MD5)
        formatted = self.analyzer.format_analysis(result)
        assert "BROKEN" in formatted
        assert "MD5" in formatted


class TestPasswordAnalyzer:
    def setup_method(self) -> None:
        self.analyzer = PasswordAnalyzer()

    def test_weak_password(self) -> None:
        result = self.analyzer.analyze("123456")
        assert result.strength in (PasswordStrength.VERY_WEAK, PasswordStrength.WEAK)
        assert result.score < 30

    def test_moderate_password(self) -> None:
        result = self.analyzer.analyze("Summer2024!")
        assert result.strength in (
            PasswordStrength.WEAK,
            PasswordStrength.MODERATE,
            PasswordStrength.VERY_WEAK,
        )

    def test_strong_password(self) -> None:
        result = self.analyzer.analyze("kX9$mP2!vQ7&nL4@wR6#")
        assert result.strength in (PasswordStrength.STRONG, PasswordStrength.VERY_STRONG)
        assert result.score >= 70

    def test_detects_sequential_pattern(self) -> None:
        result = self.analyzer.analyze("abc123")
        assert any("sequential" in p.lower() or "Sequential" in p for p in result.patterns_found)

    def test_detects_common_word(self) -> None:
        result = self.analyzer.analyze("password123")
        assert any("common" in p.lower() or "Common" in p for p in result.patterns_found)

    def test_entropy_increases_with_length(self) -> None:
        short = self.analyzer.analyze("abc")
        long = self.analyzer.analyze("abcdefghijklmnop")
        assert long.entropy_bits > short.entropy_bits

    def test_improvements_suggest_length(self) -> None:
        result = self.analyzer.analyze("short")
        assert any("length" in imp.lower() for imp in result.improvements)

    def test_format_analysis(self) -> None:
        result = self.analyzer.analyze("Test123!")
        formatted = self.analyzer.format_analysis(result)
        assert "Entropy" in formatted
        assert "Score" in formatted


class TestEncodingTools:
    def setup_method(self) -> None:
        self.tools = EncodingTools()

    def test_base64_encode(self) -> None:
        result = self.tools.encode("Hello World", EncodingFormat.BASE64)
        assert result.output_text == "SGVsbG8gV29ybGQ="

    def test_base64_decode(self) -> None:
        result = self.tools.decode("SGVsbG8gV29ybGQ=", EncodingFormat.BASE64)
        assert result.output_text == "Hello World"

    def test_hex_encode(self) -> None:
        result = self.tools.encode("AB", EncodingFormat.HEX)
        assert result.output_text == "4142"

    def test_hex_decode(self) -> None:
        result = self.tools.decode("4142", EncodingFormat.HEX)
        assert result.output_text == "AB"

    def test_url_encode(self) -> None:
        result = self.tools.encode("hello world&foo=bar", EncodingFormat.URL)
        assert "%20" in result.output_text or "+" in result.output_text

    def test_url_decode(self) -> None:
        result = self.tools.decode("hello%20world", EncodingFormat.URL)
        assert result.output_text == "hello world"

    def test_binary_encode(self) -> None:
        result = self.tools.encode("A", EncodingFormat.BINARY)
        assert result.output_text == "01000001"

    def test_security_warning_present(self) -> None:
        result = self.tools.encode("secret", EncodingFormat.BASE64)
        assert "NOT encryption" in result.security_warning

    def test_detect_base64(self) -> None:
        candidates = self.tools.detect_encoding("SGVsbG8gV29ybGQ=")
        assert "Base64" in candidates

    def test_detect_hex(self) -> None:
        candidates = self.tools.detect_encoding("4142434445")
        assert "Hex" in candidates


class TestEncryptionTools:
    def setup_method(self) -> None:
        self.tools = EncryptionTools()

    def test_aes_encrypt_decrypt_roundtrip(self) -> None:
        plaintext = "Secret message for testing"
        password = "StrongP@ssw0rd!"

        encrypted = self.tools.encrypt_aes_gcm(plaintext, password)
        assert encrypted.algorithm == "AES-256-GCM"
        assert encrypted.ciphertext_b64 != plaintext

        decrypted = self.tools.decrypt_aes_gcm(encrypted.ciphertext_b64, password)
        assert decrypted.success is True
        assert decrypted.plaintext == plaintext

    def test_aes_wrong_password_fails(self) -> None:
        encrypted = self.tools.encrypt_aes_gcm("test", "correct_password")
        decrypted = self.tools.decrypt_aes_gcm(encrypted.ciphertext_b64, "wrong_password")
        assert decrypted.success is False

    def test_rsa_keypair_generation(self) -> None:
        keypair = self.tools.generate_rsa_keypair(2048)
        assert "BEGIN PRIVATE KEY" in keypair["private_key"]
        assert "BEGIN PUBLIC KEY" in keypair["public_key"]
        assert keypair["key_size"] == "2048"

    def test_algorithm_guidance(self) -> None:
        guidance = self.tools.get_algorithm_guidance("aes-256-gcm")
        assert guidance is not None
        assert guidance["status"] == "RECOMMENDED"

    def test_format_guidance(self) -> None:
        formatted = self.tools.format_guidance("aes-256-gcm")
        assert "AES-256-GCM" in formatted
        assert "RECOMMENDED" in formatted


class TestNetworkTools:
    def setup_method(self) -> None:
        self.tools = NetworkTools()

    def test_get_known_port(self) -> None:
        info = self.tools.get_port_info(22)
        assert info is not None
        assert info.service == "SSH"

    def test_get_unknown_port(self) -> None:
        info = self.tools.get_port_info(99999)
        assert info is None

    def test_critical_port_identification(self) -> None:
        info = self.tools.get_port_info(3389)
        assert info is not None
        assert info.risk_if_exposed == PortRisk.CRITICAL

    def test_analyze_multiple_ports(self) -> None:
        results = self.tools.analyze_open_ports([22, 80, 443, 3389, 12345])
        assert len(results) == 5

    def test_unknown_port_in_analysis(self) -> None:
        results = self.tools.analyze_open_ports([99999])
        assert results[0].service == "Unknown"

    def test_get_critical_ports(self) -> None:
        critical = self.tools.get_critical_ports()
        critical_port_numbers = [p.port for p in critical]
        assert 3389 in critical_port_numbers
        assert 445 in critical_port_numbers

    def test_format_scan_results(self) -> None:
        results = self.tools.analyze_open_ports([22, 3389])
        formatted = self.tools.format_scan_results(results)
        assert "SSH" in formatted
        assert "RDP" in formatted
        assert "CRITICAL" in formatted
