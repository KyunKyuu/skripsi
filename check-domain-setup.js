#!/usr/bin/env node

/**
 * Domain Setup Verification Script
 * Checks if custom domain configuration is ready for skripsi.teguh.online
 */

const fs = require('fs');
const path = require('path');

console.log('🌐 Checking Custom Domain Setup for skripsi.teguh.online...');
console.log('=' .repeat(60));

// Check vercel.json configuration
function checkVercelConfig() {
  console.log('⚙️  Checking vercel.json configuration:');
  
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    // Check rewrites
    if (vercelConfig.rewrites && vercelConfig.rewrites.length > 0) {
      console.log('✅ Rewrites configuration found');
      
      const homeRoute = vercelConfig.rewrites.find(r => r.source === '/');
      const graphRoute = vercelConfig.rewrites.find(r => r.source === '/3d-graph');
      
      if (homeRoute && homeRoute.destination === '/landing/index.html') {
        console.log('✅ Home route (/) configured correctly');
      } else {
        console.log('❌ Home route (/) not configured properly');
      }
      
      if (graphRoute && graphRoute.destination === '/3d-force-graph/index.html') {
        console.log('✅ 3D graph route (/3d-graph) configured correctly');
      } else {
        console.log('❌ 3D graph route (/3d-graph) not configured properly');
      }
    } else {
      console.log('❌ No rewrites configuration found');
    }
    
    // Check headers
    if (vercelConfig.headers && vercelConfig.headers.length > 0) {
      console.log('✅ CORS headers configuration found');
    } else {
      console.log('❌ CORS headers configuration missing');
    }
    
    // Check regions
    if (vercelConfig.regions) {
      console.log(`✅ Deployment region configured: ${vercelConfig.regions.join(', ')}`);
    }
    
  } catch (error) {
    console.log('❌ vercel.json not found or invalid');
    return false;
  }
  
  return true;
}

// Check package.json homepage
function checkPackageJson() {
  console.log('\n📦 Checking package.json configuration:');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (packageJson.homepage === 'https://skripsi.teguh.online') {
      console.log('✅ Homepage URL configured for custom domain');
    } else {
      console.log(`⚠️  Homepage URL: ${packageJson.homepage}`);
      console.log('   Consider updating to: https://skripsi.teguh.online');
    }
    
    if (packageJson.name === 'skripsi-graf') {
      console.log('✅ Project name configured correctly');
    }
    
  } catch (error) {
    console.log('❌ package.json not found or invalid');
    return false;
  }
  
  return true;
}

// Check if domain setup guide exists
function checkDomainGuide() {
  console.log('\n📖 Checking domain setup documentation:');
  
  if (fs.existsSync('SETUP_CUSTOM_DOMAIN.md')) {
    console.log('✅ Custom domain setup guide available');
  } else {
    console.log('❌ Custom domain setup guide missing');
  }
  
  if (fs.existsSync('TUTORIAL_VERCEL.md')) {
    console.log('✅ Vercel deployment tutorial available');
  } else {
    console.log('❌ Vercel deployment tutorial missing');
  }
}

// Check required files for domain deployment
function checkRequiredFiles() {
  console.log('\n📁 Checking required files for deployment:');
  
  const requiredFiles = [
    'vercel.json',
    'package.json',
    'landing/index.html',
    'landing/styles.css',
    '3d-force-graph/index.html',
    '3d-force-graph/script.js',
    '3d-force-graph/style.css'
  ];
  
  let allFilesExist = true;
  
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - Missing!`);
      allFilesExist = false;
    }
  });
  
  return allFilesExist;
}

// Main execution
function main() {
  const vercelOk = checkVercelConfig();
  const packageOk = checkPackageJson();
  checkDomainGuide();
  const filesOk = checkRequiredFiles();
  
  console.log('\n' + '='.repeat(60));
  
  if (vercelOk && packageOk && filesOk) {
    console.log('🎉 Domain setup verification completed successfully!');
    console.log('\n📋 Next steps for skripsi.teguh.online:');
    console.log('1. Deploy project to Vercel');
    console.log('2. Add CNAME record: skripsi → cname.vercel-dns.com');
    console.log('3. Add domain in Vercel dashboard');
    console.log('4. Wait for SSL certificate provisioning');
    console.log('\n🌐 Expected URLs:');
    console.log('   Homepage: https://skripsi.teguh.online');
    console.log('   3D Graph: https://skripsi.teguh.online/3d-graph');
  } else {
    console.log('⚠️  Some issues found. Please fix them before deployment.');
  }
  
  console.log('\n📖 For detailed instructions, see: SETUP_CUSTOM_DOMAIN.md');
}

main();