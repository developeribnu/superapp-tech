export const SITE_NAME = "LLM.AI";
export const SITE_TAGLINE = "Your AI Command Center";
export const SITE_DESCRIPTION =
  "The most comprehensive super app for AI automation — compare LLMs, discover tools, build workflows, and master AI orchestration all in one place.";
export const SITE_URL = "https://llm-ai.vercel.app";
export const GITHUB_URL = "https://github.com/subkhanibnuaji/llmai";

// Flat nav items for backward compat
export const NAV_ITEMS = [
  { label: "Models", href: "/llms", icon: "Cpu" },
  { label: "Compare", href: "/compare", icon: "GitCompare" },
  { label: "Collaborate", href: "/collaborate", icon: "GitBranch" },
  { label: "Benchmarks", href: "/benchmarks", icon: "BarChart3" },
  { label: "Prompts", href: "/prompts", icon: "MessageSquare" },
  { label: "Library", href: "/learn", icon: "BookOpen" },
  { label: "Presentasi", href: "/presentasi", icon: "Presentation" },
  { label: "OpenClaw", href: "/openclaw", icon: "Bot" },
] as const;

// Grouped navigation for the mega-menu
export interface NavChild {
  label: string;
  href: string;
  description: string;
  icon: string;
}

export interface NavGroup {
  label: string;
  children: NavChild[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Explore",
    children: [
      { label: "Models", href: "/llms", description: "Browse & filter 20+ LLMs", icon: "Cpu" },
      { label: "Compare", href: "/compare", description: "Side-by-side model comparison", icon: "GitCompare" },
      { label: "Benchmarks", href: "/benchmarks", description: "Performance leaderboards", icon: "BarChart3" },
      { label: "Collaborate", href: "/collaborate", description: "Multi-LLM patterns", icon: "GitBranch" },
    ],
  },
  {
    label: "Build",
    children: [
      { label: "AI Tools", href: "/tools", description: "AI-powered tools directory", icon: "Wrench" },
      { label: "Workflows", href: "/workflows", description: "Step-by-step automation guides", icon: "Workflow" },
      { label: "Prompts", href: "/prompts", description: "200+ curated prompt templates", icon: "MessageSquare" },
    ],
  },
  {
    label: "Learn",
    children: [
      { label: "Library", href: "/learn", description: "Articles & knowledge base", icon: "BookOpen" },
      { label: "Presentasi", href: "/presentasi", description: "Agentic AI presentation", icon: "Presentation" },
    ],
  },
];

// Standalone nav items (not in a dropdown)
export const NAV_STANDALONE = [
  { label: "OpenClaw", href: "/openclaw", icon: "Bot" },
];

export const FOOTER_SECTIONS = [
  {
    title: "Explore",
    links: [
      { label: "LLM Explorer", href: "/llms" },
      { label: "Compare Models", href: "/compare" },
      { label: "Benchmarks", href: "/benchmarks" },
      { label: "Collaboration Patterns", href: "/collaborate" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "AI Tools Directory", href: "/tools" },
      { label: "Workflow Guides", href: "/workflows" },
      { label: "Prompt Library", href: "/prompts" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Knowledge Library", href: "/learn" },
      { label: "Agentic AI Presentation", href: "/presentasi" },
      { label: "OpenClaw Framework", href: "/openclaw" },
    ],
  },
];
