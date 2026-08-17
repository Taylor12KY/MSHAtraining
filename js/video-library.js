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
  }
];

const FIRST_VIDEO_BATCH_IDS = new Set([
  "_s2x4dmQgjU", "NH7vatxj_t0", "1OJUEmUAPmc", "CHTJ8i55HUk",
  "4rQwxVnYcLk", "MziZesbb32Q", "X5r4upNwIGk", "4MjKwOI2LrE",
  "iX8j7h7bJF4", "e8mGpQ9W4_w", "VEOVVx3rDyI", "gbaGN7JQoO4",
  "9wnDBLifDB4", "mSt9lHz22xM", "528dJg0lESM", "Oaxs7EEIp4k"
]);

const PRE_EXISTING_VIDEO_IDS = new Set([
  "QGkT8Ahh1-E", "98555798", "AU07-U96dfw", "NH7vatxj_t0",
  "yEwFZHVLsso", "GSPRVJsu3_A", "qDDg-CbOTmw", "j9DNL0DnKmU", "OxOwJC5wHyc",
  "wal2KP1bbIY"
]);

function getRequiredVideos(moduleId) {
  return REQUIRED_VIDEOS.filter(video => video.moduleId === moduleId);
}
