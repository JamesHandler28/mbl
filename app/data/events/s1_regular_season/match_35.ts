// match_35.ts — Week 5, red vs purple
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_35: MatchWithLogs = {
  id: "s1-w5-m3",
  round: "Week 5",
  team1: "red",
  team2: "purple",
  winner: null,       // set to "red" or "purple" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "LOSS", gamesCount: 1, stats: {} },
    purple: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
