// app/data/events/s1_major2.ts

import { Match } from '../roster'; 

export const S1_MAJOR_2_INFO = {
  id: "s1-major-2",
  name: "Major 2: Group Stage Clash",
  championId: null,
};

export const S1_MAJOR_2_BRACKET: Match[] = [
  // --- GROUP 1 MATCHES ---
  // (South Park, Mushroom Kingdom, Bikini Bottom, Peanuts)
  { id: "m2-g1-1", round: "Group 1", team1: "south-park",       team2: "mushroom-kingdom", winner: null, score: "VS" },
  { id: "m2-g1-2", round: "Group 1", team1: "bikini-bottom",    team2: "peanuts",          winner: null, score: "VS" },
  { id: "m2-g1-3", round: "Group 1", team1: "south-park",       team2: "bikini-bottom",    winner: null, score: "VS" },
  { id: "m2-g1-4", round: "Group 1", team1: "mushroom-kingdom", team2: "peanuts",          winner: null, score: "VS" },
  { id: "m2-g1-5", round: "Group 1", team1: "south-park",       team2: "peanuts",          winner: null, score: "VS" },
  { id: "m2-g1-6", round: "Group 1", team1: "mushroom-kingdom", team2: "bikini-bottom",    winner: null, score: "VS" },

  // --- GROUP 2 MATCHES ---
  // (DC, Springfield, Quahog, Team Rings)
  { id: "m2-g2-1", round: "Group 2", team1: "team-dc",          team2: "springfield",      winner: null, score: "VS" },
  { id: "m2-g2-2", round: "Group 2", team1: "quahog",           team2: "team-rings",       winner: null, score: "VS" },
  { id: "m2-g2-3", round: "Group 2", team1: "team-dc",          team2: "quahog",           winner: null, score: "VS" },
  { id: "m2-g2-4", round: "Group 2", team1: "springfield",      team2: "team-rings",       winner: null, score: "VS" },
  { id: "m2-g2-5", round: "Group 2", team1: "team-dc",          team2: "team-rings",       winner: null, score: "VS" },
  { id: "m2-g2-6", round: "Group 2", team1: "springfield",      team2: "quahog",           winner: null, score: "VS" },
];

export const S1_MAJOR_2_LOGS = [
  // Add logs here as you play the games!
];