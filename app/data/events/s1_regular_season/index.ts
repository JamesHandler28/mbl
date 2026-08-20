// app/data/events/s1_regular_season/index.ts
//
// This folder holds one file per match (match_1.ts ... match_56.ts),
// each with that match's bracket info AND both teams' logs together.
// This file collects them all and re-exports the same three names that
// app/data/index.ts already imports — S1_REGULAR_SEASON_INFO,
// S1_REGULAR_SEASON_BRACKET, S1_REGULAR_SEASON_LOGS — so NOTHING in
// app/data/index.ts needs to change. Importing './events/s1_regular_season'
// resolves to this index.ts automatically since it's a folder now.

import { MATCH_1 } from './match_1';
import { MATCH_2 } from './match_2';
import { MATCH_3 } from './match_3';
import { MATCH_4 } from './match_4';
import { MATCH_5 } from './match_5';
import { MATCH_6 } from './match_6';
import { MATCH_7 } from './match_7';
import { MATCH_8 } from './match_8';
import { MATCH_9 } from './match_9';
import { MATCH_10 } from './match_10';
import { MATCH_11 } from './match_11';
import { MATCH_12 } from './match_12';
import { MATCH_13 } from './match_13';
import { MATCH_14 } from './match_14';
import { MATCH_15 } from './match_15';
import { MATCH_16 } from './match_16';
import { MATCH_17 } from './match_17';
import { MATCH_18 } from './match_18';
import { MATCH_19 } from './match_19';
import { MATCH_20 } from './match_20';
import { MATCH_21 } from './match_21';
import { MATCH_22 } from './match_22';
import { MATCH_23 } from './match_23';
import { MATCH_24 } from './match_24';
import { MATCH_25 } from './match_25';
import { MATCH_26 } from './match_26';
import { MATCH_27 } from './match_27';
import { MATCH_28 } from './match_28';
import { MATCH_29 } from './match_29';
import { MATCH_30 } from './match_30';
import { MATCH_31 } from './match_31';
import { MATCH_32 } from './match_32';
import { MATCH_33 } from './match_33';
import { MATCH_34 } from './match_34';
import { MATCH_35 } from './match_35';
import { MATCH_36 } from './match_36';
import { MATCH_37 } from './match_37';
import { MATCH_38 } from './match_38';
import { MATCH_39 } from './match_39';
import { MATCH_40 } from './match_40';
import { MATCH_41 } from './match_41';
import { MATCH_42 } from './match_42';
import { MATCH_43 } from './match_43';
import { MATCH_44 } from './match_44';
import { MATCH_45 } from './match_45';
import { MATCH_46 } from './match_46';
import { MATCH_47 } from './match_47';
import { MATCH_48 } from './match_48';
import { MATCH_49 } from './match_49';
import { MATCH_50 } from './match_50';
import { MATCH_51 } from './match_51';
import { MATCH_52 } from './match_52';
import { MATCH_53 } from './match_53';
import { MATCH_54 } from './match_54';
import { MATCH_55 } from './match_55';
import { MATCH_56 } from './match_56';

const ALL_MATCHES = [MATCH_1, MATCH_2, MATCH_3, MATCH_4, MATCH_5, MATCH_6, MATCH_7, MATCH_8, MATCH_9, MATCH_10, MATCH_11, MATCH_12, MATCH_13, MATCH_14, MATCH_15, MATCH_16, MATCH_17, MATCH_18, MATCH_19, MATCH_20, MATCH_21, MATCH_22, MATCH_23, MATCH_24, MATCH_25, MATCH_26, MATCH_27, MATCH_28, MATCH_29, MATCH_30, MATCH_31, MATCH_32, MATCH_33, MATCH_34, MATCH_35, MATCH_36, MATCH_37, MATCH_38, MATCH_39, MATCH_40, MATCH_41, MATCH_42, MATCH_43, MATCH_44, MATCH_45, MATCH_46, MATCH_47, MATCH_48, MATCH_49, MATCH_50, MATCH_51, MATCH_52, MATCH_53, MATCH_54, MATCH_55, MATCH_56];

export const S1_REGULAR_SEASON_INFO = {
  id: "s1-regular-season",
  name: "Regular Season",
  championId: null,
  completed: true,
};

export const S1_REGULAR_SEASON_BRACKET = ALL_MATCHES.map(m => ({
  id: m.id,
  round: m.round,
  team1: m.team1,
  team2: m.team2,
  winner: m.winner,
  score: m.score,
  videoUrl: m.videoUrl,
}));

export const S1_REGULAR_SEASON_LOGS = ALL_MATCHES.flatMap(m =>
  Object.entries(m.logs).map(([teamId, log]) => ({
    matchId: m.id,
    teamId,
    result: log.result,
    gamesCount: log.gamesCount,
    stats: log.stats,
  }))
);
