// Interview Preparation Data Module
const INTERVIEW_QUESTIONS = {
  interview: {
    title: "Interview Prep",
    description: "Common interview questions and answers for DevOps, SRE, and Cloud roles",
    color: "var(--warning)",
    subtopics: {
      "DevOps Interview": [
        {
          id: "devops-interview-1",
          title: "What is DevOps and why is it important?",
          tags: ["interview", "devops"],
          summary: "Understanding DevOps culture, practices, and business value.",
          content: `<h3>Sample Answer</h3>
<p>DevOps is a cultural and professional movement that emphasizes collaboration between development and operations teams to automate and streamline software delivery and infrastructure changes.</p>

<h3>Key Points to Cover</h3>
<ul>
<li><strong>Collaboration:</strong> Breaking down silos between Dev and Ops</li>
<li><strong>Automation:</strong> CI/CD pipelines, infrastructure as code</li>
<li><strong>Continuous Improvement:</strong> Feedback loops and monitoring</li>
<li><strong>Business Value:</strong> Faster time-to-market, improved reliability</li>
</ul>

<div class="info-box">
<strong>Example:</strong> "In my previous role, implementing DevOps practices reduced our deployment time from 2 weeks to 2 hours, and decreased production incidents by 60%."
</div>`
        },
        {
          id: "devops-interview-2",
          title: "Explain CI/CD Pipeline",
          tags: ["interview", "cicd"],
          summary: "Continuous Integration, Delivery, and Deployment concepts and implementation.",
          content: `<h3>CI/CD Pipeline Explanation</h3>

<h4>Continuous Integration (CI)</h4>
<ul>
<li>Developers merge code changes frequently to main branch</li>
<li>Automated builds and tests run on each commit</li>
<li>Catch integration issues early</li>
<li>Tools: Jenkins, GitHub Actions, GitLab CI, CircleCI</li>
</ul>

<h4>Continuous Delivery (CD)</h4>
<ul>
<li>Code is automatically built, tested, and prepared for release</li>
<li>Deployment to production is manual but one-click</li>
<li>Always in a deployable state</li>
</ul>

<h4>Continuous Deployment</h4>
<ul>
<li>Automatically deploy passed changes to production</li>
<li>Requires comprehensive testing and monitoring</li>
<li>True automation end-to-end</li>
</ul>

<div class="diagram">
Developer Push → Build → Unit Tests → Integration Tests → Security Scan → Deploy to Staging → Integration Tests → Deploy to Production
</div>`
        },
        {
          id: "devops-interview-3",
          title: "Infrastructure as Code (IaC)",
          tags: ["interview", "iac"],
          summary: "IaC principles, benefits, and tools comparison.",
          content: `<h3>What is IaC?</h3>
<p>Infrastructure as Code is the practice of managing and provisioning infrastructure through machine-readable definition files, rather than manual configuration.</p>

<h3>Benefits</h3>
<ul>
<li><strong>Version Control:</strong> Track infrastructure changes in Git</li>
<li><strong>Consistency:</strong> Eliminates configuration drift</li>
<li><strong>Reusability:</strong> Modules and templates</li>
<li><strong>Documentation:</strong> Code is living documentation</li>
<li><strong>Speed:</strong> Rapid provisioning and scaling</li>
</ul>

<h3>Tools Comparison</h3>
<table>
<tr><th>Tool</th><th>Type</th><th>Best For</th></tr>
<tr><td>Terraform</td><td>Declarative</td><td>Multi-cloud, state management</td></tr>
<tr><td>Ansible</td><td>Procedural</td><td>Configuration management</td></tr>
<tr><td>CloudFormation</td><td>Declarative</td><td>AWS-only environments</td></tr>
<tr><td>Pulumi</td><td>Programming</td><td>Developers preferring code</td></tr>
</table>

<h3>Declarative vs Imperative</h3>
<ul>
<li><strong>Declarative:</strong> Define desired state (what), tool figures out how</li>
<li><strong>Imperative:</strong> Define exact steps (how) to reach desired state</li>
</ul>`
        }
      ],
      "Linux Interview": [
        {
          id: "linux-interview-1",
          title: "Linux Boot Process",
          tags: ["interview", "linux"],
          summary: "Explain the Linux boot sequence from power-on to login.",
          content: `<h3>Linux Boot Process</h3>

<ol>
<li><strong>BIOS/UEFI</strong> - Hardware initialization, POST, finds boot device</li>
<li><strong>MBR/GPT</strong> - Boot loader location (GRUB stage 1)</li>
<li><strong>GRUB</strong> - Boot menu, loads kernel (vmlinuz) and initramfs</li>
<li><strong>Kernel</strong> - Initializes hardware, mounts root filesystem</li>
<li><strong>systemd/init</strong> - First process (PID 1), starts services</li>
<li><strong>Runlevels/Targets</strong> - Multi-user, graphical target</li>
<li><strong>Login</strong> - getty processes, user authentication</li>
</ol>

<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># View boot messages
dmesg | less

# Check systemd boot time
systemd-analyze
systemd-analyze blame

# View runlevel/target
systemctl get-default</code></pre>
</div>`
        },
        {
          id: "linux-interview-2",
          title: "Linux File Permissions",
          tags: ["interview", "linux"],
          summary: "Understanding Linux permission model, special permissions, and ACLs.",
          content: `<h3>Linux Permission Model</h3>

<p>Every file has 3 permission sets: Owner, Group, Others</p>

<table>
<tr><th>Permission</th><th>File</th><th>Directory</th><th>Numeric</th></tr>
<tr><td>Read (r)</td><td>View content</td><td>List files</td><td>4</td></tr>
<tr><td>Write (w)</td><td>Modify content</td><td>Create/delete files</td><td>2</td></tr>
<tr><td>Execute (x)</td><td>Run as program</td><td>Enter directory</td><td>1</td></tr>
</table>

<h3>Special Permissions</h3>
<ul>
<li><strong>SUID (4):</strong> Run as file owner (e.g., /usr/bin/passwd)</li>
<li><strong>SGID (2):</strong> Run as file group; new files inherit group</li>
<li><strong>Sticky Bit (1):</strong> Only owner can delete files (e.g., /tmp)</li>
</ul>

<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Set SUID
chmod 4755 file      # rwsr-xr-x
chmod u+s file

# Set SGID
chmod 2755 dir       # rwxr-sr-x
chmod g+s dir

# Set Sticky Bit
chmod 1777 /tmp      # rwxrwxrwt
chmod +t /tmp

# ACLs
setfacl -m u:user:rwx file
getfacl file</code></pre>
</div>`
        }
      ],
      "Kubernetes Interview": [
        {
          id: "k8s-interview-1",
          title: "How do you troubleshoot a pod stuck in Pending?",
          tags: ["interview", "kubernetes"],
          summary: "Systematic approach to debugging Kubernetes pod scheduling issues.",
          content: `<h3>Troubleshooting Pending Pods</h3>

<h4>Step-by-Step Process</h4>

<ol>
<li><strong>Check Events</strong>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>kubectl describe pod &lt;pod-name&gt;
kubectl get events --sort-by=.metadata.creationTimestamp</code></pre>
</div>
</li>

<li><strong>Check Resource Requests</strong>
<ul>
<li>Insufficient CPU/Memory on nodes?</li>
<li>Check: <code>kubectl describe nodes</code></li>
<li>Look for "Insufficient" in events</li>
</ul>
</li>

<li><strong>Check Node Selector/Affinity</strong>
<ul>
<li>Are labels matching?</li>
<li>Taints on nodes preventing scheduling?</li>
</ul>
</li>

<li><strong>Check PVC Binding</strong>
<ul>
<li>Pending PVCs block pod scheduling</li>
<li><code>kubectl get pvc</code></li>
</ul>
</li>

<li><strong>Check Network Policies</strong>
<ul>
<li>Can pod be scheduled with network requirements?</li>
</ul>
</li>
</ol>

<h3>Common Causes</h3>
<table>
<tr><th>Cause</th><th>Solution</th></tr>
<tr><td>Insufficient resources</td><td>Scale nodes, reduce requests, or add node pool</td></tr>
<tr><td>Volume not bound</td><td>Check storage class, provisioner</td></tr>
<tr><td>Node selector mismatch</td><td>Update labels or nodeSelector</td></tr>
<tr><td>Tolerations missing</td><td>Add tolerations to pod spec</td></tr>
</table>`
        },
        {
          id: "k8s-interview-2",
          title: "Explain Kubernetes Networking (CNI)",
          tags: ["interview", "kubernetes"],
          summary: "How pod networking works, CNI plugins, and service networking.",
          content: `<h3>Kubernetes Networking Model</h3>

<h4>Key Requirements</h4>
<ul>
<li>All pods can communicate without NAT</li>
<li>Nodes can communicate with all pods</li>
<li>Each pod gets its own IP</li>
</ul>

<h3>CNI (Container Network Interface)</h3>
<p>CNI plugins implement the networking model:</p>

<table>
<tr><th>Plugin</th><th>Features</th><th>Best For</th></tr>
<tr><td>Calico</td><td>BGP, Network Policy, eBPF</td><td>Enterprise, security</td></tr>
<tr><td>Flannel</td><td>Simple overlay (VXLAN)</td><td>Simple setups, small clusters</td></tr>
<tr><td>Cilium</td><td>eBPF-based, observability</td><td>Service mesh, security</td></tr>
<tr><td>Weave</td><td>Encrypted overlay</td><td>Multi-cloud</td></tr>
</table>

<h3>Service Networking</h3>
<ul>
<li><strong>ClusterIP:</strong> Virtual IP allocated from service CIDR</li>
<li><strong>kube-proxy:</strong> Maintains iptables/IPVS rules for services</li>
<li><strong>DNS:</strong> CoreDNS resolves service names to ClusterIPs</li>
</ul>

<h3>Network Policies</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">yaml</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend
spec:
  podSelector:
    matchLabels:
      app: backend
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080</code></pre>
</div>`
        }
      ],
      "Cloud Interview": [
        {
          id: "cloud-interview-1",
          title: "AWS VPC Design Best Practices",
          tags: ["interview", "aws"],
          summary: "Enterprise VPC architecture, multi-AZ design, and security.",
          content: `<h3>VPC Design Best Practices</h3>

<h4>Network Architecture</h4>
<ul>
<li><strong>Multi-AZ:</strong> Spread across at least 2 Availability Zones</li>
<li><strong>Public/Private Subnets:</strong> Separate tiers for security</li>
<li><strong>VPC Peering/Transit Gateway:</strong> Connect multiple VPCs</li>
<li><strong>Flow Logs:</strong> Enable for security auditing</li>
</ul>

<h4>CIDR Planning</h4>
<ul>
<li>Use /16 for VPC (65,536 IPs)</li>
<li>Use /24 for subnets (251 usable IPs)</li>
<li>Reserve IP ranges for future regions</li>
<li>Avoid overlapping with on-premise ranges</li>
</ul>

<h4>Security Layers</h4>
<ol>
<li><strong>NACLs:</strong> Subnet-level firewall (stateless)</li>
<li><strong>Security Groups:</strong> Instance-level firewall (stateful)</li>
<li><strong>WAF:</strong> Application-layer protection</li>
<li><strong>Shield:</strong> DDoS protection</li>
</ol>

<h3>Common Architecture Pattern</h3>
<div class="diagram">
Internet → IGW → ALB (Public Subnet) → App (Private Subnet) → RDS (DB Subnet)
                     ↓
                  NAT GW (for outbound)
</div>`
        },
        {
          id: "cloud-interview-2",
          title: "Design a Highly Available System",
          tags: ["interview", "architecture"],
          summary: "Architectural patterns for high availability across multiple layers.",
          content: `<h3>High Availability Design</h3>

<h4>Key Principles</h4>
<ul>
<li><strong>Eliminate Single Points of Failure:</strong> Redundancy at every layer</li>
<li><strong>Multi-AZ/Region:</strong> Geographic distribution</li>
<li><strong>Auto-scaling:</strong> Handle varying loads</li>
<li><strong>Health Checks:</strong> Automatic failure detection</li>
</ul>

<h3>Layer-by-Layer Design</h3>

<table>
<tr><th>Layer</th><th>HA Strategy</th><th>AWS Example</th></tr>
<tr><td>DNS</td><td>Multiple NS, health checks</td><td>Route53</td></tr>
<tr><td>CDN</td><td>Edge locations</td><td>CloudFront</td></tr>
<tr><td>Load Balancer</td><td>Multi-AZ, cross-zone</td><td>ALB/NLB</td></tr>
<tr><td>App Tier</td><td>Auto-scaling groups</td><td>ASG across 3 AZs</td></tr>
<tr><td>Database</td><td>Multi-AZ replica</td><td>RDS Multi-AZ</td></tr>
<tr><td>Cache</td><td>Cluster mode</td><td>ElastiCache Redis</td></tr>
</table>

<h3>SLO Calculation</h3>
<p>If each component has 99.9% availability:</p>
<ul>
<li>Single component: 99.9% (8.76 hours downtime/year)</li>
<li>3 components in series: 99.7% (26.3 hours downtime/year)</li>
<li>With redundancy: 99.999% (5.26 minutes downtime/year)</li>
</ul>

<div class="info-box">
<strong>Key Metrics:</strong>
<ul>
<li>RTO (Recovery Time Objective): How fast to recover</li>
<li>RPO (Recovery Point Objective): How much data loss acceptable</li>
</ul>
</div>`
        }
      ]
    }
  }
};

// Merge with main KNOWLEDGE_BASE
Object.assign(KNOWLEDGE_BASE, INTERVIEW_QUESTIONS);

// Interview Questions Database for Quiz
const TECHNICAL_INTERVIEW_DB = [
  {
    category: "Linux",
    question: "What happens when you type 'ls' in Linux?",
    answer: "The shell parses the command, searches PATH for the executable, forks a new process, execs /bin/ls, which reads directory entries and prints them."
  },
  {
    category: "Linux",
    question: "Difference between hard link and symbolic link?",
    answer: "Hard link: same inode, can't cross filesystems. Symbolic link: separate inode, contains path to target, can cross filesystems."
  },
  {
    category: "Networking",
    question: "How does TCP ensure reliable delivery?",
    answer: "Sequence numbers, acknowledgments, retransmission, flow control (windowing), congestion control, error checking (checksum)."
  },
  {
    category: "Kubernetes",
    question: "What happens when a pod is created?",
    answer: "API server validates, writes to etcd, scheduler assigns node, kubelet creates containers via CRI, CNI assigns IP, kube-proxy configures service rules."
  },
  {
    category: "Docker",
    question: "What is the difference between COPY and ADD in Dockerfile?",
    answer: "COPY: simple file copy. ADD: can extract archives and download from URLs (discouraged for transparency)."
  },
  {
    category: "AWS",
    question: "Difference between Security Group and NACL?",
    answer: "Security Group: instance-level, stateful, allow only. NACL: subnet-level, stateless, allow and deny rules."
  },
  {
    category: "Terraform",
    question: "What is Terraform state and why is it important?",
    answer: "State maps real-world resources to configuration, tracks metadata, improves performance, enables resource dependencies. Never modify manually!"
  },
  {
    category: "Monitoring",
    question: "What are the Four Golden Signals of Monitoring?",
    answer: "Latency (time to serve), Traffic (demand), Errors (rate of failures), Saturation (how full the service is)."
  }
];
