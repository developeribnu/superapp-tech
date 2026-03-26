// Project-Based Learning & Hands-on Labs Data Module
const PROJECTS_DATA = {
  projects: {
    title: "Hands-on Labs",
    description: "Build real-world infrastructure projects and gain practical experience",
    color: "var(--danger)",
    subtopics: {
      "Beginner Projects": [
        {
          id: "static-website",
          title: "Deploy Static Website on S3 + CloudFront",
          tags: ["project", "aws", "beginner"],
          summary: "Learn the basics of AWS by deploying a static website with S3, CloudFront, and custom domain.",
          content: `
<div class="project-container">
  <div class="project-header">
    <div class="project-meta">
      <span class="difficulty beginner">Beginner</span>
      <span class="duration">⏱️ 2-3 hours</span>
      <span class="cost">💰 Free tier eligible</span>
    </div>
    <h3>🌐 Deploy Static Website on AWS</h3>
    <p>Build and deploy a portfolio website using S3, CloudFront, and Route 53</p>
  </div>
  
  <div class="project-overview">
    <div class="learning-outcomes">
      <h4>What You'll Learn</h4>
      <ul>
        <li>S3 bucket creation and configuration</li>
        <li>Static website hosting on S3</li>
        <li>CloudFront CDN setup</li>
        <li>Custom domain with Route 53</li>
        <li>SSL/TLS certificate with ACM</li>
        <li>Infrastructure as Code with Terraform</li>
      </ul>
    </div>
    
    <div class="tech-stack">
      <h4>Tech Stack</h4>
      <div class="stack-tags">
        <span class="stack-tag">AWS S3</span>
        <span class="stack-tag">CloudFront</span>
        <span class="stack-tag">Route 53</span>
        <span class="stack-tag">ACM</span>
        <span class="stack-tag">Terraform</span>
      </div>
    </div>
  </div>
  
  <div class="project-steps">
    <h4>Project Steps</h4>
    
    <div class="step-item">
      <div class="step-number">1</div>
      <div class="step-content">
        <h5>Create S3 Bucket</h5>
        <p>Create an S3 bucket with the same name as your domain. Enable static website hosting.</p>
        <div class="code-block">
          <div class="code-header">
            <span class="code-lang">hcl</span>
            <button class="copy-btn">Copy</button>
          </div>
          <pre class="code-block-content">resource "aws_s3_bucket" "website" {
  bucket = "my-portfolio-website"
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id
  
  index_document {
    suffix = "index.html"
  }
  
  error_document {
    key = "error.html"
  }
}</pre>
        </div>
      </div>
    </div>
    
    <div class="step-item">
      <div class="step-number">2</div>
      <div class="step-content">
        <h5>Configure CloudFront Distribution</h5>
        <p>Set up CloudFront CDN for global content delivery with HTTPS.</p>
        <div class="code-block">
          <div class="code-header">
            <span class="code-lang">hcl</span>
            <button class="copy-btn">Copy</button>
          </div>
          <pre class="code-block-content">resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.website.bucket}"
    
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  
  enabled             = true
  default_root_object = "index.html"
  
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.website.bucket}"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    
    viewer_protocol_policy = "redirect-to-https"
  }
  
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }
}</pre>
        </div>
      </div>
    </div>
    
    <div class="step-item">
      <div class="step-number">3</div>
      <div class="step-content">
        <h5>Deploy and Test</h5>
        <p>Run Terraform to deploy your infrastructure and upload your website files.</p>
        <div class="code-block">
          <div class="code-header">
            <span class="code-lang">bash</span>
            <button class="copy-btn">Copy</button>
          </div>
          <pre class="code-block-content"># Initialize Terraform
terraform init

# Plan the deployment
terraform plan

# Apply the configuration
terraform apply

# Upload website files
aws s3 sync ./website s3://my-portfolio-website</pre>
        </div>
      </div>
    </div>
  </div>
  
  <div class="project-deliverables">
    <h4>Deliverables</h4>
    <ul class="checklist">
      <li><input type="checkbox"> S3 bucket with static website hosting</li>
      <li><input type="checkbox"> CloudFront distribution configured</li>
      <li><input type="checkbox"> Custom domain pointing to CloudFront</li>
      <li><input type="checkbox"> HTTPS enabled with valid SSL certificate</li>
      <li><input type="checkbox"> Terraform code in GitHub repository</li>
      <li><input type="checkbox"> Website accessible via custom domain</li>
    </ul>
  </div>
  
  <div class="project-resources">
    <h4>Additional Resources</h4>
    <div class="resource-links">
      <a href="#" class="resource-link">
        <span class="icon">📄</span>
        <span>Full Terraform Module</span>
      </a>
      <a href="#" class="resource-link">
        <span class="icon">🎥</span>
        <span>Video Walkthrough</span>
      </a>
      <a href="#" class="resource-link">
        <span class="icon">💬</span>
        <span>Community Discussion</span>
      </a>
    </div>
  </div>
</div>

<style>
.project-container { max-width: 900px; }

.project-header {
  margin-bottom: 32px;
}
.project-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.project-meta span {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}
.difficulty.beginner {
  background: var(--success);
  color: white;
}
.duration, .cost {
  background: var(--bg-secondary);
  color: var(--text-secondary);
}

.project-header h3 {
  font-size: 24px;
  margin-bottom: 8px;
}
.project-header p {
  color: var(--text-secondary);
  font-size: 15px;
}

.project-overview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}
.learning-outcomes,
.tech-stack {
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}
.learning-outcomes h4,
.tech-stack h4 {
  margin-bottom: 16px;
  font-size: 15px;
}
.learning-outcomes ul {
  margin: 0;
  padding-left: 20px;
}
.learning-outcomes li {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.stack-tag {
  padding: 6px 14px;
  background: var(--accent);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.project-steps { margin-bottom: 32px; }
.project-steps h4 { margin-bottom: 20px; }

.step-item {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}
.step-number {
  width: 36px;
  height: 36px;
  background: var(--accent);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}
.step-content { flex: 1; }
.step-content h5 {
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--text-primary);
}
.step-content p {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 12px;
}

.project-deliverables {
  padding: 24px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  margin-bottom: 24px;
}
.project-deliverables h4 { margin-bottom: 16px; }

.checklist {
  list-style: none;
  padding: 0;
  margin: 0;
}
.checklist li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  color: var(--text-secondary);
  font-size: 14px;
  border-bottom: 1px solid var(--border);
}
.checklist li:last-child { border-bottom: none; }
.checklist input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
}

.project-resources h4 { margin-bottom: 16px; }
.resource-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.resource-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}
.resource-link:hover {
  background: var(--accent);
  color: white;
}

@media (max-width: 768px) {
  .project-overview { grid-template-columns: 1fr; }
  .step-item { flex-direction: column; gap: 12px; }
}
</style>`
        },
        {
          id: "docker-microservices",
          title: "Containerize a Microservices App",
          tags: ["project", "docker", "beginner"],
          summary: "Learn Docker by containerizing a simple microservices application with docker-compose.",
          content: `
<div class="project-container">
  <div class="project-header">
    <div class="project-meta">
      <span class="difficulty beginner">Beginner</span>
      <span class="duration">⏱️ 3-4 hours</span>
      <span class="cost">💰 Free</span>
    </div>
    <h3>🐳 Containerize a Microservices App</h3>
    <p>Build a simple e-commerce app with Node.js, Redis, and PostgreSQL using Docker</p>
  </div>
  
  <div class="architecture-diagram">
    <h4>Architecture</h4>
    <pre class="ascii-diagram">
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Nginx     │──────▶│  Node.js    │──────▶│  PostgreSQL │
│   (Web)     │      │   (API)     │      │  (Database) │
└─────────────┘      └──────┬──────┘      └─────────────┘
                            │
                            ▼
                     ┌─────────────┐
                     │    Redis    │
                     │   (Cache)   │
                     └─────────────┘</pre>
  </div>
  
  <div class="project-steps">
    <div class="step-item">
      <div class="step-number">1</div>
      <div class="step-content">
        <h5>Create Dockerfile for Node.js App</h5>
        <div class="code-block">
          <pre class="code-block-content">FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["node", "server.js"]</pre>
        </div>
      </div>
    </div>
    
    <div class="step-item">
      <div class="step-number">2</div>
      <div class="step-content">
        <h5>Create docker-compose.yml</h5>
        <div class="code-block">
          <pre class="code-block-content">version: '3.8'

services:
  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis
    
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: shop
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
      
  redis:
    image: redis:7-alpine
    volumes:
      - redisdata:/data
      
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - api

volumes:
  pgdata:
  redisdata:</pre>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.architecture-diagram {
  margin-bottom: 32px;
}
.architecture-diagram h4 {
  margin-bottom: 16px;
}
.ascii-diagram {
  background: var(--bg-tertiary);
  padding: 20px;
  border-radius: var(--radius-md);
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-primary);
  overflow-x: auto;
}
</style>`
        }
      ],
      "Intermediate Projects": [
        {
          id: "k8s-deployment",
          title: "Deploy Production-Ready App on Kubernetes",
          tags: ["project", "kubernetes", "intermediate"],
          summary: "Deploy a full-stack application on Kubernetes with ingress, monitoring, and auto-scaling.",
          content: `
<div class="project-container">
  <div class="project-header">
    <div class="project-meta">
      <span class="difficulty intermediate">Intermediate</span>
      <span class="duration">⏱️ 6-8 hours</span>
      <span class="cost">💰 ~$20-50 cloud credits</span>
    </div>
    <h3>☸️ Production Kubernetes Deployment</h3>
    <p>Deploy a microservices application with Helm, Ingress, cert-manager, and monitoring stack</p>
  </div>
  
  <div class="project-overview">
    <div class="learning-outcomes">
      <h4>What You'll Learn</h4>
      <ul>
        <li>EKS/GKE cluster provisioning</li>
        <li>Helm chart development</li>
        <li>Ingress controllers & SSL</li>
        <li>Horizontal Pod Autoscaling</li>
        <li>Prometheus + Grafana monitoring</li>
        <li>Pod Disruption Budgets</li>
        <li>Network Policies</li>
      </ul>
    </div>
    
    <div class="tech-stack">
      <h4>Tech Stack</h4>
      <div class="stack-tags">
        <span class="stack-tag">EKS</span>
        <span class="stack-tag">Helm</span>
        <span class="stack-tag">Ingress-NGINX</span>
        <span class="stack-tag">cert-manager</span>
        <span class="stack-tag">Prometheus</span>
        <span class="stack-tag">Grafana</span>
      </div>
    </div>
  </div>
  
  <div class="project-steps">
    <div class="step-item">
      <div class="step-number">1</div>
      <div class="step-content">
        <h5>Create Helm Chart Structure</h5>
        <div class="code-block">
          <pre class="code-block-content">myapp/
├── Chart.yaml
├── values.yaml
├── values-production.yaml
└── templates/
    ├── _helpers.tpl
    ├── deployment.yaml
    ├── service.yaml
    ├── ingress.yaml
    ├── hpa.yaml
    └── pdb.yaml</pre>
        </div>
      </div>
    </div>
    
    <div class="step-item">
      <div class="step-number">2</div>
      <div class="step-content">
        <h5>Configure HPA for Auto-scaling</h5>
        <div class="code-block">
          <pre class="code-block-content">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: {{ include "myapp.fullname" . }}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: {{ include "myapp.fullname" . }}
  minReplicas: {{ .Values.autoscaling.minReplicas }}
  maxReplicas: {{ .Values.autoscaling.maxReplicas }}
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: {{ .Values.autoscaling.targetCPU }}</pre>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.difficulty.intermediate {
  background: var(--warning);
  color: white;
}
</style>`
        },
        {
          id: "terraform-multi-env",
          title: "Multi-Environment Infrastructure with Terraform",
          tags: ["project", "terraform", "intermediate"],
          summary: "Build a reusable Terraform setup for managing dev, staging, and production environments.",
          content: `
<div class="project-container">
  <div class="project-header">
    <div class="project-meta">
      <span class="difficulty intermediate">Intermediate</span>
      <span class="duration">⏱️ 5-6 hours</span>
      <span class="cost">💰 Free tier eligible</span>
    </div>
    <h3>🏗️ Multi-Environment Terraform Setup</h3>
    <p>Professional-grade Terraform workspace structure with modules and remote state</p>
  </div>
  
  <div class="project-steps">
    <div class="step-item">
      <div class="step-number">1</div>
      <div class="step-content">
        <h5>Project Structure</h5>
        <div class="code-block">
          <pre class="code-block-content">infrastructure/
├── modules/
│   ├── vpc/
│   ├── compute/
│   ├── database/
│   └── monitoring/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── terraform.tfvars
│   ├── staging/
│   └── production/
└── backend.tf</pre>
        </div>
      </div>
    </div>
  </div>
</div>`
        }
      ],
      "Advanced Projects": [
        {
          id: "gitops-cicd",
          title: "GitOps-Driven CI/CD with ArgoCD",
          tags: ["project", "gitops", "advanced"],
          summary: "Implement a complete GitOps workflow with ArgoCD, Tekton, and progressive delivery.",
          content: `
<div class="project-container">
  <div class="project-header">
    <div class="project-meta">
      <span class="difficulty advanced">Advanced</span>
      <span class="duration">⏱️ 10-12 hours</span>
      <span class="cost">💰 ~$50-100 cloud credits</span>
    </div>
    <h3>🔄 Enterprise GitOps Pipeline</h3>
    <p>Build a production-grade GitOps platform with ArgoCD, image updater, and canary deployments</p>
  </div>
  
  <div class="architecture-diagram">
    <h4>GitOps Architecture</h4>
    <pre class="ascii-diagram">
Developer Push    Build Pipeline    Image Registry    ArgoCD     Kubernetes
     │                  │                │              │             │
     ▼                  ▼                ▼              ▼             ▼
┌─────────┐      ┌──────────┐      ┌─────────┐    ┌────────┐    ┌──────────┐
│   Git   │──────▶│  Tekton  │──────▶│   ECR   │◀───│ ArgoCD │───▶│  Prod    │
│  Repo   │      │  Build   │      │  (v1.2) │    │  Sync  │    │ Cluster  │
└─────────┘      └──────────┘      └─────────┘    └────────┘    └──────────┘
     │                                                            │
     │                    GitOps Repo                              │
     └────────────────────────┬───────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  App Definitions  │
                    │  (Kustomize)      │
                    └───────────────────┘</pre>
  </div>
</div>

<style>
.difficulty.advanced {
  background: var(--danger);
  color: white;
}
</style>`
        },
        {
          id: "observability-platform",
          title: "Build an Observability Platform",
          tags: ["project", "observability", "advanced"],
          summary: "Create a comprehensive observability stack with metrics, logs, traces, and alerting.",
          content: `
<div class="project-container">
  <div class="project-header">
    <div class="project-meta">
      <span class="difficulty advanced">Advanced</span>
      <span class="duration">⏱️ 12-15 hours</span>
      <span class="cost">💰 ~$100-200 cloud credits</span>
    </div>
    <h3>📊 Comprehensive Observability Stack</h3>
    <p>Deploy OpenTelemetry, Prometheus, Loki, Tempo, and Grafana for full observability</p>
  </div>
  
  <div class="project-overview">
    <div class="learning-outcomes">
      <h4>Three Pillars of Observability</h4>
      <ul>
        <li><strong>Metrics:</strong> Prometheus + Thanos for long-term storage</li>
        <li><strong>Logs:</strong> Loki + Promtail for log aggregation</li>
        <li><strong>Traces:</strong> Tempo + OpenTelemetry instrumentation</li>
        <li><strong>Visualization:</strong> Grafana dashboards and alerts</li>
        <li><strong>Alerting:</strong> Alertmanager with PagerDuty integration</li>
      </ul>
    </div>
  </div>
</div>`
        }
      ]
    }
  }
};

// Merge with KNOWLEDGE_BASE
if (typeof KNOWLEDGE_BASE !== 'undefined') {
  Object.assign(KNOWLEDGE_BASE, PROJECTS_DATA);
}
