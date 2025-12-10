'use client';

import React, { useMemo, useState } from 'react';
import { teamsData } from '../data';

// Helper: Calculate Combat Score
const getCombatScore = (kills: number, assists: number, deaths: number) => 
  (kills * 10) + (assists * 5) - (deaths * 3);

const SortIcon = ({ active, direction }: { active: boolean, direction: 'asc' | 'desc' }) => {
  if (!active) return <span className="text-slate-600 ml-1 opacity-50">⇅</span>;
  return <span className="text-mbl-yellow ml-1">{direction === 'desc' ? '↓' : '↑'}</span>;
};

export default function StatsPage() {
  
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ 
    key: 'score', 
    direction: 'desc' 
  });

  const allPlayers = useMemo(() => {
    const flattened = teamsData.flatMap((team) => 
      team.players.map((player) => {
        const kdValue = player.kills / (player.deaths === 0 ? 1 : player.deaths);
        
        const rawKpg = player.gamesPlayed > 0 ? player.kills / player.gamesPlayed : 0;
        const rawWinRate = player.gamesPlayed > 0 ? (player.wins / player.gamesPlayed) * 100 : 0;
        const rawDpg = player.gamesPlayed > 0 ? player.damageDealt / player.gamesPlayed : 0;
        
        const combatScore = getCombatScore(player.kills || 0, player.assists || 0, player.deaths || 0);

        return {
          ...player,
          teamName: team.name,
          kd: parseFloat(kdValue.toFixed(2)),
          score: combatScore,
          rawKpg, 
          rawWinRate,
          rawDpg,
          displayKpg: rawKpg.toFixed(1),
          displayWinRate: (player.gamesPlayed > 0 ? ((player.wins / player.gamesPlayed) * 100).toFixed(1) : "0.0") + "%",
          displayDpg: player.gamesPlayed > 0 ? (player.damageDealt / player.gamesPlayed).toFixed(0) : "0",
        };
      })
    );

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

  // UPDATED: HeaderCell with "Smart Alignment" logic
  const HeaderCell = ({ label, sortKey, align = 'center', color = 'white', tooltip, tooltipAlign = 'center' }: any) => {
    
    // 1. Determine Box Position (anchoring)
    let boxClasses = "left-1/2 -translate-x-1/2"; // Default Center
    if (tooltipAlign === 'left') boxClasses = "left-0 translate-x-0";
    if (tooltipAlign === 'right') boxClasses = "right-0 translate-x-0"; // Anchor Right

    // 2. Determine Arrow Position
    let arrowClasses = "left-1/2 -translate-x-1/2"; // Default Center
    if (tooltipAlign === 'left') arrowClasses = "left-4";
    if (tooltipAlign === 'right') arrowClasses = "right-4";

    return (
      <th 
        className={`p-3 md:p-4 text-${align} cursor-pointer hover:bg-white/5 transition-colors select-none group whitespace-nowrap relative`}
        onClick={() => requestSort(sortKey)}
      >
        <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : align === 'left' ? 'justify-start' : 'justify-center'}`}>
          <span className={`text-${color} font-bold group-hover:text-white transition-colors border-b border-dotted border-white/20`}>
            {label} 
          </span>
          <SortIcon active={sortConfig.key === sortKey} direction={sortConfig.direction} />
        </div>

        {/* TOOLTIP POPUP */}
        {tooltip && (
          <div className={`absolute top-full mt-2 w-max max-w-[200px] md:max-w-[260px] p-3 bg-slate-800 text-slate-200 text-[10px] font-mono normal-case leading-tight rounded border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-normal ${boxClasses}`}>
            
            {/* Arrow pointing UP */}
            <div className={`absolute bottom-full border-8 border-transparent border-b-slate-800 ${arrowClasses}`}></div>

            <div className="text-white font-bold mb-1 uppercase tracking-wider border-b border-white/10 pb-1">{label}</div>
            <div>{tooltip}</div>
          </div>
        )}
      </th>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-24 pt-24 md:pt-28 font-sans text-slate-200">
      
      {/* HEADER */}
      <h1 className="font-black text-4xl md:text-6xl text-center text-white mb-8 md:mb-12 drop-shadow-lg leading-tight">
        COMBAT <span className="text-mbl-teal">ANALYTICS</span>
      </h1>

      <div className="max-w-7xl mx-auto bg-slate-900 border border-mbl-teal/30 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-white/10 bg-black/20 flex flex-col md:flex-row justify-between items-center gap-2">
          <h2 className="font-sans font-bold text-xl md:text-2xl text-white uppercase tracking-wide">Global Rankings</h2>
          <span className="text-slate-400 text-[10px] md:text-xs font-mono uppercase">
              ← Scroll for more stats →
          </span>
        </div>
        
        {/* TABLE CONTAINER */}
        {/* Added pb-20 to ensure tooltips at the bottom don't get hidden by container overflow */}
        <div className="overflow-x-auto pb-20">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead className="bg-mbl-darkblue text-mbl-teal font-sans uppercase text-xs font-bold tracking-widest border-b border-white/10">
              <tr>
                {/* Sticky Rank Column */}
                <th className="p-3 md:p-4 text-slate-500 sticky left-0 bg-mbl-darkblue z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">Rank</th>
                
                {/* Sticky Name Column */}
                <th className="p-3 md:p-4 text-white sticky left-[60px] bg-mbl-darkblue z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">Agent</th>
                
                <th className="p-3 md:p-4 text-slate-400">Team</th>
                
                {/* LEFT ALIGNED TOOLTIPS */}
                <HeaderCell 
                  label="Score" 
                  sortKey="score" 
                  color="mbl-teal" 
                  tooltipAlign="left"
                  tooltip="Combat Rating: (Kills × 10) + (Assists × 5) - (Deaths × 3)"
                />

                <HeaderCell 
                  label="FP" 
                  sortKey="gamesPlayed" 
                  color="white" 
                  tooltipAlign="center"
                  tooltip="Fights Played: Total matches participated in."
                />
                
                <HeaderCell 
                  label="Win %" 
                  sortKey="winRate" 
                  color="green-400" 
                  tooltipAlign="center"
                  tooltip="Percentage of fights won by this player's team."
                />
                
                <HeaderCell 
                  label="DMG/F" 
                  sortKey="dpg" 
                  color="orange-400" 
                  tooltipAlign="center"
                  tooltip="Average Damage dealt per Fight."
                />
                
                <HeaderCell 
                  label="K/F" 
                  sortKey="kpg" 
                  color="blue-400" 
                  tooltipAlign="center"
                  tooltip="Average Kills secured per Fight."
                />
                
                <HeaderCell 
                  label="Kills" 
                  sortKey="kills" 
                  color="mbl-yellow" 
                  tooltipAlign="center"
                  tooltip="Total confirmed kills this season."
                />
                <HeaderCell 
                  label="Deaths" 
                  sortKey="deaths" 
                  color="mbl-pink" 
                  tooltipAlign="center"
                  tooltip="Total times eliminated this season."
                />

                {/* RIGHT ALIGNED TOOLTIPS (Assists & KD) */}
                <HeaderCell 
                  label="Assists" 
                  sortKey="assists" 
                  color="mbl-teal" 
                  tooltipAlign="right"
                  tooltip="Total damage contributions to team kills."
                />
                
                <HeaderCell 
                  label="KD" 
                  sortKey="kd" 
                  align="right" 
                  color="white" 
                  tooltipAlign="right"
                  tooltip="Kill / Death Ratio: (Total Kills ÷ Total Deaths)"
                />
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
                  
                  <td className="p-3 md:p-4 text-center font-black text-lg text-mbl-teal">
                    {player.score}
                  </td>

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