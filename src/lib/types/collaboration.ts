export interface CollaborationPattern {
  id: string;
  number: number;
  name: string;
  subtitle: string;
  description: string;
  useCases: string[];
  steps: Array<{
    order: number;
    model: string;
    action: string;
    handoffPrompt?: string;
  }>;
  benefits: string[];
  limitations: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTimeSaving: string;
  tags: string[];
}

export interface DecisionNode {
  id: string;
  question: string;
  options: Array<{
    label: string;
    nextNodeId?: string;
    recommendation?: {
      model: string;
      reason: string;
      alternatives?: string[];
    };
  }>;
}

export interface IntegrationGuide {
  id: string;
  platform: string;
  icon: string;
  prerequisites: string[];
  steps: Array<{
    title: string;
    instruction: string;
    codeSnippet?: string;
    language?: string;
  }>;
  commonIssues: Array<{
    problem: string;
    solution: string;
  }>;
}
