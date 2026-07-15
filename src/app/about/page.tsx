'use client';

import ContactModal from '@/components/ui/ContactModal';
import NavBar from '@/components/ui/NavBar';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col relative pb-12">

      {/* ── Header : navigation seule ── */}
      <header className="absolute top-0 right-0 z-50 flex w-full justify-center p-6 lg:justify-end lg:p-12">
        <NavBar onContactOpen={() => setContactOpen(true)} />
      </header>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* ── Main : split 50/50 ── */}
      <main className="flex-1 flex flex-col md:flex-row w-full pt-32 pb-12 px-12 md:px-24 gap-20">

        {/* ── Colonne gauche : texte ── */}
        <div className="w-full md:w-1/2 flex flex-col justify-start -mt-8 md:-mt-16">

          <h1
            className="font-extrabold uppercase leading-none tracking-tighter text-white mb-1"
            style={{
              fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
            }}
          >
            ARNAUD LY
          </h1>

          <p className="text-sm uppercase tracking-widest text-[#a855f7] mb-6">
            Ingénieur du son&nbsp;·&nbsp;Mixeur &amp; Sound Designer
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-4 font-light">
            Ingénieur du son et mixeur, je prends en charge l&apos;intégralité de la post-production
            sonore de vos projets, du documentaire à la fiction en passant par le magazine.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-4 font-light">
            Depuis trois ans, je travaille régulièrement comme intermittent avec des sociétés comme{' '}
            <span className="font-semibold text-white">Eden Prod</span> ou{' '}
            <span className="font-semibold text-white">France TV</span>. Concrètement, j&apos;assure
            le mixage, le sound design et les enregistrements pour des émissions quotidiennes et
            hebdomadaires (sur France&nbsp;3 et France&nbsp;5). Le flux télévisuel m&apos;a appris
            une chose essentielle : savoir allier créativité, efficacité et respect strict des normes
            broadcast, même avec des délais serrés.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-4 font-light">
            En parallèle de la télé, j&apos;aime varier les terrains de jeu. Je mixe et design des
            podcasts, des vidéos promotionnelles ou des formats courts taillés pour le web et les
            réseaux sociaux.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed font-light">
            J&apos;ai fait mes premières armes au studio{' '}
            <span className="font-semibold text-white">Red Bull Paris</span>, ce qui m&apos;a donné
            une solide culture technique et musicale. Aujourd&apos;hui certifié{' '}
            <span className="font-semibold text-white">ProTools</span>, mon approche reste la même
            sur chaque projet : maîtriser la technique pour qu&apos;elle s&apos;efface, et que le son
            serve l&apos;image, tout simplement.
          </p>
        </div>

        {/* ── Colonne droite : photo ── */}
        <div className="self-center w-full md:w-1/2 relative h-[65vh] min-h-[500px] max-h-[650px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_-15px_rgba(168,85,247,0.15)] grayscale hover:grayscale-0 transition-all duration-700">
          <Image
            alt="Portrait Arnaud Ly"
            className="object-cover object-[80%_center] hover:scale-105 transition-transform duration-700"
            fill
            priority
            sizes="50vw"
            src="/image/photo perso.jpg"
          />
        </div>

      </main>
    </div>
  );
}
