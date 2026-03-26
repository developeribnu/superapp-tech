"""
CYBERSEC AI v4.0 - Certification Knowledge Base
Provides detailed information about cybersecurity certification paths
from foundation (Security+) to expert (CISSP) level.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Certification:
    id: str
    name: str
    short_name: str
    level: str  # foundation, intermediate, advanced, expert
    provider: str
    cost_estimate: str
    exam_format: str
    study_time: str
    prerequisites: list[str]
    key_domains: list[str]
    career_roles: list[str]
    salary_range: str
    study_resources: list[str]
    tips: list[str] = field(default_factory=list)


CERTIFICATIONS: list[Certification] = [
    Certification(
        id="security_plus",
        name="CompTIA Security+",
        short_name="Security+",
        level="foundation",
        provider="CompTIA",
        cost_estimate="~$370 (exam only)",
        exam_format="90 questions (multiple choice + PBQ), 90 minutes",
        study_time="3-6 months",
        prerequisites=["CompTIA Network+ recommended but not required", "Basic IT knowledge"],
        key_domains=[
            "Threats, Attacks, and Vulnerabilities (24%)",
            "Architecture and Design (21%)",
            "Implementation (25%)",
            "Operations and Incident Response (16%)",
            "Governance, Risk, and Compliance (14%)",
        ],
        career_roles=[
            "SOC Analyst (Tier 1)",
            "Security Administrator",
            "IT Security Specialist",
            "Help Desk (Security focus)",
        ],
        salary_range="$60K-$85K USD",
        study_resources=[
            "Professor Messer Security+ (free YouTube)",
            "CompTIA CertMaster Labs",
            "Jason Dion Practice Exams (Udemy)",
            "Book: CompTIA Security+ Get Certified Get Ahead (Darril Gibson)",
        ],
        tips=[
            "Focus on understanding concepts, not memorization",
            "Performance-Based Questions (PBQs) are lab-style - practice hands-on",
            "The exam is vendor-neutral - learn concepts, not specific products",
        ],
    ),
    Certification(
        id="ceh",
        name="Certified Ethical Hacker",
        short_name="CEH",
        level="intermediate",
        provider="EC-Council",
        cost_estimate="~$950 (exam) + $850 (official course)",
        exam_format="125 questions, 4 hours",
        study_time="6-12 months",
        prerequisites=[
            "2 years IT security experience OR EC-Council official training",
            "Security+ or equivalent knowledge",
        ],
        key_domains=[
            "Information Security and Ethical Hacking (6%)",
            "Reconnaissance Techniques (21%)",
            "System Hacking Phases and Attack Techniques (17%)",
            "Network and Perimeter Hacking (14%)",
            "Web Application Hacking (16%)",
            "Wireless Network Hacking (6%)",
            "Mobile Platform, IoT, and OT Hacking (8%)",
            "Cloud Computing and Cryptography (12%)",
        ],
        career_roles=[
            "Penetration Tester (Junior)",
            "Security Consultant",
            "Vulnerability Analyst",
            "Security Engineer",
        ],
        salary_range="$80K-$120K USD",
        study_resources=[
            "EC-Council Official Courseware (iLabs)",
            "Matt Walker CEH All-in-One Exam Guide",
            "TryHackMe CEH Prep Path",
            "Udemy: CEH v12 courses",
        ],
        tips=[
            "CEH Practical (optional) is highly valued - it's hands-on",
            "Practice with Metasploit, Nmap, Burp Suite, Wireshark",
            "Focus on tool-specific knowledge - CEH tests specific tool usage",
        ],
    ),
    Certification(
        id="oscp",
        name="Offensive Security Certified Professional",
        short_name="OSCP",
        level="advanced",
        provider="Offensive Security (OffSec)",
        cost_estimate="~$1,649 (Learn One bundle with lab access)",
        exam_format="24-hour hands-on practical exam + report",
        study_time="6-12 months (intensive)",
        prerequisites=[
            "Strong Linux command line skills",
            "Networking fundamentals (TCP/IP)",
            "Basic scripting (Python/Bash)",
            "100+ HackTheBox/TryHackMe machines recommended",
        ],
        key_domains=[
            "Information Gathering and Enumeration",
            "Vulnerability Scanning and Analysis",
            "Web Application Attacks",
            "Buffer Overflow Exploitation",
            "Client-Side Attacks",
            "Privilege Escalation (Linux & Windows)",
            "Password Attacks",
            "Port Redirection and Tunneling",
            "Active Directory Attacks",
        ],
        career_roles=[
            "Senior Penetration Tester",
            "Red Team Operator",
            "Security Consultant (Senior)",
            "Offensive Security Engineer",
        ],
        salary_range="$120K-$200K+ USD",
        study_resources=[
            "PWK (Penetration Testing with Kali Linux) Course",
            "OffSec Lab Environment (90 days included)",
            "TJ Null's OSCP-like HackTheBox list",
            "IppSec YouTube (HTB walkthroughs)",
            "Proving Grounds Practice",
        ],
        tips=[
            "Try Harder - the OSCP mentality requires persistence",
            "Document everything - the report is mandatory for passing",
            "Master methodology: enumerate, enumerate, enumerate",
            "Practice Active Directory attacks thoroughly",
            "Time management in the 24-hour exam is critical",
        ],
    ),
    Certification(
        id="cissp",
        name="Certified Information Systems Security Professional",
        short_name="CISSP",
        level="expert",
        provider="(ISC)2",
        cost_estimate="~$749 (exam only)",
        exam_format="100-150 questions (CAT), 4 hours",
        study_time="3-6 months (with 5+ years experience)",
        prerequisites=[
            "5 years cumulative paid experience in 2+ of the 8 CISSP domains",
            "Associate of (ISC)2 option available without experience",
        ],
        key_domains=[
            "Security and Risk Management (15%)",
            "Asset Security (10%)",
            "Security Architecture and Engineering (13%)",
            "Communication and Network Security (13%)",
            "Identity and Access Management (IAM) (13%)",
            "Security Assessment and Testing (12%)",
            "Security Operations (13%)",
            "Software Development Security (11%)",
        ],
        career_roles=[
            "CISO (Chief Information Security Officer)",
            "Security Director",
            "Security Architect",
            "IT Security Manager",
            "Security Program Manager",
        ],
        salary_range="$130K-$250K+ USD",
        study_resources=[
            "Official (ISC)2 CISSP Study Guide (Sybex)",
            "Destination CISSP by Rob Witcher (YouTube/Podcast)",
            "Boson Practice Exams",
            "CISSP All-in-One Exam Guide (Shon Harris / Fernando Maymi)",
            "Sunflower CISSP Summary PDF",
        ],
        tips=[
            "Think like a manager/CISO, not a technician",
            "Focus on understanding WHY, not just HOW",
            "The CAT (Computer Adaptive Testing) means harder questions = doing well",
            "Read questions carefully - there are often two 'right' answers, pick the BEST",
            "CPE credits required to maintain certification (40/year)",
        ],
    ),
]


class CertificationKB:
    """Certification knowledge base for career guidance."""

    def __init__(self) -> None:
        self._certs = {c.id: c for c in CERTIFICATIONS}
        self._by_shortname = {c.short_name.lower(): c for c in CERTIFICATIONS}

    def get_certification(self, cert_id: str) -> Certification | None:
        """Get certification by ID or short name."""
        return self._certs.get(cert_id) or self._by_shortname.get(cert_id.lower())

    def get_all(self) -> list[Certification]:
        return CERTIFICATIONS

    def get_by_level(self, level: str) -> list[Certification]:
        return [c for c in CERTIFICATIONS if c.level == level]

    def get_progression_path(self) -> list[Certification]:
        """Return the recommended certification progression."""
        order = ["foundation", "intermediate", "advanced", "expert"]
        return sorted(CERTIFICATIONS, key=lambda c: order.index(c.level))

    def get_summary(self) -> str:
        """Get a condensed summary for AI context."""
        lines = ["Cybersecurity Certification Paths:"]
        for cert in self.get_progression_path():
            lines.append(
                f"  [{cert.level.upper()}] {cert.short_name} ({cert.provider})"
            )
            lines.append(f"    Cost: {cert.cost_estimate} | Time: {cert.study_time}")
            lines.append(f"    Salary Range: {cert.salary_range}")
        return "\n".join(lines)

    def format_certification(self, cert: Certification) -> str:
        """Format a certification into a detailed readable summary."""
        lines = [
            f"Certification: {cert.name} ({cert.short_name})",
            f"Level: {cert.level.title()}",
            f"Provider: {cert.provider}",
            f"Cost: {cert.cost_estimate}",
            f"Exam: {cert.exam_format}",
            f"Study Time: {cert.study_time}",
            "",
            "Prerequisites:",
        ]
        for p in cert.prerequisites:
            lines.append(f"  - {p}")

        lines.append("\nKey Domains:")
        for d in cert.key_domains:
            lines.append(f"  - {d}")

        lines.append("\nCareer Roles:")
        for r in cert.career_roles:
            lines.append(f"  - {r}")

        lines.append(f"\nSalary Range: {cert.salary_range}")

        lines.append("\nStudy Resources:")
        for s in cert.study_resources:
            lines.append(f"  - {s}")

        if cert.tips:
            lines.append("\nTips:")
            for t in cert.tips:
                lines.append(f"  - {t}")

        return "\n".join(lines)
