// match_54.ts — Week 7, green vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_54: MatchWithLogs = {
  id: "s1-w7-m6",
  round: "Week 7",
  team1: "green",
  team2: "purple",
  winner: "purple",       // set to "green" or "purple" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/VCo7ZMAJaK8?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {
        "Whale Saber": [0, 1, 0, 6],
        "Gray Pike": [1, 1, 0, 8],
        "Water Blade": [0, 1, 1, 6],
        "Demon Cleaver": [0, 1, 0, 6],
    } },
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [2, 0, 1, 15],
        "Kitty Hammer": [1, 0, 1, 14],
        "Crimson Katana": [0, 0, 2, 12],
        "Rusty Cutlass": [1, 1, 0, 6],
    } },
  }
};
