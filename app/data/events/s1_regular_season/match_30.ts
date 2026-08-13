// match_30.ts — Week 4, green vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_30: MatchWithLogs = {
  id: "s1-w4-m6",
  round: "Week 4",
  team1: "green",
  team2: "yellow",
  winner: "yellow",       // set to "green" or "yellow" once played
  score: "2-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/7ZsyHswFBwI?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {
        "Whale Saber": [0, 1, 0, 1],
        "Gray Pike": [0, 1, 0, 0],
        "Water Blade": [2, 1, 0, 19],
        "Demon Cleaver": [0, 1, 1, 6],
    } },
    yellow: { result: "WIN", gamesCount: 1, stats: {
        "Icey Staff": [0, 1, 1, 6],
        "Frost Blade": [0, 1, 0, 0],
        "Blood Blade": [3, 0, 0, 27],
        "Z Hammer": [1, 0, 1, 18],
    } },
  }
};
