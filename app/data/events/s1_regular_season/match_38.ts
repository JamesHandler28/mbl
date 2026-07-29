// match_38.ts — Week 5, green vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_38: MatchWithLogs = {
  id: "s1-w5-m6",
  round: "Week 5",
  team1: "green",
  team2: "yellow",
  winner: null,       // set to "green" or "yellow" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {} },
    yellow: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
