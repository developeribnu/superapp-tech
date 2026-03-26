"""
CYBERSEC AI v4.0 - Attack Frameworks Knowledge Base
Provides MITRE ATT&CK and Cyber Kill Chain framework data for AI context.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class KillChainPhase:
    order: int
    name: str
    description: str
    attacker_actions: list[str]
    defender_actions: list[str]
    tools: list[str] = field(default_factory=list)


# Lockheed Martin Cyber Kill Chain
CYBER_KILL_CHAIN: list[KillChainPhase] = [
    KillChainPhase(
        order=1,
        name="Reconnaissance",
        description="Attacker identifies and selects targets, researching them via public information.",
        attacker_actions=[
            "OSINT gathering (social media, websites)",
            "Email harvesting",
            "Network scanning (Shodan, Censys)",
            "Technology stack identification",
        ],
        defender_actions=[
            "Minimize public exposure of sensitive info",
            "Monitor for organizational mentions on paste sites",
            "Web application firewall (WAF)",
            "Employee security awareness training",
        ],
        tools=["Maltego", "theHarvester", "Shodan", "Recon-ng"],
    ),
    KillChainPhase(
        order=2,
        name="Weaponization",
        description="Attacker creates a deliverable payload (e.g., malicious document, exploit kit).",
        attacker_actions=[
            "Create malicious documents (macro-enabled)",
            "Develop custom exploit code",
            "Build C2 infrastructure",
            "Prepare phishing campaigns",
        ],
        defender_actions=[
            "Threat intelligence to understand adversary tools",
            "YARA rules for known payloads",
            "Sandbox analysis of suspicious files",
        ],
        tools=["Metasploit", "Cobalt Strike", "msfvenom"],
    ),
    KillChainPhase(
        order=3,
        name="Delivery",
        description="Attacker transmits the weapon to the target (email, web, USB).",
        attacker_actions=[
            "Spear-phishing emails with attachments",
            "Watering hole attacks (compromised websites)",
            "USB drop attacks",
            "Supply chain compromise",
        ],
        defender_actions=[
            "Email filtering (SPF, DKIM, DMARC)",
            "URL filtering and sandboxing",
            "User awareness training",
            "Endpoint detection and response (EDR)",
        ],
        tools=["GoPhish", "SET (Social Engineering Toolkit)"],
    ),
    KillChainPhase(
        order=4,
        name="Exploitation",
        description="Attacker triggers the exploit to gain code execution on the target.",
        attacker_actions=[
            "Exploit software vulnerability (CVE)",
            "Execute malicious macro/script",
            "Browser exploit kit",
            "Zero-day exploitation",
        ],
        defender_actions=[
            "Patch management (timely updates)",
            "Endpoint protection / antivirus",
            "Application whitelisting",
            "DEP, ASLR, CFG enabled",
        ],
        tools=["Metasploit", "ExploitDB", "Cobalt Strike"],
    ),
    KillChainPhase(
        order=5,
        name="Installation",
        description="Attacker installs a persistent backdoor or malware on the target system.",
        attacker_actions=[
            "Install RAT (Remote Access Trojan)",
            "Create persistent backdoor (registry, cron, service)",
            "Web shell deployment",
            "Rootkit installation",
        ],
        defender_actions=[
            "Endpoint detection and response (EDR)",
            "File integrity monitoring",
            "Application whitelisting",
            "Behavioral analysis",
        ],
        tools=["Meterpreter", "Covenant", "Empire"],
    ),
    KillChainPhase(
        order=6,
        name="Command and Control (C2)",
        description="Attacker establishes a channel to remotely control the compromised system.",
        attacker_actions=[
            "HTTP/HTTPS beaconing to C2 server",
            "DNS tunneling for covert communication",
            "Social media C2 channels",
            "Encrypted C2 traffic",
        ],
        defender_actions=[
            "Network traffic analysis",
            "DNS monitoring for anomalies",
            "Block known C2 infrastructure (threat intel)",
            "Network segmentation",
        ],
        tools=["Cobalt Strike", "Sliver", "Mythic"],
    ),
    KillChainPhase(
        order=7,
        name="Actions on Objectives",
        description="Attacker achieves their goal — data theft, destruction, ransomware, etc.",
        attacker_actions=[
            "Data exfiltration",
            "Ransomware deployment",
            "Lateral movement to other systems",
            "Credential harvesting",
            "Sabotage / destruction",
        ],
        defender_actions=[
            "Data Loss Prevention (DLP)",
            "Network segmentation (limit lateral movement)",
            "Backup and recovery (3-2-1 rule)",
            "Incident response plan execution",
            "Forensic investigation",
        ],
        tools=["Mimikatz", "BloodHound", "Impacket"],
    ),
]


class MitreAttackKB:
    """MITRE ATT&CK and Cyber Kill Chain knowledge base."""

    def __init__(self) -> None:
        self._kill_chain = CYBER_KILL_CHAIN

    def get_kill_chain(self) -> list[KillChainPhase]:
        return self._kill_chain

    def get_phase(self, phase_name: str) -> KillChainPhase | None:
        for phase in self._kill_chain:
            if phase.name.lower() == phase_name.lower():
                return phase
        return None

    def get_summary(self) -> str:
        """Get a condensed summary for AI context."""
        lines = ["Cyber Kill Chain (Lockheed Martin):"]
        for phase in self._kill_chain:
            lines.append(f"  {phase.order}. {phase.name}")
            lines.append(f"     {phase.description[:100]}")
        return "\n".join(lines)

    def format_phase(self, phase: KillChainPhase) -> str:
        """Format a kill chain phase into a detailed summary."""
        lines = [
            f"Kill Chain Phase {phase.order}: {phase.name}",
            f"Description: {phase.description}",
            "",
            "Attacker Actions:",
        ]
        for a in phase.attacker_actions:
            lines.append(f"  [ATK] {a}")

        lines.append("\nDefender Actions:")
        for d in phase.defender_actions:
            lines.append(f"  [DEF] {d}")

        if phase.tools:
            lines.append(f"\nCommon Tools: {', '.join(phase.tools)}")

        return "\n".join(lines)

    def format_full_killchain(self) -> str:
        """Format the entire kill chain for educational display."""
        lines = ["Lockheed Martin Cyber Kill Chain:", "=" * 40]
        for phase in self._kill_chain:
            lines.append(f"\n{phase.order}. {phase.name}")
            lines.append(f"   {phase.description}")
            lines.append(f"   Attack: {phase.attacker_actions[0]}")
            lines.append(f"   Defend: {phase.defender_actions[0]}")
        return "\n".join(lines)
