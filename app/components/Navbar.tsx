import Link from 'next/link';
import Image from 'next/image';

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="uppercase font-header font-bold tracking-wider text-sm hover:text-mbl-yellow transition-colors relative group py-2"
  >
    {children}
    {/* Animated underline effect */}
    <span className="absolute bottom-0 left-0 w-0 h-1 bg-mbl-pink transition-all group-hover:w-full"></span>
  </Link>
);

export default function Navbar() {
  return (
    <nav className="bg-mbl-darkblue border-b-4 border-mbl-teal p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo and Title */}
        <Link href="/" className="flex items-center gap-3 mb-4 md:mb-0 group">
          <div className="w-12 h-12 relative rounded-full border-2 border-mbl-yellow overflow-hidden group-hover:scale-110 transition-transform">
            <Image 
              src="/mbl-logo-round.png" 
              alt="MBL Logo" 
              fill 
              className="object-cover"
            />
          </div>
          <span className="font-header font-black text-2xl tracking-tight text-white group-hover:text-mbl-yellow transition-colors">
            MINI BATTLE LEAGUE
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8 text-white">
          <NavLink href="/teams">Teams</NavLink>
          <NavLink href="/schedule">Schedule</NavLink>
          <NavLink href="/stats">Stats</NavLink>
          <Link href="/videos" className="bg-mbl-pink hover:bg-mbl-yellow hover:text-mbl-darkblue text-white font-header font-bold uppercase text-sm px-4 py-2 rounded transition-all transform hover:-translate-y-1">
             Videos
          </Link>
        </div>
      </div>
    </nav>
  );
}