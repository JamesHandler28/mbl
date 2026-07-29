// match_42.ts — Week 6, pink vs orange
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_42: MatchWithLogs = {
  id: "s1-w6-m2",
  round: "Week 6",
  team1: "pink",
  team2: "orange",
  winner: null,       // set to "pink" or "orange" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
    orange: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
