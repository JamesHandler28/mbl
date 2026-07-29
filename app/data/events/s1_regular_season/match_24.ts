// match_24.ts — Week 3, black vs yellow
// Fill in winner/score/videoUrl and each team's stats once this match is played.
// Leave winner as null and stats as empty objects until then.

import { MatchWithLogs } from '../_matchType';

export const MATCH_24: MatchWithLogs = {
  id: "s1-w3-m8",
  round: "Week 3",
  team1: "black",
  team2: "yellow",
  winner: null,       // set to "black" or "yellow" once played
  score: "TBD",       // e.g. "6-4"
  videoUrl: undefined, // e.g. "https://youtube.com/shorts/XXXXXXXXXXX"
  logs: {
    black: { result: "LOSS", gamesCount: 1, stats: {} },
    yellow: { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
