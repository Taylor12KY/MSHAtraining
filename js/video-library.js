const REQUIRED_VIDEOS = [
  {
    id: "VEOVVx3rDyI",
    moduleId: 2,
    title: '"We Are ... MSHA"',
    author: "PublicResourceOrg",
    durationSeconds: 528,
    description: "Overview of MSHA's enforcement, education, training, and technical-support mission."
  },
  {
    id: "QGkT8Ahh1-E",
    moduleId: 2,
    title: "Miners' Rights and Responsibilities – MSHA",
    author: "Part46Compliance",
    durationSeconds: 2409,
    description: "Overview of miners' rights and responsibilities under the Mine Act."
  },
  {
    id: "98555798",
    provider: "vimeo",
    moduleId: 3,
    title: "W65 Demo by Fred Raubach",
    author: "SURF",
    durationSeconds: 819,
    description: "Demonstration of the MSA W65 filter self-rescuer."
  },
  {
    id: "AU07-U96dfw",
    moduleId: 3,
    title: "Self Rescuer MSA W-65",
    author: "David Menchaca",
    durationSeconds: 162,
    description: "Short step-by-step W65 donning animation."
  },
  {
    id: "NH7vatxj_t0",
    moduleId: 4,
    title: "Powered Haulage: Be Alert, Be Ready!",
    author: "Florida Mine Safety Program",
    durationSeconds: 960,
    description: "Powered-haulage awareness, visibility, communication, and safe positioning."
  },
  {
    id: "yEwFZHVLsso",
    moduleId: 4,
    title: "Conveyor Safety in Mining",
    author: "USDepartmentofLabor",
    durationSeconds: 326,
    description: "Guarding, lockout/tagout, and safe crossing practices around conveyor systems."
  },
  {
    id: "mSt9lHz22xM",
    moduleId: 4,
    title: "Mining Truck Dumping Stone Underground",
    author: "Kentucky Crushed Stone",
    durationSeconds: 71,
    description: "Short field example of underground haulage and dumping at a crusher."
  },
  {
    id: "_s2x4dmQgjU",
    moduleId: 5,
    title: "MSHA – Good Berms Save Lives",
    author: "Cranesville Block Co., Inc",
    durationSeconds: 825,
    description: "Berm construction and edge protection around haul roads and dump points."
  },
  {
    id: "GSPRVJsu3_A",
    moduleId: 5,
    title: "Hazard Recognition Through Workplace Examination in Mining",
    author: "Florida Mine Safety Program",
    durationSeconds: 1183,
    description: "Recognizing, reporting, and eliminating hazards during workplace examinations."
  },
  {
    id: "qDDg-CbOTmw",
    moduleId: 5,
    title: "SLAM for Life – MSHA Risk Assessment",
    author: "PublicResourceOrg",
    durationSeconds: 605,
    description: "Stop, Look, Analyze, and Manage risk assessment for common mining hazards."
  },
  {
    id: "MziZesbb32Q",
    moduleId: 5,
    title: "Hard Hat Safety Demonstration",
    author: "Victory Electric Cooperative",
    durationSeconds: 315,
    description: "Demonstration of head protection and the consequences of falling-object hazards."
  },
  {
    id: "9wnDBLifDB4",
    moduleId: 5,
    title: "A Look Inside an Open-Pit Blasting Process",
    author: "TEKNIQ",
    durationSeconds: 420,
    description: "Process overview for recognizing blasting areas, warning signals, and exclusion zones."
  },
  {
    id: "Oaxs7EEIp4k",
    moduleId: 5,
    title: "Room and Pillar Mining Method",
    author: "Epiroc Underground Mining and Tunneling",
    durationSeconds: 178,
    description: "Introduction to the room-and-pillar mining method and underground work environment."
  },
  {
    id: "e8mGpQ9W4_w",
    moduleId: 6,
    title: "Stop the Fire In Its Tracks!",
    author: "Florida Mine Safety Program",
    durationSeconds: 999,
    description: "Mine-fire prevention, early response, and the importance of evacuation readiness."
  },
  {
    id: "j9DNL0DnKmU",
    moduleId: 6,
    title: "Mine Emergency Evacuation",
    author: "Joe Flick",
    durationSeconds: 686,
    description: "Practical underground emergency escape, communication, leadership, and decision-making."
  },
  {
    id: "4rQwxVnYcLk",
    moduleId: 7,
    title: "Rock Falls – Preventing Rock Fall Injuries",
    author: "Underground Life",
    durationSeconds: 1223,
    description: "Recognition and control of loose-ground and rock-fall hazards."
  },
  {
    id: "OxOwJC5wHyc",
    moduleId: 7,
    title: "What Could Happen",
    author: "PublicResourceOrg",
    durationSeconds: 821,
    description: "Risk assessment and highwall inspection through realistic mine-site scenarios."
  },
  {
    id: "528dJg0lESM",
    moduleId: 7,
    title: "Limestone Mine Scaling",
    author: "Rockzone Americas",
    durationSeconds: 122,
    description: "Field demonstration of mechanical scaling after drill-and-blast work."
  },
  {
    id: "1OJUEmUAPmc",
    moduleId: 8,
    title: "Dust: The Invisible Enemy",
    author: "CCA",
    durationSeconds: 677,
    description: "Health effects of respirable dust and the importance of exposure controls."
  },
  {
    id: "CHTJ8i55HUk",
    moduleId: 8,
    title: "MSHA Respirable Dust Sampling",
    author: "Safety Video Library",
    durationSeconds: 1596,
    description: "Purpose and basic process of respirable-dust sampling in mining."
  },
  {
    id: "X5r4upNwIGk",
    moduleId: 8,
    title: "MSHA Hearing Conservation Requirements",
    author: "MineSafetyCenter",
    durationSeconds: 1169,
    description: "Noise exposure, hearing protection, and MSHA hearing-conservation requirements."
  },
  {
    id: "iX8j7h7bJF4",
    moduleId: 9,
    title: "Arc Flash Fatality",
    author: "JADE Learning",
    durationSeconds: 866,
    description: "Fatal-incident awareness supporting electrical qualification, isolation, and arc-flash controls."
  },
  {
    id: "wal2KP1bbIY",
    moduleId: 9,
    title: "Electrical Safety Awareness for Non-Electrical Workers",
    author: "Your ACSA Safety",
    durationSeconds: 561,
    description: "Electrical hazard recognition, consequences, and protective measures for non-electricians."
  },
  {
    id: "4MjKwOI2LrE",
    moduleId: 12,
    title: "Tony Crow – Safety Is Not Just About Me",
    author: "Pick Up Your Heart",
    durationSeconds: 357,
    description: "Personal account emphasizing communication, PPE, and how one unsafe decision affects others."
  },
  {
    id: "gbaGN7JQoO4",
    moduleId: 12,
    title: "Explosives Underground – Handling Explosives in Modern Mines",
    author: "PublicResourceOrg",
    durationSeconds: 900,
    description: "Task-specific overview of transporting, storing, loading, and detonating explosives underground."
  },
  {
    id: "kjCsEVjRrlg",
    moduleId: 7,
    title: "The Granite Mountain Shaft: 168 Miners Dead",
    author: "Steel & Sacrifice",
    durationSeconds: 1655,
    description: "Historical case study of a shaft fire, ventilation reversal, carbon monoxide migration, and blocked escape routes."
  },
  {
    id: "IGb20ZDbjkY",
    moduleId: 6,
    title: "Sago Mine Disaster",
    author: "Distant Appalachian",
    durationSeconds: 2613,
    description: "Historical emergency case study supporting discussion of evacuation, communication, barricading, and mine-emergency readiness. Follow the current site plan and W65 procedures at these operations."
  },
  {
    id: "NjHDUhWA6Lo",
    moduleId: 4,
    title: "Stay in the Cab and Keep It On! A Survivor's Story",
    author: "PublicResourceOrg",
    durationSeconds: 682,
    description: "MSHA rollover-survivor account emphasizing seat-belt use and staying inside the protective equipment cab."
  },
  {
    id: "eFTnBiAvxxg",
    moduleId: 7,
    title: "Safety Tips: Working Beside Highwalls",
    author: "PublicResourceOrg",
    durationSeconds: 295,
    description: "MSHA highwall-safety walkthrough focused on observation, positioning, and changing ground conditions."
  },
  {
    id: "Ok2p6cUe_sM",
    moduleId: 7,
    title: "Highwall Hazard Recognition",
    author: "PublicResourceOrg",
    durationSeconds: 320,
    description: "Experienced-driver orientation to recognizing and avoiding highwall hazards."
  },
  {
    id: "ZrnWnmhGpQY",
    moduleId: 4,
    title: "Surface Mine Conveyor Safety",
    author: "USDepartmentofLabor",
    durationSeconds: 1103,
    description: "Conveyor guarding, blocking against motion, lockout/tagout, maintenance, and incident lessons."
  },
  {
    id: "q_4q8lm0tCs",
    moduleId: 4,
    title: "Preventing Powered Haulage Accidents at Surface Mines",
    author: "USDepartmentofLabor",
    durationSeconds: 374,
    description: "Safety practices and technologies for preventing powered-haulage accidents at surface operations."
  },
  {
    id: "hQiYjxSC9bI",
    moduleId: 10,
    title: "First Aid for the Mining Industry",
    author: "Health and Safety Training Center",
    durationSeconds: 1939,
    description: "Mining scenarios covering first aid, cardiac arrest, AEDs, bleeding, electrical injuries, burns, and emotional considerations."
  },
  {
    id: "2cyQ5QTPOek",
    moduleId: 5,
    title: "Stockpile Safety",
    author: "Ontario Stone, Sand & Gravel Association",
    durationSeconds: 622,
    description: "Stockpile hazards and safe practices for aggregate quarries and sand-and-gravel operations."
  },
  {
    id: "1u6c7YMgkB8",
    moduleId: 7,
    title: "Dangers of Stone Mine Massive Pillar Collapses",
    author: "USDepartmentofLabor",
    durationSeconds: 357,
    description: "MSHA overview of massive pillar-collapse hazards associated with stone-mine benching."
  },
  {
    id: "WTKCluA6lgE",
    moduleId: 12,
    title: "You Are My Sunshine: The Sunshine Mine Disaster",
    author: "PublicResourceOrg",
    durationSeconds: 4077,
    description: "NIOSH historical case study of the 1972 Sunshine Mine fire, emergency response, and lessons that shaped metal/nonmetal safety."
  },
  {
    id: "eEj1JOVu_eY",
    moduleId: 2,
    title: "Miners' Rights and Responsibilities",
    author: "CaliforniaDIR",
    durationSeconds: 850,
    description: "Summary of rights and responsibilities granted to miners, representatives, and mine-job applicants by the Mine Act."
  },
  {
    id: "SN4Sfuhvs2Y",
    moduleId: 2,
    title: "Statutory Rights",
    author: "Colorado Division of Reclamation, Mining and Safety",
    durationSeconds: 150,
    description: "Short review of statutory rights relevant to miners."
  },
  {
    id: "WrnHZK9GhlM",
    moduleId: 2,
    title: "What Is MSHA and Why Does It Exist?",
    author: "Ally Safety",
    durationSeconds: 540,
    description: "History of mine-safety laws, the creation of MSHA, and the agency's role in miner protection."
  },
  {
    id: "F7AOWLOOT-U",
    moduleId: 2,
    title: "The Coal Town System",
    author: "American Experience | PBS",
    durationSeconds: 158,
    description: "Brief historical context on company-owned coal towns and the conditions surrounding early mine labor."
  },
  {
    id: "TM8DYUKbjsw",
    moduleId: 2,
    title: "History of Mine Safety and Health Legislation in the USA",
    author: "markdcatlin",
    durationSeconds: 541,
    description: "Timeline from the first federal mine-safety statute through the 1977 Mine Act and modern MSHA authority."
  }
];

const FIRST_VIDEO_BATCH_IDS = new Set([
  "_s2x4dmQgjU", "NH7vatxj_t0", "1OJUEmUAPmc", "CHTJ8i55HUk",
  "4rQwxVnYcLk", "MziZesbb32Q", "X5r4upNwIGk", "4MjKwOI2LrE",
  "iX8j7h7bJF4", "e8mGpQ9W4_w", "VEOVVx3rDyI", "gbaGN7JQoO4",
  "9wnDBLifDB4", "mSt9lHz22xM", "528dJg0lESM", "Oaxs7EEIp4k"
]);

const SECOND_VIDEO_BATCH_IDS = new Set([
  "kjCsEVjRrlg", "IGb20ZDbjkY", "NjHDUhWA6Lo", "eFTnBiAvxxg",
  "Ok2p6cUe_sM", "ZrnWnmhGpQY", "q_4q8lm0tCs", "hQiYjxSC9bI",
  "2cyQ5QTPOek", "1u6c7YMgkB8", "WTKCluA6lgE", "eEj1JOVu_eY",
  "SN4Sfuhvs2Y", "WrnHZK9GhlM", "F7AOWLOOT-U", "TM8DYUKbjsw"
]);

const PRE_EXISTING_VIDEO_IDS = new Set([
  "QGkT8Ahh1-E", "98555798", "AU07-U96dfw", "NH7vatxj_t0",
  "yEwFZHVLsso", "GSPRVJsu3_A", "qDDg-CbOTmw", "j9DNL0DnKmU", "OxOwJC5wHyc",
  "wal2KP1bbIY"
]);

const MODULE_VIDEO_SCOPE = {
  2: "Use the video to understand miners' rights, responsibilities, and regulatory history. Current law, the approved training plan, and instructor guidance control if an older presentation differs.",
  3: "Use only the current MSA W65 instructions and this mine's procedures. Video viewing does not replace hands-on practice with an approved W65 training unit.",
  4: "Transfer the communication, visibility, seat-belt, guarding, and isolation principles to this operation. The video is not task authorization or equipment-specific operating instruction.",
  5: "Concentrate on recognizing and controlling hazards. Do not enter restricted areas or perform specialized work without site authorization and task training.",
  6: "Treat incident footage as a case study. In an emergency, follow the current mine emergency plan, designated escapeways, communications, and instructor direction.",
  7: "Apply the warning signs and control principles through the current ground-control and ventilation plans. Historical conditions and another mine's methods are context, not local procedure.",
  8: "Focus on exposure recognition and controls. Follow current sampling, HazCom, respiratory-protection, hearing-conservation, and PPE requirements at the mine.",
  9: "This is hazard-awareness instruction, not electrical qualification. Only qualified and authorized persons may perform electrical work under the mine's energy-control procedures.",
  10: "This video supports first-aid awareness and refresher discussion; it is not a certification course. Work within your training and activate professional emergency response promptly.",
  12: "Use the incident or task example to strengthen prevention and decision-making. It does not authorize a task or replace task-specific training and site procedures."
};

const VIDEO_TRAINING_GUIDANCE = {
  "VEOVVx3rDyI": { focus: "Identify MSHA's enforcement, education, training, and technical-support roles and how they affect daily mine safety." },
  "QGkT8Ahh1-E": { focus: "Listen for miners' protected rights, personal responsibilities, hazard-reporting options, and protections against retaliation." },
  "98555798": { focus: "Watch the complete W65 inspection and donning sequence, including the mouthpiece, nose clip, head harness, and immediate movement toward fresh air." },
  "AU07-U96dfw": { focus: "Use the animation to reinforce the order of W65 donning steps before practicing them with the approved trainer." },
  "NH7vatxj_t0": { focus: "Look for blind spots, positive communication, safe positioning, traffic controls, and choices that keep people out of the line of fire." },
  "yEwFZHVLsso": { focus: "Identify conveyor guards, safe crossings, emergency stops, stored energy, and when lockout/tagout is required." },
  "mSt9lHz22xM": { focus: "Observe the underground traffic pattern, dumping area, equipment clearances, visibility limits, and interaction with the crusher area." },
  "_s2x4dmQgjU": { focus: "Understand how properly constructed and maintained berms protect equipment at roadway edges and dump points." },
  "GSPRVJsu3_A": { focus: "Practice noticing conditions during a workplace examination, deciding what must be corrected, and communicating hazards promptly." },
  "qDDg-CbOTmw": { focus: "Apply Stop, Look, Analyze, and Manage before beginning work and whenever conditions or the task change." },
  "MziZesbb32Q": { focus: "Connect the impact demonstration to falling-object hazards, correct hard-hat use, and keeping clear of overhead work." },
  "9wnDBLifDB4": { focus: "Recognize blast areas, warning signals, exclusion zones, flyrock risk, and the need to obey the site's all-clear procedure." },
  "Oaxs7EEIp4k": { focus: "Use the overview to understand room-and-pillar layout, travelways, active faces, and why ground-control discipline matters." },
  "e8mGpQ9W4_w": { focus: "Identify ignition prevention, early warning, prompt reporting, initial response limits, and the decision to evacuate." },
  "j9DNL0DnKmU": { focus: "Watch for leadership, communication, route selection, accountability, and decisions made under limited visibility and time." },
  "4rQwxVnYcLk": { focus: "Identify loose-ground warning signs, exposure beneath unsupported ground, and controls that prevent rock-fall injuries." },
  "OxOwJC5wHyc": { focus: "Use each scenario to practice asking what could happen, who is exposed, and which control should be in place before work continues." },
  "528dJg0lESM": { focus: "Observe how mechanical scaling removes loose material while the operator maintains distance and protected positioning." },
  "1OJUEmUAPmc": { focus: "Connect invisible respirable dust exposure to long-term disease and the importance of engineering controls and correct PPE." },
  "CHTJ8i55HUk": { focus: "Understand why respirable-dust sampling is performed, how samples represent exposure, and why equipment must not be disturbed." },
  "X5r4upNwIGk": { focus: "Look for noise-exposure limits, hearing-protection selection and use, audiometric monitoring, and conservation-program responsibilities." },
  "iX8j7h7bJF4": { focus: "Recognize the consequences of arc flash and why de-energizing, isolation, verification, boundaries, and qualified work are essential." },
  "wal2KP1bbIY": { focus: "Identify electrical warning signs and the safe actions expected of workers who are not qualified electricians." },
  "4MjKwOI2LrE": { focus: "Consider how one person's shortcut affects coworkers and family, and why speaking up, PPE, and procedure compliance matter." },
  "gbaGN7JQoO4": { focus: "Build awareness of explosives storage, transport, loading, blast-area security, communication, and the role of licensed personnel." },
  "kjCsEVjRrlg": {
    focus: "Track how fire heat reversed the ventilation flow, carried carbon monoxide through connected workings, and made blocked escape routes deadly.",
    scope: "Focus on ventilation behavior, fire loading, two-way escapeways, and early evacuation. The 1917 equipment, construction, and response practices are historical context—not procedures for these operations."
  },
  "IGb20ZDbjkY": {
    focus: "Watch how information, accountability, families, the operator, state agencies, MSHA, the command center, and rescue teams interact during a prolonged mine emergency.",
    scope: "The first priority is prompt self-rescue and evacuation when a usable route is available. Do not interpret barricading as preferable to an available escape route. Historical coal-mine devices and refuge requirements shown in this case are not the W65 procedures used at these operations."
  },
  "NjHDUhWA6Lo": { focus: "Follow the rollover sequence and identify how the seat belt, protective cab, equipment condition, and operator decisions affected survival." },
  "eFTnBiAvxxg": { focus: "Look for cracks, sloughing, overhangs, changing weather or water conditions, and safe positioning beside a highwall." },
  "Ok2p6cUe_sM": { focus: "Practice a deliberate highwall examination: scan the crest, face, toe, nearby equipment routes, and recent changes before entering the area." },
  "ZrnWnmhGpQY": { focus: "Use the incident accounts to identify guarding, blocking against motion, lockout/tagout, safe maintenance, and entanglement hazards." },
  "q_4q8lm0tCs": { focus: "Identify practical controls for visibility, seat belts, traffic patterns, proximity detection, berms, and pedestrian-equipment separation." },
  "hQiYjxSC9bI": { focus: "Review scene safety, activating help, cardiac emergencies, AED use, severe bleeding, electrical injuries, burns, and emotional support." },
  "2cyQ5QTPOek": { focus: "Identify unstable slopes, hidden voids, bridging, engulfment, dumping hazards, and safe loader and pedestrian positioning around stockpiles." },
  "1u6c7YMgkB8": { focus: "Understand how benching and pillar geometry can contribute to progressive or massive collapse and why exclusion zones and plan compliance matter." },
  "WTKCluA6lgE": {
    focus: "Study the failures that made the Sunshine fire so deadly: delayed evacuation, unclear overall command, inadequate emergency and self-rescue preparation, smoke and carbon monoxide entering intake airways, and limited escape readiness.",
    scope: "Regulatory legacy: NIOSH identifies this disaster as a catalyst for the 1977 metal/nonmetal safety reforms that underpin many current protections. Connect the case to prompt evacuation, emergency drills, self-rescue preparation, ventilation and fire controls, stronger enforcement, and the creation of MSHA. Historical equipment is context; current site plans and W65 instruction control here."
  },
  "eEj1JOVu_eY": { focus: "Identify protected activities, inspection participation, hazard reporting, training rights, and the responsibilities miners retain for safe work." },
  "SN4Sfuhvs2Y": { focus: "Use this short review to reinforce the statutory rights a miner can exercise without retaliation." },
  "WrnHZK9GhlM": { focus: "Connect major mine disasters and legislative milestones to MSHA's present enforcement and prevention mission." },
  "F7AOWLOOT-U": { focus: "Use the company-town history to understand the power imbalance surrounding early mine labor and why enforceable worker protections developed." },
  "TM8DYUKbjsw": { focus: "Follow the progression from limited federal authority to inspections, enforcement, broader coverage, miner protections, and the 1977 Mine Act." }
};

function getRequiredVideos(moduleId) {
  return REQUIRED_VIDEOS.filter(video => video.moduleId === moduleId);
}
