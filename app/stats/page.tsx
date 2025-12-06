'use client';

import React, { useMemo, useState } from 'react';
import { teamsData } from '../data';

const SortIcon = ({ active, direction }: { active: boolean, direction: 'asc' | 'desc' }) => {
  if (!active) return <span className="text-slate-600 ml-1">⇅</span>;
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
        
        // --- NEW CALCULATIONS ---
        const rawKpg = player.gamesPlayed > 0 ? player.kills / player.gamesPlayed : 0;
        const rawWinRate = player.gamesPlayed > 0 ? (player.wins / player.gamesPlayed) * 100 : 0;
        const rawDpg = player.gamesPlayed > 0 ? player.damageDealt / player.gamesPlayed : 0;

        return {
          ...player,
          teamName: team.name,
          kd: parseFloat(kdValue.toFixed(2)),
          
          // Raw values for sorting
          rawKpg, 
          rawWinRate,
          rawDpg,
          
          // Display strings
          displayKpg: rawKpg.toFixed(1), // e.g. "4.5"
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

      // Handle computed columns mapping
      if (sortConfig.key === 'winRate') { aValue = a.rawWinRate; bValue = b.rawWinRate; }
      if (sortConfig.key === 'dpg') { aValue = a.rawDpg; bValue = b.rawDpg; }
      
      // --- NEW SORT MAP ---
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
      className={`p-4 text-${align} cursor-pointer hover:bg-white/5 transition-colors select-none group`}
      onClick={() => requestSort(sortKey)}
    >
      <span className={`text-${color} font-bold group-hover:text-white transition-colors`}>
        {label} <SortIcon active={sortConfig.key === sortKey} direction={sortConfig.direction} />
      </span>
    </th>
  );

  return (
    <div className="min-h-screen p-8 pb-24">
      <h1 className="font-header text-5xl md:text-6xl text-center text-white mb-12 drop-shadow-lg">
        COMBAT <span className="text-mbl-teal">ANALYTICS</span>
      </h1>

      <div className="max-w-7xl mx-auto bg-gradient-to-b from-slate-800 to-mbl-darkblue border border-mbl-teal/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 bg-black/20 flex justify-between items-center">
          <h2 className="font-header text-2xl text-white uppercase tracking-wider">Global Rankings</h2>
          <span className="text-slate-400 text-xs font-mono uppercase">Click headers to sort</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-mbl-darkblue text-mbl-teal uppercase text-xs font-bold tracking-widest border-b border-white/10">
              <tr>
                <th className="p-4 text-slate-500">Rank</th>
                <th className="p-4 text-white">Agent</th>
                <th className="p-4 text-slate-400">Team</th>
                
                <HeaderCell label="GP" sortKey="gamesPlayed" color="white" />
                <HeaderCell label="Win %" sortKey="winRate" color="green-400" />
                <HeaderCell label="DMG/G" sortKey="dpg" color="orange-400" />
                
                {/* --- NEW HEADER --- */}
                <HeaderCell label="K/G" sortKey="kpg" color="blue-400" />

                <HeaderCell label="K" sortKey="kills" color="mbl-yellow" />
                <HeaderCell label="D" sortKey="deaths" color="mbl-pink" />
                <HeaderCell label="A" sortKey="assists" color="mbl-teal" />
                <HeaderCell label="KD" sortKey="kd" align="right" color="white" />
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5 font-mono text-sm">
              {allPlayers.map((player, index) => (
                <tr key={player.name} className="hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-slate-500 font-bold">#{index + 1}</td>
                  
                  <td className="p-4 font-bold text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-white/10 group-hover:border-mbl-yellow transition-colors">
                       {player.image && <img src={`/players/${player.image}`} alt={player.name} className="w-full h-full object-cover" />}
                    </div>
                    {player.name}
                  </td>
                  
                  <td className="p-4 text-slate-400 text-xs">{player.teamName}</td>
                  
                  <td className="p-4 text-center text-slate-300">{player.gamesPlayed}</td>
                  <td className="p-4 text-center font-bold text-green-400">{player.displayWinRate}</td>
                  <td className="p-4 text-center text-orange-400">{player.displayDpg}</td>
                  
                  {/* --- NEW DATA CELL --- */}
                  <td className="p-4 text-center text-blue-400 font-bold">{player.displayKpg}</td>

                  <td className="p-4 text-center font-bold text-mbl-yellow/90">{player.kills}</td>
                  <td className="p-4 text-center font-bold text-mbl-pink/90">{player.deaths}</td>
                  <td className="p-4 text-center font-bold text-mbl-teal/90">{player.assists}</td>
                  
                  <td className="p-4 text-right font-bold text-xl text-white">
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