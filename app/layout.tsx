import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/next'

// Load our fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['700', '900'], 
  variable: '--font-montserrat' 
})

export const metadata: Metadata = {
  title: 'Mini Battle League',
  description: 'The ultimate arcade battle arena.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased bg-mbl-darkblue text-white min-h-screen relative selection:bg-mbl-pink selection:text-white`}>
        
        {/* ========================================= */}
        {/* 1. ATMOSPHERE (Global Background Glows)   */}
        {/* ========================================= */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          {/* Top Left Teal Glow */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-mbl-teal/20 rounded-full blur-[120px] opacity-50 animate-pulse"></div>
          {/* Bottom Right Pink Glow */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-mbl-pink/10 rounded-full blur-[120px] opacity-50"></div>
        </div>

        {/* ========================================= */}
        {/* 2. THE FLOATING GLASS NAVBAR              */}
        {/* ========================================= */}
        <nav className="sticky top-4 z-50 mx-4 md:mx-auto max-w-6xl mt-4">
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col md:flex-row justify-between items-center p-3 px-6">
            
            {/* LOGO AREA */}
            <Link href="/" className="flex items-center gap-3 group mb-3 md:mb-0">
              <div className="relative w-10 h-10 transition-transform group-hover:rotate-12 duration-300">
                 {/* Ensure mbl-logo-round.png is in public folder */}
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
        
        {/* Page Content */}
        <main className="mt-8 relative z-0">
          {children}
        </main>

        <Footer />

        <Analytics />

      </body>
    </html>
  )
}