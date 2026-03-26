// Code Snippets Library - Ready to use configurations
const SNIPPETS_DATA = {
  snippets: {
    title: "Code Snippets",
    description: "Production-ready code snippets and configurations",
    color: "var(--info)",
    subtopics: {
      "Docker & Compose": [
        {
          id: "docker-snippets",
          title: "Docker & Docker Compose Snippets",
          tags: ["snippets", "docker", "containers"],
          summary: "Ready-to-use Docker configurations for common scenarios.",
          content: `
<div class="snippets-library">
  <div class="snippets-header">
    <h3>🐳 Docker & Docker Compose Snippets</h3>
    <p>Production-ready configurations you can copy and use immediately</p>
  </div>
  
  <div class="snippet-category">
    <h4>Multi-Stage Build (Node.js)</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">Dockerfile</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code"># Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN addgroup -g 1001 -S nodejs && \\
    adduser -S nodejs -u 1001
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .
USER nodejs
EXPOSE 3000
CMD ["node", "server.js"]</pre>
    </div>
  </div>
  
  <div class="snippet-category">
    <h4>Production Docker Compose</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">yaml</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">version: '3.8'

services:
  app:
    build: .
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - backend
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: app
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: redis-server --appendonly yes --maxmemory 256mb
    volumes:
      - redis_data:/data
    networks:
      - backend

volumes:
  postgres_data:
  redis_data:

networks:
  backend:
    driver: bridge</pre>
    </div>
  </div>
  
  <div class="snippet-category">
    <h4>Nginx Reverse Proxy</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">nginx.conf</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">upstream app {
    least_conn;
    server app:3000 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name _;
    
    location / {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    location /health {
        access_log off;
        return 200 "healthy\\n";
        add_header Content-Type text/plain;
    }
}</pre>
    </div>
  </div>
</div>

<script>
function copySnippet(btn) {
  const code = btn.closest('.code-snippet').querySelector('.snippet-code').textContent;
  navigator.clipboard.writeText(code);
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = 'Copy', 2000);
}
<\/script>

<style>
.snippets-library { max-width: 900px; }
.snippets-header { margin-bottom: 32px; }
.snippets-header h3 { margin-bottom: 8px; }
.snippets-header p { color: var(--text-secondary); }

.snippet-category { margin-bottom: 32px; }
.snippet-category h4 {
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.code-snippet {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.snippet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
}
.snippet-lang {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
}
.snippet-code {
  padding: 20px;
  margin: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-primary);
  overflow-x: auto;
  background: var(--bg-tertiary);
}
</style>`
        }
      ],
      "Kubernetes": [
        {
          id: "k8s-snippets",
          title: "Kubernetes Snippets",
          tags: ["snippets", "kubernetes", "yaml"],
          summary: "Common Kubernetes manifests and patterns.",
          content: `
<div class="snippets-library">
  <div class="snippets-header">
    <h3>☸️ Kubernetes Snippets</h3>
    <p>Production-ready K8s manifests</p>
  </div>
  
  <div class="snippet-category">
    <h4>Deployment with HPA</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">yaml</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 1000
      containers:
      - name: myapp
        image: myapp:v1.0.0
        ports:
        - containerPort: 8080
          name: http
        env:
        - name: PORT
          value: "8080"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
            - ALL
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80</pre>
    </div>
  </div>
  
  <div class="snippet-category">
    <h4>Ingress with TLS</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">yaml</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp
            port:
              number: 80</pre>
    </div>
  </div>
  
  <div class="snippet-category">
    <h4>Pod Disruption Budget</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">yaml</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: myapp</pre>
    </div>
  </div>
  
  <div class="snippet-category">
    <h4>Network Policy</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">yaml</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: myapp-network-policy
spec:
  podSelector:
    matchLabels:
      app: myapp
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - namespaceSelector: {}
    ports:
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432</pre>
    </div>
  </div>
</div>

<script>
function copySnippet(btn) {
  const code = btn.closest('.code-snippet').querySelector('.snippet-code').textContent;
  navigator.clipboard.writeText(code);
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = 'Copy', 2000);
}
<\/script>`
        }
      ],
      "Terraform": [
        {
          id: "terraform-snippets",
          title: "Terraform Snippets",
          tags: ["snippets", "terraform", "iac"],
          summary: "Reusable Terraform modules and patterns.",
          content: `
<div class="snippets-library">
  <div class="snippets-header">
    <h3>🏗️ Terraform Snippets</h3>
    <p>Best practice Terraform configurations</p>
  </div>
  
  <div class="snippet-category">
    <h4>AWS VPC Module</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">hcl</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "production-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = false
  enable_dns_hostnames   = true
  enable_dns_support     = true

  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }

  private_subnet_tags = {
    Tier = "private"
  }

  public_subnet_tags = {
    Tier = "public"
  }
}</pre>
    </div>
  </div>
  
  <div class="snippet-category">
    <h4>EKS Cluster</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">hcl</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = "production-cluster"
  cluster_version = "1.28"

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    general = {
      desired_size = 3
      min_size     = 2
      max_size     = 10

      instance_types = ["m6i.large"]
      capacity_type  = "ON_DEMAND"

      labels = {
        workload = "general"
      }

      update_config = {
        max_unavailable_percentage = 25
      }
    }
  }

  tags = {
    Environment = "production"
  }
}</pre>
    </div>
  </div>
  
  <div class="snippet-category">
    <h4>S3 Bucket with Best Practices</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">hcl</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">resource "aws_s3_bucket" "this" {
  bucket = "my-secure-bucket"
}

resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.this.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "this" {
  bucket = aws_s3_bucket.this.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.this.arn
    }
  }
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "EnforceTLS"
        Effect    = "Deny"
        Principal = "*"
        Action    = "s3:*"
        Resource  = [
          aws_s3_bucket.this.arn,
          "${aws_s3_bucket.this.arn}/*"
        ]
        Condition = {
          Bool = {
            "aws:SecureTransport" = "false"
          }
        }
      }
    ]
  })
}</pre>
    </div>
  </div>
</div>

<script>
function copySnippet(btn) {
  const code = btn.closest('.code-snippet').querySelector('.snippet-code').textContent;
  navigator.clipboard.writeText(code);
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = 'Copy', 2000);
}
<\/script>`
        }
      ],
      "CI/CD": [
        {
          id: "cicd-snippets",
          title: "CI/CD Pipeline Snippets",
          tags: ["snippets", "cicd", "github-actions"],
          summary: "CI/CD pipeline configurations for various platforms.",
          content: `
<div class="snippets-library">
  <div class="snippets-header">
    <h3>🔄 CI/CD Pipeline Snippets</h3>
    <p>Ready-to-use pipeline configurations</p>
  </div>
  
  <div class="snippet-category">
    <h4>GitHub Actions - Docker Build & Push</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">yaml</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${"$"}{{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${"$"}{{ env.REGISTRY }}
        username: ${"$"}{{ github.actor }}
        password: ${"$"}{{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${"$"}{{ env.REGISTRY }}/${"$"}{{ env.IMAGE_NAME }}
        tags: |
          type=sha,prefix=,suffix=,format=short
          type=ref,event=branch
          type=semver,pattern={{version}}
    
    - name: Build and push
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${"$"}{{ steps.meta.outputs.tags }}
        labels: ${"$"}{{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
        platforms: linux/amd64,linux/arm64</pre>
    </div>
  </div>
  
  <div class="snippet-category">
    <h4>GitHub Actions - Terraform</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">yaml</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">name: Terraform

on:
  push:
    branches: [main]
    paths: ['terraform/**']
  pull_request:
    paths: ['terraform/**']

jobs:
  terraform:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./terraform
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Terraform
      uses: hashicorp/setup-terraform@v3
      with:
        terraform_version: "1.6.0"
    
    - name: Configure AWS Credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${"$"}{{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${"$"}{{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
    
    - name: Terraform Format Check
      run: terraform fmt -check -recursive
    
    - name: Terraform Init
      run: terraform init
    
    - name: Terraform Validate
      run: terraform validate
    
    - name: Terraform Plan
      run: terraform plan -input=false
      if: github.event_name == 'pull_request'
    
    - name: Terraform Apply
      run: terraform apply -auto-approve -input=false
      if: github.ref == 'refs/heads/main' && github.event_name == 'push'</pre>
    </div>
  </div>
  
  <div class="snippet-category">
    <h4>GitLab CI - Kubernetes Deploy</h4>
    <div class="code-snippet">
      <div class="snippet-header">
        <span class="snippet-lang">yaml</span>
        <button class="copy-btn" onclick="copySnippet(this)">Copy</button>
      </div>
      <pre class="snippet-code">stages:
  - build
  - test
  - deploy

variables:
  DOCKER_IMAGE: $CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
    - docker build -t $DOCKER_IMAGE .
    - docker push $DOCKER_IMAGE
  only:
    - main

test:
  stage: test
  image: $DOCKER_IMAGE
  script:
    - npm test
  only:
    - main

deploy:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context production
    - kubectl set image deployment/myapp app=$DOCKER_IMAGE
    - kubectl rollout status deployment/myapp
  environment:
    name: production
    url: https://myapp.example.com
  only:
    - main</pre>
    </div>
  </div>
</div>

<script>
function copySnippet(btn) {
  const code = btn.closest('.code-snippet').querySelector('.snippet-code').textContent;
  navigator.clipboard.writeText(code);
  btn.textContent = 'Copied!';
  setTimeout(() => btn.textContent = 'Copy', 2000);
}
<\/script>`
        }
      ]
    }
  }
};

// Merge with KNOWLEDGE_BASE
if (typeof KNOWLEDGE_BASE !== 'undefined') {
  Object.assign(KNOWLEDGE_BASE, SNIPPETS_DATA);
}
