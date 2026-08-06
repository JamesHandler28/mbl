// match_17.ts — Week 3, pink vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_17: MatchWithLogs = {
  id: "s1-w3-m1",
  round: "Week 3",
  team1: "pink",
  team2: "purple",
  winner: "purple",       // set to "pink" or "purple" once played
  score: "1-4",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {
        "Chaos Scythe": [0, 1, 0, 6],
        "Cursed Cutlass": [0, 1, 0, 3],
        "Snow Shovel": [1, 1, 0, 11],
        "Spiderweb Wand": [0, 1, 0, 0],
    } },
    purple: { result: "WIN", gamesCount: 1, stats: {
        "Sharkbait Sword": [0, 0, 1, 7],
        "Kitty Hammer": [1, 0, 0, 6],
        "Crimson Katana": [0, 1, 3, 13],
        "Rusty Cutlass": [3, 0, 0, 22],
    } },
  }
};
