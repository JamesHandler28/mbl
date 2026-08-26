// match_52.ts — Week 7, yellow vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_52: MatchWithLogs = {
  id: "s1-w7-m4",
  round: "Week 7",
  team1: "yellow",
  team2: "pink",
  winner: "pink",       // set to "yellow" or "pink" once played
  score: "0-4",       // e.g. "6-4"
  videoUrl: "https://youtube.com/shorts/im7C4cFhPMo?feature=share", // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    yellow: { result: "LOSS", gamesCount: 1, stats: {
        "Icey Staff": [0, 1, 0, 3],
        "Frost Blade": [0, 1, 0, 2],
        "Blood Blade": [0, 1, 0, 4],
        "Z Hammer": [0, 1, 0, 0],
    } },
    pink: { result: "WIN", gamesCount: 1, stats: {
        "Chaos Scythe": [1, 0, 0, 6],
        "Cursed Cutlass": [1, 0, 1, 14],
        "Snow Shovel": [1, 0, 0, 6],
        "Spiderweb Wand": [1, 0, 3, 24],
    } },
  }
};
