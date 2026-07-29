// match_14.ts — Week 2, blue vs orange
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_14: MatchWithLogs = {
  id: "s1-w2-m6",
  round: "Week 2",
  team1: "blue",
  team2: "orange",
  winner: null,       // set to "blue" or "orange" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    blue: { result: "LOSS", gamesCount: 1, stats: {} },
    orange: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
