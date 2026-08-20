// match_50.ts — Week 7, pink vs green
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_50: MatchWithLogs = {
  id: "s1-w7-m2",
  round: "Week 7",
  team1: "pink",
  team2: "green",
  winner: "pink",       // set to "pink" or "green" once played
  score: "4-3",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [0, 1, 2, 10],
        "Cursed Cutlass": [0, 1, 1, 3],
        "Snow Shovel": [1, 0, 0, 6],
        "Spiderweb Wand": [3, 1, 1, 26],
    } },
    green: { result: "LOSS", gamesCount: 1, stats: {
        "Whale Saber": [1, 1, 1, 13],
        "Gray Pike": [1, 1, 0, 12],
        "Water Blade": [1, 1, 1, 12],
        "Demon Cleaver": [0, 1, 1, 6],
    } },
  }
};
