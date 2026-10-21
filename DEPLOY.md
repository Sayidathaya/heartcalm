# Panduan Deploy Gratis ke GitHub Pages

Website ini **100% statis** (HTML + CSS + JS, tanpa build step, tanpa Node/npm),
sehingga bisa di-deploy **gratis** ke GitHub Pages.

> Semua path aset di `index.html` bersifat relatif (`./css/...`, `./asset/...`),
> jadi website tetap jalan baik di domain utama maupun di sub-folder repository.

---

## Ringkasan: 2 metode

| Metode | Cocok untuk | Waktu |
|---|---|---|
| **A. GitHub CLI (`gh`)** —recommended | Sudah pakai terminal | ±3 menit, otomatis |
| **B. Manual via browser** | Kalau tidak mau install CLI | ±7 menit, klik-klik |

---

## Metode A — GitHub CLI (otomatis,recommended)

Prasyarat: GitHub CLI sudah terpasang (di komputer ini **sudah ada** di
`C:\Program Files\GitHub CLI\gh.exe`) dan sudah login.

### A1. Login ke GitHub

Buka **Command Prompt / PowerShell**, lalu jalankan:

```bat
gh auth login
```

Ikuti wizard:
1. `GitHub.com` → Enter
2. `HTTPS` → Enter
3. `Login with a web browser` → Enter
4. Salin kode yang muncul, buka di browser, tempel, lalu authorize

Cek hasil login:

```bat
gh auth status
```

Kalau muncul "You are not logged into any GitHub hosts", ulangi `gh auth login`.

### A2. Jalankan skrip deploy

Dari folder project ini (`d:\testing_projek_gacor\heartcalm1`), jalankan:

```bat
deploy.bat
```

Skrip tersebut otomatis:
1. commit perubahan (jika ada)
2. membuat repo di GitHub (nama default: `heartcalm1`)
3. push branch `main`
4. mengaktifkan GitHub Pages dari branch `main` folder `/`
5. menampilkan URL websitenya

> Kalau mau nama repo berbeda, jalankan: `deploy.bat heartcalm-landing`

### A3. Cek hasilnya

```bat
gh api repos/:owner/:repo/pages --jq .html_url
```

Tunggu 1–3 menit, lalu buka:

```
https://<username>.github.io/<nama-repo>/
```

---

## Metode B — Manual via browser (tanpa CLI)

### B1. Buat repository

1. Buka https://github.com/new
2. **Owner** → pilih akun kamu
3. **Repository name** → `heartcalm1` (atau `heartcalm1.github.io` kalau mau URL tanpa sub-folder)
4. Centang **Public** (wajib, repo privat butuh GitHub Pro untuk Pages)
5. **JANGAN** centang "Add a README file", "Add .gitignore", "Choose a license" — repo sudah lokal
6. Klik **Create repository**

### B2. Push kode dari komputer

Buka terminal di folder `d:\testing_projek_gacor\heartcalm1`, jalankan (ganti `USERNAME`):

```bat
git remote add origin https://github.com/USERNAME/heartcalm1.git
git push -u origin main
```

Kalau minta password: masukkan **username** GitHub, lalu **password** = **Personal Access Token**
(bukan password biasa). Token dibuat di https://github.com/settings/tokens →
*Generate new token (classic)* → centang `repo` + `workflow` → salin tokennya.

Alternatif pakai GitHub Desktop / VS Code (button **Publish to GitHub**).

### B3. Aktifkan GitHub Pages

1. Buka repo yang baru dibuat di GitHub
2. Tab **Settings** → menu kiri **Pages**
3. Di bagian **Build and deployment**:
   - **Source**: pilih `Deploy from a branch`
   - **Branch**: `main`, folder `/` (root)
4. Klik **Save**
5. Tunggu 1–3 menit, halaman akan menampilkan:
   `Your site is live at https://USERNAME.github.io/heartcalm1/`

### B4. (Opsional) Custom domain

Di **Settings → Pages → Custom domain**, isi domain milikmu (misal `heartcalm.co.id`),
lalu tambahkan DNS TXT/ CNAME sesuai instruksi GitHub. Butuh paket GitHub Pro untuk
custom domain HTTPS, atau pakai **Cloudflare** (gratis) sebagai reverse proxy.

---

## Cara update website setelahnya

```bat
git add .
git commit -m "Update tampilan landing page"
git push
```

GitHub Pages otomatis rebuild dalam ±1 menit. Tidak perlu upload manual lagi.

---

## Alternatif hosting gratis lain

| Platform | Link | Catatan |
|---|---|---|
| Netlify | https://app.netlify.com/drop | Taruh folder, langsung jadi URL |
| Vercel | https://vercel.com/new | Import repo, framework "Other" |
| Cloudflare Pages | https://pages.cloudflare.com | Paling cepat & unlimited bandwidth |
| GitHub Pages | https://pages.github.com | Yang kita pakai di panduan ini |

---

## Checklist sebelum publish

- [x] `.nojekyll` ada di root repo (sudah ada) → mencegah Jekyll mengabaikan folder/berkas diawali `_`
- [x] Semua aset lokal (tidak ada ketergantungan CDN eksternal)
- [x] Semua path relatif (`./`) → aman di sub-folder
- [x] Tanpa `fetch()`/API → tidak butuh server
- [ ] Ganti nomor WhatsApp dummy `000000000000` di `index.html` dengan nomor asli
- [ ] Ganti email `cs@HEARTCALM.com` di `index.html` dengan email asli
- [ ] Checklist SEO: sudah ada `title`, `description`, `keywords`, favicon
