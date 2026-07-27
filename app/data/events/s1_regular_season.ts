// app/data/events/s1_regular_season.ts
//
// Season 1, Event 1: the regular season. Every team plays every OTHER
// team TWICE (double round-robin) across 7 weeks — 2 games per team
// per week, 8 total matches per week, 56 matches for the season.
//
// This schedule was generated with randomized pairing/ordering (rather
// than a mechanical shift pattern) and then verified in code to
// guarantee: (1) every pair meets exactly twice across the season, and
// (2) no team ever faces the same opponent twice within the same week.
//
// The top 4 teams by record advance to the playoffs bracket
// (see s1_playoffs.ts).

import { Match } from '../roster';

export const S1_REGULAR_SEASON_INFO = {
  id: "s1-regular-season",
  name: "Regular Season",
  championId: null,
};

// winner: null and score: "TBD" until a match is actually played.
export const S1_REGULAR_SEASON_BRACKET: Match[] = [
  // ===== WEEK 1 =====
  { id: "s1-w1-m1", round: "Week 1", team1: "yellow", team2: "black", winner: null, score: "TBD" },
  { id: "s1-w1-m2", round: "Week 1", team1: "red", team2: "pink", winner: null, score: "TBD" },
  { id: "s1-w1-m3", round: "Week 1", team1: "green", team2: "blue", winner: null, score: "TBD" },
  { id: "s1-w1-m4", round: "Week 1", team1: "pink", team2: "yellow", winner: null, score: "TBD" },
  { id: "s1-w1-m5", round: "Week 1", team1: "orange", team2: "black", winner: null, score: "TBD" },
  { id: "s1-w1-m6", round: "Week 1", team1: "blue", team2: "red", winner: null, score: "TBD" },
  { id: "s1-w1-m7", round: "Week 1", team1: "green", team2: "purple", winner: null, score: "TBD" },
  { id: "s1-w1-m8", round: "Week 1", team1: "orange", team2: "purple", winner: null, score: "TBD" },

  // ===== WEEK 2 =====
  { id: "s1-w2-m1", round: "Week 2", team1: "yellow", team2: "blue", winner: null, score: "TBD" },
  { id: "s1-w2-m2", round: "Week 2", team1: "orange", team2: "green", winner: null, score: "TBD" },
  { id: "s1-w2-m3", round: "Week 2", team1: "purple", team2: "pink", winner: null, score: "TBD" },
  { id: "s1-w2-m4", round: "Week 2", team1: "purple", team2: "yellow", winner: null, score: "TBD" },
  { id: "s1-w2-m5", round: "Week 2", team1: "pink", team2: "black", winner: null, score: "TBD" },
  { id: "s1-w2-m6", round: "Week 2", team1: "blue", team2: "orange", winner: null, score: "TBD" },
  { id: "s1-w2-m7", round: "Week 2", team1: "black", team2: "red", winner: null, score: "TBD" },
  { id: "s1-w2-m8", round: "Week 2", team1: "green", team2: "red", winner: null, score: "TBD" },

  // ===== WEEK 3 =====
  { id: "s1-w3-m1", round: "Week 3", team1: "pink", team2: "purple", winner: null, score: "TBD" },
  { id: "s1-w3-m2", round: "Week 3", team1: "purple", team2: "orange", winner: null, score: "TBD" },
  { id: "s1-w3-m3", round: "Week 3", team1: "orange", team2: "green", winner: null, score: "TBD" },
  { id: "s1-w3-m4", round: "Week 3", team1: "green", team2: "blue", winner: null, score: "TBD" },
  { id: "s1-w3-m5", round: "Week 3", team1: "red", team2: "pink", winner: null, score: "TBD" },
  { id: "s1-w3-m6", round: "Week 3", team1: "yellow", team2: "blue", winner: null, score: "TBD" },
  { id: "s1-w3-m7", round: "Week 3", team1: "black", team2: "red", winner: null, score: "TBD" },
  { id: "s1-w3-m8", round: "Week 3", team1: "black", team2: "yellow", winner: null, score: "TBD" },

  // ===== WEEK 4 =====
  { id: "s1-w4-m1", round: "Week 4", team1: "red", team2: "yellow", winner: null, score: "TBD" },
  { id: "s1-w4-m2", round: "Week 4", team1: "pink", team2: "blue", winner: null, score: "TBD" },
  { id: "s1-w4-m3", round: "Week 4", team1: "orange", team2: "pink", winner: null, score: "TBD" },
  { id: "s1-w4-m4", round: "Week 4", team1: "purple", team2: "blue", winner: null, score: "TBD" },
  { id: "s1-w4-m5", round: "Week 4", team1: "green", team2: "black", winner: null, score: "TBD" },
  { id: "s1-w4-m6", round: "Week 4", team1: "green", team2: "yellow", winner: null, score: "TBD" },
  { id: "s1-w4-m7", round: "Week 4", team1: "orange", team2: "red", winner: null, score: "TBD" },
  { id: "s1-w4-m8", round: "Week 4", team1: "purple", team2: "black", winner: null, score: "TBD" },

  // ===== WEEK 5 =====
  { id: "s1-w5-m1", round: "Week 5", team1: "orange", team2: "red", winner: null, score: "TBD" },
  { id: "s1-w5-m2", round: "Week 5", team1: "purple", team2: "black", winner: null, score: "TBD" },
  { id: "s1-w5-m3", round: "Week 5", team1: "red", team2: "purple", winner: null, score: "TBD" },
  { id: "s1-w5-m4", round: "Week 5", team1: "yellow", team2: "orange", winner: null, score: "TBD" },
  { id: "s1-w5-m5", round: "Week 5", team1: "blue", team2: "black", winner: null, score: "TBD" },
  { id: "s1-w5-m6", round: "Week 5", team1: "green", team2: "yellow", winner: null, score: "TBD" },
  { id: "s1-w5-m7", round: "Week 5", team1: "pink", team2: "green", winner: null, score: "TBD" },
  { id: "s1-w5-m8", round: "Week 5", team1: "pink", team2: "blue", winner: null, score: "TBD" },

  // ===== WEEK 6 =====
  { id: "s1-w6-m1", round: "Week 6", team1: "blue", team2: "purple", winner: null, score: "TBD" },
  { id: "s1-w6-m2", round: "Week 6", team1: "pink", team2: "orange", winner: null, score: "TBD" },
  { id: "s1-w6-m3", round: "Week 6", team1: "green", team2: "red", winner: null, score: "TBD" },
  { id: "s1-w6-m4", round: "Week 6", team1: "black", team2: "pink", winner: null, score: "TBD" },
  { id: "s1-w6-m5", round: "Week 6", team1: "blue", team2: "orange", winner: null, score: "TBD" },
  { id: "s1-w6-m6", round: "Week 6", team1: "green", team2: "black", winner: null, score: "TBD" },
  { id: "s1-w6-m7", round: "Week 6", team1: "purple", team2: "yellow", winner: null, score: "TBD" },
  { id: "s1-w6-m8", round: "Week 6", team1: "red", team2: "yellow", winner: null, score: "TBD" },

  // ===== WEEK 7 =====
  { id: "s1-w7-m1", round: "Week 7", team1: "blue", team2: "black", winner: null, score: "TBD" },
  { id: "s1-w7-m2", round: "Week 7", team1: "pink", team2: "green", winner: null, score: "TBD" },
  { id: "s1-w7-m3", round: "Week 7", team1: "orange", team2: "yellow", winner: null, score: "TBD" },
  { id: "s1-w7-m4", round: "Week 7", team1: "yellow", team2: "pink", winner: null, score: "TBD" },
  { id: "s1-w7-m5", round: "Week 7", team1: "purple", team2: "red", winner: null, score: "TBD" },
  { id: "s1-w7-m6", round: "Week 7", team1: "green", team2: "purple", winner: null, score: "TBD" },
  { id: "s1-w7-m7", round: "Week 7", team1: "red", team2: "blue", winner: null, score: "TBD" },
  { id: "s1-w7-m8", round: "Week 7", team1: "orange", team2: "black", winner: null, score: "TBD" },
];

// --- LOGS: per-player stats for each played match ---
// Empty until matches are actually played. Add one entry PER TEAM per
// played match, following this shape:
//
// {
//   matchId: "s1-w1-m1",
//   teamId: "red",
//   result: "WIN" | "LOSS",
//   gamesCount: 1,
//   stats: {
//     "Pinetree Lance": [kills, deaths, assists, damage],
//     "Mastermind Staff": [kills, deaths, assists, damage],
//     "Candy Hammer": [kills, deaths, assists, damage],
//     "Lightning Jitte": [kills, deaths, assists, damage],
//   }
// }
export const S1_REGULAR_SEASON_LOGS: any[] = [
  // (empty for now — fill in as each week's matches are played)
];