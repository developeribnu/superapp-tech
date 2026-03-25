"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Zap, Shield, BarChart3 } from "lucide-react";

const aiAssistants = [
  {
    name: "Claude",
    provider: "Anthropic",
    type: "General Assistant",
    strengths: "Code, analysis, long-form writing, reasoning",
    features: [
      "200K context window",
      "Advanced reasoning",
      "Vision support",
      "API access",
    ],
    bestFor: "Complex tasks, coding, analysis",
  },
  {
    name: "GPT-4",
    provider: "OpenAI",
    type: "General Assistant",
    strengths: "Versatility, multimodal, coding, creative",
    features: [
      "Vision",
      "Web browsing",
      "Code execution",
      "Fine-tuning",
    ],
    bestFor: "Enterprise, diverse tasks, integration",
  },
  {
    name: "Gemini",
    provider: "Google",
    type: "General Assistant",
    strengths: "Multimodal, reasoning, code generation",
    features: [
      "Flash speed",
      "Multimodal",
      "Real-time",
      "Integration",
    ],
    bestFor: "Google ecosystem users, real-time",
  },
  {
    name: "Kimi",
    provider: "Moonshot",
    type: "Research Assistant",
    strengths: "Long document analysis, research, multilingual",
    features: [
      "200K context",
      "File upload",
      "Research mode",
      "Multilingual",
    ],
    bestFor: "Research, document analysis, Chinese support",
  },
];

const toolCategories = [
  {
    category: "Prompt Management",
    tools: [
      {
        name: "PromptBase",
        description: "Marketplace for AI prompts and templates",
        features: "Buy/sell prompts, collections, versioning",
      },
      {
        name: "Prompt Hero",
        description: "Curated prompt gallery and community",
        features: "Categorized prompts, ratings, examples",
      },
      {
        name: "LangChain",
        description: "Framework for managing prompts programmatically",
        features: "Prompt templates, chaining, memory",
      },
    ],
  },
  {
    category: "AI Workflow Tools",
    tools: [
      {
        name: "n8n",
        description: "Workflow automation with AI integration",
        features: "Visual builder, 350+ apps, webhooks",
      },
      {
        name: "Make",
        description: "Automation platform with AI actions",
        features: "500+ integrations, AI modules, functions",
      },
      {
        name: "Zapier",
        description: "Connect AI tools to your apps",
        features: "1000+ apps, AI actions, automation",
      },
    ],
  },
  {
    category: "Model Management",
    tools: [
      {
        name: "Hugging Face",
        description: "Host and discover 100K+ AI models",
        features: "Model hub, datasets, spaces for sharing",
      },
      {
        name: "Together AI",
        description: "Run multiple models through one API",
        features: "Model marketplace, fine-tuning, endpoints",
      },
      {
        name: "Replicate",
        description: "Run AI models with simple API calls",
        features: "Model library, versioning, predictions API",
      },
    ],
  },
  {
    category: "RAG & Knowledge",
    tools: [
      {
        name: "LlamaIndex",
        description: "Data framework for building RAG systems",
        features: "Document parsing, retrieval, indexing",
      },
      {
        name: "LangChain",
        description: "Chain language models with external data",
        features: "Memory, chains, agents, document loaders",
      },
      {
        name: "Pinecone",
        description: "Vector database for semantic search",
        features: "Serverless vectors, metadata, scaling",
      },
    ],
  },
];

const managementFeatures = [
  {
    feature: "API Key Rotation",
    description: "Automatic key rotation for security",
    importance: "Critical",
  },
  {
    feature: "Usage Monitoring",
    description: "Track API calls and costs in real-time",
    importance: "Essential",
  },
  {
    feature: "Rate Limiting",
    description: "Control API request rates",
    importance: "Important",
  },
  {
    feature: "Team Collaboration",
    description: "Share keys and manage team access",
    importance: "Important",
  },
  {
    feature: "Cost Optimization",
    description: "Analyze and reduce AI API spending",
    importance: "Essential",
  },
  {
    feature: "Provider Switching",
    description: "Easily switch between AI providers",
    importance: "Important",
  },
];

const useCase = [
  {
    scenario: "Personal Productivity",
    tools: ["Claude", "ChatGPT", "Gemini"],
    setup: "Browser extensions, integrations, notebooks",
  },
  {
    scenario: "Team Collaboration",
    tools: ["Slack AI", "Teams Copilot", "Google Workspace AI"],
    setup: "Enterprise plans, team management, SSO",
  },
  {
    scenario: "Development",
    tools: ["GitHub Copilot", "Codeium", "TabNine"],
    setup: "IDE plugins, API keys, fine-tuning",
  },
  {
    scenario: "Content Creation",
    tools: ["Copy.ai", "Jasper", "Writesonic"],
    setup: "Web interface, API, templates",
  },
  {
    scenario: "Data Analysis",
    tools: ["ChatGPT", "Claude", "Gemini"],
    setup: "File upload, code execution, visualization",
  },
  {
    scenario: "Enterprise Automation",
    tools: ["Azure OpenAI", "AWS Bedrock", "GCP Vertex"],
    setup: "Managed services, VPC, compliance",
  },
];

export default function AIToolsPage() {
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
          <h1 className="text-4xl font-bold text-white">AI Tools Hub</h1>
          <p className="text-gray-400">
            AI assistant management, integrations, and workflows
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* AI Assistants */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Sparkles size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold text-white">AI Assistants</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {aiAssistants.map((assistant, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="tool-card"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-cyan-400">
                    {assistant.name}
                  </h3>
                  <p className="text-xs text-gray-500">{assistant.provider}</p>
                  <span className="inline-block rounded-full bg-gray-800 px-2 py-1 text-xs text-blue-400 mt-1">
                    {assistant.type}
                  </span>
                </div>

                <p className="mb-3 text-sm text-gray-400">
                  <span className="text-blue-400 font-semibold">Strengths:</span> {assistant.strengths}
                </p>

                <div className="mb-3 space-y-1">
                  {assistant.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs">
                      <Zap size={12} className="text-yellow-400" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                  <p className="text-xs text-gray-500">
                    <span className="text-cyan-400 font-semibold">Best For:</span> {assistant.bestFor}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tool Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">AI Tools Ecosystem</h2>

          <div className="space-y-6">
            {toolCategories.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + catIdx * 0.1 }}
              >
                <h3 className="mb-3 text-lg font-bold text-orange-400">
                  {category.category}
                </h3>
                <div className="grid gap-3 md:grid-cols-3">
                  {category.tools.map((tool, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + catIdx * 0.1 + idx * 0.05 }}
                      className="tool-card"
                    >
                      <h4 className="mb-1 font-semibold text-white">{tool.name}</h4>
                      <p className="mb-3 text-xs text-gray-500">{tool.description}</p>
                      <p className="text-xs text-gray-400">
                        <span className="text-blue-400 font-semibold">Features:</span> {tool.features}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Management Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Shield size={24} className="text-green-400" />
            <h2 className="text-2xl font-bold text-white">
              AI Tool Management Best Practices
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {managementFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-semibold text-white">{feature.feature}</h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      feature.importance === "Critical"
                        ? "bg-red-900/30 text-red-400"
                        : "bg-orange-900/30 text-orange-400"
                    }`}
                  >
                    {feature.importance}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Use Cases */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <BarChart3 size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Use Cases & Setups</h2>
          </div>

          <div className="space-y-4">
            {useCase.map((use, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.08 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">
                  {use.scenario}
                </h3>
                <div className="mb-3 space-y-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Recommended Tools:</p>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {use.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full bg-gray-800/50 px-2 py-1 text-xs text-blue-400"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400">
                    <span className="text-green-400 font-semibold">Setup:</span> {use.setup}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Integration Guide */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Setting Up Your AI Tool Stack
          </h2>

          <div className="space-y-3">
            {[
              { step: "1", title: "Choose Your Primary Assistant", desc: "Claude, ChatGPT, or Gemini based on needs" },
              { step: "2", title: "Set Up API Keys", desc: "Securely store credentials in .env files" },
              { step: "3", title: "Install SDKs/Libraries", desc: "Python, JavaScript, or language of choice" },
              { step: "4", title: "Build Prompt Library", desc: "Create reusable prompts for common tasks" },
              { step: "5", title: "Set Up Monitoring", desc: "Track usage, costs, and performance" },
              { step: "6", title: "Integrate with Workflows", desc: "Connect to n8n, Zapier, or make.com" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.05 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                  <span className="text-sm font-bold text-white">{item.step}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
