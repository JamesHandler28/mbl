// match_28.ts — Week 4, purple vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_28: MatchWithLogs = {
  id: "s1-w4-m4",
  round: "Week 4",
  team1: "purple",
  team2: "blue",
  winner: "blue",       // set to "purple" or "blue" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/gWNfRHTlexY?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "LOSS", gamesCount: 1, stats: {
        "Sharkbait Sword": [1, 1, 0, 7],
        "Kitty Hammer": [0, 1, 0, 6],
        "Crimson Katana": [0, 1, 1, 9],
        "Rusty Cutlass": [0, 1, 0, 0],
    } },
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [0, 1, 2, 12],
        "Underworld Scythe": [1, 0, 2, 14],
        "Eye Scepter": [2, 0, 0, 18],
        "Zombie Arm": [1, 0, 0, 1],
    } },
  }
};
