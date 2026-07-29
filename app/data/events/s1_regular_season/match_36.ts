// match_36.ts — Week 5, yellow vs orange
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_36: MatchWithLogs = {
  id: "s1-w5-m4",
  round: "Week 5",
  team1: "yellow",
  team2: "orange",
  winner: null,       // set to "yellow" or "orange" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    yellow: { result: "LOSS", gamesCount: 1, stats: {} },
    orange: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
