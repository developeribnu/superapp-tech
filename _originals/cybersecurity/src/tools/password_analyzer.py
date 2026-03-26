"""
CYBERSEC AI v4.0 - Password Analyzer
Analyzes password strength through entropy calculation, pattern detection,
and crack-time estimation with current GPU capabilities.
"""

from __future__ import annotations

import math
import re
import string
from dataclasses import dataclass, field
from enum import Enum


class PasswordStrength(str, Enum):
    VERY_WEAK = "very_weak"
    WEAK = "weak"
    MODERATE = "moderate"
    STRONG = "strong"
    VERY_STRONG = "very_strong"


@dataclass
class PasswordAnalysis:
    password_length: int
    entropy_bits: float
    strength: PasswordStrength
    crack_time_display: str
    charset_size: int
    has_uppercase: bool
    has_lowercase: bool
    has_digits: bool
    has_symbols: bool
    has_spaces: bool
    patterns_found: list[str] = field(default_factory=list)
    improvements: list[str] = field(default_factory=list)
    score: int = 0  # 0-100


# Common password patterns to detect
COMMON_PATTERNS: list[tuple[str, str]] = [
    (r"^[a-z]+$", "Lowercase only - easily cracked by dictionary attack"),
    (r"^[A-Z]+$", "Uppercase only - easily cracked by dictionary attack"),
    (r"^[0-9]+$", "Digits only - trivially brute-forced"),
    (r"(012|123|234|345|456|567|678|789|890)", "Sequential numbers detected"),
    (r"(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)", "Sequential letters detected"),
    (r"(qwerty|asdf|zxcv|qazwsx)", "Keyboard walk pattern detected"),
    (r"(.)\1{2,}", "Repeated characters detected"),
    (r"(19|20)\d{2}", "Year pattern detected - commonly used in passwords"),
    (r"(?i)(password|admin|user|login|welcome|letmein|monkey|dragon|master|qwerty)", "Common password word detected"),
]

# GPU hash rates (hashes per second) for crack time estimation
# Based on RTX 4090 benchmarks (2024-2026 era)
GPU_HASH_RATES: dict[str, float] = {
    "MD5": 164.0e9,           # 164 billion/sec
    "SHA-256": 22.3e9,        # 22.3 billion/sec
    "bcrypt (cost 12)": 184e3,  # 184 thousand/sec
    "Argon2": 1.5e3,          # 1.5 thousand/sec
}


class PasswordAnalyzer:
    """Analyzes password strength with entropy calculation, pattern detection,
    and crack-time estimation."""

    def analyze(self, password: str) -> PasswordAnalysis:
        """Perform a comprehensive password strength analysis."""
        length = len(password)

        # Character set analysis
        has_lower = bool(re.search(r"[a-z]", password))
        has_upper = bool(re.search(r"[A-Z]", password))
        has_digit = bool(re.search(r"[0-9]", password))
        has_symbol = bool(re.search(r"[^a-zA-Z0-9\s]", password))
        has_space = " " in password

        # Calculate charset size
        charset_size = 0
        if has_lower:
            charset_size += 26
        if has_upper:
            charset_size += 26
        if has_digit:
            charset_size += 10
        if has_symbol:
            charset_size += 33
        if has_space:
            charset_size += 1
        if charset_size == 0:
            charset_size = 1

        # Entropy
        entropy = length * math.log2(charset_size) if length > 0 else 0

        # Pattern detection
        patterns: list[str] = []
        for pattern_re, description in COMMON_PATTERNS:
            if re.search(pattern_re, password):
                patterns.append(description)

        # Strength classification
        strength = self._classify_strength(entropy, length, patterns)

        # Score (0-100)
        score = self._calculate_score(entropy, length, patterns, has_lower, has_upper, has_digit, has_symbol)

        # Crack time estimation
        crack_time = self._estimate_crack_time(charset_size, length)

        # Improvement suggestions
        improvements = self._suggest_improvements(
            length, has_lower, has_upper, has_digit, has_symbol, patterns, entropy
        )

        return PasswordAnalysis(
            password_length=length,
            entropy_bits=round(entropy, 1),
            strength=strength,
            crack_time_display=crack_time,
            charset_size=charset_size,
            has_uppercase=has_upper,
            has_lowercase=has_lower,
            has_digits=has_digit,
            has_symbols=has_symbol,
            has_spaces=has_space,
            patterns_found=patterns,
            improvements=improvements,
            score=score,
        )

    def _classify_strength(
        self, entropy: float, length: int, patterns: list[str]
    ) -> PasswordStrength:
        # Penalize heavily for patterns
        if patterns and entropy < 40:
            return PasswordStrength.VERY_WEAK

        if entropy < 28:
            base_strength = PasswordStrength.VERY_WEAK
        elif entropy < 36:
            base_strength = PasswordStrength.WEAK
        elif entropy < 60:
            base_strength = PasswordStrength.MODERATE
        elif entropy < 80:
            base_strength = PasswordStrength.STRONG
        else:
            base_strength = PasswordStrength.VERY_STRONG

        penalty_steps = 0
        if length < 12:
            penalty_steps += 1
        if patterns:
            penalty_steps += 1

        return self._downgrade_strength(base_strength, penalty_steps)

    def _downgrade_strength(
        self, strength: PasswordStrength, penalty_steps: int
    ) -> PasswordStrength:
        """Apply classification penalties for short passwords and common patterns."""
        order = [
            PasswordStrength.VERY_WEAK,
            PasswordStrength.WEAK,
            PasswordStrength.MODERATE,
            PasswordStrength.STRONG,
            PasswordStrength.VERY_STRONG,
        ]
        index = order.index(strength)
        adjusted_index = max(0, index - penalty_steps)
        return order[adjusted_index]

    def _calculate_score(
        self,
        entropy: float,
        length: int,
        patterns: list[str],
        has_lower: bool,
        has_upper: bool,
        has_digit: bool,
        has_symbol: bool,
    ) -> int:
        score = min(int(entropy * 1.2), 80)  # Entropy contributes up to 80

        # Bonus for character variety
        variety = sum([has_lower, has_upper, has_digit, has_symbol])
        score += variety * 5  # Up to 20 bonus

        # Penalty for patterns
        score -= len(patterns) * 15

        return max(0, min(100, score))

    def _estimate_crack_time(self, charset_size: int, length: int) -> str:
        """Estimate crack time using RTX 4090 MD5 rate (worst case for defender)."""
        if length == 0:
            return "Instant"

        combinations = charset_size ** length
        # Use MD5 rate as worst case (fastest to crack)
        rate = GPU_HASH_RATES["MD5"]
        seconds = combinations / rate

        return _format_time_seconds(seconds)

    def _suggest_improvements(
        self,
        length: int,
        has_lower: bool,
        has_upper: bool,
        has_digit: bool,
        has_symbol: bool,
        patterns: list[str],
        entropy: float,
    ) -> list[str]:
        improvements: list[str] = []

        if length < 12:
            improvements.append(f"Increase length to at least 12 characters (currently {length})")
        if length < 16 and entropy < 60:
            improvements.append("Consider 16+ characters for sensitive accounts")
        if not has_upper:
            improvements.append("Add uppercase letters (A-Z)")
        if not has_lower:
            improvements.append("Add lowercase letters (a-z)")
        if not has_digit:
            improvements.append("Add numbers (0-9)")
        if not has_symbol:
            improvements.append("Add special characters (!@#$%^&*)")
        if patterns:
            improvements.append("Avoid common patterns (sequential chars, keyboard walks, dates)")

        improvements.append("Use a password manager to generate and store unique passwords")

        return improvements

    def format_analysis(self, result: PasswordAnalysis) -> str:
        """Format a PasswordAnalysis into a readable report."""
        strength_display = {
            PasswordStrength.VERY_WEAK: "[VERY WEAK]",
            PasswordStrength.WEAK: "[WEAK]",
            PasswordStrength.MODERATE: "[MODERATE]",
            PasswordStrength.STRONG: "[STRONG]",
            PasswordStrength.VERY_STRONG: "[VERY STRONG]",
        }

        lines = [
            "Password Strength Analysis",
            f"Length: {result.password_length} characters",
            f"Entropy: {result.entropy_bits} bits",
            f"Strength: {strength_display[result.strength]}",
            f"Score: {result.score}/100",
            f"Charset Size: {result.charset_size}",
            f"Estimated Crack Time (MD5, RTX 4090): {result.crack_time_display}",
            "",
            "Character Sets:",
            f"  Lowercase: {'Yes' if result.has_lowercase else 'No'}",
            f"  Uppercase: {'Yes' if result.has_uppercase else 'No'}",
            f"  Digits: {'Yes' if result.has_digits else 'No'}",
            f"  Symbols: {'Yes' if result.has_symbols else 'No'}",
        ]

        if result.patterns_found:
            lines.append("\nPatterns Detected:")
            for p in result.patterns_found:
                lines.append(f"  - {p}")

        if result.improvements:
            lines.append("\nImprovement Suggestions:")
            for imp in result.improvements:
                lines.append(f"  - {imp}")

        return "\n".join(lines)


def _format_time_seconds(seconds: float) -> str:
    """Format seconds into a human-readable time string."""
    if seconds < 0.001:
        return "Instant"
    if seconds < 1:
        return f"{seconds*1000:.0f} milliseconds"
    if seconds < 60:
        return f"{seconds:.1f} seconds"
    if seconds < 3600:
        return f"{seconds/60:.1f} minutes"
    if seconds < 86400:
        return f"{seconds/3600:.1f} hours"
    if seconds < 86400 * 365:
        return f"{seconds/86400:.0f} days"
    if seconds < 86400 * 365 * 1000:
        return f"{seconds/(86400*365):.0f} years"
    if seconds < 86400 * 365 * 1e6:
        return f"{seconds/(86400*365*1000):.0f} thousand years"
    if seconds < 86400 * 365 * 1e9:
        return f"{seconds/(86400*365*1e6):.0f} million years"
    return f"{seconds/(86400*365*1e9):.0f} billion years"
