'use client'; // Required for scroll listeners

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // 1. If at the very top, always show
        if (currentScrollY < 10) {
          setIsVisible(true);
        }
        // 2. If scrolling DOWN (and past top), hide
        else if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        }
        // 3. If scrolling UP, show
        else {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);

    // Cleanup function to remove listener when component unmounts
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`
        fixed z-50 left-1/2 -translate-x-1/2
        w-[calc(100%-2rem)] md:w-full md:max-w-6xl
        transition-all duration-500 ease-in-out
        ${isVisible ? 'top-4 translate-y-0 opacity-100' : '-top-20 -translate-y-full opacity-0'}
      `}
    >
      <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row justify-between items-center p-3 px-6">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 group mb-3 md:mb-0">
          <div className="relative w-10 h-10 transition-transform group-hover:rotate-12 duration-300">
             <Image src="/mbl-logo-round.png" alt="Logo" fill className="object-contain drop-shadow-md" />
          </div>
          <span className="font-header text-lg md:text-xl tracking-tighter italic text-white group-hover:text-mbl-yellow transition-colors">
            MINI BATTLE <span className="text-mbl-teal">LEAGUE</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-1 md:gap-6 font-header text-sm font-bold tracking-widest">
          
          <Link href="/teams" className="px-4 py-2 rounded-lg hover:bg-white/10 hover:text-mbl-yellow transition-all">
            TEAMS
          </Link>
          
          <Link href="/schedule" className="px-4 py-2 rounded-lg hover:bg-white/10 hover:text-mbl-yellow transition-all">
            SCHEDULE
          </Link>
          
          <Link href="/stats" className="px-4 py-2 rounded-lg hover:bg-white/10 hover:text-mbl-yellow transition-all">
            STATS
          </Link>

          {/* Special Button for Videos */}
          <Link href="/videos" className="ml-2 bg-mbl-pink/20 text-mbl-pink border border-mbl-pink/50 px-4 py-2 rounded-lg hover:bg-mbl-pink hover:text-white hover:border-mbl-pink transition-all shadow-[0_0_15px_rgba(248,95,98,0.2)]">
            VIDEOS
          </Link>
        </div>

      </div>
    </nav>
  );
}