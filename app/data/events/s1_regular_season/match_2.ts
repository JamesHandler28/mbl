// match_2.ts — Week 1, red vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_2: MatchWithLogs = {
  id: "s1-w1-m2",
  round: "Week 1",
  team1: "red",
  team2: "pink",
  winner: null,       // set to "red" or "pink" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "LOSS", gamesCount: 1, stats: {} },
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
