"""
Web Dashboard Generator for BookSummarizer
Creates an interactive HTML dashboard to browse book summaries.
"""

import os
import json
import re
from datetime import datetime


def generate_dashboard(output_dir):
    """Generate an interactive web dashboard from the catalog."""
    catalog_path = os.path.join(output_dir, "catalog.json")

    if not os.path.exists(catalog_path):
        print("❌ No catalog found. Run --catalog first.")
        return

    with open(catalog_path, 'r', encoding='utf-8') as f:
        catalog = json.load(f)

    books = catalog.get("books", [])
    total = len(books)
    summarized = len([b for b in books if b.get("has_summary")])

    # Get categories
    categories = sorted(set(b.get("category", "General") for b in books))

    # Build book cards HTML
    book_cards = []
    for book in sorted(books, key=lambda x: x.get("title", "")):
        has_summary = book.get("has_summary", False)
        category = book.get("category", "General")
        folder = book.get("folder", "")
        summary_words = book.get("summary_words", 0)

        badge_color = "#10B981" if has_summary else "#6B7280"
        badge_text = "✅ Summarized" if has_summary else "⏳ Pending"

        # Read summary preview if available
        preview = ""
        if has_summary:
            md_path = os.path.join(output_dir, folder, f"Rangkuman - {folder}.md")
            if os.path.exists(md_path):
                with open(md_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    # Get first meaningful paragraph
                    paragraphs = [p.strip() for p in content.split('\n\n') if p.strip() and not p.strip().startswith('#') and not p.strip().startswith('**') and not p.strip().startswith('---') and len(p.strip()) > 50]
                    if paragraphs:
                        preview = paragraphs[0][:300] + "..."

        # Category color map
        cat_colors = {
            "Finance & Investing": "#F59E0B",
            "Psychology & Mind": "#8B5CF6",
            "Self-Development": "#10B981",
            "Relationships & Social": "#EC4899",
            "Parenting & Family": "#F97316",
            "Health & Wellness": "#06B6D4",
            "Business & Innovation": "#3B82F6",
            "Technology & AI": "#6366F1",
            "General": "#6B7280",
        }
        cat_color = cat_colors.get(category, "#6B7280")

        card_html = f"""
        <div class="book-card" data-category="{category}" data-has-summary="{str(has_summary).lower()}">
            <div class="card-header" style="border-left: 4px solid {cat_color}">
                <div class="card-badge" style="background: {badge_color}">{badge_text}</div>
                <h3 class="card-title">{_escape_html(book.get('title', 'Unknown'))}</h3>
                <p class="card-author">oleh {_escape_html(book.get('author', 'Unknown'))}</p>
            </div>
            <div class="card-body">
                <div class="card-meta">
                    <span class="meta-item">📄 {book.get('pages', 0)} hal</span>
                    <span class="meta-item">📏 {book.get('file_size_mb', 0)} MB</span>
                    {'<span class="meta-item">📝 ' + str(summary_words) + ' kata</span>' if has_summary else ''}
                </div>
                <div class="card-category" style="color: {cat_color}">
                    📂 {category}
                </div>
                {'<div class="card-preview">' + _escape_html(preview) + '</div>' if preview else ''}
            </div>
            {'<div class="card-actions"><a href="' + folder + '/Rangkuman - ' + folder + '.md" class="btn-view" target="_blank">📖 Baca Rangkuman</a></div>' if has_summary else ''}
        </div>
        """
        book_cards.append(card_html)

    # Category filter buttons
    cat_buttons = ['<button class="filter-btn active" data-filter="all">Semua ({0})</button>'.format(total)]
    for cat in categories:
        count = len([b for b in books if b.get("category") == cat])
        cat_buttons.append(f'<button class="filter-btn" data-filter="{cat}">{cat} ({count})</button>')

    html = f"""<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📚 BookSummarizer Dashboard</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}

        :root {{
            --bg: #0F172A;
            --surface: #1E293B;
            --surface-hover: #334155;
            --border: #334155;
            --text: #F1F5F9;
            --text-secondary: #94A3B8;
            --primary: #3B82F6;
            --primary-hover: #2563EB;
            --success: #10B981;
            --warning: #F59E0B;
        }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
        }}

        /* Header */
        .header {{
            background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
            border-bottom: 1px solid var(--border);
            padding: 2rem 0;
        }}

        .header-inner {{
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
        }}

        .header h1 {{
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #3B82F6, #8B5CF6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}

        .header p {{
            color: var(--text-secondary);
            font-size: 1rem;
        }}

        /* Stats */
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            max-width: 1400px;
            margin: -1.5rem auto 0;
            padding: 0 2rem;
            position: relative;
            z-index: 10;
        }}

        .stat-card {{
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.25rem;
            text-align: center;
        }}

        .stat-number {{
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
        }}

        .stat-label {{
            color: var(--text-secondary);
            font-size: 0.85rem;
            margin-top: 0.25rem;
        }}

        /* Controls */
        .controls {{
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0 2rem;
        }}

        .search-box {{
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 2.75rem;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            color: var(--text);
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s;
        }}

        .search-box:focus {{ border-color: var(--primary); }}

        .search-wrapper {{
            position: relative;
            margin-bottom: 1rem;
        }}

        .search-icon {{
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
        }}

        .filter-row {{
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }}

        .filter-btn {{
            padding: 0.5rem 1rem;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 20px;
            color: var(--text-secondary);
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
        }}

        .filter-btn:hover {{ border-color: var(--primary); color: var(--text); }}
        .filter-btn.active {{ background: var(--primary); border-color: var(--primary); color: white; }}

        .summary-toggle {{
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }}

        .toggle-btn {{
            padding: 0.5rem 1rem;
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 8px;
            color: var(--text-secondary);
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
        }}

        .toggle-btn:hover {{ border-color: var(--primary); }}
        .toggle-btn.active {{ background: var(--primary); border-color: var(--primary); color: white; }}

        /* Book Grid */
        .book-grid {{
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.25rem;
        }}

        .book-card {{
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.2s;
        }}

        .book-card:hover {{
            border-color: var(--primary);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }}

        .book-card.hidden {{ display: none; }}

        .card-header {{
            padding: 1.25rem 1.25rem 0.75rem;
        }}

        .card-badge {{
            display: inline-block;
            padding: 0.2rem 0.6rem;
            border-radius: 12px;
            font-size: 0.75rem;
            color: white;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }}

        .card-title {{
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 0.25rem;
            line-height: 1.3;
        }}

        .card-author {{
            color: var(--text-secondary);
            font-size: 0.9rem;
        }}

        .card-body {{
            padding: 0.5rem 1.25rem;
        }}

        .card-meta {{
            display: flex;
            gap: 1rem;
            margin-bottom: 0.5rem;
        }}

        .meta-item {{
            font-size: 0.8rem;
            color: var(--text-secondary);
        }}

        .card-category {{
            font-size: 0.8rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }}

        .card-preview {{
            font-size: 0.85rem;
            color: var(--text-secondary);
            line-height: 1.5;
            margin-top: 0.5rem;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }}

        .card-actions {{
            padding: 0.75rem 1.25rem 1.25rem;
        }}

        .btn-view {{
            display: inline-block;
            padding: 0.5rem 1rem;
            background: var(--primary);
            color: white;
            border-radius: 8px;
            text-decoration: none;
            font-size: 0.85rem;
            font-weight: 600;
            transition: background 0.2s;
        }}

        .btn-view:hover {{ background: var(--primary-hover); }}

        /* Empty state */
        .empty-state {{
            text-align: center;
            padding: 4rem 2rem;
            color: var(--text-secondary);
            grid-column: 1 / -1;
        }}

        .empty-state h3 {{ font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--text); }}

        /* Footer */
        .footer {{
            text-align: center;
            padding: 2rem;
            color: var(--text-secondary);
            font-size: 0.85rem;
            border-top: 1px solid var(--border);
        }}

        @media (max-width: 768px) {{
            .book-grid {{ grid-template-columns: 1fr; }}
            .stats-grid {{ grid-template-columns: repeat(2, 1fr); }}
        }}
    </style>
</head>
<body>
    <div class="header">
        <div class="header-inner">
            <h1>📚 BookSummarizer Dashboard</h1>
            <p>Koleksi rangkuman buku otomatis • {total} buku • {summarized} sudah dirangkum</p>
        </div>
    </div>

    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">{total}</div>
            <div class="stat-label">Total Buku</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" style="color: #10B981">{summarized}</div>
            <div class="stat-label">Sudah Dirangkum</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" style="color: #F59E0B">{total - summarized}</div>
            <div class="stat-label">Belum Dirangkum</div>
        </div>
        <div class="stat-card">
            <div class="stat-number" style="color: #8B5CF6">{len(categories)}</div>
            <div class="stat-label">Kategori</div>
        </div>
    </div>

    <div class="controls">
        <div class="search-wrapper">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-box" id="searchBox"
                   placeholder="Cari judul buku atau penulis...">
        </div>

        <div class="filter-row" id="categoryFilters">
            {''.join(cat_buttons)}
        </div>

        <div class="summary-toggle">
            <button class="toggle-btn active" data-show="all">Semua</button>
            <button class="toggle-btn" data-show="summarized">✅ Sudah Dirangkum</button>
            <button class="toggle-btn" data-show="pending">⏳ Belum Dirangkum</button>
        </div>
    </div>

    <div class="book-grid" id="bookGrid">
        {''.join(book_cards)}
        <div class="empty-state" id="emptyState" style="display:none">
            <h3>Tidak ada buku ditemukan</h3>
            <p>Coba ubah filter atau kata kunci pencarian</p>
        </div>
    </div>

    <div class="footer">
        <p>BookSummarizer System • Powered by Claude AI • Last updated: {datetime.now().strftime('%d %B %Y, %H:%M')}</p>
    </div>

    <script>
        const searchBox = document.getElementById('searchBox');
        const bookGrid = document.getElementById('bookGrid');
        const emptyState = document.getElementById('emptyState');
        const cards = document.querySelectorAll('.book-card');
        const catBtns = document.querySelectorAll('.filter-btn');
        const toggleBtns = document.querySelectorAll('.toggle-btn');

        let currentCategory = 'all';
        let currentSummaryFilter = 'all';

        function filterCards() {{
            const query = searchBox.value.toLowerCase();
            let visible = 0;

            cards.forEach(card => {{
                const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
                const author = card.querySelector('.card-author')?.textContent.toLowerCase() || '';
                const category = card.dataset.category;
                const hasSummary = card.dataset.hasSummary === 'true';

                const matchSearch = title.includes(query) || author.includes(query);
                const matchCategory = currentCategory === 'all' || category === currentCategory;
                const matchSummary = currentSummaryFilter === 'all' ||
                    (currentSummaryFilter === 'summarized' && hasSummary) ||
                    (currentSummaryFilter === 'pending' && !hasSummary);

                if (matchSearch && matchCategory && matchSummary) {{
                    card.classList.remove('hidden');
                    visible++;
                }} else {{
                    card.classList.add('hidden');
                }}
            }});

            emptyState.style.display = visible === 0 ? 'block' : 'none';
        }}

        searchBox.addEventListener('input', filterCards);

        catBtns.forEach(btn => {{
            btn.addEventListener('click', () => {{
                catBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.filter;
                filterCards();
            }});
        }});

        toggleBtns.forEach(btn => {{
            btn.addEventListener('click', () => {{
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSummaryFilter = btn.dataset.show;
                filterCards();
            }});
        }});
    </script>
</body>
</html>"""

    dashboard_path = os.path.join(output_dir, "dashboard.html")
    with open(dashboard_path, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"✅ Dashboard generated: {dashboard_path}")
    print(f"   📊 {total} books, {summarized} summarized, {len(categories)} categories")
    return dashboard_path


def _escape_html(text):
    """Escape HTML special characters."""
    if not text:
        return ""
    return (text
            .replace('&', '&amp;')
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace('"', '&quot;')
            .replace("'", '&#x27;'))


if __name__ == "__main__":
    import sys
    output_dir = sys.argv[1] if len(sys.argv) > 1 else "./output"
    generate_dashboard(output_dir)
