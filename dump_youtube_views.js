// dump_youtube_views.js
//
// SETUP (one-time):
//   1. Go to https://console.cloud.google.com/
//   2. Create a project (or use an existing one)
//   3. Enable the "YouTube Data API v3" (Library -> search for it -> Enable)
//   4. Go to Credentials -> Create Credentials -> API key
//   5. Copy that key and paste it into API_KEY below
//
// Run from the root of your `mbl` repo:
//   node dump_youtube_views.js
//
// Reads every match's videoUrl (regular season + playoffs), fetches
// the real view count for each from YouTube, and aggregates totals per
// team (a team gets credit for every match it played in, home or
// away). Paste the full output back to Claude for the "Most Views"
// award.

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = "AIzaSyCiRjUiMWStsu67fYvGCPBzlxqX12ezwRU";

const REGULAR_DIR = path.join('app', 'data', 'events', 's1_regular_season');
const PLAYOFF_DIR = path.join('app', 'data', 'events', 's1_playoffs');

function extractVideoId(url) {
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortUrlMatch) return shortUrlMatch[1];
  return null;
}

function loadMatchesFromDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => /^match_\d+\.ts$/.test(f));
  const matches = [];
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const team1 = (content.match(/team1:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const team2 = (content.match(/team2:\s*["'`]([^"'`]+)["'`]/) || [])[1];
    const videoUrlMatch = content.match(/videoUrl:\s*["'`]([^"'`]+)["'`]/);
    if (!videoUrlMatch) continue; // no video for this match yet
    matches.push({ team1, team2, videoUrl: videoUrlMatch[1] });
  }
  return matches;
}

function fetchViewCounts(videoIds) {
  return new Promise((resolve, reject) => {
    // The API accepts up to 50 ids per request, comma-separated
    const idsParam = videoIds.join(',');
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${idsParam}&key=${API_KEY}`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(json.error.message));
            return;
          }
          const result = {};
          (json.items || []).forEach(item => {
            result[item.id] = parseInt(item.statistics.viewCount || '0', 10);
          });
          resolve(result);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  if (API_KEY === "PASTE_YOUR_API_KEY_HERE") {
    console.log('Set API_KEY at the top of this script first — see the setup instructions in the comment block.');
    process.exit(1);
  }

  const allMatches = [...loadMatchesFromDir(REGULAR_DIR), ...loadMatchesFromDir(PLAYOFF_DIR)];
  if (allMatches.length === 0) {
    console.log('No matches with a videoUrl found.');
    return;
  }

  const videoIds = allMatches.map(m => extractVideoId(m.videoUrl)).filter(Boolean);

  // Batch in groups of 50 (API limit per request)
  const viewCounts = {};
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const batchResult = await fetchViewCounts(batch);
    Object.assign(viewCounts, batchResult);
  }

  const teamTotals = {};
  let grandTotal = 0;

  allMatches.forEach(m => {
    const id = extractVideoId(m.videoUrl);
    const views = viewCounts[id] || 0;
    grandTotal += views;
    [m.team1, m.team2].forEach(team => {
      teamTotals[team] = (teamTotals[team] || 0) + views;
    });
  });

  console.log(`\n========== VIEWS PER TEAM (${allMatches.length} videos, ${grandTotal.toLocaleString()} total views) ==========`);
  console.log('Each team gets credit for every match they played in.\n');
  Object.entries(teamTotals)
    .sort((a, b) => b[1] - a[1])
    .forEach(([team, views]) => console.log(`  ${team}: ${views.toLocaleString()} views`));

  console.log(`\n========== TOP 10 INDIVIDUAL VIDEOS BY VIEWS ==========`);
  allMatches
    .map(m => ({ ...m, views: viewCounts[extractVideoId(m.videoUrl)] || 0 }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)
    .forEach((m, i) => console.log(`  #${i + 1} ${m.team1} vs ${m.team2}: ${m.views.toLocaleString()} views`));
}

main();