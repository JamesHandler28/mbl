// match_48.ts — Week 6, red vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_48: MatchWithLogs = {
  id: "s1-w6-m8",
  round: "Week 6",
  team1: "red",
  team2: "yellow",
  winner: null,       // set to "red" or "yellow" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "LOSS", gamesCount: 1, stats: {} },
    yellow: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
