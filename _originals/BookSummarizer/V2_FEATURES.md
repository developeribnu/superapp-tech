# BookSummarizer v2 — New Features & Architecture

## Overview

BookSummarizer v2 adds a complete **multi-engine architecture** with two summarization backends:

1. **Kimi Code API Engine** (existing, optimized)
2. **Claude Web Engine** (NEW - browser automation with parallel processing)

## Architecture

### Engine System

All summarization engines implement the `BaseEngine` interface:

```python
class BaseEngine(ABC):
    def process_book(self, pdf_path, metadata, on_progress=None) -> str
    def get_name(self) -> str
    def shutdown(self)
```

### Directory Structure

```
BookSummarizer/
├── engines/
│   ├── __init__.py
│   ├── base_engine.py              # Abstract base class
│   ├── kimi_engine.py              # Kimi API wrapper
│   ├── claude_web_engine.py        # Claude.ai browser automation
│   └── claude_prompts.py           # COGNOSCERE prompts for Claude
├── services/
│   ├── __init__.py
│   ├── categorizer.py              # Book categorization service
│   └── project_mapper.py           # Claude project discovery
├── app.py                          # Flask + engine selection
├── setup_v2.py                     # Setup script for dependencies
└── requirements.txt                # Updated with playwright
```

## Engine Comparison

| Feature | Kimi Engine | Claude Web Engine |
|---------|-------------|------------------|
| **Concurrency** | Sequential | 4-5 parallel tabs |
| **Setup** | API key only | Requires Chrome + login |
| **Speed (per book)** | 5-10 min | 8-15 min (slower API) |
| **Parallelism** | N/A | Yes, 4-5 books at once |
| **Cost** | API tokens | Free (Claude.ai) |
| **UI** | Web only | Browser visible (optional) |
| **Stability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**When to use Kimi:** Quick processing of small-to-medium book collections
**When to use Claude Web:** Large collections where parallel processing outweighs slower per-book speed

## Installation & Setup

### Step 1: Install Dependencies

```bash
cd BookSummarizer
python setup_v2.py
```

This will:
- Install Python packages (Flask, Playwright, pdfplumber, etc.)
- Install Playwright Chromium browser
- Create output directories
- Initialize .env file

### Step 2: Configure

Edit `.env`:

```env
# For Kimi Engine (required)
KIMI_API_KEY=sk-your-key-here
KIMI_BASE_URL=https://api.kimi.com/coding/v1
KIMI_MODEL=kimi-k2.5

# Choose engine
SUMMARIZER_ENGINE=kimi    # or: claude_web

# Optional
EBOOK_SOURCE_DIR=/path/to/books
```

### Step 3: For Claude Web Engine

1. Log into https://claude.ai
2. Create Claude projects matching your book categories (Finance, Technology, etc.)
3. The engine will auto-discover projects on first run
4. Projects are cached in `output/claude_projects.json`

### Step 4: Run

```bash
python start.py
```

Visit: http://localhost:5000

## API Endpoints

### Engine Management

```
POST /api/engine/select
  {"engine": "kimi" | "claude_web"}
  → Select summarization engine

POST /api/projects/discover
  → Discover Claude projects (Claude Web only)

GET /api/projects/status
  → Get cached Claude project mapping
```

### Processing

```
POST /api/process
  {
    "indices": [0, 1, 2] | null,  # Books to process
    "source_dir": "/path",          # Source directory
    "engine": "kimi" | "claude_web" # Which engine to use
  }

GET /api/status
  → Returns:
    - is_running, completed, failed, elapsed
    - engine (kimi | claude_web)
    - tab_progress (Claude Web only): per-tab status
    - log: processing messages
```

## Claude Web Engine Details

### How It Works

1. **Project Discovery**: Scans Claude.ai for projects
2. **Categorization**: Maps books to projects by category
3. **Parallel Processing**: Opens 4-5 browser tabs
4. **Upload & Prompt**: Each tab uploads PDF and sends COGNOSCERE prompt
5. **Response Capture**: Extracts summary from Claude's output
6. **Parallel Efficiency**: While one tab waits for Claude's response, others process new books

### Project Mapping

The engine uses **category-based fuzzy matching** to find the right project:

```
Book: "Atomic Habits"
Category detected: "Self-Development"
Search: Claude projects matching "Self-Development"
Find: "📚 Self-Development" project
Map: https://claude.ai/project/...
```

### Browser Management

- **User Data Dir**: `~/.claude-web-summarizer/` (preserves login state)
- **Headless Mode**: Set to `False` by default (you can see browser)
- **Parallel Tabs**: Up to 5 concurrent Playwright pages
- **Cleanup**: Automatic browser shutdown after processing

### Project Caching

First time you run Claude Web:
```
Tab 1: Discovers projects
       Projects cached → output/claude_projects.json
Tab 2-5: Use cached mapping
```

On subsequent runs, projects are loaded from cache (fast startup).

## Categorizer Service

Books are automatically categorized using keyword matching:

```python
categorize_book("Atomic Habits", "James Clear")
→ "Self-Development"

categorize_book("The Intelligent Investor", "Benjamin Graham")
→ "Finance & Investing"
```

Categories:
- Finance & Investing
- Psychology & Mind
- Self-Development
- Relationships & Social
- Parenting & Family
- Health & Wellness
- Business & Innovation
- Technology & AI
- History & Culture
- Science & Nature
- Philosophy & Religion
- Arts & Creativity
- Sports & Movement

## Performance Benchmarks

### Single Book

| Engine | Speed | Output |
|--------|-------|--------|
| Kimi | 5-10 min | 8000-15000 words |
| Claude Web | 8-15 min | 8000-15000 words |

### Batch (100 books)

| Engine | Time | Parallelism |
|--------|------|-------------|
| Kimi | ~12 hours | Sequential |
| Claude Web | ~3-4 hours | 4-5 parallel |

**Note**: Times vary with book size and API load.

## Output Structure

```
output/
├── Completed/
│   ├── Finance & Investing/
│   │   ├── The Intelligent Investor/
│   │   │   ├── The Intelligent Investor.pdf
│   │   │   ├── COGNOSCERE - The Intelligent Investor.md
│   │   │   ├── COGNOSCERE - The Intelligent Investor.docx
│   │   │   └── Extracted Text - The Intelligent Investor.txt
│   ├── Self-Development/
│   │   ├── Atomic Habits/
│   │   │   └── [same files]
├── progress.json           # Processing progress
├── catalog.json            # All processed books metadata
└── claude_projects.json    # Claude project mapping (Claude Web only)
```

## Troubleshooting

### Claude Web Issues

**"Not logged into Claude.ai"**
- Check browser window opened by Playwright
- Log in to https://claude.ai
- Resume processing (60-second timeout)

**"No Claude projects found"**
- Create projects in https://claude.ai first
- Press "discover projects" or restart processing
- Check `output/claude_projects.json` for cached list

**Browser hangs**
- Close any extra Chromium instances: `pkill -f chromium`
- Playwright will auto-restart on next run

### Playwright Issues

**"playwright: command not found"**
```bash
pip install playwright
playwright install chromium
```

**Linux headless issues**
```bash
# If using headless=True and encountering issues:
# Install system dependencies:
sudo apt-get install libglib2.0-0 libnss3 libnspr4 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0
```

## Examples

### Process with Kimi Engine (API)

```bash
curl -X POST http://localhost:5000/api/process \
  -H "Content-Type: application/json" \
  -d '{
    "engine": "kimi",
    "indices": [0, 1, 2]
  }'
```

### Process with Claude Web (Browser)

```bash
curl -X POST http://localhost:5000/api/process \
  -H "Content-Type: application/json" \
  -d '{
    "engine": "claude_web"
  }'

# Monitor progress
curl http://localhost:5000/api/status | jq '.tab_progress'
```

### Select Engine Permanently

```bash
curl -X POST http://localhost:5000/api/engine/select \
  -H "Content-Type: application/json" \
  -d '{"engine": "claude_web"}'
```

## Advanced Configuration

### Custom Prompts

Edit `engines/claude_prompts.py`:
- `CLAUDE_COGNOSCERE_SYSTEM`: System prompt
- `CLAUDE_SINGLE_PASS_PROMPT`: Main extraction prompt
- `CLAUDE_SYNTHESIS_PROMPT`: Multi-chunk synthesis

### Max Parallel Tabs

In `app.py` or code:
```python
engine = ClaudeWebEngine(headless=False, max_tabs=5)  # 2-5 recommended
```

### Categorization Rules

Edit `services/categorizer.py`:
- Add/modify `CATEGORY_KEYWORDS` dictionary
- Categories match greedily (higher scores win)

## Limitations & Notes

1. **Claude Web requires Claude.ai login** - User must be authenticated
2. **Project names must match categories** - Fuzzy matching helps but exact matches are best
3. **Rate limiting** - Claude.ai has usage limits (respects browser behavior)
4. **Browser visibility** - Headless mode available but not recommended (may miss CAPTCHAs)
5. **PDF upload size** - Very large PDFs (1000+ pages) may timeout
6. **Dependencies** - Playwright requires ~500MB for Chromium

## Future Enhancements

- [ ] GPT-4 Engine (OpenAI)
- [ ] Anthropic Claude API (official, faster)
- [ ] Multi-language support
- [ ] Custom prompt templates UI
- [ ] Webhook notifications
- [ ] Database backend (SQLite)
- [ ] Project sync with Claude.ai API

## Support

For issues, check:
1. `.env` configuration
2. API keys validity
3. Log output in web UI
4. Browser console (for Claude Web)
5. Error messages in `output/progress.json`

---

**Version**: 2.0
**Last Updated**: March 2026
**License**: MIT
