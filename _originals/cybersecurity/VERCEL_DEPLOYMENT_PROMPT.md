# PROMPT UNTUK CLAUDE CHROME - Deploy Cybersec Knowledge Base ke Vercel

## Context
Saya sudah melakukan setup untuk deploy Cybersec Knowledge Base v4.0 (FastAPI Python application) ke Vercel. Semua fitur AI chat dan Anthropic API sudah dihapus. Project ini sekarang murni Knowledge Base Management untuk cybersecurity.

File-file deployment sudah dibuat dan di-commit ke branch `claude/deploy-vercel-JnLNv`:

1. `vercel.json` - Konfigurasi Vercel deployment
2. `api/index.py` - Entry point untuk Vercel serverless function
3. `.gitignore` - Updated untuk exclude Vercel artifacts

**Repository**: https://github.com/subkhanibnuaji/cybersecurity
**Branch**: `claude/deploy-vercel-JnLNv`

## Tugas yang Perlu Diselesaikan

Tolong bantu selesaikan deployment ke Vercel dengan langkah-langkah berikut:

### 1. Import Project ke Vercel
- Login ke Vercel dashboard (https://vercel.com)
- Klik "Add New Project"
- Import dari GitHub repository: `subkhanibnuaji/cybersecurity`
- Pilih branch: `claude/deploy-vercel-JnLNv`

### 2. Configure Environment Variables di Vercel Dashboard
Tambahkan environment variables berikut di Vercel project settings:

```
APP_ENV=production
APP_HOST=0.0.0.0
APP_PORT=8000
```

**OPTIONAL (untuk threat intelligence features):**
```
OTX_API_KEY=<your_otx_api_key>
```

**NOTE:** Tidak ada ANTHROPIC_API_KEY karena fitur AI chat sudah dihapus.

### 3. Deploy Configuration Check
Pastikan Vercel mendeteksi:
- **Framework Preset**: Other (FastAPI)
- **Build Command**: (kosongkan - tidak perlu build command untuk Python)
- **Output Directory**: (kosongkan)
- **Install Command**: `pip install -r requirements.txt`
- **Root Directory**: `./` (root project)

### 4. Deploy & Verify
- Klik "Deploy" dan tunggu deployment selesai
- Vercel akan memberikan URL deployment (contoh: `https://cybersecurity-xxx.vercel.app`)
- Test endpoints berikut untuk memastikan app berjalan:

**Health Check:**
```bash
curl https://your-app.vercel.app/api/v1/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "version": "4.0.0",
  "system": "Cybersec Knowledge Base"
}
```

### 5. Test Core Functionality
Setelah deployment berhasil, test endpoints penting:

**Hash Tool:**
```bash
curl -X POST https://your-app.vercel.app/api/v1/tools/hash \
  -H "Content-Type: application/json" \
  -d '{"text": "test", "algorithm": "sha256"}'
```

**Password Analyzer:**
```bash
curl -X POST https://your-app.vercel.app/api/v1/tools/password/analyze \
  -H "Content-Type: application/json" \
  -d '{"password": "MyP@ssw0rd123!"}'
```

**OWASP Top 10:**
```bash
curl https://your-app.vercel.app/api/v1/knowledge/owasp
```

**Certifications:**
```bash
curl https://your-app.vercel.app/api/v1/knowledge/certifications
```

**Kill Chain:**
```bash
curl https://your-app.vercel.app/api/v1/knowledge/killchain
```

### 6. Troubleshooting (Jika Ada Error)

**Common Issues:**

1. **Module Import Errors**:
   - Vercel Python runtime memerlukan semua dependencies di `requirements.txt`
   - Pastikan tidak ada relative imports yang error
   - Check Vercel function logs untuk detail error

2. **Timeout Issues**:
   - Vercel free tier memiliki timeout 10 detik untuk serverless functions
   - Ini seharusnya cukup karena tidak ada AI processing

3. **Environment Variable Issues**:
   - Set manual di Project Settings > Environment Variables

4. **CORS Issues**:
   - FastAPI sudah configured dengan CORS middleware di `src/app.py`
   - Jika masih ada CORS error, update `CORS_ORIGINS` di environment variables

### 7. Production Checklist

Setelah deployment berhasil, verify:
- [ ] Health endpoint responds dengan status 200
- [ ] Security tools (hash, password analyzer, encryption) berfungsi
- [ ] Knowledge base endpoints return correct data (OWASP, certifications, killchain)
- [ ] Threat intelligence endpoints dapat fetch data
- [ ] CORS configured correctly untuk frontend integration
- [ ] Rate limiting middleware active
- [ ] Security headers present in responses

### 8. Optional: Setup Custom Domain
Jika ingin menggunakan custom domain:
- Go to Vercel Project Settings > Domains
- Add custom domain (contoh: `api.heyibnu.com` atau `cybersec.heyibnu.com`)
- Update DNS records sesuai instruksi Vercel
- Vercel akan otomatis provision SSL certificate

## Technical Notes

**Application Architecture:**
- FastAPI app dengan ASGI server
- Vercel menggunakan Python runtime untuk serverless functions
- Entry point: `api/index.py` yang import `src.app:app`
- Middleware: Rate limiting, CORS, security headers
- External APIs: OTX (optional, untuk threat intelligence)

**Available Endpoints:**
- `/api/v1/health` — Health check
- `/api/v1/tools/hash` — Hash generator
- `/api/v1/tools/hash/identify` — Hash identifier
- `/api/v1/tools/password/analyze` — Password strength analyzer
- `/api/v1/tools/encode` — Encode/decode (Base64, Hex, URL, Binary)
- `/api/v1/tools/encrypt` — AES-256-GCM encryption
- `/api/v1/tools/decrypt` — AES-256-GCM decryption
- `/api/v1/tools/ports/analyze` — Port security analysis
- `/api/v1/knowledge/owasp` — OWASP Top 10
- `/api/v1/knowledge/certifications` — Certification paths
- `/api/v1/knowledge/killchain` — Cyber Kill Chain
- `/api/v1/threat-intel/news` — Security news
- `/api/v1/threat-intel/news/search?keyword=` — Search news
- `/api/v1/threat-intel/cve/{cve_id}` — CVE lookup
- `/api/v1/threat-intel/kev` — CISA KEV

**Deployment Flow:**
```
GitHub (branch: claude/deploy-vercel-JnLNv)
    |
Vercel Build (pip install dependencies)
    |
Vercel Serverless Function (api/index.py)
    |
FastAPI App (src/app.py)
    |
Routes, Middleware, Knowledge Base & Tools
    |
Production URL
```

## Expected Output

Setelah selesai, berikan informasi berikut:
1. Vercel deployment URL
2. Status deployment (success/failed)
3. Test results dari health check dan minimal 2 endpoints lainnya
4. Any errors atau warnings yang perlu diperhatikan
5. Recommended next steps (jika ada)
