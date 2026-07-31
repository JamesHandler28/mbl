// match_5.ts — Week 1, orange vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_5: MatchWithLogs = {
  id: "s1-w1-m5",
  round: "Week 1",
  team1: "orange",
  team2: "black",
  winner: "black",       // set to "orange" or "black" once played
  score: "3-4",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [1, 1, 0, 12],
        "Crow Scythe": [0, 1, 1, 6],
        "Venom Scythe": [1, 1, 1, 12],
        "Laser Dagger": [1, 1, 0, 4],
    } },
    black: { result: "WIN", gamesCount: 1, stats: {
        "Galactic Sword": [2, 1, 1, 19],
        "Melony Smasher": [2, 0, 0, 12],
        "Golden Razor": [0, 1, 0, 0],
        "Frozen Khopesh": [0, 1, 3, 15],
    } },
  }
};
