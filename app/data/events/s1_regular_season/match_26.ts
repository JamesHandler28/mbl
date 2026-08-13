// match_26.ts — Week 4, pink vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_26: MatchWithLogs = {
  id: "s1-w4-m2",
  round: "Week 4",
  team1: "pink",
  team2: "blue",
  winner: "pink",       // set to "pink" or "blue" once played
  score: "4-2",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/GvCMEaGHfrE?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [3, 1, 0, 24],
        "Cursed Cutlass": [1, 0, 0, 10],
        "Snow Shovel": [0, 1, 2, 12],
        "Spiderweb Wand": [0, 0, 0, 0],
    } },
    blue: { result: "LOSS", gamesCount: 1, stats: {
        "Rogue Warhead": [0, 1, 2, 7],
        "Underworld Scythe": [0, 1, 0, 0],
        "Eye Scepter": [1, 1, 0, 16],
        "Zombie Arm": [1, 1, 1, 7],
    } },
  }
};
