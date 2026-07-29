// match_10.ts — Week 2, orange vs green
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_10: MatchWithLogs = {
  id: "s1-w2-m2",
  round: "Week 2",
  team1: "orange",
  team2: "green",
  winner: null,       // set to "orange" or "green" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {} },
    green: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
