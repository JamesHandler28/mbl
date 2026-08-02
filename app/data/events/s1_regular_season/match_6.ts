// match_6.ts — Week 1, blue vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_6: MatchWithLogs = {
  id: "s1-w1-m6",
  round: "Week 1",
  team1: "blue",
  team2: "red",
  winner: "blue",       // set to "blue" or "red" once played
  score: "4-3",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/_i36vLt4xVY?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [2, 1, 1, 19],
        "Underworld Scythe": [0, 1, 2, 6],
        "Eye Scepter": [0, 1, 2, 12],
        "Zombie Arm": [2, 0, 0, 12],
    } },
    red: { result: "LOSS", gamesCount: 1, stats: {
        "Pinetree Lance": [2, 1, 0, 18],
        "Mastermind Staff": [1, 1, 0, 4],
        "Candy Hammer": [0, 1, 1, 6],
        "Lightning Jitte": [0, 1, 1, 6],
    } },
  }
};
