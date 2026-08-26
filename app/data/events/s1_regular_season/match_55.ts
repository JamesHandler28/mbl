// match_55.ts — Week 7, red vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_55: MatchWithLogs = {
  id: "s1-w7-m7",
  round: "Week 7",
  team1: "red",
  team2: "blue",
  winner: "blue",       // set to "red" or "blue" once played
  score: "2-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/mhyYCz-ci1E?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "LOSS", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 1, 1, 7],
        "Mastermind Staff": [1, 1, 0, 7],
        "Candy Hammer": [1, 1, 1, 11],
        "Lightning Jitte": [0, 1, 0, 0],
    } },
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [2, 0, 0, 18],
        "Underworld Scythe": [2, 1, 1, 23],
        "Eye Scepter": [0, 1, 1, 1],
        "Zombie Arm": [0, 0, 1, 5],
    } },
  }
};
