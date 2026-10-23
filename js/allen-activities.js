// Allen Company Part 48 practice activities (draft v1) for the self-hosted module videos.
// Practice only: they do not change module completion, seat time, quizzes or sign-offs.
const ALLEN_ACTIVITIES = {
 "1": {
  "title": "Module 1 · Site walkthroughs and emergency card",
  "minutes": 12.0,
  "items": [
   {
    "id": "M1-a",
    "type": "site_lookup",
    "minutes": 4,
    "prompt": "Open your site's page on the Allen training site on your phone and save it to your home screen. Find: (1) the 911 'tell them' line, (2) your gathering point, (3) the first mine-command number.",
    "items": [
     "911 'tell them' line found",
     "Gathering point found",
     "Mine-command number found",
     "Page saved to home screen"
    ],
    "answer": "Site-specific – answers come from the trainee's site page"
   },
   {
    "id": "M1-b",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "There's a serious injury in the plant. What do you do first?",
    "options": [
     "Call the mine office",
     "Call 911 and tell them the site name, address and where the person is",
     "Drive the person to the hospital",
     "Wait for your supervisor"
    ],
    "answer": 1,
    "explanation": "Call 911 first; then call mine command so someone meets the ambulance."
   },
   {
    "id": "M1-c",
    "type": "ordering",
    "minutes": 2,
    "prompt": "Put these emergency steps in order.",
    "items": [
     "Make sure the scene is safe",
     "Call 911 with the site name, address and location of the injured person",
     "Call mine command, starting at the top of the list",
     "Send someone to meet the ambulance at the gate"
    ],
    "answer": [
     "Make sure the scene is safe",
     "Call 911 with the site name, address and location of the injured person",
     "Call mine command, starting at the top of the list",
     "Send someone to meet the ambulance at the gate"
    ],
    "explanation": ""
   },
   {
    "id": "M1-d",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "Why do you hang your tag on the tag board when you arrive?",
    "options": [
     "To clock in for pay",
     "So we know who's on site in an emergency",
     "So the scale house knows you're here",
     "It's optional"
    ],
    "answer": 1,
    "explanation": "The tag board is how we account for everyone in an emergency."
   },
   {
    "id": "M1-e",
    "type": "site_map_marking",
    "minutes": 3,
    "prompt": "On your site's map, tap your gathering point and the nearest phone or radio to your work area.",
    "photoPending": true,
    "answer": "Site-specific"
   }
  ]
 },
 "2": {
  "title": "Module 2 · Miners' rights and the Mine Act",
  "minutes": 6.5,
  "items": [
   {
    "id": "M2-a",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "According to Section 2 of the Mine Act, what is the first priority of everyone in mining?",
    "options": [
     "Production",
     "The health and safety of the miner",
     "Equipment care",
     "Meeting MSHA deadlines"
    ],
    "answer": 1,
    "explanation": "Section 2: the first priority and concern is the health and safety of its most precious resource, the miner."
   },
   {
    "id": "M2-b",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "Can you be fired for reporting a safety hazard?",
    "options": [
     "Yes, if it slows production",
     "No – the Mine Act protects miners from discrimination for safety complaints",
     "Only if you're new",
     "Only if you report to MSHA directly"
    ],
    "answer": 1,
    "explanation": "Section 105(c) protects miners who make safety complaints."
   },
   {
    "id": "M2-c",
    "type": "ordering",
    "minutes": 2,
    "prompt": "Put the Allen hazard-reporting flow in order.",
    "items": [
     "See the hazard",
     "Stop and warn people nearby",
     "Tell your supervisor",
     "Make sure it's recorded",
     "If not fixed, take it to the Safety Manager"
    ],
    "answer": [
     "See the hazard",
     "Stop and warn people nearby",
     "Tell your supervisor",
     "Make sure it's recorded",
     "If not fixed, take it to the Safety Manager"
    ],
    "explanation": ""
   },
   {
    "id": "M2-d",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "What can a miners' representative do?",
    "options": [
     "Approve production targets",
     "Go along on MSHA inspections and request inspections",
     "Discipline miners",
     "Sign off on new-miner training"
    ],
    "answer": 1,
    "explanation": "Under Part 40, a representative can accompany inspectors and request inspections."
   }
  ]
 },
 "3": {
  "title": "Module 3 · MSA W65 self-rescuer care and inspection",
  "minutes": 9.5,
  "items": [
   {
    "id": "M3-a",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "What does the W65 do?",
    "options": [
     "Makes oxygen for 60 minutes",
     "Turns carbon monoxide into carbon dioxide; it does NOT make oxygen",
     "Filters dust only",
     "Detects gas"
    ],
    "answer": 1,
    "explanation": "The W65 is a filter self-rescuer. It won't help in low-oxygen air."
   },
   {
    "id": "M3-b",
    "type": "find_the_hazard",
    "minutes": 3,
    "prompt": "Tap every reason this W65 must come out of service.",
    "count": 3,
    "photoPending": true,
    "answer": [
     "Dented case",
     "Broken or missing seal on the red lever",
     "Label/dates unreadable"
    ]
   },
   {
    "id": "M3-c",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "At the 90-day check, the unit weighs 12 grams more than the as-shipped weight. What now?",
    "options": [
     "Keep using it",
     "Out of service – more than 10 g gain means moisture got in",
     "Dry it in the sun",
     "Recheck in a year"
    ],
    "answer": 1,
    "explanation": "A gain of more than 10 grams means it's taken out of service."
   },
   {
    "id": "M3-d",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "How far can your W65 be from you underground at Allen?",
    "options": [
     "50 feet",
     "25 feet",
     "Anywhere in the heading",
     "In the lunch room"
    ],
    "answer": 1,
    "explanation": "Allen rule: on your belt and always within 25 feet."
   },
   {
    "id": "M3-e",
    "type": "self_check",
    "minutes": 2,
    "prompt": "Every-shift W65 check – tick each item as you check your own unit.",
    "items": [
     "No dents or deep gouges",
     "Red lever and seal intact",
     "Label and dates readable",
     "Belt loop secure"
    ],
    "answer": "Completion only"
   }
  ]
 },
 "6": {
  "title": "Module 6 · Fire warning, escape, extinguishers and barricading",
  "minutes": 17.0,
  "items": [
   {
    "id": "M6-a",
    "type": "scenario_short_answer",
    "minutes": 3,
    "prompt": "You smell rotten eggs in the crusher heading. What do you do?",
    "model_answer": "Treat it as the fire warning: stop work, tell others nearby, get your W65 ready, and leave by your escapeway as trained.",
    "must_include": [
     "fire warning",
     "warn others",
     "W65",
     "escapeway"
    ]
   },
   {
    "id": "M6-b",
    "type": "map_trace",
    "minutes": 5,
    "prompt": "On your mine's map, trace the primary and secondary escapeway from your work area to the surface.",
    "photoPending": true,
    "answer": "Site-specific"
   },
   {
    "id": "M6-c",
    "type": "ordering",
    "minutes": 1.5,
    "prompt": "Put the P.A.S.S. steps in order.",
    "items": [
     "Pull the pin",
     "Aim at the base of the fire",
     "Squeeze the handle",
     "Sweep side to side"
    ],
    "answer": [
     "Pull the pin",
     "Aim at the base of the fire",
     "Squeeze the handle",
     "Sweep side to side"
    ],
    "explanation": ""
   },
   {
    "id": "M6-d",
    "type": "matching",
    "minutes": 2,
    "prompt": "Match each fire class to its fuel.",
    "left": [
     "Class A",
     "Class B",
     "Class C"
    ],
    "right": [
     "Diesel, oil, grease",
     "Energized electrical equipment",
     "Wood, paper, rubber, conveyor belting"
    ],
    "pairs": [
     [
      "Class A",
      "Wood, paper, rubber, conveyor belting"
     ],
     [
      "Class B",
      "Diesel, oil, grease"
     ],
     [
      "Class C",
      "Energized electrical equipment"
     ]
    ],
    "answer": [
     [
      "Class A",
      "Wood, paper, rubber, conveyor belting"
     ],
     [
      "Class B",
      "Diesel, oil, grease"
     ],
     [
      "Class C",
      "Energized electrical equipment"
     ]
    ]
   },
   {
    "id": "M6-e",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "When should you NOT try to fight a fire?",
    "options": [
     "When the alarm has been raised and the fire is small",
     "When the fire is bigger than a wastebasket or your escape route isn't behind you",
     "When you have an ABC extinguisher",
     "Never – always fight it"
    ],
    "answer": 1,
    "explanation": "Only fight small fires, with the alarm raised and your escape route behind you."
   },
   {
    "id": "M6-f",
    "type": "scenario_short_answer",
    "minutes": 4,
    "prompt": "Smoke is in your primary escapeway. What are your options, and when is barricading the choice?",
    "model_answer": "Use the secondary escapeway. Barricading is the last resort, only when you can't escape by either escapeway; then build the barricade in the best available air, signal at intervals and conserve air and lights.",
    "must_include": [
     "secondary escapeway",
     "last resort",
     "signal"
    ]
   }
  ]
 },
 "8": {
  "title": "Module 8 · Health provisions and warning labels",
  "minutes": 4.5,
  "items": [
   {
    "id": "M8-a",
    "type": "find_the_hazard",
    "minutes": 3,
    "prompt": "Find three warning signs or labels in this plant scene and tap each one.",
    "count": 3,
    "photoPending": true,
    "answer": [
     "Hearing protection required sign",
     "Chemical container label",
     "Guard / moving parts warning"
    ]
   },
   {
    "id": "M8-b",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "Allen rock is very low in silica. Does that mean dust is no concern?",
    "options": [
     "Yes",
     "No – dust is still controlled, and respirators are worn where required",
     "Only underground",
     "Only in summer"
    ],
    "answer": 1,
    "explanation": "Low silica doesn't mean no hazard; follow dust controls and required PPE."
   }
  ]
 },
 "9": {
  "title": "Module 9 · Electrical hazards",
  "minutes": 11.0,
  "items": [
   {
    "id": "M9-a",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "You find an open panel with exposed wiring at the plant. What do you do?",
    "options": [
     "Close it yourself and keep working",
     "Stay clear and report it so a qualified person corrects it",
     "Tape over it",
     "Ignore it if it's not your area"
    ],
    "answer": 1,
    "explanation": "Covers stay on; dangerous conditions are corrected by a qualified person before use."
   },
   {
    "id": "M9-b",
    "type": "ordering",
    "minutes": 2,
    "prompt": "Put lockout in order for work on a conveyor motor.",
    "items": [
     "Tell affected people",
     "Shut off at the controls",
     "Open the disconnect",
     "Put your own lock and tag on it",
     "Test that it won't start"
    ],
    "answer": [
     "Tell affected people",
     "Shut off at the controls",
     "Open the disconnect",
     "Put your own lock and tag on it",
     "Test that it won't start"
    ],
    "explanation": ""
   },
   {
    "id": "M9-c",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "A trailing cable has a cut jacket, temporarily taped. Is that OK?",
    "options": [
     "Yes, tape is fine",
     "No – take it out of service; permanent splices must be strong, insulated, sealed, and made by a qualified person",
     "Only if it's dry",
     "Only for one shift"
    ],
    "answer": 1,
    "explanation": "Tape isn't a proper repair."
   },
   {
    "id": "M9-d",
    "type": "scenario_short_answer",
    "minutes": 3,
    "prompt": "Your truck's raised bed touches an overhead line. What do you do?",
    "model_answer": "Stay inside unless there's fire. If you must get out, jump clear with feet together, never touching the truck and the ground at the same time, and shuffle away. Call for the line to be deenergized.",
    "must_include": [
     "stay inside",
     "jump clear",
     "feet together",
     "shuffle"
    ]
   },
   {
    "id": "M9-e",
    "type": "find_the_hazard",
    "minutes": 3,
    "prompt": "Find the electrical hazards at this sump.",
    "count": 3,
    "photoPending": true,
    "answer": [
     "Pump cable lying in water",
     "Cut cable jacket",
     "Plug missing ground pin"
    ]
   }
  ]
 },
 "10": {
  "title": "Module 10 · First aid (awareness; supports hands-on training)",
  "minutes": 23.0,
  "items": [
   {
    "id": "M10-a",
    "type": "ordering",
    "minutes": 3,
    "prompt": "Put the splinting steps in order.",
    "items": [
     "Make sure the scene is safe and call for help",
     "Check circulation below the injury (color, warmth, feeling)",
     "Pad the splint",
     "Splint in the position found, covering the joints above and below",
     "Re-check circulation; loosen ties if fingers or toes go pale, blue or numb"
    ],
    "answer": [
     "Make sure the scene is safe and call for help",
     "Check circulation below the injury (color, warmth, feeling)",
     "Pad the splint",
     "Splint in the position found, covering the joints above and below",
     "Re-check circulation; loosen ties if fingers or toes go pale, blue or numb"
    ],
    "explanation": ""
   },
   {
    "id": "M10-b",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "A worker fell about 8 feet from a screen deck, is conscious, and the leg looks bent. What's most important first?",
    "options": [
     "Straighten the leg",
     "Get them standing",
     "Make the scene safe, call 911 and the mine office, and don't move them",
     "Give them water"
    ],
    "answer": 2,
    "explanation": "Assume a neck or back injury; don't move them unless in immediate danger."
   },
   {
    "id": "M10-c",
    "type": "ordering",
    "minutes": 2,
    "prompt": "Burns: put the care steps in order.",
    "items": [
     "Stop the burning",
     "Cool with cool or cold clean water for at least 10 minutes (no ice)",
     "Remove rings and tight items before swelling",
     "Cover loosely with a dry, sterile dressing"
    ],
    "answer": [
     "Stop the burning",
     "Cool with cool or cold clean water for at least 10 minutes (no ice)",
     "Remove rings and tight items before swelling",
     "Cover loosely with a dry, sterile dressing"
    ],
    "explanation": ""
   },
   {
    "id": "M10-d",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "Diesel splashes in a coworker's eye at the fuel island. How long do you flush?",
    "options": [
     "30 seconds",
     "At least 15 minutes",
     "Until it stops stinging",
     "Don't flush; wipe it"
    ],
    "answer": 1,
    "explanation": "Rinse with lots of water for at least 15 minutes or until medical help arrives, holding the eyelids open (AHA). Allen eyewashes are bottles; if one runs out, keep rinsing with clean tap water. Then call poison control or get medical care, with the SDS."
   },
   {
    "id": "M10-e",
    "type": "sds_lookup",
    "minutes": 5,
    "prompt": "Open the diesel fuel SDS in the SDS library. Answer: (1) the signal word, (2) first aid for eye contact (section 4), (3) required gloves (section 8).",
    "answer": "From the SDS on the training site; reference copy, not Allen's supplier SDS"
   },
   {
    "id": "M10-f",
    "type": "scenario_short_answer",
    "minutes": 3,
    "prompt": "In July a haul truck driver is confused, hot, and not making sense. What do you do?",
    "model_answer": "Treat it as heat stroke: call 911, move them to shade, start cooling right away, best by cold-water immersion up to the chin, otherwise cold water and ice packs at neck, armpits and groin, and don't give fluids if they can't drink safely.",
    "must_include": [
     "heat stroke",
     "911",
     "cool fast"
    ]
   },
   {
    "id": "M10-g",
    "type": "scenario_short_answer",
    "minutes": 4,
    "prompt": "A miner is injured in an underground heading. Who calls, and how does EMS reach them?",
    "model_answer": "Any miner calls 911 and mine command; any miner meets EMS at the portal; the injured person is brought out by the primary escapeway.",
    "must_include": [
     "call 911",
     "meet EMS at portal",
     "primary escapeway"
    ]
   },
   {
    "id": "M10-h",
    "type": "site_lookup",
    "minutes": 3,
    "prompt": "Find the first-aid kit, stretcher, blankets, burn kit and eyewash on your site page or map.",
    "items": [
     "First-aid kit",
     "Stretcher",
     "Blankets",
     "Burn kit",
     "Eyewash"
    ],
    "answer": "Site-specific – answers come from the trainee's site page"
   }
  ]
 },
 "11": {
  "title": "Module 11 · Surface operations hazards",
  "minutes": 8.5,
  "items": [
   {
    "id": "M11-a",
    "type": "find_the_hazard",
    "minutes": 4,
    "prompt": "Find the hazards in this pit scene.",
    "count": 3,
    "photoPending": true,
    "answer": [
     "Knocked-down or missing berm",
     "Person at the toe of a stockpile",
     "Pond edge without life jacket"
    ]
   },
   {
    "id": "M11-b",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "When must you wear a life jacket?",
    "options": [
     "Only on boats",
     "Wherever there's a danger of falling into water, like working on pumps or near pond edges",
     "Only in winter",
     "Never in a quarry"
    ],
    "answer": 1,
    "explanation": "56.15020."
   },
   {
    "id": "M11-c",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "The pit pond is frozen solid. Can you walk across it to reach the pump?",
    "options": [
     "Yes, if the ice is thick",
     "No – never walk on ice in a pit",
     "Yes, with a buddy",
     "Only in winter"
    ],
    "answer": 1,
    "explanation": "Never walk on ice in a pit."
   },
   {
    "id": "M11-d",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "On a dark winter afternoon, a light tower is out over the loadout. What do you do?",
    "options": [
     "Work faster",
     "Report it and stay out of the dark area until it's lit",
     "Use your phone light",
     "Nothing"
    ],
    "answer": 1,
    "explanation": "Report lights that are out; work areas must be lit well enough to work safely."
   }
  ]
 },
 "12": {
  "title": "Module 12 · Task training: haulage, loader, plant, drill & blast, shop, HazCom",
  "minutes": 48.0,
  "items": [
   {
    "id": "M12-a",
    "type": "find_the_hazard",
    "minutes": 4,
    "prompt": "Pre-shift walkaround: find the defects on this haul truck.",
    "count": 4,
    "photoPending": true,
    "answer": [
     "Cracked brake chamber",
     "Low/damaged tire",
     "Broken mirror",
     "Backup alarm not working"
    ]
   },
   {
    "id": "M12-b",
    "type": "scenario_short_answer",
    "minutes": 3,
    "prompt": "You're walking toward a parked tri-axle in the pit when it starts to back up. What do you do?",
    "model_answer": "Move out of its path to a place the driver can see you, and don't approach until you've made contact with the driver and gotten an acknowledgment.",
    "must_include": [
     "out of the path",
     "make contact",
     "acknowledgment"
    ]
   },
   {
    "id": "M12-c",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "Your backup alarm stops working mid-shift. What now?",
    "options": [
     "Keep working carefully",
     "Stop, report it, and don't back without a spotter or until it's fixed",
     "Honk instead",
     "Finish the shift first"
    ],
    "answer": 1,
    "explanation": "A safety defect means the equipment doesn't run until it's fixed or controlled."
   },
   {
    "id": "M12-d",
    "type": "scenario_short_answer",
    "minutes": 2,
    "prompt": "While you're loading, a truck driver gets out to check the load. What do you do?",
    "model_answer": "Stop loading and lower the bucket. Don't continue until the driver is back in the cab. At Allen, truck drivers stay in the cab while being loaded.",
    "must_include": [
     "stop loading",
     "driver back in cab"
    ]
   },
   {
    "id": "M12-e",
    "type": "scenario_short_answer",
    "minutes": 3,
    "prompt": "The primary crusher is bridged. What do you do?",
    "model_answer": "Never stand on the rock or in the crusher. Use the rock breaker or the plant's approved method from a safe position, tied off where there's a danger of falling.",
    "must_include": []
   },
   {
    "id": "M12-f",
    "type": "find_the_hazard",
    "minutes": 4,
    "prompt": "Find the hazards at this conveyor tail pulley.",
    "count": 3,
    "photoPending": true,
    "answer": [
     "Missing guard at tail pulley",
     "Spillage under the belt",
     "No pull-cord within reach"
    ]
   },
   {
    "id": "M12-g",
    "type": "scenario_short_answer",
    "minutes": 2,
    "prompt": "A pickup comes toward your blast guard post one minute before the shot. What do you do?",
    "model_answer": "Stop it; no one passes. Stay at your post until the all-clear is given.",
    "must_include": [
     "stop it",
     "stay at post",
     "all-clear"
    ]
   },
   {
    "id": "M12-h",
    "type": "scenario_short_answer",
    "minutes": 2,
    "prompt": "You find what looks like a cut-off detonator tube in the muck pile. What do you do?",
    "model_answer": "Stop, don't touch it, keep others away, and tell the blaster/supervisor right away.",
    "must_include": [
     "don't touch",
     "keep others away",
     "tell the blaster"
    ]
   },
   {
    "id": "M12-i",
    "type": "jsa_worksheet",
    "minutes": 8,
    "prompt": "Complete a Job Safety Analysis for: Changing a loader bucket tooth in the shop. For each step, list the hazards and the controls.",
    "columns": [
     "Step",
     "Hazards",
     "Controls"
    ],
    "answer_key": [
     [
      "Park and lower bucket",
      "Unexpected movement",
      "Bucket on the floor or blocked, engine off, lockout, wheels chocked"
     ],
     [
      "Remove pin",
      "Flying pin fragments, pinch points, heavy parts",
      "Safety glasses/face shield, correct pin tool, keep hands clear"
     ],
     [
      "Fit new tooth",
      "Lifting strain, crushing",
      "Use lifting aid, two-person lift where needed"
     ],
     [
      "Return to service",
      "Tools left, others near",
      "Clear area, remove your lock, test"
     ]
    ]
   },
   {
    "id": "M12-j",
    "type": "jsa_worksheet",
    "minutes": 8,
    "prompt": "Complete a Job Safety Analysis for: Cleaning spillage under a conveyor at the tail pulley. For each step, list the hazards and the controls.",
    "columns": [
     "Step",
     "Hazards",
     "Controls"
    ],
    "answer_key": [
     [
      "Stop belt",
      "Moving parts, unexpected start",
      "Lock and tag the conveyor disconnect, test start"
     ],
     [
      "Clean",
      "Pinch points, dust, slips",
      "Guards stay on or area locked out, dust mask if required, good footing"
     ],
     [
      "Restart",
      "Others in area",
      "Clear area, remove lock, warn before start"
     ]
    ]
   },
   {
    "id": "M12-k",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "A raised truck body won't come down in the shop. Can you work under it?",
    "options": [
     "Yes, quickly",
     "No – only after it's blocked with the body prop or proper blocking",
     "Yes, if the engine is off",
     "Yes, if someone watches"
    ],
    "answer": 1,
    "explanation": "Never work under raised equipment unless it's blocked against movement."
   },
   {
    "id": "M12-l",
    "type": "matching",
    "minutes": 3,
    "prompt": "Match each GHS pictogram to its hazard.",
    "left": [
     "Flame",
     "Exclamation mark",
     "Health hazard (person)",
     "Corrosion",
     "Exploding bomb"
    ],
    "right": [
     "Burns skin/eyes, corrodes metal",
     "Explosive",
     "Flammable",
     "Irritant / harmful",
     "Serious long-term health hazard"
    ],
    "pairs": [
     [
      "Flame",
      "Flammable"
     ],
     [
      "Exclamation mark",
      "Irritant / harmful"
     ],
     [
      "Health hazard (person)",
      "Serious long-term health hazard"
     ],
     [
      "Corrosion",
      "Burns skin/eyes, corrodes metal"
     ],
     [
      "Exploding bomb",
      "Explosive"
     ]
    ],
    "answer": [
     [
      "Flame",
      "Flammable"
     ],
     [
      "Exclamation mark",
      "Irritant / harmful"
     ],
     [
      "Health hazard (person)",
      "Serious long-term health hazard"
     ],
     [
      "Corrosion",
      "Burns skin/eyes, corrodes metal"
     ],
     [
      "Exploding bomb",
      "Explosive"
     ]
    ]
   },
   {
    "id": "M12-m",
    "type": "sds_lookup",
    "minutes": 6,
    "prompt": "Find the diesel SDS. Signal word? First aid for skin contact? Required gloves?",
    "answer": "From the SDS library"
   }
  ]
 }
};
