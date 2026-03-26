"use client";

import { useState, useMemo } from "react";
import { aiTools } from "@/lib/data/tools";
import { toolCategories } from "@/lib/data/categories";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { ToolCategory } from "@/lib/types/tool";

const pricingColors: Record<string, string> = {
  free: "bg-green-500/10 text-green-500 border-green-500/20",
  freemium: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  paid: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ToolCategory | "all">("all");
  const [pricing, setPricing] = useState<string>("all");

  const filtered = useMemo(() => {
    return aiTools.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (pricing !== "all" && t.pricing !== pricing) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, category, pricing]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <PageHeader
        title="AI Tools Directory"
        description="Discover the best AI-powered tools and platforms"
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
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
              {(Object.keys(toolCategories) as ToolCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-md ${
                    category === cat ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  {toolCategories[cat].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Pricing</h3>
            <div className="space-y-1">
              {["all", "free", "freemium", "paid"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPricing(p)}
                  className={`w-full text-left text-sm px-3 py-1.5 rounded-md capitalize ${
                    pricing === p ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  {p === "all" ? "All Pricing" : p}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <SearchInput
              placeholder="Search tools..."
              value={search}
              onChange={setSearch}
            />
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {filtered.length} tool{filtered.length !== 1 ? "s" : ""} found
          </p>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((tool) => (
                <div key={tool.id} className="glass-card p-5 rounded-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground">{tool.tagline}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs capitalize shrink-0 ${pricingColors[tool.pricing] || ""}`}
                    >
                      {tool.pricing}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {tool.description}
                  </p>

                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground mb-1">Models:</div>
                    <div className="flex flex-wrap gap-1">
                      {tool.underlyingModels.slice(0, 3).map((model) => (
                        <Badge key={model} variant="secondary" className="text-xs">
                          {model}
                        </Badge>
                      ))}
                      {tool.underlyingModels.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tool.underlyingModels.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground mb-1">Features:</div>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {tool.features.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-1">
                          <span className="text-primary">•</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-1">
                      {tool.platforms.map((p) => (
                        <Badge key={p} variant="outline" className="text-xs uppercase">
                          {p}
                        </Badge>
                      ))}
                    </div>
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        Visit <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No tools found"
              description="Try adjusting your filters or search."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                    setPricing("all");
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
