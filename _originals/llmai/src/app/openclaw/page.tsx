"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Bot,
  Workflow,
  Shield,
  Calendar,
  DollarSign,
  Clock,
  Zap,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Terminal,
  BookOpen,
  Target
} from "lucide-react";
import {
  aiStackData,
  useCasesData,
  kimiAutomationsData,
  workflowLoopsData,
  clawHubSkillsData,
  securityRulesData,
  roiData,
  roadmapData,
  openclawStats,
  totalBiaya
} from "@/data/openclaw-data";

const platformColors: Record<string, string> = {
  "Claude Max 5x": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Claude Max": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Claude": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "ChatGPT Plus": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "ChatGPT": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Kimi Claw": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Gemini Pro": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Gemini": "bg-blue-500/20 text-blue-400 border-blue-500/30"
};

const platformIcons: Record<string, string> = {
  "Claude Max 5x": "🧠",
  "Claude Max": "🧠",
  "Claude": "🧠",
  "ChatGPT Plus": "🤖",
  "ChatGPT": "🤖",
  "Kimi Claw": "🦞",
  "Gemini Pro": "📅",
  "Gemini": "📅"
};

export default function OpenClawPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <Bot className="h-4 w-4" />
              Multi-AI Orchestration Framework
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Open<span className="text-orange-500">Claw</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Sistem orkestrasi 4 AI platform (Claude, ChatGPT, Kimi, Gemini) untuk otomatisasi 
              workflow di Government, Tech, Content Creation, dan PhD Research.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: "AI Platforms", value: openclawStats.totalPlatforms, icon: Brain },
              { label: "Workflows", value: openclawStats.totalWorkflows, icon: Workflow },
              { label: "Automations", value: openclawStats.totalAutomations, icon: Bot },
              { label: "Monthly Cost", value: `$${openclawStats.totalMonthlyCost}`, icon: DollarSign }
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 rounded-xl text-center">
                <stat.icon className="h-5 w-5 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Tabs defaultValue="stack" className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto justify-start gap-2 bg-transparent mb-8">
              <TabsTrigger value="stack" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <Layers className="h-4 w-4 mr-2" />
                AI Stack
              </TabsTrigger>
              <TabsTrigger value="usecases" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <Target className="h-4 w-4 mr-2" />
                Use Cases
              </TabsTrigger>
              <TabsTrigger value="automations" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <Clock className="h-4 w-4 mr-2" />
                Automations
              </TabsTrigger>
              <TabsTrigger value="workflows" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <Workflow className="h-4 w-4 mr-2" />
                Workflows
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <Terminal className="h-4 w-4 mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="roi" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <DollarSign className="h-4 w-4 mr-2" />
                ROI
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
                <Calendar className="h-4 w-4 mr-2" />
                Roadmap
              </TabsTrigger>
            </TabsList>

            {/* AI Stack Tab */}
            <TabsContent value="stack">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">AI Stack Overview</h2>
                  <Badge variant="outline" className="text-orange-400 border-orange-500/30">
                    Total: {totalBiaya.bulanan}
                  </Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {aiStackData.map((item, index) => (
                    <motion.div
                      key={item.platform}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-border/50 hover:border-orange-500/30 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{platformIcons[item.platform]}</span>
                              <div>
                                <CardTitle className="text-lg">{item.platform}</CardTitle>
                                <CardDescription>{item.biayaBulanan}/month</CardDescription>
                              </div>
                            </div>
                            <Badge className={platformColors[item.platform]}>
                              {item.workloadPercent}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Peran Utama</span>
                            <p className="text-sm mt-1">{item.peranUtama}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-xs text-emerald-500 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Keunggulan
                              </span>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{item.keunggulanUnik}</p>
                            </div>
                            <div>
                              <span className="text-xs text-red-500 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" /> Kelemahan
                              </span>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-3">{item.kelemahan}</p>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Domain Terbaik</span>
                            <p className="text-sm mt-1">{item.domainTerbaik}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Use Cases Tab */}
            <TabsContent value="usecases">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Use Cases per Domain</h2>
                <div className="grid gap-6">
                  {["🏛️ Government", "💻 Tech/Dev", "🎬 Content Creation", "🎓 PhD/Research"].map((domain) => (
                    <div key={domain}>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        {domain}
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {useCasesData
                          .filter((uc) => uc.domain === domain)
                          .map((useCase, index) => (
                            <motion.div
                              key={`${useCase.useCase}-${index}`}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card className="h-full border-border/50 hover:border-orange-500/30 transition-colors">
                                <CardHeader className="pb-2">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm">{useCase.useCase}</CardTitle>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                      {platformIcons[useCase.platformUtama]} {useCase.platformUtama}
                                    </Badge>
                                    {useCase.platformSupport !== "—" && (
                                      <Badge variant="outline" className="text-xs text-muted-foreground">
                                        + {useCase.platformSupport}
                                      </Badge>
                                    )}
                                  </div>
                                </CardHeader>
                                <CardContent className="space-y-2 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Frekuensi</span>
                                    <span>{useCase.frekuensi}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Skill/Tool</span>
                                    <span className="text-right max-w-[50%]">{useCase.skillTool}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Time Saved</span>
                                    <span className="text-emerald-400">{useCase.estimasiWaktuHemat}</span>
                                  </div>
                                  <div className="pt-2 border-t border-border/50">
                                    <span className="text-muted-foreground">Output:</span>
                                    <p className="mt-1">{useCase.output}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Automations Tab */}
            <TabsContent value="automations">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Kimi Claw Automations</h2>
                  <Badge variant="outline" className="text-orange-400">
                    {kimiAutomationsData.length} Cron Jobs
                  </Badge>
                </div>
                <div className="grid gap-4">
                  {kimiAutomationsData.map((auto, index) => (
                    <motion.div
                      key={auto.namaTask}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="border-border/50 hover:border-orange-500/30 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex items-center gap-3 md:w-48">
                              <div className={`w-2 h-2 rounded-full ${auto.priority.includes("HIGH") ? "bg-red-500" : auto.priority.includes("MED") ? "bg-yellow-500" : "bg-green-500"}`} />
                              <span className="text-sm font-medium">{auto.waktuJadwal}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">{auto.namaTask}</h4>
                              <p className="text-sm text-muted-foreground">{auto.deskripsi}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <code className="text-xs bg-muted px-2 py-1 rounded">{auto.cronExpression}</code>
                                <Badge variant="outline" className="text-xs">{auto.skillsDibutuhkan}</Badge>
                                <Badge variant="outline" className="text-xs text-muted-foreground">→ {auto.outputChannel}</Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Workflows Tab */}
            <TabsContent value="workflows">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Workflow Loops</h2>
                <div className="grid gap-6">
                  {workflowLoopsData.map((workflow, index) => (
                    <motion.div
                      key={workflow.workflowName}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-border/50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>{workflow.workflowName}</CardTitle>
                            <Badge variant="outline" className="text-orange-400">{workflow.frekuensi}</Badge>
                          </div>
                          <CardDescription>{workflow.hasilAkhir}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                            {[workflow.step1, workflow.step2, workflow.step3, workflow.step4].map((step, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="glass-card px-3 py-2 rounded-lg text-sm max-w-[200px]">
                                  {step}
                                </div>
                                {i < 3 && <ArrowRight className="h-4 w-4 text-muted-foreground hidden md:block" />}
                                {i < 3 && <div className="md:hidden w-px h-4 bg-border ml-4" />}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">ClawHub Skills Guide</h2>
                <div className="space-y-6">
                  {["Tier 1", "Tier 2", "Tier 3"].map((tier) => (
                    <div key={tier}>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-500" />
                        {tier} Skills
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {clawHubSkillsData
                          .filter((skill) => skill.tier === tier)
                          .map((skill, index) => (
                            <motion.div
                              key={skill.skillName}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card className="h-full border-border/50 hover:border-orange-500/30 transition-colors">
                                <CardHeader className="pb-2">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm">{skill.skillName}</CardTitle>
                                    <Badge 
                                      variant="outline" 
                                      className={skill.securityRisk.includes("LOW") ? "text-emerald-400 border-emerald-500/30" : "text-yellow-400 border-yellow-500/30"}
                                    >
                                      {skill.securityRisk}
                                    </Badge>
                                  </div>
                                  <CardDescription>{skill.kategori}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <p className="text-xs">{skill.fungsi}</p>
                                  <code className="text-xs bg-muted px-2 py-1 rounded block">{skill.installCommand}</code>
                                  <div className="flex flex-wrap gap-1">
                                    <Badge variant="secondary" className="text-xs">{skill.rekomendasiDomain}</Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{skill.notes}</p>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Security & Data Rules</h2>
                <Card className="border-border/50">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border/50">
                            <th className="text-left p-4 text-sm font-medium">Tipe Data</th>
                            <th className="text-center p-4 text-sm font-medium">Claude Max</th>
                            <th className="text-center p-4 text-sm font-medium">ChatGPT</th>
                            <th className="text-center p-4 text-sm font-medium">Gemini</th>
                            <th className="text-center p-4 text-sm font-medium">Kimi Claw</th>
                          </tr>
                        </thead>
                        <tbody>
                          {securityRulesData.map((rule, index) => (
                            <tr key={index} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                              <td className="p-4 text-sm">{rule.tipeData}</td>
                              <td className="p-4 text-center text-sm">{rule.claudeMax}</td>
                              <td className="p-4 text-center text-sm">{rule.chatGPT}</td>
                              <td className="p-4 text-center text-sm">{rule.gemini}</td>
                              <td className="p-4 text-center text-sm">{rule.kimiClaw}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-red-500/30 bg-red-500/5">
                    <CardHeader>
                      <CardTitle className="text-red-400 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Data Yang TIDAK BOLEH ke Kimi Claw
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>❌ Dokumen pemerintah internal</li>
                        <li>❌ Data kinerja program (BSPS, FLPP)</li>
                        <li>❌ Draft research/unpublished papers</li>
                        <li>❌ Code repository private</li>
                        <li>❌ Personal financial data</li>
                        <li>❌ PII (Personal Identifiable Information)</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-amber-500/30 bg-amber-500/5">
                    <CardHeader>
                      <CardTitle className="text-amber-400 flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Best Practices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>✅ Gunakan Kimi Claw hanya untuk data publik</li>
                        <li>✅ Simpan API keys di environment variables</li>
                        <li>✅ Review OAuth scopes sebelum install skills</li>
                        <li>✅ Buat email terpisah untuk agent operations</li>
                        <li>✅ Gunakan personal email (bukan gov) untuk himalaya</li>
                        <li>✅ Limit GitHub access ke repo non-sensitive</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* ROI Tab */}
            <TabsContent value="roi">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">ROI Calculator</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Biaya Bulanan</CardTitle>
                      <CardDescription>Subscription costs per platform</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(roiData.biaya).map(([platform, cost]) => (
                        <div key={platform} className="flex items-center justify-between">
                          <span className="capitalize">{platform.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-mono">${cost}</span>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-border/50 flex items-center justify-between font-bold">
                        <span>Total Bulanan</span>
                        <span className="text-orange-400">${roiData.totalBulanan}</span>
                      </div>
                      <div className="flex items-center justify-between text-muted-foreground">
                        <span>Total Tahunan</span>
                        <span>${roiData.totalTahunan.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle>Time Savings Analysis</CardTitle>
                      <CardDescription>Estimated hours saved per month</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {roiData.tasks.map((task) => (
                        <div key={task.task}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>{task.task}</span>
                            <span className="text-emerald-400">{Math.round(task.totalMinHemat / 60)} hours</span>
                          </div>
                          <Progress value={(task.totalMinHemat / roiData.totalTimeSaved) * 100} className="h-2" />
                        </div>
                      ))}
                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-center justify-between font-bold">
                          <span>Total Time Saved</span>
                          <span className="text-emerald-400">{openclawStats.timeSavedPerMonth}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-emerald-500/30 bg-emerald-500/5">
                  <CardHeader>
                    <CardTitle className="text-emerald-400 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      ROI Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold">${roiData.totalBulanan}</div>
                      <div className="text-sm text-muted-foreground">Monthly Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">${Math.round((roiData.totalTimeSaved / 60) * roiData.valueOfTime)}</div>
                      <div className="text-sm text-muted-foreground">Monthly Value (@ $50/hr)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400">{roiData.roiPercent}%</div>
                      <div className="text-sm text-muted-foreground">ROI</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Roadmap Tab */}
            <TabsContent value="roadmap">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Implementation Roadmap</h2>
                <div className="space-y-4">
                  {["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => (
                    <div key={week}>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-orange-500" />
                        {week}
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {roadmapData
                          .filter((item) => item.week === week)
                          .map((item, index) => (
                            <motion.div
                              key={`${item.week}-${index}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Card className="border-border/50">
                                <CardHeader className="pb-2">
                                  <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-orange-400">{item.phase}</Badge>
                                    <Badge variant="secondary">{item.estTime}</Badge>
                                  </div>
                                  <CardTitle className="text-sm mt-2">{item.platform}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                  <p className="text-sm whitespace-pre-line">{item.actions}</p>
                                  <div className="pt-2 border-t border-border/50">
                                    <span className="text-xs text-muted-foreground">Deliverable:</span>
                                    <p className="text-sm">{item.deliverable}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
