// match_3.ts — Week 1, green vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_3: MatchWithLogs = {
  id: "s1-w1-m3",
  round: "Week 1",
  team1: "green",
  team2: "blue",
  winner: "blue",       // set to "green" or "blue" once played
  score: "0-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/D1TfdC0pZBU?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {
        "Whale Saber": [0, 1, 0, 6],
        "Gray Pike": [0, 1, 0, 0],
        "Water Blade": [0, 1, 0, 3],
        "Demon Cleaver": [0, 1, 0, 0],
    } },
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [1, 0, 1, 9],
        "Underworld Scythe": [2, 0, 1, 18],
        "Eye Scepter": [1, 0, 1, 13],
        "Zombie Arm": [0, 0, 1, 6],
    } },
  }
};
