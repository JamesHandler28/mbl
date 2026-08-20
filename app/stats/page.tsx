'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { teamsData, leagueHistory, ALL_MATCH_LOGS, slugify, computeEffectiveOVR, computePerformanceRating } from '../data';

// Helper: Calculate Combat Score
const getCombatScore = (kills: number, assists: number, deaths: number) => 
  (kills * 10) + (assists * 5) - (deaths * 3);

const SortIcon = ({ active, direction }: { active: boolean, direction: 'asc' | 'desc' }) => {
  if (!active) return <span className="text-slate-600 ml-1 opacity-50">⇅</span>;
  return <span className="text-mbl-yellow ml-1">{direction === 'desc' ? '↓' : '↑'}</span>;
};

// --- MOVEMENT BADGE ---
// previousRank is undefined when the player has no snapshot data as of
// last week (e.g. hadn't played yet) — shown as "NEW" rather than 0.
const MovementBadge = ({ currentRank, previousRank }: { currentRank: number; previousRank: number | undefined }) => {
  if (previousRank === undefined) {
    return <span className="text-[10px] font-mono font-bold text-mbl-teal/80 ml-1.5">NEW</span>;
  }
  const diff = previousRank - currentRank; // positive = moved up (better)
  if (diff === 0) {
    return <span className="text-[10px] font-mono text-slate-600 ml-1.5">—</span>;
  }
  if (diff > 0) {
    return <span className="text-[10px] font-mono font-bold text-green-400 ml-1.5">▲{diff}</span>;
  }
  return <span className="text-[10px] font-mono font-bold text-mbl-pink ml-1.5">▼{Math.abs(diff)}</span>;
};

// --- PERFORMANCE DELTA BADGE (actual performance vs preseason OVR) ---
const PerformanceDelta = ({ ovr, performance }: { ovr: number; performance: number | null }) => {
  if (performance === null) {
    return <span className="text-slate-600 text-xs">—</span>;
  }
  const delta = performance - ovr;
  const deltaColor = delta > 0 ? 'text-green-400' : delta < 0 ? 'text-mbl-pink' : 'text-slate-500';
  const deltaText = delta > 0 ? `+${delta}` : `${delta}`;
  return (
    <div className="flex flex-col items-center leading-tight whitespace-nowrap">
      <span className="font-sans font-black text-base text-mbl-yellow">{performance}</span>
      <span className={`text-[9px] font-bold ${deltaColor}`}>{deltaText}</span>
    </div>
  );
};

export default function StatsPage() {
  
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ 
    key: 'score', 
    direction: 'desc' 
  });

  // --- WEEK / SEASON FILTER ---
  // 'season' = every match logged so far (including playoffs).
  // A specific week number = only matches up through and including that week.
  const [selectedWeek, setSelectedWeek] = useState<number | 'season'>('season');

  // --- Flatten every match (any season/event) so we can look up round/week by matchId ---
  const allMatchesFlat = useMemo(() => {
    return leagueHistory.flatMap((season) =>
      season.events.flatMap((event) => event.matches)
    );
  }, []);

  const matchIndex = useMemo(() => {
    return new Map(allMatchesFlat.map((m) => [m.id, m]));
  }, [allMatchesFlat]);

  // --- Every per-player, per-match stat line, with week number attached ---
  // weekNumber is null for non-"Week N" rounds (playoffs, etc.) — those are
  // excluded from week-over-week snapshots but still count in current totals.
  type PlayerMatchStat = {
    playerName: string;
    teamId: string;
    weekNumber: number | null;
    isWin: boolean;
    k: number; d: number; a: number; dmg: number;
    gamesInMatch: number;
  };

  const allPlayerMatchStats: PlayerMatchStat[] = useMemo(() => {
    return ALL_MATCH_LOGS.flatMap((log) => {
      const match = matchIndex.get(log.matchId);
      const weekMatch = match?.round.match(/week\s*(\d+)/i);
      const weekNumber = weekMatch ? parseInt(weekMatch[1], 10) : null;

      return Object.entries(log.stats).map(([playerName, stat]) => {
        const [k, d, a, dmg] = stat as [number, number, number, number];
        return {
          playerName,
          teamId: log.teamId,
          weekNumber,
          isWin: log.result === "WIN",
          k, d, a, dmg,
          gamesInMatch: log.gamesCount || 1,
        };
      });
    });
  }, [matchIndex]);

  // Latest week number that actually has match data, so we know what
  // "last week" means for the movement comparison.
  const currentWeekMax = useMemo(() => {
    let max: number | null = null;
    allPlayerMatchStats.forEach((s) => {
      if (s.weekNumber !== null && (max === null || s.weekNumber > max)) max = s.weekNumber;
    });
    return max;
  }, [allPlayerMatchStats]);

  const previousWeekMax = currentWeekMax !== null && currentWeekMax > 1 ? currentWeekMax - 1 : null;

  // Every week number 1..currentWeekMax, for the filter buttons.
  const availableWeeks = useMemo(() => {
    if (currentWeekMax === null) return [];
    return Array.from({ length: currentWeekMax }, (_, i) => i + 1);
  }, [currentWeekMax]);

  // Builds the same enriched player-stats shape as the main table, but only
  // counting matches up through `uptoWeek` (null = no cutoff, i.e. everything
  // including playoffs — used for the live/current table).
  function buildPlayerStats(uptoWeek: number | null) {
    const base = teamsData.flatMap((team) =>
      team.players.map((player) => ({
        name: player.name,
        teamId: team.id,
        teamName: team.name,
        image: player.image,
        attributes: player.attributes,
        kills: 0, deaths: 0, assists: 0, damageDealt: 0,
        gamesPlayed: 0, wins: 0,
      }))
    );

    const byName = new Map(base.map((p) => [p.name, p]));

    allPlayerMatchStats.forEach((s) => {
      // For a week-cutoff snapshot, only count logs from actual numbered
      // weeks at or before that cutoff. For the live table (uptoWeek=null),
      // count everything, week-numbered or not.
      if (uptoWeek !== null) {
        if (s.weekNumber === null || s.weekNumber > uptoWeek) return;
      }
      const p = byName.get(s.playerName);
      if (!p) return;
      p.kills += s.k;
      p.deaths += s.d;
      p.assists += s.a;
      p.damageDealt += s.dmg;
      p.gamesPlayed += s.gamesInMatch;
      if (s.isWin) p.wins += 1;
    });

    return base.map((p) => {
      const kdValue = p.kills / (p.deaths === 0 ? 1 : p.deaths);
      const rawKpg = p.gamesPlayed > 0 ? p.kills / p.gamesPlayed : 0;
      const rawWinRate = p.gamesPlayed > 0 ? (p.wins / p.gamesPlayed) * 100 : 0;
      const rawDpg = p.gamesPlayed > 0 ? p.damageDealt / p.gamesPlayed : 0;
      const combatScore = getCombatScore(p.kills, p.assists, p.deaths);
      const ovr = computeEffectiveOVR(p as any);
      const performance = computePerformanceRating(p as any);

      return {
        ...p,
        ovr,
        performance,
        kd: parseFloat(kdValue.toFixed(2)),
        score: combatScore,
        rawKpg, rawWinRate, rawDpg,
        displayKpg: rawKpg.toFixed(1),
        displayWinRate: (p.gamesPlayed > 0 ? rawWinRate.toFixed(1) : "0.0") + "%",
        displayDpg: p.gamesPlayed > 0 ? rawDpg.toFixed(0) : "0",
      };
    });
  }

  const getSortValue = (player: any, key: string) => {
    if (key === 'winRate') return player.rawWinRate;
    if (key === 'dpg') return player.rawDpg;
    if (key === 'kpg') return player.rawKpg;
    if (key === 'performance') return player.performance === null ? -Infinity : player.performance;
    return player[key];
  };

  function sortAndFilter(players: any[]) {
    return [...players].sort((a, b) => {
      const aValue = getSortValue(a, sortConfig.key);
      const bValue = getSortValue(b, sortConfig.key);
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      // stable tiebreak so rank doesn't jitter between renders
      return a.name.localeCompare(b.name);
    });
  }

  // --- LIVE TABLE ---
  // 'season' shows everything (including playoffs); a specific week
  // truncates to only matches up through that week.
  const viewUptoWeek = selectedWeek === 'season' ? null : selectedWeek;
  const currentStats = useMemo(() => buildPlayerStats(viewUptoWeek), [allPlayerMatchStats, viewUptoWeek]);
  const allPlayers = useMemo(() => sortAndFilter(currentStats), [currentStats, sortConfig]);

  // --- "PREVIOUS" SNAPSHOT for the movement badge ---
  // If viewing a specific week, "previous" is the week right before it.
  // If viewing the full season, "previous" is the week before the most
  // recent week that has any data at all.
  const previousViewWeek =
    selectedWeek === 'season'
      ? previousWeekMax
      : (selectedWeek > 1 ? selectedWeek - 1 : null);

  const previousRankMap = useMemo(() => {
    if (previousViewWeek === null) return new Map<string, number>();
    const snapshotStats = buildPlayerStats(previousViewWeek);
    const snapshotSorted = sortAndFilter(snapshotStats);
    const map = new Map<string, number>();
    snapshotSorted.forEach((p, i) => map.set(p.name, i + 1));
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousViewWeek, sortConfig, allPlayerMatchStats]);

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
        className={`p-2 md:p-3 text-${align} cursor-pointer hover:bg-white/5 transition-colors select-none group whitespace-nowrap relative`}
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
      
      {/* --- WEEK / SEASON FILTER BAR --- */}
      <div className="max-w-7xl mx-auto mb-4 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedWeek('season')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors ${
            selectedWeek === 'season'
              ? 'bg-mbl-teal text-slate-950'
              : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-mbl-teal/50'
          }`}
        >
          Season
        </button>
        {availableWeeks.map((week) => (
          <button
            key={week}
            onClick={() => setSelectedWeek(week)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors border ${
              selectedWeek === week
                ? 'bg-mbl-teal text-slate-950 border-mbl-teal'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-mbl-teal/50'
            }`}
          >
            Week {week}
          </button>
        ))}
      </div>

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
          <table className="w-full text-left border-collapse min-w-[1080px]">
            <thead className="bg-mbl-darkblue text-mbl-teal font-sans uppercase text-xs font-bold tracking-widest border-b border-white/10">
              <tr>
                {/* Sticky Rank Column */}
                <th className="p-2 md:p-3 text-slate-500 sticky left-0 bg-mbl-darkblue z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">Rank</th>
                
                {/* Sticky Name Column */}
                <th className="p-2 md:p-3 text-white sticky left-[48px] bg-mbl-darkblue z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">Agent</th>
                
                <th className="p-2 md:p-3 text-slate-400">Team</th>

                <HeaderCell 
                  label="OVR" 
                  sortKey="ovr" 
                  color="mbl-yellow" 
                  tooltipAlign="left"
                  tooltip="Preseason Overall Rating: purely attribute-based (accuracy, patience, melee bias, strafe rate, aggression, pack affinity). Fixed once the season starts — this is 'what we expected.'"
                />

                <HeaderCell 
                  label="PERF" 
                  sortKey="performance" 
                  color="mbl-yellow" 
                  tooltipAlign="left"
                  tooltip="Performance Rating: purely based on real results (win rate + combat score per game), completely independent of preseason attributes. This is 'what's actually happening.' The small number underneath is the gap vs preseason OVR — a real breakout or a real underperformer. Needs 5+ games played."
                />
                
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
                  <td className="p-2 md:p-3 text-slate-500 font-bold sticky left-0 bg-slate-900 group-hover:bg-slate-800 transition-colors z-10 border-r border-white/5 whitespace-nowrap">
                      #{index + 1}
                      <MovementBadge currentRank={index + 1} previousRank={previousRankMap.get(player.name)} />
                  </td>
                  
                  {/* Sticky Name Cell */}
                  <td className="p-2 md:p-3 font-bold text-white sticky left-[48px] bg-slate-900 group-hover:bg-slate-800 transition-colors z-10 border-r border-white/5 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
                    <Link href={`/players/${slugify(player.name)}`} className="flex items-center gap-3 hover:text-mbl-yellow transition-colors">
                      <div className="w-7 h-7 rounded-full bg-slate-700 overflow-hidden border border-white/10 group-hover:border-mbl-yellow transition-colors shrink-0 flex items-center justify-center">
                        {player.image && <img src={`/players/${player.image}`} alt={player.name} className="w-full h-auto object-contain translate-y-[20.6%]" />}
                      </div>
                      {player.name}
                    </Link>
                  </td>
                  
                  <td className="p-2 md:p-3 text-slate-400 text-xs">{player.teamName}</td>

                  <td className="p-2 md:p-3 text-center font-black text-base text-mbl-yellow">
                    {player.ovr}
                  </td>

                  <td className="p-2 md:p-3 text-center">
                    <PerformanceDelta ovr={player.ovr} performance={player.performance} />
                  </td>
                  
                  <td className="p-2 md:p-3 text-center font-black text-base text-mbl-teal">
                    {player.score}
                  </td>

                  <td className="p-2 md:p-3 text-center text-slate-300">{player.gamesPlayed}</td>
                  <td className="p-2 md:p-3 text-center font-bold text-green-400">{player.displayWinRate}</td>
                  <td className="p-2 md:p-3 text-center text-orange-400">{player.displayDpg}</td>
                  <td className="p-2 md:p-3 text-center text-blue-400 font-bold">{player.displayKpg}</td>

                  <td className="p-2 md:p-3 text-center font-bold text-mbl-yellow/90">{player.kills}</td>
                  <td className="p-2 md:p-3 text-center font-bold text-mbl-pink/90">{player.deaths}</td>
                  <td className="p-2 md:p-3 text-center font-bold text-mbl-teal/90">{player.assists}</td>
                  
                  <td className="p-2 md:p-3 text-right font-bold text-lg text-white">
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