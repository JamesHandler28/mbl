// match_25.ts — Week 4, red vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_25: MatchWithLogs = {
  id: "s1-w4-m1",
  round: "Week 4",
  team1: "red",
  team2: "yellow",
  winner: "red",       // set to "red" or "yellow" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/VGxU3TIvrVM?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "WIN", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 0, 2, 10],
        "Mastermind Staff": [1, 1, 1, 22],
        "Candy Hammer": [3, 0, 0, 18],
        "Lightning Jitte": [0, 1, 1, 1],
    } },
    yellow: { result: "LOSS", gamesCount: 1, stats: {
        "Icey Staff": [0, 1, 0, 0],
        "Frost Blade": [1, 1, 0, 6],
        "Blood Blade": [0, 1, 0, 2],
        "Z Hammer": [1, 1, 1, 17],
    } },
  }
};
