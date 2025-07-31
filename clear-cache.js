// Script untuk clear cache dan troubleshooting deployment
const fs = require('fs');
const path = require('path');

console.log('🔄 Clearing Cache & Troubleshooting Deployment...');

// 1. Rebuild project
console.log('\n1. Rebuilding project...');
if (fs.existsSync('public')) {
    fs.rmSync('public', {recursive: true});
    console.log('   ✅ Removed old public directory');
}

fs.mkdirSync('public', {recursive: true});
fs.cpSync('landing', 'public', {recursive: true});
fs.mkdirSync('public/3d-force-graph', {recursive: true});
fs.cpSync('3d-force-graph', 'public/3d-force-graph', {recursive: true});
console.log('   ✅ Project rebuilt successfully');

// 2. Verify file structure
console.log('\n2. Verifying file structure...');
const requiredFiles = [
    'public/index.html',
    'public/3d-force-graph/index.html',
    'vercel.json'
];

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`   ✅ ${file} exists`);
    } else {
        console.log(`   ❌ ${file} missing`);
    }
});

// 3. Check vercel.json routes
console.log('\n3. Checking vercel.json routes...');
try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    if (vercelConfig.routes && vercelConfig.routes.length > 0) {
        console.log('   ✅ Routes configured:');
        vercelConfig.routes.forEach((route, index) => {
            console.log(`      ${index + 1}. ${route.src} → ${route.dest}`);
        });
    } else {
        console.log('   ❌ No routes found in vercel.json');
    }
} catch (error) {
    console.log('   ❌ Error reading vercel.json:', error.message);
}

// 4. Cache busting instructions
console.log('\n4. 🧹 CACHE CLEARING INSTRUCTIONS:');
console.log('\n   📱 BROWSER CACHE:');
console.log('   - Chrome/Edge: Ctrl+Shift+R (hard refresh)');
console.log('   - Firefox: Ctrl+F5');
console.log('   - Safari: Cmd+Shift+R');
console.log('   - Or open DevTools → Network → Disable cache');

console.log('\n   ☁️  VERCEL CACHE:');
console.log('   - Go to Vercel Dashboard → Your Project');
console.log('   - Click "Functions" tab → "Purge Everything"');
console.log('   - Or use CLI: vercel --prod --force');
console.log('   - Wait 2-3 minutes for global CDN propagation');

console.log('\n   🔧 DEPLOYMENT STEPS:');
console.log('   1. git add .');
console.log('   2. git commit -m "fix: update routing and clear cache"');
console.log('   3. git push origin main');
console.log('   4. Wait for Vercel auto-deployment');
console.log('   5. Test routes in incognito/private mode');

console.log('\n✨ Cache clearing setup complete!');
console.log('\n🔗 Test these URLs after deployment:');
console.log('   - https://your-domain.com/');
console.log('   - https://your-domain.com/3d-graph');
console.log('   - https://your-domain.com/3d-force-graph/');