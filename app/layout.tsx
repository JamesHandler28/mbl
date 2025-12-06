import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar' // <--- 1. Import new Navbar

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
      <body className={`${inter.variable} ${montserrat.variable} bg-mbl-darkblue text-white min-h-screen relative selection:bg-mbl-pink selection:text-white`}>
        
        {/* ATMOSPHERE (Global Background Glows) */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-mbl-teal/20 rounded-full blur-[120px] opacity-50 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-mbl-pink/10 rounded-full blur-[120px] opacity-50"></div>
        </div>

        {/* 2. THE SMART NAVBAR */}
        <Navbar />
        
        {/* Page Content - Added padding-top (pt-24) so content isn't hidden behind the fixed nav */}
        <main className="pt-24 relative z-0 min-h-[80vh]">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  )
}