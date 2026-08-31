// match_2.ts — Semifinal 1, Game 2, Pink vs Purple
// Map: Pinwheel.

import { MatchWithLogs } from '../_matchType';

export const MATCH_2: MatchWithLogs = {
  id: "s1-p-m1-2",
  round: "Semifinal 1",
  team1: "pink",
  team2: "purple",
  winner: "pink",
  score: "4-3",
  videoUrl: undefined,
  logs: {
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [2, 1, 1, 24],
        "Cursed Cutlass": [0, 1, 1, 6],
        "Snow Shovel": [1, 1, 1, 13],
        "Spiderweb Wand": [1, 0, 0, 6],
    } },
    purple: { result: "LOSS", gamesCount: 1, stats: {
        "Sharkbait Sword": [0, 1, 1, 6],
        "Kitty Hammer": [3, 1, 0, 18],
        "Crimson Katana": [0, 1, 1, 4],
        "Rusty Cutlass": [0, 1, 1, 6],
    } },
  }
};