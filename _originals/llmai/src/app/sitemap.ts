import type { MetadataRoute } from "next";
import { llmModels } from "@/lib/data/llms";
import { workflows } from "@/lib/data/workflows";
import { articles } from "@/lib/data/articles";
import { booksLibrary } from "@/lib/data/books";

const BASE_URL = "https://llm.ai";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/llms`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/benchmarks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/collaborate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/prompts`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/presentasi`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/workflows`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/resources/books`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const modelPages: MetadataRoute.Sitemap = llmModels.map((model) => ({
    url: `${BASE_URL}/llms/${model.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const workflowPages: MetadataRoute.Sitemap = workflows.map((w) => ({
    url: `${BASE_URL}/workflows/${w.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/learn/${a.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const bookPages: MetadataRoute.Sitemap = booksLibrary.map((book) => ({
    url: `${BASE_URL}/resources/books/${book.id}`,
    lastModified: new Date(book.updatedAt ?? book.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...modelPages, ...workflowPages, ...articlePages, ...bookPages];
}
