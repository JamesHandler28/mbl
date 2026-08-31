// match_8.ts — Final, Game 2, Blue vs Purple
// Map: Chicane.

import { MatchWithLogs } from '../_matchType';

export const MATCH_8: MatchWithLogs = {
  id: "s1-p-m3-2",
  round: "Final",
  team1: "blue",
  team2: "purple",
  winner: "purple",
  score: "1-4",
  videoUrl: undefined,
  logs: {
    blue: { result: "LOSS", gamesCount: 1, stats: {
        "Rogue Warhead": [0, 1, 1, 6],
        "Underworld Scythe": [0, 1, 0, 6],
        "Eye Scepter": [1, 1, 0, 6],
        "Zombie Arm": [0, 1, 0, 6],
    } },
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [1, 0, 1, 13],
        "Kitty Hammer": [1, 0, 2, 24],
        "Crimson Katana": [2, 0, 1, 17],
        "Rusty Cutlass": [0, 1, 0, 0],
    } },
  }
};