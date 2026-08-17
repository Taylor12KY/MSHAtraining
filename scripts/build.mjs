import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'instructor'), { recursive: true });
await cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true });
await cp(path.join(root, 'js'), path.join(dist, 'js'), { recursive: true });

const publicHtml = await readFile(path.join(root, 'index.html'), 'utf8');
const instructorHtml = publicHtml.replace('<body>', '<body data-instructor-preview="true">');
await writeFile(path.join(dist, 'index.html'), publicHtml, 'utf8');
await writeFile(path.join(dist, 'instructor', 'index.html'), instructorHtml, 'utf8');

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
