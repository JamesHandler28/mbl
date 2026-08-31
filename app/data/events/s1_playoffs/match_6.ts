// match_6.ts — Semifinal 2, Game 3 (deciding game), Green vs Blue
// Map: Colosseum. Green is home (higher seed, Game 3).

import { MatchWithLogs } from '../_matchType';

export const MATCH_6: MatchWithLogs = {
  id: "s1-p-m2-3",
  round: "Semifinal 2",
  team1: "green",
  team2: "blue",
  winner: "blue",
  score: "1-4",
  videoUrl: undefined,
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {
        "Whale Saber": [0, 1, 1, 8],
        "Gray Pike": [1, 1, 0, 6],
        "Water Blade": [0, 1, 0, 9],
        "Demon Cleaver": [0, 1, 0, 4],
    } },
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [0, 1, 1, 6],
        "Underworld Scythe": [2, 0, 0, 12],
        "Eye Scepter": [1, 0, 1, 12],
        "Zombie Arm": [1, 0, 2, 18],
    } },
  }
};