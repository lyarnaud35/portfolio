'use client';

import ContactModal from '@/components/ui/ContactModal';
import NavBar from '@/components/ui/NavBar';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col relative pb-16 md:pb-12">

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
            26&nbsp;ans&nbsp;—&nbsp;Post-production audio
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
            Ingénieur du son, mixeur et sound designer, je prends en charge l&apos;intégralité de la
            post-production audio de vos projets. Émission télévisée, animation, création digitale,
            podcast ou identité sonore : j&apos;adapte mon savoir-faire à tous les formats pour donner
            une véritable dimension narrative à vos contenus.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
            Je collabore régulièrement avec la société de production <strong className="font-semibold text-white">Eden Prod</strong> sur
            des émissions de flux diffusées sur <strong className="font-semibold text-white">France Télévisions</strong>
            {' '}(France&nbsp;3, France&nbsp;5). Travailler sur ces formats m&apos;a appris l&apos;essentiel
            du métier : savoir allier créativité, efficacité et respect strict des normes broadcast, même
            avec des délais très serrés.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
            Si la télévision exige une grande rigueur, mon travail s&apos;appuie tout autant sur une
            culture musicale vivante, enrichie par mon expérience des scènes de festivals et un passage
            aux studios <strong className="font-semibold text-white">Red Bull Paris</strong>. Certifié{' '}
            <strong className="font-semibold text-white">Pro Tools</strong>, je garde toujours la même
            philosophie : la technique doit s&apos;effacer pour sublimer l&apos;image et l&apos;émotion.
          </p>

          <p className="text-slate-300 text-lg leading-relaxed font-light">
            Enfin, curieux de nature et doté d&apos;un bagage en informatique, j&apos;ai entièrement conçu
            et développé ce portfolio sur-mesure. Une autre façon pour moi de conjuguer technique et
            créativité.
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

      <div className="relative block w-full text-center mt-12 pb-6 text-[10px] uppercase tracking-[0.2em] text-white/50 pointer-events-none md:absolute md:bottom-6 md:right-6 md:mt-0 md:pb-0 md:text-right md:w-auto">
        Design &amp; Code : Arnaud Ly
      </div>
    </div>
  );
}
