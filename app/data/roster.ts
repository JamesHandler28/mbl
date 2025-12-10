// app/data/roster.ts

// --- INTERFACES ---
export interface Player {
  name: string;
  role: "Captain" | "Member";
  image?: string;
  
  // AI ATTRIBUTES
  attributes?: {
    speed: number;       // 0.0 to 1.0 (scales to 100%)
    aggression: number;  // Pixels (Max ~800)
    strafeRate: number;  // 0.0 to 1.0
    meleeBias: number;   // 0.0 to 1.0
  };

  // CALCULATED STATS
  kills?: number;
  deaths?: number;
  assists?: number;
  damageDealt?: number;
  gamesPlayed?: number;
  wins?: number;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  shadow: string;
  players: Player[];
}

export interface Match {
  id: string;
  round: string;
  team1: string;
  team2: string;
  winner: string | null;
  score: string;
}

export interface Event {
  id: string;
  name: string;
  championId: string | null;
  matches: Match[];
}

// --- STATIC DATA ---
export const STATIC_TEAMS: Team[] = [
  // 1. BIKINI BOTTOM (Pink)
  {
    id: "bikini-bottom",
    name: "Bikini Bottom",
    color: "border-pink-500",
    shadow: "shadow-pink-500/50",
    players: [
      { name: "SpongeBob", role: "Captain", image: "BBSpongebob.png", attributes: { speed: 0.5, aggression: 100, strafeRate: 0.5, meleeBias: 0.4 } },
      { name: "Patrick",   role: "Member",  image: "BBPatrick.png",   attributes: { speed: 0.4, aggression: 100, strafeRate: 0.1, meleeBias: 0.4 } },
      { name: "Squidward", role: "Member",  image: "BBSquidward.png", attributes: { speed: 0.4, aggression: 600, strafeRate: 0.1, meleeBias: 0.4 } },
      { name: "Mr. Krabs", role: "Member",  image: "BBKrabs.png",     attributes: { speed: 0.5, aggression: 150, strafeRate: 0.2, meleeBias: 0.3 } },
    ]
  },
  // 2. QUAHOG (Blue)
  {
    id: "quahog",
    name: "Quahog",
    color: "border-blue-500",
    shadow: "shadow-blue-500/50",
    players: [
      { name: "Peter",  role: "Captain", image: "QPeter.png",  attributes: { speed: 0.4, aggression: 100, strafeRate: 0.0, meleeBias: 0.4 } },
      { name: "Stewie", role: "Member",  image: "QStewie.png", attributes: { speed: 0.2, aggression: 700, strafeRate: 0.3, meleeBias: 0.3 } },
      { name: "Brian",  role: "Member",  image: "QBrian.png",  attributes: { speed: 0.7, aggression: 400, strafeRate: 0.1, meleeBias: 0.6 } },
      { name: "Lois",   role: "Member",  image: "QLois.png",   attributes: { speed: 0.5, aggression: 200, strafeRate: 0.2, meleeBias: 0.5 } },
    ]
  },
  // 3. MUSHROOM KINGDOM (Red)
  {
    id: "mushroom-kingdom",
    name: "Mushroom Kingdom",
    color: "border-red-500",
    shadow: "shadow-red-500/50",
    players: [
      { name: "Mario",  role: "Captain", image: "MKMario.png",  attributes: { speed: 0.6, aggression: 300, strafeRate: 0.2, meleeBias: 0.7 } },
      { name: "Luigi",  role: "Member",  image: "MKLuigi.png",  attributes: { speed: 0.5, aggression: 500, strafeRate: 0.6, meleeBias: 0.6 } },
      { name: "Bowser", role: "Member",  image: "MKBowser.png", attributes: { speed: 0.3, aggression: 100, strafeRate: 0.0, meleeBias: 0.2 } },
      { name: "Peach",  role: "Member",  image: "MKPeach.png",  attributes: { speed: 0.6, aggression: 600, strafeRate: 0.2, meleeBias: 0.5 } },
    ]
  },
  // 4. SPRINGFIELD (Yellow)
  {
    id: "springfield",
    name: "Springfield",
    color: "border-yellow-400",
    shadow: "shadow-yellow-400/50",
    players: [
      { name: "Homer", role: "Captain", image: "SHomer.png", attributes: { speed: 0.4, aggression: 150, strafeRate: 0.1, meleeBias: 0.5 } },
      { name: "Bart",  role: "Member",  image: "SBart.png",  attributes: { speed: 0.6, aggression: 300, strafeRate: 0.7, meleeBias: 0.4 } },
      { name: "Lisa",  role: "Member",  image: "SLisa.png",  attributes: { speed: 0.5, aggression: 800, strafeRate: 0.1, meleeBias: 0.6 } },
      { name: "Marge", role: "Member",  image: "SMarge.png", attributes: { speed: 0.3, aggression: 400, strafeRate: 0.2, meleeBias: 0.6 } },
    ]
  },
  // 5. TEAM RINGS (Green)
  {
    id: "team-rings",
    name: "Rings",
    color: "border-green-500",
    shadow: "shadow-green-500/50",
    players: [
      { name: "Sonic",    role: "Captain", image: "RSonic.png",    attributes: { speed: 1.0, aggression: 100, strafeRate: 0.8, meleeBias: 0.3 } },
      { name: "Knuckles", role: "Member",  image: "RKnuckles.png", attributes: { speed: 0.8, aggression: 100, strafeRate: 0.8, meleeBias: 0.8 } },
      { name: "Tails",    role: "Member",  image: "RTails.png",    attributes: { speed: 0.7, aggression: 500, strafeRate: 0.8, meleeBias: 0.2 } },
      { name: "Shadow",   role: "Member",  image: "RShadow.png",   attributes: { speed: 0.9, aggression: 600, strafeRate: 0.9, meleeBias: 0.8 } },
    ]
  },
  // 6. TEAM DC (Slate)
  {
    id: "team-dc",
    name: "DC",
    color: "border-slate-400",
    shadow: "shadow-slate-400/50",
    players: [
      { name: "Superman", role: "Captain", image: "DCSuperman.png", attributes: { speed: 0.8, aggression: 100, strafeRate: 0.1, meleeBias: 0.5 } },
      { name: "Batman",   role: "Member",  image: "DCBatman.png",   attributes: { speed: 0.5, aggression: 300, strafeRate: 0.5, meleeBias: 0.5 } },
      { name: "Flash",    role: "Member",  image: "DCFlash.png",    attributes: { speed: 1.0, aggression: 100, strafeRate: 0.9, meleeBias: 0.3 } },
      { name: "Wonder",   role: "Member",  image: "DCWonder.png",   attributes: { speed: 0.5, aggression: 100, strafeRate: 0.0, meleeBias: 0.3 } },
    ]
  },
  // 7. SOUTH PARK (Gray)
  {
    id: "south-park",
    name: "South Park",
    color: "border-gray-100",
    shadow: "shadow-gray-100/50",
    players: [
      { name: "Cartman", role: "Captain", image: "SPCartman.png", attributes: { speed: 0.2, aggression: 150, strafeRate: 0.1, meleeBias: 0.4 } },
      { name: "Kenny",   role: "Member",  image: "SPKenny.png",   attributes: { speed: 0.7, aggression: 200, strafeRate: 0.5, meleeBias: 0.5 } },
      { name: "Kyle",    role: "Member",  image: "SPKyle.png",    attributes: { speed: 0.4, aggression: 500, strafeRate: 0.2, meleeBias: 0.5 } },
      { name: "Stan",    role: "Member",  image: "SPStan.png",    attributes: { speed: 0.5, aggression: 300, strafeRate: 0.2, meleeBias: 0.4 } },
    ]
  },
  // 8. PEANUTS (Orange)
  {
    id: "peanuts",
    name: "Peanuts",
    color: "border-orange-500",
    shadow: "shadow-orange-500/50",
    players: [
      { name: "Charlie B", role: "Captain", image: "PCharlieB.png", attributes: { speed: 0.4, aggression: 200, strafeRate: 0.1, meleeBias: 0.4 } },
      { name: "Snoopy",    role: "Member",  image: "PSnoopy.png",   attributes: { speed: 0.7, aggression: 100, strafeRate: 0.6, meleeBias: 0.7 } },
      { name: "Lucy",      role: "Member",  image: "PLucy.png",     attributes: { speed: 0.3, aggression: 150, strafeRate: 0.2, meleeBias: 0.8 } },
      { name: "Woodstock", role: "Member",  image: "PWoodstock.png", attributes: { speed: 0.6, aggression: 500, strafeRate: 0.3, meleeBias: 0.3 } },
    ]
  },
];