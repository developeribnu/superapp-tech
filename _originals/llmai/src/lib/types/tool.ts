export type ToolCategory =
  | "coding-assistant"
  | "writing-assistant"
  | "research"
  | "automation"
  | "image-video"
  | "voice-audio"
  | "data-analysis"
  | "productivity"
  | "search";

export type Platform = "web" | "mac" | "windows" | "linux" | "ios" | "android" | "cli" | "api";

export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  underlyingModels: string[];
  pricing: "free" | "freemium" | "paid";
  pricingDetails?: string;
  platforms: Platform[];
  website: string;
  logoUrl?: string;
  features: string[];
  tags: string[];
}
