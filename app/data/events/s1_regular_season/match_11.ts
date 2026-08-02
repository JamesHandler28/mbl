// match_11.ts — Week 2, purple vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_11: MatchWithLogs = {
  id: "s1-w2-m3",
  round: "Week 2",
  team1: "purple",
  team2: "pink",
  winner: "purple",       // set to "purple" or "pink" once played
  score: "4-1",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [1, 0, 1, 13],
        "Kitty Hammer": [1, 0, 2, 15],
        "Crimson Katana": [2, 0, 0, 12],
        "Rusty Cutlass": [0, 1, 2, 9],
    } },
    pink: { result: "LOSS", gamesCount: 1, stats: {
        "Chaos Scythe": [1, 1, 0, 12],
        "Cursed Cutlass": [0, 1, 0, 6],
        "Snow Shovel": [0, 1, 0, 0],
        "Spiderweb Wand": [0, 1, 0, 6],
    } },
  }
};
