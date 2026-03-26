// DevOps & CI/CD Data Module
const DEVOPS_DATA = {
  devops: {
    title: "DevOps & CI/CD",
    description: "Git, Jenkins, GitHub Actions, ArgoCD, GitOps & Pipeline Design",
    color: "var(--devops-color)",
    subtopics: {
      "Git": [
        {
          id: "git-advanced-complete",
          title: "Git Advanced Commands & Workflows",
          tags: ["intermediate", "git"],
          summary: "Git branching strategies, rebase, cherry-pick, bisect, hooks, and workflows.",
          content: `<h3>Git Branching Strategies</h3>
<table>
<tr><th>Strategy</th><th>Branches</th><th>Best For</th></tr>
<tr><td>Git Flow</td><td>main, develop, feature/, release/, hotfix/</td><td>Scheduled releases</td></tr>
<tr><td>GitHub Flow</td><td>main + feature branches</td><td>Continuous deployment</td></tr>
<tr><td>Trunk-Based</td><td>main + short-lived branches</td><td>Fast CI/CD, experienced teams</td></tr>
<tr><td>GitLab Flow</td><td>main, pre-prod, prod + feature</td><td>Environment branches</td></tr>
</table>

<h3>Essential Git Commands</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Branching & Merging
git checkout -b feature/my-feature
git merge --no-ff feature/my-feature
git rebase main                     # rebase onto main
git rebase -i HEAD~3                # interactive rebase (squash)

# Cherry-pick & Bisect
git cherry-pick abc123              # pick specific commit
git bisect start                    # find breaking commit
git bisect bad                      # current is broken
git bisect good v1.0                # v1.0 was working

# Stash
git stash push -m "wip: feature"
git stash list
git stash pop                       # apply & remove
git stash apply stash@{1}           # apply specific

# History & Debugging
git log --oneline --graph --all
git log --since="2 weeks ago" --author="john"
git blame -L 10,20 file.py
git diff HEAD~3..HEAD
git reflog                          # recovery safety net

# Cleanup
git clean -fd                       # remove untracked files
git gc --prune=now                  # garbage collect</code></pre>
</div>

<h3>Conventional Commits</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>feat: add user authentication
fix: resolve null pointer in login
docs: update API documentation
refactor: extract payment service
test: add unit tests for auth
ci: configure GitHub Actions pipeline
chore: update dependencies

# With scope
feat(auth): add OAuth2 support
fix(api): handle timeout errors

# Breaking change
feat!: redesign database schema
feat(auth)!: remove deprecated endpoints</code></pre>
</div>

<h3>Git Hooks</h3>
<table>
<tr><th>Hook</th><th>Trigger</th><th>Use Case</th></tr>
<tr><td>pre-commit</td><td>Before commit</td><td>Linting, formatting</td></tr>
<tr><td>prepare-commit-msg</td><td>Before editor</td><td>Auto-generate message</td></tr>
<tr><td>commit-msg</td><td>After message</td><td>Validate commit format</td></tr>
<tr><td>post-commit</td><td>After commit</td><td>Notifications</td></tr>
<tr><td>pre-push</td><td>Before push</td><td>Run tests</td></tr>
<tr><td>pre-receive</td><td>Server-side</td><td>Enforce policies</td></tr>
</table>

<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>#!/bin/sh
# .git/hooks/pre-commit - Run linting

# Check for trailing whitespace
if git diff --cached --check; then
    echo "Trailing whitespace found!"
    exit 1
fi

# Run tests
npm test
if [ $? -ne 0 ]; then
    echo "Tests failed!"
    exit 1
fi</code></pre>
</div>`
        },
        {
          id: "github-actions-complete",
          title: "GitHub Actions - Complete CI/CD Guide",
          tags: ["intermediate", "github"],
          summary: "GitHub Actions workflows, reusable workflows, matrix builds, secrets, and best practices.",
          content: `<h3>GitHub Actions Workflow Example</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">yaml</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - run: npm ci
    - run: npm run lint
    - run: npm test -- --coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./coverage/lcov.info

  security-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        scan-type: 'fs'
        format: 'sarif'
        output: 'trivy-results.sarif'

  build-and-push:
    needs: [test, security-scan]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Login to Container Registry
      uses: docker/login-action@v3
      with:
        registry: \${{ env.REGISTRY }}
        username: \${{ github.actor }}
        password: \${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
        tags: |
          type=sha
          type=raw,value=latest
    
    - name: Build and push
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: \${{ steps.meta.outputs.tags }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    environment: production
    steps:
    - uses: actions/checkout@v4
    
    - name: Configure kubectl
      uses: azure/setup-kubectl@v3
    
    - name: Deploy to K8s
      run: |
        kubectl set image deployment/my-app \\
          app=\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:sha-\${{ github.sha }}</code></pre>
</div>

<h3>GitHub Actions Best Practices</h3>
<ul>
<li><strong>Use specific versions:</strong> Pin actions to SHA, not just version tag</li>
<li><strong>Leverage caching:</strong> Use actions/cache for dependencies</li>
<li><strong>Matrix builds:</strong> Test multiple versions/platforms</li>
<li><strong>Environment protection:</strong> Require approvals for production</li>
<li><strong>Secrets management:</strong> Use GitHub Secrets, never hardcode</li>
<li><strong>Artifact handling:</strong> Use actions/upload-artifact for build outputs</li>
</ul>

<h3>Reusable Workflows</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">yaml</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># .github/workflows/reusable-test.yml
name: Reusable Test Workflow

on:
  workflow_call:
    inputs:
      node-version:
        required: true
        type: string
    secrets:
      api-key:
        required: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: \${{ inputs.node-version }}
    - run: npm ci
    - run: npm test
      env:
        API_KEY: \${{ secrets.api-key }}

# Usage in another workflow:
jobs:
  call-test:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: '20'
    secrets:
      api-key: \${{ secrets.API_KEY }}</code></pre>
</div>`
        }
      ],
      "GitOps": [
        {
          id: "argocd-gitops-complete",
          title: "ArgoCD & GitOps Practices",
          tags: ["advanced", "gitops"],
          summary: "ArgoCD setup, application management, sync strategies, and GitOps principles.",
          content: `<h3>GitOps Principles</h3>
<ul>
<li><strong>Declarative:</strong> Entire system described declaratively (YAML)</li>
<li><strong>Versioned:</strong> Desired state stored in Git (single source of truth)</li>
<li><strong>Automated:</strong> Approved changes auto-applied to system</li>
<li><strong>Self-healing:</strong> Agents ensure actual state matches desired state</li>
</ul>

<h3>ArgoCD Architecture</h3>
<div class="diagram">
Git Repository (Desired State)
       ↓
ArgoCD (Detects drift)
       ↓
Kubernetes Cluster (Actual State)
       ↑
Continuous Reconciliation
</div>

<h3>ArgoCD Application Example</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">yaml</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/org/k8s-manifests.git
    targetRevision: main
    path: apps/my-app/production
    helm:
      valueFiles:
        - values-production.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jsonPointers:
        - /spec/replicas</code></pre>
</div>

<h3>ArgoCD ApplicationSet (Multi-Environment)</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">yaml</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: my-app
  namespace: argocd
spec:
  generators:
  - list:
      elements:
      - cluster: dev
        url: https://dev.cluster
      - cluster: staging
        url: https://staging.cluster
      - cluster: prod
        url: https://prod.cluster
  template:
    metadata:
      name: 'my-app-{{cluster}}'
    spec:
      project: default
      source:
        repoURL: https://github.com/org/k8s-manifests.git
        targetRevision: main
        path: 'apps/my-app/{{cluster}}'
      destination:
        server: '{{url}}'
        namespace: my-app</code></pre>
</div>

<h3>ArgoCD CLI Commands</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Login
argocd login argocd.example.com --username admin

# List applications
argocd app list

# Get application details
argocd app get my-app

# Sync application
argocd app sync my-app
argocd app sync my-app --resource apps:Deployment:my-app

# View diff
argocd app diff my-app

# View history
argocd app history my-app

# Rollback
argocd app rollback my-app 2

# Add repository
argocd repo add https://github.com/org/repo.git --username git --password secret</code></pre>
</div>

<div class="info-box">
<strong>GitOps Best Practice:</strong> Separate application source code repos from deployment manifest repos. Changes to manifests trigger deployments via ArgoCD. Use ApplicationSets for managing multiple environments.
</div>`
        }
      ],
      "CI/CD Tools": [
        {
          id: "jenkins-pipelines",
          title: "Jenkins Pipeline as Code",
          tags: ["intermediate", "jenkins"],
          summary: "Jenkinsfile syntax, pipelines, shared libraries, and best practices.",
          content: `<h3>Jenkins Pipeline (Declarative)</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">groovy</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: node
                    image: node:20-alpine
                    command: ['sleep', 'infinity']
                  - name: docker
                    image: docker:24
                    volumeMounts:
                    - name: docker-sock
                      mountPath: /var/run/docker.sock
                  volumes:
                  - name: docker-sock
                    hostPath:
                      path: /var/run/docker.sock
            '''
        }
    }
    
    environment {
        REGISTRY = 'registry.example.com'
        IMAGE = 'myapp'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        container('node') {
                            sh 'npm ci'
                            sh 'npm test'
                        }
                    }
                }
                stage('Lint') {
                    steps {
                        container('node') {
                            sh 'npm run lint'
                        }
                    }
                }
            }
        }
        
        stage('Build') {
            when {
                branch 'main'
            }
            steps {
                container('docker') {
                    script {
                        def image = docker.build("\${env.REGISTRY}/\${env.IMAGE}:\${env.BUILD_NUMBER}")
                        docker.withRegistry("https://\${env.REGISTRY}", 'registry-credentials') {
                            image.push()
                            image.push('latest')
                        }
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                container('kubectl') {
                    sh """
                        kubectl set image deployment/my-app \\
                            app=\${env.REGISTRY}/\${env.IMAGE}:\${env.BUILD_NUMBER}
                    """
                }
            }
        }
    }
    
    post {
        always {
            junit 'test-results.xml'
            cleanWs()
        }
        failure {
            slackSend(color: 'danger', message: "Build failed: \${env.JOB_NAME} #\${env.BUILD_NUMBER}")
        }
        success {
            slackSend(color: 'good', message: "Build succeeded: \${env.JOB_NAME} #\${env.BUILD_NUMBER}")
        }
    }
}</code></pre>
</div>

<h3>Jenkins Shared Library</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">groovy</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># vars/buildDocker.groovy
def call(Map config) {
    pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                    script {
                        docker.build("\${config.registry}/\${config.image}:\${config.tag}")
                    }
                }
            }
        }
    }
}

# Usage in Jenkinsfile
@Library('my-shared-library') _

buildDocker(
    registry: 'registry.example.com',
    image: 'myapp',
    tag: 'v1.0.0'
)</code></pre>
</div>`
        }
      ]
    }
  }
};

// Merge with main KNOWLEDGE_BASE
Object.assign(KNOWLEDGE_BASE, DEVOPS_DATA);
