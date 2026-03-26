"""Abstract base class for book summarization engines."""

from abc import ABC, abstractmethod


class BaseEngine(ABC):
    """Abstract base class for book summarization engines."""

    @abstractmethod
    def process_book(self, pdf_path, metadata, on_progress=None):
        """
        Process a single book and return a markdown summary string.

        Args:
            pdf_path (str): Path to PDF file
            metadata (dict): Book metadata (title, author, pages, etc.)
            on_progress (callable): Optional callback for progress updates
                Called with (step, detail) tuples

        Returns:
            str: Markdown-formatted summary

        Raises:
            Exception: If processing fails
        """
        pass

    @abstractmethod
    def get_name(self):
        """Return human-readable engine name."""
        pass

    @abstractmethod
    def shutdown(self):
        """Clean up resources."""
        pass
