export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
  tool: string;
  promptTemplate?: string;
  tips?: string[];
  estimatedTime?: string;
}

export interface Workflow {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  totalTime: string;
  setupTime: string;
  dailyTime: string;
  prerequisites: string[];
  steps: WorkflowStep[];
  pitfalls: string[];
  proTips: string[];
  tags: string[];
  relatedWorkflows?: string[];
}
