"""
CYBERSEC AI v4.0 - MITRE ATT&CK Mapper
Maps threat activities to the MITRE ATT&CK framework with 14 tactics
and 200+ techniques for standardized threat classification.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class AttackTechnique:
    technique_id: str
    name: str
    tactic: str
    tactic_id: str
    description: str = ""
    platforms: list[str] = field(default_factory=list)
    data_sources: list[str] = field(default_factory=list)
    mitigations: list[str] = field(default_factory=list)


# Core MITRE ATT&CK tactics (Enterprise)
TACTICS: dict[str, str] = {
    "TA0043": "Reconnaissance",
    "TA0042": "Resource Development",
    "TA0001": "Initial Access",
    "TA0002": "Execution",
    "TA0003": "Persistence",
    "TA0004": "Privilege Escalation",
    "TA0005": "Defense Evasion",
    "TA0006": "Credential Access",
    "TA0007": "Discovery",
    "TA0008": "Lateral Movement",
    "TA0009": "Collection",
    "TA0011": "Command and Control",
    "TA0010": "Exfiltration",
    "TA0040": "Impact",
}

# Commonly referenced techniques (representative subset)
TECHNIQUES: dict[str, AttackTechnique] = {
    "T1190": AttackTechnique(
        technique_id="T1190",
        name="Exploit Public-Facing Application",
        tactic="Initial Access",
        tactic_id="TA0001",
        description="Adversaries may exploit vulnerabilities in internet-facing applications.",
        platforms=["Linux", "Windows", "macOS", "Containers"],
        mitigations=["Application Isolation", "Exploit Protection", "Network Segmentation", "Update Software"],
    ),
    "T1566": AttackTechnique(
        technique_id="T1566",
        name="Phishing",
        tactic="Initial Access",
        tactic_id="TA0001",
        description="Adversaries send phishing messages to gain access to victim systems.",
        platforms=["Linux", "Windows", "macOS", "SaaS", "Office 365", "Google Workspace"],
        mitigations=["User Training", "Antivirus", "Network Intrusion Prevention"],
    ),
    "T1059": AttackTechnique(
        technique_id="T1059",
        name="Command and Scripting Interpreter",
        tactic="Execution",
        tactic_id="TA0002",
        description="Adversaries abuse command and script interpreters to execute commands.",
        platforms=["Linux", "Windows", "macOS"],
        mitigations=["Code Signing", "Disable or Remove Feature or Program", "Execution Prevention"],
    ),
    "T1078": AttackTechnique(
        technique_id="T1078",
        name="Valid Accounts",
        tactic="Persistence",
        tactic_id="TA0003",
        description="Adversaries obtain and abuse credentials of existing accounts.",
        platforms=["Linux", "Windows", "macOS", "Azure AD", "AWS", "GCP"],
        mitigations=["MFA", "Password Policies", "Privileged Account Management"],
    ),
    "T1068": AttackTechnique(
        technique_id="T1068",
        name="Exploitation for Privilege Escalation",
        tactic="Privilege Escalation",
        tactic_id="TA0004",
        description="Adversaries exploit software vulnerabilities to escalate privileges.",
        platforms=["Linux", "Windows", "macOS"],
        mitigations=["Exploit Protection", "Update Software", "Threat Intelligence Program"],
    ),
    "T1486": AttackTechnique(
        technique_id="T1486",
        name="Data Encrypted for Impact",
        tactic="Impact",
        tactic_id="TA0040",
        description="Adversaries encrypt data on target systems to interrupt availability (ransomware).",
        platforms=["Linux", "Windows", "macOS"],
        mitigations=["Data Backup", "Behavior Prevention on Endpoint"],
    ),
    "T1071": AttackTechnique(
        technique_id="T1071",
        name="Application Layer Protocol",
        tactic="Command and Control",
        tactic_id="TA0011",
        description="Adversaries communicate using OSI application layer protocols to avoid detection.",
        platforms=["Linux", "Windows", "macOS"],
        mitigations=["Network Intrusion Prevention", "Filter Network Traffic"],
    ),
    "T1110": AttackTechnique(
        technique_id="T1110",
        name="Brute Force",
        tactic="Credential Access",
        tactic_id="TA0006",
        description="Adversaries use brute force techniques to gain access to accounts.",
        platforms=["Linux", "Windows", "macOS", "Azure AD", "Office 365"],
        mitigations=["Account Lockout Policies", "MFA", "Password Policies"],
    ),
    "T1055": AttackTechnique(
        technique_id="T1055",
        name="Process Injection",
        tactic="Defense Evasion",
        tactic_id="TA0005",
        description="Adversaries inject code into processes to evade defenses and elevate privileges.",
        platforms=["Linux", "Windows", "macOS"],
        mitigations=["Behavior Prevention on Endpoint", "Privileged Account Management"],
    ),
    "T1027": AttackTechnique(
        technique_id="T1027",
        name="Obfuscated Files or Information",
        tactic="Defense Evasion",
        tactic_id="TA0005",
        description="Adversaries obfuscate payloads to make detection and analysis more difficult.",
        platforms=["Linux", "Windows", "macOS"],
        mitigations=["Antivirus", "Behavior Prevention on Endpoint"],
    ),
}


class MitreAttackMapper:
    """Maps threats, CVEs, and attack descriptions to MITRE ATT&CK techniques."""

    def __init__(self) -> None:
        self._tactics = TACTICS
        self._techniques = TECHNIQUES

    def get_tactic(self, tactic_id: str) -> str | None:
        return self._tactics.get(tactic_id)

    def get_technique(self, technique_id: str) -> AttackTechnique | None:
        return self._techniques.get(technique_id)

    def map_keywords_to_techniques(self, text: str) -> list[AttackTechnique]:
        """Map keywords in text to relevant ATT&CK techniques."""
        lower_text = text.lower()
        keyword_map: dict[str, list[str]] = {
            "phishing": ["T1566"],
            "sql injection": ["T1190"],
            "exploit": ["T1190", "T1068"],
            "ransomware": ["T1486"],
            "brute force": ["T1110"],
            "credential": ["T1078", "T1110"],
            "command injection": ["T1059"],
            "privilege escalation": ["T1068"],
            "process injection": ["T1055"],
            "obfusc": ["T1027"],
            "c2": ["T1071"],
            "command and control": ["T1071"],
            "lateral movement": ["T1078"],
            "valid account": ["T1078"],
        }

        matched_ids: set[str] = set()
        for keyword, technique_ids in keyword_map.items():
            if keyword in lower_text:
                matched_ids.update(technique_ids)

        return [self._techniques[tid] for tid in matched_ids if tid in self._techniques]

    def format_technique_summary(self, technique: AttackTechnique) -> str:
        """Format a single technique into a readable summary."""
        lines = [
            f"MITRE ATT&CK: {technique.technique_id} - {technique.name}",
            f"  Tactic: {technique.tactic} ({technique.tactic_id})",
            f"  Description: {technique.description}",
        ]
        if technique.platforms:
            lines.append(f"  Platforms: {', '.join(technique.platforms)}")
        if technique.mitigations:
            lines.append(f"  Mitigations: {', '.join(technique.mitigations)}")
        return "\n".join(lines)

    def format_killchain(self, techniques: list[AttackTechnique]) -> str:
        """Format multiple techniques as a kill chain progression."""
        if not techniques:
            return "No MITRE ATT&CK techniques identified."

        # Sort by tactic order
        tactic_order = list(TACTICS.keys())
        techniques_sorted = sorted(
            techniques,
            key=lambda t: tactic_order.index(t.tactic_id)
            if t.tactic_id in tactic_order
            else 999,
        )

        lines = ["MITRE ATT&CK Kill Chain Mapping:"]
        for t in techniques_sorted:
            lines.append(f"  [{t.tactic_id}] {t.tactic}")
            lines.append(f"    -> {t.technique_id}: {t.name}")
            if t.mitigations:
                lines.append(f"       Mitigate: {', '.join(t.mitigations[:3])}")

        return "\n".join(lines)
