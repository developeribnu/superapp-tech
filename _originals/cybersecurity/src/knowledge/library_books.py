"""
Cybersec Knowledge Base - Curated Library Catalog
Provides a lightweight catalog used by the public-facing library page.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class LibraryBook:
    slug: str
    title: str
    author: str
    year: int
    category: str
    level: str
    format_label: str
    focus: str
    cover_code: str
    accent: str
    summary: str
    tags: tuple[str, ...]
    takeaways: tuple[str, ...]
    related_endpoint: str
    related_label: str
    featured: bool = False
    asset_url: str | None = None
    asset_label: str | None = None
    asset_type: str | None = None

    def to_dict(self) -> dict[str, object]:
        return {
            "slug": self.slug,
            "title": self.title,
            "author": self.author,
            "year": self.year,
            "category": self.category,
            "level": self.level,
            "format_label": self.format_label,
            "focus": self.focus,
            "cover_code": self.cover_code,
            "accent": self.accent,
            "summary": self.summary,
            "tags": list(self.tags),
            "takeaways": list(self.takeaways),
            "related_endpoint": self.related_endpoint,
            "related_label": self.related_label,
            "featured": self.featured,
            "asset_url": self.asset_url,
            "asset_label": self.asset_label,
            "asset_type": self.asset_type,
        }


LIBRARY_BOOKS: list[LibraryBook] = [
    LibraryBook(
        slug="comptia-security-plus-study-guide",
        title="CompTIA Security+ Study Guide",
        author="Mike Chapple & David Seidl",
        year=2023,
        category="Foundations",
        level="Beginner",
        format_label="Study Guide",
        focus="Security fundamentals and certification prep",
        cover_code="SEC+",
        accent="signal-cyan",
        summary=(
            "A structured on-ramp for analysts and early-career engineers who need "
            "solid coverage of core security concepts before going deeper."
        ),
        tags=("Certification", "Security+", "Foundations"),
        takeaways=(
            "Build a vocabulary for threats, controls, and governance.",
            "Map exam domains to real security operations work.",
            "Use it as the baseline before branching into blue team or appsec.",
        ),
        related_endpoint="/api/v1/knowledge/certifications",
        related_label="Certification progression path",
        featured=True,
    ),
    LibraryBook(
        slug="ccsp-all-in-one-exam-guide",
        title="CCSP All-in-One Exam Guide",
        author="Daniel Carter",
        year=2022,
        category="Cloud Security",
        level="Advanced",
        format_label="Exam Guide",
        focus="Cloud security architecture, governance, and certification prep",
        cover_code="CCSP",
        accent="signal-cyan",
        summary=(
            "A cloud-security-focused certification guide covering architecture, data "
            "protection, platform security, and governance across modern cloud environments."
        ),
        tags=("CCSP", "Cloud", "Certification"),
        takeaways=(
            "Map cloud controls to architecture, operations, and governance decisions.",
            "Use certification structure to organize deeper cloud security study.",
            "Connect identity, data protection, and shared responsibility into one model.",
        ),
        related_endpoint="/api/v1/knowledge/certifications",
        related_label="Certification progression path",
        asset_url=(
            "/static/library-files/"
            "ccsp-certified-cloud-security-professional-all-in-one-exam-guide-3rd-ed.pdf"
        ),
        asset_label="Open PDF",
        asset_type="PDF",
    ),
    LibraryBook(
        slug="real-world-bug-hunting",
        title="Real-World Bug Hunting",
        author="Peter Yaworski",
        year=2019,
        category="AppSec",
        level="Intermediate",
        format_label="Field Guide",
        focus="Finding exploitable web flaws in production systems",
        cover_code="BUG",
        accent="ember",
        summary=(
            "A concise guide to the mindset and workflow behind web bug hunting, "
            "with a strong emphasis on practical testing heuristics."
        ),
        tags=("Bug Bounty", "Web", "Methodology"),
        takeaways=(
            "Prioritize business logic flaws, not just scanner output.",
            "Use repeatable recon and triage habits during testing.",
            "Translate findings into impact that developers understand.",
        ),
        related_endpoint="/api/v1/knowledge/owasp",
        related_label="OWASP category reference",
        featured=True,
    ),
    LibraryBook(
        slug="the-web-application-hackers-handbook",
        title="The Web Application Hacker's Handbook",
        author="Dafydd Stuttard & Marcus Pinto",
        year=2011,
        category="AppSec",
        level="Advanced",
        format_label="Reference",
        focus="Deep web exploitation and manual assessment workflows",
        cover_code="WAH",
        accent="cobalt",
        summary=(
            "Still one of the best deep references for manual web application testing, "
            "covering auth, session management, input handling, and exploitation paths."
        ),
        tags=("OWASP", "Burp", "Web Testing"),
        takeaways=(
            "Understand how modern attack chains form across multiple weaknesses.",
            "Use manual validation to catch issues automation misses.",
            "Treat authentication and session flows as first-class test targets.",
        ),
        related_endpoint="/api/v1/knowledge/owasp",
        related_label="OWASP Top 10 API",
        featured=True,
    ),
    LibraryBook(
        slug="bug-bounty-bootcamp",
        title="Bug Bounty Bootcamp",
        author="Vickie Li",
        year=2021,
        category="AppSec",
        level="Intermediate",
        format_label="Practical Guide",
        focus="Finding, validating, and reporting web vulnerabilities through bug bounty workflows",
        cover_code="BBB",
        accent="ember",
        summary=(
            "A practical walkthrough of modern bug bounty methodology, from reconnaissance and "
            "web vulnerability classes to writing reports that are accepted and actionable."
        ),
        tags=("Bug Bounty", "Web Security", "Reporting"),
        takeaways=(
            "Build a repeatable recon-to-report workflow for web targets.",
            "Focus on validation quality so findings are reproducible and credible.",
            "Translate technical issues into clear impact statements for triage teams.",
        ),
        related_endpoint="/api/v1/knowledge/owasp",
        related_label="OWASP category reference",
        featured=True,
        asset_url=(
            "/static/library-files/"
            "bug-bounty-bootcamp-the-guide-to-finding-and-reporting-web-vulnerabilities.pdf"
        ),
        asset_label="Open PDF",
        asset_type="PDF",
    ),
    LibraryBook(
        slug="ceh-all-in-one-exam-guide",
        title="CEH All-in-One Exam Guide",
        author="Matt Walker",
        year=2022,
        category="Offensive Security",
        level="Intermediate",
        format_label="Exam Guide",
        focus="Ethical hacking concepts, tooling, and certification preparation",
        cover_code="CEH",
        accent="volt",
        summary=(
            "A broad certification-aligned guide to ethical hacking topics including recon, "
            "web attacks, network exploitation, cloud coverage, and common offensive tooling."
        ),
        tags=("CEH", "Ethical Hacking", "Certification"),
        takeaways=(
            "Use it to structure wide coverage across offensive security topics.",
            "Tie certification material back to hands-on lab practice and tooling.",
            "Treat it as breadth-first prep before deeper specialization tracks.",
        ),
        related_endpoint="/api/v1/knowledge/certifications",
        related_label="Certification progression path",
        asset_url="/static/library-files/ceh-certified-ethical-hacker-all-in-one-exam-guide.epub",
        asset_label="Open EPUB",
        asset_type="EPUB",
    ),
    LibraryBook(
        slug="black-hat-python",
        title="Black Hat Python",
        author="Justin Seitz & Tim Arnold",
        year=2021,
        category="Offensive Security",
        level="Intermediate",
        format_label="Lab Companion",
        focus="Python tradecraft for offensive testing and automation",
        cover_code="BHP",
        accent="volt",
        summary=(
            "A hands-on bridge between scripting fundamentals and offensive security "
            "tooling for reconnaissance, payloads, and local automation."
        ),
        tags=("Python", "Red Team", "Automation"),
        takeaways=(
            "Automate repetitive recon and local workflow steps.",
            "Learn how simple scripts accelerate offensive experiments.",
            "Build intuition for security tooling by recreating smaller pieces yourself.",
        ),
        related_endpoint="/docs",
        related_label="Browse platform API docs",
        asset_url=(
            "/static/library-files/"
            "black-hat-python-2nd-edition-python-programming-for-hackers-and-pentesters.epub"
        ),
        asset_label="Open EPUB",
        asset_type="EPUB",
    ),
    LibraryBook(
        slug="blue-team-handbook",
        title="Blue Team Handbook: Incident Response Edition",
        author="Don Murdoch",
        year=2020,
        category="DFIR",
        level="Beginner",
        format_label="Pocket Manual",
        focus="Tactical incident response and analyst checklists",
        cover_code="DFIR",
        accent="ember",
        summary=(
            "A compact operational playbook for triage, containment, logging, and "
            "first-response decisions when incidents move faster than documentation."
        ),
        tags=("IR", "SOC", "Playbook"),
        takeaways=(
            "Keep a lightweight checklist for live-response pressure moments.",
            "Separate immediate containment from full root-cause analysis.",
            "Use consistent note-taking so escalations stay actionable.",
        ),
        related_endpoint="/api/v1/threat-intel/news",
        related_label="Threat intel feed",
        featured=True,
    ),
    LibraryBook(
        slug="practical-malware-analysis",
        title="Practical Malware Analysis",
        author="Michael Sikorski & Andrew Honig",
        year=2012,
        category="Malware Analysis",
        level="Advanced",
        format_label="Hands-On Reference",
        focus="Static and dynamic malware reverse engineering",
        cover_code="MAL",
        accent="cobalt",
        summary=(
            "A lab-oriented classic for analysts who need to move from surface IOC review "
            "into behavior, unpacking, and reverse engineering workflows."
        ),
        tags=("Malware", "Reverse Engineering", "Labs"),
        takeaways=(
            "Move between static indicators and runtime behavior confidently.",
            "Use staged analysis to reduce risk while handling suspicious binaries.",
            "Extract artifacts that improve detection and incident scoping.",
        ),
        related_endpoint="/api/v1/threat-intel/kev",
        related_label="Known exploited vulnerabilities",
    ),
    LibraryBook(
        slug="container-security",
        title="Container Security",
        author="Liz Rice",
        year=2020,
        category="Cloud Platform",
        level="Intermediate",
        format_label="Platform Guide",
        focus="Runtime, supply chain, and orchestration security",
        cover_code="CTR",
        accent="signal-cyan",
        summary=(
            "A practical introduction to the container attack surface and the controls "
            "needed across images, registries, runtimes, and orchestration layers."
        ),
        tags=("Containers", "Cloud", "Kubernetes"),
        takeaways=(
            "Treat image provenance and runtime hardening as separate controls.",
            "Understand how Linux primitives shape isolation guarantees.",
            "Map cloud-native misconfigurations into repeatable review checks.",
        ),
        related_endpoint="/docs",
        related_label="Platform API documentation",
    ),
    LibraryBook(
        slug="serious-cryptography",
        title="Serious Cryptography",
        author="Jean-Philippe Aumasson",
        year=2018,
        category="Cryptography",
        level="Advanced",
        format_label="Engineering Reference",
        focus="Practical cryptography choices for engineers",
        cover_code="CRYP",
        accent="volt",
        summary=(
            "A grounded guide to what modern cryptography is good at, where teams make "
            "bad choices, and how to reason about primitives in real systems."
        ),
        tags=("Crypto", "AES", "Engineering"),
        takeaways=(
            "Choose modern primitives without cargo-culting buzzwords.",
            "Understand where cryptography stops and system design risk begins.",
            "Avoid common implementation mistakes around key handling and randomness.",
        ),
        related_endpoint="/api/v1/tools/encrypt",
        related_label="Encryption tooling API",
    ),
    LibraryBook(
        slug="the-practice-of-network-security-monitoring",
        title="The Practice of Network Security Monitoring",
        author="Richard Bejtlich",
        year=2013,
        category="Detection Engineering",
        level="Advanced",
        format_label="Operational Reference",
        focus="Network telemetry, detection, and defender workflow design",
        cover_code="NSM",
        accent="cobalt",
        summary=(
            "A strong mental model for building detection around network evidence, "
            "analyst workflows, and investigative feedback loops."
        ),
        tags=("Detection", "Telemetry", "Blue Team"),
        takeaways=(
            "Use network data as a decision aid, not just a packet archive.",
            "Build detections that support investigation rather than vanity metrics.",
            "Tie sensor placement to hypotheses and coverage goals.",
        ),
        related_endpoint="/api/v1/threat-intel/news",
        related_label="Threat monitoring feed",
    ),
    LibraryBook(
        slug="practical-packet-analysis",
        title="Practical Packet Analysis",
        author="Chris Sanders",
        year=2017,
        category="Network Defense",
        level="Intermediate",
        format_label="Analyst Guide",
        focus="Traffic analysis with Wireshark and protocol fluency",
        cover_code="PCAP",
        accent="signal-cyan",
        summary=(
            "A protocol-first guide to understanding what is actually happening on the wire "
            "before you jump to assumptions or tool output."
        ),
        tags=("Wireshark", "Packets", "Protocols"),
        takeaways=(
            "Read traffic patterns before narrowing in on anomalies.",
            "Use protocol behavior to confirm or reject incident hypotheses.",
            "Improve investigations by understanding what normal really looks like.",
        ),
        related_endpoint="/api/v1/tools/ports/analyze",
        related_label="Port analysis API",
    ),
    LibraryBook(
        slug="osint-techniques",
        title="OSINT Techniques",
        author="Michael Bazzell",
        year=2021,
        category="Threat Intel",
        level="Intermediate",
        format_label="Research Manual",
        focus="Open-source intelligence workflows and disciplined research",
        cover_code="OSI",
        accent="ember",
        summary=(
            "A practitioner-focused guide to collecting, validating, and operationalizing "
            "publicly available information without drowning in noise."
        ),
        tags=("OSINT", "Research", "Threat Intel"),
        takeaways=(
            "Structure collection so it produces leads instead of browser chaos.",
            "Validate sources before feeding them into detection or response workflows.",
            "Keep research operational by capturing context, not just links.",
        ),
        related_endpoint="/api/v1/threat-intel/news/search?keyword=ransomware",
        related_label="Threat search example",
    ),
    LibraryBook(
        slug="security-engineering",
        title="Security Engineering",
        author="Ross Anderson",
        year=2020,
        category="Architecture",
        level="Advanced",
        format_label="Systems Reference",
        focus="Security design tradeoffs across complex systems",
        cover_code="ARCH",
        accent="volt",
        summary=(
            "A broad systems-thinking reference for engineers and architects who need to "
            "reason about incentives, protocols, abuse cases, and long-lived controls."
        ),
        tags=("Architecture", "Systems", "Risk"),
        takeaways=(
            "Think about abuse, economics, and failure modes together.",
            "Design controls that survive scale, people, and changing assumptions.",
            "Use architecture reviews to challenge trust boundaries early.",
        ),
        related_endpoint="/api/v1/knowledge/killchain",
        related_label="Kill chain knowledge base",
    ),
    LibraryBook(
        slug="cybersecurity-first-principles",
        title="Cybersecurity First Principles",
        author="Rick Howard",
        year=2023,
        category="Architecture",
        level="Intermediate",
        format_label="Strategy Guide",
        focus="Security strategy, resilience, and first-principles thinking",
        cover_code="CFP",
        accent="signal-cyan",
        summary=(
            "A strategy-oriented guide for security leaders and practitioners who want "
            "to reason from durable principles instead of chasing every new tool or trend."
        ),
        tags=("Strategy", "Leadership", "Resilience"),
        takeaways=(
            "Frame security programs around a small set of enduring priorities.",
            "Connect tactics to business resilience instead of checklist activity.",
            "Use first-principles thinking to simplify security decision-making.",
        ),
        related_endpoint="/api/v1/knowledge/killchain",
        related_label="Security strategy knowledge base",
        asset_url=(
            "/static/library-files/"
            "cybersecurity-first-principles-a-reboot-of-strategy-and-tactics.pdf"
        ),
        asset_label="Open PDF",
        asset_type="PDF",
    ),
    LibraryBook(
        slug="cybersecurity-hbr-guide",
        title="Cybersecurity",
        author="Roman V. Yampolskiy et al.",
        year=2019,
        category="Strategy",
        level="Beginner",
        format_label="Essay Collection",
        focus="Executive-level cybersecurity strategy, governance, and emerging risk",
        cover_code="HBR",
        accent="ember",
        summary=(
            "A curated Harvard Business Review collection that frames cybersecurity as "
            "a business and leadership problem, not just a technical control surface."
        ),
        tags=("Leadership", "Governance", "Risk"),
        takeaways=(
            "Translate cyber risk into governance and business language.",
            "Understand how leadership decisions shape security outcomes.",
            "Use it as a high-level orientation before deeper technical study.",
        ),
        related_endpoint="/api/v1/knowledge/certifications",
        related_label="Security learning path",
        asset_url="/static/library-files/cybersecurity.epub",
        asset_label="Open EPUB",
        asset_type="EPUB",
    ),
]


def get_library_catalog() -> dict[str, object]:
    """Return the library catalog with precomputed filters and stats."""
    categories = sorted({book.category for book in LIBRARY_BOOKS})
    levels = ["Beginner", "Intermediate", "Advanced"]
    books = [book.to_dict() for book in LIBRARY_BOOKS]

    return {
        "updated_at": "2026-03-20",
        "stats": {
            "total_books": len(LIBRARY_BOOKS),
            "tracks": len(categories),
            "beginner_friendly": sum(book.level == "Beginner" for book in LIBRARY_BOOKS),
            "advanced_titles": sum(book.level == "Advanced" for book in LIBRARY_BOOKS),
            "api_tie_ins": len({book.related_endpoint for book in LIBRARY_BOOKS}),
        },
        "filters": {
            "categories": categories,
            "levels": levels,
        },
        "books": books,
    }
