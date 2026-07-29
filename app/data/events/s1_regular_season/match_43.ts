// match_43.ts — Week 6, green vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_43: MatchWithLogs = {
  id: "s1-w6-m3",
  round: "Week 6",
  team1: "green",
  team2: "red",
  winner: null,       // set to "green" or "red" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    green: { result: "LOSS", gamesCount: 1, stats: {} },
    red: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
