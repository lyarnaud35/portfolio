'use client';

import ContactModal from '@/components/ui/ContactModal';
import NavBar from '@/components/ui/NavBar';
import VideoModal from '@/components/ui/VideoModal';
import { getProjectVideoUrl, projects } from '@/data/projects';
import { useState } from 'react';

export default function DemosPage() {
  const [contactOpen,   setContactOpen]   = useState(false);
  const [videoOpen,     setVideoOpen]     = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const openVideo = (index: number) => {
    setSelectedIndex(index);
    setVideoOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col">

      {/* Fond Studio */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute right-1/3 top-1/2 -translate-y-1/2 w-[40vw] h-[40vh] bg-[#a855f7] opacity-10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050505_100%)]" />
      </div>

      {/* Nav */}
      <header className="absolute top-0 right-0 z-50 flex w-full justify-center p-6 lg:justify-end lg:p-12">
        <NavBar onContactOpen={() => setContactOpen(true)} />
      </header>

      {/* Contenu principal */}
      <main className="relative z-10 flex-1 w-full">
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 pt-32 pb-20">

          {/* Titre */}
          <h1
            className="font-extrabold uppercase leading-none tracking-tight text-white mb-8 -mt-8 md:-mt-16"
            style={{
              fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            }}
          >
            DÉMOS & PROJETS
          </h1>

          {/* Séparateur */}
          <div className="border-b border-white/10 mb-8" />

          {/* Grille */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group flex flex-col cursor-pointer"
                onClick={() => openVideo(index)}
              >
                {/* Miniature vidéo en lecture silencieuse */}
                <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] transition-all duration-300 group-hover:border-[#a855f7] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                  <video
                    src={getProjectVideoUrl(project.videoFileName)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay sombre */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                  {/* Bouton Play */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center backdrop-blur-sm bg-black/20">
                      <svg className="w-5 h-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Métadonnées */}
                <div className="mt-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-1">
                    {project.category}
                  </p>
                  <p
                    className="font-bold uppercase leading-tight tracking-tight text-white mb-1 text-sm"
                    style={{ fontFamily: "'Clash Display', 'Space Grotesk', sans-serif" }}
                  >
                    {project.title}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gray-400 leading-tight">
                    {project.roles}
                    <br />
                    {project.client}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        projects={projects}
        initialIndex={selectedIndex}
      />
    </div>
  );
}
