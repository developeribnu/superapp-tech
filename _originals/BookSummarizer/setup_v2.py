#!/usr/bin/env python3
"""
BookSummarizer v2 Setup Script
Initializes dependencies and Claude Web Engine browser.
"""

import os
import sys
import subprocess
import shutil


def print_header(msg):
    print(f"\n{'='*60}")
    print(f"  {msg}")
    print(f"{'='*60}\n")


def check_python():
    """Verify Python 3.9+"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 9):
        print(f"ERROR: Python 3.9+ required, found {version.major}.{version.minor}")
        sys.exit(1)
    print(f"✅ Python {version.major}.{version.minor} OK")


def install_dependencies():
    """Install or upgrade pip dependencies."""
    print_header("Installing Dependencies")

    try:
        import pip
        print("✅ pip available")
    except ImportError:
        print("❌ pip not found. Please install pip first.")
        sys.exit(1)

    print("Installing packages from requirements.txt...")
    result = subprocess.run(
        [sys.executable, "-m", "pip", "install", "-q", "-r", "requirements.txt"],
        cwd=os.path.dirname(__file__),
        capture_output=True,
        text=True
    )

    if result.returncode == 0:
        print("✅ Dependencies installed")
    else:
        print(f"❌ Installation failed:\n{result.stderr}")
        sys.exit(1)


def setup_playwright():
    """Install Playwright browsers."""
    print_header("Setting up Playwright Browsers")

    print("Installing Playwright browsers (Chromium)...")
    print("This may take a few minutes on first run...\n")

    result = subprocess.run(
        [sys.executable, "-m", "playwright", "install", "chromium"],
        capture_output=True,
        text=True
    )

    if result.returncode == 0:
        print("✅ Playwright Chromium installed")
    else:
        print(f"⚠️  Playwright setup completed (return code: {result.returncode})")
        print("   The browser will be set up automatically on first use if needed.")


def create_output_dirs():
    """Create necessary output directories."""
    print_header("Creating Output Directories")

    base_dir = os.path.dirname(__file__)
    dirs = [
        "output",
        "output/Completed",
    ]

    for d in dirs:
        path = os.path.join(base_dir, d)
        os.makedirs(path, exist_ok=True)
        print(f"✅ {d}/")


def initialize_env():
    """Initialize .env file if not present."""
    print_header("Environment Configuration")

    base_dir = os.path.dirname(__file__)
    env_file = os.path.join(base_dir, ".env")
    env_example = os.path.join(base_dir, ".env.example")

    if os.path.exists(env_file):
        print("✅ .env file already exists")
        return

    if os.path.exists(env_example):
        shutil.copy2(env_example, env_file)
        print(f"✅ Created .env from template")
    else:
        # Create minimal .env
        with open(env_file, 'w') as f:
            f.write("KIMI_API_KEY=\n")
            f.write("KIMI_BASE_URL=https://api.kimi.com/coding/v1\n")
            f.write("KIMI_MODEL=kimi-k2.5\n")
            f.write("SUMMARIZER_ENGINE=kimi\n")
        print(f"✅ Created .env with defaults")


def verify_installation():
    """Verify all components are installed."""
    print_header("Verifying Installation")

    checks = [
        ("Python 3.9+", lambda: sys.version_info >= (3, 9)),
        ("Flask", lambda: __import__("flask")),
        ("pdfplumber", lambda: __import__("pdfplumber")),
        ("python-docx", lambda: __import__("docx")),
        ("httpx", lambda: __import__("httpx")),
        ("Playwright", lambda: __import__("playwright")),
    ]

    all_ok = True
    for name, check in checks:
        try:
            if callable(check):
                check()
            print(f"✅ {name}")
        except Exception as e:
            print(f"❌ {name}: {str(e)}")
            all_ok = False

    return all_ok


def main():
    """Run full setup."""
    base_dir = os.path.dirname(__file__)
    os.chdir(base_dir)

    print("""
╔════════════════════════════════════════════════════════════╗
║     COGNOSCERE BookSummarizer v2 Setup                     ║
║     Automated Book Summarization with COGNOSCERE           ║
╚════════════════════════════════════════════════════════════╝
    """)

    print_header("System Check")
    check_python()

    install_dependencies()
    setup_playwright()
    create_output_dirs()
    initialize_env()

    if verify_installation():
        print_header("Setup Complete!")
        print("""
✅ BookSummarizer v2 is ready!

Next steps:
1. Configure your API key in .env:
   KIMI_API_KEY=sk-your-key-here

2. For Claude Web Engine:
   - Make sure you're logged into Claude.ai
   - The first run will open Chrome with Playwright

3. Start the app:
   python start.py

4. Open browser:
   http://localhost:5000

Features:
- Kimi Code API engine (fast, reliable)
- Claude Web engine (runs 4-5 browser tabs in parallel)
- Automatic book categorization
- COGNOSCERE comprehensive reviews
- DOCX + Markdown exports

For more info, see README.md
        """)
    else:
        print_header("⚠️  Setup Incomplete")
        print("Some components failed. Please check errors above.")
        sys.exit(1)


if __name__ == "__main__":
    main()
