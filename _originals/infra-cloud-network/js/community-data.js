// Community & Reviews Data Module
const COMMUNITY_DATA = {
  community: {
    title: "Community",
    description: "Connect with fellow learners, read reviews, and join discussions",
    color: "var(--warning)",
    subtopics: {
      "Success Stories": [
        {
          id: "testimonials",
          title: "Success Stories & Testimonials",
          tags: ["community", "reviews", "inspiration"],
          summary: "Read inspiring stories from community members who transformed their careers.",
          content: `
<div class="testimonials-section">
  <div class="section-header">
    <h3>🌟 Success Stories</h3>
    <p>Real people, real journeys, real results</p>
  </div>
  
  <div class="testimonials-grid">
    <div class="testimonial-card featured">
      <div class="testimonial-badge">★ Featured</div>
      <div class="testimonial-content">
        <p>"InfraHub Pro completely changed my career trajectory. In 8 months, I went from helpdesk support to a Cloud Engineer role at a Fortune 500 company. The structured learning paths and hands-on labs made all the difference."</p>
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">AR</div>
        <div class="author-info">
          <span class="author-name">Ahmad Rizky</span>
          <span class="author-title">Cloud Engineer @ Tokopedia</span>
          <span class="author-journey">Helpdesk → Cloud Engineer in 8 months</span>
        </div>
      </div>
      <div class="testimonial-stats">
        <span class="stat">📚 127 Topics Completed</span>
        <span class="stat">📝 3 Certifications</span>
        <span class="stat">🔥 45 Day Streak</span>
      </div>
    </div>
    
    <div class="testimonial-card">
      <div class="testimonial-content">
        <p>"As a fresh graduate with CS degree but no cloud experience, I was struggling to break into DevOps. The project-based labs here gave me portfolio pieces that impressed interviewers. Landed my first DevOps role!"</p>
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">SF</div>
        <div class="author-info">
          <span class="author-name">Sarah Febriani</span>
          <span class="author-title">Junior DevOps Engineer</span>
          <span class="author-journey">Fresh Grad → DevOps in 6 months</span>
        </div>
      </div>
    </div>
    
    <div class="testimonial-card">
      <div class="testimonial-content">
        <p>"The CKA preparation here is better than courses I paid $300 for. The interactive Kubernetes labs and troubleshooting scenarios prepared me perfectly for the exam. Passed on first attempt!"</p>
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">BW</div>
        <div class="author-info">
          <span class="author-name">Budi Wijaya</span>
          <span class="author-title">SRE @ Gojek</span>
          <span class="author-journey">SysAdmin → SRE with CKA cert</span>
        </div>
      </div>
    </div>
    
    <div class="testimonial-card">
      <div class="testimonial-content">
        <p>"I transitioned from network admin to cloud architect at 42 years old. Never too late to learn! The networking fundamentals section bridged my existing knowledge to cloud networking perfectly."</p>
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">DM</div>
        <div class="author-info">
          <span class="author-name">Dedi Mulyono</span>
          <span class="author-title">Cloud Architect @ Telkom</span>
          <span class="author-journey">Network Admin → Architect at 42</span>
        </div>
      </div>
    </div>
    
    <div class="testimonial-card">
      <div class="testimonial-content">
        <p>"The interview prep section is gold. Real questions from FAANG companies with detailed explanations. Got offers from 3 companies after using this for 2 months!"</p>
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">LP</div>
        <div class="author-info">
          <span class="author-name">Lina Permata</span>
          <span class="author-title">Platform Engineer @ Traveloka</span>
          <span class="author-journey">3 FAANG interview offers</span>
        </div>
      </div>
    </div>
    
    <div class="testimonial-card">
      <div class="testimonial-content">
        <p>"From zero AWS knowledge to Solutions Architect Professional in 14 months. The certification roadmap and study groups kept me accountable. Best investment in my career!"</p>
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">RK</div>
        <div class="author-info">
          <span class="author-name">Rudi Kurniawan</span>
          <span class="author-title">Solutions Architect @ AWS</span>
          <span class="author-journey">Zero → AWS SA Pro in 14 months</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="community-stats">
    <h4>Community Impact</h4>
    <div class="impact-grid">
      <div class="impact-item">
        <span class="impact-number">2,847</span>
        <span class="impact-label">Career Transitions</span>
      </div>
      <div class="impact-item">
        <span class="impact-number">5,921</span>
        <span class="impact-label">Certifications Earned</span>
      </div>
      <div class="impact-item">
        <span class="impact-number">89%</span>
        <span class="impact-label">Reported Salary Increase</span>
      </div>
      <div class="impact-item">
        <span class="impact-number">$25K</span>
        <span class="impact-label">Avg Salary Increase</span>
      </div>
    </div>
  </div>
</div>

<style>
.testimonials-section { max-width: 1000px; }
.section-header { margin-bottom: 32px; }
.section-header h3 { margin-bottom: 8px; }
.section-header p { color: var(--text-secondary); }

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.testimonial-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.testimonial-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.testimonial-card.featured {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, var(--bg-card), rgba(99, 102, 241, 0.05));
  border-color: var(--accent);
}

.testimonial-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 20px;
  margin-bottom: 16px;
}

.testimonial-content p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-primary);
  margin-bottom: 20px;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--accent), #6366f1);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}
.author-info {
  display: flex;
  flex-direction: column;
}
.author-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
}
.author-title {
  font-size: 13px;
  color: var(--text-secondary);
}
.author-journey {
  font-size: 12px;
  color: var(--success);
  margin-top: 2px;
}

.testimonial-stats {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}
.testimonial-stats .stat {
  font-size: 12px;
  color: var(--text-tertiary);
}

.community-stats {
  padding: 32px;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  text-align: center;
}
.community-stats h4 {
  margin-bottom: 24px;
  font-size: 18px;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.impact-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.impact-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}
.impact-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 8px;
}

@media (max-width: 768px) {
  .testimonials-grid { grid-template-columns: 1fr; }
  .testimonial-card.featureed { grid-column: 1; }
  .impact-grid { grid-template-columns: repeat(2, 1fr); }
  .testimonial-stats { flex-wrap: wrap; }
}
</style>`
        },
        {
          id: "forum-reviews",
          title: "Community Reviews & Ratings",
          tags: ["community", "reviews", "ratings"],
          summary: "Reviews from Reddit, Discord, and professional networks about learning resources.",
          content: `
<div class="reviews-section">
  <div class="reviews-header">
    <h3>💬 Community Reviews</h3>
    <p>Aggregated reviews from Reddit, Discord, LinkedIn, and professional forums</p>
  </div>
  
  <div class="overall-rating">
    <div class="rating-score">
      <span class="score">4.9</span>
      <div class="stars">★★★★★</div>
      <span class="total">Based on 1,247 reviews</span>
    </div>
    <div class="rating-breakdown">
      <div class="rating-bar">
        <span>5★</span>
        <div class="bar"><div class="fill" style="width: 92%"></div></div>
        <span>92%</span>
      </div>
      <div class="rating-bar">
        <span>4★</span>
        <div class="bar"><div class="fill" style="width: 6%"></div></div>
        <span>6%</span>
      </div>
      <div class="rating-bar">
        <span>3★</span>
        <div class="bar"><div class="fill" style="width: 1.5%"></div></div>
        <span>1.5%</span>
      </div>
      <div class="rating-bar">
        <span>2★</span>
        <div class="bar"><div class="fill" style="width: 0.3%"></div></div>
        <span>0.3%</span>
      </div>
      <div class="rating-bar">
        <span>1★</span>
        <div class="bar"><div class="fill" style="width: 0.2%"></div></div>
        <span>0.2%</span>
      </div>
    </div>
  </div>
  
  <div class="reviews-filters">
    <button class="filter-btn active">All Sources</button>
    <button class="filter-btn">Reddit</button>
    <button class="filter-btn">Discord</button>
    <button class="filter-btn">LinkedIn</button>
  </div>
  
  <div class="reviews-list">
    <div class="review-item">
      <div class="review-header">
        <div class="reviewer">
          <span class="reviewer-name">u/devops_dave</span>
          <span class="reviewer-source reddit">Reddit r/devops</span>
        </div>
        <div class="review-rating">★★★★★</div>
      </div>
      <p class="review-text">"Finally a resource that doesn't just teach you WHAT to do but WHY you're doing it. The architecture diagrams and real-world scenarios are incredibly valuable. Used this to prep for my AWS SA Pro and passed on first try."</p>
      <div class="review-footer">
        <span class="review-date">2 weeks ago</span>
        <span class="review-helpful">👍 234 found helpful</span>
      </div>
    </div>
    
    <div class="review-item">
      <div class="review-header">
        <div class="reviewer">
          <span class="reviewer-name">u/k8s_newbie</span>
          <span class="reviewer-source reddit">Reddit r/kubernetes</span>
        </div>
        <div class="review-rating">★★★★★</div>
      </div>
      <p class="review-text">"The Kubernetes section here is chef's kiss 👌. Better than most paid courses. The interactive labs actually helped me understand concepts I was struggling with for months."</p>
      <div class="review-footer">
        <span class="review-date">1 month ago</span>
        <span class="review-helpful">👍 189 found helpful</span>
      </div>
    </div>
    
    <div class="review-item">
      <div class="review-header">
        <div class="reviewer">
          <span class="reviewer-name">cloud_guru_99</span>
          <span class="reviewer-source discord">Discord</span>
        </div>
        <div class="review-rating">★★★★☆</div>
      </div>
      <p class="review-text">"Solid content overall. Would love to see more Terraform modules and Azure-specific content. The Linux fundamentals section is outstanding though - best I've seen anywhere."</p>
      <div class="review-footer">
        <span class="review-date">3 weeks ago</span>
        <span class="review-helpful">👍 156 found helpful</span>
      </div>
    </div>
    
    <div class="review-item">
      <div class="review-header">
        <div class="reviewer">
          <span class="reviewer-name">Sarah Chen</span>
          <span class="reviewer-source linkedin">LinkedIn</span>
        </div>
        <div class="review-rating">★★★★★</div>
      </div>
      <p class="review-text">"As a hiring manager, I can tell when candidates have used quality resources. The ones who mention InfraHub Pro in interviews consistently demonstrate deeper understanding. I've started recommending it to my team."</p>
      <div class="review-footer">
        <span class="review-date">1 month ago</span>
        <span class="review-helpful">👍 412 found helpful</span>
      </div>
    </div>
    
    <div class="review-item">
      <div class="review-header">
        <div class="reviewer">
          <span class="reviewer-name">u/network_ninja</span>
          <span class="reviewer-source reddit">Reddit r/networking</span>
        </div>
        <div class="review-rating">★★★★★</div>
      </div>
      <p class="review-text">"Network engineer here transitioning to cloud. The networking section bridges traditional networking with cloud networking perfectly. Finally understand VPC peering, Transit Gateway, and hybrid connectivity!"</p>
      <div class="review-footer">
        <span class="review-date">2 months ago</span>
        <span class="review-helpful">👍 267 found helpful</span>
      </div>
    </div>
  </div>
</div>

<style>
.reviews-section { max-width: 900px; }
.reviews-header { margin-bottom: 32px; }
.reviews-header h3 { margin-bottom: 8px; }
.reviews-header p { color: var(--text-secondary); }

.overall-rating {
  display: flex;
  gap: 48px;
  padding: 32px;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
}
.rating-score {
  text-align: center;
}
.rating-score .score {
  display: block;
  font-size: 64px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}
.rating-score .stars {
  font-size: 24px;
  color: #fbbf24;
  margin: 8px 0;
}
.rating-score .total {
  font-size: 13px;
  color: var(--text-tertiary);
}

.rating-breakdown {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}
.rating-bar {
  display: grid;
  grid-template-columns: 24px 1fr 40px;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--text-secondary);
}
.rating-bar .bar {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}
.rating-bar .fill {
  height: 100%;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  border-radius: 4px;
}

.reviews-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.filter-btn {
  padding: 8px 16px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn:hover,
.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.reviews-list { display: grid; gap: 16px; }

.review-item {
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.reviewer {
  display: flex;
  align-items: center;
  gap: 12px;
}
.reviewer-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 14px;
}
.reviewer-source {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 12px;
  text-transform: uppercase;
}
.reviewer-source.reddit {
  background: #ff4500;
  color: white;
}
.reviewer-source.discord {
  background: #5865F2;
  color: white;
}
.reviewer-source.linkedin {
  background: #0077b5;
  color: white;
}

.review-rating {
  color: #fbbf24;
  font-size: 16px;
  letter-spacing: 2px;
}

.review-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.review-footer {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .overall-rating { flex-direction: column; gap: 24px; }
  .review-header { flex-direction: column; align-items: flex-start; gap: 8px; }
}
</style>`
        }
      ],
      "Discussion Forum": [
        {
          id: "trending-discussions",
          title: "Trending Discussions",
          tags: ["community", "forum", "discussion"],
          summary: "Hot topics and active discussions from the community.",
          content: `
<div class="forum-section">
  <div class="forum-header">
    <h3>🔥 Trending Discussions</h3>
    <button class="btn btn-primary">Start New Topic</button>
  </div>
  
  <div class="forum-topics">
    <div class="topic-item hot">
      <div class="topic-status">
        <span class="status-icon">🔥</span>
        <span class="reply-count">142 replies</span>
      </div>
      <div class="topic-content">
        <h4>CKA Exam Experience - March 2025</h4>
        <p>Just passed my CKA! Here's what to expect and my study strategy...</p>
        <div class="topic-meta">
          <span class="author">by k8s_warrior</span>
          <span class="time">3 hours ago</span>
          <span class="tags">
            <span class="tag">CKA</span>
            <span class="tag">Kubernetes</span>
            <span class="tag">Exam Tips</span>
          </span>
        </div>
      </div>
    </div>
    
    <div class="topic-item">
      <div class="topic-status">
        <span class="status-icon">💬</span>
        <span class="reply-count">89 replies</span>
      </div>
      <div class="topic-content">
        <h4>AWS vs Azure vs GCP - Which to start with in 2025?</h4>
        <p>Career changer here, want to pick the right cloud platform to focus on...</p>
        <div class="topic-meta">
          <span class="author">by cloud_newbie_25</span>
          <span class="time">5 hours ago</span>
          <span class="tags">
            <span class="tag">Career</span>
            <span class="tag">Cloud</span>
          </span>
        </div>
      </div>
    </div>
    
    <div class="topic-item hot">
      <div class="topic-status">
        <span class="status-icon">🔥</span>
        <span class="reply-count">234 replies</span>
      </div>
      <div class="topic-content">
        <h4>Salary Transparency Thread - DevOps/Cloud Engineers 2025</h4>
        <p>Let's share our YOE, location, and TC to help others benchmark...</p>
        <div class="topic-meta">
          <span class="author">by salary_transparency_advocate</span>
          <span class="time">1 day ago</span>
          <span class="tags">
            <span class="tag">Salary</span>
            <span class="tag">Career</span>
          </span>
        </div>
      </div>
    </div>
    
    <div class="topic-item solved">
      <div class="topic-status">
        <span class="status-icon">✅</span>
        <span class="reply-count">23 replies</span>
      </div>
      <div class="topic-content">
        <h4>Terraform - How to handle circular dependencies?</h4>
        <p>Getting circular dependency error with VPC and security groups...</p>
        <div class="topic-meta">
          <span class="author">by terraform_stuck</span>
          <span class="time">2 days ago</span>
          <span class="tags">
            <span class="tag">Terraform</span>
            <span class="tag">IaC</span>
            <span class="tag solved-tag">Solved</span>
          </span>
        </div>
      </div>
    </div>
    
    <div class="topic-item">
      <div class="topic-status">
        <span class="status-icon">💬</span>
        <span class="reply-count">67 replies</span>
      </div>
      <div class="topic-content">
        <h4>Homelab Setup Showcase - March 2025</h4>
        <p>Share your homelab setups! Here's my 3-node K3s cluster on Raspberry Pi...</p>
        <div class="topic-meta">
          <span class="author">by homelab_enthusiast</span>
          <span class="time">2 days ago</span>
          <span class="tags">
            <span class="tag">Homelab</span>
            <span class="tag">Showcase</span>
          </span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="forum-categories">
    <h4>Browse by Category</h4>
    <div class="category-grid">
      <div class="category-card">
        <span class="category-icon">☁️</span>
        <span class="category-name">Cloud</span>
        <span class="category-count">1,247 topics</span>
      </div>
      <div class="category-card">
        <span class="category-icon">☸️</span>
        <span class="category-name">Kubernetes</span>
        <span class="category-count">892 topics</span>
      </div>
      <div class="category-card">
        <span class="category-icon">🔄</span>
        <span class="category-name">DevOps</span>
        <span class="category-count">756 topics</span>
      </div>
      <div class="category-card">
        <span class="category-icon">🛡️</span>
        <span class="category-name">Security</span>
        <span class="category-count">534 topics</span>
      </div>
      <div class="category-card">
        <span class="category-icon">💼</span>
        <span class="category-name">Career</span>
        <span class="category-count">1,103 topics</span>
      </div>
      <div class="category-card">
        <span class="category-icon">🎓</span>
        <span class="category-name">Certifications</span>
        <span class="category-count">678 topics</span>
      </div>
    </div>
  </div>
</div>

<style>
.forum-section { max-width: 1000px; }
.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.forum-header h3 { margin: 0; }

.forum-topics { margin-bottom: 40px; }

.topic-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin-bottom: 12px;
  transition: all 0.2s;
}
.topic-item:hover {
  border-color: var(--accent);
  transform: translateX(4px);
}
.topic-item.hot {
  border-left: 3px solid #ef4444;
}
.topic-item.solved {
  border-left: 3px solid var(--success);
}

.topic-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
}
.status-icon {
  font-size: 24px;
  margin-bottom: 4px;
}
.reply-count {
  font-size: 11px;
  color: var(--text-tertiary);
}

.topic-content { flex: 1; }
.topic-content h4 {
  font-size: 15px;
  margin-bottom: 6px;
  color: var(--text-primary);
}
.topic-content p {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 10px;
}

.topic-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.topic-meta .author,
.topic-meta .time {
  font-size: 12px;
  color: var(--text-tertiary);
}
.topic-meta .tags {
  display: flex;
  gap: 6px;
}
.topic-meta .tag {
  font-size: 11px;
  padding: 3px 10px;
  background: var(--bg-tertiary);
  border-radius: 12px;
  color: var(--text-secondary);
}
.topic-meta .tag.solved-tag {
  background: var(--success);
  color: white;
}

.forum-categories h4 { margin-bottom: 16px; }
.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}
.category-card:hover {
  background: var(--accent);
}
.category-card:hover .category-name,
.category-card:hover .category-count {
  color: white;
}
.category-icon {
  font-size: 28px;
  margin-bottom: 8px;
}
.category-name {
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.category-count {
  font-size: 12px;
  color: var(--text-tertiary);
}

@media (max-width: 768px) {
  .forum-header { flex-direction: column; gap: 16px; }
  .topic-item { flex-direction: column; }
  .topic-status { flex-direction: row; gap: 8px; }
}
</style>`
        }
      ],
      "Expert Contributors": [
        {
          id: "top-contributors",
          title: "Expert Contributors",
          tags: ["community", "experts", "mentors"],
          summary: "Meet the industry experts and top contributors who make this community great.",
          content: `
<div class="contributors-section">
  <div class="section-header">
    <h3>👑 Expert Contributors</h3>
    <p>Industry professionals sharing their knowledge and experience</p>
  </div>
  
  <div class="contributors-grid">
    <div class="contributor-card featured">
      <div class="contributor-banner"></div>
      <div class="contributor-avatar-large">AD</div>
      <div class="contributor-info">
        <h4>Andi Dewanto</h4>
        <span class="contributor-title">Principal SRE @ Grab</span>
        <p class="contributor-bio">15+ years in infrastructure. ex-AWS, ex-Netflix. Kubernetes contributor. Passionate about reliability engineering.</p>
        <div class="contributor-stats">
          <span>📝 156 articles</span>
          <span>💬 423 answers</span>
          <span>⭐ 12.4k reputation</span>
        </div>
        <div class="contributor-expertise">
          <span class="exp-tag">Kubernetes</span>
          <span class="exp-tag">SRE</span>
          <span class="exp-tag">Go</span>
        </div>
      </div>
    </div>
    
    <div class="contributor-card">
      <div class="contributor-avatar">MS</div>
      <div class="contributor-info">
        <h4>Maya Sari</h4>
        <span class="contributor-title">Senior Cloud Architect @ Traveloka</span>
        <p class="contributor-bio">AWS Community Builder. Specializes in multi-cloud architectures and cost optimization.</p>
        <div class="contributor-stats">
          <span>📝 89 articles</span>
          <span>💬 267 answers</span>
        </div>
        <div class="contributor-expertise">
          <span class="exp-tag">AWS</span>
          <span class="exp-tag">Terraform</span>
        </div>
      </div>
    </div>
    
    <div class="contributor-card">
      <div class="contributor-avatar">RK</div>
      <div class="contributor-info">
        <h4>Rudi Kurniawan</h4>
        <span class="contributor-title">DevOps Lead @ Bukalapak</span>
        <p class="contributor-bio">CI/CD enthusiast. Built deployment pipelines handling 1000+ daily deploys.</p>
        <div class="contributor-stats">
          <span>📝 67 articles</span>
          <span>💬 198 answers</span>
        </div>
        <div class="contributor-expertise">
          <span class="exp-tag">CI/CD</span>
          <span class="exp-tag">GitOps</span>
        </div>
      </div>
    </div>
    
    <div class="contributor-card">
      <div class="contributor-avatar">DP</div>
      <div class="contributor-info">
        <h4>Dina Putri</h4>
        <span class="contributor-title">Security Engineer @ OVO</span>
        <p class="contributor-bio">Cloud security specialist. OSCP, AWS Security Specialty certified.</p>
        <div class="contributor-stats">
          <span>📝 45 articles</span>
          <span>💬 156 answers</span>
        </div>
        <div class="contributor-expertise">
          <span class="exp-tag">Security</span>
          <span class="exp-tag">Compliance</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="become-contributor">
    <h4>Become a Contributor</h4>
    <p>Share your expertise and help others grow. Top contributors get:</p>
    <ul>
      <li>🏅 Exclusive badge on your profile</li>
      <li>🎁 Free certification exam vouchers</li>
      <li>🤝 Mentorship opportunities</li>
      <li>📢 Feature in community spotlight</li>
    </ul>
    <button class="btn btn-primary">Apply to Contribute</button>
  </div>
</div>

<style>
.contributors-section { max-width: 1000px; }
.section-header { margin-bottom: 32px; }
.section-header h3 { margin-bottom: 8px; }
.section-header p { color: var(--text-secondary); }

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.contributor-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  text-align: center;
  transition: transform 0.2s;
}
.contributor-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
}
.contributor-card.featured {
  grid-column: 1 / -1;
  text-align: left;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  position: relative;
  overflow: hidden;
}

.contributor-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(135deg, var(--accent), #6366f1);
}

.contributor-avatar {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, var(--accent), #6366f1);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  margin: 0 auto 16px;
}
.contributor-avatar-large {
  width: 100px;
  height: 100px;
  background: white;
  color: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
  position: relative;
  z-index: 1;
  margin-top: 20px;
}

.contributor-card.featured .contributor-info {
  position: relative;
  z-index: 1;
  margin-top: 20px;
}

.contributor-info h4 {
  font-size: 16px;
  margin-bottom: 4px;
  color: var(--text-primary);
}
.contributor-title {
  display: block;
  font-size: 13px;
  color: var(--accent);
  margin-bottom: 12px;
}
.contributor-bio {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

.contributor-stats {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 16px;
}
.contributor-card.featured .contributor-stats {
  justify-content: flex-start;
}

.contributor-expertise {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.contributor-card.featured .contributor-expertise {
  justify-content: flex-start;
}
.exp-tag {
  padding: 4px 12px;
  background: var(--bg-tertiary);
  border-radius: 20px;
  font-size: 12px;
  color: var(--text-secondary);
}

.become-contributor {
  padding: 32px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid var(--accent);
  border-radius: var(--radius-lg);
  text-align: center;
}
.become-contributor h4 {
  margin-bottom: 12px;
}
.become-contributor p {
  color: var(--text-secondary);
  margin-bottom: 16px;
}
.become-contributor ul {
  display: inline-block;
  text-align: left;
  margin-bottom: 20px;
}
.become-contributor li {
  color: var(--text-secondary);
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .contributor-card.featured {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .contributor-card.featured .contributor-stats,
  .contributor-card.featured .contributor-expertise {
    justify-content: center;
  }
}
</style>`
        }
      ]
    }
  }
};

// Merge with KNOWLEDGE_BASE
if (typeof KNOWLEDGE_BASE !== 'undefined') {
  Object.assign(KNOWLEDGE_BASE, COMMUNITY_DATA);
}
