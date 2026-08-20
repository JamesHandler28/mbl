'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { leagueHistory, teamsData } from '../data';

// Pulls the video ID out of a youtube.com/shorts/{id} (or youtu.be/{id},
// or watch?v={id}) URL.
function extractVideoId(url: string): string | null {
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return watchMatch[1];
  const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortUrlMatch) return shortUrlMatch[1];
  return null;
}

function getTeamName(id: string): string {
  return teamsData.find((t) => t.id === id)?.name ?? "TBD";
}

type VideoEntry = {
  matchId: string;
  url: string;
  id: string | null;
  round: string;
  weekNumber: number | null; // null for non-week rounds (playoffs, etc.)
  team1Id: string;
  team2Id: string;
  displayTitle: string;
  thumbnailUrl: string;
  loading: boolean;
  failed: boolean;
};

export default function WatchPage() {
  // --- Pull every match with a real video, across every season/event ---
  const allMatches = useMemo(() => {
    return leagueHistory.flatMap((season) =>
      season.events.flatMap((event) => event.matches)
    );
  }, []);

  const initialVideos: VideoEntry[] = useMemo(() => {
    return allMatches
      .filter((m) => !!m.videoUrl)
      .map((m) => {
        const weekMatch = m.round.match(/week\s*(\d+)/i);
        const weekNumber = weekMatch ? parseInt(weekMatch[1], 10) : null;
        return {
          matchId: m.id,
          url: m.videoUrl as string,
          id: extractVideoId(m.videoUrl as string),
          round: m.round,
          weekNumber,
          team1Id: m.team1,
          team2Id: m.team2,
          displayTitle: `${getTeamName(m.team1)} vs ${getTeamName(m.team2)} — ${m.round}`,
          thumbnailUrl: '',
          loading: true,
          failed: false,
        };
      });
  }, [allMatches]);

  const [videos, setVideos] = useState<VideoEntry[]>(
    initialVideos.map((v) => ({
      ...v,
      // Request the highest-res thumbnail directly by video ID.
      // maxresdefault isn't always generated (esp. for Shorts), so an
      // onError handler on the <img> falls back to hqdefault below.
      thumbnailUrl: v.id ? `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg` : '',
      loading: false,
      failed: !v.id,
    }))
  );
  const [selectedWeek, setSelectedWeek] = useState<number | 'all' | 'other'>('all');
  const [selectedTeamId, setSelectedTeamId] = useState<string | 'all'>('all');

  // Every distinct week number present, sorted numerically, for the filter bar
  const availableWeeks = useMemo(() => {
    const weeks = new Set<number>();
    initialVideos.forEach((v) => {
      if (v.weekNumber !== null) weeks.add(v.weekNumber);
    });
    return Array.from(weeks).sort((a, b) => a - b);
  }, [initialVideos]);

  // Any videos whose round ISN'T a "Week N" (e.g. playoffs) get their own filter option
  const hasNonWeekVideos = initialVideos.some((v) => v.weekNumber === null);

  // (No async thumbnail fetch needed anymore — thumbnailUrl is built
  // directly from the video ID above, with an onError fallback chain
  // handled in the <img> tag itself.)

  const filteredVideos = videos.filter((v) => {
    const weekMatches =
      selectedWeek === 'all' ? true :
      selectedWeek === 'other' ? v.weekNumber === null :
      v.weekNumber === selectedWeek;

    const teamMatches =
      selectedTeamId === 'all' ? true :
      v.team1Id === selectedTeamId || v.team2Id === selectedTeamId;

    return weekMatches && teamMatches;
  });

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10 pt-24 md:pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
            WATCH
          </h1>
          <h2 className="text-green-400 font-mono text-sm uppercase tracking-[0.3em]">
            Every Match, Every Week
          </h2>
        </div>

        {/* --- FILTER BAR --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedWeek('all')}
            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
              selectedWeek === 'all'
                ? 'bg-mbl-teal text-slate-950'
                : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-mbl-teal/50'
            }`}
          >
            All
          </button>
          {availableWeeks.map((week) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
                selectedWeek === week
                  ? 'bg-mbl-teal text-slate-950'
                  : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-mbl-teal/50'
              }`}
            >
              Week {week}
            </button>
          ))}
          {hasNonWeekVideos && (
            <button
              onClick={() => setSelectedWeek('other')}
              className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
                selectedWeek === 'other'
                  ? 'bg-mbl-teal text-slate-950'
                  : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-mbl-teal/50'
              }`}
            >
              Playoffs
            </button>
          )}
        </div>

        {/* --- TEAM FILTER BAR --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedTeamId('all')}
            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
              selectedTeamId === 'all'
                ? 'bg-mbl-teal text-slate-950'
                : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-mbl-teal/50'
            }`}
          >
            All Teams
          </button>
          {teamsData.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeamId(team.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors ${
                selectedTeamId === team.id
                  ? 'bg-mbl-teal text-slate-950'
                  : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-mbl-teal/50'
              }`}
            >
              {team.name}
            </button>
          ))}
        </div>

        {filteredVideos.length === 0 ? (
          <p className="text-center text-slate-500 font-mono">No videos yet for this filter.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredVideos.map((video) => (
              <a
                key={video.matchId}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-green-400/50 transition-colors shadow-lg"
              >
                <div className="relative aspect-[9/16] bg-slate-800 overflow-hidden">
                  {video.loading ? (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm font-mono animate-pulse">
                      Loading...
                    </div>
                  ) : (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.displayTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src.includes('maxresdefault')) {
                          img.src = `https://img.youtube.com/vi/${video.id}/sddefault.jpg`;
                        } else if (img.src.includes('sddefault')) {
                          img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs md:text-sm font-bold line-clamp-2 drop-shadow-md">
                      {video.displayTitle}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}