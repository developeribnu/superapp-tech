import { formatTokenCount } from "@/lib/utils/format";

interface ContextWindowBarProps {
  contextWindow: number;
  maxInDataset?: number;
}

export function ContextWindowBar({
  contextWindow,
  maxInDataset = 2_000_000,
}: ContextWindowBarProps) {
  const percentage = Math.min((contextWindow / maxInDataset) * 100, 100);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground whitespace-nowrap">Context:</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium whitespace-nowrap">
        {formatTokenCount(contextWindow)}
      </span>
    </div>
  );
}
