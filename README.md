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
- Quizzes (80% to pass) to unlock the next module
- Instructor override (password-protected) for unlock/complete
- Printable certificate when all modules are complete

## Files

| File | Purpose |
|------|---------|
| `index.html` | Full app (HTML + CSS + JS in one file) |
| `README.md` | This file |

## How to run locally

1. Download or clone this repo.
2. Open `index.html` in Chrome/Edge/Safari **or** serve it over `https` (Netlify, GitHub Pages, company intranet) so embedded videos work reliably.
3. Select name + work location and begin training.

## Instructor mode

Use **Instructor Login** on the start screen. Override password is configured in the app source (search for `INSTRUCTOR_PASSWORD`).

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

- Progress is stored in the trainee's browser (`localStorage` key `msha48_32hr_v2`).
- This app supports classroom delivery; it does not replace required hands-on training (e.g. self-rescuer donning) or company written plans.
- Keep site-specific procedures aligned with current ground control, escape, and fire plans.

## License / use

Internal training material for authorized use by The Allen Company / site operators. Do not treat as a public LMS product without company approval.
