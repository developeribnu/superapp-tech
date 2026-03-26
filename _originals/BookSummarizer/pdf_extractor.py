"""
PDF Text Extraction Module
Extracts text from PDF ebooks with intelligent chunking and metadata extraction.
"""

import os
import re
import pdfplumber
from pypdf import PdfReader


def extract_metadata(pdf_path):
    """Extract book metadata from PDF and filename."""
    metadata = {
        "title": "",
        "author": "",
        "pages": 0,
        "file_size_mb": 0,
        "source_file": os.path.basename(pdf_path)
    }

    try:
        reader = PdfReader(pdf_path)
        meta = reader.metadata
        metadata["pages"] = len(reader.pages)

        if meta:
            metadata["title"] = meta.title or ""
            metadata["author"] = meta.author or ""
    except Exception:
        pass

    # Fallback: parse from filename
    filename = os.path.basename(pdf_path)
    # Remove z-library suffix
    clean_name = re.sub(r'\s*\(z-library\.sk.*?\)\.pdf$', '', filename, flags=re.IGNORECASE)
    clean_name = re.sub(r'_compressed\.pdf$', '.pdf', clean_name)
    clean_name = re.sub(r'\.pdf$', '', clean_name)

    # Try to extract title and author from filename pattern: "Title (Author)"
    match = re.match(r'^(.+?)\s*\(([^)]+)\)\s*$', clean_name)
    if match:
        if not metadata["title"]:
            metadata["title"] = match.group(1).strip()
        if not metadata["author"]:
            metadata["author"] = match.group(2).strip()
    elif not metadata["title"]:
        metadata["title"] = clean_name.strip()

    # Clean up title
    metadata["title"] = metadata["title"].strip()
    if metadata["title"].startswith("(") or not metadata["title"]:
        metadata["title"] = clean_name.split("(")[0].strip()

    # File size
    metadata["file_size_mb"] = round(os.path.getsize(pdf_path) / (1024 * 1024), 2)

    return metadata


def extract_text_pdfplumber(pdf_path, max_pages=None):
    """Extract text using pdfplumber (better for complex layouts)."""
    all_text = []

    with pdfplumber.open(pdf_path) as pdf:
        pages = pdf.pages[:max_pages] if max_pages else pdf.pages
        for i, page in enumerate(pages):
            try:
                text = page.extract_text()
                if text:
                    all_text.append(f"--- PAGE {i+1} ---\n{text}")
            except Exception as e:
                all_text.append(f"--- PAGE {i+1} [EXTRACTION ERROR: {e}] ---")

    return "\n\n".join(all_text)


def extract_text_pypdf(pdf_path, max_pages=None):
    """Extract text using pypdf (fallback)."""
    reader = PdfReader(pdf_path)
    all_text = []

    pages = reader.pages[:max_pages] if max_pages else reader.pages
    for i, page in enumerate(pages):
        try:
            text = page.extract_text()
            if text:
                all_text.append(f"--- PAGE {i+1} ---\n{text}")
        except Exception as e:
            all_text.append(f"--- PAGE {i+1} [EXTRACTION ERROR: {e}] ---")

    return "\n\n".join(all_text)


def extract_book_text(pdf_path, max_pages=None):
    """
    Extract text from a PDF ebook. Tries pdfplumber first, falls back to pypdf.
    Returns dict with metadata and full text.
    """
    metadata = extract_metadata(pdf_path)

    # Try pdfplumber first (better quality)
    try:
        text = extract_text_pdfplumber(pdf_path, max_pages)
        if len(text.strip()) < 100:
            raise ValueError("Text too short, trying fallback")
        metadata["extraction_method"] = "pdfplumber"
    except Exception:
        try:
            text = extract_text_pypdf(pdf_path, max_pages)
            metadata["extraction_method"] = "pypdf"
        except Exception as e:
            text = f"[EXTRACTION FAILED: {e}]"
            metadata["extraction_method"] = "failed"

    # Clean up text
    text = clean_extracted_text(text)
    metadata["char_count"] = len(text)
    metadata["word_count"] = len(text.split())

    return {
        "metadata": metadata,
        "text": text
    }


def clean_extracted_text(text):
    """Clean up extracted text for better readability."""
    # Remove excessive whitespace
    text = re.sub(r'\n{4,}', '\n\n\n', text)
    # Remove page headers/footers patterns (common in ebooks)
    text = re.sub(r'\n\d+\n', '\n', text)
    # Fix common OCR/extraction artifacts
    text = re.sub(r'(?<=[a-z])\s*\n\s*(?=[a-z])', ' ', text)
    # Remove excessive spaces
    text = re.sub(r'[ \t]{3,}', '  ', text)

    return text.strip()


def chunk_text(text, chunk_size=15000, overlap=500):
    """Split text into overlapping chunks for processing."""
    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size

        # Try to break at paragraph boundary
        if end < len(text):
            # Look for paragraph break near the end
            para_break = text.rfind('\n\n', start + chunk_size - 2000, end)
            if para_break > start:
                end = para_break + 2

        chunks.append(text[start:end])
        start = end - overlap

    return chunks


def get_ebook_files(directory, recursive=True):
    """Find all ebook PDF files in a directory.

    Args:
        directory: Root directory to scan
        recursive: If True, also scan subdirectories (e.g., 'Ebook Arsip/')

    Returns:
        List of full paths to ebook PDF files, sorted by title.
    """
    ebook_patterns = [
        r'z-library\.sk',
        r'1lib\.sk',
        r'z-lib\.sk',
    ]

    ebook_files = []

    if recursive:
        # Walk through directory and all subdirectories
        for root, dirs, files in os.walk(directory):
            # Skip hidden directories and output directories
            dirs[:] = [d for d in dirs if not d.startswith('.') and d.lower() != 'output']
            for f in files:
                if not f.lower().endswith('.pdf'):
                    continue
                is_ebook = any(re.search(p, f, re.IGNORECASE) for p in ebook_patterns)
                if is_ebook:
                    ebook_files.append(os.path.join(root, f))
    else:
        # Original: only scan top-level directory
        for f in os.listdir(directory):
            if not f.lower().endswith('.pdf'):
                continue
            is_ebook = any(re.search(p, f, re.IGNORECASE) for p in ebook_patterns)
            if is_ebook:
                ebook_files.append(os.path.join(directory, f))

    # Sort alphabetically by filename (title)
    ebook_files.sort(key=lambda x: os.path.basename(x).lower())
    return ebook_files


if __name__ == "__main__":
    import sys
    import json

    if len(sys.argv) < 2:
        print("Usage: python pdf_extractor.py <pdf_path_or_directory>")
        sys.exit(1)

    path = sys.argv[1]

    if os.path.isdir(path):
        files = get_ebook_files(path)
        print(f"Found {len(files)} ebook PDFs:")
        for f in files:
            meta = extract_metadata(f)
            print(f"  [{meta['pages']}p] {meta['title']} - {meta['author']}")
    else:
        result = extract_book_text(path)
        print(json.dumps(result["metadata"], indent=2, ensure_ascii=False))
        print(f"\nExtracted {result['metadata']['word_count']} words")
        print(f"First 500 chars:\n{result['text'][:500]}")
