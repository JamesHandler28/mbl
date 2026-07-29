// match_41.ts — Week 6, blue vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_41: MatchWithLogs = {
  id: "s1-w6-m1",
  round: "Week 6",
  team1: "blue",
  team2: "purple",
  winner: null,       // set to "blue" or "purple" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    blue: { result: "LOSS", gamesCount: 1, stats: {} },
    purple: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
