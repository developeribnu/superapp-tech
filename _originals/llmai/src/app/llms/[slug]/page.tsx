import { notFound } from "next/navigation";
import Link from "next/link";
import { llmModels, getModelById } from "@/lib/data/llms";
import { getModelBenchmarks, getBenchmarkDef } from "@/lib/data/benchmarks";
import { CapabilityBadges } from "@/components/llm/capability-badges";
import { BackButton } from "@/components/shared/back-button";
import { CodeBlock } from "@/components/shared/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { providerColors } from "@/lib/data/categories";
import {
  formatTokenCount,
  formatPrice,
  formatPercentage,
} from "@/lib/utils/format";
import {
  ExternalLink,
  Check,
  AlertTriangle,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return llmModels.map((model) => ({ slug: model.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelById(slug);
  if (!model) return {};
  return {
    title: `${model.name} \u2014 ${model.provider}`,
    description: model.tagline,
  };
}

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModelById(slug);
  if (!model) notFound();

  const benchmarkEntries = getModelBenchmarks(model.id);

  const competitors = llmModels
    .filter(
      (m) =>
        m.id !== model.id &&
        (m.provider !== model.provider ||
          m.categories.some((c) => model.categories.includes(c)))
    )
    .slice(0, 3);

  const pythonCode = `from anthropic import Anthropic
# or: from openai import OpenAI

client = Anthropic()  # Uses ANTHROPIC_API_KEY env var

message = client.messages.create(
    model="${model.id}",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, ${model.name}!"}
    ]
)
print(message.content[0].text)`;

  const curlCode = `curl -X POST ${model.apiDocs.includes("anthropic") ? "https://api.anthropic.com/v1/messages" : "https://api.openai.com/v1/chat/completions"} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{
    "model": "${model.id}",
    "messages": [{"role": "user", "content": "Hello!"}],
    "max_tokens": 1024
  }'`;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <BackButton href="/llms" label="Back to Models" />

      {/* Hero */}
      <div className="glass-card p-6 sm:p-8 rounded-xl mb-6">
        <div className="flex items-start gap-4">
          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0"
            style={{
              backgroundColor: providerColors[model.provider] || "#666",
            }}
          >
            {model.provider.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold">{model.name}</h1>
            <p className="text-muted-foreground">
              by {model.provider}
              {model.isOpenSource && (
                <Badge variant="outline" className="ml-2">
                  Open Source
                </Badge>
              )}
            </p>
            <p className="mt-2 text-muted-foreground">{model.tagline}</p>
            <div className="mt-3">
              <CapabilityBadges capabilities={model.capabilities} max={8} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={model.website} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="gap-1.5">
                  Visit {model.provider} <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
              <a href={model.apiDocs} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="gap-1.5">
                  API Docs <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Context", value: formatTokenCount(model.contextWindow) },
          { label: "Max Output", value: formatTokenCount(model.maxOutput) },
          { label: "Cutoff", value: model.knowledgeCutoff },
          {
            label: "Pricing",
            value: `${formatPrice(model.pricing.inputPer1M)}/${formatPrice(model.pricing.outputPer1M)}`,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-3 rounded-lg text-center"
          >
            <div className="text-xs text-muted-foreground">{stat.label}</div>
            <div className="text-sm font-semibold mt-0.5">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="use-cases">Use Cases</TabsTrigger>
          <TabsTrigger value="api">API Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {model.description.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" /> Strengths
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {model.strengths.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm glass-card p-3 rounded-lg"
                >
                  <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" /> Limitations
            </h3>
            <ul className="space-y-2">
              {model.weaknesses.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-yellow-500 mt-0.5">&bull;</span> {w}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Best For</h3>
            <div className="flex flex-wrap gap-2">
              {model.bestFor.map((b) => (
                <Badge key={b} variant="secondary">
                  {b}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          {benchmarkEntries.length > 0 ? (
            <div className="space-y-3">
              {benchmarkEntries.map((entry) => {
                const def = getBenchmarkDef(entry.benchmarkId);
                if (!def) return null;
                const pct =
                  def.unit === "elo"
                    ? ((entry.score - 800) / 600) * 100
                    : (entry.score / def.maxScore) * 100;
                return (
                  <div key={entry.benchmarkId} className="glass-card p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-medium text-sm">{def.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({def.shortName})
                        </span>
                      </div>
                      <span className="font-semibold text-sm">
                        {def.unit === "elo"
                          ? entry.score.toFixed(0)
                          : `${entry.score.toFixed(1)}%`}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {def.realWorldMeaning}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              No benchmark data available for this model yet.
            </p>
          )}
          <Link href={`/compare?models=${model.id}`}>
            <Button variant="outline" size="sm">
              Compare benchmarks with other models
            </Button>
          </Link>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-6">
          <div className="glass-card p-5 rounded-xl">
            <h3 className="font-semibold mb-4">API Pricing</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Input per 1M tokens</span>
                <div className="font-semibold text-lg">
                  {formatPrice(model.pricing.inputPer1M)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Output per 1M tokens</span>
                <div className="font-semibold text-lg">
                  {formatPrice(model.pricing.outputPer1M)}
                </div>
              </div>
              {model.pricing.cachedInputPer1M !== undefined && (
                <div>
                  <span className="text-muted-foreground">Cached input per 1M</span>
                  <div className="font-semibold text-lg">
                    {formatPrice(model.pricing.cachedInputPer1M)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {model.pricing.subscription && model.pricing.subscription.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Subscription Plans</h3>
              {model.pricing.subscription.map((sub) => (
                <div key={sub.name} className="glass-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{sub.name}</span>
                    <span className="font-semibold">${sub.price}/mo</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {sub.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5">
                        <Check className="h-3 w-3 text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="use-cases" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {model.bestFor.map((useCase) => (
              <div key={useCase} className="glass-card p-4 rounded-lg">
                <h4 className="font-medium text-sm mb-1">{useCase}</h4>
                <p className="text-xs text-muted-foreground">
                  {model.name} excels at this use case thanks to its{" "}
                  {model.strengths[0]?.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
          <Link href="/prompts">
            <Button variant="outline" size="sm">
              Browse related prompts
            </Button>
          </Link>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <CodeBlock code={pythonCode} language="python" filename="quickstart.py" />
          <CodeBlock code={curlCode} language="bash" filename="curl" />
          <a
            href={model.apiDocs}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-1.5">
              Full API Documentation <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </TabsContent>
      </Tabs>

      {/* Compare With */}
      {competitors.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Compare with...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {competitors.map((comp) => (
              <div key={comp.id} className="glass-card p-4 rounded-lg">
                <div className="font-medium text-sm">{comp.name}</div>
                <div className="text-xs text-muted-foreground mb-3">
                  {comp.provider}
                </div>
                <Link href={`/compare?models=${model.id},${comp.id}`}>
                  <Button size="sm" variant="outline" className="w-full">
                    Compare
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 text-xs text-muted-foreground">
        Data last updated: {model.dataLastUpdated}
      </div>
    </div>
  );
}
