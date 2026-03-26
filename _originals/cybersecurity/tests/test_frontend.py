"""Tests for public library page and catalog endpoint."""

from fastapi.testclient import TestClient

from src.app import app


client = TestClient(app)


def test_books_page_served() -> None:
    response = client.get("/books")

    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Cybersec Library" in response.text
    assert "/static/library.js" in response.text


def test_library_alias_served() -> None:
    response = client.get("/library")

    assert response.status_code == 200
    assert "Cybersec Library" in response.text


def test_library_catalog_api() -> None:
    response = client.get("/api/v1/library/books")
    data = response.json()

    assert response.status_code == 200
    assert data["stats"]["total_books"] >= 10
    assert "AppSec" in data["filters"]["categories"]
    assert any(book["slug"] == "the-web-application-hackers-handbook" for book in data["books"])
    assert all("related_endpoint" in book for book in data["books"])


def test_library_stylesheet_served() -> None:
    response = client.get("/static/library.css")

    assert response.status_code == 200
    assert "text/css" in response.headers["content-type"]
    assert "--bg-base" in response.text


def test_black_hat_python_epub_served() -> None:
    response = client.get(
        "/static/library-files/"
        "black-hat-python-2nd-edition-python-programming-for-hackers-and-pentesters.epub"
    )

    assert response.status_code == 200
    assert response.content.startswith(b"PK")


def test_bug_bounty_bootcamp_pdf_served() -> None:
    response = client.get(
        "/static/library-files/"
        "bug-bounty-bootcamp-the-guide-to-finding-and-reporting-web-vulnerabilities.pdf"
    )

    assert response.status_code == 200
    assert response.content.startswith(b"%PDF")


def test_ccsp_pdf_served() -> None:
    response = client.get(
        "/static/library-files/"
        "ccsp-certified-cloud-security-professional-all-in-one-exam-guide-3rd-ed.pdf"
    )

    assert response.status_code == 200
    assert response.content.startswith(b"%PDF")


def test_ceh_epub_served() -> None:
    response = client.get(
        "/static/library-files/ceh-certified-ethical-hacker-all-in-one-exam-guide.epub"
    )

    assert response.status_code == 200
    assert response.content.startswith(b"PK")


def test_cybersecurity_first_principles_pdf_served() -> None:
    response = client.get(
        "/static/library-files/"
        "cybersecurity-first-principles-a-reboot-of-strategy-and-tactics.pdf"
    )

    assert response.status_code == 200
    assert response.content.startswith(b"%PDF")


def test_cybersecurity_epub_served() -> None:
    response = client.get("/static/library-files/cybersecurity.epub")

    assert response.status_code == 200
    assert response.content.startswith(b"PK")
