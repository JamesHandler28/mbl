// match_48.ts — Week 6, red vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_48: MatchWithLogs = {
  id: "s1-w6-m8",
  round: "Week 6",
  team1: "red",
  team2: "yellow",
  winner: "yellow",       // set to "red" or "yellow" once played
  score: "0-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/DAlr2kt6_Ho?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "LOSS", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 1, 0, 12],
        "Mastermind Staff": [0, 1, 0, 3],
        "Candy Hammer": [0, 1, 0, 6],
        "Lightning Jitte": [0, 1, 0, 0],
    } },
    yellow: { result: "WIN", gamesCount: 1, stats: {
        "Icey Staff": [1, 0, 2, 18],
        "Frost Blade": [0, 0, 1, 3],
        "Blood Blade": [2, 0, 1, 13],
        "Z Hammer": [1, 0, 0, 12],
    } },
  }
};
