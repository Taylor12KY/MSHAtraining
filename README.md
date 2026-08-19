# MSHA Part 48 – 32-Hour Classroom Training App

Single-page HTML training app for **MSHA Part 48** new miner classroom training used at Allen Company sites:

- **Boonesboro Quarry** (underground limestone, Mine ID 15-00006)
- **Clover Bottom Quarry**
- **Dix River Stone**

**Repo:** https://github.com/Taylor12KY/MSHAtraining  
Grok (xAI) has write access and can update files in this repo from chat.

## Live deploy

The production copy is often hosted on **Netlify** as `index.html`. After edits here, redeploy to Netlify (or enable GitHub Pages / Netlify continuous deploy from this repo).

## Features

- Site-specific **Module 1** orientation based on selected location
- 13 modules covering Part 48 classroom topics
- **Anti-skip tracking** (KnowBe4-style): auto seat-time matching credited hours, progress saved, pauses when tab is hidden, scroll-to-end required before quiz
- Ten-question mastery quizzes requiring 100% to unlock the next module
- Inactivity-aware seat-time tracking with progress validation
- Randomized quiz presentation with recent attempt history
- Missed-topic remediation with a focused knowledge check before a full quiz retake
- Current fall-protection sequence with the 2026 OSHA personal fall-arrest webinar, NIOSH prevention guidance, MSHA incident review, and instructor equipment verification
- NIOSH equipment blind-area diagrams with explicit actual-machine and positive-communication safeguards
- Dust-safe cleanup, current DPM corrective-action guidance, 3M valved N95 and 6200/07025 fit/use instruction, and NIOSH hearing-protector fitting practice
- MSHA/NIOSH-based safe-work-procedure and job-task-analysis exercise for assigned tasks
- Expanded mine-gas recognition, exposure/action references, likely accumulation areas, sensory warnings, stop–warn–withdraw–report response, and a supervisor-operated MSA ALTAIR 4X orientation
- Current MSHA silica and NIOSH mining heat-stress learning material
- Invitation-only learner accounts with server-side progress and local recovery backup
- Instructor-only trainee records, verification signoffs, and server-time audit events
- Downloadable trainee progress records tied to the authenticated account
- Printable certificate when all modules are complete

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell and learner/instructor interfaces |
| `js/` | Training content, videos, quizzes, and progress gates |
| `src/instructor-auth.js` | Netlify Identity learner/instructor account client |
| `netlify/functions/` | Authenticated progress and instructor record APIs |
| `netlify/lib/training-records.mjs` | Server validation, monotonic merging, and audit storage |
| `README.md` | This file |

## How to run locally

1. Download or clone this repo.
2. Run the Netlify development environment or deploy to Netlify; Identity and Blobs require the Netlify runtime.
3. Accept an instructor-issued learner invitation, sign in, select name + work location, and begin training.

## Completion records

Trainees can download a JSON progress record from the dashboard. Progress is validated and stored in Netlify Blobs under the authenticated user ID. Instructor signoffs are written only by an authenticated instructor role and are separately audit-logged. These support records still do not replace official MSHA documentation.

## Contributing

Other accounts can help build this:

1. Fork or request collaborator access on this repo.
2. Create a branch for your change (e.g. `site-content-clover-bottom`).
3. Edit `index.html` (site orientation lives in the `SITE_CONTENT` object).
4. Open a pull request with a short description of what changed.
5. After merge, redeploy `index.html` to Netlify (or connected host).

### Suggested next work

- [ ] Flesh out **Clover Bottom Quarry** Module 1 with accurate site layout, escapeways, gathering points
- [ ] Flesh out **Dix River Stone** Module 1 the same way
- [ ] Confirm primary/secondary escapeways and gathering points for Boonesboro with site maps
- [ ] Optional: add more authorized training videos / local media
- [ ] Optional: GitHub Pages or Netlify auto-deploy from `main`

## Notes

- Authenticated progress is stored server-side; an account-scoped browser copy is retained only as a recovery backup for temporary network loss.
- This app supports the 32-hour classroom portion; it does not replace the approximately 8 hours of mine-site training, required demonstrations or hands-on activities, task training, the approved Part 48 plan, or official MSHA records.
- Keep site-specific procedures aligned with current ground control, escape, and fire plans.

## License / use

Internal training material for authorized use by The Allen Company / site operators. Do not treat as a public LMS product without company approval.
