import {
  Brain,
  Shield,
  Cloud,
  Zap,
  Database,
  Sparkles,
  Github,
  FileText,
  BookOpen,
  Network,
} from "lucide-react";

export interface NavItem {
  slug: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  description: string;
  color: string;
  count?: string;
}

export const navigationItems: NavItem[] = [
  {
    slug: "ai-llm",
    label: "AI & LLM",
    icon: Brain,
    description: "AI models, LLM comparisons, prompt engineering",
    color: "from-purple-600 to-pink-600",
    count: "50+",
  },
  {
    slug: "cybersecurity",
    label: "Cybersecurity",
    icon: Shield,
    description: "Security tools, vulnerability scanning, penetration testing",
    color: "from-red-600 to-orange-600",
    count: "35+",
  },
  {
    slug: "infrastructure",
    label: "Infrastructure",
    icon: Cloud,
    description: "Cloud computing, DevOps, networking, containerization",
    color: "from-blue-600 to-cyan-600",
    count: "45+",
  },
  {
    slug: "automation",
    label: "Automation",
    icon: Zap,
    description: "Bot builders, workflow automation, RPA tools",
    color: "from-yellow-600 to-orange-600",
    count: "40+",
  },
  {
    slug: "scraping",
    label: "Data Scraping",
    icon: Database,
    description: "API directory, web scraping, data extraction",
    color: "from-green-600 to-emerald-600",
    count: "100+",
  },
  {
    slug: "ai-tools",
    label: "AI Tools",
    icon: Sparkles,
    description: "AI assistant management, model integrations",
    color: "from-indigo-600 to-purple-600",
    count: "25+",
  },
  {
    slug: "github-tools",
    label: "GitHub Tools",
    icon: Github,
    description: "Analytics, achievements, repo insights",
    color: "from-gray-600 to-slate-600",
    count: "30+",
  },
  {
    slug: "content-tools",
    label: "Content Tools",
    icon: FileText,
    description: "PDF processing, document conversion, video tools",
    color: "from-rose-600 to-pink-600",
    count: "20+",
  },
  {
    slug: "prompts",
    label: "Prompt Engineering",
    icon: BookOpen,
    description: "Prompt templates, techniques, best practices",
    color: "from-teal-600 to-cyan-600",
    count: "15+",
  },
  {
    slug: "distributed-systems",
    label: "Distributed Systems",
    icon: Network,
    description: "Parallel computing, concurrency, distributed algorithms",
    color: "from-fuchsia-600 to-purple-600",
    count: "28+",
  },
];
