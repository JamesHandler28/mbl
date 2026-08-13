// match_31.ts — Week 4, orange vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_31: MatchWithLogs = {
  id: "s1-w4-m7",
  round: "Week 4",
  team1: "orange",
  team2: "red",
  winner: "red",       // set to "orange" or "red" once played
  score: "2-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/6b5GWUoBBbc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [1, 1, 1, 15],
        "Crow Scythe": [0, 1, 0, 6],
        "Venom Scythe": [0, 1, 0, 1],
        "Laser Dagger": [1, 1, 1, 15],
    } },
    red: { result: "WIN", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 1, 1, 7],
        "Mastermind Staff": [2, 0, 1, 18],
        "Candy Hammer": [2, 0, 1, 20],
        "Lightning Jitte": [0, 1, 1, 6],
    } },
  }
};
