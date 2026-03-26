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

export const workflows: Workflow[] = [
  {
    id: "ai-code-review",
    title: "AI-Powered Code Review Pipeline",
    subtitle: "Use Claude and GPT together for thorough, multi-perspective code reviews",
    description:
      "Combine Claude's precision with GPT-4o's breadth to create a comprehensive code review pipeline. Claude analyzes code for logic errors, security issues, and architectural concerns while GPT-4o provides a second opinion and checks for style, readability, and edge cases. This dual-model approach catches significantly more issues than either model alone.",
    tools: ["Claude Opus 4", "GPT-4o", "Claude Sonnet 4"],
    difficulty: "intermediate",
    totalTime: "30-45 min per review",
    setupTime: "15 min",
    dailyTime: "20-30 min per PR",
    prerequisites: [
      "Access to Claude API and OpenAI API",
      "A git-based codebase with pull request workflow",
      "Basic understanding of code review best practices",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Extract the Diff",
        description:
          "Pull the code diff from your pull request or branch comparison. Format it cleanly with file paths and line numbers for context. Include any related files that the changed code depends on.",
        tool: "Git / GitHub CLI",
        promptTemplate:
          "git diff main...feature-branch --unified=5 > diff.txt",
        tips: [
          "Include surrounding context lines (at least 5) so the model understands the code around changes",
          "For large PRs, split the diff by file or module to stay within context limits",
        ],
        estimatedTime: "2 min",
      },
      {
        stepNumber: 2,
        title: "Deep Logic Review with Claude",
        description:
          "Send the diff to Claude Opus 4 for a thorough analysis of logic correctness, potential bugs, security vulnerabilities, and architectural alignment. Claude excels at reasoning through complex code paths and spotting subtle issues.",
        tool: "Claude Opus 4",
        promptTemplate:
          "You are a senior software engineer performing a code review. Analyze the following diff for: 1) Logic errors or potential bugs, 2) Security vulnerabilities (injection, auth issues, data leaks), 3) Performance concerns, 4) Architectural alignment with the existing codebase. For each issue found, cite the file and line number, explain the problem, and suggest a fix.\n\n```diff\n{diff_content}\n```",
        tips: [
          "Include the project's coding standards or style guide in the system prompt for more relevant feedback",
          "Ask Claude to rate severity (critical, warning, suggestion) for each finding",
        ],
        estimatedTime: "5-8 min",
      },
      {
        stepNumber: 3,
        title: "Style & Edge Case Review with GPT-4o",
        description:
          "Send the same diff to GPT-4o with a focus on code readability, naming conventions, edge cases, and test coverage gaps. Having a second model review the same code surfaces different perspectives and catches issues the first pass might miss.",
        tool: "GPT-4o",
        promptTemplate:
          "Review this code diff as a thoughtful peer reviewer. Focus on: 1) Readability and naming clarity, 2) Edge cases and error handling gaps, 3) Missing test scenarios, 4) Documentation needs, 5) Any patterns that could be simplified. Be specific with file and line references.\n\n```diff\n{diff_content}\n```",
        tips: [
          "Explicitly ask GPT-4o to suggest test cases for untested paths",
          "Request concrete before/after code examples for style improvements",
        ],
        estimatedTime: "5-8 min",
      },
      {
        stepNumber: 4,
        title: "Synthesize & Deduplicate Findings",
        description:
          "Feed both review outputs into Claude Sonnet 4 to merge findings, remove duplicates, prioritize by severity, and produce a single actionable review summary. This step turns two separate reviews into one cohesive document.",
        tool: "Claude Sonnet 4",
        promptTemplate:
          "You have two code review reports for the same PR. Merge them into a single, deduplicated review organized by severity (Critical > Warning > Suggestion). For duplicate findings, keep the better explanation. Output a clean markdown review with sections for each severity level.\n\nReview 1 (Logic & Security):\n{claude_review}\n\nReview 2 (Style & Edge Cases):\n{gpt_review}",
        tips: [
          "Use Sonnet for this step since it is faster and cheaper for synthesis tasks",
          "Add a final section for praise - noting what was done well improves team morale",
        ],
        estimatedTime: "3-5 min",
      },
      {
        stepNumber: 5,
        title: "Post Review & Track Resolution",
        description:
          "Post the synthesized review as PR comments, tagging specific lines where possible. Track which findings get addressed and which are intentionally skipped. Over time, use the resolution patterns to fine-tune your review prompts.",
        tool: "GitHub CLI / PR Platform",
        tips: [
          "Create a lightweight tracking sheet to measure false positive rates per model",
          "Rotate which model does the primary vs secondary review to avoid systematic blind spots",
        ],
        estimatedTime: "5-10 min",
      },
    ],
    pitfalls: [
      "Treating AI reviews as infallible - always have a human make the final call on non-trivial findings",
      "Sending entire large codebases instead of focused diffs, leading to diluted feedback",
      "Not providing enough context about project conventions, causing irrelevant style suggestions",
      "Ignoring false positive patterns instead of updating prompts to reduce them",
    ],
    proTips: [
      "Keep a prompt library of review instructions tuned per language and project type",
      "Track which model catches which types of issues to optimize your pipeline over time",
      "For security-critical code, add a dedicated third pass focused exclusively on OWASP Top 10",
      "Automate the diff extraction and model calls with a CI script to reduce manual steps",
    ],
    tags: ["code-review", "development", "quality", "security", "multi-model"],
    relatedWorkflows: ["bug-triage", "api-design"],
  },
  {
    id: "content-pipeline",
    title: "Content Creation Pipeline",
    subtitle: "Research, write, and polish content using specialized models at each stage",
    description:
      "Build a three-stage content pipeline where Gemini handles web-aware research, Claude drafts long-form content with nuance and consistency, and GPT-4o provides editorial polish. Each model plays to its strengths, producing content that is well-researched, well-written, and well-edited.",
    tools: ["Gemini 2.5 Pro", "Claude Opus 4", "GPT-4o"],
    difficulty: "beginner",
    totalTime: "1-2 hours per piece",
    setupTime: "10 min",
    dailyTime: "45-90 min",
    prerequisites: [
      "Access to Gemini, Claude, and OpenAI APIs",
      "Clear topic or content brief",
      "Target audience and tone guidelines",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Research & Gather Sources",
        description:
          "Use Gemini 2.5 Pro to research the topic thoroughly. Gemini's large context window and web-grounded knowledge make it ideal for gathering facts, statistics, expert opinions, and identifying key angles to cover.",
        tool: "Gemini 2.5 Pro",
        promptTemplate:
          "Research the following topic thoroughly: {topic}\n\nProvide: 1) Key facts and statistics with sources, 2) Main arguments and counterarguments, 3) Expert quotes or notable perspectives, 4) Recent developments (last 6 months), 5) Gaps in common coverage that could make our content unique.\n\nTarget audience: {audience}\nContent type: {format}",
        tips: [
          "Ask Gemini to identify contrarian or underexplored angles for differentiation",
          "Request that sources be cited so you can verify claims before publishing",
        ],
        estimatedTime: "15-20 min",
      },
      {
        stepNumber: 2,
        title: "Draft Long-Form Content",
        description:
          "Feed the research into Claude Opus 4 to produce a comprehensive first draft. Claude excels at maintaining a consistent voice over long outputs and weaving together complex information into a compelling narrative.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Using the research below, write a {format} on \"{topic}\" for {audience}.\n\nTone: {tone}\nLength: {word_count} words\nKey points to cover: {key_points}\n\nResearch material:\n{research_output}\n\nRequirements:\n- Lead with a compelling hook\n- Use concrete examples to illustrate abstract points\n- Include a clear structure with headers\n- End with actionable takeaways",
        tips: [
          "Provide a style reference (a past article you liked) to anchor the tone",
          "Ask Claude to flag any claims from the research that it cannot verify",
        ],
        estimatedTime: "20-30 min",
      },
      {
        stepNumber: 3,
        title: "Editorial Review & Polish",
        description:
          "Send the draft to GPT-4o for editorial review. Ask it to tighten prose, improve transitions, check for logical flow, and suggest stronger headlines or subheadings. GPT-4o is effective at catching awkward phrasing and improving readability.",
        tool: "GPT-4o",
        promptTemplate:
          "Edit the following {format} for clarity, flow, and impact. Specifically:\n1) Tighten any verbose passages\n2) Improve transitions between sections\n3) Strengthen the opening and closing\n4) Flag any claims that seem unsupported\n5) Suggest better headlines/subheadings where appropriate\n\nReturn the edited version with tracked changes (use [EDIT: reason] annotations).\n\n{draft_content}",
        tips: [
          "Ask GPT-4o to provide a readability score estimate and suggest simplifications if needed",
          "Request alternative headline options to A/B test",
        ],
        estimatedTime: "15-20 min",
      },
      {
        stepNumber: 4,
        title: "Final Human Review & Publish",
        description:
          "Review the AI-edited draft yourself, accept or reject suggested changes, verify all facts and sources, add personal anecdotes or brand-specific context that only a human can provide, and publish.",
        tool: "Human Review",
        tips: [
          "Read the piece aloud to catch awkward phrasing that looks fine on screen",
          "Check that the piece still sounds like your brand voice after multiple AI passes",
          "Verify every statistic and linked source before publishing",
        ],
        estimatedTime: "20-30 min",
      },
    ],
    pitfalls: [
      "Publishing AI-generated content without human fact-checking - models can hallucinate statistics",
      "Losing your unique voice by over-relying on AI editing suggestions",
      "Skipping the research phase and asking a single model to both research and write, producing shallow content",
      "Not tailoring prompts to your specific audience, resulting in generic output",
    ],
    proTips: [
      "Create a brand voice document and include it in every writing prompt for consistency",
      "Build a swipe file of great openings, transitions, and CTAs to reference in prompts",
      "For SEO content, include target keywords in the brief and ask the model to incorporate them naturally",
      "Batch research for multiple articles at once to build a content calendar efficiently",
    ],
    tags: ["content", "writing", "marketing", "research", "editing"],
    relatedWorkflows: ["research-synthesis", "documentation"],
  },
  {
    id: "data-analysis",
    title: "Data Analysis Workflow",
    subtitle: "Multi-model approach to data exploration, analysis, and insight generation",
    description:
      "Leverage multiple AI models for a rigorous data analysis workflow. Use Claude for writing analysis code and interpreting statistical results, GPT-4o with Code Interpreter for running computations and generating visualizations, and Gemini for cross-referencing findings with domain knowledge. This multi-model approach reduces single-model bias in interpretation.",
    tools: ["Claude Opus 4", "GPT-4o", "Gemini 2.5 Pro"],
    difficulty: "intermediate",
    totalTime: "1-3 hours per dataset",
    setupTime: "20 min",
    dailyTime: "30-60 min",
    prerequisites: [
      "Dataset in CSV, JSON, or similar structured format",
      "Clear analysis questions or hypotheses",
      "Basic understanding of statistics and data visualization",
      "Access to Claude, OpenAI (with Code Interpreter), and Gemini APIs",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Data Profiling & Question Framing",
        description:
          "Share the dataset schema (column names, types, sample rows) with Claude Opus 4. Ask it to identify data quality issues, suggest cleaning steps, and refine your analysis questions into testable hypotheses.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Here is the schema and a sample of my dataset:\n\n{schema_and_sample}\n\nMy initial questions: {questions}\n\nPlease: 1) Identify potential data quality issues (nulls, outliers, inconsistent formats), 2) Suggest cleaning and preprocessing steps, 3) Refine my questions into specific, testable hypotheses, 4) Recommend appropriate statistical methods for each hypothesis, 5) Suggest what visualizations would best communicate findings.",
        tips: [
          "Share only schema and sample rows, not the full dataset, to save tokens and protect sensitive data",
          "Ask Claude to flag columns that might contain PII so you can handle them appropriately",
        ],
        estimatedTime: "10-15 min",
      },
      {
        stepNumber: 2,
        title: "Run Analysis & Generate Visualizations",
        description:
          "Upload the cleaned dataset to GPT-4o with Code Interpreter. Use the analysis plan from Step 1 to run statistical tests, generate charts, and compute key metrics. Code Interpreter can execute Python directly, producing real outputs.",
        tool: "GPT-4o",
        promptTemplate:
          "I have uploaded a dataset. Please execute the following analysis plan:\n\n{analysis_plan}\n\nFor each hypothesis: 1) Run the specified statistical test, 2) Report p-values and effect sizes, 3) Generate a clear visualization, 4) Summarize the finding in plain language.\n\nUse pandas, matplotlib/seaborn, and scipy. Show your code and outputs.",
        tips: [
          "Ask for both summary statistics and detailed breakdowns (e.g., by segment or time period)",
          "Request that all charts use consistent styling and clear axis labels",
        ],
        estimatedTime: "20-40 min",
      },
      {
        stepNumber: 3,
        title: "Cross-Reference with Domain Knowledge",
        description:
          "Share the statistical findings with Gemini 2.5 Pro and ask it to contextualize results with industry benchmarks, research papers, or domain expertise. This step helps distinguish genuinely interesting findings from expected baseline results.",
        tool: "Gemini 2.5 Pro",
        promptTemplate:
          "Here are statistical findings from our analysis of {dataset_description}:\n\n{findings}\n\nPlease: 1) Compare these results against known industry benchmarks or published research, 2) Identify which findings are surprising vs expected, 3) Suggest potential causal explanations, 4) Flag any findings that might be artifacts of methodology rather than real effects, 5) Recommend follow-up analyses.",
        tips: [
          "Provide industry context so Gemini can make relevant comparisons",
          "Ask for citations to back up benchmark claims",
        ],
        estimatedTime: "15-20 min",
      },
      {
        stepNumber: 4,
        title: "Compile Insights Report",
        description:
          "Feed all outputs back into Claude Opus 4 to produce a cohesive insights report. Include key findings, visualizations, confidence levels, business implications, and recommended next steps.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Compile the following analysis outputs into an executive insights report:\n\nStatistical Results: {stats_results}\nVisualizations: {chart_descriptions}\nDomain Context: {domain_context}\n\nStructure the report as: 1) Executive Summary (3-5 bullet points), 2) Key Findings (with confidence levels), 3) Visualizations with interpretation, 4) Business Implications, 5) Recommended Actions, 6) Limitations and Caveats.",
        tips: [
          "Ask Claude to write for a non-technical audience in the executive summary",
          "Include a methodology section so stakeholders understand how conclusions were reached",
        ],
        estimatedTime: "15-20 min",
      },
    ],
    pitfalls: [
      "Uploading sensitive or PII-containing data to external APIs without proper anonymization",
      "Trusting statistical outputs without sanity-checking the underlying code and methodology",
      "Confusing correlation with causation in the insights report",
      "Over-relying on a single model's interpretation without cross-referencing",
    ],
    proTips: [
      "Always anonymize datasets before sending to any AI API - strip names, emails, and identifying info",
      "Ask each model to explicitly state assumptions and limitations of its analysis",
      "For recurring analyses, save the prompt chain as a template to ensure consistency over time",
      "Run the same statistical question through two models independently and compare answers to catch errors",
    ],
    tags: ["data", "analysis", "statistics", "visualization", "reporting"],
    relatedWorkflows: ["research-synthesis"],
  },
  {
    id: "research-synthesis",
    title: "Research Synthesis",
    subtitle: "Use Gemini for broad research and Claude for deep synthesis and insight extraction",
    description:
      "Tackle complex research questions by pairing Gemini 2.5 Pro's web-aware, large-context capabilities with Claude Opus 4's superior reasoning and synthesis skills. Gemini casts a wide net to gather diverse sources and perspectives, while Claude distills them into a coherent, nuanced synthesis with original insights.",
    tools: ["Gemini 2.5 Pro", "Claude Opus 4"],
    difficulty: "beginner",
    totalTime: "1-2 hours per topic",
    setupTime: "5 min",
    dailyTime: "30-60 min",
    prerequisites: [
      "Clear research question or topic area",
      "Access to Gemini and Claude APIs",
      "Basic familiarity with the subject area for quality assessment",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Broad Research Sweep",
        description:
          "Use Gemini 2.5 Pro to conduct a comprehensive sweep of the topic. Its large context window and web-grounded training make it excellent for gathering diverse viewpoints, recent developments, and identifying key debates in the field.",
        tool: "Gemini 2.5 Pro",
        promptTemplate:
          "Conduct a comprehensive research sweep on: {research_question}\n\nCover: 1) Historical background and evolution of thinking, 2) Current state of knowledge and consensus views, 3) Active debates and unresolved questions, 4) Key researchers, papers, and institutions, 5) Recent developments in the last 12 months, 6) Adjacent fields that offer relevant insights.\n\nFor each source or claim, indicate your confidence level (high/medium/low) and provide citations where possible.",
        tips: [
          "Ask Gemini to explicitly separate established consensus from emerging or contested ideas",
          "Request a bibliography formatted for easy verification",
        ],
        estimatedTime: "15-25 min",
      },
      {
        stepNumber: 2,
        title: "Identify Gaps & Request Deep Dives",
        description:
          "Review the initial research and identify areas that need deeper exploration. Send follow-up queries to Gemini focusing on the most important gaps, conflicting findings, or underdeveloped angles.",
        tool: "Gemini 2.5 Pro",
        promptTemplate:
          "Based on the initial research on {research_question}, I need deeper coverage on these areas:\n\n{gaps_list}\n\nFor each area: 1) Find the strongest arguments on each side, 2) Identify the best primary sources, 3) Note any methodological concerns with existing research, 4) Highlight any emerging trends that might shift the consensus.",
        tips: [
          "Prioritize depth over breadth in this step - focus on the 2-3 most critical gaps",
          "Ask for opposing viewpoints explicitly to avoid confirmation bias",
        ],
        estimatedTime: "10-15 min",
      },
      {
        stepNumber: 3,
        title: "Synthesize with Claude",
        description:
          "Feed all gathered research into Claude Opus 4 for deep synthesis. Claude excels at finding non-obvious connections between sources, identifying underlying patterns, and producing nuanced arguments that go beyond simple summarization.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Synthesize the following research material on: {research_question}\n\nResearch Material:\n{all_research}\n\nProduce a research synthesis that: 1) Identifies the 3-5 most important themes across all sources, 2) Maps areas of agreement and disagreement, 3) Highlights non-obvious connections between different findings, 4) Assesses the strength of evidence for key claims, 5) Identifies what is still unknown or uncertain, 6) Offers original analytical insights that emerge from considering the full body of evidence.\n\nStructure: Executive Summary → Theme Analysis → Evidence Assessment → Open Questions → Original Insights.",
        tips: [
          "Ask Claude to distinguish between summarizing existing views and offering its own analytical insights",
          "Request explicit confidence levels for each major claim in the synthesis",
        ],
        estimatedTime: "20-30 min",
      },
    ],
    pitfalls: [
      "Accepting AI-gathered sources at face value without verifying key claims and citations",
      "Conflating quantity of sources with quality of evidence",
      "Letting the AI models' training data biases shape the research direction without critical evaluation",
      "Skipping the gap analysis step and settling for a surface-level synthesis",
    ],
    proTips: [
      "Frame research questions as specific hypotheses to get more focused results",
      "Use the two-model approach as a check: if Gemini and Claude reach different conclusions, dig deeper",
      "For academic or high-stakes research, always verify AI-cited papers actually exist and say what the model claims",
      "Build a research template for recurring topic types (market analysis, technical evaluation, policy review) to streamline future projects",
    ],
    tags: ["research", "synthesis", "analysis", "knowledge", "academic"],
    relatedWorkflows: ["content-pipeline", "data-analysis", "product-spec"],
  },
  {
    id: "product-spec",
    title: "Product Spec Creation",
    subtitle: "Transform stakeholder input into polished product specifications with AI-assisted review",
    description:
      "Streamline the product specification process by using Claude to structure raw stakeholder input into a clear spec, GPT-4o to stress-test it with edge cases and questions, and Gemini to validate against market context and competitive landscape. The result is a spec that is thorough, well-challenged, and market-aware.",
    tools: ["Claude Opus 4", "GPT-4o", "Gemini 2.5 Pro"],
    difficulty: "intermediate",
    totalTime: "2-4 hours per spec",
    setupTime: "15 min",
    dailyTime: "1-2 hours",
    prerequisites: [
      "Raw stakeholder input (meeting notes, emails, feature requests)",
      "Access to Claude, OpenAI, and Gemini APIs",
      "Understanding of your product domain and user base",
      "Existing product spec template (recommended but not required)",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Structure Stakeholder Input",
        description:
          "Feed raw stakeholder input into Claude Opus 4 to extract requirements, identify implicit assumptions, and organize everything into a structured spec draft. Claude is excellent at disambiguating vague requests and asking the right clarifying questions.",
        tool: "Claude Opus 4",
        promptTemplate:
          "I have raw stakeholder input for a new feature/product. Transform it into a structured product spec.\n\nRaw Input:\n{stakeholder_input}\n\nProduct Context: {product_context}\n\nCreate a spec with: 1) Problem Statement, 2) User Stories (as a [role], I want [action] so that [benefit]), 3) Functional Requirements (numbered, testable), 4) Non-Functional Requirements (performance, security, scalability), 5) Scope (in-scope vs explicitly out-of-scope), 6) Open Questions that need stakeholder clarification, 7) Assumptions made during structuring.\n\nFlag any conflicting requirements you detect in the raw input.",
        tips: [
          "Include your existing spec template format so Claude matches your team's conventions",
          "Ask Claude to rate each requirement as must-have, should-have, or nice-to-have",
        ],
        estimatedTime: "20-30 min",
      },
      {
        stepNumber: 2,
        title: "Stress-Test with Edge Cases",
        description:
          "Send the structured spec to GPT-4o and ask it to play the role of a skeptical engineer. It should identify edge cases, ambiguities, technical risks, and missing requirements that could cause problems during implementation.",
        tool: "GPT-4o",
        promptTemplate:
          "You are a senior engineer reviewing this product spec before implementation. Your job is to find problems before they become expensive.\n\nSpec:\n{structured_spec}\n\nPlease: 1) List edge cases not covered by the current requirements, 2) Identify ambiguous requirements that could be interpreted multiple ways, 3) Flag technical risks and dependencies, 4) Suggest missing error states and failure modes, 5) Question any assumptions that seem risky, 6) Estimate complexity (S/M/L/XL) for each functional requirement.",
        tips: [
          "Ask GPT-4o to think about accessibility, internationalization, and backward compatibility",
          "Request specific scenarios that could break the feature, not just abstract concerns",
        ],
        estimatedTime: "15-25 min",
      },
      {
        stepNumber: 3,
        title: "Market & Competitive Validation",
        description:
          "Use Gemini 2.5 Pro to validate the spec against competitive landscape and market expectations. Gemini can cross-reference how similar features work in competing products and identify market-driven requirements you might have missed.",
        tool: "Gemini 2.5 Pro",
        promptTemplate:
          "Review this product spec in the context of the competitive landscape:\n\nSpec Summary: {spec_summary}\nProduct: {product_name}\nTarget Market: {target_market}\n\nPlease: 1) How do top 3-5 competitors handle similar functionality? 2) What user expectations has the market established? 3) Are there table-stakes features we are missing? 4) What opportunities exist to differentiate? 5) Are there regulatory or compliance considerations for this market?",
        tips: [
          "Provide specific competitor names if you have them for more targeted analysis",
          "Ask about pricing and packaging patterns for similar features in the market",
        ],
        estimatedTime: "15-20 min",
      },
      {
        stepNumber: 4,
        title: "Revise & Finalize Spec",
        description:
          "Feed all feedback back into Claude Opus 4 to produce the final spec. Incorporate edge cases, resolve ambiguities, add market context, and produce a polished document ready for engineering review.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Revise this product spec based on the engineering review and market analysis feedback:\n\nOriginal Spec: {structured_spec}\nEngineering Feedback: {edge_cases_feedback}\nMarket Analysis: {market_feedback}\n\nProduce a final spec that: 1) Addresses all valid engineering concerns, 2) Resolves ambiguities with specific decisions (note any that need stakeholder input), 3) Incorporates relevant competitive insights, 4) Includes an updated scope and priority list, 5) Adds acceptance criteria for each requirement, 6) Includes a risks and mitigations section.",
        tips: [
          "Have the PM review the final spec before sharing with engineering to ensure business intent is preserved",
          "Include a changelog section showing what was added based on review feedback",
        ],
        estimatedTime: "20-30 min",
      },
    ],
    pitfalls: [
      "Letting AI-generated requirements drift from actual stakeholder intent - always validate with stakeholders",
      "Over-specifying implementation details instead of focusing on what and why",
      "Skipping the stress-test step, leading to expensive requirement changes during development",
      "Treating the AI-generated competitive analysis as definitive without human market knowledge",
    ],
    proTips: [
      "Record stakeholder meetings and feed the transcript directly into Step 1 for maximum fidelity",
      "Maintain a reusable spec template that evolves based on what your team finds most useful",
      "Use the edge cases from Step 2 to pre-populate your QA test plan",
      "Run the competitive validation quarterly even for existing features to stay current",
    ],
    tags: ["product", "specification", "planning", "requirements", "stakeholder"],
    relatedWorkflows: ["research-synthesis", "api-design"],
  },
  {
    id: "bug-triage",
    title: "Bug Triage & Resolution",
    subtitle: "Automated bug analysis, prioritization, and fix suggestion pipeline",
    description:
      "Accelerate your bug triage process by using Claude to analyze bug reports, reproduce steps, and stack traces to identify root causes, classify severity, and suggest fixes. GPT-4o provides a second opinion on tricky bugs. This workflow is especially valuable for teams with large bug backlogs that need systematic triage.",
    tools: ["Claude Opus 4", "GPT-4o", "Claude Sonnet 4"],
    difficulty: "intermediate",
    totalTime: "15-30 min per bug",
    setupTime: "10 min",
    dailyTime: "30-60 min for batch triage",
    prerequisites: [
      "Bug report with reproduction steps and/or stack trace",
      "Access to relevant source code",
      "Access to Claude and OpenAI APIs",
      "Basic understanding of the codebase architecture",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Analyze Bug Report & Stack Trace",
        description:
          "Feed the bug report, stack trace, and relevant code files into Claude Opus 4. Ask it to identify the most likely root cause, classify the bug type, and assess severity based on user impact.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Analyze this bug report and identify the root cause.\n\nBug Report:\n{bug_report}\n\nStack Trace:\n{stack_trace}\n\nRelevant Source Code:\n{source_code}\n\nPlease provide: 1) Most likely root cause (with confidence level), 2) Bug classification (logic error, race condition, null reference, off-by-one, etc.), 3) Severity assessment (critical/high/medium/low) based on: user impact, data integrity risk, frequency, 4) Affected code paths and potential blast radius, 5) Suggested fix approach with code snippet.",
        tips: [
          "Include the full stack trace, not just the top frame - context further down often reveals the real issue",
          "Provide the entire relevant file rather than just the error line for better contextual understanding",
        ],
        estimatedTime: "5-10 min",
      },
      {
        stepNumber: 2,
        title: "Second Opinion on Complex Bugs",
        description:
          "For bugs where the root cause is unclear or the fix is non-trivial, send the same information to GPT-4o for an independent analysis. Comparing two independent analyses dramatically increases confidence in the diagnosis.",
        tool: "GPT-4o",
        promptTemplate:
          "Independently analyze this bug. Do not assume any particular root cause - reason from first principles.\n\nBug Report: {bug_report}\nStack Trace: {stack_trace}\nRelevant Code: {source_code}\n\nProvide: 1) Your top 3 hypotheses for the root cause, ranked by likelihood, 2) What evidence supports or contradicts each hypothesis, 3) What additional information would help narrow it down, 4) Suggested fix for your top hypothesis.",
        tips: [
          "Skip this step for straightforward bugs to save time - use it only when Step 1 gives low confidence",
          "If the two models disagree, that is a signal to investigate more carefully",
        ],
        estimatedTime: "5-10 min",
      },
      {
        stepNumber: 3,
        title: "Generate Fix & Test Plan",
        description:
          "Use Claude Sonnet 4 to generate a concrete fix based on the agreed root cause, along with unit tests that cover the bug scenario and related edge cases. Sonnet is ideal here for its speed and strong code generation capabilities.",
        tool: "Claude Sonnet 4",
        promptTemplate:
          "Generate a fix for this bug and accompanying tests.\n\nRoot Cause: {root_cause}\nAffected File: {file_path}\nCurrent Code:\n{current_code}\n\nProvide: 1) The minimal fix (changed code only), 2) Explanation of why this fix addresses the root cause, 3) Unit test that reproduces the original bug (should fail without fix, pass with fix), 4) 2-3 additional edge case tests related to this code path, 5) Any regression risks to watch for.",
        tips: [
          "Ask for the minimal fix - resist the temptation to refactor while fixing a bug",
          "Ensure the generated tests actually test the failure mode, not just the happy path",
        ],
        estimatedTime: "5-10 min",
      },
    ],
    pitfalls: [
      "Applying AI-suggested fixes without understanding them - always read and comprehend the fix before committing",
      "Skipping the test generation step and deploying fixes without regression coverage",
      "Batch-triaging bugs without verifying that reproduction steps are accurate",
      "Conflating symptoms with root causes - the AI might fix the symptom while the underlying issue persists",
    ],
    proTips: [
      "Build a bug pattern library from resolved issues to speed up future triage",
      "For recurring bug types, create specialized prompts that include common root causes for your stack",
      "Integrate this workflow into your issue tracker with automation to pre-analyze new bugs as they come in",
      "Track AI triage accuracy over time to measure and improve the pipeline",
    ],
    tags: ["debugging", "triage", "bugs", "testing", "development"],
    relatedWorkflows: ["ai-code-review", "api-design"],
  },
  {
    id: "api-design",
    title: "API Design Workflow",
    subtitle: "Design, implement, and validate APIs using AI-assisted best practices",
    description:
      "Design robust APIs by using Claude to draft the API specification based on requirements, GPT-4o to review for RESTful best practices and generate OpenAPI specs, and Claude Sonnet 4 to scaffold implementation code and tests. This workflow ensures APIs are well-designed, well-documented, and well-tested from the start.",
    tools: ["Claude Opus 4", "GPT-4o", "Claude Sonnet 4"],
    difficulty: "advanced",
    totalTime: "2-4 hours per API",
    setupTime: "15 min",
    dailyTime: "1-2 hours",
    prerequisites: [
      "Clear API requirements or user stories",
      "Understanding of your tech stack and existing API patterns",
      "Access to Claude and OpenAI APIs",
      "Familiarity with REST, GraphQL, or your API paradigm of choice",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Design API Contract",
        description:
          "Provide your requirements to Claude Opus 4 and ask it to design the API contract. Claude excels at thinking through resource modeling, endpoint design, and error handling patterns while considering real-world usage scenarios.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Design an API based on these requirements:\n\n{requirements}\n\nExisting API patterns in our system: {existing_patterns}\nTech Stack: {tech_stack}\n\nPlease provide: 1) Resource model (entities and relationships), 2) Endpoint listing with HTTP methods, paths, and descriptions, 3) Request/response schemas for each endpoint (JSON), 4) Authentication and authorization approach, 5) Pagination, filtering, and sorting strategy, 6) Error response format and common error codes, 7) Rate limiting recommendations, 8) Versioning strategy.",
        tips: [
          "Include examples of your existing APIs so the new design is consistent with your conventions",
          "Ask Claude to consider both current requirements and likely future extensions",
        ],
        estimatedTime: "20-30 min",
      },
      {
        stepNumber: 2,
        title: "Review & Generate OpenAPI Spec",
        description:
          "Send the API design to GPT-4o for a best practices review. Ask it to check for RESTful design principles, naming consistency, and completeness, then generate a formal OpenAPI 3.0 specification document.",
        tool: "GPT-4o",
        promptTemplate:
          "Review this API design for best practices and generate an OpenAPI 3.0 spec.\n\nAPI Design:\n{api_design}\n\nReview for: 1) RESTful design principles (proper HTTP methods, status codes, resource naming), 2) Consistency in naming conventions and patterns, 3) Security considerations (auth, input validation, CORS), 4) Performance considerations (N+1 queries, over-fetching), 5) Missing endpoints or error scenarios.\n\nThen generate a complete OpenAPI 3.0 YAML specification with examples for each endpoint.",
        tips: [
          "Ask GPT-4o to include realistic example values in the OpenAPI spec for better documentation",
          "Request that it flag any endpoints that might have N+1 query issues",
        ],
        estimatedTime: "20-30 min",
      },
      {
        stepNumber: 3,
        title: "Scaffold Implementation",
        description:
          "Use Claude Sonnet 4 to generate the implementation scaffolding: route handlers, data validation schemas, database models, and middleware. Sonnet provides fast, high-quality code generation that follows the patterns established in the design phase.",
        tool: "Claude Sonnet 4",
        promptTemplate:
          "Scaffold the API implementation based on this OpenAPI spec.\n\nOpenAPI Spec:\n{openapi_spec}\n\nTech Stack: {tech_stack}\nExisting Code Patterns:\n{code_patterns}\n\nGenerate: 1) Route handlers for each endpoint, 2) Request validation middleware/schemas, 3) Database models/migrations, 4) Service layer with business logic stubs, 5) Error handling middleware, 6) Authentication middleware integration points.",
        tips: [
          "Provide examples of existing route handlers so the generated code matches your project style",
          "Ask for dependency injection patterns to keep the code testable",
        ],
        estimatedTime: "25-35 min",
      },
      {
        stepNumber: 4,
        title: "Generate Test Suite",
        description:
          "Have Claude Sonnet 4 generate a comprehensive test suite covering happy paths, error cases, edge cases, authentication, and validation for each endpoint. Start testing before the implementation is finalized to drive development.",
        tool: "Claude Sonnet 4",
        promptTemplate:
          "Generate a comprehensive API test suite based on this spec and implementation.\n\nOpenAPI Spec: {openapi_spec}\nImplementation: {implementation_code}\nTest Framework: {test_framework}\n\nGenerate tests for: 1) Happy path for each endpoint, 2) Input validation errors (missing fields, wrong types, boundary values), 3) Authentication and authorization (missing token, expired token, insufficient permissions), 4) Edge cases (empty collections, max pagination, concurrent modifications), 5) Error handling (not found, conflict, server errors), 6) Integration test for common multi-step workflows.",
        tips: [
          "Ask for both unit tests and integration tests to cover different abstraction levels",
          "Include performance smoke tests for endpoints that handle large payloads or lists",
        ],
        estimatedTime: "20-30 min",
      },
      {
        stepNumber: 5,
        title: "Documentation & SDK Stubs",
        description:
          "Use the OpenAPI spec and implementation to generate developer-facing documentation, including quickstart guides, authentication instructions, and client SDK stubs for popular languages.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Generate developer documentation for this API.\n\nOpenAPI Spec: {openapi_spec}\n\nCreate: 1) Quick-start guide with curl examples for the 3 most common operations, 2) Authentication guide with code examples, 3) Pagination and filtering guide, 4) Error handling guide with common error scenarios and resolution steps, 5) SDK usage examples in {languages} (using the OpenAPI-generated clients), 6) Rate limiting and best practices guide.",
        tips: [
          "Include runnable code examples that developers can copy-paste to test immediately",
          "Ask for common mistake sections based on the error cases identified in the test suite",
        ],
        estimatedTime: "20-30 min",
      },
    ],
    pitfalls: [
      "Designing the API around your data model instead of around consumer use cases",
      "Skipping the best practices review and shipping inconsistent endpoint patterns",
      "Generating implementation code without adapting it to your project's actual structure and conventions",
      "Trusting generated tests without verifying they actually test meaningful behavior",
    ],
    proTips: [
      "Start with 3-5 user stories and design the API to serve those stories before adding extra endpoints",
      "Keep the OpenAPI spec as the source of truth and regenerate code/docs when it changes",
      "Use contract testing to verify that your implementation matches the spec automatically in CI",
      "Design for evolution: use envelope response formats and include API version headers from day one",
    ],
    tags: ["api", "design", "backend", "rest", "openapi", "testing"],
    relatedWorkflows: ["ai-code-review", "documentation", "product-spec"],
  },
  {
    id: "documentation",
    title: "Documentation Generation",
    subtitle: "Transform codebases into comprehensive, maintainable documentation",
    description:
      "Generate high-quality documentation from your codebase by using Claude to analyze code structure and produce technical documentation, GPT-4o to review for clarity and completeness from a reader's perspective, and Gemini to add contextual examples and cross-references. This workflow bridges the gap between code and understandable documentation.",
    tools: ["Claude Opus 4", "GPT-4o", "Gemini 2.5 Pro"],
    difficulty: "beginner",
    totalTime: "1-3 hours per module",
    setupTime: "10 min",
    dailyTime: "30-60 min",
    prerequisites: [
      "Codebase with reasonably structured code",
      "Access to Claude, OpenAI, and Gemini APIs",
      "Clear understanding of the documentation audience (developers, end users, ops team)",
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Code Analysis & Structure Mapping",
        description:
          "Feed your code module into Claude Opus 4 to produce a structural analysis: public API surface, dependencies, key abstractions, data flow, and architectural decisions. Claude excels at understanding complex code and identifying what matters most for documentation.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Analyze this code module and produce a documentation-ready structural overview.\n\nCode:\n{source_code}\n\nModule purpose: {module_description}\nAudience: {audience}\n\nProvide: 1) Module overview (what it does and why it exists), 2) Public API surface (functions, classes, types with their signatures and purposes), 3) Key architectural decisions and trade-offs, 4) Data flow through the module, 5) Dependencies and integration points, 6) Configuration options and defaults, 7) Known limitations or constraints.",
        tips: [
          "Process one module at a time for better focus and accuracy",
          "Include related type definitions and interfaces even if they are in other files",
        ],
        estimatedTime: "15-25 min",
      },
      {
        stepNumber: 2,
        title: "Generate Documentation Draft",
        description:
          "Use the structural analysis to have Claude Opus 4 produce full documentation including API reference, usage guides, and code examples. Claude can maintain a consistent tone and level of detail throughout long documentation.",
        tool: "Claude Opus 4",
        promptTemplate:
          "Generate comprehensive documentation based on this code analysis.\n\nStructural Analysis:\n{structural_analysis}\n\nSource Code:\n{source_code}\n\nDocumentation Style: {style_guide}\nAudience: {audience}\n\nGenerate: 1) Getting Started section with installation and basic usage, 2) API Reference for each public function/class (params, returns, throws, examples), 3) Common Usage Patterns with real-world code examples, 4) Configuration Guide, 5) Troubleshooting section for common errors, 6) Migration guide notes (if applicable).\n\nEnsure every code example is complete and runnable.",
        tips: [
          "Specify your documentation framework (JSDoc, Sphinx, rustdoc) for proper formatting",
          "Ask for progressive complexity in examples: basic → intermediate → advanced",
        ],
        estimatedTime: "25-35 min",
      },
      {
        stepNumber: 3,
        title: "Review for Clarity & Completeness",
        description:
          "Send the documentation draft to GPT-4o for review from a fresh reader's perspective. A model that did not write the docs is better at spotting assumptions, jargon, and gaps that a reader would stumble on.",
        tool: "GPT-4o",
        promptTemplate:
          "Review this documentation as if you are a developer seeing this module for the first time.\n\nDocumentation:\n{docs_draft}\n\nReview for: 1) Clarity - are there unexplained terms, acronyms, or concepts? 2) Completeness - what questions would a new developer still have? 3) Accuracy - do the examples look correct and runnable? 4) Organization - is information easy to find? 5) Onboarding - could someone new get started within 10 minutes using just these docs?\n\nFor each issue, suggest a specific improvement.",
        tips: [
          "Ask GPT-4o to rate each section on a 1-5 clarity scale to prioritize improvements",
          "Request a list of missing topics that a developer would search for",
        ],
        estimatedTime: "15-20 min",
      },
      {
        stepNumber: 4,
        title: "Enrich with Context & Cross-References",
        description:
          "Use Gemini 2.5 Pro to enrich the documentation with relevant external context: links to related libraries, comparison with similar tools, best practice references, and integration guides for common companion tools.",
        tool: "Gemini 2.5 Pro",
        promptTemplate:
          "Enrich this documentation with external context and cross-references.\n\nDocumentation:\n{reviewed_docs}\nModule: {module_name}\nEcosystem: {ecosystem}\n\nAdd: 1) Links to relevant external resources and tutorials, 2) Comparisons with similar libraries/tools developers might know, 3) Integration guides for commonly paired tools, 4) Best practice references from the ecosystem, 5) Community resources (forums, Discord, Stack Overflow tags).",
        tips: [
          "Verify all external links and references - AI can generate plausible but non-existent URLs",
          "Ask Gemini to note which external references are likely to go stale and need periodic checking",
        ],
        estimatedTime: "10-15 min",
      },
      {
        stepNumber: 5,
        title: "Final Assembly & Quality Check",
        description:
          "Combine all improvements into the final documentation, run a consistency check, ensure all code examples compile or run, and set up a maintenance schedule. Good documentation requires ongoing maintenance, not just initial creation.",
        tool: "Claude Sonnet 4",
        promptTemplate:
          "Assemble the final documentation from these reviewed and enriched materials.\n\nOriginal Draft: {docs_draft}\nClarity Improvements: {clarity_review}\nExternal Context: {enrichments}\n\nProduce the final version ensuring: 1) Consistent formatting and terminology throughout, 2) All code examples use the same style and conventions, 3) Cross-references between sections are correct, 4) Table of contents is accurate, 5) A changelog or last-updated date is included.",
        tips: [
          "Test every code example manually before publishing",
          "Set a calendar reminder to review and update the docs quarterly",
        ],
        estimatedTime: "15-20 min",
      },
    ],
    pitfalls: [
      "Generating documentation once and never updating it - stale docs are worse than no docs",
      "Documenting implementation details instead of usage patterns and intent",
      "Including AI-generated external links without verifying they are real and current",
      "Writing for the wrong audience level - developer docs and user guides need different approaches",
    ],
    proTips: [
      "Set up CI checks that compare public API signatures against documentation to catch drift",
      "Include a 'doc review' step in your PR template so documentation stays current with code changes",
      "Start with the Getting Started guide and expand from there based on actual user questions",
      "Use real support tickets and Stack Overflow questions to identify what documentation is missing or unclear",
    ],
    tags: ["documentation", "technical-writing", "developer-experience", "api-docs"],
    relatedWorkflows: ["content-pipeline", "api-design"],
  },
];

export function getWorkflowById(id: string): Workflow | undefined {
  return workflows.find((w) => w.id === id);
}
