# DEPLOYMENT RULES — WAJIB DIBACA SEBELUM COMMIT

> **PENTING**: File ini berisi aturan deployment yang WAJIB diikuti oleh semua AI/LLM/developer yang bekerja di repository ini. Pelanggaran aturan ini akan menyebabkan deployment BLOCKED atau ERROR di Vercel.

---

## 1. GIT IDENTITY — WAJIB SEBELUM SETIAP COMMIT

```bash
# SELALU set git identity SEBELUM membuat commit apapun:
git config user.name "subkhanibnuaji"
git config user.email "38626293+subkhanibnuaji@users.noreply.github.com"
```

### VERIFIKASI sebelum SETIAP commit:
1. Jalankan: `git config user.name` → **harus output** `subkhanibnuaji`
2. Jalankan: `git config user.email` → **harus output** `38626293+subkhanibnuaji@users.noreply.github.com`
3. Jika **BERBEDA**, set ulang dengan perintah di atas
4. Baru kemudian lakukan `git add` dan `git commit`

### DILARANG KERAS:
- Commit dengan email selain `38626293+subkhanibnuaji@users.noreply.github.com`
- Commit dengan nama selain `subkhanibnuaji`
- Menggunakan email default system (`user@example.com`, `root@localhost`, dll)
- Skip verifikasi git config sebelum commit

**ALASAN**: Vercel Hobby plan HANYA mengizinkan deployment dari user GitHub yang terdaftar. Email `38626293+subkhanibnuaji@users.noreply.github.com` adalah noreply email resmi GitHub untuk akun ini (karena setting "Keep my email addresses private" aktif). Jika commit menggunakan email lain, deployment akan **BLOCKED** dengan error:
> "The Deployment was blocked because GitHub could not associate the committer with a GitHub user."

**Ini berlaku untuk SETIAP commit, SETIAP session, SETIAP project, tanpa terkecuali.**

---

## 2. NEXT.CONFIG — WAJIB ADA KEDUA SETTING INI

Setiap file `next.config.ts` / `next.config.js` / `next.config.mjs` **WAJIB** memiliki:

```typescript
const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  // ... config lainnya
};
```

**ALASAN**: Tanpa setting ini, Vercel akan GAGAL build jika ada TypeScript error atau ESLint warning sekecil apapun.

**JANGAN PERNAH** menghapus kedua setting ini.

---

## 3. JANGAN GABUNG "use client" DENGAN metadata EXPORT

```typescript
// ❌ SALAH - Akan error di build (Turbopack)
"use client";
import { Metadata } from "next";
export const metadata: Metadata = { title: "..." };

// ✅ BENAR - Pisahkan ke layout.tsx
// page.tsx → "use client" + komponen interaktif (tanpa metadata)
// layout.tsx → metadata export (tanpa "use client")
```

**ALASAN**: Next.js tidak mengizinkan `export const metadata` di Client Components. Metadata hanya bisa di-export dari Server Components.

---

## 4. NODE.JS VERSION

Jika ada `engines` di `package.json`, pastikan menggunakan versi yang didukung Vercel:

```json
{
  "engines": {
    "node": ">=20.x"
  }
}
```

**JANGAN** gunakan Node 18.x (sudah discontinued di Vercel).

---

## 5. CHECKLIST SEBELUM PUSH

- [ ] `git config user.name` = `subkhanibnuaji`
- [ ] `git config user.email` = `38626293+subkhanibnuaji@users.noreply.github.com`
- [ ] `next.config` punya `typescript.ignoreBuildErrors: true`
- [ ] `next.config` punya `eslint.ignoreDuringBuilds: true`
- [ ] Tidak ada `"use client"` + `metadata export` di file yang sama
- [ ] Semua module yang di-import benar-benar ada (cek path import)
- [ ] Node version >= 20.x (jika ada di package.json)

---

## 6. JIKA DEPLOYMENT MASIH BLOCKED

1. Cek apakah commit author email = `38626293+subkhanibnuaji@users.noreply.github.com`
   ```bash
   git log --format="%an <%ae>" -1
   ```
2. Jika salah, amend commit:
   ```bash
   git commit --amend --no-edit --author="subkhanibnuaji <38626293+subkhanibnuaji@users.noreply.github.com>"
   git push --force
   ```
3. Jika masih blocked, deploy manual via Vercel CLI:
   ```bash
   npx vercel --prod
   ```

---

## INFORMASI AKUN

- **Vercel Team**: Subkhan Ibnu Aji's projects (Hobby plan)
- **GitHub Username**: subkhanibnuaji
- **GitHub Noreply Email**: 38626293+subkhanibnuaji@users.noreply.github.com
- **Privacy Setting**: "Keep my email addresses private" = ON
- **Hanya 1 user** yang bisa deploy (Hobby plan limitation)
