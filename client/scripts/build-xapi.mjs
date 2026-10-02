#!/usr/bin/env node
/**
 * Builds the self-contained Tin Can / xAPI deliverable: runs vite build,
 * then zips the contents of dist/ (index.html, hashed assets, favicon,
 * and tincan.xml copied from public/) into rate-right-xapi.zip at the
 * project root.
 *
 * Run with: npm run build:xapi
 *
 * The zip is rooted at dist/'s contents (NOT a dist/ subfolder) - a Tin
 * Can LMS expects tincan.xml at the package root.
 *
 * Uses the OS-native zip tool rather than a JS lib (PowerShell
 * Compress-Archive on Windows, `zip -r` elsewhere) to avoid pulling a
 * tree of transitive deps into the build path.
 */

import { execSync } from 'node:child_process';
import { existsSync, rmSync, statSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { platform } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = resolve(__dirname, '..');
const distDir = resolve(clientDir, 'dist');
const zipPath = resolve(clientDir, '..', 'rate-right-xapi.zip');
const manifestPath = resolve(distDir, 'tincan.xml');

function log(msg) {
  process.stdout.write(`[build:xapi] ${msg}\n`);
}

log('Running vite build...');
execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });

if (!existsSync(manifestPath)) {
  process.stderr.write(
    '[build:xapi] ERROR: dist/tincan.xml is missing. Check that ' +
      'client/public/tincan.xml exists - vite copies everything under ' +
      'public/ to the dist root on build.\n',
  );
  process.exit(1);
}

// Defensive: the single-entry build should not emit any review.* output,
// but strip anything matching just in case so the learner package never
// carries the internal review tool.
rmSync(resolve(distDir, 'review.html'), { force: true });
const assetsDir = resolve(distDir, 'assets');
if (existsSync(assetsDir)) {
  for (const name of readdirSync(assetsDir)) {
    if (/^review-/.test(name)) rmSync(resolve(assetsDir, name), { force: true });
  }
}

if (existsSync(zipPath)) rmSync(zipPath);

log(`Zipping ${distDir} -> ${zipPath}...`);

if (platform() === 'win32') {
  const psCommand =
    `Compress-Archive -Path '${distDir.replace(/'/g, "''")}\\*' ` +
    `-DestinationPath '${zipPath.replace(/'/g, "''")}' -Force`;
  execSync(`powershell -NoProfile -Command "${psCommand}"`, { stdio: 'inherit' });
} else {
  execSync(`zip -r -q "${zipPath}" .`, { cwd: distDir, stdio: 'inherit' });
}

const mb = (statSync(zipPath).size / (1024 * 1024)).toFixed(2);
log(`Done: rate-right-xapi.zip (${mb} MB)`);
log('Upload to the LMS as a Tin Can / xAPI package.');
