export interface BenchmarkDefinition {
  id: string;
  name: string;
  shortName: string;
  category: "coding" | "reasoning" | "knowledge" | "math" | "multimodal" | "preference";
  description: string;
  realWorldMeaning: string;
  maxScore: number;
  unit: "%" | "elo" | "score";
  higherIsBetter: boolean;
  source: string;
}

export interface BenchmarkEntry {
  modelId: string;
  benchmarkId: string;
  score: number;
  date: string;
  source: string;
  notes?: string;
}

export interface BenchmarkHistorical {
  modelId: string;
  benchmarkId: string;
  scores: Array<{
    date: string;
    score: number;
    modelVersion: string;
  }>;
}
