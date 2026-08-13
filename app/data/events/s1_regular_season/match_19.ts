// match_19.ts — Week 3, orange vs green
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_19: MatchWithLogs = {
  id: "s1-w3-m3",
  round: "Week 3",
  team1: "orange",
  team2: "green",
  winner: "green",       // set to "orange" or "green" once played
  score: "3-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/KiC3nunbMIo?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {
        "Iron Katana": [1, 1, 1, 14],
        "Crow Scythe": [1, 1, 0, 11],
        "Venom Scythe": [1, 1, 1, 12],
        "Laser Dagger": [0, 1, 1, 6],
    } },
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [4, 0, 0, 32],
        "Gray Pike": [0, 1, 1, 6],
        "Water Blade": [0, 1, 1, 6],
        "Demon Cleaver": [0, 1, 1, 4],
    } },
  }
};
