'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Projets',  href: '#projects' },
  { label: 'À Propos', href: '#hero'     },
];

const navStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 500,
  letterSpacing: '0.15em',
};

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 10)), [scrollY]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 border-b transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(5,5,5,0.74)' : 'rgba(5,5,5,0.16)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        borderBottomColor: 'rgba(255,255,255,0.05)',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.32)' : 'none',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">

        {/* ── Gauche : Logo ── */}
        <Link
          href="/"
          className="uppercase text-white/90 transition-colors hover:text-white"
          style={navStyle}
        >
          Arnaud Ly
        </Link>

        {/* ── Droite : Nav + Contact ── */}
        <div className="hidden items-center gap-3 md:flex">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group relative uppercase text-white/35 transition-colors duration-200 hover:text-white/85"
                  style={navStyle}
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#a855f7] transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Séparateur vertical */}
          <div className="h-4 w-px bg-white/10" aria-hidden />

          {/* Bouton Contact — glassmorphism */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="#contact"
              className="group relative inline-flex items-center overflow-hidden rounded-full px-5 py-2 uppercase text-white/80 transition-colors duration-300 hover:text-white"
              style={{
                ...navStyle,
                fontSize: '0.78rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'rgba(168,85,247,0.12)' }}
              />
              <span className="relative">Contact</span>
            </Link>
          </motion.div>
        </div>

        {/* ── Hamburger mobile ── */}
        <button
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-px w-5 origin-center bg-white/60"
              animate={
                menuOpen
                  ? i === 1 ? { opacity: 0 } : i === 0 ? { rotate: 45, y: 8 } : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.2 }}
            />
          ))}
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
            style={{ background: 'rgba(5,5,5,0.94)', backdropFilter: 'blur(24px)' }}
          >
            <ul className="flex flex-col gap-5 px-6 py-6">
              {[...NAV_LINKS, { label: 'Contact', href: '#contact' }].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="uppercase text-white/40 transition-colors hover:text-[#a855f7]"
                    style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.15em' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
