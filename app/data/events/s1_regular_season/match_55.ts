// match_55.ts — Week 7, red vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_55: MatchWithLogs = {
  id: "s1-w7-m7",
  round: "Week 7",
  team1: "red",
  team2: "blue",
  winner: null,       // set to "red" or "blue" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    red: { result: "LOSS", gamesCount: 1, stats: {} },
    blue: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
