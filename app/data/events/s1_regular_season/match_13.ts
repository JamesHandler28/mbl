// match_13.ts — Week 2, pink vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_13: MatchWithLogs = {
  id: "s1-w2-m5",
  round: "Week 2",
  team1: "pink",
  team2: "black",
  winner: null,       // set to "pink" or "black" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
    black: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
