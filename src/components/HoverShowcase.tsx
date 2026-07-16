'use client';

import { ShowcaseProject, getPosterUrl, getVideoUrl, showcaseProjects } from '@/data/showcase';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ContactModal from './ui/ContactModal';
import NavBar from './ui/NavBar';

/** Lecteur mobile : load + play uniquement au montage (après clic projet) */
function MobileProjectVideo({
  project,
  isMuted,
  onTimeUpdate,
}: {
  project: ShowcaseProject;
  isMuted: boolean;
  onTimeUpdate: (e: React.SyntheticEvent<HTMLVideoElement>, endAt?: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.volume = project.volume ?? 1.0;
    video.src = getVideoUrl(project.videoFileName);
    video.load();
    video.play().catch(() => {});

    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id, project.videoFileName]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <video
      ref={videoRef}
      preload="none"
      loop
      playsInline
      muted={isMuted}
      onTimeUpdate={(e) => onTimeUpdate(e, project.endAt)}
      className="absolute inset-0 h-full w-full object-cover bg-black"
    />
  );
}

export default function HoverShowcase() {
  const [activeProject, setActiveProject] = useState<ShowcaseProject>(showcaseProjects[0]);
  const [isFading,      setIsFading]      = useState(false);
  const [isMuted,       setIsMuted]       = useState(true);
  const [contactOpen,   setContactOpen]   = useState(false);
  const [isMobile,      setIsMobile]      = useState(false);
  const [hasMounted,    setHasMounted]    = useState(false);
  const [hasInteracted, setHasInteracted] = useState(true); // 1er projet actif + vidéo dès l'ouverture

  const fadeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef   = useRef<HTMLVideoElement>(null);

  /* Montage client + détection mobile */
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    setHasMounted(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Hook 1 — Charge/lit le projet actif (1er projet dès le montage, puis au hover/clic) */
  useEffect(() => {
    if (!hasMounted || isMobile || !hasInteracted) return;

    const video = mainVideoRef.current;
    if (!video || !activeProject) return;

    video.pause();
    video.muted = isMuted;
    video.volume = activeProject.volume ?? 1.0;
    video.preload = 'auto';
    video.src = getVideoUrl(activeProject.videoFileName);
    video.load();

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        /* Lecture interrompue par un survol suivant — ignoré */
      });
    }

    const bg = bgVideoRef.current;
    if (bg) {
      bg.pause();
      bg.muted = true;
      bg.preload = 'auto';
      bg.src = getVideoUrl(activeProject.videoFileName);
      bg.load();
      bg.play().catch(() => {});
    }

    return () => {
      video.pause();
      if (bgVideoRef.current) bgVideoRef.current.pause();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject, hasMounted, isMobile, hasInteracted]);

  /* Hook 2 — Mute uniquement (pas de reload) */
  useEffect(() => {
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleVideoTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>, endAt?: number) => {
      if (!endAt) return;
      const video = e.currentTarget;
      if (video.currentTime >= endAt) video.currentTime = 0;
    },
    [],
  );

  /* ── Hover debouncé 180 ms + fade-to-black avant tout changement ── */
  const handleMouseEnter = useCallback((project: ShowcaseProject) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setHasInteracted(true);
      if (project.id === activeProject.id) return;
      if (fadeTimer.current) clearTimeout(fadeTimer.current);

      setIsFading(true);
      fadeTimer.current = setTimeout(() => {
        setActiveProject(project);
      }, 300);
    }, 180);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProject.id]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  /* Tap mobile : sélection immédiate (pas de hover) */
  const handleProjectSelect = useCallback((project: ShowcaseProject) => {
    setHasInteracted(true);
    if (project.id === activeProject.id) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    setIsFading(true);
    fadeTimer.current = setTimeout(() => {
      setActiveProject(project);
    }, 300);
  }, [activeProject.id]);

  const isVertical = activeProject.isVertical ?? false;
  const activePoster = activeProject.posterFileName
    ? getPosterUrl(activeProject.posterFileName)
    : undefined;

  return (
    <div className="relative min-h-screen w-full overflow-y-auto bg-[#050505] text-white lg:h-screen lg:overflow-hidden">

      {/* ── Header ── */}
      <header className="absolute top-0 z-50 flex w-full flex-col items-start gap-5 p-6 lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:p-12">
        <div>
          <p
            className="font-extrabold uppercase leading-none tracking-tight text-white"
            style={{
              fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Portfolio
          </p>
          <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500 lg:text-xs">
            Mixage&nbsp;·&nbsp;Sound Design&nbsp;·&nbsp;Post-Production Audio
          </p>
        </div>
        <div className="pt-0 lg:pt-1">
          <NavBar onContactOpen={() => setContactOpen(true)} />
        </div>
      </header>

      {/* ── Split ── */}
      <main className="flex h-full w-full flex-col lg:flex-row">

        {/* Fond Studio */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[40vw] h-[60vh] bg-[#a855f7] opacity-30 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_100%)]" />
        </div>

        {/* ── Gauche : liste ── */}
        <div className="relative z-10 flex w-full flex-col items-start justify-start pb-16 pl-6 pr-6 pt-44 lg:h-full lg:w-[45%] lg:justify-center lg:pb-8 lg:pl-16 lg:pr-6 lg:pt-40">
          <div className="mt-4 flex w-full flex-col lg:mt-12">
            <h3 className="mb-6 ml-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#a855f7] lg:mb-8 lg:ml-6">
              Post-Production Audiovisuelle
            </h3>
            <ul className="relative flex flex-col border-l-[2px] border-white/10">
              {showcaseProjects.map((project) => {
                const isActive = project.id === activeProject.id;
                return (
                  <li
                    key={project.id}
                    className="relative flex flex-col py-3 pl-5 lg:py-4 lg:pl-6"
                  >
                    {isActive && (
                      <div className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-[#a855f7] shadow-[0_0_15px_3px_rgba(168,85,247,0.8)] z-10" />
                    )}

                    {/* Titre — hitbox réduite au texte */}
                    <span
                      onMouseEnter={() => handleMouseEnter(project)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleProjectSelect(project)}
                      className={`inline-block w-fit cursor-pointer font-extrabold uppercase leading-none transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-white/20 hover:text-white/40'
                      }`}
                      style={{
                        fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
                        fontSize: 'clamp(1.15rem, 2.2vw, 2.4rem)',
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {project.title}
                    </span>

                    {/* Lecteur accordéon — mobile + projet actif + après clic */}
                    {hasMounted && isActive && isMobile && hasInteracted && (
                      <div className="mt-3 flex flex-col gap-3">
                        {/* Métadonnées */}
                        <div className="flex flex-col gap-0.5">
                          <p className="text-[10px] uppercase tracking-widest text-[#a855f7]">
                            {project.client}&nbsp;·&nbsp;{project.category}
                          </p>
                          <p className="text-[10px] uppercase tracking-wider text-white/40">
                            {project.roles}
                          </p>
                        </div>
                        {/* Conteneur vidéo dynamique — 9:16 si vertical, 16:9 sinon */}
                        <div
                          className={`relative w-full overflow-hidden rounded-lg border border-white/10 bg-black shadow-lg ${
                            project.isVertical
                              ? 'mx-auto aspect-[9/16] max-w-[260px]'
                              : 'aspect-video'
                          }`}
                        >
                          <MobileProjectVideo
                            project={project}
                            isMuted={isMuted}
                            onTimeUpdate={handleVideoTimeUpdate}
                          />
                          {/* Bouton son mobile */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsMuted(!isMuted);
                            }}
                            className="absolute bottom-3 right-3 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white backdrop-blur-sm transition-all hover:bg-black/90"
                          >
                            {isMuted ? (
                              <>
                                <VolumeX size={12} />
                                Activer le son
                              </>
                            ) : (
                              <>
                                <Volume2 size={12} />
                                Couper le son
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Droite : lecteur vidéo — desktop uniquement (!isMobile = hors du DOM sur mobile) ── */}
        {hasMounted && !isMobile && (
          <div className="relative z-10 hidden h-full w-full items-center justify-center lg:flex lg:w-[55%]">

            {/* Voile de fusion gauche */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
              style={{ background: 'linear-gradient(to right, #050505 0%, transparent 100%)' }}
            />

            {/* Conteneur vidéo */}
            <div className="relative z-0 w-full px-6 lg:px-8" style={{ maxHeight: '90vh' }}>
              <div
                className={`relative w-full overflow-hidden rounded-xl border border-[#a855f7]/30 shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-opacity duration-300 ${
                  isFading ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ aspectRatio: '16/9' }}
              >
                {/* Fond ambilight — stable, piloté par useEffect (src uniquement après interaction) */}
                <video
                  ref={bgVideoRef}
                  preload="none"
                  loop
                  muted
                  playsInline
                  poster={activePoster}
                  onTimeUpdate={(e) => handleVideoTimeUpdate(e, activeProject.endAt)}
                  className={`absolute inset-0 w-full h-full object-cover blur-3xl pointer-events-none scale-110 transition-all duration-700 ${
                    isVertical ? 'opacity-40' : 'opacity-0'
                  }`}
                />

                {/* Lecteur principal — stable, SANS src jusqu'au premier hover */}
                <video
                  ref={mainVideoRef}
                  preload="none"
                  loop
                  playsInline
                  poster={activePoster}
                  onLoadedData={() => setIsFading(false)}
                  onTimeUpdate={(e) => handleVideoTimeUpdate(e, activeProject.endAt)}
                  className={`relative z-10 w-full h-full transition-all duration-300 ${
                    isVertical ? 'object-contain' : 'object-cover'
                  }`}
                />

                <div className="absolute inset-0 z-20 bg-black/20 pointer-events-none" />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  {isMuted ? 'Activer le son' : 'Couper le son'}
                </button>
              </div>
            </div>

            {/* Méta bas-droite */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id + '-meta'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-12 right-12 z-30 text-right"
              >
                <p
                  className="font-bold uppercase tracking-wide text-white"
                  style={{
                    fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.4rem, 2vw, 1.875rem)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {activeProject.title}
                </p>
                <p className="mt-2 text-xs uppercase tracking-widest text-[#a855f7]">
                  {activeProject.client}&nbsp;·&nbsp;{activeProject.category}&nbsp;·&nbsp;{activeProject.roles}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
