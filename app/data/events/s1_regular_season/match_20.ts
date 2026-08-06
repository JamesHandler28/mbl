// match_20.ts — Week 3, green vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_20: MatchWithLogs = {
  id: "s1-w3-m4",
  round: "Week 3",
  team1: "green",
  team2: "blue",
  winner: "green",       // set to "green" or "blue" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [1, 0, 0, 9],
        "Gray Pike": [1, 0, 0, 4],
        "Water Blade": [1, 1, 3, 25],
        "Demon Cleaver": [1, 1, 0, 6],
    } },
    blue: { result: "LOSS", gamesCount: 1, stats: {
        "Rogue Warhead": [2, 1, 0, 18],
        "Underworld Scythe": [0, 1, 1, 12],
        "Eye Scepter": [0, 1, 1, 6],
        "Zombie Arm": [0, 1, 0, 0],
    } },
  }
};
