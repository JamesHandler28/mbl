// match_20.ts — Week 3, green vs blue
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_20: MatchWithLogs = {
  id: "s1-w3-m4",
  round: "Week 3",
  team1: "green",
  team2: "blue",
  winner: null,       // set to "green" or "blue" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {} },
    blue: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
