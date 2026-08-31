// match_1.ts — Semifinal 1, Game 1, Pink vs Purple
// Map: Wreckage (Even). Pink is the higher seed, home for Games 1 & 3.

import { MatchWithLogs } from '../_matchType';

export const MATCH_1: MatchWithLogs = {
  id: "s1-p-m1-1",
  round: "Semifinal 1",
  team1: "pink",
  team2: "purple",
  winner: "purple",
  score: "3-4",
  videoUrl: undefined,
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {
        "Chaos Scythe": [0, 1, 1, 6],
        "Cursed Cutlass": [0, 1, 0, 4],
        "Snow Shovel": [1, 1, 0, 10],
        "Spiderweb Wand": [2, 1, 0, 19],
    } },
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [3, 0, 1, 24],
        "Kitty Hammer": [0, 1, 1, 7],
        "Crimson Katana": [1, 1, 1, 12],
        "Rusty Cutlass": [0, 1, 1, 6],
    } },
  }
};