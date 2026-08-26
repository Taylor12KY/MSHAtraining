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
    id: "9wnDBLifDB4",
    moduleId: 11,
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
    id: "zM3R_1JceWo",
    moduleId: 8,
    title: "Roll, Pull, and Hold. How to Wear Soft Foam Earplugs",
    author: "Centers for Disease Control and Prevention (CDC)",
    durationSeconds: 80,
    description: "CDC/NIOSH-branded Roll–Pull–Hold demonstration for correctly inserting soft foam earplugs."
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
    moduleId: 11,
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
    moduleId: 3,
    title: "You Are My Sunshine: The Sunshine Mine Disaster",
    author: "PublicResourceOrg",
    durationSeconds: 4077,
    description: "NIOSH historical case study of the 1972 Sunshine Mine fire, emergency response, and lessons that shaped metal/nonmetal safety."
  },
  {
    id: "106597590",
    moduleId: 3,
    provider: "vimeo",
    title: "Cleveland Potash - W65 Self Rescuer",
    author: "Ithica / IthicaFilms",
    durationSeconds: 332,
    description: "Donning and how-it-works film of the actual MSA W65 (mouthpiece, nose clip, filter canister) shot at Boulby UK potash mine."
  },
  {
    id: "1JfkPpr6sRM",
    moduleId: 3,
    title: "The Self Rescuer - A 1980 NCB Training Film. HD. rt 8 mins.",
    author: "Coal Mining in the UK",
    durationSeconds: 408,
    description: "Historical hopcalite filter-self-rescuer training: how and when to use a belt-worn CO filter self-rescuer. Same class of device as the MSA W65; it does not make or carry its own oxygen."
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
  },
  {
    id: "is77KiZ16_o",
    moduleId: 9,
    title: "Master Lock OSHA Lockout Tagout",
    author: "Master Lock",
    durationSeconds: 712,
    description: "Controlled lockout/tagout procedure for isolating hazardous energy before equipment service or repair."
  },
  {
    id: "GN3OBFAVHt4",
    moduleId: 7,
    title: "Roofbolter – Underground Limestone",
    author: "Jeff McIntosh",
    durationSeconds: 149,
    description: "Short field overview of roof-bolting work in an underground limestone mine."
  },
  {
    id: "zaliBZlRsaE",
    moduleId: 11,
    title: "Drill and Blast Sequence",
    author: "Kalloc Tech",
    durationSeconds: 209,
    description: "Animated overview of the organized sequence used to prepare, drill, blast, ventilate, and re-enter a work area."
  },
  {
    id: "ZHVAmbOBkrk",
    moduleId: 12,
    title: "Three Mindfulness Steps That Help You Focus at Work",
    author: "Ally Safety",
    durationSeconds: 379,
    description: "Practical methods for reducing distraction, clearing mental traffic, and returning attention to the task."
  },
  {
    id: "G2Hs51QDszc",
    moduleId: 11,
    title: "Underground Drilling and Blasting Training Overview",
    author: "Australian Centre for Geomechanics",
    durationSeconds: 188,
    description: "Short underground-mining overview of drilling, explosive handling, blast hazards, and safe re-entry concepts."
  },
  {
    id: "addOUsx6760",
    moduleId: 5,
    title: "Mining Equipment Safety Inspections",
    author: "Florida Mine Safety Program",
    durationSeconds: 1498,
    description: "Equipment defect examinations, correction, and records under MSHA safety standard 56.14100."
  },
  {
    id: "p_vsrhxIlR8",
    moduleId: 4,
    title: "Haul Truck Operator – Mining Safety Overview",
    author: "Colorado Division of Reclamation, Mining and Safety",
    durationSeconds: 374,
    description: "Mining-focused haul-truck operator overview supporting safe transportation and equipment awareness."
  },
  {
    id: "Km8XxRCuCho",
    moduleId: 12,
    title: "Safety 3rd",
    author: "Mike Rowe",
    durationSeconds: 202,
    description: "Short discussion of personal responsibility, risk awareness, and individual participation in safe work."
  },
  {
    id: "EQ1OPz1p0U4",
    moduleId: 12,
    title: "Pledge 6",
    author: "Mike Rowe",
    durationSeconds: 332,
    description: "Discussion of why technical compliance alone may not identify or control every hazard."
  },
  {
    id: "H2J5MDUAMTk",
    moduleId: 5,
    title: "Introduction to the Mining Environment",
    author: "Florida Mine Safety Program",
    durationSeconds: 1231,
    description: "Broad introduction to mining operations, resources, work areas, equipment, and safety considerations."
  },
  {
    id: "dIreslbUgwY",
    moduleId: 7,
    title: "Roof and Rib Control",
    author: "PublicResourceOrg",
    durationSeconds: 881,
    description: "MSHA overview of roof and rib evaluation, control plans, hazard sources, and installed support systems."
  },
  {
    id: "oJ834e9wDQ4",
    moduleId: 5,
    title: "Hard Hats and Helmets: Keeping Workers Safe",
    author: "Centers for Disease Control and Prevention (CDC/NIOSH)",
    durationSeconds: 303,
    description: "Current head-protection guidance covering traumatic brain injury, struck-by hazards, falls, and selecting appropriate head protection."
  },
  {
    id: "DfiBLI8lGM8",
    moduleId: 5,
    title: "Falls Prevention Through Design",
    author: "Centers for Disease Control and Prevention (CDC/NIOSH)",
    durationSeconds: 113,
    description: "Short introduction to preventing falls by designing out hazards and applying higher-level controls before relying on personal fall arrest."
  },
  {
    id: "Ka9UKa_xYNU",
    moduleId: 5,
    title: "Stand Up for Safety and Health: Personal Fall Arrest Systems",
    author: "U.S. Department of Labor / OSHA",
    durationSeconds: 3676,
    description: "Detailed 2026 webinar on personal fall-arrest components, selection, inspection, compatibility, fit, anchorage, clearance, and rescue planning."
  },
  {
    id: "UD2u9LXREWM",
    moduleId: 11,
    title: "Handling Explosives in Underground Mines",
    author: "Centers for Disease Control and Prevention (CDC/NIOSH)",
    durationSeconds: 909,
    description: "Underground explosives storage, transport, blast-area security, fumes, misfires, and waiting for authorized re-entry."
  },
  {
    id: "-wrwD7s9rUE",
    moduleId: 11,
    title: "The Confined Space Hazards That Kill Most Often",
    author: "Ally Safety",
    durationSeconds: 242,
    description: "Atmospheric hazards in confined spaces: toxic or oxygen-deficient air, and why untrained rescue attempts kill. Principles only; not mine-rescue or confined-space qualification."
  },
  {
    id: "b7mhJ8viccI",
    moduleId: 11,
    title: "MSA ALTAIR 4X: How to Manually Bump Test",
    author: "Frontline Safety UK Ltd",
    durationSeconds: 129,
    description: "Instrument-specific demonstration of a manual bump test on the MSA ALTAIR 4X multigas detector."
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

const THIRD_VIDEO_BATCH_IDS = new Set([
  "is77KiZ16_o", "W4uQqiHnXUI", "GN3OBFAVHt4", "zaliBZlRsaE",
  "ZHVAmbOBkrk", "G2Hs51QDszc", "addOUsx6760", "p_vsrhxIlR8",
  "xtb61bDBc6o", "v26fTGBEi9E", "Km8XxRCuCho", "EQ1OPz1p0U4",
  "H2J5MDUAMTk", "dIreslbUgwY"
]);

const THIRD_SUBMITTED_VIDEO_IDS = new Set([
  ...THIRD_VIDEO_BATCH_IDS,
  "TM8DYUKbjsw", "OxOwJC5wHyc", "ddermx9hJ7k"
]);

const VIDEO_CONTENT_DUPLICATES = {
  ddermx9hJ7k: "X5r4upNwIGk"
};

const RETIRED_VIDEO_IDS = {
  "AU07-U96dfw": "Removed from the Module 3 required sequence; English MSA W65 Powtoon donning animation replaced by Cleveland Potash W65 footage.",
  "Z33qMr0CobM": "Removed at instructor request; Spanish visual of the MSA W65.",
  MziZesbb32Q: "Replaced by the newer CDC/NIOSH head-protection presentation.",
  W4uQqiHnXUI: "Retired to preserve instructional time for the current fall-protection sequence.",
  xtb61bDBc6o: "Replaced by NIOSH blind-area diagrams and an actual-equipment visibility lesson.",
  v26fTGBEi9E: "Replaced by a current MSHA/NIOSH-based safe-work-procedure and job-task-analysis exercise.",
  "Veayb1NucTA": "Removed from the Module 8 required sequence; NIOSH YouTube ID returned oembed/thumbnail 404 and IFrame API Error 150 (Video unavailable). Replaced by the live CDC Roll, Pull, and Hold clip zM3R_1JceWo."
};

const CURRENT_RESOURCE_VIDEO_IDS = new Set([
  "oJ834e9wDQ4", "DfiBLI8lGM8", "Ka9UKa_xYNU", "b7mhJ8viccI", "zM3R_1JceWo"
]);

const PRE_EXISTING_VIDEO_IDS = new Set([
  "QGkT8Ahh1-E", "NH7vatxj_t0",
  "yEwFZHVLsso", "GSPRVJsu3_A", "qDDg-CbOTmw", "j9DNL0DnKmU", "OxOwJC5wHyc",
  "wal2KP1bbIY"
]);

const MODULE_VIDEO_SEQUENCE = {
  2: ["F7AOWLOOT-U", "TM8DYUKbjsw", "WrnHZK9GhlM", "VEOVVx3rDyI", "QGkT8Ahh1-E", "eEj1JOVu_eY", "SN4Sfuhvs2Y"],
  3: ["WTKCluA6lgE", "106597590", "1JfkPpr6sRM"],
  4: ["NH7vatxj_t0", "q_4q8lm0tCs", "p_vsrhxIlR8", "mSt9lHz22xM", "NjHDUhWA6Lo", "yEwFZHVLsso", "ZrnWnmhGpQY"],
  5: ["H2J5MDUAMTk", "Oaxs7EEIp4k", "GSPRVJsu3_A", "qDDg-CbOTmw", "addOUsx6760", "oJ834e9wDQ4", "DfiBLI8lGM8", "Ka9UKa_xYNU", "_s2x4dmQgjU", "2cyQ5QTPOek"],
  6: ["e8mGpQ9W4_w", "j9DNL0DnKmU", "IGb20ZDbjkY"],
  7: ["OxOwJC5wHyc", "eFTnBiAvxxg", "Ok2p6cUe_sM", "4rQwxVnYcLk", "dIreslbUgwY", "GN3OBFAVHt4", "528dJg0lESM", "1u6c7YMgkB8", "kjCsEVjRrlg"],
  8: ["1OJUEmUAPmc", "CHTJ8i55HUk", "X5r4upNwIGk", "zM3R_1JceWo"],
  9: ["wal2KP1bbIY", "is77KiZ16_o", "iX8j7h7bJF4"],
  10: ["hQiYjxSC9bI"],
  11: ["-wrwD7s9rUE", "b7mhJ8viccI", "9wnDBLifDB4", "zaliBZlRsaE", "G2Hs51QDszc", "gbaGN7JQoO4", "UD2u9LXREWM"],
  12: ["ZHVAmbOBkrk", "Km8XxRCuCho", "EQ1OPz1p0U4", "4MjKwOI2LrE"]
};

const VIDEO_SEQUENCE_TRANSITIONS = {
  "TM8DYUKbjsw": "With the early labor conditions in mind, trace how federal mine-safety authority developed over time.",
  "WrnHZK9GhlM": "Now connect those legislative milestones to why MSHA exists and what the agency is expected to do today.",
  "VEOVVx3rDyI": "With MSHA's origins established, look inside its enforcement, education, training, and technical-support mission.",
  "QGkT8Ahh1-E": "This presenter is labeled Part 46 (surface). Use it for statutory rights and 105(c) ideas only. This course is Part 48 underground limestone. Current Mine Act, the Part 48 plan, and instructor control.",
  "eEj1JOVu_eY": "Use this as a second pass on the same rights, not new law. Protected activities, reporting, and 105(c) still follow the current Mine Act, this Part 48 plan, and the instructor.",
  "SN4Sfuhvs2Y": "Finish the sequence with a brief statutory-rights review that reinforces the key protections to remember.",
  "106597590": "Sunshine showed why delayed escape and missing self-rescue killed 91 metal miners. Now watch how the MSA W65 you carry actually works and how to don it—mouthpiece, nose clip, filter canister—on a real unit at Cleveland Potash.",
  "1JfkPpr6sRM": "You have seen the W65 you carry. This 1980 NCB film is the same class of hopcalite filter self-rescuer: old proven technology that still does the same job. Learn how and when to use it, and remember UK service rules are not the inspection intervals used here.",
  "q_4q8lm0tCs": "These are surface-mine examples. Transfer visibility, seat belts, berms, guarding, and LOTO. Underground travel, dump pockets, and this site's traffic plan control underground.",
  "p_vsrhxIlR8": "Now narrow the discussion to the haul-truck operator's role, daily choices, and responsibilities in a mining environment.",
  "mSt9lHz22xM": "This is the underground limestone field clip. Use it for traffic flow, dump pockets, clearances, and the dumping area at operations like these. Underground travel and this site's traffic plan control here.",
  "NjHDUhWA6Lo": "Next, study a rollover survivor's account to see why the seat belt and protective cab matter when control is lost.",
  "yEwFZHVLsso": "Shift from mobile equipment to fixed haulage and identify the guarding, crossing, and energy hazards around conveyors.",
  "ZrnWnmhGpQY": "More surface-mine examples. Transfer guarding, blocking against motion, and lockout/tagout. Underground travel, dump pockets, and this site's traffic plan still control underground.",
  "H2J5MDUAMTk": "After the industry-wide introduction, move into a more detailed tour of mining work areas, equipment, and operating conditions.",
  "Oaxs7EEIp4k": "Use that broad context to examine the room-and-pillar layout that shapes many underground travel and ground hazards.",
  "GSPRVJsu3_A": "Now practice recognizing conditions in that environment through a deliberate workplace examination.",
  "qDDg-CbOTmw": "Turn hazard recognition into action by applying the Stop, Look, Analyze, and Manage decision process.",
  "addOUsx6760": "Apply the same process to mobile equipment examinations, defect correction, and required records.",
  "oJ834e9wDQ4": "After equipment examinations, shift to personal protective equipment and choose head protection for the hazards actually present.",
  "DfiBLI8lGM8": "Carry the control-selection mindset to work at height: first look for ways to eliminate the exposure or prevent the fall.",
  "Ka9UKa_xYNU": "When a fall hazard remains and personal fall arrest is required, examine how the complete system must be selected, inspected, fitted, connected, and supported by a rescue plan.",
  "_s2x4dmQgjU": "Move from personal protection to roadway engineering controls by examining effective berms.",
  "2cyQ5QTPOek": "Close hazard recognition with material-handling hazards: unstable slopes, voids, and safe positioning around stockpiles. Blast-area controls are covered in Module 11 (Blasting, Explosives, & Mine Gases).",
  "j9DNL0DnKmU": "After fire prevention and early response, shift to the decisions, communication, and leadership required during evacuation.",
  "IGb20ZDbjkY": "Sago is a coal emergency-management case: information, families, command, and rescue. It is not W65 donning and not a reason to barricade when an escapeway is open. Device procedures at these limestone operations are Module 3. Sunshine in Module 3 is why they carry a filter self-rescuer; Sago here is command and not-barricading.",
  "eFTnBiAvxxg": "This is a surface highwall / pit clip. Use it at Clover Bottom surface drill-and-blast and Dix River surface areas. Underground, use the stone-mine ground-control plan, not highwall rules.",
  "Ok2p6cUe_sM": "Another surface highwall / pit examination. Use it at Clover Bottom surface drill-and-blast and Dix River surface areas. Underground, follow the stone-mine ground-control plan, not highwall rules.",
  "4rQwxVnYcLk": "Carry the same warning-sign mindset underground to loose roof, ribs, and rock-fall exposure.",
  "dIreslbUgwY": "Next, connect those warning signs to the purpose of a ground-control plan and installed support systems.",
  "GN3OBFAVHt4": "Use this short limestone field clip to see one roof-bolting application after learning the control principles.",
  "528dJg0lESM": "Compare installed support with another control method: removing loose material through protected mechanical scaling.",
  "1u6c7YMgkB8": "Expand from local loose-ground hazards to the larger-scale consequences of unstable pillar systems.",
  "kjCsEVjRrlg": "This is not a second Sunshine. Take ventilation reversal, fire loading, and two-way escapeways — not 1917 equipment. Sunshine is device why (Module 3). Sago is command (Module 6). This is ventilation behavior.",
  "CHTJ8i55HUk": "After seeing why dust is dangerous, learn how sampling helps identify and document respirable exposure.",
  "X5r4upNwIGk": "Then apply the same exposure-control mindset to noise, hearing protection, and conservation-program responsibilities.",
  "zM3R_1JceWo": "Finish the health sequence by practicing the Roll–Pull–Hold method that helps soft foam earplugs provide their intended protection.",
  "is77KiZ16_o": "Move from basic electrical awareness to the controlled isolation of hazardous energy before service or repair.",
  "iX8j7h7bJF4": "Finish with an arc-flash fatality case that shows why qualification, isolation, verification, and safe boundaries are essential.",
  "b7mhJ8viccI": "Watch how the supervisor verifies the ALTAIR 4X before use. Your trainee responsibility is to recognize its alarms and limits, withdraw from questionable air, and report the concern.",
  "-wrwD7s9rUE": "Start with why oxygen-deficient or toxic air kills in enclosed spaces, and why you never enter to rescue someone unless you are trained and equipped.",
  "9wnDBLifDB4": "Open-pit example for blast-area recognition, signals, and exclusion. Not a limestone underground round and not task authorization. Stay out until the all-clear. Underground fumes and re-entry are the later videos and the NIOSH limestone study.",
  "zaliBZlRsaE": "Apply the module's safe-work-procedure framework to the planned sequence and coordination required for drill-and-blast work.",
  "G2Hs51QDszc": "Next, place that sequence in an underground mining context and identify the hazards surrounding explosives and re-entry.",
  "gbaGN7JQoO4": "Build on the overview with a fuller look at storage, transport, loading, security, communication, and authorized roles.",
  "UD2u9LXREWM": "Finish with NIOSH handling of explosives underground, including blast fumes and waiting for a qualified person to clear the area.",
  "Km8XxRCuCho": "With attention and distraction in mind, consider the worker's personal role in recognizing and managing risk.",
  "EQ1OPz1p0U4": "Now clarify that personal responsibility includes looking beyond minimum compliance when a hazard remains uncontrolled.",
  "4MjKwOI2LrE": "Connect that principle to the human consequences one person's shortcut can create for coworkers and family."

};

const MODULE_VIDEO_SCOPE = {
  2: "Use the video for statutory rights and 105(c) ideas. Some presenters are labeled Part 46 (surface). This course is Part 48 underground limestone. Current Mine Act, the Part 48 plan, and instructor control.",
  3: "Use only the current MSA W65 instructions and this mine's procedures. The W65 converts carbon monoxide; it does not supply oxygen. Video viewing does not replace hands-on practice with an approved W65 training unit.",
  4: "Some clips are surface-mine examples. Transfer visibility, seat belts, berms, guarding, and LOTO. Underground travel, dump pockets, and this site's traffic plan control underground. The video is not task authorization.",
  5: "Concentrate on recognizing and controlling hazards. Do not enter restricted areas or perform specialized work without site authorization and task training.",
  6: "Treat incident footage as a case study. In an emergency, follow the current mine emergency plan, designated escapeways, communications, and instructor direction.",
  7: "Apply the warning signs and control principles through the current ground-control and ventilation plans. Historical conditions and another mine's methods are context, not local procedure.",
  8: "Focus on exposure recognition and controls. Our exposures are limestone silica and DPM. An N95 is not a W65 and does not protect against mine gases or oxygen deficiency. Follow current sampling, HazCom, respiratory-protection, hearing-conservation, and PPE requirements at the mine.",
  9: "This is hazard-awareness instruction, not electrical qualification. Electrical work at these mines follows MSHA Part 57, the energy-control procedure, and qualified-person rules — not CSA/OSHA construction qualification.",
  10: "The mining first-aid video is scenario awareness, not Red Cross/ACS certification. Skills are instructor-led. Work within your training and activate professional emergency response promptly.",
  11: "Supervisors carry and operate the MSA ALTAIR 4X at these operations. Trainees use these videos to understand atmospheric hazards, blasting fumes, alarm readiness, and instrument limits—not to clear an area, handle explosives, or make a re-entry decision. A detector warns of hazards; it does not make an unsafe atmosphere safe. The Ally Safety confined-space tape is principles only, not mine-rescue qualification.",
  12: "These four shorts are decision-making and speaking-up, not equipment authorization. Graded work is the conveyor-cleanup JTA table and asking for task training before a new job. Sunshine is Module 3; blasting is Module 11 — do not watch them again here."
};

const VIDEO_TRAINING_GUIDANCE = {
  "VEOVVx3rDyI": { focus: "Identify MSHA's enforcement, education, training, and technical-support roles and how they affect daily mine safety." },
  "QGkT8Ahh1-E": {
    focus: "Listen for miners' protected rights, personal responsibilities, hazard-reporting options, and protections against retaliation.",
    scope: "This presenter is labeled Part 46 (surface). Use it for statutory rights and 105(c) ideas only. This course is Part 48 underground limestone. Current Mine Act, Part 48 plan, and instructor control."
  },
  "106597590": {
    focus: "This Cleveland Potash film is the W65 donning and how-it-works clip for the device you carry. Watch the actual MSA W65: mouthpiece, nose clip, and filter canister. Shot at Boulby UK potash mine by Ithica / IthicaFilms.",
    scope: "This is the same MSA W65 class used at Allen Company underground limestone operations. It converts carbon monoxide; it does not make oxygen and will not protect in oxygen-deficient air. UK service and inspection intervals shown in the film are not the U.S. MSHA or current MSA intervals for these sites. Follow this mine's procedures, current MSA instructions, and hands-on practice with the approved W65 trainer."
  },
  "NH7vatxj_t0": { focus: "Look for blind spots, positive communication, safe positioning, traffic controls, and choices that keep people out of the line of fire." },
  "yEwFZHVLsso": { focus: "Identify conveyor guards, safe crossings, emergency stops, stored energy, and when lockout/tagout is required." },
  "mSt9lHz22xM": { focus: "Observe the underground traffic pattern, dumping area, equipment clearances, visibility limits, and interaction with the crusher area." },
  "_s2x4dmQgjU": { focus: "Understand how properly constructed and maintained berms protect equipment at roadway edges and dump points." },
  "GSPRVJsu3_A": { focus: "Practice noticing conditions during a workplace examination, deciding what must be corrected, and communicating hazards promptly." },
  "qDDg-CbOTmw": { focus: "Apply Stop, Look, Analyze, and Manage before beginning work and whenever conditions or the task change." },
  "oJ834e9wDQ4": {
    focus: "Compare hard hats and safety helmets, then connect selection, fit, retention, inspection, and replacement to falling-object, struck-by, and fall hazards.",
    scope: "The examples come from construction research, but the head-protection principles transfer to mining. Use only company-approved PPE selected for the mine hazard, compatible with other PPE, and maintained under manufacturer and site requirements."
  },
  "DfiBLI8lGM8": {
    focus: "Apply the hierarchy of controls to work at height: eliminate the exposure, use engineered prevention or restraint where feasible, and use personal fall arrest only as part of a complete system.",
    scope: "This brief NIOSH construction presentation establishes a general prevention principle. The current mine plan, MSHA requirements, site procedure, competent-person evaluation, and equipment instructions control the actual work."
  },
  "Ka9UKa_xYNU": {
    focus: "Identify the complete personal fall-arrest system, inspect each component, check connector and anchorage compatibility, fit the harness correctly, account for clearance and swing-fall exposure, and plan prompt rescue before work begins.",
    scope: "This is a 2026 OSHA construction webinar used for broadly applicable fall-protection principles. Mining work remains governed by applicable MSHA standards, the approved training plan, company procedures, the hazard assessment, and each manufacturer's instructions. Generic examples do not authorize a tie-off point or equipment combination."
  },
  "9wnDBLifDB4": {
    focus: "Recognize blast areas, warning signals, exclusion zones, flyrock risk, and the need to obey the site's all-clear procedure.",
    scope: "This is an open-pit example for blast-area recognition, signals, and exclusion. It is not a limestone underground round and not task authorization. Stay out until the all-clear. Underground fumes and re-entry are the later videos and the NIOSH limestone study."
  },
  "Oaxs7EEIp4k": { focus: "Use the overview to understand room-and-pillar layout, travelways, active faces, and why ground-control discipline matters." },
  "e8mGpQ9W4_w": { focus: "Identify ignition prevention, early warning, prompt reporting, initial response limits, and the decision to evacuate." },
  "j9DNL0DnKmU": { focus: "Watch for leadership, communication, route selection, accountability, and decisions made under limited visibility and time." },
  "4rQwxVnYcLk": { focus: "Identify loose-ground warning signs, exposure beneath unsupported ground, and controls that prevent rock-fall injuries." },
  "OxOwJC5wHyc": { focus: "Use each scenario to practice asking what could happen, who is exposed, and which control should be in place before work continues." },
  "528dJg0lESM": { focus: "Observe how mechanical scaling removes loose material while the operator maintains distance and protected positioning." },
  "1OJUEmUAPmc": {
    focus: "Connect invisible respirable dust exposure to long-term disease and the importance of engineering controls and correct PPE.",
    scope: "This is a generic dust-disease film. Our exposures are limestone silica and DPM. An N95 is not a W65 and does not protect against mine gases or oxygen deficiency."
  },
  "CHTJ8i55HUk": { focus: "Understand why respirable-dust sampling is performed, how samples represent exposure, and why equipment must not be disturbed." },
  "X5r4upNwIGk": { focus: "Look for noise-exposure limits, hearing-protection selection and use, audiometric monitoring, and conservation-program responsibilities." },
  "zM3R_1JceWo": {
    focus: "Watch the complete Roll–Pull–Hold sequence and notice that clean hands, pulling the ear up and back, correct insertion depth, and holding during expansion all affect the seal.",
    scope: "This short CDC/NIOSH-branded demonstration applies to soft foam earplugs. Use the hearing protector selected for the measured exposure and follow its manufacturer instructions and the mine's hearing-conservation program."
  },
  "iX8j7h7bJF4": { focus: "Recognize the consequences of arc flash and why de-energizing, isolation, verification, boundaries, and qualified work are essential." },
  "wal2KP1bbIY": {
    focus: "Identify electrical warning signs and the safe actions expected of workers who are not qualified electricians.",
    scope: "This is a Canadian construction-association awareness tape. Principles only. Electrical work at these mines follows MSHA Part 57, the energy-control procedure, and qualified-person rules — not CSA/OSHA construction qualification."
  },
  "4MjKwOI2LrE": { focus: "Consider how one person's shortcut affects coworkers and family, and why speaking up, PPE, and procedure compliance matter." },
  "gbaGN7JQoO4": { focus: "Build awareness of explosives storage, transport, loading, blast-area security, communication, and the role of licensed personnel." },
  "kjCsEVjRrlg": {
    focus: "Track how fire heat reversed the ventilation flow, carried carbon monoxide through connected workings, and made blocked escape routes deadly.",
    scope: "This is not a second Sunshine. Take ventilation reversal, fire loading, and two-way escapeways — not 1917 equipment. Sunshine is device why (Module 3). Sago is command (Module 6). This is ventilation behavior. Historical 1917 equipment and response practices are not procedures for these operations."
  },
  "IGb20ZDbjkY": {
    focus: "Watch how information, accountability, families, the operator, state agencies, MSHA, the command center, and rescue teams interact during a prolonged mine emergency.",
    scope: "Sago is a coal emergency-management case (information, families, command, rescue). It is not W65 donning and not a reason to barricade when an escapeway is open. Device procedures at these limestone operations are Module 3. Sunshine in Module 3 is why they carry a filter self-rescuer; Sago here is command and not-barricading. Historical coal-mine devices and refuge requirements shown in this case are not the W65 procedures used at these operations."
  },
  "NjHDUhWA6Lo": { focus: "Follow the rollover sequence and identify how the seat belt, protective cab, equipment condition, and operator decisions affected survival." },
  "eFTnBiAvxxg": {
    focus: "Look for cracks, sloughing, overhangs, changing weather or water conditions, and safe positioning beside a highwall.",
    scope: "This is a surface highwall / pit clip. Use it at Clover Bottom surface drill-and-blast and Dix River surface areas. Underground, use the stone-mine ground-control plan, not highwall rules."
  },
  "Ok2p6cUe_sM": {
    focus: "Practice a deliberate highwall examination: scan the crest, face, toe, nearby equipment routes, and recent changes before entering the area.",
    scope: "This is a surface highwall / pit clip. Use it at Clover Bottom surface drill-and-blast and Dix River surface areas. Underground, use the stone-mine ground-control plan, not highwall rules."
  },
  "ZrnWnmhGpQY": {
    focus: "Use the incident accounts to identify guarding, blocking against motion, lockout/tagout, safe maintenance, and entanglement hazards.",
    scope: "These are surface-mine examples. Transfer visibility, seat belts, berms, guarding, and LOTO. Underground travel, dump pockets, and this site's traffic plan control underground."
  },
  "q_4q8lm0tCs": {
    focus: "Identify practical controls for visibility, seat belts, traffic patterns, proximity detection, berms, and pedestrian-equipment separation.",
    scope: "These are surface-mine examples. Transfer visibility, seat belts, berms, guarding, and LOTO. Underground travel, dump pockets, and this site's traffic plan control underground."
  },
  "hQiYjxSC9bI": {
    focus: "Review scene safety, activating help, cardiac emergencies, AED use, severe bleeding, electrical injuries, burns, and emotional support.",
    scope: "This mining first-aid video is scenario awareness, not Red Cross/ACS certification. Skills are instructor-led."
  },
  "2cyQ5QTPOek": { focus: "Identify unstable slopes, hidden voids, bridging, engulfment, dumping hazards, and safe loader and pedestrian positioning around stockpiles." },
  "1u6c7YMgkB8": { focus: "Understand how benching and pillar geometry can contribute to progressive or massive collapse and why exclusion zones and plan compliance matter." },
  "WTKCluA6lgE": {
    focus: "Watch this first as the historical why. Next two videos are the device you carry (Cleveland Potash W65) then hopcalite how/when (1980 NCB). Study the historical WHY we carry self-rescuers. On May 2, 1972, the Sunshine Mine fire produced carbon monoxide that killed 91 metal miners after delayed evacuation, unclear overall command, smoke in the intakes, and inadequate self-rescue preparation.",
    scope: "NIOSH identifies this disaster as a catalyst for the 1977 Mine Act and MSHA metal/nonmetal reforms. Connect the case to prompt evacuation, emergency drills, self-rescue preparation, ventilation and fire controls, stronger enforcement, and the creation of MSHA. Historical equipment shown in the film is not the MSA W65 used at these operations; current site plans and W65 instruction control here."
  },
  "1JfkPpr6sRM": {
    focus: "This 1980 NCB film teaches how and when to use a hopcalite filter self-rescuer—the same job the MSA W65 still does today. Don it for carbon monoxide from a fire or blast fumes, keep it on until fresh air, and know it does not work if the air is oxygen-deficient.",
    scope: "This is old, proven technology that still works. The chemistry is hopcalite: copper and manganese oxides that turn carbon monoxide into carbon dioxide using oxygen already in the air. That catalyst was discovered in 1918 at Johns Hopkins and the University of California during World War I (the name is Hop + Cal). Belt-worn mining filter self-rescuers of this type showed up around 1960. MSA leaflets point to a German origin; in the UK the NCB and MSA were involved. After carbon monoxide deaths at Whitehaven (1947) and Creswell (1950), the UK ran trials in 1953 and 1962, then in 1967 issued the MSA 230 so every man underground carried one. A heat exchanger was added in 1968 because the reaction gets hot. By the 1970s it was a legal carry requirement in UK mines. This 1980 film is that generation of training. The MSA W65 at these Allen Company underground limestone operations is the same class of device: a hopcalite filter self-rescuer, not a unit that makes or carries its own oxygen. UK service and inspection intervals are not the U.S. MSHA or current MSA intervals used here. Follow this mine's inspection, carrying, and replacement rules. This is a 1980 UK coal National Coal Board film. Allen Company sites are underground limestone (Boonesboro / Clover Bottom / Dix River Stone). Device class is a hopcalite filter self-rescuer, the same idea as the MSA W65. These operations do not issue oxygen-generating escape devices. Do not treat coal refuge or UK inspection intervals as local procedure."
  },
  "eEj1JOVu_eY": {
    focus: "Identify protected activities, inspection participation, hazard reporting, training rights, and the responsibilities miners retain for safe work.",
    scope: "This is a second pass on the same rights, not new law. Current Mine Act, Part 48 plan, and instructor control."
  },
  "SN4Sfuhvs2Y": { focus: "Use this short review to reinforce the statutory rights a miner can exercise without retaliation." },
  "WrnHZK9GhlM": { focus: "Connect major mine disasters and legislative milestones to MSHA's present enforcement and prevention mission." },
  "F7AOWLOOT-U": { focus: "Use the company-town history to understand the power imbalance surrounding early mine labor and why enforceable worker protections developed." },
  "TM8DYUKbjsw": { focus: "Follow the progression from limited federal authority to inspections, enforcement, broader coverage, miner protections, and the 1977 Mine Act." },
  "is77KiZ16_o": {
    focus: "Follow the full hazardous-energy-control sequence: notify affected workers, identify every energy source, shut down, isolate, lock and tag, release stored energy, verify zero-energy state, and control restoration.",
    scope: "This is a general OSHA-oriented presentation. Apply the mine's current MSHA-compliant lockout/tagout and energy-control procedures; it does not qualify or authorize anyone to perform electrical or maintenance work."
  },
  "GN3OBFAVHt4": {
    focus: "Observe the roof-bolting work area, machine position, operator protection, and the relationship between installed support and the ground-control plan.",
    scope: "This short field clip is awareness only. It is not roof-bolter task training, authorization, or a substitute for this mine's ground-control plan and equipment procedures."
  },
  "zaliBZlRsaE": {
    focus: "Follow the planned drill-and-blast cycle and notice the coordination, exclusion, ventilation, examination, and re-entry decisions between stages.",
    scope: "This is a generic construction animation, not an Allen Company blast procedure. Only trained and authorized persons may handle explosives, and the current blast plan, signals, clearance, guarding, and all-clear procedures control."
  },
  "ZHVAmbOBkrk": {
    focus: "These four shorts are decision-making and speaking-up, not equipment authorization. Practice identifying distractions, clearing competing mental tasks, and deliberately returning attention to the work in front of you before conditions change.",
    scope: "Graded work is the conveyor-cleanup JTA table and asking for task training before a new job. Sunshine is Module 3; blasting is Module 11 — do not watch them again here."
  },
  "G2Hs51QDszc": {
    focus: "Identify the hazards surrounding drilling, explosive storage and transport, blast-area security, ventilation, misfires, and safe re-entry in an underground environment.",
    scope: "This is a short Australian training overview and not task qualification. Terminology and methods may differ; current U.S. requirements, the approved plan, site signals, and authorized-person procedures govern."
  },
  "addOUsx6760": { focus: "Learn what a meaningful mobile-equipment examination looks for, when a safety defect requires correction or removal from service, and how examination records support follow-up." },
  "p_vsrhxIlR8": {
    focus: "Watch for pre-operational checks, traffic awareness, visibility limits, safe mounting and dismounting, communication, and operator responsibility around a haul truck.",
    scope: "Use this as mining transportation awareness only. It does not authorize haul-truck operation or replace task training, the manufacturer's manual, or this site's traffic and equipment rules."
  },
  "Km8XxRCuCho": {
    focus: "Interpret the message as a call for active personal responsibility: recognize the real risk, understand the limits of slogans, and participate in controlling hazards before work begins.",
    scope: "The phrase 'Safety 3rd' does not reduce safety's importance, place production ahead of people, or justify accepting an uncontrolled hazard. Stop work, use required controls, and follow the approved plan and site procedures."
  },
  "EQ1OPz1p0U4": {
    focus: "Consider why checking a compliance box may not make a changing task safe and why workers must continue to look for hazards and verify effective controls.",
    scope: "Personal responsibility supplements—not replaces—the operator's duties, required safeguards, training, supervision, and each miner's right to report hazards and stop unsafe work."
  },
  "H2J5MDUAMTk": {
    focus: "Use the overview to identify the people, equipment, processes, traffic, materials, and changing conditions that make mining different from an ordinary industrial workplace.",
    scope: "The examples emphasize Florida operations. Compare the broad concepts with these Kentucky underground and surface sites; local plans, geology, equipment, and instructor guidance control."
  },
  "dIreslbUgwY": {
    focus: "Look for roof and rib warning signs, examination practices, plan requirements, support functions, and the principle of staying out from under unsupported or hazardous ground.",
    scope: "This presentation centers on underground coal mining. Do not apply its support systems or retreat-mining methods as local procedure; use only the current stone-mine ground-control and ventilation plans."
  },
  "b7mhJ8viccI": {
    focus: "Observe how the supervisor inspects the ALTAIR 4X, verifies the cylinder and regulator, applies known gas, confirms the installed sensors and alarms respond, and recognizes BUMP PASS versus BUMP ERROR.",
    scope: "Only designated supervisors operate and make decisions from the company detector. This vendor demonstration is not an MSA-produced certification course and does not authorize trainees to test or clear an area. Trainees must recognize alarms, know a typical four-gas unit does not detect every mine gas, withdraw from questionable air, and notify the supervisor."
  },
  "UD2u9LXREWM": {
    focus: "Follow underground explosives storage, transport, blast-area security, fumes, misfires, and the requirement to wait for authorized re-entry after a shot.",
    scope: "This NIOSH presentation is awareness only. Only trained and authorized persons may handle explosives. A detector reading or video does not clear an area; follow the current blast plan, signals, and qualified-person procedures."
  },
  "-wrwD7s9rUE": {
    focus: "Identify why toxic or oxygen-deficient air kills in enclosed spaces and why untrained rescue attempts so often create a second victim.",
    scope: "This Ally Safety tape is principles only. It is not mine-rescue, confined-space, or detector qualification and does not authorize entry or rescue. Withdraw, warn others, and report; do not enter questionable air."
  }
};

function getRequiredVideos(moduleId) {
  const sequence = MODULE_VIDEO_SEQUENCE[moduleId] || [];
  const sequenceIndex = new Map(sequence.map((id, index) => [id, index]));
  const byId = new Map(REQUIRED_VIDEOS.map(video => [video.id, video]));
  const fromSequence = sequence.map(id => byId.get(id)).filter(Boolean);
  const extras = REQUIRED_VIDEOS.filter(video => video.moduleId === moduleId && !sequenceIndex.has(video.id));
  return fromSequence.concat(extras);
}
