import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');
const html = read('index.html');
const modulesPartOne = read('js/modules-1-6.js');
const modulesPartTwo = read('js/modules-7-13.js');
const modulesSource = modulesPartOne + '\n' + modulesPartTwo;
const siteContent = read('js/site-content.js');
const quizExpansions = read('js/quiz-expansions.js');
const videoLibrary = read('js/video-library.js');
const videoQuizzes = read('js/video-quizzes.js');
const app = read('js/app.js');
const instructorAuth = read('src/instructor-auth.js');
const instructorSession = read('netlify/functions/instructor-session.mjs');
const authClient = read('src/auth-client.mjs');
const supabaseServer = read('netlify/lib/supabase-server.mjs');
const recordStore = read('netlify/lib/record-store.mjs');
const instructorInvite = read('netlify/functions/instructor-invite.mjs');
const migration = read('netlify/functions/migrate-from-netlify.mjs');
const learnerProgress = read('netlify/functions/learner-progress.mjs');
const instructorRecords = read('netlify/functions/instructor-records.mjs');
const trainingRecords = read('netlify/lib/training-records.mjs');
const packageJson = read('package.json');
const netlifyConfig = read('netlify.toml');
const pnpmWorkspace = read('pnpm-workspace.yaml');
const recordLibrary = await import(pathToFileURL(path.join(root, 'netlify/lib/training-records.mjs')).href);

test('JavaScript files parse', () => {
  new vm.Script(modulesPartOne, { filename: 'js/modules-1-6.js' });
  new vm.Script(modulesPartTwo, { filename: 'js/modules-7-13.js' });
  new vm.Script(siteContent, { filename: 'js/site-content.js' });
  new vm.Script(quizExpansions, { filename: 'js/quiz-expansions.js' });
  new vm.Script(videoLibrary, { filename: 'js/video-library.js' });
  new vm.Script(videoQuizzes, { filename: 'js/video-quizzes.js' });
  new vm.Script(app, { filename: 'js/app.js' });
});

test('HTML loads external CSS, content, and app files in order', () => {
  assert.match(html, /href="\/assets\/styles\.css\?v=[\w-]+"/);
  for (const file of ['modules-1-6', 'modules-7-13', 'site-content', 'quiz-expansions', 'video-library', 'app', 'instructor-auth']) {
    assert.match(html, new RegExp(`src="/js/${file}\\.js\\?v=[\\w-]+"`), `${file}.js needs a cache-busting version`);
  }
  assert.ok(html.indexOf('js/modules-1-6.js') < html.indexOf('js/modules-7-13.js'));
  assert.ok(html.indexOf('js/modules-7-13.js') < html.indexOf('js/site-content.js'));
  assert.ok(html.indexOf('js/site-content.js') < html.indexOf('js/quiz-expansions.js'));
  assert.ok(html.indexOf('js/quiz-expansions.js') < html.indexOf('js/video-library.js'));
  assert.ok(html.indexOf('js/video-library.js') < html.indexOf('js/app.js'));
  assert.doesNotMatch(html, /<style>/i);
  assert.doesNotMatch(html, /<script>\s*[^<]/i);
});

test('Netlify build uses the repository package manager and bundles modern functions', () => {
  assert.match(netlifyConfig, /command = "pnpm run build"/);
  assert.match(netlifyConfig, /node_bundler = "esbuild"/);
  assert.match(pnpmWorkspace, /nodeLinker: hoisted/);
  assert.match(pnpmWorkspace, /allowBuilds:\s*\n\s*esbuild: true/);
});

test('branded learner experience keeps regulatory context and a clear next action', () => {
  assert.match(html, /src="\/assets\/allen-company-logo\.svg\?v=[\w-]+"/, 'logo URL is versioned so a new logo is never served from cache');
  assert.match(read('scripts/build.mjs'), /css\|js\|svg\|png/);
  const logo = read('assets/allen-company-logo.svg');
  assert.match(logo, /<path fill="#215732"/, 'ALLEN wordmark uses Allen Company green');
  assert.deepEqual([...new Set(logo.match(/fill="#[0-9a-fA-F]{6}"/g))], ['fill="#215732"'], 'the whole logo is Allen green');
  assert.doesNotMatch(logo, /<text|font-family/, 'logo lettering is outlined so it renders the same everywhere');
  assert.match(read('assets/styles.css'), /--accent: #215732;/);
  assert.match(html, /\/assets\/msha-emblem\.png/);
  assert.doesNotMatch(html, /data:image\/(webp|png);base64,/);
  assert.match(html, /The Allen Company — Serving Kentucky since 1939/);
  assert.match(html, /Mine Safety and Health Administration emblem/);
  assert.match(html, /does not imply MSHA endorsement or certification/);
  assert.match(html, /id="btn-continue-training"/);
  assert.match(app, /function continueTraining\(\)/);
  assert.match(app, /div\.addEventListener\('keydown'/);
});

test('trial-ready resources include the official miners rights handout and three site aerial views', () => {
  assert.ok(fs.existsSync(path.join(root, 'assets', 'docs', 'msha-miners-rights-trifold.pdf')));
  assert.match(modulesPartOne, /\/assets\/docs\/msha-miners-rights-trifold\.pdf/);
  assert.ok(fs.existsSync(path.join(root, 'assets', 'docs', 'msha-portland-cement-quicklime-health-alert.pdf')));
  assert.ok(fs.existsSync(path.join(root, 'assets', 'docs', 'msha-young-mine-2025-fatal-roof-fall-report.pdf')));
  assert.match(modulesPartTwo, /\/assets\/docs\/msha-portland-cement-quicklime-health-alert\.pdf/);
  assert.match(modulesPartTwo, /\/assets\/docs\/msha-young-mine-2025-fatal-roof-fall-report\.pdf/);
  assert.match(modulesPartOne, /Miners' Rights and Responsibilities Trifold/);
  assert.match(modulesPartOne, /powered-haulage-safety/);
  assert.match(modulesPartOne, /powered-haulage initiative/i);
  assert.match(modulesPartTwo, /Current First-Aid References/);
  assert.match(modulesPartTwo, /MSA ALTAIR 4X user instructions/);
  assert.equal((siteContent.match(/\$\{siteAerialPanel\(/g) || []).length, 3);
  assert.match(siteContent, /37\.9042434,-84\.2710647/);
  assert.match(siteContent, /37\.5014605,-84\.1663879/);
  assert.match(siteContent, /37\.6404113,-84\.6599655/);
  assert.match(siteContent, /Orientation aid only/);
});

test('site orientations teach common mining terminology in plain language', () => {
  const context = {};
  new vm.Script(`${siteContent}\nthis.commonTerms = COMMON_MINING_TERMS; this.commonQuestions = COMMON_TERMINOLOGY_QUESTIONS;`)
    .runInNewContext(context);
  assert.equal(context.commonTerms.length, 30);
  assert.equal(context.commonQuestions.length, 2);
  for (const term of ['Back (or roof)', 'Face', 'Header / top heading', 'Bench / benching', 'Scaling', 'Muck / mucking', 'Highwall / toe', 'Misfire', 'Ventilation control / stopping', 'Escapeway']) {
    assert.ok(context.commonTerms.some(item => item.term === term), `missing terminology card for ${term}`);
  }
  assert.equal((siteContent.match(/\$\{miningTerminologyPanel\(\)\}/g) || []).length, 3);
  assert.match(siteContent, /Knowing a definition does not authorize scaling, blasting, equipment operation, or another task/);
});

test('module 2 quiz emphasizes practical miner rights instead of deadline recall', () => {
  assert.doesNotMatch(modulesPartOne, /generally has how many days to file a discrimination complaint/);
  assert.match(modulesPartOne, /request an MSHA inspection using the available protected channels/);
});

test('program contains modules 1-13 totaling exactly 32 hours', () => {
  const modules = [...modulesSource.matchAll(/\bid:\s*(\d+),\s*\n\s*title:\s*"([^"]+)",\s*\n\s*hours:\s*([\d.]+)/g)]
    .map(match => ({ id: Number(match[1]), hours: Number(match[3]) }));
  assert.deepEqual(modules.map(module => module.id), Array.from({ length: 13 }, (_, index) => index + 1));
  assert.equal(modules.reduce((sum, module) => sum + module.hours, 0), 32);
});

test('every module and site-specific orientation has exactly 10 quiz questions', () => {
  const context = {};
  new vm.Script(`${modulesSource}\n${siteContent}\n${quizExpansions}\nthis.modules = MODULES; this.sites = SITE_CONTENT;`)
    .runInNewContext(context);
  assert.equal(context.modules.length, 13);
  assert.ok(context.modules.filter(module => module.id !== 1).every(module => module.questions.length === 10));
  assert.equal(Object.keys(context.sites).length, 3);
  assert.ok(Object.values(context.sites).every(site => site.questions.length === 10));
});

test('instructor access has no client-side shared password and learner signup cannot choose roles', () => {
  const source = html + modulesSource + siteContent + app + instructorAuth;
  assert.doesNotMatch(source, /INSTRUCTOR_PASSWORD|sharedInstructorPassword/);
  assert.match(instructorAuth, /login\(email, password\)/);
  assert.match(instructorAuth, /const user = await signup\(email, password, \{ full_name: fullName \}\)/);
  assert.match(instructorAuth, /if \(!user\.confirmedAt\)/);
  assert.doesNotMatch(instructorAuth, /signup\([^\n]*roles/);
  assert.match(instructorAuth, /authenticatedRequest\('\/api\/instructor-session'/);
});

test('learner registration follows the deployed Identity invitation policy', () => {
  assert.match(instructorAuth, /getSettings/);
  assert.match(instructorAuth, /settings\?\.disableSignup/);
  assert.match(html, /class="auth-link hidden" id="learner-show-signup"/);
  assert.match(html, /Learner accounts are invitation-only/);
  assert.match(html, /id="learner-signup-note"/);
  const config = read('src/supabase-config.mjs');
  assert.match(config, /export const LEARNER_SELF_SIGNUP = (true|false);/);
  assert.match(authClient, /return \{ disableSignup: !LEARNER_SELF_SIGNUP \};/);
  assert.match(authClient, /supabase\.auth\.signUp\(/);
  assert.match(authClient, /emailRedirectTo/);
  assert.doesNotMatch(authClient, /signUp\([\s\S]{0,200}role/, 'self sign-up never sends a role');
});

test('instructor page and every instructor endpoint check the Supabase role server-side', () => {
  assert.doesNotMatch(netlifyConfig, /Role = \[/, 'Netlify Identity role redirects no longer apply');
  assert.match(instructorAuth, /window\.location\.replace\('\/\?instructor=unauthorized'\)/);
  for (const source of [instructorSession, instructorRecords, instructorInvite]) {
    assert.match(source, /authenticatedUser\(request\)/);
    assert.match(source, /role !== 'instructor'/);
  }
  assert.match(supabaseServer, /auth\.getUser\(token\)/);
  assert.match(supabaseServer, /from\('profiles'\)\.select\('email, full_name, role'\)/);
  assert.doesNotMatch(authClient, /SECRET|service_role/i, 'the browser never sees the secret key');
  assert.match(supabaseServer, /process\.env\.SUPABASE_SECRET_KEY/);
});

test('authenticated learner progress is server-owned, validated, and durably stored', () => {
  assert.match(packageJson, /"@supabase\/supabase-js": "2\.117\.2"/);
  assert.doesNotMatch(packageJson, /@netlify\/identity/);
  assert.match(netlifyConfig, /node_bundler = "esbuild"/);
  assert.doesNotMatch(netlifyConfig, /external_node_modules/);
  assert.match(learnerProgress, /authenticatedUser\(request\)/);
  assert.match(learnerProgress, /loadRecord\(user\.id\)/);
  assert.doesNotMatch(learnerProgress, /payload\.(userId|learnerId)/);
  assert.match(learnerProgress, /mergeTrainingStates/);
  assert.match(learnerProgress, /appendAuditEvent/);
  assert.match(recordStore, /\.eq\('version', expectedVersion\)/, 'saves use optimistic concurrency');
  assert.match(trainingRecords, /MODULE_REQUIREMENTS/);
  assert.match(trainingRecords, /clean\.scores\[id\] === 100/);
  assert.match(trainingRecords, /videosComplete/);
  assert.match(app, /msha:learner-authenticated/);
  assert.match(app, /syncLearnerProgress/);
  assert.match(app, /accountStorageKey/);
});

test('server validator rejects fabricated completion and requires known video durations', () => {
  const fabricated = recordLibrary.sanitizeTrainingState({
    name: 'Test Learner',
    mine: 'Boonesboro Quarry',
    completed: Array.from({ length: 13 }, (_, index) => index + 1),
    timersDone: Object.fromEntries(Array.from({ length: 13 }, (_, index) => [index + 1, true])),
    scrollDone: Object.fromEntries(Array.from({ length: 13 }, (_, index) => [index + 1, true])),
    scores: Object.fromEntries(Array.from({ length: 13 }, (_, index) => [index + 1, 100]))
  });
  assert.deepEqual(fabricated.completed, []);

  const moduleOneWithoutVideos = recordLibrary.sanitizeTrainingState({
    mine: 'Boonesboro Quarry',
    timerElapsed: { 1: 5400 },
    timersDone: { 1: true },
    scrollDone: { 1: true },
    scores: { 1: 100 }
  });
  assert.deepEqual(moduleOneWithoutVideos.completed, []);

  const moduleOneVideos = recordLibrary.MODULE_REQUIREMENTS[1].videos;
  assert.deepEqual(Object.keys(moduleOneVideos), ['allen-m1-1', 'allen-m1-2', 'allen-m1-4', 'allen-m1-5', 'allen-m1-6', 'allen-m1-7', 'allen-m1-8', 'allen-m1-9']);
  const moduleOne = recordLibrary.sanitizeTrainingState({
    mine: 'Boonesboro Quarry',
    timerElapsed: { 1: 5400 },
    timersDone: { 1: true },
    scrollDone: { 1: true },
    scores: { 1: 100 },
    videoProgress: { 1: Object.fromEntries(Object.entries(moduleOneVideos).map(([id, seconds]) => [id, { watchedSeconds: seconds, complete: true }])) }
  });
  assert.deepEqual(moduleOne.completed, [1]);

  const missingVideos = recordLibrary.sanitizeTrainingState({
    timerElapsed: { 2: 7200 },
    timersDone: { 2: true },
    scrollDone: { 2: true },
    scores: { 2: 100 },
    videoProgress: { 2: { VEOVVx3rDyI: { watchedSeconds: 999999, complete: true } } }
  });
  assert.ok(!missingVideos.completed.includes(2));
  assert.equal(missingVideos.videoProgress[2].VEOVVx3rDyI.watchedSeconds, 528);
});

test('instructor records and signoffs require the instructor role and preserve audit identity', () => {
  assert.match(instructorRecords, /user\.role !== 'instructor'/);
  assert.match(instructorRecords, /authorization\.user\.id/);
  assert.match(instructorRecords, /authorization\.user\.email/);
  assert.match(instructorRecords, /appendAuditEvent/);
  assert.match(instructorRecords, /changedKeys/);
  assert.match(html, /id="instructor-open-records"/);
  assert.match(html, /id="instructor-records-modal"/);
  assert.match(instructorAuth, /Save Verified Signoffs/);
  assert.match(instructorAuth, /fallProtectionPractice/);
  assert.match(instructorAuth, /gasMonitorPractice/);
  assert.match(trainingRecords, /'fallProtectionPractice'/);
  assert.match(trainingRecords, /'gasMonitorPractice'/);
});

test('instructor preview is non-persistent and cannot issue completion records', () => {
  assert.match(app, /if \(instructorPreviewMode\) return;[\s\S]*?localStorage\.setItem/);
  assert.match(app, /Certificates are disabled in instructor preview/);
  assert.match(app, /Training-record exports are disabled in instructor preview/);
  assert.match(app, /Demonstration only — this score was not saved/);
  assert.match(app, /if \(instructorPreviewMode\) return quizReviewReady\(id\);/);
  assert.doesNotMatch(app, /Try Preview Again/);
  assert.doesNotMatch(app, /function renderQuizReviewPanel\(id\) \{\s*if \(instructorPreviewMode\) return;/);
  assert.match(app, /Preview Missed-Topic Review/);
  assert.match(app, /Video controls remain non-seekable/);
});

test('completion controls and record export remain present', () => {
  assert.match(app, /sanitizeState/);
  assert.match(app, /ACTIVITY_TIMEOUT_MS/);
  assert.match(app, /const QUIZ_PASSING_SCORE = 100/);
  assert.match(app, /quizAttempts/);
  assert.match(app, /downloadTrainingRecord/);
  assert.match(app, /state\.timersDone\[m\.id\] === true/);
  assert.match(app, /Number\(state\.scores\[m\.id\]\) === QUIZ_PASSING_SCORE/);
  assert.match(app, /percent === QUIZ_PASSING_SCORE/);
  assert.match(app, /requiredVideosComplete\(m\.id\)/);
  assert.match(app, /Forward seeking is disabled/);
  assert.doesNotMatch(html + app, /at least 80%|>= 80/);
});

test('missed quiz questions create a required topic-review loop before retake', () => {
  assert.match(app, /const QUIZ_REVIEW_SECTIONS = \{/);
  assert.match(app, /function getQuizReviewGuide/);
  assert.match(app, /state\.quizReview\[m\.id\] = missed\.map/);
  assert.match(app, /function renderQuizReviewPanel/);
  assert.match(app, /function markQuizReviewSectionVisited/);
  assert.match(app, /item\.reviewed = true/);
  assert.match(app, /item\.checkPassed = true/);
  assert.match(app, /function submitQuizReviewCheck/);
  assert.match(app, /Knowledge check required/);
  assert.match(app, /missed-topic review/);
  assert.match(app, /Retake Full 10-Question Quiz/);
  assert.match(app, /Pass every focused knowledge check to enable the full quiz retake/);
  assert.match(app, /function openModuleReview/);
  assert.match(app, /if \(state\.quizReview\) delete state\.quizReview\[m\.id\]/);
  assert.match(html, /answer all 10 questions correctly/i);
});


test('classroom completion requires an explicit instructor and official-record handoff', () => {
  assert.match(app, /Instructor Verification — Authenticated Record/);
  assert.match(app, /Approximately 8 hours of mine-site training/);
  assert.match(app, /MSHA Form 5000-23 or an approved alternate form/);
  assert.match(app, /recordType: 'classroom-support-record'/);
  assert.match(app, /externalVerificationRequired/);
  assert.match(app, /instructorSignoffs/);
});

test('all 158 active videos (104 embedded + 54 self-hosted) are unique and retired submissions are documented', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.firstIds = Array.from(FIRST_VIDEO_BATCH_IDS); this.secondIds = Array.from(SECOND_VIDEO_BATCH_IDS); this.thirdIds = Array.from(THIRD_VIDEO_BATCH_IDS); this.thirdSubmittedIds = Array.from(THIRD_SUBMITTED_VIDEO_IDS); this.contentDuplicates = VIDEO_CONTENT_DUPLICATES; this.preExistingIds = Array.from(PRE_EXISTING_VIDEO_IDS); this.retiredIds = RETIRED_VIDEO_IDS; this.currentIds = Array.from(CURRENT_RESOURCE_VIDEO_IDS);')
    .runInNewContext(context);
  const ids = context.videos.map(video => video.id);
  const firstBatch = context.videos.filter(video => context.firstIds.includes(video.id));
  const secondBatch = context.videos.filter(video => context.secondIds.includes(video.id));
  const thirdBatch = context.videos.filter(video => context.thirdIds.includes(video.id));
  const currentResources = context.videos.filter(video => context.currentIds.includes(video.id));
  assert.equal(context.videos.length, 158);
  assert.equal(new Set(ids).size, 158);
  assert.equal(context.videos.filter(video => video.provider === 'self').length, 54);
  assert.ok(context.videos.every(video => video.moduleId >= 1 && video.moduleId <= 13));
  assert.ok(context.videos.every(video => video.durationSeconds > 0));
  assert.equal(firstBatch.length, 13);
  assert.equal(firstBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 8395);
  assert.equal(secondBatch.length, 16);
  assert.equal(secondBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 16276);
  assert.equal(thirdBatch.length, 11);
  assert.equal(thirdBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 6155);
  assert.equal(currentResources.length, 23);
  assert.equal(currentResources.reduce((sum, video) => sum + video.durationSeconds, 0), 6511);
  assert.equal(context.thirdSubmittedIds.length, 17);
  assert.equal(ids.filter(id => id === 'X5r4upNwIGk').length, 1);
  assert.equal(ids.filter(id => id === 'yEwFZHVLsso').length, 1);
  assert.equal(ids.filter(id => id === 'TM8DYUKbjsw').length, 1);
  assert.equal(ids.filter(id => id === 'OxOwJC5wHyc').length, 1);
  assert.equal(ids.filter(id => id === 'ddermx9hJ7k').length, 0);
  assert.equal(context.contentDuplicates.ddermx9hJ7k, 'X5r4upNwIGk');
  assert.equal(ids.filter(id => id === 'MziZesbb32Q').length, 0);
  assert.equal(ids.filter(id => id === 'W4uQqiHnXUI').length, 0);
  assert.equal(ids.filter(id => id === 'xtb61bDBc6o').length, 0);
  assert.equal(ids.filter(id => id === 'v26fTGBEi9E').length, 0);
  assert.equal(ids.filter(id => id === 'Veayb1NucTA').length, 0);
  assert.ok(ids.includes('zM3R_1JceWo'));
  assert.match(context.retiredIds.Veayb1NucTA, /unavailable|replaced|zM3R_1JceWo/i);
  assert.match(context.retiredIds.MziZesbb32Q, /Replaced/);
  assert.match(context.retiredIds.W4uQqiHnXUI, /Retired/);
  assert.match(context.retiredIds.xtb61bDBc6o, /Replaced/);
  assert.match(context.retiredIds.v26fTGBEi9E, /Replaced/);
  assert.match(context.retiredIds.Z33qMr0CobM, /instructor request|Spanish/);
  assert.equal(ids.filter(id => id === 'Z33qMr0CobM').length, 0);
  assert.equal(ids.filter(id => id === 'AU07-U96dfw').length, 0);
  assert.match(context.retiredIds['AU07-U96dfw'], /Module 3|Powtoon|Cleveland/i);
  assert.ok(ids.includes('WTKCluA6lgE'));
  assert.ok(ids.includes('106597590'));
  assert.ok(ids.includes('1JfkPpr6sRM'));
  assert.equal(ids.filter(id => id === 'zfuxPqg3z38').length, 0);
  assert.equal(ids.filter(id => id === 'ZhTZKsI3-eY').length, 0);
  for (const id of ['DfiBLI8lGM8', 'oJ834e9wDQ4', 'zM3R_1JceWo']) assert.ok(ids.includes(id));
  for (const id of ['Ka9UKa_xYNU', 'b7mhJ8viccI']) {
    assert.ok(!ids.includes(id), `${id} is retired and must not be required`);
    assert.ok(context.retiredIds[id], `${id} needs a documented retirement reason`);
  }
});

test('current respirator, cleanup, hearing, blind-area, and task-analysis lessons are present', () => {
  assert.match(modulesPartOne, /NIOSH blind-area diagrams/);
  assert.match(modulesPartOne, /not maps for Allen Company Cat 980M\/988-class loaders/);
  assert.match(modulesPartTwo, /3M N95 particulate respirator with a Cool Flow valve/);
  assert.match(modulesPartTwo, /fit test for that exact make, model, style, and size/);
  assert.match(modulesPartTwo, /user seal check every time/);
  assert.match(modulesPartTwo, /3M 6200 \/ 07025 medium half facepiece/);
  assert.match(modulesPartTwo, /facepiece without the correct filters provides no respiratory protection/);
  assert.match(modulesPartTwo, /R- or P-series filter/);
  assert.match(modulesPartTwo, /Avoid dry sweeping and compressed-air cleanup/);
  assert.match(modulesPartTwo, /Roll–Pull–Hold/);
  assert.match(modulesPartTwo, /Build the Safe Work Procedure Before the Work Starts/);
  assert.match(modulesPartTwo, /This exercise is not task authorization/);
});

test('mine-gas training teaches trainee response, gas limits, and supervisor-only detector operation', () => {
  assert.match(modulesPartTwo, /supervisors—not new-miner trainees—carry and operate the MSA ALTAIR 4X/);
  assert.match(modulesPartTwo, /Stop → Warn → Withdraw → Report/);
  assert.match(modulesPartTwo, /at least <strong>19\.5% oxygen/);
  assert.match(modulesPartTwo, /50 ppm TWA/);
  assert.match(modulesPartTwo, /5,000 ppm TWA/);
  assert.match(modulesPartTwo, /10 ppm TWA/);
  assert.match(modulesPartTwo, /MSHA ceiling reference: <strong>5 ppm/);
  assert.match(modulesPartTwo, /methane.*5–15% by volume/is);
  assert.match(modulesPartTwo, /typical four-gas unit does <strong>not<\/strong> detect every possible hazard/);
  assert.match(modulesPartTwo, /do not become a second victim/);
  assert.match(instructorAuth, /Supervisor-led ALTAIR 4X orientation/);
  assert.match(videoLibrary, /Supervisors operate the company detector/);
});

test('module videos use a complete instructional sequence with transitions', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.sequences = MODULE_VIDEO_SEQUENCE; this.transitions = VIDEO_SEQUENCE_TRANSITIONS;')
    .runInNewContext(context);
  for (const [moduleId, sequence] of Object.entries(context.sequences)) {
    const assignedIds = context.videos.filter(video => video.moduleId === Number(moduleId)).map(video => video.id);
    assert.equal(sequence.length, assignedIds.length, `Module ${moduleId} sequence length differs from its assigned videos`);
    assert.deepEqual([...sequence].sort(), [...assignedIds].sort(), `Module ${moduleId} sequence omits or duplicates a video`);
    assert.ok(sequence.slice(1).every(id => context.transitions[id]), `Module ${moduleId} is missing transition language`);
  }
  assert.match(app, /groupContainer\.appendChild\(box\)/);
  assert.match(app, /requiredVideoTransition/);
});

test('required video time fits within each assigned module', () => {
  const context = {};
  new vm.Script(`${modulesSource}\n${videoLibrary}\nthis.modules = MODULES; this.videos = REQUIRED_VIDEOS;`)
    .runInNewContext(context);
  for (const module of context.modules) {
    const videoSeconds = context.videos
      .filter(video => video.moduleId === module.id)
      .reduce((sum, video) => sum + video.durationSeconds, 0);
    assert.ok(videoSeconds <= module.hours * 3600, `Module ${module.id} has more video time than credited time`);
  }
});

test('client and server require the same active videos and verified durations', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS;').runInNewContext(context);
  for (const moduleId of Object.keys(recordLibrary.MODULE_REQUIREMENTS).map(Number)) {
    const clientVideos = Object.fromEntries(context.videos
      .filter(video => video.moduleId === moduleId)
      .map(video => [video.id, video.durationSeconds]));
    assert.deepEqual(clientVideos, recordLibrary.MODULE_REQUIREMENTS[moduleId].videos, `Module ${moduleId} client/server video requirements differ`);
  }
});

test('server seat-time requirements are generated from client module hours', async () => {
  const context = {};
  new vm.Script(`${modulesSource}\nthis.modules = MODULES;`).runInNewContext(context);
  assert.deepEqual(Object.keys(recordLibrary.MODULE_REQUIREMENTS).map(Number), [...context.modules].map(module => module.id));
  for (const module of context.modules) {
    const instructorMinutes = module.instructorLed?.minutes || 0;
    assert.equal(recordLibrary.MODULE_REQUIREMENTS[module.id].seconds, Math.round(module.hours * 3600 - instructorMinutes * 60), `Module ${module.id} server seat time differs from client hours`);
  }
  const generator = await import(pathToFileURL(path.join(root, 'scripts/generate-requirements.mjs')).href);
  assert.equal(read('netlify/lib/module-requirements.mjs'), generator.renderRequirements(await generator.buildRequirements()),
    'netlify/lib/module-requirements.mjs is stale; run pnpm run requirements');
  assert.match(read('scripts/build.mjs'), /renderRequirements\(await buildRequirements\(\)\)/);
});

test('recorded completions survive later changes to module hours or required videos', () => {
  const { MODULE_REQUIREMENTS, mergeTrainingStates, sanitizeTrainingState, trainingSummary } = recordLibrary;
  // Stored record from before Module 4 grew and Module 13's server cap was fixed: seat time
  // was credited against the old, shorter requirements and the server marked both complete.
  const storedState = {
    name: 'Test Miner',
    mine: 'Boonesboro Quarry',
    completed: [4, 13],
    scores: { 4: 100, 13: 100 },
    timersDone: { 4: true, 13: true },
    timerElapsed: { 4: 7200, 13: 1800 },
    scrollDone: { 4: true, 13: true }
  };
  assert.ok(MODULE_REQUIREMENTS[4].seconds > 7200 && MODULE_REQUIREMENTS[13].seconds > 1800);
  const merged = mergeTrainingStates(storedState, { name: 'Test Miner', mine: 'Boonesboro Quarry' });
  assert.deepEqual(merged.completed, [4, 13]);
  assert.equal(merged.timerElapsed[4], 7200, 'actual seat time is still reported honestly');
  assert.deepEqual(mergeTrainingStates(merged, {}).completed, [4, 13], 'completion stays locked across later syncs');
  assert.equal(trainingSummary(merged).completedModules, 2);

  // A browser cannot claim completion on its own: untrusted payloads are always rechecked.
  assert.deepEqual(sanitizeTrainingState({ ...storedState, completed: [4, 13] }).completed, []);
  assert.deepEqual(mergeTrainingStates({}, storedState).completed, []);

  // Changing work location still resets the site-specific Module 1.
  const siteDone = { mine: 'Boonesboro Quarry', completed: [1], scores: { 1: 100 } };
  assert.deepEqual(mergeTrainingStates(siteDone, { mine: 'Dix River Stone' }).completed, []);

  assert.match(app, /candidate\.completed\.includes\(id\) &&\s*clean\.scores\[id\] === QUIZ_PASSING_SCORE/);
});

test('server keeps progress for every client-required video across a sync round-trip', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS;').runInNewContext(context);
  const videoProgress = {};
  for (const video of context.videos) {
    videoProgress[video.moduleId] ||= {};
    videoProgress[video.moduleId][video.id] = { watchedSeconds: video.durationSeconds, complete: true, updatedAt: '2026-01-01T00:00:00.000Z' };
  }
  const clean = recordLibrary.sanitizeTrainingState({ name: 'Test Miner', mine: 'Boonesboro Quarry', videoProgress });
  for (const video of context.videos) {
    assert.equal(clean.videoProgress[video.moduleId]?.[video.id]?.complete, true, `${video.id} progress was dropped by the server`);
  }
});

test('every required video has trainee guidance shown before playback', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.guidance = VIDEO_TRAINING_GUIDANCE;')
    .runInNewContext(context);
  assert.equal(Object.keys(context.guidance).length, context.videos.length);
  assert.ok(context.videos.every(video => context.guidance[video.id]?.focus));
  assert.match(app, /function requiredVideoTrainingMemo/);
  assert.match(app, /frame\.insertAdjacentHTML\('beforebegin', requiredVideoTrainingMemo\(video\)\)/);
  assert.match(app, /Keep in perspective:/);
});

test('Sago and Granite Mountain guidance frames the intended case-study lessons', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.guidance = VIDEO_TRAINING_GUIDANCE;')
    .runInNewContext(context);
  const sago = `${context.guidance.IGb20ZDbjkY.focus} ${context.guidance.IGb20ZDbjkY.scope}`;
  const granite = `${context.guidance.kjCsEVjRrlg.focus} ${context.guidance.kjCsEVjRrlg.scope}`;
  assert.match(sago, /MSHA|command center/i);
  assert.match(sago, /self-rescue/i);
  assert.match(sago, /barricading/i);
  assert.match(granite, /ventilation/i);
  assert.match(granite, /carbon monoxide/i);
  assert.match(granite, /escape/i);
});

test('Sunshine Mine guidance explains its regulatory legacy', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.guidance = VIDEO_TRAINING_GUIDANCE;')
    .runInNewContext(context);
  const sunshine = `${context.guidance.WTKCluA6lgE.focus} ${context.guidance.WTKCluA6lgE.scope}`;
  assert.match(sunshine, /catalyst/i);
  assert.match(sunshine, /1977/);
  assert.match(sunshine, /MSHA/);
  assert.match(sunshine, /evacuation/i);
  assert.match(sunshine, /ventilation/i);
});

test('all 8 retained pre-existing embeds use the tracked managed player system', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.preExistingIds = Array.from(PRE_EXISTING_VIDEO_IDS);')
    .runInNewContext(context);
  const preExisting = context.videos.filter(video => context.preExistingIds.includes(video.id));
  assert.equal(context.preExistingIds.length, 8);
  assert.equal(preExisting.length, 8);
  assert.equal(preExisting.filter(video => video.provider === 'vimeo').length, 0);
  assert.ok(preExisting.every(video => video.provider !== 'vimeo'));
  assert.doesNotMatch(videoLibrary, /98555798/);
  assert.match(videoLibrary, /AU07-U96dfw/);
  assert.match(app, /function loadVimeoApi/);
  assert.match(app, /player\.setCurrentTime\(record\.watchedSeconds\)/);
  assert.match(app, /iframe\.setAttribute\('tabindex', '-1'\)/);
});

test('Module 3 sequence is Sunshine sting, Sunshine, Cleveland Potash W65, 1980 NCB filter self-rescuer, Arrowsmith extended lesson, then the Allen W65 lessons', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.sequences = MODULE_VIDEO_SEQUENCE; this.guidance = VIDEO_TRAINING_GUIDANCE;')
    .runInNewContext(context);
  assert.deepEqual([...context.sequences[3]], ['kbHxdV_uZV8', 'WTKCluA6lgE', '106597590', '1JfkPpr6sRM', 'tAE5lPOPm8w', 'allen-m3-1', 'allen-m3-2']);
  const cleveland = context.videos.find(video => video.id === '106597590');
  assert.equal(cleveland.provider, 'vimeo');
  assert.equal(cleveland.durationSeconds, 332);
  assert.match(cleveland.title, /Cleveland Potash/);
  const ncb = context.videos.find(video => video.id === '1JfkPpr6sRM');
  assert.equal(ncb.durationSeconds, 408);
  assert.match(ncb.title, /1980 NCB/);
  assert.equal(context.videos.filter(video => video.moduleId === 3 && video.provider !== 'self').length, 5);
  assert.equal(context.videos.filter(video => video.moduleId === 3).length, 7);
  const arrowsmith = context.videos.find(video => video.id === 'tAE5lPOPm8w');
  assert.equal(arrowsmith.durationSeconds, 1749);
  assert.match(arrowsmith.author, /Arrowsmith/);
  assert.notEqual(arrowsmith.provider, 'vimeo');
  const arrowsmithGuide = `${context.guidance.tAE5lPOPm8w.focus} ${context.guidance.tAE5lPOPm8w.scope}`;
  assert.match(arrowsmithGuide, /W65/);
  assert.match(arrowsmithGuide, /2014/);
  assert.match(arrowsmithGuide, /fresh air/);
  assert.doesNotMatch(videoLibrary, /Raubach|98555798/);
  const clevelandGuide = `${context.guidance['106597590'].focus} ${context.guidance['106597590'].scope}`;
  assert.match(clevelandGuide, /W65/);
  assert.match(clevelandGuide, /Boulby|Cleveland Potash/i);
  assert.match(clevelandGuide, /UK/);
  const ncbGuide = `${context.guidance['1JfkPpr6sRM'].focus} ${context.guidance['1JfkPpr6sRM'].scope}`;
  assert.match(ncbGuide, /hopcalite/i);
  assert.match(ncbGuide, /1918/);
  assert.match(ncbGuide, /Johns Hopkins/);
  assert.match(ncbGuide, /1967/);
  assert.match(ncbGuide, /MSA 230/);
  assert.match(ncbGuide, /Whitehaven/);
  assert.match(ncbGuide, /Creswell/);
  assert.match(ncbGuide, /heat exchanger/i);
  assert.match(ncbGuide, /oxygen-deficient/i);
  assert.match(ncbGuide, /UK/);
  assert.match(app, /https:\/\/player\.vimeo\.com\/video\/'\s*\+\s*videoId/);
  const vimeoUrlFn = app.match(/function managedVimeoUrl\([\s\S]*?\n\}/)[0];
  assert.match(vimeoUrlFn, /controls:\s*'1'/);
  assert.match(vimeoUrlFn, /playsinline:\s*'1'/);
  assert.match(vimeoUrlFn, /dnt:\s*'1'/);
  assert.match(vimeoUrlFn, /title:\s*'0'/);
  assert.match(vimeoUrlFn, /byline:\s*'0'/);
  assert.match(vimeoUrlFn, /portrait:\s*'0'/);
  assert.match(vimeoUrlFn, /autopause:\s*'1'/);
  assert.doesNotMatch(vimeoUrlFn, /controls:\s*'0'/);
  assert.match(app, /On iPad, tap the play button on the video itself/);
  assert.match(app, /function trackVimeoRequiredVideo/);
});

test('training content is W65-specific and contains no SCSR material', () => {
  const source = html + modulesSource + siteContent + quizExpansions + videoLibrary + app;
  assert.doesNotMatch(source, /\bSCSR\b|self-contained self-rescuer|CSE SR-100/i);
  assert.match(source, /MSA W65/);
  assert.match(modulesPartOne, /does not protect in an oxygen-deficient atmosphere/i);
  assert.doesNotMatch(source, /Fred Raubach|98555798|13:39/);
  assert.doesNotMatch(modulesPartOne, /Fred Raubach|98555798|optional instructor Vimeo|instructor may also show/);
  assert.match(modulesPartOne, /Cleveland Potash/);
  assert.match(modulesPartOne, /hopcalite/i);
  assert.doesNotMatch(modulesPartOne, /Video 2 – Official MSA W65 Visual Review/);
  assert.doesNotMatch(modulesPartOne, /Z33qMr0CobM/);
  assert.doesNotMatch(modulesPartOne, /AU07-U96dfw/);
  assert.doesNotMatch(modulesPartOne, /zfuxPqg3z38|ZhTZKsI3-eY/);
});

test('managed video notices accurately describe verified in-player completion', () => {
  assert.match(app, /Forward seeking is disabled/);
  assert.match(app, /does not earn completion credit/);
  assert.match(app, /External Open on YouTube\/Vimeo is for reference only|external playback cannot be verified/);
  assert.match(app, /text\.includes\('YouTube cannot fully lock seeking'\)/);
  assert.match(app, /text\.includes\('If the player shows'\)/);
  assert.match(app, /the assigned video/);
  assert.doesNotMatch(app, /â†—/);
});

test('every site orientation requires current-plan instructor review', () => {
  for (const site of ['Boonesboro', 'Clover Bottom', 'Dix River Stone']) {
    assert.match(siteContent, new RegExp(`${site}[\\s\\S]*?current written plans`, 'i'));
  }
});

test('long modules get an on-this-page menu that does not bypass completion gates', () => {
  assert.match(html, /<nav class="module-outline hidden" id="module-outline" aria-label="On this page">/);
  assert.match(html, /id="module-outline-return"/);
  assert.match(app, /const MODULE_OUTLINE_MIN_SECTIONS = 4;/);
  assert.match(app, /renderRequiredVideos\(id\);\n\s*(?:renderAllenActivities\(id\);\n\s*)?renderModuleOutline\(id\);/);
  assert.match(app, /teardownModuleOutline\(\);/);
  assert.match(app, /aria-current', 'location'/);
  assert.doesNotMatch(app, /scroll-end-marker[^\n]*module-outline|module-outline[^\n]*scroll-end-marker/);
});

test('loaded required-video players set their note without referencing an undefined variable', () => {
  const loader = app.slice(app.indexOf('function ensureRequiredVideoLoaded'), app.indexOf('function updateVideoProgressRail'));
  assert.ok(loader.length > 0);
  assert.doesNotMatch(loader, /: \(meta\.provider === 'vimeo'/);
  assert.match(loader, /: \(provider === 'vimeo'/);
});

test('instructors can download every trainee record as a spreadsheet', async () => {
  const exporter = await import(pathToFileURL(path.join(root, 'src/records-export.mjs')).href);
  const storedState = {
    name: 'Pat Miner',
    mine: 'Dix River Stone',
    completed: [1],
    scores: { 1: 100, 2: 80 },
    timersDone: { 1: true },
    timerElapsed: { 1: 5400, 2: 600 },
    scrollDone: { 1: true },
    quizAttempts: { 1: [{ at: '2026-10-01T12:00:00.000Z', score: 100 }], 2: [{ at: '2026-10-02T12:00:00.000Z', score: 80 }] }
  };
  const modules = recordLibrary.moduleProgress(storedState);
  assert.equal(modules.length, 13);
  assert.deepEqual({ ...modules[0] }, { id: 1, completed: true, seatSeconds: 5400, requiredSeconds: 5400, videosComplete: 0, videosRequired: 8, bestScore: 100, quizAttempts: 1 });
  // A module already recorded complete stays complete after new required videos are added.
  assert.equal(modules[1].videosRequired, 12);

  const csv = exporter.buildRecordsCsv([{
    learner: { id: 'u1', name: '=HYPERLINK("http://evil")', email: 'pat@example.com' },
    mine: 'Dix River Stone',
    startedAt: '2026-10-01T12:00:00.000Z',
    updatedAt: '2026-10-02T12:00:00.000Z',
    summary: recordLibrary.trainingSummary(storedState, { w65Practice: true }),
    signoffs: { w65Practice: true },
    signoffDetails: { w65Practice: { value: true, at: '2026-10-02T15:00:00.000Z', instructorName: 'Jane Instructor' } },
    instructorNotes: 'Line one, with comma\nLine two "quoted"',
    modules
  }], { 1: 'Site Orientation' });

  assert.ok(csv.startsWith('﻿'), 'UTF-8 BOM so Excel reads accents');
  const [header, row] = csv.slice(1).split('\r\n');
  assert.match(header, /^Trainee,Email,Work location,/);
  assert.match(header, /M1 Site Orientation – status/);
  assert.match(header, /Module 13 – seat time \(min\)/);
  assert.match(row, /^"'=HYPERLINK\(""http:\/\/evil""\)",/, 'formula-looking names are neutralized');
  assert.match(row, /,1 of 13,1\.5,No,No,No,/);
  assert.match(row, /,Yes,Jane Instructor,2026-10-02 \d\d:00,/);
  assert.match(row, /"Line one, with comma\nLine two ""quoted"""/);
  assert.match(row, /,Complete,100,1,90 of 90,0 of 8,In progress,80,1,10 of 120,0 of 12,Not started,/);
  assert.doesNotMatch(row, /\b\d+\/\d+\b/, 'no slash counts that Excel would turn into dates');
  assert.match(exporter.recordsExportFilename(new Date(2026, 9, 22)), /^msha-part48-trainee-records-2026-10-22\.csv$/);

  assert.match(html, /id="instructor-records-download"/);
  assert.match(instructorAuth, /import \{ buildRecordsCsv, recordsExportFilename \} from '\.\/records-export\.mjs';/);
  assert.match(instructorRecords, /modules: moduleProgress\(record\.state\)/);
  assert.match(html, /id="instructor-invite-account-form"/);
});

test('site orientations include MSHA public-record lessons and an instructor-completed emergency card', () => {
  const context = {};
  new vm.Script(`${siteContent}\nthis.sites = SITE_CONTENT; this.records = SITE_SAFETY_RECORDS;`).runInNewContext(context);
  const expectedIds = { 'Boonesboro Quarry': ['15-00006'], 'Clover Bottom Quarry': ['15-00112', '15-19898'], 'Dix River Stone': ['15-18389'] };
  for (const [site, ids] of Object.entries(expectedIds)) {
    const record = context.records[site];
    assert.deepEqual([...record.mines].map(mine => mine.id), ids, `${site} mine IDs`);
    assert.ok(record.cases.length >= 3 && record.citations.length >= 4, `${site} needs injury cases and citations`);
    for (const [standard] of record.citations) assert.match(standard, /^5[67]\.\d+/, `${site} citation ${standard} must name a 30 CFR Part 56/57 standard`);
    const content = context.sites[site].content;
    assert.match(content, new RegExp(`${site} in MSHA's Public Records`));
    assert.match(content, /Emergency Card/);
    assert.match(content, /Fill in every line with your instructor using the current escape and evacuation plan/);
    assert.match(content, /emergency-card-blank/);
    assert.match(content, /mine-data-retrieval-system/);
  }
  assert.match(context.sites['Clover Bottom Quarry'].content, /Which mine I am in today: old mine \(#1, 15-00112\) or new mine \(#2, 15-19898\)/);
  assert.match(context.sites['Dix River Stone'].content, /Level 1 or Level 2/);
});

test('Netlify accounts and records migrate to Supabase safely', () => {
  assert.match(migration, /tokenMatches\(provided, process\.env\.MIGRATION_TOKEN\)/);
  assert.match(migration, /timingSafeEqual/);
  assert.match(migration, /const apply = event\.queryStringParameters\?\.apply === '1';/, 'dry run unless ?apply=1');
  assert.match(migration, /context\.clientContext\?\.identity/);
  assert.match(migration, /roles\.includes\('instructor'\) \? 'instructor' : 'learner'/);
  assert.match(migration, /legacy_netlify_id: netlifyUser\.id/);
  assert.match(migration, /alreadyCopied\.has\(netlifyUser\.id\)/, 're-running skips copied records');
  assert.match(migration, /migratedFrom: 'netlify-blobs'/);
  assert.doesNotMatch(migration, /consistency: 'strong'/, 'classic functions cannot use strong Blobs consistency');
});

test('self-hosted Allen Company videos ship with media, captions, posters and the tracked HTML5 player', async () => {
  const { statSync, existsSync } = await import('node:fs');
  const context = {};
  new vm.Script(videoLibrary + '\nthis.selfVideos = SELF_HOSTED_VIDEOS; this.sequences = MODULE_VIDEO_SEQUENCE;').runInNewContext(context);
  assert.equal(context.selfVideos.length, 54);
  const perModule = {};
  for (const video of context.selfVideos) {
    assert.equal(video.provider, 'self');
    assert.match(video.id, /^allen-m\d+-\d+$/);
    for (const key of ['src', 'captions', 'poster']) {
      const file = path.join(root, video[key]);
      assert.ok(existsSync(file), `${video.id} is missing ${key}`);
    }
    assert.ok(statSync(path.join(root, video.src)).size <= 10 * 1024 * 1024, `${video.id} is over 10 MB`);
    assert.ok(context.sequences[video.moduleId].includes(video.id), `${video.id} is not in the Module ${video.moduleId} sequence`);
    perModule[video.moduleId] = (perModule[video.moduleId] || 0) + 1;
  }
  assert.deepEqual(perModule, { 1: 8, 2: 4, 3: 2, 5: 1, 6: 8, 7: 1, 8: 5, 9: 5, 10: 4, 11: 5, 12: 11 });
  assert.ok(!/\blex\b|lexington quarry/i.test(JSON.stringify(context.selfVideos)));
  assert.match(app, /function initializeSelfHostedVideo/);
  assert.match(app, /addEventListener\('seeking'/);
  assert.match(app, /element\.playbackRate = 1/);
  assert.match(app, /record\.watchedSeconds >= duration \* 0\.95/);
  assert.match(app, /addEventListener\('ended', \(\) => completeSelfHostedVideo/);
  assert.match(app, /if \(document\.hidden\) \{\s*element\.pause\(\)/);
  assert.match(read('scripts/build.mjs'), /path\.join\(root, 'media'\)/);
  assert.ok(read('index.html').indexOf('js/allen-activities.js') < read('index.html').indexOf('js/app.js'));
});

test('instructor-led classroom sessions count toward classroom hours only when signed off', () => {
  const { CLASSROOM_SESSIONS, MODULE_REQUIREMENTS, SIGNOFF_KEYS, trainingSummary } = recordLibrary;
  assert.deepEqual(CLASSROOM_SESSIONS.map(session => [session.moduleId, session.key, session.minutes]),
    [[3, 'classroomW65Session', 60], [10, 'classroomFirstAidSession', 90]]);
  assert.ok(SIGNOFF_KEYS.includes('classroomW65Session') && SIGNOFF_KEYS.includes('classroomFirstAidSession'));
  assert.equal(MODULE_REQUIREMENTS[3].seconds, 2.5 * 3600, 'Module 3 self-paced time is 3.5 h minus the 1 h session');
  assert.equal(MODULE_REQUIREMENTS[10].seconds, 1.5 * 3600, 'Module 10 self-paced time is 3.0 h minus the 1.5 h session');

  const allModules = Object.keys(MODULE_REQUIREMENTS).map(Number);
  const state = { mine: 'Boonesboro Quarry', completed: allModules, scores: Object.fromEntries(allModules.map(id => [id, 100])) };
  const unsigned = trainingSummary(state, {});
  assert.equal(unsigned.classroomHours, 29.5, 'all modules done but no sessions signed: 32 - 2.5');
  assert.equal(unsigned.classroomComplete, false);
  const oneSigned = trainingSummary(state, { classroomW65Session: true });
  assert.equal(oneSigned.classroomHours, 30.5);
  assert.equal(oneSigned.classroomComplete, false);
  const bothSigned = trainingSummary(state, { classroomW65Session: true, classroomFirstAidSession: true });
  assert.equal(bothSigned.classroomHours, 32);
  assert.equal(bothSigned.classroomComplete, true);

  assert.match(app, /function moduleSeatSeconds\(m\)/);
  assert.match(app, /missingSessions/, 'certificate waits for instructor-led sessions');
  assert.doesNotMatch(app, /\.hours \* 3600\)/, 'seat timers use moduleSeatSeconds, not raw module hours');
  assert.match(instructorAuth, /Classroom sessions \(count toward the 32 classroom hours\)/);
});

test('build versions every self-hosted media URL so re-rendered videos are never served stale', () => {
  const build = read('scripts/build.mjs');
  assert.match(build, /async function stampMediaVersions/);
  assert.match(build, /mp4\|webm\|vtt/);
  assert.match(netlifyConfig, /for = "\/media\/\*"[\s\S]*?max-age=2592000/);
});

test('every self-hosted video has a valid quiz that unlocks only after the video is watched', () => {
  const context = {};
  new vm.Script(videoLibrary + '\n' + videoQuizzes + '\nthis.selfVideos = SELF_HOSTED_VIDEOS; this.quizzes = VIDEO_QUIZZES; this.pass = VIDEO_QUIZ_PASSING_SCORE;').runInNewContext(context);
  assert.equal(context.pass, 80);
  const videoIds = [...context.selfVideos.map(video => video.id)].sort();
  assert.deepEqual([...Object.keys(context.quizzes)].sort(), [...videoIds], 'quiz ids must match the self-hosted videos exactly');
  for (const id of videoIds) {
    const quiz = context.quizzes[id];
    assert.ok(Array.isArray(quiz.questions), `${id} has no questions`);
    if (quiz.questions.length < 5) assert.ok(quiz.thinSource, `${id} has fewer than 5 questions without a thinSource note`);
    assert.ok(quiz.questions.length >= 3, `${id} needs at least 3 questions`);
    for (const [index, question] of quiz.questions.entries()) {
      const label = `${id} question ${index + 1}`;
      assert.ok(question.q && question.q.trim(), `${label} has no prompt`);
      assert.equal(question.options.length, 4, `${label} needs 4 options`);
      assert.equal(new Set(question.options).size, 4, `${label} has duplicate options`);
      assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `${label} answer index is invalid`);
      assert.ok(question.explanation && question.explanation.trim(), `${label} has no explanation`);
    }
  }
  const html = read('index.html');
  assert.match(html, /<script src="\/js\/video-quizzes\.js\?v=dev"><\/script>/);
  assert.ok(html.indexOf('js/video-quizzes.js') < html.indexOf('js/app.js'));
  assert.match(app, /data-video-quiz=/);
  assert.match(app, /const unlocked = record\.complete === true;/);
  assert.match(app, /if \(record\.complete !== true\) return;/);
  assert.match(app, /renderVideoQuiz\(moduleId, videoId\);\n\}/);
});

test('video quiz best scores are saved only for watched videos and never lower on merge', () => {
  const watched = { watchedSeconds: 100000, complete: true, quizBest: 80, updatedAt: '2026-10-01T00:00:00.000Z' };
  const kept = recordLibrary.sanitizeTrainingState({ videoProgress: { 2: { 'allen-m2-1': watched } } });
  assert.equal(kept.videoProgress[2]['allen-m2-1'].quizBest, 80);
  const unwatched = recordLibrary.sanitizeTrainingState({ videoProgress: { 2: { 'allen-m2-1': { watchedSeconds: 1, complete: false, quizBest: 100 } } } });
  assert.equal(unwatched.videoProgress[2]['allen-m2-1'].quizBest, undefined);
  const merged = recordLibrary.mergeTrainingStates(
    { videoProgress: { 2: { 'allen-m2-1': { ...watched, quizBest: 100 } } } },
    { videoProgress: { 2: { 'allen-m2-1': { ...watched, quizBest: 60 } } } }
  );
  assert.equal(merged.videoProgress[2]['allen-m2-1'].quizBest, 100);
  assert.ok(!merged.completed.includes(2), 'a video quiz never completes a module on its own');
});
