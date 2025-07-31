# Tutorial Upload ke Vercel - Skripsi Graf

Panduan lengkap untuk deploy aplikasi Skripsi Graf ke Vercel dari awal hingga berjalan sempurna.

## 📋 Persiapan Sebelum Upload

### 1. Pastikan Struktur Project Benar

Struktur folder harus seperti ini:
```
skripsi/
├── landing/           # Homepage
│   ├── index.html
│   └── styles.css
├── 3d-force-graph/    # Visualisasi 3D
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── json/          # Data JSON
├── vercel.json        # Konfigurasi Vercel
└── README.md
```

### 2. Cek File Penting

✅ **vercel.json** - Harus ada di root folder
✅ **landing/index.html** - Homepage
✅ **3d-force-graph/index.html** - Halaman visualisasi
✅ **3d-force-graph/json/*.json** - File data

## 🚀 Langkah-langkah Upload ke Vercel

### Step 1: Persiapan GitHub Repository

1. **Buat Repository Baru di GitHub**
   - Login ke [github.com](https://github.com)
   - Klik "New Repository"
   - Nama: `skripsi-graf` (atau nama lain)
   - Set ke **Public** (untuk free plan)
   - Jangan centang "Add README" (karena sudah ada)

2. **Upload Project ke GitHub**
   
   **Opsi A: Via GitHub Web (Mudah)**
   - Klik "uploading an existing file"
   - Drag & drop semua folder dan file
   - Commit dengan pesan: "Initial commit"
   
   **Opsi B: Via Git Command (Advanced)**
   ```bash
   cd "e:\Ngoding\Project IT\Trae\skripsi"
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/USERNAME/skripsi-graf.git
   git push -u origin main
   ```

### Step 2: Deploy ke Vercel

1. **Login ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Klik "Sign Up" atau "Login"
   - Pilih "Continue with GitHub"
   - Authorize Vercel untuk akses GitHub

2. **Import Project**
   - Di dashboard Vercel, klik "New Project"
   - Pilih repository `skripsi-graf`
   - Klik "Import"

3. **Configure Project Settings**
   ```
   Project Name: skripsi-graf (atau sesuai keinginan)
   Framework Preset: Other
   Root Directory: ./ (default)
   Build Command: (kosongkan)
   Output Directory: (kosongkan)
   Install Command: (kosongkan)
   ```

4. **Deploy**
   - Klik "Deploy"
   - Tunggu proses deployment (biasanya 1-2 menit)
   - Selesai! 🎉

### Step 3: Testing Deployment

1. **Akses Homepage**
   - URL: `https://your-project-name.vercel.app/`
   - Harus menampilkan landing page

2. **Test Navigasi**
   - Klik tombol "Visualisasi 3D Graf"
   - Harus redirect ke halaman 3D force graph
   - URL berubah menjadi: `https://your-project-name.vercel.app/3d-graph`

3. **Test Visualisasi**
   - Pilih wallet dari dropdown
   - Graf 3D harus muncul
   - Test interaksi (drag, zoom, click)

## 🔧 Troubleshooting

### Problem 1: "No Output Directory named 'public' found"

✅ **SUDAH DIPERBAIKI** - Error ini telah diselesaikan dengan konfigurasi berikut:

### Problem 2: 404 Error pada Route /3d-graph

**Gejala:**
- Homepage (/) berfungsi normal
- Route `/3d-graph` menampilkan "404: NOT_FOUND"
- Error ID: `sin1::xxxxx-xxxxxxxxx-xxxxxxxxxxxx`

**Penyebab:**
- Konfigurasi routing di vercel.json tidak tepat
- Path destination tidak sesuai dengan struktur folder

**Solusi yang Diterapkan:**
1. **Update vercel.json routing:**
   ```json
   {
     "rewrites": [
       {
         "source": "/",
         "destination": "/index.html"
       },
       {
         "source": "/3d-graph",
         "destination": "/3d-force-graph/"
       },
       {
         "source": "/3d-force-graph/(.*)",
         "destination": "/3d-force-graph/$1"
       }
     ],
     "cleanUrls": true,
     "trailingSlash": false
   }
   ```

2. **Verifikasi struktur folder public/:**
   ```
   public/
   ├── index.html
   ├── styles.css
   └── 3d-force-graph/
       ├── index.html
       ├── script.js
       ├── style.css
       └── json/
   ```

**Langkah Debugging:**
1. Pastikan build berhasil: `npm run build`
2. Cek struktur folder: `npm run check`
3. Re-deploy di Vercel dashboard
4. Test route: `https://your-app.vercel.app/3d-graph`

### 3. 404 Error pada Route '/3d-force-graph/' (Trailing Slash)

**Gejala:**
- Link dengan trailing slash `/3d-force-graph/` menghasilkan 404 error
- Navigation dari landing page tidak berfungsi

**Penyebab:**
- Vercel.json tidak memiliki rewrite rule untuk path dengan trailing slash
- Hanya ada rule untuk `/3d-force-graph/(.*)` yang tidak menangkap path kosong

**Solusi:**
1. **Tambahkan multiple rewrite rules di vercel.json:**
   ```json
   {
     "rewrites": [
       {
         "source": "/",
         "destination": "/index.html"
       },
       {
         "source": "/3d-graph",
         "destination": "/3d-force-graph/index.html"
       },
       {
         "source": "/3d-force-graph",
         "destination": "/3d-force-graph/index.html"
       },
       {
         "source": "/3d-force-graph/",
         "destination": "/3d-force-graph/index.html"
       },
       {
         "source": "/3d-force-graph/(.*)",
         "destination": "/3d-force-graph/$1"
       }
     ]
   }
   ```

2. **Rebuild dan redeploy:**
   ```bash
   npm run build
   npm run check
   # Push ke GitHub dan redeploy di Vercel
   ```

### 4. Persistent 404 Error - Alternative Solution dengan Routes

**Gejala:**
- Semua solusi `rewrites` masih menghasilkan 404 error
- Build berhasil tapi routing tidak berfungsi

**Penyebab:**
- Vercel mungkin tidak mengenali `rewrites` dengan benar
- Perlu menggunakan `routes` yang lebih eksplisit

**Solusi Alternatif:**
Gunakan `routes` alih-alih `rewrites` di `vercel.json`:

```json
{
  "routes": [
    {
      "src": "/3d-graph",
      "dest": "/3d-force-graph/index.html"
    },
    {
      "src": "/3d-force-graph/?$",
      "dest": "/3d-force-graph/index.html"
    },
    {
      "src": "/3d-force-graph/(.*)",
      "dest": "/3d-force-graph/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "X-Requested-With, Content-Type, Authorization" }
      ]
    }
  ],
  "regions": ["iad1"],
  "buildCommand": "npm run build",
  "outputDirectory": "public",
  "cleanUrls": true,
  "trailingSlash": false
}
```

**Struktur folder yang diharapkan:**
```
public/
├── index.html          # Landing page
├── styles.css
└── 3d-force-graph/
    ├── index.html      # 3D Graph page
    ├── script.js
    ├── style.css
    └── json/
        ├── 2PvbiHwb.json
        ├── FbpCfLxM.json
        ├── Qcsb89L6.json
        └── ndjGh8iM.json
```

**Langkah-langkah:**
1. Update `vercel.json` dengan konfigurasi `routes` di atas
2. Jalankan `npm run build`
3. Push ke GitHub dan redeploy di Vercel
4. Test route: `https://your-app.vercel.app/3d-graph`

**Solusi yang Diterapkan:**
1. **Build Script di package.json:**
   ```json
   {
     "scripts": {
       "build": "if not exist public mkdir public && xcopy /E /I /Y landing\* public\ && xcopy /E /I /Y 3d-force-graph\* public\3d-force-graph\"
     }
   }
   ```

2. **Konfigurasi vercel.json:**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "public",
     "installCommand": "npm install"
   }
   ```

3. **Struktur Folder Public:**
   ```
   public/
   ├── index.html (dari landing/)
   ├── styles.css (dari landing/)
   └── 3d-force-graph/
       ├── index.html
       ├── script.js
       ├── style.css
       └── json/
   ```

**Jika masih ada masalah:**
- Jalankan `npm run build` secara lokal untuk test
- Pastikan folder `public/` terbuat dengan benar
- Cek `npm run check` untuk verifikasi konfigurasi

### Problem 2: Blank Page saat Klik Navigasi

**Gejala:** Tombol "Visualisasi 3D Graf" mengarah ke halaman kosong

**Solusi:**
1. Cek file `vercel.json` ada di root
2. Pastikan isi `vercel.json` benar:
   ```json
   {
     "routes": [
       { "src": "/", "dest": "/landing/index.html" },
       { "src": "/3d-graph", "dest": "/3d-force-graph/index.html" }
     ],
     "headers": [
       {
         "source": "/3d-force-graph/json/(.*)",
         "headers": [
           { "key": "Access-Control-Allow-Origin", "value": "*" },
           { "key": "Access-Control-Allow-Methods", "value": "GET" }
         ]
       }
     ]
   }
   ```

### Problem 2: JSON Data Tidak Load

**Gejala:** Dropdown wallet kosong atau error saat load data

**Solusi:**
1. Pastikan folder `3d-force-graph/json/` ada
2. Cek file JSON ada: `2PvbiHwb.json`, `FbpCfLxM.json`, dll
3. Vercel otomatis handle CORS untuk static files

### Problem 3: CSS/JS Tidak Load

**Gejala:** Tampilan berantakan atau JavaScript error

**Solusi:**
1. Cek path file di HTML relatif (tidak absolute)
2. Pastikan semua file CSS/JS ter-upload
3. Cek browser console untuk error 404

### Problem 4: Custom Domain

**Untuk menggunakan domain sendiri:**
1. Di Vercel dashboard → Settings → Domains
2. Add domain yang sudah dibeli
3. Update DNS records sesuai instruksi Vercel

## 📱 Testing Checklist

Setelah deploy, test hal-hal berikut:

- [ ] Homepage load dengan benar
- [ ] Navigasi ke 3D graph berfungsi
- [ ] Tombol "Kembali ke Homepage" berfungsi
- [ ] Dropdown wallet terisi
- [ ] Data JSON load tanpa error
- [ ] Graf 3D render dengan benar
- [ ] Interaksi mouse (drag, zoom) berfungsi
- [ ] Responsive di mobile
- [ ] Loading animation muncul
- [ ] No console errors

## 🔄 Update Project

**Untuk update setelah deploy:**

1. **Edit file di GitHub**
   - Buka repository di GitHub
   - Edit file yang ingin diubah
   - Commit changes
   - Vercel otomatis re-deploy

2. **Via Git (jika pakai command line)**
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```

## 🎯 Tips Optimasi

1. **Performance**
   - Compress JSON files jika terlalu besar
   - Optimize CSS/JS files
   - Use CDN untuk libraries

2. **SEO**
   - Add meta description di HTML
   - Use proper title tags
   - Add Open Graph tags

3. **Analytics**
   - Add Google Analytics
   - Monitor performance di Vercel dashboard

## 📞 Support

Jika masih ada masalah:
1. Cek Vercel deployment logs
2. Buka browser console untuk error messages
3. Test di browser berbeda
4. Cek GitHub repository structure

---

**Selamat! Project Skripsi Graf sudah online! 🚀**

URL final: `https://your-project-name.vercel.app/`