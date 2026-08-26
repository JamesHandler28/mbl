// match_53.ts — Week 7, purple vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_53: MatchWithLogs = {
  id: "s1-w7-m5",
  round: "Week 7",
  team1: "purple",
  team2: "red",
  winner: "red",       // set to "purple" or "red" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/bp1FDMvjrI8?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "LOSS", gamesCount: 1, stats: {
        "Sharkbait Sword": [0, 1, 0, 0],
        "Kitty Hammer": [0, 1, 0, 7],
        "Crimson Katana": [1, 1, 0, 4],
        "Rusty Cutlass": [0, 1, 1, 12],
    } },
    red: { result: "WIN", gamesCount: 1, stats: {
        "Pinetree Lance": [1, 0, 0, 12],
        "Mastermind Staff": [2, 0, 0, 18],
        "Candy Hammer": [1, 0, 2, 19],
        "Lightning Jitte": [0, 1, 1, 1],
    } },
  }
};
