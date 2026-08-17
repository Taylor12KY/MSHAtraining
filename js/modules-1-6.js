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
      { q: "Under the Mine Act, a miner generally has how many days to file a discrimination complaint under § 105(c)?", options: ["30 days", "60 days", "90 days", "1 year"], answer: 1 },
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
      "Distinguish filter self-rescuers (e.g. MSA W65) from self-contained self-rescuers (SCSRs)",
      "Describe purpose, limitations, inspection, and basic donning of devices used for escape",
      "Understand that hands-on practice with the exact units at your mine is still required"
    ],
    content: `
      <div class="content-section">
        <h3>Two Main Types of Self-Rescuers</h3>
        <p><strong>1. Filter Self-Rescuers (e.g. MSA W65)</strong><br>
        These convert carbon monoxide (CO) to carbon dioxide using a catalyst (Hopcalite). They do <strong>not</strong> supply oxygen. They only work if enough oxygen is still present in the air. They are one-time escape devices primarily for CO from fires or explosions.</p>
        <p><strong>2. Self-Contained Self-Rescuers (SCSRs)</strong><br>
        These generate or carry their own oxygen supply (chemical oxygen or compressed oxygen). They protect in oxygen-deficient atmospheres as well as toxic gas. Common examples include CSE SR-100 / SRLD, Ocenco, Dräger, MSA Lifesaver, etc.</p>
        <div class="key-box"><strong>Know your mine’s devices.</strong> Training must cover the exact models used at the operation where you will work. Never assume a filter device will protect you if oxygen is low.</div>
      </div>
      <div class="content-section">
        <h3>MSA W65 Filter Self-Rescuer – Key Points</h3>
        <ul>
          <li>Approved for self-rescue from carbon monoxide.</li>
          <li>Typical rated protection ~60 minutes against 1% CO (conditions matter).</li>
          <li>Must be carried ready for immediate use; inspect for dents, seal damage, and weight gain (moisture).</li>
          <li>Donning is a practiced sequence: open container, remove unit, insert mouthpiece, apply nose clip, position head harness, replace hard hat, move to fresh air.</li>
          <li>Do not remove until you are certain you are in fresh air.</li>
          <li>If the container is badly dented and the unit will not come out, you can still breathe through the filter while it remains in the container (higher resistance).</li>
        </ul>
      </div>
      <div class="content-section">
        <h3>SCSR Core Knowledge</h3>
        <ul>
          <li>Daily/shift inspection: damage, seals, indicators, service life/expiration.</li>
          <li>Donning: open, activate starter/oxygen, mouthpiece, nose clip, straps/goggles as required.</li>
          <li>Practice transferring between units without prolonged loss of protection.</li>
          <li>Common rating is about 60 minutes – plan the escape route accordingly.</li>
        </ul>
        <div class="warning-box"><strong>Hands-on is mandatory.</strong> Videos do <em>not</em> replace required hands-on donning and transfer practice with actual or approved training units under an MSHA-approved instructor.</div>
      </div>
      <div class="key-box"><strong>Required time for this module:</strong> 3.5 hours (210 minutes) — matches credited classroom hours. Includes W65 demo (13:39), donning video, SCSR video, and study time. Start the timer, stay on this page, and complete the content. Quiz unlocks only when the full timer finishes. Timer pauses if you switch tabs/apps.</div>
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
        <p style="font-weight:600;margin-bottom:8px;">Video 3 – SCSR Inspection, Care &amp; Use (MSHA-style)</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">SCSR care and use (CSE SR-100 example). Useful even if your mine uses a different brand.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/dfsXnqrtYR4?rel=0&modestbranding=1&playsinline=1" title="SCSR Training" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=dfsXnqrtYR4" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
        <div class="timer-display" id="timer-3">210:00</div>
        <button class="btn btn-sm" id="btn-timer-3" onclick="startTimer(3, 210)">Start 3.5-hour Required Timer (210 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-3">Timer not started – start the timer, then watch all videos above without leaving this page</p>
      </div>
    `,
    questions: [
      { q: "When must self-rescue device training be given to a new underground miner under Part 48?", options: ["Within 60 days of starting work", "Before the miner goes underground", "Only during annual refresher", "After the first production shift"], answer: 1 },
      { q: "The MSA W65 is primarily a:", options: ["Self-contained self-rescuer that supplies oxygen", "Filter self-rescuer that converts carbon monoxide (does not supply oxygen)", "Dust mask for silica", "Full-face supplied-air respirator"], answer: 1 },
      { q: "True or False: A filter self-rescuer such as the W65 will protect you in an oxygen-deficient atmosphere.", options: ["True", "False"], answer: 1 },
      { q: "True or False: Watching videos alone fully satisfies the hands-on donning and transfer requirements of § 48.5(b)(2).", options: ["True", "False"], answer: 1 },
      { q: "What should you check during inspection of a self-rescuer?", options: ["Only the color of the case", "Damage, seals, indicators (if any), service life/expiration, and for filter units weight gain from moisture", "Only whether it is still in the pouch", "Nothing – they are sealed for life"], answer: 1 },
      { q: "SCSRs are commonly rated for approximately how long of use?", options: ["5–10 minutes", "30 minutes", "60 minutes (1 hour) common rating", "8 hours"], answer: 2 },
      { q: "Why is practicing the transfer between two SCSRs important?", options: ["It is optional entertainment", "In a long escape you may need to switch units without losing protection", "Only supervisors need to know how", "It is only required for coal mines"], answer: 1 }
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
      "Identify common sources of serious injury (mobile equipment, ground control, conveyors, energy sources)"
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
        <p style="font-size:0.85rem;color:var(--text-muted);">Watch the videos above and complete instructor discussion of site hazards. Full module seat time is 3.5 hours.</p>
        <div class="timer-display" id="timer-5">210:00</div>
        <button class="btn btn-sm" id="btn-timer-5" onclick="startTimer(5, 210)">Start 3.5-hour Required Timer (210 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-5">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Which of the following is a major hazard category in both underground limestone and surface aggregate operations?", options: ["Only office ergonomics", "Mobile equipment and ground control", "Only weather-related hazards", "Only chemical spills in the lab"], answer: 1 },
      { q: "Workplace examinations are:", options: ["Optional if the mine is small", "A formal, required process to identify and correct hazards", "Only performed by MSHA", "Only needed after an accident"], answer: 1 },
      { q: "True or False: Once you have completed new miner training you no longer need to actively look for hazards.", options: ["True", "False"], answer: 1 },
      { q: "Conveyor systems commonly present which type of hazard?", options: ["Only noise", "Nip points, entanglement, and the need for proper guarding and lockout", "Only electrical shock", "No significant hazards if running slowly"], answer: 1 },
      { q: "When working around large loaders or haul trucks you should:", options: ["Assume the operator sees you", "Make positive communication and stay out of blind spots", "Walk closely behind them so they know you are there", "Rely only on backup alarms"], answer: 1 },
      { q: "Silica and diesel particulate are examples of:", options: ["Ground control hazards", "Respiratory / health hazards that require controls and sometimes monitoring", "Only surface hazards", "Hazards that only affect supervisors"], answer: 1 }
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
        <div class="warning-box">Never wait to start an escape if conditions allow a safe exit. SCSRs and knowledge of escapeways are your first lines of defense.</div>
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
      { q: "Barricading is generally considered:", options: ["The first action in every emergency", "A last-resort option when escape is not possible", "Unnecessary if you have an SCSR", "Only for surface mines"], answer: 1 },
      { q: "True or False: Emergency evacuation drills are optional if you already know the way out.", options: ["True", "False"], answer: 1 },
      { q: "In smoke-filled conditions a good practice is to:", options: ["Stand upright and run as fast as possible", "Stay low, move deliberately, and maintain contact with the group or guidance system", "Remove your SCSR to see better", "Wait in place indefinitely without communicating"], answer: 1 }
    ]
  },
];
