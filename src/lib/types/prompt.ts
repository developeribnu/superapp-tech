export type PromptCategory =
  | "software-development"
  | "data-analysis"
  | "product-management"
  | "writing-content"
  | "research-learning"
  | "business-strategy"
  | "multi-llm"
  | "creative"
  | "automation";

export type PromptDifficulty = "beginner" | "intermediate" | "advanced";

export interface PromptTemplate {
  id: string;
  title: string;
  category: PromptCategory;
  subcategory: string;
  description: string;
  prompt: string;
  variables?: Array<{
    name: string;
    description: string;
    example: string;
  }>;
  recommendedModels: string[];
  difficulty: PromptDifficulty;
  tags: string[];
  expectedOutput?: string;
  tips?: string[];
  relatedPrompts?: string[];
}
