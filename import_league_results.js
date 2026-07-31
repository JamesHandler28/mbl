// import_league_results.js
//
// Usage:
//   node import_league_results.js
//
// Scans EXPORTS_DIR (your ai-battle-league project's league_exports/
// folder) for exported result files, one per match (named
// <LEAGUE_MATCH_ID>.ts, e.g. "s1-w1-m1.ts"). For each one, finds the
// matching match_N.ts under app/data/events/ (by its `id` field) and
// fills in winner/score/logs — but ONLY if that match hasn't already
// been filled in (i.e. its stats are still `{}`). Already-completed
// matches are skipped automatically, so it's safe to re-run this
// after every game without re-processing old results.
//
// videoUrl is never touched — add those manually after uploading.
//
// Run this from the root of your `mbl` repo. Update EXPORTS_DIR below
// to point at your ai-battle-league project's league_exports folder.

const fs = require('fs');
const path = require('path');

// --- CONFIGURE THIS ---
const EXPORTS_DIR = path.join('..', 'ai-battle-league', 'league_exports');
// -----------------------

const EVENTS_DIR = path.join('app', 'data', 'events');

function findMatchFile(matchId) {
  const results = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/^match_\d+\.ts$/.test(entry.name)) {
        const content = fs.readFileSync(full, 'utf8');
        if (content.includes(`id: "${matchId}"`)) {
          results.push(full);
        }
      }
    }
  }

  walk(EVENTS_DIR);
  return results;
}

function isAlreadyFilled(content) {
  // A freshly-generated match file has two "stats: {}" (one per team).
  // If either is already replaced with real data, treat it as done.
  const emptyStatsCount = (content.match(/stats:\s*{}/g) || []).length;
  return emptyStatsCount < 2;
}

function parseExportedResult(text, matchId) {
  const winnerMatch = text.match(/winner:\s*"([^"]+)"/);
  const scoreMatch = text.match(/score:\s*"([^"]+)"/);
  if (!winnerMatch || !scoreMatch) {
    throw new Error(`Could not find winner/score in ${matchId}.ts`);
  }

  const winner = winnerMatch[1];
  const score = scoreMatch[1];

  const teamBlocks = [...text.matchAll(/"(\w+)":\s*{\s*result:\s*"(WIN|LOSS)",\s*gamesCount:\s*(\d+),\s*stats:\s*{([\s\S]*?)}\s*}/g)];
  if (teamBlocks.length !== 2) {
    throw new Error(`Expected 2 team log blocks in ${matchId}.ts, found ${teamBlocks.length}.`);
  }

  const teams = {};
  for (const [, teamId, result, gamesCount, statsBody] of teamBlocks) {
    const stats = {};
    for (const [, name, k, d, a, dmg] of statsBody.matchAll(/"([^"]+)":\s*\[(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\]/g)) {
      stats[name] = [Number(k), Number(d), Number(a), Number(dmg)];
    }
    teams[teamId] = { result, gamesCount: Number(gamesCount), stats };
  }

  return { winner, score, teams };
}

function formatStatsBlock(stats, indent) {
  const lines = Object.entries(stats).map(
    ([name, [k, d, a, dmg]]) => `${indent}    "${name}": [${k}, ${d}, ${a}, ${dmg}],`
  );
  return lines.join('\n');
}

function applyToFile(filePath, parsed) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/winner:\s*null,(\s*\/\/.*)?/, `winner: "${parsed.winner}",$1`);
  content = content.replace(/score:\s*"TBD",(\s*\/\/.*)?/, `score: "${parsed.score}",$1`);

  for (const [teamId, log] of Object.entries(parsed.teams)) {
    const statsBlock = formatStatsBlock(log.stats, '    ');
    const pattern = new RegExp(
      `(${teamId}:\\s*{\\s*result:\\s*")LOSS("\\s*,\\s*gamesCount:\\s*)1(\\s*,\\s*stats:\\s*){}(\\s*})`,
    );
    const replacement = `$1${log.result}$2${log.gamesCount}$3{\n${statsBlock}\n    }$4`;
    const before = content;
    content = content.replace(pattern, replacement);
    if (content === before) {
      throw new Error(`Could not find/replace the "${teamId}" log block in ${filePath}.`);
    }
  }

  fs.writeFileSync(filePath, content);
}

function main() {
  if (!fs.existsSync(EXPORTS_DIR)) {
    console.log(`Exports folder not found: ${EXPORTS_DIR}`);
    console.log('Update EXPORTS_DIR at the top of this script to point at your ai-battle-league/league_exports folder.');
    process.exit(1);
  }

  const exportFiles = fs.readdirSync(EXPORTS_DIR).filter(f => f.endsWith('.ts'));
  if (exportFiles.length === 0) {
    console.log(`No exported result files found in ${EXPORTS_DIR}.`);
    return;
  }

  let applied = 0;
  let skipped = 0;

  for (const file of exportFiles) {
    const matchId = file.replace(/\.ts$/, '');
    const exportedText = fs.readFileSync(path.join(EXPORTS_DIR, file), 'utf8');

    const matches = findMatchFile(matchId);
    if (matches.length === 0) {
      console.log(`  [SKIP] ${matchId}: no match_N.ts found with id "${matchId}"`);
      skipped++;
      continue;
    }
    if (matches.length > 1) {
      console.log(`  [SKIP] ${matchId}: found multiple files with this id (${matches.join(', ')}) — fix duplicate ids first`);
      skipped++;
      continue;
    }

    const targetFile = matches[0];
    const targetContent = fs.readFileSync(targetFile, 'utf8');

    if (isAlreadyFilled(targetContent)) {
      console.log(`  [SKIP] ${matchId}: already filled in`);
      skipped++;
      continue;
    }

    try {
      const parsed = parseExportedResult(exportedText, matchId);
      applyToFile(targetFile, parsed);
      console.log(`  [DONE] ${matchId} -> ${targetFile} (winner=${parsed.winner}, score=${parsed.score})`);
      applied++;
    } catch (err) {
      console.log(`  [ERROR] ${matchId}: ${err.message}`);
      skipped++;
    }
  }

  console.log(`\n${applied} match(es) filled in, ${skipped} skipped.`);
  console.log('Remember to add videoUrl for each new match manually.');
}

main();