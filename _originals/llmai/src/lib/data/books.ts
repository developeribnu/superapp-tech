// ============================================================
// UNIVERSAL BOOK LIBRARY — DATA LAYER
// ============================================================
// 📌 CUSTOMIZE PER REPO: hanya bagian CONTENT CONFIGURATION
//    dan array booksLibrary[] yang perlu diubah.
//    Schema, helpers, dan utils JANGAN diubah antar repo.
// ============================================================

// ────────────────────────────────────────────────────────────
// 📌 CONTENT CONFIGURATION — Edit per repo
// ────────────────────────────────────────────────────────────
export const LIBRARY_CONFIG = {
  /** Nama domain repo ini, tampil di heading & breadcrumb */
  domainName: 'AI',

  /** Judul halaman library */
  pageTitle: 'AI Book Library',

  /** Deskripsi singkat di hero section */
  pageDescription:
    'Curated collection of essential AI books with summaries and downloadable eBooks.',

  /** Route dasar — biasanya konsisten: /resources/books */
  baseRoute: '/resources/books',

  /** Label badge "has content" */
  contentBadgeLabel: 'Summary + eBook',

  /** Empty state message */
  emptyStateMessage: 'No AI books found matching your criteria.',
} as const;

// ────────────────────────────────────────────────────────────
// TYPES — Frozen, sama di semua repo
// ────────────────────────────────────────────────────────────
export type BookCategory =
  | 'foundational'
  | 'advanced'
  | 'practical'
  | 'research'
  | 'professional';

export type BookStatus = 'unread' | 'reading' | 'completed';

export interface LibraryBook {
  /** URL-safe unique ID, e.g. 'atomic-habits-james-clear' */
  id: string;
  title: string;
  author: string;
  year: number;
  description: string;
  category: BookCategory;
  /** 1.0 – 5.0 */
  rating: number;
  readingStatus: BookStatus;
  /** Hex color untuk SVG cover fallback, e.g. '#1d4ed8' */
  coverColor: string;
  tags: string[];
  /** 3–5 bullet takeaways */
  keyTakeaways: string[];
  /** Markdown ringkasan panjang — opsional */
  summaryMarkdown?: string;
  /** URL gambar cover eksternal — opsional, fallback ke SVG jika kosong */
  coverImageUrl?: string;
  /** URL PDF untuk read online */
  pdfUrl?: string;
  /** URL PDF untuk download — boleh sama dengan pdfUrl */
  downloadUrl?: string;
  /** ISO date string YYYY-MM-DD */
  createdAt: string;
  /** ISO date string YYYY-MM-DD, opsional */
  updatedAt?: string;
}

// ────────────────────────────────────────────────────────────
// 📌 BOOKS DATA — Kirim materi → isi bagian ini
// ────────────────────────────────────────────────────────────
// Format per entry:
// {
//   id: 'slug-unik-judul-buku',
//   title: 'Judul Lengkap Buku',
//   author: 'Nama Penulis',
//   year: 2024,
//   description: 'Deskripsi 1–3 kalimat.',
//   category: 'foundational' | 'advanced' | 'practical' | 'research' | 'professional',
//   rating: 4.8,
//   readingStatus: 'unread' | 'reading' | 'completed',
//   coverColor: '#hex',
//   tags: ['tag1', 'tag2'],
//   keyTakeaways: ['Poin 1', 'Poin 2', 'Poin 3'],
//   summaryMarkdown: `# Judul\n\n...`,   // kirim sebagai teks markdown
//   pdfUrl: '/resources/uploads/nama-file.pdf',
//   downloadUrl: '/resources/uploads/nama-file.pdf',
//   createdAt: '2026-03-08',
// }

export const booksLibrary: LibraryBook[] = [
  {
    id: 'co-intelligence-living-and-working-with-ai',
    title: 'Co-Intelligence: Living and Working with AI',
    author: 'Ethan Mollick',
    year: 2024,
    description:
      'Buku penting tentang bagaimana manusia bekerja bersama AI dalam konteks kerja, belajar, kreativitas, dan pengambilan keputusan. Fokusnya bukan hanya pada kemampuan model, tetapi juga pada cara membangun kebiasaan dan pola kolaborasi yang efektif dengan AI.',
    category: 'foundational',
    rating: 4.9,
    readingStatus: 'unread',
    coverColor: '#0f172a',
    tags: ['ai', 'future-of-work', 'education', 'strategy'],
    keyTakeaways: [
      'AI paling bernilai saat diperlakukan sebagai partner kognitif, bukan sekadar alat otomatisasi.',
      'Cara manusia mendesain workflow dengan AI akan menentukan kualitas hasil dan dampak kerjanya.',
      'Adaptasi terhadap AI membutuhkan eksperimen cepat, literasi baru, dan perubahan cara berpikir tentang pekerjaan.',
    ],
    pdfUrl: '/resources/books/co-intelligence-living-and-working-with-ai.pdf',
    downloadUrl: '/resources/books/co-intelligence-living-and-working-with-ai.pdf',
    createdAt: '2026-03-17',
  },
  {
    id: 'claude-ai-for-writers-professionals',
    title:
      'Claude AI for Writers & Professionals: Enhance Your Creativity and Productivity',
    author: 'Charly Choi',
    year: 2025,
    description:
      'Panduan praktis untuk memanfaatkan Claude 3.7 Sonnet dalam workflow menulis dan pekerjaan profesional. Cakupannya meliputi prompting, creative writing, business documents, riset, analisis, dan peningkatan produktivitas dengan AI.',
    category: 'practical',
    rating: 4.6,
    readingStatus: 'unread',
    coverColor: '#92400e',
    tags: ['claude', 'writing', 'prompting', 'productivity'],
    keyTakeaways: [
      'Claude bisa dipakai bukan hanya untuk drafting, tetapi juga untuk struktur, revisi, dan ideation.',
      'Kualitas hasil sangat dipengaruhi oleh teknik prompt yang tepat dan konteks kerja yang jelas.',
      'Workflow AI yang efektif untuk profesional harus fokus pada akurasi, efisiensi, dan kualitas output akhir.',
    ],
    pdfUrl:
      '/resources/books/claude-ai-for-writers-professionals-enhance-your-creativity-and-productivity-unlocking-the-power-of-claude-3-7-sonnet-for.pdf',
    downloadUrl:
      '/resources/books/claude-ai-for-writers-professionals-enhance-your-creativity-and-productivity-unlocking-the-power-of-claude-3-7-sonnet-for.pdf',
    createdAt: '2026-03-17',
  },
  {
    id: 'building-llm-agents-with-rag-knowledge-graphs-and-reflection',
    title:
      'Building LLM Agents with RAG, Knowledge Graphs & Reflection: A Practical Guide to Building Intelligent, Context-Aware, and Self-Improving AI Agent',
    author: 'Mira S. Devlin',
    year: 2025,
    description:
      'Buku praktis untuk merancang agen LLM yang lebih andal dengan memadukan RAG, knowledge graphs, dan reflection. Materinya relevan untuk engineer yang ingin membangun agent system yang kontekstual, faktual, dan mampu memperbaiki dirinya secara iteratif.',
    category: 'advanced',
    rating: 4.8,
    readingStatus: 'unread',
    coverColor: '#1d4ed8',
    tags: ['llm-agents', 'rag', 'knowledge-graphs', 'reflection'],
    keyTakeaways: [
      'Agen LLM yang kuat tidak cukup hanya mengandalkan model, tetapi perlu retrieval, memory structure, dan feedback loops.',
      'Knowledge graph membantu menjaga konteks dan relasi antarfakta lebih stabil daripada retrieval yang sepenuhnya datar.',
      'Reflection memberi jalur untuk self-correction dan peningkatan kualitas reasoning secara sistematis.',
    ],
    pdfUrl:
      '/resources/books/building-llm-agents-with-rag-knowledge-graphs-and-reflection-a-practical-guide-to-building-intelligent-context-aware-and.pdf',
    downloadUrl:
      '/resources/books/building-llm-agents-with-rag-knowledge-graphs-and-reflection-a-practical-guide-to-building-intelligent-context-aware-and.pdf',
    createdAt: '2026-03-17',
  },
  {
    id: 'building-llms-for-production',
    title:
      'Building LLMs for Production: Enhancing LLM Abilities and Reliability with Prompting, Fine-Tuning, and RAG',
    author: 'Louis-François Bouchard, Louie Peters, and the Towards AI Team',
    year: 2024,
    description:
      'Referensi komprehensif untuk membawa aplikasi LLM ke production dengan pendekatan yang pragmatis. Cakupannya meliputi prompting, fine-tuning, RAG, deployment, dan penguatan reliability untuk use case dunia nyata.',
    category: 'advanced',
    rating: 4.9,
    readingStatus: 'unread',
    coverColor: '#7c3aed',
    tags: ['llm', 'production', 'fine-tuning', 'rag'],
    keyTakeaways: [
      'Production LLM systems perlu diseimbangkan antara capability, reliability, observability, dan cost.',
      'Prompting, fine-tuning, dan RAG bukan opsi yang saling eksklusif, tetapi toolkit yang dipilih sesuai kebutuhan sistem.',
      'Nilai praktis tertinggi datang dari arsitektur end-to-end yang bisa diuji, diukur, dan dioperasikan dengan disiplin engineering.',
    ],
    pdfUrl:
      '/resources/books/building-llms-for-production-enhancing-llm-abilities-and-reliability-with-prompting-fine-tuning-and-rag.pdf',
    downloadUrl:
      '/resources/books/building-llms-for-production-enhancing-llm-abilities-and-reliability-with-prompting-fine-tuning-and-rag.pdf',
    createdAt: '2026-03-17',
  },
  {
    id: 'automate-tasks-with-n8n-a-practical-guide-for-beginners',
    title: 'Automate Tasks with n8n: A Practical Guide for Beginners',
    author: 'Leandro Calado',
    year: 2025,
    description:
      'Panduan praktis untuk memahami dan membangun automation workflow dengan n8n dari level pemula. Cocok untuk operator, builder, dan tim yang ingin menghubungkan aplikasi, data, dan AI ke alur kerja yang lebih efisien.',
    category: 'practical',
    rating: 4.7,
    readingStatus: 'unread',
    coverColor: '#14532d',
    tags: ['n8n', 'automation', 'workflow', 'no-code'],
    keyTakeaways: [
      'n8n efektif untuk menyusun workflow automation lintas aplikasi tanpa bergantung pada tool yang terlalu tertutup.',
      'Desain workflow yang baik menuntut pemahaman trigger, node logic, data mapping, dan error handling.',
      'Automation yang stabil lahir dari struktur workflow yang jelas, reusable, dan mudah diobservasi.',
    ],
    pdfUrl: '/resources/books/automate-tasks-with-n8n-a-practical-guide-for-beginners.pdf',
    downloadUrl:
      '/resources/books/automate-tasks-with-n8n-a-practical-guide-for-beginners.pdf',
    createdAt: '2026-03-15',
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    author:
      'H. James Wilson, Andrew McAfee, Erik Brynjolfsson, Thomas H. Davenport, Harvard Business Review',
    year: 2019,
    description:
      'Kompilasi esai Harvard Business Review tentang AI dalam konteks bisnis, adopsi organisasi, masa depan kerja, dan implikasi strategisnya. Isinya cocok sebagai fondasi untuk pembaca yang ingin memahami AI dari sudut pandang eksekutif dan operasional.',
    category: 'foundational',
    rating: 4.7,
    readingStatus: 'unread',
    coverColor: '#334155',
    tags: ['artificial-intelligence', 'business', 'hbr', 'strategy'],
    keyTakeaways: [
      'AI perlu dipahami sebagai general-purpose technology yang mengubah model operasi bisnis.',
      'Adopsi AI yang berhasil bergantung pada data, pemilihan use case, dan kesiapan organisasi.',
      'Dampak AI ke pekerjaan dan keputusan manajerial perlu dikelola secara strategis, bukan reaktif.',
    ],
    pdfUrl: '/resources/books/artificial-intelligence.pdf',
    downloadUrl: '/resources/books/artificial-intelligence.pdf',
    createdAt: '2026-03-14',
  },
  {
    id: 'agentic-ai-in-enterprise',
    title: 'Agentic AI in Enterprise: Harnessing Agentic AI for Business Transformation',
    author: 'Sumit Ranjan, Divya Chembachere, Lanwin Lobo',
    year: 2025,
    description:
      'Panduan enterprise untuk memahami, merancang, dan menerapkan agentic AI pada transformasi bisnis. Fokus utamanya ada pada orkestrasi agen, reliability, dan implikasi operasional di lingkungan perusahaan.',
    category: 'professional',
    rating: 4.8,
    readingStatus: 'unread',
    coverColor: '#1f4b99',
    tags: ['agentic-ai', 'enterprise', 'automation', 'strategy'],
    keyTakeaways: [
      'Agentic AI perlu diperlakukan sebagai kapabilitas sistem, bukan sekadar fitur chatbot.',
      'Deployment enterprise menuntut reliability, observability, governance, dan human override.',
      'Nilai tertinggi datang dari orkestrasi workflow lintas tools dan fungsi bisnis.',
    ],
    pdfUrl:
      '/resources/books/agentic-ai-in-enterprise-harnessing-agentic-ai-for-business-transformation.pdf',
    downloadUrl:
      '/resources/books/agentic-ai-in-enterprise-harnessing-agentic-ai-for-business-transformation.pdf',
    createdAt: '2026-03-14',
  },
  {
    id: 'ai-engineering',
    title: 'AI Engineering',
    author: 'Unknown',
    year: 2025,
    description:
      'Referensi teknis berskala besar untuk membangun sistem AI production-grade. Materinya relevan untuk engineering pipeline, deployment, inference, evaluasi, dan operasi sistem AI modern.',
    category: 'advanced',
    rating: 4.9,
    readingStatus: 'unread',
    coverColor: '#0f766e',
    tags: ['ai-engineering', 'production', 'mlops', 'systems'],
    keyTakeaways: [
      'AI engineering menuntut disiplin software engineering dan infrastructure engineering sekaligus.',
      'Sistem AI production harus dioptimalkan untuk latency, reliability, quality, dan cost.',
      'Evaluasi, monitoring, dan deployment strategy menentukan keberhasilan jangka panjang model.',
    ],
    pdfUrl: '/resources/books/ai-engineering.pdf',
    downloadUrl: '/resources/books/ai-engineering.pdf',
    createdAt: '2026-03-14',
  },
  {
    id: 'ai-native-llm-security',
    title:
      'AI Native LLM Security: Threats, Defenses, and Best Practices for Building Safe and Trustworthy AI',
    author: 'Unknown',
    year: 2025,
    description:
      'Buku ini membahas threat model, attack surface, dan praktik pertahanan untuk membangun aplikasi LLM yang aman dan dapat dipercaya. Cakupannya relevan untuk produk AI-native, platform internal, dan agentic systems.',
    category: 'advanced',
    rating: 4.8,
    readingStatus: 'unread',
    coverColor: '#7c2d12',
    tags: ['llm-security', 'ai-safety', 'defense', 'trustworthy-ai'],
    keyTakeaways: [
      'Keamanan LLM mencakup prompt injection, data leakage, tool abuse, dan model misuse.',
      'Defense-in-depth wajib diterapkan di layer input, orchestration, retrieval, tool access, dan output.',
      'Governance dan observability sama pentingnya dengan hardening teknis.',
    ],
    pdfUrl:
      '/resources/books/ai-native-llm-security-threats-defenses-and-best-practices-for-building-safe-and-trustworthy-ai.pdf',
    downloadUrl:
      '/resources/books/ai-native-llm-security-threats-defenses-and-best-practices-for-building-safe-and-trustworthy-ai.pdf',
    createdAt: '2026-03-14',
  },
  {
    id: 'ai-product-managers-handbook-second-edition',
    title:
      "AI Product Manager's Handbook, Second Edition: Build, Integrate, Scale, and Optimize Products to Grow as an AI Product Manager",
    author: 'Unknown',
    year: 2025,
    description:
      'Panduan praktis untuk product manager yang bekerja dengan AI products, dari discovery sampai scaling. Fokusnya pada integrasi AI ke produk, prioritisasi use case, dan pengelolaan tradeoff bisnis-teknis.',
    category: 'professional',
    rating: 4.7,
    readingStatus: 'unread',
    coverColor: '#5b21b6',
    tags: ['product-management', 'ai-product', 'strategy', 'execution'],
    keyTakeaways: [
      'AI product management membutuhkan framing masalah yang tajam, bukan sekadar memilih model terbaik.',
      'Keberhasilan AI product ditentukan oleh workflow fit, feedback loops, dan measurement yang benar.',
      'PM AI harus mampu menjembatani bisnis, desain, data, dan engineering secara operasional.',
    ],
    pdfUrl:
      '/resources/books/ai-product-managers-handbook-second-edition-build-integrate-scale-and-optimize-products-to-grow-as-an-ai-product-manager.pdf',
    downloadUrl:
      '/resources/books/ai-product-managers-handbook-second-edition-build-integrate-scale-and-optimize-products-to-grow-as-an-ai-product-manager.pdf',
    createdAt: '2026-03-14',
  },
  {
    id: 'ai-profit-playbook',
    title: 'AI Profit Playbook: Unleash Proven Tactics for Massive AI-Driven Earnings',
    author: 'Unknown',
    year: 2025,
    description:
      'Buku bernuansa practical-business yang menyorot cara mengubah AI menjadi mesin pertumbuhan dan monetisasi. Cocok untuk founder, operator, dan pebisnis yang ingin memetakan use case AI ke revenue.',
    category: 'practical',
    rating: 4.5,
    readingStatus: 'unread',
    coverColor: '#9a3412',
    tags: ['ai-business', 'monetization', 'growth', 'playbook'],
    keyTakeaways: [
      'Monetisasi AI efektif datang dari positioning yang jelas dan problem-value fit yang konkret.',
      'AI-driven earnings perlu ditopang oleh economics yang sehat, bukan sekadar hype distribusi.',
      'Strategi go-to-market AI harus mempertimbangkan differentiation, trust, dan execution speed.',
    ],
    pdfUrl:
      '/resources/books/ai-profit-playbook-unleash-proven-tactics-for-massive-ai-driven-earnings.pdf',
    downloadUrl:
      '/resources/books/ai-profit-playbook-unleash-proven-tactics-for-massive-ai-driven-earnings.pdf',
    createdAt: '2026-03-14',
  },
];

// ────────────────────────────────────────────────────────────
// HELPERS — Frozen, jangan diubah
// ────────────────────────────────────────────────────────────
export function getBookById(id: string): LibraryBook | undefined {
  return booksLibrary.find((b) => b.id === id);
}

export function hasBookSummary(book: LibraryBook): boolean {
  return Boolean(book.summaryMarkdown?.trim());
}

export function hasBookEbook(book: LibraryBook): boolean {
  return Boolean(book.pdfUrl || book.downloadUrl);
}

export function hasBookSummaryAndEbook(book: LibraryBook): boolean {
  return hasBookSummary(book) && hasBookEbook(book);
}

export function getBookStats() {
  const total = booksLibrary.length;
  const withContent = booksLibrary.filter(hasBookSummaryAndEbook).length;
  const completed = booksLibrary.filter((b) => b.readingStatus === 'completed').length;
  const reading = booksLibrary.filter((b) => b.readingStatus === 'reading').length;
  const avgRating =
    total > 0
      ? (booksLibrary.reduce((sum, b) => sum + b.rating, 0) / total).toFixed(1)
      : '0.0';
  return { total, withContent, completed, reading, avgRating };
}

export function getFeaturedBook(): LibraryBook | null {
  if (booksLibrary.length === 0) return null;
  return [...booksLibrary].sort((a, b) => b.rating - a.rating)[0] ?? null;
}

export function getRelatedBooks(book: LibraryBook, limit = 4): LibraryBook[] {
  return booksLibrary
    .filter((b) => b.id !== book.id && b.category === book.category)
    .slice(0, limit);
}

function normalizeText(val: string): string {
  return val.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function escapeSvg(val: string): string {
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** SVG cover fallback — dipanggil otomatis jika coverImageUrl kosong */
export function getBookCoverFallback(
  book: Pick<LibraryBook, 'title' | 'author' | 'coverColor'>,
): string {
  const title = book.title.length > 34 ? `${book.title.slice(0, 31)}...` : book.title;
  const author = book.author.length > 30 ? `${book.author.slice(0, 27)}...` : book.author;
  const color = book.coverColor || '#334155';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="400" height="600" fill="url(#bg)"/>
  <rect x="26" y="26" width="348" height="548" rx="14" fill="none" stroke="rgba(255,255,255,0.22)"/>
  <text x="36" y="70" fill="rgba(255,255,255,0.75)" font-size="16"
    font-family="system-ui,sans-serif" letter-spacing="2">BOOK LIBRARY</text>
  <text x="36" y="420" fill="#ffffff" font-size="28"
    font-family="Georgia,serif" font-weight="700">${escapeSvg(title)}</text>
  <text x="36" y="462" fill="#E5E7EB" font-size="18"
    font-family="system-ui,sans-serif">${escapeSvg(author)}</text>
</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/** Open Library cover ID map — tambah entri jika buku dikenal OL */
const OL_COVER_MAP: Record<string, number> = {
  [`${normalizeText('Deep Work')}::${normalizeText('Cal Newport')}`]: 8244151,
  [`${normalizeText('Atomic Habits')}::${normalizeText('James Clear')}`]: 10521270,
};

export function getBookCoverUrl(
  book: Pick<LibraryBook, 'title' | 'author' | 'coverColor' | 'coverImageUrl'>,
): string {
  if (book.coverImageUrl) return book.coverImageUrl;
  const key = `${normalizeText(book.title)}::${normalizeText(book.author)}`;
  const coverId = OL_COVER_MAP[key];
  if (coverId) return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  return getBookCoverFallback(book);
}

export function getCategoryBadgeClass(category: BookCategory): string {
  const map: Record<BookCategory, string> = {
    foundational: 'badge-foundational',
    practical: 'badge-practical',
    advanced: 'badge-advanced',
    research: 'badge-research',
    professional: 'badge-professional',
  };
  return map[category] ?? '';
}

export function getStatusBadgeClass(status: BookStatus): string {
  switch (status) {
    case 'reading':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800/40 dark:text-gray-300';
  }
}

export function formatRelativeDate(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / 86_400_000);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  if (days < 1) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (weeks === 1) return '1 week ago';
  if (weeks < 4) return `${weeks} weeks ago`;
  if (months === 1) return '1 month ago';
  if (months < 12) return `${months} months ago`;
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short' }).format(date);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
