"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
  Award,
  Rocket,
  Code,
} from "lucide-react";
import { navigationItems } from "@/data/navigation";

const chartData = [
  { name: "AI", value: 50, tools: 12 },
  { name: "Security", value: 35, tools: 8 },
  { name: "Cloud", value: 45, tools: 11 },
  { name: "Automation", value: 40, tools: 10 },
  { name: "Data", value: 100, tools: 25 },
  { name: "Tools", value: 25, tools: 6 },
  { name: "GitHub", value: 30, tools: 7 },
  { name: "Content", value: 20, tools: 5 },
];

const activityData = [
  { name: "Week 1", active: 45, new: 12 },
  { name: "Week 2", active: 52, new: 18 },
  { name: "Week 3", active: 68, new: 24 },
  { name: "Week 4", active: 85, new: 31 },
];

const pieData = [
  { name: "AI & ML", value: 25 },
  { name: "Infrastructure", value: 20 },
  { name: "Security", value: 15 },
  { name: "Automation", value: 18 },
  { name: "Data", value: 22 },
];

const COLORS = ["#3b82f6", "#06b6d4", "#ec4899", "#f59e0b", "#10b981"];

const recentActivity = [
  {
    title: "Claude 3.5 Sonnet Release",
    category: "AI & LLM",
    time: "2 hours ago",
    icon: "🚀",
  },
  {
    title: "New GitHub Achievement: DevOps Master",
    category: "GitHub Tools",
    time: "4 hours ago",
    icon: "⭐",
  },
  {
    title: "Security Patch: OpenSSL 3.2.1",
    category: "Cybersecurity",
    time: "6 hours ago",
    icon: "🛡️",
  },
  {
    title: "n8n Workflow: Email Automation Template",
    category: "Automation",
    time: "8 hours ago",
    icon: "⚡",
  },
  {
    title: "API Update: 500+ New Endpoints",
    category: "Data Scraping",
    time: "12 hours ago",
    icon: "📊",
  },
];

const stats = [
  { icon: Code, label: "Total Tools", value: "350+", color: "from-blue-600" },
  {
    icon: Zap,
    label: "Automation Bots",
    value: "40+",
    color: "from-yellow-600",
  },
  { icon: Users, label: "Active Users", value: "12K+", color: "from-purple-600" },
  { icon: Award, label: "Integrations", value: "150+", color: "from-pink-600" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 p-4 md:p-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 rounded-2xl border border-gray-800 bg-gradient-to-r from-blue-950/50 via-purple-950/50 to-gray-950 p-8 md:p-12"
      >
        <div className="flex flex-col items-start gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-2 text-4xl font-bold md:text-6xl"
            >
              <span className="gradient-text">Tech & AI Hub</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-6 max-w-2xl text-lg text-gray-400"
            >
              Your complete superapp for AI, cybersecurity, cloud infrastructure,
              automation, and 6+ more specialized tech domains. Discover 350+
              tools and integrate them into your workflow.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <Link href="/ai-llm" className="btn-primary flex items-center gap-2">
                Explore Tools <ArrowRight size={18} />
              </Link>
              <Link href="/automation" className="btn-secondary">
                Build Automations
              </Link>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="card-glass p-4 text-center"
                >
                  <Icon className="mx-auto mb-2 text-blue-400" size={24} />
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className={`text-xl font-bold bg-gradient-to-r ${stat.color} to-cyan-600 bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="space-y-12">
        {/* Section Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {navigationItems.map((navItem) => {
            const Icon = navItem.icon;
            return (
              <motion.div key={navItem.slug} variants={item}>
                <Link href={`/${navItem.slug}`}>
                  <div className={`section-card relative h-full overflow-hidden`}>
                    <div className="absolute right-0 top-0 -m-8 opacity-20">
                      <Icon size={120} />
                    </div>

                    <div className="relative z-10">
                      <div
                        className={`mb-4 inline-flex rounded-lg bg-gradient-to-r ${navItem.color} p-3`}
                      >
                        <Icon size={24} className="text-white" />
                      </div>

                      <h3 className="mb-2 text-xl font-bold text-white">
                        {navItem.label}
                      </h3>
                      <p className="mb-4 text-sm text-gray-400">
                        {navItem.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-400">
                          {navItem.count} Tools
                        </span>
                        <ArrowRight size={16} className="text-gray-600" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          {/* Tools by Category */}
          <div className="card-glass p-6">
            <h2 className="mb-6 text-xl font-bold text-white">
              Tools by Category
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Growth Trends */}
          <div className="card-glass p-6">
            <h2 className="mb-6 text-xl font-bold text-white">
              Monthly Activity
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="new"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="card-glass p-6">
            <h2 className="mb-6 text-xl font-bold text-white">
              Category Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Key Metrics */}
          <div className="card-glass space-y-4 p-6">
            <h2 className="text-xl font-bold text-white">Key Metrics</h2>
            <div className="space-y-3">
              {[
                { label: "Average Tool Rating", value: "4.8/5.0", trend: "+0.2" },
                {
                  label: "Implementation Time",
                  value: "< 30 min",
                  trend: "-5%",
                },
                { label: "Success Rate", value: "98.5%", trend: "+1.2%" },
                {
                  label: "API Uptime",
                  value: "99.99%",
                  trend: "Stable",
                },
              ].map((metric, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                  <span className="text-sm text-gray-400">{metric.label}</span>
                  <div className="text-right">
                    <p className="font-semibold text-white">{metric.value}</p>
                    <p className="text-xs text-green-400">{metric.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="card-glass p-6"
        >
          <div className="mb-6 flex items-center gap-2">
            <TrendingUp size={24} className="text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + idx * 0.05 }}
                className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-800/30 p-4 transition-all hover:border-gray-700 hover:bg-gray-800/50"
              >
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-white">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.category}</p>
                </div>
                <span className="text-xs text-gray-600">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="card-glass border-2 border-blue-600/30 p-8 text-center"
        >
          <Rocket className="mx-auto mb-4 text-blue-400" size={40} />
          <h3 className="mb-2 text-2xl font-bold text-white">
            Ready to Get Started?
          </h3>
          <p className="mb-6 text-gray-400">
            Explore any section in the sidebar to discover tools and start building
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ai-llm" className="btn-primary">
              Start with AI
            </Link>
            <Link href="/automation" className="btn-secondary">
              Build Automation
            </Link>
            <Link href="/scraping" className="btn-secondary">
              Access APIs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
