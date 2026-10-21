# HEARTCALM Acne Water Gel — Landing Page

Landing page statis (HTML + CSS + JS murni, tanpa build step) untuk produk
**HEARTCALM Acne Water Gel**.

## Struktur

```
.
├── index.html            # Halaman utama (semua section landing page)
├── asset/                # Gambar produk, background SVG, icon, avatar testimoni
├── css/
│   ├── font.css          # @font-face Montserrat variable
│   └── style.css         # Style utama + responsive
├── js/
│   └── script.js         # Interaksi: smooth scroll, reveal, bubbles, scrollspy
└── library/              # Bootstrap 5.3.8 + Bootstrap Icons 1.13.1 (lokal)
```

## Menjalankan secara lokal

Tidak perlu server. Cukup buka `index.html` di browser, atau gunakan live server:

```bash
npx serve .
```

## Deploy ke GitHub Pages

Repo ini di-deploy lewat **Settings → Pages → Deploy from a branch → `main` / root**.

URL hasilnya: `https://<username>.github.io/<nama-repo>/`

> Panduan lengkap (langkah demi langkah, CLI maupun manual) ada di **[DEPLOY.md](DEPLOY.md)**.
> quickest way: jalankan `gh auth login`, lalu `deploy.bat`.

> Semua path aset menggunakan path relatif (`./css/...`, `../asset/...`) agar
> website tetap berjalan baik di root domain maupun di sub-folder repository.

## Catatan

- Tidak ada proses build; file yang di-commit langsung dipublish.
- `.nojekyll` disables Jekyll processing agar folder/file berawalan `_` tidak
  diabaikan oleh GitHub Pages.
- Form newsletter hanya simulasi antarmuka (tidak mengirim data ke server).
