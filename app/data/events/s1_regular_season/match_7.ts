// match_7.ts — Week 1, green vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_7: MatchWithLogs = {
  id: "s1-w1-m7",
  round: "Week 1",
  team1: "green",
  team2: "purple",
  winner: "green",       // set to "green" or "purple" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [1, 0, 2, 18],
        "Gray Pike": [0, 1, 1, 6],
        "Water Blade": [1, 1, 0, 6],
        "Demon Cleaver": [2, 0, 1, 16],
    } },
    purple: { result: "LOSS", gamesCount: 1, stats: {
        "Sharkbait Sword": [0, 1, 1, 9],
        "Kitty Hammer": [1, 1, 0, 6],
        "Crimson Katana": [0, 1, 1, 6],
        "Rusty Cutlass": [1, 1, 0, 12],
    } },
  }
};
