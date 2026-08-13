// match_36.ts — Week 5, yellow vs orange
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_36: MatchWithLogs = {
  id: "s1-w5-m4",
  round: "Week 5",
  team1: "yellow",
  team2: "orange",
  winner: "yellow",       // set to "yellow" or "orange" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/5ze0U3nM3Hc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    yellow: { result: "WIN", gamesCount: 1, stats: {
        "Icey Staff": [1, 1, 1, 9],
        "Frost Blade": [1, 0, 1, 7],
        "Blood Blade": [0, 1, 2, 10],
        "Z Hammer": [2, 0, 1, 21],
    } },
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [0, 1, 0, 6],
        "Crow Scythe": [2, 1, 0, 13],
        "Venom Scythe": [0, 1, 0, 0],
        "Laser Dagger": [0, 1, 1, 7],
    } },
  }
};
