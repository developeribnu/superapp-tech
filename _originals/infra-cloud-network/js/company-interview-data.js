// Company-Specific Interview Questions Data Module
const COMPANY_INTERVIEW_DATA = {
  companies: {
    title: "Company Interviews",
    description: "Interview questions and preparation for specific companies",
    color: "var(--warning)",
    subtopics: {
      "FAANG & Big Tech": [
        {
          id: "amazon-interview",
          title: "Amazon Interview Preparation",
          tags: ["interview", "amazon", "faang"],
          summary: "Comprehensive guide to Amazon's Leadership Principles and technical interview process.",
          content: `
<div class="company-interview-guide">
  <div class="company-header">
    <div class="company-logo">AMZN</div>
    <div class="company-info">
      <h3>Amazon Interview Preparation</h3>
      <p>Cloud Infrastructure, DevOps, and SRE roles</p>
      <div class="interview-meta">
        <span class="meta-item">📊 Difficulty: Hard</span>
        <span class="meta-item">⏱️ Process: 4-6 weeks</span>
        <span class="meta-item">📝 Rounds: 5-7</span>
      </div>
    </div>
  </div>
  
  <div class="interview-process">
    <h4>Interview Process</h4>
    <div class="process-timeline">
      <div class="process-step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h5>Recruiter Screen (30 min)</h5>
          <p>Basic fit, experience overview, salary expectations</p>
        </div>
      </div>
      <div class="process-step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h5>Phone Screen (45-60 min)</h5>
          <p>Technical screening with a senior engineer. Coding or system design depending on level.</p>
        </div>
      </div>
      <div class="process-step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h5>Online Assessment</h5>
          <p>Coding assessment + Work Simulation (for some roles)</p>
        </div>
      </div>
      <div class="process-step">
        <div class="step-number">4</div>
        <div class="step-content">
          <h5>Loop Interviews (5-6 hours)</h5>
          <p>4-5 interviews covering: System Design, Coding, Leadership Principles, and Bar Raiser</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="lp-section">
    <h4>🎯 Leadership Principles (Crucial!)</h4>
    <p class="lp-intro">Every answer should tie back to these principles. Prepare 2-3 stories for each.</p>
    
    <div class="lp-grid">
      <div class="lp-card">
        <h5>Customer Obsession</h5>
        <p>"Leaders start with the customer and work backwards."</p>
        <div class="lp-question">
          <strong>Q:</strong> Tell me about a time you had to make a decision that was better for the customer but worse for the business.
        </div>
      </div>
      <div class="lp-card">
        <h5>Ownership</h5>
        <p>"Leaders are owners. They think long-term and don't sacrifice long-term value for short-term results."</p>
        <div class="lp-question">
          <strong>Q:</strong> Describe a time when you took on a project outside your job responsibilities.
        </div>
      </div>
      <div class="lp-card">
        <h5>Invent and Simplify</h5>
        <p>"Leaders expect and require innovation and invention from their teams."</p>
        <div class="lp-question">
          <strong>Q:</strong> Tell me about a complex problem you simplified. How did you approach it?
        </div>
      </div>
      <div class="lp-card">
        <h5>Dive Deep</h5>
        <p>"Leaders operate at all levels, stay connected to the details, audit frequently."</p>
        <div class="lp-question">
          <strong>Q:</strong> Tell me about a time when you had to dig deep to understand the root cause of a problem.
        </div>
      </div>
      <div class="lp-card">
        <h5>Deliver Results</h5>
        <p>"Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion."</p>
        <div class="lp-question">
          <strong>Q:</strong> Describe a time when you had to deliver a project with a tight deadline.
        </div>
      </div>
      <div class="lp-card">
        <h5>Hire and Develop the Best</h5>
        <p>"Leaders raise the performance bar with every hire and promotion."</p>
        <div class="lp-question">
          <strong>Q:</strong> Tell me about a time you mentored someone who was struggling.
        </div>
      </div>
    </div>
  </div>
  
  <div class="technical-questions">
    <h4>🛠️ Technical Questions</h4>
    
    <div class="tech-category">
      <h5>System Design</h5>
      <div class="question-list">
        <div class="question-item">
          <div class="question-text">Design a URL shortening service like bit.ly that handles 10M requests/day</div>
          <div class="question-tags">
            <span class="q-tag">System Design</span>
            <span class="q-tag difficulty-hard">Hard</span>
          </div>
        </div>
        <div class="question-item">
          <div class="question-text">Design a distributed rate limiter for API requests</div>
          <div class="question-tags">
            <span class="q-tag">System Design</span>
            <span class="q-tag difficulty-hard">Hard</span>
          </div>
        </div>
        <div class="question-item">
          <div class="question-text">How would you design S3? Focus on consistency and availability trade-offs</div>
          <div class="question-tags">
            <span class="q-tag">System Design</span>
            <span class="q-tag difficulty-hard">Hard</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="tech-category">
      <h5>Infrastructure & DevOps</h5>
      <div class="question-list">
        <div class="question-item">
          <div class="question-text">Design a CI/CD pipeline for a microservices architecture</div>
          <div class="question-tags">
            <span class="q-tag">DevOps</span>
            <span class="q-tag difficulty-medium">Medium</span>
          </div>
        </div>
        <div class="question-item">
          <div class="question-text">How do you handle secrets management across multiple environments?</div>
          <div class="question-tags">
            <span class="q-tag">Security</span>
            <span class="q-tag difficulty-medium">Medium</span>
          </div>
        </div>
        <div class="question-item">
          <div class="question-text">Explain how you would migrate a monolith to microservices with zero downtime</div>
          <div class="question-tags">
            <span class="q-tag">Architecture</span>
            <span class="q-tag difficulty-hard">Hard</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="tech-category">
      <h5>Linux & Networking</h5>
      <div class="question-list">
        <div class="question-item">
          <div class="question-text">A server is experiencing high load. Walk me through your debugging process</div>
          <div class="question-tags">
            <span class="q-tag">Troubleshooting</span>
            <span class="q-tag difficulty-medium">Medium</span>
          </div>
        </div>
        <div class="question-item">
          <div class="question-text">Explain TCP 3-way handshake and what happens if the third ACK is lost</div>
          <div class="question-tags">
            <span class="q-tag">Networking</span>
            <span class="q-tag difficulty-medium">Medium</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="salary-section">
    <h4>💰 Compensation Ranges (2025)</h4>
    <div class="salary-table">
      <div class="salary-row header">
        <span>Level</span>
        <span>Base</span>
        <span>Signing</span>
        <span>RSUs (4yr)</span>
        <span>Total (Y1)</span>
      </div>
      <div class="salary-row">
        <span>L4 (New Grad)</span>
        <span>$130K</span>
        <span>$20K</span>
        <span>$80K</span>
        <span>$160K</span>
      </div>
      <div class="salary-row">
        <span>L5 (SDE II)</span>
        <span>$155K</span>
        <span>$25K</span>
        <span>$120K</span>
        <span>$200K</span>
      </div>
      <div class="salary-row">
        <span>L6 (Senior)</span>
        <span>$185K</span>
        <span>$35K</span>
        <span>$200K</span>
        <span>$280K</span>
      </div>
      <div class="salary-row">
        <span>L7 (Staff)</span>
        <span>$210K</span>
        <span>$50K</span>
        <span>$350K</span>
        <span>$400K</span>
      </div>
    </div>
    <p class="salary-note">* Figures are approximate and vary by location (higher in SF/Seattle/NYC)</p>
  </div>
</div>

<style>
.company-interview-guide { max-width: 1000px; }

.company-header {
  display: flex;
  gap: 24px;
  padding: 32px;
  background: linear-gradient(135deg, #232f3e, #37475a);
  border-radius: var(--radius-lg);
  margin-bottom: 32px;
}
.company-logo {
  width: 80px;
  height: 80px;
  background: #ff9900;
  color: #232f3e;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 20px;
  flex-shrink: 0;
}
.company-info h3 {
  color: white;
  margin-bottom: 8px;
  font-size: 24px;
}
.company-info p {
  color: rgba(255,255,255,0.7);
  margin-bottom: 16px;
}
.interview-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.meta-item {
  color: rgba(255,255,255,0.9);
  font-size: 14px;
}

.interview-process { margin-bottom: 40px; }
.interview-process h4 { margin-bottom: 24px; }

.process-timeline { display: grid; gap: 16px; }
.process-step {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.step-number {
  width: 40px;
  height: 40px;
  background: var(--accent);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}
.step-content h5 {
  font-size: 16px;
  margin-bottom: 6px;
  color: var(--text-primary);
}
.step-content p {
  font-size: 14px;
  color: var(--text-secondary);
}

.lp-section { margin-bottom: 40px; }
.lp-section h4 { margin-bottom: 12px; }
.lp-intro {
  color: var(--text-secondary);
  margin-bottom: 24px;
  font-size: 14px;
}

.lp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.lp-card {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--accent);
}
.lp-card h5 {
  font-size: 15px;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.lp-card p {
  font-size: 13px;
  color: var(--text-tertiary);
  font-style: italic;
  margin-bottom: 16px;
}
.lp-question {
  padding: 12px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.technical-questions { margin-bottom: 40px; }
.technical-questions h4 { margin-bottom: 24px; }

.tech-category { margin-bottom: 24px; }
.tech-category h5 {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.question-list { display: grid; gap: 12px; }
.question-item {
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}
.question-text {
  flex: 1;
  font-size: 14px;
  color: var(--text-primary);
}
.question-tags {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.q-tag {
  padding: 4px 10px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  font-size: 11px;
}
.q-tag.difficulty-hard {
  background: var(--danger);
  color: white;
}
.q-tag.difficulty-medium {
  background: var(--warning);
  color: white;
}

.salary-section h4 { margin-bottom: 16px; }
.salary-table {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.salary-row {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr);
  gap: 16px;
  padding: 14px 20px;
  font-size: 14px;
}
.salary-row.header {
  background: var(--bg-tertiary);
  font-weight: 600;
  color: var(--text-secondary);
}
.salary-row:not(.header) {
  color: var(--text-primary);
  border-bottom: 1px solid var(--border);
}
.salary-row:last-child { border-bottom: none; }

.salary-note {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 12px;
  font-style: italic;
}

@media (max-width: 768px) {
  .company-header { flex-direction: column; }
  .lp-grid { grid-template-columns: 1fr; }
  .question-item { flex-direction: column; }
  .salary-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .salary-row.header { display: none; }
}
</style>`
        },
        {
          id: "google-interview",
          title: "Google Interview Preparation",
          tags: ["interview", "google", "faang"],
          summary: "Google's interview process focuses on Googlyness, algorithms, and system design.",
          content: `
<div class="company-interview-guide">
  <div class="company-header google">
    <div class="company-logo google-logo">G</div>
    <div class="company-info">
      <h3>Google Interview Preparation</h3>
      <p>SRE, Cloud Infrastructure, and DevOps roles</p>
      <div class="interview-meta">
        <span class="meta-item">📊 Difficulty: Very Hard</span>
        <span class="meta-item">⏱️ Process: 2-3 months</span>
        <span class="meta-item">📝 Rounds: 6-8</span>
      </div>
    </div>
  </div>
  
  <div class="google-specific">
    <h4>🌟 What Google Looks For (Googlyness)</h4>
    <div class="googly-traits">
      <div class="trait-card">
        <h5>Intellectual Humility</h5>
        <p>"You can be confident and humble at the same time." Google values people who can admit mistakes and learn from them.</p>
      </div>
      <div class="trait-card">
        <h5>Comfort with Ambiguity</h5>
        <p>"Problems aren't fully defined." Show you can work with incomplete information and ask clarifying questions.</p>
      </div>
      <div class="trait-card">
        <h5>Collaborative Nature</h5>
        <p>"No brilliant jerks." Google strongly values teamwork and how you interact with others.</p>
      </div>
    </div>
  </div>
  
  <div class="technical-questions">
    <h4>🛠️ SRE-Specific Questions</h4>
    <div class="question-list">
      <div class="question-item">
        <div class="question-text">How do you define reliability? How do you measure it?</div>
        <div class="question-tags">
          <span class="q-tag">SRE</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Explain the difference between SLI, SLO, and SLA with examples</div>
        <div class="question-tags">
          <span class="q-tag">SRE</span>
          <span class="q-tag difficulty-medium">Medium</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Design a monitoring system for a globally distributed service</div>
        <div class="question-tags">
          <span class="q-tag">System Design</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">How would you handle a cascading failure in a microservices architecture?</div>
        <div class="question-tags">
          <span class="q-tag">Reliability</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="salary-section">
    <h4>💰 Compensation (2025)</h4>
    <div class="salary-table">
      <div class="salary-row header">
        <span>Level</span>
        <span>Base</span>
        <span>Bonus</span>
        <span>GSUs (4yr)</span>
        <span>Total (Y1)</span>
      </div>
      <div class="salary-row">
        <span>L3 (New Grad)</span>
        <span>$140K</span>
        <span>$20K</span>
        <span>$100K</span>
        <span>$185K</span>
      </div>
      <div class="salary-row">
        <span>L4</span>
        <span>$165K</span>
        <span>$25K</span>
        <span>$150K</span>
        <span>$240K</span>
      </div>
      <div class="salary-row">
        <span>L5 (Senior)</span>
        <span>$195K</span>
        <span>$35K</span>
        <span>$250K</span>
        <span>$350K</span>
      </div>
      <div class="salary-row">
        <span>L6 (Staff)</span>
        <span>$230K</span>
        <span>$50K</span>
        <span>$400K</span>
        <span>$500K</span>
      </div>
    </div>
  </div>
</div>

<style>
.company-header.google {
  background: linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.google-logo {
  background: white !important;
  color: #4285f4 !important;
  font-size: 36px !important;
}
.googly-traits {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}
.trait-card {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border-top: 4px solid #4285f4;
}
.trait-card h5 {
  font-size: 15px;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.trait-card p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>`
        }
      ],
      "Indonesian Tech Companies": [
        {
          id: "tokopedia-interview",
          title: "Tokopedia Interview Preparation",
          tags: ["interview", "tokopedia", "indonesia"],
          summary: "One of Indonesia's largest tech companies - focuses on scale and e-commerce domain knowledge.",
          content: `
<div class="company-interview-guide">
  <div class="company-header tokopedia">
    <div class="company-logo">TKPD</div>
    <div class="company-info">
      <h3>Tokopedia Interview Preparation</h3>
      <p>Infrastructure, Platform Engineering, and DevOps roles</p>
      <div class="interview-meta">
        <span class="meta-item">📊 Difficulty: Hard</span>
        <span class="meta-item">⏱️ Process: 3-4 weeks</span>
        <span class="meta-item">📝 Rounds: 4-5</span>
      </div>
    </div>
  </div>
  
  <div class="company-context">
    <h4>🏢 Company Context</h4>
    <div class="context-grid">
      <div class="context-card">
        <h5>Scale Challenges</h5>
        <ul>
          <li>100M+ users during peak events (Wibu, 11.11)</li>
          <li>Microservices architecture with 1000+ services</li>
          <li>Multi-region deployment across Indonesia</li>
        </ul>
      </div>
      <div class="context-card">
        <h5>Tech Stack</h5>
        <ul>
          <li>Kubernetes on bare metal + cloud hybrid</li>
          <li>Terraform for infrastructure</li>
          <li>Custom CICD with Spinnaker</li>
          <li>Observability: Prometheus, Grafana, Jaeger</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="technical-questions">
    <h4>🛠️ Common Interview Questions</h4>
    <div class="question-list">
      <div class="question-item">
        <div class="question-text">How would you design a flash sale system that handles 10x traffic spike without downtime?</div>
        <div class="question-tags">
          <span class="q-tag">System Design</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Explain how you would implement auto-scaling for Tokopedia's payment service</div>
        <div class="question-tags">
          <span class="q-tag">Kubernetes</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Design a multi-region disaster recovery strategy for critical services</div>
        <div class="question-tags">
          <span class="q-tag">Reliability</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">How do you handle configuration management across 1000+ microservices?</div>
        <div class="question-tags">
          <span class="q-tag">DevOps</span>
          <span class="q-tag difficulty-medium">Medium</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="salary-section">
    <h4>💰 Compensation Range (Indonesia, 2025)</h4>
    <div class="salary-table">
      <div class="salary-row header">
        <span>Level</span>
        <span>Base (IDR)</span>
        <span>Bonus</span>
        <span>RSUs</span>
        <span>Total/Yr</span>
      </div>
      <div class="salary-row">
        <span>Junior</span>
        <span>15-25 Jt</span>
        <span>1-3 Jt</span>
        <span>-</span>
        <span>18-30 Jt</span>
      </div>
      <div class="salary-row">
        <span>Mid (3-5yr)</span>
        <span>30-50 Jt</span>
        <span>3-8 Jt</span>
        <span>Some</span>
        <span>40-65 Jt</span>
      </div>
      <div class="salary-row">
        <span>Senior</span>
        <span>50-80 Jt</span>
        <span>8-15 Jt</span>
        <span>Yes</span>
        <span>70-110 Jt</span>
      </div>
      <div class="salary-row">
        <span>Staff/Principal</span>
        <span>80-150 Jt</span>
        <span>15-30 Jt</span>
        <span>Yes</span>
        <span>110-200 Jt</span>
      </div>
    </div>
  </div>
</div>

<style>
.company-header.tokopedia {
  background: linear-gradient(135deg, #03ac0e, #00c853);
}
.company-header.tokopedia .company-logo {
  background: white;
  color: #03ac0e;
}
.context-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}
.context-card {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.context-card h5 {
  font-size: 15px;
  margin-bottom: 12px;
  color: var(--text-primary);
}
.context-card ul {
  margin: 0;
  padding-left: 20px;
}
.context-card li {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
</style>`
        },
        {
          id: "gojek-interview",
          title: "Gojek Interview Preparation",
          tags: ["interview", "gojek", "indonesia"],
          summary: "Southeast Asia's leading super app - focuses on distributed systems and high availability.",
          content: `
<div class="company-interview-guide">
  <div class="company-header gojek">
    <div class="company-logo">GJ</div>
    <div class="company-info">
      <h3>Gojek Interview Preparation</h3>
      <p>Platform Engineering, Infrastructure, and SRE roles</p>
      <div class="interview-meta">
        <span class="meta-item">📊 Difficulty: Hard</span>
        <span class="meta-item">⏱️ Process: 4-6 weeks</span>
        <span class="meta-item">📝 Rounds: 5-6</span>
      </div>
    </div>
  </div>
  
  <div class="company-context">
    <h4>🏢 Company Context</h4>
    <div class="context-grid">
      <div class="context-card">
        <h5>Scale & Complexity</h5>
        <ul>
          <li>20+ products in one super app</li>
          <li>2M+ driver partners</li>
          <li>Real-time location tracking at massive scale</li>
          <li>Multiple markets: ID, VN, SG, TH</li>
        </ul>
      </div>
      <div class="context-card">
        <h5>Engineering Culture</h5>
        <ul>
          <li>Strong open source culture (gojek.io)</li>
          <li>Polyglot environment (Go, Java, Kotlin, Python)</li>
          <li>Emphasis on "Solve for the customer"</li>
          <li>Flat hierarchy, high ownership</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="technical-questions">
    <h4>🛠️ Common Interview Questions</h4>
    <div class="question-list">
      <div class="question-item">
        <div class="question-text">Design a real-time driver location tracking system that handles 2M concurrent drivers</div>
        <div class="question-tags">
          <span class="q-tag">System Design</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">How would you implement surge pricing in a distributed manner across multiple services?</div>
        <div class="question-tags">
          <span class="q-tag">Distributed Systems</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Design an alerting system that reduces false positives for on-call engineers</div>
        <div class="question-tags">
          <span class="q-tag">SRE</span>
          <span class="q-tag difficulty-medium">Medium</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Explain how you would migrate a monolithic service to microservices without downtime</div>
        <div class="question-tags">
          <span class="q-tag">Architecture</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.company-header.gojek {
  background: linear-gradient(135deg, #00aa13, #00c853);
}
.company-header.gojek .company-logo {
  background: white;
  color: #00aa13;
}
</style>`
        }
      ]
    }
  }
};

// Merge with KNOWLEDGE_BASE
if (typeof KNOWLEDGE_BASE !== 'undefined') {
  Object.assign(KNOWLEDGE_BASE, COMPANY_INTERVIEW_DATA);
}
