// match_32.ts — Week 4, purple vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_32: MatchWithLogs = {
  id: "s1-w4-m8",
  round: "Week 4",
  team1: "purple",
  team2: "black",
  winner: "purple",       // set to "purple" or "black" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/0OKEL68E8Pk?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [2, 0, 1, 22],
        "Kitty Hammer": [2, 0, 1, 21],
        "Crimson Katana": [0, 1, 0, 0],
        "Rusty Cutlass": [0, 1, 1, 6],
    } },
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [0, 1, 1, 6],
        "Melony Smasher": [0, 1, 1, 6],
        "Golden Razor": [0, 1, 0, 6],
        "Frozen Khopesh": [2, 1, 0, 15],
    } },
  }
};
