import { Badge } from "@/components/ui/badge";
import type { Capability } from "@/lib/types/llm";

const capabilityLabels: Record<Capability, string> = {
  text: "Text",
  code: "Code",
  vision: "Vision",
  voice: "Voice",
  video: "Video",
  "web-search": "Web Search",
  "file-upload": "File Upload",
  "image-gen": "Image Gen",
  reasoning: "Reasoning",
  analysis: "Analysis",
  "function-calling": "Functions",
  "computer-use": "Computer Use",
  mcp: "MCP",
};

interface CapabilityBadgesProps {
  capabilities: Capability[];
  max?: number;
}

export function CapabilityBadges({ capabilities, max = 5 }: CapabilityBadgesProps) {
  const visible = capabilities.slice(0, max);
  const remaining = capabilities.length - max;

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map((cap) => (
        <Badge key={cap} variant="secondary" className="text-xs px-1.5 py-0">
          {capabilityLabels[cap]}
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge variant="outline" className="text-xs px-1.5 py-0">
          +{remaining}
        </Badge>
      )}
    </div>
  );
}
