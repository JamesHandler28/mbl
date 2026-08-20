import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teamsData, leagueHistory, ALL_MATCH_LOGS } from '../../data';

// Converts a normal/shorts YouTube URL into an embeddable URL
function toEmbedUrl(url: string): string | null {
  try {
    const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;

    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    return null;
  } catch {
    return null;
  }
}

export default async function MatchDetailPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = await params;

  // Find the match across every season/event
  let foundMatch: any = null;
  let foundEventName = "";
  let foundSeasonTitle = "";

  for (const season of leagueHistory) {
    for (const event of season.events) {
      const match = event.matches.find(m => m.id === matchId);
      if (match) {
        foundMatch = match;
        foundEventName = event.name;
        foundSeasonTitle = season.title;
        break;
      }
    }
    if (foundMatch) break;
  }

  if (!foundMatch) {
    return (
      <div className="p-20 text-center text-mbl-pink font-sans font-bold text-2xl">
        Match not found
      </div>
    );
  }

  const team1 = teamsData.find(t => t.id === foundMatch.team1);
  const team2 = teamsData.find(t => t.id === foundMatch.team2);

  const logs = ALL_MATCH_LOGS.filter((log: any) => log.matchId === matchId);
  const team1Log = logs.find((log: any) => log.teamId === foundMatch.team1);
  const team2Log = logs.find((log: any) => log.teamId === foundMatch.team2);

  const embedUrl = foundMatch.videoUrl ? toEmbedUrl(foundMatch.videoUrl) : null;

  const StatTable = ({ team, log, isWinner }: { team: typeof team1, log: any, isWinner: boolean }) => {
    if (!team) return null;
    return (
      <div className={`rounded-xl border overflow-hidden ${isWinner ? 'border-mbl-yellow/40' : 'border-white/10'}`}>
        <div className={`flex items-center justify-between px-4 py-3 ${isWinner ? 'bg-mbl-yellow/10' : 'bg-slate-900'}`}>
          <Link href={`/teams/${team.id}`} className="flex items-center gap-2 hover:text-mbl-yellow transition-colors">
            <div className={`w-8 h-8 rounded-full border-2 ${team.color} bg-black overflow-hidden shrink-0 relative`}>
              {team.players[0]?.image && (
                <Image src={`/players/${team.players[0].image}`} alt={team.name} fill className="object-cover" />
              )}
            </div>
            <span className="font-sans font-black uppercase text-white">{team.name}</span>
          </Link>
          {isWinner && <span className="text-lg">🏆</span>}
        </div>
        <table className="w-full text-left text-sm font-mono">
          <thead className="bg-black/30 text-slate-500 text-[10px] uppercase font-sans font-bold">
            <tr>
              <th className="p-2 pl-4">Player</th>
              <th className="p-2 text-center">K</th>
              <th className="p-2 text-center">D</th>
              <th className="p-2 text-center">A</th>
              <th className="p-2 text-center pr-4">DMG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {team.players.map(player => {
              const stats = log?.stats?.[player.name];
              return (
                <tr key={player.name}>
                  <td className="p-2 pl-4 font-sans font-bold text-white">{player.name}</td>
                  <td className="p-2 text-center text-mbl-yellow">{stats ? stats[0] : '-'}</td>
                  <td className="p-2 text-center text-mbl-pink">{stats ? stats[1] : '-'}</td>
                  <td className="p-2 text-center text-mbl-teal">{stats ? stats[2] : '-'}</td>
                  <td className="p-2 text-center pr-4 text-orange-400">{stats ? stats[3] : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 pt-24 md:pt-28 font-sans text-slate-200">
      <div className="max-w-4xl mx-auto">

        {/* BACK NAV */}
        <Link href="/games" className="text-slate-400 hover:text-white text-xs font-sans font-bold uppercase tracking-widest transition-colors">
          ← Back to Schedule
        </Link>

        {/* MATCH HEADER */}
        <div className="text-center my-8">
          <div className="text-[11px] text-mbl-teal font-sans font-bold uppercase tracking-widest mb-1">
            {foundSeasonTitle} — {foundEventName} — {foundMatch.round}
          </div>
          <div className="flex items-center justify-center gap-4 md:gap-8 mt-4">
            <span className={`font-sans font-black uppercase text-xl md:text-3xl ${foundMatch.winner === foundMatch.team1 ? 'text-mbl-yellow' : 'text-slate-400'}`}>
              {team1?.name || 'TBD'}
            </span>
            <span className="font-sans font-black text-2xl md:text-4xl text-white bg-mbl-darkblue border border-white/10 rounded-lg px-4 py-1">
              {foundMatch.score}
            </span>
            <span className={`font-sans font-black uppercase text-xl md:text-3xl ${foundMatch.winner === foundMatch.team2 ? 'text-mbl-yellow' : 'text-slate-400'}`}>
              {team2?.name || 'TBD'}
            </span>
          </div>
        </div>

        {/* VIDEO */}
        {embedUrl && (
          <div className="mb-10 rounded-xl overflow-hidden border border-white/10 shadow-2xl aspect-video">
            <iframe
              src={embedUrl}
              title="Match video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
        {!embedUrl && foundMatch.videoUrl === undefined && (
          <div className="mb-10 text-center text-slate-500 text-xs font-sans uppercase tracking-widest border border-dashed border-white/10 rounded-xl py-8">
            No video recorded for this match
          </div>
        )}

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatTable team={team1} log={team1Log} isWinner={foundMatch.winner === foundMatch.team1} />
          <StatTable team={team2} log={team2Log} isWinner={foundMatch.winner === foundMatch.team2} />
        </div>

      </div>
    </div>
  );
}