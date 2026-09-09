import esbuild from 'esbuild';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entry = path.join(__dirname, 'audit-safe-distractors.entry.ts');
const out = path.join(__dirname, '.audit-safe-distractors.bundle.mjs');
await esbuild.build({ entryPoints: [entry], bundle: true, platform: 'node', format: 'esm', target: 'node18', outfile: out, logLevel: 'error' });
await import(pathToFileURL(out).href);
