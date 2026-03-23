/**
 * This script suppresses node deprecation warnings and starts the React app.
 */
const { spawnSync } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'node_modules', 'react-scripts', 'scripts', 'start.js');

console.log('Starting app with suppressed warnings...');
console.log('Script path:', scriptPath);

const env = { 
  ...process.env, 
  NODE_NO_WARNINGS: '1',
  NODE_OPTIONS: '--no-deprecation ' + (process.env.NODE_OPTIONS || '')
};

// On Windows, if we use shell: true, we should quote the path to handle spaces
const result = spawnSync('node', [`"${scriptPath}"`], {
  stdio: 'inherit',
  env: env,
  shell: true
});

if (result.error) {
  console.error('Failed to start process:', result.error);
  process.exit(1);
}

process.exit(result.status);
