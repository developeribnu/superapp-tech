import Link from "next/link";
import { providerColors } from "@/lib/data/categories";

const providers = [
  { name: "Anthropic", slug: "Anthropic", count: 3 },
  { name: "OpenAI", slug: "OpenAI", count: 4 },
  { name: "Google", slug: "Google", count: 3 },
  { name: "xAI", slug: "xAI", count: 2 },
  { name: "Meta", slug: "Meta", count: 3 },
  { name: "DeepSeek", slug: "DeepSeek", count: 2 },
  { name: "Mistral", slug: "Mistral", count: 1 },
  { name: "Alibaba", slug: "Alibaba", count: 2 },
  { name: "Cohere", slug: "Cohere", count: 1 },
];

export function ModelShowcase() {
  const doubled = [...providers, ...providers];

  return (
    <section className="py-8 overflow-hidden border-y border-border bg-muted/20">
      <div className="animate-marquee flex gap-8 w-max">
        {doubled.map((provider, i) => (
          <Link
            key={`${provider.slug}-${i}`}
            href={`/llms?provider=${provider.slug}`}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-border hover:border-primary/50 transition-colors whitespace-nowrap"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: providerColors[provider.name] || "#888" }}
            />
            <span className="text-sm font-medium">{provider.name}</span>
            <span className="text-xs text-muted-foreground">
              {provider.count} models
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
