import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teamsData, findPlayerBySlug, computeEffectiveOVR, normalizeStat, ALL_MATCH_LOGS, leagueHistory } from '../../data';

const FifaStat = ({ label, value, tooltip }: { label: string; value: number; tooltip: string }) => (
  <div className="relative group flex items-center justify-between text-sm py-1">
    <span className="font-sans font-bold text-slate-300 uppercase tracking-wide border-b border-dotted border-white/20 cursor-help">
      {label}
    </span>
    <span className="font-sans font-black text-white text-base">{value}</span>

    <div className="absolute bottom-full left-0 mb-2 w-56 p-3 bg-slate-800 text-slate-200 text-[11px] font-mono normal-case leading-tight rounded border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
      {tooltip}
    </div>
  </div>
);

// --- RADAR CHART (plain SVG, no external chart library needed) ---
const RadarChart = ({ stats }: { stats: { label: string; value: number }[] }) => {
  const size = 280;
  const center = size / 2;
  const maxRadius = size / 2 - 40; // leave room for axis labels
  const levels = 4; // concentric rings

  const angleStep = (Math.PI * 2) / stats.length;
  // Start pointing straight up, then go clockwise
  const pointFor = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const dataPoints = stats.map((s, i) => pointFor(s.value, i));
  const dataPath = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  const labelPoints = stats.map((s, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = maxRadius + 22;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      label: s.label,
      value: s.value,
    };
  });

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Concentric grid rings */}
      {Array.from({ length: levels }).map((_, ringIndex) => {
        const ringRadius = maxRadius * ((ringIndex + 1) / levels);
        const ringPoints = stats.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return `${center + ringRadius * Math.cos(angle)},${center + ringRadius * Math.sin(angle)}`;
        }).join(' ');
        return (
          <polygon
            key={ringIndex}
            points={ringPoints}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        );
      })}

      {/* Axis spokes */}
      {stats.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + maxRadius * Math.cos(angle);
        const y = center + maxRadius * Math.sin(angle);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />
        );
      })}

      {/* Data shape */}
      <polygon
        points={dataPath}
        fill="rgba(76,159,159,0.35)"
        stroke="#4c9f9f"
        strokeWidth={2}
      />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#4c9f9f" />
      ))}

      {/* Axis labels */}
      {labelPoints.map((p, i) => (
        <text
          key={i}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={10}
          fontWeight={700}
          fill="#cbd5e1"
          className="font-sans uppercase"
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
};

const getCombatScore = (p: any) => (p.kills || 0) * 10 + (p.assists || 0) * 5 - (p.deaths || 0) * 3;

export default async function PlayerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = findPlayerBySlug(teamsData, slug);

  if (!found) {
    return (
      <div className="p-20 text-center text-mbl-pink font-sans font-bold text-2xl">
        Player not found
      </div>
    );
  }

  const { player, team } = found;

  const allMatches = leagueHistory.flatMap(season =>
    season.events.flatMap(event => event.matches)
  );

  const gameLogs = ALL_MATCH_LOGS
    .filter(log => log.teamId === team.id && log.stats[player.name])
    .map(log => {
      const match = allMatches.find(m => m.id === log.matchId);
      const opponentId = match ? (match.team1 === team.id ? match.team2 : match.team1) : null;
      const opponent = teamsData.find(t => t.id === opponentId);
      const [kills, deaths, assists, damage] = log.stats[player.name];

      return {
        matchId: log.matchId,
        round: match?.round ?? "Unknown",
        opponentName: opponent?.name ?? "TBD",
        videoUrl: match?.videoUrl,
        result: log.result,
        kills,
        deaths,
        assists,
        damage,
      };
    });

  const allPlayers = teamsData.flatMap(t => t.players.map(p => ({ name: p.name, score: getCombatScore(p) })));
  allPlayers.sort((a, b) => b.score - a.score);
  const rank = allPlayers.findIndex(p => p.name === player.name) + 1;
  const score = getCombatScore(player);

  const acc = normalizeStat(player.attributes?.accuracy ?? 0, 1);
  const pat = normalizeStat(player.attributes?.patience ?? 0, 250);
  const mel = normalizeStat(player.attributes?.meleeBias ?? 0, 1);
  const str = normalizeStat(player.attributes?.strafeRate ?? 0, 1);
  const agg = normalizeStat(player.attributes?.aggression ?? 0, 800);
  const pck = normalizeStat(player.attributes?.packAffinity ?? 0, 1);
  const ovr = computeEffectiveOVR(player);

  const radarStats = [
    { label: "ACC", value: acc },
    { label: "STR", value: str },
    { label: "PAT", value: pat },
    { label: "AGG", value: agg },
    { label: "MEL", value: mel },
    { label: "PCK", value: pck },
  ];

  const winRate = player.gamesPlayed && player.gamesPlayed > 0
    ? ((player.wins! / player.gamesPlayed) * 100).toFixed(1) + "%"
    : "0.0%";
  const kd = player.deaths && player.deaths > 0
    ? (player.kills! / player.deaths).toFixed(2)
    : (player.kills || 0).toFixed(2);

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 pt-24 md:pt-28 font-sans text-slate-200">
      <div className="max-w-4xl mx-auto mb-6">
        <Link href={`/teams/${team.id}`} className="text-slate-400 hover:text-white text-xs font-sans font-bold uppercase tracking-widest transition-colors">
          ← Back to {team.name}
        </Link>
      </div>

      {/* --- SHARED WIDTH WRAPPER: grid + game log both live inside this --- */}
      <div className="max-w-4xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">

          {/* --- FIFA CARD --- */}
          <div className={`relative rounded-2xl p-6 flex flex-col items-center bg-gradient-to-b from-slate-800 to-mbl-darkblue border-2 ${team.color} shadow-2xl`}>
            <div className="absolute top-4 left-4 flex flex-col items-center bg-black/60 backdrop-blur border border-mbl-yellow/40 rounded-lg px-3 py-1.5 shadow-md">
              <span className="font-sans font-black text-2xl text-mbl-yellow leading-none">{ovr}</span>
              <span className="font-sans font-bold text-[9px] text-slate-400 uppercase tracking-widest leading-none mt-0.5">OVR</span>
            </div>

            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur border border-white/10 px-2 py-1 rounded text-[10px] font-sans font-bold uppercase tracking-wider text-slate-300 shadow-md">
              #{rank}
            </div>

            <div className="w-32 h-32 rounded-full mt-10 mb-4 overflow-hidden relative border border-white/10 flex items-center justify-center">
              {player.image ? (
                <Image src={`/players/${player.image}`} alt={player.name} width={128} height={121} className="object-contain translate-y-[20.6%]" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 font-sans font-black text-slate-500 text-4xl">
                  {player.name.charAt(0)}
                </div>
              )}
            </div>

            <h1 className="font-sans font-black uppercase text-2xl text-center tracking-wide text-white break-words">
              {player.name}
            </h1>

            <Link href={`/teams/${team.id}`} className="mt-1 text-sm font-sans font-bold text-slate-400 hover:text-mbl-yellow transition-colors uppercase tracking-wide">
              {team.name}
            </Link>

            <span className={`mt-2 mb-4 text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${player.role === "Captain" ? 'bg-mbl-yellow text-mbl-darkblue' : 'bg-slate-800 text-slate-500'}`}>
              {player.role}
            </span>

            <div className="w-full space-y-1.5 bg-black/30 p-3 rounded-lg border border-white/5">
              <FifaStat label="Accuracy" value={acc} tooltip="How precisely this bot's thrown weapons land on target. Higher means less random spread." />
              <FifaStat label="Patience" value={pat} tooltip="How long this bot keeps chasing a target after losing direct line of sight before giving up." />
              <FifaStat label="Melee Bias" value={mel} tooltip="How much this bot prefers stabbing over throwing its weapon when both options are available." />
              <FifaStat label="Strafe Rate" value={str} tooltip="How often this bot changes direction while circling an enemy, rather than holding a steady path." />
              <FifaStat label="Aggression" value={agg} tooltip="Preferred engagement distance. Low means it wants to be right on top of enemies; high means it prefers to fight from range." />
              <FifaStat label="Pack Affinity" value={pck} tooltip="How strongly this bot sticks close to living teammates when no enemy is currently visible." />
            </div>
          </div>

          {/* --- RIGHT COLUMN: radar chart + season stats --- */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <h2 className="font-sans font-black uppercase text-lg text-white mb-2 tracking-wide border-b border-white/10 pb-2">
                Attribute Radar
              </h2>
              <RadarChart stats={radarStats} />
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <h2 className="font-sans font-black uppercase text-lg text-white mb-4 tracking-wide border-b border-white/10 pb-2">
                Season Stats
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Combat Score</div>
                  <div className="font-sans font-black text-2xl text-mbl-teal">{score}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">K / D</div>
                  <div className="font-sans font-black text-2xl text-white">{kd}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Win Rate</div>
                  <div className="font-sans font-black text-2xl text-green-400">{winRate}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Kills</div>
                  <div className="font-sans font-black text-xl text-mbl-yellow">{player.kills || 0}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Deaths</div>
                  <div className="font-sans font-black text-xl text-mbl-pink">{player.deaths || 0}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Assists</div>
                  <div className="font-sans font-black text-xl text-mbl-teal">{player.assists || 0}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Damage Dealt</div>
                  <div className="font-sans font-black text-xl text-orange-400">{player.damageDealt || 0}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Fights Played</div>
                  <div className="font-sans font-black text-xl text-white">{player.gamesPlayed || 0}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 font-sans font-bold uppercase">Wins</div>
                  <div className="font-sans font-black text-xl text-green-400">{player.wins || 0}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* --- grid ends here --- */}

        {/* --- GAME LOG: full width, spans both columns above --- */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 mt-12">
          <h2 className="font-sans font-black uppercase text-lg text-white mb-4 tracking-wide border-b border-white/10 pb-2">
            Game Log
          </h2>
          {gameLogs.length === 0 ? (
            <p className="text-slate-500 text-sm">No games logged yet.</p>
          ) : (
            <div className="space-y-2">
              {gameLogs.map((g) => {
                const row = (
                  <div className={`flex items-center justify-between p-3 rounded-lg border ${g.result === "WIN" ? 'bg-mbl-teal/10 border-mbl-teal/30' : 'bg-mbl-pink/10 border-mbl-pink/30'} ${g.videoUrl ? 'hover:brightness-125 transition-all cursor-pointer' : ''}`}>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-500 font-sans font-bold uppercase tracking-widest">{g.round}</span>
                      <span className="font-sans font-bold text-white text-sm">vs {g.opponentName}</span>
                    </div>
                    <div className="flex gap-4 text-sm font-mono">
                      <span className="text-mbl-yellow font-bold">{g.kills}K</span>
                      <span className="text-mbl-pink font-bold">{g.deaths}D</span>
                      <span className="text-mbl-teal font-bold">{g.assists}A</span>
                      <span className="text-orange-400 font-bold">{g.damage} DMG</span>
                    </div>
                  </div>
                );
                return g.videoUrl ? (
                  <a href={g.videoUrl} target="_blank" rel="noopener noreferrer" key={g.matchId}>{row}</a>
                ) : (
                  <div key={g.matchId}>{row}</div>
                );
              })}
            </div>
          )}
        </div>

      </div>
      {/* --- shared width wrapper ends here --- */}
    </div>
  );
}