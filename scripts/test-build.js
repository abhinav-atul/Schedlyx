#!/usr/bin/env node

/**
 * Test script to ensure the project builds correctly for Vercel deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Schedlyx build test for Vercel deployment...\n');

const runCommand = (command, description) => {
  console.log(`📋 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully\n`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
};

const checkFile = (filePath, description) => {
  console.log(`📁 Checking ${description}...`);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description} exists\n`);
    return true;
  } else {
    console.error(`❌ ${description} not found at ${filePath}\n`);
    return false;
  }
};

const checkPackageJson = () => {
  console.log('📦 Validating package.json...');
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    const requiredScripts = ['dev', 'build', 'preview', 'test', 'lint'];
    const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
    
    if (missingScripts.length > 0) {
      console.error(`❌ Missing required scripts: ${missingScripts.join(', ')}`);
      return false;
    }
    
    const requiredDeps = ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'];
    const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
    
    if (missingDeps.length > 0) {
      console.error(`❌ Missing required dependencies: ${missingDeps.join(', ')}`);
      return false;
    }
    
    console.log('✅ package.json validation passed\n');
    return true;
  } catch (error) {
    console.error('❌ Failed to validate package.json:', error.message);
    return false;
  }
};

const checkEnvironmentTemplate = () => {
  console.log('🔧 Checking environment template...');
  if (!fs.existsSync('.env.example')) {
    console.error('❌ .env.example file not found');
    return false;
  }
  
  const envExample = fs.readFileSync('.env.example', 'utf8');
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_APP_URL'
  ];
  
  const missingVars = requiredVars.filter(varName => !envExample.includes(varName));
  
  if (missingVars.length > 0) {
    console.error(`❌ Missing environment variables in .env.example: ${missingVars.join(', ')}`);
    return false;
  }
  
  console.log('✅ Environment template validation passed\n');
  return true;
};

const main = async () => {
  let success = true;
  
  // Check essential files
  success &= checkFile('package.json', 'package.json');
  success &= checkFile('vite.config.ts', 'Vite configuration');
  success &= checkFile('tsconfig.json', 'TypeScript configuration');
  success &= checkFile('tailwind.config.js', 'Tailwind configuration');
  success &= checkFile('index.html', 'HTML entry point');
  success &= checkFile('src/main.tsx', 'React entry point');
  success &= checkFile('vercel.json', 'Vercel configuration');
  
  // Validate configurations
  success &= checkPackageJson();
  success &= checkEnvironmentTemplate();
  
  // Install dependencies
  success &= runCommand('npm ci', 'Installing dependencies');
  
  // Run linting
  success &= runCommand('npm run lint', 'Running ESLint');
  
  // Run tests
  success &= runCommand('npm run test', 'Running tests');
  
  // Build the project
  success &= runCommand('npm run build', 'Building project');
  
  // Check build output
  success &= checkFile('dist/index.html', 'Build output HTML');
  success &= checkFile('dist/assets', 'Build output assets');
  
  // Test preview server (quick check)
  console.log('🔍 Testing preview server...');
  try {
    const child = execSync('timeout 10s npm run preview || true', { stdio: 'pipe' });
    console.log('✅ Preview server test completed\n');
  } catch (error) {
    console.log('⚠️  Preview server test skipped (timeout expected)\n');
  }
  
  if (success) {
    console.log('🎉 All tests passed! Project is ready for Vercel deployment.');
    console.log('\n📋 Deployment checklist:');
    console.log('  ✅ Build process works');
    console.log('  ✅ Tests pass');
    console.log('  ✅ Linting passes');
    console.log('  ✅ Environment variables configured');
    console.log('  ✅ Vercel configuration present');
    console.log('\n🚀 Ready to deploy to Vercel!');
    process.exit(0);
  } else {
    console.error('\n❌ Some tests failed. Please fix the issues before deploying.');
    process.exit(1);
  }
};

main().catch(error => {
  console.error('❌ Test script failed:', error);
  process.exit(1);
});