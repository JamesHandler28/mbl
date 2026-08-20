// match_49.ts — Week 7, blue vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_49: MatchWithLogs = {
  id: "s1-w7-m1",
  round: "Week 7",
  team1: "blue",
  team2: "black",
  winner: "blue",       // set to "blue" or "black" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [1, 0, 1, 17],
        "Underworld Scythe": [0, 1, 1, 3],
        "Eye Scepter": [2, 0, 0, 16],
        "Zombie Arm": [1, 1, 1, 12],
    } },
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [1, 1, 0, 11],
        "Melony Smasher": [0, 1, 1, 6],
        "Golden Razor": [1, 1, 0, 12],
        "Frozen Khopesh": [0, 1, 0, 0],
    } },
  }
};
