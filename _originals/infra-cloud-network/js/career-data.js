// Career & Professional Development Data Module
const CAREER_DATA = {
  career: {
    title: "Career Track",
    description: "Track your professional growth, skills, and certifications",
    color: "var(--success)",
    subtopics: {
      "Career Paths": [
        {
          id: "cloud-engineer",
          title: "Cloud Engineer Career Path",
          tags: ["career", "cloud", "intermediate"],
          summary: "Complete roadmap from beginner to senior cloud engineer with milestones and salary insights.",
          content: `
<div class="career-path-container">
  <div class="career-intro">
    <h3>☁️ Cloud Engineer Career Path</h3>
    <p>Cloud Engineers design, implement, and manage cloud infrastructure. Average salary: $95K - $180K+</p>
    <div class="salary-tracker">
      <div class="salary-level">
        <span class="level">Entry Level</span>
        <span class="range">$65K - $95K</span>
      </div>
      <div class="salary-level active">
        <span class="level">Mid Level</span>
        <span class="range">$95K - $140K</span>
      </div>
      <div class="salary-level">
        <span class="level">Senior Level</span>
        <span class="range">$140K - $200K+</span>
      </div>
    </div>
  </div>
  
  <div class="career-timeline">
    <h4>Career Timeline</h4>
    
    <div class="timeline-item completed">
      <div class="timeline-marker">✓</div>
      <div class="timeline-content">
        <h5>Foundation (Months 1-6)</h5>
        <ul>
          <li>Linux fundamentals & command line</li>
          <li>Networking basics (TCP/IP, DNS, HTTP)</li>
          <li>Learn one cloud platform (AWS/GCP/Azure)</li>
          <li>Get cloud practitioner certification</li>
        </ul>
        <div class="skills-earned">
          <span class="skill-tag">Linux</span>
          <span class="skill-tag">Networking</span>
          <span class="skill-tag">AWS Basics</span>
        </div>
      </div>
    </div>
    
    <div class="timeline-item completed">
      <div class="timeline-marker">✓</div>
      <div class="timeline-content">
        <h5>Associate Level (Months 6-12)</h5>
        <ul>
          <li>Infrastructure as Code (Terraform/CloudFormation)</li>
          <li>Containerization (Docker, Kubernetes basics)</li>
          <li>CI/CD pipelines (GitHub Actions, Jenkins)</li>
          <li>Associate-level certification</li>
        </ul>
        <div class="skills-earned">
          <span class="skill-tag">Terraform</span>
          <span class="skill-tag">Docker</span>
          <span class="skill-tag">CI/CD</span>
        </div>
      </div>
    </div>
    
    <div class="timeline-item active">
      <div class="timeline-marker">●</div>
      <div class="timeline-content">
        <h5>Professional Level (Year 2-3)</h5>
        <ul>
          <li>Advanced Kubernetes & service mesh</li>
          <li>Monitoring & observability (Prometheus, Grafana)</li>
          <li>Security & compliance</li>
          <li>Professional certification</li>
        </ul>
        <div class="skills-earned">
          <span class="skill-tag">Kubernetes</span>
          <span class="skill-tag">Observability</span>
          <span class="skill-tag">Security</span>
        </div>
      </div>
    </div>
    
    <div class="timeline-item">
      <div class="timeline-marker">○</div>
      <div class="timeline-content">
        <h5>Senior/Expert Level (Year 3-5+)</h5>
        <ul>
          <li>Architecture design & patterns</li>
          <li>Multi-cloud strategies</li>
          <li>Team leadership & mentoring</li>
          <li>Specialty certifications</li>
        </ul>
        <div class="skills-earned">
          <span class="skill-tag">Architecture</span>
          <span class="skill-tag">Leadership</span>
          <span class="skill-tag">Multi-Cloud</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.career-path-container { max-width: 900px; }
.career-intro { margin-bottom: 32px; }
.career-intro h3 { margin-bottom: 8px; }
.career-intro p { color: var(--text-secondary); margin-bottom: 20px; }

.salary-tracker {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.salary-level {
  padding: 12px 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 2px solid transparent;
}
.salary-level.active {
  border-color: var(--success);
  background: rgba(34, 197, 94, 0.1);
}
.salary-level .level {
  display: block;
  font-size: 12px;
  color: var(--text-tertiary);
  text-transform: uppercase;
}
.salary-level .range {
  font-weight: 600;
  color: var(--text-primary);
}

.career-timeline { position: relative; }
.career-timeline h4 { margin-bottom: 24px; }

.timeline-item {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  padding-left: 20px;
  border-left: 2px solid var(--border);
}
.timeline-item.completed { border-left-color: var(--success); }
.timeline-item.active { border-left-color: var(--accent); }

.timeline-marker {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
  font-size: 14px;
  margin-left: -37px;
  flex-shrink: 0;
}
.timeline-item.completed .timeline-marker {
  background: var(--success);
  color: white;
}
.timeline-item.active .timeline-marker {
  background: var(--accent);
  color: white;
}

.timeline-content h5 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--text-primary);
}
.timeline-content ul {
  margin: 0 0 16px 0;
  padding-left: 20px;
}
.timeline-content li {
  color: var(--text-secondary);
  margin-bottom: 6px;
  font-size: 14px;
}

.skills-earned {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.skill-tag {
  padding: 4px 12px;
  background: var(--accent);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}
</style>`
        },
        {
          id: "devops-engineer",
          title: "DevOps Engineer Career Path",
          tags: ["career", "devops", "intermediate"],
          summary: "Master the art of DevOps with automation, CI/CD, and culture transformation.",
          content: `
<div class="career-path-container">
  <div class="career-intro">
    <h3>🔄 DevOps Engineer Career Path</h3>
    <p>Bridge development and operations through automation and collaboration. Average salary: $90K - $170K+</p>
    <div class="salary-tracker">
      <div class="salary-level">
        <span class="level">Entry Level</span>
        <span class="range">$70K - $100K</span>
      </div>
      <div class="salary-level">
        <span class="level">Mid Level</span>
        <span class="range">$100K - $150K</span>
      </div>
      <div class="salary-level">
        <span class="level">Senior Level</span>
        <span class="range">$150K - $220K+</span>
      </div>
    </div>
  </div>
  
  <div class="career-timeline">
    <h4>Essential Skills Progression</h4>
    
    <div class="skill-progression">
      <div class="skill-category">
        <h5>🛠️ Infrastructure & Automation</h5>
        <div class="skill-bar-container">
          <div class="skill-bar">
            <span class="skill-name">Linux Administration</span>
            <div class="progress-track"><div class="progress-fill" style="width: 85%"></div></div>
            <span class="skill-level">Advanced</span>
          </div>
          <div class="skill-bar">
            <span class="skill-name">Terraform/IaC</span>
            <div class="progress-track"><div class="progress-fill" style="width: 70%"></div></div>
            <span class="skill-level">Intermediate</span>
          </div>
          <div class="skill-bar">
            <span class="skill-name">Configuration Mgmt</span>
            <div class="progress-track"><div class="progress-fill" style="width: 60%"></div></div>
            <span class="skill-level">Intermediate</span>
          </div>
        </div>
      </div>
      
      <div class="skill-category">
        <h5>📦 Containers & Orchestration</h5>
        <div class="skill-bar-container">
          <div class="skill-bar">
            <span class="skill-name">Docker</span>
            <div class="progress-track"><div class="progress-fill" style="width: 90%"></div></div>
            <span class="skill-level">Advanced</span>
          </div>
          <div class="skill-bar">
            <span class="skill-name">Kubernetes</span>
            <div class="progress-track"><div class="progress-fill" style="width: 65%"></div></div>
            <span class="skill-level">Intermediate</span>
          </div>
          <div class="skill-bar">
            <span class="skill-name">Helm</span>
            <div class="progress-track"><div class="progress-fill" style="width: 45%"></div></div>
            <span class="skill-level">Beginner</span>
          </div>
        </div>
      </div>
      
      <div class="skill-category">
        <h5>🔄 CI/CD & GitOps</h5>
        <div class="skill-bar-container">
          <div class="skill-bar">
            <span class="skill-name">GitHub Actions</span>
            <div class="progress-track"><div class="progress-fill" style="width: 80%"></div></div>
            <span class="skill-level">Advanced</span>
          </div>
          <div class="skill-bar">
            <span class="skill-name">Jenkins</span>
            <div class="progress-track"><div class="progress-fill" style="width: 55%"></div></div>
            <span class="skill-level">Intermediate</span>
          </div>
          <div class="skill-bar">
            <span class="skill-name">ArgoCD</span>
            <div class="progress-track"><div class="progress-fill" style="width: 40%"></div></div>
            <span class="skill-level">Beginner</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.skill-progression { display: grid; gap: 24px; }
.skill-category h5 {
  font-size: 15px;
  margin-bottom: 16px;
  color: var(--text-primary);
}
.skill-bar-container { display: grid; gap: 12px; }
.skill-bar {
  display: grid;
  grid-template-columns: 160px 1fr 80px;
  align-items: center;
  gap: 16px;
}
.skill-name {
  font-size: 14px;
  color: var(--text-secondary);
}
.progress-track {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--success));
  border-radius: 4px;
  transition: width 0.5s ease;
}
.skill-level {
  font-size: 12px;
  color: var(--text-tertiary);
  text-align: right;
}
</style>`
        },
        {
          id: "sre-engineer",
          title: "Site Reliability Engineer (SRE)",
          tags: ["career", "sre", "advanced"],
          summary: "Ensure reliability at scale with SRE principles and practices.",
          content: `
<div class="career-path-container">
  <div class="career-intro">
    <h3>🔧 Site Reliability Engineer (SRE)</h3>
    <p>Apply software engineering to operations problems. Average salary: $120K - $250K+</p>
  </div>
  
  <div class="sre-pillars">
    <h4>SRE Core Pillars</h4>
    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-icon">📊</div>
        <h5>SLIs, SLOs, SLAs</h5>
        <p>Define and measure Service Level Indicators, Objectives, and Agreements</p>
        <div class="mastery-level">Target: 99.9% uptime</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">📈</div>
        <h5>Error Budgets</h5>
        <p>Balance reliability with innovation velocity</p>
        <div class="mastery-level">Balance speed vs stability</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🔥</div>
        <h5>Incident Management</h5>
        <p>On-call rotations, incident response, post-mortems</p>
        <div class="mastery-level">MTTR < 30 minutes</div>
      </div>
      <div class="pillar-card">
        <div class="pillar-icon">🧪</div>
        <h5>Chaos Engineering</h5>
        <p>Test resilience through controlled failures</p>
        <div class="mastery-level">GameDays monthly</div>
      </div>
    </div>
  </div>
</div>

<style>
.sre-pillars h4 { margin-bottom: 20px; }
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.pillar-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  text-align: center;
}
.pillar-icon {
  font-size: 32px;
  margin-bottom: 12px;
}
.pillar-card h5 {
  font-size: 15px;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.pillar-card p {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}
.mastery-level {
  font-size: 12px;
  padding: 6px 12px;
  background: var(--accent);
  color: white;
  border-radius: 20px;
  display: inline-block;
}
</style>`
        }
      ],
      "Certifications": [
        {
          id: "aws-certifications",
          title: "AWS Certification Roadmap",
          tags: ["certification", "aws", "cloud"],
          summary: "Complete guide to AWS certifications from Cloud Practitioner to Specialty.",
          content: `
<div class="cert-roadmap">
  <h3>🏆 AWS Certification Roadmap</h3>
  <p class="roadmap-intro">Validate your AWS expertise with industry-recognized certifications</p>
  
  <div class="cert-levels">
    <div class="cert-level">
      <h4>Foundational</h4>
      <div class="cert-card recommended">
        <div class="cert-badge">CLF</div>
        <div class="cert-info">
          <h5>Cloud Practitioner</h5>
          <p>6 months recommended experience</p>
          <div class="cert-meta">
            <span class="cert-cost">$100 USD</span>
            <span class="cert-time">90 mins</span>
          </div>
        </div>
        <div class="cert-status">
          <span class="status-badge">Recommended First</span>
        </div>
      </div>
    </div>
    
    <div class="cert-level">
      <h4>Associate</h4>
      <div class="cert-card">
        <div class="cert-badge">SAA</div>
        <div class="cert-info">
          <h5>Solutions Architect Associate</h5>
          <p>1 year hands-on experience</p>
          <div class="cert-meta">
            <span class="cert-cost">$150 USD</span>
            <span class="cert-time">130 mins</span>
          </div>
        </div>
      </div>
      <div class="cert-card">
        <div class="cert-badge">DVA</div>
        <div class="cert-info">
          <h5>Developer Associate</h5>
          <p>1 year development experience</p>
          <div class="cert-meta">
            <span class="cert-cost">$150 USD</span>
            <span class="cert-time">130 mins</span>
          </div>
        </div>
      </div>
      <div class="cert-card">
        <div class="cert-badge">SOA</div>
        <div class="cert-info">
          <h5>SysOps Administrator Associate</h5>
          <p>1 year systems administration</p>
          <div class="cert-meta">
            <span class="cert-cost">$150 USD</span>
            <span class="cert-time">130 mins</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="cert-level">
      <h4>Professional</h4>
      <div class="cert-card">
        <div class="cert-badge">SAP</div>
        <div class="cert-info">
          <h5>Solutions Architect Professional</h5>
          <p>2+ years AWS experience + Associate cert</p>
          <div class="cert-meta">
            <span class="cert-cost">$300 USD</span>
            <span class="cert-time">180 mins</span>
          </div>
        </div>
      </div>
      <div class="cert-card">
        <div class="cert-badge">DOP</div>
        <div class="cert-info">
          <h5>DevOps Engineer Professional</h5>
          <p>2+ years provisioning & management</p>
          <div class="cert-meta">
            <span class="cert-cost">$300 USD</span>
            <span class="cert-time">180 mins</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="cert-tips">
    <h4>💡 Pro Tips</h4>
    <ul>
      <li><strong>Study Duration:</strong> 2-3 months for Associate, 3-4 months for Professional</li>
      <li><strong>Hands-on is crucial:</strong> Build projects while studying</li>
      <li><strong>Use AWS Free Tier:</strong> Practice without costs</li>
      <li><strong>Join study groups:</strong> Discord, Reddit r/AWSCertifications</li>
      <li><strong>Take practice exams:</strong> Jon Bonso, Stephane Maarek courses</li>
    </ul>
  </div>
</div>

<style>
.cert-roadmap { max-width: 900px; }
.roadmap-intro { color: var(--text-secondary); margin-bottom: 24px; }

.cert-levels { display: grid; gap: 32px; }
.cert-level h4 {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.cert-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin-bottom: 12px;
}
.cert-card.recommended {
  border-color: var(--success);
  background: rgba(34, 197, 94, 0.05);
}

.cert-badge {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--accent), #6366f1);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.cert-info { flex: 1; }
.cert-info h5 {
  font-size: 15px;
  margin-bottom: 4px;
  color: var(--text-primary);
}
.cert-info p {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 8px;
}

.cert-meta {
  display: flex;
  gap: 16px;
}
.cert-meta span {
  font-size: 12px;
  padding: 4px 10px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  color: var(--text-secondary);
}

.cert-status .status-badge {
  font-size: 12px;
  padding: 6px 12px;
  background: var(--success);
  color: white;
  border-radius: 20px;
}

.cert-tips {
  margin-top: 32px;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.cert-tips h4 { margin-bottom: 16px; }
.cert-tips ul { margin: 0; padding-left: 20px; }
.cert-tips li {
  color: var(--text-secondary);
  margin-bottom: 8px;
  font-size: 14px;
}
</style>`
        },
        {
          id: "cka-certification",
          title: "Certified Kubernetes Administrator (CKA)",
          tags: ["certification", "kubernetes", "advanced"],
          summary: "The gold standard for Kubernetes administrators. Hands-on exam preparation.",
          content: `
<div class="cert-detail">
  <div class="cert-header">
    <div class="cert-logo">☸️</div>
    <div class="cert-title-section">
      <h3>Certified Kubernetes Administrator</h3>
      <p>Prove your Kubernetes cluster administration skills</p>
    </div>
    <div class="cert-price">
      <span class="price">$395</span>
      <span class="currency">USD</span>
    </div>
  </div>
  
  <div class="exam-details">
    <div class="detail-grid">
      <div class="detail-item">
        <span class="detail-label">Duration</span>
        <span class="detail-value">2 hours</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Format</span>
        <span class="detail-value">Performance-based</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Passing Score</span>
        <span class="detail-value">66%</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Validity</span>
        <span class="detail-value">3 years</span>
      </div>
    </div>
  </div>
  
  <div class="exam-domains">
    <h4>Exam Domains & Weightings</h4>
    <div class="domain-list">
      <div class="domain-item">
        <div class="domain-header">
          <span class="domain-name">Cluster Architecture, Installation & Configuration</span>
          <span class="domain-weight">25%</span>
        </div>
        <div class="domain-progress">
          <div class="progress-bar" style="width: 25%"></div>
        </div>
      </div>
      <div class="domain-item">
        <div class="domain-header">
          <span class="domain-name">Workloads & Scheduling</span>
          <span class="domain-weight">15%</span>
        </div>
        <div class="domain-progress">
          <div class="progress-bar" style="width: 15%"></div>
        </div>
      </div>
      <div class="domain-item">
        <div class="domain-header">
          <span class="domain-name">Services & Networking</span>
          <span class="domain-weight">20%</span>
        </div>
        <div class="domain-progress">
          <div class="progress-bar" style="width: 20%"></div>
        </div>
      </div>
      <div class="domain-item">
        <div class="domain-header">
          <span class="domain-name">Storage</span>
          <span class="domain-weight">10%</span>
        </div>
        <div class="domain-progress">
          <div class="progress-bar" style="width: 10%"></div>
        </div>
      </div>
      <div class="domain-item">
        <div class="domain-header">
          <span class="domain-name">Troubleshooting</span>
          <span class="domain-weight">30%</span>
        </div>
        <div class="domain-progress">
          <div class="progress-bar" style="width: 30%"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="study-plan">
    <h4>📚 Recommended Study Plan</h4>
    <div class="plan-weeks">
      <div class="week-item">
        <span class="week-num">Week 1-2</span>
        <span class="week-focus">Core Concepts & Architecture</span>
      </div>
      <div class="week-item">
        <span class="week-num">Week 3-4</span>
        <span class="week-focus">Workloads, Scheduling & Networking</span>
      </div>
      <div class="week-item">
        <span class="week-num">Week 5</span>
        <span class="week-focus">Storage & Security</span>
      </div>
      <div class="week-item">
        <span class="week-num">Week 6</span>
        <span class="week-focus">Troubleshooting Deep Dive</span>
      </div>
      <div class="week-item">
        <span class="week-num">Week 7-8</span>
        <span class="week-focus">Mock Exams & Practice</span>
      </div>
    </div>
  </div>
</div>

<style>
.cert-detail { max-width: 800px; }
.cert-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}
.cert-logo {
  font-size: 48px;
}
.cert-title-section { flex: 1; }
.cert-title-section h3 { margin-bottom: 4px; }
.cert-title-section p { color: var(--text-secondary); }

.cert-price {
  text-align: right;
}
.cert-price .price {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
}
.cert-price .currency {
  font-size: 14px;
  color: var(--text-tertiary);
}

.exam-details {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  margin-bottom: 24px;
}
.detail-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.detail-item {
  display: flex;
  flex-direction: column;
}
.detail-label {
  font-size: 12px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  margin-bottom: 4px;
}
.detail-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.exam-domains { margin-bottom: 24px; }
.exam-domains h4 { margin-bottom: 16px; }

.domain-list { display: grid; gap: 12px; }
.domain-item {
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.domain-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.domain-name {
  font-size: 14px;
  color: var(--text-primary);
}
.domain-weight {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
}
.domain-progress {
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--success));
  border-radius: 3px;
}

.study-plan h4 { margin-bottom: 16px; }
.plan-weeks { display: grid; gap: 8px; }
.week-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.week-num {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  min-width: 80px;
}
.week-focus {
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .detail-grid { grid-template-columns: repeat(2, 1fr); }
  .cert-header { flex-wrap: wrap; }
  .cert-price { text-align: left; }
}
</style>`
        }
      ],
      "Skills Matrix": [
        {
          id: "skills-assessment",
          title: "Personal Skills Assessment",
          tags: ["assessment", "skills", "career"],
          summary: "Assess your current skill level across infrastructure domains.",
          content: `
<div class="skills-assessment">
  <h3>🎯 Skills Assessment Matrix</h3>
  <p>Rate your proficiency (1-5) in each area to identify gaps and track growth</p>
  
  <div class="assessment-categories">
    <div class="assess-category">
      <h4>Cloud Platforms</h4>
      <div class="skill-rating-list">
        <div class="skill-rating-item">
          <span class="skill-name">Amazon Web Services (AWS)</span>
          <div class="rating-stars" data-skill="aws">
            <button class="star" data-rating="1">★</button>
            <button class="star" data-rating="2">★</button>
            <button class="star" data-rating="3">★</button>
            <button class="star" data-rating="4">★</button>
            <button class="star" data-rating="5">★</button>
          </div>
          <span class="rating-label">Beginner</span>
        </div>
        <div class="skill-rating-item">
          <span class="skill-name">Google Cloud Platform (GCP)</span>
          <div class="rating-stars" data-skill="gcp">
            <button class="star" data-rating="1">★</button>
            <button class="star" data-rating="2">★</button>
            <button class="star" data-rating="3">★</button>
            <button class="star" data-rating="4">★</button>
            <button class="star" data-rating="5">★</button>
          </div>
          <span class="rating-label">Beginner</span>
        </div>
        <div class="skill-rating-item">
          <span class="skill-name">Microsoft Azure</span>
          <div class="rating-stars" data-skill="azure">
            <button class="star" data-rating="1">★</button>
            <button class="star" data-rating="2">★</button>
            <button class="star" data-rating="3">★</button>
            <button class="star" data-rating="4">★</button>
            <button class="star" data-rating="5">★</button>
          </div>
          <span class="rating-label">Beginner</span>
        </div>
      </div>
    </div>
    
    <div class="assess-category">
      <h4>Containers & Orchestration</h4>
      <div class="skill-rating-list">
        <div class="skill-rating-item">
          <span class="skill-name">Docker</span>
          <div class="rating-stars" data-skill="docker">
            <button class="star" data-rating="1">★</button>
            <button class="star" data-rating="2">★</button>
            <button class="star" data-rating="3">★</button>
            <button class="star" data-rating="4">★</button>
            <button class="star" data-rating="5">★</button>
          </div>
          <span class="rating-label">Beginner</span>
        </div>
        <div class="skill-rating-item">
          <span class="skill-name">Kubernetes</span>
          <div class="rating-stars" data-skill="kubernetes">
            <button class="star" data-rating="1">★</button>
            <button class="star" data-rating="2">★</button>
            <button class="star" data-rating="3">★</button>
            <button class="star" data-rating="4">★</button>
            <button class="star" data-rating="5">★</button>
          </div>
          <span class="rating-label">Beginner</span>
        </div>
        <div class="skill-rating-item">
          <span class="skill-name">Helm</span>
          <div class="rating-stars" data-skill="helm">
            <button class="star" data-rating="1">★</button>
            <button class="star" data-rating="2">★</button>
            <button class="star" data-rating="3">★</button>
            <button class="star" data-rating="4">★</button>
            <button class="star" data-rating="5">★</button>
          </div>
          <span class="rating-label">Beginner</span>
        </div>
      </div>
    </div>
    
    <div class="assess-category">
      <h4>Infrastructure as Code</h4>
      <div class="skill-rating-list">
        <div class="skill-rating-item">
          <span class="skill-name">Terraform</span>
          <div class="rating-stars" data-skill="terraform">
            <button class="star" data-rating="1">★</button>
            <button class="star" data-rating="2">★</button>
            <button class="star" data-rating="3">★</button>
            <button class="star" data-rating="4">★</button>
            <button class="star" data-rating="5">★</button>
          </div>
          <span class="rating-label">Beginner</span>
        </div>
        <div class="skill-rating-item">
          <span class="skill-name">Ansible</span>
          <div class="rating-stars" data-skill="ansible">
            <button class="star" data-rating="1">★</button>
            <button class="star" data-rating="2">★</button>
            <button class="star" data-rating="3">★</button>
            <button class="star" data-rating="4">★</button>
            <button class="star" data-rating="5">★</button>
          </div>
          <span class="rating-label">Beginner</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="assessment-summary">
    <button class="btn btn-primary" onclick="saveAssessment()">Save Assessment</button>
    <div class="summary-stats" id="assessment-stats"></div>
  </div>
</div>

<script>
const skillLabels = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];

document.querySelectorAll('.rating-stars').forEach(container => {
  const stars = container.querySelectorAll('.star');
  const label = container.parentElement.querySelector('.rating-label');
  
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      const rating = index + 1;
      stars.forEach((s, i) => {
        s.classList.toggle('active', i < rating);
      });
      label.textContent = skillLabels[index];
      label.dataset.rating = rating;
    });
  });
});

function saveAssessment() {
  const ratings = {};
  document.querySelectorAll('.rating-stars').forEach(container => {
    const skill = container.dataset.skill;
    const label = container.parentElement.querySelector('.rating-label');
    ratings[skill] = parseInt(label.dataset.rating) || 1;
  });
  
  localStorage.setItem('infrahub_skill_assessment', JSON.stringify(ratings));
  
  const avg = Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length;
  document.getElementById('assessment-stats').innerHTML = \`
    <p>✅ Assessment saved! Your average skill level: <strong>\${skillLabels[Math.round(avg) - 1]}</strong></p>
  \`;
}

// Load saved assessment
const saved = localStorage.getItem('infrahub_skill_assessment');
if (saved) {
  const ratings = JSON.parse(saved);
  Object.entries(ratings).forEach(([skill, rating]) => {
    const container = document.querySelector(\`.rating-stars[data-skill="\${skill}"]\`);
    if (container) {
      const stars = container.querySelectorAll('.star');
      const label = container.parentElement.querySelector('.rating-label');
      stars.forEach((s, i) => s.classList.toggle('active', i < rating));
      label.textContent = skillLabels[rating - 1];
      label.dataset.rating = rating;
    }
  });
}
<\/script>

<style>
.skills-assessment { max-width: 800px; }
.skills-assessment > p { color: var(--text-secondary); margin-bottom: 24px; }

.assessment-categories { display: grid; gap: 24px; margin-bottom: 24px; }

.assess-category h4 {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.skill-rating-list { display: grid; gap: 12px; }
.skill-rating-item {
  display: grid;
  grid-template-columns: 1fr auto 100px;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.skill-name {
  font-size: 14px;
  color: var(--text-primary);
}

.rating-stars {
  display: flex;
  gap: 4px;
}
.rating-stars .star {
  background: none;
  border: none;
  color: var(--text-tertiary);
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0 2px;
}
.rating-stars .star:hover,
.rating-stars .star.active {
  color: #fbbf24;
}

.rating-label {
  font-size: 13px;
  color: var(--text-tertiary);
  text-align: right;
}

.assessment-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.summary-stats {
  color: var(--text-secondary);
  font-size: 14px;
}
</style>`
        }
      ]
    }
  }
};

// Merge with KNOWLEDGE_BASE
if (typeof KNOWLEDGE_BASE !== 'undefined') {
  Object.assign(KNOWLEDGE_BASE, CAREER_DATA);
}
