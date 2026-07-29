// match_1.ts — Semifinal 1 (seed 1 vs seed 4)
// IMPORTANT: team1/team2 are placeholders until the regular season ends.
// Once standings are final, replace "seed-1"/"seed-4" with the real team
// ids (best record = seed-1, 4th place = seed-4), and update the `logs`
// keys below to match those same real team ids.

import { MatchWithLogs } from '../_matchType';

export const MATCH_1: MatchWithLogs = {
  id: "s1-po-sf1",
  round: "Semifinals",
  team1: "seed-1",
  team2: "seed-4",
  winner: null,
  score: "TBD",
  videoUrl: undefined,
  logs: {
    "seed-1": { result: "LOSS", gamesCount: 1, stats: {} },
    "seed-4": { result: "LOSS", gamesCount: 1, stats: {} },
  }
};
