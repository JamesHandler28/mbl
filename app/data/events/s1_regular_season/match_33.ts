// match_33.ts — Week 5, orange vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_33: MatchWithLogs = {
  id: "s1-w5-m1",
  round: "Week 5",
  team1: "orange",
  team2: "red",
  winner: "red",       // set to "orange" or "red" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/5ze0U3nM3Hc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [1, 1, 0, 12],
        "Crow Scythe": [0, 1, 0, 0],
        "Venom Scythe": [0, 1, 0, 0],
        "Laser Dagger": [0, 1, 0, 0],
    } },
    red: { result: "WIN", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 1, 1, 3],
        "Mastermind Staff": [0, 0, 2, 15],
        "Candy Hammer": [3, 0, 0, 18],
        "Lightning Jitte": [1, 0, 1, 13],
    } },
  }
};
