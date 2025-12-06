'use client';

import React, { useState } from 'react';
import { teamsData, leagueHistory, Match } from '../data';
import Image from 'next/image'; // Import Image for the champion avatar

const getTeamInfo = (id: string) => {
  const team = teamsData.find(t => t.id === id);
  return team ? { name: team.name, color: team.color, image: team.players[0].image } : { name: "TBD", color: "border-gray-700", image: null };
};

// UPDATED MATCH CARD
const MatchCard = ({ match }: { match: Match }) => {
  const t1 = getTeamInfo(match.team1);
  const t2 = getTeamInfo(match.team2);

  return (
    <div className="relative shrink-0 w-72 group font-sans"> {/* Added font-sans here specifically */}
      
      {/* Hover Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-mbl-teal to-mbl-pink opacity-0 group-hover:opacity-40 blur transition duration-500"></div>
      
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl mb-6 flex flex-col">
        
        {/* HEADER: Round Name + Score */}
        <div className="bg-black/40 flex justify-between items-center px-4 py-2 border-b border-white/5">
          <span className="text-[10px] text-mbl-teal uppercase font-header font-bold tracking-widest">
            {match.round}
          </span>
          {/* THE NEW SCORE LOCATION */}
          <div className="bg-mbl-darkblue border border-mbl-teal/50 px-2 py-0.5 rounded text-[10px] font-header font-bold text-white shadow-sm">
            {match.score}
          </div>
        </div>

        {/* TEAMS */}
        <div className="p-4 space-y-3">
           {/* Team 1 */}
           <div className={`flex justify-between items-center p-2 rounded-lg transition-colors border ${match.winner === match.team1 ? 'bg-mbl-yellow/10 border-mbl-yellow/30' : 'bg-transparent border-transparent'}`}>
             <span className={`font-header font-bold text-sm ${match.winner === match.team1 ? 'text-mbl-yellow' : 'text-slate-400'}`}>
               {t1.name}
             </span>
             {match.winner === match.team1 && <span className="text-xs">🏆</span>}
           </div>

           {/* Divider Line */}
           <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

           {/* Team 2 */}
           <div className={`flex justify-between items-center p-2 rounded-lg transition-colors border ${match.winner === match.team2 ? 'bg-mbl-yellow/10 border-mbl-yellow/30' : 'bg-transparent border-transparent'}`}>
             <span className={`font-header font-bold text-sm ${match.winner === match.team2 ? 'text-mbl-yellow' : 'text-slate-400'}`}>
               {t2.name}
             </span>
             {match.winner === match.team2 && <span className="text-xs">🏆</span>}
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

  return (
    <div className="min-h-screen p-8 pb-20 font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-6">
        <h1 className="font-header text-4xl text-white uppercase italic tracking-tighter drop-shadow-md">
          LEAGUE <span className="text-mbl-pink">ARCHIVES</span>
        </h1>
        
        <div className="relative mt-4 md:mt-0 group z-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-mbl-teal to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition"></div>
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
            return (
              <div 
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-mbl-darkblue border border-white/10 p-8 transition-all hover:border-mbl-teal/50 hover:shadow-[0_0_30px_rgba(76,159,159,0.2)]"
              >
                <div className="flex justify-between items-center relative z-10">
                  <div>
                    <h3 className="font-header text-3xl text-white group-hover:text-mbl-yellow transition-colors italic uppercase">{event.name}</h3>
                    <p className="text-slate-400 font-header text-xs mt-2 tracking-wide">{event.matches.length} MATCHES LOGGED</p>
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
                  ) : (
                    <span className="bg-mbl-teal/20 text-mbl-teal px-3 py-1 rounded text-xs font-header font-bold border border-mbl-teal/50">ACTIVE</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* BRACKET VIEW */}
      {currentEvent && (
        <div className="animate-fadeIn">
          <button 
            onClick={() => setSelectedEventId(null)}
            className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 font-header text-sm tracking-widest transition-colors uppercase"
          >
            ← Back to List
          </button>

          <h2 className="font-header text-4xl text-center text-white mb-16 italic drop-shadow-lg">{currentEvent.name}</h2>

          <div className="overflow-x-auto pb-12">
            <div className="flex gap-16 justify-center min-w-[1000px]">
              <div className="flex flex-col justify-around">
                {currentEvent.matches.filter(m => m.round === "Quarterfinals").map(m => <MatchCard key={m.id} match={m} />)}
              </div>
              <div className="flex flex-col justify-around">
                {currentEvent.matches.filter(m => m.round === "Semifinals").map(m => <MatchCard key={m.id} match={m} />)}
              </div>
              <div className="flex flex-col justify-center">
                 <div className="text-center mb-6 text-mbl-yellow font-header uppercase tracking-widest text-sm shadow-mbl-yellow/50 drop-shadow-lg">Grand Champion</div>
                {currentEvent.matches.filter(m => m.round === "Finals").map(m => (
                  <div key={m.id} className="scale-125"><MatchCard match={m} /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}