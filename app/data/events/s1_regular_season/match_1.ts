// match_1.ts — Week 1, yellow vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_1: MatchWithLogs = {
  id: "s1-w1-m1",
  round: "Week 1",
  team1: "yellow",
  team2: "black",
  winner: null,       // set to "yellow" or "black" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    yellow: { result: "LOSS", gamesCount: 1, stats: {} },
    black: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
