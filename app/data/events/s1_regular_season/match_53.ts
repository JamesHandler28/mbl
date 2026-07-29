// match_53.ts — Week 7, purple vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_53: MatchWithLogs = {
  id: "s1-w7-m5",
  round: "Week 7",
  team1: "purple",
  team2: "red",
  winner: null,       // set to "purple" or "red" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "LOSS", gamesCount: 1, stats: {} },
    red: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
