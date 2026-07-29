// app/data/events/s1_playoffs/index.ts
//
// Same pattern as s1_regular_season/ — one file per match, this file
// collects them and re-exports S1_PLAYOFFS_INFO, S1_PLAYOFFS_BRACKET,
// S1_PLAYOFFS_LOGS so app/data/index.ts needs zero changes.

import { MATCH_1 } from './match_1';
import { MATCH_2 } from './match_2';
import { MATCH_3 } from './match_3';

const ALL_MATCHES = [MATCH_1, MATCH_2, MATCH_3];

export const S1_PLAYOFFS_INFO = {
  id: "s1-playoffs",
  name: "Playoffs",
  championId: null, // set to the Final's winning team id once it's been played
};

export const S1_PLAYOFFS_BRACKET = ALL_MATCHES.map(m => ({
  id: m.id,
  round: m.round,
  team1: m.team1,
  team2: m.team2,
  winner: m.winner,
  score: m.score,
  videoUrl: m.videoUrl,
}));

export const S1_PLAYOFFS_LOGS = ALL_MATCHES.flatMap(m =>
  Object.entries(m.logs).map(([teamId, log]) => ({
    matchId: m.id,
    teamId,
    result: log.result,
    gamesCount: log.gamesCount,
    stats: log.stats,
  }))
);
