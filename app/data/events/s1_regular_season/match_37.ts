// match_37.ts — Week 5, blue vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_37: MatchWithLogs = {
  id: "s1-w5-m5",
  round: "Week 5",
  team1: "blue",
  team2: "black",
  winner: "blue",       // set to "blue" or "black" once played
  score: "4-3",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/5ze0U3nM3Hc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [1, 1, 1, 12],
        "Underworld Scythe": [1, 1, 0, 6],
        "Eye Scepter": [1, 0, 0, 6],
        "Zombie Arm": [1, 1, 3, 22],
    } },
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [0, 1, 1, 6],
        "Melony Smasher": [0, 1, 1, 6],
        "Golden Razor": [0, 1, 1, 1],
        "Frozen Khopesh": [3, 1, 0, 24],
    } },
  }
};
