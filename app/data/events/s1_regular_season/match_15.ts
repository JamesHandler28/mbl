// match_15.ts — Week 2, black vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_15: MatchWithLogs = {
  id: "s1-w2-m7",
  round: "Week 2",
  team1: "black",
  team2: "red",
  winner: "red",       // set to "black" or "red" once played
  score: "0-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/g9NhK5CVx7g?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [0, 1, 0, 6],
        "Melony Smasher": [0, 1, 0, 0],
        "Golden Razor": [0, 1, 0, 6],
        "Frozen Khopesh": [0, 1, 0, 0],
    } },
    red: { result: "WIN", gamesCount: 1, stats: {
        "Pinetree Lance": [0, 0, 2, 11],
        "Mastermind Staff": [0, 0, 2, 11],
        "Candy Hammer": [1, 0, 1, 12],
        "Lightning Jitte": [3, 0, 0, 9],
    } },
  }
};
