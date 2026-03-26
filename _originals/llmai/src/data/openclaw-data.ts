// OpenClaw Data - Exported from Google Sheets
// https://docs.google.com/spreadsheets/d/1oyy-B1JkrBCcX2-0F80FXSrxHEIYJKpJ

export interface AIStackItem {
  platform: string;
  biayaBulanan: string;
  peranUtama: string;
  workloadPercent: string;
  keunggulanUnik: string;
  kelemahan: string;
  domainTerbaik: string;
  kapanDigunakan: string;
}

export interface UseCase {
  domain: string;
  useCase: string;
  platformUtama: string;
  platformSupport: string;
  frekuensi: string;
  skillTool: string;
  output: string;
  estimasiWaktuHemat: string;
}

export interface KimiAutomation {
  waktuJadwal: string;
  namaTask: string;
  cronExpression: string;
  deskripsi: string;
  skillsDibutuhkan: string;
  outputChannel: string;
  priority: string;
  statusSetup: string;
}

export interface WorkflowLoop {
  workflowName: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  hasilAkhir: string;
  frekuensi: string;
}

export interface ClawHubSkill {
  tier: string;
  skillName: string;
  kategori: string;
  fungsi: string;
  installCommand: string;
  securityRisk: string;
  rekomendasiDomain: string;
  notes: string;
}

export interface SecurityRule {
  tipeData: string;
  claudeMax: string;
  chatGPT: string;
  gemini: string;
  kimiClaw: string;
  alasan: string;
}

export interface RoadmapItem {
  week: string;
  phase: string;
  actions: string;
  platform: string;
  deliverable: string;
  estTime: string;
  checklist: string;
}

// AI Stack Overview Data
export const aiStackData: AIStackItem[] = [
  {
    platform: "Claude Max 5x",
    biayaBulanan: "$100",
    peranUtama: "Primary Brain — Deep reasoning, coding, analysis",
    workloadPercent: "40%",
    keunggulanUnik: "SWE-bench 80.9%, 200K context, lowest hallucination, Claude Code included",
    kelemahan: "Tidak always-on, no image generation, no Google ecosystem",
    domainTerbaik: "Gov reports, PhD research, coding, complex analysis",
    kapanDigunakan: "Setiap kali butuh deep thinking, analisis panjang, coding complex, review dokumen pemerintah"
  },
  {
    platform: "ChatGPT Plus",
    biayaBulanan: "$20",
    peranUtama: "Creative Versatility — Content, brainstorm, visual",
    workloadPercent: "25%",
    keunggulanUnik: "DALL-E 4 + Sora, natural writing, persistent memory, 53% win analytical test",
    kelemahan: "Hallucination lebih tinggi dari Claude, context window lebih kecil",
    domainTerbaik: "Content creation, TikTok scripts, brainstorming, image gen",
    kapanDigunakan: "Brainstorming konten, social media copy, generate gambar, creative writing"
  },
  {
    platform: "Kimi Claw",
    biayaBulanan: "~$39",
    peranUtama: "24/7 Autonomous Agent — Background ops, monitoring",
    workloadPercent: "15%",
    keunggulanUnik: "SATU-SATUNYA yg always-on, cron jobs, 5000+ skills, persistent memory, Telegram bridge",
    kelemahan: "Beta, security risk (China-hosted), skill ecosystem belum mature, timeout pada task complex",
    domainTerbaik: "Scheduled briefings, monitoring, automated pipelines",
    kapanDigunakan: "Semua yg butuh berjalan TANPA supervisi: daily digest, price alerts, news scanning, competitive intel"
  },
  {
    platform: "Gemini Pro",
    biayaBulanan: "$20",
    peranUtama: "Google Ecosystem — Gmail, Docs, Sheets integration",
    workloadPercent: "15%",
    keunggulanUnik: "Native Google Workspace, fastest web search, real-time data",
    kelemahan: "Reasoning depth kalah dari Claude, paling droppable subscription",
    domainTerbaik: "Google Workspace tasks, real-time research",
    kapanDigunakan: "Query Gmail, edit Sheets/Docs, real-time search, Google Calendar management"
  }
];

export const totalBiaya = {
  bulanan: "$179/mo",
  tahunan: "$2,148/year"
};

// Use Cases per Domain Data
export const useCasesData: UseCase[] = [
  {
    domain: "🏛️ Government",
    useCase: "Morning policy news briefing",
    platformUtama: "Kimi Claw",
    platformSupport: "Claude",
    frekuensi: "Daily 07:00",
    skillTool: "Tavily + news-aggregator",
    output: "Ringkasan berita kebijakan perumahan",
    estimasiWaktuHemat: "15 min/hari"
  },
  {
    domain: "🏛️ Government",
    useCase: "Draft laporan kinerja bulanan",
    platformUtama: "Claude Max",
    platformSupport: "—",
    frekuensi: "Monthly",
    skillTool: "Claude Code + docx skill",
    output: "Dokumen .docx siap review",
    estimasiWaktuHemat: "3-4 jam/bulan"
  },
  {
    domain: "🏛️ Government",
    useCase: "Monitor regulasi baru (BSPS, FLPP)",
    platformUtama: "Kimi Claw",
    platformSupport: "Claude",
    frekuensi: "Daily scan",
    skillTool: "web-search + cron",
    output: "Alert via Telegram jika ada update",
    estimasiWaktuHemat: "30 min/hari"
  },
  {
    domain: "🏛️ Government",
    useCase: "Analisis data program perumahan",
    platformUtama: "Claude Max",
    platformSupport: "Gemini",
    frekuensi: "As needed",
    skillTool: "Code Execution + xlsx",
    output: "Spreadsheet + visualisasi",
    estimasiWaktuHemat: "2 jam/task"
  },
  {
    domain: "🏛️ Government",
    useCase: "Prepare briefing materials rapat",
    platformUtama: "Claude Max",
    platformSupport: "ChatGPT",
    frekuensi: "Weekly",
    skillTool: "pptx skill",
    output: "Slide deck siap presentasi",
    estimasiWaktuHemat: "1-2 jam/minggu"
  },
  {
    domain: "💻 Tech/Dev",
    useCase: "PR review otomatis via Telegram",
    platformUtama: "Kimi Claw",
    platformSupport: "Claude Code",
    frekuensi: "Per PR",
    skillTool: "github + telegram bridge",
    output: "Review summary + suggestions",
    estimasiWaktuHemat: "20 min/PR"
  },
  {
    domain: "💻 Tech/Dev",
    useCase: "Debug & fix code complex",
    platformUtama: "Claude Max",
    platformSupport: "—",
    frekuensi: "Daily",
    skillTool: "Claude Code (terminal)",
    output: "Working code + explanations",
    estimasiWaktuHemat: "30 min/session"
  },
  {
    domain: "💻 Tech/Dev",
    useCase: "Generate unit tests",
    platformUtama: "Claude Max",
    platformSupport: "ChatGPT",
    frekuensi: "Per feature",
    skillTool: "Claude Code",
    output: "Test files dengan coverage",
    estimasiWaktuHemat: "45 min/feature"
  },
  {
    domain: "💻 Tech/Dev",
    useCase: "Architecture decision records",
    platformUtama: "Claude Max",
    platformSupport: "—",
    frekuensi: "As needed",
    skillTool: "Claude Code + markdown",
    output: "ADR docs di repo",
    estimasiWaktuHemat: "1 jam/decision"
  },
  {
    domain: "🎬 Content Creation",
    useCase: "Brainstorm video scripts",
    platformUtama: "ChatGPT",
    platformSupport: "Claude",
    frekuensi: "Daily",
    skillTool: "Native",
    output: "5 script ideas + hooks",
    estimasiWaktuHemat: "30 min/session"
  },
  {
    domain: "🎬 Content Creation",
    useCase: "Generate thumbnail images",
    platformUtama: "ChatGPT",
    platformSupport: "—",
    frekuensi: "Per video",
    skillTool: "DALL-E 4",
    output: "High-quality thumbnails",
    estimasiWaktuHemat: "15 min/thumbnail"
  },
  {
    domain: "🎬 Content Creation",
    useCase: "Trending topics scan",
    platformUtama: "Kimi Claw",
    platformSupport: "ChatGPT",
    frekuensi: "Daily auto",
    skillTool: "Tavily + reddit-readonly",
    output: "Daily trend report",
    estimasiWaktuHemat: "20 min/hari"
  },
  {
    domain: "🎬 Content Creation",
    useCase: "Content calendar management",
    platformUtama: "Gemini",
    platformSupport: "Kimi Claw",
    frekuensi: "Weekly",
    skillTool: "Google Calendar + Sheets",
    output: "Scheduled content plan",
    estimasiWaktuHemat: "1 jam/minggu"
  },
  {
    domain: "🎓 PhD/Research",
    useCase: "Literature review automation",
    platformUtama: "Claude Max",
    platformSupport: "Kimi Claw",
    frekuensi: "Weekly",
    skillTool: "arxiv-search-collector",
    output: "Summarized papers + insights",
    estimasiWaktuHemat: "3-4 jam/minggu"
  },
  {
    domain: "🎓 PhD/Research",
    useCase: "Draft research proposal",
    platformUtama: "Claude Max",
    platformSupport: "ChatGPT",
    frekuensi: "As needed",
    skillTool: "Claude Code",
    output: "Complete proposal draft",
    estimasiWaktuHemat: "5-6 jam/proposal"
  },
  {
    domain: "🎓 PhD/Research",
    useCase: "Citation management",
    platformUtama: "Kimi Claw",
    platformSupport: "Claude",
    frekuensi: "Ongoing",
    skillTool: "Fast.io + zotero",
    output: "Organized bibliography",
    estimasiWaktuHemat: "30 min/paper"
  },
  {
    domain: "🎓 PhD/Research",
    useCase: "Professor publication monitoring",
    platformUtama: "Kimi Claw",
    platformSupport: "—",
    frekuensi: "Weekly auto",
    skillTool: "arxiv-search + alert",
    output: "New publication alerts",
    estimasiWaktuHemat: "1 jam/minggu"
  }
];

// Kimi Claw Automations Data
export const kimiAutomationsData: KimiAutomation[] = [
  {
    waktuJadwal: "07:00 WIB",
    namaTask: "Morning Briefing",
    cronExpression: "0 0 * * *",
    deskripsi: "Compile: top news, hari ini schedule, overnight updates, project status",
    skillsDibutuhkan: "Tavily, gog (Calendar), mission-control",
    outputChannel: "Telegram",
    priority: "🔴 HIGH",
    statusSetup: "⬜ TODO"
  },
  {
    waktuJadwal: "08:00 WIB",
    namaTask: "arXiv Paper Scan",
    cronExpression: "0 1 * * *",
    deskripsi: "Scan arXiv untuk keyword: AI governance, digital government, smart city",
    skillsDibutuhkan: "arxiv-search-collector",
    outputChannel: "Telegram",
    priority: "🟡 MED",
    statusSetup: "⬜ TODO"
  },
  {
    waktuJadwal: "09:00 WIB",
    namaTask: "Market Check",
    cronExpression: "0 2 * * *",
    deskripsi: "Harga crypto (BTC, ETH) + index saham + forex USD/IDR",
    skillsDibutuhkan: "stock-analyzer, web-search",
    outputChannel: "Telegram",
    priority: "🟡 MED",
    statusSetup: "⬜ TODO"
  },
  {
    waktuJadwal: "12:00 WIB",
    namaTask: "Midday Check-in",
    cronExpression: "0 5 * * *",
    deskripsi: "Progress reminder + afternoon priorities + any urgent updates",
    skillsDibutuhkan: "mission-control, todoist",
    outputChannel: "Telegram",
    priority: "🟢 LOW",
    statusSetup: "⬜ TODO"
  },
  {
    waktuJadwal: "17:00 WIB",
    namaTask: "EOD Summary",
    cronExpression: "0 10 * * *",
    deskripsi: "Recap hari ini: tasks completed, pending items, tomorrow prep",
    skillsDibutuhkan: "todoist, gog",
    outputChannel: "Telegram",
    priority: "🟡 MED",
    statusSetup: "⬜ TODO"
  },
  {
    waktuJadwal: "21:00 WIB",
    namaTask: "Night Digest",
    cronExpression: "0 14 * * *",
    deskripsi: "Berita penting hari ini + trending tech topics + social media trends",
    skillsDibutuhkan: "Tavily, reddit-readonly",
    outputChannel: "Telegram",
    priority: "🟢 LOW",
    statusSetup: "⬜ TODO"
  },
  {
    waktuJadwal: "Senin 07:30",
    namaTask: "Weekly Planning",
    cronExpression: "30 0 * * 1",
    deskripsi: "Review weekly goals, set priorities, check deadlines minggu ini",
    skillsDibutuhkan: "todoist, gog, mission-control",
    outputChannel: "Telegram",
    priority: "🔴 HIGH",
    statusSetup: "⬜ TODO"
  },
  {
    waktuJadwal: "Rabu 20:00",
    namaTask: "Weekly Report Draft",
    cronExpression: "0 13 * * 3",
    deskripsi: "Compile weekly progress untuk laporan ke atasan",
    skillsDibutuhkan: "todoist, docx",
    outputChannel: "Email + Telegram",
    priority: "🟡 MED",
    statusSetup: "⬜ TODO"
  },
  {
    waktuJadwal: "Jumat 16:00",
    namaTask: "Weekend Read Prep",
    cronExpression: "0 9 * * 5",
    deskripsi: "Curate papers/articles untuk bacaan weekend",
    skillsDibutuhkan: "arxiv-search, Tavily",
    outputChannel: "Telegram",
    priority: "🟢 LOW",
    statusSetup: "⬜ TODO"
  }
];

// Workflow Loops Data
export const workflowLoopsData: WorkflowLoop[] = [
  {
    workflowName: "Morning Ops Flow",
    step1: "🦞 Kimi: Collect news, calendar, market data (07:00 auto)",
    step2: "🦞 Kimi: Compile briefing → send Telegram",
    step3: "🧠 Claude: Deep-dive jika ada issue penting",
    step4: "📅 Gemini: Update Google Calendar priorities",
    hasilAkhir: "Daily briefing + updated priorities",
    frekuensi: "Daily"
  },
  {
    workflowName: "Research Pipeline",
    step1: "🦞 Kimi: Scan arXiv + Google Scholar (auto daily)",
    step2: "🧠 Claude: Analyze top 5 papers (200K context)",
    step3: "🧠 Claude: Generate literature review notes",
    step4: "🦞 Kimi: Save to Fast.io knowledge base",
    hasilAkhir: "Growing research knowledge base",
    frekuensi: "Daily → Weekly"
  },
  {
    workflowName: "Government Report",
    step1: "🧠 Claude: Design report structure + outline",
    step2: "🧠 Claude: Draft full report with data analysis",
    step3: "🤖 ChatGPT: Polish language + create infographics",
    step4: "📅 Gemini: Share via Google Drive to team",
    hasilAkhir: "Professional .docx report ready",
    frekuensi: "Monthly"
  },
  {
    workflowName: "Content Creation",
    step1: "🦞 Kimi: Scan trending topics (auto daily)",
    step2: "🤖 ChatGPT: Brainstorm 5 script ideas + hooks",
    step3: "🤖 ChatGPT: Write full script + DALL-E thumbnail",
    step4: "🦞 Kimi: Schedule to content calendar",
    hasilAkhir: "Ready-to-record script + visual",
    frekuensi: "3-5x/week"
  },
  {
    workflowName: "PhD Application",
    step1: "🦞 Kimi: Monitor deadlines + professor publications",
    step2: "🧠 Claude: Draft SoP/research proposal",
    step3: "🤖 ChatGPT: Creative editing + narrative polish",
    step4: "🧠 Claude: Final review + consistency check",
    hasilAkhir: "Complete application package",
    frekuensi: "As needed"
  },
  {
    workflowName: "Competitive Intel",
    step1: "🦞 Kimi: Weekly website scan + news collect (auto)",
    step2: "🧠 Claude: Synthesize into strategic analysis",
    step3: "🤖 ChatGPT: Create visual summary slides",
    step4: "🦞 Kimi: Archive to Fast.io + alert if critical",
    hasilAkhir: "Weekly intel brief",
    frekuensi: "Weekly"
  },
  {
    workflowName: "Code Development",
    step1: "🧠 Claude Code: Write + debug complex features",
    step2: "🦞 Kimi: Trigger test suite via GitHub skill",
    step3: "🦞 Kimi: Monitor CI/CD + alert on failures",
    step4: "🧠 Claude: Fix failing tests from Telegram alert",
    hasilAkhir: "Tested, deployed code",
    frekuensi: "Continuous"
  }
];

// ClawHub Skills Data
export const clawHubSkillsData: ClawHubSkill[] = [
  {
    tier: "Tier 1",
    skillName: "Tavily (web-search)",
    kategori: "Research",
    fungsi: "Enhanced web search dengan live data + source verification",
    installCommand: "clawhub install tavily",
    securityRisk: "🟢 LOW",
    rekomendasiDomain: "Semua domain",
    notes: "Wajib install pertama, foundation utk semua research"
  },
  {
    tier: "Tier 1",
    skillName: "gog (Google Suite)",
    kategori: "Productivity",
    fungsi: "Google Calendar, Docs, Sheets, Gmail integration",
    installCommand: "clawhub install gog",
    securityRisk: "🟡 MED",
    rekomendasiDomain: "Gov, Research",
    notes: "Review OAuth scopes sebelum install"
  },
  {
    tier: "Tier 1",
    skillName: "himalaya (Email)",
    kategori: "Communication",
    fungsi: "IMAP/SMTP email — read, send, organize",
    installCommand: "clawhub install himalaya",
    securityRisk: "🟡 MED",
    rekomendasiDomain: "Semua domain",
    notes: "Jangan connect email gov — pakai personal email saja"
  },
  {
    tier: "Tier 1",
    skillName: "github",
    kategori: "Development",
    fungsi: "PR review, issue tracking, CI/CD monitoring",
    installCommand: "clawhub install github",
    securityRisk: "🟡 MED",
    rekomendasiDomain: "Tech/Dev",
    notes: "Limit ke repo non-sensitive"
  },
  {
    tier: "Tier 1",
    skillName: "Fast.io",
    kategori: "Storage",
    fungsi: "50GB persistent cloud storage + RAG search",
    installCommand: "clawhub install fast-io",
    securityRisk: "🟡 MED",
    rekomendasiDomain: "Semua domain",
    notes: "Knowledge base utama — simpan semua research output"
  },
  {
    tier: "Tier 2",
    skillName: "arxiv-search-collector",
    kategori: "Research",
    fungsi: "Scan arXiv papers berdasarkan keyword",
    installCommand: "clawhub install arxiv-search",
    securityRisk: "🟢 LOW",
    rekomendasiDomain: "PhD Research",
    notes: "Setup keyword: AI governance, digital gov, smart city"
  },
  {
    tier: "Tier 2",
    skillName: "AgentMail",
    kategori: "Communication",
    fungsi: "Managed email identity khusus agent",
    installCommand: "clawhub install agentmail",
    securityRisk: "🟡 MED",
    rekomendasiDomain: "Content, Dev",
    notes: "Buat email terpisah untuk agent operations"
  },
  {
    tier: "Tier 2",
    skillName: "stock-analyzer",
    kategori: "Finance",
    fungsi: "Track harga crypto & saham real-time",
    installCommand: "clawhub install stock-analyzer",
    securityRisk: "🟢 LOW",
    rekomendasiDomain: "Personal",
    notes: "Gunakan untuk personal finance tracking"
  },
  {
    tier: "Tier 2",
    skillName: "mission-control",
    kategori: "Productivity",
    fungsi: "Task management + priority tracking",
    installCommand: "clawhub install mission-control",
    securityRisk: "🟢 LOW",
    rekomendasiDomain: "Semua domain",
    notes: "Integrasi dengan todoist"
  },
  {
    tier: "Tier 2",
    skillName: "todoist",
    kategori: "Productivity",
    fungsi: "Sync dengan Todoist account",
    installCommand: "clawhub install todoist",
    securityRisk: "🟢 LOW",
    rekomendasiDomain: "Semua domain",
    notes: "API key dari Todoist settings"
  },
  {
    tier: "Tier 2",
    skillName: "reddit-readonly",
    kategori: "Research",
    fungsi: "Scan subreddit untuk trends & insights",
    installCommand: "clawhub install reddit-readonly",
    securityRisk: "🟢 LOW",
    rekomendasiDomain: "Content, Research",
    notes: "Gunakan untuk social listening"
  },
  {
    tier: "Tier 3",
    skillName: "telegram-bridge",
    kategori: "Communication",
    fungsi: "Two-way communication via Telegram bot",
    installCommand: "clawhub install telegram-bridge",
    securityRisk: "🟡 MED",
    rekomendasiDomain: "Semua domain",
    notes: "Critical untuk notifikasi real-time"
  },
  {
    tier: "Tier 3",
    skillName: "docx (Document)",
    kategori: "Productivity",
    fungsi: "Generate & edit Word documents",
    installCommand: "clawhub install docx",
    securityRisk: "🟢 LOW",
    rekomendasiDomain: "Gov, Research",
    notes: "Untuk generate laporan formal"
  },
  {
    tier: "Tier 3",
    skillName: "pptx (Presentation)",
    kategori: "Productivity",
    fungsi: "Generate PowerPoint presentations",
    installCommand: "clawhub install pptx",
    securityRisk: "🟢 LOW",
    rekomendasiDomain: "Gov, Content",
    notes: "Auto-generate slide decks"
  },
  {
    tier: "Tier 3",
    skillName: "zotero",
    kategori: "Research",
    fungsi: "Citation & bibliography management",
    installCommand: "clawhub install zotero",
    securityRisk: "🟢 LOW",
    rekomendasiDomain: "PhD Research",
    notes: "Sync dengan Zotero library"
  }
];

// Security Rules Data
export const securityRulesData: SecurityRule[] = [
  {
    tipeData: "Dokumen pemerintah (internal)",
    claudeMax: "✅ OK",
    chatGPT: "✅ OK",
    gemini: "✅ OK",
    kimiClaw: "❌ NEVER",
    alasan: "China National Intelligence Law — semua data bisa diakses pemerintah China"
  },
  {
    tipeData: "Data kinerja program (BSPS, FLPP)",
    claudeMax: "✅ OK",
    chatGPT: "⚠️ Careful",
    gemini: "✅ OK",
    kimiClaw: "❌ NEVER",
    alasan: "Data program pemerintah sensitif — jangan expose ke server China"
  },
  {
    tipeData: "Draft research/unpublished papers",
    claudeMax: "✅ OK",
    chatGPT: "✅ OK",
    gemini: "⚠️ Careful",
    kimiClaw: "❌ NEVER",
    alasan: "Risiko intellectual property — jaga prior art"
  },
  {
    tipeData: "Code repository (private)",
    claudeMax: "✅ OK",
    chatGPT: "⚠️ Careful",
    gemini: "✅ OK",
    kimiClaw: "❌ NEVER",
    alasan: "Proprietary code — high IP risk"
  },
  {
    tipeData: "API keys & credentials",
    claudeMax: "❌ NEVER",
    chatGPT: "❌ NEVER",
    gemini: "❌ NEVER",
    kimiClaw: "❌ NEVER",
    alasan: "JANGAN pernah share credentials di chat — gunakan environment variables"
  },
  {
    tipeData: "Personal financial data (saldo, portfolio)",
    claudeMax: "✅ OK",
    chatGPT: "⚠️ Careful",
    gemini: "⚠️ Careful",
    kimiClaw: "❌ NEVER",
    alasan: "Jangan expose detail finansial ke platform manapun yang tidak perlu"
  },
  {
    tipeData: "Passwords & authentication tokens",
    claudeMax: "❌ NEVER",
    chatGPT: "❌ NEVER",
    gemini: "❌ NEVER",
    kimiClaw: "❌ NEVER",
    alasan: "Security critical — never share with any AI"
  },
  {
    tipeData: "PII (Personal Identifiable Information)",
    claudeMax: "⚠️ Careful",
    chatGPT: "⚠️ Careful",
    gemini: "⚠️ Careful",
    kimiClaw: "❌ NEVER",
    alasan: "Privacy risk — minimize sharing"
  },
  {
    tipeData: "Berita publik & trending topics",
    claudeMax: "✅ OK",
    chatGPT: "✅ OK",
    gemini: "✅ OK",
    kimiClaw: "✅ OK",
    alasan: "Data publik — aman untuk semua platform"
  },
  {
    tipeData: "arXiv papers (published)",
    claudeMax: "✅ OK",
    chatGPT: "✅ OK",
    gemini: "✅ OK",
    kimiClaw: "✅ OK",
    alasan: "Sudah dipublikasi — no risk"
  }
];

// ROI Calculator Data
export const roiData = {
  biaya: {
    claudeMax: 100,
    chatGPT: 20,
    gemini: 20,
    kimiClaw: 39
  },
  totalBulanan: 179,
  totalTahunan: 2148,
  tasks: [
    { task: "Morning briefing", minPerTask: 15, freqPerBulan: 30, totalMinHemat: 450 },
    { task: "Report drafting", minPerTask: 180, freqPerBulan: 1, totalMinHemat: 180 },
    { task: "Code review/debug", minPerTask: 30, freqPerBulan: 20, totalMinHemat: 600 },
    { task: "Content creation", minPerTask: 45, freqPerBulan: 12, totalMinHemat: 540 },
    { task: "Research automation", minPerTask: 180, freqPerBulan: 4, totalMinHemat: 720 },
    { task: "Meeting prep", minPerTask: 60, freqPerBulan: 8, totalMinHemat: 480 }
  ],
  totalTimeSaved: 2970, // minutes per month
  valueOfTime: 50, // $/hour assumed
  roiPercent: 165
};

// Implementation Roadmap Data
export const roadmapData: RoadmapItem[] = [
  {
    week: "Week 1",
    phase: "Foundation",
    actions: "1. Deploy Kimi Claw di kimi.com/bot\n2. Install Tier 1 skills (Tavily, gog, himalaya)\n3. Connect Telegram bridge\n4. Setup 1 cron: Morning Briefing",
    platform: "Kimi Claw",
    deliverable: "Working morning briefing via Telegram",
    estTime: "3-4 jam",
    checklist: "⬜"
  },
  {
    week: "Week 1",
    phase: "Foundation",
    actions: "1. Setup Claude Code di terminal\n2. Test deep research capability\n3. Configure project memory",
    platform: "Claude Max",
    deliverable: "Claude Code working + tested",
    estTime: "1-2 jam",
    checklist: "⬜"
  },
  {
    week: "Week 2",
    phase: "Daily Ops",
    actions: "1. Add all daily cron jobs (market, midday, EOD, night)\n2. Install Tier 2 skills (arxiv, stock-analyzer)\n3. Test arXiv daily scan\n4. Fine-tune briefing format",
    platform: "Kimi Claw",
    deliverable: "Full daily automation cycle running",
    estTime: "3-4 jam",
    checklist: "⬜"
  },
  {
    week: "Week 2",
    phase: "Daily Ops",
    actions: "1. Setup ChatGPT persistent memory\n2. Test content creation workflow\n3. Create first script with ChatGPT+DALL-E",
    platform: "ChatGPT",
    deliverable: "Content pipeline tested",
    estTime: "2 jam",
    checklist: "⬜"
  },
  {
    week: "Week 3",
    phase: "Workflows",
    actions: "1. Build Research Pipeline workflow (Kimi scan → Claude analyze)\n2. Build Content Creation workflow (Kimi trends → ChatGPT scripts)\n3. Add weekly cron jobs",
    platform: "All 4",
    deliverable: "2 workflow loops operational",
    estTime: "4-5 jam",
    checklist: "⬜"
  },
  {
    week: "Week 3",
    phase: "Workflows",
    actions: "1. Connect Gemini to Google Workspace\n2. Test Calendar + Drive integration\n3. Setup content calendar via Google Calendar",
    platform: "Gemini",
    deliverable: "Google ecosystem integrated",
    estTime: "1-2 jam",
    checklist: "⬜"
  },
  {
    week: "Week 4",
    phase: "Optimize",
    actions: "1. Review first month: what worked, what didn't\n2. Adjust cron timings based on actual usage\n3. Install Tier 3 skills if needed\n4. Build knowledge base in Fast.io",
    platform: "All 4",
    deliverable: "Optimized system + knowledge base",
    estTime: "3 jam",
    checklist: "⬜"
  }
];

// Summary stats
export const openclawStats = {
  totalPlatforms: 4,
  totalMonthlyCost: 179,
  totalAutomations: 9,
  totalWorkflows: 7,
  totalSkills: 15,
  totalUseCases: 17,
  timeSavedPerMonth: "49.5 hours",
  roi: "165%"
};
