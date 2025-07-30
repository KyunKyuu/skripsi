// Script untuk memverifikasi kelengkapan file sebelum deploy ke Vercel
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking deployment readiness for Skripsi Graf...');
console.log('=' .repeat(50));

// File dan folder yang harus ada
const requiredFiles = [
    'vercel.json',
    'landing/index.html',
    'landing/styles.css',
    '3d-force-graph/index.html',
    '3d-force-graph/script.js',
    '3d-force-graph/style.css',
    '3d-force-graph/json/2PvbiHwb.json',
    '3d-force-graph/json/FbpCfLxM.json',
    '3d-force-graph/json/Qcsb89L6.json',
    '3d-force-graph/json/ndjGh8iM.json'
];

let allGood = true;

// Check required files
console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    const status = exists ? '✅' : '❌';
    console.log(`${status} ${file}`);
    if (!exists) allGood = false;
});

console.log('');

// Check vercel.json content
console.log('⚙️  Checking vercel.json configuration:');
if (fs.existsSync('vercel.json')) {
    try {
        const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
        
        // Check routes/rewrites
        const routes = vercelConfig.routes || vercelConfig.rewrites;
        if (routes && routes.length >= 2) {
            console.log('✅ Routes/Rewrites configuration found');
            
            const homeRoute = routes.find(r => r.source === '/' || r.src === '/');
            const graphRoute = routes.find(r => r.source === '/3d-graph' || r.src === '/3d-graph');
            
            const homeDest = homeRoute && (homeRoute.destination || homeRoute.dest);
            if (homeDest === '/index.html' || homeDest === '/landing/index.html') {
                console.log('✅ Home route configured correctly');
            } else {
                console.log('❌ Home route not configured correctly');
                allGood = false;
            }
            
            const graphDest = graphRoute && (graphRoute.destination || graphRoute.dest);
            if (graphDest === '/3d-force-graph/index.html') {
                console.log('✅ 3D graph route configured correctly');
            } else {
                console.log('❌ 3D graph route not configured correctly');
                allGood = false;
            }
        } else {
            console.log('❌ Routes/Rewrites not configured in vercel.json');
            allGood = false;
        }
        
        // Check headers for CORS
        if (vercelConfig.headers) {
            console.log('✅ CORS headers configuration found');
        } else {
            console.log('⚠️  CORS headers not configured (may cause issues)');
        }
        
    } catch (error) {
        console.log('❌ Invalid JSON in vercel.json');
        allGood = false;
    }
} else {
    console.log('❌ vercel.json not found');
    allGood = false;
}

console.log('');

// Check navigation links
console.log('🔗 Checking navigation links:');
if (fs.existsSync('landing/index.html')) {
    const landingContent = fs.readFileSync('landing/index.html', 'utf8');
    if (landingContent.includes('/3d-graph')) {
        console.log('✅ Landing page navigation configured');
    } else {
        console.log('❌ Landing page navigation not configured');
        allGood = false;
    }
}

if (fs.existsSync('3d-force-graph/index.html')) {
    const graphContent = fs.readFileSync('3d-force-graph/index.html', 'utf8');
    if (graphContent.includes('backToHome') || graphContent.includes('Kembali')) {
        console.log('✅ Back button found in 3D graph page');
    } else {
        console.log('⚠️  Back button not found in 3D graph page');
    }
}

console.log('');

// Check JSON data
console.log('📊 Checking JSON data files:');
const jsonFiles = ['2PvbiHwb.json', 'FbpCfLxM.json', 'Qcsb89L6.json', 'ndjGh8iM.json'];
jsonFiles.forEach(file => {
    const filePath = `3d-force-graph/json/${file}`;
    if (fs.existsSync(filePath)) {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            if (data.nodes && data.links) {
                console.log(`✅ ${file} - Valid graph data`);
            } else {
                console.log(`❌ ${file} - Invalid graph structure`);
                allGood = false;
            }
        } catch (error) {
            console.log(`❌ ${file} - Invalid JSON`);
            allGood = false;
        }
    }
});

console.log('');
console.log('=' .repeat(50));

if (allGood) {
    console.log('🎉 All checks passed! Ready for Vercel deployment.');
    console.log('');
    console.log('Next steps:');
    console.log('1. Upload to GitHub repository');
    console.log('2. Connect repository to Vercel');
    console.log('3. Deploy and test');
} else {
    console.log('⚠️  Some issues found. Please fix them before deployment.');
    console.log('');
    console.log('Refer to TUTORIAL_VERCEL.md for detailed instructions.');
}

console.log('');
console.log('📖 For complete tutorial, see: TUTORIAL_VERCEL.md');
console.log('🌐 Vercel: https://vercel.com');
console.log('📱 GitHub: https://github.com');