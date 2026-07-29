// match_51.ts — Week 7, orange vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_51: MatchWithLogs = {
  id: "s1-w7-m3",
  round: "Week 7",
  team1: "orange",
  team2: "yellow",
  winner: null,       // set to "orange" or "yellow" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    orange: { result: "LOSS", gamesCount: 1, stats: {} },
    yellow: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
