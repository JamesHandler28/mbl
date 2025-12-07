import React from 'react';

const SocialIcon = ({ path, href, color }: { path: string, href: string, color: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`group relative p-3 bg-slate-900 rounded-lg border border-white/10 hover:border-${color} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
  >
    {/* Icon SVG */}
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={`w-6 h-6 text-slate-400 group-hover:text-${color} transition-colors`}
    >
      <path d={path} />
    </svg>
  </a>
);

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/40 backdrop-blur-md">
      
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mbl-teal to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* LEFT: Branding */}
          <div className="text-center md:text-left">
            <h2 className="font-header text-2xl font-black text-white italic tracking-tighter uppercase mb-2">
              MINI BATTLE <span className="text-mbl-yellow">LEAGUE</span>
            </h2>
            <p className="text-slate-500 font-mono text-sm">
              © {new Date().getFullYear()} Official League Data.
            </p>
          </div>

          {/* RIGHT: Social Icons */}
          <div className="flex gap-4">
            
            {/* YOUTUBE */}
            <SocialIcon 
              href="https://www.youtube.com/@MiniBattleLeague" 
              color="mbl-pink"
              path="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            />

            {/* INSTAGRAM */}
            <SocialIcon 
              href="https://www.instagram.com/minibattleleague/" 
              color="purple-400"
              path="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.5-.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />

            {/* TIKTOK */}
            <SocialIcon 
              href="https://www.tiktok.com/@minibattleleague" 
              color="pink-400"
              path="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.36-3.96 1.84-6.08 1.31-2.13-.53-3.95-1.92-4.93-3.9-1.02-2.02-.95-4.47.16-6.42 1.05-1.83 2.87-3.13 4.93-3.52.28-.05.57-.09.85-.1v4.13c-.93.18-1.72.76-2.18 1.57-.45.8-.46 1.78-.02 2.58.44.8 1.25 1.38 2.16 1.53.91.16 1.86-.06 2.61-.63.74-.57 1.18-1.46 1.18-2.39V.02z"
            />

          </div>
        </div>
      </div>
    </footer>
  );
}