// match_4.ts — Week 1, pink vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_4: MatchWithLogs = {
  id: "s1-w1-m4",
  round: "Week 1",
  team1: "pink",
  team2: "yellow",
  winner: "yellow",       // set to "pink" or "yellow" once played
  score: "2-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/rvkBsalJzQc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {
        "Chaos Scythe": [1, 1, 0, 9],
        "Cursed Cutlass": [0, 1, 0, 0],
        "Snow Shovel": [0, 1, 0, 2],
        "Spiderweb Wand": [1, 1, 1, 19],
    } },
    yellow: { result: "WIN", gamesCount: 1, stats: {
        "Icey Staff": [0, 1, 2, 12],
        "Frost Blade": [0, 1, 0, 0],
        "Blood Blade": [2, 0, 0, 27],
        "Z Hammer": [2, 0, 0, 15],
    } },
  }
};
