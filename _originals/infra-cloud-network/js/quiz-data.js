// Extended Quiz Questions Database
const EXTENDED_QUIZ_QUESTIONS = {
  networking: [
    {
      id: "net-q1",
      question: "Which OSI layer is responsible for logical addressing and routing?",
      options: ["Layer 2 - Data Link", "Layer 3 - Network", "Layer 4 - Transport", "Layer 7 - Application"],
      correct: 1,
      explanation: "Layer 3 (Network Layer) handles logical addressing (IP addresses) and routing between networks."
    },
    {
      id: "net-q2",
      question: "What is the purpose of the TCP three-way handshake?",
      options: ["To encrypt data", "To establish a reliable connection", "To compress data", "To authenticate users"],
      correct: 1,
      explanation: "The TCP three-way handshake (SYN, SYN-ACK, ACK) establishes a reliable connection before data transmission."
    },
    {
      id: "net-q3",
      question: "How many usable host addresses are in a /29 subnet?",
      options: ["4", "6", "8", "14"],
      correct: 1,
      explanation: "A /29 has 3 host bits: 2^3 - 2 = 6 usable addresses (subtract 2 for network and broadcast)."
    },
    {
      id: "net-q4",
      question: "Which DNS record type maps a domain name to an IPv6 address?",
      options: ["A record", "AAAA record", "CNAME record", "MX record"],
      correct: 1,
      explanation: "AAAA (quad-A) records map domain names to IPv6 addresses. A records are for IPv4."
    },
    {
      id: "net-q5",
      question: "In BGP path selection, which attribute is considered first?",
      options: ["AS Path length", "Local Preference", "Weight", "MED"],
      correct: 2,
      explanation: "Weight (Cisco-specific) is the first attribute checked in BGP path selection."
    },
    {
      id: "net-q6",
      question: "What is the default administrative distance of OSPF?",
      options: ["90", "100", "110", "120"],
      correct: 2,
      explanation: "OSPF has an administrative distance of 110. Lower is preferred."
    },
    {
      id: "net-q7",
      question: "Which load balancing algorithm distributes requests sequentially?",
      options: ["Least Connections", "Round Robin", "IP Hash", "Random"],
      correct: 1,
      explanation: "Round Robin distributes requests sequentially to each server in the pool."
    },
    {
      id: "net-q8",
      question: "What does VLAN stand for?",
      options: ["Virtual Local Area Network", "Virtual Large Area Network", "Virtual LAN Access Node", "Virtual Link Access Network"],
      correct: 0,
      explanation: "VLAN = Virtual Local Area Network. It segments a physical network into logical broadcast domains."
    },
    {
      id: "net-q9",
      question: "What is the purpose of NAT?",
      options: ["Encrypt network traffic", "Translate private IPs to public IPs", "Route between networks", "Filter packets"],
      correct: 1,
      explanation: "NAT (Network Address Translation) translates private IP addresses to public IP addresses for internet access."
    },
    {
      id: "net-q10",
      question: "Which protocol uses port 443 by default?",
      options: ["HTTP", "HTTPS", "FTP", "SSH"],
      correct: 1,
      explanation: "HTTPS (HTTP Secure) uses port 443 by default for encrypted web traffic."
    },
    {
      id: "net-q11",
      question: "What is the broadcast address for 192.168.1.0/24?",
      options: ["192.168.1.0", "192.168.1.1", "192.168.1.254", "192.168.1.255"],
      correct: 3,
      explanation: "In a /24 network, the broadcast address is the last address: 192.168.1.255"
    },
    {
      id: "net-q12",
      question: "Which device operates at Layer 2 of the OSI model?",
      options: ["Router", "Switch", "Firewall", "Load Balancer"],
      correct: 1,
      explanation: "Switches operate at Layer 2 (Data Link layer), using MAC addresses for forwarding decisions."
    }
  ],
  cloud: [
    {
      id: "cloud-q1",
      question: "Which AWS service provides serverless compute?",
      options: ["EC2", "Lambda", "ECS", "EBS"],
      correct: 1,
      explanation: "AWS Lambda provides serverless compute - run code without provisioning servers."
    },
    {
      id: "cloud-q2",
      question: "What is the maximum size of an S3 object?",
      options: ["5 GB", "5 TB", "10 TB", "Unlimited"],
      correct: 1,
      explanation: "The maximum size of a single S3 object is 5 TB."
    },
    {
      id: "cloud-q3",
      question: "Which GCP service is equivalent to AWS EC2?",
      options: ["Cloud Functions", "Compute Engine", "App Engine", "Cloud Run"],
      correct: 1,
      explanation: "Compute Engine is GCP's IaaS offering, equivalent to AWS EC2."
    },
    {
      id: "cloud-q4",
      question: "What is the scope of an AWS VPC?",
      options: ["Global", "Regional", "Availability Zone", "Edge Location"],
      correct: 1,
      explanation: "AWS VPCs are regional resources that span all AZs in a region."
    },
    {
      id: "cloud-q5",
      question: "Which Azure service is used for container orchestration?",
      options: ["AKS", "ACI", "Azure Functions", "App Service"],
      correct: 0,
      explanation: "AKS (Azure Kubernetes Service) is Azure's managed Kubernetes offering."
    },
    {
      id: "cloud-q6",
      question: "What is the AWS Shared Responsibility Model?",
      options: ["AWS manages everything", "Customer manages everything", "AWS secures cloud, customer secures data/apps", "Shared equally"],
      correct: 2,
      explanation: "AWS secures the cloud infrastructure; customer secures their data, applications, and configurations."
    },
    {
      id: "cloud-q7",
      question: "Which storage class is best for infrequently accessed data in AWS S3?",
      options: ["S3 Standard", "S3 IA", "S3 Glacier", "S3 One Zone-IA"],
      correct: 1,
      explanation: "S3 IA (Infrequent Access) is designed for data that is accessed less frequently but requires rapid access when needed."
    },
    {
      id: "cloud-q8",
      question: "What is the purpose of AWS IAM Roles?",
      options: ["Store passwords", "Provide temporary credentials", "Encrypt data", "Monitor resources"],
      correct: 1,
      explanation: "IAM Roles provide temporary credentials that can be assumed by users, applications, or services."
    }
  ],
  linux: [
    {
      id: "linux-q1",
      question: "Which command displays disk usage?",
      options: ["du", "df", "dd", "dm"],
      correct: 1,
      explanation: "df (disk free) displays disk space usage. du (disk usage) shows directory sizes."
    },
    {
      id: "linux-q2",
      question: "What does 'chmod 755' mean?",
      options: ["Changes owner", "Sets permissions to rwxr-xr-x", "Changes group", "Sets sticky bit"],
      correct: 1,
      explanation: "chmod 755 sets permissions to rwxr-xr-x (owner: read/write/execute, group: read/execute, others: read/execute)."
    },
    {
      id: "linux-q3",
      question: "Which file contains user password information?",
      options: ["/etc/passwd", "/etc/shadow", "/etc/group", "/etc/users"],
      correct: 1,
      explanation: "/etc/shadow contains encrypted user passwords. /etc/passwd contains user account info but not passwords."
    },
    {
      id: "linux-q4",
      question: "What is the purpose of the 'grep' command?",
      options: ["Search text using patterns", "Copy files", "List processes", "Mount filesystems"],
      correct: 0,
      explanation: "grep searches for patterns in text using regular expressions."
    },
    {
      id: "linux-q5",
      question: "Which command shows running processes?",
      options: ["ls", "ps", "cd", "mv"],
      correct: 1,
      explanation: "ps command shows running processes. Common usage: ps aux or ps -ef"
    },
    {
      id: "linux-q6",
      question: "What is the default port for SSH?",
      options: ["21", "22", "23", "25"],
      correct: 1,
      explanation: "SSH (Secure Shell) uses port 22 by default."
    },
    {
      id: "linux-q7",
      question: "Which command is used to change file ownership?",
      options: ["chmod", "chown", "chgrp", "chattr"],
      correct: 1,
      explanation: "chown changes file owner and group. Syntax: chown user:group file"
    },
    {
      id: "linux-q8",
      question: "What does LVM stand for?",
      options: ["Local Volume Manager", "Logical Volume Manager", "Large Volume Management", "Linux Virtual Memory"],
      correct: 1,
      explanation: "LVM = Logical Volume Manager. It provides flexible disk space management."
    }
  ],
  containers: [
    {
      id: "k8s-q1",
      question: "What is the smallest deployable unit in Kubernetes?",
      options: ["Container", "Pod", "Deployment", "Service"],
      correct: 1,
      explanation: "A Pod is the smallest deployable unit in Kubernetes, containing one or more containers."
    },
    {
      id: "k8s-q2",
      question: "Which Kubernetes resource ensures a specified number of pod replicas?",
      options: ["Service", "Deployment", "ConfigMap", "Secret"],
      correct: 1,
      explanation: "Deployment manages ReplicaSets to ensure the desired number of pod replicas."
    },
    {
      id: "docker-q1",
      question: "What is a Docker image layer?",
      options: ["A running container", "A read-only filesystem layer", "A network interface", "A volume mount"],
      correct: 1,
      explanation: "Docker images are composed of read-only layers, each representing a change to the filesystem."
    },
    {
      id: "k8s-q3",
      question: "Which Service type exposes pods externally using a stable IP?",
      options: ["ClusterIP", "NodePort", "LoadBalancer", "ExternalName"],
      correct: 2,
      explanation: "LoadBalancer Service type exposes pods externally using a cloud provider's load balancer."
    },
    {
      id: "k8s-q4",
      question: "What is the purpose of a Kubernetes ConfigMap?",
      options: ["Store secrets", "Store configuration data", "Store logs", "Store images"],
      correct: 1,
      explanation: "ConfigMaps store configuration data in key-value pairs that can be consumed by pods."
    },
    {
      id: "docker-q2",
      question: "Which Dockerfile instruction sets the base image?",
      options: ["BASE", "FROM", "IMAGE", "SOURCE"],
      correct: 1,
      explanation: "FROM instruction sets the base image for subsequent instructions."
    },
    {
      id: "k8s-q5",
      question: "What is a Helm chart?",
      options: ["A type of container", "A package of pre-configured K8s resources", "A monitoring tool", "A network plugin"],
      correct: 1,
      explanation: "Helm charts are packages of pre-configured Kubernetes resources that can be deployed as a unit."
    },
    {
      id: "k8s-q6",
      question: "Which kubectl command is used to view pod logs?",
      options: ["kubectl get logs", "kubectl logs", "kubectl describe", "kubectl status"],
      correct: 1,
      explanation: "kubectl logs displays the logs of a container in a pod."
    }
  ],
  devops: [
    {
      id: "git-q1",
      question: "Which command creates a new branch and switches to it?",
      options: ["git branch new-branch", "git checkout -b new-branch", "git switch new-branch", "git create new-branch"],
      correct: 1,
      explanation: "git checkout -b new-branch creates and switches to a new branch."
    },
    {
      id: "cicd-q1",
      question: "What does CI/CD stand for?",
      options: ["Continuous Integration / Continuous Deployment", "Cloud Infrastructure / Cloud Deployment", "Code Integration / Code Delivery", "Continuous Inspection / Continuous Development"],
      correct: 0,
      explanation: "CI/CD = Continuous Integration / Continuous Deployment (or Delivery)."
    },
    {
      id: "git-q2",
      question: "What is the purpose of 'git rebase'?",
      options: ["Delete commits", "Move or combine commits", "Create branches", "Merge branches"],
      correct: 1,
      explanation: "git rebase moves or combines a sequence of commits to a new base commit, creating a linear history."
    },
    {
      id: "cicd-q2",
      question: "What is Infrastructure as Code?",
      options: ["Writing code for applications", "Managing infrastructure through code files", "Documenting infrastructure", "Manual server configuration"],
      correct: 1,
      explanation: "Infrastructure as Code (IaC) is managing infrastructure through machine-readable definition files rather than manual processes."
    },
    {
      id: "git-q3",
      question: "Which Git workflow uses a single main branch with feature branches?",
      options: ["Git Flow", "GitHub Flow", "GitLab Flow", "Trunk-Based Development"],
      correct: 1,
      explanation: "GitHub Flow uses a single main branch with short-lived feature branches that are merged via pull requests."
    },
    {
      id: "cicd-q3",
      question: "What is a GitOps workflow?",
      options: ["Using Git for source code only", "Using Git as the source of truth for infrastructure", "Automating Git commits", "Git backup strategy"],
      correct: 1,
      explanation: "GitOps uses Git as the single source of truth for declarative infrastructure and applications."
    },
    {
      id: "terraform-q1",
      question: "What is Terraform state file?",
      options: ["Configuration file", "Mapping of resources to real-world objects", "Log file", "Backup file"],
      correct: 1,
      explanation: "Terraform state file maps real-world resources to your configuration, tracks metadata, and improves performance."
    },
    {
      id: "ansible-q1",
      question: "What language are Ansible playbooks written in?",
      options: ["JSON", "XML", "YAML", "Python"],
      correct: 2,
      explanation: "Ansible playbooks are written in YAML format."
    }
  ],
  security: [
    {
      id: "sec-q1",
      question: "What is the principle of least privilege?",
      options: ["Give users full access", "Grant minimum necessary permissions", "Require strong passwords", "Encrypt all data"],
      correct: 1,
      explanation: "Least privilege means granting users only the minimum permissions needed for their tasks."
    },
    {
      id: "sec-q2",
      question: "Which protocol encrypts web traffic?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      correct: 2,
      explanation: "HTTPS (HTTP Secure) encrypts web traffic using TLS/SSL."
    },
    {
      id: "sec-q3",
      question: "What is a man-in-the-middle attack?",
      options: ["Physical theft", "Intercepting communication between parties", "Password guessing", "DDoS attack"],
      correct: 1,
      explanation: "A man-in-the-middle attack occurs when an attacker intercepts and potentially alters communication between two parties."
    },
    {
      id: "sec-q4",
      question: "What does MFA stand for?",
      options: ["Multi-Factor Authentication", "Multi-Firewall Access", "Managed File Access", "Mainframe Access"],
      correct: 0,
      explanation: "MFA = Multi-Factor Authentication, requiring multiple verification methods for access."
    },
    {
      id: "sec-q5",
      question: "What is the purpose of a firewall?",
      options: ["Encrypt data", "Monitor and control network traffic", "Store passwords", "Backup files"],
      correct: 1,
      explanation: "A firewall monitors and controls incoming and outgoing network traffic based on security rules."
    },
    {
      id: "sec-q6",
      question: "What is Zero Trust security model?",
      options: ["Trust all internal traffic", "Never trust, always verify", "Use only VPN", "Disable all access"],
      correct: 1,
      explanation: "Zero Trust model assumes no implicit trust based on network location - verify every access request."
    },
    {
      id: "sec-q7",
      question: "What is the purpose of TLS/SSL certificates?",
      options: ["Speed up connections", "Encrypt data in transit", "Compress data", "Cache content"],
      correct: 1,
      explanation: "TLS/SSL certificates encrypt data transmitted between client and server, ensuring confidentiality and integrity."
    },
    {
      id: "sec-q8",
      question: "What is a DDoS attack?",
      options: ["Data deletion", "Distributed Denial of Service", "Domain hijacking", "Database dump"],
      correct: 1,
      explanation: "DDoS (Distributed Denial of Service) overwhelms a service with traffic from multiple sources."
    }
  ],
  monitoring: [
    {
      id: "mon-q1",
      question: "What are the Four Golden Signals of monitoring?",
      options: ["CPU, Memory, Disk, Network", "Latency, Traffic, Errors, Saturation", "Requests, Responses, Errors, Timeouts", "Load, Capacity, Usage, Availability"],
      correct: 1,
      explanation: "The Four Golden Signals are: Latency, Traffic, Errors, and Saturation (from Google's SRE book)."
    },
    {
      id: "mon-q2",
      question: "What is the difference between SLI and SLO?",
      options: ["Same thing", "SLI is the metric, SLO is the target", "SLI is the target, SLO is the metric", "No difference"],
      correct: 1,
      explanation: "SLI (Service Level Indicator) is the metric being measured; SLO (Service Level Objective) is the target value for that metric."
    },
    {
      id: "prom-q1",
      question: "What is Prometheus used for?",
      options: ["Log aggregation", "Metrics collection and alerting", "Distributed tracing", "Network monitoring"],
      correct: 1,
      explanation: "Prometheus is an open-source systems monitoring and alerting toolkit that collects and stores metrics."
    },
    {
      id: "mon-q3",
      question: "What is the purpose of log aggregation?",
      options: ["Delete old logs", "Centralize logs from multiple sources", "Encrypt logs", "Compress logs"],
      correct: 1,
      explanation: "Log aggregation collects logs from multiple sources into a central location for analysis and monitoring."
    },
    {
      id: "mon-q4",
      question: "What does 'high cardinality' mean in monitoring?",
      options: ["High data volume", "Many unique time series", "Fast data ingestion", "Long retention period"],
      correct: 1,
      explanation: "High cardinality refers to having many unique time series, often due to labels with high uniqueness (like user IDs)."
    }
  ],
  iac: [
    {
      id: "tf-q1",
      question: "What is Terraform?",
      options: ["A programming language", "An infrastructure as code tool", "A monitoring tool", "A CI/CD tool"],
      correct: 1,
      explanation: "Terraform is an open-source infrastructure as code tool by HashiCorp for building, changing, and versioning infrastructure."
    },
    {
      id: "tf-q2",
      question: "What file extension do Terraform configuration files use?",
      options: [".tf", ".tfvars", ".hcl", ".json"],
      correct: 0,
      explanation: "Terraform configuration files use the .tf extension. .tfvars is for variable values."
    },
    {
      id: "ansible-q2",
      question: "What is an Ansible Playbook?",
      options: ["A log file", "A YAML file defining automation tasks", "A configuration backup", "A monitoring script"],
      correct: 1,
      explanation: "An Ansible Playbook is a YAML file containing a series of plays that define automation tasks."
    },
    {
      id: "tf-q3",
      question: "What is Terraform state?",
      options: ["Configuration syntax", "Mapping of resources to real infrastructure", "Execution plan", "Variable definitions"],
      correct: 1,
      explanation: "Terraform state maps your configuration to real-world resources and tracks resource metadata."
    },
    {
      id: "pulumi-q1",
      question: "What makes Pulumi different from Terraform?",
      options: ["It's not IaC", "Uses general-purpose programming languages", "Only for AWS", "Doesn't use state"],
      correct: 1,
      explanation: "Pulumi allows you to use general-purpose programming languages (TypeScript, Python, Go, C#) instead of HCL."
    }
  ]
};

// Merge with main QUIZ_QUESTIONS
Object.assign(QUIZ_QUESTIONS, EXTENDED_QUIZ_QUESTIONS);
