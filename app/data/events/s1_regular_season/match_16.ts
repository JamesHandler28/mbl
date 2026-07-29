// match_16.ts — Week 2, green vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_16: MatchWithLogs = {
  id: "s1-w2-m8",
  round: "Week 2",
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
