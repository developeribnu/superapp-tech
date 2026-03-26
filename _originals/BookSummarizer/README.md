# COGNOSCERE BookSummarizer v2

> Sistem otomatis untuk mengekstrak dan merangkum koleksi ebook PDF menjadi **review komprehensif 8.000–15.000+ kata** menggunakan **dual AI engine**.

## Dual Engine

| Engine | Kecepatan | Cara Kerja |
|--------|-----------|------------|
| **Kimi API** | ~10 menit/buku (sequential) | API langsung ke Kimi K2.5 |
| **Claude Web** | ~3 menit/buku (4-5 parallel) | Browser automation ke Claude.ai |

## Fitur

- **Aplikasi macOS** — Klik dua kali `BookSummarizer.app`, browser terbuka otomatis
- **Dual Engine** — Pilih Kimi API (stabil) atau Claude Web (cepat, parallel)
- **4-5 Tab Parallel** — Claude mode membuka 4-5 tab browser secara bersamaan
- **Auto-Kategorisasi** — 13 kategori otomatis (Finance, Psychology, Parenting, dll)
- **Folder Terstruktur** — Output di `output/Completed/<Kategori>/<Judul Buku>/`
- **COGNOSCERE v2.0** — Review mendalam 9 section, bukan rangkuman biasa
- **Dual Output** — Markdown + DOCX profesional per buku
- **Resume Otomatis** — Kalau berhenti, lanjut dari buku terakhir
- **Zero CLI** — Semua lewat antarmuka web

## Cara Menggunakan

### 1. Clone & Setup

```bash
git clone https://github.com/subkhanibnuaji/BookSummarizer.git
cd BookSummarizer
python3 setup_v2.py
```

### 2. Build App (sekali saja)

```bash
python3 build_app.py
```

### 3. Jalankan

**Klik dua kali `BookSummarizer.app` di Finder.**

Browser otomatis terbuka ke `http://localhost:5000`.

### 4. Pilih Engine

Di halaman **Settings**:
- Masukkan API Key Kimi (untuk Kimi mode)
- Pilih engine: **Kimi API** atau **Claude Web**
- Pilih folder ebook PDF

### 5. Proses

Buka **Library** → centang buku → **Start Processing**.

## Struktur Output

```
output/Completed/
├── Finance & Investing/
│   ├── The Art of Spending Money/
│   │   ├── COGNOSCERE - The Art of Spending Money.docx
│   │   ├── COGNOSCERE - The Art of Spending Money.md
│   │   └── The Art of Spending Money.pdf
│   └── ...
├── Technology & AI/
│   └── Building Applications with AI Agents/
│       └── ...
├── Psychology & Mind/
├── Self-Development/
├── Relationships & Social/
├── Parenting & Family/
├── Health & Wellness/
├── Business & Innovation/
└── General/
```

## COGNOSCERE Review

| Section | Isi |
|---------|-----|
| Metadata & Core Thesis | Info buku, tesis utama, signifikansi |
| Structural Map | Peta visual seluruh bab |
| Master Concept Inventory | Semua framework dan model |
| Chapter Deep Dive | Rangkuman per bab |
| Glossary | Istilah penting |
| Integration Map | Koneksi antar konsep |
| Application Guide | Roadmap implementasi |
| Mastery Verification | Pertanyaan pemahaman |
| Further Reading | Buku terkait |

Bahasa: **Bahasa Indonesia** dengan istilah teknis **English**.

## Persyaratan

- **macOS** 12+
- **Python 3.8+** dari [python.org](https://python.org/downloads/macos/) atau Homebrew
- **Koneksi Internet**
- **API Key Kimi** (untuk Kimi mode) — gratis di [kimi.com/code/console](https://kimi.com/code/console)
- **Login Claude.ai** (untuk Claude Web mode)

## Teknologi

| Komponen | Teknologi |
|----------|-----------|
| AI Engine 1 | Kimi K2.5 via API |
| AI Engine 2 | Claude.ai via Playwright |
| PDF Extraction | pdfplumber + pypdf |
| Document | python-docx |
| Web UI | Flask + vanilla JS |
| Browser Automation | Playwright (Chromium) |
| Metodologi | COGNOSCERE v2.0 |

## Project Structure

```
BookSummarizer/
├── BookSummarizer.app      ← macOS app (klik dua kali!)
├── build_app.py            ← Build/rebuild .app
├── app.py                  ← Flask web app
├── engines/                ← AI engines
│   ├── kimi_engine.py      ← Kimi K2.5 API
│   ├── claude_web_engine.py ← Claude.ai browser automation
│   └── claude_prompts.py   ← COGNOSCERE prompts
├── services/               ← Business logic
│   ├── categorizer.py      ← Auto-kategorisasi buku
│   └── project_mapper.py   ← Claude project discovery
├── summarizer.py           ← Core Kimi summarizer
├── pdf_extractor.py        ← PDF text extraction
├── docx_creator.py         ← DOCX generator
├── setup_v2.py             ← Setup + Playwright install
├── start.py                ← Auto-launcher
└── requirements.txt        ← Dependencies
```

## Author

[Subkhan Ibnu Aji](https://github.com/subkhanibnuaji)

## License

MIT License

---

<p align="center">
  <strong>COGNOSCERE v2.0</strong> — Dual Engine Knowledge Extraction<br>
  Kimi K2.5 + Claude.ai · macOS Edition
</p>
