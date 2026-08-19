// match_46.ts — Week 6, green vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_46: MatchWithLogs = {
  id: "s1-w6-m6",
  round: "Week 6",
  team1: "green",
  team2: "black",
  winner: "green",       // set to "green" or "black" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/jxV94hviUAo?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [1, 1, 2, 15],
        "Gray Pike": [1, 0, 1, 17],
        "Water Blade": [0, 1, 0, 0],
        "Demon Cleaver": [2, 0, 0, 13],
    } },
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [1, 1, 0, 12],
        "Melony Smasher": [0, 1, 0, 0],
        "Golden Razor": [1, 1, 1, 18],
        "Frozen Khopesh": [0, 1, 0, 0],
    } },
  }
};
