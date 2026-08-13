// match_40.ts — Week 5, pink vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_40: MatchWithLogs = {
  id: "s1-w5-m8",
  round: "Week 5",
  team1: "pink",
  team2: "blue",
  winner: "pink",       // set to "pink" or "blue" once played
  score: "4-1",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/5ze0U3nM3Hc?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [3, 0, 1, 30],
        "Cursed Cutlass": [0, 0, 1, 6],
        "Snow Shovel": [0, 1, 0, 0],
        "Spiderweb Wand": [1, 0, 1, 13],
    } },
    blue: { result: "LOSS", gamesCount: 1, stats: {
        "Rogue Warhead": [0, 1, 0, 6],
        "Underworld Scythe": [1, 1, 0, 10],
        "Eye Scepter": [0, 1, 1, 6],
        "Zombie Arm": [0, 1, 0, 10],
    } },
  }
};
