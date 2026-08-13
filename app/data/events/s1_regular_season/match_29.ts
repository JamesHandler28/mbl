// match_29.ts — Week 4, green vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_29: MatchWithLogs = {
  id: "s1-w4-m5",
  round: "Week 4",
  team1: "green",
  team2: "black",
  winner: "green",       // set to "green" or "black" once played
  score: "4-0",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/oq82ftTij_Q?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [1, 0, 2, 25],
        "Gray Pike": [1, 0, 0, 6],
        "Water Blade": [1, 0, 0, 10],
        "Demon Cleaver": [1, 0, 1, 8],
    } },
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [0, 1, 0, 1],
        "Melony Smasher": [0, 1, 0, 8],
        "Golden Razor": [0, 1, 0, 0],
        "Frozen Khopesh": [0, 1, 0, 0],
    } },
  }
};
