'use client';

import { useAudio } from '@/context/AudioContext';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

/* ─── Waveform SVG ─── */
const BAR_COUNT = 38;

function MiniWaveform({ isPlaying }: { isPlaying: boolean }) {
  /* Hauteurs aléatoires fixes (ne changent pas au re-render) */
  const heights = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => {
        /* Envelope sinusoïdale pour une forme d'onde naturelle */
        const env = Math.sin((i / BAR_COUNT) * Math.PI);
        return 18 + env * 26 + Math.sin(i * 1.7) * 8 + Math.cos(i * 0.9) * 6;
      }),
    [],
  );

  return (
    <div className="flex items-center gap-[2px]" style={{ height: 36 }}>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="inline-block w-[2px] rounded-full"
          style={{
            background: isPlaying
              ? `rgba(0,245,255,${0.35 + (h / 58) * 0.55})`
              : 'rgba(255,255,255,0.12)',
            height: h,
          }}
          animate={
            isPlaying
              ? {
                  scaleY: [1, 0.45 + Math.random() * 0.6, 1.05, 0.65, 1],
                  opacity: [0.7, 1, 0.8, 1, 0.7],
                }
              : { scaleY: 1, opacity: 0.18 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.9 + (i % 5) * 0.18,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (i % 7) * 0.07,
                }
              : { duration: 0.4 }
          }
        />
      ))}
    </div>
  );
}

/* ─── Bouton play/pause avec retour haptique visuel ─── */
function PlayButton({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const rippleControls = useAnimation();

  const handleClick = useCallback(async () => {
    onToggle();
    rippleControls.set({ scale: 0.88, opacity: 1 });
    await rippleControls.start({
      scale: 1.6,
      opacity: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    });
  }, [onToggle, rippleControls]);

  return (
    <motion.button
      onClick={handleClick}
      aria-label={isPlaying ? 'Pause' : 'Lecture'}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.06 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      style={{
        background: 'rgba(0,245,255,0.12)',
        border: '1px solid rgba(0,245,255,0.3)',
        boxShadow: isPlaying ? '0 0 18px rgba(0,245,255,0.22)' : 'none',
      }}
    >
      {/* Ripple haptique */}
      <motion.span
        aria-hidden
        animate={rippleControls}
        className="pointer-events-none absolute inset-0 rounded-full border border-[#00f5ff]/60"
        style={{ opacity: 0 }}
      />

      {/* Halo pulsant en play */}
      <AnimatePresence>
        {isPlaying && (
          <motion.span
            aria-hidden
            key="glow"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 0.25, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 rounded-full bg-[#00f5ff]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isPlaying ? 'pause' : 'play'}
          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 15 }}
          transition={{ duration: 0.18 }}
          className="relative text-[#00f5ff]"
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── Bouton secondaire (skip) ─── */
function SkipButton({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      aria-label={label}
      whileTap={{ scale: 0.82 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 450, damping: 20 }}
      className="flex h-7 w-7 items-center justify-center rounded-full text-white/30 transition-colors hover:text-white/60"
    >
      {children}
    </motion.button>
  );
}

/* ─── Player principal ─── */
export default function PersistentPlayer() {
  const { currentTrack, isPlaying, progress, duration, toggle, seek } = useAudio();

  /* Formatage du temps */
  const fmt = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const elapsed = duration * progress;

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{
            background: 'rgba(4, 4, 8, 0.72)',
            backdropFilter: 'blur(28px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.55), 0 -1px 0 rgba(0,245,255,0.06)',
          }}
        >
          {/* Barre de progression — cliquable — au-dessus */}
          <div
            className="group relative h-[3px] w-full cursor-pointer bg-white/[0.06]"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              seek((e.clientX - rect.left) / rect.width);
            }}
          >
            {/* Track rempli */}
            <motion.div
              className="absolute inset-y-0 left-0"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #00b4d8, #00f5ff)',
              }}
            />
            {/* Curseur scrubber */}
            <motion.div
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#00f5ff] opacity-0 shadow-[0_0_8px_#00f5ff] transition-opacity group-hover:opacity-100"
              style={{ left: `calc(${progress * 100}% - 6px)` }}
            />
          </div>

          {/* Corps du player */}
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">

            {/* ── Infos piste ── */}
            <div className="min-w-0 flex-[1.2]">
              <motion.p
                key={currentTrack.title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="truncate text-[13px] font-semibold text-[#e8eaed]"
              >
                {currentTrack.title}
              </motion.p>
              {currentTrack.artist && (
                <motion.p
                  key={currentTrack.artist}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="truncate text-[11px] tracking-wide text-white/30"
                >
                  {currentTrack.artist}
                </motion.p>
              )}
            </div>

            {/* ── Waveform + contrôles centrés ── */}
            <div className="flex flex-1 flex-col items-center gap-1.5">
              {/* Waveform SVG animée */}
              <div className="hidden sm:block">
                <MiniWaveform isPlaying={isPlaying} />
              </div>

              {/* Contrôles transport */}
              <div className="flex items-center gap-3">
                <SkipButton label="Précédent">
                  <SkipBack size={13} />
                </SkipButton>

                <PlayButton isPlaying={isPlaying} onToggle={toggle} />

                <SkipButton label="Suivant">
                  <SkipForward size={13} />
                </SkipButton>
              </div>
            </div>

            {/* ── Temps ── */}
            <div className="hidden flex-[1.2] justify-end sm:flex">
              <span className="font-mono text-[11px] tabular-nums text-white/25">
                {fmt(elapsed)}
                <span className="mx-1 text-white/12">/</span>
                {fmt(duration)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
