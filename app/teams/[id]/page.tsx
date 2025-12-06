import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teamsData, leagueHistory } from '../../data';

// Helper: Attribute Bar
const AttributeBar = ({ label, value, max = 1, color }: { label: string, value: number, max?: number, color: string }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex items-center gap-2 text-[9px] font-mono font-bold w-full">
      <span className="w-14 text-slate-400 text-right uppercase tracking-tighter">{label}</span>
      <div className="flex-grow h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
        <div className={`h-full ${color} shadow-[0_0_8px_currentColor]`} style={{ width: `${pct}%` }}></div>
      </div>
      <span className="w-8 text-white text-left ml-1">{value}</span>
    </div>
  );
};

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const team = teamsData.find((t) => t.id === resolvedParams.id);

  if (!team) return <div className="p-20 text-center text-mbl-pink font-header text-2xl">Team not found</div>;

  // --- 1. CALCULATE TOTAL KILLS ---
  // Sum up the kills of every player on the team
  const totalKills = team.players.reduce((sum, player) => sum + (player.kills || 0), 0);

  // --- 2. CALCULATE MATCH RECORDS ---
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
    <div className="min-h-screen p-8 pb-20">
      
      <Link href="/teams" className="text-slate-400 hover:text-white mb-8 inline-flex items-center transition-colors font-header font-bold text-sm tracking-widest uppercase">
        <span className="mr-2 text-mbl-teal">←</span> Return to Roster
      </Link>

      <div className={`relative border-l-8 ${team.color} pl-8 mb-16 py-4`}>
        <div className={`absolute left-0 top-0 h-full w-full opacity-10 bg-gradient-to-r from-${team.color.replace('border-', '')} to-transparent pointer-events-none`}></div>
        
        <h1 className="font-header text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white drop-shadow-lg">
          {team.name}
        </h1>
        
        {/* --- STATS HEADER --- */}
        <div className="flex flex-wrap items-center gap-6 mt-4 font-mono uppercase tracking-widest text-lg md:text-xl">
           
           <div className="text-mbl-teal font-bold">{wins} Wins</div>
           <div className="text-mbl-pink font-bold">{losses} Losses</div>
           
           {/* SEPARATOR */}
           <div className="w-px h-6 bg-white/20"></div>

           {/* TOTAL KILLS DISPLAY */}
           <div className="text-mbl-yellow font-bold flex items-center gap-2">
             <span>☠</span> {totalKills} Total Kills
           </div>

           {majorWins > 0 && (
             <div className="flex items-center gap-2 text-white border border-mbl-yellow/50 px-3 py-1 rounded bg-mbl-yellow/20 ml-auto md:ml-0">
               <span>🏆</span> {majorWins} Major Titles
             </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.players.map((player, index) => (
          <div 
            key={player.name} 
            className={`
              relative group overflow-hidden rounded-2xl p-5 flex flex-col items-center border-2 transition-all duration-300
              ${index === 0 
                ? `bg-gradient-to-b from-slate-800 to-mbl-darkblue ${team.color} shadow-[0_0_30px_rgba(0,0,0,0.4)] scale-105 z-10` 
                : 'bg-slate-900/50 border-white/5 hover:border-mbl-teal/50 hover:bg-slate-800'
              }
            `}
          >
            {index === 0 && (
              <div className="absolute top-3 right-3 text-2xl animate-pulse z-20" title="Team Captain">👑</div>
            )}

            <div className={`
              w-24 h-24 rounded-full mb-4 flex items-center justify-center overflow-hidden shadow-inner relative
              ${index === 0 ? 'border-4 border-mbl-yellow' : 'bg-slate-800 border-2 border-white/10'}
            `}>
              {player.image ? (
                <Image src={`/players/${player.image}`} alt={player.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <span className="font-header font-black text-slate-500 text-3xl">{player.name.charAt(0)}</span>
              )}
            </div>

            <h2 className={`font-header font-black uppercase text-2xl mb-1 tracking-wide ${index === 0 ? 'text-white' : 'text-slate-200'}`}>
              {player.name}
            </h2>
            
            <span className={`mb-4 text-[10px] font-header font-bold uppercase tracking-widest px-3 py-1 rounded-full ${index === 0 ? 'bg-mbl-yellow text-mbl-darkblue' : 'bg-slate-800 text-slate-500'}`}>
              {index === 0 ? 'Team Captain' : 'Member'}
            </span>

            {player.attributes && (
              <div className="w-full space-y-1.5 mt-2 bg-black/30 p-3 rounded-lg border border-white/5 backdrop-blur-sm">
                <div className="text-center text-[9px] font-header text-mbl-teal uppercase tracking-widest mb-2 opacity-70">Scouting Report</div>
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