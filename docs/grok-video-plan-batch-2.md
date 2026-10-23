# Grok video plan, batch 2: Modules 12, 6, 9, 1, 8

**Goal:** close about 4.7 hours of the self-paced gap in the five modules that are furthest behind. Today a trainee who finishes everything in these modules still has to wait out the timer with nothing to do.

| Module | Credited self-paced | Material today | **Add** | New video | New activities |
|---|---|---|---|---|---|
| 12 Accident Prevention & Task Hazards | 3.0 h | 1.7 h | **81 min** | 40 min (5 videos) | 41 min |
| 6 Maps, Escapeways, Evacuation | 3.0 h | 2.1 h | **54 min** | 29 min (5 videos) + 1 fix | 25 min |
| 9 Electrical Hazards | 2.0 h | 1.2 h | **51 min** | 27 min (4 videos) | 24 min |
| 1 Site Orientation | 1.5 h | 0.7 h | **49 min** | 30 min (4 videos) | 19 min |
| 8 Health, Noise, Dust, HazCom | 2.0 h | 1.2 h | **48 min** | 28 min (4 videos) | 20 min |
| **Total** | | | **≈283 min (4.7 h)** | **154 min (22 videos)** | **129 min** |

"Material" counts these things:
- required video time at its real length
- reading at 180 words a minute
- 45 seconds per quiz question
- activity minutes as listed in `ALLEN_ACTIVITIES`

New material only counts if it's **required**. Every video has to go in `MODULE_VIDEO_SEQUENCE`, and every activity needs honest `minutes`.

---

## Ground rules (read first)

1. **Facts.**
   - Site facts come only from `js/site-content.js`. That covers:
     - names and addresses
     - mine IDs, levels, and who to call
     - gathering points
     - the MSHA injury history
   - Anything that isn't there gets marked `[VERIFY: Nathan]` in the script, and in the caption it stays generic ("your supervisor", "your gathering point"). Never make up a name, phone number, location, or equipment model.
2. **Regulations.** Cite the 30 CFR section in the script notes for every rule you state (Part 48, 56, 57, 60, 62, or 47). Check each one against eCFR, not memory. If you're unsure, say it generically and flag it.
3. **Case studies.** Use real MSHA fatality reports or fatality alerts from msha.gov. Put the report title and date in the video `description`. Don't name the victims. Don't blame the mine operator beyond what the report says.
4. **Scope line.** Like batch 1, every video's `VIDEO_TRAINING_GUIDANCE.scope` ends with "Your site's plans always override this video."
5. **Draft label.** Use `author: "Allen Company training (draft v1)"` until a qualified person signs off.
6. **Photos.**
   - Set `photoPending: true` on any `find_the_hazard`, `site_map_marking`, or photo-ID activity that needs real site photos. Nathan will supply the photos.
   - Use illustrated stand-ins in the meantime. Never use stock photos of other companies' mines dressed up as ours.
7. **Don't push to `main`.** Open a PR from a branch so the tests and preview deploy run first. Batch 1 went straight to `main`.

## Technical checklist (same as batch 1)

- **Files:**
  - video: `media/videos/allen-mN-K.mp4`
  - captions: `media/captions/allen-mN-K.vtt` (WebVTT, line-accurate)
  - poster: `media/posters/allen-mN-K.jpg`
  - Continue the numbering from batch 1. The new IDs are listed below.
- **Encoding:** 1280×720 H.264, AAC, at batch 1's settings (about 1.8 MB per minute). The budget for this batch is **300 MB or less**. If a re-render replaces an existing video, keep the same file name. Don't add `-v2` copies, because the build already versions URLs by content hash.
- **Registering each video:**
  - a `SELF_HOSTED_VIDEOS` entry with `durationSeconds` that matches `ffprobe` to the second
  - its ID appended in the `Object.entries({...})` block that extends `MODULE_VIDEO_SEQUENCE`, in the order listed below
  - a `VIDEO_SEQUENCE_TRANSITIONS` line (one sentence that leads in from the video before it)
  - a `VIDEO_TRAINING_GUIDANCE` entry with `focus` and `scope`
- **Activities:** add them to that module's `ALLEN_ACTIVITIES[...].items`, following the existing item types:
  - `multiple_choice`, `ordering`, `matching`, `scenario_short_answer`
  - `find_the_hazard`, `map_trace`, `site_map_marking`, `site_lookup`
  - `sds_lookup`, `jsa_worksheet`, `self_check`
  - Update the module's total `minutes`.
- **Before the PR,** run these and confirm all tests pass:
  - `pnpm run requirements` (regenerates `netlify/lib/module-requirements.mjs`)
  - `pnpm test`
  - `pnpm build`
- **Grandfathered progress:** trainees who already completed a module keep it. New required videos only apply to modules not yet completed. The server handles this, so there's nothing to do.

---

## Fix first: Module 6, `allen-m6-1` (Fire warning and stench gas)

At **01:08.7–01:12.7** the line is "If you smell smoke or feel heat in your self-rescuer, put it on." That's wrong and could hurt someone:
- A working SCSR gets hot. Heat is normal and is no reason to wait for it.
- The trigger to put it on is the first sign of fire or smoke, or a CO alarm or stench gas.

**Replace the line with:** "At the first sign of smoke, a CO alarm, or stench gas, put on your self-rescuer right away. Don't wait to see how bad it gets." Then:
- re-render the narration for that segment
- update the VTT
- keep the file name
- re-measure `durationSeconds`

---

## Module 12: Accident Prevention & Health and Safety Aspects of Tasks (+81 min)

**Today:** four outside JSA clips, six Allen task-training videos (`allen-m12-1`–`6`), and 48 minutes of activities.

**Missing:**
- how accidents actually happen at operations like ours
- the workplace exam
- the right and duty to stop unsafe work

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m12-7` | Workplace exams: what the examiner looks for | 10 min | Who does the exam and when (each shift, before work starts, 30 CFR 56/57.18002). Walk a working place: ground, berms, equipment, guarding, housekeeping, electrical. How hazards get fixed or the area gets posted, and how the record is kept. What the trainee does when they find a hazard the exam missed. |
| `allen-m12-8` | Case study: ground fall during scaling | 8 min | One real MSHA fatality report from an underground stone mine. Tie it to the Clover Bottom record (face ground falls during scaling and shot prep, from `SITE_SAFETY_RECORDS`). What went wrong, what control would have stopped it, what the trainee does differently. |
| `allen-m12-9` | Case study: powered haulage (struck-by and backing) | 8 min | One real MSHA powered-haulage fatality at a surface or underground stone operation: a pedestrian struck, or a truck backing over an edge or a berm failing. Controls: make contact before you approach, berm height, spotters, the blind-spot lessons from Module 4. |
| `allen-m12-10` | Case study: maintenance without lockout or blocking | 8 min | One real MSHA fatality where equipment moved during repair (a conveyor, crusher, or raised bed). Controls: lock and tag, block against motion (56/57.14105), try-start. Lead into Module 9's lockout video. |
| `allen-m12-11` | Stop work: when and how to say no | 6 min | Using the miners' rights from Module 2 at work. How to stop a task, who to tell, what happens next. Protection from retaliation (§105(c)). Example dialogue between a new miner and a lead. |

**Activities (+41 min):**
- **M12-n `find_the_hazard`, 5 min ×3 (`photoPending`):** one Allen working place each for the plant, the pit or face, and the shop, with 4–6 hazards each.
- **M12-o `jsa_worksheet`, 8 min:** a workplace-exam form for a photo of a working place. The trainee lists the hazards and the fix or posting for each.
- **M12-p–r `scenario_short_answer`, 4 min ×3:** one per case study: "What was the first missed control?" and "What would you have done?"
- **M12-s `ordering`, 3 min:** the steps to stop unsafe work.
- **M12-t `multiple_choice`, 1.5 min ×2:** exam timing and recordkeeping.

---

## Module 6: Mine Maps, Escapeways, Emergency Evacuation & Barricading (+54 min)

**Today:**
- general NIOSH and Florida escape videos and the 44-minute Sago video
- `allen-m6-1`–`3`
- 17 minutes of activities, including one `map_trace`

**Missing:** **our own escape routes.** This is the most site-specific requirement in 48.5(b)(5) and 48.25(b)(4).

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m6-4` | Escapeway map walkthrough: Boonesboro Quarry | 6 min | An animated pass over the Boonesboro map: Level 1 and the shop, primary and secondary escapeways, how escapeways are marked, gathering point, where the maps are posted. Use only the layout in `SITE_CONTENT`; flag any route detail as `[VERIFY: Nathan]`. |
| `allen-m6-5` | Escapeway map walkthrough: Clover Bottom #1 and #2 | 6 min | Both mines and the shared surface, escapeways for each, tag-out at the right mine (#1 / 15-00112 vs #2 / 15-19898), gathering point. |
| `allen-m6-6` | Escapeway map walkthrough: Dix River Stone | 6 min | Header mining on two levels underground plus the surface areas, escapeways, gathering point. |
| `allen-m6-7` | Smoke in the drift: escape decisions | 6 min | A branching story: the CO alarm goes off, the trainee puts on the SCSR at once (use the corrected rule above), follows lifelines and escapeway markers, decides when to switch to a second unit, and decides when to barricade rather than walk on. |
| `allen-m6-8` | Accounting for everyone | 5 min | Why tag-in and tag-out matter in an evacuation, how the gathering-point headcount works, and never going back in for a missing person on your own. Tie it to the Clover Bottom check-in findings in `SITE_SAFETY_RECORDS`. |

**Activities (+25 min):**
- **M6-g–i `map_trace`, 5 min ×3:** one per site. Trace the primary and secondary escapeway from a marked work area to the gathering point.
- **M6-j `scenario_short_answer`, 6 min:** the branching smoke scenario, with free-text reasoning at two decision points.
- **M6-k `ordering`, 2 min:** the steps for putting on an SCSR in smoke.
- **M6-l `multiple_choice`, 1.5 min:** when to barricade.

---

## Module 9: Electrical Hazards (+51 min)

**Today:** five outside videos (general awareness, a splice kit, Master Lock LOTO, an arc-flash fatality), `allen-m9-1`, and 11 minutes of activities.

**Missing:**
- lockout on our own equipment
- overhead lines on haul roads and at drills
- trailing cables underground
- what a non-qualified miner may and may not touch

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m9-2` | Lockout on a crusher conveyor | 10 min | Step by step on a plant conveyor: tell people, shut down, open the disconnect, put on your own lock and tag, release stored energy (belt tension, gravity, hydraulics), block against motion, try-start, then the reverse when the job is done. One lock per person. Never remove someone else's lock. Cite 56/57.12016 and .12017, and 56/57.14105. |
| `allen-m9-3` | Overhead power lines | 6 min | Raised truck beds, drill masts, loader buckets and cranes near lines. Minimum clearance, using a spotter, and what to do after contact: stay in the cab unless there's a fire, then jump clear with both feet together and shuffle away. |
| `allen-m9-4` | Trailing cables and portable equipment underground | 6 min | Inspect for cuts and bad splices, don't drive over or pinch cables, handle them only with approved methods, and report damage. Ground-fault protection in plain words. |
| `allen-m9-5` | You're not the electrician | 5 min | What only a qualified person does (56/57.12008 and .12019). What a non-qualified miner can do: look, report, lock out their own task. Real "just reset it" moments where the answer is no. |

**Activities (+24 min):**
- **M9-f `ordering`, 4 min:** conveyor lockout steps.
- **M9-g `find_the_hazard`, 4 min (`photoPending`):** a damaged trailing cable and a bad splice.
- **M9-h `scenario_short_answer`, 4 min:** a truck bed contacts a power line.
- **M9-i `matching`, 3 min:** tasks matched to "qualified person only" or "any trained miner".
- **M9-j `self_check`, 3 min:** a lock, tag and try-start checklist.
- **M9-k–l `multiple_choice`, 1.5 min ×2:** whose lock comes off, and ground-fault basics.
- **M9-m `scenario_short_answer`, 3 min:** "The crusher operator asks you to reset a breaker."

---

## Module 1: Site Orientation (+49 min)

**Today:** three walkthroughs of about 3 minutes each (`allen-m1-1`, `-2`, `-4`), the emergency card (`allen-m1-5`), and 12 minutes of activities.

**Missing:** enough depth that a new miner could find their way around before the in-person tour.

**Note:** every trainee is currently required to watch all three site videos. The detailed tours below are about 8 minutes each so this stays reasonable. Jacob may later decide to show each trainee only their own site, which would change the math. Build them as planned for now.

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m1-6` | Boonesboro Quarry: detailed tour | 8 min | Use `SITE_CONTENT["Boonesboro Quarry"]`: underground limestone since 1939, the Kentucky River setting, the surface and Level 1, the mine shop, the BT3 stockpile under the KY 627 bridge, site leadership and the licensed blasters, check-in, traffic, PPE, and the hazard patterns in `SITE_SAFETY_RECORDS`. |
| `allen-m1-7` | Clover Bottom Quarry #1 and #2: detailed tour | 8 min | Old mine #1 (15-00112, M.A. Walker since about 1950, Allen since 2004) and new mine #2 (15-19898, 2021). The shared surface, tagging in at the right mine, the leads named in `SITE_CONTENT`, and the ground-fall pattern. |
| `allen-m1-8` | Dix River Stone: detailed tour | 8 min | Surface production moving to underground header mining on two levels in the Camp Nelson Limestone. Pre-shift checks, electrical condition, stepping down safely (the record's takeaway). |
| `allen-m1-9` | Your first day: check-in to check-out | 6 min | Same at every site: arrive, sign in or tag in, meet your lead, PPE check, task training before any task (48.7), how to report a hazard, and tag out at the end of the shift. |

**Activities (+19 min):**
- **M1-f `site_lookup`, 5 min:** find these on your own site page: escape route, the mine-command number, the site leader.
- **M1-g `find_the_hazard`, 5 min (`photoPending`):** a photo ID of five landmarks at your own site.
- **M1-h `ordering`, 3 min:** first-day steps.
- **M1-i `scenario_short_answer`, 3 min:** "You're new and you're lost on Level 1."
- **M1-j–k `multiple_choice`, 1.5 min ×2:** check-in rules and task training before work.

---

## Module 8: Health, Noise, Dust & Hazard Communication (+48 min)

**Today:**
- outside dust, DPM, HazCom and hearing videos (including a 19-minute hearing conservation video)
- `allen-m8-1`
- 4.5 minutes of activities

**Missing:**
- silica at a limestone operation
- diesel exhaust underground
- noise at our own equipment
- reading a real SDS

| ID | Title | Length | Content |
|---|---|---|---|
| `allen-m8-2` | Silica and dust at our operations | 8 min | Where dust comes from: drilling, blasting, crushing, screening, haul roads, cleanup. Controls: water sprays, enclosed cabs with filters and doors kept shut, no dry sweeping or blowing off with compressed air. When a respirator is required. **Check the current MSHA silica rule (30 CFR Part 60: the exposure limit and the metal/nonmetal compliance date) on msha.gov before scripting**, and state only what's in force. |
| `allen-m8-3` | Noise at our sites | 7 min | Loud places: the plant, the drill, the crusher, the shop. Hearing protection and when to wear double protection. The hearing conservation program and annual hearing tests (30 CFR Part 62). Signs of hearing loss. |
| `allen-m8-4` | Diesel exhaust underground | 6 min | What diesel particulate matter (DPM) is and why it matters underground (57.5060). Engine idling, maintenance, ventilation. Report a smoky machine. |
| `allen-m8-5` | Reading an SDS: a real product from our sites | 7 min | Walk through one product the sites actually use, such as diesel fuel, a hydraulic oil, or an emulsion or ANFO product. **Get the actual product and SDS from Nathan.** Cover the 16 sections, the four to read first (identity, hazards, first aid, PPE), and where the SDS binder is. |

**Activities (+20 min):**
- **M8-c `sds_lookup`, 6 min:** answer five questions from the real SDS.
- **M8-d `matching`, 3 min:** GHS pictograms to their meaning.
- **M8-e `self_check`, 3 min:** roll, pull and hold earplug fit.
- **M8-f `find_the_hazard`, 4 min (`photoPending`):** dust controls missing at the plant.
- **M8-g `scenario_short_answer`, 4 min:** "Your cab's door seal is torn on a dry, dusty day."

---

## What we need from people

| From | What | Needed for |
|---|---|---|
| **Nathan Harrison** | Escapeway maps (or photos of the posted maps) for each site; route details to verify | `allen-m6-4`–`6`, M6-g–i |
| **Nathan Harrison** | Site photos: plant, face or pit, shop, landmarks, a damaged cable, dust controls | All `photoPending` activities |
| **Nathan Harrison** | One real SDS and product name used on site | `allen-m8-5`, M8-c |
| **Nathan Harrison** | Corrections to anything marked `[VERIFY: Nathan]` | All site videos |
| **Qualified instructor** | Review of all batch 1 and batch 2 videos, then remove "draft v1" from the label | Launch |

## Done means

- [ ] Module 6 caption fix shipped (`allen-m6-1` re-rendered and VTT updated)
- [ ] 22 new videos (154 minutes or more), each with captions, a poster, a transition, guidance, and an `ffprobe`-matched duration
- [ ] New activities added with honest `minutes` (about 129 minutes total)
- [ ] `pnpm run requirements`, `pnpm test` and `pnpm build` all clean
- [ ] Media added in this batch is 300 MB or less
- [ ] Opened as a PR, not pushed to `main`
- [ ] Afterwards, the self-paced gap is about 1.8 h, all in Modules 2, 11, 5, 7 and 3 (batch 3)
