'use client';

import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

export interface SplashLoaderProps {
  onComplete: () => void;
}

export default function SplashLoader({ onComplete }: SplashLoaderProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const runAnimation = async () => {
      // 1. Apparition de la flatline
      await animate(
        '#flatline',
        { opacity: 1, width: ['0px', '100px'] },
        { duration: 0.4, ease: 'easeOut' },
      );

      // 2. Transition vers l'égaliseur
      await animate('#flatline', { opacity: 0 }, { duration: 0.1 });

      // Barres apparaissent et oscillent violemment
      await animate(
        '.bar',
        { opacity: 1, scaleY: [0.2, 2.5, 0.4, 3, 1] },
        { duration: 0.8, ease: 'easeInOut', delay: stagger(0.05) },
      );

      // 3. Compression avant le Kick
      await animate(
        '.bar',
        { scaleY: 0, opacity: 0 },
        { duration: 0.2, ease: 'anticipate' },
      );

      // 4. L'Onde de choc
      await animate(
        '#circle',
        { opacity: 1, scale: [0, 1] },
        { duration: 0.1 },
      );
      await animate(
        '#circle',
        { scale: 200, opacity: 0 },
        { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      );

      // 5. Nettoyage
      onComplete();
    };

    runAnimation();
  }, [animate, onComplete]);

  return (
    <motion.div
      ref={scope}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Flatline */}
      <div
        id="flatline"
        className="absolute h-[2px] rounded-full bg-violet-500"
        style={{
          opacity: 0,
          width: 0,
          boxShadow: '0 0 12px rgba(124,58,237,0.6)',
        }}
      />

      {/* Barres égaliseur */}
      <div className="absolute flex items-center gap-[6px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bar h-10 w-[3px] origin-center rounded-full bg-violet-600"
            style={{
              opacity: 0,
              boxShadow: '0 0 8px rgba(124,58,237,0.5)',
            }}
          />
        ))}
      </div>

      {/* Cercle onde de choc */}
      <div
        id="circle"
        className="absolute h-5 w-5 rounded-full bg-violet-600"
        style={{
          opacity: 0,
          scale: 0,
          boxShadow: '0 0 30px rgba(124,58,237,0.5)',
        }}
      />

      {/* Signature */}
      <span className="absolute bottom-10 font-mono text-[11px] tracking-[0.45em] text-white/20 uppercase">
        Arnaud Ly · Portfolio
      </span>
    </motion.div>
  );
}
