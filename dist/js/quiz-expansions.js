/* Ten-question quiz banks added after the core module and site data load. */
const MODULE_QUIZ_ADDITIONS = {
  2: [
    { q: "A miners' representative may:", options: ["Accompany an MSHA inspector during an inspection", "Issue federal citations", "Ignore mine safety rules", "Assign production quotas"], answer: 0 },
    { q: "Required training time is generally:", options: ["Unpaid volunteer time", "Paid training time", "Paid only after one year", "Deducted from vacation"], answer: 1 },
    { q: "After reporting a serious hazard, a miner should:", options: ["Follow the mine's reporting and documentation procedure", "Remove the report if production is delayed", "Assume no follow-up is needed", "Discuss it only off site"], answer: 0 },
    { q: "Who is responsible for providing or arranging required task training?", options: ["The supervisor or operator", "The newest miner", "Equipment vendors only", "Visitors"], answer: 0 }
  ],
  3: [
    { q: "The MSA W65 is intended primarily for:", options: ["Routine dust control", "Emergency escape from carbon monoxide produced by a fire or explosion", "Underwater rescue", "Welding fumes during normal work"], answer: 1 },
    { q: "Why must a service W65 not be opened for practice?", options: ["It is a sealed, one-use escape device; an approved trainer is used for practice", "It is too heavy", "It has no mouthpiece", "It can only be opened outdoors"], answer: 0 },
    { q: "Which items are part of proper W65 donning?", options: ["Mouthpiece, nose clip, and head harness", "Safety glasses only", "Earplugs and gloves", "A welding hood"], answer: 0 },
    { q: "When should the W65 be removed during an escape?", options: ["As soon as breathing feels warm", "Only after you are confirmed to be in fresh air", "At the first intersection", "Whenever you need to speak"], answer: 1 },
    { q: "What should you do if your W65 is missing, opened, or damaged before going underground?", options: ["Go underground and borrow one later", "Report it immediately and obtain an acceptable unit under site procedure", "Repair the seal with tape", "Carry it only if an inspector is present"], answer: 1 }
  ],
  4: [
    { q: "A miner may tag in or check in for another person:", options: ["Whenever the crew is late", "Only with a text message", "Never", "Only on night shift"], answer: 2 },
    { q: "Before approaching mobile equipment, you should:", options: ["Enter the operator's blind spot", "Establish positive communication with the operator", "Assume the operator sees you", "Wave from behind the machine"], answer: 1 },
    { q: "A NIOSH blind-area diagram for a Cat 992G should be used as:", options: ["An exact map for every Cat 980M or 988 loader", "A teaching example that must be supplemented by the actual machine, manual, site plan, and site evaluation", "Proof that cameras eliminate blind areas", "Permission to approach whenever the operator is seated"], answer: 1 },
    { q: "The check-in/check-out system primarily supports:", options: ["Payroll only", "Emergency accountability for people at the mine", "Equipment maintenance", "Product inventory"], answer: 1 },
    { q: "Emergency radio communication should be:", options: ["Clear, calm, and consistent with site procedure", "Delayed until the end of shift", "Limited to rumors", "Replaced by hand signals from any distance"], answer: 0 }
  ],
  5: [
    { q: "When a load is suspended overhead, you should:", options: ["Walk beneath it quickly", "Stay clear of the suspended-load area", "Hold it steady by hand", "Stand under it to guide the operator"], answer: 1 },
    { q: "A personal fall-arrest system should be used only after:", options: ["The hazard is assessed, higher-level controls are considered, components and anchorage are approved, and rescue is planned", "The worker finds any nearby object for tie-off", "Different components are connected without checking compatibility", "The free-fall distance is ignored"], answer: 0 },
    { q: "A good practice on a wet, icy, greasy, or debris-covered inclined walkway is to:", options: ["Keep hands free, maintain three points of contact where applicable, and move deliberately", "Run downhill before conditions worsen", "Carry loose tools in both hands", "Assume grating cannot be slippery"], answer: 0 },
    { q: "A harness, lanyard, or SRL showing damage or evidence of deployment should be:", options: ["Removed from service and handled under the manufacturer and site procedure", "Used for one more shift", "Repaired with tape", "Connected to a handrail"], answer: 0 }
  ],
  6: [
    { q: "A mine map used for emergency preparation should identify:", options: ["Escapeways, ventilation controls, refuge or gathering locations, and major hazards", "Only office furniture", "Only property taxes", "Production bonuses"], answer: 0 },
    { q: "The purpose of evacuation drills is to:", options: ["Make emergency actions and routes familiar before an emergency", "Replace the written emergency plan", "Test production speed", "Eliminate the need for communication"], answer: 0 },
    { q: "If an escapeway or mine map changes, miners should:", options: ["Keep following the old map", "Review the current route and procedure with the mine", "Choose any shorter route", "Wait for an emergency to learn it"], answer: 1 },
    { q: "During an underground emergency, movement should follow:", options: ["The current mine emergency plan and designated route toward fresh air", "A social-media post", "The normal production schedule", "Any unexamined opening"], answer: 0 },
    { q: "Barricading materials and procedures should be used:", options: ["Only as directed by the mine's emergency plan and training", "Whenever a miner wants privacy", "Instead of evacuation in every emergency", "To block required travelways during normal work"], answer: 0 }
  ],
  7: [
    { q: "If unsupported ground is observed, you should:", options: ["Stay clear and report it immediately", "Work beneath it briefly", "Strike it with equipment", "Ignore it if no rock has fallen"], answer: 0 },
    { q: "Possible warning signs of unstable ground include:", options: ["Cracking, spalling, water, and unusual sounds", "Fresh paint", "A clean floor", "Normal radio traffic"], answer: 0 },
    { q: "Scaling should be performed only by someone who is:", options: ["Trained, authorized, and following the ground-control procedure", "New to the mine", "Working alone without tools", "Standing under loose ground"], answer: 0 },
    { q: "Mine ventilation helps control:", options: ["Diesel contaminants, dust, and blast fumes", "Payroll records", "Stockpile inventory", "Traffic signs"], answer: 0 },
    { q: "A ventilation control may be altered:", options: ["Only when authorized and under the applicable plan or procedure", "Whenever it blocks a shortcut", "By any visitor", "Without notifying anyone"], answer: 0 }
  ],
  8: [
    { q: "After an elevated dust or DPM result, the control priority is to:", options: ["Find the source and install, use, and maintain feasible engineering and administrative controls", "Issue any mask and make no other change", "Rotate miners as the only DPM control", "Wait for symptoms before investigating"], answer: 0 },
    { q: "For the 3M 6200 used as a non-powered DPM respirator, the filter must be:", options: ["The compatible, program-selected high-efficiency R/P-series or NIOSH DPM-approved filter required for the hazard", "Any gas cartridge that fits", "A disposable N95 placed inside the facepiece", "Omitted when the facepiece feels tight"], answer: 0 },
    { q: "The correct basic sequence for inserting soft foam earplugs is:", options: ["Roll–Pull–Hold", "Fold–Tap–Release", "Push–Twist–Cut", "Wet–Stretch–Drop"], answer: 0 },
    { q: "NIOSH's five Cs help select hearing protection that workers can wear correctly and consistently. They include:", options: ["Comfort, compatibility, convenience, communication, and cost", "Color, certificate, calendar, category, and company", "Cab, conveyor, cartridge, chemical, and citation", "Clean, crush, coil, cut, and clamp"], answer: 0 },
    { q: "Which statement about respirator fit testing and user seal checks is correct?", options: ["A fit test selects an acceptable exact model and size; a user seal check is still required each time the tight-fitting respirator is donned", "A seal check permanently replaces fit testing", "A fit test is performed after entering the exposure", "Neither applies to a required N95"], answer: 0 }
  ],
  9: [
    { q: "Water, conductive dust, and damaged insulation can:", options: ["Increase electrical risk", "Make electricity harmless", "Replace grounding", "Eliminate stored energy"], answer: 0 },
    { q: "Electrical repairs should be performed by:", options: ["Qualified and authorized persons following procedure", "Any nearby worker", "Visitors", "The least experienced employee"], answer: 0 },
    { q: "After isolating electrical energy, a tryout or test helps verify:", options: ["The energy has actually been controlled", "The production count", "The weather forecast", "The shift schedule"], answer: 0 },
    { q: "A damaged extension cord should be:", options: ["Removed from service and reported", "Wrapped with paper", "Used only in wet areas", "Hidden from inspection"], answer: 0 },
    { q: "Lower-voltage equipment:", options: ["Can still shock, burn, or kill", "Is always safe to touch", "Needs no inspection", "Cannot start a fire"], answer: 0 }
  ],
  10: [
    { q: "Before giving first aid, first confirm:", options: ["The scene is safe to enter", "The injured person can finish the shift", "Production has stopped everywhere", "A report has already been written"], answer: 0 },
    { q: "The mine's emergency medical response should generally be activated:", options: ["Early when serious injury or illness is suspected", "Only after the shift", "Only by email", "After all supplies are used"], answer: 0 },
    { q: "A basic initial action for life-threatening external bleeding is:", options: ["Apply direct pressure with an appropriate dressing", "Give food", "Have the person walk", "Delay care until a supervisor arrives"], answer: 0 },
    { q: "Confusion, collapse, seizure, or loss of consciousness during hot work should be treated as:", options: ["A medical emergency requiring prompt cooling and activation of emergency response", "Normal acclimatization", "A reason to leave the person alone", "A condition to reassess after the shift"], answer: 0 },
    { q: "First aid serves as:", options: ["A bridge until professional medical care takes over", "A replacement for all medical care", "A disciplinary procedure", "A production tool"], answer: 0 }
  ],
  11: [
    { q: "Which group is not measured by a typical O₂/LEL/CO/H₂S four-gas ALTAIR 4X?", options: ["Carbon dioxide, nitrogen dioxide, and sulfur dioxide", "Oxygen, CO, and H₂S", "Combustible gas and oxygen", "CO and combustible gas"], answer: 0 },
    { q: "The MSHA metal/nonmetal carbon-monoxide exposure reference is:", options: ["50 ppm as a time-weighted average", "5% by volume", "19.5% by volume", "10% LEL for every gas"], answer: 0 },
    { q: "Why is the rotten-egg odor of hydrogen sulfide not a safe warning method?", options: ["The sense of smell can rapidly fatigue or be paralyzed", "H₂S is always odorless at every level", "Only supervisors can smell it", "Ventilation makes odor readings exact"], answer: 0 },
    { q: "Nitrogen-dioxide blast-fume exposure is especially concerning because:", options: ["Serious lung effects can be delayed after the worker initially leaves", "It only changes the color of clothing", "An N95 neutralizes it", "It is harmless after blasting"], answer: 0 },
    { q: "Why can trainees not assume all heavy gases stay low and all light gases stay high?", options: ["Ventilation, pressure, temperature, equipment movement, and turbulence can mix and transport gases", "Gas density never matters", "All gases weigh exactly the same", "Only outdoor air moves"], answer: 0 }
  ],
  12: [
    { q: "Required task training should occur:", options: ["Before a miner performs a covered new task", "After the first accident", "Only during annual refresher", "Only after six months"], answer: 0 },
    { q: "A useful job task analysis should connect:", options: ["The ordered task steps to their hazards, controls, and stop triggers", "Only the task name to a production target", "The newest worker to unsupervised trial and error", "Every task to the same generic checklist"], answer: 0 },
    { q: "A 'see something, say something' safety culture means:", options: ["Report hazards and concerns promptly", "Discuss hazards only at home", "Wait for an inspection", "Ignore near misses"], answer: 0 },
    { q: "Workplace examinations support prevention by:", options: ["Identifying hazards so they can be corrected promptly", "Replacing task training", "Eliminating the need for procedures", "Measuring production only"], answer: 0 },
    { q: "During cleanup near a conveyor, the task would require reaching through a guard or entering a danger zone. What should happen?", options: ["Stop and apply the mine's lockout/tagout, blocking, and task procedure before exposure", "Reach through quickly while the belt runs", "Ask a coworker to watch the start switch", "Remove the guard and leave it off"], answer: 0 }
  ],
  13: [
    { q: "A critical limitation of the MSA W65 is that it:", options: ["Does not supply oxygen or protect in an oxygen-deficient atmosphere", "Cannot be carried underground", "Is intended for routine dust control", "Replaces the mine emergency plan"], answer: 0 },
    { q: "When app content and the mine's current approved plan differ, miners should follow:", options: ["The current mine plan and qualified instructor's direction", "An old screenshot", "A guess", "The shortest answer"], answer: 0 },
    { q: "The classroom certificate from this support tool:", options: ["Does not replace the operator's required training records or Form 5000-23", "Is automatically an MSHA-issued 5000-23", "Authorizes every mining task", "Eliminates site-specific training"], answer: 0 },
    { q: "If a hazard or procedure remains unclear after training, you should:", options: ["Stop and ask a supervisor or qualified person before proceeding", "Proceed and learn by trial and error", "Ignore it", "Wait until annual refresher"], answer: 0 }
  ]
};

const SITE_QUIZ_ADDITIONS = {
  "Boonesboro Quarry": [
    { q: "How many underground levels does Boonesboro Quarry have?", options: ["One", "Two", "Three", "Five"], answer: 2 },
    { q: "The Boonesboro Liwell plant produces:", options: ["A clean screened product used in asphalt mix", "Coal slurry", "Electrical power", "Concrete blocks"], answer: 0 },
    { q: "The Boonesboro mine shop is located on:", options: ["Level 1", "Level 2", "Level 3", "The KY 627 bridge"], answer: 0 }
  ],
  "Clover Bottom Quarry": [
    { q: "The old and new Clover Bottom underground mines are each:", options: ["One-level room-and-pillar mines", "Three-level coal mines", "Surface-only pits", "Inactive offices"], answer: 0 },
    { q: "Before entering underground at Clover Bottom, a miner must confirm:", options: ["Whether the assignment is in the old mine or new mine and use that mine's procedure", "Only the weather", "The asphalt price", "Which personal vehicle arrived first"], answer: 0 }
  ],
  "Dix River Stone": [
    { q: "How many underground levels does Dix River Stone have?", options: ["One", "Two", "Three", "Four"], answer: 1 },
    { q: "At Dix River Stone, material moves from the surface primary crusher through:", options: ["The surge silo to the secondary plant", "The Kentucky River", "The mine office", "BT3"], answer: 0 }
  ]
};

MODULES.forEach(module => {
  if (module.id === 1) return;
  module.questions = [...module.questions, ...(MODULE_QUIZ_ADDITIONS[module.id] || [])];
  if (module.questions.length !== 10) {
    throw new Error(`Module ${module.id} must have exactly 10 quiz questions.`);
  }
});

Object.entries(SITE_CONTENT).forEach(([siteName, site]) => {
  site.questions = [...site.questions, ...(SITE_QUIZ_ADDITIONS[siteName] || [])];
  if (site.questions.length !== 10) {
    throw new Error(`${siteName} must have exactly 10 quiz questions.`);
  }
});
