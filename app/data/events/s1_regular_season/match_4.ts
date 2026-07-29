// match_4.ts — Week 1, pink vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_4: MatchWithLogs = {
  id: "s1-w1-m4",
  round: "Week 1",
  team1: "pink",
  team2: "yellow",
  winner: null,       // set to "pink" or "yellow" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
    yellow: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
