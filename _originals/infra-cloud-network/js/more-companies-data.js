// Additional Company Interview Data - Netflix, Microsoft, Meta, etc.
const MORE_COMPANIES_DATA = {
  moreCompanies: {
    title: "More Companies",
    description: "Additional company interview guides",
    color: "var(--danger)",
    subtopics: {
      "Big Tech": [
        {
          id: "netflix-interview",
          title: "Netflix Interview Preparation",
          tags: ["interview", "netflix", "faang"],
          summary: "Netflix's unique culture memo and high-performance expectations.",
          content: `
<div class="company-interview-guide">
  <div class="company-header netflix">
    <div class="company-logo netflix-logo">N</div>
    <div class="company-info">
      <h3>Netflix Interview Preparation</h3>
      <p>Platform Engineering, Cloud Infrastructure roles</p>
      <div class="interview-meta">
        <span class="meta-item">📊 Difficulty: Very Hard</span>
        <span class="meta-item">⏱️ Process: 6-8 weeks</span>
        <span class="meta-item">📝 Rounds: 7-9</span>
      </div>
    </div>
  </div>
  
  <div class="culture-memo">
    <h4>🎬 The Netflix Culture Memo</h4>
    <p class="culture-intro">Netflix's culture is built on "Freedom and Responsibility". You MUST read and internalize the culture memo before interviewing.</p>
    
    <div class="culture-pillars">
      <div class="culture-card">
        <h5>High Performance</h5>
        <p>"Adequate performance gets a generous severance package." Netflix only keeps high performers. Be ready to prove you're exceptional.</p>
      </div>
      <div class="culture-card">
        <h5>Freedom & Responsibility</h5>
        <p>Netflix gives enormous freedom but expects enormous responsibility. Show examples of independent decision-making.</p>
      </div>
      <div class="culture-card">
        <h5>Innovation</h5>
        <p>Netflix values people who challenge the status quo. Bring examples of innovations you've driven.</p>
      </div>
    </div>
  </div>
  
  <div class="technical-questions">
    <h4>🛠️ Technical Questions</h4>
    <div class="question-list">
      <div class="question-item">
        <div class="question-text">Netflix streams to 230M+ subscribers. How would you design the video encoding pipeline to handle this scale?</div>
        <div class="question-tags">
          <span class="q-tag">System Design</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Design a chaos engineering platform for testing distributed system resilience</div>
        <div class="question-tags">
          <span class="q-tag">Reliability</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">How would you migrate Netflix from AWS to another cloud provider without downtime?</div>
        <div class="question-tags">
          <span class="q-tag">Migration</span>
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
        <span>Stock (4yr)</span>
        <span>Total (Y1)</span>
      </div>
      <div class="salary-row">
        <span>Senior</span>
        <span>$200K+</span>
        <span>$400K+</span>
        <span>$400K+</span>
      </div>
      <div class="salary-row">
        <span>Staff</span>
        <span>$220K+</span>
        <span>$700K+</span>
        <span>$600K+</span>
      </div>
    </div>
    <p class="salary-note">* Netflix pays top of market. No bonuses - all cash + stock.</p>
  </div>
</div>

<style>
.company-header.netflix {
  background: linear-gradient(135deg, #e50914, #b20710);
}
.netflix-logo {
  background: white !important;
  color: #e50914 !important;
  font-weight: 800 !important;
}
.culture-memo {
  margin-bottom: 40px;
}
.culture-intro {
  color: var(--text-secondary);
  margin-bottom: 20px;
  font-size: 14px;
}
.culture-pillars {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.culture-card {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border-left: 4px solid #e50914;
}
.culture-card h5 {
  font-size: 15px;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.culture-card p {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>`
        },
        {
          id: "microsoft-interview",
          title: "Microsoft Interview Preparation",
          tags: ["interview", "microsoft", "faang"],
          summary: "Microsoft's interview process with focus on growth mindset and collaboration.",
          content: `
<div class="company-interview-guide">
  <div class="company-header microsoft">
    <div class="company-logo microsoft-logo">MS</div>
    <div class="company-info">
      <h3>Microsoft Interview Preparation</h3>
      <p>Azure Infrastructure, Cloud Engineering roles</p>
      <div class="interview-meta">
        <span class="meta-item">📊 Difficulty: Hard</span>
        <span class="meta-item">⏱️ Process: 4-6 weeks</span>
        <span class="meta-item">📝 Rounds: 4-5</span>
      </div>
    </div>
  </div>
  
  <div class="microsoft-culture">
    <h4>🎯 Microsoft Culture: Growth Mindset</h4>
    <p class="culture-intro">Microsoft values collaboration, growth mindset, and customer obsession. They look for "learn-it-all" not "know-it-all".</p>
  </div>
  
  <div class="technical-questions">
    <h4>🛠️ Technical Questions</h4>
    <div class="question-list">
      <div class="question-item">
        <div class="question-text">Design Azure DevOps pipeline for multi-region deployment with canary releases</div>
        <div class="question-tags">
          <span class="q-tag">Azure</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">How would you design a service that handles 1M+ concurrent connections on Azure?</div>
        <div class="question-tags">
          <span class="q-tag">System Design</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Explain how you would implement zero-downtime deployment for a Kubernetes cluster on AKS</div>
        <div class="question-tags">
          <span class="q-tag">Kubernetes</span>
          <span class="q-tag difficulty-medium">Medium</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.company-header.microsoft {
  background: linear-gradient(135deg, #00a4ef, #0078d4);
}
.microsoft-logo {
  background: white !important;
  color: #0078d4 !important;
}
</style>`
        }
      ],
      "Indonesian Tech": [
        {
          id: "traveloka-interview",
          title: "Traveloka Interview Preparation",
          tags: ["interview", "traveloka", "indonesia"],
          summary: "Southeast Asia's travel unicorn - focuses on scalability and product mindset.",
          content: `
<div class="company-interview-guide">
  <div class="company-header traveloka">
    <div class="company-logo">TVLK</div>
    <div class="company-info">
      <h3>Traveloka Interview Preparation</h3>
      <p>Platform Engineering, DevOps, SRE roles</p>
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
        <h5>Scale</h5>
        <ul>
          <li>40M+ app downloads</li>
          <li>Services across 8 countries</li>
          <li>Peak booking during holidays</li>
          <li>Microservices architecture</li>
        </ul>
      </div>
      <div class="context-card">
        <h5>Tech Stack</h5>
        <ul>
          <li>Go, Java, Python</li>
          <li>Kubernetes on multi-cloud</li>
          <li>Kafka for event streaming</li>
          <li>Terraform + Ansible</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="technical-questions">
    <h4>🛠️ Common Questions</h4>
    <div class="question-list">
      <div class="question-item">
        <div class="question-text">How would you handle traffic spikes during promo campaigns like 11.11?</div>
        <div class="question-tags">
          <span class="q-tag">Scalability</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Design a flight booking system that handles race conditions</div>
        <div class="question-tags">
          <span class="q-tag">System Design</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">How do you implement CI/CD for services across multiple regions?</div>
        <div class="question-tags">
          <span class="q-tag">DevOps</span>
          <span class="q-tag difficulty-medium">Medium</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.company-header.traveloka {
  background: linear-gradient(135deg, #1ba0e2, #0d84c7);
}
.company-header.traveloka .company-logo {
  background: white;
  color: #1ba0e2;
}
</style>`
        },
        {
          id: "bukalapak-interview",
          title: "Bukalapak Interview Preparation",
          tags: ["interview", "bukalapak", "indonesia"],
          summary: "One of Indonesia's oldest unicorns - focuses on reliability and innovation.",
          content: `
<div class="company-interview-guide">
  <div class="company-header bukalapak">
    <div class="company-logo">BL</div>
    <div class="company-info">
      <h3>Bukalapak Interview Preparation</h3>
      <p>Infrastructure, Platform Engineering roles</p>
      <div class="interview-meta">
        <span class="meta-item">📊 Difficulty: Hard</span>
        <span class="meta-item">⏱️ Process: 3-4 weeks</span>
        <span class="meta-item">📝 Rounds: 4-5</span>
      </div>
    </div>
  </div>
  
  <div class="technical-questions">
    <h4>🛠️ Common Questions</h4>
    <div class="question-list">
      <div class="question-item">
        <div class="question-text">How would you design a marketplace payment system that handles fraud detection?</div>
        <div class="question-tags">
          <span class="q-tag">System Design</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
      <div class="question-item">
        <div class="question-text">Design a notification system that delivers millions of push notifications daily</div>
        <div class="question-tags">
          <span class="q-tag">Messaging</span>
          <span class="q-tag difficulty-hard">Hard</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.company-header.bukalapak {
  background: linear-gradient(135deg, #d71149, #af0d3a);
}
.company-header.bukalapak .company-logo {
  background: white;
  color: #d71149;
}
</style>`
        }
      ]
    }
  }
};

// Merge with KNOWLEDGE_BASE
if (typeof KNOWLEDGE_BASE !== 'undefined') {
  Object.assign(KNOWLEDGE_BASE, MORE_COMPANIES_DATA);
}
