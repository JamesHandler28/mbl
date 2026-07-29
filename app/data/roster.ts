// app/data/roster.ts

// --- INTERFACES ---
export interface Player {
  name: string;        // weapon callsign, e.g. "Chaos Scythe"
  role: "Captain" | "Member";
  image?: string;       // composited player portrait (body + hands + weapon), from public/players
  weaponImage?: string; // raw weapon icon only, from public/weapons

  // AI ATTRIBUTES — 6 stats shown on the player card
  attributes?: {
    accuracy: number;      // 0.0 to 1.0 (scales to 100%)
    patience: number;      // frames (max ~250)
    meleeBias: number;     // 0.0 to 1.0
    strafeRate: number;    // 0.0 to 1.0
    aggression: number;    // pixels (max ~800)
    packAffinity: number;  // 0.0 to 1.0
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
  videoUrl?: string; // YouTube URL for this match's recap/highlight, if recorded
}

export interface Event {
  id: string;
  name: string;
  championId: string | null;
  matches: Match[];
}

// --- STATIC DATA ---
export const STATIC_TEAMS: Team[] = [
  // 1. RED
  {
    id: "red",
    name: "Red",
    color: "border-red-500",
    shadow: "shadow-red-500/50",
    players: [
      { name: "Pinetree Lance", role: "Captain", image: "Pinetree_Lance.png", weaponImage: "PinetreeLance.png",
        attributes: { accuracy: 0.51, patience: 91, meleeBias: 0.39, strafeRate: 0.13, aggression: 576, packAffinity: 0.19 } },
      { name: "Mastermind Staff", role: "Member", image: "Mastermind_Staff.png", weaponImage: "MastermindStaff.png",
        attributes: { accuracy: 0.53, patience: 232, meleeBias: 0.33, strafeRate: 0.07, aggression: 158, packAffinity: 0.62 } },
      { name: "Candy Hammer", role: "Member", image: "Candy_Hammer.png", weaponImage: "CandyHammer.png",
        attributes: { accuracy: 0.93, patience: 141, meleeBias: 0.26, strafeRate: 0.29, aggression: 597, packAffinity: 0.27 } },
      { name: "Lightning Jitte", role: "Member", image: "Lightning_Jitte.png", weaponImage: "LightningJitte.png",
        attributes: { accuracy: 0.4, patience: 179, meleeBias: 0.54, strafeRate: 0.33, aggression: 414, packAffinity: 0.26 } },
    ]
  },
  // 2. BLUE
  {
    id: "blue",
    name: "Blue",
    color: "border-blue-500",
    shadow: "shadow-blue-500/50",
    players: [
      { name: "Rogue Warhead", role: "Captain", image: "Rogue_Warhead.png", weaponImage: "Warhead.png",
        attributes: { accuracy: 1.0, patience: 183, meleeBias: 0.37, strafeRate: 0.16, aggression: 336, packAffinity: 0.42 } },
      { name: "Underworld Scythe", role: "Member", image: "Underworld_Scythe.png", weaponImage: "UnderworldScythe.png",
        attributes: { accuracy: 0.65, patience: 189, meleeBias: 0.68, strafeRate: 0.2, aggression: 329, packAffinity: 0.36 } },
      { name: "Eye Scepter", role: "Member", image: "Eye_Scepter.png", weaponImage: "EyeScepter.png",
        attributes: { accuracy: 0.57, patience: 68, meleeBias: 0.23, strafeRate: 0.73, aggression: 448, packAffinity: 0.28 } },
      { name: "Zombie Arm", role: "Member", image: "Zombie_Arm.png", weaponImage: "ZombieArm.png",
        attributes: { accuracy: 0.9, patience: 132, meleeBias: 0.53, strafeRate: 0.13, aggression: 420, packAffinity: 0.53 } },
    ]
  },
  // 3. GREEN
  {
    id: "green",
    name: "Green",
    color: "border-green-500",
    shadow: "shadow-green-500/50",
    players: [
      { name: "Whale Saber", role: "Captain", image: "Whale_Saber.png", weaponImage: "SmilinWhaleSaber.png",
        attributes: { accuracy: 1.0, patience: 150, meleeBias: 0.69, strafeRate: 0.1, aggression: 762, packAffinity: 0.58 } },
      { name: "Gray Pike", role: "Member", image: "Gray_Pike.png", weaponImage: "PikeGrayBlue.png",
        attributes: { accuracy: 0.9, patience: 250, meleeBias: 0.21, strafeRate: 0.2, aggression: 629, packAffinity: 0.54 } },
      { name: "Water Blade", role: "Member", image: "Water_Blade.png", weaponImage: "WaterSpiritEnchantedBlade.png",
        attributes: { accuracy: 0.82, patience: 180, meleeBias: 0.78, strafeRate: 0.74, aggression: 268, packAffinity: 0.57 } },
      { name: "Demon Cleaver", role: "Member", image: "Demon_Cleaver.png", weaponImage: "DemonCleaver.png",
        attributes: { accuracy: 0.4, patience: 167, meleeBias: 0.69, strafeRate: 0.68, aggression: 543, packAffinity: 0.63 } },
    ]
  },
  // 4. YELLOW
  {
    id: "yellow",
    name: "Yellow",
    color: "border-yellow-400",
    shadow: "shadow-yellow-400/50",
    players: [
      { name: "Icey Staff", role: "Captain", image: "Icey_Staff.png", weaponImage: "LostIceyStaff.png",
        attributes: { accuracy: 0.78, patience: 190, meleeBias: 0.66, strafeRate: 0.85, aggression: 614, packAffinity: 0.67 } },
      { name: "Frost Blade", role: "Member", image: "Frost_Blade.png", weaponImage: "IceBlade.png",
        attributes: { accuracy: 0.56, patience: 104, meleeBias: 0.52, strafeRate: 0.78, aggression: 131, packAffinity: 0.63 } },
      { name: "Blood Blade", role: "Member", image: "Blood_Blade.png", weaponImage: "BloodBlade2.png",
        attributes: { accuracy: 0.8, patience: 182, meleeBias: 0.22, strafeRate: 0.38, aggression: 215, packAffinity: 0.5 } },
      { name: "Z Hammer", role: "Member", image: "Z_Hammer.png", weaponImage: "TelebooperZHammer.png",
        attributes: { accuracy: 0.79, patience: 71, meleeBias: 0.6, strafeRate: 0.36, aggression: 706, packAffinity: 0.42 } },
    ]
  },
  // 5. PURPLE
  {
    id: "purple",
    name: "Purple",
    color: "border-purple-500",
    shadow: "shadow-purple-500/50",
    players: [
      { name: "Sharkbait Sword", role: "Captain", image: "Sharkbait_Sword.png", weaponImage: "SharkbaitPlunderedSword.png",
        attributes: { accuracy: 0.79, patience: 218, meleeBias: 0.52, strafeRate: 0.07, aggression: 459, packAffinity: 0.51 } },
      { name: "Kitty Hammer", role: "Member", image: "Kitty_Hammer.png", weaponImage: "KittyHammer.png",
        attributes: { accuracy: 0.89, patience: 250, meleeBias: 0.21, strafeRate: 0.84, aggression: 520, packAffinity: 0.7 } },
      { name: "Crimson Katana", role: "Member", image: "Crimson_Katana.png", weaponImage: "CrimsonKatana.png",
        attributes: { accuracy: 0.63, patience: 197, meleeBias: 0.53, strafeRate: 0.57, aggression: 156, packAffinity: 0.42 } },
      { name: "Rusty Cutlass", role: "Member", image: "Rusty_Cutlass.png", weaponImage: "PirateCutlass2.png",
        attributes: { accuracy: 0.4, patience: 97, meleeBias: 0.43, strafeRate: 0.7, aggression: 79, packAffinity: 0.25 } },
    ]
  },
  // 6. BLACK
  {
    id: "black",
    name: "Black",
    color: "border-gray-600",
    shadow: "shadow-gray-600/50",
    players: [
      { name: "Galactic Sword", role: "Captain", image: "Galactic_Sword.png", weaponImage: "GalacticSword.png",
        attributes: { accuracy: 0.77, patience: 178, meleeBias: 0.34, strafeRate: 0.41, aggression: 568, packAffinity: 0.18 } },
      { name: "Melony Smasher", role: "Member", image: "Melony_Smasher.png", weaponImage: "MelonySmasher.png",
        attributes: { accuracy: 0.53, patience: 240, meleeBias: 0.45, strafeRate: 0.1, aggression: 319, packAffinity: 0.32 } },
      { name: "Golden Razor", role: "Member", image: "Golden_Razor.png", weaponImage: "RazorEdgeGold.png",
        attributes: { accuracy: 0.73, patience: 230, meleeBias: 0.31, strafeRate: 0.45, aggression: 683, packAffinity: 0.64 } },
      { name: "Frozen Khopesh", role: "Member", image: "Frozen_Khopesh.png", weaponImage: "FrozenIceyKhopesh.png",
        attributes: { accuracy: 0.47, patience: 196, meleeBias: 0.37, strafeRate: 0.01, aggression: 633, packAffinity: 0.34 } },
    ]
  },
  // 7. PINK
  {
    id: "pink",
    name: "Pink",
    color: "border-pink-500",
    shadow: "shadow-pink-500/50",
    players: [
      { name: "Chaos Scythe", role: "Captain", image: "Chaos_Scythe.png", weaponImage: "ChaosBringingScythe.png",
        attributes: { accuracy: 0.96, patience: 245, meleeBias: 0.73, strafeRate: 0.77, aggression: 588, packAffinity: 0.69 } },
      { name: "Cursed Cutlass", role: "Member", image: "Cursed_Cutlass.png", weaponImage: "CursedCutlass.png",
        attributes: { accuracy: 0.5, patience: 172, meleeBias: 0.2, strafeRate: 0.84, aggression: 156, packAffinity: 0.63 } },
      { name: "Snow Shovel", role: "Member", image: "Snow_Shovel.png", weaponImage: "SnowShovel.png",
        attributes: { accuracy: 0.4, patience: 219, meleeBias: 0.26, strafeRate: 0.6, aggression: 382, packAffinity: 0.65 } },
      { name: "Spiderweb Wand", role: "Member", image: "Spiderweb_Wand.png", weaponImage: "SpiderwebWand.png",
        attributes: { accuracy: 0.67, patience: 60, meleeBias: 0.22, strafeRate: 0.71, aggression: 178, packAffinity: 0.64 } },
    ]
  },
  // 8. ORANGE
  {
    id: "orange",
    name: "Orange",
    color: "border-orange-500",
    shadow: "shadow-orange-500/50",
    players: [
      { name: "Iron Katana", role: "Captain", image: "Iron_Katana.png", weaponImage: "Katana.png",
        attributes: { accuracy: 0.56, patience: 250, meleeBias: 0.71, strafeRate: 0.34, aggression: 518, packAffinity: 0.54 } },
      { name: "Crow Scythe", role: "Member", image: "Crow_Scythe.png", weaponImage: "Horrow-CrowScythe.png",
        attributes: { accuracy: 0.97, patience: 162, meleeBias: 0.73, strafeRate: 0.69, aggression: 584, packAffinity: 0.58 } },
      { name: "Venom Scythe", role: "Member", image: "Venom_Scythe.png", weaponImage: "VenomousWebbedScythe.png",
        attributes: { accuracy: 0.68, patience: 60, meleeBias: 0.49, strafeRate: 0.23, aggression: 507, packAffinity: 0.29 } },
      { name: "Laser Dagger", role: "Member", image: "Laser_Dagger.png", weaponImage: "LaserDaggerOrange.png",
        attributes: { accuracy: 0.63, patience: 68, meleeBias: 0.37, strafeRate: 0.36, aggression: 122, packAffinity: 0.26 } },
    ]
  },
];

// --- SLUG HELPERS ---
// Converts a player name like "Chaos Scythe" into a URL-safe slug like
// "chaos-scythe", and back. Used for /players/[slug] routes.
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // strip anything not letters/numbers/spaces/hyphens
    .replace(/\s+/g, '-');         // spaces -> hyphens
}

// Given all teams, find a player + their team by slug. Returns null if no match.
export function findPlayerBySlug(teams: Team[], slug: string): { player: Player; team: Team } | null {
  for (const team of teams) {
    const player = team.players.find(p => slugify(p.name) === slug);
    if (player) return { player, team };
  }
  return null;
}

// --- OVR CALCULATION ---
// Base OVR is purely attribute-driven (accuracy, patience, meleeBias,
// strafeRate, aggression, packAffinity) — this is what a player's OVR
// is BEFORE they've played enough games for real performance to matter.
//
// Once a player has played enough games, their OVR gradually blends in
// actual performance (win rate + combat score per game), so a bot that's
// visibly over/under-performing its stats starts to reflect that — but
// not before there's enough sample size for it to mean anything.
//
// This is the SINGLE SOURCE OF TRUTH for OVR — every page (team page,
// player page, stats leaderboard) should import and use these functions
// rather than recalculating OVR locally, so the number is always
// consistent no matter where it's shown.

export function normalizeStat(value: number, max: number): number {
  return Math.round(Math.min(100, Math.max(0, (value / max) * 100)));
}

export function computeBaseOVR(attributes?: Player['attributes']): number {
  if (!attributes) return 50; // neutral default if a player somehow has no attributes
  const acc = normalizeStat(attributes.accuracy, 1);
  const pat = normalizeStat(attributes.patience, 250);
  const mel = normalizeStat(attributes.meleeBias, 1);
  const str = normalizeStat(attributes.strafeRate, 1);
  const agg = normalizeStat(attributes.aggression, 800);
  const pck = normalizeStat(attributes.packAffinity, 1);
  return Math.round((acc + pat + mel + str + agg + pck) / 6);
}

// Games needed before performance starts influencing OVR at all, and
// games needed before performance is fully "trusted" (max blend weight).
const OVR_PERFORMANCE_MIN_GAMES = 5;
const OVR_PERFORMANCE_FULL_TRUST_GAMES = 20;
const OVR_MAX_PERFORMANCE_SWING = 15; // OVR can move at most +/-15 from pure attribute-based rating

export function computeEffectiveOVR(player: Player): number {
  const baseOVR = computeBaseOVR(player.attributes);
  const gamesPlayed = player.gamesPlayed || 0;

  if (gamesPlayed < OVR_PERFORMANCE_MIN_GAMES) {
    return baseOVR; // not enough sample size yet — pure attribute-based
  }

  // How much do we trust performance data? Scales from 0 at MIN_GAMES
  // up to 1.0 at FULL_TRUST_GAMES.
  const trust = Math.min(
    1,
    (gamesPlayed - OVR_PERFORMANCE_MIN_GAMES) / (OVR_PERFORMANCE_FULL_TRUST_GAMES - OVR_PERFORMANCE_MIN_GAMES)
  );

  const winRate = (player.wins || 0) / gamesPlayed; // 0 to 1
  const combatScore = (player.kills || 0) * 10 + (player.assists || 0) * 5 - (player.deaths || 0) * 3;
  const scorePerGame = combatScore / gamesPlayed;

  // Normalize scorePerGame roughly onto a -1..1 scale (tune the divisor
  // once you see real numbers come in from actual matches)
  const normalizedScore = Math.max(-1, Math.min(1, scorePerGame / 20));
  const normalizedWinRate = (winRate - 0.5) * 2; // 0.5 win rate = neutral (0), 1.0 = +1, 0.0 = -1

  const performanceSignal = (normalizedScore * 0.6) + (normalizedWinRate * 0.4); // -1 to 1
  const swing = performanceSignal * OVR_MAX_PERFORMANCE_SWING * trust;

  return Math.round(Math.max(0, Math.min(100, baseOVR + swing)));
}