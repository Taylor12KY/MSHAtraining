function siteAerialPanel(siteName, address, coordinates, instructorFocus) {
  const mapQuery = encodeURIComponent(coordinates);
  const earthQuery = encodeURIComponent(coordinates);

  return `
    <section class="site-map-card" aria-label="${siteName} aerial orientation">
      <div class="site-map-header">
        <div>
          <span class="resource-badge">Instructor orientation</span>
          <h3>Aerial Site View</h3>
          <p>${address}</p>
        </div>
        <span class="site-map-source">Satellite view</span>
      </div>
      <iframe
        class="site-map-frame"
        loading="lazy"
        title="Satellite map of ${siteName}"
        src="https://maps.google.com/maps?q=${mapQuery}&amp;t=k&amp;z=17&amp;output=embed"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
      <div class="site-map-body">
        <p><strong>Instructor focus:</strong> ${instructorFocus}</p>
        <div class="site-map-actions">
          <a class="btn btn-outline btn-sm" href="https://earth.google.com/web/search/${earthQuery}/" target="_blank" rel="noopener noreferrer">Open in Google Earth ↗</a>
          <a class="btn btn-outline btn-sm" href="https://www.google.com/maps/@?api=1&amp;map_action=map&amp;center=${mapQuery}&amp;zoom=17&amp;basemap=satellite" target="_blank" rel="noopener noreferrer">Open full map ↗</a>
        </div>
      </div>
      <div class="site-map-notice"><strong>Orientation aid only.</strong> Imagery can be old or incomplete. The instructor's current mine map, escapeway map, traffic plan, emergency plan, and on-site tour control.</div>
    </section>
  `;
}

const COMMON_MINING_TERMS = [
  {
    term: "Back (or roof)", context: "Underground",
    definition: "The overhead surface of an underground opening. Hard-rock and stone miners often say “back” where others say “roof.”",
    safety: "Look and listen for cracks, slabs, drummy rock, water, or other change; stay clear and report questionable ground."
  },
  {
    term: "Rib", context: "Underground",
    definition: "The sidewall of an underground opening or the side of a rock pillar.",
    safety: "Rib rock can spall or fall even when the back appears sound. Keep separation and report loose material."
  },
  {
    term: "Face", context: "Production",
    definition: "The exposed working end of a heading or excavation where rock is drilled, blasted, or otherwise removed.",
    safety: "A face can contain loose ground, misfires, fumes, and equipment hazards. Enter only after required examination and release."
  },
  {
    term: "Heading (or entry)", context: "Underground",
    definition: "An underground passage being driven through the rock. The advancing end of the heading is the face.",
    safety: "Know which heading and level you are in and how to reach both designated escapeways."
  },
  {
    term: "Room", context: "Underground layout",
    definition: "A mined opening between pillars in a room-and-pillar mine. Rooms and connecting crosscuts form the underground layout.",
    safety: "Use the mine's location names, level markings, and map; similar-looking rooms and intersections can make orientation difficult."
  },
  {
    term: "Header / top heading", context: "Underground stone",
    definition: "At these operations, the upper portion of a tall opening that is mined first; lower rock may be removed later by benching.",
    safety: "“Header” can be used differently at other mines. Confirm the local mining sequence and limits with the instructor."
  },
  {
    term: "Bench / benching", context: "Surface + underground",
    definition: "A bench is a horizontal step or working level. Underground benching removes the lower portion after a top heading; at a quarry it can mean a step cut into a highwall or pit.",
    safety: "The word has two common local uses. Ask which bench and which elevation is being discussed before acting."
  },
  {
    term: "Floor", context: "Underground",
    definition: "The bottom surface of an underground opening. “Floor mining” means removing additional rock from that lower portion.",
    safety: "Watch for uneven travel, water, drop-offs, edge conditions, and changing clearance after floor work."
  },
  {
    term: "Pillar", context: "Ground control",
    definition: "A block of rock intentionally left in place to support the back and maintain the room-and-pillar layout.",
    safety: "Do not alter, scale extensively, or work around a damaged pillar except under the ground-control procedure and supervision."
  },
  {
    term: "Crosscut", context: "Underground",
    definition: "An opening driven between headings or entries to provide access, ventilation, or another travel route.",
    safety: "Intersections change sight distance, equipment traffic, airflow, and the span of exposed ground."
  },
  {
    term: "Portal", context: "Underground access",
    definition: "An entrance from the surface into an underground mine opening.",
    safety: "Portal areas can combine changing ground, weather, water, lighting, and two-way equipment traffic."
  },
  {
    term: "Brow", context: "Ground edge",
    definition: "The upper edge of a face, opening, or highwall. Underground, miners may use it for the back edge at an opening; surface usage often means the top edge of a wall.",
    safety: "Because local usage varies, point to the location and confirm what “brow” means before approaching or positioning equipment."
  },
  {
    term: "Loose ground / spalling", context: "Ground control",
    definition: "Rock that is cracked, detached, or no longer securely supported. Spalling is the breaking or flaking of slabs or fragments from the back, rib, face, pillar, or highwall.",
    safety: "Do not stand beneath or beside it. Barricade or guard as required, withdraw, and notify the supervisor."
  },
  {
    term: "Unsupported ground", context: "Ground control",
    definition: "Ground that has not been supported or otherwise made safe under the mine's ground-control method and examination.",
    safety: "Never travel or work under unsupported or unexamined ground. Obey barricades and the supervisor's limits."
  },
  {
    term: "Ground control", context: "Ground stability",
    definition: "The mine's methods for designing, examining, supporting, scaling, barricading, and otherwise controlling the back, ribs, faces, pillars, highwalls, and slopes.",
    safety: "The current site plan and competent examination control; a glossary does not qualify a trainee to examine or correct ground."
  },
  {
    term: "Scaling", context: "Ground control",
    definition: "The controlled removal of loose rock from the back, ribs, face, pillar, or highwall using the approved hand tool or mechanical equipment.",
    safety: "Scaling is performed only by trained and authorized people from a protected position under the mine's procedure."
  },
  {
    term: "Muck / mucking", context: "Production",
    definition: "Muck is broken rock produced by a blast or excavation. Mucking is loading and removing that material from the work area.",
    safety: "Fresh muck can hide unstable ground, voids, hot material, explosives-related hazards, and moving-equipment exposure."
  },
  {
    term: "Round / shot", context: "Blasting",
    definition: "A round is a planned group of blastholes fired as one blast. A “shot” may mean the blast itself; shot rock is the broken material it produces.",
    safety: "Trainees do not handle explosives or make blast/re-entry decisions. Follow signals, boundaries, withdrawal, and the authorized all-clear."
  },
  {
    term: "Misfire", context: "Blasting",
    definition: "A complete or partial failure of an explosive charge to fire as planned.",
    safety: "Do not approach, touch, dig, drill, or move suspected misfired material. Withdraw, guard the area as directed, and notify the authorized blaster or supervisor immediately."
  },
  {
    term: "Blast area / exclusion zone", context: "Blasting",
    definition: "The area from which people and equipment must be withdrawn or protected for a blast, as established by the authorized blasting procedure.",
    safety: "Know the site signals and boundaries. Stay out until the authorized all-clear; never assume elapsed time makes the area safe."
  },
  {
    term: "Highwall / toe", context: "Surface quarry",
    definition: "A highwall is the exposed rock wall of a surface excavation. The toe is the bottom where that wall meets the bench or pit floor.",
    safety: "Stay outside the required setback and never work below loose material or an unexamined wall."
  },
  {
    term: "Berm", context: "Surface + traffic",
    definition: "A raised bank of material used to define an edge, separate traffic, or help restrain vehicles where the site plan requires it.",
    safety: "Do not assume every pile of material is a compliant berm or a safe pedestrian barrier. Follow the traffic plan."
  },
  {
    term: "Stockpile", context: "Material handling",
    definition: "A pile of raw, crushed, screened, or finished stone stored before further processing or loading.",
    safety: "Keep off piles and away from draw points, feeders, unstable faces, undercut material, equipment blind areas, and edge drop-offs."
  },
  {
    term: "Feeder / hopper / chute", context: "Material handling",
    definition: "Equipment that receives, stores briefly, meters, or directs rock into a crusher, conveyor, truck, or another process.",
    safety: "These areas can expose workers to engulfment, falling material, moving parts, and stored energy. Never enter or clear a blockage without authorization and the complete isolation procedure."
  },
  {
    term: "Surge pile / surge bin", context: "Material handling",
    definition: "Temporary material storage that keeps a crusher or conveyor process supplied while upstream and downstream flow changes.",
    safety: "Material can bridge and collapse or feed through a hidden draw point. Stay off and out unless an approved, controlled procedure specifically authorizes the work."
  },
  {
    term: "Grizzly", context: "Material sizing",
    definition: "A set of heavy bars or a grid that lets smaller rock pass while holding back oversized material before crushing or handling.",
    safety: "Treat it as an opening and a material-flow hazard. Do not walk on it or clear lodged rock without the approved access, guarding, and energy-control procedure."
  },
  {
    term: "Ventilation control / stopping", context: "Mine air",
    definition: "A wall, curtain, door, regulator, or other control used to direct and separate mine airflow. A stopping is a barrier built across an opening to control air movement.",
    safety: "Do not damage, move, prop open, or alter a ventilation control unless authorized under the current ventilation procedure. Report changes promptly."
  },
  {
    term: "Intake air / return air", context: "Mine air",
    definition: "Intake air travels toward working areas; return air has passed through mine areas and travels back toward discharge from the mine.",
    safety: "Air routes can change with doors, fans, stoppings, equipment, or damage. Follow the current plan and never use airflow alone to declare an atmosphere safe."
  },
  {
    term: "Escapeway", context: "Emergency travel",
    definition: "A designated route miners use to leave the underground mine during an emergency.",
    safety: "Know the primary and alternate route from the actual work location, keep routes unobstructed, and follow current markers, maps, alarms, and instructor direction."
  },
  {
    term: "Travelway / haul road", context: "Traffic",
    definition: "A designated route for people or vehicles. A haul road is designed and controlled for mobile equipment carrying material.",
    safety: "Use the assigned route, obey right-of-way and speed rules, and obtain positive acknowledgment before approaching equipment."
  }
];

const COMMON_TERMINOLOGY_QUESTIONS = [
  {
    q: "In an underground stone mine, the “back” is:",
    options: ["The overhead surface or roof of the opening", "The road leading out of the mine", "The rear of a loader only", "The bottom of a stockpile"],
    answer: 0
  },
  {
    q: "What does “scaling” mean in mine ground control?",
    options: ["Measuring production tonnage", "Controlled removal of loose rock by trained and authorized personnel using the approved procedure", "Driving on the highwall bench", "Loading finished stone into a customer truck"],
    answer: 1
  }
];

function miningTerminologyPanel() {
  const termCards = COMMON_MINING_TERMS.map(item => `
    <div class="terminology-card">
      <dt>${item.term}<span>${item.context}</span></dt>
      <dd>${item.definition}</dd>
      <dd class="terminology-safety"><strong>Safety meaning:</strong> ${item.safety}</dd>
    </div>
  `).join("");

  return `
    <section class="content-section terminology-panel" aria-labelledby="mining-terminology-heading">
      <div class="official-resource-heading">
        <div>
          <span class="resource-badge resource-badge-required">New-miner foundation</span>
          <h3 id="mining-terminology-heading">Mining Language: Plain-English Quick Reference</h3>
        </div>
        <span class="document-meta">30 common terms</span>
      </div>
      <p>Mining words can describe a location, a work step, and a hazard at the same time. Learn the terms below so instructions such as “stay clear of the face,” “check the back and ribs,” or “muck the round after the all-clear” are understood correctly.</p>
      <details class="terminology-details" open>
        <summary>Review the terminology cards</summary>
        <dl class="terminology-grid">${termCards}</dl>
      </details>
      <div class="key-box"><strong>Speak-up rule:</strong> terminology varies between mines and crews. If a word, location, boundary, signal, or instruction is unfamiliar, stop and ask the supervisor or instructor to point it out before you proceed. Knowing a definition does not authorize scaling, blasting, equipment operation, or another task.</div>
    </section>
  `;
}

// Site safety records come from MSHA's public Open Government Data (Mines, Accidents,
// and Violations data sets). Refresh the numbers when the instructor updates this module.
const MSHA_DATA_AS_OF = "mid-October 2026";
const MSHA_MINE_DATA_URL = "https://www.msha.gov/data-and-reports/mine-data-retrieval-system";

function siteSafetyRecordPanel(record) {
  const mineRows = record.mines.map(mine => `
        <tr><td><strong>${mine.label}</strong></td><td>${mine.id}</td><td>${mine.mshaName}</td><td>${mine.allenSince}</td></tr>`).join('');
  const injuryRows = record.injuryCategories.map(([category, count, meaning]) => `
        <tr><td><strong>${category}</strong></td><td>${count}</td><td>${meaning}</td></tr>`).join('');
  const cases = record.cases.map(item => `<li><strong>${item.when}:</strong> ${item.what} <em>Lesson:</em> ${item.lesson}</li>`).join('');
  const citationRows = record.citations.map(([standard, count, plain, you]) => `
        <tr><td><strong>${standard}</strong></td><td>${count}</td><td>${plain}</td><td>${you}</td></tr>`).join('');
  return `
      <div class="content-section">
        <h3>${record.site} in MSHA's Public Records</h3>
        <p>Every mine reports injuries to MSHA, and every inspection is public. These records show what has actually hurt people and what inspectors actually find at <em>this</em> site. Numbers are from MSHA's public data through ${MSHA_DATA_AS_OF}.</p>
        <div class="training-table-wrap">
          <table class="training-table">
            <thead><tr><th>Mine</th><th>MSHA Mine ID</th><th>Name on MSHA record</th><th>Operated by The Allen Company since</th></tr></thead>
            <tbody>${mineRows}
            </tbody>
          </table>
        </div>
        <p>MSHA inspects this site from the <strong>${record.fieldOffice}</strong>. Anyone can look up a mine's inspections, citations, and injury reports in the <a href="${MSHA_MINE_DATA_URL}" target="_blank" rel="noopener">MSHA Mine Data Retrieval System ↗</a>.</p>

        <h4>What has injured people here</h4>
        <p>${record.injurySummary}</p>
        ${record.injuryCategories.length ? `<div class="training-table-wrap">
          <table class="training-table">
            <thead><tr><th>How the injury happened (MSHA category)</th><th>Reports</th><th>What it usually looked like here</th></tr></thead>
            <tbody>${injuryRows}
            </tbody>
          </table>
        </div>` : ''}
        <ul>${cases}</ul>

        <h4>What MSHA inspectors cite here</h4>
        <p>${record.citationSummary}</p>
        <div class="training-table-wrap">
          <table class="training-table">
            <thead><tr><th>Standard (30 CFR)</th><th>Citations since 2021</th><th>What it requires</th><th>What you do</th></tr></thead>
            <tbody>${citationRows}
            </tbody>
          </table>
        </div>
        <div class="key-box"><strong>Takeaway:</strong> ${record.takeaway}</div>
      </div>`;
}

function emergencyCardPanel(siteName, firstRows = []) {
  const rows = firstRows.concat([
    "Primary escapeway from my work area",
    "Secondary escapeway from my work area",
    "Surface gathering point (where I report to be counted)",
    "Where my W65 is issued and where extra self-rescuers are stored",
    "How I call for help underground (radio channel or phone) and who answers",
    "Site address and directions to give 911",
    "First-aid kit, stretcher, and AED locations",
    "Nearest fire extinguishers to my work area",
    "Who is in charge during an emergency on my shift"
  ]);
  return `
      <div class="content-section">
        <h3>My ${siteName} Emergency Card</h3>
        <p>Escape routes, gathering points, and contacts change as mining advances, so they are not printed in this course. <strong>Fill in every line with your instructor using the current escape and evacuation plan and mine map</strong>, then walk the escapeways during your mine-site training. If you cannot answer a line before going underground, ask before you go.</p>
        <div class="training-table-wrap">
          <table class="training-table emergency-card">
            <thead><tr><th>Know before you go underground</th><th>My answer (confirmed with instructor)</th></tr></thead>
            <tbody>${rows.map(row => `
              <tr><td><strong>${row}</strong></td><td class="emergency-card-blank"></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="warning-box"><strong>Stop – Warn – Withdraw – Report.</strong> In any emergency, warn others, leave by the nearest safe escapeway, go to the gathering point so you can be counted, and do not go back in unless directed by the person in charge.</div>
      </div>`;
}

const SITE_SAFETY_RECORDS = {
  "Boonesboro Quarry": {
    site: "Boonesboro Quarry",
    mines: [{ label: "Boonesboro Quarry", id: "15-00006", mshaName: "Boonesboro Quarry", allenSince: "The beginning (Allen-owned since 1939)" }],
    fieldOffice: "MSHA Barbourville, KY Field Office",
    injurySummary: "From 2016 through " + MSHA_DATA_AS_OF + ", MSHA records <strong>21 reportable worker injuries</strong> at Boonesboro (illnesses from natural causes and no-injury roof falls are not counted here).",
    injuryCategories: [
      ["Slips and falls of people", 6, "Missing a step climbing down haul trucks and loaders, slipping on loose rock, stepping into an opening in a screen deck."],
      ["Handling materials", 6, "Plates, drill steel, and crane parts slipping or swinging; a hand on a tail pulley when someone else turned it."],
      ["Powered haulage", 3, "Jarred in a haul truck being loaded; a leg caught while riding on the outside of a loader."],
      ["Non-powered hand tools", 3, "A scaling bar glancing off rock; a pipe wrench slipping while adjusting a belt."],
      ["Machinery", 2, "An excavator dropping when a hung-up rock broke loose; strain running the ANFO hose."],
      ["Falling roof or face rock", 1, "Rock falling from the face while a miner retrieved a lost scaler tooth."]
    ],
    cases: [
      { when: "2020", what: "A scaler lost the tooth off its pick. The operator walked toward the face to pick it up, and a rock fell from the face onto his shoulder.", lesson: "Never walk up to a face to retrieve a tool. Report it and let the area be examined and scaled first." },
      { when: "2022", what: "A miner rode on the front of a loader with his legs hanging off to get to the back of the mine. When the loader turned, the step caught his leg.", lesson: "Ride only in a seat designed for a passenger. Never ride on the outside of equipment." },
      { when: "2018", what: "A worker had his hand on a tail pulley to reach set screws while another employee turned the same pulley.", lesson: "Lock out, tag out, and block motion before putting hands near any pulley, even when it is being turned by hand." },
      { when: "2022–2023", what: "Three separate miners fell climbing down a loader, a haul truck, and an articulated truck.", lesson: "Face the machine and keep three points of contact all the way to the ground." }
    ],
    citationSummary: "From 2021 through " + MSHA_DATA_AS_OF + ", inspectors issued 44 citations at Boonesboro. The standards cited most:",
    citations: [
      ["57.14100(b)", 7, "Equipment, machinery, and tool defects that affect safety must be corrected in a timely manner.", "Do your pre-shift check, report every defect, and do not run equipment that is unsafe."],
      ["57.14107(a)", 5, "Moving machine parts such as pulleys, shafts, and couplings must be guarded.", "Never remove, open, or reach around a guard. Report missing or damaged guards."],
      ["57.12020", 4, "Insulating mats or platforms must stay in place at switchboards and power-control switches.", "Leave mats in place and report missing ones. Only qualified persons operate electrical gear."],
      ["57.12028", 3, "Grounding systems must be tested after installation or repair and annually.", "Report damaged ground wires or cables. Electrical work is for qualified persons."],
      ["57.14109", 3, "Unguarded conveyors next to travelways need emergency stops or railings.", "Know where belt emergency stops are. Never cross or climb a running conveyor."]
    ],
    takeaway: "Most Boonesboro injuries came from everyday tasks, such as climbing down equipment, handling steel and plates, and working near pulleys, not from rare events. Pre-shift checks, guards, lockout, and three points of contact prevent most of what is in this record."
  },
  "Clover Bottom Quarry": {
    site: "Clover Bottom Quarry",
    mines: [
      { label: "Old mine (#1)", id: "15-00112", mshaName: "Clover Bottom Underground", allenSince: "June 2004" },
      { label: "New mine (#2)", id: "15-19898", mshaName: "Clover Bottom Quarry #2", allenSince: "March 2021 (opened by Allen)" }
    ],
    fieldOffice: "MSHA Barbourville, KY Field Office",
    injurySummary: "Since The Allen Company took over the old mine in mid-2004, MSHA records <strong>23 reportable worker injuries</strong> at the old mine (#1). The new mine (#2) has <strong>no reportable injuries</strong> on record since it opened in 2021.",
    injuryCategories: [
      ["Slips and falls of people", 6, "Falling off a machine during repairs, slipping on steps or ice, climbing down a belt ladder, stepping into a catwalk opening."],
      ["Handling materials", 5, "Tires, an equipment hood, and rock sliding off a rib onto a drill hose."],
      ["Non-powered hand tools", 5, "Barring out plugged bins, razor knives slipping while cutting belt or hose wrap, a sledgehammer pin breaking."],
      ["Falling roof, face, or rib rock", 4, "Rock falling from the face or back while miners hand-scaled, checked a room, or prepared a shot."],
      ["Other / powered haulage", 3, "A knee injury climbing over a conveyor, a back strain in a manlift, a hand pinned when a loader slid in mud beside a belt."]
    ],
    cases: [
      { when: "2005, 2008, 2011, 2014", what: "Four times, rock fell from the face or back onto miners who were hand-scaling, measuring a freshly scaled room, checking for loose rock, or preparing to load a shot. In 2014 the rock above the one being pulled came down.", lesson: "Rock above can let go when rock below it moves. Scale only when trained and authorized, from a protected position, and re-examine after scaling and before loading." },
      { when: "2021", what: "Rock slid off the lower rib and pinched the dust hose on a floor drill. The driller reached in to move it, the rock shifted, and his elbow struck the rib.", lesson: "Do not free equipment by hand next to a rib. Stop and get help or a tool that keeps you clear." },
      { when: "2014 and 2017", what: "Drivers used a pipe and a long bar to clear plugged bins and were hurt by the strain.", lesson: "Plugged bins and chutes are a stop-and-follow-the-procedure job: lock out, use approved tools, and never work beneath the material." },
      { when: "2018", what: "One worker stepped into a catwalk hole left after a gearbox was removed. Another climbed over a conveyor to clean a stopped plant.", lesson: "Barricade any opening you create, and go around or use a crossover; never climb over conveyors." },
      { when: "2026", what: "A contract mechanic drove a track pin with a sledgehammer, and a piece of the pin broke off and embedded in his thigh.", lesson: "Use the right drift pin and hammer, inspect struck tools, and keep others out of the line of fire." }
    ],
    citationSummary: "From 2021 through " + MSHA_DATA_AS_OF + ", inspectors issued 39 citations at the old mine and 11 at the new mine. The standards cited most across both mines:",
    citations: [
      ["57.14100(b) / (c)", 9, "Defects on equipment, machinery, and tools that affect safety must be corrected in a timely manner, and unsafe equipment must be taken out of service.", "Do your pre-shift check, report every defect, and do not run equipment that is unsafe."],
      ["57.11058", 3, "Each underground mine must keep an accurate check-in and check-out record of everyone in the mine.", "Tag in and out of the correct mine every time. Never tag for anyone else."],
      ["57.14207", 3, "Unattended mobile equipment must be in park with the parking brake set, and chocked or turned into a bank on a grade.", "Park, set the brake, and chock or turn into the bank before you walk away."],
      ["57.4200 / 57.4201", 3, "Firefighting equipment must be provided and inspected; extinguishers are checked monthly.", "Know where extinguishers are and report any that are missing, discharged, or out of date."],
      ["57.20011", 2, "Hazards that are not obvious must be barricaded or posted with warning signs.", "Never cross a barricade or danger sign. Barricade or report hazards you find."],
      ["57.14132", 2, "Horns and backup alarms on mobile equipment must work.", "Check your horn and backup alarm on the pre-shift check and report failures."]
    ],
    takeaway: "Ground falls at the face are the most serious pattern in the Clover Bottom record, and every one happened during scaling or shot preparation. Inspectors also find check-in/check-out gaps at both mines, which matters when two mines share one surface and everyone must be accounted for."
  },
  "Dix River Stone": {
    site: "Dix River Stone",
    mines: [{ label: "Dix River Stone", id: "15-18389", mshaName: "Dix River Stone", allenSince: "July 2018" }],
    fieldOffice: "MSHA Barbourville, KY Field Office",
    injurySummary: "Since The Allen Company took over in mid-2018, MSHA records <strong>2 reportable worker injuries</strong> at Dix River Stone. Both were people falling while stepping down at the end of a shift, and both caused lost workdays.",
    injuryCategories: [
      ["Slips and falls of people", 2, "Falling on the concrete steps outside the office, and missing the bottom step getting out of a haul truck."]
    ],
    cases: [
      { when: "December 2023", what: "A miner who had just clocked out fell going down the concrete steps outside the office and landed on both knees.", lesson: "The shift is not over until you are in your vehicle. Use handrails, and report icy, loose, or poorly lit steps." },
      { when: "October 2024", what: "A truck driver getting out at the end of the shift missed the bottom step, fell, and hit the back of his head.", lesson: "Face the cab and keep three points of contact all the way to the ground, especially when you are tired." },
      { when: "Same rock, new hazards", what: "Both injuries happened while production was mostly surface work. Dix River now mines headers underground on two levels in the same Camp Nelson Limestone worked at Boonesboro, where falling face rock, haulage, and scaling have hurt miners.", lesson: "Treat ground control, haulage, and scaling here with the same care those older underground mines have learned to use." }
    ],
    citationSummary: "From 2021 through " + MSHA_DATA_AS_OF + ", inspectors issued 24 citations at Dix River Stone. The standards cited most:",
    citations: [
      ["57.14100(b) / (c)", 5, "Defects on equipment, machinery, and tools that affect safety must be corrected in a timely manner, and unsafe equipment must be taken out of service.", "Do your pre-shift check, report every defect, and do not run equipment that is unsafe."],
      ["57.12001 / 12002 / 12004 / 12030", 6, "Electrical circuits need overload protection, safe controls and switches, protected conductors, and prompt correction of dangerous conditions.", "Report damaged cords, cables, boxes, and switches. Never repair electrical equipment unless you are qualified."],
      ["56.14101 / 57.14132", 2, "Mobile equipment brakes, horns, and backup alarms must work.", "Test brakes, horn, and backup alarm on your pre-shift check and report failures."],
      ["57.11001 / 56.9300", 2, "Safe access to working places must be maintained, and berms are required where roadways have a drop-off.", "Use designated travelways and report missing berms or unsafe access."]
    ],
    takeaway: "The Dix River record points at pre-shift equipment checks, electrical condition, and stepping down safely. As underground header mining grows, ground control and haulage become the hazards to watch most closely."
  }
};

const SITE_CONTENT = {
  "Boonesboro Quarry": {
    title: "Boonesboro Quarry – Site Orientation",
    objectives: [
      "Identify Boonesboro Quarry site-specific hazards and policies (including emergencies, evacuations, and fires)",
      "Learn the mine layout and levels, primary and secondary escapeways, and emergency gathering points",
      "Know check-in, ground control, traffic, PPE, and hazard reporting at this site"
    ],
    content: `
      <div class="content-section">
        <h3>Boonesboro Quarry – Site Overview</h3>
        <p><strong>Boonesboro Quarry</strong> is an <strong>underground limestone mine</strong> owned and operated by <strong>The Allen Company</strong> since <strong>1939</strong>. It is located along the <strong>Kentucky River</strong> in northern Madison County (near Richmond / Winchester area), at approximately <strong>2591 Boonesboro Road, Richmond, KY</strong>, off <strong>Kentucky Highway 627</strong>.</p>
        <p>MSHA Mine ID: <strong>15-00006</strong> — one of the oldest continuously active limestone operations in the state (commonly noted as among the earliest still-active limestone mines, including as the 6th-oldest active limestone mine by ID sequence).</p>
        <p>The mine works <strong>Camp Nelson Limestone</strong> (Upper Ordovician High Bridge Group) using room-and-pillar methods. This is the same rock unit mined at Dix River Stone. The property sits near the Kentucky River Fault System; ground conditions and geologic structure are an ongoing part of safe mining here.</p>
        <p><strong>Underground layout:</strong> The mine has <strong>three levels</strong>. Active mining is currently on <strong>Level 2 and Level 3</strong>. The <strong>primary crusher is on Level 2</strong>. Crushed rock is <strong>conveyed outside</strong> to surface screens and secondary crushers for further processing.</p>
        <p><strong>Surface &amp; Level 1:</strong> Rock is stockpiled on the surface and on <strong>Level 1</strong>, where the <strong>mine shop</strong> is located. Product is also hauled to the stockpile at the blacktop plant known as <strong>BT3</strong> (Boonesboro Blacktop). Access to BT3 is by traveling <strong>under the KY 627 bridge</strong>.</p>
        <p><strong>Liwell Plant:</strong> Boonesboro operates a <strong>Liwell screen plant</strong> (the same type of dry-screen plant used at Clover Bottom) that produces a very clean product used in asphalt mix.</p>
        <p><strong>Site leadership:</strong> Site supervisor is <strong>Dustin Conn</strong> (extensive underground coal production experience). Mine foreman is <strong>Kendell Barnes</strong> (20+ years at Boonesboro running the screen plant and operating equipment). Site leadership includes <strong>licensed blasters</strong>.</p>
        <p>Finished stone supports construction aggregate, aglime, and related products for Central Kentucky, and feeds Allen Company asphalt operations in the area.</p>
        <div class="key-box"><strong>Site focus hazards:</strong> Roof and rib conditions / ground control; mobile equipment traffic underground and on surface (loaders, haul trucks); conveyor systems from Level 2 to surface; shop and Level 1 activity; Liwell plant; haul routes to BT3 under KY 627; silica dust; noise; diesel equipment; and emergency escape from multiple levels.</div>
      </div>
      ${miningTerminologyPanel()}
      ${siteAerialPanel(
        "Boonesboro Quarry",
        "2591 Boonesboro Rd, Richmond, KY 40475",
        "37.9042434,-84.2710647",
        "Locate the mine portals, KY 627 and the BT3 route, the surface plant and stockpiles, the Kentucky River, and the designated gathering areas identified by the instructor."
      )}
      <div class="content-section">
        <h3>Boonesboro Site-Specific Policies (Review with Instructor)</h3>
        <ul>
          <li><strong>Check-in / check-out:</strong> Follow the site tag-in/tag-out or equivalent system every time you enter or leave underground. Never tag in for another person. Report to your supervisor (Dustin Conn / Kendell Barnes or designated lead) before starting work.</li>
          <li><strong>Ground control:</strong> Work only under examined and supported ground per the ground control plan. Report cracking, spalling, water, or unusual sounds immediately. Scale only if trained and authorized. Know which level you are on (1, 2, or 3).</li>
          <li><strong>MSA W65 self-rescuer:</strong> Carry and inspect the sealed W65 as required by the mine. Complete hands-on donning practice with the approved W65 training unit, and know where additional service units are stored.</li>
          <li><strong>Crushing &amp; conveyors:</strong> The primary crusher is on Level 2; rock is conveyed to surface plant. Respect all guards, lockout/tagout, and restricted areas around crushers and belts.</li>
          <li><strong>Liwell Plant:</strong> Respect guards, energy isolation, and traffic around the Liwell screen plant.</li>
          <li><strong>Mobile equipment &amp; traffic:</strong> Positive communication when approaching loaders or haul trucks. Stay out of blind spots. Follow underground and surface travelways, including routes toward BT3 under the KY 627 bridge.</li>
          <li><strong>Level 1 / shop:</strong> Follow shop and surface yard rules. Watch for mobile equipment, stockpile edges, and maintenance activity.</li>
          <li><strong>PPE:</strong> Hard hat, safety glasses, steel-toe boots, high-visibility clothing where required, hearing protection as required, and any task-specific PPE (including respiratory protection as directed).</li>
          <li><strong>Hazard reporting:</strong> Report hazards immediately to your supervisor or designated safety contact. Do not assume someone else has already reported it.</li>
          <li><strong>Emergency / escapeways / fire:</strong> Know the primary and secondary escapeways from your work area on each level, emergency gathering points, radio procedures, and how to summon help. Know fire extinguisher locations and fire response expectations for your area. Participate fully in evacuation and fire drills.</li>
        </ul>
        <div class="warning-box">These are orientation points for Boonesboro. Your instructor will cover current written plans (ground control, escape, fire, ventilation), emergency contacts, gathering points, and any unique site rules. Ask questions if anything is unclear.</div>
      </div>
      ${siteSafetyRecordPanel(SITE_SAFETY_RECORDS["Boonesboro Quarry"])}
      ${emergencyCardPanel("Boonesboro Quarry", ["My level today (1, 2, or 3) and work area"])}
      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Required Viewing / Instructor Presentation</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Review Boonesboro site rules, level layout, and emergency procedures with your instructor. Required seat time for this module is 1.5 hours (auto-tracked).</p>
        <div class="timer-display" id="timer-1">90:00</div>
        <button class="btn btn-sm" id="btn-timer-1" onclick="startTimer(1, 90)">Start 1.5-hour Required Timer (90 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-1">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Boonesboro Quarry is primarily a:", options: ["Surface sand and gravel pit", "Underground limestone mine operated by The Allen Company", "Coal preparation plant only", "Office and lab only"], answer: 1 },
      { q: "Boonesboro Quarry’s MSHA Mine ID is:", options: ["15-00001", "15-00006", "15-12345", "There is no Mine ID"], answer: 1 },
      { q: "Active mining at Boonesboro is currently on:", options: ["Level 1 only", "Level 2 and Level 3", "Surface highwalls only", "BT3 only"], answer: 1 },
      { q: "The primary crusher at Boonesboro is located on:", options: ["Level 1 next to the shop", "Level 2", "BT3 across KY 627", "The Kentucky River bank only"], answer: 1 },
      { q: "Rock leaves the underground primary crusher by:", options: ["Being left in place until annual cleanup", "Conveyor to surface screens and secondary crushers", "Floating on the Kentucky River", "Only by hand cart"], answer: 1 },
      { q: "To reach the BT3 blacktop plant stockpile area you typically:", options: ["Fly over the river", "Travel under the KY 627 bridge", "Stay only on Level 3", "Use the interstate weigh station only"], answer: 1 },
      { q: "What should you do if you discover a condition that could cause serious injury?", options: ["Wait until the end of shift", "Assume a supervisor already knows", "Report it immediately according to site procedures", "Only report it if someone is already injured"], answer: 2 }
    ]
  },
  "Clover Bottom Quarry": {
    title: "Clover Bottom Quarry – Site Orientation",
    objectives: [
      "Identify Clover Bottom Quarry site-specific hazards and policies (including emergencies, evacuations, and fires)",
      "Learn the layout of the old mine and new mine, shared surface, primary and secondary escapeways, and emergency gathering points",
      "Know check-in, ground control, traffic, PPE, and hazard reporting at this site"
    ],
    content: `
      <div class="content-section">
        <h3>Clover Bottom Quarry – Site Overview</h3>
        <p><strong>Clover Bottom Quarry</strong> is an <strong>underground limestone operation</strong> in <strong>Jackson County, Kentucky</strong>, near <strong>McKee</strong>, along <strong>US 421</strong> at approximately <strong>12420 US 421 N, McKee, KY 40447</strong>. The site is owned and operated by <strong>The Allen Company</strong>.</p>
        <p>There are <strong>two separate MSHA mines</strong> that share the same surface area. They are commonly called the <strong>old mine</strong> and the <strong>new mine</strong>:</p>
        <ul>
          <li><strong>Clover Bottom Quarry #1 (old mine)</strong> — MSHA Mine ID <strong>15-00112</strong>. Operated by <strong>M.A. Walker</strong> beginning around <strong>1950</strong>; purchased by The Allen Company in <strong>2004</strong>.</li>
          <li><strong>Clover Bottom Quarry #2 (new mine)</strong> — MSHA Mine ID <strong>15-19898</strong>. Started in <strong>2021</strong>.</li>
        </ul>
        <p>Both are <strong>one-level</strong> underground limestone mines (room-and-pillar). In the <strong>old mine</strong>, the <strong>floor</strong> is mined. In the <strong>new mine</strong>, <strong>headers</strong> are mined. The operation also <strong>drills and blasts on the surface</strong>.</p>
        <p><strong>Material flow:</strong> Shot rock is hauled to the pit where the <strong>primary crusher</strong> is located, then <strong>conveyed up the hill</strong> to the <strong>secondary plant</strong>. Product is stockpiled at the plant and sometimes underground.</p>
        <p><strong>Liwell Plant (old mine):</strong> A small screen plant in the old mine functions like a wash plant without water. It produces a very clean product used in asphalt mix at the asphalt plant nearby on <strong>KY 421</strong>. The same type of Liwell plant is also used at Boonesboro Quarry.</p>
        <p><strong>Site leadership:</strong> Site supervisor is <strong>Andrew Burton</strong> (10+ years operating the yard loader at Boonesboro; previously mine foreman before role changes). Mine foreman is <strong>Braden Walters</strong> (5+ years operating equipment at Boonesboro). Site leadership includes <strong>licensed blasters</strong>.</p>
        <p>Stone from Clover Bottom supports construction aggregate, aglime, and Allen Company asphalt operations serving Jackson, Madison, Rockcastle, and surrounding counties.</p>
        <div class="key-box"><strong>Site focus hazards:</strong> Roof and rib / ground control in both the old and new mines; knowing which mine (and Mine ID) you are working in; surface drill-and-blast; mobile equipment underground and on the shared surface; primary crusher in the pit and conveyors up the hill; secondary plant and stockpiles; Liwell plant in the old mine; silica dust; noise; diesel equipment; and emergency escape from either underground mine plus surface gathering points.</div>
      </div>
      ${miningTerminologyPanel()}
      ${siteAerialPanel(
        "Clover Bottom Quarry",
        "12420 US 421 N, McKee, KY 40447",
        "37.5014605,-84.1663879",
        "Distinguish the old- and new-mine portal areas, shared surface, US 421 access, pit and primary crusher, secondary plant, stockpiles, and current gathering areas."
      )}
      <div class="content-section">
        <h3>Clover Bottom Site-Specific Policies (Review with Instructor)</h3>
        <ul>
          <li><strong>Check-in / check-out:</strong> Follow the tag-in/tag-out (or equivalent) system for the mine you are entering—old mine (#1 / 15-00112) or new mine (#2 / 15-19898). Never tag in for another person. Always tag out when leaving underground. Report to Andrew Burton / Braden Walters or the designated lead.</li>
          <li><strong>Know your mine:</strong> Confirm whether you are assigned to the old mine or the new mine each shift. Procedures, escapeways, and maps differ by mine even though the surface is shared.</li>
          <li><strong>Ground control:</strong> Work only under examined and supported ground per the applicable ground control plan. Floor mining (old mine) and header mining (new mine) have different face conditions—report cracking, spalling, water, or unusual sounds immediately. Scale only if trained and authorized.</li>
          <li><strong>MSA W65 self-rescuer:</strong> Carry and inspect the sealed W65 as required for the mine you enter. Complete hands-on donning practice with the approved W65 training unit, and know where additional service units are stored.</li>
          <li><strong>Surface drill &amp; blast / pit crusher:</strong> Respect blast clearances and signals. Shot rock is hauled to the pit primary crusher—stay clear of haul routes, the pit edge, and crusher restricted areas unless authorized.</li>
          <li><strong>Conveyors &amp; secondary plant:</strong> Rock is conveyed up the hill to the secondary plant. Follow lockout/tagout, guarding rules, and restricted-area procedures on belts and plant equipment.</li>
          <li><strong>Liwell Plant (old mine):</strong> Screen plant producing clean product for asphalt. Respect guards, energy isolation, and traffic around the plant area.</li>
          <li><strong>Mobile equipment &amp; traffic:</strong> Positive communication when approaching loaders or haul trucks underground or on the shared surface. Stay out of blind spots. Follow designated travelways between the mines, pit, and plant.</li>
          <li><strong>PPE:</strong> Hard hat, safety glasses, steel-toe boots, high-visibility clothing where required, hearing protection as required, and any task-specific PPE (including respiratory protection as directed).</li>
          <li><strong>Hazard reporting:</strong> Report hazards immediately to your supervisor or designated safety contact. Do not assume someone else has already reported it.</li>
          <li><strong>Emergency / escapeways / fire:</strong> Know the primary and secondary escapeways for the mine you are in (old or new), emergency gathering points on the shared surface, radio procedures, and how to summon help. Know fire extinguisher locations and fire response for your area. Participate fully in evacuation and fire drills.</li>
        </ul>
        <div class="warning-box">These are orientation points for Clover Bottom. Your instructor will cover current written plans (ground control, escape, fire, ventilation) for both mines, emergency contacts, gathering points, and any unique site rules. Ask questions if anything is unclear.</div>
      </div>
      ${siteSafetyRecordPanel(SITE_SAFETY_RECORDS["Clover Bottom Quarry"])}
      ${emergencyCardPanel("Clover Bottom", ["Which mine I am in today: old mine (#1, 15-00112) or new mine (#2, 15-19898)", "Where I tag in and out for that mine"])}
      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Required Viewing / Instructor Presentation</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Review Clover Bottom site rules, old vs. new mine layout, and emergency procedures with your instructor. Required seat time for this module is 1.5 hours (auto-tracked).</p>
        <div class="timer-display" id="timer-1">90:00</div>
        <button class="btn btn-sm" id="btn-timer-1" onclick="startTimer(1, 90)">Start 1.5-hour Required Timer (90 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-1">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Clover Bottom has how many separate MSHA mines that share a surface?", options: ["One only", "Two (old mine and new mine)", "Four", "None — surface only"], answer: 1 },
      { q: "Clover Bottom Quarry #1 (old mine) MSHA Mine ID is:", options: ["15-00006", "15-00112", "15-19898", "15-12345"], answer: 1 },
      { q: "Clover Bottom Quarry #2 (new mine) MSHA Mine ID is:", options: ["15-00112", "15-19898", "15-00006", "There is no second Mine ID"], answer: 1 },
      { q: "In the old mine, production focuses on:", options: ["Only surface highwalls", "Floor mining", "Only the Liwell plant office", "Headers only"], answer: 1 },
      { q: "In the new mine, production focuses on:", options: ["Floor mining only", "Header mining (room and pillar)", "Only asphalt paving", "Only stockpile cleanup"], answer: 1 },
      { q: "Shot rock is typically hauled to:", options: ["The interstate weigh station only", "The pit primary crusher, then conveyed up the hill to the secondary plant", "Boonesboro only", "Directly into Indian Creek"], answer: 1 },
      { q: "MSHA records show that rock falling from the face or back at the Clover Bottom old mine has injured miners while they were:", options: ["Eating lunch on the surface", "Hand-scaling, checking for loose rock, or preparing to load a shot", "Driving on US 421", "Working in the scale house"], answer: 1 },
      { q: "What should you do if you discover a condition that could cause serious injury?", options: ["Wait until the end of shift", "Assume a supervisor already knows", "Report it immediately according to site procedures", "Only report it if someone is already injured"], answer: 2 }
    ]
  },
  "Dix River Stone": {
    title: "Dix River Stone – Site Orientation",
    objectives: [
      "Identify Dix River Stone site-specific hazards and policies (including emergencies, evacuations, and fires)",
      "Learn the two-level mine layout, primary and secondary escapeways, and emergency gathering points",
      "Know check-in, ground control, traffic, PPE, and hazard reporting at this site"
    ],
    content: `
      <div class="content-section">
        <h3>Dix River Stone – Site Overview</h3>
        <p><strong>Dix River Stone</strong> is an <strong>underground limestone mine</strong> in <strong>Garrard County, Kentucky</strong>, near <strong>Lancaster</strong>, at approximately <strong>4963 Danville Road, Lancaster, KY 40444</strong>. MSHA Mine ID: <strong>15-18389</strong>.</p>
        <p>The operation was started in <strong>2001</strong> by <strong>Tommy Owens</strong> and the <strong>Dix River Stone Company</strong>. It was purchased by <strong>The Allen Company</strong> in <strong>2018</strong>. Stone supplies crushed aggregate to Garrard and surrounding counties and feeds the <strong>Danville Blacktop Plant</strong> owned by The Allen Company.</p>
        <p>The mine works the same <strong>Camp Nelson Limestone</strong> unit mined at Boonesboro Quarry. It has <strong>two levels</strong> underground. After Allen Company acquired the site, production was primarily <strong>surface drill-and-blast</strong> until last year. Surface mining has since <strong>ceased</strong>. Active production is now <strong>header mining on Level 1 and Level 2</strong> (room-and-pillar).</p>
        <p><strong>Material flow:</strong> Shot rock is hauled to the <strong>primary crusher on the surface</strong>, then conveyed from the <strong>surge silo</strong> to the <strong>secondary plant</strong>, where it is crushed, screened, and stockpiled on the surface and underground.</p>
        <p><strong>Site leadership:</strong> Foreman / site supervisor is <strong>Gene Smith</strong>, who has been at the quarry since its origin in 2001. Site leadership includes <strong>licensed blasters</strong>.</p>
        <div class="key-box"><strong>Site focus hazards:</strong> Roof and rib / ground control on Level 1 and Level 2; header mining faces; mobile equipment underground and on surface; primary crusher and surge silo; conveyors to secondary plant; surface and underground stockpiles; silica dust; noise; diesel equipment; and emergency escape from both levels plus surface gathering points.</div>
      </div>
      ${miningTerminologyPanel()}
      ${siteAerialPanel(
        "Dix River Stone",
        "4963 Danville Road, Lancaster, KY 40444",
        "37.6404113,-84.6599655",
        "Locate the entrance and portal areas, Danville Road access, surface primary crusher, surge silo, secondary plant, stockpiles, and the gathering areas designated by the instructor."
      )}
      <div class="content-section">
        <h3>Dix River Stone Site-Specific Policies (Review with Instructor)</h3>
        <ul>
          <li><strong>Check-in / check-out:</strong> Follow the site tag-in/tag-out or equivalent system every time you enter or leave underground. Never tag in for another person. Report to Gene Smith or the designated lead before starting work.</li>
          <li><strong>Know your level:</strong> Confirm whether you are assigned to Level 1 or Level 2. Escapeways and maps differ by level.</li>
          <li><strong>Ground control:</strong> Work only under examined and supported ground per the ground control plan. Header mining requires careful face examination—report cracking, spalling, water, or unusual sounds immediately. Scale only if trained and authorized.</li>
          <li><strong>MSA W65 self-rescuer:</strong> Carry and inspect the sealed W65 as required by the mine. Complete hands-on donning practice with the approved W65 training unit, and know where additional service units are stored.</li>
          <li><strong>Primary crusher / surge silo / secondary plant:</strong> Shot rock is hauled to the surface primary crusher and conveyed from the surge silo to the secondary plant. Respect all guards, lockout/tagout, restricted areas, and traffic around crusher, silo, and plant equipment.</li>
          <li><strong>Stockpiles:</strong> Product is stockpiled on the surface and underground. Follow site rules near piles—bridging and engulfment are serious hazards.</li>
          <li><strong>Mobile equipment &amp; traffic:</strong> Positive communication when approaching loaders or haul trucks. Stay out of blind spots. Follow designated travelways between levels, the crusher, and the plant.</li>
          <li><strong>PPE:</strong> Hard hat, safety glasses, steel-toe boots, high-visibility clothing where required, hearing protection as required, and any task-specific PPE (including respiratory protection as directed).</li>
          <li><strong>Hazard reporting:</strong> Report hazards immediately to your supervisor or designated safety contact. Do not assume someone else has already reported it.</li>
          <li><strong>Emergency / escapeways / fire:</strong> Know the primary and secondary escapeways from your work area on each level, emergency gathering points, radio procedures, and how to summon help. Know fire extinguisher locations and fire response for your area. Participate fully in evacuation and fire drills.</li>
        </ul>
        <div class="warning-box">These are orientation points for Dix River Stone. Your instructor will cover current written plans (ground control, escape, fire, ventilation), emergency contacts, gathering points, and any unique site rules. Ask questions if anything is unclear.</div>
      </div>
      ${siteSafetyRecordPanel(SITE_SAFETY_RECORDS["Dix River Stone"])}
      ${emergencyCardPanel("Dix River Stone", ["My level today (Level 1 or Level 2) and work area"])}
      <div class="video-box">
        <p style="font-weight:600;margin-bottom:8px;">Required Viewing / Instructor Presentation</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:10px;">Review Dix River Stone site rules, level layout, and emergency procedures with your instructor. Required seat time for this module is 1.5 hours (auto-tracked).</p>
        <div class="timer-display" id="timer-1">90:00</div>
        <button class="btn btn-sm" id="btn-timer-1" onclick="startTimer(1, 90)">Start 1.5-hour Required Timer (90 min)</button>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-top:8px;" id="timer-status-1">Timer not started</p>
      </div>
    `,
    questions: [
      { q: "Dix River Stone’s MSHA Mine ID is:", options: ["15-00006", "15-18389", "15-00112", "15-19898"], answer: 1 },
      { q: "Both reportable injuries at Dix River Stone since 2018 happened when workers:", options: ["Were struck by flying rock from a blast", "Fell while stepping down from a truck or office steps at the end of a shift", "Were caught in a conveyor", "Breathed exhaust in the shop"], answer: 1 },
      { q: "The Allen Company purchased Dix River Stone in:", options: ["1939", "2004", "2018", "2021"], answer: 2 },
      { q: "Dix River Stone currently produces mainly by:", options: ["Surface mining only", "Header mining on Level 1 and Level 2 (surface mining has ceased)", "Coal extraction", "Only stockpile cleanup"], answer: 1 },
      { q: "Shot rock at Dix River Stone is typically:", options: ["Left underground forever", "Hauled to the surface primary crusher, then conveyed from the surge silo to the secondary plant", "Dumped in the Kentucky River", "Sent only to Boonesboro"], answer: 1 },
      { q: "Dix River Stone and Boonesboro both mine:", options: ["Coal only", "Camp Nelson Limestone", "Sand and gravel only", "Granite"], answer: 1 },
      { q: "The long-time foreman / site supervisor at Dix River Stone is:", options: ["Dustin Conn", "Gene Smith", "Andrew Burton", "Kendell Barnes"], answer: 1 },
      { q: "What should you do if you discover a condition that could cause serious injury?", options: ["Wait until the end of shift", "Assume a supervisor already knows", "Report it immediately according to site procedures", "Only report it if someone is already injured"], answer: 2 }
    ]
  }
};
