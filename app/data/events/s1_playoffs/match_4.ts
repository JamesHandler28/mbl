// match_4.ts — Semifinal 2, Game 1, Green vs Blue
// Map: Wreckage (Even). Green is the higher seed, home for Games 1 & 3.

import { MatchWithLogs } from '../_matchType';

export const MATCH_4: MatchWithLogs = {
  id: "s1-p-m2-1",
  round: "Semifinal 2",
  team1: "green",
  team2: "blue",
  winner: "green",
  score: "4-3",
  videoUrl: undefined,
  logs: {
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [1, 1, 0, 10],
        "Gray Pike": [1, 0, 1, 21],
        "Water Blade": [1, 1, 0, 15],
        "Demon Cleaver": [1, 1, 0, 4],
    } },
    blue: { result: "LOSS", gamesCount: 1, stats: {
        "Rogue Warhead": [0, 1, 2, 10],
        "Underworld Scythe": [0, 1, 1, 5],
        "Eye Scepter": [0, 1, 1, 1],
        "Zombie Arm": [3, 1, 0, 19],
    } },
  }
};