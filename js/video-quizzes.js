// Per-video knowledge checks for the Allen Company Part 48 videos (draft v1).
// Each quiz is written only from that video's own script/captions (media/captions/<id>.vtt)
// plus 30 CFR facts the script itself states. A quiz unlocks once the tracked player marks
// the video complete. Format: { questions: [{ q, options: [4 strings], answer: <index>, explanation }],
// thinSource?: "why this quiz is shorter" }. Option order is shuffled when shown.
const VIDEO_QUIZ_PASSING_SCORE = 80;
const VIDEO_QUIZZES = {
 "allen-m1-1": {
  "questions": [
   {
    "q": "Why do you hang your tag on the tag board when you arrive at Boonesboro?",
    "options": [
     "So the site knows who is on site in an emergency",
     "To clock in for pay",
     "To reserve a piece of equipment",
     "To sign out a radio"
    ],
    "answer": 0,
    "explanation": "The video says hanging your tag (and taking it down when you leave) is how the site knows who is on site in an emergency."
   },
   {
    "q": "What are the Boonesboro speed limits stated in the video?",
    "options": [
     "15 mph everywhere",
     "15 mph on the surface, 25 underground",
     "25 mph on the surface, 15 underground",
     "10 mph on the surface, 20 underground"
    ],
    "answer": 1,
    "explanation": "Boonesboro's limit is 15 mph on the surface and 25 mph underground; haul trucks have the right of way."
   },
   {
    "q": "In a pickup, what should you do before approaching a haul truck?",
    "options": [
     "Flash your headlights and pass",
     "Honk twice",
     "Call the haul truck on the radio and get an answer back",
     "Wait behind it until it stops"
    ],
    "answer": 2,
    "explanation": "Call on the radio and make contact with the operator, getting an answer back, before approaching any equipment."
   },
   {
    "q": "For a serious injury or fire at Boonesboro, what is the first call?",
    "options": [
     "The mine office",
     "Your supervisor's cell phone",
     "MSHA",
     "911"
    ],
    "answer": 3,
    "explanation": "Call 911 first and tell them the site name, address and where the injured person is, then call the mine office so someone meets the ambulance."
   },
   {
    "q": "Where does the video say pedestrians must walk?",
    "options": [
     "On the marked walkways; nobody walks on a haul road",
     "On the haul road shoulder",
     "Anywhere, if wearing hi-vis",
     "Only underground"
    ],
    "answer": 0,
    "explanation": "Pedestrians stay on marked walkways, and nobody walks on a haul road."
   }
  ]
 },
 "allen-m1-2": {
  "questions": [
   {
    "q": "What is the speed limit at Dix River Stone according to the video?",
    "options": [
     "25 mph underground",
     "15 mph everywhere on site",
     "10 mph on the surface",
     "20 mph everywhere"
    ],
    "answer": 1,
    "explanation": "At Dix River the speed limit is 15 miles per hour everywhere on site."
   },
   {
    "q": "What CB channel are the CB and scale house on at Dix River?",
    "options": [
     "Channel 19",
     "Channel 30",
     "Channel 16",
     "Channel 9"
    ],
    "answer": 2,
    "explanation": "The video says the CB and the scale house are on channel 16."
   },
   {
    "q": "What is the gathering point named for Dix River Stone?",
    "options": [
     "The scale house",
     "The primary crusher",
     "The shop",
     "The tag board"
    ],
    "answer": 3,
    "explanation": "In an emergency at Dix River, go to the gathering point: the tag board."
   },
   {
    "q": "Which warning signals does the video list?",
    "options": [
     "Equipment horns and backup alarms, the plant start-up horn, and the blast warning signal",
     "Only a siren",
     "Text messages only",
     "Hand signals only"
    ],
    "answer": 0,
    "explanation": "Warning signals include horns and backup alarms on equipment, the plant start-up horn and the blast warning signal."
   },
   {
    "q": "After calling 911 for a serious injury, what do you do next?",
    "options": [
     "Drive the person out yourself",
     "Call the mine office so someone meets the ambulance at the gate",
     "Go back to work",
     "Call the hospital"
    ],
    "answer": 1,
    "explanation": "Call 911 first, then call the mine office so someone meets the ambulance at the gate."
   }
  ]
 },
 "allen-m1-4": {
  "questions": [
   {
    "q": "What kind of operation is Clover Bottom, according to the video?",
    "options": [
     "Surface quarry only",
     "Underground mine only",
     "Both a surface quarry and an underground mine",
     "A sand and gravel pit"
    ],
    "answer": 2,
    "explanation": "Clover Bottom is both a surface quarry and an underground mine."
   },
   {
    "q": "About how high are the benches in the Clover Bottom surface pit?",
    "options": [
     "About 20 feet",
     "About 35 feet",
     "About 100 feet",
     "About 65 feet"
    ],
    "answer": 3,
    "explanation": "The video says benches in the pit are about 65 feet high."
   },
   {
    "q": "Where does the video warn about overhead power lines at Clover Bottom?",
    "options": [
     "On the surface and in Mine 1",
     "Only at the scale house",
     "Only in Mine 2",
     "There are none"
    ],
    "answer": 0,
    "explanation": "Watch for overhead power lines on the surface and in Mine 1."
   },
   {
    "q": "What is the rule about highwalls in the walkthrough?",
    "options": [
     "Work near them only in the morning",
     "Never work near a highwall or with your back to one",
     "Lean equipment against them",
     "Stand at the toe to watch blasting"
    ],
    "answer": 1,
    "explanation": "Never work near a highwall or with your back to one."
   },
   {
    "q": "Who has the right of way on Clover Bottom roads?",
    "options": [
     "Pickups",
     "Pedestrians on the haul road",
     "Haul trucks",
     "Road trucks at the scale"
    ],
    "answer": 2,
    "explanation": "Traffic is two-way and keeps right, and haul trucks have the right of way."
   }
  ]
 },
 "allen-m1-5": {
  "questions": [
   {
    "q": "What is step one for any serious injury, fire or emergency?",
    "options": [
     "Call mine command",
     "Call MSHA",
     "Find your supervisor",
     "Call 911"
    ],
    "answer": 3,
    "explanation": "Step one is call 911 and say the site name, address and where the injured person is."
   },
   {
    "q": "After 911, who do you call?",
    "options": [
     "Mine command, starting at the top of your site's list until you reach someone",
     "The hospital",
     "Your family",
     "Nobody else"
    ],
    "answer": 0,
    "explanation": "Step two is mine command, working down the list until you reach someone; they send someone to meet the ambulance and make notifications."
   },
   {
    "q": "For a death, an injury that could cause death, or an entrapment, how quickly must the company notify MSHA?",
    "options": [
     "Within 24 hours",
     "Within 15 minutes",
     "By the end of the shift",
     "Within 10 days"
    ],
    "answer": 1,
    "explanation": "Under 30 CFR 50.10 the operator must notify MSHA within 15 minutes; that is management's job, so tell them right away."
   },
   {
    "q": "If the injured person is underground, how do they come out?",
    "options": [
     "By the secondary escapeway only",
     "By whichever route is shortest",
     "By the primary escapeway",
     "They wait for mine rescue"
    ],
    "answer": 2,
    "explanation": "The video says any miner can meet the ambulance at the portal, and the injured person comes out by the primary escapeway."
   },
   {
    "q": "Who can make the 911 call?",
    "options": [
     "Only a supervisor",
     "Only the safety manager",
     "Only the mine office",
     "Any miner"
    ],
    "answer": 3,
    "explanation": "Any miner can make that call. Stay on the line and do what dispatch tells you."
   }
  ]
 },
 "allen-m1-6": {
  "questions": [
   {
    "q": "At Boonesboro, what is the first thing to know every shift?",
    "options": [
     "Which level you are working on today",
     "Which truck you are driving",
     "The day's production target",
     "The lunch schedule"
    ],
    "answer": 0,
    "explanation": "Your level decides your escapeways, your travel route and where you'll be counted."
   },
   {
    "q": "How are the Boonesboro underground escapeways marked on the ribs?",
    "options": [
     "Primary red, secondary yellow",
     "Primary white reflectors, secondary blue reflectors",
     "Both green",
     "Primary blue, secondary white"
    ],
    "answer": 1,
    "explanation": "Primary is marked with white reflectors on the ribs and secondary with blue, plus reflective signs and arrows; maps show green arrows."
   },
   {
    "q": "What should you do at the first sign of smoke, a CO alarm or stench gas underground?",
    "options": [
     "Investigate the source",
     "Wait for a radio call",
     "Put on your W65 and get out by your escapeway",
     "Go to the shop"
    ],
    "answer": 2,
    "explanation": "At the first sign of smoke, a CO alarm or stench gas, put on your W65 and get out by your escapeway."
   },
   {
    "q": "What is the rule near the Level 1 overhead power lines?",
    "options": [
     "Dumping is allowed if a spotter is present",
     "Raise beds slowly",
     "Only tarp loads there",
     "No dumping or parking near them, no raised beds and no tarping"
    ],
    "answer": 3,
    "explanation": "The rule is no dumping or parking near them, no raised beds and no tarping."
   },
   {
    "q": "What lesson does the video draw from the 2020 face rock-fall injury?",
    "options": [
     "Never walk up to a face to get a tool",
     "Wear a heavier hard hat",
     "Scale faster",
     "Only work at the face in pairs"
    ],
    "answer": 0,
    "explanation": "A scaler operator walked toward the face to pick up a lost tooth and was hit; never walk up to a face to get a tool."
   },
   {
    "q": "What should you do when you see a barricade or warning sign underground?",
    "options": [
     "Go past carefully",
     "Never go past one unless you're authorized and know the hazard",
     "Move it out of the way",
     "Ignore it if no one is around"
    ],
    "answer": 1,
    "explanation": "A barricade or warning sign means a hazard you might not see; don't pass unless authorized and you know the hazard."
   }
  ]
 },
 "allen-m1-7": {
  "questions": [
   {
    "q": "What is the most important thing to understand about Clover Bottom?",
    "options": [
     "It has no underground work",
     "It runs night shifts",
     "There are two separate MSHA mines sharing one surface",
     "It has no tag board"
    ],
    "answer": 2,
    "explanation": "Mine #1 (15-00112) and Mine #2 (15-19898) are separate MSHA mines with their own escapeways, maps and check-in records."
   },
   {
    "q": "How should you use the single Clover Bottom tag board?",
    "options": [
     "Tag in anywhere on the board",
     "Only the supervisor tags in",
     "Tag in once a week",
     "Tag in under the mine you're actually entering"
    ],
    "answer": 3,
    "explanation": "Mine 1 is on the left, out in the middle, Mine 2 on the right; tag in under the mine you're actually entering."
   },
   {
    "q": "How is the highwall edge marked on the drill bench?",
    "options": [
     "With paint six feet back from the edge, and no one crosses that line",
     "With cones at the toe",
     "With a rope at the edge",
     "It is not marked"
    ],
    "answer": 0,
    "explanation": "The highwall is marked with paint six feet back from the edge, and no one crosses that line."
   },
   {
    "q": "How close may you smoke or use an open flame to explosives magazines?",
    "options": [
     "Never within 10 feet",
     "Never within 50 feet",
     "Anywhere outdoors",
     "Within 25 feet if the magazine is locked"
    ],
    "answer": 1,
    "explanation": "Stay away unless assigned, and never smoke or bring an open flame within 50 feet."
   },
   {
    "q": "What does the video say about scaling after the face rock-fall injuries?",
    "options": [
     "Scale from directly under the loose rock",
     "Skip re-examination if the room looks fine",
     "Scale only when trained and authorized, from a protected position, and re-examine before loading",
     "Pull the lowest rock first and ignore what's above"
    ],
    "answer": 2,
    "explanation": "Rock above can let go when rock below moves; scale only when trained and authorized, from a protected position, and re-examine after scaling and before loading."
   }
  ]
 },
 "allen-m1-8": {
  "questions": [
   {
    "q": "How has production at Dix River changed?",
    "options": [
     "It moved from underground to surface",
     "It closed",
     "It now uses longwall mining",
     "Surface mining stopped; production is now header mining underground on two levels"
    ],
    "answer": 3,
    "explanation": "Surface mining has stopped; production is header mining underground on Level 1 and Level 2."
   },
   {
    "q": "What hazards does the video highlight around stockpiles and the surge silo?",
    "options": [
     "Bridging and engulfment",
     "Lightning only",
     "Flooding only",
     "Radiation"
    ],
    "answer": 0,
    "explanation": "Bridging and engulfment are serious hazards; never walk on a pile or stand under material that could let go."
   },
   {
    "q": "How did both of Dix River's reportable injuries since 2018 happen?",
    "options": [
     "Rock falls at the face",
     "People falling while stepping down at the end of a shift",
     "Conveyor entanglement",
     "Electrical shock"
    ],
    "answer": 1,
    "explanation": "Both were falls stepping down at end of shift. Use handrails, face the cab and keep three points of contact."
   },
   {
    "q": "Which standards were cited most at Dix River from 2021 to mid-October 2026?",
    "options": [
     "Noise only",
     "Recordkeeping only",
     "Electrical, and equipment defects",
     "Explosives storage"
    ],
    "answer": 2,
    "explanation": "Electrical was cited six times and equipment defects five times. Report damaged electrical gear and never repair it unless qualified."
   },
   {
    "q": "What should you do near the ANFO trailer underground?",
    "options": [
     "Move the cones to get by",
     "Park next to it",
     "Use it as a work bench",
     "Give it room, leave the cones in place, and no smoking or open flames within 50 feet"
    ],
    "answer": 3,
    "explanation": "ANFO is a blasting agent. Give it room, leave the cones, and the 50-foot no-smoking/no-flame rule applies."
   }
  ]
 },
 "allen-m1-9": {
  "questions": [
   {
    "q": "Under 30 CFR 48.7, when can you do a new task?",
    "options": [
     "After you've been trained for it",
     "Whenever you're asked",
     "After watching someone once",
     "After one week on site"
    ],
    "answer": 0,
    "explanation": "Under 48.7 you don't do a new task until you've been trained in its health and safety aspects and safe work procedures."
   },
   {
    "q": "If someone asks you to run a machine you haven't been trained on, what should you do?",
    "options": [
     "Try it carefully",
     "Say so; that's following the rule, not refusing work",
     "Run it only on the surface",
     "Ask a coworker to start it for you"
    ],
    "answer": 1,
    "explanation": "Say you haven't been trained. That's not refusing work; it's following the rule."
   },
   {
    "q": "Which equipment items does the video say to check during the pre-operational inspection?",
    "options": [
     "Radio presets only",
     "Seat color",
     "Horn, backup alarm, brakes, lights and tires",
     "Fuel price"
    ],
    "answer": 2,
    "explanation": "Check horn, backup alarm, brakes, lights and tires, and don't run equipment with a safety defect."
   },
   {
    "q": "When should you report a hazard you see?",
    "options": [
     "At the end of the shift",
     "Only if someone is hurt",
     "At the next safety meeting",
     "Right away, and keep people away if it's an immediate danger"
    ],
    "answer": 3,
    "explanation": "Report right away to your supervisor or safety contact; don't assume someone else did."
   },
   {
    "q": "Why must you tag out at the end of every shift?",
    "options": [
     "A tag left on the board means someone might go looking for you underground",
     "For payroll",
     "To return the radio",
     "It's optional"
    ],
    "answer": 0,
    "explanation": "A tag left on the board means someone might go looking for you underground."
   },
   {
    "q": "What must be done before you go underground for the first time?",
    "options": [
     "Nothing beyond this video",
     "Hands-on W65 donning practice with the safety manager, recorded on your training record",
     "A driving test",
     "A written essay"
    ],
    "answer": 1,
    "explanation": "Hands-on W65 practice is recorded on your new miner training record; don't go underground until it's done."
   }
  ]
 },
 "allen-m2-1": {
  "questions": [
   {
    "q": "According to Section 2 of the Mine Act, what is the first priority of everyone in mining?",
    "options": [
     "Production",
     "Profit",
     "The health and safety of the miner",
     "Equipment care"
    ],
    "answer": 2,
    "explanation": "Section 2 says the first priority and concern must be the health and safety of its most precious resource, the miner."
   },
   {
    "q": "Who does Section 2 say has the primary responsibility to prevent unsafe conditions?",
    "options": [
     "MSHA inspectors",
     "Equipment vendors",
     "Insurance companies",
     "Operators, with the help of miners"
    ],
    "answer": 3,
    "explanation": "Operators, with the help of miners, have the primary responsibility to prevent unsafe and unhealthy conditions."
   },
   {
    "q": "How is a representative of miners designated?",
    "options": [
     "Two or more miners designate one, and it's filed with MSHA under Part 40",
     "The operator appoints one",
     "MSHA assigns one",
     "Only union members can"
    ],
    "answer": 0,
    "explanation": "Two or more miners can designate a representative, filed with MSHA under 30 CFR Part 40."
   },
   {
    "q": "How long do you have to file a retaliation complaint with MSHA?",
    "options": [
     "7 days",
     "60 days",
     "30 days",
     "One year"
    ],
    "answer": 1,
    "explanation": "Under Section 105(c) of the Mine Act, a miner can file a discrimination complaint with MSHA within 60 days."
   },
   {
    "q": "What can a miners' representative do?",
    "options": [
     "Issue citations",
     "Shut down the mine",
     "Accompany MSHA inspectors, request inspections, and receive certain records",
     "Hire and fire"
    ],
    "answer": 2,
    "explanation": "The representative can accompany inspectors, request inspections and receive copies of certain records and notices."
   }
  ]
 },
 "allen-m3-1": {
  "questions": [
   {
    "q": "What does the W65 filter self-rescuer do?",
    "options": [
     "Supplies oxygen",
     "Filters only dust",
     "Cools the air",
     "Turns carbon monoxide into carbon dioxide; it does not make oxygen"
    ],
    "answer": 3,
    "explanation": "The W65 converts CO to CO2. It does not make oxygen, so it can't help in oxygen-deficient air."
   },
   {
    "q": "While escaping, the air through your W65 gets hot and dry. What should you do?",
    "options": [
     "Keep it on with the nose clip and keep breathing through it until you reach fresh air",
     "Take it off",
     "Remove the nose clip",
     "Switch to breathing through your nose"
    ],
    "answer": 0,
    "explanation": "Hot, dry air is normal and means the unit is working. Never take it off because of the heat."
   },
   {
    "q": "How often is a W65 weighed, and what gain takes it out of service?",
    "options": [
     "Every shift; any gain",
     "Every 90 days; more than 10 grams",
     "Yearly; more than 50 grams",
     "Never weighed"
    ],
    "answer": 1,
    "explanation": "Every 90 days it's weighed to the nearest gram; a gain of more than 10 grams means moisture got in."
   },
   {
    "q": "How close must your W65 be to you underground at Allen?",
    "options": [
     "Within 100 feet",
     "In the shop",
     "Within 25 feet",
     "In your vehicle"
    ],
    "answer": 2,
    "explanation": "At Allen your W65 is issued on a belt and must always be within 25 feet of you underground."
   },
   {
    "q": "Which of these is a reason to take a W65 out of service?",
    "options": [
     "The case is a little dusty",
     "It was carried for a full shift",
     "It was inspected that morning",
     "The seal on the red lever is broken or missing"
    ],
    "answer": 3,
    "explanation": "Out-of-service reasons: unreadable dates or weight, past 15 years from manufacture or 10 years in service, failed tightness test, broken or missing seal, or ever opened or used."
   }
  ]
 },
 "allen-m6-1": {
  "questions": [
   {
    "q": "Why can miners far from an underground fire be in danger before they see smoke?",
    "options": [
     "Smoke and carbon monoxide travel with the air",
     "Fires spread through rock",
     "Radios stop working",
     "Lights go out first"
    ],
    "answer": 0,
    "explanation": "Smoke and CO travel with the ventilating air and can reach people before they see or smell smoke."
   },
   {
    "q": "Where is stench gas released at Allen underground mines?",
    "options": [
     "At the face",
     "Into the intake fan, so ventilation carries it to every working place",
     "In the breakroom",
     "At the scale house"
    ],
    "answer": 1,
    "explanation": "It's released into the intake fan and the ventilation carries it to every working place."
   },
   {
    "q": "What does the smell of stench gas mean?",
    "options": [
     "Check whether it's real first",
     "A drill is planned for tomorrow",
     "Evacuate: stop work, shut down safely, keep your self-rescuer, and head out by your escape route",
     "Report to the shop"
    ],
    "answer": 2,
    "explanation": "Stench gas means evacuate. Don't wait to see if it's real."
   },
   {
    "q": "How often are evacuation drills held?",
    "options": [
     "Once a year",
     "Only after a fire",
     "Every week",
     "At least every six months, on each shift"
    ],
    "answer": 3,
    "explanation": "Under 30 CFR 57.4361, drills are held at least every six months on each shift and include setting off the fire alarm."
   },
   {
    "q": "What is the surface fire warning at every Allen site?",
    "options": [
     "A radio call",
     "Stench gas",
     "A siren only",
     "A text message"
    ],
    "answer": 0,
    "explanation": "On the surface, the fire warning at every Allen site is a radio call."
   }
  ]
 },
 "allen-m6-2": {
  "questions": [
   {
    "q": "What three things does a fire need?",
    "options": [
     "Wind, fuel and water",
     "Heat, fuel and oxygen",
     "Heat, smoke and light",
     "Oxygen, nitrogen and fuel"
    ],
    "answer": 1,
    "explanation": "Heat, fuel and oxygen. Take one away and the fire goes out."
   },
   {
    "q": "A diesel or oil fire is which class?",
    "options": [
     "Class A",
     "Class C",
     "Class B",
     "Class D"
    ],
    "answer": 2,
    "explanation": "Class B covers flammable liquids like diesel, oil and grease."
   },
   {
    "q": "What does PASS stand for?",
    "options": [
     "Push, Aim, Spray, Stop",
     "Pull, Alarm, Spray, Step back",
     "Point, Aim, Shoot, Sweep",
     "Pull, Aim low at the base, Squeeze, Sweep"
    ],
    "answer": 3,
    "explanation": "Pull the pin, Aim low at the base of the fire, Squeeze the handle, Sweep side to side."
   },
   {
    "q": "When should you fight a fire yourself?",
    "options": [
     "Only after sounding the alarm, if it's small and not spreading, you have the right extinguisher, and your way out is behind you",
     "Any time an extinguisher is nearby",
     "Only if a supervisor is watching",
     "Never, under any condition"
    ],
    "answer": 0,
    "explanation": "All four conditions must be true; otherwise get out and warn others."
   },
   {
    "q": "An extinguisher was used for just one second. What now?",
    "options": [
     "Put it back; it's still good",
     "Report it; it must be recharged or replaced",
     "Shake it and rehang it",
     "Use it up on purpose"
    ],
    "answer": 1,
    "explanation": "Report every use; a used extinguisher must be recharged or replaced."
   },
   {
    "q": "About how long does a typical extinguisher take to empty?",
    "options": [
     "2 to 3 seconds",
     "1 to 2 minutes",
     "10 to 20 seconds",
     "5 minutes"
    ],
    "answer": 2,
    "explanation": "A typical extinguisher empties in 10 to 20 seconds, so don't waste it."
   }
  ]
 },
 "allen-m6-3": {
  "questions": [
   {
    "q": "Why are abandoned or worked-out areas dangerous?",
    "options": [
     "They're examined more often",
     "They are always flooded",
     "They have high-voltage cables",
     "They can hold bad air, low oxygen, loose roof and ribs, and water, and aren't examined like active areas"
    ],
    "answer": 3,
    "explanation": "Abandoned areas can hold bad air, low oxygen, loose ground and water, and aren't examined like active areas."
   },
   {
    "q": "When may you go past a barricade or danger sign?",
    "options": [
     "Only if you've been assigned and trained to, and the area has been examined",
     "When it's a shortcut",
     "On weekends",
     "If you have a light"
    ],
    "answer": 0,
    "explanation": "Never pass unless assigned and trained to, and the area has been examined."
   },
   {
    "q": "In a fire, what is always your first job?",
    "options": [
     "Barricade",
     "Escape, by your primary escapeway or the secondary if the primary is blocked",
     "Fight the fire",
     "Wait for rescue"
    ],
    "answer": 1,
    "explanation": "Escape first. Barricading is only for when every way out is cut off."
   },
   {
    "q": "Does any Allen mine have a designated refuge?",
    "options": [
     "Yes, every mine",
     "Only Boonesboro",
     "No; none of Allen's mines has a designated refuge",
     "Only Clover Bottom #2"
    ],
    "answer": 2,
    "explanation": "The video states none of Allen's mines has a designated refuge."
   },
   {
    "q": "If you're ever barricaded in, what should you do inside?",
    "options": [
     "Walk around to stay warm",
     "Shout continuously",
     "Use all lights at once",
     "Stay calm and still, use one light at a time, keep your self-rescuer ready, and tap on pipes or bolts at intervals"
    ],
    "answer": 3,
    "explanation": "Conserve air and light, keep your self-rescuer ready, and signal by tapping at intervals."
   }
  ]
 },
 "allen-m6-4": {
  "questions": [
   {
    "q": "At Boonesboro, what decides your escape route?",
    "options": [
     "Your level and your work area on that level",
     "The time of day",
     "Your truck number",
     "The weather"
    ],
    "answer": 0,
    "explanation": "Your escape route depends on the level (1, 2 or 3) and your work area."
   },
   {
    "q": "On the Boonesboro escape maps, what does a P or S in the green arrow's circle mean?",
    "options": [
     "Pump or Sump",
     "Primary or Secondary escapeway",
     "Power or Shop",
     "Portal or Stockpile"
    ],
    "answer": 1,
    "explanation": "Both escapeways have green arrows; P means primary and S means secondary."
   },
   {
    "q": "Why does air direction on the map matter in a fire?",
    "options": [
     "It doesn't",
     "Air shows the shortest route",
     "Smoke travels with the air",
     "It marks the phones"
    ],
    "answer": 2,
    "explanation": "Smoke travels with the air, which is also why stench gas released at the intake fan reaches every working area."
   },
   {
    "q": "What should you do if smoke, fire or fallen rock blocks the primary escapeway?",
    "options": [
     "Push through the smoke",
     "Wait where you are",
     "Remove your W65 to see better",
     "Turn around and take the secondary"
    ],
    "answer": 3,
    "explanation": "Turn around and take the secondary. Don't push through heavy smoke if there's another way."
   },
   {
    "q": "What is the rule about blocking escapeways?",
    "options": [
     "Never block an escapeway; report a missing sign or blocked route right away",
     "Equipment can be parked in them briefly",
     "Stockpiles are fine in escapeways",
     "Only the secondary must be clear"
    ],
    "answer": 0,
    "explanation": "Never block an escapeway with equipment, stockpiled material or anything else."
   }
  ]
 },
 "allen-m6-5": {
  "questions": [
   {
    "q": "What is the first question every shift at Clover Bottom?",
    "options": [
     "What's for lunch?",
     "Which mine am I in today?",
     "Which truck is fueled?",
     "Is it raining?"
    ],
    "answer": 1,
    "explanation": "Escapeways, maps and procedures differ for each mine, so know whether you're in #1 or #2."
   },
   {
    "q": "At the gathering point after evacuating Clover Bottom, what must you tell the person in charge?",
    "options": [
     "Your truck number",
     "Your shift hours",
     "Which mine you came out of",
     "Nothing"
    ],
    "answer": 2,
    "explanation": "Say which mine you came out of so the count for each mine is right."
   },
   {
    "q": "Why does a tag on the wrong side of the Clover Bottom board matter?",
    "options": [
     "It doesn't",
     "It affects pay",
     "It locks the portal",
     "Rescuers could search the wrong mine for you"
    ],
    "answer": 3,
    "explanation": "With two mines on one surface, a wrong tag means rescuers could search the wrong mine."
   },
   {
    "q": "Why are landmarks important in a one-level mine like Clover Bottom?",
    "options": [
     "Rooms and crosscuts can look alike, and landmarks help you keep bearings in poor visibility",
     "For production counts",
     "They are required signage",
     "They mark the speed limit"
    ],
    "answer": 0,
    "explanation": "Rooms and crosscuts look alike; landmarks like the Liwell plant, a belt line or a stockpile turn help."
   },
   {
    "q": "When you come out of a portal in an evacuation, what should you watch for?",
    "options": [
     "Nothing; the surface is safe",
     "Trucks and loaders on the shared surface that may not know an emergency is happening",
     "Only lightning",
     "Only blasting"
    ],
    "answer": 1,
    "explanation": "Stay on the walkways and watch for trucks and loaders on the busy shared surface."
   }
  ]
 },
 "allen-m6-6": {
  "questions": [
   {
    "q": "Why must you recheck the posted escape map at Dix River often?",
    "options": [
     "Maps fade",
     "It's required weekly",
     "The mine is growing; new headings open and escape routes change",
     "The map is only decoration"
    ],
    "answer": 2,
    "explanation": "A growing mine changes every week, so the map from training may not be the one posted today."
   },
   {
    "q": "If wearing your W65 would be hazardous for a particular job, how far away may it be?",
    "options": [
     "No more than 100 feet",
     "At the portal",
     "In your truck",
     "No more than 25 feet"
    ],
    "answer": 3,
    "explanation": "Per 30 CFR 57.15030 and the video, it can be no more than 25 feet away (or within easy reach on mobile equipment)."
   },
   {
    "q": "Where is the Dix River escape map posted?",
    "options": [
     "In the breakroom and in a covered box on the side of the plant trailer on the flat",
     "Only at the scale house",
     "At the primary crusher",
     "Nowhere"
    ],
    "answer": 0,
    "explanation": "The escape map is posted in the breakroom and on the plant trailer on the flat."
   },
   {
    "q": "Does Dix River have a designated refuge chamber?",
    "options": [
     "Yes, on Level 2",
     "No; the plan is to get out",
     "Yes, at the portal",
     "Only during blasting"
    ],
    "answer": 1,
    "explanation": "There's no designated refuge chamber at Dix River, so the plan is to get out."
   },
   {
    "q": "What is the Dix River gathering point?",
    "options": [
     "The primary crusher",
     "The scale house",
     "The tag board",
     "The ANFO trailer"
    ],
    "answer": 2,
    "explanation": "At Dix River, the gathering point is the tag board."
   }
  ]
 },
 "allen-m6-7": {
  "questions": [
   {
    "q": "You smell rotten eggs and see a strobe, but no smoke. What do you do?",
    "options": [
     "Go look for the fire",
     "Radio to ask if it's a drill",
     "Finish the bucket you were loading",
     "Put on your W65, alert the operator, shut down safely and start out by the primary escapeway"
    ],
    "answer": 3,
    "explanation": "Stench gas means get out. Don't wait for smoke to prove it."
   },
   {
    "q": "Your partner wants to take off his W65 for a breath because the air is hot. What do you tell him?",
    "options": [
     "Keep it on; hot, dry air means it's working",
     "Go ahead for a second",
     "Switch units",
     "Breathe through your nose instead"
    ],
    "answer": 0,
    "explanation": "Taking it off even briefly can expose you to CO. Keep the nose clip on and keep moving."
   },
   {
    "q": "In heavy smoke on the primary escapeway, you feel lightheaded. What should you do?",
    "options": [
     "Push on faster",
     "Turn back and take the secondary escapeway, toward different air",
     "Sit down and rest",
     "Take off your W65"
    ],
    "answer": 1,
    "explanation": "The W65 makes no oxygen. Lightheadedness is a warning; the answer is different air via the secondary."
   },
   {
    "q": "How should you move through an escapeway in smoke?",
    "options": [
     "Run as fast as possible",
     "Crawl the whole way",
     "At a steady walk, staying low under smoke and using a hand on the rib if you can't see",
     "Stop and wait for help"
    ],
    "answer": 2,
    "explanation": "Running burns energy and makes you breathe harder through the unit."
   },
   {
    "q": "You're out, and your partner isn't behind you. What do you do?",
    "options": [
     "Go back in to find him",
     "Drive home",
     "Wait at the portal alone",
     "Go to the gathering point and tell the person in charge who's missing, where and when you last saw him, and which route"
    ],
    "answer": 3,
    "explanation": "Going back in alone is how one missing miner becomes two."
   }
  ]
 },
 "allen-m6-8": {
  "questions": [
   {
    "q": "Which standard requires the check-in/check-out system for underground metal/nonmetal mines?",
    "options": [
     "30 CFR 57.11058",
     "30 CFR 48.7",
     "30 CFR 56.14107",
     "30 CFR 50.10"
    ],
    "answer": 0,
    "explanation": "30 CFR 57.11058 requires an accurate surface record of persons in the mine and a positive means of identification."
   },
   {
    "q": "When must you tag out?",
    "options": [
     "Only at the end of the day",
     "Every time you come out, even for a quick trip to the shop",
     "Only in an emergency",
     "Never; the supervisor does it"
    ],
    "answer": 1,
    "explanation": "Tag in every time you go underground and tag out every time you come out."
   },
   {
    "q": "Your tag is missing. What should you do?",
    "options": [
     "Go in anyway",
     "Use a coworker's tag",
     "Don't go underground until you've told your supervisor and the record is right",
     "Write your name on tape"
    ],
    "answer": 2,
    "explanation": "Don't go underground until the record is correct."
   },
   {
    "q": "After an evacuation, why must you go straight to the gathering point?",
    "options": [
     "To get a drink",
     "To move your truck",
     "To check equipment",
     "So you can be counted; if you leave first you become a missing person on paper"
    ],
    "answer": 3,
    "explanation": "The person in charge compares who's there with tags still on the board."
   },
   {
    "q": "Who directs re-entry into the mine to look for a missing person?",
    "options": [
     "The person in charge, using people trained and equipped for it",
     "Any coworker",
     "The missing person's family",
     "The first person out"
    ],
    "answer": 0,
    "explanation": "Re-entry is directed by the person in charge and done by trained, equipped people. Never go back in alone."
   }
  ]
 },
 "allen-m8-1": {
  "questions": [
   {
    "q": "What is the difference between safety and health, as the video explains it?",
    "options": [
     "They are the same",
     "Safety is about today's injuries; health is about what dust, noise, fumes and chemicals do to you over years",
     "Health covers only first aid",
     "Safety covers only equipment"
    ],
    "answer": 1,
    "explanation": "Health hazards act over a working lifetime, which is why the Act sets health standards."
   },
   {
    "q": "You're asked to wear a dust pump or noise dosimeter. What should you do?",
    "options": [
     "Take it off at lunch and leave it in the truck",
     "Work slower so the reading is low",
     "Wear it the whole shift, work normally, and never tamper with it",
     "Cover the inlet"
    ],
    "answer": 2,
    "explanation": "Wear it all shift and work normally; you'll be told the results."
   },
   {
    "q": "At what eight-hour average noise level must the mine enroll you in a hearing conservation program?",
    "options": [
     "70 dBA",
     "100 dBA",
     "115 dBA",
     "85 dBA"
    ],
    "answer": 3,
    "explanation": "85 dBA is the action level under 30 CFR Part 62."
   },
   {
    "q": "On a warning sign, what does the signal word DANGER mean?",
    "options": [
     "A hazard that will kill or seriously injure",
     "A lesser hazard",
     "A reminder only",
     "Nothing specific"
    ],
    "answer": 0,
    "explanation": "Danger means a hazard that will kill or seriously injure; warning and caution mean lesser hazards."
   },
   {
    "q": "Who can you report a health hazard to?",
    "options": [
     "Only coworkers",
     "Your supervisor or MSHA, and the Act protects you from retaliation",
     "Only the media",
     "No one"
    ],
    "answer": 1,
    "explanation": "You can report to your supervisor or MSHA, and the Act protects you from retaliation."
   }
  ]
 },
 "allen-m8-2": {
  "questions": [
   {
    "q": "What is respirable dust?",
    "options": [
     "Dust that settles on your boots",
     "Only blasting smoke",
     "Particles so fine they float and are breathed deep into the lungs",
     "Mud"
    ],
    "answer": 2,
    "explanation": "The dust that matters most is the part you can't see, breathed deep into the lungs."
   },
   {
    "q": "What is silicosis?",
    "options": [
     "A curable infection",
     "A skin rash",
     "A short-term cough",
     "Lung scarring from respirable silica that has no cure and keeps getting worse after exposure stops"
    ],
    "answer": 3,
    "explanation": "Silicosis has no cure and keeps progressing even after exposure stops."
   },
   {
    "q": "How should you clean up dust?",
    "options": [
     "Wet it down, vacuum it, or shovel carefully",
     "Dry sweep it",
     "Blow it off with compressed air",
     "Leave it"
    ],
    "answer": 0,
    "explanation": "Dry sweeping and compressed air put dust back in the air at face level."
   },
   {
    "q": "When does an enclosed, filtered cab protect you from dust?",
    "options": [
     "Always",
     "Only when the doors and windows stay shut",
     "Only underground",
     "Only at night"
    ],
    "answer": 1,
    "explanation": "Running with the window down on a dusty road throws that protection away."
   },
   {
    "q": "Per the video, which dust limits are in force at metal/nonmetal mines today?",
    "options": [
     "The 2024 silica rule limits",
     "There are no limits",
     "The existing limits in 30 CFR 56/57.5001, since the new rule's MNM changes are stayed and delayed",
     "OSHA limits only"
    ],
    "answer": 2,
    "explanation": "The video says compliance with the 2024 rule was stayed and MNM changes delayed, so existing standards remain in force."
   },
   {
    "q": "Where does the video say respirators are required at every Allen site?",
    "options": [
     "In the breakroom",
     "At the scale house",
     "Nowhere",
     "Outside the screen plant while it's running"
    ],
    "answer": 3,
    "explanation": "At every Allen site, respirators are required outside the screen plant while it's running."
   }
  ]
 },
 "allen-m8-3": {
  "questions": [
   {
    "q": "Why is noise-induced hearing loss dangerous?",
    "options": [
     "It's painless and gradual, and damaged hair cells don't grow back",
     "It hurts right away",
     "It heals overnight",
     "It only affects older workers"
    ],
    "answer": 0,
    "explanation": "By the time you notice it, the damage is permanent."
   },
   {
    "q": "What simple test tells you noise is loud enough to damage hearing?",
    "options": [
     "You can hear a radio",
     "You have to raise your voice to be understood by someone an arm's length away",
     "Your ears feel warm",
     "The machine vibrates"
    ],
    "answer": 1,
    "explanation": "If you must raise your voice at arm's length, protect your ears."
   },
   {
    "q": "Above what level must a miner wear an earplug and an earmuff together under Part 62?",
    "options": [
     "85 dBA",
     "90 dBA",
     "105 dBA",
     "115 dBA"
    ],
    "answer": 2,
    "explanation": "Above 105 dBA, dual hearing protection is required."
   },
   {
    "q": "In the noise rule, which controls come first?",
    "options": [
     "Hearing protectors",
     "Ear checks",
     "Earbuds",
     "Engineering and administrative controls"
    ],
    "answer": 3,
    "explanation": "Hearing protectors are the last line of defense, not the first."
   },
   {
    "q": "How do you insert a foam earplug?",
    "options": [
     "Roll it thin, pull the ear up and back, slide it in, and hold it while it expands",
     "Push it in flat",
     "Put it halfway in",
     "Wet it first"
    ],
    "answer": 0,
    "explanation": "A plug that's only halfway in protects only halfway."
   }
  ]
 },
 "allen-m8-4": {
  "questions": [
   {
    "q": "What is the DPM exposure limit for underground metal/nonmetal mines under 30 CFR 57.5060?",
    "options": [
     "50 µg/m³ total carbon",
     "160 µg/m³ total carbon, 8-hour equivalent",
     "500 µg/m³",
     "There is none"
    ],
    "answer": 1,
    "explanation": "Personal exposure can't exceed an average of 160 micrograms of total carbon per cubic meter over an 8-hour equivalent shift."
   },
   {
    "q": "A haul truck has left a black cloud every time it pulls out for a week. Should it be tagged?",
    "options": [
     "No, that's normal for it",
     "Only if MSHA is on site",
     "Yes; hang a dated tag, report it, and let an authorized mechanic examine it",
     "Only if it breaks down"
    ],
    "answer": 2,
    "explanation": "Under 57.5066, smoke unusual for that machine is the evidence the rule describes."
   },
   {
    "q": "What is the simplest control for diesel exhaust underground?",
    "options": [
     "Idle the engine",
     "Open the cab door",
     "Use any fuel additive",
     "Shut the engine off when waiting, when it's safe and allowed"
    ],
    "answer": 3,
    "explanation": "An idling engine underground makes exhaust and does no work."
   },
   {
    "q": "Under 57.5065, what sulfur content is allowed in diesel fuel used underground?",
    "options": [
     "No more than 0.05 percent",
     "Up to 5 percent",
     "Any amount",
     "No more than 1 percent"
    ],
    "answer": 0,
    "explanation": "Diesel fuel used underground can't exceed 0.05 percent sulfur, and only EPA-registered additives may be used."
   },
   {
    "q": "You get a headache and dizziness around diesel equipment. What do you do?",
    "options": [
     "Keep working",
     "Get to fresh air and tell your supervisor",
     "Take a break next to the running truck",
     "Ignore it"
    ],
    "answer": 1,
    "explanation": "Carbon monoxide in exhaust can cause those symptoms."
   }
  ]
 },
 "allen-m8-5": {
  "questions": [
   {
    "q": "Which MSHA rule covers hazard communication?",
    "options": [
     "Part 62",
     "Part 50",
     "Part 47",
     "Part 77"
    ],
    "answer": 2,
    "explanation": "Part 47 requires a written HazCom program, labels and safety data sheets."
   },
   {
    "q": "Where is the paper SDS binder at every Allen site?",
    "options": [
     "In the shop",
     "In the scale house",
     "In each truck",
     "In the breakroom"
    ],
    "answer": 3,
    "explanation": "The SDS binder is in the breakroom at every site; the written program is on Dropbox, kept by the safety manager."
   },
   {
    "q": "Which four SDS sections does the video say to read first?",
    "options": [
     "1, 2, 4 and 8",
     "3, 5, 9 and 16",
     "1, 6, 10 and 12",
     "Only section 16"
    ],
    "answer": 0,
    "explanation": "Identification, hazards, first aid, and exposure controls/PPE."
   },
   {
    "q": "You find an unlabeled jug of clear liquid on a bench. What do you do?",
    "options": [
     "Sniff it",
     "Leave it and report it so it can be identified and labeled",
     "Pour it out",
     "Use it if it looks like water"
    ],
    "answer": 1,
    "explanation": "Don't sniff, use or pour it out; report it."
   },
   {
    "q": "Why should you never run your hand along a hydraulic hose to find a leak?",
    "options": [
     "The oil is cold",
     "It gets your glove dirty",
     "A pinhole leak can inject hot, high-pressure oil through your skin",
     "It voids the warranty"
    ],
    "answer": 2,
    "explanation": "Oil injected under the skin is a medical emergency even if the wound looks small."
   },
   {
    "q": "A degreaser splashes on a mechanic's forearm. What comes first?",
    "options": [
     "Find the SDS",
     "Report it at end of shift",
     "Wipe it with a rag",
     "Rinse with plenty of running water right away"
    ],
    "answer": 3,
    "explanation": "Rinse first, then check SDS section 4 and report it."
   }
  ]
 },
 "allen-m9-1": {
  "questions": [
   {
    "q": "On your way to the screen deck you see a junction box with its cover off and wires showing. What do you do?",
    "options": [
     "Stay clear and report it; only a qualified person corrects it",
     "Put the cover back on yourself",
     "Push the wires back in",
     "Ignore it if the plant is running"
    ],
    "answer": 0,
    "explanation": "Cover plates stay on except during work, and a dangerous condition is corrected by a qualified person before use."
   },
   {
    "q": "A coworker wants to open a hot starter to reset a belt motor. What's the right answer?",
    "options": [
     "Fine, if he's quick",
     "No; deenergize, lock and tag by the person doing the work, test before touching, and only qualified people troubleshoot",
     "Yes, with gloves on",
     "Only during lunch"
    ],
    "answer": 1,
    "explanation": "Electrical equipment is deenergized before work, and only qualified people troubleshoot it."
   },
   {
    "q": "A pump cable was run over and someone wrapped the damage in electrical tape. What now?",
    "options": [
     "It's fixed",
     "Add more tape",
     "Take it out of service and report it; tape isn't a proper repair",
     "Keep using it until end of shift"
    ],
    "answer": 2,
    "explanation": "Permanent splices must be mechanically strong, insulated, sealed and made by a qualified person."
   },
   {
    "q": "If your vehicle contacts an overhead line and is not on fire, what should you do?",
    "options": [
     "Jump out and run",
     "Climb out and hold the door",
     "Walk around to check the damage",
     "Stay inside"
    ],
    "answer": 3,
    "explanation": "Stay inside unless it's on fire; if you must get out, jump clear with feet together and shuffle away."
   },
   {
    "q": "A sump pump cable runs through standing water with a cut jacket and a broken ground pin. What do you do?",
    "options": [
     "Don't touch the cable or water; have a qualified electrician deenergize, lock out and tag the pump",
     "Pull the plug out of the water",
     "Move the cable with your boot",
     "Tape the jacket"
    ],
    "answer": 0,
    "explanation": "Never use damaged cables or plugs with missing ground pins; keep cables out of water."
   }
  ]
 },
 "allen-m9-2": {
  "questions": [
   {
    "q": "What lesson does the 2018 Boonesboro tail-pulley injury teach?",
    "options": [
     "Wear thicker gloves",
     "Lock out, tag out, and block motion before putting hands near a pulley, even if it's turned by hand",
     "Only the night shift does pulley work",
     "Pull cords are enough"
    ],
    "answer": 1,
    "explanation": "The motion came from a person turning the pulley by hand. Blocking keeps parts still."
   },
   {
    "q": "Is a stop button or pull cord a lockout?",
    "options": [
     "Yes",
     "Only the pull cord is",
     "No; open the conveyor's disconnect and put on your own lock and tag",
     "Only if it's red"
    ],
    "answer": 2,
    "explanation": "A stop button can be overridden by automatic controls, timers or another panel."
   },
   {
    "q": "Three people are working on the same conveyor. How many locks go on?",
    "options": [
     "One, for the crew",
     "Two",
     "None if the supervisor is present",
     "Three, one per person, usually on a hasp"
    ],
    "answer": 3,
    "explanation": "One lock per person, and each key stays with its owner."
   },
   {
    "q": "After locking out and blocking, what is the try step?",
    "options": [
     "With everyone clear, press start at the local controls; nothing should move",
     "Try to remove the guard",
     "Try to turn the pulley by hand",
     "Try the radio"
    ],
    "answer": 0,
    "explanation": "If something moves, you locked out the wrong thing or missed a source."
   },
   {
    "q": "Someone's lock is still on and they've gone home. What do you do?",
    "options": [
     "Cut it off",
     "Tell your supervisor; authorized personnel follow the mine's procedure, starting with confirming the person is clear",
     "Use a spare key",
     "Run the belt around it"
    ],
    "answer": 1,
    "explanation": "Locks are removed only by the person who installed them or by authorized personnel (56/57.12016)."
   },
   {
    "q": "The plant is down and someone suggests pulling your lock for a minute to run rock. What's the answer?",
    "options": [
     "OK if it's quick",
     "Only if the supervisor calls",
     "No; your lock stays on until your work is finished and you're clear",
     "Yes, then re-lock"
    ],
    "answer": 2,
    "explanation": "If the job will take longer, say so and let the supervisor handle production."
   }
  ]
 },
 "allen-m9-3": {
  "questions": [
   {
    "q": "Under 30 CFR 56/57.12071, what is required when equipment will be within 10 feet of energized high-voltage lines?",
    "options": [
     "Nothing",
     "Go faster",
     "Raise the bed only halfway",
     "The lines must be deenergized or other precautionary measures taken"
    ],
    "answer": 3,
    "explanation": "Ten feet is the line the standard draws, not a target to work up to."
   },
   {
    "q": "What is Allen's rule near overhead lines?",
    "options": [
     "No dumping, no parking, no raised beds and no tarping near them",
     "Raised beds are OK with a spotter",
     "Tarping is fine",
     "Only cranes are restricted"
    ],
    "answer": 0,
    "explanation": "If you're not sure whether you're too close, you're too close."
   },
   {
    "q": "A driver's load is sticking under a line. What should he do?",
    "options": [
     "Raise and bump the bed",
     "Pull ahead to open ground well away from the line, and deal with the load there",
     "Climb up and shovel it",
     "Ask someone to hold the line up"
    ],
    "answer": 1,
    "explanation": "A bumped bed bounces higher than expected, and the line doesn't have to be touched to arc."
   },
   {
    "q": "If your equipment contacts a line and catches fire, how do you get out?",
    "options": [
     "Step down holding the handrail",
     "Run away with long strides",
     "Jump clear with feet together and shuffle away with small steps",
     "Climb down slowly"
    ],
    "answer": 2,
    "explanation": "Never touch the machine and ground at once; long steps can put your feet at different voltages."
   },
   {
    "q": "How should you treat a downed or sagging line?",
    "options": [
     "As dead if it's not sparking",
     "Move it with a stick",
     "Drive under it carefully",
     "As live: stay back, keep traffic away, and report it"
    ],
    "answer": 3,
    "explanation": "Only the power company decides when it's safe."
   }
  ]
 },
 "allen-m9-4": {
  "questions": [
   {
    "q": "You see a nick in a trailing cable with something shiny underneath near end of shift. What do you do?",
    "options": [
     "Don't energize or tape it; report it, tag the machine out, and let a qualified person repair it",
     "Tape it and finish",
     "Cover it with a mat",
     "Ignore it in a dry heading"
    ],
    "answer": 0,
    "explanation": "A small nick becomes a shock hazard the first time the floor is wet."
   },
   {
    "q": "Under 57.12005, when may mobile equipment run over power conductors?",
    "options": [
     "Any time at low speed",
     "Only when the conductors are properly bridged or protected",
     "Only on the surface",
     "Never under any condition"
    ],
    "answer": 1,
    "explanation": "If a cable is in your path and isn't bridged, stop and get it moved or protected."
   },
   {
    "q": "How may an energized cable above 150 volts be moved by hand?",
    "options": [
     "With bare hands if dry",
     "With a loader bucket",
     "With insulated hooks, tongs, ropes or slings, or better, deenergize it first",
     "With leather gloves only"
    ],
    "answer": 2,
    "explanation": "57.12014 requires insulated tools; the safest choice is to deenergize and lock out first."
   },
   {
    "q": "Cable protection keeps tripping. What should you do?",
    "options": [
     "Reset it until it holds",
     "Install a bigger fuse",
     "Jump it out",
     "Report it and let qualified people find the fault; never bypass it"
    ],
    "answer": 3,
    "explanation": "When protection trips, it's telling you something is wrong."
   },
   {
    "q": "A rock has rolled off the rib and pinned a cable. What do you do?",
    "options": [
     "Get the power off and locked out, have the area examined, and report the cable for inspection",
     "Yank the cable free",
     "Pry the rock off by hand",
     "Drive over it"
    ],
    "answer": 0,
    "explanation": "The cable may be crushed inside, and the rib may drop another rock."
   }
  ]
 },
 "allen-m9-5": {
  "questions": [
   {
    "q": "If you're not a qualified electrical person, what is your job?",
    "options": [
     "Do small repairs",
     "Look for problems, report them, lock out your own work with your own lock, and never repair, reset, bypass or open electrical equipment",
     "Reset breakers",
     "Change fuses"
    ],
    "answer": 1,
    "explanation": "Electrical work at Allen is for qualified people only."
   },
   {
    "q": "Under 57.12020, what must be kept in place at switchboards and power-control switches where shock hazards exist?",
    "options": [
     "Fire extinguishers",
     "Warning lights",
     "Dry wooden platforms, insulating mats or other nonconductive material",
     "Spare fuses"
    ],
    "answer": 2,
    "explanation": "Inspectors cited the mat standard four times at Boonesboro. Report a missing mat."
   },
   {
    "q": "A breaker trips and someone says to just flip it back on. You're not qualified or authorized. What do you do?",
    "options": [
     "Flip it once",
     "Hold it on",
     "Tape it in place",
     "Report it and wait for a qualified person"
    ],
    "answer": 3,
    "explanation": "A tripping breaker is protecting something; repeated resets can feed power into a fault."
   },
   {
    "q": "Why is putting in a bigger fuse dangerous?",
    "options": [
     "It removes the protection completely",
     "It's more expensive",
     "It's harder to find",
     "It voids the warranty only"
    ],
    "answer": 0,
    "explanation": "Fuse work is a qualified person's job (57.12036)."
   },
   {
    "q": "A shop tool's plug has its ground pin snapped off. What do you do?",
    "options": [
     "Use it in an old outlet",
     "Don't use it or tape it; unplug safely, tag it out and report it",
     "Bend a nail into the hole",
     "Use it only on dry floors"
    ],
    "answer": 1,
    "explanation": "A missing ground pin removes the path that would trip protection if the tool shorts."
   }
  ]
 },
 "allen-m10-1": {
  "questions": [
   {
    "q": "Before helping an injured person involving equipment, what comes first?",
    "options": [
     "Start splinting",
     "Move the person",
     "Make the scene safe: get the equipment stopped and locked out",
     "Take photos"
    ],
    "answer": 2,
    "explanation": "Make the scene safe, then call 911 and the mine office."
   },
   {
    "q": "A person fell from equipment. What should you assume?",
    "options": [
     "Only a sprain",
     "They can walk it off",
     "A heat illness",
     "A possible neck or back injury; don't move them unless in immediate danger"
    ],
    "answer": 3,
    "explanation": "Hold the head still in line with the body and keep them calm and warm."
   },
   {
    "q": "How should a suspected fracture be splinted?",
    "options": [
     "As found, covering the joints above and below, padded, checking circulation before and after",
     "Straighten it first",
     "Only the break itself, tightly",
     "Never splint"
    ],
    "answer": 0,
    "explanation": "Splint as found; loosen ties if fingers or toes turn pale, blue or numb."
   },
   {
    "q": "For an open fracture, what do you do?",
    "options": [
     "Push the bone back in",
     "Control bleeding with pressure around the wound, not on the bone, and cover with a sterile dressing",
     "Pour water on it",
     "Leave it uncovered"
    ],
    "answer": 1,
    "explanation": "Don't push the bone back in."
   },
   {
    "q": "How do you treat a dislocation?",
    "options": [
     "Pop it back in",
     "Massage it",
     "Like a fracture: splint it as found",
     "Ignore it"
    ],
    "answer": 2,
    "explanation": "Never try to pop a dislocation back in."
   }
  ]
 },
 "allen-m10-2": {
  "questions": [
   {
    "q": "How long should you cool a heat burn with cool, clean water?",
    "options": [
     "10 seconds",
     "Only until it stops hurting",
     "Never; use ice",
     "At least 10 minutes"
    ],
    "answer": 3,
    "explanation": "Cool with cool or cold clean water as soon as possible for at least 10 minutes. Never use ice."
   },
   {
    "q": "Which of these should you NOT put on a burn?",
    "options": [
     "Ice, butter or ointments",
     "A clean, dry dressing",
     "Cool water",
     "A loose cover"
    ],
    "answer": 0,
    "explanation": "No ice, no butter, no ointments, and don't break blisters."
   },
   {
    "q": "For a dry chemical on the skin, what comes first?",
    "options": [
     "Flush immediately without brushing",
     "Brush off the dry chemical, then flush with large amounts of water",
     "Apply ointment",
     "Wait for medical help"
    ],
    "answer": 1,
    "explanation": "Brush off dry chemical first, then flush, and send the SDS with the person."
   },
   {
    "q": "Someone has an electrical injury. When can you touch them?",
    "options": [
     "Right away",
     "After putting on leather gloves",
     "Only after the power is off",
     "Never"
    ],
    "answer": 2,
    "explanation": "Don't touch until the power is off. Call 911 and be ready for CPR."
   },
   {
    "q": "Which burn may not hurt because nerves are damaged?",
    "options": [
     "Superficial",
     "Partial-thickness",
     "Sunburn",
     "Full-thickness"
    ],
    "answer": 3,
    "explanation": "A full-thickness burn may look white, brown or charred and may not hurt."
   }
  ]
 },
 "allen-m10-3": {
  "questions": [
   {
    "q": "How long should you rinse a chemical splash in the eye?",
    "options": [
     "At least 15 minutes, or until medical help arrives",
     "30 seconds",
     "Until it stops stinging",
     "2 minutes"
    ],
    "answer": 0,
    "explanation": "Hold the eyelids open and rinse with lots of water, rolling the eyes."
   },
   {
    "q": "Something is stuck in a coworker's eye. What do you do?",
    "options": [
     "Pull it out",
     "Don't remove it; protect it with a cup or padded ring, cover both eyes, and get medical care",
     "Rub the eye",
     "Flush hard"
    ],
    "answer": 1,
    "explanation": "Covering both eyes limits eye movement."
   },
   {
    "q": "For dust or a small particle in the eye, what should you avoid?",
    "options": [
     "Letting tears work",
     "Using eyewash",
     "Rubbing the eye",
     "Flushing from the inner corner outward"
    ],
    "answer": 2,
    "explanation": "Don't rub. Flush from the inner corner outward."
   },
   {
    "q": "If the eyewash bottle runs out mid-rinse, what then?",
    "options": [
     "Stop rinsing",
     "Use a rag",
     "Wait for a new bottle",
     "Keep rinsing with clean tap water"
    ],
    "answer": 3,
    "explanation": "Keep rinsing, then call poison control or get medical care, and take the SDS."
   },
   {
    "q": "Someone swallowed a chemical. What does the video say?",
    "options": [
     "Call Poison Control at 1-800-222-1222 and follow the SDS; don't induce vomiting unless told to",
     "Make them vomit",
     "Give them milk and send them home",
     "Do nothing"
    ],
    "answer": 0,
    "explanation": "Follow Poison Control and the SDS."
   }
  ]
 },
 "allen-m10-4": {
  "questions": [
   {
    "q": "Which sign points to heat stroke rather than heat exhaustion?",
    "options": [
     "Heavy sweating with cool, clammy skin",
     "Confusion, slurred speech, passing out or seizure, with very hot skin",
     "Mild thirst",
     "Muscle cramps only"
    ],
    "answer": 1,
    "explanation": "Any change in how someone thinks or acts in the heat means heat stroke until proven otherwise."
   },
   {
    "q": "What is the best way to cool a heat stroke victim after calling 911?",
    "options": [
     "Give a hot drink",
     "Wrap them in a blanket",
     "Put them in cold water up to the chin",
     "Have them walk around"
    ],
    "answer": 2,
    "explanation": "If you can't, use cold water, ice packs at the neck, armpits and groin, wet cloths and fanning."
   },
   {
    "q": "How do you treat heat exhaustion?",
    "options": [
     "Keep working",
     "Give a large meal",
     "Put ice directly on the skin",
     "Move to shade or AC, loosen clothing, give sips of cool water if alert, and rest"
    ],
    "answer": 3,
    "explanation": "If they get worse or don't improve, get medical help."
   },
   {
    "q": "Who needs a few days to get used to the heat?",
    "options": [
     "New workers and people back from time off",
     "Only supervisors",
     "No one",
     "Only underground miners"
    ],
    "answer": 0,
    "explanation": "Acclimatization matters for new and returning workers."
   }
  ],
  "thinSource": "Short script (about 320 words) that is mostly symptoms and first steps, so this quiz has 4 questions."
 },
 "allen-m11-1": {
  "questions": [
   {
    "q": "What should you do about a berm that's been knocked down or washed out?",
    "options": [
     "Drive around it",
     "Report it",
     "Ignore it if it's small",
     "Rebuild it by hand"
    ],
    "answer": 1,
    "explanation": "Berms along ramps and dump points keep equipment from going over the edge."
   },
   {
    "q": "What are the rules around stockpiles?",
    "options": [
     "Climb them to check material",
     "Stand at the toe to spot trucks",
     "Never walk at the toe and never climb a stockpile",
     "Walk on them only in the morning"
    ],
    "answer": 2,
    "explanation": "Piles can give way at the edge or slide at the toe."
   },
   {
    "q": "When is a life jacket required at Allen?",
    "options": [
     "Never",
     "Only on boats",
     "Only in winter",
     "Wherever there's a danger of falling into water, like working on pumps or near pond edges"
    ],
    "answer": 3,
    "explanation": "Quarry water is often deep and cold with steep sides. Never walk on ice in a pit."
   },
   {
    "q": "In low light, what should you do?",
    "options": [
     "Wear reflective hi-vis, carry a light, slow down, and make contact with operators before approaching",
     "Work faster to finish",
     "Skip contact with operators",
     "Turn off lights to save power"
    ],
    "answer": 0,
    "explanation": "Depth perception and side vision are worse, and operators see less."
   },
   {
    "q": "You're too tired to work safely, or on medication that affects you. What should you do?",
    "options": [
     "Keep quiet",
     "Tell your supervisor",
     "Drink energy drinks",
     "Take a nap in the cab"
    ],
    "answer": 1,
    "explanation": "Fatigue is a hazard; tell your supervisor."
   }
  ]
 },
 "allen-m12-1": {
  "questions": [
   {
    "q": "Under 30 CFR 56.14100, when is self-propelled equipment inspected?",
    "options": [
     "Weekly",
     "Only after a breakdown",
     "By the operator before use on that shift",
     "Monthly by MSHA"
    ],
    "answer": 2,
    "explanation": "Examine the truck every shift and record it on the Quarry Equipment Pre-Operational Inspection, even if it's 'no defects'."
   },
   {
    "q": "You find a defect that affects safety on your truck. What happens?",
    "options": [
     "Run it and report later",
     "Fix it yourself",
     "Drive it to the shop at full speed",
     "The truck doesn't run until it's fixed; tag it out and tell your supervisor"
    ],
    "answer": 3,
    "explanation": "Other defects get reported and corrected in a reasonable time."
   },
   {
    "q": "How high must a berm be on a road with a drop-off?",
    "options": [
     "At least mid-axle height of the largest equipment that usually uses that road",
     "Knee height",
     "Bumper height of a pickup",
     "Any height"
    ],
    "answer": 0,
    "explanation": "A berm is a reminder, not a wall; it won't stop a loaded truck."
   },
   {
    "q": "Before you leave a truck unattended, what must you do?",
    "options": [
     "Leave it running",
     "Put controls in park and set the parking brake, and on a grade chock the wheels or turn them into a bank",
     "Leave the bed raised",
     "Leave the door open"
    ],
    "answer": 1,
    "explanation": "Trucks have rolled away and killed people."
   },
   {
    "q": "What causes most truck-driver injuries at quarries, according to the video?",
    "options": [
     "Wrecks",
     "Tire explosions",
     "Slips and falls getting in and out",
     "Fires"
    ],
    "answer": 2,
    "explanation": "Get on and off facing the truck with three points of contact. Don't jump."
   },
   {
    "q": "At Allen, what is required before you approach a haul truck in a pickup?",
    "options": [
     "Flashing headlights",
     "A hand wave",
     "Nothing",
     "A radio call; no answer, no approach"
    ],
    "answer": 3,
    "explanation": "Whole blind zones exist around haul trucks; a pickup can vanish in the right-front blind area."
   }
  ]
 },
 "allen-m12-2": {
  "questions": [
   {
    "q": "Where is the pinch zone on a wheel loader?",
    "options": [
     "The hinge between the front and rear frames, which closes when it turns",
     "The bucket teeth",
     "The exhaust",
     "The cab door"
    ],
    "answer": 0,
    "explanation": "Install the steering frame lock and shut down before anyone works near the hinge."
   },
   {
    "q": "How should you travel with a loaded bucket?",
    "options": [
     "Raised high for visibility",
     "Low, just high enough to clear the ground",
     "Fully tilted forward",
     "It doesn't matter"
    ],
    "answer": 1,
    "explanation": "A raised, loaded bucket moves the center of gravity up and forward; that's how loaders roll over."
   },
   {
    "q": "When you load a truck, where does the driver stay?",
    "options": [
     "Beside the truck",
     "On the steps",
     "In the cab",
     "At the scale"
    ],
    "answer": 2,
    "explanation": "That's an Allen rule. Never swing a loaded bucket over the cab."
   },
   {
    "q": "Why must you never undercut a stockpile face?",
    "options": [
     "It wastes material",
     "It looks bad",
     "It slows loading",
     "Material can let go all at once and bury a loader"
    ],
    "answer": 3,
    "explanation": "Keep the face no higher than your machine can reach and work it from the side."
   },
   {
    "q": "What is the rule about raised buckets or arms?",
    "options": [
     "Never work under them when held only by hydraulics; lower or block them, then lock out",
     "Work under them if the engine is off",
     "Use a rope",
     "Only in the shop"
    ],
    "answer": 0,
    "explanation": "Block securely with the cylinder lock or cribbing. Nobody rides in the bucket."
   }
  ]
 },
 "allen-m12-3": {
  "questions": [
   {
    "q": "When do most plant fatalities happen, according to the video?",
    "options": [
     "During normal running",
     "During cleanup or maintenance",
     "During startup only",
     "At shift change"
    ],
    "answer": 1,
    "explanation": "That's why lockout, blocking and guards matter."
   },
   {
    "q": "When may guards be removed?",
    "options": [
     "When running to check tracking",
     "Any time",
     "Only for maintenance with the equipment locked out, and they go back on before it runs",
     "When a supervisor is watching"
    ],
    "answer": 2,
    "explanation": "Never reach over, under, around or through a guard."
   },
   {
    "q": "A rock bridges the jaw crusher. What is Allen's method?",
    "options": [
     "Stand on the rock and bar it",
     "Climb in with a sledge",
     "Run the crusher harder",
     "Use the hydraulic rock breaker first from a safe position; if that fails, lock out and block, then use an excavator or blast"
    ],
    "answer": 3,
    "explanation": "Never stand on the rock or in the crusher."
   },
   {
    "q": "What must be true before anyone enters a bin, hopper or surge pile?",
    "options": [
     "Supply and discharge stopped and locked out, a harness and line worn, and a second person tending",
     "Nothing special",
     "A radio check only",
     "The supervisor is told afterward"
    ],
    "answer": 0,
    "explanation": "Hung-up material can let go without warning."
   },
   {
    "q": "You hear the conveyor start-up warning. What do you do?",
    "options": [
     "Finish your task",
     "Get clear and stay clear until you know it's safe",
     "Step over the belt",
     "Ignore it"
    ],
    "answer": 1,
    "explanation": "Warnings with a delay are required where the whole conveyor can't be seen from the start point."
   }
  ]
 },
 "allen-m12-4": {
  "questions": [
   {
    "q": "What must never be drilled into or near?",
    "options": [
     "Fresh rock",
     "The bench floor",
     "A bootleg or hole that might still hold explosives from a previous shot",
     "The collar"
    ],
    "answer": 2,
    "explanation": "Stop and report it to the blaster."
   },
   {
    "q": "On a shot, who is in charge?",
    "options": [
     "The driller",
     "The loader operator",
     "The scale house",
     "The blaster"
    ],
    "answer": 3,
    "explanation": "Helpers do only what the blaster assigns."
   },
   {
    "q": "You're assigned as a blast guard. What do you do?",
    "options": [
     "Stay at your post and stop everyone, no exceptions, until the blaster gives the all-clear",
     "Let supervisors through",
     "Leave when the siren stops",
     "Radio friends to pass"
    ],
    "answer": 0,
    "explanation": "Every access road into the blast area is guarded."
   },
   {
    "q": "When can anyone return to the blast area after a shot?",
    "options": [
     "Immediately",
     "After the blaster has checked the area and the fumes have cleared",
     "After 5 minutes",
     "When the dust looks lighter"
    ],
    "answer": 1,
    "explanation": "Blast fumes can include CO and NO2; the orange cloud is a warning."
   },
   {
    "q": "How should rod and bit changes be made?",
    "options": [
     "While rotating slowly",
     "By hand while running",
     "With rotation stopped, using the tools made for it",
     "With a rag"
    ],
    "answer": 2,
    "explanation": "Rotating steel grabs gloves, sleeves and rags."
   }
  ]
 },
 "allen-m12-5": {
  "questions": [
   {
    "q": "What is the rule about working under a raised dump body?",
    "options": [
     "OK if held by hydraulics",
     "OK for quick jobs",
     "Only with a helper",
     "Never work under it held only by hydraulics or a jack; use the body prop, cylinder lock, jack stands or rated cribbing"
    ],
    "answer": 3,
    "explanation": "Repairs are done with power off and the machine blocked against hazardous motion."
   },
   {
    "q": "How should a large tire be deflated before removal?",
    "options": [
     "By removing the valve core",
     "Cut it",
     "By driving on it",
     "It doesn't need to be"
    ],
    "answer": 0,
    "explanation": "Large tires hold enough energy to kill."
   },
   {
    "q": "How are multi-piece or large rims inflated?",
    "options": [
     "Standing over the tire",
     "In a cage or restraint, with a clip-on chuck and remote gauge, standing out of the trajectory path",
     "By hand pump only",
     "Overinflated, then let down"
    ],
    "answer": 1,
    "explanation": "Never weld or heat a rim with the tire mounted."
   },
   {
    "q": "What does Allen require for hot work?",
    "options": [
     "Nothing",
     "Only gloves",
     "A written hot-work permit and a 30-minute fire watch after you finish",
     "A supervisor's text"
    ],
    "answer": 2,
    "explanation": "Clear combustibles and keep an extinguisher right there."
   },
   {
    "q": "What are the most common shop injuries?",
    "options": [
     "Burns",
     "Electrocutions",
     "Hearing loss",
     "Slips and trips"
    ],
    "answer": 3,
    "explanation": "Clean up spills, keep aisles clear and put tools back."
   }
  ]
 },
 "allen-m12-6": {
  "questions": [
   {
    "q": "Which signal word on a label means the more severe hazard?",
    "options": [
     "Danger",
     "Warning",
     "Caution",
     "Notice"
    ],
    "answer": 0,
    "explanation": "Danger is for more severe hazards, Warning for less severe."
   },
   {
    "q": "What does the flame-over-a-circle pictogram mean?",
    "options": [
     "Flammable",
     "Oxidizer",
     "Explosive",
     "Corrosive"
    ],
    "answer": 1,
    "explanation": "A flame alone means flammable; flame over a circle means oxidizer."
   },
   {
    "q": "You pour a chemical into a new container that won't be used up right away by you. What's required?",
    "options": [
     "Nothing",
     "Write the date only",
     "It gets labeled",
     "Keep it in your truck"
    ],
    "answer": 2,
    "explanation": "Never use a chemical from an unlabeled container."
   },
   {
    "q": "Which SDS sections does this lesson say you'll use most?",
    "options": [
     "1, 3, 5 and 9",
     "10 to 16",
     "Only 1",
     "2, 4, 7 and 8"
    ],
    "answer": 3,
    "explanation": "Hazards, first aid, handling and storage, and exposure controls/PPE."
   },
   {
    "q": "Why shouldn't you wash your hands in diesel?",
    "options": [
     "Diesel is flammable and irritates skin",
     "It's expensive",
     "It stains",
     "It's fine to"
    ],
    "answer": 0,
    "explanation": "Don't wash in diesel and don't smoke at the fuel island."
   }
  ]
 },
 "allen-m12-7": {
  "questions": [
   {
    "q": "When must a competent person examine each working place?",
    "options": [
     "Once a week",
     "At least once each shift, before miners begin work in that place",
     "After an accident only",
     "At the end of the shift"
    ],
    "answer": 1,
    "explanation": "30 CFR 56/57.18002 requires an exam each shift before work begins, for conditions that may adversely affect safety or health."
   },
   {
    "q": "When the exam finds a hazardous condition, what must happen promptly?",
    "options": [
     "Nothing until the next shift",
     "Only a note in the record",
     "Miners in the affected area are told, and corrective action is started",
     "The mine closes"
    ],
    "answer": 2,
    "explanation": "If it can't be fixed right away, it's controlled, such as by barricading and posting."
   },
   {
    "q": "How long must workplace exam records be kept?",
    "options": [
     "One week",
     "Five years",
     "They aren't kept",
     "At least one year"
    ],
    "answer": 3,
    "explanation": "Records show who examined, the date, the areas, conditions found, and the date corrected."
   },
   {
    "q": "What happens if the exam finds an imminent danger?",
    "options": [
     "Everyone is withdrawn from the area except those needed to fix it",
     "Work continues carefully",
     "A sign is posted only",
     "It's noted for next week"
    ],
    "answer": 0,
    "explanation": "Nobody else goes back until the danger is gone."
   },
   {
    "q": "You find a hazard the exam missed. What four things do you do?",
    "options": [
     "Fix it, tell no one, keep working, log it later",
     "Stop, warn anyone exposed, report it right away, and don't fix it unless trained and authorized",
     "Take a photo and leave",
     "Wait for the next exam"
    ],
    "answer": 1,
    "explanation": "The exam is a snapshot; everyone is part of the exam all shift."
   },
   {
    "q": "Does the workplace exam replace your pre-shift equipment check?",
    "options": [
     "Yes",
     "Only underground",
     "No; equipment checks are a separate duty",
     "Only on weekends"
    ],
    "answer": 2,
    "explanation": "Each operator still does the pre-shift check on their own machine."
   }
  ]
 },
 "allen-m12-8": {
  "questions": [
   {
    "q": "What was MSHA's root cause in the April 11, 2014 Missouri fatal rib fall?",
    "options": [
     "Bad weather",
     "Faulty radios",
     "The miners were untrained",
     "Management did not ensure scaling was done from a location that would not expose the miners to falling material"
    ],
    "answer": 3,
    "explanation": "The basket put the miners and the equipment inside the zone where the rock could land."
   },
   {
    "q": "Why did the rock kill the miners even though it didn't land in the basket?",
    "options": [
     "It struck the truck's outrigger, and the boom and basket fell",
     "It caused a fire",
     "It blocked the escapeway",
     "It caused a dust explosion"
    ],
    "answer": 0,
    "explanation": "When equipment is in the fall zone, everyone depending on it is in the fall zone too."
   },
   {
    "q": "What pattern does the video draw from Clover Bottom's face rock falls?",
    "options": [
     "They happened during lunch",
     "Rock above can let go when rock below it moves, often during scaling, checking or shot preparation",
     "They only happened on the surface",
     "They were caused by trucks"
    ],
    "answer": 1,
    "explanation": "That's when people are closest to freshly disturbed ground."
   },
   {
    "q": "What must happen after scaling, before anyone drills or loads?",
    "options": [
     "Nothing",
     "A radio check",
     "The area is examined again",
     "The scaler leaves the area"
    ],
    "answer": 2,
    "explanation": "Re-examine after scaling and before anyone moves in."
   },
   {
    "q": "If you're not the scaler and see a fresh slab or cracks, what do you do?",
    "options": [
     "Pry it down yourself",
     "Walk up to inspect it",
     "Ignore it",
     "Back out to examined ground, keep others out, and report it"
    ],
    "answer": 3,
    "explanation": "Loose ground gets posted and barricaded until it's fixed."
   }
  ]
 },
 "allen-m12-9": {
  "questions": [
   {
    "q": "In the 2023 Indiana report, how did the berm compare with the truck's mid-axle height?",
    "options": [
     "It was 21 to 38 inches, lower than the truck's 52-inch mid-axle height",
     "It was taller",
     "It was exactly mid-axle",
     "There was no berm"
    ],
    "answer": 0,
    "explanation": "A backing truck could ride up and over it."
   },
   {
    "q": "Why wasn't the driver's seat belt enough?",
    "options": [
     "It wasn't fastened",
     "When a truck goes over an edge into water, only the berm and the dump setup can save you",
     "It broke",
     "He was thrown out"
    ],
    "answer": 1,
    "explanation": "Investigators found he was belted; the berm is what keeps you out of the water."
   },
   {
    "q": "What was wrong with the dump-site workplace exam?",
    "options": [
     "It was too frequent",
     "It was done on foot",
     "It was done from inside a vehicle, records weren't kept, and the examiner wasn't trained to judge berms",
     "It was perfect"
    ],
    "answer": 2,
    "explanation": "A good dump exam is done where you can actually see the berm and edge, usually on foot, back from the crest."
   },
   {
    "q": "How should you use a dump berm when backing?",
    "options": [
     "Back into it hard to find the edge",
     "Ignore it",
     "Back at speed",
     "Back slowly and straight, stop short, and don't use it as a bumper"
    ],
    "answer": 3,
    "explanation": "If you have to hit it to find it, the setup is wrong. Dump short if unsure."
   },
   {
    "q": "If a spotter guides you while backing and you lose sight of them, what do you do?",
    "options": [
     "Stop",
     "Keep backing slowly",
     "Honk and continue",
     "Speed up"
    ],
    "answer": 0,
    "explanation": "The spotter stays where you can see them the whole time."
   }
  ]
 },
 "allen-m12-10": {
  "questions": [
   {
    "q": "In the 2023 Massachusetts report, why did the magnet belt start?",
    "options": [
     "Someone pushed start",
     "It ran on a timer and had not been locked out",
     "Lightning",
     "A power surge"
    ],
    "answer": 1,
    "explanation": "Stopping other belts didn't make the magnet belt safe; it was still powered and timer-controlled."
   },
   {
    "q": "What was the second root cause?",
    "options": [
     "Weather",
     "Too many workers",
     "No safe access to the magnet belt: no platform, ladder or written procedure",
     "Bad lighting"
    ],
    "answer": 2,
    "explanation": "The way to get there was to climb across conveyors."
   },
   {
    "q": "Which statement is true?",
    "options": [
     "A stopped machine is a safe machine",
     "Lockout alone stops all motion",
     "Blocking is optional",
     "A stopped machine can still start from a timer, remote or another person, or move from stored energy"
    ],
    "answer": 3,
    "explanation": "Lockout takes away the power; blocking takes away the motion that's left. You need both."
   },
   {
    "q": "Someone says, 'It's off, just hop up there for a second.' What do you say?",
    "options": [
     "I'll do it as soon as my lock is on",
     "OK",
     "Only if you watch",
     "I'll be careful"
    ],
    "answer": 0,
    "explanation": "Off isn't locked. A minute is long enough for a timer to cycle."
   },
   {
    "q": "May you walk on a stopped conveyor belt to reach something?",
    "options": [
     "Yes, if it's stopped",
     "No; use walkways, ladders and platforms, and report missing safe access",
     "Yes, if quick",
     "Only with gloves"
    ],
    "answer": 1,
    "explanation": "Never walk on a belt or climb over or under one."
   }
  ]
 },
 "allen-m12-11": {
  "questions": [
   {
    "q": "Which section of the Mine Act protects you from retaliation for reporting hazards?",
    "options": [
     "Section 2",
     "Section 50",
     "Section 105(c)",
     "Section 48.7"
    ],
    "answer": 2,
    "explanation": "You can file a complaint with MSHA within 60 days if you believe you've been retaliated against."
   },
   {
    "q": "When should you stop a job?",
    "options": [
     "Only when someone is hurt",
     "Only when told to",
     "Never",
     "When you're not trained, a hazard isn't controlled, something has changed, or you're not sure"
    ],
    "answer": 3,
    "explanation": "Not sure is a good enough reason to ask."
   },
   {
    "q": "What do you do first in an imminent danger?",
    "options": [
     "Get yourself and others out of the area, then report it",
     "Debate it with the crew",
     "Finish the task",
     "Take a photo"
    ],
    "answer": 0,
    "explanation": "Don't debate it; clear the area first."
   },
   {
    "q": "Which way of reporting gets action fastest?",
    "options": [
     "\"This seems sketchy\"",
     "\"The tail guard on this belt is missing\"",
     "Saying nothing",
     "Blaming a coworker"
    ],
    "answer": 1,
    "explanation": "Be specific, and keep it about the hazard, not a person."
   },
   {
    "q": "If you're told to keep going anyway, what should you do?",
    "options": [
     "Do the unsafe part",
     "Walk off site",
     "Stay calm, repeat the hazard and what would make it safe, ask who else can look, don't do the unsafe part, and write down what happened",
     "Argue loudly"
    ],
    "answer": 2,
    "explanation": "You can take it higher, and you always have the right to contact MSHA."
   },
   {
    "q": "If you ask, will MSHA keep your name confidential when you request an inspection?",
    "options": [
     "No",
     "Only for supervisors",
     "Only in writing",
     "Yes"
    ],
    "answer": 3,
    "explanation": "The video says MSHA will keep your name confidential if you ask (Mine Act section 103(g))."
   }
  ]
 }
};
