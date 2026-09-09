import esbuild from 'esbuild';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entry = path.join(__dirname, 'extract-review-pack.entry.ts');
const bundleOut = path.join(__dirname, '.extract-review-pack.bundle.mjs');

await esbuild.build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node18',
  outfile: bundleOut,
  logLevel: 'info',
});

await import(pathToFileURL(bundleOut).href);
