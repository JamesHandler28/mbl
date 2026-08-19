// match_47.ts — Week 6, purple vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_47: MatchWithLogs = {
  id: "s1-w6-m7",
  round: "Week 6",
  team1: "purple",
  team2: "yellow",
  winner: "purple",       // set to "purple" or "yellow" once played
  score: "4-3",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/gd3otBfVLAg?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [1, 1, 1, 12],
        "Kitty Hammer": [2, 0, 1, 18],
        "Crimson Katana": [1, 1, 1, 15],
        "Rusty Cutlass": [0, 1, 1, 6],
    } },
    yellow: { result: "LOSS", gamesCount: 1, stats: {
        "Icey Staff": [0, 1, 0, 6],
        "Frost Blade": [0, 1, 1, 6],
        "Blood Blade": [3, 1, 0, 24],
        "Z Hammer": [0, 1, 2, 7],
    } },
  }
};
