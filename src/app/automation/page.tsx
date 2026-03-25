"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Zap,
  MessageCircle,
  Radio,
  Workflow,
  Bot,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const botPlatforms = [
  {
    name: "Telegram Bot API",
    description: "Build bots for Telegram messenger",
    use: "Notifications, reminders, interactions",
    features: [
      "Inline keyboards",
      "File handling",
      "Inline queries",
      "Webhook support",
    ],
    complexity: "Easy",
    popularity: "Very High",
  },
  {
    name: "Discord Bot",
    description: "Create bots for Discord communities",
    use: "Moderation, music, games, integration",
    features: [
      "Slash commands",
      "Reactions",
      "Rich embeds",
      "Voice channel",
    ],
    complexity: "Medium",
    popularity: "Very High",
  },
  {
    name: "Slack Bot",
    description: "Automate Slack workspace tasks",
    use: "Team automation, alerts, integrations",
    features: [
      "Slash commands",
      "Shortcuts",
      "Message menus",
      "OAuth",
    ],
    complexity: "Medium",
    popularity: "High",
  },
  {
    name: "Twitter Bot",
    description: "Automate tweets and interactions",
    use: "Social media automation, analytics",
    features: ["Tweet scheduling", "Analytics", "Replies", "Followers"],
    complexity: "Easy",
    popularity: "High",
  },
  {
    name: "GitHub Bot",
    description: "Automate repository management",
    use: "PR automation, issue tracking, CI/CD",
    features: ["GitHub Actions", "Webhooks", "GraphQL", "REST API"],
    complexity: "Medium",
    popularity: "Very High",
  },
];

const workflowTools = [
  {
    name: "n8n",
    category: "Workflow Automation",
    description: "Open-source workflow automation with 350+ integrations",
    features: [
      "Visual workflow builder",
      "Self-hosted",
      "350+ integrations",
      "Webhooks",
    ],
    use: "Enterprise automation, data processing",
  },
  {
    name: "Zapier",
    category: "Automation Platform",
    description: "Connect apps and automate tasks",
    features: ["1000+ apps", "Multi-step zaps", "Filter/path logic", "CLI"],
    use: "Business process automation",
  },
  {
    name: "Make (Integromat)",
    category: "Automation Platform",
    description: "Visual automation and integration platform",
    features: ["Visual builder", "500+ apps", "Functions", "Custom modules"],
    use: "Complex workflows, integrations",
  },
  {
    name: "IFTTT",
    category: "Simple Automation",
    description: "If This Then That - simple automation rules",
    features: ["Simple rules", "600+ services", "Applets", "Mobile app"],
    use: "Personal automation, IoT",
  },
  {
    name: "Airtable Automations",
    category: "Database Automation",
    description: "Build automations within Airtable",
    features: [
      "Triggers",
      "Actions",
      "Database tied",
      "Webhooks",
    ],
    use: "Data-driven automation",
  },
];

const rpaTools = [
  {
    name: "UiPath",
    description: "Enterprise RPA platform for business process automation",
    features: "Visual design, ML, cloud-native",
  },
  {
    name: "Blue Prism",
    description: "Digital workforce automation platform",
    features: "Object COBOL, asset management, security",
  },
  {
    name: "Automation Anywhere",
    description: "Intelligent automation platform",
    features: "RPA, IPA, AI, cloud",
  },
  {
    name: "Selenium",
    description: "Web automation and testing framework",
    features: "Open-source, cross-browser, multiple languages",
  },
];

const automationIdeas = [
  {
    title: "Email to Database",
    description: "Automatically save email attachments to database",
    tools: ["n8n", "Zapier", "Make"],
    difficulty: "Easy",
  },
  {
    title: "Social Media Posting",
    description: "Schedule and post to multiple platforms",
    tools: ["Buffer", "Later", "n8n"],
    difficulty: "Easy",
  },
  {
    title: "Notification System",
    description: "Send alerts via Telegram/Discord for events",
    tools: ["Telegram Bot", "Discord Bot", "n8n"],
    difficulty: "Medium",
  },
  {
    title: "Data Sync Pipeline",
    description: "Sync data between APIs and databases",
    tools: ["n8n", "Make", "Custom script"],
    difficulty: "Medium",
  },
  {
    title: "Invoice Generation",
    description: "Auto-generate invoices from orders",
    tools: ["n8n", "Airtable", "Zapier"],
    difficulty: "Medium",
  },
  {
    title: "Lead Qualification",
    description: "Automatic lead scoring and routing",
    tools: ["Zapier", "Make", "Custom webhook"],
    difficulty: "Hard",
  },
];

const botLanguages = [
  {
    language: "Python",
    frameworks: "python-telegram-bot, discord.py, tweepy",
    score: "5/5",
  },
  {
    language: "JavaScript/Node.js",
    frameworks: "discord.js, telegraf, twitter-api-sdk",
    score: "5/5",
  },
  {
    language: "Go",
    frameworks: "telegram-bot-api, discordgo",
    score: "4/5",
  },
  { language: "Java", frameworks: "TelegramBots, JDA", score: "4/5" },
  {
    language: "Rust",
    frameworks: "teloxide, serenity",
    score: "4/5",
  },
];

export default function AutomationPage() {
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
          <h1 className="text-4xl font-bold text-white">Automation Hub</h1>
          <p className="text-gray-400">
            Bots, workflows, RPA, and process automation tools
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Bot Platforms */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Bot size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Bot Platforms</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {botPlatforms.map((bot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="tool-card"
              >
                <div className="mb-3">
                  <h3 className="font-bold text-cyan-400">{bot.name}</h3>
                  <p className="text-xs text-gray-500">{bot.description}</p>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Complexity</span>
                    <span className="text-xs font-semibold text-blue-400">
                      {bot.complexity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Popularity</span>
                    <span className="text-xs font-semibold text-green-400">
                      {bot.popularity}
                    </span>
                  </div>
                </div>

                <p className="mb-3 text-xs text-gray-400">
                  <span className="text-blue-400 font-semibold">Use Case:</span> {bot.use}
                </p>

                <div className="space-y-1">
                  {bot.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className="text-green-400" />
                      <span className="text-xs text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Workflow Automation Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Workflow size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold text-white">
              Workflow Automation Platforms
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflowTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="tool-card"
              >
                <h3 className="mb-1 font-bold text-white">{tool.name}</h3>
                <p className="mb-3 text-xs text-gray-500">{tool.category}</p>
                <p className="mb-4 text-sm text-gray-400">{tool.description}</p>

                <div className="space-y-2 text-xs">
                  <p className="text-blue-400 font-semibold">Features:</p>
                  <ul className="space-y-1">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-gray-400">
                        <span>•</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                  <p className="text-xs text-gray-500">
                    <span className="text-cyan-400 font-semibold">Best For:</span> {tool.use}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* RPA Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Cpu size={24} className="text-orange-400" />
            <h2 className="text-2xl font-bold text-white">
              RPA & Process Automation
            </h2>
          </div>

          <div className="space-y-3">
            {rpaTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <h3 className="mb-2 font-bold text-cyan-400">{tool.name}</h3>
                <p className="mb-3 text-sm text-gray-400">{tool.description}</p>
                <p className="text-xs text-gray-500">
                  <span className="text-blue-400 font-semibold">Features:</span> {tool.features}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Automation Ideas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Zap size={24} className="text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">
              Automation Project Ideas
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {automationIdeas.map((idea, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.05 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-white">{idea.title}</h3>
                <p className="mb-4 text-sm text-gray-400">{idea.description}</p>

                <div className="mb-3 space-y-2">
                  <p className="text-xs font-semibold text-blue-400">Suggested Tools:</p>
                  <div className="flex flex-wrap gap-2">
                    {idea.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-gray-800/50 px-2 py-1 text-xs text-cyan-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-gray-500">Difficulty: </span>
                  <span
                    className={
                      idea.difficulty === "Easy"
                        ? "text-green-400"
                        : idea.difficulty === "Medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }
                  >
                    {idea.difficulty}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Bot Programming Languages */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Bot Development Languages
          </h2>

          <div className="space-y-3">
            {botLanguages.map((lang, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.05 }}
                className="flex items-start justify-between rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <div className="flex-1">
                  <h3 className="mb-1 font-bold text-cyan-400">{lang.language}</h3>
                  <p className="text-xs text-gray-500">{lang.frameworks}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-400">{lang.score}</p>
                  <p className="text-xs text-gray-500">Recommendation</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Start Guide */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Getting Started with Bots
          </h2>

          <div className="space-y-4">
            {[
              {
                step: "1. Choose Your Platform",
                desc: "Pick Telegram, Discord, Slack, or Twitter",
              },
              {
                step: "2. Get API Credentials",
                desc: "Register bot and get token/API keys",
              },
              {
                step: "3. Select Language/Framework",
                desc: "Python, Node.js, Go, Java, etc.",
              },
              {
                step: "4. Create Basic Structure",
                desc: "Connection handler, command parser, response logic",
              },
              {
                step: "5. Add Features",
                desc: "Commands, reactions, inline keyboards, handlers",
              },
              {
                step: "6. Deploy",
                desc: "Heroku, VPS, serverless, or polling",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + idx * 0.05 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                  <span className="text-sm font-bold text-white">{idx + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{item.step}</p>
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
