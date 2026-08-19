/* ============================================================
   MSHA Part 48 – 32-Hour Classroom Training App
   ============================================================ */

const STORAGE_KEY = 'msha48_32hr_v2';

const MODULES_PART_1 = [
  {
    id: 1,
    title: "Site Orientation",
    hours: 1.5,
    objectives: [
      "Identify your assigned work location and its primary operations",
      "Recognize the main site-specific hazards and rules",
      "Know how to check in and report hazards at this location"
    ],
    content: ``,  // filled dynamically by getModule(1)
    questions: []  // filled dynamically
  },
  {
    id: 2,
    title: "Miners' Rights, Supervisors & Hazard Reporting",
    hours: 2.0,
    objectives: [
      "Explain key statutory rights of miners under the Mine Act",
      "Describe the authority and responsibilities of supervisors and miners' representatives",
      "Identify how and when to report hazards and protections against discrimination"
    ],
    content: `
      <div class="content-section">
        <h3>1. Statutory Rights of Miners (Mine Act § 2 & related)</h3>
        <p>Every miner has the right to a safe and healthful workplace. Key rights include:</p>
        <ul>
          <li>The right to be protected from discrimination or retaliation for making safety complaints, refusing unsafe work under certain conditions, or participating in inspections/investigations.</li>
          <li>The right to be represented during inspections and to request an inspection when there is a reasonable belief of a violation or imminent danger.</li>
          <li>The right to receive required training before being assigned work and to receive pay for training time (in most cases).</li>
          <li>The right to review records related to their own exposure, accidents, and training.</li>
        </ul>
        <div class="key-box"><strong>Remember:</strong> Section 105(c) of the Mine Act protects miners from discrimination for engaging in protected safety activities. If you believe you have been discriminated against, you generally have 60 days to file a complaint with MSHA.</div>
      </div>
      <div class="content-section official-resource-panel">
        <div class="official-resource-heading">
          <div>
            <span class="resource-badge resource-badge-required">Required instructor review</span>
            <span class="resource-badge">Official MSHA handout</span>
            <h3>Miners' Rights and Responsibilities Trifold</h3>
          </div>
          <span class="document-meta">3-page PDF · MSHA 3116a</span>
        </div>
        <p>Use this official handout to identify how to report hazards, request MSHA action, participate in inspections, raise a good-faith safety concern, and report retaliation. Record important dates and facts; a Section 105(c) discrimination complaint generally must be filed within 60 days.</p>
        <div class="resource-grid">
          <a class="resource-card" href="/assets/docs/msha-miners-rights-trifold.pdf" target="_blank" rel="noopener">
            <strong>Open the classroom copy ↗</strong>
            <span>Reliable local copy for this course</span>
          </a>
          <a class="resource-card" href="https://arlweb.msha.gov/S%26HINFO/minersrights/MinersRightsTrifold.pdf" target="_blank" rel="noopener noreferrer">
            <strong>Open the official MSHA PDF ↗</strong>
            <span>Original agency-hosted document</span>
          </a>
          <a class="resource-card" href="https://www.dol.gov/general/topics/whistleblower" target="_blank" rel="noopener noreferrer">
            <strong>DOL miner protections</strong>
            <span>Current rights, complaint, and whistleblower resources</span>
          </a>
          <a class="resource-card" href="https://www.dol.gov/general/apps/msha/miner-safety-health" target="_blank" rel="noopener noreferrer">
            <strong>MSHA Miner Safety &amp; Health app</strong>
            <span>Rights information, alerts, and reporting resources</span>
          </a>
        </div>
        <details class="document-embed">
          <summary>Preview the trifold in this module</summary>
          <div class="document-frame-wrap">
            <object class="document-frame" data="/assets/docs/msha-miners-rights-trifold.pdf#view=FitH" type="application/pdf">
              <p>Your browser cannot display the PDF here. <a href="/assets/docs/msha-miners-rights-trifold.pdf" target="_blank" rel="noopener">Open the classroom copy</a>.</p>
            </object>
          </div>
        </details>
        <div class="key-box"><strong>Completion note:</strong> opening a document does not complete the module. The instructor discussion, required attention time, and 100% quiz standard still apply. Current law, MSHA guidance, and the approved training plan control.</div>
      </div>
      <div class="content-section">
        <h3>2. Authority & Responsibility of Supervisors</h3>
        <p>Supervisors (including leadmen and those with authority to direct work) have both the authority and the legal responsibility to:</p>
        <ul>
          <li>Ensure work is performed in accordance with mandatory standards and the mine's approved plans.</li>
          <li>Correct or report hazards promptly.</li>
          <li>Provide or arrange for required training and task training.</li>
          <li>Enforce company rules that implement MSHA requirements.</li>
        </ul>
        <p>Miners' representatives also have specific rights under the Act to accompany inspectors and to participate in certain proceedings.</p>
      </div>
      <div class="content-section">
        <h3>3. Company Rules & Reporting Hazards</h3>
        <p>Your operator will have written rules and procedures for reporting hazards. Typical expectations:</p>
        <ul>
          <li>Report immediately any condition that could cause injury, illness, or death.</li>
          <li>Know the chain of command and the method (verbal, written, radio, etc.) required at your mine.</li>
          <li>Never assume someone else has already reported a serious hazard.</li>
        </ul>
        <div class="warning-box"><strong>Practical tip:</strong> Highwalls, rib/roof conditions, mobile equipment (loaders, haul trucks), conveyor guarding, and diesel equipment conditions are frequent sources of reportable hazards. Know how your site documents and tracks these.</div>
      </div>

      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">MSHA Miners Rights and Responsibilities (overview video) · ~40 min</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Instructional overview of miners rights and responsibilities under the Mine Act. Use with instructor discussion.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;background:#000;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/QGkT8Ahh1-E?rel=0&modestbranding=1&playsinline=1" title="MSHA Miners Rights and Responsibilities (overview video)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=QGkT8Ahh1-E" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
        <p style="font-size:0.75rem;color:var(--text-muted);">YouTube cannot fully lock seeking in embeds. Required <strong>module seat time</strong> (credited hours) still must complete before the quiz.</p>
      </div>

      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Required Viewing / Instructor Presentation</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Watch the materials above and complete instructor discussion. Full module seat time is 2.0 hours (auto-tracked).</p>
        <div class="timer-display" id="timer-2">120:00</div>
        <button class="btn btn-sm" id="btn-timer-2" onclick="startTimer(2, 120)">Start 2-hour Required Timer (120 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-2">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "A miner reasonably believes a condition may violate a safety standard or create an imminent danger. Which action is consistent with the miner's rights?", options: ["Report the concern and request an MSHA inspection using the available protected channels", "Wait for an injury before saying anything", "Alter the condition without authorization", "Post the concern publicly instead of notifying anyone responsible for safety"], answer: 0 },
      { q: "Who has both the authority and the responsibility to ensure work complies with mandatory standards?", options: ["Only the mine superintendent", "Supervisors (including those who direct work)", "Only MSHA inspectors", "Only the safety manager"], answer: 1 },
      { q: "True or False: A miner can be discriminated against for making a good-faith safety complaint.", options: ["True", "False"], answer: 1 },
      { q: "What should you do if you discover a condition that could cause serious injury?", options: ["Wait until the end of shift to report it", "Assume a supervisor already knows", "Report it immediately according to company procedures", "Only report it if someone is already injured"], answer: 2 },
      { q: "Miners have the right to receive required training:", options: ["Only after they have worked 30 days", "Before being assigned work duties (with limited exceptions)", "Only if they request it in writing", "Only for underground work"], answer: 1 },
      { q: "Section 2 of the Mine Act emphasizes that the first priority of the mining industry is:", options: ["Production targets", "The health and safety of its most precious resource – the miner", "Cost control", "Equipment utilization"], answer: 1 }
    ]
  },
  {
    id: 3,
    title: "Self-Rescue & Respiratory Devices",
    hours: 3.5,
    objectives: [
      "Explain the purpose and limitations of the MSA W65 filter self-rescuer used at these operations",
      "Describe inspection, carrying, storage, and basic donning requirements for the W65",
      "Understand that hands-on practice with an approved W65 training unit is still required"
    ],
    content: `
      <div class="content-section">
        <h3>The MSA W65 Used at These Operations</h3>
        <p>The MSA W65 is an air-purifying, one-time escape respirator intended for protection from carbon monoxide produced by an underground fire or explosion. It filters contaminated ambient air; it does <strong>not</strong> create or supply oxygen.</p>
        <div class="key-box"><strong>Critical limitation:</strong> The W65 does not protect in an oxygen-deficient atmosphere. Use it only for emergency escape, follow the mine emergency plan, and move promptly toward fresh air by the designated escapeway.</div>
      </div>
      <div class="content-section">
        <h3>MSA W65 Inspection, Carrying & Use</h3>
        <ul>
          <li>Carry the sealed unit in the approved belt or shoulder location so it is immediately available.</li>
          <li>Inspect the container and protective equipment as required by the mine procedure and current MSA instructions. Report dents, punctures, an opened or damaged seal, or any other questionable condition immediately.</li>
          <li>Do not open a service unit for practice. Use the designated W65 training unit during hands-on instruction.</li>
          <li>Practice the sequence: open the container, remove and unfold the unit, insert the mouthpiece, apply the nose clip, position the head harness, replace the hard hat, and begin escape.</li>
          <li>Breathe through the mouthpiece, keep the nose clip in place, and do not remove the device until you are confirmed to be in fresh air.</li>
          <li>The sealed W65 is a one-use escape device. After it is opened or used, follow site procedures to remove it from service.</li>
        </ul>
      </div>
      <div class="content-section">
        <h3>Hands-On W65 Practice</h3>
        <ul>
          <li>Locate the W65 before entering the underground area and verify that it is carried as the site requires.</li>
          <li>Use an approved trainer to practice every donning step until the sequence can be performed under stress.</li>
          <li>Know the designated escapeways and the actions required by the site emergency plan.</li>
          <li>Report a missing, damaged, opened, or improperly stored unit before going underground.</li>
        </ul>
        <div class="warning-box"><strong>Hands-on is mandatory.</strong> Videos do <em>not</em> replace instructor-led donning practice with the approved MSA W65 training unit and the procedures in the current mine training plan.</div>
      </div>
      <div class="key-box"><strong>Required time for this module:</strong> 3.5 hours (210 minutes) — matches credited classroom hours. Includes the W65 demonstration, donning video, instructor-led practice, emergency-plan review, and study time. Quiz unlocks only when the full timer finishes. Timer pauses if you switch tabs/apps.</div>
      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Video 1 – MSA W65 Demo (Fred Raubach) · 13:39</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Watch the full demonstration. Do not skip.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;background:#000;">
          <iframe id="vimeo-w65" style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://player.vimeo.com/video/98555798?title=0&amp;byline=0&amp;portrait=0" title="W65 Demo Fred Raubach" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <p style="font-size:0.8rem;color:var(--text-muted);">If the player shows “content blocked,” open this HTML in Safari/Chrome from your Files app (not a chat preview), or put the file on your company website/intranet. If blocked: <a href="https://vimeo.com/98555798" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open W65 video on Vimeo ↗</a></p>
      </div>
      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Video 2 – Short W65 Donning Animation · ~2:42</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Step-by-step donning review. Watch fully.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/AU07-U96dfw?rel=0&modestbranding=1&playsinline=1" title="W65 Donning" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=AU07-U96dfw" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
      </div>
      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <p style="font-size:0.85rem;color:var(--text-muted);">Watch both W65 videos, complete instructor-led hands-on practice, and review the site emergency plan. Full module seat time is 3.5 hours.</p>
        <div class="timer-display" id="timer-3">210:00</div>
        <button class="btn btn-sm" id="btn-timer-3" onclick="startTimer(3, 210)">Start 3.5-hour Required Timer (210 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-3">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "When must self-rescue device training be given to a new underground miner under Part 48?", options: ["Within 60 days of starting work", "Before the miner goes underground", "Only during annual refresher", "After the first production shift"], answer: 1 },
      { q: "The MSA W65 is primarily a:", options: ["Routine-use respirator that supplies breathing air", "Filter self-rescuer that converts carbon monoxide (does not supply oxygen)", "Dust mask for silica", "Full-face supplied-air respirator"], answer: 1 },
      { q: "True or False: A filter self-rescuer such as the W65 will protect you in an oxygen-deficient atmosphere.", options: ["True", "False"], answer: 1 },
      { q: "True or False: Watching videos alone replaces instructor-led hands-on practice with a W65 training unit.", options: ["True", "False"], answer: 1 },
      { q: "What should you do if the W65 container or seal appears damaged?", options: ["Carry it anyway", "Open it to test it", "Report it immediately and follow the site procedure for removing it from service", "Repair it with tape"], answer: 2 }
    ]
  },
  {
    id: 4,
    title: "Entering/Leaving the Mine, Transportation & Communications",
    hours: 2.0,
    objectives: [
      "Describe check-in / check-out and mantrip / conveyance rules",
      "Identify communication systems and warning signals used at the mine",
      "Recognize traffic and transportation hazards"
    ],
    content: `
      <div class="content-section">
        <h3>Check-In / Check-Out Systems</h3>
        <p>Most underground mines use a formal check-in/check-out (or tag-in/tag-out) system so the operator always knows who is underground. Follow the exact procedure at your mine every time you enter or leave. Never tag in for another person or leave without tagging out.</p>
      </div>
      <div class="content-section">
        <h3>Transportation Controls</h3>
        <ul>
          <li>Ride only in designated mantrips or approved conveyances.</li>
          <li>Follow all signals, speed limits, and right-of-way rules for track or rubber-tired equipment.</li>
          <li>Never get on or off a moving vehicle.</li>
          <li>Be aware of haul trucks, loaders (Cat 988 / 980M class), and other mobile equipment – they have large blind spots.</li>
          <li>On surface areas: traffic patterns, spotting, and dump-point procedures are critical.</li>
        </ul>
      </div>
      <div class="content-section">
        <h3>See the Blind Area Before You Enter It</h3>
        <p>NIOSH blind-area diagrams show what an operator can and cannot see by direct view or mirrors at three object heights: ground level, 900 mm (3 feet), and 1500 mm (4 feet 11 inches). The shape changes with the machine, attachment, seat position, mirror adjustment, and the height of the person or object.</p>
        <figure class="training-figure">
          <img loading="lazy" src="https://www.cdc.gov/niosh/motor-vehicle/constructionequipmentvisibilitydiagram/images/blindarea/loaders/800px/cat992g-grd.jpg" alt="NIOSH ground-level blind-area diagram for a Caterpillar 992G wheel loader">
          <figcaption>NIOSH Cat 992G ground-level example. Use the diagram legend to compare areas the operator cannot see directly with areas visible in mirrors.</figcaption>
        </figure>
        <div class="warning-box"><strong>Example, not an equipment-specific map:</strong> the NIOSH Cat 966G, Cat 992G, and Volvo A40D diagrams are useful teaching examples, but they are not diagrams for the Allen Company Cat 980M/988-class loaders or every haul truck. The actual machine, current operator's manual, site traffic plan, installed cameras/proximity systems, and a site evaluation control.</div>
        <ul>
          <li><strong>Before movement:</strong> the operator adjusts the seat, mirrors, and cameras; completes the examination; clears the area; and follows the site's startup, horn, and communication procedure.</li>
          <li><strong>On foot:</strong> stay outside the equipment's operating and articulation zones. Approach only after positive two-way communication, acknowledgment, and the equipment is stopped as required by site procedure.</li>
          <li><strong>Never assume:</strong> eye contact, a backup alarm, mirror, camera, high-visibility clothing, or proximity warning proves the operator sees you.</li>
        </ul>
        <div class="resource-grid">
          <a class="resource-card" href="https://www.cdc.gov/niosh/motor-vehicle/constructionequipmentvisibilitydiagram/cat-966g.html" target="_blank" rel="noopener"><strong>NIOSH Cat 966G</strong><span>Ground, 900 mm, and 1500 mm diagrams</span></a>
          <a class="resource-card" href="https://www.cdc.gov/niosh/motor-vehicle/constructionequipmentvisibilitydiagram/cat-992g.html" target="_blank" rel="noopener"><strong>NIOSH Cat 992G</strong><span>Large-loader visibility example</span></a>
          <a class="resource-card" href="https://www.cdc.gov/niosh/motor-vehicle/constructionequipmentvisibilitydiagram/volvo-a40d.html" target="_blank" rel="noopener"><strong>NIOSH Volvo A40D</strong><span>Articulated-truck visibility example</span></a>
          <a class="resource-card" href="https://www.cdc.gov/niosh/motor-vehicle/constructionequipmentvisibilitydiagram/manual-method.html" target="_blank" rel="noopener"><strong>Map the actual machine</strong><span>NIOSH manual blind-area method</span></a>
          <a class="resource-card" href="https://www.msha.gov/sites/default/files/stand_down/Powered-Haulage.pdf" target="_blank" rel="noopener noreferrer"><strong>MSHA Powered Haulage Stand-Down</strong><span>Official one-page July 2025 discussion handout</span></a>
        </div>
      </div>
      <div class="content-section">
        <h3>Communications & Warning Signals</h3>
        <p>Know how to use the mine communication system (phones, radios, leaky feeder, etc.) and the meaning of all warning signals and directional signs. In an emergency, clear, calm communication saves lives.</p>
        <div class="key-box">At many limestone and aggregate operations the combination of underground haulage and surface stockpile/asphalt plant traffic creates unique interface hazards. Learn both environments if you will work at either.</div>
      </div>

      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Powered Haulage Be Alert Be Ready · MSHA-style</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Powered haulage and conveyor awareness for underground and surface areas.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;background:#000;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/NH7vatxj_t0?rel=0&modestbranding=1&playsinline=1" title="Powered Haulage Be Alert Be Ready" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=NH7vatxj_t0" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
        <p style="font-size:0.75rem;color:var(--text-muted);">YouTube cannot fully lock seeking in embeds. Required <strong>module seat time</strong> (credited hours) still must complete before the quiz.</p>
      </div>

      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Conveyor Safety in Mining · ~5+ min</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Guarding, lockout/tagout, and safe practices around belt conveyors.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;background:#000;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/yEwFZHVLsso?rel=0&modestbranding=1&playsinline=1" title="Conveyor Safety in Mining" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=yEwFZHVLsso" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
        <p style="font-size:0.75rem;color:var(--text-muted);">YouTube cannot fully lock seeking in embeds. Required <strong>module seat time</strong> (credited hours) still must complete before the quiz.</p>
      </div>

      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <p style="font-size:0.85rem;color:var(--text-muted);">Review videos above and company transportation / communication procedures. Full module seat time is 2.0 hours.</p>
        <div class="timer-display" id="timer-4">120:00</div>
        <button class="btn btn-sm" id="btn-timer-4" onclick="startTimer(4, 120)">Start 2-hour Required Timer (120 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-4">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Why is a check-in/check-out system used?", options: ["Only for payroll", "So the operator always knows who is underground", "It is optional at most mines", "Only for visitors"], answer: 1 },
      { q: "True or False: It is acceptable to get on or off a moving mantrip if you are careful.", options: ["True", "False"], answer: 1 },
      { q: "Large mobile equipment such as loaders and haul trucks often have:", options: ["No blind spots when mirrors are adjusted", "Significant blind spots that require extra caution and communication", "Automatic pedestrian detection that eliminates risk", "Only rear blind spots"], answer: 1 },
      { q: "You should know the meaning of all warning signals and directional signs because:", options: ["They are decorative", "They communicate critical safety and traffic information", "Only supervisors need to know them", "They change every shift"], answer: 1 },
      { q: "If you work at both underground and surface areas of the same operation you should:", options: ["Only learn the underground rules", "Learn the traffic patterns, signals, and procedures for both environments", "Assume surface rules are the same as underground", "Ignore surface rules if you are mainly underground"], answer: 1 }
    ]
  },
  {
    id: 5,
    title: "Introduction to the Work Environment & Hazard Recognition",
    hours: 3.5,
    objectives: [
      "Recognize major categories of hazards in underground limestone and surface aggregate operations",
      "Understand the importance of workplace examinations and personal situational awareness",
      "Identify common sources of serious injury, including mobile equipment, ground control, conveyors, hazardous energy, and falls",
      "Select, inspect, and use personal protective equipment as the final layer in a complete hazard-control system"
    ],
    content: `
      <div class="content-section">
        <h3>Work Environment Overview</h3>
        <p>New miners must receive an introduction to the work environment, including (as practicable) a visit or representative tour and an explanation of the mining method. For limestone underground this typically includes room-and-pillar or similar methods, ground support, ventilation circuits, and major equipment. Surface areas include highwalls, stockpiles, crushers, screens (e.g., Liwell), conveyors, and asphalt plant interfaces.</p>
      </div>
      <div class="content-section">
        <h3>Core Hazard Categories</h3>
        <ul>
          <li><strong>Ground control</strong> – ribs, roof, highwalls, loose material, scaling needs.</li>
          <li><strong>Mobile equipment</strong> – loaders, haul trucks, dozers, traffic patterns, spotting.</li>
          <li><strong>Conveyors & machinery</strong> – guarding, nip points, lockout/tagout.</li>
          <li><strong>Energy sources</strong> – electrical, hydraulic, pneumatic, stored energy.</li>
          <li><strong>Falls</strong> – from heights, into openings, slips/trips.</li>
          <li><strong>Respiratory & noise</strong> – silica, diesel particulate, noise from drills/crushers.</li>
          <li><strong>Fire & explosion</strong> – diesel fuel, hydraulic fluid, explosives (if used), welding.</li>
        </ul>
        <div class="key-box">Hazard recognition is not a one-time classroom topic. It is a continuous skill. Workplace examinations (required under Part 57 and related standards) are a formal part of that process.</div>
      </div>
      <div class="content-section">
        <h3>PPE and Fall Protection: A Complete System</h3>
        <p>PPE does not remove the hazard. Start by eliminating the exposure where possible, then use engineering controls such as guarded platforms, covers, railings, or restraint systems. When personal fall arrest is required, every component must work together and the plan must address what happens after a fall.</p>
        <ul>
          <li><strong>Plan the work:</strong> identify edges, openings, unstable surfaces, climbing, equipment access, overhead hazards, and the rescue method before exposure begins.</li>
          <li><strong>Inspect before use:</strong> check harness webbing, stitching, labels, D-rings, buckles, and impact indicators. Check lanyards and self-retracting lifelines (SRLs) for damaged connectors, cuts, burns, chemical damage, broken strands, housing damage, correct retraction, and evidence of deployment.</li>
          <li><strong>Verify compatibility:</strong> use only approved connectors and anchorage arrangements. A hook that appears to close can still roll out or fail if connected to an incompatible object.</li>
          <li><strong>Fit and connect correctly:</strong> follow the harness and connecting-device manufacturer instructions. Do not improvise an anchorage or mix components merely because they can be physically connected.</li>
          <li><strong>Control clearance and swing:</strong> account for free fall, deceleration, worker height, connector length, lifeline behavior, lower obstructions, and lateral swing-fall exposure.</li>
          <li><strong>Plan prompt rescue:</strong> a suspended worker may be unable to self-rescue. The plan, trained personnel, equipment, communication, and access must be in place before work starts.</li>
        </ul>
        <div class="warning-box">Never tie off to a handrail, pipe, cable tray, equipment part, or other convenient object unless it has been specifically approved for that fall-protection use. The competent person, site procedure, and manufacturer instructions determine acceptable systems.</div>
      </div>
      <div class="content-section">
        <h3>Recent Mining Fall Case Study</h3>
        <p>In an August 2024 quarry incident, a contractor fell approximately 21 feet through an opening while installing a material feeder and later died. Use the case to ask: Was the opening controlled? Was safe access maintained? Was the fall-arrest system connected to an acceptable anchorage? Had rescue been planned?</p>
        <p><a href="https://www.msha.gov/data-reports/fatality-reports/2024/august-22-2024-fatality/fatality-alert" target="_blank" rel="noopener">Review the MSHA fatality alert</a> and the <a href="https://www.msha.gov/sites/default/files/Alerts-Hazards/Safety_Alert-Fall_Protection-2025.pdf" target="_blank" rel="noopener">2025 MSHA fall-protection safety alert</a> with the instructor.</p>
        <div class="key-box"><strong>Hands-on verification:</strong> the instructor will demonstrate a pre-use inspection and proper fit using representative Allen Company harnesses, lanyards, and SRLs. Brand-specific labels and instructions always control.</div>
      </div>

      <div class="content-section">
        <h3>Current NIOSH Practice Tools</h3>
        <p>Use these instructor-led tools to practice recognition rather than only reading about it. They support discussion and do not replace the mine tour, workplace examination, or task training.</p>
        <div class="resource-grid">
          <a class="resource-card" href="https://wwwn.cdc.gov/niosh-mining/HazRec/" target="_blank" rel="noopener"><strong>Hazard Recognition Challenge</strong><span>Virtual examinations of a surface stone pit, plant, shop, and roadway</span></a>
          <a class="resource-card" href="https://www.cdc.gov/niosh/mining/tools/infographic-dont-slip-up.html" target="_blank" rel="noopener"><strong>Don't Slip Up!</strong><span>2025 guidance on inclines, grating, three-point contact, pace, and contaminated walking surfaces</span></a>
        </div>
      </div>

      <div class="content-section official-resource-panel">
        <div class="official-resource-heading">
          <div>
            <span class="resource-badge">Current case anchors</span>
            <h3>Recent MSHA Hazard Alerts</h3>
          </div>
          <span class="document-meta">Instructor-led discussion</span>
        </div>
        <p>Connect the controls in this module to recent mining events. Focus on what the trainee must recognize, where to stay clear, and when to stop and notify supervision.</p>
        <div class="resource-grid">
          <a class="resource-card" href="https://www.msha.gov/sites/default/files/Data_Reports/Fatals/Enforcement/2025/March%205%2C%202025%20-%20Fatality%20Alert%20-%20Calhoun%20Quarry.pdf" target="_blank" rel="noopener noreferrer"><strong>2025 Calhoun Quarry fatality alert</strong><span>Blast signals, exclusion areas, withdrawal, guarding, and authorized re-entry</span></a>
          <a class="resource-card" href="https://www.msha.gov/sites/default/files/Alerts%20and%20Hazards/Confined%20Space%20Safety%20Alert.pdf" target="_blank" rel="noopener noreferrer"><strong>MSHA confined-space alert</strong><span>Engulfment, stored energy, atmospheric hazards, isolation, and rescue planning</span></a>
        </div>
        <div class="warning-box"><strong>Scope:</strong> trainees are not being trained to conduct blasting or confined-space entry. They must know boundaries, warning signals, withdrawal rules, and that bins, hoppers, chutes, crushers, and tanks cannot be entered or cleared without the mine's authorization and full procedure.</div>
      </div>

      <div class="content-section">
        <h3>Personal Practices</h3>
        <ul>
          <li>Maintain situational awareness – know what equipment is moving around you.</li>
          <li>Never walk under suspended loads or into the path of mobile equipment without positive communication.</li>
          <li>Respect barriers, tags, and danger signs.</li>
          <li>Report and, if authorized and trained, correct hazards within your capability.</li>
        </ul>
      </div>

      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Hazard Recognition Through Workplace Examination in Mining · 19:43</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Workplace examination and hazard recognition in mining environments.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;background:#000;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/GSPRVJsu3_A?rel=0&modestbranding=1&playsinline=1" title="Hazard Recognition Through Workplace Examination in Mining" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=GSPRVJsu3_A" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
        <p style="font-size:0.75rem;color:var(--text-muted);">YouTube cannot fully lock seeking in embeds. Required <strong>module seat time</strong> (credited hours) still must complete before the quiz.</p>
      </div>

      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">SLAM for Life MSHA Risk Assessment · ~10 min</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Stop, Look, Analyze, Manage risk assessment approach used in mining.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;background:#000;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/qDDg-CbOTmw?rel=0&modestbranding=1&playsinline=1" title="SLAM for Life MSHA Risk Assessment" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=qDDg-CbOTmw" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
        <p style="font-size:0.75rem;color:var(--text-muted);">YouTube cannot fully lock seeking in embeds. Required <strong>module seat time</strong> (credited hours) still must complete before the quiz.</p>
      </div>

      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <p style="font-size:0.85rem;color:var(--text-muted);">Complete the required video sequence, fall-protection demonstration, and instructor discussion of site hazards. Full module seat time remains 3.5 hours.</p>
        <div class="timer-display" id="timer-5">210:00</div>
        <button class="btn btn-sm" id="btn-timer-5" onclick="startTimer(5, 210)">Start 3.5-hour Required Timer (210 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-5">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Which of the following is a major hazard category in both underground limestone and surface aggregate operations?", options: ["Only office ergonomics", "Mobile equipment and ground control", "Only weather-related hazards", "Only chemical spills in the lab"], answer: 1 },
      { q: "Workplace examinations are:", options: ["Optional if the mine is small", "A formal, required process to identify and correct hazards", "Only performed by MSHA", "Only needed after an accident"], answer: 1 },
      { q: "When controlling a fall hazard, the preferred first step is to:", options: ["Eliminate the exposure or use higher-level prevention controls where feasible", "Put on any available harness", "Choose the longest lanyard", "Rely on a rescue after the fall"], answer: 0 },
      { q: "Conveyor systems commonly present which type of hazard?", options: ["Only noise", "Nip points, entanglement, and the need for proper guarding and lockout", "Only electrical shock", "No significant hazards if running slowly"], answer: 1 },
      { q: "When working around large loaders or haul trucks you should:", options: ["Assume the operator sees you", "Make positive communication and stay out of blind spots", "Walk closely behind them so they know you are there", "Rely only on backup alarms"], answer: 1 },
      { q: "Before using a harness, lanyard, or SRL, the worker must:", options: ["Inspect it, verify component and anchorage compatibility, and understand the rescue plan", "Connect to the nearest handrail", "Assume all brands can be mixed in every configuration", "Use it even if an impact indicator shows deployment"], answer: 0 }
    ]
  },
  {
    id: 6,
    title: "Mine Maps, Escapeways, Emergency Evacuation & Barricading",
    hours: 3.0,
    objectives: [
      "Locate and interpret key features on the mine map",
      "Describe the escapeway system and emergency evacuation plan",
      "Understand basic barricading concepts where applicable"
    ],
    content: `
      <div class="content-section">
        <h3>Mine Map</h3>
        <p>You must be able to orient yourself on the current mine map, identify primary and secondary escapeways, refuge locations (if any), ventilation controls, and abandoned or hazardous areas. Maps are updated; always use the current posted version.</p>
      </div>
      <div class="content-section">
        <h3>Escapeways & Evacuation</h3>
        <ul>
          <li>Know at least two ways out from your normal work area.</li>
          <li>Follow the mine's approved escape and evacuation plan (or the program under 30 CFR 57.11053 / related).</li>
          <li>In smoke or limited visibility, stay low, maintain contact with the group or lifeline if used, and move deliberately toward fresh air or refuge.</li>
          <li>Participate fully in required drills – they exist so the response becomes automatic under stress.</li>
        </ul>
      </div>
      <div class="content-section">
        <h3>Barricading</h3>
        <p>Where barricading is part of the mine's emergency plan, know the locations of materials and the basic principles of constructing a seal that can protect against irrespirable atmospheres for a limited time while awaiting rescue. Barricading is a last-resort option when escape is not possible.</p>
        <div class="warning-box">Never delay an escape when the emergency plan directs evacuation. Prompt action, the W65 used at this operation, and knowledge of the designated escapeways are critical.</div>
      </div>
      <div class="content-section official-resource-panel">
        <span class="resource-badge">Official MSHA safety alert</span>
        <h3>Equipment Fires and Heated Tires</h3>
        <p>A heated tire can rupture violently during or after an equipment fire. Safely stop and shut down if possible, warn others, notify supervision, and withdraw under the site emergency plan. Do not approach or try to fight a tire fire with a handheld extinguisher.</p>
        <div class="resource-grid">
          <a class="resource-card" href="https://www.msha.gov/sites/default/files/Alerts%20and%20Hazards/Tire-Explosion-During-Equipment-Fire-safetyalert.pdf" target="_blank" rel="noopener noreferrer"><strong>Tire Explosion During Equipment Fire</strong><span>Official MSHA alert based on a June 2024 fatal incident</span></a>
        </div>
      </div>

      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Mine Emergency Evacuation (practical escape) · 11:26</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Practical underground emergency escape principles. Pair with your site escapeway plan.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;background:#000;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/j9DNL0DnKmU?rel=0&modestbranding=1&playsinline=1" title="Mine Emergency Evacuation (practical escape)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=j9DNL0DnKmU" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
        <p style="font-size:0.75rem;color:var(--text-muted);">YouTube cannot fully lock seeking in embeds. Required <strong>module seat time</strong> (credited hours) still must complete before the quiz.</p>
      </div>

      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <p style="font-size:0.85rem;color:var(--text-muted);">Watch the evacuation video and review your site map / escapeways with the instructor. Full module seat time is 3.0 hours.</p>
        <div class="timer-display" id="timer-6">180:00</div>
        <button class="btn btn-sm" id="btn-timer-6" onclick="startTimer(6, 180)">Start 3-hour Required Timer (180 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-6">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "You should always use which version of the mine map?", options: ["Any old map you find", "The current posted/updated map", "A map from a different mine", "Only digital maps on your phone"], answer: 1 },
      { q: "How many escapeways should you know from your normal work area?", options: ["Only one is required knowledge", "At least two", "None – follow the crowd", "Only the primary intake"], answer: 1 },
      { q: "Barricading is generally considered:", options: ["The first action in every emergency", "A last-resort option when escape is not possible", "A replacement for knowing the escapeways", "Only for surface mines"], answer: 1 },
      { q: "True or False: Emergency evacuation drills are optional if you already know the way out.", options: ["True", "False"], answer: 1 },
      { q: "In smoke-filled conditions a good practice is to:", options: ["Stand upright and run as fast as possible", "Stay low, move deliberately, and maintain contact with the group or guidance system", "Remove the W65 before reaching confirmed fresh air", "Wait in place indefinitely without communicating"], answer: 1 }
    ]
  },
];
