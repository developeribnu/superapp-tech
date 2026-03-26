"""
Claude Web Engine - Browser automation for Claude.ai PDF uploads and COGNOSCERE summaries.
Uses Playwright for multi-tab parallel processing.
"""

import os
import json
import time
import re
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Dict, Callable, Optional

try:
    from playwright.sync_api import sync_playwright, Page, Browser
except ImportError:
    raise ImportError(
        "Playwright is required for Claude Web Engine. "
        "Install with: pip install playwright && playwright install chromium"
    )

from engines.base_engine import BaseEngine
from services.categorizer import categorize_book
from services.project_mapper import ProjectMapper
from engines.claude_prompts import CLAUDE_COGNOSCERE_SYSTEM, CLAUDE_SINGLE_PASS_PROMPT


class ClaudeWebEngine(BaseEngine):
    """
    COGNOSCERE book summarization using Claude.ai web interface.
    Uploads PDFs to Claude projects and extracts COGNOSCERE summaries.
    """

    def __init__(self, headless: bool = True, max_tabs: int = 4):
        """
        Initialize Claude Web Engine.

        Args:
            headless (bool): Run browser in headless mode
            max_tabs (int): Maximum concurrent browser tabs (4-5 recommended)
        """
        self.headless = headless
        self.max_tabs = max(2, min(max_tabs, 5))
        self.browser: Optional[Browser] = None
        self.playwright = None
        self.project_mapper = ProjectMapper()
        self.name = "Claude Web (AI)Browser)"
        self._base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    def _initialize_browser(self):
        """Launch Playwright browser if not already started."""
        if self.browser is None:
            self.playwright = sync_playwright().start()

            # Use persistent context to preserve login state
            user_data_dir = os.path.expanduser("~/.claude-web-summarizer")
            os.makedirs(user_data_dir, exist_ok=True)

            self.browser = self.playwright.chromium.launch_persistent_context(
                user_data_dir=user_data_dir,
                headless=self.headless,
                args=[
                    "--disable-blink-features=AutomationControlled",
                    "--no-sandbox",
                ]
            )
            print(f"  🌐 Claude Web Engine initialized ({self.max_tabs} parallel tabs)")

    def _ensure_logged_in(self, page: Page) -> bool:
        """
        Check if user is logged into Claude.ai.
        If not, prompt user to log in manually.

        Args:
            page: Playwright page object

        Returns:
            bool: True if logged in, False if login failed
        """
        try:
            page.goto("https://claude.ai", wait_until="networkidle", timeout=30000)
            time.sleep(2)

            # Check if we see the project list (indicator of logged-in state)
            try:
                page.wait_for_selector('[data-testid="project"]', timeout=5000)
                return True
            except:
                pass

            # If not logged in, user needs to log in manually
            print("\n  ⚠️  Not logged into Claude.ai")
            print("  📍 Please log in to your Claude.ai account in the browser window")
            print("  ⏳ Waiting for login (60 seconds)...")

            # Wait up to 60 seconds for user to log in
            for i in range(60):
                try:
                    page.wait_for_selector('[data-testid="project"]', timeout=1000)
                    print("  ✅ Login detected!")
                    return True
                except:
                    pass
                if (i + 1) % 10 == 0:
                    print(f"  ⏳ Still waiting... ({i+1}s)")

            print("  ❌ Login timeout")
            return False

        except Exception as e:
            print(f"  ⚠️  Login check error: {str(e)}")
            return False

    def discover_projects(self) -> Dict[str, str]:
        """
        Discover Claude projects and their URLs.

        Returns:
            Dict mapping category names to project URLs
        """
        print(f"  🔍 Discovering Claude projects...")
        self._initialize_browser()

        page = self.browser.new_page()
        try:
            if not self._ensure_logged_in(page):
                print("  ⚠️  Could not verify login. Proceeding anyway...")

            page.goto("https://claude.ai", wait_until="networkidle", timeout=30000)
            time.sleep(2)

            projects = {}
            try:
                # Find all project elements
                project_elements = page.query_selector_all('[data-testid="project"]')

                for elem in project_elements:
                    try:
                        # Get project name and URL
                        name_elem = elem.query_selector('[data-testid="project-name"]')
                        link_elem = elem.query_selector('a')

                        if name_elem and link_elem:
                            name = name_elem.text_content().strip()
                            url = link_elem.get_attribute("href")
                            if name and url:
                                projects[name] = url
                                print(f"    Found: {name}")
                    except:
                        continue

            except Exception as e:
                print(f"  ⚠️  Error discovering projects: {str(e)}")

            self.project_mapper.save_projects(projects)
            return projects

        finally:
            page.close()

    def process_book(self, pdf_path: str, metadata: Dict, on_progress: Callable = None) -> str:
        """
        Process single book via Claude.ai.

        Args:
            pdf_path (str): Path to PDF file
            metadata (dict): Book metadata
            on_progress (callable): Progress callback

        Returns:
            str: Markdown summary
        """
        # Note: This is a wrapper for batch processing
        # Single-book processing is handled via process_batch
        raise NotImplementedError(
            "Use process_batch() for Claude Web Engine. "
            "Single-book processing should go through the batch pipeline."
        )

    def process_batch(
        self,
        books: List[Dict],
        on_progress: Optional[Callable] = None
    ) -> Dict[str, Dict]:
        """
        Process multiple books in parallel using Claude Web.

        Args:
            books (list): List of dicts with keys:
                - pdf_path: Path to PDF file
                - metadata: Dict with title, author, pages, text
                - category: Book category (optional)

            on_progress (callable): Callback with signature:
                on_progress({
                    'tab_id': int,
                    'status': str,  # 'processing', 'completed', 'failed'
                    'book': str,
                    'message': str,
                    'elapsed': float
                })

        Returns:
            Dict mapping book paths to results:
            {
                '/path/to/book.pdf': {
                    'success': bool,
                    'summary': str or None,
                    'error': str or None,
                    'elapsed': float
                }
            }
        """
        print(f"\n  📚 Processing {len(books)} books with Claude Web Engine...")
        self._initialize_browser()

        results = {}
        project_mapping = self.project_mapper.discover_projects_with_page(None)

        # Use ThreadPoolExecutor for parallel tab management
        with ThreadPoolExecutor(max_workers=min(self.max_tabs, len(books))) as executor:
            futures = {}

            for idx, book in enumerate(books):
                future = executor.submit(
                    self._process_single_book,
                    book,
                    idx,
                    len(books),
                    project_mapping,
                    on_progress
                )
                futures[future] = book["pdf_path"]

            # Collect results as they complete
            for future in as_completed(futures):
                pdf_path = futures[future]
                try:
                    result = future.result()
                    results[pdf_path] = result
                except Exception as e:
                    results[pdf_path] = {
                        "success": False,
                        "summary": None,
                        "error": str(e),
                        "elapsed": 0
                    }

        return results

    def _process_single_book(
        self,
        book: Dict,
        tab_id: int,
        total: int,
        project_mapping: Dict,
        on_progress: Optional[Callable] = None
    ) -> Dict:
        """
        Process a single book on a dedicated browser tab.

        Args:
            book (dict): Book data
            tab_id (int): Tab index
            total (int): Total books
            project_mapping (dict): Category to project URL mapping
            on_progress (callable): Progress callback

        Returns:
            dict: Result with keys success, summary, error, elapsed
        """
        start_time = time.time()
        pdf_path = book.get("pdf_path")
        metadata = book.get("metadata", {})
        category = book.get("category") or categorize_book(
            metadata.get("title", ""),
            metadata.get("author", "")
        )
        text = metadata.get("text", "")

        try:
            page = self.browser.new_page()

            def _emit_progress(status: str, message: str = ""):
                if on_progress:
                    on_progress({
                        "tab_id": tab_id,
                        "status": status,
                        "book": os.path.basename(pdf_path)[:40],
                        "message": message,
                        "elapsed": time.time() - start_time
                    })

            try:
                _emit_progress("processing", f"Opening Claude (category: {category})")

                # Find project URL for this category
                project_url = None
                for proj_name, proj_url in project_mapping.items():
                    if category.lower() in proj_name.lower():
                        project_url = proj_url
                        break

                if not project_url:
                    # Use default/first project
                    project_url = list(project_mapping.values())[0] if project_mapping else None

                if not project_url:
                    raise ValueError(f"No Claude project found for category: {category}")

                # Navigate to project
                page.goto(project_url, wait_until="networkidle", timeout=30000)
                time.sleep(2)

                _emit_progress("processing", "Preparing to send prompt")

                # Clear any existing text and send COGNOSCERE system prompt
                self._send_claude_message(page, CLAUDE_COGNOSCERE_SYSTEM)
                time.sleep(2)

                _emit_progress("processing", "Sending extraction prompt")

                # Send extraction prompt with book text
                extraction_prompt = CLAUDE_SINGLE_PASS_PROMPT.format(
                    title=metadata.get("title", "Unknown"),
                    author=metadata.get("author", "Unknown"),
                    pages=metadata.get("pages", 0),
                    text=text[:200000]  # Limit to ~50k words
                )
                self._send_claude_message(page, extraction_prompt)
                time.sleep(2)

                _emit_progress("processing", "Waiting for Claude response")

                # Wait for response and capture it
                summary = self._wait_and_capture_response(page, timeout=600)  # 10 min timeout

                elapsed = time.time() - start_time
                _emit_progress("completed", f"Summary generated ({len(summary.split())} words)")

                return {
                    "success": True,
                    "summary": summary,
                    "error": None,
                    "elapsed": elapsed
                }

            finally:
                page.close()

        except Exception as e:
            elapsed = time.time() - start_time
            error_msg = f"Tab {tab_id}: {str(e)}"
            if on_progress:
                on_progress({
                    "tab_id": tab_id,
                    "status": "failed",
                    "book": os.path.basename(pdf_path)[:40],
                    "message": error_msg,
                    "elapsed": elapsed
                })
            return {
                "success": False,
                "summary": None,
                "error": error_msg,
                "elapsed": elapsed
            }

    def _send_claude_message(self, page: Page, message: str):
        """
        Send a message in Claude chat.

        Args:
            page: Playwright page
            message (str): Message to send
        """
        try:
            # Find the text input field
            input_selector = 'textarea[placeholder*="Message"], input[placeholder*="Message"]'
            page.click(input_selector, timeout=10000)
            page.fill(input_selector, message)

            # Send message (Enter or button click)
            page.keyboard.press("Enter")

        except Exception as e:
            print(f"  ⚠️  Error sending message: {str(e)}")
            raise

    def _wait_and_capture_response(self, page: Page, timeout: int = 600) -> str:
        """
        Wait for Claude to respond and capture the message.

        Args:
            page: Playwright page
            timeout (int): Maximum wait time in seconds

        Returns:
            str: Claude's response text
        """
        start = time.time()

        try:
            # Wait for Claude to generate response (look for writing indicator disappearing)
            while time.time() - start < timeout:
                try:
                    # Check if response is generating
                    writing_elem = page.query_selector('[data-testid="message-generating"]')
                    if not writing_elem:
                        # Response is likely complete
                        time.sleep(1)
                        break
                except:
                    pass
                time.sleep(2)

            # Capture the latest message from Claude
            messages = page.query_selector_all('[role="article"]')
            if messages:
                last_message = messages[-1]
                response_text = last_message.text_content()
                return response_text
            else:
                # Fallback: try to get text content
                return page.content()

        except Exception as e:
            print(f"  ⚠️  Error capturing response: {str(e)}")
            raise

    def get_name(self) -> str:
        """Return engine name."""
        return self.name

    def shutdown(self):
        """Clean up resources."""
        if self.browser is not None:
            self.browser.close()
            self.browser = None

        if self.playwright is not None:
            self.playwright.stop()
            self.playwright = None

        print("  🔌 Claude Web Engine shutdown complete")

    def __del__(self):
        """Ensure cleanup on deletion."""
        try:
            self.shutdown()
        except:
            pass
