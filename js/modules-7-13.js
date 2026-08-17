const MODULES_PART_2 = [
  {
    id: 7,
    title: "Ground Control & Ventilation Plans",
    hours: 3.0,
    objectives: [
      "Explain the purpose of the ground control (roof/rib) plan and basic safe practices",
      "Describe the purpose of the ventilation plan and how air is controlled",
      "Recognize signs of ground instability and the need to report them"
    ],
    content: `
      <div class="content-section">
        <h3>Ground Control</h3>
        <p>Underground limestone mines rely on carefully designed pillar dimensions, roof support (bolts, mesh, etc. where used), and ongoing examination. The approved ground control plan is a living document. Never work under unsupported or questionable ground. Scale loose material when trained and authorized; otherwise report and barricade or stay clear.</p>
        <ul>
          <li>Look for cracks, spalling, water, or unusual sounds.</li>
          <li>Respect any temporary or permanent support installations.</li>
          <li>Highwalls on surface also require examination and control of loose material.</li>
        </ul>
      </div>
      <div class="content-section">
        <h3>Ventilation</h3>
        <p>Ventilation supplies fresh air, dilutes and removes contaminants (diesel exhaust, dust, blasting fumes, etc.), and can be part of the escape strategy. Know the basic direction of air flow in your work area, the location of major fans and controls, and never alter ventilation without authorization.</p>
        <div class="key-box">For metal/nonmetal underground (Part 57), the ventilation plan and ground control plan are central to daily safe operation. New miners must receive an introduction to both.</div>
      </div>

      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">What Could Happen (mine safety awareness) · 13:42</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Mine safety awareness film. Use with instructor discussion of ground control and ventilation plans.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;background:#000;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/OxOwJC5wHyc?rel=0&modestbranding=1&playsinline=1" title="What Could Happen (mine safety awareness)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=OxOwJC5wHyc" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
        <p style="font-size:0.75rem;color:var(--text-muted);">YouTube cannot fully lock seeking in embeds. Required <strong>module seat time</strong> (credited hours) still must complete before the quiz.</p>
      </div>

      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <p style="font-size:0.85rem;color:var(--text-muted);">Watch the video and review the site ground control and ventilation plans with your instructor. Full module seat time is 3.0 hours.</p>
        <div class="timer-display" id="timer-7">180:00</div>
        <button class="btn btn-sm" id="btn-timer-7" onclick="startTimer(7, 180)">Start 3-hour Required Timer (180 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-7">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "If you observe cracking, spalling, or other signs of unstable ground you should:", options: ["Ignore it if production is busy", "Report it and stay clear / follow company procedures", "Only tell a co-worker at lunch", "Continue working carefully under it"], answer: 1 },
      { q: "The ground control plan and ventilation plan are:", options: ["Optional guidance documents", "Approved plans that must be followed and that new miners must be introduced to", "Only for coal mines", "Secret documents only supervisors may see"], answer: 1 },
      { q: "True or False: Anyone may permanently alter major ventilation controls without authorization.", options: ["True", "False"], answer: 1 },
      { q: "Ventilation in an underground mine primarily serves to:", options: ["Only cool the air for comfort", "Supply fresh air and dilute/remove contaminants", "Increase production speed", "Replace the need for SCSRs"], answer: 1 },
      { q: "Highwalls at surface operations also require:", options: ["No examination because they are outside", "Examination and control of loose material as part of ground control", "Only visual checks from the office", "No special attention"], answer: 1 }
    ]
  },
  {
    id: 8,
    title: "Health, Noise, Dust & Hazard Communication",
    hours: 2.5,
    objectives: [
      "Understand why dust, noise, and other health measurements are taken",
      "Describe basic elements of the mine's HazCom program",
      "Recognize the importance of following exposure controls and PPE requirements"
    ],
    content: `
      <div class="content-section">
        <h3>Health Measurements & Controls</h3>
        <p>MSHA and the operator take dust, noise, and other samples to evaluate exposures and the effectiveness of controls. You may be asked to wear sampling equipment. Results help protect long-term health (silica, diesel particulate matter, hearing, etc.). Follow all engineering controls, administrative controls, and required PPE.</p>
      </div>
      <div class="content-section">
        <h3>Hazard Communication (HazCom)</h3>
        <ul>
          <li>Know how to read container labels and Safety Data Sheets (SDS).</li>
          <li>Understand the physical and health hazards of chemicals in your work area.</li>
          <li>Follow the protective measures specified (PPE, ventilation, handling procedures).</li>
          <li>The mine's written HazCom program is available for review.</li>
        </ul>
        <div class="key-box">Part of new miner training includes information about the physical and health hazards of chemicals in the work area and the contents of the mine's HazCom program.</div>
      </div>
      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <div class="timer-display" id="timer-8">150:00</div>
        <button class="btn btn-sm" id="btn-timer-8" onclick="startTimer(8, 150)">Start 2.5-hour Required Timer (150 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-8">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Dust and noise sampling is performed primarily to:", options: ["Increase production", "Evaluate worker exposures and the effectiveness of controls", "Satisfy a one-time paperwork requirement", "Only check the office environment"], answer: 1 },
      { q: "A Safety Data Sheet (SDS) provides information about:", options: ["Only the price of the chemical", "Hazards, protective measures, and emergency response for a chemical product", "Only the manufacturer’s address", "Production schedules"], answer: 1 },
      { q: "True or False: You are not required to follow PPE requirements if you feel the hazard is low that day.", options: ["True", "False"], answer: 1 },
      { q: "Silica dust exposure is a particular concern in:", options: ["Only coal mines", "Many metal/nonmetal and aggregate operations including limestone", "Only surface sand mines", "Office settings only"], answer: 1 },
      { q: "The mine's written HazCom program:", options: ["Is optional", "Must be available and is part of the information new miners receive", "Is only for the safety manager", "Changes every hour"], answer: 1 }
    ]
  },
  {
    id: 9,
    title: "Electrical Hazards",
    hours: 2.0,
    objectives: [
      "Recognize common electrical hazards in mining",
      "Understand basic principles of lockout/tagout and why it matters",
      "Know never to work on energized equipment unless qualified and authorized"
    ],
    content: `
      <div class="content-section">
        <h3>Electrical Hazards in Mining</h3>
        <p>Mining environments contain trailing cables, distribution systems, mobile equipment electrical systems, welders, and fixed installations. Water, dust, damaged insulation, and improper grounding increase risk. Arc flash is a serious concern on higher-energy systems.</p>
        <ul>
          <li>Never use damaged cables or cords.</li>
          <li>Respect all electrical enclosures and barriers.</li>
          <li>Only qualified and authorized persons perform electrical work.</li>
          <li>Lockout/tagout (and tryout) is required before work on equipment that could unexpectedly start or release energy.</li>
        </ul>
        <div class="warning-box">Even “low voltage” can kill under the wrong conditions. Treat all electrical systems with respect.</div>
      </div>

      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Electrical Safety Awareness for Non-electrical Workers · ~9 min</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Electrical awareness for non-electricians. Does not replace qualified-person requirements.</p>
        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin-bottom:12px;background:#000;">
          <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube-nocookie.com/embed/wal2KP1bbIY?rel=0&modestbranding=1&playsinline=1" title="Electrical Safety Awareness for Non-electrical Workers" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <p style="margin:8px 0;"><a href="https://www.youtube.com/watch?v=wal2KP1bbIY" target="_blank" rel="noopener" style="color:#38bdf8;font-weight:600;">Open on YouTube ↗</a> <span style="color:var(--text-muted);font-size:0.8rem;">(use if embed is blocked)</span></p>
        <p style="font-size:0.75rem;color:var(--text-muted);">YouTube cannot fully lock seeking in embeds. Required <strong>module seat time</strong> (credited hours) still must complete before the quiz.</p>
      </div>

      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <p style="font-size:0.85rem;color:var(--text-muted);">Watch the electrical awareness video and review site LOTO procedures. Full module seat time is 2.0 hours.</p>
        <div class="timer-display" id="timer-9">120:00</div>
        <button class="btn btn-sm" id="btn-timer-9" onclick="startTimer(9, 120)">Start 2-hour Required Timer (120 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-9">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Who may perform electrical work on mine equipment and systems?", options: ["Any experienced miner", "Only qualified and authorized persons", "Anyone who has watched a video", "Only the mine owner"], answer: 1 },
      { q: "Lockout/tagout is used to:", options: ["Speed up repairs", "Prevent unexpected startup or release of energy during maintenance or repair", "Mark equipment that is new", "Only satisfy paperwork"], answer: 1 },
      { q: "True or False: Damaged trailing cables or cords can be used if they still “work.”", options: ["True", "False"], answer: 1 },
      { q: "Arc flash is a hazard associated with:", options: ["Only 12-volt systems", "Higher-energy electrical systems and can cause severe burns", "Only battery powered tools", "None of the above"], answer: 1 },
      { q: "Before working on equipment you should:", options: ["Assume it is de-energized", "Follow the full lockout/tagout/tryout procedure required at the mine", "Just turn the switch off", "Ask a co-worker to watch"], answer: 1 }
    ]
  },
  {
    id: 10,
    title: "First Aid",
    hours: 3.5,
    objectives: [
      "Recall basic first-aid principles acceptable to MSHA",
      "Know the location of first-aid equipment and how to activate emergency medical response",
      "Understand the limits of first aid versus the need for professional medical care"
    ],
    content: `
      <div class="content-section">
        <h3>First Aid in the Mine Environment</h3>
        <p>Part 48 requires instruction in first-aid methods acceptable to MSHA. Training typically covers scene safety, calling for help, bleeding control, shock, airway/breathing/circulation basics, burns, fractures, and specific mining-related injuries. Know where first-aid supplies, AEDs, and stretchers are located and how to summon emergency medical assistance at your mine.</p>
        <ul>
          <li>Ensure the scene is safe before approaching a victim.</li>
          <li>Activate the mine’s emergency medical response system early.</li>
          <li>Control life-threatening bleeding with direct pressure and appropriate dressings or tourniquets if trained.</li>
          <li>Support the person until higher-level care arrives; do not attempt procedures beyond your training.</li>
        </ul>
        <div class="key-box">First aid is a bridge to professional care. The goal is to preserve life and prevent further harm until EMTs, paramedics, or hospital care can take over.</div>
      </div>
      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <div class="timer-display" id="timer-10">210:00</div>
        <button class="btn btn-sm" id="btn-timer-10" onclick="startTimer(10, 210)">Start 3.5-hour Required Timer (210 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-10">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "The first consideration when approaching an injured person is:", options: ["Moving them immediately", "Scene safety for yourself and the victim", "Taking photos for the report", "Checking production status"], answer: 1 },
      { q: "True or False: You should only call for emergency medical help after you have finished all first-aid care.", options: ["True", "False"], answer: 1 },
      { q: "Severe bleeding is best initially controlled by:", options: ["Ignoring it", "Direct pressure and appropriate dressings (or tourniquet if trained and indicated)", "Giving the person water", "Walking them to the surface immediately"], answer: 1 },
      { q: "First aid is intended to:", options: ["Replace the need for doctors", "Preserve life and prevent further harm until professional care arrives", "Only be performed by supervisors", "Diagnose complex medical conditions"], answer: 1 },
      { q: "You should know the location of:", options: ["Only the coffee machine", "First-aid supplies, AEDs, and how to activate emergency response", "Only the superintendent’s office", "None of the above"], answer: 1 }
    ]
  },
  {
    id: 11,
    title: "Mine Gases",
    hours: 2.0,
    objectives: [
      "Identify major mine gases of concern and their primary hazards",
      "Understand the importance of detection and ventilation in controlling gas hazards",
      "Know never to enter an area with unknown or dangerous atmosphere without proper protection and authorization"
    ],
    content: `
      <div class="content-section">
        <h3>Common Mine Gases</h3>
        <ul>
          <li><strong>Oxygen deficiency</strong> – can occur in poorly ventilated or sealed areas; causes rapid impairment and death.</li>
          <li><strong>Carbon monoxide (CO)</strong> – product of incomplete combustion; odorless, colorless, binds to hemoglobin.</li>
          <li><strong>Carbon dioxide (CO₂)</strong> – can displace oxygen; product of combustion and respiration.</li>
          <li><strong>Nitrogen oxides, hydrogen sulfide, methane</strong> (where present), and diesel-related contaminants.</li>
        </ul>
        <p>Detection instruments, continuous monitors, and proper ventilation are the primary engineering controls. Never rely on your sense of smell alone.</p>
        <div class="warning-box">Never enter a confined space, sealed area, or atmosphere of unknown quality without proper testing, permits, and respiratory protection as required by the mine’s procedures and standards.</div>
      </div>
      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <div class="timer-display" id="timer-11">120:00</div>
        <button class="btn btn-sm" id="btn-timer-11" onclick="startTimer(11, 120)">Start 2-hour Required Timer (120 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-11">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Carbon monoxide is dangerous because it is:", options: ["Always visible as black smoke", "Odorless, colorless, and binds to hemoglobin reducing oxygen delivery", "Only a problem in surface mines", "Harmless at low concentrations forever"], answer: 1 },
      { q: "True or False: You can reliably detect all dangerous mine gases by smell.", options: ["True", "False"], answer: 1 },
      { q: "Oxygen deficiency can cause:", options: ["Only mild headache", "Rapid impairment, unconsciousness, and death", "No symptoms until it is too late to matter", "Only problems for people with asthma"], answer: 1 },
      { q: "The primary engineering control for many mine gas hazards is:", options: ["Working faster", "Adequate ventilation and atmospheric monitoring", "Ignoring the issue", "Only using SCSRs every day"], answer: 1 },
      { q: "Before entering an area with potentially dangerous atmosphere you must:", options: ["Just hold your breath", "Follow the mine’s testing, permitting, and protection procedures", "Ask a co-worker if it “smells okay”", "Enter quickly and leave quickly"], answer: 1 }
    ]
  },
  {
    id: 12,
    title: "Accident Prevention & Health/Safety Aspects of Assigned Tasks",
    hours: 3.0,
    objectives: [
      "Apply general accident-prevention principles to daily work",
      "Understand that task training is required before performing new tasks",
      "Recognize that the health and safety aspects of each assigned task must be covered"
    ],
    content: `
      <div class="content-section">
        <h3>Accident Prevention</h3>
        <p>Most serious mining incidents involve a combination of hazards, human factors, and sometimes inadequate procedures or training. Prevention relies on:</p>
        <ul>
          <li>Effective workplace examinations and prompt correction of hazards.</li>
          <li>Proper task training and mentoring of new or reassigned miners.</li>
          <li>Following procedures for mobile equipment, energy isolation, ground control, and emergency response.</li>
          <li>Speaking up – the “see something, say something” culture.</li>
        </ul>
      </div>
      <div class="content-section">
        <h3>Task-Specific Health & Safety</h3>
        <p>Under § 48.5(b)(13) and related provisions, new miners must receive instruction in the health and safety aspects of the tasks to which they will be assigned, including safe work procedures, applicable mandatory standards, chemical hazards, and protective measures. Separately, § 48.7 (and surface equivalent) requires task training before a miner performs a new task in certain categories (mobile equipment, drilling, haulage, etc.).</p>
        <div class="key-box">Never operate equipment or perform a task for which you have not been trained and authorized. Ask for training if you are unsure.</div>
      </div>
      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <div class="timer-display" id="timer-12">180:00</div>
        <button class="btn btn-sm" id="btn-timer-12" onclick="startTimer(12, 180)">Start 3-hour Required Timer (180 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-12">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Before performing a new task involving mobile equipment or certain other categories, a miner must:", options: ["Just watch someone else once", "Receive the required task training and demonstrate safe procedures", "Only read the manual", "Start working and learn by trial and error"], answer: 1 },
      { q: "True or False: If you are unsure how to perform a task safely you should proceed carefully on your own rather than ask for training.", options: ["True", "False"], answer: 1 },
      { q: "Effective accident prevention includes:", options: ["Only reacting after injuries occur", "Workplace examinations, task training, following procedures, and speaking up about hazards", "Ignoring near-misses", "Only focusing on production"], answer: 1 },
      { q: "The health and safety aspects of the specific tasks a new miner will perform:", options: ["Are optional", "Must be covered as part of new miner training", "Are only taught after six months", "Are secret"], answer: 1 },
      { q: "A strong safety culture includes the expectation that miners will:", options: ["Stay silent about hazards to avoid trouble", "Report hazards and participate in keeping the workplace safe", "Only follow rules when an inspector is present", "Prioritize speed over every safety procedure"], answer: 1 }
    ]
  },
  {
    id: 13,
    title: "Final Review, Comprehensive Quiz & Classroom Certificate",
    hours: 0.5,
    objectives: [
      "Demonstrate retention of key concepts from the 32-hour classroom topics",
      "Receive documentation of classroom portion completion"
    ],
    content: `
      <div class="content-section">
        <h3>Final Review</h3>
        <p>You have now covered the major required classroom topics for Part 48 new miner training (Subpart A underground focus with surface relevance). Before the final quiz, mentally review:</p>
        <ul>
          <li>Miners’ rights and the duty to report hazards</li>
          <li>SCSR purpose, limitations, and the continuing need for hands-on practice</li>
          <li>Transportation, communication, and check-in/out discipline</li>
          <li>Hazard recognition in both underground and surface environments</li>
          <li>Escapeways, maps, and emergency response</li>
          <li>Ground control and ventilation plan awareness</li>
          <li>Health, HazCom, electrical safety, first aid, and mine gases</li>
          <li>Task training requirements and accident prevention</li>
        </ul>
        <div class="warning-box"><strong>Still required after this classroom portion:</strong> Approximately 8 hours of mine-site specific training, hands-on SCSR work, and any additional elements required by your approved training plan and the District Manager. An MSHA-approved instructor must oversee the overall program and issue or sign the appropriate 5000-23 records.</div>
      </div>
      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time – Final Review</p>
        <div class="timer-display" id="timer-13">30:00</div>
        <button class="btn btn-sm" id="btn-timer-13" onclick="startTimer(13, 30)">Start 30-minute Required Timer</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-13">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "The classroom portion of new miner training under the common 32 + 8 model is typically followed by:", options: ["Nothing else", "Approximately 8 hours of mine-site specific training", "Immediate full production work with no further training", "Only a written test"], answer: 1 },
      { q: "True or False: Completing this computer-based support tool alone fully satisfies all Part 48 new miner requirements including hands-on SCSR training.", options: ["True", "False"], answer: 1 },
      { q: "A miner who has completed the required new miner training still needs:", options: ["No further training ever", "Annual refresher training and task training when assigned new tasks", "Only refresher training every five years", "Nothing if they stay at the same mine"], answer: 1 },
      { q: "The primary purpose of this entire training program is to:", options: ["Meet a paperwork quota", "Give new miners the knowledge and skills to work safely and to recognize and avoid hazards", "Increase production numbers immediately", "Replace the need for supervisors"], answer: 1 },
      { q: "If you are ever unsure about a safety procedure or hazard you should:", options: ["Guess and hope for the best", "Ask a supervisor or qualified person and follow the approved procedures", "Ignore it", "Only ask after an incident occurs"], answer: 1 },
      { q: "Documentation of training (including the 5000-23) is:", options: ["Optional", "Required and must be maintained according to Part 48", "Only needed for underground coal", "Destroyed after 30 days"], answer: 1 }
    ]
  }
];

const MODULES = [...MODULES_PART_1, ...MODULES_PART_2];
