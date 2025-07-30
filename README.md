# Skripsi Graf - 3D Force-Directed Graph Visualization

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/skripsi-graf)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)

A 3D interactive graph visualization project for blockchain forensic analysis, specifically designed for analyzing wallet drain attacks on the Solana network.

## 🚀 Quick Start

### Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/skripsi-graf.git
cd skripsi-graf

# Install dependencies (optional)
npm install

# Start development server
npm run dev
# or
npx http-server . -p 3000 -o
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

## 📁 Project Structure

```
skripsi/
├── landing/                 # 🏠 Homepage
│   ├── index.html          # Main landing page
│   └── styles.css          # Landing page styles
├── 3d-force-graph/         # 📊 3D Graph Application
│   ├── index.html          # Graph visualization page
│   ├── script.js           # Main application logic
│   ├── style.css           # Graph page styles
│   └── json/               # 📄 Data files
│       ├── 2PvbiHwb.json   # Sample wallet data
│       ├── FbpCfLxM.json   # Sample wallet data
│       ├── Qcsb89L6.json   # Sample wallet data
│       └── ndjGh8iM.json   # Sample wallet data
├── vercel.json             # ⚙️ Vercel deployment configuration
├── package.json            # 📦 Project configuration
├── check-deployment.js     # ✅ Deployment readiness checker
├── TUTORIAL_VERCEL.md      # 📖 Detailed deployment guide
└── README.md               # 📚 This file
```

## Fitur Utama

### Landing Page
- **Homepage**: Halaman utama dengan desain space theme
- **Navigasi**: Tombol untuk mengakses visualisasi 3D
- **Responsive Design**: Optimized untuk berbagai ukuran layar

### 3D Force Graph
- **Visualisasi Interaktif**: Graf 3D dengan node dan link yang dapat diinteraksi
- **Analisis Forensik**: Representasi visual serangan drain wallet
- **Multiple Cases**: Support untuk berbagai kasus wallet (2PvbiHwb, FbpCfLxM, Qcsb89L6, ndjGh8iM)
- **AI Analysis**: Integrasi dengan Gemini AI untuk analisis otomatis

## Deployment ke Vercel

### 1. Persiapan Repository

```bash
# Clone atau upload project ke GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/skripsi-graf.git
git push -u origin main
```

### 2. Deploy ke Vercel

1. **Login ke Vercel**: Kunjungi [vercel.com](https://vercel.com) dan login dengan GitHub
2. **Import Project**: Klik "New Project" dan pilih repository GitHub Anda
3. **Configure Settings**:
   - Framework Preset: Other
   - Root Directory: `./` (default)
   - Build Command: (kosongkan)
   - Output Directory: (kosongkan)
4. **Deploy**: Klik "Deploy"

### 3. Konfigurasi Vercel

File `vercel.json` sudah dikonfigurasi untuk:
- **Homepage**: `/` → `/landing/index.html`
- **3D Graph**: `/3d-graph` → `/3d-force-graph/index.html`
- **CORS Headers**: Automatic CORS handling untuk JSON files
- **Static Files**: Proper routing untuk assets

### 4. Navigasi

- **Homepage**: `https://your-domain.vercel.app/`
- **3D Visualization**: `https://your-domain.vercel.app/3d-graph`
- **Direct Access**: Semua file tetap dapat diakses langsung

## Cara Penggunaan

### Landing Page
1. Buka homepage
2. Klik tombol "Visualisasi 3D Graf" untuk masuk ke halaman analisis

### 3D Force Graph
1. Pilih wallet dari dropdown
2. Tunggu data loading
3. Interaksi dengan graf:
   - **Drag**: Putar dan zoom graf
   - **Click Node**: Lihat detail node
   - **Hover**: Tooltip informasi
4. Klik "Kembali ke Homepage" untuk kembali

## Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Rendering**: Three.js, WebGL
- **Force Simulation**: D3-force-3d
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel
- **Version Control**: Git

## Troubleshooting

### CORS Issues
- File `vercel.json` sudah menghandle CORS headers
- JSON files akan otomatis accessible tanpa CORS errors

### Performance
- Gunakan browser modern dengan WebGL support
- Untuk dataset besar, pertimbangkan untuk mengoptimasi JSON files

### API Keys
- Pastikan Gemini API key valid di `script.js`
- Jangan commit API keys ke repository public

## Development

### Local Testing
```bash
# Install http-server globally
npm install -g http-server

# Serve landing page
http-server ./landing -p 8081

# Serve 3d-force-graph
http-server ./3d-force-graph -p 8082
```

### File Structure untuk Vercel
- Root directory harus berisi `vercel.json`
- Landing page di folder `landing/`
- 3D visualization di folder `3d-force-graph/`
- JSON data di `3d-force-graph/json/`

## License

MIT License - Lihat file LICENSE untuk detail lengkap.