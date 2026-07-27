// app/data/index.ts

// 1. Export everything from roster so the website can find 'Match' and 'teamsData'
export * from './roster'; 
import { STATIC_TEAMS } from './roster';

// --- IMPORT YOUR EVENTS HERE ---
// The old s1_major1 / s1_major2 / s1_major3 files are no longer used —
// Season 1 is now a regular season + top-4 playoffs instead of majors.
import { S1_REGULAR_SEASON_LOGS, S1_REGULAR_SEASON_BRACKET, S1_REGULAR_SEASON_INFO } from './events/s1_regular_season';
import { S1_PLAYOFFS_LOGS, S1_PLAYOFFS_BRACKET, S1_PLAYOFFS_INFO } from './events/s1_playoffs';

// 1. COMBINE ALL MATCH LOGS
export const ALL_MATCH_LOGS = [
  ...S1_REGULAR_SEASON_LOGS,
  ...S1_PLAYOFFS_LOGS,
];

// 2. CALCULATE STATS
export const teamsData = STATIC_TEAMS.map(team => {
   const playersWithStats = team.players.map(player => ({
    ...player,
    kills: 0,
    deaths: 0,
    assists: 0,
    damageDealt: 0,
    gamesPlayed: 0,
    wins: 0,
  }));

  const teamLogs = ALL_MATCH_LOGS.filter(log => log.teamId === team.id);

  teamLogs.forEach(log => {
    const isWin = log.result === "WIN" ? 1 : 0;
    const gamesInMatch = log.gamesCount || 1;
    playersWithStats.forEach(player => {
      // @ts-ignore
      const pStats = log.stats[player.name];
      if (pStats) {
        player.kills += pStats[0];
        player.deaths += pStats[1];
        player.assists += pStats[2];
        player.damageDealt += pStats[3];
        player.gamesPlayed += gamesInMatch;
        player.wins += isWin;
      }
    });
  });

  return { ...team, players: playersWithStats };
});

// 3. EXPORT HISTORY
export const leagueHistory = [
  {
    id: "season-1",
    title: "MBL - Season 1",
    status: "In Progress", // change to "Completed" once playoffs finish
    events: [
      { ...S1_REGULAR_SEASON_INFO, matches: S1_REGULAR_SEASON_BRACKET },
      { ...S1_PLAYOFFS_INFO, matches: S1_PLAYOFFS_BRACKET },
    ]
  },
  // Season 2 placeholder — add here once Season 1 wraps up
];