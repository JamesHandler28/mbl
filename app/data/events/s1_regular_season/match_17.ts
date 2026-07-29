// match_17.ts — Week 3, pink vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_17: MatchWithLogs = {
  id: "s1-w3-m1",
  round: "Week 3",
  team1: "pink",
  team2: "purple",
  winner: null,       // set to "pink" or "purple" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
    purple: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
