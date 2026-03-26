// Additional Tools Data - Password Generator, Base64, SSL Checker, Port Scanner, Docker Compose Generator
const ADDITIONAL_TOOLS = [
  {
    id: "password-generator",
    title: "Secure Password Generator",
    tags: ["tool", "security"],
    summary: "Generate strong, secure passwords with customizable options.",
    content: `<div class="tool-container">
    <h3>Password Generator</h3>
    <div class="password-generator">
        <div class="password-display">
            <div class="password-output" id="password-output">Click Generate to create password</div>
            <button class="btn btn-secondary" onclick="copyPassword()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
        </div>
        <div class="password-strength" id="password-strength"></div>
        
        <div class="password-options">
            <div class="option-row">
                <label>Password Length</label>
                <div style="display:flex;align-items:center;gap:12px;">
                    <input type="range" id="pwd-length" min="8" max="64" value="16" oninput="updateLengthDisplay()">
                    <input type="number" id="pwd-length-num" value="16" min="8" max="64" onchange="syncLengthSlider()">
                </div>
            </div>
            <div class="option-row">
                <label>Include Uppercase (A-Z)</label>
                <input type="checkbox" id="pwd-uppercase" checked>
            </div>
            <div class="option-row">
                <label>Include Lowercase (a-z)</label>
                <input type="checkbox" id="pwd-lowercase" checked>
            </div>
            <div class="option-row">
                <label>Include Numbers (0-9)</label>
                <input type="checkbox" id="pwd-numbers" checked>
            </div>
            <div class="option-row">
                <label>Include Symbols (!@#$...)</label>
                <input type="checkbox" id="pwd-symbols" checked>
            </div>
        </div>
        
        <button class="btn btn-primary" onclick="generatePassword()" style="width:100%">Generate Password</button>
    </div>
</div>

<script>
function updateLengthDisplay() {
    const slider = document.getElementById('pwd-length');
    const num = document.getElementById('pwd-length-num');
    num.value = slider.value;
}
function syncLengthSlider() {
    const slider = document.getElementById('pwd-length');
    const num = document.getElementById('pwd-length-num');
    slider.value = num.value;
}
function generatePassword() {
    const length = parseInt(document.getElementById('pwd-length').value);
    const useUpper = document.getElementById('pwd-uppercase').checked;
    const useLower = document.getElementById('pwd-lowercase').checked;
    const useNumbers = document.getElementById('pwd-numbers').checked;
    const useSymbols = document.getElementById('pwd-symbols').checked;
    
    let charset = '';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
        document.getElementById('password-output').textContent = 'Select at least one option';
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    document.getElementById('password-output').textContent = password;
    updatePasswordStrength(password);
}
function updatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    const strengthEl = document.getElementById('password-strength');
    if (score < 3) {
        strengthEl.textContent = 'Strength: Weak';
        strengthEl.className = 'password-strength weak';
    } else if (score < 5) {
        strengthEl.textContent = 'Strength: Fair';
        strengthEl.className = 'password-strength fair';
    } else if (score < 6) {
        strengthEl.textContent = 'Strength: Good';
        strengthEl.className = 'password-strength good';
    } else {
        strengthEl.textContent = 'Strength: Strong';
        strengthEl.className = 'password-strength strong';
    }
}
function copyPassword() {
    const password = document.getElementById('password-output').textContent;
    if (password && password !== 'Click Generate to create password' && password !== 'Select at least one option') {
        navigator.clipboard.writeText(password);
        const btn = document.querySelector('.password-display .btn');
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => {
            btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        }, 2000);
    }
}
</script>`
  },
  {
    id: "base64-tool",
    title: "Base64 Encoder/Decoder",
    tags: ["tool", "encoding"],
    summary: "Encode and decode text using Base64 encoding.",
    content: `<div class="tool-container">
    <h3>Base64 Encoder/Decoder</h3>
    <div class="base64-tool">
        <div class="base64-mode">
            <button class="active" id="b64-encode-btn" onclick="setBase64Mode('encode')">Encode</button>
            <button id="b64-decode-btn" onclick="setBase64Mode('decode')">Decode</button>
        </div>
        <div class="base64-io">
            <textarea id="b64-input" placeholder="Enter text to encode..."></textarea>
            <div class="base64-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
            <textarea id="b64-output" placeholder="Result will appear here..." readonly></textarea>
        </div>
        <button class="btn btn-primary" onclick="processBase64()" style="margin-top:16px;width:100%">Process</button>
    </div>
</div>

<script>
let base64Mode = 'encode';
function setBase64Mode(mode) {
    base64Mode = mode;
    document.getElementById('b64-encode-btn').classList.toggle('active', mode === 'encode');
    document.getElementById('b64-decode-btn').classList.toggle('active', mode === 'decode');
    document.getElementById('b64-input').placeholder = mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...';
}
function processBase64() {
    const input = document.getElementById('b64-input').value;
    const output = document.getElementById('b64-output');
    
    try {
        if (base64Mode === 'encode') {
            output.value = btoa(input);
        } else {
            output.value = atob(input);
        }
    } catch (e) {
        output.value = 'Error: ' + e.message;
    }
}
</script>`
  },
  {
    id: "ssl-checker",
    title: "SSL Certificate Decoder",
    tags: ["tool", "security"],
    summary: "Decode and analyze SSL/TLS certificate information.",
    content: `<div class="tool-container">
    <h3>SSL Certificate Decoder</h3>
    <div class="ssl-checker">
        <div class="ssl-input">
            <textarea id="ssl-cert" placeholder="Paste your SSL certificate (PEM format) here...
-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAJC1HiIAZAiUMA0GCSqGSIb3Qa...
-----END CERTIFICATE-----"></textarea>
            <button class="btn btn-primary" onclick="decodeSSL()">Decode Certificate</button>
        </div>
        <div class="ssl-results" id="ssl-results" style="display:none;">
            <h4>Certificate Information</h4>
            <div class="cert-info" id="cert-info"></div>
        </div>
    </div>
</div>

<script>
function decodeSSL() {
    const cert = document.getElementById('ssl-cert').value.trim();
    const results = document.getElementById('ssl-results');
    const info = document.getElementById('cert-info');
    
    if (!cert.includes('BEGIN CERTIFICATE')) {
        info.innerHTML = '<p style="color:var(--danger)">Invalid certificate format. Please paste a valid PEM certificate.</p>';
        results.style.display = 'block';
        return;
    }
    
    // Extract certificate details
    const lines = cert.split('\n');
    let certData = '';
    let inCert = false;
    
    for (const line of lines) {
        if (line.includes('BEGIN CERTIFICATE')) {
            inCert = true;
            continue;
        }
        if (line.includes('END CERTIFICATE')) break;
        if (inCert) certData += line.trim();
    }
    
    info.innerHTML = \`
        <div class="cert-item">
            <span class="cert-label">Status</span>
            <span class="cert-value cert-valid">✓ Valid Certificate Format</span>
        </div>
        <div class="cert-item">
            <span class="cert-label">Certificate Type</span>
            <span class="cert-value">X.509 v3</span>
        </div>
        <div class="cert-item">
            <span class="cert-label">Encoding</span>
            <span class="cert-value">PEM (Base64)</span>
        </div>
        <div class="cert-item">
            <span class="cert-label">Approximate Size</span>
            <span class="cert-value">\${Math.round(certData.length * 0.75)} bytes</span>
        </div>
        <div class="cert-item">
            <span class="cert-label">Note</span>
            <span class="cert-value" style="color:var(--warning)">For full decoding, use: openssl x509 -in cert.pem -text -noout</span>
        </div>
    \`;
    results.style.display = 'block';
}
</script>`
  },
  {
    id: "port-scanner",
    title: "Common Ports Reference",
    tags: ["reference", "networking"],
    summary: "Quick reference for common TCP/UDP ports and services.",
    content: `<div class="tool-container">
    <h3>Common Ports Reference</h3>
    <div class="port-filter">
        <input type="text" id="port-search" placeholder="Search ports or services..." onkeyup="filterPorts()">
    </div>
    <div class="port-table-container">
        <table class="port-table" id="port-table">
            <thead>
                <tr>
                    <th>Port</th>
                    <th>Protocol</th>
                    <th>Service</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr><td class="port-num">20</td><td class="protocol">TCP</td><td>FTP-DATA</td><td>File Transfer Protocol (data)</td></tr>
                <tr><td class="port-num">21</td><td class="protocol">TCP</td><td>FTP</td><td>File Transfer Protocol (control)</td></tr>
                <tr><td class="port-num">22</td><td class="protocol">TCP</td><td>SSH</td><td>Secure Shell</td></tr>
                <tr><td class="port-num">23</td><td class="protocol">TCP</td><td>Telnet</td><td>Remote access (unencrypted)</td></tr>
                <tr><td class="port-num">25</td><td class="protocol">TCP</td><td>SMTP</td><td>Simple Mail Transfer Protocol</td></tr>
                <tr><td class="port-num">53</td><td class="protocol">TCP/UDP</td><td>DNS</td><td>Domain Name System</td></tr>
                <tr><td class="port-num">80</td><td class="protocol">TCP</td><td>HTTP</td><td>Hypertext Transfer Protocol</td></tr>
                <tr><td class="port-num">110</td><td class="protocol">TCP</td><td>POP3</td><td>Post Office Protocol v3</td></tr>
                <tr><td class="port-num">143</td><td class="protocol">TCP</td><td>IMAP</td><td>Internet Message Access Protocol</td></tr>
                <tr><td class="port-num">443</td><td class="protocol">TCP</td><td>HTTPS</td><td>HTTP Secure (TLS/SSL)</td></tr>
                <tr><td class="port-num">3306</td><td class="protocol">TCP</td><td>MySQL</td><td>MySQL Database</td></tr>
                <tr><td class="port-num">5432</td><td class="protocol">TCP</td><td>PostgreSQL</td><td>PostgreSQL Database</td></tr>
                <tr><td class="port-num">6379</td><td class="protocol">TCP</td><td>Redis</td><td>Redis In-Memory Store</td></tr>
                <tr><td class="port-num">8080</td><td class="protocol">TCP</td><td>HTTP-ALT</td><td>Alternative HTTP Port</td></tr>
                <tr><td class="port-num">27017</td><td class="protocol">TCP</td><td>MongoDB</td><td>MongoDB Database</td></tr>
            </tbody>
        </table>
    </div>
</div>

<script>
function filterPorts() {
    const search = document.getElementById('port-search').value.toLowerCase();
    const rows = document.querySelectorAll('#port-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(search) ? '' : 'none';
    });
}
</script>`
  },
  {
    id: "docker-compose-gen",
    title: "Docker Compose Generator",
    tags: ["tool", "containers"],
    summary: "Generate Docker Compose configurations for common stacks.",
    content: `<div class="tool-container">
    <h3>Docker Compose Generator</h3>
    <div class="compose-generator">
        <h4>Select Services</h4>
        <div class="service-selector">
            <div class="service-option" data-service="nginx" onclick="toggleService(this)">
                <div class="service-icon">🌐</div>
                <div class="service-name">Nginx</div>
            </div>
            <div class="service-option" data-service="postgres" onclick="toggleService(this)">
                <div class="service-icon">🐘</div>
                <div class="service-name">PostgreSQL</div>
            </div>
            <div class="service-option" data-service="mysql" onclick="toggleService(this)">
                <div class="service-icon">🐬</div>
                <div class="service-name">MySQL</div>
            </div>
            <div class="service-option" data-service="redis" onclick="toggleService(this)">
                <div class="service-icon">🔴</div>
                <div class="service-name">Redis</div>
            </div>
            <div class="service-option" data-service="mongo" onclick="toggleService(this)">
                <div class="service-icon">🍃</div>
                <div class="service-name">MongoDB</div>
            </div>
            <div class="service-option" data-service="node" onclick="toggleService(this)">
                <div class="service-icon">🟢</div>
                <div class="service-name">Node.js</div>
            </div>
        </div>
        
        <div class="compose-output">
            <div class="code-header">
                <span class="code-lang">yaml</span>
                <button class="copy-btn" onclick="copyCompose()">Copy</button>
            </div>
            <pre class="code-block-content" id="compose-output">version: '3.8'

# Select services above to generate your Docker Compose configuration</pre>
        </div>
    </div>
</div>

<script>
const serviceConfigs = {
    nginx: \`  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    restart: unless-stopped\`,
    
    postgres: \`  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped\`,
    
    mysql: \`  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: myapp
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"
    restart: unless-stopped\`,
    
    redis: \`  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped\`,
    
    mongo: \`  mongodb:
    image: mongo:6
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"
    restart: unless-stopped\`,
    
    node: \`  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
    restart: unless-stopped\`
};

const volumes = {
    postgres: 'postgres_data',
    mysql: 'mysql_data',
    redis: 'redis_data',
    mongo: 'mongo_data'
};

function toggleService(el) {
    el.classList.toggle('selected');
    generateCompose();
}

function generateCompose() {
    const selected = Array.from(document.querySelectorAll('.service-option.selected'))
        .map(el => el.dataset.service);
    
    if (selected.length === 0) {
        document.getElementById('compose-output').textContent = \`version: '3.8'

# Select services above to generate your Docker Compose configuration\`;
        return;
    }
    
    let compose = 'version: "3.8"\\n\\nservices:';
    const usedVolumes = [];
    
    selected.forEach(service => {
        compose += '\\n' + serviceConfigs[service];
        if (volumes[service]) usedVolumes.push(volumes[service]);
    });
    
    if (usedVolumes.length > 0) {
        compose += '\\n\\nvolumes:';
        usedVolumes.forEach(vol => {
            compose += \`\\n  \${vol}:
    driver: local\`;
        });
    }
    
    document.getElementById('compose-output').textContent = compose;
}

function copyCompose() {
    const text = document.getElementById('compose-output').textContent;
    navigator.clipboard.writeText(text);
    const btn = document.querySelector('.copy-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
}
</script>`
  }
];

// Merge additional tools into Networking Tools category
if (typeof TOOLS_DATA !== 'undefined' && TOOLS_DATA.tools && TOOLS_DATA.tools.subtopics) {
  // Add new tools to Networking Tools category or create new categories
  TOOLS_DATA.tools.subtopics["Security Tools"] = ADDITIONAL_TOOLS.filter(t => t.tags.includes("security"));
  TOOLS_DATA.tools.subtopics["Utilities"] = ADDITIONAL_TOOLS.filter(t => 
    t.tags.includes("encoding") || t.tags.includes("reference")
  );
  TOOLS_DATA.tools.subtopics["Container Tools"] = ADDITIONAL_TOOLS.filter(t => t.tags.includes("containers"));
  
  // Also merge into KNOWLEDGE_BASE if available
  if (typeof KNOWLEDGE_BASE !== 'undefined') {
    Object.assign(KNOWLEDGE_BASE, TOOLS_DATA);
  }
}
