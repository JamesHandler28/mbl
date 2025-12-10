'use client';

import React, { useMemo, useState } from 'react';
import { teamsData } from '../data';

const SortIcon = ({ active, direction }: { active: boolean, direction: 'asc' | 'desc' }) => {
  if (!active) return <span className="text-slate-600 ml-1 opacity-50">⇅</span>;
  return <span className="text-mbl-yellow ml-1">{direction === 'desc' ? '↓' : '↑'}</span>;
};

export default function StatsPage() {
  
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ 
    key: 'kd', 
    direction: 'desc' 
  });

  const allPlayers = useMemo(() => {
    // 1. Flatten data
    const flattened = teamsData.flatMap((team) => 
      team.players.map((player) => {
        const kdValue = player.kills / (player.deaths === 0 ? 1 : player.deaths);
        
        const rawKpg = player.gamesPlayed > 0 ? player.kills / player.gamesPlayed : 0;
        const rawWinRate = player.gamesPlayed > 0 ? (player.wins / player.gamesPlayed) * 100 : 0;
        const rawDpg = player.gamesPlayed > 0 ? player.damageDealt / player.gamesPlayed : 0;

        return {
          ...player,
          teamName: team.name,
          kd: parseFloat(kdValue.toFixed(2)),
          rawKpg, 
          rawWinRate,
          rawDpg,
          displayKpg: rawKpg.toFixed(1),
          displayWinRate: (player.gamesPlayed > 0 ? ((player.wins / player.gamesPlayed) * 100).toFixed(1) : "0.0") + "%",
          displayDpg: player.gamesPlayed > 0 ? (player.damageDealt / player.gamesPlayed).toFixed(0) : "0",
        };
      })
    );

    // 2. Apply Sorting
    return flattened.sort((a, b) => {
      // @ts-ignore
      let aValue = a[sortConfig.key];
      // @ts-ignore
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'winRate') { aValue = a.rawWinRate; bValue = b.rawWinRate; }
      if (sortConfig.key === 'dpg') { aValue = a.rawDpg; bValue = b.rawDpg; }
      if (sortConfig.key === 'kpg') { aValue = a.rawKpg; bValue = b.rawKpg; }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const HeaderCell = ({ label, sortKey, align = 'center', color = 'white' }: any) => (
    <th 
      className={`p-3 md:p-4 text-${align} cursor-pointer hover:bg-white/5 transition-colors select-none group whitespace-nowrap`}
      onClick={() => requestSort(sortKey)}
    >
      <span className={`text-${color} font-bold group-hover:text-white transition-colors`}>
        {label} <SortIcon active={sortConfig.key === sortKey} direction={sortConfig.direction} />
      </span>
    </th>
  );

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 pt-24 md:pt-28">
      
      {/* HEADER */}
      {/* Kept font-header here as it matches the rest of the site's titles, but removed italic if desired */}
      <h1 className="font-header text-4xl md:text-6xl text-center text-white mb-8 md:mb-12 drop-shadow-lg leading-tight">
        COMBAT <span className="text-mbl-teal">ANALYTICS</span>
      </h1>

      <div className="max-w-7xl mx-auto bg-slate-900 border border-mbl-teal/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-white/10 bg-black/20 flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Changed this subtitle to font-sans to be safe */}
          <h2 className="font-sans font-bold text-xl md:text-2xl text-white uppercase tracking-wide">Global Rankings</h2>
          <span className="text-slate-400 text-[10px] md:text-xs font-mono uppercase">
             ← Scroll for more stats →
          </span>
        </div>
        
        {/* TABLE CONTAINER */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            {/* FIX APPLIED HERE: 
                Added 'font-sans' explicitly to override the serif default. 
                Kept 'uppercase', 'tracking-widest', 'text-xs', 'font-bold' for the clean data look.
            */}
            <thead className="bg-mbl-darkblue text-mbl-teal font-sans uppercase text-xs font-bold tracking-widest border-b border-white/10">
              <tr>
                {/* Sticky Rank Column */}
                <th className="p-3 md:p-4 text-slate-500 sticky left-0 bg-mbl-darkblue z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">Rank</th>
                
                {/* Sticky Name Column */}
                <th className="p-3 md:p-4 text-white sticky left-[60px] bg-mbl-darkblue z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">Agent</th>
                
                <th className="p-3 md:p-4 text-slate-400">Team</th>
                
                <HeaderCell label="GP" sortKey="gamesPlayed" color="white" />
                <HeaderCell label="Win %" sortKey="winRate" color="green-400" />
                <HeaderCell label="DMG/G" sortKey="dpg" color="orange-400" />
                <HeaderCell label="K/G" sortKey="kpg" color="blue-400" />
                <HeaderCell label="Kills" sortKey="kills" color="mbl-yellow" />
                <HeaderCell label="Deaths" sortKey="deaths" color="mbl-pink" />
                <HeaderCell label="Assists" sortKey="assists" color="mbl-teal" />
                <HeaderCell label="KD" sortKey="kd" align="right" color="white" />
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5 font-mono text-sm">
              {allPlayers.map((player, index) => (
                <tr key={player.name} className="hover:bg-white/5 transition-colors group">
                  
                  {/* Sticky Rank Cell */}
                  <td className="p-3 md:p-4 text-slate-500 font-bold sticky left-0 bg-slate-900 group-hover:bg-slate-800 transition-colors z-10 border-r border-white/5">
                      #{index + 1}
                  </td>
                  
                  {/* Sticky Name Cell */}
                  <td className="p-3 md:p-4 font-bold text-white sticky left-[60px] bg-slate-900 group-hover:bg-slate-800 transition-colors z-10 border-r border-white/5 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-white/10 group-hover:border-mbl-yellow transition-colors shrink-0">
                           {player.image && <img src={`/players/${player.image}`} alt={player.name} className="w-full h-full object-cover" />}
                        </div>
                        {player.name}
                    </div>
                  </td>
                  
                  <td className="p-3 md:p-4 text-slate-400 text-xs">{player.teamName}</td>
                  
                  <td className="p-3 md:p-4 text-center text-slate-300">{player.gamesPlayed}</td>
                  <td className="p-3 md:p-4 text-center font-bold text-green-400">{player.displayWinRate}</td>
                  <td className="p-3 md:p-4 text-center text-orange-400">{player.displayDpg}</td>
                  <td className="p-3 md:p-4 text-center text-blue-400 font-bold">{player.displayKpg}</td>

                  <td className="p-3 md:p-4 text-center font-bold text-mbl-yellow/90">{player.kills}</td>
                  <td className="p-3 md:p-4 text-center font-bold text-mbl-pink/90">{player.deaths}</td>
                  <td className="p-3 md:p-4 text-center font-bold text-mbl-teal/90">{player.assists}</td>
                  
                  <td className="p-3 md:p-4 text-right font-bold text-xl text-white">
                    {player.kd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}