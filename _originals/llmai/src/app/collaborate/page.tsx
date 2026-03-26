"use client";

import { useState } from "react";
import { collaborationPatterns, decisionTree, integrationGuides } from "@/lib/data/collaboration-patterns";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, Lightbulb, BookOpen, ChevronRight } from "lucide-react";

function DecisionFlowchart() {
  const [currentNodeId, setCurrentNodeId] = useState(decisionTree[0]?.id || "");
  const currentNode = decisionTree.find((n) => n.id === currentNodeId);

  const reset = () => setCurrentNodeId(decisionTree[0]?.id || "");

  if (!currentNode) return null;

  // Separate navigable options from recommendation options
  const navOptions = currentNode.options.filter((o) => o.nextNodeId);
  const recOptions = currentNode.options.filter((o) => o.recommendation && !o.nextNodeId);

  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Find Your Pattern</h3>
        <Button variant="outline" size="sm" onClick={reset}>
          Start Over
        </Button>
      </div>

      <div className="text-center py-8">
        <p className="text-lg font-medium mb-6">{currentNode.question}</p>

        {navOptions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {navOptions.map((option) => (
              <Button
                key={option.label}
                variant="outline"
                onClick={() => setCurrentNodeId(option.nextNodeId!)}
                className="gap-2"
              >
                {option.label} <ChevronRight className="h-4 w-4" />
              </Button>
            ))}
          </div>
        )}

        {recOptions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3">
            {recOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => {}}
                className="glass-card p-4 rounded-lg text-left max-w-sm"
              >
                <p className="text-sm font-medium mb-1">{option.label}</p>
                <div className="flex items-center gap-2 mb-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    {option.recommendation!.model}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {option.recommendation!.reason}
                </p>
                {option.recommendation!.alternatives && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-xs text-muted-foreground">Also consider:</span>
                    {option.recommendation!.alternatives.map((alt) => (
                      <Badge key={alt} variant="outline" className="text-xs">
                        {alt}
                      </Badge>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {navOptions.length === 0 && recOptions.length === 0 && (
          <div>
            <Button variant="outline" size="sm" onClick={reset}>
              Try Again
            </Button>
          </div>
        )}

        {recOptions.length > 0 && (
          <div className="mt-4">
            <Button variant="outline" size="sm" onClick={reset}>
              Start Over
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CollaboratePage() {
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <PageHeader
        title="Multi-LLM Collaboration Hub"
        description="Discover patterns for orchestrating multiple AI models together"
      />

      <Tabs defaultValue="patterns">
        <TabsList className="mb-6">
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="flowchart">Decision Flowchart</TabsTrigger>
          <TabsTrigger value="guides">Integration Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns">
          <div className="space-y-4">
            {collaborationPatterns.map((pattern) => (
              <div key={pattern.id} className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedPattern(expandedPattern === pattern.id ? null : pattern.id)
                  }
                  className="w-full p-5 text-left flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {pattern.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{pattern.name}</h3>
                    <p className="text-sm text-muted-foreground">{pattern.subtitle}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {pattern.description}
                    </p>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 mt-1 ${
                      expandedPattern === pattern.id ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {expandedPattern === pattern.id && (
                  <div className="px-5 pb-5 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-500" /> Use Cases
                      </h4>
                      <ul className="space-y-1">
                        {pattern.useCases.map((uc) => (
                          <li key={uc} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span> {uc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-3">Steps</h4>
                      <div className="space-y-3">
                        {pattern.steps.map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                                {step.order}
                              </div>
                              {i < pattern.steps.length - 1 && (
                                <div className="w-0.5 flex-1 bg-border mt-1" />
                              )}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="secondary" className="text-xs">
                                  {step.model}
                                </Badge>
                              </div>
                              <p className="text-sm">{step.action}</p>
                              {step.handoffPrompt && (
                                <div className="mt-2 p-3 rounded-lg bg-muted text-xs font-mono whitespace-pre-wrap">
                                  {step.handoffPrompt.slice(0, 200)}
                                  {step.handoffPrompt.length > 200 && "..."}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flowchart">
          <DecisionFlowchart />

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-4">All Patterns Quick Reference</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {collaborationPatterns.map((p) => (
                <div key={p.id} className="glass-card p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary font-bold">#{p.number}</span>
                    <span className="font-medium text-sm">{p.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{p.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="space-y-6">
            {integrationGuides.map((guide) => (
              <div key={guide.id} className="glass-card p-5 rounded-xl">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{guide.platform}</h3>

                    {guide.prerequisites.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                          PREREQUISITES
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {guide.prerequisites.map((prereq) => (
                            <li key={prereq} className="flex items-start gap-1.5">
                              <span className="text-primary">•</span> {prereq}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {guide.steps.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {guide.steps.map((step, i) => (
                          <div key={i} className="text-sm">
                            <div className="flex items-start gap-2">
                              <span className="text-primary font-semibold shrink-0">
                                {i + 1}.
                              </span>
                              <div>
                                <span className="font-medium">{step.title}</span>
                                <p className="text-muted-foreground mt-0.5">
                                  {step.instruction}
                                </p>
                                {step.codeSnippet && (
                                  <pre className="mt-2 p-3 rounded-lg bg-muted text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                                    {step.codeSnippet}
                                  </pre>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {guide.commonIssues.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-xs font-semibold text-muted-foreground mb-2">
                          COMMON ISSUES
                        </h4>
                        <div className="space-y-2">
                          {guide.commonIssues.map((issue, i) => (
                            <div key={i} className="text-sm">
                              <span className="font-medium text-yellow-500">Problem:</span>{" "}
                              <span className="text-muted-foreground">{issue.problem}</span>
                              <br />
                              <span className="font-medium text-green-500">Solution:</span>{" "}
                              <span className="text-muted-foreground">{issue.solution}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
