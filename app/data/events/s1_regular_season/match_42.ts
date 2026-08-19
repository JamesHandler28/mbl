// match_42.ts — Week 6, pink vs orange
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_42: MatchWithLogs = {
  id: "s1-w6-m2",
  round: "Week 6",
  team1: "pink",
  team2: "orange",
  winner: "pink",       // set to "pink" or "orange" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/fW4BJ2P3Jas?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [0, 1, 1, 9],
        "Cursed Cutlass": [3, 0, 0, 18],
        "Snow Shovel": [1, 0, 2, 15],
        "Spiderweb Wand": [0, 1, 2, 9],
    } },
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [0, 1, 1, 6],
        "Crow Scythe": [1, 1, 1, 15],
        "Venom Scythe": [1, 1, 0, 12],
        "Laser Dagger": [0, 1, 0, 0],
    } },
  }
};
