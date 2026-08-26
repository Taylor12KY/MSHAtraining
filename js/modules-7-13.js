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
      { q: "Ventilation in an underground mine primarily serves to:", options: ["Only cool the air for comfort", "Supply fresh air and dilute/remove contaminants", "Increase production speed", "Replace the emergency evacuation plan"], answer: 1 },
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
      "Use dust-safe cleanup methods and the assigned respirator correctly",
      "Explain the response to elevated dust or DPM sampling results",
      "Select, fit, and consistently wear hearing protection"
    ],
    content: `
      <div class="content-section">
        <h3>Health Measurements & Controls</h3>
        <p>MSHA and the operator take dust, noise, and other samples to evaluate exposures and the effectiveness of controls. You may be asked to wear sampling equipment. Do not remove, cover, reposition, or disturb it. Results help protect long-term health from silica, diesel particulate matter (DPM), excessive noise, and other hazards.</p>
        <p>Use the hierarchy of controls: eliminate or reduce the source where possible, apply engineering controls, use safe work and administrative practices, then use assigned PPE as the final layer. A respirator or hearing protector does not make an uncontrolled source acceptable.</p>
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
      <div class="content-section">
        <h3>Dust-Safe Cleanup and Silica Prevention</h3>
        <p>Cutting, drilling, crushing, conveying, cleanup, and vehicle movement can create respirable dust and crystalline silica. The smallest harmful particles may be invisible, so visible dust and personal comfort are not reliable measures of exposure.</p>
        <ul>
          <li><strong>Control the source:</strong> use water, ventilation, isolation, enclosed filtered cabs, and properly maintained dust collection. Verify controls are operating before dusty work begins.</li>
          <li><strong>Clean without re-aerosolizing:</strong> use the site-approved wet method, wet wiping, or a properly maintained industrial vacuum with the filtration required for the material. Avoid dry sweeping and compressed-air cleanup when either would put settled dust back into the breathing zone.</li>
          <li><strong>Protect the cab:</strong> keep cab doors and windows closed when the cab is an exposure control. Clean floors, seats, controls, filters, footwear, and clothing by the approved method without creating a new dust cloud.</li>
          <li><strong>Control people and timing:</strong> keep unnecessary workers out of dusty cleanup areas and coordinate cleanup so another operation does not immediately contaminate the area again.</li>
          <li><strong>Do not improvise:</strong> household or ordinary shop vacuums can exhaust fine dust back into the work area. Use only equipment and filters approved for the material and task.</li>
        </ul>
        <h4>Company respirator for general or light-duty particulate cleanup</h4>
        <p>The assigned disposable respirator is a company-provided, NIOSH-approved <strong>3M N95 particulate respirator with a Cool Flow valve</strong>. Verify the exact model and approval markings on the issued package. The valve improves exhalation comfort; it does not increase the filtration rating.</p>
        <ul>
          <li>An N95 protects against certain non-oil particles when properly selected and fitted. It does <strong>not</strong> protect against gases or vapors, oxygen deficiency, unknown concentrations, or an immediately dangerous atmosphere.</li>
          <li>When it is required protection, the miner must complete the respiratory-program requirements and pass a fit test for that exact make, model, style, and size before use.</li>
          <li>Use both hands to mold the nose clip, keep hair and other items out of the sealing surface, and perform the manufacturer-required user seal check every time it is put on.</li>
          <li>If a seal cannot be achieved, or the respirator is damaged, soiled, or difficult to breathe through, leave the exposure and report to the supervisor. Do not alter, wash, or reuse it contrary to its instructions.</li>
        </ul>
        <div class="resource-grid">
          <a class="resource-card" href="https://www.cdc.gov/niosh/silica/work/index.html" target="_blank" rel="noopener"><strong>NIOSH safe work practices</strong><span>Wet methods, ventilation, filtration, and housekeeping controls</span></a>
          <a class="resource-card" href="https://www.cdc.gov/niosh/docs/2022-107/pdfs/2022-107.pdf" target="_blank" rel="noopener noreferrer"><strong>NIOSH Simple Solutions for Dusty Environments</strong><span>Practical source-control, wet-method, enclosure, and housekeeping examples</span></a>
          <a class="resource-card" href="https://multimedia.3m.com/mws/media/2620489O/3m-8511-8511mx-8211-particulate-respirator-n95-user-instructions.pdf" target="_blank" rel="noopener"><strong>3M valved N95 instructions</strong><span>Fitting and seal-check example; the instructions for the issued model control</span></a>
        </div>
        <div class="warning-box"><strong>Current rule status:</strong> compliance deadlines in MSHA's 2024 silica rule are under a judicial stay, and associated metal/nonmetal amendments were delayed indefinitely pending review. The dust controls taught here remain protective practices. Follow the current enforceable MSHA standards, the approved training plan, sampling results, and the mine's respiratory-protection program. <a href="https://www.federalregister.gov/d/2026-06584" target="_blank" rel="noopener">Review the 2026 Federal Register notice</a>.</div>
      </div>
      <div class="content-section">
        <h3>What Happens After an Elevated Dust or DPM Result?</h3>
        <ol>
          <li><strong>Report and evaluate:</strong> preserve the result, notify the responsible supervisor or program administrator, identify the affected miner, task, location, shift, and equipment, and follow required posting and corrective-action procedures.</li>
          <li><strong>Find the source:</strong> examine ventilation, diesel engine and exhaust condition, filters, cabs, enclosures, transfer points, roads, water systems, housekeeping, maintenance, and work practices.</li>
          <li><strong>Correct with effective controls:</strong> install, use, and maintain feasible engineering and administrative controls. For DPM, miner rotation is not an acceptable compliance control.</li>
          <li><strong>Verify the correction:</strong> inspect the changed condition and complete follow-up monitoring or other verification directed by the mine's program.</li>
          <li><strong>Supplement when required:</strong> respiratory protection is used under the written program when the applicable conditions require it; it does not replace feasible source controls.</li>
        </ol>
        <h4>Company reusable facepiece for elevated dust or DPM conditions</h4>
        <p>The company uses the <strong>3M 6200 / 07025 medium half facepiece</strong>. This number identifies the reusable facepiece and size only. <strong>The facepiece without the correct filters provides no respiratory protection.</strong></p>
        <ul>
          <li>Before required DPM use, the miner receives the required confidential medical evaluation and passes a fit test for the 3M 6200/07025. A different model or size requires its own fit test.</li>
          <li>The respiratory-program administrator selects the compatible 3M filter for the measured hazard. For non-powered negative-pressure DPM protection, the current MSHA rule requires an R- or P-series filter meeting the required high-efficiency criteria, or a NIOSH-certified DPM filter. The program must document the exact approved filter part number and replacement schedule.</li>
          <li>Inspect the facepiece, valves, straps, gaskets, filters, and connections before use. Don it as instructed and complete the appropriate positive or negative pressure user seal check every time.</li>
          <li>No facial hair, hood, eyewear, or other item may cross or interfere with the face seal. If the seal check fails, do not enter the contaminated area.</li>
          <li>Air-purifying respirators do not supply oxygen and are not for unknown, oxygen-deficient, or immediately dangerous atmospheres. Withdraw and follow the emergency procedure instead.</li>
          <li>Remove filters before cleaning the facepiece; inspect, clean, disinfect, dry, and store it according to the current 3M instructions and company program.</li>
        </ul>
        <div class="warning-box"><strong>Instructor verification before field use:</strong> show trainees the exact compatible filter issued for silica/dust and DPM, its label, change-out rule, inspection, installation, and seal-check method. Do not issue the 6200 as a complete respirator until that filter selection is documented.</div>
        <div class="resource-grid">
          <a class="resource-card" href="https://multimedia.3m.com/mws/media/96751O/3m-half-facepiece-respirator-6000-series-user-instructions.pdf" target="_blank" rel="noopener"><strong>3M 6000 Series instructions</strong><span>6200/07025 donning, fit testing, seal checks, inspection, and cleaning</span></a>
          <a class="resource-card" href="https://www.ecfr.gov/current/title-30/chapter-I/subchapter-K/part-57/subpart-D/section-57.5060" target="_blank" rel="noopener"><strong>30 CFR § 57.5060</strong><span>DPM controls, filters, medical evaluation, and respiratory-protection provisions</span></a>
          <a class="resource-card" href="https://www.ecfr.gov/current/title-30/chapter-I/subchapter-K/part-57/subpart-D/section-57.5071" target="_blank" rel="noopener"><strong>30 CFR § 57.5071</strong><span>Monitoring notice and corrective-action requirements</span></a>
          <a class="resource-card" href="https://www.cdc.gov/niosh/ppe/respirators/selection.html" target="_blank" rel="noopener"><strong>NIOSH respirator selection and use</strong><span>Program selection, proper use, and seal checks</span></a>
        </div>
      </div>
      <div class="content-section">
        <h3>Hearing Protection That Fits</h3>
        <p>Reduce noise at the source where feasible. When hearing protection is required, select enough protection for the measured exposure and wear it correctly for the entire exposure. The package Noise Reduction Rating is not a guarantee of the protection an individual miner receives.</p>
        <ul>
          <li>Use the NIOSH five Cs when choosing among approved protectors: <strong>comfort, compatibility, convenience, communication, and cost</strong>. The selection must also provide the needed attenuation without creating harmful overprotection.</li>
          <li>For soft foam earplugs, use <strong>Roll–Pull–Hold</strong>: roll with clean hands into a thin cylinder, pull the ear up and back, insert, then hold while it expands.</li>
          <li>Check the fit. If cupping and uncupping your hands changes the sound greatly, the plugs may not be sealing well; remove them and refit.</li>
          <li>Individual hearing-protector fit testing can produce a Personal Attenuation Rating and is a NIOSH best practice. Do not confuse it with the required respirator fit test.</li>
        </ul>
        <div class="resource-grid">
          <a class="resource-card" href="https://www.cdc.gov/niosh/noise/prevent/ppe.html" target="_blank" rel="noopener"><strong>NIOSH hearing-protection guidance</strong><span>Selection, five Cs, fit, and consistent use</span></a>
          <a class="resource-card" href="https://www.cdc.gov/niosh/mining/tools/hlsim.html" target="_blank" rel="noopener"><strong>NIOSH Hearing Loss Simulator</strong><span>Instructor demonstration of long-term noise effects</span></a>
        </div>
      </div>
      <div class="content-section">
        <h3>Engineering Controls in Action: Conveyor Dust</h3>
        <p>A 2026 NIOSH field evaluation reported a 93% decrease in respirable dust around a tested enclosed conveyor, crusher, and transfer-point retrofit that combined active filtration with synchronized water suppression. This is an example of controlling dust at its source, not an endorsement or a one-size-fits-all design.</p>
        <p><a href="https://www.cdc.gov/niosh/docs/2026-102/default.html" target="_blank" rel="noopener">Review NIOSH Technology News 2026-102 with the instructor</a> and discuss where enclosure, filtration, negative pressure, and water could be applied at the mine.</p>
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
      { q: "Which cleanup method best prevents settled respirable dust from becoming airborne again?", options: ["Dry sweeping as fast as possible", "Compressed air directed across the floor", "A site-approved wet method or properly filtered industrial vacuum", "An ordinary household vacuum regardless of filter"], answer: 2 },
      { q: "When a required 3M valved N95 is used for particulate cleanup, the miner must:", options: ["Pass a fit test for the exact model and size and perform a seal check each time it is worn", "Use it for gases and oxygen deficiency", "Pinch the nose clip with one hand only", "Wear it over facial hair that crosses the seal"], answer: 0 },
      { q: "Which statement about the 3M 6200/07025 is correct?", options: ["It is a complete DPM respirator without filters", "It is the medium facepiece and needs program-selected compatible filters before it protects", "It supplies oxygen", "Any cartridge that physically connects is acceptable"], answer: 1 }
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
      <div class="content-section official-resource-panel">
        <div class="official-resource-heading">
          <div>
            <span class="resource-badge resource-badge-required">Instructor skills practice</span>
            <h3>Current First-Aid References</h3>
          </div>
          <span class="document-meta">Supporting resources</span>
        </div>
        <p>Use these current authoritative resources with the instructor demonstration. Links support review; they do not replace hands-on practice, the mine emergency plan, or a recognized First Aid/CPR/AED course.</p>
        <div class="resource-grid">
          <a class="resource-card" href="https://www.redcross.org/take-a-class/aed/using-an-aed/aed-steps" target="_blank" rel="noopener noreferrer"><strong>American Red Cross AED steps</strong><span>Scene safety, activation, pad placement, analysis, and shock sequence</span></a>
          <a class="resource-card" href="https://www.stopthebleed.org/get-trained/online-course/" target="_blank" rel="noopener noreferrer"><strong>ACS Stop the Bleed review</strong><span>Recognize life-threatening bleeding and review pressure, packing, and tourniquet concepts</span></a>
          <a class="resource-card" href="https://www.osha.gov/medical-first-aid/" target="_blank" rel="noopener noreferrer"><strong>OSHA medical and first-aid overview</strong><span>Program planning, supplies, response, and training references</span></a>
          <a class="resource-card" href="https://www.osha.gov/sites/default/files/publications/OSHA3317first-aid.pdf" target="_blank" rel="noopener noreferrer"><strong>OSHA Best Practices Guide</strong><span>Workplace first-aid program reference for instructor discussion</span></a>
        </div>
        <div class="warning-box"><strong>Emergency rule:</strong> activate the mine's emergency response and 911/EMS process early. Do not delay professional care while searching an online reference.</div>
      </div>
      <div class="content-section">
        <h3>Heat Stress: Recognize It Early</h3>
        <p>Hot conditions can occur underground, on surface equipment, near asphalt operations, during strenuous work, and while wearing protective equipment. Risk increases with heat, humidity, workload, radiant heat, limited air movement, dehydration, illness, medication, and lack of acclimatization.</p>
        <ul>
          <li>Use hydration, work/rest controls, shade or cooling, ventilation, acclimatization, and the buddy system required by the site.</li>
          <li>Report headache, dizziness, unusual fatigue, cramps, nausea, confusion, loss of coordination, fainting, or other concerning changes immediately.</li>
          <li>Move the person to a cooler area, begin appropriate cooling, and activate the mine's emergency medical response. Confusion, collapse, seizure, or loss of consciousness is an emergency.</li>
          <li>Do not leave a symptomatic worker alone or tell them simply to finish the shift.</li>
        </ul>
        <p><a href="https://www.cdc.gov/niosh/docs/mining/works/coversheet2226.html" target="_blank" rel="noopener">NIOSH Keeping Cool: Training to Reduce Heat Stress Incidents in Mines</a> supplies the instructor activity and discussion guide used with this lesson.</p>
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
      "Identify the major mine gases, their sources, health or explosion hazards, and likely accumulation areas",
      "Understand oxygen, ppm, time-weighted-average, ceiling, and lower-explosive-limit reference values",
      "Recognize sensory and physical warning signs without relying on smell to declare air safe",
      "Know that supervisors carry and operate the MSA ALTAIR 4X and when to request atmospheric testing",
      "Recognize blast-area controls, post-blast CO and NOx fumes, and that re-entry is authorized only after ventilation and testing",
      "Apply the stop, warn, withdraw, and report response to any suspected atmospheric hazard"
    ],
    content: `
      <div class="content-section">
        <h3>Your Role When Air Quality Is in Question</h3>
        <p><strong>At these operations, supervisors—not new-miner trainees—carry and operate the MSA ALTAIR 4X multigas detector.</strong> Trainees need to recognize conditions that may change the atmosphere, know the limits of human senses, and ask the supervisor to evaluate any air-quality question.</p>
        <div class="key-box"><strong>Remember: Stop → Warn → Withdraw → Report.</strong> Stop the task, warn people nearby, withdraw toward known fresh air by the established route, and immediately report the location and what you noticed to the supervisor. Follow an alarm, evacuation order, or emergency procedure without waiting to compare numbers.</div>
        <ul>
          <li>Do not enter, re-enter, or move closer to investigate a suspected gas source.</li>
          <li>Do not wait for a smell, visible cloud, symptom, or supervisor's detector alarm if something already seems wrong.</li>
          <li>Avoid creating an ignition source. Do not start or operate equipment, lights, switches, phones, or tools in the questionable area except as the site's emergency procedure specifically directs.</li>
          <li>Give the supervisor useful facts: exact location, time, ventilation change, smoke or color, odor if noticed unintentionally, symptoms, equipment operating, blasting status, and direction of travel.</li>
          <li>Keep others out until an authorized supervisor has the atmosphere tested with the correct instrument and the area is released under the mine procedure.</li>
          <li>If someone collapses in questionable air, do not become a second victim. Withdraw, activate the mine emergency response, and leave entry and rescue to trained, properly equipped personnel.</li>
        </ul>
        <div class="warning-box"><strong>An exposure limit is not permission to remain in a questionable atmosphere.</strong> Detector alarms and company action levels may require action before a regulatory exposure limit is reached. Trainees withdraw and report; authorized personnel determine testing, controls, and re-entry.</div>
      </div>
      <div class="content-section">
        <h3>Gas and Oxygen Reference Guide</h3>
        <p><strong>ppm</strong> means parts per million. A <strong>TWA</strong> is a time-weighted average over a work shift; it is not an acceptable short-term peak. A <strong>ceiling</strong> must not be exceeded. <strong>%LEL</strong> describes how close a combustible atmosphere is to its lower explosive limit; it is not percent gas by volume.</p>
        <div class="training-table-wrap">
          <table class="training-table">
            <thead>
              <tr><th>Gas or condition</th><th>Main hazard and reference value</th><th>Common source or likely area</th><th>What a trainee may notice</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Oxygen (O₂)</strong></td>
                <td>Normal fresh air is about 20.9%. Active underground workings must contain at least <strong>19.5% oxygen</strong>. Too much oxygen also increases fire intensity.</td>
                <td>Deficiency can result from displacement by another gas, fire or combustion, oxidation, blasting, poor ventilation, sealed or abandoned areas, tanks, pits, and other confined or low-airflow spaces.</td>
                <td>No dependable odor or color. Headache, poor judgment, rapid breathing, dizziness, confusion, or collapse can occur—but symptoms may arrive too late.</td>
              </tr>
              <tr>
                <td><strong>Carbon monoxide (CO)</strong></td>
                <td>Toxic chemical asphyxiant. The MSHA metal/nonmetal reference is <strong>50 ppm TWA</strong>; NIOSH recommends a more protective 35 ppm TWA and 200 ppm ceiling.</td>
                <td>Mine fires, hot or smoldering material, incomplete combustion, diesel or gasoline exhaust, welding/cutting, blasting fumes, and poorly ventilated equipment areas or headings.</td>
                <td><strong>Colorless and odorless.</strong> Headache, weakness, nausea, dizziness, confusion, chest discomfort, or collapse. Never use smoke color or smell to rule it out.</td>
              </tr>
              <tr>
                <td><strong>Carbon dioxide (CO₂)</strong></td>
                <td>Displaces oxygen and increases breathing rate. MSHA reference: <strong>5,000 ppm TWA</strong>. A typical four-gas ALTAIR 4X does not measure CO₂.</td>
                <td>Fire and combustion, respiration, blasting, decomposition, poor ventilation, sealed areas, sumps, pits, shafts, and low areas. It is heavier than air when still.</td>
                <td><strong>Colorless and odorless.</strong> Rapid breathing, headache, confusion, shortness of breath, or loss of consciousness at higher concentrations.</td>
              </tr>
              <tr>
                <td><strong>Hydrogen sulfide (H₂S)</strong></td>
                <td>Highly toxic and also flammable. MSHA reference: <strong>10 ppm TWA</strong>. The explosive range is approximately 4.3–45.5% by volume.</td>
                <td>Standing or stagnant water, decaying organic material, disturbed strata, poorly ventilated low areas, sumps, sewers, unsealing, and some fire conditions. It is somewhat heavier than air.</td>
                <td>May smell like rotten eggs at a low concentration, but the sense of smell can rapidly fatigue or be paralyzed. Eye irritation, cough, dizziness, or sudden collapse are danger signs—not a detection method.</td>
              </tr>
              <tr>
                <td><strong>Nitrogen dioxide (NO₂) and blast fumes</strong></td>
                <td>Highly toxic lung irritant; injury can worsen hours after exposure. MSHA ceiling reference: <strong>5 ppm</strong>. A typical four-gas ALTAIR 4X does not measure NO₂.</td>
                <td>Detonation of explosives, diesel exhaust, fire, and some welding or cutting. Re-entry after blasting occurs only after the required ventilation time and authorization.</td>
                <td>May appear reddish-brown and smell sharp or acrid, but never approach or sniff to check. Burning eyes/throat, cough, chest tightness, and delayed breathing difficulty require prompt medical evaluation.</td>
              </tr>
              <tr>
                <td><strong>Sulfur dioxide (SO₂)</strong></td>
                <td>Toxic, corrosive respiratory irritant. The MSHA metal/nonmetal occupational reference is <strong>5 ppm TWA</strong>; current mine-rescue rules use more than <strong>2 ppm</strong> as an irrespirable-atmosphere benchmark. A typical four-gas ALTAIR 4X does not measure SO₂.</td>
                <td>Fires involving sulfur-bearing material, disturbed standing water in some mines, blasting, and sealed or poorly ventilated areas. It is heavier than air when still.</td>
                <td>Pungent, suffocating odor; burning eyes, nose, and throat; cough or chest tightness. The odor is a warning to leave, never a way to judge concentration.</td>
              </tr>
              <tr>
                <td><strong>Methane (CH₄) and combustible gas</strong></td>
                <td>Fire and explosion hazard. Methane's explosive range is approximately <strong>5–15% by volume</strong>; detectors commonly display combustible gas as %LEL. Site alarm settings—not memory—control the response.</td>
                <td>Methane can issue from strata or old workings. Fuel gases can come from leaks. Methane is lighter than air and may reach roof/high pockets, but ventilation and turbulence control actual travel.</td>
                <td>Pure methane is colorless and odorless. Odorized fuel may be noticeable, but odor is not proof of either safety or the identity of the gas.</td>
              </tr>
              <tr>
                <td><strong>Hydrogen (H₂)</strong></td>
                <td>Extremely flammable; approximate explosive range <strong>4–75% by volume</strong>. It can also displace oxygen.</td>
                <td>Battery charging, some fire conditions, and chemical reactions. It is very light and may collect in high, poorly ventilated roof spaces.</td>
                <td>Colorless and odorless. Bubbling batteries, overheating, damaged chargers, or ventilation failure are reasons to leave and notify the supervisor.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Regulatory references: <a href="https://www.ecfr.gov/current/title-30/chapter-I/subchapter-K/part-57/subpart-D/section-57.5001" target="_blank" rel="noopener noreferrer">30 CFR § 57.5001 exposure limits</a>, <a href="https://www.ecfr.gov/current/title-30/chapter-I/subchapter-K/part-57/subpart-D/section-57.5015" target="_blank" rel="noopener noreferrer">30 CFR § 57.5015 oxygen deficiency</a>, and <a href="https://www.msha.gov/sites/default/files/Training_Education/Final%20-%20IG%20115%20Mine%20Rescue%20Guide.pdf" target="_blank" rel="noopener noreferrer">MSHA Unified Mine Rescue Training</a>. The mine's current alarm settings, action levels, approved plans, and procedures control and may be more protective.</p>
      </div>
      <div class="content-section">
        <h3>Where Gases Can Accumulate—and Why Density Is Only a Clue</h3>
        <ul>
          <li><strong>Ventilation interruptions:</strong> a stopped fan, damaged duct, open or closed door, damaged stopping, blocked opening, or changed airflow can quickly alter conditions.</li>
          <li><strong>After blasting:</strong> CO and nitrogen oxides can remain in fumes or travel with the ventilation current. Observe the full re-entry time and supervisor authorization.</li>
          <li><strong>Combustion and equipment:</strong> fires, smoldering belts or tires, diesel/gasoline exhaust, hot work, and malfunctioning engines can produce CO and irritating gases.</li>
          <li><strong>Low or enclosed spaces:</strong> pits, sumps, shafts, tanks, bins, dead-end headings, sealed or abandoned openings, and poorly ventilated rooms can contain heavy gases or oxygen deficiency.</li>
          <li><strong>High spaces:</strong> methane and hydrogen may reach roof voids, high points, or poorly ventilated battery-charging areas.</li>
          <li><strong>Returns and downwind areas:</strong> gases and smoke follow the actual air current and can expose people far from the source.</li>
        </ul>
        <p>Gas density helps a qualified tester choose sampling locations, but it does not predict a working mine atmosphere by itself. Fans, pressure changes, equipment movement, temperature, obstructions, and turbulence can mix or move gases. Testing must cover the locations required by the mine procedure.</p>
        <div class="warning-box"><strong>Use your senses only to recognize a possible emergency—not to clear the air.</strong> Smoke or haze, unusual fumes, a sharp or rotten-egg odor, eye or throat irritation, headache, nausea, dizziness, confusion, unexpected fatigue, rapid breathing, or another worker acting strangely all require withdrawal and notification.</div>
      </div>

      <div class="content-section">
        <h3>Post-Blast Fumes and Re-Entry in Underground Limestone</h3>
        <p>Production blasting is the main source of toxic gases in many underground stone mines. The gases of concern are mainly <strong>carbon monoxide (CO)</strong> and the <strong>oxides of nitrogen (NO and NO<sub>2</sub>)</strong>. CO is colorless and odorless. NO<sub>2</sub> may appear as a reddish-brown / orange cloud and is a severe lung irritant; symptoms can worsen hours later.</p>
        <p>NIOSH measured post-blast gases in an operating underground limestone mine. <strong>CO took the longest to clear.</strong> Average re-entry based on CO was about <strong>1.3 hours</strong>, about <strong>2.7 hours</strong> at one standard deviation, and <strong>well over 3 hours</strong> on some shots. A clock on the wall is not a clearance. Stay out until ventilation has run and an authorized supervisor releases the area with the correct instrument.</p>
        <div class="key-box"><strong>Meter limit:</strong> a typical four-gas ALTAIR 4X reads O<sub>2</sub>, LEL, CO, and H<sub>2</sub>S. It does <strong>not</strong> measure NO<sub>2</sub>. Do not treat a quiet four-gas meter as proof that blast fumes are gone.</div>
        <ul>
          <li>Obey blast signals, exclusion zones, and the all-clear. Do not walk onto a muck pile or heading to "see if it looks clear."</li>
          <li>The blasting videos in this module are awareness only. They do not authorize handling explosives, stemming, or firing.</li>
          <li>Module 5 still has the open-pit blast-area overview, and Module 12 still has the task-training explosives sequence. They were copied here so gases and blasting fumes are taught together.</li>
        </ul>
      </div>
      <div class="content-section">
        <h3>What Trainees Need to Know About the Supervisor's ALTAIR 4X</h3>
        <p>Supervisors are responsible for carrying and operating the company ALTAIR 4X under the atmospheric-testing procedure. The required video shows why a supervisor inspects and bump-tests the detector before use. It does <strong>not</strong> authorize a trainee to test an area, interpret a questionable atmosphere, silence an alarm, or make a re-entry decision.</p>
        <ul>
          <li>The typical company configuration displays <strong>O₂, combustible gas as %LEL, CO in ppm, and H₂S in ppm</strong>. The supervisor verifies the actual installed sensors, units, calibration gas, and alarm settings.</li>
          <li>A typical four-gas unit does <strong>not</strong> detect every possible hazard, including CO₂, NO₂, and SO₂. The supervisor must select the correct detector or test method for the suspected hazard.</li>
          <li>A bump test confirms that installed sensors respond to known gas and the alarms function. Calibration adjusts accuracy. Neither process proves that every location will remain safe.</li>
          <li>If you have any air-quality question, ask the supervisor before entering or continuing. If conditions already appear questionable, withdraw first and make the report from known fresh air.</li>
        </ul>
        <div class="key-box"><strong>Trainee demonstration:</strong> identify the supervisor as the monitor carrier, name the four typical channels and at least two gases they do not cover, recognize the audible/visual/vibrating alarms, and state: “Stop, warn, withdraw, report.”</div>
      </div>
      <div class="content-section">
        <h3>How the Hazard Is Controlled</h3>
        <ol>
          <li><strong>Recognize and report:</strong> miners promptly report fires, fumes, ventilation changes, symptoms, odors, leaks, and other atmospheric concerns.</li>
          <li><strong>Restrict and withdraw:</strong> prevent entry and remove exposed people according to the emergency or atmospheric-hazard procedure.</li>
          <li><strong>Test correctly:</strong> the supervisor or other authorized person uses a bump-tested detector with the sensors needed for the suspected gases and samples from a safe position.</li>
          <li><strong>Control the source:</strong> restore or improve ventilation, stop combustion or leakage, isolate ignition sources under the approved procedure, repair equipment, and use other engineering or administrative controls.</li>
          <li><strong>Verify before re-entry:</strong> authorized personnel retest all required locations and release the area. A single good reading in one spot or at one time is not enough.</li>
          <li><strong>Evaluate exposure:</strong> anyone with possible symptoms or significant exposure receives prompt medical evaluation, especially after CO or nitrogen-dioxide exposure because serious effects can be delayed.</li>
        </ol>
        <div class="resource-grid">
          <a class="resource-card" href="https://docs.msasafety.com/altair4x/en-us/ALTAIR%204X%20US%20OPM%2010105903/PDF%20Download/OPM%20Altair%204X%2010105903_r6_US.pdf" target="_blank" rel="noopener noreferrer"><strong>MSA ALTAIR 4X user instructions</strong><span>Official operation, bump-test, alarm, calibration, and limitation reference</span></a>
          <a class="resource-card" href="https://www.ecfr.gov/current/title-30/chapter-I/subchapter-K/part-57/subpart-D/section-57.5001" target="_blank" rel="noopener noreferrer"><strong>30 CFR § 57.5001</strong><span>Current official eCFR exposure-limit reference</span></a>
          <a class="resource-card" href="https://www.ecfr.gov/current/title-30/chapter-I/subchapter-K/part-57/subpart-D/section-57.5015" target="_blank" rel="noopener noreferrer"><strong>30 CFR § 57.5015</strong><span>Current official oxygen-deficiency standard</span></a>
          <a class="resource-card" href="https://www.msha.gov/sites/default/files/Training_Education/Final%20-%20IG%20115%20Mine%20Rescue%20Guide.pdf" target="_blank" rel="noopener noreferrer"><strong>MSHA mine-rescue gas guide (IG 115 Module 2)</strong><span>Classroom text for gas properties and detection. Skip coal-only damps as procedure.</span></a>
          <a class="resource-card" href="https://stacks.cdc.gov/view/cdc/227865/cdc_227865_DS1.pdf" target="_blank" rel="noopener noreferrer"><strong>NIOSH limestone post-blast re-entry study</strong><span>CO, NO, and NO2 measured in an underground limestone mine; CO clears slowest</span></a>
          <a class="resource-card" href="https://www.cdc.gov/niosh/mining/works/coversheet1739.html" target="_blank" rel="noopener noreferrer"><strong>NIOSH: Dangers of Toxic Fumes from Blasting</strong><span>CO and NOx from explosives; stay out of confined spaces until air is tested</span></a>
        </div>
        <p>Only personnel designated by the company operate, bump-test, calibrate, or make decisions from the instrument.</p>
        <div class="warning-box">The ALTAIR 4X is a warning and measurement tool—not respiratory protection. A dust respirator does not protect against mine gases or oxygen deficiency. The MSA W65 does not supply oxygen and does not protect in an oxygen-deficient atmosphere.</div>
      </div>
      <div class="video-box">
        <p style="font-weight:600;">Required Attention Time</p>
        <p style="font-size:0.85rem;color:var(--text-muted);">Complete the gas-recognition lesson, required videos (atmosphere principles, ALTAIR 4X demonstration, blasting-fume / explosives awareness), and trainee alarm/response verification. Full module seat time remains 2.0 hours.</p>
        <div class="timer-display" id="timer-11">120:00</div>
        <button class="btn btn-sm" id="btn-timer-11" onclick="startTimer(11, 120)">Start 2-hour Required Timer (120 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-11">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Carbon monoxide is dangerous because it is:", options: ["Always visible as black smoke", "Odorless, colorless, and binds to hemoglobin reducing oxygen delivery", "Only a problem in surface mines", "Harmless at low concentrations forever"], answer: 1 },
      { q: "If a trainee notices unusual fumes, irritation, dizziness, or a ventilation change, the correct response is to:", options: ["Stop, warn others, withdraw toward known fresh air, and report to the supervisor", "Move closer to identify the smell", "Wait for someone else's detector to alarm", "Put on an N95 and continue"], answer: 0 },
      { q: "Air in active underground workings must contain at least:", options: ["15% oxygen", "19.5% oxygen", "25% oxygen", "50% oxygen"], answer: 1 },
      { q: "The primary engineering control for many mine gas hazards is:", options: ["Working faster", "Adequate ventilation and atmospheric monitoring", "Ignoring the issue", "Relying only on emergency escape equipment"], answer: 1 },
      { q: "Which statement about the company ALTAIR 4X is correct for trainees?", options: ["Supervisors carry and operate it; trainees recognize alarms, withdraw, and report concerns", "Every trainee uses it to clear any area", "It detects every possible mine gas", "It makes a questionable atmosphere safe"], answer: 0 }
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
      <div class="content-section">
        <h3>Build the Safe Work Procedure Before the Work Starts</h3>
        <p>A useful job task analysis (JTA) or safe work procedure turns a task into a controlled sequence. It is prepared with knowledgeable workers and the trainer, checked against the equipment manual, standards, site conditions, and HazCom information, then verified through non-production instruction and supervised practice.</p>
        <ol class="jta-steps">
          <li><strong>Define the task and limits.</strong> State the exact equipment, location, expected condition, who is authorized, and what is outside the assignment.</li>
          <li><strong>List the steps in order.</strong> Include preparation, startup or access, normal work, shutdown, cleanup, and restoration.</li>
          <li><strong>Identify hazards at each step.</strong> Consider moving equipment, line of fire, ground, gravity, electrical/hydraulic/pneumatic energy, dust, chemicals, noise, slips, and changing conditions.</li>
          <li><strong>Assign controls and stop triggers.</strong> Name the guard, isolation, communication, exclusion zone, PPE, tool, examination, or environmental limit required before that step continues.</li>
          <li><strong>Demonstrate, practice, and verify.</strong> The trainee explains and performs the procedure under qualified supervision, including how to stop, secure, report, and respond to a change.</li>
        </ol>
        <h4>Practice scenario: cleanup near a conveyor</h4>
        <div class="training-table-wrap">
          <table class="training-table">
            <thead><tr><th>Step</th><th>Main hazards</th><th>Controls and stop triggers</th></tr></thead>
            <tbody>
              <tr><td>Confirm scope and status</td><td>Unexpected belt movement; wrong work area; conflicting crews</td><td>Coordinate with the responsible person, identify the exact conveyor and boundaries, and verify the required operating or isolated condition.</td></tr>
              <tr><td>Establish access</td><td>Mobile equipment, slips, falling material, unsafe ground</td><td>Examine the route, control traffic, barricade as required, maintain three points of contact, and correct access hazards before entry.</td></tr>
              <tr><td>Remove settled material</td><td>Entanglement, nip points, stored material, respirable dust</td><td>Stay outside guards and danger zones; use the approved wet or filtered-vacuum method. If the task requires reaching through a guard, entering a danger zone, or defeating a safeguard, stop and apply the mine's lockout/tagout and blocking procedure.</td></tr>
              <tr><td>Inspect and restore</td><td>Missing guards, tools or people left in the area, uncontrolled restart</td><td>Account for people, tools, and material; replace and verify guards; communicate completion; and restore energy only through the authorized procedure.</td></tr>
            </tbody>
          </table>
        </div>
        <div class="warning-box"><strong>This exercise is not task authorization.</strong> The completed classroom example does not qualify a trainee to operate, maintain, clean, or enter a conveyor danger zone. The actual mine procedure, task training, demonstrated skill, supervision, and required training record control.</div>
        <div class="resource-grid">
          <a class="resource-card" href="https://arlweb.msha.gov/training/docs/task-training-guidelines.pdf" target="_blank" rel="noopener"><strong>MSHA task-training guidelines</strong><span>Assessment, checklists, supervised practice, demonstrations, and records</span></a>
          <a class="resource-card" href="https://www.msha.gov/sites/default/files/Training_Education/OT%2055%20-%20Part%2048%20Reference%20Guide.pdf" target="_blank" rel="noopener"><strong>MSHA Part 48 reference guide</strong><span>Training subjects, task-training framework, and documentation</span></a>
          <a class="resource-card" href="https://www.cdc.gov/niosh/docs/mining/works/coversheet18.html" target="_blank" rel="noopener"><strong>NIOSH job task analysis</strong><span>Structured analysis of task steps, hazards, and controls</span></a>
        </div>
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
          <li>MSA W65 purpose, limitations, and the continuing need for hands-on practice</li>
          <li>Transportation, communication, and check-in/out discipline</li>
          <li>Hazard recognition in both underground and surface environments</li>
          <li>Escapeways, maps, and emergency response</li>
          <li>Ground control and ventilation plan awareness</li>
          <li>Health, HazCom, electrical safety, first aid, and mine gases</li>
          <li>Task training requirements and accident prevention</li>
        </ul>
        <div class="warning-box"><strong>Still required after this classroom portion:</strong> Approximately 8 hours of mine-site specific training, hands-on practice with the MSA W65 used at these operations, and any additional elements required by your approved training plan and the District Manager. An MSHA-approved instructor must oversee the overall program and issue or sign the appropriate 5000-23 records.</div>
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
      { q: "True or False: Completing this computer-based support tool alone replaces mine-site training and hands-on practice with the MSA W65.", options: ["True", "False"], answer: 1 },
      { q: "A miner who has completed the required new miner training still needs:", options: ["No further training ever", "Annual refresher training and task training when assigned new tasks", "Only refresher training every five years", "Nothing if they stay at the same mine"], answer: 1 },
      { q: "The primary purpose of this entire training program is to:", options: ["Meet a paperwork quota", "Give new miners the knowledge and skills to work safely and to recognize and avoid hazards", "Increase production numbers immediately", "Replace the need for supervisors"], answer: 1 },
      { q: "If you are ever unsure about a safety procedure or hazard you should:", options: ["Guess and hope for the best", "Ask a supervisor or qualified person and follow the approved procedures", "Ignore it", "Only ask after an incident occurs"], answer: 1 },
      { q: "Documentation of training (including the 5000-23) is:", options: ["Optional", "Required and must be maintained according to Part 48", "Only needed for underground coal", "Destroyed after 30 days"], answer: 1 }
    ]
  }
];

const MODULES = [...MODULES_PART_1, ...MODULES_PART_2];
