// dump_playoff_recap.js
//
// Run from the root of your `mbl` repo:
//   node dump_playoff_recap.js
//
// Reads every match_N.ts under app/data/events/s1_playoffs/ and prints
// each game's result, plus the series outcome (2-0 or 2-1), plus the
// combined top 5 individual performers across all 9 playoff games.
//
// Paste the full output back to Claude to get an accurate End of
// Season 1 recap post written from real data.

const fs = require('fs');
const path = require('path');

const DIR = path.join('app', 'data', 'events', 's1_playoffs');

function loadMatches() {
  const files = fs.readdirSync(DIR).filter(f => /^match_\d+\.ts$/.test(f));
  files.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

  const matches = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(DIR, file), 'utf8');

    const id = (content.match(/id:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const round = (content.match(/round:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const team1 = (content.match(/team1:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const team2 = (content.match(/team2:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const winner = (content.match(/winner:\s*["'`]([^"'`]+)["'`]/) || [])[1] || null;
    const score = (content.match(/score:\s*["'`]([^"'`]+)["'`]/) || [])[1];

    const stats = [...content.matchAll(/"([^"]+)":\s*\[(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\]/g)]
      .map(([, name, k, d, a, dmg]) => ({ name, kills: +k, deaths: +d, assists: +a, damage: +dmg }));

    matches.push({ id, round, team1, team2, winner, score, stats });
  }
  return matches;
}

function main() {
  if (!fs.existsSync(DIR)) {
    console.log(`Could not find ${DIR}. Run this from the root of your mbl repo.`);
    process.exit(1);
  }

  const matches = loadMatches();
  const rounds = ["Semifinal 1", "Semifinal 2", "Final"];
  const playerTotals = {};

  for (const round of rounds) {
    console.log(`\n========== ${round.toUpperCase()} ==========`);
    const games = matches.filter(m => m.round === round);
    if (games.length === 0) {
      console.log('  (no games found for this round)');
      continue;
    }

    let seriesWins = {};
    games.forEach((m, i) => {
      const played = m.winner ? `winner: ${m.winner}, score: ${m.score}` : 'NOT YET PLAYED';
      console.log(`  Game ${i + 1} (${m.id}): ${m.team1} vs ${m.team2} -> ${played}`);
      if (m.winner) {
        seriesWins[m.winner] = (seriesWins[m.winner] || 0) + 1;
        m.stats.forEach(s => {
          if (!playerTotals[s.name]) playerTotals[s.name] = { kills: 0, deaths: 0, assists: 0, damage: 0, games: 0 };
          const p = playerTotals[s.name];
          p.kills += s.kills;
          p.deaths += s.deaths;
          p.assists += s.assists;
          p.damage += s.damage;
          p.games += 1;
        });
      }
    });

    const seriesEntries = Object.entries(seriesWins).sort((a, b) => b[1] - a[1]);
    if (seriesEntries.length > 0) {
      const [seriesWinner, wins] = seriesEntries[0];
      const totalPlayed = games.filter(g => g.winner).length;
      console.log(`  --- Series: ${seriesWinner} wins ${wins}-${totalPlayed - wins} ---`);
    }
  }

  console.log(`\n========== TOP 5 PLAYOFF PERFORMERS (combined, all rounds) ==========`);
  Object.entries(playerTotals)
    .map(([name, p]) => ({ name, score: p.kills * 10 + p.assists * 5 - p.deaths * 3, ...p }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .forEach((p, i) => console.log(`  #${i + 1} ${p.name}: score=${p.score} (${p.kills}K ${p.deaths}D ${p.assists}A, ${p.games} games)`));
}

main();