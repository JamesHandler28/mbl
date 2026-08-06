// match_21.ts — Week 3, red vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_21: MatchWithLogs = {
  id: "s1-w3-m5",
  round: "Week 3",
  team1: "red",
  team2: "pink",
  winner: "pink",       // set to "red" or "pink" once played
  score: "2-4",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "LOSS", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 1, 1, 6],
        "Mastermind Staff": [0, 1, 1, 6],
        "Candy Hammer": [2, 1, 0, 18],
        "Lightning Jitte": [0, 1, 0, 0],
    } },
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [1, 1, 0, 10],
        "Cursed Cutlass": [0, 0, 2, 16],
        "Snow Shovel": [1, 0, 1, 12],
        "Spiderweb Wand": [2, 1, 1, 8],
    } },
  }
};
