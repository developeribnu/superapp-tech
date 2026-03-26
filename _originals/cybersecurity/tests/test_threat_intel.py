"""Tests for threat intelligence components."""

import pytest

from src.threat_intel.mitre_attack import MitreAttackMapper
from src.knowledge.attack_frameworks import MitreAttackKB
from src.knowledge.owasp_top10 import OwaspKB
from src.knowledge.certifications import CertificationKB


class TestMitreAttackMapper:
    def setup_method(self) -> None:
        self.mapper = MitreAttackMapper()

    def test_get_technique_by_id(self) -> None:
        technique = self.mapper.get_technique("T1190")
        assert technique is not None
        assert technique.name == "Exploit Public-Facing Application"

    def test_get_nonexistent_technique(self) -> None:
        technique = self.mapper.get_technique("T9999")
        assert technique is None

    def test_get_tactic(self) -> None:
        tactic = self.mapper.get_tactic("TA0001")
        assert tactic == "Initial Access"

    def test_map_phishing_keywords(self) -> None:
        techniques = self.mapper.map_keywords_to_techniques("phishing email attack")
        ids = [t.technique_id for t in techniques]
        assert "T1566" in ids

    def test_map_ransomware_keywords(self) -> None:
        techniques = self.mapper.map_keywords_to_techniques("ransomware encrypted files")
        ids = [t.technique_id for t in techniques]
        assert "T1486" in ids

    def test_map_brute_force_keywords(self) -> None:
        techniques = self.mapper.map_keywords_to_techniques("brute force login attack")
        ids = [t.technique_id for t in techniques]
        assert "T1110" in ids

    def test_map_no_matches(self) -> None:
        techniques = self.mapper.map_keywords_to_techniques("hello world")
        assert len(techniques) == 0

    def test_format_technique_summary(self) -> None:
        technique = self.mapper.get_technique("T1190")
        formatted = self.mapper.format_technique_summary(technique)
        assert "T1190" in formatted
        assert "Initial Access" in formatted
        assert "Mitigations" in formatted

    def test_format_killchain(self) -> None:
        techniques = self.mapper.map_keywords_to_techniques("phishing exploit credential")
        formatted = self.mapper.format_killchain(techniques)
        assert "Kill Chain" in formatted


class TestMitreAttackKB:
    def setup_method(self) -> None:
        self.kb = MitreAttackKB()

    def test_get_kill_chain(self) -> None:
        phases = self.kb.get_kill_chain()
        assert len(phases) == 7
        assert phases[0].name == "Reconnaissance"
        assert phases[6].name == "Actions on Objectives"

    def test_get_phase_by_name(self) -> None:
        phase = self.kb.get_phase("Delivery")
        assert phase is not None
        assert phase.order == 3

    def test_get_summary(self) -> None:
        summary = self.kb.get_summary()
        assert "Kill Chain" in summary
        assert "Reconnaissance" in summary

    def test_format_full_killchain(self) -> None:
        formatted = self.kb.format_full_killchain()
        assert "Reconnaissance" in formatted
        assert "Actions on Objectives" in formatted


class TestOwaspKB:
    def setup_method(self) -> None:
        self.kb = OwaspKB()

    def test_get_all_categories(self) -> None:
        categories = self.kb.get_all()
        assert len(categories) == 10

    def test_get_specific_category(self) -> None:
        cat = self.kb.get_category("A01")
        assert cat is not None
        assert cat.name == "Broken Access Control"

    def test_get_category_case_insensitive(self) -> None:
        cat = self.kb.get_category("a03")
        assert cat is not None
        assert cat.name == "Injection"

    def test_search_injection(self) -> None:
        results = self.kb.search("injection")
        assert len(results) > 0
        assert any(c.id == "A03" for c in results)

    def test_search_ssrf(self) -> None:
        results = self.kb.search("SSRF")
        assert len(results) > 0
        assert any(c.id == "A10" for c in results)

    def test_get_summary(self) -> None:
        summary = self.kb.get_summary()
        assert "OWASP Top 10" in summary
        assert "A01" in summary

    def test_format_category(self) -> None:
        cat = self.kb.get_category("A03")
        formatted = self.kb.format_category(cat)
        assert "Injection" in formatted
        assert "Prevention" in formatted


class TestCertificationKB:
    def setup_method(self) -> None:
        self.kb = CertificationKB()

    def test_get_all_certifications(self) -> None:
        certs = self.kb.get_all()
        assert len(certs) == 4

    def test_get_security_plus(self) -> None:
        cert = self.kb.get_certification("security_plus")
        assert cert is not None
        assert cert.short_name == "Security+"

    def test_get_by_shortname(self) -> None:
        cert = self.kb.get_certification("OSCP")
        assert cert is not None
        assert cert.level == "advanced"

    def test_get_by_level(self) -> None:
        foundation = self.kb.get_by_level("foundation")
        assert len(foundation) == 1
        assert foundation[0].short_name == "Security+"

    def test_progression_path(self) -> None:
        path = self.kb.get_progression_path()
        levels = [c.level for c in path]
        assert levels == ["foundation", "intermediate", "advanced", "expert"]

    def test_get_summary(self) -> None:
        summary = self.kb.get_summary()
        assert "Certification" in summary
        assert "Security+" in summary
        assert "OSCP" in summary

    def test_format_certification(self) -> None:
        cert = self.kb.get_certification("OSCP")
        formatted = self.kb.format_certification(cert)
        assert "OSCP" in formatted
        assert "Salary Range" in formatted
        assert "Study Resources" in formatted
