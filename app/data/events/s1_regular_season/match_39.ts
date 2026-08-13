// match_39.ts — Week 5, pink vs green
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_39: MatchWithLogs = {
  id: "s1-w5-m7",
  round: "Week 5",
  team1: "pink",
  team2: "green",
  winner: "green",       // set to "pink" or "green" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/5ze0U3nM3Hc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {
        "Chaos Scythe": [0, 1, 1, 12],
        "Cursed Cutlass": [0, 1, 0, 3],
        "Snow Shovel": [0, 1, 0, 0],
        "Spiderweb Wand": [1, 1, 0, 8],
    } },
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [3, 0, 1, 22],
        "Gray Pike": [1, 0, 2, 16],
        "Water Blade": [0, 1, 0, 0],
        "Demon Cleaver": [0, 0, 2, 9],
    } },
  }
};
