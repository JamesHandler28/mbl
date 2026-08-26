// match_51.ts — Week 7, orange vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_51: MatchWithLogs = {
  id: "s1-w7-m3",
  round: "Week 7",
  team1: "orange",
  team2: "yellow",
  winner: "yellow",       // set to "orange" or "yellow" once played
  score: "3-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/ujqyxLDXf6g?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [2, 1, 0, 14],
        "Crow Scythe": [0, 1, 1, 6],
        "Venom Scythe": [0, 1, 1, 8],
        "Laser Dagger": [1, 1, 1, 6],
    } },
    yellow: { result: "WIN", gamesCount: 1, stats: {
        "Icey Staff": [1, 1, 1, 13],
        "Frost Blade": [1, 0, 0, 3],
        "Blood Blade": [1, 1, 1, 21],
        "Z Hammer": [1, 1, 0, 10],
    } },
  }
};
