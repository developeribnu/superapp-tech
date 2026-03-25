"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Cloud,
  Server,
  Database,
  Container,
  GitBranch,
  Zap,
  BarChart3,
  Lock,
} from "lucide-react";

const cloudProviders = [
  {
    name: "AWS",
    market: "32%",
    services: "200+",
    strength: "Most comprehensive",
    bestFor: "Enterprise, scale",
    highlight: "EC2, S3, Lambda, RDS",
  },
  {
    name: "Google Cloud",
    market: "11%",
    services: "100+",
    strength: "AI/ML leadership",
    bestFor: "Analytics, ML",
    highlight: "BigQuery, Vertex AI, Cloud Run",
  },
  {
    name: "Microsoft Azure",
    market: "23%",
    services: "200+",
    strength: "Microsoft ecosystem",
    bestFor: "Enterprise .NET",
    highlight: "VMs, App Service, Cosmos DB",
  },
  {
    name: "Oracle Cloud",
    market: "2%",
    services: "100+",
    strength: "Database focused",
    bestFor: "Database workloads",
    highlight: "Autonomous Database, Exadata",
  },
  {
    name: "DigitalOcean",
    market: "2%",
    services: "50+",
    strength: "Developer friendly",
    bestFor: "Startups, simplicity",
    highlight: "Droplets, App Platform",
  },
  {
    name: "Heroku",
    market: "1%",
    services: "30+",
    strength: "Easiest deployment",
    bestFor: "Rapid prototyping",
    highlight: "One-click deployment, Add-ons",
  },
];

const devopsTools = [
  {
    name: "Docker",
    category: "Containerization",
    description: "Container platform for packaging applications",
    use: "Ensure consistency across environments",
  },
  {
    name: "Kubernetes",
    category: "Orchestration",
    description: "Container orchestration and automation",
    use: "Scale microservices at enterprise level",
  },
  {
    name: "Terraform",
    category: "IaC",
    description: "Infrastructure as Code for cloud provisioning",
    use: "Version control and automate infrastructure",
  },
  {
    name: "Ansible",
    category: "Configuration",
    description: "Configuration management and automation",
    use: "Deploy and configure applications at scale",
  },
  {
    name: "GitHub Actions",
    category: "CI/CD",
    description: "Built-in GitHub automation workflows",
    use: "Automate testing and deployment",
  },
  {
    name: "Jenkins",
    category: "CI/CD",
    description: "Open-source automation server",
    use: "Complex build and deployment pipelines",
  },
  {
    name: "GitLab CI",
    category: "CI/CD",
    description: "Integrated CI/CD with GitLab",
    use: "Complete DevOps platform",
  },
  {
    name: "Prometheus",
    category: "Monitoring",
    description: "Metrics collection and alerting",
    use: "Real-time infrastructure monitoring",
  },
];

const architecturePatterns = [
  {
    name: "Microservices",
    description: "Small, independent services communicating via APIs",
    benefits: "Scalability, flexibility, rapid deployment",
    challenges: "Complexity, network latency, consistency",
  },
  {
    name: "Serverless",
    description: "Event-driven functions without managing servers",
    benefits: "Reduced ops, auto-scaling, pay-per-use",
    challenges: "Cold starts, vendor lock-in, debugging",
  },
  {
    name: "Monolith",
    description: "Single codebase with all features integrated",
    benefits: "Simplicity, easier debugging, performance",
    challenges: "Scaling difficulty, deployment risk",
  },
  {
    name: "Lambda Architecture",
    description: "Real-time and batch processing combined",
    benefits: "Handles both real-time and historical data",
    challenges: "Complex implementation, multiple systems",
  },
];

const networking = [
  {
    concept: "VPC (Virtual Private Cloud)",
    description: "Isolated cloud network with subnets and security",
    importance: "Critical",
  },
  {
    concept: "Load Balancing",
    description: "Distribute traffic across multiple servers",
    importance: "Essential",
  },
  {
    concept: "CDN (Content Delivery Network)",
    description: "Distribute content from edge locations",
    importance: "Important",
  },
  {
    concept: "DNS Management",
    description: "Domain name routing and failover",
    importance: "Critical",
  },
  {
    concept: "VPN & Direct Connect",
    description: "Secure connectivity to cloud infrastructure",
    importance: "Important",
  },
];

export default function InfrastructurePage() {
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
            Infrastructure & Cloud
          </h1>
          <p className="text-gray-400">
            Cloud platforms, DevOps tools, networking, and architecture patterns
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Cloud Providers Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Cloud size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Cloud Providers</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cloudProviders.map((provider, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="tool-card"
              >
                <div className="mb-4">
                  <h3 className="mb-1 text-xl font-bold text-cyan-400">
                    {provider.name}
                  </h3>
                  <p className="text-xs text-gray-500">{provider.strength}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Share</span>
                    <span className="font-semibold text-white">{provider.market}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Services</span>
                    <span className="font-semibold text-white">{provider.services}</span>
                  </div>
                </div>

                <div className="my-4 rounded-lg border border-gray-700 bg-gray-900/50 p-3">
                  <p className="text-xs font-semibold text-blue-400">
                    Key Services
                  </p>
                  <p className="text-xs text-gray-400">{provider.highlight}</p>
                </div>

                <p className="text-xs text-gray-500">
                  Best for: <span className="text-cyan-400">{provider.bestFor}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* DevOps Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Container size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold text-white">DevOps Tools</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {devopsTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="tool-card"
              >
                <div className="mb-2">
                  <h3 className="font-bold text-white">{tool.name}</h3>
                  <span className="inline-block rounded-full bg-gray-800 px-2 py-1 text-xs text-blue-400">
                    {tool.category}
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-400">{tool.description}</p>
                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-3">
                  <p className="text-xs text-gray-500">
                    <span className="text-cyan-400 font-semibold">Use Case:</span> {tool.use}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Architecture Patterns */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Server size={24} className="text-orange-400" />
            <h2 className="text-2xl font-bold text-white">
              Architecture Patterns
            </h2>
          </div>

          <div className="space-y-4">
            {architecturePatterns.map((pattern, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="tool-card"
              >
                <h3 className="mb-2 text-lg font-bold text-cyan-400">
                  {pattern.name}
                </h3>
                <p className="mb-4 text-sm text-gray-400">{pattern.description}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-green-400">Benefits</p>
                    <p className="text-xs text-gray-400">{pattern.benefits}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-orange-400">Challenges</p>
                    <p className="text-xs text-gray-400">{pattern.challenges}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Networking Concepts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <GitBranch size={24} className="text-green-400" />
            <h2 className="text-2xl font-bold text-white">
              Networking Essentials
            </h2>
          </div>

          <div className="space-y-3">
            {networking.map((net, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.08 }}
                className="flex items-start gap-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <Zap
                  size={20}
                  className={`flex-shrink-0 mt-1 ${
                    net.importance === "Critical"
                      ? "text-red-400"
                      : net.importance === "Essential"
                        ? "text-orange-400"
                        : "text-blue-400"
                  }`}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{net.concept}</h3>
                  <p className="mt-1 text-sm text-gray-400">{net.description}</p>
                </div>
                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                    net.importance === "Critical"
                      ? "bg-red-900/30 text-red-400"
                      : net.importance === "Essential"
                        ? "bg-orange-900/30 text-orange-400"
                        : "bg-blue-900/30 text-blue-400"
                  }`}
                >
                  {net.importance}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Infrastructure Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Infrastructure Setup Checklist
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "☐ Choose cloud provider and region",
              "☐ Set up VPC and subnets",
              "☐ Configure security groups and NACLs",
              "☐ Set up load balancer",
              "☐ Configure auto-scaling groups",
              "☐ Set up RDS/managed database",
              "☐ Configure backup and disaster recovery",
              "☐ Set up monitoring and alerting",
              "☐ Implement CI/CD pipeline",
              "☐ Configure logging and tracing",
              "☐ Set up IAM roles and policies",
              "☐ Enable multi-region failover",
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.03 }}
                className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3"
              >
                <Lock size={16} className="text-cyan-400" />
                <p className="text-sm text-gray-300">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
