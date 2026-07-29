// match_6.ts — Week 1, blue vs red
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_6: MatchWithLogs = {
  id: "s1-w1-m6",
  round: "Week 1",
  team1: "blue",
  team2: "red",
  winner: null,       // set to "blue" or "red" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    blue: { result: "LOSS", gamesCount: 1, stats: {} },
    red: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
