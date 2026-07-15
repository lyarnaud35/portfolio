'use client';

import AudioPlayer from './AudioPlayer';
import { motion } from 'framer-motion';

const TRACKS = [
  {
    src: '/audio/showreel-2024.mp3',
    title: 'Showreel 2024',
    artist: 'Arnaud Ly — Sound Design & Mixage',
  },
  {
    src: '/audio/france5-generique.mp3',
    title: 'France 5 — Générique',
    artist: 'Post-production TV',
  },
  {
    src: '/audio/redbull-session.mp3',
    title: 'Red Bull Studio Session',
    artist: 'Recording Live',
  },
];

export default function ShowreelSection() {
  return (
    <section id="showreel" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="mb-2 font-mono text-xs tracking-[0.4em] text-[#00f5ff] uppercase">Audio</p>
        <h2 className="text-3xl font-bold text-[#e2e8f0] sm:text-4xl">Showreel & Mixages TV</h2>
        <p className="mt-3 max-w-xl text-sm text-[#64748b]">
          Extraits de post-production audiovisuelle — génériques, sound design, sessions studio.
          Le lecteur persiste lors de la navigation entre les pages.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TRACKS.map((track) => (
          <AudioPlayer key={track.src} {...track} />
        ))}
      </div>
    </section>
  );
}
