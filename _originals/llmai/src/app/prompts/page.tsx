"use client";

import { useState, useMemo } from "react";
import { promptTemplates } from "@/lib/data/prompts";
import { promptCategories } from "@/lib/data/categories";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { CopyButton } from "@/components/shared/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PromptCategory } from "@/lib/types/prompt";

const difficultyColors: Record<string, string> = {
  beginner: "text-green-500",
  intermediate: "text-yellow-500",
  advanced: "text-red-500",
};

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PromptCategory | "all">("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return promptTemplates.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (difficulty !== "all" && p.difficulty !== difficulty) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, category, difficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <PageHeader
        title="Prompt Library"
        description="Battle-tested prompt templates for every use case"
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <aside className="lg:w-56 shrink-0 space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Category</h3>
            <div className="space-y-1">
              <button
                onClick={() => setCategory("all")}
                className={`w-full text-left text-sm px-3 py-1.5 rounded-md ${
                  category === "all" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                All Categories
              </button>
              {(Object.keys(promptCategories) as PromptCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-md ${
                    category === cat ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  {promptCategories[cat].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Difficulty</h3>
            <div className="space-y-1">
              {["all", "beginner", "intermediate", "advanced"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-md capitalize ${
                    difficulty === d ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  {d === "all" ? "All Levels" : d}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <SearchInput
              placeholder="Search prompts..."
              value={search}
              onChange={setSearch}
            />
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {filtered.length} prompt{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((prompt) => (
                <div key={prompt.id} className="glass-card rounded-xl overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)
                    }
                    className="w-full p-4 text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{prompt.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {prompt.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {promptCategories[prompt.category]?.label || prompt.category}
                          </Badge>
                          <span className={`text-xs capitalize ${difficultyColors[prompt.difficulty] || ""}`}>
                            {prompt.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {expandedPrompt === prompt.id && (
                    <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                          PROMPT TEMPLATE
                        </h4>
                        <div className="p-3 rounded-lg bg-muted text-sm font-mono whitespace-pre-wrap relative">
                          {prompt.prompt}
                          <div className="absolute top-2 right-2">
                            <CopyButton text={prompt.prompt} size="sm" />
                          </div>
                        </div>
                      </div>

                      {prompt.variables && prompt.variables.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                            VARIABLES
                          </h4>
                          <div className="space-y-1">
                            {prompt.variables.map((v) => (
                              <div key={v.name} className="text-sm">
                                <code className="text-primary">{`{{${v.name}}}`}</code>
                                <span className="text-muted-foreground"> — {v.description}</span>
                                <span className="text-xs text-muted-foreground ml-1">
                                  (e.g., {v.example})
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {prompt.tips && prompt.tips.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                            TIPS
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {prompt.tips.map((tip) => (
                              <li key={tip} className="flex items-start gap-1.5">
                                <span className="text-primary">•</span> {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {prompt.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No prompts found"
              description="Try adjusting your filters or search query."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                    setDifficulty("all");
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
