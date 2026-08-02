// match_13.ts — Week 2, pink vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_13: MatchWithLogs = {
  id: "s1-w2-m5",
  round: "Week 2",
  team1: "pink",
  team2: "black",
  winner: "pink",       // set to "pink" or "black" once played
  score: "4-1",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [3, 0, 1, 34],
        "Cursed Cutlass": [0, 0, 0, 0],
        "Snow Shovel": [1, 0, 0, 6],
        "Spiderweb Wand": [0, 1, 1, 6],
    } },
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [0, 1, 1, 7],
        "Melony Smasher": [0, 1, 1, 1],
        "Golden Razor": [0, 1, 0, 8],
        "Frozen Khopesh": [1, 1, 0, 6],
    } },
  }
};
