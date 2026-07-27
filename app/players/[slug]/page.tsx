import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teamsData, findPlayerBySlug, computeEffectiveOVR, normalizeStat } from '../../data';

const FifaStat = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2">
    <span className="font-sans font-black text-xl md:text-2xl text-white w-9 text-right">{value}</span>
    <span className="font-sans font-bold text-[11px] text-slate-400 uppercase tracking-widest">{label}</span>
  </div>
);

const getCombatScore = (p: any) => (p.kills || 0) * 10 + (p.assists || 0) * 5 - (p.deaths || 0) * 3;

export default async function PlayerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = findPlayerBySlug(teamsData, slug);

  if (!found) {
    return (
      <div className="p-20 text-center text-mbl-pink font-sans font-bold text-2xl">
        Player not found
      </div>
    );
  }

  const { player, team } = found;

  // Global rank (same combat-score ranking used on the team page)
  const allPlayers = teamsData.flatMap(t => t.players.map(p => ({ name: p.name, score: getCombatScore(p) })));
  allPlayers.sort((a, b) => b.score - a.score);
  const rank = allPlayers.findIndex(p => p.name === player.name) + 1;
  const score = getCombatScore(player);

  const acc = normalizeStat(player.attributes?.accuracy ?? 0, 1);
  const pat = normalizeStat(player.attributes?.patience ?? 0, 250);
  const mel = normalizeStat(player.attributes?.meleeBias ?? 0, 1);
  const str = normalizeStat(player.attributes?.strafeRate ?? 0, 1);
  const agg = normalizeStat(player.attributes?.aggression ?? 0, 800);
  const pck = normalizeStat(player.attributes?.packAffinity ?? 0, 1);
  const ovr = computeEffectiveOVR(player);

  const winRate = player.gamesPlayed && player.gamesPlayed > 0
    ? ((player.wins! / player.gamesPlayed) * 100).toFixed(1) + "%"
    : "0.0%";
  const kd = player.deaths && player.deaths > 0
    ? (player.kills! / player.deaths).toFixed(2)
    : (player.kills || 0).toFixed(2);

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 pt-24 md:pt-28 font-sans text-slate-200">
      {/* BACK NAV */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link href={`/teams/${team.id}`} className="text-slate-400 hover:text-white text-xs font-sans font-bold uppercase tracking-widest transition-colors">
          ← Back to {team.name}
        </Link>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">

        {/* --- FIFA CARD --- */}
        <div className={`relative rounded-2xl p-6 flex flex-col items-center bg-gradient-to-b from-slate-800 to-mbl-darkblue border-2 ${team.color} shadow-2xl`}>
          <div className="absolute top-4 left-4 flex flex-col items-center bg-black/60 backdrop-blur border border-mbl-yellow/40 rounded-lg px-3 py-1.5 shadow-md">
            <span className="font-sans font-black text-2xl text-mbl-yellow leading-none">{ovr}</span>
            <span className="font-sans font-bold text-[9px] text-slate-400 uppercase tracking-widest leading-none mt-0.5">OVR</span>
          </div>

          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] font-sans font-bold uppercase tracking-wider text-slate-300 shadow-md">
            #{rank}
          </div>

          <div className="w-32 h-32 rounded-full mt-10 mb-4 overflow-hidden relative border border-white/10">
            {player.image ? (
              <Image src={`/players/${player.image}`} alt={player.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-800 font-sans font-black text-slate-500 text-4xl">
                {player.name.charAt(0)}
              </div>
            )}
          </div>

          <h1 className="font-sans font-black uppercase text-2xl text-center tracking-wide text-white break-words">
            {player.name}
          </h1>

          <Link href={`/teams/${team.id}`} className="mt-1 text-sm font-sans font-bold text-slate-400 hover:text-mbl-yellow transition-colors uppercase tracking-wide">
            {team.name}
          </Link>

          <span className={`mt-2 mb-4 text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${player.role === "Captain" ? 'bg-mbl-yellow text-mbl-darkblue' : 'bg-slate-800 text-slate-500'}`}>
            {player.role}
          </span>

          <div className="w-full grid grid-cols-2 gap-x-3 gap-y-2 bg-black/30 p-4 rounded-lg border border-white/5">
            <FifaStat label="ACC" value={acc} />
            <FifaStat label="STR" value={str} />
            <FifaStat label="PAT" value={pat} />
            <FifaStat label="AGG" value={agg} />
            <FifaStat label="MEL" value={mel} />
            <FifaStat label="PCK" value={pck} />
          </div>
        </div>

        {/* --- SEASON STATS --- */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
            <h2 className="font-sans font-black uppercase text-lg text-white mb-4 tracking-wide border-b border-white/10 pb-2">
              Season Stats
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Combat Score</div>
                <div className="font-sans font-black text-2xl text-mbl-teal">{score}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">K / D</div>
                <div className="font-sans font-black text-2xl text-white">{kd}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Win Rate</div>
                <div className="font-sans font-black text-2xl text-green-400">{winRate}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Kills</div>
                <div className="font-sans font-black text-xl text-mbl-yellow">{player.kills || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Deaths</div>
                <div className="font-sans font-black text-xl text-mbl-pink">{player.deaths || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Assists</div>
                <div className="font-sans font-black text-xl text-mbl-teal">{player.assists || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Damage Dealt</div>
                <div className="font-sans font-black text-xl text-orange-400">{player.damageDealt || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Fights Played</div>
                <div className="font-sans font-black text-xl text-white">{player.gamesPlayed || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Wins</div>
                <div className="font-sans font-black text-xl text-green-400">{player.wins || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}