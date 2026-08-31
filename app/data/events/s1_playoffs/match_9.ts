// match_9.ts — Final, Game 3 (championship game), Blue vs Purple
// Map: Colosseum. Blue is home (higher seed, Game 3).

import { MatchWithLogs } from '../_matchType';

export const MATCH_9: MatchWithLogs = {
  id: "s1-p-m3-3",
  round: "Final",
  team1: "blue",
  team2: "purple",
  winner: "blue",
  score: "4-1",
  videoUrl: undefined,
  logs: {
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [0, 1, 0, 0],
        "Underworld Scythe": [2, 0, 1, 20],
        "Eye Scepter": [1, 0, 1, 5],
        "Zombie Arm": [1, 0, 2, 20],
    } },
    purple: { result: "LOSS", gamesCount: 1, stats: {
        "Sharkbait Sword": [0, 1, 0, 11],
        "Kitty Hammer": [0, 1, 1, 7],
        "Crimson Katana": [1, 1, 0, 6],
        "Rusty Cutlass": [0, 1, 0, 8],
    } },
  }
};