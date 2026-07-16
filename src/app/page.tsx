'use client';

import HoverShowcase from '@/components/HoverShowcase';
import { useEffect, useRef, useState } from 'react';

export default function HomePage() {
  const [step, setStep] = useState<'button' | 'video' | 'fading' | 'hidden'>('button');
  const [isCheckingMemory, setIsCheckingMemory] = useState(true);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef  = useRef<HTMLVideoElement>(null);
  const videoOpacity    = step === 'button' ? 'opacity-0' : 'opacity-100';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('introPlayed') === 'true') {
        setStep('hidden');
      }
      setIsCheckingMemory(false);
    }
  }, []);

  const startStudio = () => {
    setStep('video');

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    const desktop = desktopVideoRef.current;
    const mobile  = mobileVideoRef.current;

    // Déblocage audio via le clic utilisateur (requis sur mobile)
    if (desktop) desktop.muted = false;
    if (mobile)  mobile.muted  = false;

    const video = isDesktop ? desktop : mobile;
    video?.play().catch(err => console.error('Autoplay issue:', err));
  };

  const endIntro = () => {
    setStep('fading');
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('introPlayed', 'true');
    }
    setTimeout(() => setStep('hidden'), 2000);
  };

  return (
    <main className="relative min-h-screen bg-black">

      {/* Portfolio — toujours là, en dessous */}
      <div className="relative z-0">
        <HoverShowcase />
      </div>

      {/* Rideau d'intro — par-dessus, disparaît à la fin */}
      {step !== 'hidden' && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-[2000ms] ease-in-out ${
            step === 'fading' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Bouton + indication audio — masqué pendant la vérification sessionStorage */}
          {(!isCheckingMemory && step === 'button') && (
            <div className="absolute z-10 flex flex-col items-center gap-10">

              {/* Bouton pilule glassmorphism */}
              <button
                onClick={startStudio}
                className="group flex items-center gap-4 px-10 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-xs tracking-[0.3em] uppercase transition-all duration-700 ease-out hover:bg-white/10 hover:border-white/40 hover:text-white hover:scale-105 hover:tracking-[0.4em]"
              >
                {/* Voyant "Record" violet pulsant */}
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span>Entrer dans le studio</span>
              </button>

              {/* Indication audio */}
              <div className="flex items-center gap-3 text-white/30 text-[10px] tracking-[0.2em] uppercase">
                <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 10v4a2 2 0 002 2h2.586l3.707 3.707A.996.996 0 0015 19V5a.996.996 0 00-1.707-.707L9.586 8H7a2 2 0 00-2 2z" />
                </svg>
                <span>Montez le volume</span>
              </div>

            </div>
          )}

          {/* Intro desktop — horizontal */}
          <video
            ref={desktopVideoRef}
            src="/splash-intro.mp4"
            muted={step === 'button'}
            playsInline
            className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoOpacity}`}
            onEnded={endIntro}
          />

          {/* Intro mobile — vertical */}
          <video
            ref={mobileVideoRef}
            src="/splash-intro-mobile.mp4"
            muted={step === 'button'}
            playsInline
            className={`block md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoOpacity}`}
            onEnded={endIntro}
          />

          {/* Voile mobile uniquement */}
          <div className="absolute inset-0 block md:hidden bg-black/40 pointer-events-none" />
        </div>
      )}
    </main>
  );
}
