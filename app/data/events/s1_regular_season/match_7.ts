// match_7.ts — Week 1, green vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_7: MatchWithLogs = {
  id: "s1-w1-m7",
  round: "Week 1",
  team1: "green",
  team2: "purple",
  winner: null,       // set to "green" or "purple" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {} },
    purple: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
