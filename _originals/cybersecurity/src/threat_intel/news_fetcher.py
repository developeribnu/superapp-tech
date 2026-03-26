"""
CYBERSEC AI v4.0 - Security News Fetcher
Fetches and parses cybersecurity news from RSS feeds of major sources:
The Hacker News, Dark Reading, SecurityWeek, Bleeping Computer, Krebs on Security.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any

import feedparser
import structlog

logger = structlog.get_logger()


@dataclass
class NewsArticle:
    title: str
    link: str
    source: str
    published: str = ""
    summary: str = ""
    tags: list[str] = field(default_factory=list)


# Major cybersecurity news RSS feeds
NEWS_FEEDS: dict[str, str] = {
    "The Hacker News": "https://feeds.feedburner.com/TheHackersNews",
    "Dark Reading": "https://www.darkreading.com/rss.xml",
    "SecurityWeek": "https://feeds.feedburner.com/securityweek",
    "Bleeping Computer": "https://www.bleepingcomputer.com/feed/",
    "Krebs on Security": "https://krebsonsecurity.com/feed/",
    "SANS ISC": "https://isc.sans.edu/rssfeed.xml",
    "CISA Alerts": "https://www.cisa.gov/cybersecurity-advisories/all.xml",
}


class SecurityNewsFetcher:
    """Fetches and aggregates cybersecurity news from trusted RSS feeds."""

    def __init__(self, feeds: dict[str, str] | None = None) -> None:
        self._feeds = feeds or NEWS_FEEDS

    def fetch_feed(self, source: str, url: str, limit: int = 10) -> list[NewsArticle]:
        """Fetch articles from a single RSS feed."""
        try:
            feed = feedparser.parse(url)
            articles = []

            for entry in feed.entries[:limit]:
                tags = [t.get("term", "") for t in entry.get("tags", [])]
                articles.append(
                    NewsArticle(
                        title=entry.get("title", "Untitled"),
                        link=entry.get("link", ""),
                        source=source,
                        published=entry.get("published", ""),
                        summary=_clean_summary(entry.get("summary", "")),
                        tags=tags,
                    )
                )

            return articles
        except Exception as e:
            logger.error("RSS feed fetch failed", source=source, error=str(e))
            return []

    def fetch_all(self, limit_per_feed: int = 5) -> dict[str, list[NewsArticle]]:
        """Fetch from all configured feeds and return grouped by source."""
        results: dict[str, list[NewsArticle]] = {}

        for source, url in self._feeds.items():
            articles = self.fetch_feed(source, url, limit=limit_per_feed)
            if articles:
                results[source] = articles

        return results

    def fetch_all_flat(self, limit_per_feed: int = 5) -> list[NewsArticle]:
        """Fetch from all feeds and return a flat list sorted by publication date."""
        all_articles: list[NewsArticle] = []

        for source, url in self._feeds.items():
            articles = self.fetch_feed(source, url, limit=limit_per_feed)
            all_articles.extend(articles)

        return all_articles

    def search_articles(
        self, keyword: str, limit_per_feed: int = 10
    ) -> list[NewsArticle]:
        """Search all feeds for articles matching a keyword."""
        all_articles = self.fetch_all_flat(limit_per_feed=limit_per_feed)
        keyword_lower = keyword.lower()

        return [
            a
            for a in all_articles
            if keyword_lower in a.title.lower()
            or keyword_lower in a.summary.lower()
            or any(keyword_lower in t.lower() for t in a.tags)
        ]

    def format_news_briefing(
        self, articles: list[NewsArticle], max_items: int = 10
    ) -> str:
        """Format articles into a news briefing string for AI context."""
        if not articles:
            return "No recent security news available."

        lines = ["Recent Cybersecurity News:"]
        for article in articles[:max_items]:
            lines.append(f"\n  [{article.source}] {article.title}")
            if article.summary:
                lines.append(f"    Summary: {article.summary[:200]}")
            lines.append(f"    Link: {article.link}")

        return "\n".join(lines)


def _clean_summary(raw: str) -> str:
    """Strip HTML tags from RSS summary content."""
    import re

    clean = re.sub(r"<[^>]+>", "", raw)
    clean = clean.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
    return clean.strip()[:500]
