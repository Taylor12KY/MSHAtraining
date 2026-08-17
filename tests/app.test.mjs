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
  assert.match(html, /href="assets\/styles\.css\?v=video-standard-2"/);
  assert.match(html, /src="js\/modules-1-6\.js\?v=video-standard-2"/);
  assert.match(html, /src="js\/modules-7-13\.js\?v=video-standard-2"/);
  assert.match(html, /src="js\/site-content\.js\?v=video-standard-2"/);
  assert.match(html, /src="js\/video-library\.js\?v=video-standard-2"/);
  assert.match(html, /src="js\/app\.js\?v=video-standard-2"/);
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

test('all 26 videos are uniquely assigned and the first batch remains intact', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.firstIds = Array.from(FIRST_VIDEO_BATCH_IDS); this.preExistingIds = Array.from(PRE_EXISTING_VIDEO_IDS);')
    .runInNewContext(context);
  const ids = context.videos.map(video => video.id);
  const firstBatch = context.videos.filter(video => context.firstIds.includes(video.id));
  assert.equal(context.videos.length, 26);
  assert.equal(new Set(ids).size, 26);
  assert.ok(context.videos.every(video => video.moduleId >= 1 && video.moduleId <= 13));
  assert.ok(context.videos.every(video => video.durationSeconds > 0));
  assert.equal(firstBatch.length, 16);
  assert.equal(firstBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 11206);
});

test('all 11 pre-existing embeds use the tracked YouTube/Vimeo player system', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.preExistingIds = Array.from(PRE_EXISTING_VIDEO_IDS);')
    .runInNewContext(context);
  const preExisting = context.videos.filter(video => context.preExistingIds.includes(video.id));
  assert.equal(context.preExistingIds.length, 11);
  assert.equal(preExisting.length, 11);
  assert.equal(preExisting.filter(video => video.provider === 'vimeo').length, 1);
  assert.match(app, /function loadVimeoApi/);
  assert.match(app, /player\.setCurrentTime\(record\.watchedSeconds\)/);
  assert.match(app, /iframe\.setAttribute\('tabindex', '-1'\)/);
});

test('every site orientation requires current-plan instructor review', () => {
  for (const site of ['Boonesboro', 'Clover Bottom', 'Dix River Stone']) {
    assert.match(siteContent, new RegExp(`${site}[\\s\\S]*?current written plans`, 'i'));
  }
});
