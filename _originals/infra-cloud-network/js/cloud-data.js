// Cloud Platforms Data Module
const CLOUD_DATA = {
  cloud: {
    title: "Cloud Platform",
    description: "AWS, GCP, Azure - Services, Architecture Patterns & Best Practices",
    color: "var(--cloud-color)",
    subtopics: {
      "AWS Core": [
        {
          id: "aws-vpc-deep",
          title: "AWS VPC Architecture Masterclass",
          tags: ["intermediate", "aws"],
          summary: "Enterprise VPC design, multi-AZ architectures, Transit Gateway, and security best practices.",
          content: `<h3>VPC Architecture Patterns</h3>

<h4>Single VPC (Small-Medium Workloads)</h4>
<div class="diagram">
┌─────────────────────────────────────────────────────────────┐
│                     AWS Region (us-east-1)                  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                    VPC (10.0.0.0/16)                 │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │  Public     │  │  Private    │  │  Database   │   │  │
│  │  │  Subnet A   │  │  Subnet A   │  │  Subnet A   │   │  │
│  │  │ 10.0.1.0/24 │  │ 10.0.3.0/24 │  │ 10.0.5.0/24 │   │  │
│  │  │  us-east-1a │  │  us-east-1a │  │  us-east-1a │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │  │
│  │  │  Public     │  │  Private    │  │  Database   │   │  │
│  │  │  Subnet B   │  │  Subnet B   │  │  Subnet B   │   │  │
│  │  │ 10.0.2.0/24 │  │ 10.0.4.0/24 │  │ 10.0.6.0/24 │   │  │
│  │  │  us-east-1b │  │  us-east-1b │  │  us-east-1b │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │  │
│  │                                                        │  │
│  │  IGW: Internet Gateway                                 │  │
│  │  NAT: NAT Gateway (per AZ)                             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
</div>

<h3>Key VPC Components</h3>
<table>
<tr><th>Component</th><th>Purpose</th><th>Cost Consideration</th><th>Limit</th></tr>
<tr><td>Internet Gateway (IGW)</td><td>Public internet access for VPC</td><td>Free</td><td>1 per VPC</td></tr>
<tr><td>NAT Gateway</td><td>Outbound internet for private subnets</td><td>~$32/month + data</td><td>5 per AZ (soft)</td></tr>
<tr><td>VPC Peering</td><td>Connect 2 VPCs privately</td><td>Data transfer charges</td><td>125 per VPC</td></tr>
<tr><td>Transit Gateway</td><td>Hub-and-spoke VPC connectivity</td><td>~$36/TBU + attachment</td><td>5000 attachments</td></tr>
<tr><td>VPC Endpoints</td><td>Private AWS service access</td><td>~$7.20/TBU</td><td>Gateway: 255, Interface: 50</td></tr>
<tr><td>VPN Gateway</td><td>Site-to-site VPN connection</td><td>~$0.05/hour + data</td><td>10 per VPC</td></tr>
<tr><td>Direct Connect</td><td>Dedicated private connection</td><td>Port hours + data</td><td>10 VIFs per connection</td></tr>
</table>

<h3>Security Group vs NACL</h3>
<table>
<tr><th>Feature</th><th>Security Group</th><th>NACL</th></tr>
<tr><td>Level</td><td>Instance (ENI level)</td><td>Subnet level</td></tr>
<tr><td>Type</td><td>Stateful (return traffic auto-allowed)</td><td>Stateless (both directions required)</td></tr>
<tr><td>Rules</td><td>Allow rules only (implicit deny)</td><td>Allow and Deny rules</td></tr>
<tr><td>Evaluation</td><td>All rules evaluated before decision</td><td>Rules processed in number order</td></tr>
<tr><td>Default</td><td>Deny all inbound, allow all outbound</td><td>Allow all</td></tr>
<tr><td>Attachment</td><td>Attached to ENI</td><td>Attached to Subnet</td></tr>
</table>

<h3>AWS CLI VPC Operations</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Create VPC with DNS support
VPC_ID=$(aws ec2 create-vpc \
    --cidr-block 10.0.0.0/16 \
    --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=production}]' \
    --query 'Vpc.VpcId' --output text)

aws ec2 modify-vpc-attribute --vpc-id $VPC_ID --enable-dns-hostnames
aws ec2 modify-vpc-attribute --vpc-id $VPC_ID --enable-dns-support

# Create subnets
aws ec2 create-subnet --vpc-id $VPC_ID \
    --cidr-block 10.0.1.0/24 \
    --availability-zone us-east-1a \
    --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public-1a}]'

# Create Internet Gateway
IGW_ID=$(aws ec2 create-internet-gateway \
    --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID

# Create NAT Gateway (requires Elastic IP)
EIP_ALLOC=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)
NAT_ID=$(aws ec2 create-nat-gateway --subnet-id $PUBLIC_SUBNET_ID \
    --allocation-id $EIP_ALLOC --query 'NatGateway.NatGatewayId' --output text)

# Create route tables
RT_PUBLIC=$(aws ec2 create-route-table --vpc-id $VPC_ID --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $RT_PUBLIC --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID

# Associate route table with subnet
aws ec2 associate-route-table --route-table-id $RT_PUBLIC --subnet-id $PUBLIC_SUBNET_ID

# Create VPC Endpoint for S3 (Gateway type)
aws ec2 create-vpc-endpoint --vpc-id $VPC_ID \
    --service-name com.amazonaws.us-east-1.s3 \
    --route-table-ids $RT_PRIVATE</code></pre>
</div>

<h3>VPC Design Best Practices</h3>
<ul>
<li><strong>CIDR Planning:</strong> Use /16 for VPC, /24 for subnets. Avoid overlapping with on-premise ranges.</li>
<li><strong>Multi-AZ:</strong> Always span at least 2 AZs for high availability.</li>
<li><strong>Public Subnets:</strong> Only place load balancers, bastion hosts, and NAT gateways here.</li>
<li><strong>Private Subnets:</strong> Application servers, container workloads.</li>
<li><strong>Database Subnets:</strong> Isolated subnets for RDS, ElastiCache - no NAT needed.</li>
<li><strong>VPC Endpoints:</strong> Use Gateway endpoints for S3/DynamoDB (free), Interface for others.</li>
<li><strong>Flow Logs:</strong> Enable VPC Flow Logs for security auditing and troubleshooting.</li>
</ul>`
        },
        {
          id: "aws-iam-deep",
          title: "AWS IAM - Identity & Access Management Deep Dive",
          tags: ["intermediate", "aws", "security"],
          summary: "IAM users, roles, policies, best practices, cross-account access, and security.",
          content: `<h3>IAM Core Concepts</h3>
<table>
<tr><th>Entity</th><th>Description</th><th>Use Case</th></tr>
<tr><td>User</td><td>Person or service identity with long-term credentials</td><td>Individual access, service accounts</td></tr>
<tr><td>Group</td><td>Collection of users</td><td>Shared permissions (e.g., Developers, Admins)</td></tr>
<tr><td>Role</td><td>Assumable identity with temporary credentials</td><td>Services, cross-account, federation</td></tr>
<tr><td>Policy</td><td>JSON permissions document</td><td>Define what's allowed/denied</td></tr>
</table>

<h3>IAM Policy Structure</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">json</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3Read",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ],
      "Condition": {
        "IpAddress": {
          "aws:SourceIp": "10.0.0.0/8"
        },
        "Bool": {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    },
    {
      "Sid": "DenyDangerousActions",
      "Effect": "Deny",
      "Action": [
        "s3:DeleteBucket",
        "ec2:TerminateInstances"
      ],
      "Resource": "*"
    }
  ]
}</code></pre>
</div>

<h3>Policy Condition Operators</h3>
<table>
<tr><th>Operator</th><th>Description</th><th>Example</th></tr>
<tr><td>StringEquals</td><td>Exact string match</td><td>"aws:Username": "john"</td></tr>
<tr><td>StringLike</td><td>Wildcard match</td><td>"s3:prefix": "home/${aws:username}/*"</td></tr>
<tr><td>IpAddress</td><td>IP range check</td><td>"aws:SourceIp": "10.0.0.0/8"</td></tr>
<tr><td>Bool</td><td>Boolean check</td><td>"aws:MultiFactorAuthPresent": "true"</td></tr>
<tr><td>DateGreaterThan</td><td>Date comparison</td><td>"aws:CurrentTime": "2024-01-01T00:00:00Z"</td></tr>
<tr><td>NumericLessThan</td><td>Numeric comparison</td><td>"s3:max-keys": 100</td></tr>
</table>

<h3>IAM Best Practices</h3>
<ol>
<li><strong>Enable MFA on root account</strong> - Never use root for daily tasks</li>
<li><strong>Follow least privilege principle</strong> - Grant minimum necessary permissions</li>
<li><strong>Use IAM Roles for services</strong> - EC2, Lambda, ECS should use roles, not access keys</li>
<li><strong>Rotate access keys regularly</strong> - Every 90 days or use IAM Access Analyzer</li>
<li><strong>Enable CloudTrail</strong> - Audit all API calls</li>
<li><strong>Use Service Control Policies (SCPs)</strong> - Organizational guardrails</li>
<li><strong>Permission boundaries</strong> - For delegated administration</li>
<li><strong>Session policies</strong> - Further restrict role permissions</li>
</ol>

<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># AWS CLI IAM commands
aws iam list-users
aws iam get-user --user-name john
aws iam list-attached-user-policies --user-name john
aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456:user/john --action-names s3:GetObject
aws sts get-caller-identity

# Assume role
aws sts assume-role --role-arn arn:aws:iam::123456:role/CrossAccountRole --role-session-name MySession

# Get session token (MFA)
aws sts get-session-token --serial-number arn:aws:iam::123456:mfa/john --token-code 123456</code></pre>
</div>

<h3>Cross-Account Access Pattern</h3>
<div class="diagram">
Account A (Dev)                    Account B (Production)
┌──────────────────┐              ┌──────────────────┐
│ IAM Role         │─────────────>│ IAM Role         │
│ - Trust Policy   │  AssumeRole  │ - ProductionRole │
│   allows AccountA│              │ - Trust Policy   │
│                  │              │   allows AccountA│
└──────────────────┘              └──────────────────┘
</div>

<h3>IAM Policy Variables</h3>
<p>Use variables for dynamic permissions:</p>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">json</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>{
  "Effect": "Allow",
  "Action": "s3:*",
  "Resource": [
    "arn:aws:s3:::company-bucket/home/${aws:username}",
    "arn:aws:s3:::company-bucket/home/${aws:username}/*"
  ]
}</code></pre>
</div>`
        },
        {
          id: "aws-services-complete",
          title: "AWS Services Complete Reference",
          tags: ["intermediate", "aws"],
          summary: "Comprehensive guide to AWS services organized by category.",
          content: `<h3>Compute Services</h3>
<table>
<tr><th>Service</th><th>Type</th><th>Best For</th><th>Key Features</th></tr>
<tr><td>EC2</td><td>IaaS</td><td>Full control, legacy apps</td><td>Instance types, auto-scaling, spot</td></tr>
<tr><td>Lambda</td><td>Serverless</td><td>Event-driven, APIs</td><td>Pay per request, auto-scale</td></tr>
<tr><td>ECS</td><td>Containers</td><td>Docker workloads</td><td>Fargate or EC2 launch</td></tr>
<tr><td>EKS</td><td>Kubernetes</td><td>Managed K8s</td><td>Managed control plane</td></tr>
<tr><td>Fargate</td><td>Serverless Containers</td><td>No server management</td><td>Per-second billing</td></tr>
<tr><td>Batch</td><td>Batch Processing</td><td>HPC, ML training</td><td>Managed compute env</td></tr>
<tr><td>LightSail</td><td>VPS</td><td>Simple workloads</td><td>Predictable pricing</td></tr>
</table>

<h3>Storage Services</h3>
<table>
<tr><th>Service</th><th>Type</th><th>Latency</th><th>Use Case</th></tr>
<tr><td>S3 Standard</td><td>Object</td><td>Low</td><td>Frequently accessed data</td></tr>
<tr><td>S3 IA</td><td>Object</td><td>Low</td><td>Infrequently accessed</td></tr>
<tr><td>S3 Glacier</td><td>Archive</td><td>Minutes-Hours</td><td>Long-term backup</td></tr>
<tr><td>EBS</td><td>Block</td><td>Sub-ms</td><td>EC2 attached storage</td></tr>
<tr><td>EFS</td><td>File (NFS)</td><td>Low</td><td>Shared file storage</td></tr>
<tr><td>FSx</td><td>File</td><td>Sub-ms</td><td>Windows/Lustre file systems</td></tr>
<tr><td>Storage Gateway</td><td>Hybrid</td><td>Variable</td><td>On-prem to cloud</td></tr>
</table>

<h3>Database Services</h3>
<table>
<tr><th>Service</th><th>Type</th><th>Engine</th><th>Best For</th></tr>
<tr><td>RDS</td><td>Relational</td><td>MySQL, PG, Oracle</td><td>Managed relational DB</td></tr>
<tr><td>Aurora</td><td>Relational</td><td>MySQL/PostgreSQL</td><td>High performance, 6-way replication</td></tr>
<tr><td>DynamoDB</td><td>NoSQL</td><td>Key-value</td><td><10ms latency, serverless</td></tr>
<tr><td>DocumentDB</td><td>NoSQL</td><td>MongoDB</td><td>JSON document store</td></tr>
<tr><td>Keyspaces</td><td>NoSQL</td><td>Cassandra</td><td>Managed Cassandra</td></tr>
<tr><td>Neptune</td><td>Graph</td><td>Property/Graph</td><td>Graph relationships</td></tr>
<tr><td>ElastiCache</td><td>In-memory</td><td>Redis/Memcached</td><td>Sub-millisecond caching</td></tr>
</table>

<h3>Networking Services</h3>
<table>
<tr><th>Service</th><th>Purpose</th><th>Layer</th></tr>
<tr><td>VPC</td><td>Isolated network</td><td>L3</td></tr>
<tr><td>Direct Connect</td><td>Dedicated connection</td><td>L1-L3</td></tr>
<tr><td>Transit Gateway</td><td>Network hub</td><td>L3</td></tr>
<tr><td>Route 53</td><td>DNS</td><td>L7</td></tr>
<tr><td>CloudFront</td><td>CDN</td><td>L7</td></tr>
<tr><td>ALB/NLB/CLB</td><td>Load balancing</td><td>L7/L4/L4</td></tr>
<tr><td>API Gateway</td><td>API management</td><td>L7</td></tr>
<tr><td>App Mesh</td><td>Service mesh</td><td>L7</td></tr>
</table>

<h3>Security Services</h3>
<table>
<tr><th>Service</th><th>Purpose</th></tr>
<tr><td>IAM</td><td>Identity & access management</td></tr>
<tr><td>KMS</td><td>Key management & encryption</td></tr>
<tr><td>Secrets Manager</td><td>Rotate & manage secrets</td></tr>
<tr><td>Certificate Manager</td><td>Free SSL/TLS certificates</td></tr>
<tr><td>WAF</td><td>Web application firewall</td></tr>
<tr><td>Shield</td><td>DDoS protection</td></tr>
<tr><td>GuardDuty</td><td>Threat detection</td></tr>
<tr><td>Macie</td><td>Data privacy (PII)</td></tr>
</table>`
        }
      ],
      "GCP": [
        {
          id: "gcp-networking-deep",
          title: "GCP Networking - VPC & Connectivity",
          tags: ["intermediate", "gcp"],
          summary: "GCP VPC, subnets, firewall rules, Cloud NAT, Cloud Interconnect.",
          content: `<h3>GCP VPC Key Differences from AWS</h3>
<table>
<tr><th>Feature</th><th>GCP</th><th>AWS</th></tr>
<tr><td>VPC Scope</td><td>Global</td><td>Regional</td></tr>
<tr><td>Subnets</td><td>Regional</td><td>AZ-specific</td></tr>
<tr><td>Firewall</td><td>Global, network-level</td><td>SG (instance) + NACL (subnet)</td></tr>
<tr><td>Routes</td><td>Global</td><td>Per route table</td></tr>
<tr><td>Load Balancers</td><td>Layer 4 & 7 are separate</td><td>ALB/NLB separate services</td></tr>
</table>

<h3>GCP Firewall Rules</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Create firewall rule
gcloud compute firewall-rules create allow-ssh \
    --network=my-vpc \
    --allow=tcp:22 \
    --source-ranges=10.0.0.0/8 \
    --target-tags=ssh-allowed \
    --priority=1000

# List firewall rules
gcloud compute firewall-rules list --filter="network:my-vpc"

# VPC creation
gcloud compute networks create my-vpc --subnet-mode=custom
gcloud compute networks subnets create my-subnet \
    --network=my-vpc \
    --region=us-central1 \
    --range=10.0.1.0/24</code></pre>
</div>

<h3>GCP Load Balancing Options</h3>
<table>
<tr><th>Type</th><th>Scope</th><th>Protocol</th><th>Use Case</th></tr>
<tr><td>HTTP(S) LB</td><td>Global</td><td>HTTP/HTTPS</td><td>Web apps</td></tr>
<tr><td>SSL Proxy</td><td>Global</td><td>SSL/TLS</td><td>Non-HTTP SSL</td></tr>
<tr><td>TCP Proxy</td><td>Global</td><td>TCP</td><td>Non-HTTP TCP</td></tr>
<tr><td>Network LB</td><td>Regional</td><td>TCP/UDP</td><td>High performance</td></tr>
<tr><td>Internal LB</td><td>Regional</td><td>TCP/UDP</td><td>Internal services</td></tr>
</table>

<h3>GCP Services Comparison to AWS</h3>
<table>
<tr><th>AWS</th><th>GCP</th><th>Notes</th></tr>
<tr><td>EC2</td><td>Compute Engine</td><td>Similar VM offering</td></tr>
<tr><td>Lambda</td><td>Cloud Functions</td><td>Serverless functions</td></tr>
<tr><td>S3</td><td>Cloud Storage</td><td>Object storage with classes</td></tr>
<tr><td>RDS</td><td>Cloud SQL/Spanner</td><td>Managed databases</td></tr>
<tr><td>DynamoDB</td><td>Firestore/Bigtable</td><td>NoSQL options</td></tr>
<tr><td>Route 53</td><td>Cloud DNS</td><td>DNS hosting</td></tr>
<tr><td>CloudWatch</td><td>Cloud Monitoring</td><td>Observability</td></tr>
<tr><td>CloudFormation</td><td>Deployment Manager</td><td>Infrastructure as code</td></tr>
<tr><td>SQS/SNS</td><td>Pub/Sub</td><td>Messaging service</td></tr>
</table>`
        }
      ],
      "Azure": [
        {
          id: "azure-networking-deep",
          title: "Azure Networking - VNet & Services",
          tags: ["intermediate", "azure"],
          summary: "Azure VNet, NSG, Azure Firewall, Load Balancer, ExpressRoute.",
          content: `<h3>Azure Networking Components</h3>
<table>
<tr><th>Service</th><th>Purpose</th><th>AWS Equivalent</th></tr>
<tr><td>VNet</td><td>Virtual Network</td><td>VPC</td></tr>
<tr><td>NSG</td><td>Network Security Group</td><td>Security Group + NACL</td></tr>
<tr><td>Azure Firewall</td><td>Managed firewall service</td><td>Network Firewall</td></tr>
<tr><td>Application Gateway</td><td>L7 Load Balancer + WAF</td><td>ALB + WAF</td></tr>
<tr><td>Azure Load Balancer</td><td>L4 Load Balancer</td><td>NLB</td></tr>
<tr><td>ExpressRoute</td><td>Dedicated connection</td><td>Direct Connect</td></tr>
<tr><td>Azure DNS</td><td>DNS hosting</td><td>Route 53</td></tr>
<tr><td>Front Door</td><td>Global LB + CDN + WAF</td><td>CloudFront + Global Acc.</td></tr>
<tr><td>Traffic Manager</td><td>DNS-based traffic routing</td><td>Route 53 routing</td></tr>
</table>

<h3>Azure CLI Examples</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Create VNet
az network vnet create --name myVNet --resource-group myRG \
    --address-prefix 10.0.0.0/16 --subnet-name mySubnet \
    --subnet-prefix 10.0.1.0/24

# Create NSG
az network nsg create --name myNSG --resource-group myRG

# Add NSG rule
az network nsg rule create --nsg-name myNSG --resource-group myRG \
    --name AllowSSH --priority 100 --access Allow \
    --protocol Tcp --destination-port-ranges 22 \
    --source-address-prefixes 10.0.0.0/8</code></pre>
</div>

<h3>Azure Services Comparison</h3>
<table>
<tr><th>Category</th><th>Azure</th><th>AWS</th><th>GCP</th></tr>
<tr><td>Compute (VM)</td><td>Virtual Machines</td><td>EC2</td><td>Compute Engine</td></tr>
<tr><td>Serverless</td><td>Functions</td><td>Lambda</td><td>Cloud Functions</td></tr>
<tr><td>Containers</td><td>AKS</td><td>EKS</td><td>GKE</td></tr>
<tr><td>Object Storage</td><td>Blob Storage</td><td>S3</td><td>Cloud Storage</td></tr>
<tr><td>SQL Database</td><td>Azure SQL</td><td>RDS</td><td>Cloud SQL</td></tr>
<tr><td>NoSQL</td><td>Cosmos DB</td><td>DynamoDB</td><td>Firestore</td></tr>
<tr><td>Cache</td><td>Cache for Redis</td><td>ElastiCache</td><td>Memorystore</td></tr>
</table>`
        }
      ],
      "Multi-Cloud": [
        {
          id: "cloud-comparison-tool",
          title: "Multi-Cloud Service Comparison Matrix",
          tags: ["intermediate", "comparison"],
          summary: "Side-by-side comparison of equivalent services across AWS, GCP, and Azure.",
          content: `<h3>Complete Service Comparison Matrix</h3>
<table>
<tr><th>Category</th><th>AWS</th><th>GCP</th><th>Azure</th></tr>
<tr><td>VM</td><td>EC2</td><td>Compute Engine</td><td>Virtual Machines</td></tr>
<tr><td>Serverless</td><td>Lambda</td><td>Cloud Functions</td><td>Functions</td></tr>
<tr><td>Containers</td><td>ECS/EKS</td><td>GKE</td><td>AKS</td></tr>
<tr><td>Object Storage</td><td>S3</td><td>Cloud Storage</td><td>Blob Storage</td></tr>
<tr><td>Block Storage</td><td>EBS</td><td>Persistent Disk</td><td>Managed Disks</td></tr>
<tr><td>File Storage</td><td>EFS</td><td>Filestore</td><td>Files</td></tr>
<tr><td>Archive</td><td>Glacier</td><td>Archive Storage</td><td>Archive Storage</td></tr>
<tr><td>SQL Database</td><td>RDS/Aurora</td><td>Cloud SQL/Spanner</td><td>Azure SQL</td></tr>
<tr><td>NoSQL</td><td>DynamoDB</td><td>Firestore/Bigtable</td><td>Cosmos DB</td></tr>
<tr><td>Cache</td><td>ElastiCache</td><td>Memorystore</td><td>Cache for Redis</td></tr>
<tr><td>CDN</td><td>CloudFront</td><td>Cloud CDN</td><td>CDN</td></tr>
<tr><td>DNS</td><td>Route 53</td><td>Cloud DNS</td><td>Azure DNS</td></tr>
<tr><td>Load Balancer (L4)</td><td>NLB</td><td>Network LB</td><td>Load Balancer</td></tr>
<tr><td>Load Balancer (L7)</td><td>ALB</td><td>HTTP(S) LB</td><td>App Gateway</td></tr>
<tr><td>WAF</td><td>WAF</td><td>Cloud Armor</td><td>WAF</td></tr>
<tr><td>DDoS Protection</td><td>Shield</td><td>Cloud Armor</td><td>DDoS Protection</td></tr>
<tr><td>IAM</td><td>IAM</td><td>Cloud IAM</td><td>Azure AD/Entra</td></tr>
<tr><td>Secrets</td><td>Secrets Manager</td><td>Secret Manager</td><td>Key Vault</td></tr>
<tr><td>KMS</td><td>KMS</td><td>Cloud KMS</td><td>Key Vault</td></tr>
<tr><td>Monitoring</td><td>CloudWatch</td><td>Cloud Monitoring</td><td>Monitor</td></tr>
<tr><td>Logging</td><td>CloudWatch Logs</td><td>Cloud Logging</td><td>Monitor Logs</td></tr>
<tr><td>Trace</td><td>X-Ray</td><td>Cloud Trace</td><td>App Insights</td></tr>
<tr><td>IaC</td><td>CloudFormation</td><td>Deployment Manager</td><td>ARM/Bicep</td></tr>
<tr><td>CI/CD</td><td>CodePipeline</td><td>Cloud Build</td><td>DevOps</td></tr>
<tr><td>Registry</td><td>ECR</td><td>Artifact Registry</td><td>ACR</td></tr>
<tr><td>Kubernetes</td><td>EKS</td><td>GKE</td><td>AKS</td></tr>
<tr><td>Serverless Containers</td><td>Fargate</td><td>Cloud Run</td><td>Container Instances</td></tr>
<tr><td>Pub/Sub</td><td>SQS/SNS</td><td>Pub/Sub</td><td>Service Bus/Event Grid</td></tr>
<tr><td>Data Warehouse</td><td>Redshift</td><td>BigQuery</td><td>Synapse</td></tr>
<tr><td>Data Lake</td><td>Lake Formation</td><td>Dataplex</td><td>Data Lake Storage</td></tr>
<tr><td>ML Platform</td><td>SageMaker</td><td>Vertex AI</td><td>Machine Learning</td></tr>
<tr><td>AI/ML APIs</td><td>Rekognition, etc.</td><td>Vision, Natural Language</td><td>Cognitive Services</td></tr>
</table>

<div class="info-box">
<strong>Multi-Cloud Strategy Tip:</strong> Use Terraform or Pulumi for multi-cloud IaC to maintain consistent workflows across providers. Avoid vendor lock-in by using containerization and open standards.
</div>

<h3>Cloud Pricing Comparison</h3>
<table>
<tr><th>Service</th><th>AWS</th><th>GCP</th><th>Azure</th></tr>
<tr><td>Linux VM (2 vCPU, 8GB)</td><td>~$70/month</td><td>~$70/month</td><td>~$70/month</td></tr>
<tr><td>Object Storage (per TB)</td><td>~$23</td><td>~$20</td><td>~$19</td></tr>
<tr><td>Load Balancer</td><td>~$22/month + LCU</td><td>~$18/month</td><td>~$26/month</td></tr>
<tr><td>Managed K8s (per cluster)</td><td>~$73/month</td><td>~$74/month</td><td>~$74/month</td></tr>
</table>`
        }
      ]
    }
  }
};

// Merge with main KNOWLEDGE_BASE
Object.assign(KNOWLEDGE_BASE, CLOUD_DATA);
