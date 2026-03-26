// Resource Library - Books, Videos, Courses Data Module
const RESOURCES_DATA = {
  resources: {
    title: "Resource Library",
    description: "Curated books, courses, videos, and tools for learning infrastructure",
    color: "var(--success)",
    subtopics: {
      "Recommended Books": [
        {
          id: "books-library",
          title: "Essential Infrastructure Books",
          tags: ["resources", "books", "reading"],
          summary: "Must-read books for infrastructure, cloud, and DevOps professionals.",
          content: `
<div class="resources-library">
  <div class="library-header">
    <h3>📚 Essential Infrastructure Books</h3>
    <p>Curated reading list for every level - from beginner to expert</p>
  </div>
  
  <div class="books-section">
    <h4>🏆 Must-Read Classics</h4>
    <div class="books-grid">
      <div class="book-card">
        <div class="book-cover">SRE</div>
        <div class="book-info">
          <h5>Site Reliability Engineering</h5>
          <span class="book-author">Google</span>
          <p class="book-desc">The definitive guide to SRE principles and practices from Google. Essential for understanding reliability at scale.</p>
          <div class="book-meta">
            <span class="difficulty">Intermediate</span>
            <span class="rating">⭐ 4.8</span>
          </div>
          <a href="https://sre.google/sre-book/table-of-contents/" target="_blank" class="book-link">Read Free →</a>
        </div>
      </div>
      
      <div class="book-card">
        <div class="book-cover">K8s</div>
        <div class="book-info">
          <h5>Kubernetes in Action</h5>
          <span class="book-author">Marko Luksa</span>
          <p class="book-desc">Comprehensive guide to Kubernetes. Best book for deep understanding of K8s internals.</p>
          <div class="book-meta">
            <span class="difficulty">Beginner-Advanced</span>
            <span class="rating">⭐ 4.7</span>
          </div>
          <a href="#" class="book-link">View on Amazon →</a>
        </div>
      </div>
      
      <div class="book-card">
        <div class="book-cover">TF</div>
        <div class="book-info">
          <h5>Terraform: Up & Running</h5>
          <span class="book-author">Yevgeniy Brikman</span>
          <p class="book-desc">The go-to book for learning Infrastructure as Code with Terraform. Practical and comprehensive.</p>
          <div class="book-meta">
            <span class="difficulty">Beginner-Intermediate</span>
            <span class="rating">⭐ 4.6</span>
          </div>
          <a href="#" class="book-link">View on Amazon →</a>
        </div>
      </div>
      
      <div class="book-card">
        <div class="book-cover">DDIA</div>
        <div class="book-info">
          <h5>Designing Data-Intensive Applications</h5>
          <span class="book-author">Martin Kleppmann</span>
          <p class="book-desc">THE book for distributed systems. Essential reading for any serious infrastructure engineer.</p>
          <div class="book-meta">
            <span class="difficulty">Advanced</span>
            <span class="rating">⭐ 4.9</span>
          </div>
          <a href="#" class="book-link">View on Amazon →</a>
        </div>
      </div>
      
      <div class="book-card">
        <div class="book-cover">LPIC</div>
        <div class="book-info">
          <h5>CompTIA Linux+ / LPIC-1</h5>
          <span class="book-author">Christine Bresnahan</span>
          <p class="book-desc">Complete guide to Linux administration. Perfect for Linux certifications.</p>
          <div class="book-meta">
            <span class="difficulty">Beginner</span>
            <span class="rating">⭐ 4.5</span>
          </div>
          <a href="#" class="book-link">View on Amazon →</a>
        </div>
      </div>
      
      <div class="book-card">
        <div class="book-cover">CD</div>
        <div class="book-info">
          <h5>Continuous Delivery</h5>
          <span class="book-author">Jez Humble & David Farley</span>
          <p class="book-desc">Foundational book on CI/CD practices. A bit dated but principles remain relevant.</p>
          <div class="book-meta">
            <span class="difficulty">Intermediate</span>
            <span class="rating">⭐ 4.6</span>
          </div>
          <a href="#" class="book-link">View on Amazon →</a>
        </div>
      </div>
    </div>
  </div>
  
  <div class="books-section">
    <h4>📖 Free Online Resources</h4>
    <div class="free-resources">
      <div class="resource-item">
        <div class="resource-icon">📄</div>
        <div class="resource-info">
          <h5>Kubernetes Documentation</h5>
          <p>The official K8s docs are excellent and always up-to-date</p>
          <a href="https://kubernetes.io/docs/home/" target="_blank">kubernetes.io/docs →</a>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">📄</div>
        <div class="resource-info">
          <h5>AWS Well-Architected Framework</h5>
          <p>Best practices for building on AWS</p>
          <a href="https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html" target="_blank">AWS Docs →</a>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">📄</div>
        <div class="resource-info">
          <h5>The Linux Documentation Project</h5>
          <p>Comprehensive Linux guides and HOWTOs</p>
          <a href="https://tldp.org/" target="_blank">tldp.org →</a>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">📄</div>
        <div class="resource-info">
          <h5>CNCF Trail Map</h5>
          <p>Guide to cloud native technologies landscape</p>
          <a href="https://landscape.cncf.io/" target="_blank">CNCF Landscape →</a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.resources-library { max-width: 1100px; }
.library-header { margin-bottom: 32px; }
.library-header h3 { margin-bottom: 8px; }
.library-header p { color: var(--text-secondary); }

.books-section { margin-bottom: 40px; }
.books-section h4 { margin-bottom: 20px; }

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.book-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: transform 0.2s;
}
.book-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
}
.book-cover {
  width: 80px;
  height: 100px;
  background: linear-gradient(135deg, var(--accent), #6366f1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 14px;
  flex-shrink: 0;
}
.book-info { flex: 1; }
.book-info h5 {
  font-size: 15px;
  margin-bottom: 4px;
  color: var(--text-primary);
}
.book-author {
  font-size: 13px;
  color: var(--text-tertiary);
  display: block;
  margin-bottom: 8px;
}
.book-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 12px;
}
.book-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
.book-meta span {
  font-size: 11px;
  padding: 3px 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  color: var(--text-tertiary);
}
.book-link {
  font-size: 13px;
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
}
.book-link:hover { text-decoration: underline; }

.free-resources { display: grid; gap: 12px; }
.resource-item {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.resource-icon {
  font-size: 24px;
}
.resource-info h5 {
  font-size: 14px;
  margin-bottom: 4px;
  color: var(--text-primary);
}
.resource-info p {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
.resource-info a {
  font-size: 12px;
  color: var(--accent);
  text-decoration: none;
}
</style>`
        },
        {
          id: "video-courses",
          title: "Video Courses & Tutorials",
          tags: ["resources", "videos", "courses"],
          summary: "Best video courses for visual learners - free and paid options.",
          content: `
<div class="resources-library">
  <div class="library-header">
    <h3>🎥 Video Courses & Tutorials</h3>
    <p>Hand-picked courses from the best instructors</p>
  </div>
  
  <div class="courses-section">
    <h4>⭐ Highly Recommended</h4>
    <div class="courses-grid">
      <div class="course-card featured">
        <div class="course-badge">🏆 Best Overall</div>
        <div class="course-header">
          <div class="course-platform">Udemy</div>
          <div class="course-rating">⭐ 4.7 (45K+ students)</div>
        </div>
        <h5>Ultimate AWS Certified Solutions Architect Associate</h5>
        <p class="course-instructor">by Stephane Maarek</p>
        <p class="course-desc">The gold standard for AWS SAA preparation. Comprehensive, up-to-date, and includes practice exams.</p>
        <div class="course-meta">
          <span>27 hours</span>
          <span>Intermediate</span>
          <span class="price">~$15 (on sale)</span>
        </div>
      </div>
      
      <div class="course-card featured">
        <div class="course-badge">🏆 Best for K8s</div>
        <div class="course-header">
          <div class="course-platform">Udemy</div>
          <div class="course-rating">⭐ 4.8 (30K+ students)</div>
        </div>
        <h5>Certified Kubernetes Administrator (CKA)</h5>
        <p class="course-instructor">by Mumshad Mannambeth</p>
        <p class="course-desc">Best CKA prep course with hands-on labs. Includes practice tests that closely mirror the real exam.</p>
        <div class="course-meta">
          <span>22 hours</span>
          <span>Intermediate</span>
          <span class="price">~$15 (on sale)</span>
        </div>
      </div>
      
      <div class="course-card">
        <div class="course-header">
          <div class="course-platform">A Cloud Guru</div>
          <div class="course-rating">⭐ 4.5</div>
        </div>
        <h5>AWS Certified Developer Associate</h5>
        <p class="course-instructor">by ACG Team</p>
        <p class="course-desc">Great for visual learners. Interactive labs and good pacing.</p>
        <div class="course-meta">
          <span>18 hours</span>
          <span>Beginner</span>
          <span class="price">Subscription</span>
        </div>
      </div>
      
      <div class="course-card">
        <div class="course-header">
          <div class="course-platform">Pluralsight</div>
          <div class="course-rating">⭐ 4.6</div>
        </div>
        <h5>Terraform - Getting Started</h5>
        <p class="course-instructor">by Ned Bellavance</p>
        <p class="course-desc">Excellent introduction to Terraform. Good for beginners to IaC.</p>
        <div class="course-meta">
          <span>6 hours</span>
          <span>Beginner</span>
          <span class="price">Subscription</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="courses-section">
    <h4>🎓 Free YouTube Channels</h4>
    <div class="youtube-grid">
      <div class="yt-card">
        <div class="yt-avatar">TechW</div>
        <div class="yt-info">
          <h5>TechWorld with Nana</h5>
          <p>Excellent DevOps and Docker/Kubernetes tutorials</p>
          <span class="yt-subs">1.2M+ subscribers</span>
        </div>
      </div>
      <div class="yt-card">
        <div class="yt-avatar">HN</div>
        <div class="yt-info">
          <h5>Hussein Nasser</h5>
          <p>System design and backend engineering deep dives</p>
          <span class="yt-subs">500K+ subscribers</span>
        </div>
      </div>
      <div class="yt-card">
        <div class="yt-avatar">FC</div>
        <div class="yt-info">
          <h5>Fireship</h5>
          <p>Quick, high-energy tutorials on various topics</p>
          <span class="yt-subs">2M+ subscribers</span>
        </div>
      </div>
      <div class="yt-card">
        <div class="yt-avatar">AB</div>
        <div class="yt-info">
          <h5>Anton Putra</h5>
          <p>Kubernetes, AWS, and cloud-native tutorials</p>
          <span class="yt-subs">200K+ subscribers</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.courses-section { margin-bottom: 40px; }
.courses-section h4 { margin-bottom: 20px; }

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}
.course-card {
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  position: relative;
}
.course-card.featured {
  border-color: var(--accent);
  background: linear-gradient(135deg, var(--bg-card), rgba(99, 102, 241, 0.05));
}
.course-badge {
  position: absolute;
  top: -10px;
  right: 16px;
  padding: 4px 12px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 20px;
}
.course-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.course-platform {
  font-size: 12px;
  color: var(--accent);
  font-weight: 600;
}
.course-rating {
  font-size: 12px;
  color: var(--text-tertiary);
}
.course-card h5 {
  font-size: 16px;
  margin-bottom: 4px;
  color: var(--text-primary);
}
.course-instructor {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 8px;
  display: block;
}
.course-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 16px;
}
.course-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.course-meta span {
  font-size: 12px;
  padding: 4px 10px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  color: var(--text-tertiary);
}
.course-meta .price {
  background: var(--success);
  color: white;
}

.youtube-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
.yt-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.yt-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
}
.yt-info h5 {
  font-size: 14px;
  margin-bottom: 4px;
  color: var(--text-primary);
}
.yt-info p {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}
.yt-subs {
  font-size: 11px;
  color: var(--text-tertiary);
}
</style>`
        }
      ],
      "Tools & Utilities": [
        {
          id: "dev-tools",
          title: "Essential Developer Tools",
          tags: ["resources", "tools", "software"],
          summary: "Must-have tools for infrastructure and DevOps engineers.",
          content: `
<div class="resources-library">
  <div class="library-header">
    <h3>🛠️ Essential Developer Tools</h3>
    <p>Software that makes your life easier</p>
  </div>
  
  <div class="tools-categories">
    <div class="tool-category">
      <h4>Terminal & Shell</h4>
      <div class="tools-list">
        <div class="tool-item">
          <div class="tool-icon">🖥️</div>
          <div class="tool-info">
            <h5>iTerm2 (Mac) / Windows Terminal</h5>
            <p>Modern terminal emulators with tabs, splits, and customization</p>
            <span class="tool-price">Free</span>
          </div>
        </div>
        <div class="tool-item">
          <div class="tool-icon">🐚</div>
          <div class="tool-info">
            <h5>Oh My Zsh + Powerlevel10k</h5>
            <p>Zsh framework with amazing themes and plugins</p>
            <span class="tool-price">Free</span>
          </div>
        </div>
        <div class="tool-item">
          <div class="tool-icon">📊</div>
          <div class="tool-info">
            <h5>btop / htop</h5>
            <p>Beautiful system resource monitor</p>
            <span class="tool-price">Free</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="tool-category">
      <h4>IDEs & Editors</h4>
      <div class="tools-list">
        <div class="tool-item">
          <div class="tool-icon">📝</div>
          <div class="tool-info">
            <h5>VS Code</h5>
            <p>The most popular code editor. Essential extensions: Kubernetes, Terraform, Docker</p>
            <span class="tool-price">Free</span>
          </div>
        </div>
        <div class="tool-item">
          <div class="tool-icon">⌨️</div>
          <div class="tool-info">
            <h5>JetBrains Fleet / GoLand</h5>
            <p>Powerful IDEs for Go and general development</p>
            <span class="tool-price">Paid</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="tool-category">
      <h4>Kubernetes Tools</h4>
      <div class="tools-list">
        <div class="tool-item">
          <div class="tool-icon">☸️</div>
          <div class="tool-info">
            <h5>k9s</h5>
            <p>Terminal UI for managing Kubernetes clusters</p>
            <span class="tool-price">Free</span>
          </div>
        </div>
        <div class="tool-item">
          <div class="tool-icon">🔍</div>
          <div class="tool-info">
            <h5>Lens</h5>
            <p>GUI for Kubernetes cluster management</p>
            <span class="tool-price">Freemium</span>
          </div>
        </div>
        <div class="tool-item">
          <div class="tool-icon">⎈</div>
          <div class="tool-info">
            <h5>Helm</h5>
            <p>Package manager for Kubernetes</p>
            <span class="tool-price">Free</span>
          </div>
        </div>
        <div class="tool-item">
          <div class="tool-icon">🔄</div>
          <div class="tool-info">
            <h5>k3d / kind</h5>
            <p>Run local Kubernetes clusters in Docker</p>
            <span class="tool-price">Free</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="tool-category">
      <h4>Cloud Tools</h4>
      <div class="tools-list">
        <div class="tool-item">
          <div class="tool-icon">☁️</div>
          <div class="tool-info">
            <h5>AWS CLI + AWS Console</h5>
            <p>Command line and web interface for AWS</p>
            <span class="tool-price">Free</span>
          </div>
        </div>
        <div class="tool-item">
          <div class="tool-icon">🦊</div>
          <div class="tool-info">
            <h5>GitLab / GitHub CLI</h5>
            <p>Command line tools for repository management</p>
            <span class="tool-price">Free</span>
          </div>
        </div>
        <div class="tool-item">
          <div class="tool-icon">🔐</div>
          <div class="tool-info">
            <h5>1Password / Bitwarden</h5>
            <p>Password managers for credentials and secrets</p>
            <span class="tool-price">Freemium</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.tools-categories { display: grid; gap: 32px; }
.tool-category h4 {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}
.tools-list { display: grid; gap: 12px; }
.tool-item {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  align-items: flex-start;
}
.tool-icon {
  font-size: 28px;
}
.tool-info { flex: 1; }
.tool-info h5 {
  font-size: 15px;
  margin-bottom: 4px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}
.tool-info p {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
.tool-price {
  font-size: 11px;
  padding: 2px 8px;
  background: var(--success);
  color: white;
  border-radius: 10px;
}
</style>`
        }
      ]
    }
  }
};

// Merge with KNOWLEDGE_BASE
if (typeof KNOWLEDGE_BASE !== 'undefined') {
  Object.assign(KNOWLEDGE_BASE, RESOURCES_DATA);
}
