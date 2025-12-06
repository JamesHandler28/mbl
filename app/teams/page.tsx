import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teamsData, leagueHistory } from '../data'; 

export default function TeamsPage() {
  
  // --- 1. CALCULATE STATS & SORT ---
  const sortedTeams = [...teamsData].map((team) => {
    let wins = 0;
    let losses = 0;
    let majorWins = 0;
    
    // Count from History
    leagueHistory.forEach(season => {
      season.events.forEach(event => {
        // Check for Major Title
        if (event.championId === team.id) {
          majorWins++;
        }

        // Check Matches
        event.matches.forEach(match => {
          // KEY FIX: Only count stats if the match actually has a winner!
          if (match.winner) {
            if (match.winner === team.id) {
              wins++;
            } else if (match.team1 === team.id || match.team2 === team.id) {
              losses++;
            }
          }
        });
      });
    });

    return { ...team, wins, losses, majorWins };
  }).sort((a, b) => {
    if (b.majorWins !== a.majorWins) return b.majorWins - a.majorWins;
    return b.wins - a.wins;
  });

  return (
    <div className="min-h-screen p-8 pb-20">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="font-header text-5xl md:text-6xl text-white drop-shadow-2xl uppercase tracking-tight">
          LEAGUE <span className="text-mbl-yellow">STANDINGS</span>
        </h1>
      </div>

      {/* THE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {sortedTeams.map((team, rank) => (
          <Link href={`/teams/${team.id}`} key={team.id} className="block group h-full">
            
            <div 
              className={`
                relative h-full overflow-hidden rounded-xl 
                bg-gradient-to-b from-slate-800 to-mbl-darkblue 
                border-2 ${team.color} 
                shadow-[0_0_15px_rgba(0,0,0,0.3)] 
                transition-all duration-300 
                hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(76,159,159,0.3)]
                flex flex-col
              `}
            >
              
              {/* Background Glow */}
              <div className={`absolute -top-20 -right-20 w-32 h-32 ${team.color.replace('border-', 'bg-')} opacity-10 blur-3xl rounded-full group-hover:opacity-30 transition-opacity`}></div>

              <div className="p-5 relative z-10 flex-grow">
                
                {/* HEADER */}
                <div className="mb-4 border-b border-white/5 pb-2 flex justify-between items-start">
                  
                  {/* LEFT: Name & Rank */}
                  <div className="flex flex-col">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                      Rank #{rank + 1}
                    </div>
                    <h2 className="font-header text-2xl font-black italic text-white group-hover:text-mbl-yellow transition-colors uppercase tracking-tight">
                      {team.name}
                    </h2>
                  </div>
                  
                  {/* RIGHT: Stats Badge */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="bg-black/30 border border-white/10 px-2 py-1 rounded text-xs font-mono font-bold">
                      <span className="text-mbl-teal">{team.wins}W</span>
                      <span className="text-slate-600 mx-1">-</span>
                      <span className="text-mbl-pink">{team.losses}L</span>
                    </div>

                    {team.majorWins > 0 && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-mbl-yellow uppercase tracking-wider bg-mbl-yellow/10 px-2 py-0.5 rounded border border-mbl-yellow/30 animate-pulse">
                        <span>🏆</span> {team.majorWins} Major
                      </div>
                    )}
                  </div>
                </div>

                {/* Player List */}
                <div className="space-y-2">
                  {team.players.map((player, index) => (
                    <div key={player.name} className={`
                      flex items-center gap-3 p-1.5 rounded-lg border transition-colors
                      ${index === 0 
                        ? 'bg-white/5 border-mbl-yellow/30' 
                        : 'bg-transparent border-transparent hover:bg-white/5'
                      }
                    `}>
                      <div className="w-7 h-7 rounded-full overflow-hidden bg-black/50 relative border border-white/10 shrink-0">
                         {player.image ? (
                           <Image src={`/players/${player.image}`} alt={player.name} fill className="object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">{player.name[0]}</div>
                         )}
                      </div>

                      <div className="flex-grow">
                        <div className={`
                          font-header font-bold uppercase tracking-wide text-xs
                          ${index === 0 ? 'text-white' : 'text-slate-400'}
                        `}>
                          {player.name}
                        </div>
                      </div>
                      {index === 0 && <span className="text-sm animate-pulse">👑</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* View Button */}
              <div className="w-full py-2 bg-black/40 backdrop-blur text-center text-[10px] font-header font-bold uppercase tracking-widest text-mbl-teal opacity-0 group-hover:opacity-100 transition-opacity">
                View Details
              </div>

            </div> 
          </Link>
        ))}

      </div>
    </div>
  );
}