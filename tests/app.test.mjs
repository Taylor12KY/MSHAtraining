import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');
const html = read('index.html');
const modulesPartOne = read('js/modules-1-6.js');
const modulesPartTwo = read('js/modules-7-13.js');
const modulesSource = modulesPartOne + '\n' + modulesPartTwo;
const siteContent = read('js/site-content.js');
const videoLibrary = read('js/video-library.js');
const app = read('js/app.js');

test('JavaScript files parse', () => {
  new vm.Script(modulesPartOne, { filename: 'js/modules-1-6.js' });
  new vm.Script(modulesPartTwo, { filename: 'js/modules-7-13.js' });
  new vm.Script(siteContent, { filename: 'js/site-content.js' });
  new vm.Script(videoLibrary, { filename: 'js/video-library.js' });
  new vm.Script(app, { filename: 'js/app.js' });
});

test('HTML loads external CSS, content, and app files in order', () => {
  assert.match(html, /href="assets\/styles\.css"/);
  assert.match(html, /src="js\/modules-1-6\.js"/);
  assert.match(html, /src="js\/modules-7-13\.js"/);
  assert.match(html, /src="js\/site-content\.js"/);
  assert.match(html, /src="js\/video-library\.js"/);
  assert.match(html, /src="js\/app\.js"/);
  assert.ok(html.indexOf('js/modules-1-6.js') < html.indexOf('js/modules-7-13.js'));
  assert.ok(html.indexOf('js/modules-7-13.js') < html.indexOf('js/site-content.js'));
  assert.ok(html.indexOf('js/site-content.js') < html.indexOf('js/video-library.js'));
  assert.ok(html.indexOf('js/video-library.js') < html.indexOf('js/app.js'));
  assert.doesNotMatch(html, /<style>/i);
  assert.doesNotMatch(html, /<script>\s*[^<]/i);
});

test('program contains modules 1-13 totaling exactly 32 hours', () => {
  const modules = [...modulesSource.matchAll(/\bid:\s*(\d+),\s*\n\s*title:\s*"([^"]+)",\s*\n\s*hours:\s*([\d.]+)/g)]
    .map(match => ({ id: Number(match[1]), hours: Number(match[3]) }));
  assert.deepEqual(modules.map(module => module.id), Array.from({ length: 13 }, (_, index) => index + 1));
  assert.equal(modules.reduce((sum, module) => sum + module.hours, 0), 32);
});

test('removed client-side instructor override cannot regress', () => {
  const source = html + modulesSource + siteContent + app;
  assert.doesNotMatch(source, /INSTRUCTOR_PASSWORD|instructorMode|Instructor Login/);
});

test('completion controls and record export remain present', () => {
  assert.match(app, /sanitizeState/);
  assert.match(app, /ACTIVITY_TIMEOUT_MS/);
  assert.match(app, /quizAttempts/);
  assert.match(app, /downloadTrainingRecord/);
  assert.match(app, /state\.timersDone\[m\.id\] === true/);
  assert.match(app, /Number\(state\.scores\[m\.id\]\) >= 80/);
  assert.match(app, /requiredVideosComplete\(m\.id\)/);
  assert.match(app, /Forward seeking is disabled/);
});

test('first video batch contains 16 unique, timed, module-assigned YouTube videos', () => {
  const ids = [...videoLibrary.matchAll(/\bid:\s*"([\w-]{11})"/g)].map(match => match[1]);
  const moduleIds = [...videoLibrary.matchAll(/\bmoduleId:\s*(\d+)/g)].map(match => Number(match[1]));
  const durations = [...videoLibrary.matchAll(/\bdurationSeconds:\s*(\d+)/g)].map(match => Number(match[1]));
  assert.equal(ids.length, 16);
  assert.equal(new Set(ids).size, 16);
  assert.equal(moduleIds.length, 16);
  assert.ok(moduleIds.every(id => id >= 1 && id <= 13));
  assert.equal(durations.length, 16);
  assert.ok(durations.every(seconds => seconds > 0));
  assert.equal(durations.reduce((sum, seconds) => sum + seconds, 0), 11206);
});

test('every site orientation requires current-plan instructor review', () => {
  for (const site of ['Boonesboro', 'Clover Bottom', 'Dix River Stone']) {
    assert.match(siteContent, new RegExp(`${site}[\\s\\S]*?current written plans`, 'i'));
  }
});

