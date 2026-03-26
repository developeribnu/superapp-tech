import type {
  CollaborationPattern,
  DecisionNode,
  IntegrationGuide,
} from "@/lib/types/collaboration";

export const collaborationPatterns: CollaborationPattern[] = [
  {
    id: "research-execute",
    number: 1,
    name: "Research & Execute",
    subtitle: "Gemini Deep Research → Claude Implementation",
    description:
      "Use Gemini's Deep Research capability to gather comprehensive information, synthesize findings, and produce a detailed research brief. Then hand off to Claude for implementation, writing, or structured output based on the research.",
    useCases: [
      "Writing technically accurate blog posts or documentation",
      "Building features that require understanding current APIs or libraries",
      "Creating comprehensive guides based on up-to-date information",
      "Market research followed by strategic recommendations",
    ],
    steps: [
      {
        order: 1,
        model: "Gemini Deep Research",
        action:
          "Conduct deep research on the topic. Gather sources, synthesize findings, and produce a structured research brief with key facts, comparisons, and references.",
        handoffPrompt:
          'Research the following topic thoroughly: "{{TOPIC}}". Provide a structured brief including: key findings, relevant data points, source URLs, comparisons if applicable, and any caveats or nuances. Format as a clear reference document.',
      },
      {
        order: 2,
        model: "Claude",
        action:
          "Take the research brief and implement the final deliverable — whether that is code, a written piece, a strategy document, or structured data.",
        handoffPrompt:
          "Using the following research brief as your source of truth, {{TASK_DESCRIPTION}}. Here is the research:\n\n{{RESEARCH_BRIEF}}\n\nRequirements:\n- Cite specific facts from the research where appropriate\n- Flag any areas where the research is incomplete\n- {{ADDITIONAL_REQUIREMENTS}}",
      },
    ],
    benefits: [
      "Leverages Gemini's real-time web access and deep research mode",
      "Claude excels at structured output and implementation from a brief",
      "Research and execution are cleanly separated for better quality",
      "Produces well-sourced, accurate final output",
    ],
    limitations: [
      "Requires Gemini Advanced or API access with Deep Research enabled",
      "Research step can take several minutes for thorough results",
      "Manual handoff of the research brief between models",
      "Research may need to be re-run if requirements change",
    ],
    difficulty: "beginner",
    estimatedTimeSaving: "40-60% compared to manual research and writing",
    tags: ["research", "writing", "documentation", "gemini", "claude"],
  },
  {
    id: "generate-review",
    number: 2,
    name: "Generate & Review",
    subtitle: "Model A generates, Model B reviews",
    description:
      "One model generates the initial output — code, text, a plan — and a second model reviews it for errors, improvements, and edge cases. This mimics a human author/editor or developer/reviewer workflow and catches issues that a single model might miss.",
    useCases: [
      "Code generation with automated code review",
      "Draft emails or proposals that need a quality check",
      "Generating SQL queries and validating them for correctness",
      "Creating test cases and reviewing them for coverage gaps",
    ],
    steps: [
      {
        order: 1,
        model: "Model A (Generator)",
        action:
          "Generate the initial output based on requirements. Focus on completeness and meeting all specifications.",
        handoffPrompt:
          "Generate {{OUTPUT_TYPE}} based on these requirements:\n\n{{REQUIREMENTS}}\n\nBe thorough and include:\n- All edge cases you can identify\n- Clear comments or explanations\n- Any assumptions you are making",
      },
      {
        order: 2,
        model: "Model B (Reviewer)",
        action:
          "Review the generated output critically. Identify bugs, logical errors, style issues, missed requirements, and suggest improvements.",
        handoffPrompt:
          "Review the following {{OUTPUT_TYPE}} critically. The original requirements were:\n\n{{REQUIREMENTS}}\n\nHere is the output to review:\n\n{{GENERATED_OUTPUT}}\n\nProvide:\n1. A list of bugs or errors found\n2. Missed requirements or edge cases\n3. Style or best-practice improvements\n4. An overall quality assessment (1-10)\n5. A corrected version if issues were found",
      },
    ],
    benefits: [
      "Catches errors that a single model would miss",
      "Different models have different blind spots — combining them improves quality",
      "Mimics proven human workflows (author/editor, dev/reviewer)",
      "Review model can be cheaper than generation model to save costs",
    ],
    limitations: [
      "Two API calls increase latency and cost",
      "Review model may introduce false positives or unnecessary changes",
      "Works best when generation and review criteria are clearly defined",
      "Diminishing returns if both models have the same weaknesses",
    ],
    difficulty: "beginner",
    estimatedTimeSaving: "30-50% compared to manual review cycles",
    tags: ["code-review", "quality", "writing", "validation"],
  },
  {
    id: "parallel-analysis",
    number: 3,
    name: "Parallel Analysis",
    subtitle: "Same prompt to 2-3 models → compare → synthesize",
    description:
      "Send the same prompt to multiple models in parallel, then compare their outputs to find consensus, identify disagreements, and synthesize a superior final answer. Especially powerful for complex or ambiguous questions where no single model reliably gets it right.",
    useCases: [
      "Complex architectural decisions where multiple perspectives help",
      "Fact-checking claims by cross-referencing model outputs",
      "Brainstorming where diverse ideas are valuable",
      "Legal or compliance analysis requiring high confidence",
    ],
    steps: [
      {
        order: 1,
        model: "Multiple Models (Parallel)",
        action:
          "Send the identical prompt to 2-3 different models simultaneously. Collect all responses.",
        handoffPrompt:
          "{{ORIGINAL_PROMPT}}\n\nPlease provide a detailed, well-structured response. Include your reasoning process and confidence level for key claims.",
      },
      {
        order: 2,
        model: "Synthesis Model (Claude recommended)",
        action:
          "Compare all responses, identify areas of agreement and disagreement, and produce a synthesized final answer that takes the best from each.",
        handoffPrompt:
          "I sent the following prompt to multiple AI models:\n\n{{ORIGINAL_PROMPT}}\n\nHere are their responses:\n\n**Model A ({{MODEL_A_NAME}}):**\n{{MODEL_A_RESPONSE}}\n\n**Model B ({{MODEL_B_NAME}}):**\n{{MODEL_B_RESPONSE}}\n\n**Model C ({{MODEL_C_NAME}}):**\n{{MODEL_C_RESPONSE}}\n\nPlease:\n1. Identify points of agreement across all models\n2. Highlight disagreements and assess which model is most likely correct\n3. Note any unique insights from individual models\n4. Synthesize a final, superior answer that combines the best elements",
      },
    ],
    benefits: [
      "Higher confidence through consensus across models",
      "Surfaces blind spots unique to individual models",
      "Produces a richer final answer by combining diverse perspectives",
      "Especially valuable for high-stakes decisions",
    ],
    limitations: [
      "3x or more cost compared to a single model call",
      "Requires a system to run parallel calls and aggregate results",
      "Synthesis step adds complexity and latency",
      "Diminishing returns beyond 3 models for most tasks",
    ],
    difficulty: "intermediate",
    estimatedTimeSaving: "20-40% compared to manual multi-perspective analysis",
    tags: ["analysis", "consensus", "fact-checking", "brainstorming", "comparison"],
  },
  {
    id: "specialist-pipeline",
    number: 4,
    name: "Specialist Pipeline",
    subtitle: "Chain models by strengths",
    description:
      "Build a pipeline where each stage uses the model best suited for that specific task. For example, one model for planning, another for coding, another for testing, and another for documentation. Each model's output becomes the next model's input.",
    useCases: [
      "Full-stack feature development (plan → code → test → document)",
      "Content creation pipelines (outline → draft → edit → SEO optimize)",
      "Data processing (extract → transform → analyze → visualize)",
      "Product development (requirements → design → implementation → QA)",
    ],
    steps: [
      {
        order: 1,
        model: "Planning Model (e.g., Claude or o1)",
        action:
          "Break down the task into a detailed plan with clear specifications for each stage. Define inputs, outputs, and acceptance criteria.",
        handoffPrompt:
          "Create a detailed implementation plan for: {{TASK_DESCRIPTION}}\n\nBreak this into discrete stages. For each stage specify:\n- Input requirements\n- Expected output format\n- Acceptance criteria\n- Potential risks or blockers",
      },
      {
        order: 2,
        model: "Implementation Model (e.g., Claude for code, GPT-4 for prose)",
        action:
          "Execute the plan stage by stage, using the model best suited for each type of work.",
        handoffPrompt:
          "Implement stage {{STAGE_NUMBER}} of the following plan:\n\n{{PLAN}}\n\nInput from previous stage:\n{{PREVIOUS_OUTPUT}}\n\nFollow the acceptance criteria exactly. Flag any deviations or issues encountered.",
      },
      {
        order: 3,
        model: "Quality Assurance Model",
        action:
          "Review the combined output against the original plan. Verify all acceptance criteria are met. Produce a final quality report.",
        handoffPrompt:
          "Review the following implementation against its plan:\n\nOriginal Plan:\n{{PLAN}}\n\nImplementation Output:\n{{IMPLEMENTATION}}\n\nVerify:\n1. All acceptance criteria are met\n2. Stages connect properly (outputs match expected inputs)\n3. No quality gaps or missing pieces\n4. Provide a pass/fail assessment with specific feedback",
      },
      {
        order: 4,
        model: "Documentation Model (e.g., Claude)",
        action:
          "Produce final documentation, README, or user-facing content based on the implementation.",
        handoffPrompt:
          "Based on the following implementation and QA report, produce {{DOCUMENTATION_TYPE}}:\n\nImplementation:\n{{IMPLEMENTATION}}\n\nQA Report:\n{{QA_REPORT}}\n\nEnsure documentation is clear, complete, and addresses any caveats noted in the QA report.",
      },
    ],
    benefits: [
      "Each model operates in its area of highest competence",
      "Pipeline structure makes the workflow repeatable and automatable",
      "Clear handoff points make debugging easier",
      "Can swap individual models without redesigning the whole workflow",
    ],
    limitations: [
      "Complex to set up and maintain",
      "Errors in early stages cascade through the pipeline",
      "Requires understanding of each model's relative strengths",
      "Higher total cost and latency due to multiple sequential calls",
    ],
    difficulty: "advanced",
    estimatedTimeSaving: "50-70% compared to doing all stages manually",
    tags: ["pipeline", "automation", "development", "multi-stage", "specialization"],
  },
  {
    id: "cost-optimized",
    number: 5,
    name: "Cost-Optimized Routing",
    subtitle: "Route by complexity",
    description:
      "Classify incoming tasks by complexity and route them to the most cost-effective model capable of handling them. Simple tasks go to fast, cheap models; complex tasks go to powerful, expensive models. This can reduce costs by 60-80% without sacrificing quality where it matters.",
    useCases: [
      "High-volume customer support with varying question difficulty",
      "Processing batches of mixed-complexity coding tasks",
      "Content moderation with escalation for edge cases",
      "API-powered applications where cost scales with usage",
    ],
    steps: [
      {
        order: 1,
        model: "Router Model (fast/cheap, e.g., GPT-4o-mini or Haiku)",
        action:
          "Classify the incoming task by complexity: simple, moderate, or complex. Route to the appropriate model tier.",
        handoffPrompt:
          'Classify the following task into exactly one complexity level:\n- SIMPLE: Straightforward, factual, single-step tasks (e.g., formatting, simple Q&A, translation)\n- MODERATE: Multi-step tasks requiring some reasoning (e.g., summarization, code explanation, short writing)\n- COMPLEX: Tasks requiring deep reasoning, creativity, or expertise (e.g., architecture design, novel code, nuanced analysis)\n\nTask: {{TASK}}\n\nRespond with ONLY the classification: SIMPLE, MODERATE, or COMPLEX.',
      },
      {
        order: 2,
        model: "Tier-Appropriate Model",
        action:
          "Execute the task using the model matched to its complexity tier. Simple → Haiku/GPT-4o-mini ($), Moderate → Sonnet/GPT-4o ($$), Complex → Opus/o1 ($$$).",
        handoffPrompt: "{{ORIGINAL_TASK_PROMPT}}",
      },
      {
        order: 3,
        model: "Quality Check (optional, use Router Model)",
        action:
          "Quickly verify the output meets a minimum quality bar. Escalate to a higher-tier model if the response is insufficient.",
        handoffPrompt:
          'Evaluate whether the following response adequately addresses the task.\n\nTask: {{TASK}}\nResponse: {{RESPONSE}}\n\nRate as PASS or FAIL. If FAIL, briefly explain why.\n\nRespond with ONLY: PASS or FAIL: <reason>',
      },
    ],
    benefits: [
      "60-80% cost reduction on mixed-complexity workloads",
      "Simple tasks are answered faster by lighter models",
      "Complex tasks still receive top-tier model quality",
      "Scalable pattern for high-volume applications",
    ],
    limitations: [
      "Router model may misclassify tasks, leading to quality issues",
      "Requires initial calibration of complexity thresholds",
      "Adds routing latency (though usually minimal)",
      "Need to maintain prompt compatibility across model tiers",
    ],
    difficulty: "intermediate",
    estimatedTimeSaving: "60-80% cost reduction; 10-30% latency reduction for simple tasks",
    tags: ["cost", "routing", "optimization", "scaling", "efficiency"],
  },
  {
    id: "cross-validation",
    number: 6,
    name: "Cross-Validation Loop",
    subtitle: "Model A writes → Model B reviews → Model A fixes",
    description:
      "A three-step loop where one model generates output, a different model reviews and critiques it, and the original model revises based on the feedback. This creates a tight feedback loop that consistently improves quality, similar to a human revision cycle.",
    useCases: [
      "Producing high-quality code that needs to be robust and well-tested",
      "Writing critical content like legal documents or technical specifications",
      "Solving complex problems where the first attempt is rarely optimal",
      "Generating and iteratively improving creative content",
    ],
    steps: [
      {
        order: 1,
        model: "Model A (Author)",
        action:
          "Generate the initial output. Focus on meeting all requirements and being as thorough as possible.",
        handoffPrompt:
          "{{TASK_PROMPT}}\n\nProvide your best, most thorough response. After your response, list any areas where you are uncertain or where the output could be improved.",
      },
      {
        order: 2,
        model: "Model B (Critic)",
        action:
          "Critically review the output from Model A. Provide specific, actionable feedback organized by severity.",
        handoffPrompt:
          "You are a critical reviewer. Review the following output and provide detailed feedback.\n\nOriginal Task:\n{{TASK_PROMPT}}\n\nOutput to Review:\n{{MODEL_A_OUTPUT}}\n\nProvide feedback in these categories:\n1. **Critical Issues** — Errors, bugs, or incorrect information that must be fixed\n2. **Improvements** — Changes that would meaningfully improve quality\n3. **Minor Suggestions** — Nice-to-have polish items\n4. **What Was Done Well** — Positive aspects to preserve\n\nBe specific and reference exact locations in the output.",
      },
      {
        order: 3,
        model: "Model A (Reviser)",
        action:
          "Revise the original output based on Model B's feedback. Address all critical issues and improvements. Note which suggestions were incorporated.",
        handoffPrompt:
          "You previously generated the following output:\n\n{{MODEL_A_OUTPUT}}\n\nA reviewer provided this feedback:\n\n{{MODEL_B_FEEDBACK}}\n\nPlease revise your output:\n1. Fix ALL critical issues identified\n2. Incorporate improvement suggestions where you agree\n3. Address or explain minor suggestions\n4. Preserve the aspects noted as done well\n5. At the end, provide a brief changelog of what you modified and why",
      },
    ],
    benefits: [
      "Consistently produces higher quality than single-pass generation",
      "Feedback loop catches errors the original model is blind to",
      "Final changelog provides transparency on what was improved",
      "Mimics the proven human practice of iterative revision",
    ],
    limitations: [
      "Three API calls make this the most expensive single-task pattern",
      "Total latency is 3x a single call at minimum",
      "Critic model may give unhelpful or contradictory feedback",
      "Revision model may overcorrect or lose good aspects of the original",
    ],
    difficulty: "intermediate",
    estimatedTimeSaving: "30-50% compared to manual revision cycles",
    tags: ["quality", "revision", "feedback-loop", "code", "writing", "iterative"],
  },
];

export const decisionTree: DecisionNode[] = [
  {
    id: "start",
    question: "What's the primary nature of your task?",
    options: [
      { label: "Research & Information Gathering", nextNodeId: "research" },
      { label: "Coding & Development", nextNodeId: "coding" },
      { label: "Writing & Content Creation", nextNodeId: "writing" },
      { label: "Analysis & Decision Making", nextNodeId: "analysis" },
    ],
  },
  {
    id: "research",
    question: "Do you need real-time web information?",
    options: [
      { label: "Yes, I need current/live data", nextNodeId: "research-realtime" },
      {
        label: "No, the topic is well-established",
        recommendation: {
          model: "Claude",
          reason:
            "Claude excels at synthesizing and explaining well-established topics with nuance and clarity, without needing web access.",
          alternatives: ["GPT-4o", "Gemini Pro"],
        },
      },
    ],
  },
  {
    id: "research-realtime",
    question: "How comprehensive does the research need to be?",
    options: [
      {
        label: "Deep dive — I need thorough, multi-source research",
        recommendation: {
          model: "Gemini Deep Research → Claude",
          reason:
            "Use Pattern #1: Gemini Deep Research gathers comprehensive, sourced information; Claude synthesizes it into your final deliverable.",
          alternatives: ["Perplexity Pro → Claude", "ChatGPT with browsing → Claude"],
        },
      },
      {
        label: "Quick lookup — just need a few current facts",
        recommendation: {
          model: "Perplexity or ChatGPT with browsing",
          reason:
            "For quick factual lookups with sources, Perplexity or ChatGPT with browsing are fast and cost-effective without needing a full pipeline.",
          alternatives: ["Gemini with Google Search", "Bing Chat"],
        },
      },
      {
        label: "Moderate — need solid coverage but not exhaustive",
        recommendation: {
          model: "Gemini Pro with Search → Claude",
          reason:
            "Gemini with built-in search provides good web-grounded answers. Hand off to Claude if you need the results restructured or implemented.",
          alternatives: ["Perplexity → Claude", "ChatGPT with browsing"],
        },
      },
    ],
  },
  {
    id: "coding",
    question: "What type of coding task?",
    options: [
      {
        label: "Building a new feature or module from scratch",
        recommendation: {
          model: "Claude",
          reason:
            "Claude produces clean, well-structured code with strong architectural sensibility. Excellent at generating complete, working implementations from requirements.",
          alternatives: ["GPT-4o", "Gemini Pro"],
        },
      },
      {
        label: "Debugging or fixing existing code",
        recommendation: {
          model: "Claude → GPT-4o (Pattern #6: Cross-Validation)",
          reason:
            "Use the Cross-Validation Loop: Claude analyzes the bug and proposes a fix, GPT-4o reviews the fix for correctness, Claude applies the revision. Catches edge cases a single model might miss.",
          alternatives: ["Claude standalone", "GPT-4o standalone"],
        },
      },
      {
        label: "Code review or refactoring",
        recommendation: {
          model: "Pattern #2: Generate & Review with Claude + GPT-4o",
          reason:
            "Two models reviewing from different perspectives catch more issues. One model refactors, the other reviews the refactoring for regressions or missed improvements.",
          alternatives: ["Claude standalone", "GPT-4o standalone"],
        },
      },
      {
        label: "Complex algorithmic or architectural problem",
        recommendation: {
          model: "Pattern #3: Parallel Analysis with Claude + GPT-4o + Gemini",
          reason:
            "Complex problems benefit from multiple perspectives. Send to all three models in parallel, then synthesize the best approach from their combined reasoning.",
          alternatives: ["o1-preview for deep reasoning", "Claude standalone"],
        },
      },
    ],
  },
  {
    id: "writing",
    question: "What kind of writing?",
    options: [
      {
        label: "Technical documentation or tutorials",
        recommendation: {
          model: "Pattern #1: Gemini Deep Research → Claude",
          reason:
            "Research ensures technical accuracy with current information; Claude produces clear, well-structured documentation that developers love.",
          alternatives: ["Claude standalone", "GPT-4o for simpler docs"],
        },
      },
      {
        label: "Creative or marketing content",
        recommendation: {
          model: "Pattern #6: Claude writes → GPT-4o reviews → Claude revises",
          reason:
            "Claude's writing is strong out of the gate. GPT-4o's review catches tone or engagement issues. The revision pass polishes the final piece.",
          alternatives: ["GPT-4o → Claude review", "Claude standalone"],
        },
      },
      {
        label: "High-stakes business or legal writing",
        recommendation: {
          model: "Pattern #3: Parallel Analysis with Claude + GPT-4o",
          reason:
            "For high-stakes content, getting multiple model perspectives and synthesizing the best version reduces risk of errors or omissions significantly.",
          alternatives: [
            "Pattern #6: Cross-Validation Loop",
            "Claude standalone with careful prompting",
          ],
        },
      },
    ],
  },
  {
    id: "analysis",
    question: "What are you analyzing?",
    options: [
      {
        label: "Data, metrics, or quantitative information",
        recommendation: {
          model: "Claude with Code Interpreter or GPT-4o with Code Interpreter",
          reason:
            "Code interpreter models can run actual calculations, generate charts, and verify quantitative claims — far more reliable than text-only analysis for numerical work.",
          alternatives: ["Pattern #3: Parallel Analysis for critical decisions"],
        },
      },
      {
        label: "A business decision or strategy",
        recommendation: {
          model: "Pattern #3: Parallel Analysis with Claude + GPT-4o + Gemini",
          reason:
            "Strategic decisions benefit enormously from diverse perspectives. Each model brings different reasoning patterns and identifies different risks and opportunities.",
          alternatives: ["Claude standalone", "Pattern #1 if market research is needed"],
        },
      },
      {
        label: "Code or system architecture",
        recommendation: {
          model: "Claude",
          reason:
            "Claude excels at understanding complex systems, reasoning about architecture trade-offs, and providing structured analysis of codebases.",
          alternatives: ["Pattern #2: Claude analyzes, GPT-4o reviews"],
        },
      },
      {
        label: "Text, documents, or qualitative content",
        recommendation: {
          model: "Claude",
          reason:
            "Claude handles long documents exceptionally well with its large context window and produces nuanced, well-organized qualitative analysis.",
          alternatives: ["GPT-4o", "Gemini Pro for very long documents"],
        },
      },
    ],
  },
];

export const integrationGuides: IntegrationGuide[] = [
  {
    id: "vscode",
    platform: "VS Code",
    icon: "vscode",
    prerequisites: [
      "VS Code 1.80 or later installed",
      "At least one AI extension installed (GitHub Copilot, Continue, Cody, or Aider)",
      "API keys for the models you plan to use (OpenAI, Anthropic, Google)",
      "Node.js 18+ for any custom scripting or extensions",
    ],
    steps: [
      {
        title: "Install and configure multiple AI extensions",
        instruction:
          "Install Continue (open-source, multi-model) from the VS Code marketplace. Configure it to connect to Claude, GPT-4o, and Gemini by adding your API keys in the Continue configuration file.",
        codeSnippet: `// ~/.continue/config.json
{
  "models": [
    {
      "title": "Claude Sonnet",
      "provider": "anthropic",
      "model": "claude-sonnet-4-20250514",
      "apiKey": "YOUR_ANTHROPIC_KEY"
    },
    {
      "title": "GPT-4o",
      "provider": "openai",
      "model": "gpt-4o",
      "apiKey": "YOUR_OPENAI_KEY"
    },
    {
      "title": "Gemini Pro",
      "provider": "google",
      "model": "gemini-pro",
      "apiKey": "YOUR_GOOGLE_KEY"
    }
  ]
}`,
        language: "json",
      },
      {
        title: "Set up model switching keybindings",
        instruction:
          "Create keybindings that let you quickly switch between models or send the same prompt to multiple models. This enables Pattern #2 (Generate & Review) and Pattern #3 (Parallel Analysis) directly in your editor.",
        codeSnippet: `// keybindings.json
[
  {
    "key": "ctrl+shift+1",
    "command": "continue.switchModel",
    "args": { "model": "Claude Sonnet" }
  },
  {
    "key": "ctrl+shift+2",
    "command": "continue.switchModel",
    "args": { "model": "GPT-4o" }
  },
  {
    "key": "ctrl+shift+3",
    "command": "continue.switchModel",
    "args": { "model": "Gemini Pro" }
  }
]`,
        language: "json",
      },
      {
        title: "Create workflow snippets for collaboration patterns",
        instruction:
          "Set up VS Code snippets that insert pre-built handoff prompts for each collaboration pattern. This lets you trigger Pattern #6 (Cross-Validation) with a snippet that includes the review prompt template.",
        codeSnippet: `// .vscode/ai-patterns.code-snippets
{
  "Cross-Validation Review": {
    "prefix": "ai-review",
    "body": [
      "Review the following code critically.",
      "Identify: bugs, edge cases, performance issues, and style problems.",
      "",
      "Code to review:",
      "\`\`\`",
      "$TM_SELECTED_TEXT",
      "\`\`\`",
      "",
      "Provide feedback as: Critical Issues, Improvements, Minor Suggestions."
    ],
    "description": "Pattern #6 review prompt for selected code"
  }
}`,
        language: "json",
      },
      {
        title: "Configure tasks for automated pipelines",
        instruction:
          "Use VS Code tasks to automate multi-model pipelines. Create a task that runs a script sending your prompt to multiple models and collecting results, enabling Pattern #3 (Parallel Analysis) with a single command.",
        codeSnippet: `// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Parallel Analysis",
      "type": "shell",
      "command": "node",
      "args": ["./scripts/parallel-analyze.js", "\${input:prompt}"],
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "prompt",
      "description": "Enter the prompt to send to all models",
      "type": "promptString"
    }
  ]
}`,
        language: "json",
      },
    ],
    commonIssues: [
      {
        problem: "Continue extension shows 'API key invalid' for Anthropic",
        solution:
          "Ensure your API key starts with 'sk-ant-'. Regenerate the key from console.anthropic.com if needed. Also check that your config.json has no trailing commas, which can cause silent parsing failures.",
      },
      {
        problem: "Model responses are slow or timing out in the editor",
        solution:
          "Increase the timeout in Continue settings. For large files, select only the relevant code section rather than sending the entire file. Consider using a lighter model like Haiku for quick iterations.",
      },
    ],
  },
  {
    id: "notion",
    platform: "Notion",
    icon: "notion",
    prerequisites: [
      "Notion account with at least Plus plan (for API access)",
      "Notion API integration created at developers.notion.com",
      "A Make.com or Zapier account for automation (or custom server)",
      "API keys for Claude, GPT-4o, or other models you plan to use",
    ],
    steps: [
      {
        title: "Create a Notion database for AI workflows",
        instruction:
          "Create a Notion database with columns for: Task (title), Prompt (rich text), Model (select: Claude/GPT-4o/Gemini), Pattern (select: all 6 patterns), Status (select: Pending/In Progress/Complete), Input (rich text), Output (rich text), and Review Notes (rich text).",
      },
      {
        title: "Set up the Notion API integration",
        instruction:
          "Go to developers.notion.com, create a new integration, and give it read/write access to your workspace. Share your AI workflows database with the integration. Save the integration token and database ID.",
        codeSnippet: `# Test your Notion API connection
curl -X GET "https://api.notion.com/v1/databases/YOUR_DATABASE_ID" \\
  -H "Authorization: Bearer YOUR_NOTION_TOKEN" \\
  -H "Notion-Version: 2022-06-28" \\
  -H "Content-Type: application/json"`,
        language: "bash",
      },
      {
        title: "Build an automation flow for Generate & Review",
        instruction:
          "Using Make.com (or Zapier), create a flow triggered when a new row is added to your Notion database with status 'Pending'. The flow sends the prompt to Model A, writes the output back, then sends it to Model B for review, and writes the review. Finally, it updates the status to 'Complete'.",
      },
      {
        title: "Add Notion templates for each collaboration pattern",
        instruction:
          "Create Notion template pages for each of the 6 patterns. Each template should have pre-filled prompt structures with placeholder variables, making it easy to kick off a workflow by just filling in the specifics. Include checklists for each step in the pattern.",
      },
    ],
    commonIssues: [
      {
        problem: "Notion API returns 'object not found' when trying to update a page",
        solution:
          "The most common cause is that the database or page has not been shared with your integration. Open the database in Notion, click the '...' menu, go to 'Connections', and add your integration. This must be done for each database you want to access.",
      },
      {
        problem: "Rich text output from AI models exceeds Notion's block character limits",
        solution:
          "Notion has a 2000-character limit per rich text block. Split long AI responses into multiple blocks in your automation. In Make.com, use the Text Aggregator module with a 1900-character chunking function before writing to Notion.",
      },
    ],
  },
  {
    id: "google-workspace",
    platform: "Google Workspace",
    icon: "google",
    prerequisites: [
      "Google Workspace account (Business or Enterprise for full API access)",
      "Google Apps Script enabled for your workspace",
      "Google Cloud project with Vertex AI API or external API keys for models",
      "Basic familiarity with Google Apps Script (JavaScript-based)",
    ],
    steps: [
      {
        title: "Create a Google Apps Script project for AI collaboration",
        instruction:
          "Open Google Sheets or Docs and go to Extensions → Apps Script. Create a new project that will serve as your AI orchestration hub. Set up the script properties with your API keys.",
        codeSnippet: `// In Apps Script: File → Project Settings → Script Properties
// Add these properties:
// ANTHROPIC_API_KEY = your-key
// OPENAI_API_KEY = your-key

function callClaude(prompt) {
  const apiKey = PropertiesService.getScriptProperties()
    .getProperty('ANTHROPIC_API_KEY');
  const response = UrlFetchApp.fetch(
    'https://api.anthropic.com/v1/messages',
    {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      }),
    }
  );
  const json = JSON.parse(response.getContentText());
  return json.content[0].text;
}`,
        language: "javascript",
      },
      {
        title: "Build a Parallel Analysis spreadsheet",
        instruction:
          "Create a Google Sheet with columns: Prompt, Claude Response, GPT-4o Response, Gemini Response, Synthesis. Add a custom menu that triggers a function to send the prompt to all three models and populate the columns. Then use Claude to synthesize the results.",
        codeSnippet: `function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('AI Patterns')
    .addItem('Run Parallel Analysis', 'runParallelAnalysis')
    .addItem('Generate & Review', 'runGenerateReview')
    .addToUi();
}

function runParallelAnalysis() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  const prompt = sheet.getRange(row, 1).getValue();

  const claudeResponse = callClaude(prompt);
  const gptResponse = callGPT4o(prompt);
  const geminiResponse = callGemini(prompt);

  sheet.getRange(row, 2).setValue(claudeResponse);
  sheet.getRange(row, 3).setValue(gptResponse);
  sheet.getRange(row, 4).setValue(geminiResponse);

  // Synthesize
  const synthesisPrompt = \`Compare these three responses and synthesize the best answer:\\n\\nClaude: \${claudeResponse}\\n\\nGPT-4o: \${gptResponse}\\n\\nGemini: \${geminiResponse}\`;
  sheet.getRange(row, 5).setValue(callClaude(synthesisPrompt));
}`,
        language: "javascript",
      },
      {
        title: "Set up Google Docs integration for writing patterns",
        instruction:
          "Create an Apps Script add-on for Google Docs that enables Pattern #6 (Cross-Validation Loop). Select text in a doc, click 'AI Review', and the script sends it to a review model, then presents the feedback in a sidebar.",
      },
      {
        title: "Automate with Google Workspace triggers",
        instruction:
          "Set up time-driven or event-driven triggers to automate workflows. For example, trigger a cost-optimized routing pipeline whenever a new row is added to a task queue sheet, automatically classifying and routing tasks to the appropriate model tier.",
        codeSnippet: `function createTriggers() {
  // Trigger on spreadsheet edit
  ScriptApp.newTrigger('onTaskAdded')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();
}

function onTaskAdded(e) {
  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() !== 'Task Queue') return;
  if (range.getColumn() !== 1) return; // Only trigger on col A

  const task = range.getValue();
  const complexity = classifyComplexity(task);
  const result = routeToModel(task, complexity);

  sheet.getRange(range.getRow(), 2).setValue(complexity);
  sheet.getRange(range.getRow(), 3).setValue(result);
}`,
        language: "javascript",
      },
    ],
    commonIssues: [
      {
        problem: "Apps Script UrlFetchApp times out when calling AI APIs",
        solution:
          "Google Apps Script has a 30-second execution limit per UrlFetchApp call and a 6-minute total script runtime. For long-running AI calls, use the muteHttpExceptions option and implement retry logic. For Pattern #3 with multiple calls, use batch processing or run calls sequentially with intermediate saves.",
      },
      {
        problem: "API responses are truncated in spreadsheet cells",
        solution:
          "Google Sheets cells have a 50,000-character limit. For long AI responses, store the full response in a separate document and link to it from the cell. Alternatively, truncate with a summary and store the full version in Script Properties or a Google Doc.",
      },
    ],
  },
  {
    id: "make-zapier",
    platform: "Make.com / Zapier",
    icon: "automation",
    prerequisites: [
      "Make.com (formerly Integromat) or Zapier account on a paid plan",
      "API keys for Claude (Anthropic), GPT-4o (OpenAI), and/or Gemini (Google)",
      "Trigger source configured (e.g., email, form, Slack, spreadsheet)",
      "Basic understanding of webhook and API concepts",
    ],
    steps: [
      {
        title: "Set up API connections for each model",
        instruction:
          "In Make.com, create HTTP modules for each AI provider. In Zapier, use the 'Webhooks by Zapier' or dedicated OpenAI/Anthropic actions. Store API keys in your platform's connection or secret storage — never hardcode them in scenarios.",
        codeSnippet: `# Make.com HTTP module configuration for Claude
URL: https://api.anthropic.com/v1/messages
Method: POST
Headers:
  x-api-key: {{ANTHROPIC_API_KEY}}
  anthropic-version: 2023-06-01
  Content-Type: application/json
Body:
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 4096,
  "messages": [
    {"role": "user", "content": "{{prompt}}"}
  ]
}`,
        language: "yaml",
      },
      {
        title: "Build the Generate & Review pattern as a scenario",
        instruction:
          "Create a Make.com scenario (or Zapier Zap) that implements Pattern #2. The trigger receives a task, Module 1 sends it to Model A for generation, Module 2 sends the output to Model B for review, and a final module combines and stores the results.",
      },
      {
        title: "Implement the Cost-Optimized Router",
        instruction:
          "Create a scenario that classifies incoming tasks using a cheap model (Haiku or GPT-4o-mini), then uses a Router module to branch to the appropriate model based on the classification. This is Pattern #5 implemented as a visual automation flow.",
        codeSnippet: `# Make.com scenario structure (pseudo-config):
# 1. Trigger: Watch for new tasks (Slack, email, form, etc.)
# 2. HTTP Module: Call GPT-4o-mini to classify SIMPLE/MODERATE/COMPLEX
# 3. Router:
#    Route 1 (SIMPLE)   → HTTP Module: Call Haiku    → Store result
#    Route 2 (MODERATE)  → HTTP Module: Call Sonnet   → Store result
#    Route 3 (COMPLEX)   → HTTP Module: Call Opus     → Store result
# 4. Merge results → Send to output destination`,
        language: "yaml",
      },
      {
        title: "Add error handling and retry logic",
        instruction:
          "AI API calls can fail due to rate limits, timeouts, or server errors. Add error handlers to each HTTP module with retry logic (3 retries with exponential backoff). Set up a fallback route that stores failed tasks for manual processing.",
      },
    ],
    commonIssues: [
      {
        problem: "Make.com scenario fails with 'Rate limit exceeded' from AI APIs",
        solution:
          "Add a Sleep/Delay module (1-2 seconds) between consecutive API calls to the same provider. If processing batches, use Make.com's built-in rate limiting by setting the scenario to process items sequentially rather than in parallel. For Zapier, use delay steps between actions.",
      },
      {
        problem: "JSON parsing errors when extracting AI model responses",
        solution:
          "AI responses are nested in JSON structures. In Make.com, use the Parse JSON module after the HTTP response and map to the correct path (e.g., body.content[0].text for Claude). In Zapier, use a Formatter step to extract the response text. Always add error handling for unexpected response formats.",
      },
    ],
  },
  {
    id: "terminal-cli",
    platform: "Terminal / CLI",
    icon: "terminal",
    prerequisites: [
      "A Unix-like terminal (macOS Terminal, Linux shell, WSL on Windows)",
      "curl or httpie installed for API calls",
      "jq installed for JSON processing (brew install jq or apt install jq)",
      "API keys exported as environment variables",
    ],
    steps: [
      {
        title: "Set up environment variables for API keys",
        instruction:
          "Export your API keys as environment variables in your shell profile. This keeps keys out of your command history and scripts.",
        codeSnippet: `# Add to ~/.bashrc or ~/.zshrc
export ANTHROPIC_API_KEY="sk-ant-your-key-here"
export OPENAI_API_KEY="sk-your-key-here"
export GOOGLE_API_KEY="your-google-key-here"

# Reload your shell
source ~/.bashrc`,
        language: "bash",
      },
      {
        title: "Create shell functions for each model",
        instruction:
          "Add shell functions that wrap API calls to each model. This lets you call any model with a simple command and pipe outputs between them for collaboration patterns.",
        codeSnippet: `# Add to ~/.bashrc or ~/.zshrc
ask_claude() {
  local prompt="$1"
  curl -s https://api.anthropic.com/v1/messages \\
    -H "x-api-key: $ANTHROPIC_API_KEY" \\
    -H "anthropic-version: 2023-06-01" \\
    -H "Content-Type: application/json" \\
    -d "$(jq -n --arg p "$prompt" '{
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [{role: "user", content: $p}]
    }')" | jq -r '.content[0].text'
}

ask_gpt() {
  local prompt="$1"
  curl -s https://api.openai.com/v1/chat/completions \\
    -H "Authorization: Bearer $OPENAI_API_KEY" \\
    -H "Content-Type: application/json" \\
    -d "$(jq -n --arg p "$prompt" '{
      model: "gpt-4o",
      messages: [{role: "user", content: $p}]
    }')" | jq -r '.choices[0].message.content'
}`,
        language: "bash",
      },
      {
        title: "Implement collaboration patterns as shell scripts",
        instruction:
          "Create scripts that chain model calls to implement the collaboration patterns. This example implements Pattern #6 (Cross-Validation Loop) as a reusable shell script.",
        codeSnippet: `#!/bin/bash
# cross-validate.sh — Pattern #6: Cross-Validation Loop

TASK_PROMPT="$1"
if [ -z "$TASK_PROMPT" ]; then
  echo "Usage: ./cross-validate.sh 'your task prompt'"
  exit 1
fi

echo "=== Step 1: Generating with Claude ==="
DRAFT=$(ask_claude "$TASK_PROMPT")
echo "$DRAFT"

echo ""
echo "=== Step 2: Reviewing with GPT-4o ==="
REVIEW_PROMPT="Review this critically. Identify bugs, errors, improvements:\\n\\n$DRAFT"
REVIEW=$(ask_gpt "$REVIEW_PROMPT")
echo "$REVIEW"

echo ""
echo "=== Step 3: Revising with Claude ==="
REVISE_PROMPT="Revise based on this feedback:\\n\\nOriginal:\\n$DRAFT\\n\\nFeedback:\\n$REVIEW"
FINAL=$(ask_claude "$REVISE_PROMPT")
echo "$FINAL"`,
        language: "bash",
      },
      {
        title: "Build a parallel analysis pipeline",
        instruction:
          "Use background processes and wait to send the same prompt to multiple models simultaneously, then synthesize the results. This implements Pattern #3 (Parallel Analysis) with true parallelism.",
        codeSnippet: `#!/bin/bash
# parallel-analyze.sh — Pattern #3: Parallel Analysis

PROMPT="$1"
TMPDIR=$(mktemp -d)

# Run all models in parallel
ask_claude "$PROMPT" > "$TMPDIR/claude.txt" &
ask_gpt "$PROMPT" > "$TMPDIR/gpt.txt" &
wait

CLAUDE_RESP=$(cat "$TMPDIR/claude.txt")
GPT_RESP=$(cat "$TMPDIR/gpt.txt")

# Synthesize with Claude
SYNTH_PROMPT="Compare and synthesize these responses:

Claude: $CLAUDE_RESP

GPT-4o: $GPT_RESP

Identify consensus, disagreements, and produce a final synthesis."

echo "=== Synthesized Result ==="
ask_claude "$SYNTH_PROMPT"

rm -rf "$TMPDIR"`,
        language: "bash",
      },
    ],
    commonIssues: [
      {
        problem: "Special characters in prompts break the curl command or JSON payload",
        solution:
          "Always use jq to construct JSON payloads rather than string interpolation. The jq -n --arg approach properly escapes all special characters including quotes, newlines, and backslashes. If you must use string interpolation, pipe your prompt through jq -Rs first to escape it.",
      },
      {
        problem: "Shell functions truncate long responses or hang indefinitely",
        solution:
          "Add a --max-time flag to curl (e.g., curl --max-time 120) to prevent hanging. For long responses, ensure your terminal buffer is large enough or redirect output to a file. Use the -s (silent) flag on curl to suppress progress bars that can interfere with output parsing.",
      },
    ],
  },
];
