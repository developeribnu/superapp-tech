"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { ArrowRight, Sparkles } from "lucide-react";

const nodes = [
  { label: "Claude", color: "#d97706", x: 15, y: 25 },
  { label: "GPT", color: "#10b981", x: 45, y: 15 },
  { label: "Gemini", color: "#3b82f6", x: 75, y: 28 },
  { label: "Llama", color: "#1d4ed8", x: 25, y: 60 },
  { label: "Grok", color: "#ef4444", x: 60, y: 55 },
  { label: "DeepSeek", color: "#8b5cf6", x: 85, y: 60 },
  { label: "Mistral", color: "#f97316", x: 50, y: 40 },
  { label: "Qwen", color: "#06b6d4", x: 10, y: 45 },
];

const connections = [
  [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [0, 3], [1, 2], [4, 5], [7, 0], [7, 3],
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Ambient glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Network Graph Background */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice">
          {connections.map(([from, to], i) => (
            <motion.line
              key={i}
              x1={nodes[from].x}
              y1={nodes[from].y}
              x2={nodes[to].x}
              y2={nodes[to].y}
              stroke="currentColor"
              strokeWidth="0.12"
              className="text-muted-foreground"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}
          {nodes.map((node, i) => (
            <motion.circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="1.2"
              fill={node.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-accent/50 backdrop-blur-sm text-sm text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Your AI Command Center</span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Explore, Build &
          <br />
          <span className="gradient-text">Master AI.</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Compare 20+ LLMs, discover AI tools, build automation workflows,
          and master prompt engineering — all in one place.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/llms">
            <Button size="lg" className="gap-2 h-12 px-8 text-base">
              Explore Models
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/tools">
            <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base">
              AI Tools
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { target: 20, suffix: "+", label: "LLM Models" },
            { target: 35, suffix: "+", label: "AI Tools" },
            { target: 200, suffix: "+", label: "Prompts" },
            { target: 15, suffix: "+", label: "Workflows" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 rounded-xl text-center">
              <div className="text-2xl sm:text-3xl font-bold">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
