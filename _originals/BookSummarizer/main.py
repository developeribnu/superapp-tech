#!/usr/bin/env python3
"""
📚 BookSummarizer - Automated Book Summary System
==================================================
Extracts, summarizes, and organizes ebook collections into
beautifully formatted DOCX summaries with a web dashboard.

Usage:
    python main.py --source /path/to/ebooks
    python main.py --source /path/to/ebooks --limit 5
    python main.py --source /path/to/ebooks --book "Atomic Habits"
    python main.py --list --source /path/to/ebooks
    python main.py --dashboard --output /path/to/output
"""

import os
import sys
import json
import shutil
import argparse
import re
import time
from datetime import datetime

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from pdf_extractor import extract_book_text, get_ebook_files, extract_metadata
from summarizer import BookSummarizer, load_env_file
from docx_creator import create_book_summary_docx


# ============================================================
# CONFIGURATION
# ============================================================

DEFAULT_OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
PROGRESS_FILE = "progress.json"
CATALOG_FILE = "catalog.json"


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def sanitize_folder_name(name):
    """Create a safe folder name from book title."""
    # Remove or replace problematic characters
    name = re.sub(r'[<>:"/\\|?*]', '', name)
    name = re.sub(r'\s+', ' ', name).strip()
    # Limit length
    if len(name) > 80:
        name = name[:80].strip()
    return name


def load_progress(output_dir):
    """Load processing progress from file."""
    progress_path = os.path.join(output_dir, PROGRESS_FILE)
    if os.path.exists(progress_path):
        with open(progress_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"completed": [], "failed": [], "skipped": []}


def save_progress(output_dir, progress):
    """Save processing progress to file."""
    progress_path = os.path.join(output_dir, PROGRESS_FILE)
    with open(progress_path, 'w', encoding='utf-8') as f:
        json.dump(progress, f, indent=2, ensure_ascii=False)


def load_catalog(output_dir):
    """Load book catalog."""
    catalog_path = os.path.join(output_dir, CATALOG_FILE)
    if os.path.exists(catalog_path):
        with open(catalog_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"books": [], "last_updated": None, "total_books": 0, "total_summarized": 0}


def save_catalog(output_dir, catalog):
    """Save book catalog."""
    catalog["last_updated"] = datetime.now().isoformat()
    catalog["total_books"] = len(catalog["books"])
    catalog["total_summarized"] = len([b for b in catalog["books"] if b.get("has_summary")])

    catalog_path = os.path.join(output_dir, CATALOG_FILE)
    with open(catalog_path, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)


def categorize_book(title, author):
    """Auto-categorize a book based on title/author keywords."""
    title_lower = title.lower()
    author_lower = (author or "").lower()

    categories = {
        "Finance & Investing": [
            "money", "invest", "stock", "market", "financial", "wealth", "retire",
            "bitcoin", "wall street", "fund", "capital", "economics", "monetary",
            "portfolio", "trading", "hedge", "bogle", "buffett"
        ],
        "Psychology & Mind": [
            "brain", "mind", "psych", "emotion", "think", "cognitive", "habit",
            "behavior", "mental", "anxiety", "trauma", "stress", "mindful",
            "intelligence", "neuroscience"
        ],
        "Self-Development": [
            "habit", "success", "productive", "career", "grit", "strength",
            "confidence", "leadership", "getting things done", "time manage",
            "motivation", "discipline", "goal"
        ],
        "Relationships & Social": [
            "love", "relationship", "marriage", "friend", "social", "connect",
            "attachment", "empathy", "together", "lonely", "tribe", "communit"
        ],
        "Parenting & Family": [
            "child", "parent", "teen", "adolesc", "toddler", "baby", "family",
            "daughter", "son", "montessori", "discipline"
        ],
        "Health & Wellness": [
            "health", "sleep", "exercise", "body", "breath", "eat", "food",
            "burnout", "energy", "wellbeing", "fitness", "medical"
        ],
        "Business & Innovation": [
            "startup", "business", "entrepren", "innovati", "company", "lean",
            "design", "creative", "strategy", "management", "disrupt", "network"
        ],
        "Technology & AI": [
            "ai ", "artificial", "machine learn", "algorithm", "data", "tech",
            "software", "code", "program", "computer", "agent", "digital"
        ],
    }

    for category, keywords in categories.items():
        for kw in keywords:
            if kw in title_lower or kw in author_lower:
                return category

    return "General"


# ============================================================
# MAIN PROCESSING PIPELINE
# ============================================================

def list_books(source_dir):
    """List all ebook PDFs found in source directory."""
    files = get_ebook_files(source_dir)

    print(f"\n📚 Found {len(files)} ebooks in: {source_dir}\n")
    print(f"{'No.':<5} {'Title':<55} {'Author':<25} {'Pages':<8} {'Size':<8}")
    print("─" * 101)

    for i, f in enumerate(files, 1):
        meta = extract_metadata(f)
        title = meta["title"][:52] + "..." if len(meta["title"]) > 55 else meta["title"]
        author = meta["author"][:22] + "..." if len(meta["author"]) > 25 else meta["author"]
        print(f"{i:<5} {title:<55} {author:<25} {meta['pages']:<8} {meta['file_size_mb']:<8}")

    print(f"\n📊 Total: {len(files)} ebooks")
    return files


def process_single_book(pdf_path, output_dir, summarizer, progress, catalog, book_index, total_books):
    """Process a single book: extract → summarize → create DOCX → organize."""
    filename = os.path.basename(pdf_path)

    # Check if already processed
    if filename in progress.get("completed", []):
        print(f"  ⏭️  Already processed, skipping")
        return True

    print(f"\n{'='*70}")
    print(f"📖 [{book_index}/{total_books}] Processing: {filename[:60]}...")
    print(f"{'='*70}")

    # Step 1: Extract text
    print(f"\n  📄 Step 1/4: Extracting text from PDF...")
    try:
        result = extract_book_text(pdf_path)
        metadata = result["metadata"]
        text = result["text"]
        print(f"     ✅ Extracted {metadata['word_count']:,} words from {metadata['pages']} pages")
    except Exception as e:
        print(f"     ❌ Extraction failed: {e}")
        progress["failed"].append({"file": filename, "error": str(e), "step": "extraction"})
        return False

    # Check if extraction yielded enough text
    if metadata["word_count"] < 100:
        print(f"     ⚠️  Too little text extracted ({metadata['word_count']} words). Book may be image-based.")
        progress["skipped"].append({"file": filename, "reason": "insufficient_text"})
        return False

    # Step 2: Generate summary
    print(f"\n  🧠 Step 2/4: Generating AI summary...")
    try:
        summary_text = summarizer.generate_summary(text, metadata)
        summary_words = len(summary_text.split())
        print(f"     ✅ Generated {summary_words:,} word summary")
    except Exception as e:
        print(f"     ❌ Summarization failed: {e}")
        progress["failed"].append({"file": filename, "error": str(e), "step": "summarization"})
        return False

    # Step 3: Create folder structure
    print(f"\n  📁 Step 3/4: Organizing files...")
    folder_name = sanitize_folder_name(metadata["title"])
    book_dir = os.path.join(output_dir, folder_name)
    os.makedirs(book_dir, exist_ok=True)

    # Copy original ebook to folder
    try:
        dest_pdf = os.path.join(book_dir, filename)
        if not os.path.exists(dest_pdf):
            shutil.copy2(pdf_path, dest_pdf)
        print(f"     ✅ Ebook copied to folder")
    except Exception as e:
        print(f"     ⚠️  Could not copy ebook: {e}")

    # Save raw summary as markdown
    summary_md_path = os.path.join(book_dir, f"COGNOSCERE - {folder_name}.md")
    header = f"""# Rangkuman Buku: {metadata['title']}

**Penulis:** {metadata['author']}
**Jumlah Halaman:** {metadata['pages']}
**Ukuran File:** {metadata['file_size_mb']} MB
**Tanggal Rangkuman:** {datetime.now().strftime('%d %B %Y')}

---

"""
    with open(summary_md_path, 'w', encoding='utf-8') as f:
        f.write(header + summary_text)
    print(f"     ✅ Markdown summary saved")

    # Step 4: Create DOCX
    print(f"\n  📝 Step 4/4: Creating DOCX document...")
    try:
        docx_path = os.path.join(book_dir, f"COGNOSCERE - {folder_name}.docx")
        create_book_summary_docx(metadata, summary_text, docx_path)
        print(f"     ✅ DOCX summary created")
    except Exception as e:
        print(f"     ❌ DOCX creation failed: {e}")
        progress["failed"].append({"file": filename, "error": str(e), "step": "docx_creation"})
        # Don't return False - we at least have the markdown summary

    # Save extracted text (for future reference)
    text_path = os.path.join(book_dir, f"Extracted Text - {folder_name}.txt")
    with open(text_path, 'w', encoding='utf-8') as f:
        f.write(text)

    # Update progress
    progress["completed"].append(filename)

    # Update catalog
    category = categorize_book(metadata["title"], metadata["author"])
    book_entry = {
        "title": metadata["title"],
        "author": metadata["author"],
        "pages": metadata["pages"],
        "file_size_mb": metadata["file_size_mb"],
        "category": category,
        "folder": folder_name,
        "has_summary": True,
        "summary_words": summary_words,
        "processed_date": datetime.now().isoformat(),
        "source_file": filename,
    }

    # Remove existing entry if any
    catalog["books"] = [b for b in catalog["books"] if b.get("source_file") != filename]
    catalog["books"].append(book_entry)

    print(f"\n  ✅ COMPLETE: '{metadata['title']}' → {book_dir}/")
    return True


def run_pipeline(source_dir, output_dir, limit=None, book_filter=None, api_key=None):
    """Run the full book summarization pipeline."""

    print("""
╔══════════════════════════════════════════════════════════════╗
║             📚 BookSummarizer - Processing Pipeline         ║
║          Automated Book Extraction & Summarization          ║
╚══════════════════════════════════════════════════════════════╝
    """)

    # Setup
    os.makedirs(output_dir, exist_ok=True)
    progress = load_progress(output_dir)
    catalog = load_catalog(output_dir)

    # Find ebooks
    ebook_files = get_ebook_files(source_dir)
    print(f"📚 Found {len(ebook_files)} ebooks in source directory")
    print(f"✅ Already processed: {len(progress['completed'])}")
    print(f"❌ Previously failed: {len(progress['failed'])}")

    # Filter by book name if specified
    if book_filter:
        ebook_files = [f for f in ebook_files if book_filter.lower() in os.path.basename(f).lower()]
        print(f"🔍 Filtered to {len(ebook_files)} matching books")

    # Apply limit
    if limit:
        ebook_files = ebook_files[:limit]
        print(f"📊 Limited to first {limit} books")

    # Skip already completed
    remaining = [f for f in ebook_files if os.path.basename(f) not in progress["completed"]]
    print(f"📋 Remaining to process: {len(remaining)}")

    if not remaining:
        print("\n✅ All books have been processed! Nothing to do.")
        save_catalog(output_dir, catalog)
        return

    # Initialize COGNOSCERE summarizer
    try:
        summarizer = BookSummarizer(api_key=api_key)
    except ValueError as e:
        print(f"\n❌ {e}")
        return

    # Process each book
    start_time = time.time()
    success_count = 0
    fail_count = 0

    for i, pdf_path in enumerate(remaining, 1):
        try:
            success = process_single_book(
                pdf_path, output_dir, summarizer,
                progress, catalog, i, len(remaining)
            )
            if success:
                success_count += 1
            else:
                fail_count += 1
        except KeyboardInterrupt:
            print("\n\n⚠️  Processing interrupted by user")
            break
        except Exception as e:
            print(f"\n❌ Unexpected error: {e}")
            fail_count += 1
            progress["failed"].append({
                "file": os.path.basename(pdf_path),
                "error": str(e),
                "step": "unknown"
            })

        # Save progress after each book
        save_progress(output_dir, progress)
        save_catalog(output_dir, catalog)

        # Delay between books to avoid rate limiting
        if i < len(remaining):
            time.sleep(2)

    # Final report
    elapsed = time.time() - start_time
    print(f"""
╔══════════════════════════════════════════════════════════════╗
║                    📊 PROCESSING COMPLETE                    ║
╠══════════════════════════════════════════════════════════════╣
║  ✅ Successfully processed: {success_count:<30} ║
║  ❌ Failed: {fail_count:<43} ║
║  ⏱️  Total time: {elapsed/60:.1f} minutes{' '*(33-len(f'{elapsed/60:.1f}'))}║
║  📁 Output directory: {output_dir[:35]:<35} ║
╚══════════════════════════════════════════════════════════════╝
    """)

    # Save final state
    save_progress(output_dir, progress)
    save_catalog(output_dir, catalog)


# ============================================================
# CATALOG BUILDER (for already-extracted books without API)
# ============================================================

def build_catalog_only(source_dir, output_dir):
    """Build catalog from ebook files without summarizing."""
    os.makedirs(output_dir, exist_ok=True)
    catalog = load_catalog(output_dir)

    files = get_ebook_files(source_dir)
    print(f"📚 Building catalog for {len(files)} ebooks...")

    for f in files:
        meta = extract_metadata(f)
        filename = os.path.basename(f)
        category = categorize_book(meta["title"], meta["author"])

        # Check if summary exists
        folder_name = sanitize_folder_name(meta["title"])
        book_dir = os.path.join(output_dir, folder_name)
        has_summary = os.path.exists(os.path.join(book_dir, f"COGNOSCERE - {folder_name}.docx"))

        entry = {
            "title": meta["title"],
            "author": meta["author"],
            "pages": meta["pages"],
            "file_size_mb": meta["file_size_mb"],
            "category": category,
            "folder": folder_name,
            "has_summary": has_summary,
            "source_file": filename,
        }

        # Update or add
        catalog["books"] = [b for b in catalog["books"] if b.get("source_file") != filename]
        catalog["books"].append(entry)

    save_catalog(output_dir, catalog)
    print(f"✅ Catalog saved with {len(catalog['books'])} entries")
    return catalog


# ============================================================
# CLI ENTRY POINT
# ============================================================

def main():
    parser = argparse.ArgumentParser(
        description="📚 BookSummarizer - Automated Book Summary System",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python main.py --list --source ~/Downloads
  python main.py --source ~/Downloads --output ./summaries --limit 5
  python main.py --source ~/Downloads --book "Atomic Habits"
  python main.py --catalog --source ~/Downloads --output ./summaries
  python main.py --dashboard --output ./summaries
        """
    )

    parser.add_argument('--source', '-s', required=False,
                       help='Source directory containing ebook PDFs')
    parser.add_argument('--output', '-o', default=DEFAULT_OUTPUT_DIR,
                       help='Output directory for summaries (default: ./output)')
    parser.add_argument('--limit', '-l', type=int,
                       help='Maximum number of books to process')
    parser.add_argument('--book', '-b',
                       help='Process only books matching this title filter')
    parser.add_argument('--list', action='store_true',
                       help='List all ebook PDFs found in source directory')
    parser.add_argument('--catalog', action='store_true',
                       help='Build catalog without summarizing')
    parser.add_argument('--dashboard', action='store_true',
                       help='Generate web dashboard from catalog')
    parser.add_argument('--api-key', '-k',
                       help='Kimi API key (or set KIMI_API_KEY env var)')

    args = parser.parse_args()

    # Load .env file
    env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
    load_env_file(env_path)

    if args.list:
        if not args.source:
            print("❌ --source directory is required with --list")
            sys.exit(1)
        list_books(args.source)

    elif args.catalog:
        if not args.source:
            print("❌ --source directory is required with --catalog")
            sys.exit(1)
        build_catalog_only(args.source, args.output)

    elif args.dashboard:
        from dashboard_generator import generate_dashboard
        generate_dashboard(args.output)

    elif args.source:
        run_pipeline(
            source_dir=args.source,
            output_dir=args.output,
            limit=args.limit,
            book_filter=args.book,
            api_key=args.api_key
        )

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
