import type { PromptTemplate, PromptCategory } from "@/lib/types/prompt";

export const promptTemplates: PromptTemplate[] = [
  // ─── Software Development ──────────────────────────────────────────────────
  {
    id: "code-review",
    title: "Comprehensive Code Review",
    category: "software-development",
    subcategory: "code-review",
    description: "Get a thorough code review covering correctness, performance, security, and style.",
    prompt: `Review the following code. Analyze it for:

1. **Correctness** — Are there bugs, edge cases, or logical errors?
2. **Performance** — Are there unnecessary computations, N+1 queries, or memory leaks?
3. **Security** — Are there injection risks, improper auth checks, or data exposure?
4. **Readability** — Is the code clear and well-structured? Suggest naming improvements.
5. **Best Practices** — Does it follow {{LANGUAGE}} conventions and idiomatic patterns?

For each issue, provide:
- Severity (critical / warning / suggestion)
- The problematic code snippet
- Your recommended fix with explanation

\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\``,
    variables: [
      { name: "CODE", description: "The code to review", example: "function fetchUser(id) { ... }" },
      { name: "LANGUAGE", description: "Programming language", example: "TypeScript" },
    ],
    recommendedModels: ["claude-opus-4", "claude-sonnet-4", "gpt-4-1"],
    difficulty: "intermediate",
    tags: ["code-review", "security", "performance", "best-practices"],
    tips: [
      "Include surrounding context for better reviews",
      "Specify your team's coding standards if applicable",
    ],
  },
  {
    id: "debug-error",
    title: "Debug Error Message",
    category: "software-development",
    subcategory: "debugging",
    description: "Get step-by-step debugging help for error messages and stack traces.",
    prompt: `I'm encountering the following error in my {{LANGUAGE}} project:

\`\`\`
{{ERROR_MESSAGE}}
\`\`\`

Here's the relevant code:
\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

Environment: {{ENVIRONMENT}}

Please:
1. Explain what this error means in plain language
2. Identify the root cause
3. Provide a fix with explanation
4. Suggest how to prevent this class of error in the future`,
    variables: [
      { name: "ERROR_MESSAGE", description: "The full error message or stack trace", example: "TypeError: Cannot read property 'map' of undefined" },
      { name: "CODE", description: "Relevant code snippet", example: "const items = data.results.map(..." },
      { name: "LANGUAGE", description: "Programming language", example: "JavaScript" },
      { name: "ENVIRONMENT", description: "Runtime environment", example: "Node.js 20, Next.js 15" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "beginner",
    tags: ["debugging", "error-handling", "troubleshooting"],
  },
  {
    id: "write-unit-tests",
    title: "Generate Unit Tests",
    category: "software-development",
    subcategory: "testing",
    description: "Generate comprehensive unit tests with edge cases for your code.",
    prompt: `Write comprehensive unit tests for the following {{LANGUAGE}} code using {{TEST_FRAMEWORK}}.

\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

Requirements:
- Cover all public methods and functions
- Include happy path tests
- Include edge cases (null, empty, boundary values)
- Include error/exception cases
- Use descriptive test names that explain the scenario
- Add brief comments explaining non-obvious test cases
- Aim for >90% code coverage`,
    variables: [
      { name: "CODE", description: "The code to test", example: "class UserService { ... }" },
      { name: "LANGUAGE", description: "Programming language", example: "TypeScript" },
      { name: "TEST_FRAMEWORK", description: "Testing framework to use", example: "Jest with React Testing Library" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4-1", "deepseek-v3"],
    difficulty: "intermediate",
    tags: ["testing", "unit-tests", "tdd", "code-quality"],
  },
  {
    id: "refactor-code",
    title: "Refactor Legacy Code",
    category: "software-development",
    subcategory: "refactoring",
    description: "Modernize and improve legacy code while preserving behavior.",
    prompt: `Refactor the following {{LANGUAGE}} code to improve its quality while preserving all existing behavior.

\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

Focus on:
1. Reducing complexity and improving readability
2. Applying SOLID principles where appropriate
3. Using modern {{LANGUAGE}} features and patterns
4. Improving error handling
5. Adding type safety where missing

For each change:
- Explain WHY you made the change
- Show before/after
- Note any behavioral differences (there should be none)`,
    variables: [
      { name: "CODE", description: "The legacy code to refactor", example: "function processData(data) { ... }" },
      { name: "LANGUAGE", description: "Programming language", example: "Python" },
    ],
    recommendedModels: ["claude-opus-4", "claude-sonnet-4", "o3"],
    difficulty: "advanced",
    tags: ["refactoring", "legacy-code", "clean-code", "solid"],
  },
  {
    id: "api-design",
    title: "Design REST API Endpoints",
    category: "software-development",
    subcategory: "api-design",
    description: "Design RESTful API endpoints with proper patterns and documentation.",
    prompt: `Design a REST API for {{FEATURE_DESCRIPTION}}.

Requirements:
- Follow RESTful conventions
- Include all CRUD operations needed
- Define request/response schemas (JSON)
- Include proper HTTP status codes
- Consider pagination, filtering, and sorting
- Include authentication requirements
- Note any rate limiting considerations

For each endpoint provide:
- HTTP method and path
- Request body/params schema
- Response schema with examples
- Error responses
- Any business logic notes`,
    variables: [
      { name: "FEATURE_DESCRIPTION", description: "What the API should do", example: "A task management system with projects, tasks, and team assignments" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4-1", "gemini-2-5-pro"],
    difficulty: "intermediate",
    tags: ["api-design", "rest", "architecture", "backend"],
  },
  {
    id: "convert-code",
    title: "Convert Code Between Languages",
    category: "software-development",
    subcategory: "conversion",
    description: "Convert code from one programming language to another idiomatically.",
    prompt: `Convert the following {{SOURCE_LANGUAGE}} code to idiomatic {{TARGET_LANGUAGE}}.

\`\`\`{{SOURCE_LANGUAGE}}
{{CODE}}
\`\`\`

Requirements:
- Use {{TARGET_LANGUAGE}} idioms and conventions (don't just transliterate)
- Use the standard library and common packages
- Maintain the same functionality and behavior
- Add type annotations where appropriate
- Handle any language-specific differences (error handling, async patterns, etc.)
- Note any concepts that don't translate directly and how you handled them`,
    variables: [
      { name: "CODE", description: "Source code to convert", example: "async function fetchData() { ... }" },
      { name: "SOURCE_LANGUAGE", description: "Original language", example: "JavaScript" },
      { name: "TARGET_LANGUAGE", description: "Target language", example: "Rust" },
    ],
    recommendedModels: ["claude-opus-4", "claude-sonnet-4", "gpt-4-1"],
    difficulty: "intermediate",
    tags: ["code-conversion", "migration", "polyglot"],
  },

  // ─── Data Analysis ─────────────────────────────────────────────────────────
  {
    id: "eda-analysis",
    title: "Exploratory Data Analysis",
    category: "data-analysis",
    subcategory: "eda",
    description: "Perform comprehensive EDA on a dataset with statistical insights.",
    prompt: `Perform a comprehensive exploratory data analysis on the following dataset.

Dataset description: {{DATASET_DESCRIPTION}}
Columns: {{COLUMNS}}
Sample data:
\`\`\`
{{SAMPLE_DATA}}
\`\`\`

Provide:
1. **Summary Statistics** — mean, median, std, min, max for numeric columns
2. **Distribution Analysis** — skewness, outliers, normality for key variables
3. **Missing Data** — patterns and recommendations for handling
4. **Correlations** — key relationships between variables
5. **Data Quality Issues** — inconsistencies, duplicates, anomalies
6. **Key Insights** — 3-5 notable findings
7. **Python Code** — Complete code using pandas/matplotlib/seaborn to reproduce this analysis`,
    variables: [
      { name: "DATASET_DESCRIPTION", description: "What the dataset contains", example: "E-commerce transactions for Q4 2024" },
      { name: "COLUMNS", description: "Column names and types", example: "order_id (int), amount (float), date (datetime), category (str)" },
      { name: "SAMPLE_DATA", description: "First few rows of data", example: "1, 49.99, 2024-10-01, Electronics" },
    ],
    recommendedModels: ["claude-opus-4", "gemini-2-5-pro", "gpt-4o"],
    difficulty: "intermediate",
    tags: ["eda", "statistics", "pandas", "visualization"],
  },
  {
    id: "sql-query",
    title: "Write Complex SQL Query",
    category: "data-analysis",
    subcategory: "sql",
    description: "Generate optimized SQL queries for complex data retrieval needs.",
    prompt: `Write an optimized SQL query for the following requirement:

**Requirement:** {{REQUIREMENT}}

**Database:** {{DATABASE_TYPE}}

**Schema:**
\`\`\`sql
{{SCHEMA}}
\`\`\`

Please provide:
1. The SQL query with clear formatting and comments
2. Explanation of the approach
3. Performance considerations and suggested indexes
4. Alternative approaches if applicable`,
    variables: [
      { name: "REQUIREMENT", description: "What data you need", example: "Get the top 10 customers by revenue in the last 90 days, including their order count and average order value" },
      { name: "DATABASE_TYPE", description: "Database engine", example: "PostgreSQL 16" },
      { name: "SCHEMA", description: "Relevant table definitions", example: "CREATE TABLE orders (id SERIAL, customer_id INT, amount DECIMAL, created_at TIMESTAMP)" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4o", "deepseek-v3"],
    difficulty: "intermediate",
    tags: ["sql", "database", "query-optimization"],
  },
  {
    id: "data-visualization",
    title: "Create Data Visualization",
    category: "data-analysis",
    subcategory: "visualization",
    description: "Generate code for publication-quality data visualizations.",
    prompt: `Create a {{CHART_TYPE}} visualization for the following data using {{LIBRARY}}.

Data: {{DATA_DESCRIPTION}}

Requirements:
- Publication-quality with proper labels, title, and legend
- Appropriate color scheme (colorblind-friendly)
- Proper axis scaling and formatting
- Clean, minimal design
- Include annotations for key data points
- Make it responsive if web-based

Provide complete, runnable code.`,
    variables: [
      { name: "CHART_TYPE", description: "Type of chart", example: "grouped bar chart with error bars" },
      { name: "LIBRARY", description: "Visualization library", example: "matplotlib + seaborn" },
      { name: "DATA_DESCRIPTION", description: "What the data represents", example: "Monthly revenue by product category for 2024" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "intermediate",
    tags: ["visualization", "charts", "matplotlib", "d3"],
  },
  {
    id: "interpret-results",
    title: "Interpret Analysis Results",
    category: "data-analysis",
    subcategory: "interpretation",
    description: "Get plain-language interpretation of statistical or ML results.",
    prompt: `Interpret the following analysis results for a {{AUDIENCE}} audience.

Results:
\`\`\`
{{RESULTS}}
\`\`\`

Context: {{CONTEXT}}

Please provide:
1. Plain-language summary of what these results mean
2. Key findings and their practical significance
3. Limitations and caveats
4. Recommended next steps
5. How to communicate these findings to stakeholders`,
    variables: [
      { name: "RESULTS", description: "Statistical or ML output", example: "R² = 0.87, p < 0.001, coefficients: ..." },
      { name: "AUDIENCE", description: "Target audience", example: "non-technical executive team" },
      { name: "CONTEXT", description: "Business context", example: "Predicting customer churn for a SaaS company" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "intermediate",
    tags: ["statistics", "interpretation", "communication"],
  },
  {
    id: "clean-dataset",
    title: "Data Cleaning Pipeline",
    category: "data-analysis",
    subcategory: "data-cleaning",
    description: "Generate a complete data cleaning pipeline for messy datasets.",
    prompt: `Create a data cleaning pipeline for the following dataset:

Dataset: {{DATASET_DESCRIPTION}}
Known issues: {{KNOWN_ISSUES}}
Sample problematic rows:
\`\`\`
{{SAMPLE_DATA}}
\`\`\`

Generate Python (pandas) code that:
1. Handles missing values appropriately per column type
2. Standardizes formats (dates, phone numbers, addresses, etc.)
3. Removes or flags duplicates
4. Handles outliers
5. Validates data types and constraints
6. Logs all transformations for auditability
7. Produces a data quality report`,
    variables: [
      { name: "DATASET_DESCRIPTION", description: "Dataset overview", example: "Customer records from CRM export, 50K rows" },
      { name: "KNOWN_ISSUES", description: "Issues you've noticed", example: "Mixed date formats, duplicate emails, negative ages" },
      { name: "SAMPLE_DATA", description: "Example problematic rows", example: "John, 01/15/2024, -3, john@..." },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4o", "deepseek-v3"],
    difficulty: "intermediate",
    tags: ["data-cleaning", "pandas", "etl", "data-quality"],
  },

  // ─── Product Management ────────────────────────────────────────────────────
  {
    id: "write-prd",
    title: "Write Product Requirements Document",
    category: "product-management",
    subcategory: "prd",
    description: "Generate a comprehensive PRD for a new feature or product.",
    prompt: `Write a comprehensive Product Requirements Document (PRD) for: {{FEATURE_NAME}}

Context: {{CONTEXT}}
Target Users: {{TARGET_USERS}}

Include these sections:
1. **Overview** — Problem statement, goals, success metrics
2. **User Stories** — As a [user], I want [action] so that [benefit]
3. **Requirements** — Functional (must-have, nice-to-have) and non-functional
4. **User Flow** — Step-by-step user journey
5. **Edge Cases** — Error states, empty states, boundary conditions
6. **Technical Considerations** — API needs, data model, integrations
7. **Launch Plan** — Rollout phases, feature flags, A/B tests
8. **Metrics** — KPIs to track success
9. **Open Questions** — Things that still need decision`,
    variables: [
      { name: "FEATURE_NAME", description: "Feature or product name", example: "In-app notification center" },
      { name: "CONTEXT", description: "Product context", example: "B2B SaaS project management tool with 10K DAU" },
      { name: "TARGET_USERS", description: "Primary user personas", example: "Project managers and team leads" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "intermediate",
    tags: ["prd", "product-management", "requirements", "planning"],
  },
  {
    id: "user-stories",
    title: "Generate User Stories",
    category: "product-management",
    subcategory: "agile",
    description: "Create well-structured user stories with acceptance criteria.",
    prompt: `Generate user stories for: {{FEATURE_DESCRIPTION}}

For each user story, provide:
- **Story:** As a [specific user role], I want [specific action], so that [clear benefit]
- **Acceptance Criteria:** Given [context], When [action], Then [expected result]
- **Priority:** Must-have / Should-have / Nice-to-have
- **Estimate:** S / M / L / XL
- **Dependencies:** Other stories this depends on
- **Edge Cases:** What could go wrong

Create at least {{COUNT}} user stories covering the full scope of the feature.`,
    variables: [
      { name: "FEATURE_DESCRIPTION", description: "Feature to write stories for", example: "User authentication with social login support" },
      { name: "COUNT", description: "Number of stories", example: "8" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "beginner",
    tags: ["user-stories", "agile", "scrum", "acceptance-criteria"],
  },
  {
    id: "competitive-analysis",
    title: "Competitive Analysis",
    category: "product-management",
    subcategory: "strategy",
    description: "Analyze competitors and identify market opportunities.",
    prompt: `Conduct a competitive analysis for {{PRODUCT}} in the {{MARKET}} market.

Competitors to analyze: {{COMPETITORS}}

For each competitor, analyze:
1. **Product Overview** — Core offering, key features, target market
2. **Pricing** — Plans, pricing model, free tier
3. **Strengths** — What they do well
4. **Weaknesses** — Where they fall short
5. **Market Position** — Brand perception, market share estimate

Then provide:
- **Feature Matrix** — Side-by-side comparison
- **Opportunity Gaps** — Unmet needs in the market
- **Differentiation Strategy** — How to position against them
- **Threats** — Competitive risks to watch`,
    variables: [
      { name: "PRODUCT", description: "Your product", example: "Our AI writing assistant" },
      { name: "MARKET", description: "Target market", example: "AI-powered content creation tools" },
      { name: "COMPETITORS", description: "Competitor names", example: "Jasper, Copy.ai, Writer" },
    ],
    recommendedModels: ["claude-opus-4", "gemini-2-5-pro", "gpt-4o"],
    difficulty: "intermediate",
    tags: ["competitive-analysis", "market-research", "strategy"],
  },
  {
    id: "roadmap-planning",
    title: "Product Roadmap Planning",
    category: "product-management",
    subcategory: "roadmap",
    description: "Create a structured product roadmap with prioritized initiatives.",
    prompt: `Help me create a product roadmap for {{PRODUCT}} for the next {{TIMEFRAME}}.

Current state: {{CURRENT_STATE}}
Goals: {{GOALS}}
Resources: {{RESOURCES}}

Provide:
1. **Themes** — 3-5 strategic themes to organize work
2. **Initiatives** — Key projects under each theme
3. **Prioritization** — RICE score for each initiative
4. **Timeline** — Phased rollout plan
5. **Dependencies** — Cross-team or technical dependencies
6. **Risks** — Key risks and mitigation strategies
7. **Success Metrics** — How to measure each initiative`,
    variables: [
      { name: "PRODUCT", description: "Product name", example: "Analytics dashboard" },
      { name: "TIMEFRAME", description: "Planning horizon", example: "2 quarters (Q3-Q4 2025)" },
      { name: "CURRENT_STATE", description: "Where you are now", example: "MVP launched, 500 users, basic charts only" },
      { name: "GOALS", description: "Key objectives", example: "10x users, enterprise features, self-serve onboarding" },
      { name: "RESOURCES", description: "Team size and constraints", example: "4 engineers, 1 designer, 1 PM" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o"],
    difficulty: "advanced",
    tags: ["roadmap", "strategy", "planning", "prioritization"],
  },

  // ─── Writing & Content ─────────────────────────────────────────────────────
  {
    id: "blog-post",
    title: "Write Technical Blog Post",
    category: "writing-content",
    subcategory: "blog",
    description: "Create a well-structured technical blog post with code examples.",
    prompt: `Write a technical blog post about {{TOPIC}}.

Target audience: {{AUDIENCE}}
Tone: {{TONE}}
Length: {{LENGTH}} words

Structure:
1. **Hook** — Engaging opening that states the problem
2. **Context** — Why this matters, who it affects
3. **Main Content** — Clear explanation with code examples
4. **Practical Application** — Real-world use case or tutorial
5. **Conclusion** — Key takeaways and next steps

Requirements:
- Include 2-3 code examples with explanations
- Use analogies to explain complex concepts
- Include a compelling title and meta description
- Add section headers for scannability`,
    variables: [
      { name: "TOPIC", description: "Blog post topic", example: "Building type-safe APIs with tRPC and Next.js" },
      { name: "AUDIENCE", description: "Target readers", example: "Mid-level frontend developers" },
      { name: "TONE", description: "Writing tone", example: "Conversational but technically rigorous" },
      { name: "LENGTH", description: "Target word count", example: "1500" },
    ],
    recommendedModels: ["claude-opus-4", "claude-sonnet-4", "gpt-4o"],
    difficulty: "intermediate",
    tags: ["blog", "technical-writing", "content-creation"],
  },
  {
    id: "email-draft",
    title: "Draft Professional Email",
    category: "writing-content",
    subcategory: "email",
    description: "Write clear, professional emails for various business contexts.",
    prompt: `Draft a professional email for the following situation:

**Context:** {{CONTEXT}}
**Recipient:** {{RECIPIENT}}
**Goal:** {{GOAL}}
**Tone:** {{TONE}}

Provide:
1. Subject line (compelling but professional)
2. Email body (clear, concise, action-oriented)
3. Appropriate sign-off

Keep it under 200 words. Every sentence should serve a purpose.`,
    variables: [
      { name: "CONTEXT", description: "Situation details", example: "Following up on a proposal sent last week" },
      { name: "RECIPIENT", description: "Who you're emailing", example: "VP of Engineering at a potential client" },
      { name: "GOAL", description: "What you want to achieve", example: "Schedule a demo call next week" },
      { name: "TONE", description: "Email tone", example: "Warm but professional" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4o", "gemini-2-5-flash"],
    difficulty: "beginner",
    tags: ["email", "business-writing", "communication"],
  },
  {
    id: "documentation",
    title: "Write API Documentation",
    category: "writing-content",
    subcategory: "documentation",
    description: "Generate clear API documentation with examples and error handling.",
    prompt: `Write comprehensive documentation for the following API:

\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\`

Include:
1. **Overview** — What this API does and when to use it
2. **Authentication** — How to authenticate
3. **Endpoints** — Each endpoint with method, path, params, response
4. **Code Examples** — In at least 3 languages (curl, Python, JavaScript)
5. **Error Handling** — Common errors and how to resolve them
6. **Rate Limits** — Limits and best practices
7. **Changelog** — Version history format`,
    variables: [
      { name: "CODE", description: "API code or specification", example: "router.get('/users/:id', ...)" },
      { name: "LANGUAGE", description: "Backend language", example: "TypeScript" },
    ],
    recommendedModels: ["claude-opus-4", "claude-sonnet-4", "gpt-4o"],
    difficulty: "intermediate",
    tags: ["documentation", "api-docs", "technical-writing"],
  },
  {
    id: "social-media",
    title: "Social Media Content Pack",
    category: "writing-content",
    subcategory: "social",
    description: "Generate a week's worth of social media content for multiple platforms.",
    prompt: `Create a week of social media content for {{BRAND}} about {{TOPIC}}.

Brand voice: {{VOICE}}
Platforms: Twitter/X, LinkedIn, Instagram caption

For each day provide:
1. **Twitter/X post** (under 280 characters, include relevant hashtags)
2. **LinkedIn post** (professional, 100-200 words, storytelling format)
3. **Instagram caption** (engaging, include emoji, CTA, and hashtags)

Content mix:
- 2 educational posts
- 2 engagement posts (polls, questions)
- 2 value/tips posts
- 1 promotional post`,
    variables: [
      { name: "BRAND", description: "Brand name and description", example: "TechCorp, a B2B SaaS analytics platform" },
      { name: "TOPIC", description: "Content theme", example: "Data-driven decision making" },
      { name: "VOICE", description: "Brand voice", example: "Authoritative but approachable, occasional humor" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4o", "gemini-2-5-flash"],
    difficulty: "beginner",
    tags: ["social-media", "content-marketing", "copywriting"],
  },
  {
    id: "rewrite-improve",
    title: "Rewrite & Improve Text",
    category: "writing-content",
    subcategory: "editing",
    description: "Improve existing text for clarity, engagement, and impact.",
    prompt: `Rewrite the following text to improve it:

\`\`\`
{{TEXT}}
\`\`\`

Goals: {{GOALS}}

Provide 3 versions:
1. **Minimal Edit** — Fix grammar, clarity, and flow while keeping the original voice
2. **Moderate Rewrite** — Restructure for impact, improve word choice, tighten prose
3. **Bold Rewrite** — Reimagine the piece for maximum engagement and clarity

For each version, highlight what changed and why.`,
    variables: [
      { name: "TEXT", description: "Text to improve", example: "Our product helps companies do better..." },
      { name: "GOALS", description: "What to optimize for", example: "More persuasive, clearer value prop, shorter" },
    ],
    recommendedModels: ["claude-opus-4", "claude-sonnet-4", "gpt-4o"],
    difficulty: "beginner",
    tags: ["editing", "rewriting", "copywriting"],
  },

  // ─── Research & Learning ───────────────────────────────────────────────────
  {
    id: "concept-explanation",
    title: "Explain Complex Concept",
    category: "research-learning",
    subcategory: "explanation",
    description: "Get a clear, layered explanation of a complex topic.",
    prompt: `Explain {{CONCEPT}} at three levels of complexity:

1. **ELI5** (Explain Like I'm 5) — Use simple analogies and everyday language
2. **Intermediate** — For someone with basic technical knowledge
3. **Expert** — Precise, technical explanation with proper terminology

For each level, include:
- A relevant analogy or metaphor
- A concrete example
- Common misconceptions to avoid

Related concepts to explore next: [list 3-5 related topics]`,
    variables: [
      { name: "CONCEPT", description: "Topic to explain", example: "How transformer attention mechanisms work" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "beginner",
    tags: ["learning", "explanation", "education"],
  },
  {
    id: "research-summary",
    title: "Research Paper Summary",
    category: "research-learning",
    subcategory: "summarization",
    description: "Summarize and extract key insights from research papers or articles.",
    prompt: `Summarize the following research paper/article:

{{CONTENT}}

Provide:
1. **One-line Summary** — What is this paper about in one sentence?
2. **Key Findings** — 3-5 bullet points of main results
3. **Methodology** — How did they approach the problem?
4. **Significance** — Why does this matter? What's the impact?
5. **Limitations** — What are the caveats or weaknesses?
6. **Practical Implications** — How can this be applied?
7. **Related Work** — What should I read next?
8. **Critical Assessment** — Strengths and weaknesses of the approach`,
    variables: [
      { name: "CONTENT", description: "Paper text or abstract", example: "[paste paper content here]" },
    ],
    recommendedModels: ["claude-opus-4", "gemini-2-5-pro", "gpt-4o"],
    difficulty: "intermediate",
    tags: ["research", "summarization", "academic"],
  },
  {
    id: "learning-path",
    title: "Create Learning Path",
    category: "research-learning",
    subcategory: "learning",
    description: "Design a structured learning path for mastering a new skill.",
    prompt: `Create a structured learning path for mastering {{SKILL}}.

My current level: {{CURRENT_LEVEL}}
Available time: {{TIME_COMMITMENT}}
Learning style: {{LEARNING_STYLE}}

Provide:
1. **Prerequisites** — What I should know first
2. **Phase 1: Foundations** — Core concepts and resources
3. **Phase 2: Applied Learning** — Hands-on projects and exercises
4. **Phase 3: Advanced** — Deep dives and specialization
5. **Phase 4: Mastery** — Real-world projects and contribution

For each phase include:
- Specific resources (courses, books, tutorials)
- Practice exercises
- Milestone projects to validate understanding
- Estimated time to complete`,
    variables: [
      { name: "SKILL", description: "What to learn", example: "Rust programming for systems development" },
      { name: "CURRENT_LEVEL", description: "Starting point", example: "Experienced in Python and JavaScript, new to systems programming" },
      { name: "TIME_COMMITMENT", description: "Weekly hours available", example: "10 hours per week" },
      { name: "LEARNING_STYLE", description: "How you learn best", example: "Project-based, learn by doing" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "beginner",
    tags: ["learning", "education", "career-development"],
  },
  {
    id: "compare-technologies",
    title: "Compare Technologies",
    category: "research-learning",
    subcategory: "comparison",
    description: "Get an objective comparison of technologies for decision-making.",
    prompt: `Compare {{OPTION_A}} vs {{OPTION_B}} for {{USE_CASE}}.

Evaluate on:
1. **Performance** — Speed, scalability, resource usage
2. **Developer Experience** — Learning curve, tooling, debugging
3. **Ecosystem** — Libraries, community, documentation
4. **Production Readiness** — Stability, support, adoption
5. **Cost** — Licensing, hosting, operational costs

Provide:
- Side-by-side comparison table
- Strengths of each for specific scenarios
- When to choose each one
- Migration considerations
- A clear recommendation based on the use case`,
    variables: [
      { name: "OPTION_A", description: "First technology", example: "Next.js" },
      { name: "OPTION_B", description: "Second technology", example: "Remix" },
      { name: "USE_CASE", description: "What you're building", example: "E-commerce platform with 100K daily users" },
    ],
    recommendedModels: ["claude-opus-4", "gemini-2-5-pro", "gpt-4o"],
    difficulty: "intermediate",
    tags: ["comparison", "architecture", "decision-making"],
  },
  {
    id: "deep-dive",
    title: "Deep Dive Research",
    category: "research-learning",
    subcategory: "research",
    description: "Conduct thorough research on a topic with structured findings.",
    prompt: `Conduct a deep dive on {{TOPIC}}.

Research scope: {{SCOPE}}

Provide a structured research brief covering:
1. **Executive Summary** — Key findings in 3-4 sentences
2. **Background** — History, context, and evolution
3. **Current State** — Where things stand today
4. **Key Players** — Major companies, projects, or people
5. **Trends** — Where things are heading
6. **Data Points** — Specific numbers, stats, and benchmarks
7. **Controversies** — Debates, risks, or open questions
8. **Implications** — What this means for {{AUDIENCE}}
9. **Further Reading** — Recommended sources and resources`,
    variables: [
      { name: "TOPIC", description: "Research topic", example: "AI agents in software development" },
      { name: "SCOPE", description: "Research boundaries", example: "Focus on coding agents, not general-purpose AI" },
      { name: "AUDIENCE", description: "Who this is for", example: "Engineering leadership at a mid-size startup" },
    ],
    recommendedModels: ["claude-opus-4", "gemini-2-5-pro", "gpt-4o"],
    difficulty: "advanced",
    tags: ["research", "deep-dive", "analysis"],
  },

  // ─── Business Strategy ─────────────────────────────────────────────────────
  {
    id: "swot-analysis",
    title: "SWOT Analysis",
    category: "business-strategy",
    subcategory: "strategy",
    description: "Perform a comprehensive SWOT analysis for strategic planning.",
    prompt: `Perform a comprehensive SWOT analysis for {{COMPANY_OR_PRODUCT}}.

Context: {{CONTEXT}}
Industry: {{INDUSTRY}}

For each quadrant, provide 5-7 detailed points:

**Strengths** — Internal advantages and core competencies
**Weaknesses** — Internal limitations and areas for improvement
**Opportunities** — External trends and market openings
**Threats** — External risks and competitive pressures

Then provide:
- **SO Strategies** — Use strengths to capture opportunities
- **WO Strategies** — Address weaknesses to capture opportunities
- **ST Strategies** — Use strengths to mitigate threats
- **WT Strategies** — Address weaknesses to minimize threats
- **Top 3 Strategic Priorities** — Most impactful actions to take`,
    variables: [
      { name: "COMPANY_OR_PRODUCT", description: "Subject of analysis", example: "Our AI-powered customer support SaaS" },
      { name: "CONTEXT", description: "Company context", example: "Series A startup, 50 enterprise customers, $3M ARR" },
      { name: "INDUSTRY", description: "Industry sector", example: "Customer support automation / AI SaaS" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "intermediate",
    tags: ["swot", "strategy", "business-analysis"],
  },
  {
    id: "business-plan",
    title: "Business Plan Outline",
    category: "business-strategy",
    subcategory: "planning",
    description: "Create a structured business plan for a new venture or initiative.",
    prompt: `Create a business plan outline for {{BUSINESS_IDEA}}.

Target market: {{TARGET_MARKET}}
Stage: {{STAGE}}

Include:
1. **Executive Summary** — Elevator pitch, mission, vision
2. **Problem & Solution** — Pain point and how you solve it
3. **Market Analysis** — TAM, SAM, SOM with reasoning
4. **Business Model** — Revenue streams, pricing strategy
5. **Go-to-Market** — Launch strategy, channels, first 100 customers
6. **Competitive Landscape** — Competitors and differentiation
7. **Team** — Key roles needed and hiring plan
8. **Financial Projections** — 3-year P&L (revenue, costs, burn rate)
9. **Funding Needs** — Capital requirements and use of funds
10. **Milestones** — Key metrics and timeline for next 18 months`,
    variables: [
      { name: "BUSINESS_IDEA", description: "Business concept", example: "AI-powered legal document review platform" },
      { name: "TARGET_MARKET", description: "Primary market", example: "Small to mid-size law firms (10-100 attorneys)" },
      { name: "STAGE", description: "Company stage", example: "Pre-seed, building MVP" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o"],
    difficulty: "advanced",
    tags: ["business-plan", "startup", "strategy", "fundraising"],
  },
  {
    id: "pricing-strategy",
    title: "Pricing Strategy Analysis",
    category: "business-strategy",
    subcategory: "pricing",
    description: "Develop a data-informed pricing strategy for your product.",
    prompt: `Help me develop a pricing strategy for {{PRODUCT}}.

Current pricing: {{CURRENT_PRICING}}
Target customers: {{CUSTOMERS}}
Key competitors: {{COMPETITORS}}
Cost structure: {{COSTS}}

Analyze:
1. **Value-based pricing** — What is the product worth to customers?
2. **Competitive pricing** — How do competitors price?
3. **Cost-plus pricing** — What margins do we need?
4. **Tiering strategy** — How to structure plans (free, pro, enterprise)
5. **Packaging** — What features go in each tier
6. **Psychological pricing** — Anchoring, decoy pricing
7. **Growth levers** — Usage-based, seat-based, or flat pricing
8. **Recommendation** — Specific pricing with justification`,
    variables: [
      { name: "PRODUCT", description: "Product name and description", example: "Developer analytics platform" },
      { name: "CURRENT_PRICING", description: "Existing pricing if any", example: "$29/mo flat rate, unlimited users" },
      { name: "CUSTOMERS", description: "Customer segments", example: "Solo devs, startups (5-50 devs), enterprises (100+ devs)" },
      { name: "COMPETITORS", description: "Competitor pricing", example: "Competitor A: $49/mo, B: $99/mo per seat" },
      { name: "COSTS", description: "Your cost structure", example: "COGS ~$5/user/mo, fixed costs $15K/mo" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o"],
    difficulty: "advanced",
    tags: ["pricing", "monetization", "business-model", "strategy"],
  },

  // ─── Multi-LLM Workflows ──────────────────────────────────────────────────
  {
    id: "multi-llm-research-write",
    title: "Research → Write Pipeline",
    category: "multi-llm",
    subcategory: "pipeline",
    description: "Use multiple models for research then writing — handoff template included.",
    prompt: `[STEP 1 — Send to Gemini/Perplexity for Research]
Research the following topic thoroughly: "{{TOPIC}}"

Provide a structured research brief including:
- Key findings with specific data points
- Multiple perspectives and viewpoints
- Source references
- Relevant statistics and trends
- Any controversies or debates

[STEP 2 — Send research output + this prompt to Claude/GPT-4]
Using the following research brief, write a {{OUTPUT_TYPE}}:

Research Brief:
[paste Step 1 output here]

Requirements:
- Target audience: {{AUDIENCE}}
- Tone: {{TONE}}
- Length: {{LENGTH}}
- Include specific data points from the research
- Cite sources where appropriate`,
    variables: [
      { name: "TOPIC", description: "Research topic", example: "Impact of AI on software engineering productivity" },
      { name: "OUTPUT_TYPE", description: "What to produce", example: "2000-word blog post" },
      { name: "AUDIENCE", description: "Target audience", example: "CTOs and engineering managers" },
      { name: "TONE", description: "Writing tone", example: "Analytical but accessible" },
      { name: "LENGTH", description: "Target length", example: "2000 words" },
    ],
    recommendedModels: ["gemini-2-5-pro", "claude-opus-4"],
    difficulty: "intermediate",
    tags: ["multi-llm", "research", "writing", "pipeline"],
  },
  {
    id: "multi-llm-code-review",
    title: "Generate → Review Pipeline",
    category: "multi-llm",
    subcategory: "code",
    description: "Use one model to generate code and another to review it.",
    prompt: `[STEP 1 — Send to Claude/GPT-4 for Code Generation]
Write {{LANGUAGE}} code for: {{REQUIREMENT}}

Requirements: {{SPECIFICATIONS}}

[STEP 2 — Send generated code to a different model for Review]
Review the following {{LANGUAGE}} code that was generated by another AI model.

\`\`\`{{LANGUAGE}}
[paste Step 1 output here]
\`\`\`

As a reviewer, identify:
1. Bugs or logical errors the first model missed
2. Security vulnerabilities
3. Performance issues
4. Missing edge cases
5. Code style improvements

Be thorough and skeptical — assume the code may have subtle issues.`,
    variables: [
      { name: "REQUIREMENT", description: "What the code should do", example: "A rate limiter using the token bucket algorithm" },
      { name: "LANGUAGE", description: "Programming language", example: "Go" },
      { name: "SPECIFICATIONS", description: "Technical requirements", example: "Thread-safe, configurable rate and burst, Redis-backed" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4-1", "deepseek-r1"],
    difficulty: "advanced",
    tags: ["multi-llm", "code-generation", "code-review", "quality"],
  },
  {
    id: "multi-llm-consensus",
    title: "Multi-Model Consensus Check",
    category: "multi-llm",
    subcategory: "validation",
    description: "Cross-validate important decisions across multiple models.",
    prompt: `[Send this same prompt to 3 different models, then compare]

I need an expert assessment of: {{QUESTION}}

Context: {{CONTEXT}}

Please provide:
1. Your assessment (be specific and decisive)
2. Confidence level (1-10) with reasoning
3. Key assumptions you're making
4. What could change your assessment
5. Risks of being wrong

[AFTER COLLECTING RESPONSES]
Compare the three model responses. Note:
- Where do they agree? (high confidence conclusions)
- Where do they disagree? (areas needing more investigation)
- Which model provided the most nuanced analysis?
- What's the consensus recommendation?`,
    variables: [
      { name: "QUESTION", description: "The decision or question", example: "Should we migrate from MongoDB to PostgreSQL for our production database?" },
      { name: "CONTEXT", description: "Situation context", example: "50M documents, growing 10% monthly, need better relational queries" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "intermediate",
    tags: ["multi-llm", "decision-making", "validation", "consensus"],
  },
  {
    id: "multi-llm-creative-variation",
    title: "Creative Variations Pipeline",
    category: "multi-llm",
    subcategory: "creative",
    description: "Generate diverse creative options from multiple models for comparison.",
    prompt: `[Send to 3+ different models to get diverse perspectives]

Create {{DELIVERABLE}} for {{CONTEXT}}.

Requirements: {{REQUIREMENTS}}

Be bold and creative. Don't play it safe. I want to see your unique perspective.

[AFTER COLLECTING]
I have {{N}} variations from different AI models. Help me:
1. Identify the strongest elements from each
2. Combine the best parts into a superior version
3. Add any improvements that none of the models thought of`,
    variables: [
      { name: "DELIVERABLE", description: "What to create", example: "5 tagline options for our product launch" },
      { name: "CONTEXT", description: "Project context", example: "Dev tools startup launching a code review AI" },
      { name: "REQUIREMENTS", description: "Creative brief", example: "Memorable, under 8 words, conveys speed + quality" },
      { name: "N", description: "Number of variations", example: "3" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "beginner",
    tags: ["multi-llm", "creative", "brainstorming", "copywriting"],
  },

  // ─── Creative ──────────────────────────────────────────────────────────────
  {
    id: "brainstorm-ideas",
    title: "Structured Brainstorming",
    category: "creative",
    subcategory: "ideation",
    description: "Generate diverse ideas using structured creativity frameworks.",
    prompt: `Help me brainstorm ideas for {{CHALLENGE}}.

Use these frameworks:
1. **SCAMPER** — Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Reverse
2. **Random Connections** — Connect the problem to 3 random domains for unexpected ideas
3. **Constraint Removal** — What would you do with unlimited budget? Zero time pressure? No technical limits?
4. **Inversion** — How would you make this problem WORSE? Now reverse those ideas.

For each framework, generate 3-5 ideas.
Then identify the top 5 ideas overall, rated by:
- Feasibility (1-5)
- Impact (1-5)
- Novelty (1-5)`,
    variables: [
      { name: "CHALLENGE", description: "Problem to brainstorm on", example: "How to improve developer onboarding at our company" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "beginner",
    tags: ["brainstorming", "ideation", "creativity", "innovation"],
  },
  {
    id: "name-generator",
    title: "Product/Feature Name Generator",
    category: "creative",
    subcategory: "naming",
    description: "Generate creative, memorable names for products, features, or projects.",
    prompt: `Generate name ideas for {{THING_TO_NAME}}.

Description: {{DESCRIPTION}}
Values to convey: {{VALUES}}
Constraints: {{CONSTRAINTS}}

Provide 20 name suggestions across these categories:
1. **Descriptive** (5) — Clearly communicates what it does
2. **Abstract** (5) — Evocative, metaphorical, or invented words
3. **Compound** (5) — Combining two words/concepts
4. **Playful** (5) — Fun, memorable, or clever

For each name include:
- Pronunciation guide if non-obvious
- What it evokes/connotes
- Domain availability likelihood (common word = likely taken)
- Potential issues (unintended meanings, cultural considerations)`,
    variables: [
      { name: "THING_TO_NAME", description: "What needs a name", example: "AI-powered code review tool" },
      { name: "DESCRIPTION", description: "What it does", example: "Reviews PRs automatically, catches bugs, suggests improvements" },
      { name: "VALUES", description: "What the name should convey", example: "Speed, intelligence, reliability, developer-friendly" },
      { name: "CONSTRAINTS", description: "Naming constraints", example: "Under 10 characters, easy to spell, .com availability preferred" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o", "gemini-2-5-pro"],
    difficulty: "beginner",
    tags: ["naming", "branding", "creative", "marketing"],
  },
  {
    id: "storytelling",
    title: "Craft a Story",
    category: "creative",
    subcategory: "storytelling",
    description: "Create engaging stories for presentations, pitches, or content.",
    prompt: `Craft a compelling story for {{PURPOSE}}.

Key message: {{MESSAGE}}
Audience: {{AUDIENCE}}
Tone: {{TONE}}

Structure using the story arc:
1. **Hook** — Attention-grabbing opening (first 10 seconds matter)
2. **Setup** — Context and characters the audience can relate to
3. **Conflict** — The problem, challenge, or tension
4. **Journey** — The attempt to solve it, obstacles encountered
5. **Resolution** — How it was solved, the transformation
6. **Takeaway** — The lesson or insight for the audience

Keep it under {{LENGTH}} words. Make it vivid and specific — use names, numbers, and sensory details.`,
    variables: [
      { name: "PURPOSE", description: "Why you need this story", example: "Opening a keynote about developer productivity" },
      { name: "MESSAGE", description: "Core message", example: "The right tools can 10x your output" },
      { name: "AUDIENCE", description: "Who will hear it", example: "Engineering leaders at a tech conference" },
      { name: "TONE", description: "Desired tone", example: "Inspirational with a touch of humor" },
      { name: "LENGTH", description: "Target length", example: "500" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4o"],
    difficulty: "intermediate",
    tags: ["storytelling", "presentation", "narrative", "public-speaking"],
  },

  // ─── Automation ────────────────────────────────────────────────────────────
  {
    id: "regex-generator",
    title: "Generate Regex Pattern",
    category: "automation",
    subcategory: "regex",
    description: "Create and explain regular expressions for text pattern matching.",
    prompt: `Create a regular expression to match: {{DESCRIPTION}}

Examples that should match:
{{MATCH_EXAMPLES}}

Examples that should NOT match:
{{NO_MATCH_EXAMPLES}}

Provide:
1. The regex pattern
2. A step-by-step explanation of each part
3. Test cases with expected results
4. Performance considerations
5. Edge cases to be aware of
6. The pattern in {{LANGUAGE}} syntax with usage example`,
    variables: [
      { name: "DESCRIPTION", description: "What to match", example: "Email addresses from company domains only (.com and .io)" },
      { name: "MATCH_EXAMPLES", description: "Should match these", example: "user@company.com, test@startup.io" },
      { name: "NO_MATCH_EXAMPLES", description: "Should NOT match", example: "invalid@, @company.com, user@site.org" },
      { name: "LANGUAGE", description: "Target language", example: "Python" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4o", "deepseek-v3"],
    difficulty: "intermediate",
    tags: ["regex", "automation", "text-processing"],
  },
  {
    id: "cli-script",
    title: "Generate CLI Script",
    category: "automation",
    subcategory: "scripting",
    description: "Create a well-structured command-line script with error handling.",
    prompt: `Write a {{LANGUAGE}} CLI script that: {{TASK}}

Requirements:
- Proper argument parsing with help text
- Input validation and error handling
- Progress output for long operations
- Dry-run mode for destructive operations
- Logging with configurable verbosity
- Exit codes following conventions (0=success, 1=error)
- Comments explaining non-obvious logic

Make it production-ready and idempotent where possible.`,
    variables: [
      { name: "TASK", description: "What the script should do", example: "Batch resize images in a directory, maintaining aspect ratio" },
      { name: "LANGUAGE", description: "Scripting language", example: "Bash" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4-1", "deepseek-v3"],
    difficulty: "intermediate",
    tags: ["cli", "scripting", "automation", "devops"],
  },
  {
    id: "cron-workflow",
    title: "Design Automated Workflow",
    category: "automation",
    subcategory: "workflow",
    description: "Design an automated workflow with scheduling and error recovery.",
    prompt: `Design an automated workflow for: {{WORKFLOW_DESCRIPTION}}

Current manual process: {{CURRENT_PROCESS}}
Tools available: {{TOOLS}}
Schedule: {{SCHEDULE}}

Provide:
1. **Architecture diagram** (text-based) showing data flow
2. **Implementation steps** with specific tools and configurations
3. **Error handling** — What can go wrong and how to recover
4. **Monitoring** — How to know if it's working or broken
5. **Alerting** — When to notify humans
6. **Rollback plan** — How to undo if something goes wrong
7. **Code snippets** for the key integration points`,
    variables: [
      { name: "WORKFLOW_DESCRIPTION", description: "What to automate", example: "Weekly data pipeline: pull from API, transform, load into warehouse, generate report" },
      { name: "CURRENT_PROCESS", description: "How it's done now", example: "Manually run Python scripts, copy to Google Sheets, email team" },
      { name: "TOOLS", description: "Available tools", example: "GitHub Actions, Python, PostgreSQL, Slack" },
      { name: "SCHEDULE", description: "When it should run", example: "Every Monday at 6am UTC" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4-1", "gemini-2-5-pro"],
    difficulty: "advanced",
    tags: ["automation", "workflow", "devops", "scheduling"],
  },
  {
    id: "github-actions",
    title: "GitHub Actions Workflow",
    category: "automation",
    subcategory: "ci-cd",
    description: "Generate a complete GitHub Actions CI/CD workflow.",
    prompt: `Create a GitHub Actions workflow for: {{PROJECT_TYPE}}

Requirements:
- {{REQUIREMENTS}}

The workflow should include:
1. Trigger configuration (push, PR, schedule)
2. Environment setup (Node/Python/etc version, caching)
3. Linting and formatting checks
4. Unit and integration tests
5. Build step with artifact upload
6. Deployment (if applicable)
7. Status notifications

Provide the complete .github/workflows/ci.yml file with comments explaining each step.`,
    variables: [
      { name: "PROJECT_TYPE", description: "Type of project", example: "Next.js app with TypeScript, deployed to Vercel" },
      { name: "REQUIREMENTS", description: "Specific requirements", example: "Run on PR and push to main, use pnpm, check types, run Jest tests" },
    ],
    recommendedModels: ["claude-sonnet-4", "gpt-4-1", "deepseek-v3"],
    difficulty: "intermediate",
    tags: ["ci-cd", "github-actions", "devops", "automation"],
  },
  {
    id: "data-migration",
    title: "Data Migration Script",
    category: "automation",
    subcategory: "migration",
    description: "Generate a safe, reversible data migration script.",
    prompt: `Create a data migration script to {{MIGRATION_DESCRIPTION}}.

Source: {{SOURCE}}
Destination: {{DESTINATION}}
Data volume: {{VOLUME}}

Requirements:
1. Idempotent — safe to run multiple times
2. Batched processing to avoid memory issues
3. Progress tracking and logging
4. Validation before and after migration
5. Rollback capability
6. Error handling with retry logic for transient failures
7. Dry-run mode to preview changes

Provide complete, runnable code in {{LANGUAGE}}.`,
    variables: [
      { name: "MIGRATION_DESCRIPTION", description: "What to migrate", example: "Migrate user profiles from MongoDB to PostgreSQL" },
      { name: "SOURCE", description: "Source system", example: "MongoDB Atlas, users collection" },
      { name: "DESTINATION", description: "Target system", example: "PostgreSQL, users table with normalized schema" },
      { name: "VOLUME", description: "Data size", example: "~500K documents, 2GB total" },
      { name: "LANGUAGE", description: "Script language", example: "Python" },
    ],
    recommendedModels: ["claude-opus-4", "gpt-4-1", "deepseek-v3"],
    difficulty: "advanced",
    tags: ["migration", "database", "automation", "data-engineering"],
  },
];

export function getPromptsByCategory(category: PromptCategory): PromptTemplate[] {
  return promptTemplates.filter((p) => p.category === category);
}

export function getPromptById(id: string): PromptTemplate | undefined {
  return promptTemplates.find((p) => p.id === id);
}

export function searchPrompts(query: string): PromptTemplate[] {
  const lower = query.toLowerCase();
  return promptTemplates.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.toLowerCase().includes(lower))
  );
}
