// Allen Company Part 48 practice activities (draft v1) for the self-hosted module videos.
// Practice only: they do not change module completion, seat time, quizzes or sign-offs.
const ALLEN_ACTIVITIES = {
 "1": {
  "title": "Module 1 · Site walkthroughs, site tours, your first day and emergency card",
  "minutes": 31.0,
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
   },
   {
    "id": "M1-f",
    "type": "site_lookup",
    "minutes": 5,
    "prompt": "On your own site's page, find: (1) your escape route or gathering point, (2) the first mine-command number, (3) your site leader's role.",
    "items": [
     "Escape route or gathering point found",
     "First mine-command number found",
     "Site leader found"
    ],
    "answer": "Site-specific – answers come from the trainee's site page"
   },
   {
    "id": "M1-g",
    "type": "find_the_hazard",
    "minutes": 5,
    "prompt": "Name these five landmarks at your own site. Real photos from your site are shown where we have them; anything not pictured is still an illustrated stand-in.",
    "count": 5,
    "photoPending": true,
    "answer": [
     "Tag board",
     "Scale house",
     "Breakroom (SDS binder or SDS station)",
     "Eyewash station",
     "Your gathering point"
    ],
    "photoCoverage": "Photos cover: the tag boards at all three sites; Boonesboro miners' outdoor tag board, breakroom contractor/visitor boards with the PPE sign, first aid cabinet and SDS station, and Level 2 fuel tank; Clover Bottom Emergency Assembly Area 1 at the tag-board trailer, screen plant and primary crusher; Dix River explosive magazines, ANFO trailer, fuel tank and escape-map box. Still pending: scale houses, eyewash stations, the other gathering points.",
    "photos": [
     {
      "src": "/media/photos/allen-bbq-outdoor-tag-board.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Outdoor covered tag board on a block wall: IN and OUT pegboard panels with tags and a CHOOSE TO BE SAFE poster in a glass case between them",
      "answer": "The miners' tag board: the covered IN / OUT board outside. Tag in and out here every shift."
     },
     {
      "src": "/media/photos/allen-bbq-contractor-visitor-board.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Breakroom contractor and visitor check-in board labeled IN and OUT with brass tags, under a red sign: before you leave this room make sure you have safety glasses, hard hat, hi-vis, self-rescuer, brass tag, any other required PPE",
      "answer": "Contractor and visitor check-in board in the breakroom. The sign over it: before you leave this room, have your safety glasses, hard hat, hi-vis, self-rescuer, brass tag and any other required PPE."
     },
     {
      "src": "/media/photos/allen-bbq-contractor-tag-board.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Breakroom contractor board labeled IN, CONTRACTORS and OUT with numbered pegs and brass tags, clipboard below",
      "answer": "Contractor check-in board in the breakroom (IN / CONTRACTORS / OUT)."
     },
     {
      "src": "/media/photos/allen-bbq-first-aid-sds-station.jpg",
      "site": "Boonesboro Quarry",
      "alt": "First aid cabinet above a yellow SDS station holder on the breakroom wall",
      "answer": "Breakroom first aid cabinet and SDS station."
     },
     {
      "src": "/media/photos/allen-bbq-l2-fuel-tank.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Long white diesel tank underground on Level 2 with yellow bollards and red fire extinguisher stands at each end",
      "answer": "Level 2 diesel fuel tank (no smoking or open flames; extinguishers on the stands)."
     },
     {
      "src": "/media/photos/allen-bbq-l2-fuel-tank-end.jpg",
      "site": "Boonesboro Quarry",
      "alt": "End of the Level 2 diesel tank with a fuel meter, NO SMOKING NO OPEN FLAMES danger sign, hazard placard and a red oily-waste can",
      "answer": "Level 2 diesel fuel tank: NO SMOKING / NO OPEN FLAMES sign; oily rags go in the red can."
     },
     {
      "src": "/media/photos/allen-cbq-tag-board-assembly-area.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "White trailer with an EMERGENCY ASSEMBLY AREA 1 sign next to the MINE #1, OUT, MINE #2 tag board and a bulletin board",
      "answer": "Tag-board trailer: the tag board and Emergency Assembly Area 1, a gathering point."
     },
     {
      "src": "/media/photos/allen-cbq-tag-board.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "Tag board with three panels labeled IN MINE #1, OUT and IN MINE #2, numbered black tags",
      "answer": "Tag board: IN MINE #1 | OUT | IN MINE #2."
     },
     {
      "src": "/media/photos/allen-cbq-screen-plant.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "Screen plant with an overhead conveyor, control booth stairs, jersey barriers and an ALL TRAFFIC sign",
      "answer": "Screen plant (a loud area: hearing protection)."
     },
     {
      "src": "/media/photos/allen-cbq-primary-crusher-pit.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "Primary crusher with a haul truck at the dump point, highwall and mine portal behind",
      "answer": "Primary crusher and dump point, with the pit and mine portal behind."
     },
     {
      "src": "/media/photos/allen-drs-tag-board.jpg",
      "site": "Dix River Stone",
      "alt": "Tag board with OUT, IN, OUT columns and brass tags beside a time clock on a tiled breakroom wall",
      "answer": "Tag board in the breakroom (also the Dix River gathering point)."
     },
     {
      "src": "/media/photos/allen-drs-escape-map-plant-trailer.jpg",
      "site": "Dix River Stone",
      "alt": "Escape map in a covered box on the side of the plant trailer on the flat",
      "answer": "Escape map posted at the plant trailer on the flat."
     },
     {
      "src": "/media/photos/allen-drs-magazine-1.jpg",
      "site": "Dix River Stone",
      "alt": "White steel box on the quarry floor by the highwall with a red fire extinguisher stand beside it",
      "answer": "Explosive magazine (keep away unless assigned; no smoking or flames within 50 ft)."
     },
     {
      "src": "/media/photos/allen-drs-magazine-2.jpg",
      "site": "Dix River Stone",
      "alt": "Second white steel box with a hinged, latched door in front of the highwall, red extinguisher stand at left",
      "answer": "Explosive magazine (keep away unless assigned; no smoking or flames within 50 ft)."
     },
     {
      "src": "/media/photos/allen-drs-anfo-trailer.jpg",
      "site": "Dix River Stone",
      "alt": "White trailer with an orange placard parked at an underground heading, two orange cones in front",
      "answer": "ANFO trailer (cones mean keep clear; no smoking or flames within 50 ft)."
     },
     {
      "src": "/media/photos/allen-drs-fuel-tank.jpg",
      "site": "Dix River Stone",
      "alt": "Horizontal white tank marked NO OPEN FLAMES with a hazard diamond, hose and a fire extinguisher on a stand",
      "answer": "Fuel tank (no open flames; extinguisher on the stand)."
     },
     {
      "src": "/media/photos/allen-bbq-portals.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Two mine entrance portals cut into the limestone face, with a red and white DANGER sign on the rock between them",
      "answer": "Mine entrance portals (DANGER sign: hard hat area)."
     },
     {
      "src": "/media/photos/allen-bbq-2west-caution-light.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Wide underground haulage road between pillars, with an amber light in the distance at an intersection",
      "answer": "Caution light at the 5 North intersection on 2 West: slow down and watch for cross traffic."
     },
     {
      "src": "/media/photos/allen-bbq-2west-blocked-area.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Dark underground heading with a blocked-off travel area marked by a sign and posts",
      "answer": "Blocked-off area on 2 West (toward the Liwell Plant and Roll Crusher): do not enter unless you are assigned and authorized."
     },
     {
      "src": "/media/photos/allen-bbq-underground-shop.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Lit underground shop area with overhead lights, ventilation duct and equipment parked inside",
      "answer": "Underground mine shop."
     },
     {
      "src": "/media/photos/allen-cbq-magazines.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "Two steel magazine boxes on the floor of an underground opening, a smaller box between them",
      "answer": "Explosive magazines (keep away unless assigned; no smoking or flames within 50 ft)."
     }
    ]
   },
   {
    "id": "M1-h",
    "type": "ordering",
    "minutes": 3,
    "prompt": "Put your first day in order.",
    "items": [
     "Tag in on the tag board",
     "Report to your supervisor or lead",
     "Check your PPE",
     "Get task-trained before any new task",
     "Report hazards as you find them",
     "Tag out at the end of the shift"
    ],
    "answer": [
     "Tag in on the tag board",
     "Report to your supervisor or lead",
     "Check your PPE",
     "Get task-trained before any new task",
     "Report hazards as you find them",
     "Tag out at the end of the shift"
    ],
    "explanation": ""
   },
   {
    "id": "M1-i",
    "type": "scenario_short_answer",
    "minutes": 3,
    "prompt": "You're new and you get turned around underground. What do you do?",
    "model_answer": "Stop in a safe place out of the way of traffic. Call your lead by radio and say where you are and the last landmark you passed. Wait for directions. Don't wander into areas you don't know.",
    "must_include": [
     "stop",
     "out of traffic",
     "radio your lead",
     "last landmark",
     "don't wander"
    ]
   },
   {
    "id": "M1-j",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "Who can move your tag on the tag board?",
    "options": [
     "Anyone on your crew",
     "Only you",
     "Your supervisor, at the start of the shift",
     "The scale house"
    ],
    "answer": 1,
    "explanation": "Move your own tag and only your own, so the count is right in an emergency."
   },
   {
    "id": "M1-k",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "Your lead asks you to run a machine you've never been trained on. What do you do?",
    "options": [
     "Figure it out as you go",
     "Watch someone for a minute, then run it",
     "Say you haven't been task-trained on it yet and ask for training first",
     "Refuse to work for the rest of the day"
    ],
    "answer": 2,
    "explanation": "30 CFR 48.7: task training comes before you do a new task."
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
  "title": "Module 6 · Fire warning, escapeways, smoke decisions, accounting and barricading",
  "minutes": 41.5,
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
   },
   {
    "id": "M6-g",
    "type": "map_trace",
    "minutes": 5,
    "prompt": "Boonesboro: on the posted escapeway map, trace the primary and secondary escapeway from a marked work area to your gathering point.",
    "photoPending": true,
    "answer": "Site-specific – from Boonesboro's posted escapeway map",
    "photos": [
     {
      "src": "/media/photos/allen-bbq-l1-escapeway-trace.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Simplified trace of the Boonesboro Level 1 escapeway map: pillars, green escapeway arrows, white and blue reflector dots",
      "answer": "Green arrows mark both escapeways: white reflector dots = primary, blue = secondary. This is a simplified trace of the 2026 map; the map posted at the mine always governs.",
      "label": "Level 1 (trace)"
     },
     {
      "src": "/media/photos/allen-bbq-l2-escapeway-trace.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Simplified trace of the Boonesboro Level 2 escapeway map: pillars, green escapeway arrows, white and blue reflector dots",
      "answer": "Green arrows mark both escapeways: white reflector dots = primary, blue = secondary. This is a simplified trace of the 2026 map; the map posted at the mine always governs.",
      "label": "Level 2 (trace)"
     },
     {
      "src": "/media/photos/allen-bbq-l3-escapeway-trace.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Simplified trace of the Boonesboro Level 3 escapeway map: pillars, green escapeway arrows, white and blue reflector dots",
      "answer": "Green arrows mark both escapeways: white reflector dots = primary, blue = secondary. This is a simplified trace of the 2026 map; the map posted at the mine always governs.",
      "label": "Level 3 (trace)"
     }
    ]
   },
   {
    "id": "M6-h",
    "type": "map_trace",
    "minutes": 5,
    "prompt": "Clover Bottom #1 & #2: on the posted escapeway map for the mine you work in, trace the primary and secondary escapeway from a marked work area to your gathering point.",
    "photoPending": true,
    "answer": "Site-specific – from Clover Bottom's posted escapeway maps",
    "photos": [
     {
      "src": "/media/photos/allen-cbq-1-escapeway-trace.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "Simplified trace of the Clover Bottom Mine #1 escapeway map: pillars, green escapeway arrows, white and blue reflector dots",
      "answer": "Green arrows mark both escapeways: white reflector dots = primary, blue = secondary. This is a simplified trace of the 2026 map; the map posted at the mine always governs.",
      "label": "Mine #1 (trace)"
     },
     {
      "src": "/media/photos/allen-cbq-2-escapeway-trace.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "Simplified trace of the Clover Bottom Mine #2 escapeway map: pillars, green escapeway arrows, white and blue reflector dots",
      "answer": "Green arrows mark both escapeways: white reflector dots = primary, blue = secondary. This is a simplified trace of the 2026 map; the map posted at the mine always governs.",
      "label": "Mine #2 (trace)"
     }
    ]
   },
   {
    "id": "M6-i",
    "type": "map_trace",
    "photos": [
     {
      "src": "/media/photos/allen-drs-escape-map-plant-trailer.jpg",
      "site": "Dix River Stone",
      "alt": "Escape map posted in a covered box on the side of the plant trailer on the flat, highwall behind",
      "answer": "Where the Dix River escape map is posted: the plant trailer (also in the breakroom).",
      "label": "Where is the map?"
     },
     {
      "src": "/media/photos/allen-drs-l1-escapeway-trace.jpg",
      "site": "Dix River Stone",
      "alt": "Simplified trace of the Dix River Level 1 escapeway map: pillars, green escapeway arrows, white and blue reflector dots",
      "answer": "Green arrows mark both escapeways: white reflector dots = primary, blue = secondary. This is a simplified trace of the 2026 map; the map posted at the mine always governs.",
      "label": "Level 1 (trace)"
     }
    ],
    "minutes": 5,
    "prompt": "Dix River: on the posted escapeway map, trace the primary and secondary escapeway from a marked work area to your gathering point.",
    "photoPending": true,
    "answer": "Site-specific – from Dix River's posted escapeway map"
   },
   {
    "id": "M6-j",
    "type": "scenario_short_answer",
    "minutes": 6,
    "prompt": "You're working underground and smell stench gas. You put on your W65 and head out by the primary escapeway. Partway out, the smoke gets heavy and you feel lightheaded. What do you do at each point, and why?",
    "model_answer": "Stench gas means evacuate: put on the W65 right away, warn others, and leave by the primary escapeway. Hot, dry air from the W65 is normal, so keep it on. The W65 makes no oxygen, so heavy smoke and feeling lightheaded mean you need to get out of the smoke: turn back and take the secondary escapeway to fresh air. Barricade only if every way out is cut off.",
    "must_include": [
     "W65 on right away",
     "warn others",
     "hot air is normal",
     "no oxygen",
     "secondary escapeway"
    ]
   },
   {
    "id": "M6-k",
    "type": "ordering",
    "minutes": 2,
    "prompt": "Stench gas reaches your work area. Put your first actions in order.",
    "items": [
     "Put on your W65 right away",
     "Warn the people near you",
     "Head out by the primary escapeway",
     "If it's blocked, take the secondary escapeway",
     "Report to the gathering point and get counted"
    ],
    "answer": [
     "Put on your W65 right away",
     "Warn the people near you",
     "Head out by the primary escapeway",
     "If it's blocked, take the secondary escapeway",
     "Report to the gathering point and get counted"
    ],
    "explanation": "Adapted for Allen's MSA W65 filter self-rescuer: it is put on at the first sign of fire, smoke or stench gas."
   },
   {
    "id": "M6-l",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "In general MSHA training, when is barricading considered?",
    "options": [
     "As soon as you smell smoke",
     "Only when every escape route is cut off",
     "When your W65 feels hot",
     "When you can't find your partner"
    ],
    "answer": 1,
    "explanation": "At Allen, escape is the plan: our mines keep no refuge or barricading materials, and your site's emergency plan governs. In general MSHA training, barricading is only a last resort when every escape route is cut off."
   }
  ]
 },
 "8": {
  "title": "Module 8 · Health: dust, noise, diesel exhaust, warning labels and SDSs",
  "minutes": 24.5,
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
   },
   {
    "id": "M8-c",
    "type": "sds_lookup",
    "photos": [
     {
      "src": "/media/photos/allen-bbq-first-aid-sds-station.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Boonesboro breakroom wall: first aid cabinet above a yellow SDS station holder",
      "answer": "Boonesboro breakroom: the SDS station (Safety Data Sheets) is under the first aid cabinet.",
      "label": "Where are the SDSs?"
     }
    ],
    "minutes": 6,
    "prompt": "Open the SDS for the hydraulic oil used at your site (the paper SDS binder in your breakroom). Find: (1) the product name in section 1, and check it matches the label; (2) the signal word, if there is one; (3) first aid for eye contact (section 4); (4) the gloves to wear (section 8); (5) the extinguisher to use (section 5).",
    "answer": "From the SDS for the product; reference copy until Allen's supplier SDS is added"
   },
   {
    "id": "M8-d",
    "type": "matching",
    "minutes": 3,
    "prompt": "Match each GHS pictogram to what it warns about.",
    "left": [
     "Flame",
     "Corrosion",
     "Exclamation mark",
     "Health hazard",
     "Gas cylinder"
    ],
    "right": [
     "Flammable",
     "Burns skin and eyes, corrodes metal",
     "Irritant, or harmful in smaller amounts",
     "Serious long-term health effects, like cancer",
     "Gas under pressure"
    ],
    "pairs": [
     [
      "Flame",
      "Flammable"
     ],
     [
      "Corrosion",
      "Burns skin and eyes, corrodes metal"
     ],
     [
      "Exclamation mark",
      "Irritant, or harmful in smaller amounts"
     ],
     [
      "Health hazard",
      "Serious long-term health effects, like cancer"
     ],
     [
      "Gas cylinder",
      "Gas under pressure"
     ]
    ],
    "answer": [
     [
      "Flame",
      "Flammable"
     ],
     [
      "Corrosion",
      "Burns skin and eyes, corrodes metal"
     ],
     [
      "Exclamation mark",
      "Irritant, or harmful in smaller amounts"
     ],
     [
      "Health hazard",
      "Serious long-term health effects, like cancer"
     ],
     [
      "Gas cylinder",
      "Gas under pressure"
     ]
    ]
   },
   {
    "id": "M8-e",
    "type": "self_check",
    "minutes": 3,
    "prompt": "Foam earplug fit – tick each step as you do it with your own plugs.",
    "items": [
     "Rolled the plug into a thin cylinder",
     "Reached over my head and pulled my ear up and back",
     "Slid the plug in",
     "Held it while it expanded",
     "My own voice sounds muffled and the plug isn't sticking out"
    ],
    "answer": "Completion only"
   },
   {
    "id": "M8-f",
    "type": "find_the_hazard",
    "minutes": 4,
    "prompt": "Find the missing dust controls at this plant (illustrated stand-in until site photos arrive).",
    "count": 4,
    "photoPending": true,
    "answer": [
     "Plugged or missing spray nozzle",
     "Torn conveyor skirt",
     "Missing cover at a transfer point",
     "Dust piled up instead of cleaned with water or a vacuum"
    ]
   },
   {
    "id": "M8-g",
    "type": "scenario_short_answer",
    "minutes": 4,
    "prompt": "Your cab's door seal is torn on a dry, dusty day. What do you do?",
    "model_answer": "Report it to your supervisor and on your pre-trip inspection list or app so it gets repaired. Keep the doors and windows shut. If dust is getting in, ask your supervisor whether you need respiratory protection until it's fixed.",
    "must_include": [
     "report it",
     "pre-trip",
     "keep doors shut",
     "repair",
     "respiratory protection"
    ]
   }
  ]
 },
 "9": {
  "title": "Module 9 · Electrical hazards: lockout, power lines, cables and qualified work",
  "minutes": 35.0,
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
   },
   {
    "id": "M9-f",
    "type": "ordering",
    "minutes": 4,
    "prompt": "Put the conveyor lockout steps in order.",
    "items": [
     "Tell the plant operator and the crew",
     "Stop the conveyor and the feed",
     "Open the right disconnect",
     "Put on your own lock and tag",
     "Release or block stored energy",
     "Try to start it with everyone clear"
    ],
    "answer": [
     "Tell the plant operator and the crew",
     "Stop the conveyor and the feed",
     "Open the right disconnect",
     "Put on your own lock and tag",
     "Release or block stored energy",
     "Try to start it with everyone clear"
    ],
    "explanation": ""
   },
   {
    "id": "M9-g",
    "type": "find_the_hazard",
    "minutes": 4,
    "prompt": "Find the problems with this trailing cable (illustrated stand-in until site photos arrive).",
    "count": 4,
    "photoPending": true,
    "answer": [
     "Cut outer jacket",
     "Crushed or flattened section",
     "Exposed conductor",
     "Tape patch instead of a permanent splice"
    ]
   },
   {
    "id": "M9-h",
    "type": "scenario_short_answer",
    "minutes": 4,
    "prompt": "You're driving a truck and the raised bed touches an overhead power line. What do you do?",
    "model_answer": "Stay in the cab. Warn everyone to stay away from the truck, and call for help by radio so the power can be shut off. Only leave if fire forces you out: jump clear with your feet together, never touch the truck and the ground at the same time, and shuffle away.",
    "must_include": [
     "stay in the cab",
     "warn others away",
     "call for help",
     "jump clear",
     "shuffle"
    ]
   },
   {
    "id": "M9-i",
    "type": "matching",
    "minutes": 3,
    "prompt": "Who does it? Match each task to the right person.",
    "left": [
     "Resetting a breaker that keeps tripping",
     "Repairing a damaged trailing cable",
     "Opening an electrical panel to troubleshoot",
     "Reporting a damaged cord",
     "Staying clear of an open panel and reporting it"
    ],
    "right": [
     "Qualified person only",
     "Any trained miner"
    ],
    "pairs": [
     [
      "Resetting a breaker that keeps tripping",
      "Qualified person only"
     ],
     [
      "Repairing a damaged trailing cable",
      "Qualified person only"
     ],
     [
      "Opening an electrical panel to troubleshoot",
      "Qualified person only"
     ],
     [
      "Reporting a damaged cord",
      "Any trained miner"
     ],
     [
      "Staying clear of an open panel and reporting it",
      "Any trained miner"
     ]
    ],
    "answer": [
     [
      "Resetting a breaker that keeps tripping",
      "Qualified person only"
     ],
     [
      "Repairing a damaged trailing cable",
      "Qualified person only"
     ],
     [
      "Opening an electrical panel to troubleshoot",
      "Qualified person only"
     ],
     [
      "Reporting a damaged cord",
      "Any trained miner"
     ],
     [
      "Staying clear of an open panel and reporting it",
      "Any trained miner"
     ]
    ]
   },
   {
    "id": "M9-j",
    "type": "self_check",
    "minutes": 3,
    "prompt": "Lock, tag and try – tick each item before you work on equipment you've been trained to lock out.",
    "items": [
     "The operator and crew know I'm working on it",
     "Equipment stopped at the controls",
     "The right disconnect is open",
     "My own lock and signed tag are on",
     "Stored energy released or blocked",
     "Try-start with everyone clear: nothing moved"
    ],
    "answer": "Completion only"
   },
   {
    "id": "M9-k",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "Your coworker's lock is on a disconnect and he's gone for lunch. Who can take it off?",
    "options": [
     "You, if the job looks done",
     "The plant operator",
     "Only the person who put it on, or authorized personnel under the procedure",
     "Anyone with bolt cutters"
    ],
    "answer": 2,
    "explanation": "30 CFR 56/57.12016: locks and tags are removed only by the person who installed them or by authorized personnel."
   },
   {
    "id": "M9-l",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "What does ground-fault protection do?",
    "options": [
     "Makes a cable safe to handle while energized",
     "Detects current leaking out of the circuit and trips the power",
     "Stops cables from wearing out",
     "Replaces lockout"
    ],
    "answer": 1,
    "explanation": "When current leaks to the frame or the ground, the protection trips. A trip means a fault, so report it and let a qualified person find out why."
   },
   {
    "id": "M9-m",
    "type": "scenario_short_answer",
    "minutes": 3,
    "prompt": "The crusher operator asks you to reset a breaker that just tripped. What do you say?",
    "model_answer": "No. A trip means a fault. I'm not qualified to reset it. Report it so a qualified person can find out why it tripped before the power goes back on.",
    "must_include": [
     "not qualified",
     "a trip means a fault",
     "report it",
     "qualified person"
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
  "title": "Module 12 · Task training, workplace exams, case studies and stopping unsafe work",
  "minutes": 89.0,
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
   },
   {
    "id": "M12-n1",
    "type": "find_the_hazard",
    "minutes": 5,
    "prompt": "Workplace exam practice: the plant. Find the hazards in this working place (illustrated stand-in until site photos arrive).",
    "count": 5,
    "photoPending": true,
    "answer": [
     "Missing guard at a conveyor tail pulley",
     "Spillage piled under a running conveyor",
     "Walkway handrail missing or damaged",
     "Electrical panel door left open",
     "Someone working on equipment without a lock on the disconnect"
    ],
    "photos": [
     {
      "src": "/media/photos/allen-cbq-screen-plant.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "Clover Bottom screen plant: overhead conveyor on a steel frame, stairs to a control booth, jersey barriers and an ALL TRAFFIC sign along the haul road",
      "answer": "Clover Bottom screen plant. Walk it like an examiner: guards, spillage under belts, walkways and handrails, stop cords or railings, traffic routes.",
      "label": "Orientation photo only (not a hazard answer key)"
     },
     {
      "src": "/media/photos/allen-cbq-primary-crusher-pit.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "Clover Bottom primary crusher with a haul truck at the dump point, feeder and conveyors below, highwall and mine portal behind",
      "answer": "Clover Bottom primary crusher and dump point. Check the dump berm or stop, the walkways and guards, and spillage under the conveyors.",
      "label": "Orientation photo only (not a hazard answer key)"
     }
    ]
   },
   {
    "id": "M12-n2",
    "type": "find_the_hazard",
    "minutes": 5,
    "prompt": "Workplace exam practice: the pit or the face. Find the hazards in this working place (illustrated stand-in until site photos arrive).",
    "count": 5,
    "photoPending": true,
    "answer": [
     "Dump-site berm too low or broken",
     "Loose rock on the face, back or rib that hasn't been scaled",
     "Loose ground not posted or barricaded",
     "Haul road edge with no berm",
     "Water pooled near the travelway edge with no warning"
    ],
    "photos": [
     {
      "src": "/media/photos/allen-cbq-primary-crusher-pit.jpg",
      "site": "Clover Bottom Quarry",
      "alt": "Clover Bottom pit: highwall with the mine portal above the primary crusher, haul truck at the dump point",
      "answer": "Clover Bottom pit, highwall and portal. Check the highwall and portal brow for loose rock, the dump-point berm or stop, and traffic.",
      "label": "Orientation photo only (not a hazard answer key)"
     }
    ]
   },
   {
    "id": "M12-n3",
    "type": "find_the_hazard",
    "minutes": 5,
    "prompt": "Workplace exam practice: the shop. Find the hazards in this working place (illustrated stand-in until site photos arrive).",
    "count": 5,
    "photoPending": true,
    "answer": [
     "Raised truck bed or bucket not blocked",
     "Grinder missing its guard",
     "Oil spill on the floor",
     "Unlabeled container",
     "Hot work with no fire extinguisher nearby"
    ],
    "photos": [
     {
      "src": "/media/photos/allen-bbq-underground-shop.jpg",
      "site": "Boonesboro Quarry",
      "alt": "Lit underground shop area with overhead lights, ventilation duct and equipment parked inside",
      "answer": "Orientation photo only (not a hazard answer key).",
      "label": "Orientation photo only (not a hazard answer key)"
     }
    ]
   },
   {
    "id": "M12-o",
    "type": "jsa_worksheet",
    "minutes": 8,
    "prompt": "Fill out a workplace-exam record for the plant working place in M12-n1. For each area you examined, write the condition you found and the fix or posting.",
    "columns": [
     "Area examined",
     "Condition found",
     "Fix, posting, or date corrected"
    ],
    "answer_key": [
     [
      "Conveyor tail pulley",
      "Guard missing",
      "Lock out, reinstall the guard before restart; record the date corrected"
     ],
     [
      "Under the conveyor",
      "Spillage piled up",
      "Lock out before cleanup; schedule cleanup; record the date corrected"
     ],
     [
      "Walkway",
      "Handrail damaged",
      "Barricade or post the walkway until repaired; tell miners who use it"
     ],
     [
      "Electrical panel",
      "Door open",
      "Keep people clear; qualified person closes and checks it; record it"
     ]
    ]
   },
   {
    "id": "M12-p",
    "type": "scenario_short_answer",
    "minutes": 4,
    "prompt": "Case study: \"Fatal Fall of Rib Accident, April 11, 2014\" (MSHA report). What was the first missed control, and what would you have done?",
    "model_answer": "Per the report, scaling was done from a position exposed to falling material (a man basket about 38 feet up beside the rib). Scale from a location that is not exposed to falling material; post and barricade loose ground until it's corrected; stop and ask if you can't do it from a safe place.",
    "must_include": [
     "safe location",
     "not exposed to falling material",
     "barricade loose ground",
     "stop and ask"
    ]
   },
   {
    "id": "M12-q",
    "type": "scenario_short_answer",
    "minutes": 4,
    "prompt": "Case study: \"Powered Haulage Accident, September 12, 2023\" (MSHA report). What was the first missed control, and what would you have done?",
    "model_answer": "Per the report, the dump-site berm was too small to stop the truck from going over the edge, and the workplace exam didn't catch it. Don't dump at an edge with an inadequate berm: dump short, report the berm, and don't use that spot until it's fixed. Wear your seat belt.",
    "must_include": [
     "berm",
     "workplace exam",
     "dump short",
     "report"
    ]
   },
   {
    "id": "M12-r",
    "type": "scenario_short_answer",
    "minutes": 4,
    "prompt": "Case study: \"Fatal Slip or Fall of Person Accident, June 8, 2023\" (MSHA report). What was the first missed control, and what would you have done?",
    "model_answer": "Per the report, the magnet belt conveyor was not de-energized, locked out and blocked against motion, and it started on its own timer, and there was no safe means of access. Lock out and block every piece of equipment you'll work on, including anything that can start automatically; try-start; use a safe means of access, not the conveyors.",
    "must_include": [
     "lock out",
     "block against motion",
     "automatic start",
     "safe access"
    ]
   },
   {
    "id": "M12-s",
    "type": "ordering",
    "minutes": 3,
    "prompt": "Put the steps for stopping unsafe work in order.",
    "items": [
     "Stop in a safe way",
     "Warn anyone else who could be exposed",
     "Tell your lead or supervisor right away",
     "Say exactly what you saw and why it's unsafe",
     "Agree on the fix before work restarts"
    ],
    "answer": [
     "Stop in a safe way",
     "Warn anyone else who could be exposed",
     "Tell your lead or supervisor right away",
     "Say exactly what you saw and why it's unsafe",
     "Agree on the fix before work restarts"
    ],
    "explanation": ""
   },
   {
    "id": "M12-t1",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "When does the workplace exam have to be done?",
    "options": [
     "Once a week",
     "At least once each shift, before miners begin work in that place",
     "Only after an accident",
     "Whenever MSHA visits"
    ],
    "answer": 1,
    "explanation": "30 CFR 56/57.18002(a): a competent person examines each working place at least once each shift before miners begin work there."
   },
   {
    "id": "M12-t2",
    "type": "multiple_choice",
    "minutes": 1.5,
    "prompt": "What happens to the workplace-exam record?",
    "options": [
     "Nothing; exams aren't written down",
     "It's made before the end of the shift and kept for at least one year",
     "It's only kept if a hazard is found",
     "It's thrown away at the end of the week"
    ],
    "answer": 1,
    "explanation": "30 CFR 56/57.18002(b)-(d): record before the end of the shift, including conditions found and the date corrected; keep it at least one year."
   }
  ]
 }
};
