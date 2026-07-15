'use client';

import { Project, getProjectVideoUrl } from '@/data/projects';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface VideoModalProps {
  isOpen:       boolean;
  onClose:      () => void;
  projects:     Project[];
  initialIndex: number;
}

export default function VideoModal({ isOpen, onClose, projects, initialIndex }: VideoModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [isOpen, initialIndex]);

  /* Chargement stable sans remontage du <video> */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    video.pause();
    video.load();

    const promise = video.play();
    if (promise !== undefined) {
      promise.catch((err) => console.warn('Autoplay empêché :', err));
    }
  }, [isOpen, currentIndex]);

  const handlePrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setCurrentIndex((i) => Math.min(projects.length - 1, i + 1));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape')     onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentIndex]);

  const current  = projects[currentIndex];
  const hasPrev  = currentIndex > 0;
  const hasNext  = currentIndex < projects.length - 1;
  const vertical = current?.isVertical ?? false;

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl px-4 md:px-20"
          onClick={onClose}
        >
          {/* Fermer */}
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="fixed top-6 right-6 z-[10001] text-white/50 hover:text-white transition-colors duration-200"
          >
            <X size={26} />
          </button>

          {/* Flèche gauche */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              aria-label="Projet précédent"
              className="fixed left-2 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={20} className="md:hidden" />
              <ChevronLeft size={28} className="hidden md:block" />
            </button>
          )}

          {/* Flèche droite */}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              aria-label="Projet suivant"
              className="fixed right-2 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronRight size={20} className="md:hidden" />
              <ChevronRight size={28} className="hidden md:block" />
            </button>
          )}

          {/* Contenu centré */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-full max-w-6xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lecteur vidéo */}
            <div
              className={`relative mx-auto w-full overflow-hidden rounded-xl bg-black shadow-[0_0_60px_rgba(168,85,247,0.12)] ${
                vertical ? 'flex items-center justify-center' : 'aspect-video'
              }`}
              style={vertical ? { aspectRatio: '16/9' } : undefined}
            >
              {/* Fond ambilight pour vidéos verticales */}
              {vertical && (
                <video
                  src={getProjectVideoUrl(current.videoFileName)}
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 pointer-events-none scale-110"
                />
              )}
              {/* Lecteur principal */}
              <video
                ref={videoRef}
                src={getProjectVideoUrl(current.videoFileName)}
                controls
                autoPlay
                playsInline
                className={`relative z-10 h-full ${
                  vertical ? 'object-contain mx-auto' : 'w-full object-contain md:object-cover'
                }`}
              />
            </div>

            {/* Métadonnées */}
            <div className="mt-4 flex items-start justify-between px-4 py-2 md:mt-5 md:px-0.5 md:py-0">
              <div>
                <p
                  className="text-base font-bold text-white mb-1 md:text-xl"
                  style={{ fontFamily: "'Clash Display', 'Space Grotesk', sans-serif" }}
                >
                  {current.title}
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-widest md:text-sm">
                  {current.client}&nbsp;·&nbsp;{current.roles}
                </p>
              </div>
              <p className="font-mono text-xs text-white/25 shrink-0 ml-4 pt-1">
                {currentIndex + 1}&nbsp;/&nbsp;{projects.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
