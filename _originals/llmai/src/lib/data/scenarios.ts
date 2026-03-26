export interface ComparisonScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  keyBenchmarks: string[];
  keyCapabilities: string[];
  recommendedModels: Array<{
    modelId: string;
    rank: number;
    reason: string;
  }>;
}

export const comparisonScenarios: ComparisonScenario[] = [
  {
    id: "coding-agent",
    title: "Building a Coding Agent",
    description:
      "You need an AI that can autonomously write, debug, and refactor code across large codebases.",
    icon: "Code",
    keyBenchmarks: ["swe-verified", "livecodebench", "humaneval"],
    keyCapabilities: ["code", "function-calling", "reasoning"],
    recommendedModels: [
      { modelId: "claude-opus-4", rank: 1, reason: "Highest SWE-Bench scores, excellent at multi-file changes and complex debugging" },
      { modelId: "claude-sonnet-4", rank: 2, reason: "Strong coding at lower cost, great balance of speed and quality" },
      { modelId: "gemini-2-5-pro", rank: 3, reason: "Strong coding with massive context window for large codebases" },
      { modelId: "deepseek-r1", rank: 4, reason: "Excellent reasoning for algorithmic challenges, open-source option" },
    ],
  },
  {
    id: "content-writing",
    title: "Long-form Content Writing",
    description:
      "You need consistent, high-quality writing for blog posts, reports, or documentation.",
    icon: "FileText",
    keyBenchmarks: ["lmsys-elo", "mmlu"],
    keyCapabilities: ["text", "analysis"],
    recommendedModels: [
      { modelId: "claude-opus-4", rank: 1, reason: "Best at maintaining consistency and nuance over long outputs" },
      { modelId: "claude-sonnet-4", rank: 2, reason: "Excellent writing quality at lower cost for daily use" },
      { modelId: "gpt-4o", rank: 3, reason: "Creative and varied style, good for different tones" },
      { modelId: "gemini-2-5-pro", rank: 4, reason: "Strong writing with web-aware context" },
    ],
  },
  {
    id: "data-analysis",
    title: "Data Analysis & Insights",
    description:
      "You need to analyze datasets, generate visualizations, and extract actionable insights.",
    icon: "BarChart3",
    keyBenchmarks: ["math", "mmlu", "gpqa-diamond"],
    keyCapabilities: ["code", "analysis", "vision", "file-upload"],
    recommendedModels: [
      { modelId: "claude-sonnet-4", rank: 1, reason: "Excellent at structured analysis with code generation for visualization" },
      { modelId: "gpt-4o", rank: 2, reason: "Strong Code Interpreter for interactive data analysis" },
      { modelId: "gemini-2-5-pro", rank: 3, reason: "Great for Google Sheets integration and large datasets" },
      { modelId: "deepseek-v3", rank: 4, reason: "Strong analytical capabilities at very low cost" },
    ],
  },
  {
    id: "research",
    title: "Deep Research & Synthesis",
    description:
      "You need to research a topic comprehensively, synthesize findings, and produce a report.",
    icon: "Search",
    keyBenchmarks: ["mmlu", "gpqa-diamond", "lmsys-elo"],
    keyCapabilities: ["web-search", "text", "analysis"],
    recommendedModels: [
      { modelId: "gemini-2-5-pro", rank: 1, reason: "Native web search and Deep Research feature for comprehensive gathering" },
      { modelId: "claude-opus-4", rank: 2, reason: "Superior synthesis and strategic analysis of research findings" },
      { modelId: "gpt-4o", rank: 3, reason: "Good browsing capabilities with balanced analysis" },
      { modelId: "grok-3", rank: 4, reason: "Real-time X/Twitter data integration for social trends" },
    ],
  },
  {
    id: "cost-sensitive",
    title: "High-Volume, Cost-Sensitive",
    description:
      "You're processing thousands of requests daily and need the best quality-per-dollar ratio.",
    icon: "DollarSign",
    keyBenchmarks: ["lmsys-elo", "mmlu"],
    keyCapabilities: ["text"],
    recommendedModels: [
      { modelId: "gemini-2-5-flash", rank: 1, reason: "Excellent quality at very low cost with fast response times" },
      { modelId: "gpt-4o-mini", rank: 2, reason: "Strong quality-per-dollar with reliable structured outputs" },
      { modelId: "claude-haiku-3-5", rank: 3, reason: "Fast and cheap with good quality for most tasks" },
      { modelId: "deepseek-v3", rank: 4, reason: "Extremely low pricing with strong capabilities" },
    ],
  },
  {
    id: "multimodal",
    title: "Multimodal Processing",
    description:
      "You need to process images, documents, videos, and generate visual content.",
    icon: "Image",
    keyBenchmarks: ["mmlu", "lmsys-elo"],
    keyCapabilities: ["vision", "image-gen", "video", "file-upload"],
    recommendedModels: [
      { modelId: "gemini-2-5-pro", rank: 1, reason: "Best multimodal with 1M+ context, handles images/video/audio natively" },
      { modelId: "gpt-4o", rank: 2, reason: "Strong vision + native image generation with DALL-E" },
      { modelId: "claude-sonnet-4", rank: 3, reason: "Excellent image understanding and analysis" },
      { modelId: "grok-3", rank: 4, reason: "Good multimodal with image generation via Aurora" },
    ],
  },
  {
    id: "reasoning-math",
    title: "Complex Reasoning & Math",
    description:
      "You need advanced logical reasoning, mathematical proofs, or scientific analysis.",
    icon: "Brain",
    keyBenchmarks: ["gpqa-diamond", "math", "aime-2025", "arc-agi-2"],
    keyCapabilities: ["reasoning"],
    recommendedModels: [
      { modelId: "o3", rank: 1, reason: "Top scores on AIME, GPQA Diamond, and ARC-AGI reasoning benchmarks" },
      { modelId: "deepseek-r1", rank: 2, reason: "Excellent reasoning at fraction of the cost, open-source" },
      { modelId: "claude-opus-4", rank: 3, reason: "Strong reasoning with better communication of complex ideas" },
      { modelId: "gemini-2-5-pro", rank: 4, reason: "Strong math and science reasoning with thinking mode" },
    ],
  },
  {
    id: "api-production",
    title: "Production API Integration",
    description:
      "You're building a product and need a reliable, fast API with structured outputs.",
    icon: "Zap",
    keyBenchmarks: ["lmsys-elo", "humaneval"],
    keyCapabilities: ["function-calling", "text", "code"],
    recommendedModels: [
      { modelId: "claude-sonnet-4", rank: 1, reason: "Reliable structured outputs, excellent function calling, good latency" },
      { modelId: "gpt-4o", rank: 2, reason: "Battle-tested API, strong structured outputs and tool use" },
      { modelId: "gemini-2-5-flash", rank: 3, reason: "Very fast with good quality, cost-effective for scale" },
      { modelId: "claude-haiku-3-5", rank: 4, reason: "Ultra-fast responses for latency-sensitive applications" },
    ],
  },
];

export function getScenarioById(id: string): ComparisonScenario | undefined {
  return comparisonScenarios.find((s) => s.id === id);
}
