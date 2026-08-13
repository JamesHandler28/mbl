// match_38.ts — Week 5, green vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_38: MatchWithLogs = {
  id: "s1-w5-m6",
  round: "Week 5",
  team1: "green",
  team2: "yellow",
  winner: "green",       // set to "green" or "yellow" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/5ze0U3nM3Hc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [1, 0, 2, 26],
        "Gray Pike": [1, 0, 2, 16],
        "Water Blade": [1, 1, 0, 6],
        "Demon Cleaver": [1, 1, 0, 3],
    } },
    yellow: { result: "LOSS", gamesCount: 1, stats: {
        "Icey Staff": [1, 1, 0, 12],
        "Frost Blade": [1, 1, 0, 6],
        "Blood Blade": [0, 1, 0, 1],
        "Z Hammer": [0, 1, 1, 6],
    } },
  }
};
