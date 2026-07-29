// match_27.ts — Week 4, orange vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_27: MatchWithLogs = {
  id: "s1-w4-m3",
  round: "Week 4",
  team1: "orange",
  team2: "pink",
  winner: null,       // set to "orange" or "pink" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {} },
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
