// app/data/events/_matchType.ts
//
// Shared type used by every individual match file inside an event folder
// (e.g. s1_regular_season/match_1.ts). Keeps each match's bracket info
// AND per-team logs together in one file, instead of split across a
// giant _BRACKET array and a giant _LOGS array.

export interface TeamMatchLog {
  result: "WIN" | "LOSS";
  gamesCount: number;
  stats: Record<string, [number, number, number, number]>; // name -> [kills, deaths, assists, damage]
}

export interface MatchWithLogs {
  id: string;
  round: string;
  team1: string;
  team2: string;
  winner: string | null;
  score: string;
  videoUrl?: string;
  logs: Record<string, TeamMatchLog>; // keyed by team id (matches team1/team2)
}
