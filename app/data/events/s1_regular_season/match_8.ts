// match_8.ts — Week 1, orange vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_8: MatchWithLogs = {
  id: "s1-w1-m8",
  round: "Week 1",
  team1: "orange",
  team2: "purple",
  winner: "orange",       // set to "orange" or "purple" once played
  score: "4-1",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "WIN", gamesCount: 1, stats: {
        "Iron Katana": [0, 0, 1, 6],
        "Crow Scythe": [0, 1, 1, 6],
        "Venom Scythe": [3, 0, 1, 25],
        "Laser Dagger": [1, 0, 1, 9],
    } },
    purple: { result: "LOSS", gamesCount: 1, stats: {
        "Sharkbait Sword": [0, 1, 0, 6],
        "Kitty Hammer": [0, 1, 1, 6],
        "Crimson Katana": [0, 1, 0, 1],
        "Rusty Cutlass": [1, 1, 0, 9],
    } },
  }
};
