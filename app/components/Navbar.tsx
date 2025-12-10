'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // State for the mobile dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // If at the very top, always show
        if (currentScrollY < 10) {
          setIsVisible(true);
        }
        // If scrolling DOWN (and past top), hide
        else if (currentScrollY > lastScrollY) {
          setIsVisible(false);
          setIsMobileMenuOpen(false); // Close mobile menu if they scroll away
        }
        // If scrolling UP, show
        else {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
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
      <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col p-3 px-6">
        
        {/* TOP ROW: Logo (Left) + Hamburger (Right) */}
        <div className="flex justify-between items-center w-full">
            
            {/* LOGO AREA */}
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:rotate-12 duration-300">
                  <Image src="/mbl-logo-round.png" alt="Logo" fill className="object-contain drop-shadow-md" />
              </div>
              {/* FIX: Changed font-header to font-sans */}
              <span className="font-sans font-bold text-lg md:text-xl tracking-tighter italic text-white group-hover:text-mbl-yellow transition-colors">
                MINI BATTLE <span className="text-mbl-teal">LEAGUE</span>
              </span>
            </Link>

            {/* HAMBURGER BUTTON (Visible on Mobile Only) */}
            <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>

            {/* DESKTOP LINKS (Hidden on Mobile) */}
            {/* FIX: Changed font-header to font-sans */}
            <div className="hidden md:flex items-center gap-6 font-sans text-sm font-bold tracking-widest">
              <NavLinks />
            </div>

        </div>

        {/* MOBILE MENU DROPDOWN (Hidden on Desktop) */}
        <div className={`md:hidden flex flex-col items-center gap-4 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 pt-6 pb-2' : 'max-h-0 opacity-0'}`}>
            {/* FIX: Added font-sans here too */}
            <div className="font-sans font-bold tracking-widest w-full flex flex-col items-center">
                <NavLinks mobile onClick={() => setIsMobileMenuOpen(false)} />
            </div>
        </div>

      </div>
    </nav>
  );
}

// Helper Component
function NavLinks({ mobile = false, onClick }: { mobile?: boolean, onClick?: () => void }) {
    // FIX: Removed any font-header classes here
    const baseClass = mobile 
        ? "w-full text-center py-3 text-lg border-b border-white/5 last:border-0" // Mobile
        : "px-4 py-2 rounded-lg hover:bg-white/10 hover:text-mbl-yellow transition-all"; // Desktop

    const videoClass = mobile
        ? "w-full text-center py-3 text-lg font-bold text-mbl-pink mt-2"
        : "ml-2 bg-mbl-pink/20 text-mbl-pink border border-mbl-pink/50 px-4 py-2 rounded-lg hover:bg-mbl-pink hover:text-white hover:border-mbl-pink transition-all shadow-[0_0_15px_rgba(248,95,98,0.2)]";

    return (
        <>
            <Link href="/teams" className={baseClass} onClick={onClick}>
                TEAMS
            </Link>
            
            <Link href="/schedule" className={baseClass} onClick={onClick}>
                SCHEDULE
            </Link>
            
            <Link href="/stats" className={baseClass} onClick={onClick}>
                STATS
            </Link>

            <Link href="/videos" className={videoClass} onClick={onClick}>
                VIDEOS
            </Link>
        </>
    )
}