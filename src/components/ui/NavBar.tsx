'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Accueil',  href: '/' },
  { label: 'À Propos', href: '/about' },
  { label: 'Démos',    href: '/demos' },
];

interface NavBarProps {
  onContactOpen: () => void;
}

export default function NavBar({ onContactOpen }: NavBarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2 lg:flex-row lg:items-center lg:justify-end lg:gap-8">
      {NAV_LINKS.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className={`group relative text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-200 hover:text-white lg:text-sm ${
              isActive ? 'text-white' : 'text-slate-400'
            }`}
          >
            {label}
            <span
              className={`absolute -bottom-0.5 left-0 h-px bg-[#a855f7] transition-all duration-300 ease-out ${
                isActive ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>
        );
      })}

      <button
        onClick={onContactOpen}
        className="group relative text-xs font-medium uppercase tracking-[0.14em] text-slate-400 transition-colors duration-200 hover:text-white lg:text-sm"
      >
        Contact
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#a855f7] transition-all duration-300 ease-out group-hover:w-full" />
      </button>
    </nav>
  );
}
