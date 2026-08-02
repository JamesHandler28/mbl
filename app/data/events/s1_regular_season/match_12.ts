// match_12.ts — Week 2, purple vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_12: MatchWithLogs = {
  id: "s1-w2-m4",
  round: "Week 2",
  team1: "purple",
  team2: "yellow",
  winner: "purple",       // set to "purple" or "yellow" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [2, 0, 2, 23],
        "Kitty Hammer": [0, 1, 1, 1],
        "Crimson Katana": [0, 1, 2, 9],
        "Rusty Cutlass": [2, 0, 1, 14],
    } },
    yellow: { result: "LOSS", gamesCount: 1, stats: {
        "Icey Staff": [1, 1, 1, 15],
        "Frost Blade": [0, 1, 1, 3],
        "Blood Blade": [0, 1, 1, 6],
        "Z Hammer": [1, 1, 0, 14],
    } },
  }
};
