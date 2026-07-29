// match_9.ts — Week 2, yellow vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_9: MatchWithLogs = {
  id: "s1-w2-m1",
  round: "Week 2",
  team1: "yellow",
  team2: "blue",
  winner: null,       // set to "yellow" or "blue" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    yellow: { result: "LOSS", gamesCount: 1, stats: {} },
    blue: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
