// match_2.ts — Week 1, red vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_2: MatchWithLogs = {
  id: "s1-w1-m2",
  round: "Week 1",
  team1: "red",
  team2: "pink",
  winner: "pink",       // set to "red" or "pink" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/SySLMN7dMKo?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "LOSS", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 1, 0, 0],
        "Mastermind Staff": [1, 1, 0, 15],
        "Candy Hammer": [0, 1, 1, 6],
        "Lightning Jitte": [0, 1, 0, 3],
    } },
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [3, 0, 1, 27],
        "Cursed Cutlass": [0, 1, 1, 1],
        "Snow Shovel": [1, 0, 2, 13],
        "Spiderweb Wand": [0, 0, 1, 3],
    } },
  }
};
