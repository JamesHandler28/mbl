import React from 'react';
import Link from 'next/link';

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background decoration: Pulse effect */}
      <div className="absolute w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 text-center max-w-lg p-8 border border-slate-800 bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl">
        
        {/* Icon */}
        <div className="text-6xl mb-6 animate-bounce">
          🔒
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
          ACCESS DENIED
        </h1>
        
        <h2 className="text-green-400 font-mono text-sm uppercase tracking-[0.3em] mb-6">
          Transmission Offline
        </h2>

        {/* Description */}
        <p className="text-slate-400 mb-8 leading-relaxed">
          The video archives are currently encrypted. Footage from <strong>Major Event 1</strong> is being processed by the central mainframe.
        </p>

        {/* Button */}
        <Link 
          href="/schedule" 
          className="inline-block bg-slate-100 text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-green-400 transition-colors shadow-lg shadow-green-900/20"
        >
          VIEW MATCH RESULTS INSTEAD
        </Link>
      </div>

      {/* Decorative Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,6px_100%] opacity-20"></div>

    </div>
  );
}