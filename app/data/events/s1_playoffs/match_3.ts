// match_3.ts — Final (winner of SF1 vs winner of SF2)
// Update team1/team2 to the real winning team ids once both semifinals
// are played, then fill in winner/score/videoUrl/logs same as any
// other match once the Final itself is played.

import { MatchWithLogs } from '../_matchType';

export const MATCH_3: MatchWithLogs = {
  id: "s1-po-final",
  round: "Final",
  team1: "seed-winner-sf1",
  team2: "seed-winner-sf2",
  winner: null,
  score: "TBD",
  videoUrl: undefined,
  logs: {
    "seed-winner-sf1": { result: "LOSS", gamesCount: 1, stats: {} },
    "seed-winner-sf2": { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
