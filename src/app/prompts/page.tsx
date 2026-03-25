"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Zap, Target, Brain } from "lucide-react";

const frameworks = [
  {
    name: "STAR Method",
    description: "Situation, Task, Action, Result framework",
    use: "Narrative and problem-solving tasks",
    example: 'Write a STAR response about your most challenging project...',
  },
  {
    name: "Chain-of-Thought",
    description: "Break complex problems into reasoning steps",
    use: "Math, logic, analysis tasks",
    example: 'Think step by step to solve this problem...',
  },
  {
    name: "Few-Shot Learning",
    description: "Provide examples to guide model behavior",
    use: "Consistent output formatting",
    example: 'Here are 2 examples: [example1] [example2] Now do this...',
  },
  {
    name: "Role-Playing",
    description: "Ask model to assume a specific expertise",
    use: "Specialized knowledge tasks",
    example: 'You are a senior architect. Design this system...',
  },
  {
    name: "Socratic Method",
    description: "Ask probing questions to deepen understanding",
    use: "Learning and exploration",
    example: 'What are the implications of...? Why might...?',
  },
  {
    name: "Tree of Thoughts",
    description: "Explore multiple reasoning paths",
    use: "Complex decision-making",
    example: 'Consider these three approaches: 1) ... 2) ... 3) ...',
  },
];

const techniques = [
  {
    technique: "Specificity",
    description: "Be detailed about what you want",
    example: "Instead: 'Write a blog post' → Better: 'Write a 1500-word SEO-optimized blog post about climate change for a general audience, including 5 key facts and citations'",
  },
  {
    technique: "Context Setting",
    description: "Provide background information",
    example: "I'm a beginner JavaScript developer trying to understand async/await. Explain it using simple terms and examples.",
  },
  {
    technique: "Output Format",
    description: "Specify exactly how you want results",
    example: "Return the results as a JSON array with fields: title, description, difficulty, tools",
  },
  {
    technique: "Temperature Control",
    description: "Adjust creativity vs consistency",
    example: "Use 0.0 for factual tasks, 0.7-1.0 for creative writing",
  },
  {
    technique: "Delimiter Usage",
    description: "Use markers to separate instructions",
    example: '--- TASK START --- ... --- TASK END ---',
  },
  {
    technique: "Negative Prompting",
    description: "Specify what NOT to do",
    example: "Write a product review but do NOT include: marketing language, superlatives, or opinions",
  },
];

const templates = [
  {
    category: "Content Writing",
    prompts: [
      {
        title: "Blog Post Outline",
        template: `Create a detailed outline for a blog post about [TOPIC] targeting [AUDIENCE]. Include:
- Compelling title
- 5-7 main sections with subheadings
- Key points for each section
- Call-to-action suggestions`,
      },
      {
        title: "Email Marketing",
        template: `Write a [EMAIL TYPE] email about [PRODUCT/SERVICE] with:
- Attention-grabbing subject line
- Personalized opening
- Clear value proposition
- 2-3 benefits with examples
- Strong CTA
- Keep to [WORD COUNT] words`,
      },
    ],
  },
  {
    category: "Code Generation",
    prompts: [
      {
        title: "API Design",
        template: `Design a REST API for [RESOURCE] with these features:
- List operations for [RESOURCE]
- CRUD operations
- Filtering and pagination
- Error handling
- Authentication requirements
Use [LANGUAGE] pseudocode.`,
      },
      {
        title: "Function Implementation",
        template: `Write a [LANGUAGE] function called [NAME] that:
- Takes [INPUT] as parameters
- Returns [OUTPUT]
- Handles these edge cases: [CASES]
- Include comments and examples
- Optimize for [PERFORMANCE/READABILITY]`,
      },
    ],
  },
  {
    category: "Analysis & Strategy",
    prompts: [
      {
        title: "Market Analysis",
        template: `Analyze the [MARKET/INDUSTRY]:
- Current market size and growth rate
- Top 3-5 competitors and their positioning
- Market trends and opportunities
- Potential threats and challenges
- Recommendations for [COMPANY/PRODUCT]`,
      },
      {
        title: "Problem Solving",
        template: `Help me solve this problem: [PROBLEM STATEMENT]
- Break it down into components
- Identify root causes
- Generate 3-5 potential solutions
- Evaluate pros/cons for each
- Recommend the best approach`,
      },
    ],
  },
];

const antiPatterns = [
  {
    bad: "Can you help?",
    good: "Help me debug this JavaScript error: [ERROR MESSAGE]. I've already tried [ATTEMPTS]. Here's my code: [CODE]",
    why: "Specific context enables better help",
  },
  {
    bad: "Write a poem",
    good: "Write a 16-line rhyming poem about artificial intelligence using ABAB rhyme scheme, with a nostalgic tone",
    why: "Constraints improve quality",
  },
  {
    bad: "Summarize this text",
    good: "Summarize this text in 100 words for a 5th-grade reading level, focusing on causes and effects",
    why: "Format and audience matter",
  },
  {
    bad: "Is this good code?",
    good: "Review this code for: performance, readability, security vulnerabilities, and maintainability",
    why: "Specific criteria guide the review",
  },
];

const advancedTechniques = [
  {
    technique: "Prompt Injection",
    description: "Be aware of prompt injection attacks in user-facing apps",
    mitigation: "Sanitize inputs, use system prompts, separate user input from instructions",
  },
  {
    technique: "Token Optimization",
    description: "Use tokens efficiently to fit larger contexts",
    mitigation: "Summarize old messages, use shortcuts, compress data",
  },
  {
    technique: "Jailbreaking Prevention",
    description: "Prevent users from bypassing safety guidelines",
    mitigation: "Clear system prompts, monitoring, content filtering",
  },
  {
    technique: "Context Window Management",
    description: "Manage large conversations effectively",
    mitigation: "Summarization, archiving, truncation strategies",
  },
];

export default function PromptsPage() {
  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-4"
      >
        <Link
          href="/"
          className="rounded-lg border border-gray-800 bg-gray-900 p-2 transition-all hover:border-gray-700"
        >
          <ArrowLeft size={20} className="text-gray-400" />
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-white">
            Prompt Engineering Hub
          </h1>
          <p className="text-gray-400">
            Techniques, templates, frameworks, and best practices
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Prompting Frameworks */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Brain size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold text-white">
              Prompting Frameworks
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {frameworks.map((framework, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">
                  {framework.name}
                </h3>
                <p className="mb-3 text-sm text-gray-400">
                  {framework.description}
                </p>

                <div className="mb-3 rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                  <p className="text-xs text-gray-500 font-semibold">Use:</p>
                  <p className="text-xs text-gray-400">{framework.use}</p>
                </div>

                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                  <p className="text-xs text-blue-400 font-semibold">Example:</p>
                  <p className="text-xs italic text-gray-400">
                    "{framework.example}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Techniques */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Zap size={24} className="text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">
              Key Prompting Techniques
            </h2>
          </div>

          <div className="space-y-4">
            {techniques.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-white">{item.technique}</h3>
                <p className="mb-3 text-sm text-gray-400">{item.description}</p>

                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3">
                  <p className="text-xs text-gray-500 font-semibold mb-1">
                    Example:
                  </p>
                  <p className="text-xs text-gray-400">{item.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Prompt Templates */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <BookOpen size={24} className="text-green-400" />
            <h2 className="text-2xl font-bold text-white">Prompt Templates</h2>
          </div>

          <div className="space-y-6">
            {templates.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + catIdx * 0.15 }}
              >
                <h3 className="mb-4 text-lg font-bold text-orange-400">
                  {category.category}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {category.prompts.map((prompt, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.55 + catIdx * 0.15 + idx * 0.05,
                      }}
                      className="tool-card"
                    >
                      <h4 className="mb-3 font-bold text-cyan-400">
                        {prompt.title}
                      </h4>
                      <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3">
                        <p className="text-xs text-gray-400 font-mono whitespace-pre-wrap">
                          {prompt.template}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Anti-Patterns */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Target size={24} className="text-red-400" />
            <h2 className="text-2xl font-bold text-white">Anti-Patterns</h2>
          </div>

          <div className="space-y-4">
            {antiPatterns.map((pattern, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.08 }}
                className="tool-card"
              >
                <div className="mb-3 space-y-2 text-sm">
                  <div className="rounded-lg border border-red-900/50 bg-red-900/20 p-3">
                    <p className="text-xs text-red-400 font-semibold mb-1">
                      ❌ Weak Prompt
                    </p>
                    <p className="text-gray-400">{pattern.bad}</p>
                  </div>

                  <div className="rounded-lg border border-green-900/50 bg-green-900/20 p-3">
                    <p className="text-xs text-green-400 font-semibold mb-1">
                      ✓ Strong Prompt
                    </p>
                    <p className="text-gray-400">{pattern.good}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  <span className="text-cyan-400 font-semibold">Why:</span> {pattern.why}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Advanced Techniques */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Advanced Techniques
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {advancedTechniques.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + idx * 0.08 }}
                className="rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <h3 className="mb-2 font-bold text-white">{item.technique}</h3>
                <p className="mb-3 text-sm text-gray-400">
                  {item.description}
                </p>

                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3">
                  <p className="text-xs text-gray-500 font-semibold mb-1">
                    Mitigation:
                  </p>
                  <p className="text-xs text-gray-400">{item.mitigation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Prompt Engineering Tips
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              "✓ Start simple, then iterate and refine prompts",
              "✓ Test multiple models to find the best fit",
              "✓ Use explicit formatting instructions for consistency",
              "✓ Include examples for complex tasks",
              "✓ Specify tone, style, and target audience",
              "✓ Use separators to clearly delineate sections",
              "✓ Ask for explanations of reasoning",
              "✓ Monitor and log prompt performance over time",
              "✓ Use chains of prompts for complex workflows",
              "✓ Be aware of token limits and optimize accordingly",
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + idx * 0.03 }}
                className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3"
              >
                <BookOpen size={16} className="mt-1 text-cyan-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
