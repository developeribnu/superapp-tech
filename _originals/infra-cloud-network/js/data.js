// InfraHub Pro - Complete Knowledge Base Data v2.0
// Ultra-comprehensive learning platform data

const KNOWLEDGE_BASE = {
  networking: {
    title: "Networking",
    description: "Master TCP/IP, DNS, BGP, VLAN, Firewall, Load Balancing & Network Architecture",
    color: "var(--networking-color)",
    subtopics: {
      "OSI & TCP/IP": [
        {
          id: "osi-model",
          title: "OSI Model - 7 Layers Explained",
          tags: ["beginner", "fundamentals"],
          summary: "Complete breakdown of all 7 OSI layers with protocols, functions, and real-world examples.",
          content: `<h3>OSI Model Overview</h3>
<p>The OSI (Open Systems Interconnection) model is a conceptual framework that standardizes the functions of a communication system into seven distinct layers. Understanding this model is crucial for network troubleshooting and design.</p>

<div class="diagram">
╔═══════════════════════════════════════════════════════════════╗
║  LAYER 7  │  APPLICATION   │  HTTP, HTTPS, FTP, SMTP, DNS   ║
╠═══════════════════════════════════════════════════════════════╣
║  LAYER 6  │  PRESENTATION  │  SSL/TLS, JPEG, PNG, MPEG      ║
╠═══════════════════════════════════════════════════════════════╣
║  LAYER 5  │    SESSION     │  NetBIOS, RPC, PPTP            ║
╠═══════════════════════════════════════════════════════════════╣
║  LAYER 4  │   TRANSPORT    │  TCP, UDP, SCTP                ║
╠═══════════════════════════════════════════════════════════════╣
║  LAYER 3  │    NETWORK     │  IP, ICMP, OSPF, BGP, EIGRP    ║
╠═══════════════════════════════════════════════════════════════╣
║  LAYER 2  │   DATA LINK    │  Ethernet, PPP, ARP, STP       ║
╠═══════════════════════════════════════════════════════════════╣
║  LAYER 1  │    PHYSICAL    │  Cables, Hubs, Repeaters       ║
╚═══════════════════════════════════════════════════════════════╝
</div>

<h3>Layer Details</h3>
<table>
<tr><th>Layer</th><th>Function</th><th>PDU</th><th>Devices/Protocols</th></tr>
<tr><td>7 - Application</td><td>User interface, network resource access</td><td>Data</td><td>HTTP, FTP, SMTP, DNS</td></tr>
<tr><td>6 - Presentation</td><td>Data translation, encryption, compression</td><td>Data</td><td>SSL/TLS, JPEG, ASCII</td></tr>
<tr><td>5 - Session</td><td>Session establishment, management, termination</td><td>Data</td><td>NetBIOS, RPC, PPTP</td></tr>
<tr><td>4 - Transport</td><td>Reliable delivery, flow control, error correction</td><td>Segment</td><td>TCP, UDP, Port numbers</td></tr>
<tr><td>3 - Network</td><td>Logical addressing, routing, path determination</td><td>Packet</td><td>IP, Router, ICMP</td></tr>
<tr><td>2 - Data Link</td><td>Physical addressing, framing, error detection</td><td>Frame</td><td>Ethernet, MAC, Switch</td></tr>
<tr><td>1 - Physical</td><td>Bit transmission, electrical signals</td><td>Bits</td><td>Cables, Hubs, NIC</td></tr>
</table>

<h3>Key Concepts</h3>
<ul>
<li><strong>Encapsulation:</strong> Data is wrapped with headers at each layer going down the stack</li>
<li><strong>De-encapsulation:</strong> Headers are removed at each layer going up the stack</li>
<li><strong>Same-layer interaction:</strong> Each layer communicates with its peer on the other device</li>
<li><strong>Adjacent-layer interaction:</strong> Each layer provides services to the layer above</li>
</ul>

<div class="info-box">
<strong>Remember:</strong> "Please Do Not Throw Sausage Pizza Away" (Physical, Data Link, Network, Transport, Session, Presentation, Application)
</div>

<h3>Real-World Example: Loading a Web Page</h3>
<ol>
<li><strong>Application:</strong> Browser requests https://example.com</li>
<li><strong>Presentation:</strong> Data is encrypted with TLS</li>
<li><strong>Session:</strong> Session established with server</li>
<li><strong>Transport:</strong> TCP connection on port 443</li>
<li><strong>Network:</strong> IP packet routed to destination</li>
<li><strong>Data Link:</strong> Ethernet frame to next hop (MAC address)</li>
<li><strong>Physical:</strong> Electrical signals over cable</li>
</ol>`
        },
        {
          id: "tcp-handshake",
          title: "TCP Three-Way Handshake & Connection States",
          tags: ["beginner", "tcp"],
          summary: "Deep dive into TCP connection establishment, termination, and all connection states.",
          content: `<h3>TCP Three-Way Handshake</h3>
<p>TCP uses a three-way handshake to establish reliable connections before data transmission begins.</p>

<div class="diagram">
     Client                              Server
       │                                   │
       │────────── SYN (seq=x) ───────────>│
       │         "I want to connect"       │
       │                                   │
       │<───── SYN-ACK (seq=y, ack=x+1) ───│
       │     "I got it, you there?"        │
       │                                   │
       │────────── ACK (ack=y+1) ─────────>│
       │         "I'm here!"               │
       │                                   │
       │═══════ CONNECTION OPEN ═══════════│
       │                                   │
</div>

<h3>TCP Connection States</h3>
<table>
<tr><th>State</th><th>Description</th><th>Common Causes</th></tr>
<tr><td>LISTEN</td><td>Server waiting for incoming connections</td><td>Normal server state</td></tr>
<tr><td>SYN_SENT</td><td>Client sent SYN, waiting for SYN-ACK</td><td>Connection in progress</td></tr>
<tr><td>SYN_RECEIVED</td><td>Server received SYN, sent SYN-ACK</td><td>Connection being established</td></tr>
<tr><td>ESTABLISHED</td><td>Connection is open and data can flow</td><td>Normal active connection</td></tr>
<tr><td>FIN_WAIT_1</td><td>Sent FIN, waiting for ACK</td><td>Active close initiated</td></tr>
<tr><td>FIN_WAIT_2</td><td>Received ACK for FIN, waiting for peer FIN</td><td>Waiting for other side</td></tr>
<tr><td>TIME_WAIT</td><td>Wait 2×MSL before closing</td><td>Ensure last ACK received</td></tr>
<tr><td>CLOSE_WAIT</td><td>Received FIN, waiting for app to close</td><td>App not closing socket</td></tr>
<tr><td>LAST_ACK</td><td>Sent FIN after CLOSE_WAIT, waiting ACK</td><td>Final close step</td></tr>
<tr><td>CLOSED</td><td>Connection fully terminated</td><td>Connection ended</td></tr>
</table>

<div class="warning-box">
<strong>Common Issue:</strong> Too many TIME_WAIT connections can exhaust ports. This often happens with high-traffic proxies. Solutions: Enable tcp_tw_reuse, increase local port range, or use connection pooling.
</div>

<h3>TCP vs UDP Comparison</h3>
<table>
<tr><th>Feature</th><th>TCP</th><th>UDP</th></tr>
<tr><td>Connection</td><td>Connection-oriented</td><td>Connectionless</td></tr>
<tr><td>Reliability</td><td>Guaranteed delivery, retransmission</td><td>Best effort, no guarantee</td></tr>
<tr><td>Ordering</td><td>In-order delivery guaranteed</td><td>No ordering guarantees</td></tr>
<tr><td>Overhead</td><td>High (20 bytes header)</td><td>Low (8 bytes header)</td></tr>
<tr><td>Speed</td><td>Slower due to overhead</td><td>Faster, minimal latency</td></tr>
<tr><td>Use Cases</td><td>HTTP, SSH, FTP, SMTP, Database</td><td>DNS, VoIP, Video Streaming, Gaming</td></tr>
</table>

<h3>Useful Commands</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Check TCP connections by state
ss -tan | awk '{print $1}' | sort | uniq -c | sort -rn

# Monitor TCP handshakes in real-time
tcpdump -i eth0 'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0'

# Check TIME_WAIT connections
ss -tan state time-wait | wc -l

# Connection statistics
netstat -tan | grep -E '^(tcp|Proto)'

# Watch connection state changes
watch -n 1 'ss -tan | grep :80'</code></pre>
</div>

<h3>TCP Flags Reference</h3>
<ul>
<li><strong>SYN (Synchronize):</strong> Initiates connection</li>
<li><strong>ACK (Acknowledgment):</strong> Acknowledges received data</li>
<li><strong>FIN (Finish):</strong> Gracefully closes connection</li>
<li><strong>RST (Reset):</strong> Abruptly terminates connection</li>
<li><strong>PSH (Push):</strong> Sends data immediately</li>
<li><strong>URG (Urgent):</strong> Urgent data pointer</li>
</ul>`
        },
        {
          id: "subnetting",
          title: "IP Subnetting & CIDR Masterclass",
          tags: ["intermediate", "ipv4"],
          summary: "Master subnetting, CIDR notation, VLSM, and IP calculations with practical examples.",
          content: `<h3>CIDR Notation Quick Reference</h3>
<table>
<tr><th>CIDR</th><th>Subnet Mask</th><th>Hosts</th><th>Wildcard</th><th>Class</th></tr>
<tr><td>/32</td><td>255.255.255.255</td><td>1</td><td>0.0.0.0</td><td>Host</td></tr>
<tr><td>/31</td><td>255.255.255.254</td><td>2*</td><td>0.0.0.1</td><td>PtP</td></tr>
<tr><td>/30</td><td>255.255.255.252</td><td>2</td><td>0.0.0.3</td><td>Small</td></tr>
<tr><td>/29</td><td>255.255.255.248</td><td>6</td><td>0.0.0.7</td><td>Small</td></tr>
<tr><td>/28</td><td>255.255.255.240</td><td>14</td><td>0.0.0.15</td><td>Small</td></tr>
<tr><td>/27</td><td>255.255.255.224</td><td>30</td><td>0.0.0.31</td><td>Small</td></tr>
<tr><td>/26</td><td>255.255.255.192</td><td>62</td><td>0.0.0.63</td><td>Medium</td></tr>
<tr><td>/25</td><td>255.255.255.128</td><td>126</td><td>0.0.0.127</td><td>Medium</td></tr>
<tr><td>/24</td><td>255.255.255.0</td><td>254</td><td>0.0.0.255</td><td>Class C</td></tr>
<tr><td>/23</td><td>255.255.254.0</td><td>510</td><td>0.0.1.255</td><td>Medium</td></tr>
<tr><td>/22</td><td>255.255.252.0</td><td>1,022</td><td>0.0.3.255</td><td>Medium</td></tr>
<tr><td>/21</td><td>255.255.248.0</td><td>2,046</td><td>0.0.7.255</td><td>Medium</td></tr>
<tr><td>/20</td><td>255.255.240.0</td><td>4,094</td><td>0.0.15.255</td><td>Large</td></tr>
<tr><td>/16</td><td>255.255.0.0</td><td>65,534</td><td>0.0.255.255</td><td>Class B</td></tr>
<tr><td>/8</td><td>255.0.0.0</td><td>16,777,214</td><td>0.255.255.255</td><td>Class A</td></tr>
</table>
<p><small>* /31 Point-to-Point (RFC 3021) - no network/broadcast addresses needed</small></p>

<h3>Private IP Ranges (RFC 1918)</h3>
<table>
<tr><th>Class</th><th>Range</th><th>CIDR</th><th>Use Case</th></tr>
<tr><td>Class A</td><td>10.0.0.0 - 10.255.255.255</td><td>10.0.0.0/8</td><td>Large enterprises, AWS VPC default</td></tr>
<tr><td>Class B</td><td>172.16.0.0 - 172.31.255.255</td><td>172.16.0.0/12</td><td>Medium networks, GCP default</td></tr>
<tr><td>Class C</td><td>192.168.0.0 - 192.168.255.255</td><td>192.168.0.0/16</td><td>Small networks, Home/Office</td></tr>
</table>

<h3>Subnetting Formula</h3>
<div class="info-box">
<strong>Key Formulas:</strong><br>
• Hosts per subnet = 2^(host bits) - 2 (subtract 2 for network/broadcast)<br>
• Number of subnets = 2^(borrowed bits)<br>
• Block size = 256 - subnet mask octet value
</div>

<h3>Subnetting Example</h3>
<p><strong>Problem:</strong> Divide 192.168.1.0/24 into 4 subnets with at least 50 hosts each.</p>

<p><strong>Solution:</strong></p>
<ol>
<li>Need 50 hosts: 2^n - 2 ≥ 50 → n = 6 (62 usable hosts)</li>
<li>Subnet mask: 32 - 6 = /26</li>
<li>Block size: 256 - 192 = 64</li>
</ol>

<div class="code-block">
<div class="code-header">
    <span class="code-lang">Subnet Breakdown</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>Subnet 1: 192.168.1.0/26
  Network:   192.168.1.0
  Usable:    192.168.1.1 - 192.168.1.62
  Broadcast: 192.168.1.63

Subnet 2: 192.168.1.64/26
  Network:   192.168.1.64
  Usable:    192.168.1.65 - 192.168.1.126
  Broadcast: 192.168.1.127

Subnet 3: 192.168.1.128/26
  Network:   192.168.1.128
  Usable:    192.168.1.129 - 192.168.1.190
  Broadcast: 192.168.1.191

Subnet 4: 192.168.1.192/26
  Network:   192.168.1.192
  Usable:    192.168.1.193 - 192.168.1.254
  Broadcast: 192.168.1.255</code></pre>
</div>

<h3>VLSM (Variable Length Subnet Masking)</h3>
<p>VLSM allows subnets of different sizes within the same network - essential for efficient IP allocation.</p>

<div class="code-block">
<div class="code-header">
    <span class="code-lang">VLSM Example: 10.0.0.0/16</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>HQ Network (500 hosts):     10.0.0.0/23
Branch A (200 hosts):       10.0.2.0/24
Branch B (100 hosts):       10.0.3.0/25
Datacenter (50 hosts):      10.0.3.128/26
WAN Links (2 hosts each):   10.0.3.192/30, 10.0.3.196/30</code></pre>
</div>

<h3>Tools & Commands</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Linux subnet calculator
ipcalc 192.168.1.0/26

# Python subnet calculation
python3 -c "import ipaddress; net = ipaddress.ip_network('192.168.1.0/26'); print(list(net.hosts()))"

# Show all subnets in a range
sipcalc 10.0.0.0/16 --subnets 24

# Online tool: https://www.calculator.net/ip-subnet-calculator.html</code></pre>
</div>

<h3>Common Subnetting Mistakes</h3>
<ul>
<li><strong>Overlapping subnets:</strong> Double-check your math to avoid IP conflicts</li>
<li><strong>Forgetting broadcast:</strong> Remember usable hosts = total - 2</li>
<li><strong>Wasting IPs:</strong> Use VLSM instead of fixed-size subnets</li>
<li><strong>Wrong gateway:</strong> Gateway is usually first usable IP (x.x.x.1)</li>
</ul>`
        }
      ],
      "DNS": [
        {
          id: "dns-fundamentals",
          title: "DNS Deep Dive: Resolution, Records & Troubleshooting",
          tags: ["beginner", "dns"],
          summary: "Complete guide to DNS resolution process, all record types, and advanced troubleshooting.",
          content: `<h3>DNS Resolution Flow</h3>
<p>When you type a URL, here's what happens behind the scenes:</p>

<div class="diagram">
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Browser │───>│  OS      │───>│  Resolver│───>│ Root NS  │───>│  TLD NS  │
│  Cache   │    │  Cache   │    │ (ISP/8.8.│    │  (.)     │    │ (.com)   │
└──────────┘    └──────────┘    └────┬─────┘    └──────────┘    └────┬─────┘
                                     │                                │
                                     │    ┌───────────────────────────┘
                                     │    │
                                     │    ▼
                                     │ ┌──────────┐    ┌──────────┐
                                     └─│Authoritat│<───│  Your    │
                                       │ive NS    │    │  Domain  │
                                       └──────────┘    └──────────┘
</div>

<h3>Complete DNS Record Types</h3>
<table>
<tr><th>Type</th><th>Purpose</th><th>Example</th><th>Priority</th></tr>
<tr><td>A</td><td>IPv4 address mapping</td><td>example.com → 93.184.216.34</td><td>-</td></tr>
<tr><td>AAAA</td><td>IPv6 address mapping</td><td>example.com → 2606:2800:220:1:...</td><td>-</td></tr>
<tr><td>CNAME</td><td>Canonical name (alias)</td><td>www → example.com</td><td>-</td></tr>
<tr><td>MX</td><td>Mail exchange</td><td>10 mail.example.com</td><td>Lower = higher priority</td></tr>
<tr><td>TXT</td><td>Text records</td><td>"v=spf1 include:_spf.google.com ~all"</td><td>-</td></tr>
<tr><td>NS</td><td>Name server delegation</td><td>ns1.example.com</td><td>-</td></tr>
<tr><td>SOA</td><td>Start of Authority</td><td>Primary NS, serial, refresh times</td><td>-</td></tr>
<tr><td>PTR</td><td>Reverse DNS lookup</td><td>34.216.184.93.in-addr.arpa → example.com</td><td>-</td></tr>
<tr><td>SRV</td><td>Service location</td><td>_sip._tcp.example.com</td><td>Priority & Weight</td></tr>
<tr><td>CAA</td><td>Certificate Authority auth</td><td>0 issue "letsencrypt.org"</td><td>-</td></tr>
<tr><td>DNSKEY</td><td>DNSSEC public key</td><td>Used for zone signing</td><td>-</td></tr>
<tr><td>DS</td><td>Delegation Signer</td><td>Parent zone trusts child zone</td><td>-</td></tr>
</table>

<h3>DNS Troubleshooting Commands</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Query specific record types
dig example.com A
dig example.com AAAA
dig example.com MX +short
dig example.com TXT
dig example.com NS
dig example.com SOA

# Full DNS trace (follows entire resolution path)
dig +trace example.com

# Query specific nameserver
dig @8.8.8.8 example.com
dig @1.1.1.1 example.com

# Reverse DNS lookup
dig -x 93.184.216.34

# Check DNSSEC validation
dig example.com +dnssec

# Check DNS propagation across multiple servers
dig example.com @8.8.8.8
dig example.com @1.1.1.1
dig example.com @9.9.9.9

# Query with specific EDNS subnet (for GeoDNS testing)
dig +subnet=203.0.113.0/24 cdn.example.com

# DNS over HTTPS (DoH)
curl -H 'accept: application/dns-json' \
  'https://cloudflare-dns.com/dns-query?name=example.com&type=A'</code></pre>
</div>

<h3>Common DNS Configurations</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">/etc/resolv.conf</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Public DNS Servers
nameserver 8.8.8.8       # Google
nameserver 8.8.4.4       # Google Secondary
nameserver 1.1.1.1       # Cloudflare
nameserver 1.0.0.1       # Cloudflare Secondary
nameserver 9.9.9.9       # Quad9 (security-focused)

# Search domain suffixes
search example.com internal.example.com

# Options
options rotate timeout:2 attempts:3</code></pre>
</div>

<h3>DNS Security (DNSSEC)</h3>
<p>DNSSEC adds cryptographic signatures to DNS records to prevent spoofing and cache poisoning.</p>

<div class="code-block">
<div class="code-header">
    <span class="code-lang">bash</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code># Verify DNSSEC
dig +dnssec example.com

# Check DNSSEC chain of trust
drill -D -T example.com

# Check for DNSSEC validation errors
dig +cdflag example.com  # Disable checking

# Test DNSSEC validation
https://dnsviz.net/</code></pre>
</div>

<h3>DNS Best Practices</h3>
<ul>
<li><strong>TTL Strategy:</strong> Use short TTLs (300s) before migrations, longer (3600s) for stability</li>
<li><strong>Multiple NS:</strong> Always have at least 2 nameservers in different locations</li>
<li><strong>CNAME Chains:</strong> Avoid long CNAME chains (max 10 hops, but keep it short)</li>
<li><strong>SPF Records:</strong> Keep under 10 DNS lookups to avoid PERMERROR</li>
<li><strong>Monitor:</strong> Set up DNS monitoring with tools like Pingdom or Datadog</li>
</ul>`
        }
      ],
      "Routing": [
        {
          id: "bgp-basics",
          title: "BGP - The Internet's Routing Protocol",
          tags: ["advanced", "routing"],
          summary: "Comprehensive BGP guide covering peering, path selection, communities, and real-world configurations.",
          content: `<h3>BGP Overview</h3>
<p>BGP (Border Gateway Protocol) is the routing protocol that makes the Internet work. It's a path-vector protocol used between autonomous systems (AS).</p>

<h3>BGP Key Concepts</h3>
<table>
<tr><th>Concept</th><th>Description</th><th>Example</th></tr>
<tr><td>AS (Autonomous System)</td><td>Collection of IP networks under single administrative control</td><td>AS15169 = Google</td></tr>
<tr><td>eBGP</td><td>External BGP - between different AS</td><td>ISP to Customer</td></tr>
<tr><td>iBGP</td><td>Internal BGP - within same AS</td><td>Within ISP backbone</td></tr>
<tr><td>Prefix</td><td>IP address block advertised</td><td>203.0.113.0/24</td></tr>
<tr><td>Community</td><td>Tag for route grouping and policy</td><td>64512:100</td></tr>
</table>

<h3>BGP Session Types Comparison</h3>
<table>
<tr><th>Attribute</th><th>eBGP</th><th>iBGP</th></tr>
<tr><td>Peering</td><td>Between different AS</td><td>Within same AS</td></tr>
<tr><td>Default TTL</td><td>1 (directly connected)</td><td>255 (can be multihop)</td></tr>
<tr><td>AS Path</td><td>Local AS is prepended</td><td>AS Path unchanged</td></tr>
<tr><td>Next-Hop</td><td>Changed to local address</td><td>Preserved from eBGP</td></tr>
<tr><td>Full Mesh</td><td>Not required</td><td>Required (or use route reflector)</td></tr>
<tr><td>Loop Prevention</td><td>AS Path</td><td>Split Horizon (iBGP)</td></tr>
</table>

<h3>BGP Path Selection Algorithm (Cisco Order)</h3>
<ol>
<li><strong>Weight</strong> (highest) - Cisco-specific, local significance</li>
<li><strong>Local Preference</strong> (highest) - Used within AS for outbound traffic</li>
<li><strong>Locally originated</strong> - Prefer locally injected routes</li>
<li><strong>AS Path</strong> (shortest) - Fewer AS hops preferred</li>
<li><strong>Origin type</strong> - IGP &lt; EGP &lt; Incomplete</li>
<li><strong>MED</strong> (lowest) - Used for inbound traffic influence</li>
<li><strong>eBGP over iBGP</strong> - Prefer external paths</li>
<li><strong>IGP metric</strong> (lowest) - To reach next-hop</li>
<li><strong>Router ID</strong> (lowest) - Tie-breaker</li>
</ol>

<div class="diagram">
BGP Path Selection Example:

Route 1: [AS100 AS200 AS300]  Weight=0, LP=100, MED=10
Route 2: [AS400 AS300]        Weight=0, LP=200, MED=20
Route 3: [AS100 AS300]        Weight=10, LP=100, MED=30

Winner: Route 3 (highest Weight=10)
</div>

<h3>BGP States</h3>
<pre><code>Idle → Connect → OpenSent → OpenConfirm → Established
         ↑________↓ (on error, go to Active then retry)
</code></pre>

<h3>Basic BGP Configuration (Cisco IOS)</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">Cisco IOS</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>! Configure BGP
router bgp 64512
  bgp router-id 192.0.2.1
  neighbor 203.0.113.1 remote-as 64513
  neighbor 203.0.113.1 description "ISP-Primary"
  neighbor 203.0.113.1 password cisco123
  
  ! iBGP neighbors
  neighbor 192.0.2.2 remote-as 64512
  neighbor 192.0.2.2 update-source loopback0
  
  ! Announce prefixes
  network 198.51.100.0 mask 255.255.255.0
  
  ! Route map for outbound policy
  neighbor 203.0.113.1 route-map OUTBOUND out
  
! Route Map
route-map OUTBOUND permit 10
  match ip address prefix-list OUR-PREFIXES
  set community 64512:100

! Prefix List
ip prefix-list OUR-PREFIXES seq 5 permit 198.51.100.0/24</code></pre>
</div>

<h3>BGP Communities</h3>
<p>Communities are tags used for route grouping and applying policies:</p>

<table>
<tr><th>Community</th><th>Purpose</th></tr>
<tr><td>No Export (65535:65281)</td><td>Don't advertise to eBGP peers</td></tr>
<tr><td>No Advertise (65535:65282)</td><td>Don't advertise to any peer</td></tr>
<tr><td>Internet (0:0)</td><td>Advertise to Internet</td></tr>
<tr><td>Local AS (65535:65283)</td><td>Don't send outside local AS</td></tr>
</table>

<div class="warning-box">
<strong>Critical Security:</strong> Always implement prefix filters (ingress and egress) to prevent route hijacking. Use RPKI (Resource Public Key Infrastructure) to validate route originations. Major outages have occurred due to BGP misconfigurations - test changes in lab first!
</div>

<h3>BGP Troubleshooting</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">Cisco IOS</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>! Check BGP neighbors
show ip bgp summary
show ip bgp neighbors 203.0.113.1

! View BGP table
show ip bgp
show ip bgp 198.51.100.0/24

! Check received routes from neighbor
show ip bgp neighbors 203.0.113.1 received-routes

! Debug BGP
debug ip bgp updates

! Check path selection for prefix
show ip bgp 8.8.8.8 bestpath</code></pre>
</div>`
        },
        {
          id: "ospf-complete",
          title: "OSPF Complete Guide - Design & Troubleshooting",
          tags: ["intermediate", "routing"],
          summary: "OSPF areas, LSA types, design best practices, and real-world troubleshooting.",
          content: `<h3>OSPF Fundamentals</h3>
<p>OSPF (Open Shortest Path First) is a link-state IGP using Dijkstra's SPF algorithm. It's the most widely deployed interior gateway protocol in enterprise networks.</p>

<h3>OSPF Packet Types</h3>
<table>
<tr><th>Type</th><th>Name</th><th>Function</th></tr>
<tr><td>1</td><td>Hello</td><td>Neighbor discovery and keepalive (10s default)</td></tr>
<tr><td>2</td><td>DBD (Database Description)</td><td>Summary of LSDB during exchange</td></tr>
<tr><td>3</td><td>LSR (Link-State Request)</td><td>Request specific LSA</td></tr>
<tr><td>4</td><td>LSU (Link-State Update)</td><td>Contains full LSA information</td></tr>
<tr><td>5</td><td>LSAck (Link-State Ack)</td><td>Acknowledge received LSA</td></tr>
</table>

<h3>OSPF Neighbor States</h3>
<pre><code>Down → Init → 2-Way → ExStart → Exchange → Loading → Full

• Down: No Hello received
• Init: Hello received, but no self seen
• 2-Way: Bidirectional communication established
• ExStart: Master/Slave negotiation for DBD exchange
• Exchange: DBD packets exchanged
• Loading: LSR/LSU for missing LSAs
• Full: LSDB synchronized
</code></pre>

<h3>OSPF Area Types</h3>
<table>
<tr><th>Area Type</th><th>LSA Types Allowed</th><th>Default Route</th><th>Use Case</th></tr>
<tr><td>Standard (Backbone 0)</td><td>All (1,2,3,4,5,7)</td><td>No</td><td>Core network</td></tr>
<tr><td>Standard (Non-backbone)</td><td>1,2,3,4,5</td><td>No</td><td>Normal area</td></tr>
<tr><td>Stub</td><td>1,2,3</td><td>Yes (from ABR)</td><td>Simple remote site</td></tr>
<tr><td>Totally Stubby</td><td>1,2</td><td>Yes (from ABR)</td><td>Minimize routes</td></tr>
<tr><td>NSSA (Not-So-Stubby)</td><td>1,2,3,7</td><td>No</td><td>Need external routes</td></tr>
<tr><td>Totally NSSA</td><td>1,2,7</td><td>Yes</td><td>Best of both worlds</td></tr>
</table>

<h3>OSPF LSA (Link-State Advertisement) Types</h3>
<table>
<tr><th>Type</th><th>Name</th><td>Description</th><th>Scope</th></tr>
<tr><td>1</td><td>Router LSA</td><td>Each router's directly connected links</td><td>Area</td></tr>
<tr><td>2</td><td>Network LSA</td><td>Generated by DR on broadcast segments</td><td>Area</td></tr>
<tr><td>3</td><td>Summary LSA (IP)</td><td>Inter-area routes from ABR</td><td>Area</td></tr>
<tr><td>4</td><td>Summary LSA (ASBR)</td><td>ASBR reachability info</td><td>Area</td></tr>
<tr><td>5</td><td>External LSA</td><td>External AS routes from ASBR</td><td>All Areas</td></tr>
<tr><td>7</td><td>NSSA External</td><td>External routes in NSSA</td><td>NSSA Area</td></tr>
</table>

<h3>OSPF Design Best Practices</h3>
<ol>
<li><strong>Area Sizing:</strong> Max ~100 routers per area, max ~1000 routes per area</li>
<li><strong>Hierarchy:</strong> Always use Area 0 as backbone, connect all areas to it</li>
<li><strong>ABR Placement:</strong> Place ABRs where summarization makes sense</li>
<li><strong>Addressing:</strong> Use contiguous addressing for effective summarization</li>
<li><strong>Network Types:</strong> Use point-to-point on WAN links (no DR election)</li>
</ol>

<h3>OSPF Configuration Example</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">Cisco IOS</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>! Interface configuration
interface GigabitEthernet0/0
  ip address 10.1.1.1 255.255.255.0
  ip ospf 1 area 0
  ip ospf priority 100
  ip ospf cost 10
  ip ospf network point-to-point

! OSPF process
router ospf 1
  router-id 1.1.1.1
  
  ! Area 0 - Backbone
  network 10.1.1.0 0.0.0.255 area 0
  
  ! Area 10 - Branch office
  network 10.10.0.0 0.0.255.255 area 10
  
  ! Route summarization
  area 10 range 10.10.0.0 255.255.0.0
  
  ! Default route advertisement
  default-information originate always
  
  ! Authentication
  area 0 authentication message-digest
  area 10 authentication message-digest

! Interface authentication
interface GigabitEthernet0/0
  ip ospf message-digest-key 1 md5 cisco123</code></pre>
</div>

<h3>OSPF Troubleshooting</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">Cisco IOS</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>! Check OSPF neighbors
show ip ospf neighbor
show ip ospf neighbor detail

! Check OSPF interfaces
show ip ospf interface brief

! View OSPF database
show ip ospf database
show ip ospf database router
show ip ospf database network

! Check OSPF routes
show ip route ospf

! Debug OSPF
debug ip ospf adj
debug ip ospf events
debug ip ospf hello

! Common issues checklist:
! 1. Are interfaces in same area?
! 2. Are network types compatible?
! 3. Is authentication configured correctly?
! 4. Are Hello/Dead timers matching?
! 5. Is MTU the same on both sides?</code></pre>
</div>`
        }
      ],
      "Load Balancing": [
        {
          id: "load-balancing",
          title: "Load Balancing Deep Dive - L4 vs L7",
          tags: ["intermediate", "ha"],
          summary: "Comprehensive guide to load balancing algorithms, HAProxy, Nginx, and cloud LB services.",
          content: `<h3>Load Balancing Types</h3>
<table>
<tr><th>Type</th><th>Layer</th><th>Decisions Based On</th><th>Best For</th></tr>
<tr><td>L4 (Transport)</td><td>TCP/UDP</td><td>IP + Port</td><td>High performance, protocol-agnostic</td></tr>
<tr><td>L7 (Application)</td><td>HTTP/HTTPS</td><td>URL, Headers, Cookies</td><td>Content-based routing, SSL termination</td></tr>
<tr><td>GSLB (Global)</td><td>DNS</td><td>Geo-location, health</td><td>Multi-datacenter failover</td></tr>
</table>

<h3>Load Balancing Algorithms</h3>
<table>
<tr><th>Algorithm</th><th>How It Works</th><th>Best For</th><th>Cons</th></tr>
<tr><td>Round Robin</td><td>Sequential distribution</td><td>Equal server capacity, short requests</td><td>Ignores server load</td></tr>
<tr><td>Weighted Round Robin</td><td>Sequential with weights</td><td>Mixed server capacity</td><td>Still ignores actual load</td></tr>
<tr><td>Least Connections</td><td>Route to least loaded</td><td>Varying request duration</td><td>Connection count ≠ load</td></tr>
<tr><td>Weighted Least Connections</td><td>Least conn + weights</td><td>Mixed capacity + varying load</td><td>More complex</td></tr>
<tr><td>IP Hash</td><td>Hash of client IP</td><td>Session persistence</td><td>Uneven distribution</td></tr>
<tr><td>Consistent Hashing</td><td>Hash with minimal remapping</td><td>Cache servers</td><td>Complexity</td></tr>
<tr><td>Random</td><td>Random selection</td><td>Simple implementations</td><td>Uneven distribution</td></tr>
</table>

<h3>Nginx Load Balancer Configuration</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">nginx.conf</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>upstream backend {
    # Load balancing method
    least_conn;
    
    # Backend servers with weights
    server 10.0.1.10:8080 weight=5 max_fails=3 fail_timeout=30s;
    server 10.0.1.11:8080 weight=5 max_fails=3 fail_timeout=30s;
    server 10.0.1.12:8080 weight=3 backup;  # Backup server
    server 10.0.1.13:8080 weight=3 backup;
    
    # Keepalive connections
    keepalive 32;
    
    # Health check (Nginx Plus only)
    # health_check interval=5s fails=3 passes=2;
}

server {
    listen 80;
    server_name app.example.com;
    
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        
        # Headers for backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 5s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffer settings
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
        
        # Failover settings
        proxy_next_upstream error timeout http_502 http_503 http_504;
        proxy_next_upstream_tries 2;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}</code></pre>
</div>

<h3>HAProxy Configuration</h3>
<div class="code-block">
<div class="code-header">
    <span class="code-lang">haproxy.cfg</span>
    <button class="code-copy" onclick="copyCode(this)">Copy</button>
</div>
<pre><code>global
    maxconn 4096
    log /dev/log local0
    
defaults
    mode http
    timeout connect 5s
    timeout client 30s
    timeout server 30s
    option httplog
    option dontlognull
    option redispatch
    retries 3

frontend http_front
    bind *:80
    bind *:443 ssl crt /etc/haproxy/ssl/cert.pem alpn h2,http/1.1
    
    # Redirect HTTP to HTTPS
    redirect scheme https if !{ ssl_fc }
    
    # ACLs for path-based routing
    acl is_api path_beg /api
    acl is_static path_end .jpg .png .css .js
    
    use_backend api_servers if is_api
    use_backend static_servers if is_static
    
    default_backend web_servers

backend web_servers
    balance roundrobin
    option httpchk GET /health
    
    cookie SERVERID insert indirect nocache
    
    server web1 10.0.1.10:8080 check cookie w1 weight 5
    server web2 10.0.1.11:8080 check cookie w2 weight 5
    server web3 10.0.1.12:8080 check cookie w3 weight 3 backup

backend api_servers
    balance leastconn
    option httpchk GET /api/health
    
    server api1 10.0.2.10:8080 check
    server api2 10.0.2.11:8080 check

backend static_servers
    balance roundrobin
    server static1 10.0.3.10:8080 check
    
# Stats page
listen stats
    bind *:8404
    stats enable
    stats uri /stats
    stats refresh 10s</code></pre>
</div>

<h3>Cloud Load Balancer Comparison</h3>
<table>
<tr><th>Feature</th><th>AWS ALB</th><th>AWS NLB</th><th>GCP LB</th><th>Azure ALB</th></tr>
<tr><td>Layer</td><td>L7</td><td>L4</td><td>L4/L7/Global</td><td>L4/L7</td></tr>
<tr><td>SSL Termination</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
<tr><td>Path-based Routing</td><td>✓</td><td>✗</td><td>✓</td><td>✓</td></tr>
<tr><td>WebSocket</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
<tr><td>gRPC</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
<tr><td>Static IP</td><td>✗</td><td>✓</td><td>✓</td><td>✓</td></tr>
<tr><td>Preserve Client IP</td><td>✗</td><td>✓</td><td>✓</td><td>✓</td></tr>
</table>

<h3>Health Check Best Practices</h3>
<ul>
<li><strong>Endpoint:</strong> Use a dedicated /health endpoint that checks all dependencies</li>
<li><strong>Interval:</strong> 5-10 seconds depending on criticality</li>
<li><strong>Thresholds:</strong> 2-3 consecutive failures before marking unhealthy</li>
<li><strong>Recovery:</strong> 2-3 consecutive successes before marking healthy</li>
<li><strong>Timeout:</strong> Set lower than interval (e.g., 3s timeout with 5s interval)</li>
</ul>`
        }
      ]
    }
  }
};

// Additional content continues in next file due to size...
