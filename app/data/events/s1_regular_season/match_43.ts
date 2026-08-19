// match_43.ts — Week 6, green vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_43: MatchWithLogs = {
  id: "s1-w6-m3",
  round: "Week 6",
  team1: "green",
  team2: "red",
  winner: "red",       // set to "green" or "red" once played
  score: "2-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/RcDmubv1774?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {
        "Whale Saber": [0, 1, 0, 6],
        "Gray Pike": [1, 1, 0, 13],
        "Water Blade": [1, 1, 0, 12],
        "Demon Cleaver": [0, 1, 0, 0],
    } },
    red: { result: "WIN", gamesCount: 1, stats: {
        "Pinetree Lance": [1, 0, 1, 12],
        "Mastermind Staff": [3, 0, 1, 30],
        "Candy Hammer": [0, 1, 1, 6],
        "Lightning Jitte": [0, 1, 1, 3],
    } },
  }
};
