import { notFound } from "next/navigation";
import { workflows, getWorkflowById } from "@/lib/data/workflows";
import { BackButton } from "@/components/shared/back-button";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, Lightbulb, Clock } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return workflows.map((w) => ({ slug: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflowById(slug);
  if (!workflow) return {};
  return {
    title: workflow.title,
    description: workflow.subtitle,
  };
}

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workflow = getWorkflowById(slug);
  if (!workflow) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <BackButton href="/workflows" label="Back to Workflows" />

      {/* Hero */}
      <div className="glass-card p-6 rounded-xl mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">{workflow.title}</h1>
        <p className="text-muted-foreground mt-1">{workflow.subtitle}</p>
        <p className="text-sm text-muted-foreground mt-3">{workflow.description}</p>

        <div className="flex flex-wrap gap-3 mt-4">
          <Badge variant="secondary" className="capitalize">
            {workflow.difficulty}
          </Badge>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> Total: {workflow.totalTime}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            Setup: {workflow.setupTime}
          </span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            Daily: {workflow.dailyTime}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {workflow.tools.map((tool) => (
            <Badge key={tool} variant="outline" className="text-xs">
              {tool}
            </Badge>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      {workflow.prerequisites.length > 0 && (
        <div className="glass-card p-5 rounded-xl mb-6">
          <h2 className="font-semibold mb-3">Prerequisites</h2>
          <ul className="space-y-2">
            {workflow.prerequisites.map((prereq) => (
              <li key={prereq} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                {prereq}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Steps</h2>
        <div className="space-y-4">
          {workflow.steps.map((step, i) => (
            <div key={step.stepNumber} className="glass-card p-5 rounded-xl">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {step.stepNumber}
                  </div>
                  {i < workflow.steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{step.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {step.tool}
                    </Badge>
                    {step.estimatedTime && (
                      <span className="text-xs text-muted-foreground">
                        ~{step.estimatedTime}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>

                  {step.promptTemplate && (
                    <div className="mt-3 p-3 rounded-lg bg-muted text-sm font-mono whitespace-pre-wrap">
                      {step.promptTemplate}
                    </div>
                  )}

                  {step.tips && step.tips.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {step.tips.map((tip) => (
                        <div key={tip} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <Lightbulb className="h-3 w-3 text-yellow-500 shrink-0 mt-0.5" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pitfalls & Pro Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {workflow.pitfalls.length > 0 && (
          <div className="glass-card p-5 rounded-xl">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" /> Common Pitfalls
            </h3>
            <ul className="space-y-2">
              {workflow.pitfalls.map((pitfall) => (
                <li key={pitfall} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-yellow-500">•</span> {pitfall}
                </li>
              ))}
            </ul>
          </div>
        )}

        {workflow.proTips.length > 0 && (
          <div className="glass-card p-5 rounded-xl">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" /> Pro Tips
            </h3>
            <ul className="space-y-2">
              {workflow.proTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">•</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {workflow.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
