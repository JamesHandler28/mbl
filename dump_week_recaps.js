// dump_week_recaps.js
//
// Run from the root of your `mbl` repo:
//   node dump_week_recaps.js
//
// Reads every match_N.ts under app/data/events/s1_regular_season/ and
// prints, per week: each match's result/score, the week's standings
// delta (who went undefeated, who's winless), and top individual
// performers by combat score (kills*10 + assists*5 - deaths*3) as of
// that week's end.
//
// Paste the full output back to Claude to get accurate Week 2-6 recap
// posts written from real data instead of guesses.

const fs = require('fs');
const path = require('path');

const DIR = path.join('app', 'data', 'events', 's1_regular_season');

function loadMatches() {
  const files = fs.readdirSync(DIR).filter(f => /^match_\d+\.ts$/.test(f));
  files.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

  const matches = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(DIR, file), 'utf8');

    const round = (content.match(/round:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const team1 = (content.match(/team1:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const team2 = (content.match(/team2:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const winner = (content.match(/winner:\s*["'`]([^"'`]+)["'`]/) || [])[1] || null;
    const score = (content.match(/score:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const id = (content.match(/id:\s*["'`]([^"'`]+)["'`]/) || [])[1];

    // Pull every "Name": [k, d, a, dmg] stat line, regardless of which
    // team block it's under.
    const stats = [...content.matchAll(/"([^"]+)":\s*\[(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\]/g)]
      .map(([, name, k, d, a, dmg]) => ({
        name, kills: +k, deaths: +d, assists: +a, damage: +dmg,
      }));

    if (!winner) continue; // skip unplayed matches

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
  if (matches.length === 0) {
    console.log('No played matches found.');
    return;
  }

  const weekGroups = {};
  matches.forEach(m => {
    const weekMatch = (m.round || '').match(/week\s*(\d+)/i);
    const week = weekMatch ? parseInt(weekMatch[1]) : 'other';
    if (!weekGroups[week]) weekGroups[week] = [];
    weekGroups[week].push(m);
  });

  // Running cumulative record + per-player cumulative stats, updated
  // week by week so each week's printout reflects standings AS OF that
  // week's end (not full-season totals).
  const record = {}; // teamId -> { w, l }
  const playerStats = {}; // playerName -> { kills, deaths, assists, damage, games, wins }

  const weekNumbers = Object.keys(weekGroups)
    .filter(w => w !== 'other')
    .map(Number)
    .sort((a, b) => a - b);

  for (const week of weekNumbers) {
    console.log(`\n========== WEEK ${week} ==========`);
    const weekMatches = weekGroups[week];

    weekMatches.forEach(m => {
      const loser = m.winner === m.team1 ? m.team2 : m.team1;
      console.log(`  ${m.id}: ${m.team1} vs ${m.team2} -> winner: ${m.winner}, score: ${m.score}`);

      record[m.winner] = record[m.winner] || { w: 0, l: 0 };
      record[loser] = record[loser] || { w: 0, l: 0 };
      record[m.winner].w++;
      record[loser].l++;

      m.stats.forEach(s => {
        if (!playerStats[s.name]) {
          playerStats[s.name] = { kills: 0, deaths: 0, assists: 0, damage: 0, games: 0, wins: 0 };
        }
        const p = playerStats[s.name];
        p.kills += s.kills;
        p.deaths += s.deaths;
        p.assists += s.assists;
        p.damage += s.damage;
        p.games += 1;
      });
    });

    console.log(`\n  --- Standings as of end of Week ${week} ---`);
    Object.entries(record)
      .sort((a, b) => b[1].w - a[1].w || a[1].l - b[1].l)
      .forEach(([team, r]) => console.log(`    ${team}: ${r.w}-${r.l}`));

    console.log(`\n  --- Top 5 individual combat score as of end of Week ${week} ---`);
    Object.entries(playerStats)
      .map(([name, p]) => ({
        name,
        score: p.kills * 10 + p.assists * 5 - p.deaths * 3,
        ...p,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .forEach((p, i) => console.log(`    #${i + 1} ${p.name}: score=${p.score} (${p.kills}K ${p.deaths}D ${p.assists}A, ${p.games} games)`));
  }
}

main();