// match_7.ts — Final, Game 1, Blue vs Purple
// Map: Diamond Core. Blue is the higher seed of the two finalists, home for Games 1 & 3.

import { MatchWithLogs } from '../_matchType';

export const MATCH_7: MatchWithLogs = {
  id: "s1-p-m3-1",
  round: "Final",
  team1: "blue",
  team2: "purple",
  winner: "blue",
  score: "4-2",
  videoUrl: undefined,
  logs: {
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [3, 0, 1, 22],
        "Underworld Scythe": [0, 1, 0, 0],
        "Eye Scepter": [1, 0, 2, 17],
        "Zombie Arm": [0, 1, 1, 6],
    } },
    purple: { result: "LOSS", gamesCount: 1, stats: {
        "Sharkbait Sword": [0, 1, 0, 6],
        "Kitty Hammer": [2, 1, 0, 10],
        "Crimson Katana": [0, 1, 1, 6],
        "Rusty Cutlass": [0, 1, 1, 6],
    } },
  }
};