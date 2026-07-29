// match_44.ts — Week 6, black vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_44: MatchWithLogs = {
  id: "s1-w6-m4",
  round: "Week 6",
  team1: "black",
  team2: "pink",
  winner: null,       // set to "black" or "pink" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    black: { result: "LOSS", gamesCount: 1, stats: {} },
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
