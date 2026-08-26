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
const app = read('js/app.js');
const instructorAuth = read('src/instructor-auth.js');
const instructorSession = read('netlify/functions/instructor-session.mjs');
const identitySignup = read('netlify/functions/identity-signup.mjs');
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
  new vm.Script(app, { filename: 'js/app.js' });
});

test('HTML loads external CSS, content, and app files in order', () => {
  assert.match(html, /href="\/assets\/styles\.css\?v=w65-video-fix-2"/);
  assert.match(html, /src="\/js\/modules-1-6\.js\?v=w65-video-fix-2"/);
  assert.match(html, /src="\/js\/modules-7-13\.js\?v=w65-video-fix-2"/);
  assert.match(html, /src="\/js\/site-content\.js\?v=w65-video-fix-2"/);
  assert.match(html, /src="\/js\/quiz-expansions\.js\?v=w65-video-fix-2"/);
  assert.match(html, /src="\/js\/video-library\.js\?v=w65-video-fix-2"/);
  assert.match(html, /src="\/js\/app\.js\?v=w65-video-fix-2"/);
  assert.match(html, /src="\/js\/instructor-auth\.js\?v=w65-video-fix-2"/);
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
  assert.match(html, /data:image\/webp;base64,/);
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
  assert.match(modulesPartOne, /Miners' Rights and Responsibilities Trifold/);
  assert.match(modulesPartOne, /Powered Haulage Stand-Down/);
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
});

test('instructor route and server endpoint both require the instructor role', () => {
  assert.match(netlifyConfig, /from = "\/instructor\/\*"[\s\S]*?conditions = \{ Role = \["instructor"\] \}/);
  assert.match(netlifyConfig, /to = "\/\?instructor=unauthorized"/);
  assert.match(instructorSession, /getUser/);
  assert.match(instructorSession, /roles\.includes\('instructor'\)/);
  assert.match(identitySignup, /currentRoles\.includes\('instructor'\) \? \['instructor'\] : \['trainee'\]/);
  assert.doesNotMatch(identitySignup, /roles:\s*\['instructor'\]/);
});

test('authenticated learner progress is server-owned, validated, and durably stored', () => {
  assert.match(packageJson, /"@netlify\/blobs": "10\.7\.12"/);
  assert.match(packageJson, /"@netlify\/identity": "1\.2\.0"/);
  assert.match(netlifyConfig, /node_bundler = "esbuild"/);
  assert.doesNotMatch(netlifyConfig, /external_node_modules/);
  assert.match(learnerProgress, /getUser/);
  assert.match(learnerProgress, /recordKey\(user\.id\)/);
  assert.doesNotMatch(learnerProgress, /payload\.(userId|learnerId)/);
  assert.match(learnerProgress, /mergeTrainingStates/);
  assert.match(learnerProgress, /appendAuditEvent/);
  assert.match(trainingRecords, /getStore\(\{ name: 'msha-training-records', consistency: 'strong' \}\)/);
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

  const moduleOne = recordLibrary.sanitizeTrainingState({
    mine: 'Boonesboro Quarry',
    timerElapsed: { 1: 5400 },
    timersDone: { 1: true },
    scrollDone: { 1: true },
    scores: { 1: 100 }
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
  assert.match(instructorRecords, /rolesFor\(user\)\.includes\('instructor'\)/);
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

test('all 58 active videos are unique and retired submissions are documented', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.firstIds = Array.from(FIRST_VIDEO_BATCH_IDS); this.secondIds = Array.from(SECOND_VIDEO_BATCH_IDS); this.thirdIds = Array.from(THIRD_VIDEO_BATCH_IDS); this.thirdSubmittedIds = Array.from(THIRD_SUBMITTED_VIDEO_IDS); this.contentDuplicates = VIDEO_CONTENT_DUPLICATES; this.preExistingIds = Array.from(PRE_EXISTING_VIDEO_IDS); this.retiredIds = RETIRED_VIDEO_IDS; this.currentIds = Array.from(CURRENT_RESOURCE_VIDEO_IDS);')
    .runInNewContext(context);
  const ids = context.videos.map(video => video.id);
  const firstBatch = context.videos.filter(video => context.firstIds.includes(video.id));
  const secondBatch = context.videos.filter(video => context.secondIds.includes(video.id));
  const thirdBatch = context.videos.filter(video => context.thirdIds.includes(video.id));
  const currentResources = context.videos.filter(video => context.currentIds.includes(video.id));
  assert.equal(context.videos.length, 58);
  assert.equal(new Set(ids).size, 58);
  assert.ok(context.videos.every(video => video.moduleId >= 1 && video.moduleId <= 13));
  assert.ok(context.videos.every(video => video.durationSeconds > 0));
  assert.equal(firstBatch.length, 15);
  assert.equal(firstBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 10891);
  assert.equal(secondBatch.length, 16);
  assert.equal(secondBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 16276);
  assert.equal(thirdBatch.length, 11);
  assert.equal(thirdBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 6155);
  assert.equal(currentResources.length, 5);
  assert.equal(currentResources.reduce((sum, video) => sum + video.durationSeconds, 0), 4251);
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
  assert.equal(ids.filter(id => id === 'Veayb1NucTA').length, 1);
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
  for (const id of ['Ka9UKa_xYNU', 'DfiBLI8lGM8', 'oJ834e9wDQ4', 'b7mhJ8viccI', 'Veayb1NucTA']) assert.ok(ids.includes(id));
});

test('current respirator, cleanup, hearing, blind-area, and task-analysis lessons are present', () => {
  assert.match(modulesPartOne, /NIOSH blind-area diagrams/);
  assert.match(modulesPartOne, /not diagrams for the Allen Company Cat 980M\/988-class loaders/);
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
  assert.match(videoLibrary, /Only designated supervisors operate and make decisions from the company detector/);
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
  assert.match(app, /section\.appendChild\(box\)/);
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

test('Module 3 sequence is Sunshine, Cleveland Potash W65, then 1980 NCB filter self-rescuer', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.sequences = MODULE_VIDEO_SEQUENCE; this.guidance = VIDEO_TRAINING_GUIDANCE;')
    .runInNewContext(context);
  assert.deepEqual([...context.sequences[3]], ['WTKCluA6lgE', '106597590', '1JfkPpr6sRM']);
  const cleveland = context.videos.find(video => video.id === '106597590');
  assert.equal(cleveland.provider, 'vimeo');
  assert.equal(cleveland.durationSeconds, 332);
  assert.match(cleveland.title, /Cleveland Potash/);
  const ncb = context.videos.find(video => video.id === '1JfkPpr6sRM');
  assert.equal(ncb.durationSeconds, 408);
  assert.match(ncb.title, /1980 NCB/);
  assert.equal(context.videos.filter(video => video.moduleId === 3).length, 3);
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
});

test('training content is W65-specific and contains no SCSR material', () => {
  const source = html + modulesSource + siteContent + quizExpansions + videoLibrary + app;
  assert.doesNotMatch(source, /\bSCSR\b|self-contained self-rescuer|CSE SR-100/i);
  assert.match(source, /MSA W65/);
  assert.match(modulesPartOne, /does not protect in an oxygen-deficient atmosphere/i);
  assert.match(modulesPartOne, /Fred Raubach/);
  assert.match(modulesPartOne, /https:\/\/vimeo\.com\/98555798/);
  assert.match(modulesPartOne, /Cleveland Potash/);
  assert.match(modulesPartOne, /hopcalite/i);
  assert.doesNotMatch(modulesPartOne, /Video 2 – Official MSA W65 Visual Review/);
  assert.doesNotMatch(modulesPartOne, /Z33qMr0CobM/);
  assert.doesNotMatch(modulesPartOne, /AU07-U96dfw/);
  assert.doesNotMatch(modulesPartOne, /zfuxPqg3z38|ZhTZKsI3-eY/);
});

test('managed video notices accurately describe verified in-player completion', () => {
  assert.match(app, /Forward seeking is disabled/);
  assert.match(app, /external playback cannot be verified and does not receive completion credit/);
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
