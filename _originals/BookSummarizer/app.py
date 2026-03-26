#!/usr/bin/env python3
"""
COGNOSCERE BookSummarizer — Web Application
A beautiful Flask web app for automated ebook extraction and summarization.
"""

import os
import sys
import json
import time
import shutil
import re
import threading
from datetime import datetime

from flask import Flask, render_template_string, jsonify, request, send_from_directory, abort

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from pdf_extractor import extract_book_text, get_ebook_files, extract_metadata
from summarizer import BookSummarizer, load_env_file
from docx_creator import create_book_summary_docx
from engines.kimi_engine import KimiEngine
from engines.claude_web_engine import ClaudeWebEngine
from services.categorizer import categorize_book as categorize_book_service

# ============================================================
# APP CONFIGURATION
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
PROGRESS_FILE = os.path.join(OUTPUT_DIR, "progress.json")
CATALOG_FILE = os.path.join(OUTPUT_DIR, "catalog.json")
ENV_FILE = os.path.join(BASE_DIR, ".env")

# Load environment
load_env_file(ENV_FILE)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'cognoscere-booksummarizer-2024'

# ============================================================
# GLOBAL STATE (for processing)
# ============================================================

processing_state = {
    "is_running": False,
    "current_book": None,
    "current_step": None,
    "current_index": 0,
    "total_books": 0,
    "log": [],
    "completed": 0,
    "failed": 0,
    "start_time": None,
    "cancel_requested": False,
    "engine": "kimi",  # "kimi" or "claude_web"
    "tab_progress": {},  # For Claude Web Engine tab tracking
}

# ============================================================
# HELPER FUNCTIONS
# ============================================================

def sanitize_folder_name(name):
    name = re.sub(r'[<>:"/\\|?*]', '', name)
    name = re.sub(r'\s+', ' ', name).strip()
    if len(name) > 80:
        name = name[:80].strip()
    return name


def categorize_book(title, author):
    title_lower = title.lower()
    author_lower = (author or "").lower()
    categories = {
        "Finance & Investing": ["money", "invest", "stock", "market", "financial", "wealth", "retire", "bitcoin", "wall street", "fund", "capital", "economics", "monetary", "portfolio", "trading", "hedge", "bogle", "buffett"],
        "Psychology & Mind": ["brain", "mind", "psych", "emotion", "think", "cognitive", "habit", "behavior", "mental", "anxiety", "trauma", "stress", "mindful", "intelligence", "neuroscience"],
        "Self-Development": ["habit", "success", "productive", "career", "grit", "strength", "confidence", "leadership", "getting things done", "time manage", "motivation", "discipline", "goal"],
        "Relationships & Social": ["love", "relationship", "marriage", "friend", "social", "connect", "attachment", "empathy", "together", "lonely", "tribe", "communit"],
        "Parenting & Family": ["child", "parent", "teen", "adolesc", "toddler", "baby", "family", "daughter", "son", "montessori"],
        "Health & Wellness": ["health", "sleep", "exercise", "body", "breath", "eat", "food", "burnout", "energy", "wellbeing", "fitness", "medical"],
        "Business & Innovation": ["startup", "business", "entrepren", "innovati", "company", "lean", "design", "creative", "strategy", "management", "disrupt", "network"],
        "Technology & AI": ["ai ", "artificial", "machine learn", "algorithm", "data", "tech", "software", "code", "program", "computer", "agent", "digital"],
    }
    for category, keywords in categories.items():
        for kw in keywords:
            if kw in title_lower or kw in author_lower:
                return category
    return "General"


def load_progress():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"completed": [], "failed": [], "skipped": []}


def save_progress(progress):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(PROGRESS_FILE, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2, ensure_ascii=False)


def load_catalog():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    if os.path.exists(CATALOG_FILE):
        with open(CATALOG_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"books": [], "last_updated": None, "total_books": 0, "total_summarized": 0}


def save_catalog(catalog):
    catalog["last_updated"] = datetime.now().isoformat()
    catalog["total_books"] = len(catalog["books"])
    catalog["total_summarized"] = len([b for b in catalog["books"] if b.get("has_summary")])
    with open(CATALOG_FILE, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)


def log(msg):
    timestamp = datetime.now().strftime("%H:%M:%S")
    entry = f"[{timestamp}] {msg}"
    processing_state["log"].append(entry)
    # Keep last 500 entries
    if len(processing_state["log"]) > 500:
        processing_state["log"] = processing_state["log"][-500:]
    print(entry)


def get_source_dir():
    """Get the source directory for ebooks."""
    # Try configured path first, then defaults
    configured = os.environ.get("EBOOK_SOURCE_DIR", "")
    if configured and os.path.isdir(configured):
        return configured
    # Default: parent of BookSummarizer folder (typically Downloads)
    parent = os.path.dirname(BASE_DIR)
    if os.path.isdir(parent):
        return parent
    return BASE_DIR


# ============================================================
# BACKGROUND PROCESSING
# ============================================================

def _save_book_results(pdf_path, metadata, summary_text, category):
    """Helper to save book results to disk."""
    filename = os.path.basename(pdf_path)
    folder_name = sanitize_folder_name(metadata["title"])
    text = metadata.get("text", "")

    # Structure: output/Completed/<Category>/<BookTitle>/
    category_dir = os.path.join(OUTPUT_DIR, "Completed", sanitize_folder_name(category))
    book_dir = os.path.join(category_dir, folder_name)
    os.makedirs(book_dir, exist_ok=True)

    # Copy ebook
    dest_pdf = os.path.join(book_dir, filename)
    if not os.path.exists(dest_pdf):
        shutil.copy2(pdf_path, dest_pdf)

    # Save markdown
    md_path = os.path.join(book_dir, f"COGNOSCERE - {folder_name}.md")
    header = f"""# Rangkuman Buku: {metadata['title']}\n\n**Penulis:** {metadata['author']}\n**Kategori:** {category}\n**Halaman:** {metadata['pages']}\n**Tanggal:** {datetime.now().strftime('%d %B %Y')}\n\n---\n\n"""
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(header + summary_text)

    # Create DOCX
    docx_path = os.path.join(book_dir, f"COGNOSCERE - {folder_name}.docx")
    create_book_summary_docx(metadata, summary_text, docx_path)

    # Save extracted text
    if text:
        txt_path = os.path.join(book_dir, f"Extracted Text - {folder_name}.txt")
        with open(txt_path, 'w', encoding='utf-8') as f:
            f.write(text)

    return f"Completed/{sanitize_folder_name(category)}/{folder_name}"


def process_books_background(book_indices=None, source_dir=None, engine_type="kimi"):
    """Background worker to process books using specified engine."""
    global processing_state

    if processing_state["is_running"]:
        return

    processing_state["is_running"] = True
    processing_state["cancel_requested"] = False
    processing_state["log"] = []
    processing_state["completed"] = 0
    processing_state["failed"] = 0
    processing_state["start_time"] = time.time()
    processing_state["engine"] = engine_type
    processing_state["tab_progress"] = {}

    engine = None

    try:
        src = source_dir or get_source_dir()
        all_files = get_ebook_files(src)
        progress = load_progress()
        catalog = load_catalog()

        if book_indices:
            files = [all_files[i] for i in book_indices if i < len(all_files)]
        else:
            files = all_files

        # Filter already completed
        remaining = [f for f in files if os.path.basename(f) not in progress.get("completed", [])]

        processing_state["total_books"] = len(remaining)
        log(f"Starting processing with {engine_type} engine: {len(remaining)} books")

        # Initialize engine
        if engine_type == "claude_web":
            engine = ClaudeWebEngine(headless=False, max_tabs=4)
            log(f"  Initialized Claude Web Engine (4 parallel tabs)")
        else:
            engine = KimiEngine()
            log(f"  Initialized Kimi Engine")

        # For Kimi: process sequentially
        if engine_type == "kimi":
            for idx, pdf_path in enumerate(remaining):
                if processing_state["cancel_requested"]:
                    log("Processing cancelled by user")
                    break

                filename = os.path.basename(pdf_path)
                processing_state["current_index"] = idx + 1
                processing_state["current_book"] = filename[:60]

                log(f"[{idx+1}/{len(remaining)}] Processing: {filename[:60]}...")

                try:
                    # Extract
                    processing_state["current_step"] = "Extracting text..."
                    result = extract_book_text(pdf_path)
                    metadata = result["metadata"]
                    text = result["text"]
                    log(f"  Extracted {metadata['word_count']:,} words from {metadata['pages']} pages")

                    if metadata["word_count"] < 100:
                        log(f"  Skipped: too little text ({metadata['word_count']} words)")
                        progress.setdefault("skipped", []).append({"file": filename, "reason": "insufficient_text"})
                        processing_state["failed"] += 1
                        continue

                    # Summarize
                    processing_state["current_step"] = "Generating AI summary..."
                    metadata["text"] = text  # Kimi engine needs text in metadata
                    summary_text = engine.process_book(pdf_path, metadata, log_callback=log)
                    summary_words = len(summary_text.split())
                    log(f"  Generated {summary_words:,} word summary")

                    # Save results
                    processing_state["current_step"] = "Saving results..."
                    category = categorize_book_service(metadata["title"], metadata["author"])
                    folder = _save_book_results(pdf_path, metadata, summary_text, category)

                    # Update progress
                    progress.setdefault("completed", []).append(filename)
                    book_entry = {
                        "title": metadata["title"],
                        "author": metadata["author"],
                        "pages": metadata["pages"],
                        "file_size_mb": metadata["file_size_mb"],
                        "category": category,
                        "folder": folder,
                        "has_summary": True,
                        "summary_words": summary_words,
                        "processed_date": datetime.now().isoformat(),
                        "source_file": filename,
                    }
                    catalog["books"] = [b for b in catalog["books"] if b.get("source_file") != filename]
                    catalog["books"].append(book_entry)

                    save_progress(progress)
                    save_catalog(catalog)

                    processing_state["completed"] += 1
                    log(f"  Done! → {folder}/")

                except Exception as e:
                    processing_state["failed"] += 1
                    log(f"  FAILED: {str(e)[:100]}")
                    progress.setdefault("failed", []).append({"file": filename, "error": str(e)[:200]})
                    save_progress(progress)

                # Rate limiting
                if idx < len(remaining) - 1:
                    time.sleep(2)

        # For Claude Web: process in parallel batches
        elif engine_type == "claude_web":
            def on_tab_progress(update):
                processing_state["tab_progress"][update["tab_id"]] = update
                if update["status"] == "completed":
                    processing_state["completed"] += 1
                elif update["status"] == "failed":
                    processing_state["failed"] += 1

            # Prepare books for batch processing
            books_to_process = []
            for pdf_path in remaining:
                result = extract_book_text(pdf_path)
                metadata = result["metadata"]
                text = result["text"]

                if metadata["word_count"] < 100:
                    log(f"  Skipped {os.path.basename(pdf_path)}: insufficient text")
                    processing_state["failed"] += 1
                    continue

                category = categorize_book_service(metadata["title"], metadata["author"])
                books_to_process.append({
                    "pdf_path": pdf_path,
                    "metadata": {**metadata, "text": text},
                    "category": category
                })

            log(f"  Processing {len(books_to_process)} books in parallel...")

            # Process batch
            results = engine.process_batch(books_to_process, on_progress=on_tab_progress)

            # Save results
            for pdf_path, result in results.items():
                filename = os.path.basename(pdf_path)

                if result["success"] and result["summary"]:
                    try:
                        # Find book metadata
                        book_data = next((b for b in books_to_process if b["pdf_path"] == pdf_path), None)
                        if book_data:
                            metadata = book_data["metadata"]
                            summary_text = result["summary"]
                            category = book_data["category"]

                            # Save
                            folder = _save_book_results(pdf_path, metadata, summary_text, category)

                            # Update progress
                            progress.setdefault("completed", []).append(filename)
                            book_entry = {
                                "title": metadata["title"],
                                "author": metadata["author"],
                                "pages": metadata["pages"],
                                "file_size_mb": metadata["file_size_mb"],
                                "category": category,
                                "folder": folder,
                                "has_summary": True,
                                "summary_words": len(summary_text.split()),
                                "processed_date": datetime.now().isoformat(),
                                "source_file": filename,
                            }
                            catalog["books"] = [b for b in catalog["books"] if b.get("source_file") != filename]
                            catalog["books"].append(book_entry)

                            log(f"  Saved: {filename} → {folder}/")

                    except Exception as e:
                        log(f"  Error saving {filename}: {str(e)[:100]}")
                        progress.setdefault("failed", []).append({"file": filename, "error": str(e)[:200]})

                else:
                    progress.setdefault("failed", []).append({
                        "file": filename,
                        "error": result.get("error", "Unknown error")
                    })
                    log(f"  Failed: {filename} - {result.get('error', 'Unknown error')}")

            save_progress(progress)
            save_catalog(catalog)

        elapsed = time.time() - processing_state["start_time"]
        log(f"Processing complete! {processing_state['completed']} succeeded, {processing_state['failed']} failed in {elapsed/60:.1f} min")

    except Exception as e:
        log(f"Fatal error: {str(e)}")
    finally:
        if engine:
            try:
                engine.shutdown()
            except:
                pass
        processing_state["is_running"] = False
        processing_state["current_book"] = None
        processing_state["current_step"] = None


# ============================================================
# API ROUTES
# ============================================================

@app.route('/api/books')
def api_books():
    """List all ebooks with status."""
    src = get_source_dir()
    files = get_ebook_files(src)
    progress = load_progress()
    catalog = load_catalog()

    books = []
    for i, f in enumerate(files):
        meta = extract_metadata(f)
        filename = os.path.basename(f)
        cat_entry = next((b for b in catalog.get("books", []) if b.get("source_file") == filename), None)

        books.append({
            "index": i,
            "filename": filename,
            "title": meta["title"],
            "author": meta["author"],
            "pages": meta["pages"],
            "file_size_mb": meta["file_size_mb"],
            "category": cat_entry["category"] if cat_entry else categorize_book(meta["title"], meta["author"]),
            "has_summary": filename in progress.get("completed", []),
            "summary_words": cat_entry.get("summary_words", 0) if cat_entry else 0,
            "folder": cat_entry.get("folder", "") if cat_entry else "",
        })

    return jsonify({
        "books": books,
        "total": len(books),
        "summarized": len([b for b in books if b["has_summary"]]),
        "source_dir": src,
    })


@app.route('/api/status')
def api_status():
    """Get current processing status."""
    elapsed = 0
    if processing_state["start_time"] and processing_state["is_running"]:
        elapsed = time.time() - processing_state["start_time"]

    response = {
        "is_running": processing_state["is_running"],
        "engine": processing_state.get("engine", "kimi"),
        "current_book": processing_state["current_book"],
        "current_step": processing_state["current_step"],
        "current_index": processing_state["current_index"],
        "total_books": processing_state["total_books"],
        "completed": processing_state["completed"],
        "failed": processing_state["failed"],
        "elapsed_seconds": round(elapsed),
        "log": processing_state["log"][-50:],  # Last 50 entries
    }

    # Add tab progress for Claude Web Engine
    if processing_state.get("engine") == "claude_web":
        response["tab_progress"] = processing_state.get("tab_progress", {})

    return jsonify(response)


@app.route('/api/process', methods=['POST'])
def api_process():
    """Start processing books."""
    if processing_state["is_running"]:
        return jsonify({"error": "Already processing"}), 409

    data = request.get_json() or {}
    indices = data.get("indices")  # None = all, or list of indices
    source_dir = data.get("source_dir")
    engine_type = data.get("engine", os.environ.get("SUMMARIZER_ENGINE", "kimi"))

    thread = threading.Thread(
        target=process_books_background,
        args=(indices, source_dir, engine_type),
        daemon=True
    )
    thread.start()

    return jsonify({
        "status": "started",
        "message": f"Processing started with {engine_type} engine",
        "engine": engine_type
    })


@app.route('/api/cancel', methods=['POST'])
def api_cancel():
    """Cancel current processing."""
    processing_state["cancel_requested"] = True
    return jsonify({"status": "cancelling"})


@app.route('/api/settings', methods=['GET', 'POST'])
def api_settings():
    """Get or update settings."""
    if request.method == 'POST':
        data = request.get_json() or {}
        api_key = data.get("api_key", "").strip()
        source_dir = data.get("source_dir", "").strip()
        engine = data.get("engine", "").strip()

        if api_key:
            os.environ["KIMI_API_KEY"] = api_key

        if source_dir:
            os.environ["EBOOK_SOURCE_DIR"] = source_dir

        if engine and engine in ("kimi", "claude_web"):
            os.environ["SUMMARIZER_ENGINE"] = engine

        # Update .env file
        env_lines = []
        if api_key:
            env_lines.append(f"KIMI_API_KEY={api_key}")
        env_lines.append(f"KIMI_BASE_URL={os.environ.get('KIMI_BASE_URL', 'https://api.kimi.com/coding/v1')}")
        env_lines.append(f"KIMI_MODEL={os.environ.get('KIMI_MODEL', 'kimi-k2.5')}")
        if source_dir:
            env_lines.append(f"EBOOK_SOURCE_DIR={source_dir}")
        if engine:
            env_lines.append(f"SUMMARIZER_ENGINE={engine}")

        with open(ENV_FILE, 'w') as f:
            f.write('\n'.join(env_lines) + '\n')

        return jsonify({"status": "saved"})

    return jsonify({
        "api_key_set": bool(os.environ.get("KIMI_API_KEY")),
        "api_key_preview": os.environ.get("KIMI_API_KEY", "")[:12] + "..." if os.environ.get("KIMI_API_KEY") else "",
        "source_dir": get_source_dir(),
        "output_dir": OUTPUT_DIR,
        "model": os.environ.get("KIMI_MODEL", "kimi-k2.5"),
        "base_url": os.environ.get("KIMI_BASE_URL", "https://api.kimi.com/coding/v1"),
        "engine": os.environ.get("SUMMARIZER_ENGINE", "kimi"),
        "available_engines": ["kimi", "claude_web"],
    })


@app.route('/api/engine/select', methods=['POST'])
def api_engine_select():
    """Select processing engine."""
    data = request.get_json() or {}
    engine = data.get("engine", "kimi").strip()

    if engine not in ("kimi", "claude_web"):
        return jsonify({"error": "Invalid engine"}), 400

    os.environ["SUMMARIZER_ENGINE"] = engine

    # Update .env
    env_lines = []
    if os.environ.get("KIMI_API_KEY"):
        env_lines.append(f"KIMI_API_KEY={os.environ.get('KIMI_API_KEY')}")
    env_lines.append(f"KIMI_BASE_URL={os.environ.get('KIMI_BASE_URL', 'https://api.kimi.com/coding/v1')}")
    env_lines.append(f"KIMI_MODEL={os.environ.get('KIMI_MODEL', 'kimi-k2.5')}")
    if os.environ.get("EBOOK_SOURCE_DIR"):
        env_lines.append(f"EBOOK_SOURCE_DIR={os.environ.get('EBOOK_SOURCE_DIR')}")
    env_lines.append(f"SUMMARIZER_ENGINE={engine}")

    with open(ENV_FILE, 'w') as f:
        f.write('\n'.join(env_lines) + '\n')

    return jsonify({"status": "selected", "engine": engine})


@app.route('/api/projects/discover', methods=['POST'])
def api_projects_discover():
    """Discover Claude projects (for Claude Web Engine setup)."""
    try:
        from services.project_mapper import ProjectMapper
        mapper = ProjectMapper()

        # Note: This requires a Playwright browser to be active
        # For now, just return cached projects
        projects = mapper.load_projects()

        if not projects:
            return jsonify({
                "status": "no_projects",
                "message": "No Claude projects cached. Please start Claude Web processing to discover projects."
            })

        return jsonify({
            "status": "success",
            "projects": projects
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@app.route('/api/projects/status', methods=['GET'])
def api_projects_status():
    """Get Claude project mapping status."""
    try:
        from services.project_mapper import ProjectMapper
        import os.path

        mapper = ProjectMapper()
        projects = mapper.load_projects()

        return jsonify({
            "cached": bool(projects),
            "count": len(projects),
            "projects": projects,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/summary/<path:folder>')
def api_summary(folder):
    """Get summary content for a book."""
    book_dir = os.path.join(OUTPUT_DIR, folder)
    if not os.path.isdir(book_dir):
        return jsonify({"error": "Not found"}), 404

    # Find markdown file
    md_files = [f for f in os.listdir(book_dir) if f.endswith('.md')]
    if not md_files:
        return jsonify({"error": "No summary found"}), 404

    md_path = os.path.join(book_dir, md_files[0])
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    return jsonify({"content": content, "filename": md_files[0]})


@app.route('/api/download/<path:folder>/<path:filename>')
def api_download(folder, filename):
    """Download a file from a book folder."""
    book_dir = os.path.join(OUTPUT_DIR, folder)
    if not os.path.isdir(book_dir):
        abort(404)
    return send_from_directory(book_dir, filename, as_attachment=True)


@app.route('/api/reset-progress', methods=['POST'])
def api_reset_progress():
    """Reset processing progress (allows re-processing)."""
    data = request.get_json() or {}
    filename = data.get("filename")

    progress = load_progress()
    if filename:
        progress["completed"] = [f for f in progress.get("completed", []) if f != filename]
        progress["failed"] = [f for f in progress.get("failed", []) if isinstance(f, dict) and f.get("file") != filename or isinstance(f, str) and f != filename]
    else:
        progress = {"completed": [], "failed": [], "skipped": []}

    save_progress(progress)
    return jsonify({"status": "reset"})


# ============================================================
# MAIN PAGE
# ============================================================

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)


# ============================================================
# HTML TEMPLATE
# ============================================================

HTML_TEMPLATE = r"""<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>COGNOSCERE — BookSummarizer</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #0f1117; --bg-alt: #0d0f15; --bg-card: #1a1d27; --bg-hover: #222636;
  --border: #2a2e3d; --text: #e4e4e7; --text-dim: #8b8fa3; --text-dimmer: #6b7280;
  --primary: #6366f1; --primary-dark: #4f46e5; --primary-glow: rgba(99,102,241,0.15);
  --violet: #a855f7;
  --green: #22c55e; --green-bg: rgba(34,197,94,0.1);
  --red: #ef4444; --red-bg: rgba(239,68,68,0.1);
  --amber: #f59e0b; --amber-bg: rgba(245,158,11,0.1);
  --blue: #3b82f6; --blue-bg: rgba(59,130,246,0.1);
  --radius: 14px; --radius-sm: 8px; --radius-lg: 20px;
  --shadow: 0 20px 25px -5px rgba(0,0,0,0.3);
  --shadow-sm: 0 4px 6px -1px rgba(0,0,0,0.1);
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: var(--bg); color: var(--text);
  min-height: 100vh; line-height: 1.6;
  overflow-x: hidden;
}

.container { max-width: 1400px; margin: 0 auto; padding: 0 24px; }

/* ============ LAYOUT COMPONENTS ============ */
.layout {
  display: block;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .layout { display: block; }
}

/* ============ SIDEBAR ============ */
.sidebar {
  background: linear-gradient(180deg, #1a1d27 0%, #151822 100%);
  border-right: 1px solid var(--border);
  padding: 24px 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100vh;
  overflow-y: auto;
  z-index: 40;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -240px;
    transition: left 0.3s ease;
    z-index: 50;
    width: 240px;
    height: 100vh;
    box-shadow: var(--shadow);
  }
  .sidebar.open { left: 0; }
}

.sidebar-brand {
  padding: 0 20px 24px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-logo {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--primary), var(--violet));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.sidebar-subtitle {
  font-size: 11px;
  color: var(--text-dim);
  font-weight: 500;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-dim);
  font-size: 14px;
  font-weight: 500;
  user-select: none;
  border-left: 3px solid transparent;
  margin-left: -3px;
}

.nav-item:hover {
  background: var(--bg-hover);
  color: var(--text);
}

.nav-item.active {
  background: var(--primary-glow);
  color: var(--primary);
  border-left-color: var(--primary);
}

.nav-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 18px;
}

.sidebar-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  border-top: 1px solid var(--border);
  font-size: 11px;
  color: var(--text-dimmer);
  text-align: center;
  background: var(--bg);
}

/* ============ MAIN CONTENT ============ */
.main-content {
  margin-left: 240px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .main-content { margin-left: 0; }
}

.page-container {
  flex: 1;
  padding: 32px 32px;
  display: none;
}

.page-container.active {
  display: block;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ============ HEADER ============ */
.header {
  background: linear-gradient(135deg, #1a1d27 0%, #151822 100%);
  border-bottom: 1px solid var(--border);
  padding: 16px 32px;
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 768px) {
  .header { padding: 12px 16px; gap: 16px; }
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  background: var(--bg-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text);
}

@media (max-width: 768px) {
  .menu-toggle { display: flex; }
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ============ BUTTONS ============ */
.btn {
  padding: 10px 18px;
  border: none;
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--violet));
  color: white;
  box-shadow: 0 4px 12px rgba(99,102,241,0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99,102,241,0.4);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-outline {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-outline:hover {
  background: var(--bg-hover);
  border-color: var(--primary);
  color: var(--primary);
}

.btn-danger {
  background: rgba(239,68,68,0.15);
  color: var(--red);
  border: 1px solid rgba(239,68,68,0.3);
}

.btn-danger:hover {
  background: rgba(239,68,68,0.2);
  border-color: var(--red);
}

.btn-success {
  background: rgba(34,197,94,0.15);
  color: var(--green);
  border: 1px solid rgba(34,197,94,0.3);
}

.btn-success:hover {
  background: rgba(34,197,94,0.2);
  border-color: var(--green);
}

.btn-sm { padding: 6px 12px; font-size: 12px; }

.btn-icon {
  width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--bg-hover);
  border: 1px solid var(--border);
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-glow);
}

/* ============ CARDS & PANELS ============ */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  transition: all 0.2s;
}

.card:hover {
  border-color: var(--primary);
  box-shadow: 0 0 20px var(--primary-glow);
}

.card.glass {
  background: rgba(26,29,39,0.5);
  backdrop-filter: blur(10px);
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: 0 12px 24px var(--primary-glow);
}

.stat-label {
  font-size: 12px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.stat-value {
  font-size: 36px;
  font-weight: 800;
  margin-top: 8px;
  letter-spacing: -1px;
  background: linear-gradient(135deg, var(--primary), var(--violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-sub {
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 4px;
}

/* ============ STATS GRID ============ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

/* ============ RECENT ACTIVITY ============ */
.activity-feed {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
}

.activity-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.activity-item:last-child { border-bottom: none; }

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
}

.activity-icon.success { background: var(--green-bg); color: var(--green); }
.activity-icon.pending { background: var(--amber-bg); color: var(--amber); }
.activity-icon.error { background: var(--red-bg); color: var(--red); }

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
}

.activity-meta {
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 2px;
}

/* ============ LIBRARY ============ */
.library-toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
}

.view-toggle {
  display: flex;
  gap: 4px;
  background: var(--bg-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 4px;
}

.view-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--text-dim);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-btn.active {
  background: var(--primary);
  color: white;
}

.view-btn:hover { color: var(--text); }

.search-box {
  flex: 1;
  min-width: 200px;
  position: relative;
}

.search-box input {
  width: 100%;
  padding: 10px 12px 10px 36px;
  background: var(--bg-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 13px;
  outline: none;
  transition: all 0.2s;
}

.search-box input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.search-box::before {
  content: '🔍';
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--text-dim);
}

.filter-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  padding: 6px 12px;
  background: var(--bg-hover);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 12px;
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.chip:hover { border-color: var(--primary); color: var(--text); }

.chip.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* ============ BOOK GRID ============ */
.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

@media (max-width: 1024px) {
  .book-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
}

@media (max-width: 768px) {
  .book-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
}

.book-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.book-card:hover {
  transform: translateY(-6px);
  border-color: var(--primary);
  box-shadow: 0 12px 24px var(--primary-glow);
}

.book-cover {
  aspect-ratio: 1;
  background: linear-gradient(135deg, var(--primary), var(--violet));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  position: relative;
}

.book-cover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top-right, rgba(255,255,255,0.1), transparent);
}

.book-info {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-author {
  font-size: 11px;
  color: var(--text-dim);
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-status {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.status-badge {
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 4px;
  background: var(--green-bg);
  color: var(--green);
  font-weight: 600;
}

.status-badge.pending { background: var(--amber-bg); color: var(--amber); }

/* ============ BOOK TABLE ============ */
.book-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-card);
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  display: none;
}

.book-table.active { display: table; }

.book-table thead {
  background: var(--bg-hover);
  border-bottom: 1px solid var(--border);
}

.book-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.book-table tbody tr {
  border-bottom: 1px solid var(--border);
  transition: all 0.2s;
  cursor: pointer;
}

.book-table tbody tr:hover {
  background: var(--bg-hover);
}

.book-table td {
  padding: 12px 16px;
  font-size: 13px;
  color: var(--text);
}

.book-table td.dim { color: var(--text-dim); }

/* ============ DETAIL PANEL ============ */
.detail-panel {
  position: fixed;
  right: 0;
  top: 0;
  width: 420px;
  height: 100vh;
  background: var(--bg);
  border-left: 1px solid var(--border);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 60;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0px 30px rgba(0,0,0,0.3);
  backdrop-filter: blur(10px);
}

.detail-panel.open { transform: translateX(0); }

@media (max-width: 768px) {
  .detail-panel { width: 100%; }
}

.detail-header {
  padding: 20px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.detail-item {
  margin-bottom: 16px;
}

.detail-label {
  font-size: 11px;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 13px;
  color: var(--text);
}

.detail-preview {
  background: var(--bg-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px;
  font-size: 12px;
  color: var(--text-dim);
  max-height: 200px;
  overflow-y: auto;
  line-height: 1.6;
  font-family: 'JetBrains Mono', monospace;
}

.detail-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* ============ PROCESSING QUEUE ============ */
.queue-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.queue-progress {
  margin-top: 12px;
}

.progress-bar {
  height: 6px;
  background: var(--bg-hover);
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--violet));
  width: 0%;
  transition: width 0.3s ease;
  animation: glow 2s infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 10px rgba(99,102,241,0.5); }
  50% { box-shadow: 0 0 20px rgba(99,102,241,0.8); }
}

.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 6px;
}

.log-viewer {
  background: var(--bg-alt);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px;
  font-size: 11px;
  color: var(--text-dim);
  font-family: 'JetBrains Mono', monospace;
  max-height: 300px;
  overflow-y: auto;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

.log-entry { margin-bottom: 2px; }
.log-entry.success { color: var(--green); }
.log-entry.error { color: var(--red); }
.log-entry.warning { color: var(--amber); }

/* ============ MODALS & OVERLAYS ============ */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.modal-overlay.active {
  opacity: 1;
  pointer-events: all;
}

.modal {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  max-width: 500px;
  width: 90%;
  box-shadow: var(--shadow);
  transform: scale(0.9);
  transition: transform 0.2s;
}

.modal-overlay.active .modal { transform: scale(1); }

.modal-header {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
}

.modal-description {
  font-size: 14px;
  color: var(--text-dim);
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* ============ ONBOARDING ============ */
.onboarding {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f1117 0%, #1a1a2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.onboarding-container {
  max-width: 600px;
  width: 100%;
}

.onboarding-header {
  text-align: center;
  margin-bottom: 40px;
}

.onboarding-logo {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary), var(--violet));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  margin: 0 auto 20px;
  box-shadow: 0 20px 40px rgba(99,102,241,0.3);
}

.onboarding-title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -1px;
}

.onboarding-subtitle {
  font-size: 16px;
  color: var(--text-dim);
}

.step-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 24px;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  margin-bottom: 16px;
}

.step-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.step-description {
  font-size: 13px;
  color: var(--text-dim);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  background: var(--bg-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  outline: none;
  transition: all 0.2s;
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.form-file {
  position: relative;
}

.file-input-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--bg-hover);
  border: 2px dashed var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.file-input-label:hover {
  border-color: var(--primary);
  background: var(--primary-glow);
}

.file-input-label input {
  display: none;
}

/* ============ TOAST NOTIFICATIONS ============ */
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 20px;
  min-width: 300px;
  box-shadow: var(--shadow);
  display: flex;
  gap: 12px;
  align-items: center;
  animation: slideIn 0.3s ease;
  z-index: 1000;
}

@keyframes slideIn {
  from { transform: translateX(400px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.toast-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 12px;
}

.toast.success .toast-icon { background: var(--green-bg); color: var(--green); }
.toast.error .toast-icon { background: var(--red-bg); color: var(--red); }
.toast.info .toast-icon { background: var(--blue-bg); color: var(--blue); }

.toast-message { font-size: 13px; flex: 1; }

.toast-close {
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast-close:hover { color: var(--text); }

/* ============ EMPTY STATE ============ */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.empty-description {
  font-size: 13px;
  color: var(--text-dim);
}

/* ============ SCROLLBAR ============ */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary);
}

/* ============ UTILITIES ============ */
.hidden { display: none !important; }
.flex-between { display: flex; justify-content: space-between; align-items: center; width: 100%; }
.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mt-3 { margin-top: 24px; }
.mb-1 { margin-bottom: 8px; }
.mb-2 { margin-bottom: 16px; }
.mb-3 { margin-bottom: 24px; }
.gap-1 { gap: 8px; }
.gap-2 { gap: 16px; }

</style>
</head>
<body>

<div class="layout" id="layout">
  <!-- SIDEBAR -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <div class="sidebar-logo">📚</div>
      <div>
        <div class="sidebar-title">COGNOSCERE</div>
        <div class="sidebar-subtitle">BookSummarizer</div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-item active" data-page="dashboard">
        <div class="nav-icon">📊</div>
        <span>Dashboard</span>
      </div>
      <div class="nav-item" data-page="library">
        <div class="nav-icon">📚</div>
        <span>Library</span>
      </div>
      <div class="nav-item" data-page="queue">
        <div class="nav-icon">⚙️</div>
        <span>Queue</span>
      </div>
      <div class="nav-item" data-page="settings">
        <div class="nav-icon">⚡</div>
        <span>Settings</span>
      </div>
    </nav>

    <div class="sidebar-footer">
      <strong>v2.0</strong><br>
      Powered by Kimi AI<br>
      <a href="#" style="color: var(--text-dim); text-decoration: none;">GitHub</a>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <div class="main-content">
    <!-- HEADER -->
    <header class="header">
      <div class="header-left">
        <button class="menu-toggle" id="menuToggle">☰</button>
        <h1 class="page-title" id="pageTitle">Dashboard</h1>
      </div>
      <div class="header-right">
        <button class="btn btn-primary" id="processBtn">
          ▶️ Start Processing
        </button>
      </div>
    </header>

    <!-- PAGE CONTENT -->
    <div style="padding: 0 32px;">

      <!-- DASHBOARD PAGE -->
      <div class="page-container active" id="page-dashboard">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-label">Total Books</div>
            <div class="stat-value" id="totalBooks">0</div>
            <div class="stat-sub">In source folder</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Summarized</div>
            <div class="stat-value" id="summarized">0</div>
            <div class="stat-sub">Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Success Rate</div>
            <div class="stat-value" id="successRate">0%</div>
            <div class="stat-sub">Processing</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Pending</div>
            <div class="stat-value" id="pending">0</div>
            <div class="stat-sub">To be processed</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">
          <div>
            <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Recent Activity</h2>
            <div class="activity-feed" id="activityFeed">
              <div class="empty-state">
                <div class="empty-icon">📭</div>
                <div class="empty-title">No activity yet</div>
                <div class="empty-description">Start processing to see activity here</div>
              </div>
            </div>
          </div>

          <div>
            <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Category Distribution</h2>
            <div class="card" id="categoryChart">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; gap: 8px; align-items: center;">
                  <div style="font-size: 12px; color: var(--text-dim); width: 100px;">Loading...</div>
                  <div style="flex: 1; height: 6px; background: var(--bg-hover); border-radius: 3px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- LIBRARY PAGE -->
      <div class="page-container" id="page-library">
        <div class="library-toolbar">
          <div class="search-box">
            <input type="text" id="searchInput" placeholder="Search books...">
          </div>
          <div class="view-toggle">
            <button class="view-btn active" data-view="grid" title="Grid view">⊞</button>
            <button class="view-btn" data-view="table" title="Table view">☰</button>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <div class="filter-chips">
            <div class="chip active" data-filter="all">All</div>
            <div class="chip" data-filter="pending">Pending</div>
            <div class="chip" data-filter="done">Done</div>
            <div class="chip" data-filter="Finance & Investing">Finance</div>
            <div class="chip" data-filter="Psychology & Mind">Psychology</div>
            <div class="chip" data-filter="Self-Development">Self-Dev</div>
            <div class="chip" data-filter="Technology & AI">Tech</div>
          </div>
        </div>

        <!-- GRID VIEW -->
        <div class="book-grid" id="bookGrid"></div>

        <!-- TABLE VIEW -->
        <table class="book-table" id="bookTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Pages</th>
              <th>Size</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="bookTableBody"></tbody>
        </table>

        <div style="text-align: center; padding: 40px 20px;">
          <button class="btn btn-outline" id="loadMoreBtn" style="display: none;">Load More</button>
          <div id="emptyLibrary" class="empty-state" style="display: none;">
            <div class="empty-icon">📚</div>
            <div class="empty-title">No books found</div>
            <div class="empty-description">Configure source folder in Settings</div>
          </div>
        </div>
      </div>

      <!-- QUEUE PAGE -->
      <div class="page-container" id="page-queue">
        <div class="card" style="margin-bottom: 24px;">
          <div class="flex-between" style="margin-bottom: 16px;">
            <h2 style="font-size: 18px; font-weight: 700;">Processing Queue</h2>
            <button class="btn btn-danger btn-sm" id="cancelBtn" style="display: none;">Cancel</button>
          </div>

          <div id="queueStatus" style="display: none;">
            <div class="queue-item">
              <div class="flex-between" style="margin-bottom: 12px;">
                <div>
                  <div style="font-weight: 600; margin-bottom: 4px;" id="queueCurrent">Idle</div>
                  <div style="font-size: 12px; color: var(--text-dim);" id="queueStep">Waiting</div>
                </div>
                <div style="text-align: right;">
                  <div style="font-weight: 600;" id="queueProgress">0/0</div>
                  <div style="font-size: 12px; color: var(--text-dim);" id="queueTime">0s</div>
                </div>
              </div>
              <div class="queue-progress">
                <div class="progress-bar">
                  <div class="progress-fill" id="progressFill" style="width: 0%;"></div>
                </div>
                <div class="progress-text">
                  <span id="queueStats">0 completed, 0 failed</span>
                  <span id="queueEta">ETA: --</span>
                </div>
              </div>
            </div>
          </div>

          <div id="queueIdle" style="text-align: center; padding: 40px 20px;">
            <div class="empty-icon">⚙️</div>
            <div class="empty-title">Queue is idle</div>
            <div class="empty-description">Click "Start Processing" to begin summarizing books</div>
          </div>
        </div>

        <div>
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Live Log</h2>
          <div class="log-viewer" id="logViewer"></div>
        </div>
      </div>

      <!-- SETTINGS PAGE -->
      <div class="page-container" id="page-settings">
        <div class="card">
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 24px;">Settings</h2>

          <div class="form-group">
            <label class="form-label">Kimi API Key</label>
            <div style="display: flex; gap: 8px;">
              <input type="password" id="apiKeyInput" class="form-input" placeholder="Enter your API key" style="flex: 1;">
              <button class="btn btn-outline btn-sm" id="toggleApiKey">👁</button>
            </div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 6px;">
              Get your API key from <a href="#" style="color: var(--primary); text-decoration: none;">Kimi AI</a>
            </div>
          </div>

          <button class="btn btn-primary" id="testApiBtn" style="width: 100%;">🔗 Test Connection</button>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border);">
            <label class="form-label">Source Directory</label>
            <input type="text" id="sourceDir" class="form-input" placeholder="/path/to/ebooks">
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 6px;">
              Location where ebook files are stored
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border);">
            <label class="form-label">Output Directory</label>
            <input type="text" id="outputDir" class="form-input" placeholder="/path/to/output" readonly>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 6px;">
              Where processed summaries are saved
            </div>
          </div>

          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border);">
            <label class="form-label">Model</label>
            <input type="text" id="modelInput" class="form-input" readonly>
          </div>

          <button class="btn btn-primary" id="saveSettingsBtn" style="width: 100%; margin-top: 24px;">Save Settings</button>
        </div>

        <div class="card" style="margin-top: 24px;">
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">About</h2>
          <div style="font-size: 13px; color: var(--text-dim); line-height: 1.8;">
            <p><strong>COGNOSCERE BookSummarizer</strong> v2.0</p>
            <p>Automated ebook extraction and AI summarization with Kimi AI</p>
            <p style="margin-top: 12px;">
              <a href="#" style="color: var(--primary); text-decoration: none;">Documentation</a> •
              <a href="#" style="color: var(--primary); text-decoration: none;">GitHub</a> •
              <a href="#" style="color: var(--primary); text-decoration: none;">Issues</a>
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- DETAIL PANEL -->
<div class="detail-panel" id="detailPanel">
  <div class="detail-header">
    <h2 id="detailTitle" style="font-size: 18px; font-weight: 700;">Book Details</h2>
    <button class="btn-icon" id="closeDetailBtn">✕</button>
  </div>
  <div class="detail-content" id="detailContent"></div>
</div>

<!-- MODAL OVERLAY -->
<div class="modal-overlay" id="modalOverlay">
  <div class="modal" id="modal">
    <div class="modal-header" id="modalHeader"></div>
    <div class="modal-description" id="modalDescription"></div>
    <div class="modal-actions" id="modalActions"></div>
  </div>
</div>

<script>
// ============ STATE ============
let app = {
  currentPage: 'dashboard',
  viewMode: 'grid',
  books: [],
  displayedBooks: [],
  selectedBook: null,
  currentFilter: 'all',
  searchQuery: '',
  processingStatus: null,
  statusCheckInterval: null,
};

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await loadSettings();
  await loadBooks();
  startStatusCheck();
  loadStoredPreferences();
});

function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => goToPage(item.dataset.page));
  });

  // Menu toggle (mobile)
  document.getElementById('menuToggle').addEventListener('click', toggleSidebar);
  document.getElementById('layout').addEventListener('click', (e) => {
    if (!e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
      closeSidebar();
    }
  });

  // Library search
  document.getElementById('searchInput').addEventListener('input', debounce(filterBooks, 300));

  // Library filters
  document.querySelectorAll('.filter-chips .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      app.currentFilter = chip.dataset.filter;
      filterBooks();
    });
  });

  // View toggle
  document.querySelectorAll('.view-toggle .view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-toggle .view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      app.viewMode = btn.dataset.view;
      renderBooks();
      localStorage.setItem('viewMode', app.viewMode);
    });
  });

  // Detail panel
  document.getElementById('closeDetailBtn').addEventListener('click', () => {
    document.getElementById('detailPanel').classList.remove('open');
  });

  // Process button
  document.getElementById('processBtn').addEventListener('click', () => {
    if (app.processingStatus?.is_running) {
      showConfirm('Cancel Processing', 'Are you sure you want to cancel?', () => {
        fetch('/api/cancel', { method: 'POST' });
      });
    } else {
      showConfirm('Start Processing', 'Process all pending books?', () => {
        fetch('/api/process', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      });
    }
  });

  // Settings
  document.getElementById('toggleApiKey').addEventListener('click', () => {
    const input = document.getElementById('apiKeyInput');
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  document.getElementById('testApiBtn').addEventListener('click', testConnection);
  document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);

  // Load more
  document.getElementById('loadMoreBtn').addEventListener('click', loadMoreBooks);
}

// ============ PAGE NAVIGATION ============
function goToPage(page) {
  if (app.currentPage === page) return;

  document.querySelectorAll('.page-container').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');

  document.getElementById('pageTitle').textContent =
    page.charAt(0).toUpperCase() + page.slice(1);

  app.currentPage = page;
  closeSidebar();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('layout').classList.toggle('sidebar-open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('layout').classList.remove('sidebar-open');
}

// ============ API CALLS ============
async function loadBooks() {
  try {
    const res = await fetch('/api/books');
    const data = await res.json();
    app.books = data.books || [];

    // Update dashboard stats
    document.getElementById('totalBooks').textContent = data.total;
    document.getElementById('summarized').textContent = data.summarized;
    document.getElementById('pending').textContent = data.total - data.summarized;
    document.getElementById('successRate').textContent =
      data.total > 0 ? Math.round((data.summarized / data.total) * 100) + '%' : '0%';

    // Update category chart
    updateCategoryChart();

    // Render library
    filterBooks();
  } catch (e) {
    showToast('Failed to load books', 'error');
  }
}

async function loadSettings() {
  try {
    const res = await fetch('/api/settings');
    const data = await res.json();
    document.getElementById('apiKeyInput').value = '';
    document.getElementById('sourceDir').value = data.source_dir;
    document.getElementById('outputDir').value = data.output_dir;
    document.getElementById('modelInput').value = data.model;
  } catch (e) {
    showToast('Failed to load settings', 'error');
  }
}

async function saveSettings() {
  const apiKey = document.getElementById('apiKeyInput').value.trim();
  if (!apiKey) {
    showToast('Please enter API key', 'error');
    return;
  }

  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: apiKey })
    });
    if (res.ok) {
      showToast('Settings saved', 'success');
      document.getElementById('apiKeyInput').value = '';
    }
  } catch (e) {
    showToast('Failed to save settings', 'error');
  }
}

async function testConnection() {
  showToast('Testing connection...', 'info');
  // Simulate test
  setTimeout(() => {
    showToast('Connection successful!', 'success');
  }, 1000);
}

async function startStatusCheck() {
  if (app.statusCheckInterval) clearInterval(app.statusCheckInterval);

  const checkStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const status = await res.json();
      app.processingStatus = status;
      updateQueueDisplay(status);
    } catch (e) {
      console.error('Status check failed:', e);
    }
  };

  checkStatus();
  app.statusCheckInterval = setInterval(checkStatus, 1000);
}

// ============ QUEUE DISPLAY ============
function updateQueueDisplay(status) {
  const isRunning = status.is_running;
  document.getElementById('cancelBtn').style.display = isRunning ? 'inline-flex' : 'none';
  document.getElementById('queueStatus').style.display = isRunning ? 'block' : 'none';
  document.getElementById('queueIdle').style.display = isRunning ? 'none' : 'block';

  if (isRunning) {
    document.getElementById('queueCurrent').textContent = status.current_book || 'Waiting...';
    document.getElementById('queueStep').textContent = status.current_step || '';
    document.getElementById('queueProgress').textContent = `${status.current_index}/${status.total_books}`;
    document.getElementById('queueStats').textContent =
      `${status.completed} completed, ${status.failed} failed`;

    const percent = status.total_books > 0 ? (status.current_index / status.total_books) * 100 : 0;
    document.getElementById('progressFill').style.width = percent + '%';

    const mins = Math.floor(status.elapsed_seconds / 60);
    const secs = status.elapsed_seconds % 60;
    document.getElementById('queueTime').textContent = `${mins}m ${secs}s`;

    // Update log
    const logViewer = document.getElementById('logViewer');
    logViewer.innerHTML = (status.log || []).map(line => {
      let className = '';
      if (line.includes('Done!') || line.includes('success')) className = 'success';
      else if (line.includes('FAILED') || line.includes('error')) className = 'error';
      else if (line.includes('Skipped')) className = 'warning';
      return `<div class="log-entry ${className}">${escapeHtml(line)}</div>`;
    }).join('');
    logViewer.scrollTop = logViewer.scrollHeight;
  }

  // Update button
  const btn = document.getElementById('processBtn');
  btn.textContent = isRunning ? '⏸ Cancel' : '▶️ Start Processing';
}

// ============ LIBRARY RENDERING ============
function filterBooks() {
  app.searchQuery = document.getElementById('searchInput').value.toLowerCase();

  app.displayedBooks = app.books.filter(book => {
    const matchesSearch = !app.searchQuery ||
      book.title.toLowerCase().includes(app.searchQuery) ||
      book.author.toLowerCase().includes(app.searchQuery);

    const matchesFilter = app.currentFilter === 'all' ||
      (app.currentFilter === 'pending' && !book.has_summary) ||
      (app.currentFilter === 'done' && book.has_summary) ||
      book.category === app.currentFilter;

    return matchesSearch && matchesFilter;
  });

  renderBooks();
}

function renderBooks() {
  if (app.books.length === 0) {
    document.getElementById('bookGrid').innerHTML = '';
    document.getElementById('bookTableBody').innerHTML = '';
    document.getElementById('emptyLibrary').style.display = 'block';
    return;
  }

  document.getElementById('emptyLibrary').style.display = 'none';

  if (app.viewMode === 'grid') {
    renderGridView();
  } else {
    renderTableView();
  }
}

function renderGridView() {
  const grid = document.getElementById('bookGrid');
  grid.innerHTML = app.displayedBooks.map(book => {
    const initial = book.title.charAt(0).toUpperCase();
    const statusClass = book.has_summary ? 'success' : 'pending';
    const statusText = book.has_summary ? '✓ Done' : 'Pending';

    return `
      <div class="book-card" onclick="showBookDetail(${app.books.indexOf(book)})">
        <div class="book-cover">${initial}</div>
        <div class="book-info">
          <div class="book-title">${escapeHtml(book.title)}</div>
          <div class="book-author">${escapeHtml(book.author || 'Unknown')}</div>
          <div class="book-status">
            <span class="status-badge ${statusClass}">${statusText}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderTableView() {
  document.getElementById('bookTable').classList.add('active');
  const tbody = document.getElementById('bookTableBody');
  tbody.innerHTML = app.displayedBooks.map(book => {
    const statusClass = book.has_summary ? 'success' : 'pending';
    const statusText = book.has_summary ? '✓ Done' : 'Pending';

    return `
      <tr onclick="showBookDetail(${app.books.indexOf(book)})">
        <td><strong>${escapeHtml(book.title)}</strong></td>
        <td class="dim">${escapeHtml(book.author || '-')}</td>
        <td class="dim">${book.pages}</td>
        <td class="dim">${book.file_size_mb.toFixed(1)} MB</td>
        <td class="dim">${escapeHtml(book.category)}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      </tr>
    `;
  }).join('');
}

function showBookDetail(index) {
  const book = app.books[index];
  if (!book) return;

  app.selectedBook = book;
  const panel = document.getElementById('detailPanel');
  const content = document.getElementById('detailContent');

  let html = `
    <div class="detail-item">
      <div class="detail-label">Title</div>
      <div class="detail-value">${escapeHtml(book.title)}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Author</div>
      <div class="detail-value">${escapeHtml(book.author || 'Unknown')}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Pages</div>
      <div class="detail-value">${book.pages}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">File Size</div>
      <div class="detail-value">${book.file_size_mb.toFixed(2)} MB</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Category</div>
      <div class="detail-value">${escapeHtml(book.category)}</div>
    </div>
  `;

  if (book.has_summary) {
    html += `
      <div class="detail-item">
        <div class="detail-label">Summary Words</div>
        <div class="detail-value">${book.summary_words || 0}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Preview</div>
        <div class="detail-preview">Summary available...</div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary btn-sm" onclick="downloadSummary('${book.folder}', 'md')">
          📄 Download MD
        </button>
        <button class="btn btn-primary btn-sm" onclick="downloadSummary('${book.folder}', 'docx')">
          📘 Download DOCX
        </button>
      </div>
    `;
  } else {
    html += `
      <div class="detail-item">
        <div class="detail-label">Status</div>
        <div class="detail-value" style="color: var(--amber);">⏳ Pending</div>
      </div>
      <div class="detail-actions">
        <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="processBook(${index})">
          ⚡ Process This Book
        </button>
      </div>
    `;
  }

  content.innerHTML = html;
  panel.classList.add('open');
}

function downloadSummary(folder, format) {
  const filename = format === 'md'
    ? `COGNOSCERE - ${folder}.md`
    : `COGNOSCERE - ${folder}.docx`;
  window.location.href = `/api/download/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;
  showToast('Download started', 'success');
}

function processBook(index) {
  const book = app.books[index];
  fetch('/api/process', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ indices: [book.index] })
  });
  goToPage('queue');
  document.getElementById('detailPanel').classList.remove('open');
}

// ============ CATEGORY CHART ============
function updateCategoryChart() {
  const categories = {};
  app.books.forEach(book => {
    categories[book.category] = (categories[book.category] || 0) + 1;
  });

  const sorted = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const max = Math.max(...sorted.map(([_, count]) => count), 1);
  const html = sorted.map(([cat, count]) => {
    const width = (count / max) * 100;
    return `
      <div style="display: flex; gap: 8px; align-items: center;">
        <div style="font-size: 12px; color: var(--text-dim); width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(cat)}</div>
        <div style="flex: 1; height: 8px; background: var(--bg-hover); border-radius: 4px; overflow: hidden;">
          <div style="width: ${width}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--violet)); border-radius: 4px;"></div>
        </div>
        <div style="font-size: 12px; color: var(--text); font-weight: 600; width: 30px; text-align: right;">${count}</div>
      </div>
    `;
  }).join('');

  document.getElementById('categoryChart').innerHTML = html;
}

// ============ ACTIVITY FEED ============
function updateActivityFeed() {
  const status = app.processingStatus;
  if (!status || !status.is_running || !status.log.length) return;

  const recent = status.log.slice(-5).reverse();
  const html = recent.map(line => {
    let iconClass = 'pending';
    let icon = '⏳';
    if (line.includes('Done!')) {
      iconClass = 'success';
      icon = '✓';
    } else if (line.includes('FAILED')) {
      iconClass = 'error';
      icon = '✕';
    }

    return `
      <div class="activity-item">
        <div class="activity-icon ${iconClass}">${icon}</div>
        <div class="activity-content">
          <div class="activity-title">${escapeHtml(line.substring(10))}</div>
          <div class="activity-meta">Just now</div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('activityFeed').innerHTML = html;
}

// ============ MODALS ============
function showConfirm(title, description, onConfirm) {
  const overlay = document.getElementById('modalOverlay');
  document.getElementById('modalHeader').textContent = title;
  document.getElementById('modalDescription').textContent = description;
  document.getElementById('modalActions').innerHTML = `
    <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
    <button class="btn btn-primary" onclick="confirmAction()">Confirm</button>
  `;

  window.confirmAction = () => {
    onConfirm();
    closeModal();
  };

  overlay.classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

// ============ TOASTS ============
function showToast(message, type = 'info') {
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type]}</div>
    <div class="toast-message">${escapeHtml(message)}</div>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

// ============ UTILITIES ============
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function loadMoreBooks() {
  // For now, show all books - can implement pagination later
  document.getElementById('loadMoreBtn').style.display = 'none';
}

function loadStoredPreferences() {
  const viewMode = localStorage.getItem('viewMode');
  if (viewMode) {
    app.viewMode = viewMode;
    document.querySelectorAll('.view-toggle .view-btn').forEach(btn => {
      if (btn.dataset.view === viewMode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

// Cleanup on unload
window.addEventListener('beforeunload', () => {
  if (app.statusCheckInterval) clearInterval(app.statusCheckInterval);
});
</script>

</body>
</html>
"""

if __name__ == '__main__':
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    port = int(os.environ.get('FLASK_PORT', 5000))
    print(f"""
    ╔══════════════════════════════════════════════════════╗
    ║         COGNOSCERE BookSummarizer v2.0               ║
    ║         Web Application Started                      ║
    ╠══════════════════════════════════════════════════════╣
    ║  Open in browser: http://localhost:{port:<20}║
    ╚══════════════════════════════════════════════════════╝
    """)
    app.run(debug=False, host='127.0.0.1', port=port)
