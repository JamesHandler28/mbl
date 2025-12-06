// app/data/events/s1_major2.ts

import { Match } from '../roster'; 

export const S1_MAJOR_2_INFO = {
  id: "s1-major-2",
  name: "Major 2: Single Elimination", // Change this to your actual name
  championId: null, // Change to team ID when someone wins
};

export const S1_MAJOR_2_BRACKET: Match[] = [
  // Define your Quarterfinals here when ready...
  // { id: "m2-1", round: "Quarterfinals", team1: "...", team2: "...", winner: null, score: "VS" },
];

export const S1_MAJOR_2_LOGS = [
  // Paste your Match Results here after games finish...
  // {
  //   matchId: "m2-1", teamId: "...", result: "WIN", gamesCount: 2,
  //   stats: { "PlayerName": [10, 2, 5, 5000] } 
  // }
];