"use client";

import { useState, useMemo } from "react";
import { llmModels } from "@/lib/data/llms";
import { ModelCard } from "@/components/llm/model-card";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SlidersHorizontal, LayoutGrid, List, Cpu, Building2, Layers } from "lucide-react";
import type { Provider, ModelCategory, Capability, PricingTier } from "@/lib/types/llm";

const allProviders: Provider[] = [
  "Anthropic", "OpenAI", "Google", "xAI", "Meta", "DeepSeek", "Mistral", "Alibaba", "Cohere",
];
const allCategories: ModelCategory[] = [
  "general", "coding", "reasoning", "multimodal", "open-source", "lightweight",
];
const allPricingTiers: PricingTier[] = ["free", "freemium", "paid", "open-source"];
const keyCapabilities: Capability[] = ["vision", "code", "web-search", "voice", "mcp", "reasoning"];

type ViewMode = "grid" | "compact";

function FilterSection({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: Set<string>;
  onToggle: (val: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-sm font-semibold mb-2 hover:text-primary transition-colors"
      >
        {title}
        <span className="text-xs text-muted-foreground">{expanded ? "−" : "+"}</span>
      </button>
      {expanded && (
        <div className="space-y-1">
          {items.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.has(item)}
                onChange={() => onToggle(item)}
                className="rounded accent-primary"
              />
              <span className="capitalize group-hover:text-foreground transition-colors text-muted-foreground">
                {item.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPanel({
  providers, categories, pricingTiers, capabilities, onToggle, onClear,
}: {
  providers: Set<string>;
  categories: Set<string>;
  pricingTiers: Set<string>;
  capabilities: Set<string>;
  onToggle: (group: string, val: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-5">
      <FilterSection title="Provider" items={allProviders} selected={providers} onToggle={(v) => onToggle("providers", v)} />
      <FilterSection title="Category" items={allCategories} selected={categories} onToggle={(v) => onToggle("categories", v)} />
      <FilterSection title="Pricing" items={allPricingTiers} selected={pricingTiers} onToggle={(v) => onToggle("pricingTiers", v)} />
      <FilterSection title="Capabilities" items={keyCapabilities} selected={capabilities} onToggle={(v) => onToggle("capabilities", v)} />
      <Button variant="outline" size="sm" onClick={onClear} className="w-full">
        Clear Filters
      </Button>
    </div>
  );
}

export default function LLMExplorerPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("grid");
  const [providers, setProviders] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [pricingTiers, setPricingTiers] = useState<Set<string>>(new Set());
  const [capabilities, setCapabilities] = useState<Set<string>>(new Set());

  const toggle = (group: string, val: string) => {
    const map: Record<string, [Set<string>, (s: Set<string>) => void]> = {
      providers: [providers, setProviders],
      categories: [categories, setCategories],
      pricingTiers: [pricingTiers, setPricingTiers],
      capabilities: [capabilities, setCapabilities],
    };
    const [set, setFn] = map[group];
    const next = new Set(set);
    if (next.has(val)) next.delete(val); else next.add(val);
    setFn(next);
  };

  const filtered = useMemo(() => {
    return llmModels.filter((m) => {
      if (search) {
        const q = search.toLowerCase();
        if (!m.name.toLowerCase().includes(q) && !m.provider.toLowerCase().includes(q) && !m.tagline.toLowerCase().includes(q))
          return false;
      }
      if (providers.size > 0 && !providers.has(m.provider)) return false;
      if (categories.size > 0 && !m.categories.some((c) => categories.has(c))) return false;
      if (pricingTiers.size > 0 && !pricingTiers.has(m.pricing.tier)) return false;
      if (capabilities.size > 0 && !Array.from(capabilities).every((c) => m.capabilities.includes(c as Capability)))
        return false;
      return true;
    });
  }, [search, providers, categories, pricingTiers, capabilities]);

  const hasFilters = providers.size > 0 || categories.size > 0 || pricingTiers.size > 0 || capabilities.size > 0;

  const clearAll = () => {
    setSearch("");
    setProviders(new Set());
    setCategories(new Set());
    setPricingTiers(new Set());
    setCapabilities(new Set());
  };

  // Stats
  const uniqueProviders = new Set(llmModels.map((m) => m.provider)).size;
  const avgContext = Math.round(llmModels.reduce((s, m) => s + m.contextWindow, 0) / llmModels.length / 1000);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <PageHeader
        title="LLM Explorer"
        description="Browse and filter 20+ large language models"
      />

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3 mb-8 animate-stagger">
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Cpu className="h-4 w-4 text-primary" />
            <span className="text-2xl font-bold">{llmModels.length}</span>
          </div>
          <span className="text-xs text-muted-foreground">Models</span>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-2xl font-bold">{uniqueProviders}</span>
          </div>
          <span className="text-xs text-muted-foreground">Providers</span>
        </div>
        <div className="glass-card p-4 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-2xl font-bold">{avgContext}K</span>
          </div>
          <span className="text-xs text-muted-foreground">Avg Context</span>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <FilterPanel
            providers={providers} categories={categories}
            pricingTiers={pricingTiers} capabilities={capabilities}
            onToggle={toggle} onClear={clearAll}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1">
              <SearchInput
                placeholder="Search models..."
                value={search}
                onChange={setSearch}
              />
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={`p-2 transition-colors ${view === "grid" ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("compact")}
                className={`p-2 transition-colors ${view === "compact" ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground"}`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 overflow-y-auto">
                <SheetTitle>Filters</SheetTitle>
                <div className="mt-4">
                  <FilterPanel
                    providers={providers} categories={categories}
                    pricingTiers={pricingTiers} capabilities={capabilities}
                    onToggle={toggle} onClear={clearAll}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {hasFilters && (
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm text-muted-foreground">
                {filtered.length} models
              </span>
              {Array.from(providers).map((p) => (
                <Badge key={p} variant="secondary" className="text-xs">
                  {p}
                </Badge>
              ))}
              {Array.from(categories).map((c) => (
                <Badge key={c} variant="secondary" className="text-xs capitalize">
                  {c}
                </Badge>
              ))}
            </div>
          )}

          {filtered.length > 0 ? (
            view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-stagger">
                {filtered.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            ) : (
              <div className="space-y-1 glass-card rounded-xl p-2">
                {filtered.map((model) => (
                  <ModelCard key={model.id} model={model} compact />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              title="No models found"
              description="Try adjusting your filters or search query."
              action={
                <Button variant="outline" size="sm" onClick={clearAll}>
                  Clear all filters
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
