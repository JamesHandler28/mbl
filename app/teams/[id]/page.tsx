import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teamsData, leagueHistory, slugify, computeEffectiveOVR, normalizeStat } from '../../data';

const FifaStat = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center justify-between text-xs py-0.5">
    <span className="font-sans font-bold text-slate-300 uppercase tracking-wide">
      {label}
    </span>
    <span className="font-sans font-black text-white">{value}</span>
  </div>
);

// Helper: Calculate Combat Score
const getCombatScore = (p: any) => (p.kills || 0) * 10 + (p.assists || 0) * 5 - (p.deaths || 0) * 3;

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const teamIndex = teamsData.findIndex((t) => t.id === resolvedParams.id);
  const team = teamsData[teamIndex];

  if (!team) return <div className="p-20 text-center text-mbl-pink font-sans font-bold text-2xl">Team not found</div>;

  // --- 1. CALCULATE GLOBAL RANKS ---
  const allPlayersInLeague = teamsData.flatMap(t => t.players.map(p => ({
    name: p.name,
    score: getCombatScore(p)
  })));

  // Sort by Score (High to Low)
  allPlayersInLeague.sort((a, b) => b.score - a.score);

  // Create a Lookup Map
  const playerStatsMap = new Map();
  allPlayersInLeague.forEach((p, index) => {
    playerStatsMap.set(p.name, { rank: index + 1, score: p.score });
  });

  // --- 2. PREPARE & SORT TEAM PLAYERS ---
  const playersWithStats = team.players.map((p, originalIndex) => ({
    ...p,
    isCaptain: originalIndex === 0,
    stats: playerStatsMap.get(p.name) || { rank: 999, score: 0 }
  }));

  // SORT: Highest Score First
  const sortedPlayers = playersWithStats.sort((a, b) => b.stats.score - a.stats.score);

  // --- 3. NAV & TEAM STATS ---
  const prevTeam = teamsData[(teamIndex - 1 + teamsData.length) % teamsData.length];
  const nextTeam = teamsData[(teamIndex + 1) % teamsData.length];

  const totalKills = team.players.reduce((sum, player) => sum + (player.kills || 0), 0);
  let wins = 0;
  let losses = 0;
  let majorWins = 0;

  leagueHistory.forEach(season => {
    season.events.forEach(event => {
      if (event.championId === team.id) majorWins++;
      event.matches.forEach(match => {
        if (match.winner) {
          if (match.winner === team.id) wins++;
          else if (match.team1 === team.id || match.team2 === team.id) losses++;
        }
      });
    });
  });

  return (
    <div className="min-h-screen p-3 pb-12 md:p-6 font-sans text-slate-200">
      
      {/* --- COMPACT NAVIGATION HEADER --- */}
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
        <Link href={`/teams/${prevTeam.id}`} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-slate-900 group-hover:border-mbl-teal transition-all text-sm font-sans">←</div>
          <div className="hidden md:block font-bold text-xs">{prevTeam.name}</div>
        </Link>

        <Link href="/teams" className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500 hover:text-mbl-yellow transition-colors p-2">
          All Teams
        </Link>

        <Link href={`/teams/${nextTeam.id}`} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-right">
          <div className="hidden md:block font-bold text-xs">{nextTeam.name}</div>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-slate-900 group-hover:border-mbl-teal transition-all text-sm font-sans">→</div>
        </Link>
      </div>

      {/* --- TEAM HEADER --- */}
      <div className={`relative border-l-4 ${team.color} pl-4 md:pl-6 mb-8 py-2`}>
        <div className={`absolute left-0 top-0 h-full w-full opacity-10 bg-gradient-to-r from-${team.color.replace('border-', '')} to-transparent pointer-events-none`}></div>
        
        <h1 className="font-sans font-black uppercase italic tracking-tighter text-3xl md:text-6xl text-white drop-shadow-lg leading-none break-words">
          {team.name}
        </h1>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 font-sans font-bold uppercase tracking-widest text-xs md:text-sm">
           <div className="text-mbl-teal">{wins} W</div>
           <div className="text-mbl-pink">{losses} L</div>
           <div className="w-px h-4 bg-white/20"></div>
           <div className="text-mbl-yellow flex items-center gap-1">
             <span>☠</span> {totalKills} Kills
           </div>
           {majorWins > 0 && (
             <div className="flex items-center gap-1 text-white border border-mbl-yellow/50 px-2 py-0.5 rounded bg-mbl-yellow/20 ml-auto md:ml-0">
               <span>🏆</span> {majorWins} Majors
             </div>
           )}
        </div>
      </div>

      {/* --- ROSTER GRID (FIFA-style cards) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedPlayers.map((player) => {
          const acc = normalizeStat(player.attributes?.accuracy ?? 0, 1);
          const pat = normalizeStat(player.attributes?.patience ?? 0, 250);
          const mel = normalizeStat(player.attributes?.meleeBias ?? 0, 1);
          const str = normalizeStat(player.attributes?.strafeRate ?? 0, 1);
          const agg = normalizeStat(player.attributes?.aggression ?? 0, 800);
          const pck = normalizeStat(player.attributes?.packAffinity ?? 0, 1);
          const ovr = computeEffectiveOVR(player);

          return (
            <Link href={`/players/${slugify(player.name)}`} key={player.name} className="block">
              <div 
                className={`
                  relative group overflow-hidden rounded-2xl p-4 flex flex-col items-center border transition-all duration-300 cursor-pointer
                  ${player.isCaptain 
                    ? `bg-gradient-to-b from-slate-800 to-mbl-darkblue ${team.color} shadow-lg scale-[1.01] z-10` 
                    : 'bg-slate-900/50 border-white/5 hover:border-mbl-teal/50 hover:bg-slate-800'
                  }
                `}
              >
                {/* OVR BADGE (top-left, FIFA-card style) */}
                <div className="absolute top-2 left-2 z-20 flex flex-col items-center bg-black/60 backdrop-blur border border-mbl-yellow/40 rounded-lg px-2 py-1 shadow-md">
                  <span className="font-sans font-black text-lg text-mbl-yellow leading-none">{ovr}</span>
                  <span className="font-sans font-bold text-[8px] text-slate-400 uppercase tracking-widest leading-none mt-0.5">OVR</span>
                </div>

                {/* RANK BADGE */}
                <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] font-sans font-bold uppercase tracking-wider text-slate-300 shadow-md">
                  #{player.stats.rank}
                </div>

                {/* AVATAR */}
                <div className={`
                  w-28 h-28 rounded-2xl mt-0 mb-3 flex items-center justify-center overflow-hidden relative
                `}>
                  {player.image ? (
                    <Image src={`/players/${player.image}`} alt={player.name} fill className="object-contain translate-y-[20.6%] group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <span className="font-sans font-black text-slate-500 text-2xl">{player.name.charAt(0)}</span>
                  )}
                </div>

                {/* NAME */}
                <h2 className={`font-sans font-black uppercase text-xl mb-0.5 tracking-wide text-center break-all ${player.isCaptain ? 'text-white' : 'text-slate-200'}`}>
                  {player.name}
                </h2>
                
                {/* CAPTAIN / MEMBER BADGE */}
                <span className={`mb-3 text-[9px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${player.isCaptain ? 'bg-mbl-yellow text-mbl-darkblue' : 'bg-slate-800 text-slate-500'}`}>
                  {player.isCaptain ? 'Captain' : 'Member'}
                </span>

                {/* COMBAT STATS */}
                <div className="grid grid-cols-3 gap-1 w-full mb-3 border-t border-b border-white/5 py-2">
                  <div className="text-center">
                    <div className="text-[9px] text-slate-500 font-sans font-bold uppercase">Score</div>
                    <div className="font-sans font-black text-lg text-mbl-teal">{player.stats.score}</div>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <div className="text-[9px] text-slate-500 font-sans font-bold uppercase">Kills</div>
                    <div className="font-sans font-black text-lg text-mbl-yellow">{player.kills || 0}</div>
                  </div>
                  <div className="text-center border-l border-white/5">
                    <div className="text-[9px] text-slate-500 font-sans font-bold uppercase">Deaths</div>
                    <div className="font-sans font-black text-lg text-mbl-pink">{player.deaths || 0}</div>
                  </div>
                </div>

                {/* FIFA-STYLE STAT GRID: 2 columns x 3 rows */}
                {player.attributes && (
                  <div className="w-full space-y-1.5 bg-black/30 p-3 rounded-lg border border-white/5 backdrop-blur-sm">
                    <FifaStat label="Accuracy" value={acc} />
                    <FifaStat label="Patience" value={pat} />
                    <FifaStat label="Melee Bias" value={mel} />
                    <FifaStat label="Strafe Rate" value={str} />
                    <FifaStat label="Aggression" value={agg} />
                    <FifaStat label="Pack Affinity" value={pck} />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* --- TEAM SCHEDULE (below roster) --- */}
      {(() => {
        const teamMatches = leagueHistory.flatMap(season =>
          season.events.flatMap(event =>
            event.matches
              .filter(m => m.team1 === team.id || m.team2 === team.id)
              .map(m => ({ ...m, eventName: event.name }))
          )
        );

        if (teamMatches.length === 0) return null;

        const getOpponentInfo = (match: typeof teamMatches[number]) => {
          const oppId = match.team1 === team.id ? match.team2 : match.team1;
          return teamsData.find(t => t.id === oppId) || { name: "TBD", color: "border-gray-700", id: oppId };
        };

        return (
          <div className="mt-10">
            <h2 className="font-sans font-black uppercase text-lg text-white mb-3 tracking-wide border-b border-white/10 pb-2">
              Schedule
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {teamMatches.map(match => {
                const opponent = getOpponentInfo(match);
                const isPlayed = match.winner !== null;
                const isWin = match.winner === team.id;

                const cardClasses = `
                  flex items-center justify-between gap-2 p-3 rounded-lg border text-sm transition-colors
                  ${isPlayed
                    ? isWin
                      ? 'bg-mbl-teal/10 border-mbl-teal/30 hover:bg-mbl-teal/20 cursor-pointer'
                      : 'bg-mbl-pink/10 border-mbl-pink/30 hover:bg-mbl-pink/20 cursor-pointer'
                    : 'bg-slate-900/50 border-white/5'
                  }
                `;

                const cardContent = (
                  <>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-500 font-sans font-bold uppercase tracking-widest">{match.round}</span>
                      <span className="font-sans font-bold text-white">vs {opponent.name}</span>
                    </div>
                    <span className={`
                      text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded shrink-0
                      ${isPlayed
                        ? isWin ? 'bg-mbl-teal/20 text-mbl-teal' : 'bg-mbl-pink/20 text-mbl-pink'
                        : 'bg-slate-800 text-slate-500'
                      }
                    `}>
                      {isPlayed ? (isWin ? 'WIN' : 'LOSS') : 'TBD'}
                    </span>
                  </>
                );

                return isPlayed ? (
                  <Link href={`/matches/${match.id}`} key={match.id} className={cardClasses}>
                    {cardContent}
                  </Link>
                ) : (
                  <div key={match.id} className={cardClasses}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}