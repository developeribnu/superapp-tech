"use client";

import { useState, useMemo } from "react";
import { benchmarkDefinitions, benchmarkEntries, getBenchmarkLeaderboard } from "@/lib/data/benchmarks";
import { getModelById } from "@/lib/data/llms";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { providerColors } from "@/lib/data/categories";
import { Trophy, Info } from "lucide-react";
import Link from "next/link";

export default function BenchmarksPage() {
  const [selectedBenchmark, setSelectedBenchmark] = useState(benchmarkDefinitions[0]?.id || "");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = useMemo(() => {
    const cats = new Set(benchmarkDefinitions.map((b) => b.category));
    return ["all", ...Array.from(cats)];
  }, []);

  const filteredBenchmarks = useMemo(() => {
    if (categoryFilter === "all") return benchmarkDefinitions;
    return benchmarkDefinitions.filter((b) => b.category === categoryFilter);
  }, [categoryFilter]);

  const leaderboard = useMemo(() => {
    return getBenchmarkLeaderboard(selectedBenchmark);
  }, [selectedBenchmark]);

  const selectedDef = benchmarkDefinitions.find((b) => b.id === selectedBenchmark);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <PageHeader
        title="Benchmark Dashboard"
        description="Compare model performance across standardized benchmarks"
      />

      <Tabs defaultValue="leaderboard">
        <TabsList className="mb-6">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="overview">All Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Benchmark Selector */}
            <div className="lg:w-64 shrink-0 space-y-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Category</h3>
                <div className="flex flex-wrap lg:flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(cat);
                        const first = cat === "all"
                          ? benchmarkDefinitions[0]
                          : benchmarkDefinitions.find((b) => b.category === cat);
                        if (first) setSelectedBenchmark(first.id);
                      }}
                      className={`text-sm px-3 py-1.5 rounded-md text-left capitalize ${
                        categoryFilter === cat
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                    >
                      {cat === "all" ? "All" : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Benchmark</h3>
                <div className="space-y-1">
                  {filteredBenchmarks.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBenchmark(b.id)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-md ${
                        selectedBenchmark === b.id
                          ? "bg-accent border border-border"
                          : "hover:bg-accent/50"
                      }`}
                    >
                      <div className="font-medium">{b.shortName}</div>
                      <div className="text-xs text-muted-foreground">{b.category}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="flex-1">
              {selectedDef && (
                <div className="glass-card p-4 rounded-xl mb-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">{selectedDef.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedDef.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedDef.realWorldMeaning}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {selectedDef.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {selectedDef.unit === "elo" ? "ELO Rating" : `Max: ${selectedDef.maxScore}${selectedDef.unit}`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {leaderboard.map((entry, index) => {
                  const model = getModelById(entry.modelId);
                  if (!model) return null;
                  const maxScore = selectedDef?.unit === "elo" ? 1400 : (selectedDef?.maxScore || 100);
                  const minScore = selectedDef?.unit === "elo" ? 800 : 0;
                  const pct = ((entry.score - minScore) / (maxScore - minScore)) * 100;

                  return (
                    <div
                      key={entry.modelId}
                      className="glass-card p-4 rounded-lg flex items-center gap-4"
                    >
                      <div className="w-8 text-center">
                        {index === 0 ? (
                          <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                        ) : index === 1 ? (
                          <Trophy className="h-5 w-5 text-gray-400 mx-auto" />
                        ) : index === 2 ? (
                          <Trophy className="h-5 w-5 text-amber-700 mx-auto" />
                        ) : (
                          <span className="text-sm text-muted-foreground">#{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Link
                            href={`/llms/${model.id}`}
                            className="font-medium text-sm hover:underline"
                          >
                            {model.name}
                          </Link>
                          <span className="text-xs text-muted-foreground">{model.provider}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min(Math.max(pct, 2), 100)}%`,
                              backgroundColor: providerColors[model.provider] || "#888",
                            }}
                          />
                        </div>
                      </div>
                      <div className="font-semibold text-sm w-16 text-right">
                        {selectedDef?.unit === "elo"
                          ? entry.score.toFixed(0)
                          : `${entry.score.toFixed(1)}%`}
                      </div>
                    </div>
                  );
                })}
              </div>

              {leaderboard.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No entries for this benchmark yet.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benchmarkDefinitions.map((b) => {
              const entries = getBenchmarkLeaderboard(b.id);
              const topModel = entries[0] ? getModelById(entries[0].modelId) : null;

              return (
                <div
                  key={b.id}
                  className="glass-card p-5 rounded-xl cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => {
                    setSelectedBenchmark(b.id);
                    const tabList = document.querySelector('[role="tablist"]');
                    const leaderboardTab = tabList?.querySelector('[value="leaderboard"]') as HTMLButtonElement | null;
                    leaderboardTab?.click();
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{b.shortName}</h3>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {b.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{b.description}</p>
                  <div className="text-xs text-muted-foreground">
                    {entries.length} models scored
                  </div>
                  {topModel && entries[0] && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                      <span className="font-medium">{topModel.name}</span>
                      <span className="text-muted-foreground">
                        {b.unit === "elo" ? entries[0].score.toFixed(0) : `${entries[0].score.toFixed(1)}%`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
