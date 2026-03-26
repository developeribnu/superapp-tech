import type { PromptCategory, ToolCategory, ArticleCategory } from "@/lib/types";

export const promptCategories: Record<
  PromptCategory,
  { label: string; icon: string; description: string }
> = {
  "software-development": {
    label: "Software Development",
    icon: "Code",
    description: "Code generation, debugging, review, architecture",
  },
  "data-analysis": {
    label: "Data Analysis",
    icon: "BarChart3",
    description: "EDA, visualization, insight synthesis",
  },
  "product-management": {
    label: "Product Management",
    icon: "Briefcase",
    description: "PRD, user stories, roadmap, competitive analysis",
  },
  "writing-content": {
    label: "Writing & Content",
    icon: "PenTool",
    description: "Blog posts, emails, documentation, copywriting",
  },
  "research-learning": {
    label: "Research & Learning",
    icon: "GraduationCap",
    description: "Deep dives, concept explanation, summarization",
  },
  "business-strategy": {
    label: "Business & Strategy",
    icon: "TrendingUp",
    description: "SWOT, business plans, market analysis",
  },
  "multi-llm": {
    label: "Multi-LLM Workflows",
    icon: "GitBranch",
    description: "Handoff templates, cross-validation, orchestration",
  },
  creative: {
    label: "Creative",
    icon: "Sparkles",
    description: "Brainstorming, storytelling, ideation",
  },
  automation: {
    label: "Automation",
    icon: "Bot",
    description: "Workflow automation, scripting, batch processing",
  },
};

export const toolCategories: Record<ToolCategory, { label: string; icon: string }> = {
  "coding-assistant": { label: "Coding Assistants", icon: "Code" },
  "writing-assistant": { label: "Writing Assistants", icon: "PenTool" },
  research: { label: "Research Tools", icon: "Search" },
  automation: { label: "Automation", icon: "Bot" },
  "image-video": { label: "Image & Video", icon: "Image" },
  "voice-audio": { label: "Voice & Audio", icon: "Mic" },
  "data-analysis": { label: "Data Analysis", icon: "BarChart3" },
  productivity: { label: "Productivity", icon: "Zap" },
  search: { label: "AI Search", icon: "Globe" },
};

export const articleCategories: Record<ArticleCategory, { label: string; icon: string }> = {
  "llm-fundamentals": { label: "LLM Fundamentals", icon: "BookOpen" },
  "prompt-engineering": { label: "Prompt Engineering", icon: "MessageSquare" },
  "advanced-techniques": { label: "Advanced Techniques", icon: "Layers" },
  "multi-llm": { label: "Multi-LLM Orchestration", icon: "GitBranch" },
  "ai-ecosystem": { label: "AI Ecosystem & Tools", icon: "Globe" },
  "case-studies": { label: "Case Studies", icon: "FileText" },
};

export const providerColors: Record<string, string> = {
  Anthropic: "#d97706",
  OpenAI: "#10b981",
  Google: "#3b82f6",
  xAI: "#ef4444",
  Meta: "#1d4ed8",
  DeepSeek: "#8b5cf6",
  Mistral: "#f97316",
  Alibaba: "#06b6d4",
  Cohere: "#ec4899",
};
