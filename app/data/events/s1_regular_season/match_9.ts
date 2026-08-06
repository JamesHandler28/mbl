// match_9.ts — Week 2, yellow vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_9: MatchWithLogs = {
  id: "s1-w2-m1",
  round: "Week 2",
  team1: "yellow",
  team2: "blue",
  winner: "blue",       // set to "yellow" or "blue" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/Ii19x-NeijE?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    yellow: { result: "LOSS", gamesCount: 1, stats: {
        "Icey Staff": [0, 1, 0, 0],
        "Frost Blade": [1, 1, 0, 15],
        "Blood Blade": [0, 1, 0, 0],
        "Z Hammer": [0, 1, 0, 6],
    } },
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [2, 0, 1, 24],
        "Underworld Scythe": [0, 0, 2, 5],
        "Eye Scepter": [1, 1, 1, 4],
        "Zombie Arm": [1, 0, 1, 13],
    } },
  }
};
