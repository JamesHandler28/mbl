// match_23.ts — Week 3, black vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_23: MatchWithLogs = {
  id: "s1-w3-m7",
  round: "Week 3",
  team1: "black",
  team2: "red",
  winner: "black",       // set to "black" or "red" once played
  score: "4-1",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    black: { result: "WIN", gamesCount: 1, stats: {
        "Galactic Sword": [0, 0, 1, 1],
        "Melony Smasher": [3, 0, 0, 27],
        "Golden Razor": [1, 0, 1, 17],
        "Frozen Khopesh": [0, 1, 1, 1],
    } },
    red: { result: "LOSS", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 1, 0, 0],
        "Mastermind Staff": [1, 1, 0, 11],
        "Candy Hammer": [0, 1, 1, 6],
        "Lightning Jitte": [0, 1, 0, 3],
    } },
  }
};
