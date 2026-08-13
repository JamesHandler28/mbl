// match_34.ts — Week 5, purple vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_34: MatchWithLogs = {
  id: "s1-w5-m2",
  round: "Week 5",
  team1: "purple",
  team2: "black",
  winner: "purple",       // set to "purple" or "black" once played
  score: "4-0",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/5ze0U3nM3Hc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [1, 0, 1, 16],
        "Kitty Hammer": [1, 0, 0, 6],
        "Crimson Katana": [2, 0, 0, 22],
        "Rusty Cutlass": [0, 0, 0, 0],
    } },
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [0, 1, 0, 0],
        "Melony Smasher": [0, 1, 0, 0],
        "Golden Razor": [0, 1, 0, 0],
        "Frozen Khopesh": [0, 1, 0, 6],
    } },
  }
};
