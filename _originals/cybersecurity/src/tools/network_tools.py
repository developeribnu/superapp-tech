"""
CYBERSEC AI v4.0 - Network Tools
Provides network reconnaissance utilities including port service identification,
common port security analysis, and network scan result interpretation.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum


class PortRisk(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"


@dataclass
class PortInfo:
    port: int
    service: str
    protocol: str
    risk_if_exposed: PortRisk
    description: str
    security_notes: list[str] = field(default_factory=list)
    mitigations: list[str] = field(default_factory=list)


# Common ports and their security implications
COMMON_PORTS: dict[int, PortInfo] = {
    21: PortInfo(
        port=21, service="FTP", protocol="TCP",
        risk_if_exposed=PortRisk.HIGH,
        description="File Transfer Protocol - unencrypted file transfer",
        security_notes=[
            "Transmits credentials in plaintext",
            "Susceptible to brute force and sniffing",
            "Anonymous FTP can leak sensitive files",
        ],
        mitigations=[
            "Replace with SFTP (SSH File Transfer) on port 22",
            "If FTP required, use FTPS (FTP over TLS)",
            "Disable anonymous access",
            "Restrict with firewall rules",
        ],
    ),
    22: PortInfo(
        port=22, service="SSH", protocol="TCP",
        risk_if_exposed=PortRisk.MEDIUM,
        description="Secure Shell - encrypted remote access",
        security_notes=[
            "Common target for brute force attacks",
            "Key-based auth is more secure than passwords",
        ],
        mitigations=[
            "Use key-based authentication only",
            "Disable root login (PermitRootLogin no)",
            "Use fail2ban or similar rate limiting",
            "Consider non-standard port (security through obscurity, limited value)",
            "Restrict source IPs via firewall",
        ],
    ),
    23: PortInfo(
        port=23, service="Telnet", protocol="TCP",
        risk_if_exposed=PortRisk.CRITICAL,
        description="Telnet - unencrypted remote access (LEGACY)",
        security_notes=[
            "ALL data transmitted in plaintext including passwords",
            "No encryption whatsoever",
            "Actively targeted by botnets (Mirai)",
        ],
        mitigations=[
            "DISABLE IMMEDIATELY - Replace with SSH",
            "No legitimate reason to expose Telnet in 2026",
            "Block port 23 at the firewall",
        ],
    ),
    25: PortInfo(
        port=25, service="SMTP", protocol="TCP",
        risk_if_exposed=PortRisk.MEDIUM,
        description="Simple Mail Transfer Protocol",
        security_notes=[
            "Can be abused for spam relay if misconfigured",
            "Open relays are actively scanned for",
        ],
        mitigations=[
            "Disable open relay",
            "Require authentication (SMTP AUTH)",
            "Use STARTTLS for encryption",
            "Implement SPF, DKIM, DMARC",
        ],
    ),
    53: PortInfo(
        port=53, service="DNS", protocol="TCP/UDP",
        risk_if_exposed=PortRisk.MEDIUM,
        description="Domain Name System",
        security_notes=[
            "DNS amplification attacks if open resolver",
            "DNS cache poisoning risks",
            "DNS tunneling for data exfiltration",
        ],
        mitigations=[
            "Disable recursive queries for external clients",
            "Implement DNSSEC",
            "Monitor for DNS tunneling patterns",
            "Rate limit DNS responses",
        ],
    ),
    80: PortInfo(
        port=80, service="HTTP", protocol="TCP",
        risk_if_exposed=PortRisk.MEDIUM,
        description="Hypertext Transfer Protocol (unencrypted)",
        security_notes=[
            "Traffic is unencrypted and can be intercepted",
            "Subject to OWASP Top 10 vulnerabilities",
        ],
        mitigations=[
            "Redirect all HTTP to HTTPS (port 443)",
            "Implement HSTS headers",
            "Use a WAF (Web Application Firewall)",
        ],
    ),
    443: PortInfo(
        port=443, service="HTTPS", protocol="TCP",
        risk_if_exposed=PortRisk.LOW,
        description="HTTP over TLS - encrypted web traffic",
        security_notes=[
            "Still subject to web application vulnerabilities",
            "TLS configuration must be kept current",
        ],
        mitigations=[
            "Use TLS 1.3 (disable TLS 1.0/1.1)",
            "Strong cipher suites only",
            "Regular certificate rotation",
            "Implement CSP, HSTS headers",
        ],
    ),
    445: PortInfo(
        port=445, service="SMB", protocol="TCP",
        risk_if_exposed=PortRisk.CRITICAL,
        description="Server Message Block - Windows file sharing",
        security_notes=[
            "EternalBlue exploit (WannaCry ransomware) targets SMB",
            "Common lateral movement vector",
            "Should NEVER be exposed to the internet",
        ],
        mitigations=[
            "Block port 445 at the perimeter firewall",
            "Disable SMBv1 completely",
            "Use SMBv3 with encryption",
            "Patch MS17-010 and keep systems updated",
        ],
    ),
    1433: PortInfo(
        port=1433, service="MSSQL", protocol="TCP",
        risk_if_exposed=PortRisk.CRITICAL,
        description="Microsoft SQL Server",
        security_notes=[
            "Direct database access if exposed",
            "Brute force and SQL injection targets",
            "Default SA account often has weak passwords",
        ],
        mitigations=[
            "Never expose directly to internet",
            "Use VPN or SSH tunnel for remote access",
            "Disable SA account",
            "Use Windows Authentication mode",
        ],
    ),
    3306: PortInfo(
        port=3306, service="MySQL", protocol="TCP",
        risk_if_exposed=PortRisk.CRITICAL,
        description="MySQL Database Server",
        security_notes=[
            "Direct database access if exposed",
            "Common target for brute force",
            "Data exfiltration risk",
        ],
        mitigations=[
            "Bind to localhost (127.0.0.1) only",
            "Use SSH tunnel for remote access",
            "Strong authentication required",
            "Restrict with firewall rules",
        ],
    ),
    3389: PortInfo(
        port=3389, service="RDP", protocol="TCP",
        risk_if_exposed=PortRisk.CRITICAL,
        description="Remote Desktop Protocol - Windows remote access",
        security_notes=[
            "Primary target for ransomware operators",
            "BlueKeep (CVE-2019-0708) and similar RCE vulns",
            "Brute force attacks are extremely common",
            "Credential stuffing with leaked passwords",
        ],
        mitigations=[
            "Never expose RDP directly to the internet",
            "Use VPN or Azure Bastion for remote access",
            "Enable Network Level Authentication (NLA)",
            "Use MFA for all RDP sessions",
            "Implement account lockout policies",
        ],
    ),
    5432: PortInfo(
        port=5432, service="PostgreSQL", protocol="TCP",
        risk_if_exposed=PortRisk.CRITICAL,
        description="PostgreSQL Database Server",
        security_notes=[
            "Direct database access if exposed",
            "SQL injection and brute force targets",
        ],
        mitigations=[
            "Bind to localhost only",
            "Use pg_hba.conf for access control",
            "Require SSL connections",
            "Use SSH tunnel for remote administration",
        ],
    ),
    8080: PortInfo(
        port=8080, service="HTTP Proxy/Alt", protocol="TCP",
        risk_if_exposed=PortRisk.MEDIUM,
        description="Alternative HTTP / Web proxy",
        security_notes=[
            "Often used for development servers left exposed",
            "Admin panels and management interfaces",
            "Proxy misconfigurations can leak internal traffic",
        ],
        mitigations=[
            "Same protections as port 80/443",
            "Restrict access to authorized users",
            "Never expose development servers",
        ],
    ),
    27017: PortInfo(
        port=27017, service="MongoDB", protocol="TCP",
        risk_if_exposed=PortRisk.CRITICAL,
        description="MongoDB NoSQL Database",
        security_notes=[
            "Historically shipped with no authentication by default",
            "Thousands of exposed MongoDB instances on Shodan",
            "Direct data access without credentials (if misconfigured)",
        ],
        mitigations=[
            "Enable authentication (--auth flag)",
            "Bind to localhost only",
            "Use TLS/SSL for connections",
            "Never expose to internet",
        ],
    ),
}


class NetworkTools:
    """Network analysis utilities for port and service identification."""

    def get_port_info(self, port: int) -> PortInfo | None:
        """Get security information for a specific port."""
        return COMMON_PORTS.get(port)

    def analyze_open_ports(self, ports: list[int]) -> list[PortInfo]:
        """Analyze a list of open ports and return security assessments."""
        results = []
        for port in ports:
            info = COMMON_PORTS.get(port)
            if info:
                results.append(info)
            else:
                results.append(
                    PortInfo(
                        port=port,
                        service="Unknown",
                        protocol="TCP",
                        risk_if_exposed=PortRisk.INFO,
                        description=f"Unknown service on port {port}",
                        security_notes=["Service not in common ports database"],
                        mitigations=["Investigate what service is running", "Close if not needed"],
                    )
                )
        return results

    def get_critical_ports(self) -> list[PortInfo]:
        """Return all ports that should never be exposed to the internet."""
        return [p for p in COMMON_PORTS.values() if p.risk_if_exposed == PortRisk.CRITICAL]

    def format_scan_results(self, ports: list[PortInfo]) -> str:
        """Format port analysis into a readable report."""
        if not ports:
            return "No open ports detected."

        risk_icon = {
            PortRisk.CRITICAL: "[CRITICAL]",
            PortRisk.HIGH: "[HIGH]",
            PortRisk.MEDIUM: "[MEDIUM]",
            PortRisk.LOW: "[LOW]",
            PortRisk.INFO: "[INFO]",
        }

        lines = [f"Port Scan Analysis ({len(ports)} ports):"]
        for p in sorted(ports, key=lambda x: x.port):
            icon = risk_icon.get(p.risk_if_exposed, "[?]")
            lines.append(f"\n  Port {p.port}/{p.protocol} - {p.service} {icon}")
            lines.append(f"    {p.description}")
            if p.security_notes:
                for note in p.security_notes:
                    lines.append(f"    Warning: {note}")
            if p.mitigations:
                lines.append("    Mitigations:")
                for m in p.mitigations:
                    lines.append(f"      - {m}")

        return "\n".join(lines)
