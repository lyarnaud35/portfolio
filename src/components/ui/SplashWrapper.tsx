'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import EnterButton from './EnterButton';
import VideoSplashLoader from './VideoSplashLoader';

export default function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  /* Sauter l'intro si déjà vue dans cette session */
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('introPlayed');
    if (hasSeenIntro) {
      setHasStarted(true);
      setShowSplash(false);
    }
  }, []);

  /* Bloquer le scroll pendant l'écran d'entrée + vidéo */
  useEffect(() => {
    if (!hasStarted || showSplash) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [hasStarted, showSplash]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introPlayed', 'true');
    setShowSplash(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasStarted && (
          <EnterButton
            key="enter"
            onClick={() => setHasStarted(true)}
          />
        )}
        {hasStarted && showSplash && (
          <>
            <VideoSplashLoader
              key="splash"
              muted={false}
              onComplete={handleIntroComplete}
            />
            <button
              onClick={handleIntroComplete}
              className="absolute bottom-8 right-12 text-xs text-slate-500 hover:text-white tracking-widest uppercase transition-colors z-[99999]"
            >
              Passer l&apos;animation
            </button>
          </>
        )}
      </AnimatePresence>

      {/* Portfolio visible uniquement après la fin de la vidéo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasStarted && !showSplash ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </>
  );
}
