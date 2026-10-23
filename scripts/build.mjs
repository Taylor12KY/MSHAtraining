import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
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
// Self-hosted Allen Company Part 48 videos, captions and posters (each video <= 10 MB).
await cp(path.join(root, 'media'), path.join(dist, 'media'), { recursive: true });

// Version every /media reference in the course scripts with a hash of the file, so a
// re-rendered video, caption, or poster gets a new URL and is never served from cache.
async function stampMediaVersions(file) {
  const source = await readFile(file, 'utf8');
  const pattern = /(["'])\/(media\/[^"'?]+\.(?:mp4|webm|vtt|jpe?g|png|webp))\1/g;
  const versions = new Map();
  for (const [, , media] of source.matchAll(pattern)) {
    if (!versions.has(media)) {
      const contents = await readFile(path.join(dist, media));
      versions.set(media, createHash('sha256').update(contents).digest('hex').slice(0, 12));
    }
  }
  if (versions.size) {
    await writeFile(file, source.replace(pattern, (_, quote, media) => `${quote}/${media}?v=${versions.get(media)}${quote}`), 'utf8');
  }
}
for (const name of await readdir(path.join(dist, 'js'))) {
  if (name.endsWith('.js')) await stampMediaVersions(path.join(dist, 'js', name));
}

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

// Stamp every local CSS/JS/image reference with a hash of the built file so browsers
// pick up a deploy immediately instead of mixing cached and fresh scripts.
async function stampAssetVersions(html) {
  const pattern = /(href|src)="\/((?:assets|js)\/[^"?]+\.(?:css|js|svg|png|webp|jpe?g))\?v=[^"]*"/g;
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
