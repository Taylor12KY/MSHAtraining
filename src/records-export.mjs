// Builds the instructor "Download spreadsheet" CSV: one row per trainee, opened directly by Excel.
// Counts are written as "3 of 17" because Excel turns "3/17" into a date.

export const SIGNOFF_COLUMNS = [
  ['siteTraining', 'Mine-site training (~8 h)'],
  ['mineTour', 'Mine tour'],
  ['plansProcedures', 'Plans, escapeways & procedures'],
  ['w65Practice', 'W65 hands-on practice'],
  ['fallProtectionPractice', 'Fall-protection demonstration'],
  ['gasMonitorPractice', 'ALTAIR 4X orientation'],
  ['taskTraining', 'Task training'],
  ['form5000_23', 'Form 5000-23 completed']
];

// Excel runs cells that start with these characters as formulas; prefix them so
// a trainee-entered name or note can never execute in the instructor's spreadsheet.
const FORMULA_START = /^[=+\-@\t\r]/;

export function csvCell(value) {
  let text = value === null || value === undefined ? '' : String(value);
  if (FORMULA_START.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const pad = number => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function moduleStatus(module) {
  if (module.completed) return 'Complete';
  const started = module.seatSeconds > 0 || module.videosComplete > 0 || module.quizAttempts > 0;
  return started ? 'In progress' : 'Not started';
}

export function buildRecordsCsv(records, moduleTitles = {}) {
  const moduleIds = [...new Set(records.flatMap(record => (record.modules || []).map(module => module.id)))].sort((a, b) => a - b);
  const totalModules = moduleIds.length || 13;
  const header = [
    'Trainee', 'Email', 'Work location', 'Started', 'Last activity',
    'Modules complete', 'Classroom hours', 'Classroom complete', 'All signoffs complete', 'Ready for operator review'
  ];
  for (const [, label] of SIGNOFF_COLUMNS) header.push(label, `${label} – verified by`, `${label} – verified on`);
  header.push('Instructor notes');
  for (const id of moduleIds) {
    const name = moduleTitles[id] ? `M${id} ${moduleTitles[id]}` : `Module ${id}`;
    header.push(`${name} – status`, `${name} – best quiz %`, `${name} – quiz attempts`, `${name} – seat time (min)`, `${name} – videos`);
  }

  const rows = records.map(record => {
    const summary = record.summary || {};
    const row = [
      record.learner?.name || '',
      record.learner?.email || '',
      record.mine || '',
      formatDate(record.startedAt),
      formatDate(record.updatedAt),
      `${summary.completedModules || 0} of ${totalModules}`,
      Number(summary.classroomHours || 0).toFixed(1),
      summary.classroomComplete ? 'Yes' : 'No',
      summary.signoffsComplete ? 'Yes' : 'No',
      summary.readyForOperatorReview ? 'Yes' : 'No'
    ];
    for (const [key] of SIGNOFF_COLUMNS) {
      const detail = record.signoffDetails?.[key] || {};
      const verified = record.signoffs?.[key] === true;
      row.push(verified ? 'Yes' : 'No', verified ? (detail.instructorName || detail.instructorEmail || '') : '', verified ? formatDate(detail.at) : '');
    }
    row.push(record.instructorNotes || '');
    const byId = new Map((record.modules || []).map(module => [module.id, module]));
    for (const id of moduleIds) {
      const module = byId.get(id);
      if (!module) {
        row.push('', '', '', '', '');
        continue;
      }
      row.push(
        moduleStatus(module),
        module.bestScore ?? '',
        module.quizAttempts,
        `${Math.floor(module.seatSeconds / 60)} of ${Math.round(module.requiredSeconds / 60)}`,
        module.videosRequired ? `${module.videosComplete} of ${module.videosRequired}` : ''
      );
    }
    return row;
  });

  // BOM so Excel reads names with accents as UTF-8; CRLF line endings per RFC 4180.
  return '﻿' + [header, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

export function recordsExportFilename(now = new Date()) {
  const pad = number => String(number).padStart(2, '0');
  return `msha-part48-trainee-records-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}.csv`;
}
