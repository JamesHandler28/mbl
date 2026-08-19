// match_45.ts — Week 6, blue vs orange
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_45: MatchWithLogs = {
  id: "s1-w6-m5",
  round: "Week 6",
  team1: "blue",
  team2: "orange",
  winner: "blue",       // set to "blue" or "orange" once played
  score: "4-3",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/JbZjyUdJpjo?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [0, 1, 1, 6],
        "Underworld Scythe": [2, 1, 2, 21],
        "Eye Scepter": [0, 1, 1, 9],
        "Zombie Arm": [2, 0, 0, 15],
    } },
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [0, 1, 1, 6],
        "Crow Scythe": [1, 1, 1, 9],
        "Venom Scythe": [0, 1, 1, 6],
        "Laser Dagger": [2, 1, 0, 14],
    } },
  }
};
