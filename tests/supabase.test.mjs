import assert from 'node:assert/strict';
import test from 'node:test';
import { createFakeSupabase } from './fake-supabase.mjs';
import { MODULE_REQUIREMENTS } from '../netlify/lib/module-requirements.mjs';
import { setSupabaseAdminForTests } from '../netlify/lib/supabase-server.mjs';
import learnerProgress from '../netlify/functions/learner-progress.mjs';
import instructorRecords from '../netlify/functions/instructor-records.mjs';
import instructorInvite from '../netlify/functions/instructor-invite.mjs';
import instructorSession from '../netlify/functions/instructor-session.mjs';
import instructorPasswordLink from '../netlify/functions/instructor-password-link.mjs';

const BASE = 'https://training.example';
const request = (path, { token, method = 'GET', body } = {}) => new Request(`${BASE}${path}`, {
  method,
  headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), 'Content-Type': 'application/json' },
  body: body === undefined ? undefined : JSON.stringify(body)
});

function setup() {
  const fake = createFakeSupabase();
  setSupabaseAdminForTests(fake.client);
  const learner = fake.addUser('pat@theallen.com', { fullName: 'Pat Miner', token: 'learner-token' });
  const instructor = fake.addUser('jane@theallen.com', { fullName: 'Jane Instructor', role: 'instructor', token: 'instructor-token' });
  return { fake, learner, instructor };
}

const moduleOneDone = {
  name: 'Pat Miner',
  mine: 'Dix River Stone',
  timerElapsed: { 1: 5400 },
  timersDone: { 1: true },
  scrollDone: { 1: true },
  scores: { 1: 100 },
  // Module 1 now requires the four Allen Company site/orientation videos.
  videoProgress: { 1: Object.fromEntries(Object.entries(MODULE_REQUIREMENTS[1].videos).map(([id, seconds]) => [id, { watchedSeconds: seconds, complete: true }])) },
  completed: [1]
};

test('learner progress requires a valid Supabase session', async () => {
  setup();
  assert.equal((await learnerProgress(request('/api/learner-progress'))).status, 401);
  assert.equal((await learnerProgress(request('/api/learner-progress', { token: 'forged' }))).status, 401);
});

test('learner progress is validated, versioned, and audited in Supabase', async () => {
  const { fake, learner } = setup();
  const empty = await (await learnerProgress(request('/api/learner-progress', { token: 'learner-token' }))).json();
  assert.equal(empty.record, null);

  const first = await learnerProgress(request('/api/learner-progress', { token: 'learner-token', method: 'PUT', body: { state: moduleOneDone } }));
  assert.equal(first.status, 200);
  const saved = (await first.json()).record;
  assert.equal(saved.version, 1);
  assert.deepEqual(saved.state.completed, [1]);
  assert.equal(saved.learner.email, 'pat@theallen.com');
  assert.equal(fake.tables.training_records[0].user_id, learner.id);
  assert.ok(fake.tables.audit_events.some(row => row.event.changes.includes('modules-completed:0->1')));

  // A forged browser claim of more completed modules is rechecked and dropped.
  const forged = await learnerProgress(request('/api/learner-progress', { token: 'learner-token', method: 'PUT', body: { state: { ...moduleOneDone, completed: [1, 2, 3], scores: { 1: 100, 2: 100, 3: 100 } } } }));
  const forgedRecord = (await forged.json()).record;
  assert.deepEqual(forgedRecord.state.completed, [1]);
  assert.equal(forgedRecord.version, 2);
});

test('a save that loses a race reloads and merges instead of overwriting', async () => {
  const { fake, learner } = setup();
  await learnerProgress(request('/api/learner-progress', { token: 'learner-token', method: 'PUT', body: { state: moduleOneDone } }));
  // Simulate another writer bumping the version between this request's read and write.
  const row = fake.tables.training_records[0];
  const realUpdate = fake.client.from;
  let interfered = false;
  fake.client.from = table => {
    const api = realUpdate(table);
    if (table === 'training_records' && !interfered) {
      const originalUpdate = api.update;
      api.update = values => { interfered = true; row.version += 1; return originalUpdate(values); };
    }
    return api;
  };
  const response = await learnerProgress(request('/api/learner-progress', { token: 'learner-token', method: 'PUT', body: { state: { ...moduleOneDone, timerElapsed: { 1: 5400, 2: 60 } } } }));
  assert.equal(response.status, 200);
  const record = (await response.json()).record;
  assert.equal(record.version, 3, 'second attempt wrote on top of the concurrent save');
  assert.equal(record.state.timerElapsed[2], 60);
  assert.equal(fake.tables.training_records.filter(item => item.user_id === learner.id).length, 1);
});

test('only instructors can open the instructor session, records, and invitations', async () => {
  setup();
  assert.equal((await instructorSession(request('/api/instructor-session', { token: 'learner-token' }))).status, 403);
  assert.equal((await instructorRecords(request('/api/instructor-records', { token: 'learner-token' }))).status, 403);
  assert.equal((await instructorInvite(request('/api/instructor-invite', { token: 'learner-token', method: 'POST', body: { email: 'x@theallen.com', fullName: 'X' } }))).status, 403);
  const session = await (await instructorSession(request('/api/instructor-session', { token: 'instructor-token' }))).json();
  assert.equal(session.authorized, true);
  assert.equal(session.instructor.name, 'Jane Instructor');
});

test('instructor signoffs are stamped with the instructor and audited', async () => {
  const { fake, learner, instructor } = setup();
  await learnerProgress(request('/api/learner-progress', { token: 'learner-token', method: 'PUT', body: { state: moduleOneDone } }));
  const list = await (await instructorRecords(request('/api/instructor-records', { token: 'instructor-token' }))).json();
  assert.equal(list.records.length, 1);
  assert.equal(list.records[0].modules.length, 13);

  const response = await instructorRecords(request('/api/instructor-records', { token: 'instructor-token', method: 'POST', body: { traineeId: learner.id, signoffs: { w65Practice: true }, instructorNotes: 'W65 practice 10/22' } }));
  assert.equal(response.status, 200);
  const record = (await response.json()).record;
  assert.equal(record.signoffs.w65Practice, true);
  assert.equal(record.signoffDetails.w65Practice.instructorId, instructor.id);
  assert.equal(record.signoffDetails.w65Practice.instructorName, 'Jane Instructor');
  assert.equal(record.instructorNotes, 'W65 practice 10/22');
  assert.ok(fake.tables.audit_events.some(row => row.event.type === 'instructor-signoff' && row.event.changedKeys.includes('w65Practice')));
});

test('instructors invite trainees or instructors with a one-time link, and the role is set server-side', async () => {
  const { fake } = setup();
  const trainee = await instructorInvite(request('/api/instructor-invite', { token: 'instructor-token', method: 'POST', body: { email: 'New.Miner@theallen.com', fullName: 'New Miner' } }));
  assert.equal(trainee.status, 200);
  const traineeBody = await trainee.json();
  assert.equal(fake.client.links[0].type, 'invite');
  assert.equal(fake.client.links[0].email, 'new.miner@theallen.com');
  assert.equal(fake.client.links[0].options.redirectTo, `${BASE}/`);
  assert.equal(traineeBody.link, fake.client.links[0].link, 'the instructor receives the link to share (no email server)');
  assert.equal(fake.client.invites.length, 0, 'no invitation email is attempted');
  assert.equal(fake.tables.profiles.find(row => row.email === 'new.miner@theallen.com').role, 'learner');

  await instructorInvite(request('/api/instructor-invite', { token: 'instructor-token', method: 'POST', body: { email: 'lead@theallen.com', fullName: 'Lead Hand', role: 'instructor' } }));
  assert.equal(fake.tables.profiles.find(row => row.email === 'lead@theallen.com').role, 'instructor');

  const duplicate = await instructorInvite(request('/api/instructor-invite', { token: 'instructor-token', method: 'POST', body: { email: 'pat@theallen.com', fullName: 'Pat' } }));
  assert.equal(duplicate.status, 409);
  const invalid = await instructorInvite(request('/api/instructor-invite', { token: 'instructor-token', method: 'POST', body: { email: 'not-an-email', fullName: 'X' } }));
  assert.equal(invalid.status, 400);
  assert.ok(fake.tables.audit_events.some(row => row.event.type === 'account-invited' && row.event.role === 'instructor'));
});

test('instructors create audited one-time password links for existing accounts', async () => {
  const { fake, learner } = setup();
  assert.equal((await instructorPasswordLink(request('/api/instructor-password-link', { token: 'learner-token', method: 'POST', body: { accountId: learner.id } }))).status, 403);
  assert.equal((await instructorPasswordLink(request('/api/instructor-password-link', { token: 'instructor-token', method: 'POST', body: { accountId: 'missing' } }))).status, 404);
  const response = await instructorPasswordLink(request('/api/instructor-password-link', { token: 'instructor-token', method: 'POST', body: { accountId: learner.id } }));
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(fake.client.links.at(-1).type, 'recovery');
  assert.equal(fake.client.links.at(-1).email, 'pat@theallen.com');
  assert.equal(body.link, fake.client.links.at(-1).link);
  assert.ok(fake.tables.audit_events.some(row => row.event.type === 'password-link-created' && row.event.learnerId === learner.id));
});
