// dump_awards_stats_v2.js
//
// Run from the root of your `mbl` repo:
//   node dump_awards_stats_v2.js
//
// Two things this covers that the last script didn't:
//   1. REGULAR SEASON ONLY totals (everyone's same 14 games — fair
//      comparison for MVP / Offensive / Defensive / Most Improved,
//      unlike combined totals which unfairly favor playoff teams who
//      simply played more games).
//   2. "Sole Survivor" clutch tracking — for every game a team WON
//      4-3, which one of their 4 players had ZERO deaths in that
//      specific game (the "last one standing"). Tallied across BOTH
//      regular season and playoffs, since clutch playoff moments count
//      double if anything.
//
// Paste the full output back to Claude.

const fs = require('fs');
const path = require('path');

const REGULAR_DIR = path.join('app', 'data', 'events', 's1_regular_season');
const PLAYOFF_DIR = path.join('app', 'data', 'events', 's1_playoffs');

function loadMatchesFromDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => /^match_\d+\.ts$/.test(f));
  files.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

  const matches = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const id = (content.match(/id:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const round = (content.match(/round:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const team1 = (content.match(/team1:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const team2 = (content.match(/team2:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const winner = (content.match(/winner:\s*["'`]([^"'`]+)["'`]/) || [])[1] || null;
    const score = (content.match(/score:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    if (!winner) continue;

    // Pull each team's own stats block separately this time, so we know
    // WHICH team each player's numbers belong to in THIS match.
    const teamBlocks = [...content.matchAll(/(\w+):\s*{\s*result:\s*"(WIN|LOSS)",\s*gamesCount:\s*\d+,\s*stats:\s*{([\s\S]*?)}\s*}/g)];
    const perTeamStats = {};
    teamBlocks.forEach(([, teamId, , statsBody]) => {
      const stats = [...statsBody.matchAll(/"([^"]+)":\s*\[(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\]/g)]
        .map(([, name, k, d, a, dmg]) => ({ name, kills: +k, deaths: +d, assists: +a, damage: +dmg }));
      perTeamStats[teamId] = stats;
    });

    matches.push({ id, round, team1, team2, winner, score, perTeamStats });
  }
  return matches;
}

function printSeasonTotals(matches, label) {
  const totals = {};
  matches.forEach(m => {
    Object.values(m.perTeamStats).flat().forEach(s => {
      if (!totals[s.name]) totals[s.name] = { kills: 0, deaths: 0, assists: 0, damage: 0, games: 0 };
      const p = totals[s.name];
      p.kills += s.kills;
      p.deaths += s.deaths;
      p.assists += s.assists;
      p.damage += s.damage;
      p.games += 1;
    });
  });

  console.log(`\n========== ${label} ==========`);
  console.log('sorted by kills descending\n');
  Object.entries(totals)
    .sort((a, b) => b[1].kills - a[1].kills)
    .forEach(([name, p]) => {
      const dpg = (p.deaths / p.games).toFixed(2);
      const score = p.kills * 10 + p.assists * 5 - p.deaths * 3;
      console.log(`  ${name}: ${p.kills}K ${p.deaths}D ${p.assists}A ${p.damage}DMG | ${p.games} games | ${dpg} deaths/game | score=${score}`);
    });
}

function printSoleSurvivors(allMatches) {
  const survivorCounts = {};
  const survivorLog = [];

  allMatches.forEach(m => {
    const [a, b] = (m.score || '').split('-').map(Number);
    if (isNaN(a) || isNaN(b)) return;
    // Only games actually won 4-3 (winner's own score was 4, not the
    // 3-side). Figure out which side won 4 and which lost 3.
    const winnerIsTeam1 = m.winner === m.team1;
    const winnerScore = winnerIsTeam1 ? a : b;
    const loserScore = winnerIsTeam1 ? b : a;
    if (winnerScore !== 4 || loserScore !== 3) return;

    const winningTeamStats = m.perTeamStats[m.winner];
    if (!winningTeamStats) return;

    const survivors = winningTeamStats.filter(s => s.deaths === 0);
    survivors.forEach(s => {
      survivorCounts[s.name] = (survivorCounts[s.name] || 0) + 1;
    });
    survivorLog.push({ id: m.id, round: m.round, winner: m.winner, survivors: survivors.map(s => s.name) });
  });

  console.log(`\n========== SOLE SURVIVOR LOG (4-3 wins, zero-death players on the winning team) ==========`);
  survivorLog.forEach(s => console.log(`  ${s.id} (${s.round}): ${s.winner} won 4-3 — survivor(s): ${s.survivors.join(', ') || 'none (everyone died at least once)'}`));

  console.log(`\n========== SOLE SURVIVOR TALLY (most 4-3 wins survived without dying) ==========`);
  Object.entries(survivorCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([name, count], i) => console.log(`  #${i + 1} ${name}: ${count} time(s)`));
}

function main() {
  const regularMatches = loadMatchesFromDir(REGULAR_DIR);
  const playoffMatches = loadMatchesFromDir(PLAYOFF_DIR);
  const allMatches = [...regularMatches, ...playoffMatches];

  if (allMatches.length === 0) {
    console.log('No played matches found. Run this from the root of your mbl repo.');
    return;
  }

  printSeasonTotals(regularMatches, 'REGULAR SEASON ONLY TOTALS (fair — everyone played 14 games)');
  printSoleSurvivors(allMatches);
}

main();