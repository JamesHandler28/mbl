// match_27.ts — Week 4, orange vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_27: MatchWithLogs = {
  id: "s1-w4-m3",
  round: "Week 4",
  team1: "orange",
  team2: "pink",
  winner: "pink",       // set to "orange" or "pink" once played
  score: "2-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/9X3fkb_yREQ?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [2, 1, 0, 19],
        "Crow Scythe": [0, 1, 0, 0],
        "Venom Scythe": [0, 1, 0, 3],
        "Laser Dagger": [0, 1, 1, 9],
    } },
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [0, 1, 1, 6],
        "Cursed Cutlass": [0, 1, 2, 12],
        "Snow Shovel": [2, 0, 0, 13],
        "Spiderweb Wand": [2, 0, 0, 14],
    } },
  }
};
