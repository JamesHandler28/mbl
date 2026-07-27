// app/data/events/s1_playoffs.ts
//
// Season 1, Event 2: playoffs. The top 4 teams from the regular season
// standings (by W-L record — see the Teams page sort logic) advance to
// a single-elimination bracket: 2 semifinals, then a final.
//
// IMPORTANT: team1/team2 below use placeholder "seed-N" ids until the
// regular season finishes and you know who actually made the top 4.
// Once the regular season concludes:
//   1. Replace "seed-1".."seed-4" with the real team ids, seeded by
//      final standings (seed-1 = best record, seed-4 = 4th place).
//   2. Replace "seed-winner-sf1" / "seed-winner-sf2" in the Final match
//      with whichever real team ids won each semifinal.
// Any id that doesn't match a real team (like "seed-1") automatically
// displays as "TBD" on the site — nothing breaks in the meantime, it
// just won't show real team names/colors until you fill them in.

import { Match } from '../roster';

export const S1_PLAYOFFS_INFO = {
  id: "s1-playoffs",
  name: "Playoffs",
  championId: null,
};

export const S1_PLAYOFFS_BRACKET: Match[] = [
  // SEMIFINALS — 1 vs 4, 2 vs 3 (standard top-4 seeding)
  { id: "s1-po-sf1", round: "Semifinals", team1: "seed-1", team2: "seed-4", winner: null, score: "TBD" },
  { id: "s1-po-sf2", round: "Semifinals", team1: "seed-2", team2: "seed-3", winner: null, score: "TBD" },

  // FINAL — winner of SF1 vs winner of SF2
  { id: "s1-po-final", round: "Final", team1: "seed-winner-sf1", team2: "seed-winner-sf2", winner: null, score: "TBD" },
];

// Same LOGS format as the regular season — add entries once playoff
// matches are actually played.
export const S1_PLAYOFFS_LOGS: any[] = [
  // (empty for now — fill in once playoff matches are played)
];