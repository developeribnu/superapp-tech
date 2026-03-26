"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { llmModels, getModelById } from "@/lib/data/llms";
import { getModelBenchmarks, getBenchmarkDef, benchmarkDefinitions } from "@/lib/data/benchmarks";
import { comparisonScenarios } from "@/lib/data/scenarios";
import { PageHeader } from "@/components/layout/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { CopyButton } from "@/components/shared/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { providerColors } from "@/lib/data/categories";
import { formatTokenCount, formatPrice, formatPercentage } from "@/lib/utils/format";
import { X, Plus, Trophy, Link2 } from "lucide-react";
import type { LLMModel, Capability } from "@/lib/types/llm";
import { Suspense } from "react";

function CompareContent() {
  const searchParams = useSearchParams();
  const initialModels = (searchParams.get("models") || "")
    .split(",")
    .filter(Boolean)
    .map(getModelById)
    .filter(Boolean) as LLMModel[];

  const [selected, setSelected] = useState<LLMModel[]>(initialModels);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [search, setSearch] = useState("");

  const addModel = (model: LLMModel) => {
    if (selected.length < 4 && !selected.find((m) => m.id === model.id)) {
      setSelected([...selected, model]);
    }
    setSelectorOpen(false);
    setSearch("");
  };

  const removeModel = (id: string) => {
    setSelected(selected.filter((m) => m.id !== id));
  };

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/compare?models=${selected.map((m) => m.id).join(",")}`
    : "";

  const filteredModels = llmModels.filter(
    (m) =>
      !selected.find((s) => s.id === m.id) &&
      (!search || m.name.toLowerCase().includes(search.toLowerCase()) || m.provider.toLowerCase().includes(search.toLowerCase()))
  );

  // Matrix comparison rows
  const rows: Array<{
    label: string;
    getValue: (m: LLMModel) => string | boolean;
    type: "text" | "number" | "boolean";
    higherIsBetter?: boolean;
    lowerIsBetter?: boolean;
  }> = [
    { label: "Provider", getValue: (m) => m.provider, type: "text" },
    { label: "Context Window", getValue: (m) => formatTokenCount(m.contextWindow), type: "text" },
    { label: "Max Output", getValue: (m) => formatTokenCount(m.maxOutput), type: "text" },
    { label: "Input $/1M", getValue: (m) => formatPrice(m.pricing.inputPer1M), type: "text" },
    { label: "Output $/1M", getValue: (m) => formatPrice(m.pricing.outputPer1M), type: "text" },
    ...benchmarkDefinitions.map((b) => ({
      label: b.shortName,
      getValue: (m: LLMModel) => {
        const entries = getModelBenchmarks(m.id);
        const entry = entries.find((e) => e.benchmarkId === b.id);
        return entry ? (b.unit === "elo" ? entry.score.toFixed(0) : `${entry.score.toFixed(1)}%`) : "\u2014";
      },
      type: "text" as const,
    })),
    ...["vision", "code", "web-search", "voice", "mcp", "reasoning", "function-calling"].map((cap) => ({
      label: cap.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      getValue: (m: LLMModel) => m.capabilities.includes(cap as Capability),
      type: "boolean" as const,
    })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <PageHeader
        title="Compare Models"
        description="Side-by-side comparison of up to 4 models"
      />

      {/* Model Selection */}
      <div className="glass-card p-5 rounded-xl mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {selected.map((model) => (
            <div
              key={model.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border"
              style={{ borderLeftColor: providerColors[model.provider], borderLeftWidth: 3 }}
            >
              <span className="text-sm font-medium">{model.name}</span>
              <button
                onClick={() => removeModel(model.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {selected.length < 4 && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setSelectorOpen(!selectorOpen)}
            >
              <Plus className="h-3.5 w-3.5" /> Add Model
            </Button>
          )}
        </div>

        {selectorOpen && (
          <div className="border border-border rounded-lg p-3">
            <SearchInput
              placeholder="Search models..."
              value={search}
              onChange={setSearch}
            />
            <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
              {filteredModels.map((m) => (
                <button
                  key={m.id}
                  onClick={() => addModel(m)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-accent text-sm flex items-center justify-between"
                >
                  <span>{m.name}</span>
                  <span className="text-xs text-muted-foreground">{m.provider}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scenarios */}
        <div className="mt-4">
          <span className="text-xs text-muted-foreground mr-2">Quick scenarios:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {comparisonScenarios.slice(0, 4).map((scenario) => (
              <Button
                key={scenario.id}
                variant="outline"
                size="sm"
                className="text-xs h-7"
                onClick={() => {
                  const models = scenario.recommendedModels
                    .slice(0, 3)
                    .map((r) => getModelById(r.modelId))
                    .filter(Boolean) as LLMModel[];
                  setSelected(models);
                }}
              >
                {scenario.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {selected.length >= 2 && (
        <>
          <Tabs defaultValue="matrix">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="matrix">Matrix</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <CopyButton text={shareUrl} label="Share" variant="outline" size="sm" />
            </div>

            <TabsContent value="matrix">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground w-40">
                        Metric
                      </th>
                      {selected.map((m) => (
                        <th
                          key={m.id}
                          className="text-left py-2 px-3 font-semibold"
                          style={{ borderTopColor: providerColors[m.provider], borderTopWidth: 2 }}
                        >
                          {m.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.label} className="border-b border-border/50">
                        <td className="py-2 px-3 text-muted-foreground">{row.label}</td>
                        {selected.map((m) => {
                          const val = row.getValue(m);
                          return (
                            <td key={m.id} className="py-2 px-3">
                              {row.type === "boolean" ? (
                                val ? (
                                  <span className="text-green-500">Yes</span>
                                ) : (
                                  <span className="text-muted-foreground">No</span>
                                )
                              ) : (
                                String(val)
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selected.map((m) => (
                  <div
                    key={m.id}
                    className="glass-card p-5 rounded-xl"
                    style={{ borderTopColor: providerColors[m.provider], borderTopWidth: 3 }}
                  >
                    <h3 className="font-semibold mb-1">{m.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{m.tagline}</p>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Strengths:</span>
                        <ul className="mt-1 space-y-1">
                          {m.strengths.slice(0, 3).map((s) => (
                            <li key={s} className="text-xs flex items-start gap-1">
                              <Trophy className="h-3 w-3 text-primary mt-0.5 shrink-0" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {selected.length < 2 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-2">Select at least 2 models to compare</p>
          <p className="text-sm">
            Use the &quot;Add Model&quot; button above or pick a scenario
          </p>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
