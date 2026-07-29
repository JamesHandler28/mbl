// match_33.ts — Week 5, orange vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_33: MatchWithLogs = {
  id: "s1-w5-m1",
  round: "Week 5",
  team1: "orange",
  team2: "red",
  winner: null,       // set to "orange" or "red" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {} },
    red: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
