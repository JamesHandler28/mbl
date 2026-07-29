// match_18.ts — Week 3, purple vs orange
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_18: MatchWithLogs = {
  id: "s1-w3-m2",
  round: "Week 3",
  team1: "purple",
  team2: "orange",
  winner: null,       // set to "purple" or "orange" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "LOSS", gamesCount: 1, stats: {} },
    orange: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
