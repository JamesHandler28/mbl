// app/data/index.ts

// 1. Export everything from roster so the website can find 'Match' and 'teamsData'
export * from './roster'; 
import { STATIC_TEAMS } from './roster';

// --- IMPORT YOUR EVENTS HERE ---
import { S1_MAJOR_1_LOGS, S1_MAJOR_1_BRACKET, S1_MAJOR_1_INFO } from './events/s1_major1';
import { S1_MAJOR_2_LOGS, S1_MAJOR_2_BRACKET, S1_MAJOR_2_INFO } from './events/s1_major2';
import { S1_MAJOR_3_LOGS, S1_MAJOR_3_BRACKET, S1_MAJOR_3_INFO } from './events/s1_major3'; // <--- ADD THIS

// 1. COMBINE ALL MATCH LOGS
const ALL_MATCH_LOGS = [
  ...S1_MAJOR_1_LOGS,
  ...S1_MAJOR_2_LOGS,
  ...S1_MAJOR_3_LOGS,
];

// (DELETE THE INTERFACES 'Match' and 'Event' FROM HERE, THEY ARE IN ROSTER NOW)

// 2. CALCULATE STATS
export const teamsData = STATIC_TEAMS.map(team => {
   // ... (Keep the calculation logic exactly the same) ...
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
    status: "Completed",
    events: [
      { ...S1_MAJOR_1_INFO, matches: S1_MAJOR_1_BRACKET },
      { ...S1_MAJOR_2_INFO, matches: S1_MAJOR_2_BRACKET },
      { ...S1_MAJOR_3_INFO, matches: S1_MAJOR_3_BRACKET },
    ]
  },
  // ... Season 2 placeholder ...
];