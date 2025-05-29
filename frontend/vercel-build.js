import { execSync } from 'child_process';

// Install dependencies and build the frontend
execSync('npm install', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });
