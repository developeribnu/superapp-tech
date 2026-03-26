"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";

export function WhyMultiLLM() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold">
            Why use multiple LLMs?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            No single model is best at everything. Orchestrate multiple LLMs for
            results that surpass any individual model.
          </p>
        </motion.div>

        {/* Pipeline Diagram */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[
            { label: "Research", model: "Gemini", color: "#3b82f6" },
            { label: "Analyze", model: "Claude", color: "#d97706" },
            { label: "Execute", model: "GPT", color: "#10b981" },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 sm:gap-4">
              <div className="glass-card px-4 py-3 rounded-lg text-center">
                <div className="text-sm font-semibold">{step.label}</div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: step.color }}
                >
                  {step.model}
                </div>
              </div>
              {i < 2 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
          {[
            { target: 40, suffix: "%", label: "Better Quality", desc: "Cross-model review catches blind spots" },
            { target: 60, suffix: "%", label: "Cost Savings", desc: "Route simple tasks to cheaper models" },
            { target: 2, suffix: "x", label: "Faster Workflow", desc: "Parallel processing & specialist delegation" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-5 rounded-xl text-center"
            >
              <div className="text-2xl font-bold">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium mt-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/collaborate">
            <Button variant="outline" className="gap-2">
              Explore Collaboration Patterns
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
