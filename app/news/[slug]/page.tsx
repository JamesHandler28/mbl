import React from 'react';
import Link from 'next/link';
import { NEWS_POSTS } from '../../data';
import GraphicEmbed from '../../components/GraphicEmbed';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = NEWS_POSTS.find((p) => p.id === slug);

  if (!post) {
    return (
      <div className="p-20 text-center text-mbl-pink font-sans font-bold text-2xl">
        Post not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20 pt-24 md:pt-28 font-sans text-slate-200">
      <div className="max-w-3xl mx-auto">
        <Link href="/news" className="text-slate-400 hover:text-white text-xs font-sans font-bold uppercase tracking-widest transition-colors">
          ← Back to News
        </Link>

        <div className="mt-6 mb-8">
          <div className="text-[11px] text-slate-500 font-mono uppercase tracking-widest mb-2">
            {formatDate(post.date)}
          </div>
          <h1 className="font-sans font-black text-3xl md:text-4xl text-white leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Live-rendered graphic, not a screenshot — scaled uniformly
            to fit this box, rather than relying on the graphic's own
            CSS to reflow at this size. */}
        <div className="relative w-full aspect-[16/9] bg-slate-800 rounded-2xl overflow-hidden mb-8 border border-white/10">
          <GraphicEmbed
            src={`/news/${post.graphicFile}`}
            designWidth={1600}
            designHeight={900}
            title={post.title}
          />
        </div>

        <div className="flex flex-col gap-4">
          {post.body.map((paragraph, i) => (
            <p key={i} className="text-slate-300 text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}