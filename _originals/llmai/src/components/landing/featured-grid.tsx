"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Wrench, BookOpen, Bot, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: Search,
    title: "Explore",
    description: "Browse 20+ LLMs, compare models side-by-side, and track performance benchmarks across providers.",
    href: "/llms",
    gradient: "from-indigo-500/20 to-violet-500/20",
    iconColor: "text-indigo-400",
    links: [
      { label: "Models", href: "/llms" },
      { label: "Compare", href: "/compare" },
      { label: "Benchmarks", href: "/benchmarks" },
    ],
  },
  {
    icon: Wrench,
    title: "Build",
    description: "Discover AI tools, follow step-by-step workflow guides, and access 200+ curated prompt templates.",
    href: "/tools",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    links: [
      { label: "AI Tools", href: "/tools" },
      { label: "Workflows", href: "/workflows" },
      { label: "Prompts", href: "/prompts" },
    ],
  },
  {
    icon: BookOpen,
    title: "Learn",
    description: "Deep-dive articles, knowledge base, and presentation materials on agentic AI and LLM orchestration.",
    href: "/learn",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    links: [
      { label: "Library", href: "/learn" },
      { label: "Presentasi", href: "/presentasi" },
    ],
  },
  {
    icon: Bot,
    title: "OpenClaw",
    description: "An open framework for multi-LLM collaboration patterns and agentic AI architecture design.",
    href: "/openclaw",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    links: [
      { label: "Framework", href: "/openclaw" },
      { label: "Collaboration", href: "/collaborate" },
    ],
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturedGrid() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold">
            Everything AI, <span className="gradient-text">One Platform</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Four pillars to help you navigate the AI landscape — from exploration to production.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.title} variants={item}>
                <div className="pillar-card p-6 sm:p-8 h-full group">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-6 w-6 ${pillar.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Quick Links */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pillar.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs px-3 py-1.5 rounded-lg bg-accent/50 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline decoration-primary/50 font-medium"
                  >
                    Explore {pillar.title}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
