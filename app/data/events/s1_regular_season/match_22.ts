// match_22.ts — Week 3, yellow vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_22: MatchWithLogs = {
  id: "s1-w3-m6",
  round: "Week 3",
  team1: "yellow",
  team2: "blue",
  winner: "yellow",       // set to "yellow" or "blue" once played
  score: "4-3",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    yellow: { result: "WIN", gamesCount: 1, stats: {
        "Icey Staff": [3, 0, 0, 33],
        "Frost Blade": [0, 1, 1, 3],
        "Blood Blade": [0, 1, 1, 6],
        "Z Hammer": [1, 1, 0, 6],
    } },
    blue: { result: "LOSS", gamesCount: 1, stats: {
        "Rogue Warhead": [2, 1, 1, 19],
        "Underworld Scythe": [1, 1, 0, 10],
        "Eye Scepter": [0, 1, 0, 3],
        "Zombie Arm": [0, 1, 1, 6],
    } },
  }
};
