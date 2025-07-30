# Setup Custom Domain: skripsi.teguh.online

Panduan lengkap untuk mengkonfigurasi subdomain `skripsi.teguh.online` untuk project Skripsi Graf di Vercel.

## 🌐 Langkah-Langkah Setup Domain

### 1. Deploy Project ke Vercel Terlebih Dahulu

Pastikan project sudah ter-deploy di Vercel:
```bash
# Upload ke GitHub
git init
git add .
git commit -m "Initial commit: Skripsi Graf"
git branch -M main
git remote add origin https://github.com/username/skripsi-graf.git
git push -u origin main

# Deploy ke Vercel
# Buka vercel.com → Import repository → Deploy
```

### 2. Konfigurasi DNS di Provider Domain (teguh.online)

#### A. Jika menggunakan Cloudflare:
1. Login ke Cloudflare Dashboard
2. Pilih domain `teguh.online`
3. Masuk ke tab **DNS**
4. Tambahkan record baru:
   ```
   Type: CNAME
   Name: skripsi
   Target: cname.vercel-dns.com
   TTL: Auto
   Proxy status: DNS only (gray cloud)
   ```

#### B. Jika menggunakan provider lain (Namecheap, GoDaddy, dll):
1. Login ke control panel domain
2. Cari bagian **DNS Management** atau **DNS Records**
3. Tambahkan CNAME record:
   ```
   Host: skripsi
   Points to: cname.vercel-dns.com
   TTL: 3600 (atau default)
   ```

### 3. Konfigurasi Domain di Vercel

1. **Buka Vercel Dashboard**:
   - Login ke [vercel.com](https://vercel.com)
   - Pilih project "skripsi-graf"

2. **Tambah Custom Domain**:
   - Klik tab **Settings**
   - Scroll ke bagian **Domains**
   - Klik **Add Domain**
   - Masukkan: `skripsi.teguh.online`
   - Klik **Add**

3. **Verifikasi Domain**:
   - Vercel akan melakukan verifikasi otomatis
   - Tunggu hingga status berubah menjadi "Valid Configuration"
   - Proses ini bisa memakan waktu 5-60 menit

### 4. Konfigurasi SSL Certificate

Vercel akan otomatis:
- Generate SSL certificate dari Let's Encrypt
- Enable HTTPS redirect
- Setup HTTP/2

## 🔧 Troubleshooting

### Domain Tidak Bisa Diakses

1. **Cek DNS Propagation**:
   ```bash
   # Windows
   nslookup skripsi.teguh.online
   
   # Online tool
   # Buka: https://dnschecker.org
   # Input: skripsi.teguh.online
   ```

2. **Cek CNAME Record**:
   - Pastikan CNAME mengarah ke `cname.vercel-dns.com`
   - Bukan ke IP address atau domain lain

3. **Tunggu DNS Propagation**:
   - DNS propagation bisa memakan waktu 24-48 jam
   - Biasanya 15-60 menit sudah cukup

### SSL Certificate Error

1. **Tunggu Provisioning**:
   - SSL certificate butuh waktu 5-15 menit
   - Refresh halaman Vercel dashboard

2. **Cek Domain Status**:
   - Pastikan status domain "Valid Configuration"
   - Jika "Invalid Configuration", cek DNS record

## 📋 Checklist Verifikasi

- [ ] Project ter-deploy di Vercel
- [ ] CNAME record ditambahkan di DNS provider
- [ ] Domain ditambahkan di Vercel dashboard
- [ ] Status domain "Valid Configuration"
- [ ] SSL certificate aktif (HTTPS)
- [ ] Website dapat diakses di `https://skripsi.teguh.online`

## 🎯 Hasil Akhir

Setelah setup selesai:
- **Homepage**: `https://skripsi.teguh.online`
- **3D Graph**: `https://skripsi.teguh.online/3d-graph`
- **SSL**: Otomatis aktif
- **Performance**: Optimized dengan Vercel Edge Network

## 📞 Support

Jika mengalami masalah:
1. Cek [Vercel Documentation](https://vercel.com/docs/concepts/projects/custom-domains)
2. Contact support domain provider
3. Vercel Community Discord

---

**Note**: Pastikan domain `teguh.online` sudah aktif dan Anda memiliki akses ke DNS management sebelum memulai setup ini.