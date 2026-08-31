// match_5.ts — Semifinal 2, Game 2, Green vs Blue
// Map: Pinwheel.

import { MatchWithLogs } from '../_matchType';

export const MATCH_5: MatchWithLogs = {
  id: "s1-p-m2-2",
  round: "Semifinal 2",
  team1: "green",
  team2: "blue",
  winner: "blue",
  score: "2-4",
  videoUrl: undefined,
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {
        "Whale Saber": [0, 1, 1, 9],
        "Gray Pike": [1, 1, 0, 11],
        "Water Blade": [1, 1, 0, 6],
        "Demon Cleaver": [0, 1, 0, 5],
    } },
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [3, 0, 0, 18],
        "Underworld Scythe": [0, 1, 1, 7],
        "Eye Scepter": [0, 1, 1, 6],
        "Zombie Arm": [1, 0, 1, 16],
    } },
  }
};