// match_16.ts — Week 2, green vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_16: MatchWithLogs = {
  id: "s1-w2-m8",
  round: "Week 2",
  team1: "green",
  team2: "red",
  winner: "green",       // set to "green" or "red" once played
  score: "4-1",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/EfyerI4-tvc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "WIN", gamesCount: 1, stats: {
        "Whale Saber": [1, 0, 0, 6],
        "Gray Pike": [0, 1, 1, 6],
        "Water Blade": [1, 0, 2, 15],
        "Demon Cleaver": [2, 0, 1, 22],
    } },
    red: { result: "LOSS", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 1, 0, 8],
        "Mastermind Staff": [0, 1, 0, 0],
        "Candy Hammer": [1, 1, 0, 9],
        "Lightning Jitte": [0, 1, 1, 6],
    } },
  }
};
