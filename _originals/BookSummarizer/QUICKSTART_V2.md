# BookSummarizer v2 — Quick Start Guide

## Installation (2 minutes)

```bash
cd BookSummarizer
python setup_v2.py
```

This command:
- ✅ Checks Python version
- ✅ Installs dependencies (Flask, Playwright, pdfplumber, etc.)
- ✅ Sets up Playwright Chromium browser
- ✅ Creates output directories
- ✅ Initializes .env configuration

## Configuration (1 minute)

Edit `.env`:

```env
# REQUIRED for Kimi Engine
KIMI_API_KEY=sk-your-actual-key-here

# Choose which engine to use
SUMMARIZER_ENGINE=kimi        # Default: fast, sequential
# SUMMARIZER_ENGINE=claude_web  # Alternative: parallel browser tabs

# Optional
EBOOK_SOURCE_DIR=/path/to/your/books
```

**For Claude Web Engine:**
1. Log in to https://claude.ai
2. Create projects for your book categories (optional, auto-discovers)

## Run (1 minute)

```bash
python start.py
```

Open browser: **http://localhost:5000**

## Usage

### Web Interface

1. **Browse Books** - Lists all PDF ebooks in source directory
2. **Select Engine** - Choose "Kimi API" or "Claude Web" in settings
3. **Select Books** - Check which books to process
4. **Start Processing** - Click "Process Selected" or "Process All"
5. **Monitor Progress** - Watch live logs and status
6. **View Results** - Download DOCX or Markdown summaries

### API (Optional)

```bash
# List books
curl http://localhost:5000/api/books | jq

# Start processing (Kimi Engine)
curl -X POST http://localhost:5000/api/process \
  -H "Content-Type: application/json" \
  -d '{"engine": "kimi"}'

# Check progress
curl http://localhost:5000/api/status | jq

# Get settings
curl http://localhost:5000/api/settings | jq
```

## Choose Your Engine

### Kimi API Engine (Recommended for small/medium collections)

✅ Fast (5-10 min per book)
✅ Simple (API key only)
✅ Reliable (Kimi servers)
❌ Sequential (processes one book at a time)

```env
SUMMARIZER_ENGINE=kimi
```

### Claude Web Engine (Recommended for large collections)

✅ Parallel (4-5 books simultaneously)
✅ Free (uses Claude.ai)
✅ Smart (understands context via web)
❌ Requires login
❌ Slower per-book (8-15 min due to web UI)

```env
SUMMARIZER_ENGINE=claude_web
```

**Performance Estimate:**
- 10 books: Kimi = 1 hour, Claude = 30 minutes
- 100 books: Kimi = 12 hours, Claude = 3-4 hours
- 1000 books: Kimi = 5 days, Claude = 1.5-2 days

## Output

Each book generates:

1. **COGNOSCERE - [Title].md** — Full markdown summary (8000-15000 words)
2. **COGNOSCERE - [Title].docx** — Formatted Word document
3. **Extracted Text - [Title].txt** — Raw text from PDF
4. **[Original].pdf** — Copy of source PDF

Location: `output/Completed/[Category]/[Book Title]/`

## Examples

### Process First 5 Books with Kimi

1. Open web UI at http://localhost:5000
2. Click "Kimi API" in settings
3. Click checkboxes for first 5 books
4. Click "Process Selected"
5. Watch progress → Download results

### Batch Process 100 Books with Claude Web

```bash
# Edit .env
SUMMARIZER_ENGINE=claude_web

# Restart app
python start.py

# Click "Process All" in web UI
# Engine opens browser with 4 tabs
# Each tab processes 1 book while others wait
# 3-4 hours total for 100 books
```

### Use API to Process Specific Books

```bash
# Process books at indices 0, 2, 5
curl -X POST http://localhost:5000/api/process \
  -H "Content-Type: application/json" \
  -d '{
    "engine": "kimi",
    "indices": [0, 2, 5]
  }'

# Monitor
watch -n 5 'curl -s http://localhost:5000/api/status | jq ".completed, .failed"'

# Cancel if needed
curl -X POST http://localhost:5000/api/cancel
```

## Troubleshooting

### "KIMI_API_KEY not set"

Add to `.env`:
```env
KIMI_API_KEY=sk-your-actual-key
```

### Claude Web browser doesn't appear

It's normal! Browser window opens automatically. If it doesn't:
- Check task manager for Chromium process
- Manual login: wait 60 seconds, browser should prompt for login

### "No Claude projects found"

1. Visit https://claude.ai and create some projects
2. Restart processing
3. Projects are cached in `output/claude_projects.json`

### Processing seems stuck

Check logs in web UI for actual errors. Common issues:
- API timeout (wait 1 min, retry)
- Large PDF (100+ pages may take longer)
- No internet connection

### "Playwright: command not found"

```bash
python -m pip install playwright
python -m playwright install chromium
```

## Files Overview

| File | Purpose |
|------|---------|
| `app.py` | Flask web app + engine routing |
| `summarizer.py` | COGNOSCERE prompts & Kimi API client |
| `engines/base_engine.py` | Abstract engine interface |
| `engines/kimi_engine.py` | Kimi API wrapper |
| `engines/claude_web_engine.py` | Claude.ai browser automation (Playwright) |
| `services/categorizer.py` | Auto-categorize books by title/author |
| `services/project_mapper.py` | Map categories to Claude projects |
| `.env` | API keys & configuration |
| `output/` | Processed books & metadata |

## Tips & Tricks

1. **Speed up processing**: Use Kimi for sequential, Claude for parallel
2. **Better categorization**: Rename PDFs as "[Title] ([Author])" for auto-detection
3. **Reprocess books**: Check "Clear Progress" in web UI to reset status
4. **Monitor**: Open new terminal: `watch -n 5 'python -c "import json; print(json.load(open('output/progress.json')))"`
5. **Large books**: Split 1000+ page PDFs before processing (better results)

## What Gets Summarized

BookSummarizer extracts and structures:

- **Core thesis** & key arguments
- **Frameworks & models** with diagrams
- **Chapter-by-chapter deep dive**
- **Key concepts & terminology** (glossary)
- **Practical tools & templates**
- **Important quotes** (original + translation)
- **Critical analysis** & relationship maps
- **Further reading** recommendations

Result: **Read the summary instead of the book** (8000-15000 words vs. 60000+ words)

## Next Steps

1. ✅ Run `python setup_v2.py`
2. ✅ Add API key to `.env`
3. ✅ Run `python start.py`
4. ✅ Try processing 1-2 books first
5. ✅ Review output quality
6. ✅ Adjust categories in settings if needed
7. ✅ Process full collection

## Support

- **README.md** — Main documentation
- **V2_FEATURES.md** — Architecture & advanced usage
- **Logs** → Check web UI "Log" section
- **Progress** → `output/progress.json`
- **Errors** → `output/progress.json` in "failed" array

---

**Happy summarizing! 📚**

*Processing 1000 books? Expect 2-3 days with Claude Web engine (4 parallel tabs) vs. 5 days with Kimi sequential.*
