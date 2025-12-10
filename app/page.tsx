import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    // changed min-h-screen to min-h-[100dvh] for better mobile browser support
    <main className="min-h-[100dvh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* BACKGROUND EFFECTS */}
      {/* A spinning glow behind the logo */}
      {/* UPDATE: Reduced size on mobile (300px) -> Desktop stays 500px */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-mbl-teal/20 rounded-full blur-[100px] animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* LOGO (Bouncing) */}
        {/* UPDATE: Reduced mobile size (w-48/h-48) -> Desktop stays w-80/h-80 */}
        <div className="relative w-48 h-48 md:w-80 md:h-80 mb-6 md:mb-8 animate-bounce-slow hover:scale-105 transition-transform duration-500">
           {/* We use the round logo as the main icon */}
           <Image 
             src="/mbl-logo-round.png" 
             alt="MBL Logo" 
             fill 
             className="object-contain drop-shadow-[0_0_30px_rgba(76,159,159,0.5)]" 
             priority
           />
        </div>

        {/* TITLE */}
        {/* UPDATE: Reduced mobile text (text-4xl) -> Desktop stays text-8xl */}
        <h1 className="font-header font-black text-4xl sm:text-6xl md:text-8xl text-white mb-2 tracking-tighter drop-shadow-xl leading-tight">
          MINI BATTLE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-mbl-teal via-white to-mbl-pink">
            LEAGUE
          </span>
        </h1>
        
        {/* SUBTITLE */}
        {/* UPDATE: Reduced margin bottom on mobile to bring buttons closer */}
        <p className="font-mono text-mbl-teal mb-8 md:mb-12 text-sm md:text-lg tracking-widest uppercase opacity-80">
          Season 1 // The Arena is Open
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto">
          {/* UPDATE: Reduced padding (px-8 py-3) -> Desktop stays px-12 py-4 */}
          <Link href="/teams" className="group relative bg-mbl-yellow text-mbl-darkblue font-header font-black text-lg md:text-xl px-8 py-3 md:px-12 md:py-4 rounded-xl overflow-hidden transition-transform hover:-translate-y-1 shadow-lg shadow-mbl-yellow/20">
            <span className="relative z-10">VIEW ROSTER</span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
          
          <Link href="/schedule" className="group relative border-4 border-mbl-pink text-white font-header font-black text-lg md:text-xl px-8 py-3 md:px-12 md:py-4 rounded-xl overflow-hidden transition-transform hover:-translate-y-1 shadow-lg shadow-mbl-pink/20 hover:bg-mbl-pink">
            <span className="relative z-10">MATCH RESULTS</span>
          </Link>
        </div>

      </div>
    </main>
  )
}