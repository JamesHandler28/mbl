'use client';

import React, { useState } from 'react';
import { teamsData, leagueHistory, Match } from '../data';
import Image from 'next/image';

const getTeamInfo = (id: string) => {
  const team = teamsData.find(t => t.id === id);
  return team ? { name: team.name, color: team.color, image: team.players[0].image } : { name: "TBD", color: "border-gray-700", image: null };
};

// --- GROUP TABLE COMPONENT ---
const GroupTable = ({ groupName, matches }: { groupName: string, matches: Match[] }) => {
  const groupMatches = matches.filter(m => m.round === groupName);
  
  const stats: Record<string, { w: number, l: number, id: string }> = {};

  groupMatches.forEach(m => {
    if (!stats[m.team1]) stats[m.team1] = { w: 0, l: 0, id: m.team1 };
    if (!stats[m.team2]) stats[m.team2] = { w: 0, l: 0, id: m.team2 };

    if (m.winner) {
      if (m.winner === m.team1) {
        stats[m.team1].w++;
        stats[m.team2].l++;
      } else {
        stats[m.team2].w++;
        stats[m.team1].l++;
      }
    }
  });

  const standings = Object.values(stats).sort((a, b) => {
    if (b.w !== a.w) return b.w - a.w;
    return a.l - b.l;
  });

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-xl overflow-hidden mb-0 w-full md:w-96 shadow-xl">
      <div className="bg-mbl-darkblue border-b border-mbl-teal/30 p-3 text-center">
        <h3 className="text-mbl-teal font-header uppercase tracking-widest text-sm">{groupName} Standings</h3>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-black/20 text-slate-500 font-mono text-[10px] uppercase">
          <tr>
            <th className="p-3">Team</th>
            <th className="p-3 text-center text-mbl-yellow">W</th>
            <th className="p-3 text-center text-mbl-pink">L</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {standings.map((stat) => {
            const team = getTeamInfo(stat.id);
            return (
              <tr key={stat.id} className="hover:bg-white/5 transition-colors">
                <td className="p-3 font-bold text-white flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border ${team.color} overflow-hidden bg-black`}>
                    {team.image && <Image src={`/players/${team.image}`} alt={team.name} width={24} height={24} className="object-cover" />}
                  </div>
                  {team.name}
                </td>
                <td className="p-3 text-center font-bold text-mbl-yellow">{stat.w}</td>
                <td className="p-3 text-center font-bold text-mbl-pink">{stat.l}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// --- MATCH CARD COMPONENT ---
const MatchCard = ({ match }: { match: Match }) => {
  const t1 = getTeamInfo(match.team1);
  const t2 = getTeamInfo(match.team2);

  return (
    <div className="relative w-full max-w-[280px] group font-sans">
      <div className="absolute -inset-1 bg-gradient-to-r from-mbl-teal to-mbl-pink opacity-0 group-hover:opacity-40 blur transition duration-500"></div>
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl mb-4 flex flex-col">
        {/* HEADER */}
        <div className="bg-black/40 flex justify-between items-center px-4 py-2 border-b border-white/5">
          <span className="text-[9px] text-mbl-teal uppercase font-header font-bold tracking-widest truncate max-w-[100px]">{match.round}</span>
          <div className="bg-mbl-darkblue border border-mbl-teal/50 px-2 py-0.5 rounded text-[10px] font-header font-bold text-white shadow-sm">
            {match.score}
          </div>
        </div>
        {/* TEAMS */}
        <div className="p-3 space-y-2">
           <div className={`flex justify-between items-center p-1.5 rounded transition-colors border ${match.winner === match.team1 ? 'bg-mbl-yellow/10 border-mbl-yellow/30' : 'bg-transparent border-transparent'}`}>
             <span className={`font-header font-bold text-xs ${match.winner === match.team1 ? 'text-mbl-yellow' : 'text-slate-400'}`}>{t1.name}</span>
             {match.winner === match.team1 && <span className="text-[10px]">🏆</span>}
           </div>
           <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
           <div className={`flex justify-between items-center p-1.5 rounded transition-colors border ${match.winner === match.team2 ? 'bg-mbl-yellow/10 border-mbl-yellow/30' : 'bg-transparent border-transparent'}`}>
             <span className={`font-header font-bold text-xs ${match.winner === match.team2 ? 'text-mbl-yellow' : 'text-slate-400'}`}>{t2.name}</span>
             {match.winner === match.team2 && <span className="text-[10px]">🏆</span>}
           </div>
        </div>
      </div>
    </div>
  );
};

export default function SchedulePage() {
  const [selectedSeasonId, setSelectedSeasonId] = useState(leagueHistory[0].id);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const currentSeason = leagueHistory.find(s => s.id === selectedSeasonId) || leagueHistory[0];
  const currentEvent = currentSeason.events.find(e => e.id === selectedEventId);

  // Group Detection
  const rounds = currentEvent ? Array.from(new Set(currentEvent.matches.map(m => m.round))) : [];
  const groupRounds = rounds.filter(r => r.toLowerCase().includes('group'));
  const bracketRounds = rounds.filter(r => !r.toLowerCase().includes('group'));

  return (
    <div className="min-h-screen p-8 pb-20 font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-6">
        <h1 className="font-header text-4xl text-white uppercase italic tracking-tighter drop-shadow-md">
          LEAGUE <span className="text-mbl-pink">ARCHIVES</span>
        </h1>
        <div className="relative mt-4 md:mt-0 group z-20">
          <select 
            value={selectedSeasonId}
            onChange={(e) => { setSelectedSeasonId(e.target.value); setSelectedEventId(null); }}
            className="relative bg-mbl-darkblue border border-white/20 text-white py-2 px-4 rounded-lg focus:outline-none focus:border-mbl-teal font-header tracking-wide cursor-pointer uppercase"
          >
            {leagueHistory.map(season => (
              <option key={season.id} value={season.id}>{season.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* LIST VIEW */}
      {!currentEvent && (
        <div className="max-w-5xl mx-auto space-y-4">
          <h2 className="text-mbl-teal font-header text-sm uppercase tracking-widest mb-6">Select an Event</h2>
          {currentSeason.events.map(event => {
            const champion = getTeamInfo(event.championId || "");
            
            // 1. Check if completely empty (Major 3)
            const isUpcoming = event.matches.length === 0;

            // 2. Count completed matches (Major 2 vs Major 1)
            const completedCount = event.matches.filter(m => m.winner).length;
            const totalCount = event.matches.length;

            return (
              <div 
                key={event.id}
                onClick={() => !isUpcoming && setSelectedEventId(event.id)}
                className={`
                  group relative overflow-hidden rounded-2xl border p-8 transition-all
                  ${isUpcoming 
                    ? 'bg-slate-900/50 border-white/5 cursor-not-allowed opacity-60' 
                    : 'bg-gradient-to-r from-slate-900 to-mbl-darkblue border-white/10 cursor-pointer hover:border-mbl-teal/50 hover:shadow-[0_0_30px_rgba(76,159,159,0.2)]'
                  }
                `}
              >
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <h3 className={`font-header text-3xl italic uppercase transition-colors ${isUpcoming ? 'text-slate-500' : 'text-white group-hover:text-mbl-yellow'}`}>
                      {event.name}
                    </h3>
                    
                    {/* UPDATED TEXT LOGIC */}
                    <p className="text-slate-400 font-header text-xs mt-2 tracking-wide">
                      {isUpcoming 
                        ? 'SCHEDULE TBD' 
                        : `${completedCount} / ${totalCount} MATCHES COMPLETE`
                      }
                    </p>
                  </div>

                  {event.championId ? (
                    <div className="text-right">
                      <div className="text-[10px] text-mbl-pink uppercase font-header font-bold tracking-widest mb-1">Champion</div>
                      <div className="flex items-center gap-3 justify-end">
                        <span className="font-header font-bold text-white text-xl">{champion.name}</span>
                        <div className={`w-12 h-12 rounded-full border-2 ${champion.color} bg-black overflow-hidden`}>
                           {champion.image && <Image src={`/players/${champion.image}`} alt="Champ" width={48} height={48} className="object-cover w-full h-full" />}
                        </div>
                      </div>
                    </div>
                  ) : isUpcoming ? (
                    <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded text-xs font-header font-bold border border-slate-600">
                      UPCOMING
                    </span>
                  ) : (
                    <span className="bg-mbl-teal/20 text-mbl-teal px-3 py-1 rounded text-xs font-header font-bold border border-mbl-teal/50">
                      ACTIVE
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAILED VIEW */}
      {currentEvent && (
        <div className="animate-fadeIn">
          <button 
            onClick={() => setSelectedEventId(null)}
            className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 font-header text-sm tracking-widest transition-colors uppercase"
          >
            ← Back to List
          </button>

          <h2 className="font-header text-4xl text-center text-white mb-12 italic drop-shadow-lg">{currentEvent.name}</h2>

          {/* 1. GROUP TABLES */}
          {groupRounds.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {groupRounds.sort().map(group => (
                <GroupTable key={group} groupName={group} matches={currentEvent.matches} />
              ))}
            </div>
          )}

          {/* 2. GROUP MATCHES (3-Column Grid) */}
          {groupRounds.length > 0 && (
            <div className="pb-12 max-w-6xl mx-auto space-y-12">
              {groupRounds.sort().map(roundName => (
                <div key={roundName}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-white/10 flex-grow"></div>
                    <div className="text-center text-slate-500 font-mono uppercase tracking-widest text-xs">
                      {roundName} Schedule
                    </div>
                    <div className="h-px bg-white/10 flex-grow"></div>
                  </div>
                  
                  {/* --- CHANGED TO GRID --- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                    {currentEvent.matches
                      .filter(m => m.round === roundName)
                      .map(m => <MatchCard key={m.id} match={m} />)
                    }
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. BRACKET TREE */}
          {bracketRounds.length > 0 && (
            <div className="overflow-x-auto pb-12">
              <div className="flex gap-16 justify-center min-w-[max-content] px-8">
                {bracketRounds.map(roundName => (
                  <div key={roundName} className="flex flex-col gap-6 justify-center">
                    <div className="text-center text-mbl-teal font-header uppercase tracking-widest text-sm mb-4 border-b border-mbl-teal/30 pb-2">
                      {roundName}
                    </div>
                    {currentEvent.matches
                      .filter(m => m.round === roundName)
                      .map(m => <MatchCard key={m.id} match={m} />)
                    }
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}