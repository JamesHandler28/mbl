// match_24.ts — Week 3, black vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_24: MatchWithLogs = {
  id: "s1-w3-m8",
  round: "Week 3",
  team1: "black",
  team2: "yellow",
  winner: "black",       // set to "black" or "yellow" once played
  score: "4-3",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    black: { result: "WIN", gamesCount: 1, stats: {
        "Galactic Sword": [2, 0, 0, 22],
        "Melony Smasher": [0, 1, 1, 6],
        "Golden Razor": [2, 1, 0, 16],
        "Frozen Khopesh": [0, 1, 0, 0],
    } },
    yellow: { result: "LOSS", gamesCount: 1, stats: {
        "Icey Staff": [1, 1, 0, 12],
        "Frost Blade": [1, 1, 1, 9],
        "Blood Blade": [0, 1, 1, 9],
        "Z Hammer": [1, 1, 0, 21],
    } },
  }
};
