import esbuild from 'esbuild';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entry = path.join(__dirname, 'prioritization-audit.entry.ts');
const bundleOut = path.join(__dirname, '.prioritization-audit.bundle.mjs');

await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node18',
  outfile: bundleOut,
  logLevel: 'warning',
});

await import(pathToFileURL(bundleOut).href);
