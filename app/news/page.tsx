import React from 'react';
import Link from 'next/link';
import { NEWS_POSTS } from '../data';
import GraphicEmbed from '../components/GraphicEmbed';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

export default function NewsPage() {
  if (NEWS_POSTS.length === 0) {
    return (
      <div className="min-h-screen p-4 md:p-8 pb-20 pt-24 md:pt-28 font-sans text-slate-200">
        <div className="text-center mb-10">
          <h1 className="font-black text-4xl md:text-6xl text-white drop-shadow-2xl uppercase tracking-tight">
            LEAGUE <span className="text-mbl-teal">NEWS</span>
          </h1>
        </div>
        <p className="text-center text-slate-500 font-mono">No posts yet — check back soon.</p>
      </div>
    );
  }

  const [featured, ...rest] = NEWS_POSTS;

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 pt-24 md:pt-28 font-sans text-slate-200">
      <div className="text-center mb-8 md:mb-10">
        <h1 className="font-black text-4xl md:text-6xl text-white drop-shadow-2xl uppercase tracking-tight">
          LEAGUE <span className="text-mbl-teal">NEWS</span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

        {/* --- MAIN COLUMN --- */}
        <div>

          {/* --- FEATURED / HERO POST --- */}
          {/* Same graphicFile as everywhere else — just a bigger box,
              and its own solid text panel below, never an overlay. */}
          <Link href={`/news/${featured.id}`} className="block group mb-10">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <div className="relative w-full aspect-[16/9] bg-slate-800">
                <GraphicEmbed
                  src={`/news/${featured.thumbGraphicFile}`}
                  designWidth={1280}
                  designHeight={720}
                  title={featured.title}
                  fit="contain"
                />
              </div>

              <div className="p-6 md:p-8">
                <span className="inline-block bg-mbl-teal text-slate-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded mb-3">
                  Latest
                </span>
                <h2 className="font-sans font-black text-2xl md:text-4xl text-white group-hover:text-mbl-yellow transition-colors leading-tight mb-2 max-w-3xl">
                  {featured.title}
                </h2>
                <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-2">
                  {featured.summary}
                </p>
                <span className="text-[11px] text-slate-400 font-mono uppercase tracking-widest">
                  {formatDate(featured.date)}
                </span>
              </div>
            </div>
          </Link>

          {/* --- ALL NEWS GRID --- */}
          {rest.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-5">
                <h3 className="font-sans font-black text-lg text-white uppercase tracking-widest whitespace-nowrap">
                  All News
                </h3>
                <div className="h-px bg-white/10 flex-grow" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rest.map((post) => (
                  <Link href={`/news/${post.id}`} key={post.id} className="block group">
                    <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden hover:border-mbl-teal/50 transition-colors shadow-lg h-full flex flex-col">
                      <div className="relative w-full aspect-[16/9] bg-slate-800">
                        <GraphicEmbed
                          src={`/news/${post.thumbGraphicFile}`}
                          designWidth={1280}
                          designHeight={720}
                          title={post.title}
                          fit="contain"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1.5">
                          {formatDate(post.date)}
                        </span>
                        <h4 className="font-sans font-black text-base text-white group-hover:text-mbl-yellow transition-colors leading-snug mb-1.5">
                          {post.title}
                        </h4>
                        <p className="text-slate-400 text-xs line-clamp-2">{post.summary}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* --- SIDEBAR: quick headline list, no graphics --- */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 h-fit">
          <h3 className="font-sans font-black text-sm text-mbl-teal uppercase tracking-widest mb-4 pb-3 border-b border-white/10">
            Latest Headlines
          </h3>
          <div className="flex flex-col">
            {NEWS_POSTS.map((post, i) => (
              <Link
                href={`/news/${post.id}`}
                key={post.id}
                className={`block py-3 group ${i !== NEWS_POSTS.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <h5 className="font-sans font-bold text-sm text-slate-200 group-hover:text-mbl-yellow transition-colors leading-snug mb-1">
                  {post.title}
                </h5>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                  {timeAgo(post.date)}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}