'use client';

import React, { useEffect, useState } from 'react';
import { VIDEO_URLS } from '../data/videos';

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

type VideoMeta = {
  url: string;
  id: string | null;
  title: string;
  thumbnailUrl: string;
  loading: boolean;
  failed: boolean;
};

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoMeta[]>(() =>
    VIDEO_URLS.map((url) => ({
      url,
      id: extractVideoId(url),
      title: '',
      thumbnailUrl: '',
      loading: true,
      failed: false,
    }))
  );

  useEffect(() => {
    let cancelled = false;

    VIDEO_URLS.forEach(async (url, index) => {
      try {
        // YouTube's public oEmbed endpoint — no API key, no quota, just a
        // plain fetch. Gives us the real title and a thumbnail for free.
        const res = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
        );
        if (!res.ok) throw new Error('oEmbed request failed');
        const data = await res.json();
        if (cancelled) return;

        setVideos((prev) =>
          prev.map((v, i) =>
            i === index
              ? { ...v, title: data.title, thumbnailUrl: data.thumbnail_url, loading: false }
              : v
          )
        );
      } catch {
        if (cancelled) return;
        // Fallback: YouTube's predictable thumbnail URL pattern still works
        // even if oEmbed fails for some reason (e.g. a private/deleted video).
        const id = extractVideoId(url);
        setVideos((prev) =>
          prev.map((v, i) =>
            i === index
              ? {
                  ...v,
                  title: 'Watch on YouTube',
                  thumbnailUrl: id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '',
                  loading: false,
                  failed: true,
                }
              : v
          )
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
            VIDEO ARCHIVES
          </h1>
          <h2 className="text-green-400 font-mono text-sm uppercase tracking-[0.3em]">
            Transmission Online
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video, i) => (
            <a
              key={video.url}
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
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs md:text-sm font-bold line-clamp-2 drop-shadow-md">
                    {video.loading ? '' : video.title}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Decorative Scanlines, matching the rest of the site */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,6px_100%] opacity-20" />
    </div>
  );
}