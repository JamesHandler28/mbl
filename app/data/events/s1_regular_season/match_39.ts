// match_39.ts — Week 5, pink vs green
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_39: MatchWithLogs = {
  id: "s1-w5-m7",
  round: "Week 5",
  team1: "pink",
  team2: "green",
  winner: null,       // set to "pink" or "green" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
    green: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
