// match_44.ts — Week 6, black vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_44: MatchWithLogs = {
  id: "s1-w6-m4",
  round: "Week 6",
  team1: "black",
  team2: "pink",
  winner: "pink",       // set to "black" or "pink" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/goaRC3amLYY?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [0, 1, 0, 0],
        "Melony Smasher": [0, 1, 1, 6],
        "Golden Razor": [1, 1, 0, 12],
        "Frozen Khopesh": [0, 1, 0, 0],
    } },
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [1, 1, 0, 12],
        "Cursed Cutlass": [2, 0, 0, 19],
        "Snow Shovel": [0, 0, 1, 6],
        "Spiderweb Wand": [1, 0, 0, 15],
    } },
  }
};
