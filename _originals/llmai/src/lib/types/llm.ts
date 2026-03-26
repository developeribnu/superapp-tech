export type Provider =
  | "Anthropic"
  | "OpenAI"
  | "Google"
  | "xAI"
  | "Meta"
  | "DeepSeek"
  | "Mistral"
  | "Alibaba"
  | "Cohere";

export type ModelCategory =
  | "general"
  | "coding"
  | "reasoning"
  | "multimodal"
  | "open-source"
  | "lightweight";

export type Capability =
  | "text"
  | "code"
  | "vision"
  | "voice"
  | "video"
  | "web-search"
  | "file-upload"
  | "image-gen"
  | "reasoning"
  | "analysis"
  | "function-calling"
  | "computer-use"
  | "mcp";

export type PricingTier = "free" | "freemium" | "paid" | "open-source";

export interface ModelPricing {
  tier: PricingTier;
  inputPer1M: number | null;
  outputPer1M: number | null;
  cachedInputPer1M?: number | null;
  subscription?: {
    name: string;
    price: number;
    features: string[];
  }[];
}

export interface ModelBenchmarks {
  sweVerified?: number;
  mmlu?: number;
  gpqaDiamond?: number;
  humanEval?: number;
  math?: number;
  arcAgi2?: number;
  liveCodeBench?: number;
  lmsysElo?: number;
  aime2025?: number;
}

export interface LLMModel {
  id: string;
  name: string;
  provider: Provider;
  providerSlug: string;
  tagline: string;
  description: string;
  categories: ModelCategory[];
  contextWindow: number;
  maxOutput: number;
  knowledgeCutoff: string;
  releaseDate: string;
  pricing: ModelPricing;
  capabilities: Capability[];
  benchmarks: ModelBenchmarks;
  strengths: string[];
  weaknesses: string[];
  bestFor: string[];
  website: string;
  apiDocs: string;
  isOpenSource: boolean;
  parameterCount?: string;
  architecture?: string;
  trainingApproach?: string;
  dataLastUpdated: string;
}
