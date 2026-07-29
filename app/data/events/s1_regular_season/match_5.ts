// match_5.ts — Week 1, orange vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_5: MatchWithLogs = {
  id: "s1-w1-m5",
  round: "Week 1",
  team1: "orange",
  team2: "black",
  winner: null,       // set to "orange" or "black" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {} },
    black: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
