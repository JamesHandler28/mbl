import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teamsData, leagueHistory } from '../data'; // Import History too!

export default function TeamsPage() {

  // --- AUTOMATIC STAT CALCULATOR ---
  // This function runs for every team to count their wins/losses from the Schedule
  const getTeamStats = (teamId: string) => {
    let wins = 0;
    let losses = 0;
    let majorWins = 0;

    leagueHistory.forEach(season => {
      season.events.forEach(event => {
        // 1. Check if they won the Major
        if (event.championId === teamId) {
          majorWins++;
        }

        // 2. Check every match
        event.matches.forEach(match => {
          // Only count if the match has a winner
          if (match.winner) {
            if (match.team1 === teamId || match.team2 === teamId) {
              if (match.winner === teamId) {
                wins++;
              } else {
                losses++;
              }
            }
          }
        });
      });
    });

    return { wins, losses, gamesPlayed: wins + losses, majorWins };
  };

  return (
    <div className="min-h-screen p-8 pb-20">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="font-header text-5xl md:text-6xl text-white drop-shadow-2xl uppercase tracking-tight">
          LEAGUE <span className="text-mbl-yellow">TEAMS</span>
        </h1>
      </div>

      {/* THE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        
        {teamsData.map((team) => {
          // Calculate stats for this specific team
          const stats = getTeamStats(team.id);

          return (
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
                  
                  {/* TEAM HEADER ROW */}
                  <div className="mb-4 border-b border-white/5 pb-2 flex justify-between items-start">
                    <div>
                      <h2 className="font-header text-2xl font-black italic text-white group-hover:text-mbl-yellow transition-colors uppercase tracking-tight">
                        {team.name}
                      </h2>
                      
                      {/* --- NEW: AUTOMATIC STATS DISPLAY --- */}
                      <div className="flex items-center gap-3 mt-1 text-[10px] font-mono uppercase tracking-widest">
                        <span className="text-mbl-teal font-bold">{stats.wins}W - {stats.losses}L</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-slate-400">{stats.gamesPlayed} Games</span>
                        {stats.majorWins > 0 && (
                          <>
                            <span className="text-slate-500">|</span>
                            <span className="text-mbl-yellow font-bold flex items-center gap-1">
                              🏆 {stats.majorWins}
                            </span>
                          </>
                        )}
                      </div>
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
          );
        })}

      </div>
    </div>
  );
}