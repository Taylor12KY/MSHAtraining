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
- Current fall-protection sequence covering prevention-through-design, MSHA Fall Protection: Your Lifeline to Safety, Ally Safety PFAS basics, harness inspection/donning, SRLs, swing-fall/clearance, suspension trauma straps, MSHA incident review, and instructor equipment verification
- NIOSH equipment blind-area diagrams with explicit actual-machine and positive-communication safeguards
- Satellite orientation panels for all three sites with Google Earth/full-map links and current-plan warnings
- Plain-language Module 1 glossary covering 19 common underground, quarry, ground-control, blasting, and material-handling terms
- Embedded official MSHA miners' rights trifold plus current DOL complaint and reporting resources
- Recent official MSHA powered-haulage, blasting, confined-space, and equipment-fire alerts
- Dust-safe cleanup, current DPM corrective-action guidance, 3M valved N95 and 6200/07025 fit/use instruction, and NIOSH hearing-protector fitting practice
- Current Red Cross, ACS Stop the Bleed, and OSHA first-aid references, plus LIFEPAK CR2 semi-automatic AED orientation matching site units
- Expanded required-PPE teaching for hard hats, eye protection, safety-toe boots, gloves, hearing protection, hi-vis/reflective clothing, and heat-stress hydration (water/Sqwincher)
- MSHA/NIOSH-based safe-work-procedure and job-task-analysis exercise for assigned tasks
- Underground mine-gas and hardrock gas-management teaching (not confined-space entry), ventilation principles, exposure/action references, stop–warn–withdraw–report response, and MSA ALTAIR 4X function/limits orientation (no trainee bump-test procedure)
- Current MSHA silica and NIOSH mining heat-stress learning material
- Invitation-only learner accounts (Supabase Auth) with server-side progress and local recovery backup
- Instructor-only trainee records, verification signoffs, and server-time audit events
- Instructor spreadsheet export (CSV for Excel): one row per trainee with progress, hours, readiness, every signoff with verifier and date, notes, and per-module status, best quiz score, attempts, seat time, and videos
- Downloadable trainee progress records tied to the authenticated account
- Printable certificate when all modules are complete

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell and learner/instructor interfaces |
| `js/` | Training content, videos, quizzes, and progress gates |
| `src/instructor-auth.js` | Learner/instructor sign-in screens, trainee records, invitations |
| `src/auth-client.mjs` | Supabase Auth adapter (sign-in, invites, password reset) |
| `src/supabase-config.mjs` | Public Supabase project URL and publishable key |
| `netlify/lib/supabase-server.mjs` | Server-side Supabase client and session/role check |
| `netlify/lib/record-store.mjs` | Training records and audit log in Supabase Postgres |
| `netlify/functions/migrate-from-netlify.mjs` | One-time migration from Netlify Identity + Blobs |
| `src/records-export.mjs` | Builds the instructor trainee-records spreadsheet (CSV) |
| `netlify/functions/` | Authenticated progress and instructor record APIs |
| `netlify/lib/training-records.mjs` | Server validation, monotonic merging, and audit storage |
| `netlify/lib/module-requirements.mjs` | **Generated** per-module seat time and required videos used by the server |
| `scripts/generate-requirements.mjs` | Builds `module-requirements.mjs` from `js/modules-*.js` and `js/video-library.js` |
| `scripts/build.mjs` | Builds `dist/`, stamps content-hash cache busters, regenerates server requirements |
| `.github/workflows/ci.yml` | Runs tests and the build on every pull request |
| `README.md` | This file |

## Accounts and data (Supabase)

Sign-in and training records live in the dedicated Supabase project **msha-training** (`igxvqobqcdykfzhsjnyd`, us-east-2), used only by this site.

- **Accounts:** Supabase Auth, invitation-only. Instructors invite trainees or other instructors from **Trainee Records → Invite a trainee or instructor**; the person chooses a password from the email link.
- **Roles:** `public.profiles.role` is `learner` or `instructor`. New accounts are always learners; only the server (invite endpoint) or SQL can promote someone. Users cannot change their own role.
- **Records:** `public.training_records` (progress, signoffs, notes; versioned to prevent lost updates) and `public.audit_events` (append-only, even for the server). Row-level security lets a signed-in user read only their own profile and record; all writes go through the Netlify functions, which validate and merge progress.

### Netlify environment variables

| Variable | Value | Secret |
|---|---|---|
| `SUPABASE_URL` | `https://igxvqobqcdykfzhsjnyd.supabase.co` | No |
| `SUPABASE_SECRET_KEY` | Supabase → Project Settings → API Keys → **Secret key** (`sb_secret_…`) | **Yes** |
| `MIGRATION_TOKEN` | Random token for the one-time migration; delete after migrating | Yes |

### Supabase Auth settings (dashboard)

1. **Authentication → Sign In / Providers:** turn off **Allow new users to sign up** (invitations still work). Set minimum password length to 8 or more.
2. **Authentication → URL Configuration:** set **Site URL** to the production URL and add `https://*--mshatrain.netlify.app/**` (deploy previews) to **Redirect URLs**.
3. **Authentication → Emails → SMTP Settings:** connect a real email sender (for example the company mail server or SendGrid). Supabase's built-in sender only delivers to project team members and a few emails per hour, so invites and password resets will not reach trainees without it.

### Migrating from Netlify Identity

Run once, while Netlify Identity is still enabled, after the variables above are set:

```bash
# Dry run: reports accounts, roles, and records it would copy; changes nothing
curl -X POST -H "Authorization: Bearer $MIGRATION_TOKEN" https://<site>/.netlify/functions/migrate-from-netlify
# Apply
curl -X POST -H "Authorization: Bearer $MIGRATION_TOKEN" "https://<site>/.netlify/functions/migrate-from-netlify?apply=1"
```

Accounts are matched by email (re-running is safe), instructor roles carry over, and progress, signoffs, notes, and audit history are copied. Passwords cannot be copied: each person uses **Forgot password?** once. Afterward, delete `MIGRATION_TOKEN` and disable Netlify Identity.

## Changing modules or videos

The server re-checks every learner's progress against the same module hours and required-video list the browser uses. Those requirements are **generated**, so they cannot drift:

1. Edit module hours in `js/modules-*.js` or videos in `js/video-library.js` (add a `VIDEO_SEQUENCE_TRANSITIONS` line and a `VIDEO_TRAINING_GUIDANCE` entry for each new video).
2. Run `pnpm run requirements` and commit the updated `netlify/lib/module-requirements.mjs`.
3. Run `pnpm test`. CI fails if the generated file is stale, if module hours do not total 32, or if any video lacks guidance or a transition.

Script and stylesheet `?v=` values in `index.html` are placeholders; the build replaces them with content hashes, so there is no version string to bump by hand.

## How to run locally

1. Download or clone this repo.
2. Run `pnpm install`, then `pnpm test` and `pnpm run build`.
3. Run the Netlify development environment or deploy to Netlify with the environment variables below.
4. Accept an instructor-issued learner invitation, sign in, select name + work location, and begin training.

## Completion records

Trainees can download a JSON progress record from the dashboard. Progress is validated by the server and stored in Supabase Postgres under the authenticated user ID. Instructor signoffs are written only by an authenticated instructor role and are separately audit-logged. These support records still do not replace official MSHA documentation.

## Contributing

Other accounts can help build this:

1. Fork or request collaborator access on this repo.
2. Create a branch for your change (e.g. `site-content-clover-bottom`).
3. Edit `index.html` (site orientation lives in the `SITE_CONTENT` object).
4. Run `pnpm test` and open a pull request with a short description of what changed.
5. After merge, Netlify rebuilds from `main` (`dist/` is a build output and is not committed).

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

## Training video updates (PR)
- Module 2: Farmington history films plus legislation/MSHA/rights sequence; long Part 46 rights talk demoted to Module 13 review.
- Module 3: short MSHA Sunshine sting before the full Sunshine case study and W65 films.
- Module 4: tag-board / check-in videos, coal mantrip look-only clip, NIOSH Hazards in Motion, Florida Get Them on Board, three blind-spot videos (Delaware T2 visibility exercise, Blind Spots Can Kill, Irish dump-truck survey demo), NIOSH Blind Area Study PDF plus Cat 966G/992G/Volvo/manual-method resource cards, and MSHA check-in PDF/resource links.
- Module 12: JSA/JHA/task-training focus; mindfulness/Mike Rowe moved to Module 13.
