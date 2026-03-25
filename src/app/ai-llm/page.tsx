"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Zap,
  Clock,
  DollarSign,
  Search,
  Filter,
  BookOpen,
} from "lucide-react";

const models = [
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    rating: 4.9,
    speed: "Fast",
    cost: "$$",
    context: "200K",
    specialty: "General Purpose",
    description:
      "Most capable AI model with excellent reasoning and coding abilities",
    features: [
      "Advanced reasoning",
      "Code generation",
      "Document analysis",
      "Vision",
    ],
  },
  {
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    rating: 4.8,
    speed: "Fast",
    cost: "$$$",
    context: "128K",
    specialty: "General Purpose",
    description: "Highly capable with strong multimodal understanding",
    features: ["Vision", "Code", "Analysis", "Plugin support"],
  },
  {
    name: "GPT-4o",
    provider: "OpenAI",
    rating: 4.9,
    speed: "Very Fast",
    cost: "$",
    context: "128K",
    specialty: "Multimodal",
    description: "Fastest and most affordable GPT-4 variant",
    features: ["Multimodal", "Real-time", "Fast inference", "Affordable"],
  },
  {
    name: "Gemini 2.0",
    provider: "Google",
    rating: 4.7,
    speed: "Very Fast",
    cost: "$",
    context: "200K",
    specialty: "Multimodal",
    description: "Google's most advanced model with excellent performance",
    features: ["Flash speed", "Multimodal", "Reasoning", "Math"],
  },
  {
    name: "Llama 2 70B",
    provider: "Meta",
    rating: 4.5,
    speed: "Medium",
    cost: "Free",
    context: "4K",
    specialty: "Open Source",
    description: "Powerful open-source model for on-premise deployment",
    features: ["Open source", "Self-hosted", "Commercial", "Customizable"],
  },
  {
    name: "Mistral Large",
    provider: "Mistral AI",
    rating: 4.6,
    speed: "Fast",
    cost: "$$",
    context: "32K",
    specialty: "Efficient",
    description: "Balanced model with strong reasoning and efficiency",
    features: ["Efficient", "Multilingual", "Fast", "Reasoning"],
  },
];

const techniques = [
  {
    name: "Chain-of-Thought",
    description: "Break complex problems into step-by-step reasoning",
    example: "Think through the problem step by step before answering",
  },
  {
    name: "Few-Shot Prompting",
    description: "Provide examples to guide model behavior",
    example: "Show 2-3 examples of desired output format",
  },
  {
    name: "Role Playing",
    description: "Ask the model to assume a specific expertise",
    example: "Act as a senior software architect and design this system",
  },
  {
    name: "Prompt Chaining",
    description: "Use output from one prompt as input to another",
    example: "Summarize → Translate → Format in sequence",
  },
  {
    name: "Temperature Control",
    description: "Adjust randomness for different use cases",
    example: "Use 0.0 for consistent output, 1.0 for creative",
  },
  {
    name: "Token Management",
    description: "Optimize context window usage",
    example: "Summarize old context to stay within limits",
  },
];

const tools = [
  {
    name: "OpenAI Playground",
    category: "Testing",
    description: "Interactive interface to test different models",
    url: "https://platform.openai.com/playground",
  },
  {
    name: "Anthropic Console",
    category: "Testing",
    description: "Test Claude models with real-time feedback",
    url: "https://console.anthropic.com",
  },
  {
    name: "Langchain",
    category: "Development",
    description: "Framework for building LLM applications",
    url: "https://langchain.com",
  },
  {
    name: "LlamaIndex",
    category: "Development",
    description: "Data framework for LLM applications",
    url: "https://llamaindex.ai",
  },
  {
    name: "Promptbase",
    category: "Marketplace",
    description: "Marketplace for buying and selling prompts",
    url: "https://promptbase.com",
  },
  {
    name: "Hugging Face",
    category: "Models",
    description: "Host and discover 100K+ models",
    url: "https://huggingface.co",
  },
];

export default function AILLMPage() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpeed, setFilterSpeed] = useState("All");

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpeed =
      filterSpeed === "All" || model.speed.includes(filterSpeed);
    return matchesSearch && matchesSpeed;
  });

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
          <h1 className="text-4xl font-bold text-white">AI & LLM Hub</h1>
          <p className="text-gray-400">
            Compare models, master prompting, and build AI applications
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Model Comparison Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">
            LLM Model Comparison
          </h2>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-gray-900 py-2 pl-10 pr-4 text-white placeholder-gray-600 transition-all focus:border-cyan-600 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              {["All", "Fast", "Very Fast"].map((speed) => (
                <button
                  key={speed}
                  onClick={() => setFilterSpeed(speed)}
                  className={`rounded-lg px-4 py-2 transition-all ${
                    filterSpeed === speed
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                      : "border border-gray-800 bg-gray-900 text-gray-400 hover:border-gray-700"
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          {/* Model Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredModels.map((model, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedModel(idx)}
                className={`tool-card cursor-pointer transition-all ${
                  selectedModel === idx ? "border-cyan-600 shadow-xl shadow-cyan-500/20" : ""
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white">{model.name}</h3>
                    <p className="text-xs text-gray-500">{model.provider}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-gray-800 px-2 py-1">
                    <Star size={14} className="text-yellow-400" />
                    <span className="text-xs font-semibold text-white">
                      {model.rating}
                    </span>
                  </div>
                </div>

                <p className="mb-4 text-sm text-gray-400">{model.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Zap size={14} className="text-blue-400" />
                    <span className="text-gray-400">Speed: {model.speed}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <DollarSign size={14} className="text-green-400" />
                    <span className="text-gray-400">Cost: {model.cost}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock size={14} className="text-purple-400" />
                    <span className="text-gray-400">Context: {model.context}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {model.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-gray-800/50 px-2 py-1 text-xs text-cyan-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Prompt Engineering Techniques */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <BookOpen size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              Prompt Engineering Techniques
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {techniques.map((technique, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">{technique.name}</h3>
                <p className="mb-4 text-sm text-gray-400">
                  {technique.description}
                </p>
                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3">
                  <p className="text-xs italic text-gray-500">
                    "{technique.example}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* AI Tools & Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">Tools & Resources</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {tools.map((tool, idx) => (
              <motion.a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="tool-card group block"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-white group-hover:text-cyan-400">
                    {tool.name}
                  </h3>
                  <span className="text-xs rounded-full bg-gray-800 px-2 py-1 text-blue-400">
                    {tool.category}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{tool.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Quick Tips */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-4 text-xl font-bold text-white">Pro Tips</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>
                Use Claude or GPT-4 for complex reasoning tasks and code generation
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>
                Test multiple models to find the best price-to-performance ratio for your use case
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>
                Always include examples in few-shot prompts for better consistency
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>
                Use lower temperature (0.0-0.3) for factual tasks, higher (0.7-1.0) for creative
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">•</span>
              <span>Monitor token usage to optimize costs and latency</span>
            </li>
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
