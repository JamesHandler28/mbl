// match_41.ts — Week 6, blue vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_41: MatchWithLogs = {
  id: "s1-w6-m1",
  round: "Week 6",
  team1: "blue",
  team2: "purple",
  winner: "blue",       // set to "blue" or "purple" once played
  score: "4-3",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/VMnyHMAYXuQ?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    blue: { result: "WIN", gamesCount: 1, stats: {
        "Rogue Warhead": [1, 1, 1, 17],
        "Underworld Scythe": [0, 1, 1, 7],
        "Eye Scepter": [0, 1, 0, 0],
        "Zombie Arm": [3, 0, 0, 24],
    } },
    purple: { result: "LOSS", gamesCount: 1, stats: {
        "Sharkbait Sword": [0, 1, 0, 6],
        "Kitty Hammer": [1, 1, 0, 6],
        "Crimson Katana": [1, 1, 1, 13],
        "Rusty Cutlass": [1, 1, 1, 16],
    } },
  }
};
