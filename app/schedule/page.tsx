'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { teamsData, leagueHistory, Match } from '../data';
import Image from 'next/image';

const getTeamInfo = (id: string) => {
  const team = teamsData.find(t => t.id === id);
  return team ? { name: team.name, color: team.color, image: team.players[0].image } : { name: "TBD", color: "border-gray-700", image: null };
};

// --- MATCH CARD (redesigned: compact, less clutter, no redundant round label) ---
const MatchCard = ({ match }: { match: Match }) => {
  const t1 = getTeamInfo(match.team1);
  const t2 = getTeamInfo(match.team2);
  const isPlayed = match.winner !== null;

  const TeamRow = ({ info, isWinner }: { info: ReturnType<typeof getTeamInfo>, isWinner: boolean }) => (
    <div className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${isWinner ? 'bg-mbl-yellow/10' : ''}`}>
      <div className={`w-8 h-8 rounded-full border-2 ${info.color} bg-black overflow-hidden shrink-0 relative flex items-center justify-center`}>
        {info.image && <Image src={`/players/${info.image}`} alt={info.name} width={32} height={30} className="object-contain translate-y-[20.6%]" />}
      </div>
      <span className={`font-sans font-bold text-sm truncate ${isWinner ? 'text-mbl-yellow' : 'text-slate-300'}`}>
        {info.name}
      </span>
      {isWinner && <span className="ml-auto text-xs">🏆</span>}
    </div>
  );

  const cardBody = (
    <div className="relative group font-sans w-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-mbl-teal to-mbl-pink opacity-0 group-hover:opacity-30 blur transition duration-300 rounded-xl"></div>
      <div className={`relative bg-slate-900 border border-slate-700/70 rounded-xl overflow-hidden shadow-lg ${isPlayed ? 'group-hover:border-mbl-teal/50 transition-colors' : ''}`}>
        <div className="p-2 space-y-1">
          <TeamRow info={t1} isWinner={match.winner === match.team1} />
          <TeamRow info={t2} isWinner={match.winner === match.team2} />
        </div>
        <div className={`px-3 py-1.5 text-center text-[11px] font-bold tracking-wide border-t border-white/5 ${isPlayed ? 'bg-black/30 text-white' : 'bg-black/10 text-slate-500'}`}>
          {isPlayed ? match.score : 'Not Played'}
        </div>
      </div>
    </div>
  );

  return isPlayed ? (
    <Link href={`/matches/${match.id}`} className="block cursor-pointer">
      {cardBody}
    </Link>
  ) : (
    cardBody
  );
};

export default function SchedulePage() {
  const [selectedSeasonId, setSelectedSeasonId] = useState(leagueHistory[0].id);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const currentSeason = leagueHistory.find(s => s.id === selectedSeasonId) || leagueHistory[0];
  const currentEvent = currentSeason.events.find(e => e.id === selectedEventId);

  const rounds = currentEvent ? Array.from(new Set(currentEvent.matches.map(m => m.round))) : [];
  // Weekly rounds ("Week 1", "Week 2"...) get the clean grid treatment.
  // Anything else (Semifinals, Final, etc.) keeps the side-by-side
  // bracket-column layout, since those have far fewer matches per round.
  const weekRounds = rounds.filter(r => r.toLowerCase().startsWith('week')).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10) || 0;
    const numB = parseInt(b.replace(/\D/g, ''), 10) || 0;
    return numA - numB;
  });
  const bracketRounds = rounds.filter(r => !r.toLowerCase().startsWith('week'));

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 pt-24 md:pt-28 font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 border-b border-white/10 pb-6 gap-4 md:gap-0">
        <h1 className="font-header text-3xl md:text-4xl text-white uppercase italic tracking-tighter drop-shadow-md text-center md:text-left">
          LEAGUE <span className="text-mbl-pink">ARCHIVES</span>
        </h1>
        <div className="relative group z-20 w-full md:w-auto">
          <select 
            value={selectedSeasonId}
            onChange={(e) => { setSelectedSeasonId(e.target.value); setSelectedEventId(null); }}
            className="w-full md:w-auto relative bg-mbl-darkblue border border-white/20 text-white py-2 px-4 rounded-lg focus:outline-none focus:border-mbl-teal font-header tracking-wide cursor-pointer uppercase appearance-none text-center md:text-left"
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
          <h2 className="text-mbl-teal font-header text-sm uppercase tracking-widest mb-6 text-center md:text-left">Select an Event</h2>
          {currentSeason.events.map(event => {
            const champion = getTeamInfo(event.championId || "");
            const isUpcoming = event.matches.length === 0;
            const completedCount = event.matches.filter(m => m.winner).length;
            const totalCount = event.matches.length;

            return (
              <div 
                key={event.id}
                onClick={() => !isUpcoming && setSelectedEventId(event.id)}
                className={`
                  group relative overflow-hidden rounded-2xl border transition-all p-5 md:p-8
                  ${isUpcoming 
                    ? 'bg-slate-900/50 border-white/5 cursor-not-allowed opacity-60' 
                    : 'bg-gradient-to-r from-slate-900 to-mbl-darkblue border-white/10 cursor-pointer hover:border-mbl-teal/50 hover:shadow-[0_0_30px_rgba(76,159,159,0.2)]'
                  }
                `}
              >
                <div className="flex flex-col md:flex-row items-center relative z-10 gap-6 md:gap-4">
                  <div className="text-center md:text-left">
                    <h3 className={`font-header text-2xl md:text-3xl italic uppercase transition-colors ${isUpcoming ? 'text-slate-500' : 'text-white group-hover:text-mbl-yellow'}`}>
                      {event.name}
                    </h3>
                    <p className="text-slate-400 font-header text-xs mt-2 tracking-wide">
                      {isUpcoming 
                        ? 'SCHEDULE TBD' 
                        : `${completedCount} / ${totalCount} MATCHES COMPLETE`
                      }
                    </p>
                  </div>

                  <div className="w-full md:w-auto md:ml-auto flex justify-center md:block">
                    {event.championId ? (
                        <div className="text-center md:text-right bg-black/20 md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none">
                        <div className="text-[10px] text-mbl-pink uppercase font-header font-bold tracking-widest mb-1">Champion</div>
                        <div className="flex items-center gap-3 justify-center md:justify-end">
                            <span className="font-header font-bold text-white text-xl">{champion.name}</span>
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 ${champion.color} bg-black overflow-hidden shrink-0 flex items-center justify-center`}>
                            {champion.image && <Image src={`/players/${champion.image}`} alt="Champ" width={48} height={45} className="object-contain translate-y-[20.6%]" />}
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
              </div>
            );
          })}
        </div>
      )}

      {/* DETAILED VIEW */}
      {currentEvent && (
        <div className="animate-fadeIn max-w-6xl mx-auto">
          <button 
            onClick={() => setSelectedEventId(null)}
            className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 font-header text-sm tracking-widest transition-colors uppercase"
          >
            ← Back to List
          </button>

          <h2 className="font-header text-3xl md:text-4xl text-center text-white mb-10 italic drop-shadow-lg">{currentEvent.name}</h2>

          {/* WEEKLY MATCHES — clean grid per week, no side-scrolling columns */}
          {weekRounds.length > 0 && (
            <div className="space-y-10">
              {weekRounds.map(weekName => (
                <div key={weekName}>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-header text-lg text-mbl-teal uppercase tracking-widest whitespace-nowrap">
                      {weekName}
                    </h3>
                    <div className="h-px bg-white/10 flex-grow"></div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {currentEvent.matches
                      .filter(m => m.round === weekName)
                      .map(m => <MatchCard key={m.id} match={m} />)
                    }
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TRUE BRACKET ROUNDS (Semifinals, Final, etc.) — side-by-side columns */}
          {bracketRounds.length > 0 && (
            <div className="overflow-x-auto pb-12 -mx-4 md:mx-0 px-4 md:px-0 mt-4">
              <div className="flex gap-8 md:gap-16 justify-start md:justify-center min-w-[max-content] px-4">
                {bracketRounds.map(roundName => (
                  <div key={roundName} className="flex flex-col gap-4 justify-center w-56">
                    <div className="text-center text-mbl-teal font-header uppercase tracking-widest text-sm mb-2 border-b border-mbl-teal/30 pb-2">
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