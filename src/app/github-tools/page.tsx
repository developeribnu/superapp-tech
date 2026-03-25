"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Github, BarChart3, Award, Code } from "lucide-react";

const analyticsTools = [
  {
    name: "GitHub Dashboard",
    description: "Native GitHub analytics and insights",
    features: ["Repository stats", "Traffic", "Clones", "Referrers"],
    use: "Basic repo analytics",
  },
  {
    name: "GitHub GraphQL API",
    description: "Query repository data programmatically",
    features: [
      "Detailed queries",
      "Custom analytics",
      "Rate limiting",
      "Webhooks",
    ],
    use: "Advanced analytics, custom tools",
  },
  {
    name: "GitHub REST API",
    description: "REST endpoints for repository management",
    features: ["User data", "Issues", "PRs", "Commits"],
    use: "Integration with external tools",
  },
  {
    name: "DevStats",
    description: "GitHub contribution analytics and trends",
    features: [
      "Contribution graph",
      "Language stats",
      "Streak tracking",
      "Comparison",
    ],
    use: "Developer profile analytics",
  },
  {
    name: "GitHub Copilot",
    description: "AI-powered code completion and suggestions",
    features: [
      "Code completion",
      "Documentation",
      "Test generation",
      "Refactoring",
    ],
    use: "Development acceleration",
  },
  {
    name: "GitHub Actions",
    description: "Continuous integration and automation",
    features: [
      "Workflows",
      "Testing",
      "Deployment",
      "Scheduled tasks",
    ],
    use: "CI/CD automation",
  },
];

const achievements = [
  {
    name: "Arctic Code Vault Contributor",
    description: "Contributed code that has been stored in the Arctic Code Vault",
    rarity: "Rare",
  },
  {
    name: "Github Copilot",
    description: "Uses GitHub Copilot to help with their development",
    rarity: "Common",
  },
  {
    name: "Pairs",
    description: "Pair programmed with another user in GitHub",
    rarity: "Uncommon",
  },
  {
    name: "Starstruck",
    description: "Created a repository that has 16 stars",
    rarity: "Common",
  },
  {
    name: "Quickdraw",
    description: "Quickdraw badge for fast responding",
    rarity: "Rare",
  },
  {
    name: "Developer Program Member",
    description: "Part of GitHub Developer Program",
    rarity: "Rare",
  },
];

const metrics = [
  { metric: "Commit Frequency", tracks: "Development activity", importance: "High" },
  { metric: "Pull Request Size", tracks: "Code review complexity", importance: "Medium" },
  { metric: "Issue Resolution Time", tracks: "Responsiveness", importance: "High" },
  { metric: "Code Review Time", tracks: "Team collaboration", importance: "High" },
  { metric: "Language Distribution", tracks: "Technical diversity", importance: "Medium" },
  { metric: "Repository Trending", tracks: "Project popularity", importance: "Medium" },
];

const gitHubWorkflow = [
  {
    stage: "Discovery",
    description: "Find trending repositories, stars, and forks",
    tools: ["GitHub search", "Trending page", "DevStats"],
  },
  {
    stage: "Analysis",
    description: "Analyze code quality, commits, and contributors",
    tools: ["GitHub API", "CodeFactor", "LGTM"],
  },
  {
    stage: "Development",
    description: "Clone, fork, and develop locally",
    tools: ["Git CLI", "VS Code", "GitHub Copilot"],
  },
  {
    stage: "Contribution",
    description: "Create branches, commits, and pull requests",
    tools: ["Git", "GitHub UI", "GitHub CLI"],
  },
  {
    stage: "Review",
    description: "Code review, discussions, and merging",
    tools: ["GitHub review tools", "CI/CD", "GitHub Actions"],
  },
  {
    stage: "Tracking",
    description: "Issues, project boards, and milestones",
    tools: ["GitHub Issues", "Project Boards", "Milestones"],
  },
];

const interestingRepos = [
  {
    name: "awesome-* (Curated Lists)",
    description: "Curated lists of resources for every topic",
    stars: "100K+",
    language: "Markdown",
    use: "Learning, discovery, reference",
  },
  {
    name: "freeCodeCamp",
    description: "Free coding curriculum and tutorials",
    stars: "370K+",
    language: "JavaScript",
    use: "Learning, projects, community",
  },
  {
    name: "kubernetes/kubernetes",
    description: "Container orchestration platform",
    stars: "100K+",
    language: "Go",
    use: "Infrastructure, DevOps, contributions",
  },
  {
    name: "torvalds/linux",
    description: "Linux kernel source code",
    stars: "165K+",
    language: "C",
    use: "OS learning, low-level development",
  },
  {
    name: "tensorflow/tensorflow",
    description: "Machine learning library by Google",
    stars: "180K+",
    language: "Python",
    use: "ML/AI development, research",
  },
  {
    name: "nodejs/node",
    description: "Node.js JavaScript runtime",
    stars: "95K+",
    language: "C++",
    use: "JavaScript runtime, backend dev",
  },
];

const tips = [
  "☐ Star repositories you find useful for later reference",
  "☐ Follow developers doing interesting work",
  "☐ Use GitHub notifications to stay updated on issues",
  "☐ Create a public profile with README to showcase projects",
  "☐ Contribute to open-source projects to build portfolio",
  "☐ Use GitHub Discussions for community engagement",
  "☐ Set up branch protection rules for production code",
  "☐ Use GitHub Secrets for secure credential management",
  "☐ Automate repetitive tasks with GitHub Actions",
  "☐ Monitor repository health with dependency alerts",
];

export default function GitHubToolsPage() {
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
          <h1 className="text-4xl font-bold text-white">GitHub Tools Hub</h1>
          <p className="text-gray-400">
            Analytics, achievements, workflows, and best practices
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* GitHub Tools & Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Github size={24} className="text-gray-400" />
            <h2 className="text-2xl font-bold text-white">
              GitHub Tools & Features
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {analyticsTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">{tool.name}</h3>
                <p className="mb-4 text-sm text-gray-400">{tool.description}</p>

                <div className="mb-3 space-y-1">
                  {tool.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs">
                      <Code size={12} className="text-blue-400" />
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                  <p className="text-xs text-gray-500">
                    <span className="text-cyan-400 font-semibold">Use:</span> {tool.use}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Award size={24} className="text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">GitHub Achievements</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="tool-card text-center"
              >
                <div className="mb-3 text-4xl">🏆</div>
                <h3 className="mb-2 font-bold text-white">{achievement.name}</h3>
                <p className="mb-3 text-xs text-gray-400">
                  {achievement.description}
                </p>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    achievement.rarity === "Rare"
                      ? "bg-purple-900/30 text-purple-400"
                      : "bg-blue-900/30 text-blue-400"
                  }`}
                >
                  {achievement.rarity}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <BarChart3 size={24} className="text-green-400" />
            <h2 className="text-2xl font-bold text-white">
              Important GitHub Metrics
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {metrics.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-semibold text-white">{item.metric}</h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      item.importance === "High"
                        ? "bg-green-900/30 text-green-400"
                        : "bg-blue-900/30 text-blue-400"
                    }`}
                  >
                    {item.importance}
                  </span>
                </div>
                <p className="text-sm text-gray-400">Tracks: {item.tracks}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* GitHub Workflow */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Typical GitHub Workflow
          </h2>

          <div className="space-y-4">
            {gitHubWorkflow.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.08 }}
                className="tool-card"
              >
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
                    <span className="text-xs font-bold text-white">{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-white">{stage.stage}</h3>
                </div>
                <p className="mb-3 text-sm text-gray-400">{stage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {stage.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full bg-gray-800/50 px-2 py-1 text-xs text-cyan-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interesting Repositories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Interesting Repositories to Explore
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {interestingRepos.map((repo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + idx * 0.05 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">{repo.name}</h3>
                <p className="mb-3 text-sm text-gray-400">{repo.description}</p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Stars</span>
                    <span className="font-semibold text-yellow-400">{repo.stars}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Language</span>
                    <span className="font-semibold text-blue-400">{repo.language}</span>
                  </div>
                </div>

                <div className="mt-3 rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                  <p className="text-xs text-gray-500">
                    <span className="text-cyan-400 font-semibold">Use:</span> {repo.use}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Best Practices Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            GitHub Best Practices Checklist
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            {tips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + idx * 0.03 }}
                className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3"
              >
                <Github size={16} className="text-cyan-400" />
                <p className="text-sm text-gray-300">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
