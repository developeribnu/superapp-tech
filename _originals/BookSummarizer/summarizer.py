"""
COGNOSCERE Book Knowledge Extraction Engine
Uses Kimi Code (K2.5) API for comprehensive book knowledge extraction.
"""

import os
import json
import time
import httpx
from concurrent.futures import ThreadPoolExecutor, as_completed
from pdf_extractor import chunk_text


# ============================================================
# KIMI CODE API CONFIGURATION
# ============================================================

KIMI_BASE_URL = "https://api.kimi.com/coding/v1"
KIMI_MODEL = "kimi-k2.5"
KIMI_USER_AGENT = "claude-code/1.0.0"


# ============================================================
# COGNOSCERE SYSTEM PROMPT
# ============================================================

COGNOSCERE_SYSTEM = """# COGNOSCERE v2.0
## Comprehensive Knowledge Extraction, Analysis & Synthesis System

Anda adalah **COGNOSCERE**—seorang Master Knowledge Architect dengan expertise sebagai:

### Professional Background
- Former Professor of Knowledge Management di MIT Sloan
- PhD dalam Cognitive Science & Information Processing dari Stanford
- 20+ tahun pengalaman sebagai Executive Book Summarizer untuk Fortune 500 CEOs
- Creator of systematic knowledge extraction methodologies
- Consultant untuk McKinsey, BCG, Bain dalam knowledge synthesis

### Core Competencies
- Deep reading & comprehensive synthesis
- Framework identification & extraction
- Concept mapping & interconnection analysis
- Critical evaluation of arguments & evidence
- Distillation tanpa kehilangan nuance penting
- Multi-source knowledge integration
- Pedagogical restructuring untuk optimal learning

### Ultimate Goal
User dapat MEMAHAMI SEPENUHNYA konten tanpa harus membaca dari nol — namun dengan kedalaman yang SETARA dengan membaca sendiri, bahkan LEBIH BAIK karena terstruktur dan sudah di-curate untuk insight extraction.

### Quality Standards
- ACCURACY — Meaning tidak berubah dari original
- COMPLETENESS — Tidak ada critical component yang missing
- CONTEXT — Sufficient context untuk understanding
- NUANCE — Subtleties dan caveats preserved
- CONNECTIONS — Links ke related concepts documented

### Language Rules
- Tulis SELURUH output dalam Bahasa Indonesia yang baik dan profesional
- Pertahankan istilah teknis/framework/nama konsep dalam bahasa Inggris
- Kutipan penting dalam bahasa asli + terjemahan Indonesia
- Terminologi domain tetap dalam Bahasa Inggris untuk presisi
"""


# ============================================================
# COGNOSCERE EXTRACTION PROMPTS
# ============================================================

CHUNK_EXTRACTION_PROMPT = """Anda adalah COGNOSCERE. Analisis MENDALAM bagian teks buku berikut.

Buku: "{title}" oleh {author}
Bagian: {chunk_num} dari {total_chunks}

EKSTRAK SEMUA dari bagian ini:

1. **CHAPTER/SECTION IDENTIFICATION** - Bab/bagian apa yang tercakup, sub-topik utama

2. **FRAMEWORKS & MODELS** - Nama, definisi, komponen, use cases, step-by-step, limitasi

3. **KONSEP & TEORI KUNCI** - Konsep fundamental, teori utama, prinsip, hubungan antar konsep, implikasi praktis

4. **TOOLS, MATRIX & EXERCISES** - Semua tools/matrix (table format), diagnostic tools, decision frameworks

5. **METODOLOGI & PROCESSES** - Step-by-step processes, best practices, common pitfalls

6. **EXAMPLES & CASE STUDIES** - Contoh konkret, studi kasus, data/statistik

7. **KUTIPAN PENTING** - Kutipan powerful (dalam bahasa asli) + konteks

8. **TERMINOLOGI PENTING** - Istilah baru & definisi presisi

TEKS BUKU (Bagian {chunk_num}/{total_chunks}):

{text}

---

TULIS ANALISIS YANG SANGAT DETAIL DAN LENGKAP. Jangan ringkas — EKSTRAK SEMUA knowledge. Tulis dalam Bahasa Indonesia."""


SYNTHESIS_PROMPT = """Anda adalah COGNOSCERE — Master Knowledge Architect.

Anda telah menganalisis buku **"{title}"** oleh **{author}** ({pages} halaman) secara bertahap. Berikut hasil analisis dari setiap bagian:

{chunk_analyses}

---

SINTESISKAN menjadi satu COGNOSCERE COMPREHENSIVE REVIEW dengan PERSIS struktur ini (SEMUA section WAJIB):

# METADATA & CORE THESIS
| Field | Detail |
|-------|--------|
| Judul | {title} |
| Penulis | {author} |
| Halaman | {pages} |
| Kategori | [tentukan] |

**Core Thesis:** [2-3 paragraf tesis utama]
**One-Sentence Thesis:** [1 kalimat essence]
**Why This Book Matters:** [signifikansi]
**Who Should Read This:** [target pembaca]

# STRUCTURAL MAP
[Tree structure SEMUA bab + Reading Pathway]

# MASTER CONCEPT INVENTORY
## Frameworks & Models Extracted
[Per framework: Location, Definition, Components, Purpose, Steps, Example, Limitations, Related]
## Models & Matrices Visual Catalog [tabel]
## Novel Concepts & Insights [per insight: The Insight, Location, Evidence, Implication, Actionable]

# CHAPTER-BY-CHAPTER DEEP DIVE
[Per bab: Objective, Executive Summary, Comprehensive Breakdown, Frameworks tabel, Key Quotes asli+terjemahan, Actionable Takeaways, Mastery Checklist]

# GLOSSARY ESSENTIAL
[Tabel: Term, Definition, Context — alphabetical]

# INTEGRATION MAP & CRITICAL ANALYSIS
[Koneksi antar konsep, Core Relationship Map, Kekuatan, Limitasi, Rating table]

# PANDUAN APLIKASI
[Implementation Roadmap 3 fase, Quick Reference situasi-to-tool tabel]

# VERIFIKASI PENGUASAAN
[Comprehension Check, Application Check, Mastery Checklist tabel]

# FURTHER READING
[5-10 buku terkait + mengapa relevan]

---

PENTING: Target 8000-15000+ kata. JANGAN skip section. Setiap framework LENGKAP. Setiap chapter deep dive. Bahasa Indonesia, istilah teknis Inggris."""


SINGLE_PASS_PROMPT = """Anda adalah COGNOSCERE — Master Knowledge Architect.

Tugas: COMPREHENSIVE KNOWLEDGE EXTRACTION dari buku berikut.

Buku: **"{title}"** oleh **{author}** ({pages} halaman)

GUNAKAN PERSIS STRUKTUR INI (SEMUA SECTION WAJIB):

# METADATA & CORE THESIS
[Tabel metadata, Core Thesis 2-3 paragraf, One-Sentence Thesis, Why Matters, Who Should Read]

# STRUCTURAL MAP
[Tree structure SEMUA bab + Reading Pathway]

# MASTER CONCEPT INVENTORY
[SEMUA Frameworks lengkap: Definition, Components, Purpose, Steps, Examples, Limitations]
[SEMUA Models & Matrices tabel]
[SEMUA Novel Concepts & Insights]

# CHAPTER-BY-CHAPTER DEEP DIVE
[Per chapter: Objective, Summary, Breakdown, Frameworks tabel, Quotes asli+terjemahan, Actionables, Mastery Checklist]

# GLOSSARY ESSENTIAL
[Tabel SEMUA istilah penting]

# INTEGRATION MAP & CRITICAL ANALYSIS
[Koneksi konsep, Relationship map, Strengths, Limitations, Rating table]

# PANDUAN APLIKASI
[Implementation Roadmap 3 fase, Quick Reference situasi-to-tool tabel]

# VERIFIKASI PENGUASAAN
[Comprehension questions, Application questions, Mastery checklist tabel]

# FURTHER READING
[5-10 buku terkait]

---

TEKS BUKU:

{text}

---

PENTING: Target 8000-15000+ kata. JANGAN skip section. Framework LENGKAP. Chapter deep dive. Bahasa Indonesia, istilah teknis Inggris. DENSITY > LENGTH."""


# ============================================================
# KIMI API CLIENT
# ============================================================

class KimiClient:
    """Custom HTTP client for Kimi Code API with proper authentication."""

    def __init__(self, api_key, base_url=None, model=None):
        self.api_key = api_key
        self.base_url = base_url or KIMI_BASE_URL
        self.model = model or KIMI_MODEL
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "User-Agent": KIMI_USER_AGENT,
        }
        # Thread-safe: httpx.Client is safe for concurrent use
        self.http_client = httpx.Client(
            timeout=httpx.Timeout(600.0, connect=30.0),
            limits=httpx.Limits(max_connections=5, max_keepalive_connections=3)
        )

    def chat(self, system_prompt, user_prompt, max_tokens=16384, max_retries=3):
        """Send chat completion request to Kimi Code API."""
        data = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "max_tokens": max_tokens,
            "temperature": 0.3,
        }

        for attempt in range(max_retries):
            try:
                resp = self.http_client.post(
                    f"{self.base_url}/chat/completions",
                    json=data,
                    headers=self.headers,
                )

                if resp.status_code == 200:
                    result = resp.json()
                    msg = result["choices"][0]["message"]
                    content = msg.get("content", "")
                    reasoning = msg.get("reasoning_content", "")

                    # Kimi K2.5 puts reasoning in reasoning_content, answer in content
                    if not content and reasoning:
                        content = reasoning

                    return {
                        "content": content,
                        "reasoning": reasoning,
                        "tokens": result.get("usage", {}),
                        "finish_reason": result["choices"][0].get("finish_reason", "unknown")
                    }

                elif resp.status_code == 429:
                    wait = 30 * (attempt + 1)
                    print(f"  ⏳ Rate limited, waiting {wait}s...")
                    time.sleep(wait)
                else:
                    error_msg = resp.text[:200]
                    if attempt < max_retries - 1:
                        wait = 15 * (attempt + 1)
                        print(f"  ⚠️ API error {resp.status_code}: {error_msg}")
                        time.sleep(wait)
                    else:
                        raise RuntimeError(f"API failed: {resp.status_code} - {error_msg}")

            except httpx.TimeoutException:
                if attempt < max_retries - 1:
                    print(f"  ⏳ Timeout, retrying... ({attempt+1}/{max_retries})")
                    time.sleep(10)
                else:
                    raise RuntimeError("API timeout after all retries")

    def close(self):
        self.http_client.close()


# ============================================================
# COGNOSCERE SUMMARIZER
# ============================================================

class BookSummarizer:
    def __init__(self, api_key=None, model=None, base_url=None):
        self.api_key = api_key or os.environ.get("KIMI_API_KEY")
        if not self.api_key:
            raise ValueError(
                "Kimi API key diperlukan! Set via:\n"
                "  1. Parameter api_key='sk-kimi-...'\n"
                "  2. Environment variable: export KIMI_API_KEY='sk-kimi-...'\n"
                "  3. File .env di folder BookSummarizer"
            )

        self.client = KimiClient(
            api_key=self.api_key,
            base_url=base_url or os.environ.get("KIMI_BASE_URL"),
            model=model or os.environ.get("KIMI_MODEL")
        )
        self.model = self.client.model

        print(f"  🤖 COGNOSCERE Engine initialized")
        print(f"     Model: {self.client.model}")
        print(f"     Endpoint: {self.client.base_url}")

    def _call_api(self, system_prompt, user_prompt, max_tokens=16384):
        result = self.client.chat(system_prompt, user_prompt, max_tokens=max_tokens)
        tokens = result.get("tokens", {})
        total = tokens.get("total_tokens", 0)
        if total:
            print(f"     📊 Tokens: {total:,}")
        return result["content"]

    def generate_summary(self, text, metadata, log_callback=None):
        """Generate COGNOSCERE summary. log_callback(msg) sends progress to web UI."""
        word_count = len(text.split())

        def _log(msg):
            print(msg)
            if log_callback:
                try:
                    log_callback(msg)
                except Exception:
                    pass

        if word_count < 25000:
            _log(f"  Mode: Single-pass extraction ({word_count:,} words)")
            prompt = SINGLE_PASS_PROMPT.format(
                title=metadata["title"],
                author=metadata["author"],
                pages=metadata["pages"],
                text=text
            )
            return self._call_api(COGNOSCERE_SYSTEM, prompt)
        else:
            _log(f"  Mode: Multi-pass extraction ({word_count:,} words)")
            chunks = chunk_text(text, chunk_size=60000, overlap=2000)
            total_chunks = len(chunks)
            _log(f"  Split into {total_chunks} chunks (~{word_count // total_chunks:,} words each)")
            est_minutes = total_chunks * 5 + 5  # ~5 min per chunk + 5 min synthesis
            _log(f"  Estimated time: ~{est_minutes} minutes")

            # Process chunks in parallel (2 at a time to avoid rate limits)
            chunk_analyses = [None] * total_chunks
            chunk_start = time.time()

            def _extract_chunk(idx, chunk_text_data):
                prompt = CHUNK_EXTRACTION_PROMPT.format(
                    title=metadata["title"],
                    author=metadata["author"],
                    chunk_num=idx + 1,
                    total_chunks=total_chunks,
                    text=chunk_text_data
                )
                return idx, self._call_api(COGNOSCERE_SYSTEM, prompt)

            max_parallel = min(2, total_chunks)  # 2 parallel to avoid rate limits
            completed_count = 0

            with ThreadPoolExecutor(max_workers=max_parallel) as executor:
                futures = {}
                for i, chunk in enumerate(chunks):
                    future = executor.submit(_extract_chunk, i, chunk)
                    futures[future] = i

                for future in as_completed(futures):
                    idx, analysis = future.result()
                    analysis_words = len(analysis.split())
                    completed_count += 1
                    elapsed = time.time() - chunk_start
                    avg_per_chunk = elapsed / completed_count
                    remaining = (total_chunks - completed_count) * avg_per_chunk / max_parallel
                    _log(f"  Chunk {idx+1}/{total_chunks} done ({analysis_words:,} words) — ~{remaining/60:.0f}min remaining")
                    chunk_analyses[idx] = f"\n{'='*60}\n=== BAGIAN {idx+1}/{total_chunks} ===\n{'='*60}\n{analysis}"

            _log(f"  All {total_chunks} chunks extracted in {(time.time()-chunk_start)/60:.1f} min")
            _log(f"  Synthesizing COGNOSCERE comprehensive review...")
            all_analyses = "\n\n".join(chunk_analyses)
            if len(all_analyses) > 120000:
                all_analyses = all_analyses[:120000]
                _log(f"  Note: Combined analysis truncated to 120K chars for synthesis")

            prompt = SYNTHESIS_PROMPT.format(
                title=metadata["title"],
                author=metadata["author"],
                pages=metadata["pages"],
                chunk_analyses=all_analyses
            )
            return self._call_api(COGNOSCERE_SYSTEM, prompt)

    def format_summary_header(self, metadata):
        return f"""COGNOSCERE COMPREHENSIVE REVIEW
Material: {metadata['title']}
Author: {metadata['author']}
Pages: {metadata['pages']}

"""

    def __del__(self):
        if hasattr(self, 'client'):
            self.client.close()


# ============================================================
# STANDALONE
# ============================================================

def load_env_file(filepath=".env"):
    if os.path.exists(filepath):
        with open(filepath) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key.strip()] = value.strip().strip('"').strip("'")


if __name__ == "__main__":
    import sys
    from pdf_extractor import extract_book_text

    load_env_file()

    if len(sys.argv) < 2:
        print("Usage: python summarizer.py <pdf_path>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    print(f"📖 Extracting text from: {os.path.basename(pdf_path)}")

    result = extract_book_text(pdf_path)
    metadata = result["metadata"]
    text = result["text"]

    print(f"   Title: {metadata['title']}")
    print(f"   Author: {metadata['author']}")
    print(f"   Pages: {metadata['pages']}")
    print(f"   Words extracted: {metadata['word_count']}")

    summarizer = BookSummarizer()
    summary = summarizer.generate_summary(text, metadata)

    output_path = pdf_path.replace('.pdf', '_COGNOSCERE.md')
    header = summarizer.format_summary_header(metadata)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(header + summary)

    print(f"\n✅ COGNOSCERE review saved to: {output_path}")
    print(f"   Review length: {len(summary.split())} words")
