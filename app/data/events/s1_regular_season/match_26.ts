// match_26.ts — Week 4, pink vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_26: MatchWithLogs = {
  id: "s1-w4-m2",
  round: "Week 4",
  team1: "pink",
  team2: "blue",
  winner: null,       // set to "pink" or "blue" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
    blue: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
