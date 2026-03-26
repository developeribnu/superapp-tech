"""Claude project discovery and mapping to book categories."""

import os
import json
from pathlib import Path
from typing import Dict, Optional

try:
    from playwright.sync_api import Page
except ImportError:
    Page = None


class ProjectMapper:
    """Maps book categories to Claude.ai projects."""

    def __init__(self):
        """Initialize project mapper."""
        self._base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        self.projects_file = os.path.join(self._base_dir, "output", "claude_projects.json")
        self._projects_cache = None

    def save_projects(self, projects: Dict[str, str]):
        """
        Save discovered projects to cache file.

        Args:
            projects (dict): Dict mapping project names to URLs
        """
        os.makedirs(os.path.dirname(self.projects_file), exist_ok=True)
        with open(self.projects_file, 'w') as f:
            json.dump(projects, f, indent=2)
        self._projects_cache = projects

    def load_projects(self) -> Dict[str, str]:
        """
        Load previously discovered projects from cache.

        Returns:
            dict: Project mapping or empty dict if not cached
        """
        if self._projects_cache is not None:
            return self._projects_cache

        if os.path.exists(self.projects_file):
            with open(self.projects_file, 'r') as f:
                self._projects_cache = json.load(f)
                return self._projects_cache

        return {}

    def discover_projects_with_page(self, page: Optional[Page]) -> Dict[str, str]:
        """
        Discover Claude projects, using cached version if available.

        Args:
            page (Page or None): Playwright page for live discovery

        Returns:
            dict: Project mapping
        """
        # Try cached version first
        cached = self.load_projects()
        if cached:
            return cached

        # If page provided and no cache, discover now
        if page is not None:
            return self._discover_via_page(page)

        # Return empty dict if no page and no cache
        return {}

    def _discover_via_page(self, page: Page) -> Dict[str, str]:
        """
        Discover Claude projects via browser page.

        Args:
            page: Playwright page

        Returns:
            dict: Project mapping
        """
        import time

        projects = {}

        try:
            page.goto("https://claude.ai", wait_until="networkidle", timeout=30000)
            time.sleep(2)

            # Find project elements
            try:
                project_elements = page.query_selector_all('[data-testid="project"]')

                for elem in project_elements:
                    try:
                        name_elem = elem.query_selector('[data-testid="project-name"]')
                        link_elem = elem.query_selector('a')

                        if name_elem and link_elem:
                            name = name_elem.text_content().strip()
                            url = link_elem.get_attribute("href")
                            if name and url:
                                projects[name] = url
                    except:
                        continue

            except Exception as e:
                print(f"  ⚠️  Error discovering projects: {str(e)}")

            if projects:
                self.save_projects(projects)

        except Exception as e:
            print(f"  ⚠️  Failed to discover projects: {str(e)}")

        return projects

    def find_project_for_category(self, category: str, projects: Dict[str, str]) -> Optional[str]:
        """
        Find the best Claude project URL for a book category.

        Args:
            category (str): Book category
            projects (dict): Available projects

        Returns:
            str: Project URL or None if not found
        """
        if not projects:
            return None

        category_lower = category.lower()

        # Direct match
        for proj_name, proj_url in projects.items():
            if category_lower in proj_name.lower():
                return proj_url

        # Partial match
        for proj_name, proj_url in projects.items():
            if any(word in proj_name.lower() for word in category_lower.split()):
                return proj_url

        # Return first project as fallback
        return list(projects.values())[0]

    def get_project_url(self, category: str) -> Optional[str]:
        """
        Get Claude project URL for a category, using cached projects.

        Args:
            category (str): Book category

        Returns:
            str: Project URL or None
        """
        projects = self.load_projects()
        return self.find_project_for_category(category, projects)
