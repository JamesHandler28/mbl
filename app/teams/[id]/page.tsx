import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teamsData, leagueHistory } from '../../data';

// Helper: Attribute Bar
// FIXED: Added 'font-sans' explicitly to prevent Times New Roman fallback
const AttributeBar = ({ label, value, max = 1, color }: { label: string, value: number, max?: number, color: string }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex items-center gap-2 text-[10px] font-sans font-bold w-full">
      <span className="w-12 text-slate-400 text-right uppercase tracking-tighter">{label}</span>
      <div className="flex-grow h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
        <div className={`h-full ${color} shadow-[0_0_8px_currentColor]`} style={{ width: `${pct}%` }}></div>
      </div>
      <span className="w-6 text-white text-left ml-1">{value}</span>
    </div>
  );
};

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const teamIndex = teamsData.findIndex((t) => t.id === resolvedParams.id);
  const team = teamsData[teamIndex];

  if (!team) return <div className="p-20 text-center text-mbl-pink font-sans font-bold text-2xl">Team not found</div>;

  // --- 1. CALCULATE NEXT / PREV TEAMS ---
  const prevTeam = teamsData[(teamIndex - 1 + teamsData.length) % teamsData.length];
  const nextTeam = teamsData[(teamIndex + 1) % teamsData.length];

  // --- 2. CALCULATE STATS ---
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
    // FIXED: Added 'font-sans' to the outer wrapper. 
    // This cascades down and ensures NO Times New Roman appears anywhere.
    <div className="min-h-screen p-3 pb-12 md:p-6 font-sans text-slate-200">
      
      {/* --- COMPACT NAVIGATION HEADER --- */}
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
        {/* PREV */}
        <Link href={`/teams/${prevTeam.id}`} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-slate-900 group-hover:border-mbl-teal transition-all text-sm font-sans">←</div>
          <div className="hidden md:block font-bold text-xs">{prevTeam.name}</div>
        </Link>

        {/* CENTER */}
        <Link href="/teams" className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500 hover:text-mbl-yellow transition-colors p-2">
          All Teams
        </Link>

        {/* NEXT */}
        <Link href={`/teams/${nextTeam.id}`} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-right">
          <div className="hidden md:block font-bold text-xs">{nextTeam.name}</div>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-slate-900 group-hover:border-mbl-teal transition-all text-sm font-sans">→</div>
        </Link>
      </div>

      {/* --- TEAM HEADER --- */}
      <div className={`relative border-l-4 ${team.color} pl-4 md:pl-6 mb-8 py-2`}>
        <div className={`absolute left-0 top-0 h-full w-full opacity-10 bg-gradient-to-r from-${team.color.replace('border-', '')} to-transparent pointer-events-none`}></div>
        
        {/* Title */}
        <h1 className="font-sans font-black uppercase italic tracking-tighter text-3xl md:text-6xl text-white drop-shadow-lg leading-none break-words">
          {team.name}
        </h1>
        
        {/* COMPACT STATS ROW */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 font-sans font-bold uppercase tracking-widest text-xs md:text-sm">
           <div className="text-mbl-teal">{wins} W</div>
           <div className="text-mbl-pink">{losses} L</div>
           <div className="w-px h-4 bg-white/20"></div>
           <div className="text-mbl-yellow flex items-center gap-1">
             <span>☠</span> {totalKills} Kills
           </div>
           {majorWins > 0 && (
             <div className="flex items-center gap-1 text-white border border-mbl-yellow/50 px-2 py-0.5 rounded bg-mbl-yellow/20 ml-auto md:ml-0">
               <span>🏆</span> {majorWins} Major(s)
             </div>
           )}
        </div>
      </div>

      {/* --- ROSTER GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.players.map((player, index) => (
          <div 
            key={player.name} 
            className={`
              relative group overflow-hidden rounded-xl p-4 flex flex-col items-center border transition-all duration-300
              ${index === 0 
                ? `bg-gradient-to-b from-slate-800 to-mbl-darkblue ${team.color} shadow-lg scale-[1.01] z-10` 
                : 'bg-slate-900/50 border-white/5 hover:border-mbl-teal/50 hover:bg-slate-800'
              }
            `}
          >
            {index === 0 && (
              <div className="absolute top-2 right-2 text-lg animate-pulse z-20" title="Team Captain">👑</div>
            )}

            {/* AVATAR */}
            <div className={`
              w-20 h-20 rounded-full mb-3 flex items-center justify-center overflow-hidden shadow-inner relative
              ${index === 0 ? 'border-2 border-mbl-yellow' : 'bg-slate-800 border border-white/10'}
            `}>
              {player.image ? (
                <Image src={`/players/${player.image}`} alt={player.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <span className="font-sans font-black text-slate-500 text-2xl">{player.name.charAt(0)}</span>
              )}
            </div>

            {/* NAME */}
            <h2 className={`font-sans font-black uppercase text-xl mb-0.5 tracking-wide text-center break-all ${index === 0 ? 'text-white' : 'text-slate-200'}`}>
              {player.name}
            </h2>
            
            {/* ROLE BADGE */}
            <span className={`mb-3 text-[9px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${index === 0 ? 'bg-mbl-yellow text-mbl-darkblue' : 'bg-slate-800 text-slate-500'}`}>
              {index === 0 ? 'Captain' : 'Member'}
            </span>

            {/* STATS GRID */}
            <div className="grid grid-cols-3 gap-1 w-full mb-3 border-t border-b border-white/5 py-2">
              <div className="text-center">
                <div className="text-[9px] text-slate-500 font-sans font-bold uppercase">Kills</div>
                <div className="font-sans font-black text-base text-mbl-yellow">{player.kills || 0}</div>
              </div>
              <div className="text-center border-l border-white/5">
                <div className="text-[9px] text-slate-500 font-sans font-bold uppercase">Deaths</div>
                <div className="font-sans font-black text-base text-mbl-pink">{player.deaths || 0}</div>
              </div>
              <div className="text-center border-l border-white/5">
                <div className="text-[9px] text-slate-500 font-sans font-bold uppercase">Assists</div>
                <div className="font-sans font-black text-base text-mbl-teal">{player.assists || 0}</div>
              </div>
            </div>

            {/* ATTRIBUTES */}
            {player.attributes && (
              <div className="w-full space-y-1 bg-black/30 p-2 rounded-lg border border-white/5 backdrop-blur-sm">
                <div className="text-center text-[9px] font-sans font-bold text-slate-400 uppercase tracking-widest mb-1 opacity-70">Stats</div>
                <AttributeBar label="Speed" value={player.attributes.speed} color="bg-mbl-yellow" />
                <AttributeBar label="Vision" value={player.attributes.aggression} max={800} color="bg-mbl-pink" />
                <AttributeBar label="Strafe" value={player.attributes.strafeRate} color="bg-blue-400" />
                <AttributeBar label="Melee" value={player.attributes.meleeBias} color="bg-green-400" />
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}