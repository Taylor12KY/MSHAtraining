# Grok video plan, batch 3: Modules 11, 2, 5, 7, 3

**Goal:** close the last ~1.8 hours of the self-paced gap. After batches 2 and 3, every module should have at least as much material as its credited self-paced time.

**Do batch 2 first.** This plan uses the same ground rules, technical checklist, file naming and size rules as `docs/grok-video-plan-batch-2.md`. Read that file's "Ground rules" and "Technical checklist" sections before starting; they apply here unchanged.

| Module | Credited self-paced | Material today | **Add** | New video | New activities |
|---|---|---|---|---|---|
| 11 Blasting, Explosives & Mine Gases | 2.0 h | 1.35 h | **39 min** | 23 min (4 videos) | 16 min |
| 2 History, MSHA & Miners' Rights | 2.0 h | 1.5 h | **32 min** | 21 min (3 videos) | 11 min |
| 5 Work Environment & Hazard Recognition | 3.5 h | 3.3 h | **13 min** | 7 min (1 video) | 6 min |
| 7 Ground Control & Ventilation | 3.0 h | 2.8 h | **12 min** | 6 min (1 video) | 6 min |
| 3 Self-Rescue (W65) | 2.5 h | 2.3 h | **11 min** | 5 min (1 video) | 6 min |
| **Total** | | | **≈107 min (1.8 h)** | **62 min (10 videos)** | **45 min** |

Modules 5, 7 and 3 already have plenty of outside video. What they lack is **Allen-specific** content: Module 5 and Module 7 have no Allen videos or activities at all. So the short pieces below tie the general material to our own sites.

Media budget for this batch: **130 MB or less** (62 min at batch 1's ~1.8 MB per minute is about 115 MB).

---

## Module 11: Blasting, Explosives & Mine Gases (+39 min)

**Today:** outside gas, fire, ALTAIR 4X and explosives-handling videos, one Allen video on surface hazards (`allen-m11-1`), and 8.5 minutes of activities.

**Missing:** how blasting works **at our sites** (warnings, guarding, misfires, re-entry) and what a gas-monitor alarm means for a trainee.

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m11-2` | Blast-area security at our sites | 7 min | Who controls the blast area (the licensed blaster; `SITE_CONTENT` names licensed blasters at Boonesboro). Clearing the area, guarding every entrance, warning signals before the shot and the all-clear after it (30 CFR 56/57.6306). **The actual signals, guard positions and timing at each site are `[VERIFY: Nathan]`.** Until verified, say "your site's warning signal" rather than a specific pattern. |
| `allen-m11-3` | Misfires: what you do and don't do | 5 min | What a misfire is. The trainee's only job: stay out, keep others out, report it to the blaster. Only the blaster and authorized people handle it, after the required wait (56/57.6311). Never drill into or near old holes or bootlegs (57.6312 or the right section; check eCFR). |
| `allen-m11-4` | After the shot: fumes and re-entry | 6 min | Blasting makes carbon monoxide (CO) and nitrogen oxides (NOx). Orange-brown smoke means NO₂. Fumes collect in dead ends and low spots. Re-entry only after ventilation clears the area and the examiner tests it and says it's safe. Tie to the module objective "re-entry is authorized only after ventilation and testing". |
| `allen-m11-5` | When the gas monitor alarms | 5 min | Supervisors carry the MSA ALTAIR 4X (from the module objectives). What the trainee hears or sees when it alarms: low O₂, CO, H₂S or combustible gas. The response is always the module's "stop, warn, withdraw, report". Never rely on smell. State alarm set points only if Nathan confirms the sites' settings; otherwise describe them as "the alarm levels your site sets". |

**Activities (+16 min):**
- **M11-e `ordering`, 3 min:** the blast sequence from the trainee's point of view: warning, clear out, guard, shot, wait, test, all-clear.
- **M11-f `scenario_short_answer`, 4 min:** "You find a hole with wire still in it at the face after the all-clear."
- **M11-g `matching`, 3 min:** each gas (CO, NO₂, H₂S, CH₄, low O₂) to its main hazard and where it collects.
- **M11-h `find_the_hazard`, 3 min (`photoPending`):** an unguarded blast-area entrance.
- **M11-i–j `multiple_choice`, 1.5 min ×2:** what to do when the monitor alarms, and who handles a misfire.

---

## Module 2: History, MSHA & Miners' Rights (+32 min)

**Today:** eight outside videos (Farmington, legislation history, what MSHA is, miners' rights), `allen-m2-1`, and 6.5 minutes of activities.

**Missing:**
- a modern disaster that shaped today's enforcement
- **how** a miner actually uses their rights
- the trainee's own training rights

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m2-2` | Upper Big Branch (2010): what happened and what changed | 9 min | Use MSHA's published investigation report. Coal, but the lesson applies to every mine: examinations that weren't done or were falsified, intimidation of miners who raised concerns, and the enforcement changes afterward (pattern of violations, examination rules). No victim names. |
| `allen-m2-3` | Using your rights: requesting an inspection and filing a complaint | 7 min | Step by step: request an MSHA inspection when you believe a violation or imminent danger exists (§103(g)); you can ask that your name be kept confidential. Filing a discrimination complaint under §105(c), generally within 60 days (already in the module). Where to call or file, using only contact details on msha.gov. |
| `allen-m2-4` | Your training rights: Part 48 and the 5000-23 form | 5 min | Training before assignment (48.5 or 48.25), task training before a new task (48.7), annual refresher (48.8), pay for training time, and the MSHA Form 5000-23 the trainee gets and should keep. Ties to the instructor signoff `form5000_23` in the app. |

**Activities (+11 min):**
- **M2-e `scenario_short_answer`, 4 min:** "Your lead tells you to skip the workplace exam to make up time. What can you do?"
- **M2-f `matching`, 3 min:** each right to its source (§103(g), §105(c), Part 48 training, records review).
- **M2-g `ordering`, 2.5 min:** the steps to file a §105(c) complaint.
- **M2-h `multiple_choice`, 1.5 min:** what the 5000-23 form is for.

---

## Module 5: Work Environment & Hazard Recognition (+13 min)

**Today:** 23 outside videos (about 180 minutes) on the mining environment, workplace exams, PPE, fall protection, berms and stockpiles. No Allen video and no Allen activities.

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m5-1` | What hurts people at our operations | 7 min | Walk the injury patterns in `SITE_SAFETY_RECORDS` for each site (ground falls during scaling, haulage, check-in gaps, pre-shift checks, electrical condition, stepping down) and match each one to the control taught in this module. Use only the counts and takeaways in that file; it carries an "as of" date (`MSHA_DATA_AS_OF`), so say "as of mid-October 2026". |

**Activities (+6 min):**
- **M5-a `find_the_hazard`, 4 min (`photoPending`):** a working place at one of our sites with missing PPE, a low berm and a trip hazard.
- **M5-b `multiple_choice`, 1.5 min:** why PPE is the last layer of control.

Create `ALLEN_ACTIVITIES["5"]` (title, minutes, items), following the shape of the other modules.

---

## Module 7: Ground Control & Ventilation (+12 min)

**Today:** 13 outside videos (about 150 minutes) on ground control in limestone mines, scaling, roof bolting, highwalls and ventilation. No Allen video and no Allen activities.

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m7-1` | Checking and scaling the back at our mines | 6 min | Why it matters here: the Clover Bottom record's face ground falls all happened during scaling or shot preparation (`SITE_SAFETY_RECORDS`), and Dix River's header mining puts more people underground. Sound and look before you go under, scale from a safe position, never work under unsupported or unscaled ground, report what you find (56/57.3200; check eCFR for the scaling and examination sections). Where the ground control plan is kept: `[VERIFY: Nathan]`. |

**Activities (+6 min):**
- **M7-a `find_the_hazard`, 3 min (`photoPending`):** loose rock, a cracked pillar and a person under unscaled ground.
- **M7-b `ordering`, 1.5 min:** check, sound, scale, report.
- **M7-c `multiple_choice`, 1.5 min:** what to do when you hear the back "talking".

Create `ALLEN_ACTIVITIES["7"]` the same way as for Module 5.

---

## Module 3: Self-Rescue, MSA W65 (+11 min)

**Today:** the Sunshine Mine videos, three self-rescuer films, `allen-m3-1` (W65 care and inspection), 9.5 minutes of activities, and the 1-hour hands-on classroom session (from PR #21).

**Missing:** a plain statement of the **W65's limits**. Some of the outside films describe oxygen-supplying units, and trainees need to know the difference.

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m3-2` | What the W65 does and doesn't do | 5 min | The W65 is a **filter** self-rescuer: it turns carbon monoxide into carbon dioxide, and it **does not supply oxygen**. So it doesn't protect you in air that is low on oxygen. It gets hot, and that's normal (the heat comes from converting CO); keep it on until you reach fresh air. It's for escape only. Contrast it briefly with the oxygen-supplying units in the older films so trainees aren't confused. Check every statement against MSA's W65 instructions; anything not in them is `[VERIFY: Nathan]`. |

**Activities (+6 min):**
- **M3-f `scenario_short_answer`, 3 min:** "Your W65 is getting hot and your mouth is dry. What do you do?"
- **M3-g–h `multiple_choice`, 1.5 min ×2:** what the W65 protects against, and what it doesn't.

---

## What we need from people

| From | What | Needed for |
|---|---|---|
| **Nathan Harrison** | Each site's blast warning signals, guard procedure and wait times | `allen-m11-2`, `allen-m11-3` |
| **Nathan Harrison** | ALTAIR 4X alarm set points used at the sites | `allen-m11-5`, M11-j |
| **Nathan Harrison** | Where each site's ground control plan is kept | `allen-m7-1` |
| **Nathan Harrison** | Photos: a blast-area entrance, a working place, ground conditions | All `photoPending` activities |
| **Qualified instructor** | Review of the W65 statements against MSA's instructions | `allen-m3-2` |

## Done means

- [ ] 10 new videos (62 minutes or more), each with captions, a poster, a transition, guidance, and an `ffprobe`-matched duration
- [ ] New activities added with honest `minutes` (about 45 minutes total), including new `ALLEN_ACTIVITIES` entries for Modules 5 and 7
- [ ] `pnpm run requirements`, `pnpm test` and `pnpm build` all clean
- [ ] Media added in this batch is 130 MB or less
- [ ] Opened as a PR, not pushed to `main`
- [ ] Afterwards, every module's material meets or exceeds its credited self-paced time. We'll re-measure after both batches land, because these figures are estimates (reading speed, quiz time).
