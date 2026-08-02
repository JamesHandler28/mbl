// match_14.ts — Week 2, blue vs orange
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_14: MatchWithLogs = {
  id: "s1-w2-m6",
  round: "Week 2",
  team1: "blue",
  team2: "orange",
  winner: "orange",       // set to "blue" or "orange" once played
  score: "3-4",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    blue: { result: "LOSS", gamesCount: 1, stats: {
        "Rogue Warhead": [1, 1, 1, 12],
        "Underworld Scythe": [0, 1, 1, 1],
        "Eye Scepter": [2, 1, 0, 22],
        "Zombie Arm": [0, 1, 2, 7],
    } },
    orange: { result: "WIN", gamesCount: 1, stats: {
        "Iron Katana": [1, 1, 1, 12],
        "Crow Scythe": [0, 1, 1, 6],
        "Venom Scythe": [3, 0, 1, 16],
        "Laser Dagger": [0, 1, 2, 12],
    } },
  }
};
