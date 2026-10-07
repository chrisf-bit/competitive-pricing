import esbuild from 'esbuild';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entry = path.join(__dirname, 'xapi-rollback.entry.ts');
const out = path.join(__dirname, '.xapi-rollback.bundle.mjs');
await esbuild.build({ entryPoints: [entry], bundle: true, platform: 'node', format: 'esm', target: 'node18', outfile: out, logLevel: 'warning', loader: { '.webp': 'text', '.png': 'text', '.jpg': 'text', '.svg': 'text' } });
await import(pathToFileURL(out).href);
