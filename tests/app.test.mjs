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
  assert.match(html, /href="\/assets\/styles\.css\?v=invite-accounts-1"/);
  assert.match(html, /src="\/js\/modules-1-6\.js\?v=invite-accounts-1"/);
  assert.match(html, /src="\/js\/modules-7-13\.js\?v=invite-accounts-1"/);
  assert.match(html, /src="\/js\/site-content\.js\?v=invite-accounts-1"/);
  assert.match(html, /src="\/js\/quiz-expansions\.js\?v=invite-accounts-1"/);
  assert.match(html, /src="\/js\/video-library\.js\?v=invite-accounts-1"/);
  assert.match(html, /src="\/js\/app\.js\?v=invite-accounts-1"/);
  assert.match(html, /src="\/js\/instructor-auth\.js\?v=invite-accounts-1"/);
  assert.ok(html.indexOf('js/modules-1-6.js') < html.indexOf('js/modules-7-13.js'));
  assert.ok(html.indexOf('js/modules-7-13.js') < html.indexOf('js/site-content.js'));
  assert.ok(html.indexOf('js/site-content.js') < html.indexOf('js/quiz-expansions.js'));
  assert.ok(html.indexOf('js/quiz-expansions.js') < html.indexOf('js/video-library.js'));
  assert.ok(html.indexOf('js/video-library.js') < html.indexOf('js/app.js'));
  assert.doesNotMatch(html, /<style>/i);
  assert.doesNotMatch(html, /<script>\s*[^<]/i);
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
});

test('instructor preview is non-persistent and cannot issue completion records', () => {
  assert.match(app, /if \(instructorPreviewMode\) return;[\s\S]*?localStorage\.setItem/);
  assert.match(app, /Certificates are disabled in instructor preview/);
  assert.match(app, /Training-record exports are disabled in instructor preview/);
  assert.match(app, /Demonstration only — this score was not saved/);
  assert.match(app, /if \(instructorPreviewMode\) return true;/);
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

test('all 55 videos are uniquely assigned and all submitted batches remain intact', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.firstIds = Array.from(FIRST_VIDEO_BATCH_IDS); this.secondIds = Array.from(SECOND_VIDEO_BATCH_IDS); this.thirdIds = Array.from(THIRD_VIDEO_BATCH_IDS); this.thirdSubmittedIds = Array.from(THIRD_SUBMITTED_VIDEO_IDS); this.contentDuplicates = VIDEO_CONTENT_DUPLICATES; this.preExistingIds = Array.from(PRE_EXISTING_VIDEO_IDS);')
    .runInNewContext(context);
  const ids = context.videos.map(video => video.id);
  const firstBatch = context.videos.filter(video => context.firstIds.includes(video.id));
  const secondBatch = context.videos.filter(video => context.secondIds.includes(video.id));
  const thirdBatch = context.videos.filter(video => context.thirdIds.includes(video.id));
  assert.equal(context.videos.length, 55);
  assert.equal(new Set(ids).size, 55);
  assert.ok(context.videos.every(video => video.moduleId >= 1 && video.moduleId <= 13));
  assert.ok(context.videos.every(video => video.durationSeconds > 0));
  assert.equal(firstBatch.length, 16);
  assert.equal(firstBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 11206);
  assert.equal(secondBatch.length, 16);
  assert.equal(secondBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 16276);
  assert.equal(thirdBatch.length, 14);
  assert.equal(thirdBatch.reduce((sum, video) => sum + video.durationSeconds, 0), 10076);
  assert.equal(context.thirdSubmittedIds.length, 17);
  assert.equal(ids.filter(id => id === 'X5r4upNwIGk').length, 1);
  assert.equal(ids.filter(id => id === 'yEwFZHVLsso').length, 1);
  assert.equal(ids.filter(id => id === 'TM8DYUKbjsw').length, 1);
  assert.equal(ids.filter(id => id === 'OxOwJC5wHyc').length, 1);
  assert.equal(ids.filter(id => id === 'ddermx9hJ7k').length, 0);
  assert.equal(context.contentDuplicates.ddermx9hJ7k, 'X5r4upNwIGk');
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

test('all 10 retained pre-existing embeds use the tracked YouTube/Vimeo player system', () => {
  const context = {};
  new vm.Script(videoLibrary + '\nthis.videos = REQUIRED_VIDEOS; this.preExistingIds = Array.from(PRE_EXISTING_VIDEO_IDS);')
    .runInNewContext(context);
  const preExisting = context.videos.filter(video => context.preExistingIds.includes(video.id));
  assert.equal(context.preExistingIds.length, 10);
  assert.equal(preExisting.length, 10);
  assert.equal(preExisting.filter(video => video.provider === 'vimeo').length, 1);
  assert.match(app, /function loadVimeoApi/);
  assert.match(app, /player\.setCurrentTime\(record\.watchedSeconds\)/);
  assert.match(app, /iframe\.setAttribute\('tabindex', '-1'\)/);
});

test('training content is W65-specific and contains no SCSR material', () => {
  const source = html + modulesSource + siteContent + quizExpansions + videoLibrary + app;
  assert.doesNotMatch(source, /\bSCSR\b|self-contained self-rescuer|CSE SR-100/i);
  assert.match(source, /MSA W65/);
  assert.match(modulesPartOne, /does not protect in an oxygen-deficient atmosphere/i);
});

test('managed video notices accurately describe verified in-player completion', () => {
  assert.match(app, /Forward seeking is disabled/);
  assert.match(app, /external playback cannot be verified and does not receive completion credit/);
  assert.match(app, /text\.includes\('YouTube cannot fully lock seeking'\)/);
  assert.match(app, /text\.includes\('If the player shows'\)/);
});

test('every site orientation requires current-plan instructor review', () => {
  for (const site of ['Boonesboro', 'Clover Bottom', 'Dix River Stone']) {
    assert.match(siteContent, new RegExp(`${site}[\\s\\S]*?current written plans`, 'i'));
  }
});
