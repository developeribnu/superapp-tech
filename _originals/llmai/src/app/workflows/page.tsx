import Link from "next/link";
import { workflows } from "@/lib/data/workflows";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Layers } from "lucide-react";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/10 text-green-500 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function WorkflowsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <PageHeader
        title="Workflow Guides"
        description="Step-by-step guides for multi-model AI workflows"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workflows.map((workflow) => (
          <Link
            key={workflow.id}
            href={`/workflows/${workflow.id}`}
            className="glass-card p-5 rounded-xl hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {workflow.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{workflow.subtitle}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
            </div>

            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {workflow.description}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <Badge
                variant="outline"
                className={`text-xs capitalize ${difficultyColors[workflow.difficulty] || ""}`}
              >
                {workflow.difficulty}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Layers className="h-3 w-3" /> {workflow.steps.length} steps
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {workflow.totalTime}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {workflow.tools.slice(0, 3).map((tool) => (
                <Badge key={tool} variant="secondary" className="text-xs">
                  {tool}
                </Badge>
              ))}
              {workflow.tools.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{workflow.tools.length - 3}
                </Badge>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
