// match_18.ts — Week 3, purple vs orange
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_18: MatchWithLogs = {
  id: "s1-w3-m2",
  round: "Week 3",
  team1: "purple",
  team2: "orange",
  winner: "orange",       // set to "purple" or "orange" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "LOSS", gamesCount: 1, stats: {
        "Sharkbait Sword": [1, 1, 0, 12],
        "Kitty Hammer": [0, 1, 1, 6],
        "Crimson Katana": [0, 1, 0, 0],
        "Rusty Cutlass": [0, 1, 0, 0],
    } },
    orange: { result: "WIN", gamesCount: 1, stats: {
        "Iron Katana": [0, 1, 1, 9],
        "Crow Scythe": [2, 0, 2, 24],
        "Venom Scythe": [0, 0, 2, 7],
        "Laser Dagger": [2, 0, 0, 6],
    } },
  }
};
