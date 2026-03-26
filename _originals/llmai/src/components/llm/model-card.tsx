import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { providerColors } from "@/lib/data/categories";
import type { LLMModel } from "@/lib/types/llm";

interface ModelCardProps {
  model: LLMModel;
  compact?: boolean;
}

export function ModelCard({ model, compact = false }: ModelCardProps) {
  const providerColor = providerColors[model.provider] || "#666";
  const topCapabilities = model.capabilities.slice(0, 3);

  if (compact) {
    return (
      <Link href={`/llms/${model.id}`} className="block group">
        <div className="card-compact flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-accent/50 transition-colors">
          <div
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: providerColor }}
          />
          <div className="flex-1 min-w-0">
            <span className="text-sm font-medium">{model.name}</span>
            <span className="text-xs text-muted-foreground ml-2">{model.provider}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            {topCapabilities.map((c) => (
              <Badge key={c} variant="secondary" className="text-[10px] capitalize px-1.5 py-0">
                {c}
              </Badge>
            ))}
          </div>
          <Badge
            variant="outline"
            className="text-[10px] capitalize shrink-0"
          >
            {model.pricing.tier}
          </Badge>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/llms/${model.id}`} className="block group">
      <div className="glass-card p-5 rounded-xl h-full hover:-translate-y-1 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
        {/* Provider accent strip */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
          style={{ backgroundColor: providerColor }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3 pl-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
              {model.name}
            </h3>
            <p className="text-xs text-muted-foreground">{model.provider}</p>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] capitalize shrink-0"
          >
            {model.pricing.tier}
          </Badge>
        </div>

        {/* Tagline */}
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 pl-2">
          {model.tagline}
        </p>

        {/* Capabilities */}
        <div className="flex flex-wrap gap-1.5 pl-2">
          {topCapabilities.map((c) => (
            <Badge key={c} variant="secondary" className="text-[10px] capitalize">
              {c}
            </Badge>
          ))}
          {model.capabilities.length > 3 && (
            <Badge variant="outline" className="text-[10px]">
              +{model.capabilities.length - 3}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50 pl-2">
          <span className="text-[11px] text-muted-foreground">
            {model.contextWindow >= 1000 ? `${Math.round(model.contextWindow / 1000)}K` : model.contextWindow} context
          </span>
          <span className="text-xs text-primary group-hover:underline decoration-primary/50">
            Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
