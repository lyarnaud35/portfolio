'use client';

import { type Variants, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

const NAME  = 'PORTFOLIO';
const WORDS = NAME.split(' ');

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay, duration: 0.5, ease: 'easeOut' } },
});

export default function Hero() {
  const reduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cfg  = { stiffness: 45, damping: 16, mass: 1 };
  const mx   = useSpring(rawX, cfg);
  const my   = useSpring(rawY, cfg);
  const gx   = useTransform(mx, [-1, 1], [-35, 35]);
  const gy   = useTransform(my, [-1, 1], [-20, 20]);

  useEffect(() => {
    if (reduced) return;
    const h = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth)  * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, [reduced, rawX, rawY]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 sm:px-8"
      style={{ paddingTop: 'calc(64px + 0.5vh)', paddingBottom: '0' }}
    >
      {/* Halo améthyste */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          x: reduced ? 0 : gx,
          y: reduced ? 0 : gy,
          width: '580px', height: '260px',
          top: '-10px', left: '-20px',
          background:
            'radial-gradient(ellipse 55% 50% at 25% 50%, rgba(168,85,247,0.10) 0%, rgba(124,58,237,0.04) 50%, transparent 75%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Grille décorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.013]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,1) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Contenu ── */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="min-w-0">
          <motion.h1
            variants={reduced ? undefined : wordContainer}
            initial={reduced ? undefined : 'hidden'}
            animate={reduced ? undefined : 'show'}
            aria-label={NAME}
            className="flex flex-row flex-wrap items-baseline overflow-hidden"
            style={{
              fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 6.75rem)',
              fontWeight: 700,
              lineHeight: 0.86,
              letterSpacing: '-0.045em',
              fontStretch: 'normal',
              gap: '0 0.12em',
              color: '#ffffff',
            }}
          >
            {WORDS.map((word, i) => (
              <motion.span
                key={i}
                variants={reduced ? undefined : wordVariant}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Sous-titre collé au titre */}
          <motion.div
            variants={fadeIn(0.42)}
            initial={reduced ? 'show' : 'hidden'}
            animate="show"
            className="flex items-center"
            style={{ marginTop: '0.5rem', gap: '0.6rem' }}
          >
            <div
              className="shrink-0 bg-[#a855f7]/55"
              style={{ width: '36px', height: '2px', borderRadius: '1px' }}
            />
            <p
              className="uppercase text-zinc-500"
              style={{ fontSize: '0.78rem', letterSpacing: '0.22em', fontWeight: 400, lineHeight: 1 }}
            >
              Mixage&nbsp;·&nbsp;Sound Design&nbsp;·&nbsp;Post-Production Audio
            </p>
          </motion.div>
        </div>
      </div>

      {/* Espace avant la grille */}
      <div style={{ height: '1rem' }} />
    </section>
  );
}
