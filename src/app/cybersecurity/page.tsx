"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  Lock,
  Eye,
  Zap,
  Bug,
  CheckCircle,
  TrendingDown,
} from "lucide-react";

const securityTools = [
  {
    name: "Nmap",
    category: "Network Scanning",
    description: "Network mapper for network discovery and security auditing",
    severity: "Essential",
    use: "Port scanning, service enumeration",
  },
  {
    name: "Burp Suite",
    category: "Web Testing",
    description: "Integrated platform for web application security testing",
    severity: "Professional",
    use: "OWASP Top 10, manual testing",
  },
  {
    name: "Wireshark",
    category: "Network Analysis",
    description: "Network protocol analyzer for traffic inspection",
    severity: "Essential",
    use: "Packet analysis, troubleshooting",
  },
  {
    name: "Metasploit",
    category: "Exploitation",
    description: "Penetration testing framework with exploit modules",
    severity: "Advanced",
    use: "Vulnerability exploitation, testing",
  },
  {
    name: "OWASP ZAP",
    category: "Web Testing",
    description: "Free open-source web application security scanner",
    severity: "Essential",
    use: "Automated scanning, penetration testing",
  },
  {
    name: "Hashcat",
    category: "Password Cracking",
    description: "Advanced password recovery and cracking tool",
    severity: "Testing",
    use: "Password strength testing, auditing",
  },
];

const vulnerabilities = [
  {
    name: "SQL Injection",
    severity: "Critical",
    cvss: 9.8,
    description: "Injection of malicious SQL code into input fields",
    prevention: "Use parameterized queries and prepared statements",
    tools: ["sqlmap", "Burp Suite"],
  },
  {
    name: "Cross-Site Scripting (XSS)",
    severity: "High",
    cvss: 7.3,
    description: "Injection of malicious JavaScript into web pages",
    prevention: "Input validation, output encoding, CSP headers",
    tools: ["XSStrike", "Burp Suite"],
  },
  {
    name: "Authentication Bypass",
    severity: "Critical",
    cvss: 9.1,
    description: "Bypassing login mechanisms without valid credentials",
    prevention: "Multi-factor authentication, strong password policies",
    tools: ["Burp Suite", "Hashcat"],
  },
  {
    name: "Insecure Deserialization",
    severity: "High",
    cvss: 8.1,
    description: "Unsafe deserialization of untrusted data",
    prevention: "Avoid deserializing untrusted data, use safe libraries",
    tools: ["ysoserial", "Burp Suite"],
  },
  {
    name: "API Key Exposure",
    severity: "High",
    cvss: 7.5,
    description: "Accidental exposure of sensitive API keys",
    prevention: "Use environment variables, secret management tools",
    tools: ["TruffleHog", "GitGuardian"],
  },
  {
    name: "Default Credentials",
    severity: "Critical",
    cvss: 9.8,
    description: "Using unchanged default usernames and passwords",
    prevention: "Force password changes during setup",
    tools: ["Nmap", "Hydra"],
  },
];

const bestPractices = [
  "Keep all software and dependencies updated",
  "Use strong, unique passwords for all accounts",
  "Enable multi-factor authentication (MFA) everywhere",
  "Implement least privilege access control",
  "Use HTTPS/TLS for all communications",
  "Regular security audits and penetration testing",
  "Monitor logs and set up security alerts",
  "Encrypt sensitive data in transit and at rest",
  "Use a Web Application Firewall (WAF)",
  "Maintain an incident response plan",
];

export default function CybersecurityPage() {
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
          <h1 className="text-4xl font-bold text-white">Cybersecurity Hub</h1>
          <p className="text-gray-400">
            Security tools, vulnerability scanning, and best practices
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Security Posture Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: Shield,
              label: "Security Score",
              value: "94/100",
              trend: "+5",
              color: "from-green-600",
            },
            {
              icon: AlertTriangle,
              label: "Critical Issues",
              value: "2",
              trend: "-3",
              color: "from-red-600",
            },
            {
              icon: Eye,
              label: "Vulnerabilities Scanned",
              value: "1,250+",
              trend: "Active",
              color: "from-orange-600",
            },
            {
              icon: CheckCircle,
              label: "Compliance",
              value: "98.5%",
              trend: "+2.1%",
              color: "from-blue-600",
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className="card-glass p-6"
              >
                <Icon className={`mb-3 bg-gradient-to-r ${stat.color} to-cyan-600 bg-clip-text text-transparent`} size={24} />
                <p className="text-xs text-gray-500">{stat.label}</p>
                <div className="mt-2 flex items-end gap-2">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-green-400">{stat.trend}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Vulnerabilities Database */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <AlertTriangle size={24} className="text-red-400" />
            <h2 className="text-2xl font-bold text-white">
              Common Vulnerabilities
            </h2>
          </div>

          <div className="space-y-4">
            {vulnerabilities.map((vuln, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="tool-card"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white">{vuln.name}</h3>
                    <p className="text-sm text-gray-400">{vuln.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        vuln.severity === "Critical"
                          ? "bg-red-900/30 text-red-400"
                          : "bg-orange-900/30 text-orange-400"
                      }`}
                    >
                      {vuln.severity}
                    </span>
                    <span className="text-xs text-gray-500">CVSS: {vuln.cvss}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-blue-400">Prevention:</p>
                    <p className="text-gray-400">{vuln.prevention}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-cyan-400">Testing Tools:</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {vuln.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full bg-gray-800/50 px-2 py-1 text-xs text-cyan-400"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Security Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Lock size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              Essential Security Tools
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {securityTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="tool-card"
              >
                <h3 className="mb-1 font-bold text-white">{tool.name}</h3>
                <p className="mb-3 text-xs text-gray-500">{tool.category}</p>
                <p className="mb-4 text-sm text-gray-400">{tool.description}</p>

                <div className="space-y-2 text-xs">
                  <div>
                    <p className="text-blue-400 font-semibold">Use Case:</p>
                    <p className="text-gray-500">{tool.use}</p>
                  </div>
                  <span
                    className={`inline-block rounded-full px-3 py-1 ${
                      tool.severity === "Essential"
                        ? "bg-green-900/30 text-green-400"
                        : tool.severity === "Professional"
                          ? "bg-blue-900/30 text-blue-400"
                          : "bg-yellow-900/30 text-yellow-400"
                    }`}
                  >
                    {tool.severity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Security Best Practices */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <CheckCircle size={24} className="text-green-400" />
            <h2 className="text-2xl font-bold text-white">
              Security Best Practices
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {bestPractices.map((practice, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.03 }}
                className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <Zap size={18} className="mt-1 flex-shrink-0 text-cyan-400" />
                <p className="text-sm text-gray-300">{practice}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Security Framework */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Security Testing Methodology
          </h2>

          <div className="space-y-4">
            {[
              {
                phase: "1. Reconnaissance",
                items: ["Information gathering", "OSINT", "Network mapping"],
              },
              {
                phase: "2. Scanning",
                items: ["Port scanning", "Service enumeration", "Vulnerability scan"],
              },
              {
                phase: "3. Enumeration",
                items: ["Detailed service probing", "User accounts", "Resource discovery"],
              },
              {
                phase: "4. Exploitation",
                items: ["Verify vulnerabilities", "Gain access", "Document findings"],
              },
              {
                phase: "5. Reporting",
                items: ["Risk assessment", "Remediation advice", "Executive summary"],
              },
            ].map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + idx * 0.05 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                  <span className="text-sm font-bold text-white">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{stage.phase}</h3>
                  <ul className="mt-2 space-y-1">
                    {stage.items.map((item) => (
                      <li key={item} className="text-sm text-gray-400">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
