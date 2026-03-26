export type ArticleCategory =
  | "llm-fundamentals"
  | "prompt-engineering"
  | "advanced-techniques"
  | "multi-llm"
  | "ai-ecosystem"
  | "case-studies";

export type ContentSource = "original" | "curated";

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  category: ArticleCategory;
  level: "beginner" | "intermediate" | "advanced";
  readingTime: number;
  publishedDate: string;
  updatedDate?: string;
  excerpt: string;
  content: string;
  tags: string[];
  keyTakeaways: string[];
  author?: string;
  relatedArticles?: string[];
  contentSource?: ContentSource;
  embeddedResourcePath?: string;
  sourcePdfPath?: string;
}
