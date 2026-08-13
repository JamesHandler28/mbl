// match_35.ts — Week 5, red vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_35: MatchWithLogs = {
  id: "s1-w5-m3",
  round: "Week 5",
  team1: "red",
  team2: "purple",
  winner: "purple",       // set to "red" or "purple" once played
  score: "2-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/5ze0U3nM3Hc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "LOSS", gamesCount: 1, stats: {
        "Pinetree Lance": [2, 1, 0, 18],
        "Mastermind Staff": [0, 1, 0, 0],
        "Candy Hammer": [0, 1, 1, 6],
        "Lightning Jitte": [0, 1, 0, 2],
    } },
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [0, 0, 1, 6],
        "Kitty Hammer": [1, 0, 3, 22],
        "Crimson Katana": [1, 1, 0, 6],
        "Rusty Cutlass": [2, 1, 0, 12],
    } },
  }
};
