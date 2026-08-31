// match_3.ts — Semifinal 1, Game 3 (deciding game), Pink vs Purple
// Map: Colosseum. Pink is home (higher seed, Game 3).

import { MatchWithLogs } from '../_matchType';

export const MATCH_3: MatchWithLogs = {
  id: "s1-p-m1-3",
  round: "Semifinal 1",
  team1: "pink",
  team2: "purple",
  winner: "purple",
  score: "2-4",
  videoUrl: undefined,
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {
        "Chaos Scythe": [1, 1, 0, 16],
        "Cursed Cutlass": [0, 1, 0, 7],
        "Snow Shovel": [0, 1, 1, 3],
        "Spiderweb Wand": [1, 1, 0, 7],
    } },
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [1, 1, 1, 14],
        "Kitty Hammer": [1, 0, 1, 13],
        "Crimson Katana": [1, 0, 0, 8],
        "Rusty Cutlass": [1, 1, 1, 12],
    } },
  }
};