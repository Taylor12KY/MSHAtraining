import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRequirements, renderRequirements } from './generate-requirements.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

// Netlify bundles functions after this command runs, so the server always ships
// with completion requirements derived from the current client content.
await writeFile(path.join(root, 'netlify', 'lib', 'module-requirements.mjs'), renderRequirements(await buildRequirements()), 'utf8');

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'instructor'), { recursive: true });
await cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
await cp(path.join(root, 'js'), path.join(dist, 'js'), { recursive: true });

await build({
  entryPoints: [path.join(root, 'src', 'instructor-auth.js')],
  outfile: path.join(dist, 'js', 'instructor-auth.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  minify: true,
  sourcemap: false,
  legalComments: 'none'
});

// Stamp every local CSS/JS reference with a hash of the built file so browsers
// pick up a deploy immediately instead of mixing cached and fresh scripts.
async function stampAssetVersions(html) {
  const pattern = /(href|src)="\/((?:assets|js)\/[^"?]+\.(?:css|js))\?v=[^"]*"/g;
  const versions = new Map();
  for (const [, , file] of html.matchAll(pattern)) {
    if (!versions.has(file)) {
      const contents = await readFile(path.join(dist, file));
      versions.set(file, createHash('sha256').update(contents).digest('hex').slice(0, 12));
    }
  }
  return html.replace(pattern, (_, attribute, file) => `${attribute}="/${file}?v=${versions.get(file)}"`);
}

const publicHtml = await stampAssetVersions(await readFile(path.join(root, 'index.html'), 'utf8'));
const instructorHtml = publicHtml.replace('<body>', '<body data-instructor-preview="true">');
await writeFile(path.join(dist, 'index.html'), publicHtml, 'utf8');
await writeFile(path.join(dist, 'instructor', 'index.html'), instructorHtml, 'utf8');
