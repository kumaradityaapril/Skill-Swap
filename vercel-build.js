console.log('Starting Vercel build process...');
const { execSync } = require('child_process');

// Install frontend dependencies
console.log('Installing frontend dependencies...');
execSync('cd frontend && npm install', { stdio: 'inherit' });

// Build frontend
console.log('Building frontend...');
execSync('cd frontend && npm run build', { stdio: 'inherit' });

console.log('Build completed successfully!');
