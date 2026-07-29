// match_32.ts — Week 4, purple vs black
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_32: MatchWithLogs = {
  id: "s1-w4-m8",
  round: "Week 4",
  team1: "purple",
  team2: "black",
  winner: null,       // set to "purple" or "black" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    purple: { result: "LOSS", gamesCount: 1, stats: {} },
    black: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
