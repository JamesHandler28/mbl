// match_1.ts — Week 1, yellow vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_1: MatchWithLogs = {
  id: "s1-w1-m1",
  round: "Week 1",
  team1: "yellow",
  team2: "black",
  winner: "black",       // set to "yellow" or "black" once played
  score: "2-4",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    yellow: { result: "LOSS", gamesCount: 1, stats: {
        "Icey Staff": [0, 1, 0, 0],
        "Frost Blade": [1, 1, 0, 4],
        "Blood Blade": [1, 1, 1, 17],
        "Z Hammer": [0, 1, 1, 10],
    } },
    black: { result: "WIN", gamesCount: 1, stats: {
        "Galactic Sword": [1, 1, 0, 6],
        "Melony Smasher": [1, 0, 1, 17],
        "Golden Razor": [0, 1, 1, 6],
        "Frozen Khopesh": [2, 0, 1, 21],
    } },
  }
};
