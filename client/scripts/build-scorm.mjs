#!/usr/bin/env node
/**
 * Builds the SCORM 1.2 deliverable: runs vite build, then zips the
 * contents of dist/ (which includes index.html, hashed assets, the
 * favicon, and the imsmanifest.xml copied from public/) into
 * rate-right.zip at the project root.
 *
 * Run with: npm run build:scorm
 *
 * The zip is intentionally rooted at dist/'s contents, NOT at a dist/
 * subfolder - SCORM LMSes expect imsmanifest.xml at the package root.
 *
 * Outside the SCORM build path, npm run build still produces a plain
 * dist/ for Render to serve.
 *
 * Uses the OS-native zip tool rather than a JS lib so we don't pull
 * a tree of transitive npm deps into the build path - that
 * combination was repeatedly tripping OneDrive sync interference on
 * Windows. Native tools: PowerShell Compress-Archive on Windows,
 * `zip -r` everywhere else (Linux, macOS, Render's build container).
 */

import { execSync } from 'node:child_process';
import { existsSync, rmSync, statSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { platform } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = resolve(__dirname, '..');
const distDir = resolve(clientDir, 'dist');
const zipPath = resolve(clientDir, '..', 'rate-right.zip');
const manifestPath = resolve(distDir, 'imsmanifest.xml');

function log(msg) {
  process.stdout.write(`[build:scorm] ${msg}\n`);
}

log('Running vite build...');
execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });

if (!existsSync(manifestPath)) {
  process.stderr.write(
    '[build:scorm] ERROR: dist/imsmanifest.xml is missing. ' +
      'Check that client/public/imsmanifest.xml exists - vite copies ' +
      'everything under public/ to the dist root on build.\n',
  );
  process.exit(1);
}

// Strip the internal Conversation Review tool + the reporting-dashboard
// mockup from the SCORM package. They build into dist for the Render
// preview (review.html, assets/review-*, and the standalone
// rate-right-dashboard.html reviewer/stakeholder collateral) but must
// never ship inside the LMS zip - the manifest points only at
// index.html, so this just removes dead weight and keeps the deliverable
// to the sim alone.
log('Stripping review tool + dashboard mockup from SCORM dist...');
rmSync(resolve(distDir, 'review.html'), { force: true });
rmSync(resolve(distDir, 'rate-right-dashboard.html'), { force: true });
const assetsDir = resolve(distDir, 'assets');
if (existsSync(assetsDir)) {
  for (const name of readdirSync(assetsDir)) {
    if (/^review-/.test(name)) rmSync(resolve(assetsDir, name), { force: true });
  }
}

// Compress-Archive refuses to overwrite without -Force; zip just
// appends. Either way, start clean so a re-run produces an exact
// snapshot of the current dist/.
if (existsSync(zipPath)) {
  rmSync(zipPath);
}

log(`Zipping ${distDir} -> ${zipPath}...`);

if (platform() === 'win32') {
  // PowerShell's Compress-Archive ships with Windows. The trailing
  // \\* on the source pulls the directory's *contents* into the zip
  // root rather than nesting them inside a dist/ folder - SCORM
  // packages must have imsmanifest.xml at the root.
  const psCommand =
    `Compress-Archive -Path '${distDir.replace(/'/g, "''")}\\*' ` +
    `-DestinationPath '${zipPath.replace(/'/g, "''")}' -Force`;
  execSync(`powershell -NoProfile -Command "${psCommand}"`, {
    stdio: 'inherit',
  });
} else {
  // `zip` is preinstalled on macOS, Linux, and Render's build image.
  // -r recursive, -q quiet. The trailing `.` zips the *contents* of
  // distDir (we cd in first) into the zip root.
  execSync(`zip -r -q "${zipPath}" .`, { cwd: distDir, stdio: 'inherit' });
}

const bytes = statSync(zipPath).size;
const mb = (bytes / (1024 * 1024)).toFixed(2);
log(`Done: rate-right.zip (${mb} MB)`);
log('Upload to your LMS, or to https://cloud.scorm.com/ for a sandbox launch.');
