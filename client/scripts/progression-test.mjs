import esbuild from 'esbuild';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
const d = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(d, '.progression-test.bundle.mjs');
await esbuild.build({ entryPoints:[path.join(d,'progression-test.entry.ts')], bundle:true, platform:'node', format:'esm', target:'node18', outfile:out, logLevel:'warning', loader:{'.webp':'text','.png':'text','.jpg':'text','.svg':'text'} });
await import(pathToFileURL(out).href);
