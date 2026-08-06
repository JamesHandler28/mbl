// match_10.ts — Week 2, orange vs green
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_10: MatchWithLogs = {
  id: "s1-w2-m2",
  round: "Week 2",
  team1: "orange",
  team2: "green",
  winner: "green",       // set to "orange" or "green" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/7rNZkCREUmY?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [0, 1, 0, 9],
        "Crow Scythe": [0, 1, 1, 6],
        "Venom Scythe": [1, 1, 0, 6],
        "Laser Dagger": [0, 1, 0, 3],
    } },
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [0, 0, 3, 17],
        "Gray Pike": [0, 1, 1, 6],
        "Water Blade": [2, 0, 1, 14],
        "Demon Cleaver": [2, 0, 1, 12],
    } },
  }
};
