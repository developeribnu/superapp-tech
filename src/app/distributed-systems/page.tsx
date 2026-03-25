"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Network,
  Zap,
  Lock,
  BarChart3,
  Radio,
  Shield,
} from "lucide-react";

const concepts = [
  {
    name: "CAP Theorem",
    description:
      "A distributed system can guarantee only 2 of 3: Consistency, Availability, Partition Tolerance",
    implications:
      "Trade-offs between strong consistency and availability during network partitions",
    examples: ["CP: Traditional databases", "AP: NoSQL databases like DynamoDB"],
  },
  {
    name: "Consistency Models",
    description:
      "Defines guarantees about data visibility across distributed nodes",
    types: [
      "Strong Consistency: All reads see latest write",
      "Eventual Consistency: Reads eventually see latest write",
      "Causal Consistency: Respects causal relationships",
    ],
    examples: [
      "PostgreSQL (Strong)",
      "Cassandra (Eventual)",
      "DynamoDB (Configurable)",
    ],
  },
  {
    name: "Replication",
    description: "Copying data across multiple nodes for redundancy and performance",
    strategies: [
      "Master-Slave: One leader, multiple followers",
      "Master-Master: Multiple leaders with conflict resolution",
      "Quorum-based: Majority consensus for writes",
    ],
    tradeoffs: "Increased availability vs. consistency complexity",
  },
  {
    name: "Sharding",
    description: "Partitioning data across multiple databases horizontally",
    approaches: [
      "Range-based: By value ranges",
      "Hash-based: By hash of key",
      "Directory-based: By lookup table",
    ],
    challenges: "Hot spots, rebalancing, cross-shard queries",
  },
  {
    name: "Load Balancing",
    description: "Distributing requests across multiple servers",
    algorithms: [
      "Round-robin: Simple sequential distribution",
      "Least connections: Route to least busy server",
      "IP hash: Consistent routing",
    ],
    use: "Improve throughput, reliability, and fault tolerance",
  },
];

const algorithms = [
  {
    name: "Two-Phase Commit",
    type: "Consensus",
    description: "Ensures atomic transactions across distributed nodes",
    pros: "Guarantees strong consistency and atomicity",
    cons: "Blocking, poor fault tolerance, performance overhead",
    use: "Financial systems, ACID transactions",
  },
  {
    name: "Paxos",
    type: "Consensus",
    description: "Consensus algorithm that tolerates Byzantine failures",
    pros: "Fault tolerant, proven safe, deterministic",
    cons: "Complex, difficult to implement, multiple rounds",
    use: "Google's Chubby, Apache Zookeeper",
  },
  {
    name: "Raft",
    type: "Consensus",
    description: "Easier-to-understand consensus algorithm than Paxos",
    pros: "Simpler than Paxos, easier to understand and implement",
    cons: "Requires majority for consensus, election overhead",
    use: "etcd, Consul, CockroachDB",
  },
  {
    name: "CRDT",
    type: "Conflict Resolution",
    description: "Conflict-free replicated data types for eventual consistency",
    pros: "No coordination needed, automatic conflict resolution",
    cons: "More complex semantics, higher memory usage",
    use: "Collaborative editors, distributed databases",
  },
  {
    name: "Gossip Protocol",
    type: "Information Propagation",
    description: "Nodes randomly share information with peers",
    pros: "Robust, fault-tolerant, simple, scalable",
    cons: "Eventually consistent, convergence time uncertain",
    use: "Database replication, health checks, cluster management",
  },
];

const patterns = [
  {
    name: "Service Discovery",
    description: "Nodes find and connect to other services dynamically",
    tools: ["Consul", "etcd", "Zookeeper", "Kubernetes DNS"],
    pattern: "Clients query service registry to find available instances",
  },
  {
    name: "Circuit Breaker",
    description: "Prevent cascading failures by failing fast",
    tools: ["Hystrix", "resilience4j", "Polly"],
    pattern: "Monitor failures, open circuit on threshold, recover gradually",
  },
  {
    name: "Bulkhead",
    description: "Isolate resources to prevent total system failure",
    tools: ["Thread pools", "Kubernetes namespaces", "Container limits"],
    pattern: "Partition system into independent failure domains",
  },
  {
    name: "Saga Pattern",
    description: "Manage distributed transactions without ACID",
    tools: ["Axon Framework", "Temporal", "Dapr"],
    pattern: "Sequence of local transactions with compensation logic",
  },
  {
    name: "Event Sourcing",
    description: "Store immutable events instead of current state",
    tools: ["Event Store", "Apache Kafka", "AWS EventBridge"],
    pattern: "Rebuild state by replaying events, enables audit trails",
  },
  {
    name: "CQRS",
    description: "Separate read and write models",
    tools: ["Axon Framework", "Greg Young tools", "Temporal"],
    pattern: "Write model for transactions, read models optimized for queries",
  },
];

const challenges = [
  {
    challenge: "Network Failures",
    description: "Nodes may become unreachable or slow",
    solution: "Timeouts, retries, circuit breakers, health checks",
    tradeoff: "Cannot distinguish slow nodes from dead nodes",
  },
  {
    challenge: "Clock Skew",
    description: "Nodes have different clock times",
    solution: "NTP, logical clocks (Lamport, Vector), causality tracking",
    tradeoff: "Performance vs. precision, synchronization overhead",
  },
  {
    challenge: "Data Inconsistency",
    description: "Replicas diverge due to concurrent writes",
    solution: "Versioning, CRDTs, quorum writes, consensus algorithms",
    tradeoff: "Consistency vs. availability and performance",
  },
  {
    challenge: "Debugging & Testing",
    description: "Hard to reproduce concurrency issues",
    solution: "Distributed tracing, comprehensive logging, chaos engineering",
    tradeoff: "Instrumentation overhead, test coverage challenges",
  },
];

const systemsComparison = [
  {
    system: "Traditional Monolith",
    scaling: "Vertical only",
    consistency: "Strong",
    complexity: "Low",
    best: "Small teams, simple domains",
  },
  {
    system: "Microservices",
    scaling: "Horizontal",
    consistency: "Eventual",
    complexity: "High",
    best: "Large systems, independent teams",
  },
  {
    system: "Distributed Database",
    scaling: "Horizontal",
    consistency: "Configurable",
    complexity: "Very High",
    best: "Large-scale data, multi-region",
  },
  {
    system: "Serverless",
    scaling: "Automatic",
    consistency: "Per-function",
    complexity: "Medium",
    best: "Variable load, rapid iteration",
  },
];

export default function DistributedSystemsPage() {
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
            Distributed Systems Hub
          </h1>
          <p className="text-gray-400">
            Concepts, algorithms, patterns, and challenges
          </p>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Core Concepts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Network size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Core Concepts</h2>
          </div>

          <div className="space-y-4">
            {concepts.map((concept, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="tool-card"
              >
                <h3 className="mb-2 text-lg font-bold text-cyan-400">
                  {concept.name}
                </h3>
                <p className="mb-3 text-sm text-gray-400">
                  {concept.description}
                </p>

                {concept.implications && (
                  <div className="mb-3 rounded-lg border border-gray-700 bg-gray-900/50 p-3">
                    <p className="text-xs text-gray-500 font-semibold mb-1">
                      Implications:
                    </p>
                    <p className="text-xs text-gray-400">
                      {concept.implications}
                    </p>
                  </div>
                )}

                {concept.types && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 font-semibold mb-2">
                      Types:
                    </p>
                    <ul className="space-y-1">
                      {concept.types.map((type) => (
                        <li key={type} className="text-xs text-gray-400 flex gap-2">
                          <span>•</span> {type}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {concept.strategies && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 font-semibold mb-2">
                      Strategies:
                    </p>
                    <ul className="space-y-1">
                      {concept.strategies.map((strategy) => (
                        <li key={strategy} className="text-xs text-gray-400 flex gap-2">
                          <span>•</span> {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {(concept.examples || concept.approaches || concept.challenges || concept.tradeoffs) && (
                    <span className="text-xs rounded-full bg-gray-800/50 px-2 py-1 text-blue-400">
                      {concept.examples?.[0] || concept.approaches?.[0] || concept.challenges || concept.tradeoffs}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Consensus Algorithms */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Zap size={24} className="text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">
              Consensus Algorithms
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {algorithms.map((algo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                className="tool-card"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="font-bold text-cyan-400">{algo.name}</h3>
                  <span className="text-xs rounded-full bg-gray-800 px-2 py-1 text-blue-400">
                    {algo.type}
                  </span>
                </div>

                <p className="mb-3 text-sm text-gray-400">{algo.description}</p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between rounded-lg border border-green-900/50 bg-green-900/20 p-2">
                    <span className="text-green-400 font-semibold">Pros</span>
                    <span className="text-gray-400">{algo.pros}</span>
                  </div>
                  <div className="flex justify-between rounded-lg border border-red-900/50 bg-red-900/20 p-2">
                    <span className="text-red-400 font-semibold">Cons</span>
                    <span className="text-gray-400">{algo.cons}</span>
                  </div>
                </div>

                <div className="mt-3 rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                  <p className="text-xs text-gray-500">
                    <span className="text-cyan-400 font-semibold">Use:</span> {algo.use}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Design Patterns */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Radio size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Design Patterns</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {patterns.map((pattern, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-cyan-400">{pattern.name}</h3>
                <p className="mb-3 text-xs text-gray-400">
                  {pattern.description}
                </p>

                <div className="mb-3 space-y-2 text-xs">
                  <p className="text-gray-500 font-semibold">Tools:</p>
                  <div className="flex flex-wrap gap-1">
                    {pattern.tools.slice(0, 2).map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-gray-800/50 px-2 py-1 text-blue-400"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                  <p className="text-xs text-gray-500">
                    <span className="text-cyan-400 font-semibold">Pattern:</span> {pattern.pattern}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* System Challenges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <Shield size={24} className="text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Key Challenges</h2>
          </div>

          <div className="space-y-4">
            {challenges.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.08 }}
                className="tool-card"
              >
                <h3 className="mb-2 font-bold text-red-400">{item.challenge}</h3>
                <p className="mb-3 text-sm text-gray-400">{item.description}</p>

                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div className="rounded-lg border border-green-900/50 bg-green-900/20 p-2">
                    <p className="text-xs text-green-400 font-semibold mb-1">
                      Solution
                    </p>
                    <p className="text-xs text-gray-400">{item.solution}</p>
                  </div>
                  <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-2">
                    <p className="text-xs text-gray-500 font-semibold mb-1">
                      Tradeoff
                    </p>
                    <p className="text-xs text-gray-400">{item.tradeoff}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* System Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card-glass p-8"
        >
          <div className="mb-6 flex items-center gap-2">
            <BarChart3 size={24} className="text-green-400" />
            <h2 className="text-2xl font-bold text-white">
              System Architecture Comparison
            </h2>
          </div>

          <div className="space-y-3">
            {systemsComparison.map((system, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + idx * 0.08 }}
                className="rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <h3 className="mb-3 font-bold text-white">{system.system}</h3>

                <div className="grid gap-3 sm:grid-cols-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Scaling</p>
                    <p className="text-gray-400">{system.scaling}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">
                      Consistency
                    </p>
                    <p className="text-gray-400">{system.consistency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">
                      Complexity
                    </p>
                    <p className="text-gray-400">{system.complexity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">Best For</p>
                    <p className="text-gray-400">{system.best}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Learning Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="card-glass border-2 border-blue-600/30 p-8"
        >
          <h2 className="mb-6 text-xl font-bold text-white">
            Study Recommendations
          </h2>

          <div className="space-y-3">
            {[
              "🎓 Read 'Designing Data-Intensive Applications' by Martin Kleppmann",
              "📚 Study 'The Art of Multiprocessor Programming' for concurrency",
              "🔬 Implement Paxos or Raft from scratch for deep understanding",
              "💻 Experiment with distributed systems using Jepsen testing framework",
              "📊 Explore Kafka, Cassandra, or CockroachDB internals",
              "🏗️ Design your own distributed system from first principles",
              "🧪 Practice with LeetCode distributed systems problems",
              "🎯 Study production outage post-mortems from major companies",
            ].map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + idx * 0.03 }}
                className="flex items-start gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3"
              >
                <Network size={16} className="mt-1 text-cyan-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">{rec}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
