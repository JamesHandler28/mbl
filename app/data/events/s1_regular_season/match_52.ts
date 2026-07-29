// match_52.ts — Week 7, yellow vs pink
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_52: MatchWithLogs = {
  id: "s1-w7-m4",
  round: "Week 7",
  team1: "yellow",
  team2: "pink",
  winner: null,       // set to "yellow" or "pink" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    yellow: { result: "LOSS", gamesCount: 1, stats: {} },
    pink: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
