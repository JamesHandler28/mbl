// match_56.ts — Week 7, orange vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_56: MatchWithLogs = {
  id: "s1-w7-m8",
  round: "Week 7",
  team1: "orange",
  team2: "black",
  winner: "orange",       // set to "orange" or "black" once played
  score: "4-0",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "WIN", gamesCount: 1, stats: {
        "Iron Katana": [0, 0, 3, 20],
        "Crow Scythe": [2, 0, 0, 16],
        "Venom Scythe": [2, 0, 0, 12],
        "Laser Dagger": [0, 0, 0, 0],
    } },
    black: { result: "LOSS", gamesCount: 1, stats: {
        "Galactic Sword": [0, 1, 0, 0],
        "Melony Smasher": [0, 1, 0, 6],
        "Golden Razor": [0, 1, 0, 6],
        "Frozen Khopesh": [0, 1, 0, 1],
    } },
  }
};
