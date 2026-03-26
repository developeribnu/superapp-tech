export interface BenchmarkDefinition {
  id: string;
  name: string;
  shortName: string;
  category:
    | "coding"
    | "reasoning"
    | "knowledge"
    | "math"
    | "multimodal"
    | "preference";
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

// ---------------------------------------------------------------------------
// Benchmark Definitions
// ---------------------------------------------------------------------------

export const benchmarkDefinitions: BenchmarkDefinition[] = [
  {
    id: "swe-verified",
    name: "SWE-bench Verified",
    shortName: "SWE-bench",
    category: "coding",
    description:
      "Evaluates the ability to resolve real-world GitHub issues from popular Python repositories using a human-verified subset of 500 problem instances.",
    realWorldMeaning:
      "Measures how well a model can autonomously fix real bugs and implement features in production codebases, the closest proxy to day-to-day software engineering.",
    maxScore: 100,
    unit: "%",
    higherIsBetter: true,
    source: "https://www.swebench.com",
  },
  {
    id: "mmlu",
    name: "MMLU",
    shortName: "MMLU",
    category: "knowledge",
    description:
      "Massive Multitask Language Understanding benchmark covering 57 subjects across STEM, humanities, social sciences, and more with multiple-choice questions.",
    realWorldMeaning:
      "Reflects broad academic and professional knowledge, similar to how well a model could perform across a wide range of university-level exams.",
    maxScore: 100,
    unit: "%",
    higherIsBetter: true,
    source: "https://arxiv.org/abs/2009.03300",
  },
  {
    id: "gpqa-diamond",
    name: "GPQA Diamond",
    shortName: "GPQA",
    category: "reasoning",
    description:
      "Graduate-level Google-Proof Q&A benchmark with 198 expert-crafted questions in physics, chemistry, and biology that are difficult even for domain PhD experts.",
    realWorldMeaning:
      "Measures expert-level scientific reasoning on problems that cannot be solved by simple retrieval. A model that scores well can assist with advanced research questions.",
    maxScore: 100,
    unit: "%",
    higherIsBetter: true,
    source: "https://arxiv.org/abs/2311.12022",
  },
  {
    id: "human-eval",
    name: "HumanEval",
    shortName: "HumanEval",
    category: "coding",
    description:
      "A set of 164 hand-written Python programming problems that test code generation from docstrings, evaluating functional correctness via unit tests.",
    realWorldMeaning:
      "Measures basic code generation ability — whether a model can write correct Python functions from natural language descriptions.",
    maxScore: 100,
    unit: "%",
    higherIsBetter: true,
    source: "https://arxiv.org/abs/2107.03374",
  },
  {
    id: "math-500",
    name: "MATH-500",
    shortName: "MATH-500",
    category: "math",
    description:
      "A curated subset of 500 competition-level mathematics problems spanning algebra, geometry, number theory, combinatorics, and calculus.",
    realWorldMeaning:
      "Tests mathematical reasoning and problem-solving skills at the level of high school and undergraduate math competitions.",
    maxScore: 100,
    unit: "%",
    higherIsBetter: true,
    source: "https://arxiv.org/abs/2103.03874",
  },
  {
    id: "arc-agi-2",
    name: "ARC-AGI-2",
    shortName: "ARC-AGI-2",
    category: "reasoning",
    description:
      "Abstraction and Reasoning Corpus v2. Tests fluid intelligence through novel visual pattern-recognition puzzles that require generalization from very few examples.",
    realWorldMeaning:
      "Measures genuine abstract reasoning and adaptation to novel problems, widely considered one of the hardest benchmarks and a proxy for general intelligence.",
    maxScore: 100,
    unit: "%",
    higherIsBetter: true,
    source: "https://arcprize.org",
  },
  {
    id: "live-code-bench",
    name: "LiveCodeBench",
    shortName: "LiveCode",
    category: "coding",
    description:
      "A continuously updated benchmark using recent competitive programming problems from LeetCode, Codeforces, and AtCoder to prevent data contamination.",
    realWorldMeaning:
      "Tests algorithmic problem-solving and code generation on fresh problems the model has never seen during training.",
    maxScore: 100,
    unit: "%",
    higherIsBetter: true,
    source: "https://livecodebench.github.io",
  },
  {
    id: "lmsys-elo",
    name: "LMSYS Chatbot Arena",
    shortName: "Arena Elo",
    category: "preference",
    description:
      "A crowdsourced platform where users compare model outputs side-by-side in blind tests, producing Elo ratings based on millions of human preference votes.",
    realWorldMeaning:
      "The gold standard for overall user satisfaction. A higher Elo means real humans consistently prefer this model's responses across diverse, open-ended tasks.",
    maxScore: 2000,
    unit: "elo",
    higherIsBetter: true,
    source: "https://chat.lmsys.org",
  },
  {
    id: "aime-2025",
    name: "AIME 2025",
    shortName: "AIME '25",
    category: "math",
    description:
      "Problems from the 2025 American Invitational Mathematics Examination, a prestigious competition for top high school math students in the US.",
    realWorldMeaning:
      "Tests advanced mathematical reasoning at the level required to qualify for the USA Mathematical Olympiad.",
    maxScore: 100,
    unit: "%",
    higherIsBetter: true,
    source: "https://artofproblemsolving.com/wiki/index.php/2025_AIME",
  },
];

// ---------------------------------------------------------------------------
// Benchmark Entries
// ---------------------------------------------------------------------------

export const benchmarkEntries: BenchmarkEntry[] = [
  // =========================================================================
  // Claude Opus 4
  // =========================================================================
  {
    modelId: "claude-opus-4",
    benchmarkId: "swe-verified",
    score: 72.5,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-opus-4",
    benchmarkId: "mmlu",
    score: 88.8,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-opus-4",
    benchmarkId: "gpqa-diamond",
    score: 79.6,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-opus-4",
    benchmarkId: "human-eval",
    score: 95.2,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-opus-4",
    benchmarkId: "math-500",
    score: 82.6,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-opus-4",
    benchmarkId: "arc-agi-2",
    score: 8.8,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-opus-4",
    benchmarkId: "live-code-bench",
    score: 58.7,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-opus-4",
    benchmarkId: "lmsys-elo",
    score: 1381,
    date: "2025-05",
    source: "LMSYS",
  },
  {
    modelId: "claude-opus-4",
    benchmarkId: "aime-2025",
    score: 75.5,
    date: "2025-05",
    source: "Anthropic",
  },

  // =========================================================================
  // Claude Sonnet 4
  // =========================================================================
  {
    modelId: "claude-sonnet-4",
    benchmarkId: "swe-verified",
    score: 72.7,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-sonnet-4",
    benchmarkId: "mmlu",
    score: 86.5,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-sonnet-4",
    benchmarkId: "gpqa-diamond",
    score: 70.1,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-sonnet-4",
    benchmarkId: "human-eval",
    score: 93.8,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-sonnet-4",
    benchmarkId: "math-500",
    score: 80.4,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-sonnet-4",
    benchmarkId: "live-code-bench",
    score: 56.3,
    date: "2025-05",
    source: "Anthropic",
  },
  {
    modelId: "claude-sonnet-4",
    benchmarkId: "lmsys-elo",
    score: 1366,
    date: "2025-05",
    source: "LMSYS",
  },
  {
    modelId: "claude-sonnet-4",
    benchmarkId: "aime-2025",
    score: 70.5,
    date: "2025-05",
    source: "Anthropic",
  },

  // =========================================================================
  // Claude Haiku 3.5
  // =========================================================================
  {
    modelId: "claude-haiku-3-5",
    benchmarkId: "swe-verified",
    score: 40.6,
    date: "2024-10",
    source: "Anthropic",
  },
  {
    modelId: "claude-haiku-3-5",
    benchmarkId: "mmlu",
    score: 80.9,
    date: "2024-10",
    source: "Anthropic",
  },
  {
    modelId: "claude-haiku-3-5",
    benchmarkId: "gpqa-diamond",
    score: 41.6,
    date: "2024-10",
    source: "Anthropic",
  },
  {
    modelId: "claude-haiku-3-5",
    benchmarkId: "human-eval",
    score: 88.1,
    date: "2024-10",
    source: "Anthropic",
  },
  {
    modelId: "claude-haiku-3-5",
    benchmarkId: "math-500",
    score: 69.2,
    date: "2024-10",
    source: "Anthropic",
  },
  {
    modelId: "claude-haiku-3-5",
    benchmarkId: "lmsys-elo",
    score: 1284,
    date: "2024-10",
    source: "LMSYS",
  },

  // =========================================================================
  // GPT-4o
  // =========================================================================
  {
    modelId: "gpt-4o",
    benchmarkId: "swe-verified",
    score: 33.2,
    date: "2024-08",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4o",
    benchmarkId: "mmlu",
    score: 88.7,
    date: "2024-05",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4o",
    benchmarkId: "gpqa-diamond",
    score: 49.9,
    date: "2024-05",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4o",
    benchmarkId: "human-eval",
    score: 90.2,
    date: "2024-05",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4o",
    benchmarkId: "math-500",
    score: 76.6,
    date: "2024-05",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4o",
    benchmarkId: "lmsys-elo",
    score: 1310,
    date: "2024-08",
    source: "LMSYS",
  },
  {
    modelId: "gpt-4o",
    benchmarkId: "aime-2025",
    score: 42.0,
    date: "2025-03",
    source: "Community",
  },

  // =========================================================================
  // GPT-4.1
  // =========================================================================
  {
    modelId: "gpt-4-1",
    benchmarkId: "swe-verified",
    score: 54.6,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4-1",
    benchmarkId: "mmlu",
    score: 89.3,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4-1",
    benchmarkId: "gpqa-diamond",
    score: 62.4,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4-1",
    benchmarkId: "human-eval",
    score: 93.4,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4-1",
    benchmarkId: "math-500",
    score: 79.8,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4-1",
    benchmarkId: "live-code-bench",
    score: 52.1,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "gpt-4-1",
    benchmarkId: "lmsys-elo",
    score: 1348,
    date: "2025-04",
    source: "LMSYS",
  },

  // =========================================================================
  // o3
  // =========================================================================
  {
    modelId: "o3",
    benchmarkId: "swe-verified",
    score: 69.1,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o3",
    benchmarkId: "mmlu",
    score: 92.9,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o3",
    benchmarkId: "gpqa-diamond",
    score: 82.8,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o3",
    benchmarkId: "human-eval",
    score: 97.2,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o3",
    benchmarkId: "math-500",
    score: 97.8,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o3",
    benchmarkId: "arc-agi-2",
    score: 4.4,
    date: "2025-04",
    source: "ARC Prize",
  },
  {
    modelId: "o3",
    benchmarkId: "live-code-bench",
    score: 71.4,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o3",
    benchmarkId: "lmsys-elo",
    score: 1397,
    date: "2025-04",
    source: "LMSYS",
  },
  {
    modelId: "o3",
    benchmarkId: "aime-2025",
    score: 96.0,
    date: "2025-04",
    source: "OpenAI",
  },

  // =========================================================================
  // o4-mini
  // =========================================================================
  {
    modelId: "o4-mini",
    benchmarkId: "swe-verified",
    score: 68.1,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o4-mini",
    benchmarkId: "mmlu",
    score: 90.0,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o4-mini",
    benchmarkId: "gpqa-diamond",
    score: 77.6,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o4-mini",
    benchmarkId: "human-eval",
    score: 99.3,
    date: "2025-04",
    source: "OpenAI",
    notes: "o4-mini-high configuration",
  },
  {
    modelId: "o4-mini",
    benchmarkId: "math-500",
    score: 97.5,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o4-mini",
    benchmarkId: "live-code-bench",
    score: 67.8,
    date: "2025-04",
    source: "OpenAI",
  },
  {
    modelId: "o4-mini",
    benchmarkId: "lmsys-elo",
    score: 1372,
    date: "2025-04",
    source: "LMSYS",
  },
  {
    modelId: "o4-mini",
    benchmarkId: "aime-2025",
    score: 92.7,
    date: "2025-04",
    source: "OpenAI",
  },

  // =========================================================================
  // Gemini 2.5 Pro
  // =========================================================================
  {
    modelId: "gemini-2-5-pro",
    benchmarkId: "swe-verified",
    score: 63.8,
    date: "2025-03",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-pro",
    benchmarkId: "mmlu",
    score: 89.4,
    date: "2025-03",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-pro",
    benchmarkId: "gpqa-diamond",
    score: 84.0,
    date: "2025-03",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-pro",
    benchmarkId: "human-eval",
    score: 95.0,
    date: "2025-03",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-pro",
    benchmarkId: "math-500",
    score: 90.2,
    date: "2025-03",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-pro",
    benchmarkId: "arc-agi-2",
    score: 8.0,
    date: "2025-03",
    source: "ARC Prize",
  },
  {
    modelId: "gemini-2-5-pro",
    benchmarkId: "live-code-bench",
    score: 70.4,
    date: "2025-03",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-pro",
    benchmarkId: "lmsys-elo",
    score: 1392,
    date: "2025-03",
    source: "LMSYS",
  },
  {
    modelId: "gemini-2-5-pro",
    benchmarkId: "aime-2025",
    score: 86.7,
    date: "2025-03",
    source: "Google",
  },

  // =========================================================================
  // Gemini 2.5 Flash
  // =========================================================================
  {
    modelId: "gemini-2-5-flash",
    benchmarkId: "swe-verified",
    score: 49.2,
    date: "2025-05",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-flash",
    benchmarkId: "mmlu",
    score: 86.8,
    date: "2025-05",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-flash",
    benchmarkId: "gpqa-diamond",
    score: 65.1,
    date: "2025-05",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-flash",
    benchmarkId: "human-eval",
    score: 91.5,
    date: "2025-05",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-flash",
    benchmarkId: "math-500",
    score: 83.6,
    date: "2025-05",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-flash",
    benchmarkId: "live-code-bench",
    score: 52.4,
    date: "2025-05",
    source: "Google",
  },
  {
    modelId: "gemini-2-5-flash",
    benchmarkId: "lmsys-elo",
    score: 1347,
    date: "2025-05",
    source: "LMSYS",
  },
  {
    modelId: "gemini-2-5-flash",
    benchmarkId: "aime-2025",
    score: 72.0,
    date: "2025-05",
    source: "Google",
  },

  // =========================================================================
  // Gemini 2.0 Flash
  // =========================================================================
  {
    modelId: "gemini-2-0-flash",
    benchmarkId: "mmlu",
    score: 76.4,
    date: "2025-02",
    source: "Google",
  },
  {
    modelId: "gemini-2-0-flash",
    benchmarkId: "gpqa-diamond",
    score: 52.3,
    date: "2025-02",
    source: "Google",
  },
  {
    modelId: "gemini-2-0-flash",
    benchmarkId: "human-eval",
    score: 88.7,
    date: "2025-02",
    source: "Google",
  },
  {
    modelId: "gemini-2-0-flash",
    benchmarkId: "math-500",
    score: 73.1,
    date: "2025-02",
    source: "Google",
  },
  {
    modelId: "gemini-2-0-flash",
    benchmarkId: "lmsys-elo",
    score: 1302,
    date: "2025-02",
    source: "LMSYS",
  },

  // =========================================================================
  // Grok 3
  // =========================================================================
  {
    modelId: "grok-3",
    benchmarkId: "swe-verified",
    score: 52.8,
    date: "2025-02",
    source: "xAI",
  },
  {
    modelId: "grok-3",
    benchmarkId: "mmlu",
    score: 92.7,
    date: "2025-02",
    source: "xAI",
  },
  {
    modelId: "grok-3",
    benchmarkId: "gpqa-diamond",
    score: 75.4,
    date: "2025-02",
    source: "xAI",
  },
  {
    modelId: "grok-3",
    benchmarkId: "human-eval",
    score: 86.5,
    date: "2025-02",
    source: "xAI",
  },
  {
    modelId: "grok-3",
    benchmarkId: "math-500",
    score: 85.6,
    date: "2025-02",
    source: "xAI",
  },
  {
    modelId: "grok-3",
    benchmarkId: "live-code-bench",
    score: 79.4,
    date: "2025-02",
    source: "xAI",
    notes: "With Think mode enabled",
  },
  {
    modelId: "grok-3",
    benchmarkId: "lmsys-elo",
    score: 1371,
    date: "2025-02",
    source: "LMSYS",
  },
  {
    modelId: "grok-3",
    benchmarkId: "aime-2025",
    score: 93.3,
    date: "2025-02",
    source: "xAI",
    notes: "cons@64, self-reported",
  },

  // =========================================================================
  // Grok 3 Mini
  // =========================================================================
  {
    modelId: "grok-3-mini",
    benchmarkId: "mmlu",
    score: 85.4,
    date: "2025-02",
    source: "xAI",
  },
  {
    modelId: "grok-3-mini",
    benchmarkId: "gpqa-diamond",
    score: 60.1,
    date: "2025-02",
    source: "xAI",
  },
  {
    modelId: "grok-3-mini",
    benchmarkId: "human-eval",
    score: 88.3,
    date: "2025-02",
    source: "xAI",
  },
  {
    modelId: "grok-3-mini",
    benchmarkId: "math-500",
    score: 82.4,
    date: "2025-02",
    source: "xAI",
  },
  {
    modelId: "grok-3-mini",
    benchmarkId: "live-code-bench",
    score: 80.4,
    date: "2025-02",
    source: "xAI",
    notes: "With reasoning enabled",
  },
  {
    modelId: "grok-3-mini",
    benchmarkId: "lmsys-elo",
    score: 1328,
    date: "2025-02",
    source: "LMSYS",
  },
  {
    modelId: "grok-3-mini",
    benchmarkId: "aime-2025",
    score: 68.0,
    date: "2025-02",
    source: "xAI",
  },

  // =========================================================================
  // Llama 4 Maverick
  // =========================================================================
  {
    modelId: "llama-4-maverick",
    benchmarkId: "mmlu",
    score: 85.5,
    date: "2025-04",
    source: "Meta",
  },
  {
    modelId: "llama-4-maverick",
    benchmarkId: "gpqa-diamond",
    score: 62.8,
    date: "2025-04",
    source: "Meta",
  },
  {
    modelId: "llama-4-maverick",
    benchmarkId: "human-eval",
    score: 82.4,
    date: "2025-04",
    source: "Meta",
  },
  {
    modelId: "llama-4-maverick",
    benchmarkId: "math-500",
    score: 61.2,
    date: "2025-04",
    source: "Meta",
  },
  {
    modelId: "llama-4-maverick",
    benchmarkId: "live-code-bench",
    score: 46.3,
    date: "2025-04",
    source: "Meta",
  },
  {
    modelId: "llama-4-maverick",
    benchmarkId: "lmsys-elo",
    score: 1340,
    date: "2025-04",
    source: "LMSYS",
  },

  // =========================================================================
  // Llama 4 Scout
  // =========================================================================
  {
    modelId: "llama-4-scout",
    benchmarkId: "mmlu",
    score: 79.6,
    date: "2025-04",
    source: "Meta",
  },
  {
    modelId: "llama-4-scout",
    benchmarkId: "gpqa-diamond",
    score: 55.3,
    date: "2025-04",
    source: "Meta",
  },
  {
    modelId: "llama-4-scout",
    benchmarkId: "human-eval",
    score: 74.1,
    date: "2025-04",
    source: "Meta",
  },
  {
    modelId: "llama-4-scout",
    benchmarkId: "math-500",
    score: 50.3,
    date: "2025-04",
    source: "Meta",
  },
  {
    modelId: "llama-4-scout",
    benchmarkId: "lmsys-elo",
    score: 1306,
    date: "2025-04",
    source: "LMSYS",
  },

  // =========================================================================
  // Llama 3.3 70B
  // =========================================================================
  {
    modelId: "llama-3-3-70b",
    benchmarkId: "mmlu",
    score: 82.8,
    date: "2024-12",
    source: "Meta",
  },
  {
    modelId: "llama-3-3-70b",
    benchmarkId: "gpqa-diamond",
    score: 50.5,
    date: "2024-12",
    source: "Meta",
  },
  {
    modelId: "llama-3-3-70b",
    benchmarkId: "human-eval",
    score: 88.4,
    date: "2024-12",
    source: "Meta",
  },
  {
    modelId: "llama-3-3-70b",
    benchmarkId: "math-500",
    score: 77.0,
    date: "2024-12",
    source: "Meta",
  },
  {
    modelId: "llama-3-3-70b",
    benchmarkId: "lmsys-elo",
    score: 1261,
    date: "2024-12",
    source: "LMSYS",
  },

  // =========================================================================
  // DeepSeek V3
  // =========================================================================
  {
    modelId: "deepseek-v3",
    benchmarkId: "swe-verified",
    score: 42.0,
    date: "2024-12",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-v3",
    benchmarkId: "mmlu",
    score: 88.5,
    date: "2024-12",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-v3",
    benchmarkId: "gpqa-diamond",
    score: 59.1,
    date: "2024-12",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-v3",
    benchmarkId: "human-eval",
    score: 82.6,
    date: "2024-12",
    source: "DeepSeek",
    notes: "HumanEval-Mul score from technical report",
  },
  {
    modelId: "deepseek-v3",
    benchmarkId: "math-500",
    score: 90.2,
    date: "2024-12",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-v3",
    benchmarkId: "live-code-bench",
    score: 48.6,
    date: "2024-12",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-v3",
    benchmarkId: "lmsys-elo",
    score: 1338,
    date: "2024-12",
    source: "LMSYS",
  },
  {
    modelId: "deepseek-v3",
    benchmarkId: "aime-2025",
    score: 52.0,
    date: "2025-03",
    source: "Community",
  },

  // =========================================================================
  // DeepSeek R1
  // =========================================================================
  {
    modelId: "deepseek-r1",
    benchmarkId: "swe-verified",
    score: 49.2,
    date: "2025-01",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-r1",
    benchmarkId: "mmlu",
    score: 90.8,
    date: "2025-01",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-r1",
    benchmarkId: "gpqa-diamond",
    score: 71.5,
    date: "2025-01",
    source: "DeepSeek",
    notes: "Pass@1 score",
  },
  {
    modelId: "deepseek-r1",
    benchmarkId: "human-eval",
    score: 92.6,
    date: "2025-01",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-r1",
    benchmarkId: "math-500",
    score: 97.3,
    date: "2025-01",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-r1",
    benchmarkId: "live-code-bench",
    score: 62.8,
    date: "2025-01",
    source: "DeepSeek",
  },
  {
    modelId: "deepseek-r1",
    benchmarkId: "lmsys-elo",
    score: 1374,
    date: "2025-01",
    source: "LMSYS",
  },
  {
    modelId: "deepseek-r1",
    benchmarkId: "aime-2025",
    score: 74.0,
    date: "2025-03",
    source: "Vals.ai",
    notes: "Independent evaluation, averaged over 8 runs",
  },

  // =========================================================================
  // Mistral Large
  // =========================================================================
  {
    modelId: "mistral-large",
    benchmarkId: "mmlu",
    score: 84.0,
    date: "2024-07",
    source: "Mistral",
  },
  {
    modelId: "mistral-large",
    benchmarkId: "gpqa-diamond",
    score: 51.2,
    date: "2024-07",
    source: "Mistral",
  },
  {
    modelId: "mistral-large",
    benchmarkId: "human-eval",
    score: 92.0,
    date: "2024-07",
    source: "Mistral",
  },
  {
    modelId: "mistral-large",
    benchmarkId: "math-500",
    score: 71.5,
    date: "2024-07",
    source: "Mistral",
  },
  {
    modelId: "mistral-large",
    benchmarkId: "lmsys-elo",
    score: 1249,
    date: "2024-07",
    source: "LMSYS",
  },

  // =========================================================================
  // Qwen 3 235B
  // =========================================================================
  {
    modelId: "qwen-3-235b",
    benchmarkId: "swe-verified",
    score: 55.4,
    date: "2025-05",
    source: "Alibaba",
  },
  {
    modelId: "qwen-3-235b",
    benchmarkId: "mmlu",
    score: 88.3,
    date: "2025-05",
    source: "Alibaba",
  },
  {
    modelId: "qwen-3-235b",
    benchmarkId: "gpqa-diamond",
    score: 67.2,
    date: "2025-05",
    source: "Alibaba",
  },
  {
    modelId: "qwen-3-235b",
    benchmarkId: "human-eval",
    score: 92.4,
    date: "2025-05",
    source: "Alibaba",
  },
  {
    modelId: "qwen-3-235b",
    benchmarkId: "math-500",
    score: 87.6,
    date: "2025-05",
    source: "Alibaba",
  },
  {
    modelId: "qwen-3-235b",
    benchmarkId: "live-code-bench",
    score: 70.7,
    date: "2025-05",
    source: "Alibaba",
  },
  {
    modelId: "qwen-3-235b",
    benchmarkId: "lmsys-elo",
    score: 1356,
    date: "2025-05",
    source: "LMSYS",
  },
  {
    modelId: "qwen-3-235b",
    benchmarkId: "aime-2025",
    score: 84.0,
    date: "2025-05",
    source: "Alibaba",
  },

  // =========================================================================
  // Qwen 2.5 Coder
  // =========================================================================
  {
    modelId: "qwen-2-5-coder",
    benchmarkId: "swe-verified",
    score: 38.8,
    date: "2024-11",
    source: "Alibaba",
  },
  {
    modelId: "qwen-2-5-coder",
    benchmarkId: "human-eval",
    score: 93.0,
    date: "2024-11",
    source: "Alibaba",
  },
  {
    modelId: "qwen-2-5-coder",
    benchmarkId: "math-500",
    score: 62.4,
    date: "2024-11",
    source: "Alibaba",
  },
  {
    modelId: "qwen-2-5-coder",
    benchmarkId: "live-code-bench",
    score: 51.2,
    date: "2024-11",
    source: "Alibaba",
  },

  // =========================================================================
  // Command A
  // =========================================================================
  {
    modelId: "command-a",
    benchmarkId: "swe-verified",
    score: 40.1,
    date: "2025-03",
    source: "Cohere",
  },
  {
    modelId: "command-a",
    benchmarkId: "mmlu",
    score: 83.6,
    date: "2025-03",
    source: "Cohere",
  },
  {
    modelId: "command-a",
    benchmarkId: "gpqa-diamond",
    score: 52.7,
    date: "2025-03",
    source: "Cohere",
  },
  {
    modelId: "command-a",
    benchmarkId: "human-eval",
    score: 86.8,
    date: "2025-03",
    source: "Cohere",
  },
  {
    modelId: "command-a",
    benchmarkId: "math-500",
    score: 70.2,
    date: "2025-03",
    source: "Cohere",
  },
  {
    modelId: "command-a",
    benchmarkId: "lmsys-elo",
    score: 1276,
    date: "2025-03",
    source: "LMSYS",
  },
];

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getModelBenchmarks(modelId: string): BenchmarkEntry[] {
  return benchmarkEntries.filter((e) => e.modelId === modelId);
}

export function getBenchmarkDef(id: string): BenchmarkDefinition | undefined {
  return benchmarkDefinitions.find((b) => b.id === id);
}

export function getBenchmarkLeaderboard(benchmarkId: string): BenchmarkEntry[] {
  return benchmarkEntries
    .filter((e) => e.benchmarkId === benchmarkId)
    .sort((a, b) => b.score - a.score);
}
