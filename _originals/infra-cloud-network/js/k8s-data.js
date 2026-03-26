// Kubernetes & Containers Data Module
const K8S_DATA = {
  containers: {
    title: "Containers & Kubernetes",
    description: "Docker, Kubernetes, Helm, Service Mesh & Container Security",
    color: "var(--containers-color)",
    subtopics: {
      "Docker": [
        {
          id: "docker-essentials",
          title: "Docker Essential Commands & Best Practices",
          tags: ["beginner", "docker"],
          summary: "Docker CLI, Dockerfile best practices, networking, volumes, compose.",
          content: `<h3>Docker CLI Quick Reference</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Container Lifecycle
docker run -d --name web -p 8080:80 nginx
docker run -it --rm ubuntu bash
docker exec -it web /bin/sh
docker stop/start/restart web
docker rm -f web
docker logs -f --tail 100 web

# Images
docker build -t myapp:v1 .
docker images
docker pull nginx:alpine
docker tag myapp:v1 registry/myapp:v1
docker push registry/myapp:v1
docker image prune -a         # remove unused images

# System
docker system df              # disk usage
docker system prune -a        # cleanup everything
docker stats                  # resource usage</code></pre>
</div>

<h3>Dockerfile Best Practices</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">dockerfile</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Multi-stage build example
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN addgroup -g 1001 appgroup && adduser -u 1001 -G appgroup -s /bin/sh -D appuser
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget -q --spider http://localhost:3000/health
CMD ["node", "dist/server.js"]</code></pre>
</div>

<h3>Docker Networking</h3>
<table>
<tr><th>Driver</th><th>Description</th><th>Use Case</th></tr>
<tr><td>bridge</td><td>Default, isolated network</td><td>Single host containers</td></tr>
<tr><td>host</td><td>Share host network</td><td>Performance-sensitive</td></tr>
<tr><td>none</td><td>No networking</td><td>Isolated workloads</td></tr>
<tr><td>overlay</td><td>Multi-host networking</td><td>Swarm/cluster</td></tr>
<tr><td>macvlan</td><td>Assign MAC address</td><td>Legacy app integration</td></tr>
</table>

<h3>Docker Compose Example</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">yaml</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>services:
  app:
    build: .
    ports:
      - "8080:3000"
    environment:
      - DB_HOST=postgres
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - backend

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD_FILE: /run/secrets/db_pass
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
    networks:
      - backend
    secrets:
      - db_pass

volumes:
  pgdata:

networks:
  backend:

secrets:
  db_pass:
    file: ./secrets/db_password.txt</code></pre>
</div>`
        }
      ],
      "Kubernetes Core": [
        {
          id: "k8s-architecture",
          title: "Kubernetes Architecture & Core Concepts",
          tags: ["intermediate", "kubernetes"],
          summary: "K8s components, pods, deployments, services, namespaces, RBAC.",
          content: `<h3>Kubernetes Architecture</h3>
<div class="diagram">
+--- Control Plane ---------+    +--- Worker Node ----------+
| API Server                |    | kubelet                  |
| etcd (state store)        |    | kube-proxy               |
| Scheduler                 |    | Container Runtime        |
| Controller Manager        |    |  +-----+ +-----+        |
| Cloud Controller Manager  |    |  | Pod | | Pod |         |
+---------------------------+    |  +-----+ +-----+        |
                                 +--------------------------+
</div>

<h3>Core Resources</h3>
<table>
<tr><th>Resource</th><th>Purpose</th><th>Key Features</th></tr>
<tr><td>Pod</td><td>Smallest deployable unit</td><td>1+ containers, shared network</td></tr>
<tr><td>Deployment</td><td>Declarative pod management</td><td>Rolling updates, rollback</td></tr>
<tr><td>Service</td><td>Stable network endpoint</td><td>ClusterIP, NodePort, LoadBalancer</td></tr>
<tr><td>ConfigMap</td><td>Configuration data</td><td>Key-value, mounted as vol/env</td></tr>
<tr><td>Secret</td><td>Sensitive data</td><td>Base64 encoded, mounted</td></tr>
<tr><td>Ingress</td><td>HTTP routing</td><td>Host/path routing, TLS</td></tr>
<tr><td>PV/PVC</td><td>Persistent storage</td><td>Storage abstraction</td></tr>
<tr><td>StatefulSet</td><td>Stateful workloads</td><td>Stable identity, ordered</td></tr>
<tr><td>DaemonSet</td><td>Per-node pods</td><td>Monitoring, logging agents</td></tr>
<tr><td>Job/CronJob</td><td>Batch workloads</td><td>Run to completion, scheduled</td></tr>
</table>

<h3>kubectl Essential Commands</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Cluster info
kubectl cluster-info
kubectl get nodes -o wide
kubectl top nodes

# Workloads
kubectl get pods -A                      # all namespaces
kubectl get pods -o wide                 # show node & IP
kubectl describe pod my-pod
kubectl logs -f my-pod -c container-name
kubectl exec -it my-pod -- /bin/sh
kubectl port-forward svc/my-svc 8080:80

# Deployment management
kubectl apply -f deployment.yaml
kubectl rollout status deployment/my-app
kubectl rollout undo deployment/my-app
kubectl scale deployment/my-app --replicas=5
kubectl set image deployment/my-app app=myapp:v2

# Debug
kubectl get events --sort-by=.metadata.creationTimestamp
kubectl debug pod/my-pod -it --image=busybox
kubectl run test --rm -it --image=busybox -- /bin/sh</code></pre>
</div>

<h3>Service Types</h3>
<table>
<tr><th>Type</th><th>Access</th><th>Use Case</th></tr>
<tr><td>ClusterIP</td><td>Internal only</td><td>Inter-service communication</td></tr>
<tr><td>NodePort</td><td>Node IP:Port (30000-32767)</td><td>Development, testing</td></tr>
<tr><td>LoadBalancer</td><td>External LB (cloud)</td><td>Production external access</td></tr>
<tr><td>ExternalName</td><td>DNS CNAME</td><td>External service reference</td></tr>
</table>`
        },
        {
          id: "k8s-yaml-templates",
          title: "Kubernetes YAML Templates & Examples",
          tags: ["intermediate", "kubernetes"],
          summary: "Ready-to-use YAML templates for common Kubernetes resources.",
          content: `<h3>Deployment + Service + Ingress</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">yaml</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: myapp:v1.2.0
        ports:
        - containerPort: 8080
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 20
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: db-host
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: db-password
---
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - app.example.com
    secretName: app-tls
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-app
            port:
              number: 80</code></pre>
</div>`
        }
      ],
      "Helm & Tools": [
        {
          id: "helm-basics",
          title: "Helm Package Manager",
          tags: ["intermediate", "helm"],
          summary: "Helm charts, values, templates, repositories, and chart development.",
          content: `<h3>Helm Essential Commands</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Repository management
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm search repo nginx

# Install & manage releases
helm install my-release bitnami/nginx -n production
helm install my-release bitnami/nginx -f values.yaml
helm upgrade my-release bitnami/nginx --set replicaCount=3
helm rollback my-release 1
helm uninstall my-release

# Inspect
helm list -A                  # all releases
helm status my-release
helm get values my-release    # current values
helm history my-release

# Chart development
helm create my-chart
helm template my-chart        # render locally
helm lint my-chart
helm package my-chart</code></pre>
</div>

<h3>Helm Chart Structure</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">tree</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>my-chart/
  Chart.yaml          # Chart metadata
  values.yaml         # Default values
  templates/
    deployment.yaml   # Deployment template
    service.yaml      # Service template
    ingress.yaml      # Ingress template
    _helpers.tpl      # Template helpers
    NOTES.txt         # Post-install notes
  charts/             # Dependencies</code></pre>
</div>`
        }
      ]
    }
  }
};

// Merge with main KNOWLEDGE_BASE
Object.assign(KNOWLEDGE_BASE, K8S_DATA);
