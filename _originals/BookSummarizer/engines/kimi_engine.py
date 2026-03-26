"""Kimi API Engine - wraps the existing summarizer.py implementation."""

import os
from engines.base_engine import BaseEngine
from pdf_extractor import chunk_text
from summarizer import BookSummarizer as KimiBookSummarizer, COGNOSCERE_SYSTEM


class KimiEngine(BaseEngine):
    """COGNOSCERE book summarization using Kimi Code API."""

    def __init__(self):
        """Initialize Kimi engine with API credentials."""
        self.summarizer = KimiBookSummarizer()
        self.name = "Kimi Code API"

    def process_book(self, pdf_path, metadata, on_progress=None, log_callback=None):
        """
        Process book using Kimi Code API.

        Args:
            pdf_path (str): Path to PDF (unused in this wrapper)
            metadata (dict): Book metadata (title, author, pages)
            on_progress (callable): Progress callback
            log_callback (callable): Log callback for web UI visibility

        Returns:
            str: Markdown summary
        """
        if on_progress:
            on_progress("extraction", f"Generating summary for {metadata['title']}")

        # Use the existing summarizer with log callback for multi-pass visibility
        return self.summarizer.generate_summary(metadata["text"], metadata, log_callback=log_callback)

    def get_name(self):
        """Return engine name."""
        return self.name

    def shutdown(self):
        """Clean up resources."""
        if hasattr(self.summarizer, "__del__"):
            self.summarizer.__del__()
