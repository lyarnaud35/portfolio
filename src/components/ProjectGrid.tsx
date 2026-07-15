'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

/* ─── Types ─── */
interface Project {
  id:        string;
  index:     string;
  title:     string;
  subtitle:  string;
  category:  string;
  year:      string;
  colSpan:   1 | 2;
  href?:     string;
  imageSrc?: string;
}

/* ─── Master Card data ─── */
const TV_TRACKLIST = [
  { title: 'C PAS SI LOIN',      genre: 'Magazine'           },
  { title: 'C SUCCULENT',        genre: 'Gastronomie'        },
  { title: 'ICI MATIN',          genre: 'Matinale'           },
  { title: 'COMEDY QUEER',       genre: 'Divertissement'     },
  { title: 'CHEF PAYS',          genre: 'Gastronomie'        },
  { title: 'OUTREMER.STORY',     genre: 'Documentaire'       },
  { title: 'OUTREMER.LE MAG',    genre: 'Magazine'           },
  { title: 'BRAME DU CERF',      genre: 'Slow TV & Podcasts' },
];

/* ─── Projets secondaires ─── */
const SECONDARY_PROJECTS: Project[] = [
  {
    id: 'fightbar',    index: 'PROJECT_02', title: 'FIGHTBAR ANIME',
    subtitle: 'Sound Design & Mixage Animation', category: 'Animation', year: '2023', colSpan: 1,
  },
  {
    id: 'francebleu',  index: 'PROJECT_03', title: 'FRANCE BLEU',
    subtitle: 'Mixage Bande Annonce',        category: 'Radio / TV', year: '2024', colSpan: 1,
  },
  {
    id: 'blessures',   index: 'PROJECT_04', title: 'PARLE MOI DE TES BLESSURES',
    subtitle: 'Court-métrage / Fiction',     category: 'Cinéma',    year: '2024', colSpan: 1,
  },
  {
    id: 'arcane',      index: 'PROJECT_05', title: 'ARCANE AMV',
    subtitle: 'Post-Production Audio',       category: 'AMV',       year: '2025', colSpan: 1,
  },
  {
    id: 'transparence', index: 'PROJECT_06', title: 'EN TOUTE TRANSPARENCE',
    subtitle: 'Fiction Live Action',          category: 'Fiction',   year: '2025', colSpan: 1,
  },
];

/* ─── Variants ─── */
const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ─── Master Card (col-span-2) ─── */
function MasterCard() {
  const [hovered, setHovered] = useState(false);
  const [spot,    setSpot]    = useState({ x: 50, y: 50 });

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);

  return (
    <motion.article
      variants={cardVariant}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={onMove}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="group relative flex cursor-default flex-col overflow-hidden rounded-2xl border border-white/10 p-6"
      style={{
        minHeight: 280,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: hovered
          ? '0 0 0 1px rgba(168,85,247,0.18), 0 8px 50px rgba(124,58,237,0.22), 0 -4px 24px rgba(168,85,247,0.10)'
          : '0 0 32px rgba(124,58,237,0.06), 0 -1px 12px rgba(168,85,247,0.04)',
      }}
    >
      {/* Spotlight — fond */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at ${spot.x}% ${spot.y}%, rgba(168,85,247,0.07) 0%, transparent 65%)`,
        }}
      />
      {/* Spotlight — bordure */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: '1px',
          background: `radial-gradient(300px circle at ${spot.x}% ${spot.y}%, rgba(168,85,247,0.38) 0%, transparent 65%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Image de fond avec overlay sombre/violet */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
        {/* Remplace src par ton image quand disponible */}
        {/* <Image src="/images/eden-prod.jpg" alt="Eden Productions" fill className="object-cover opacity-20" /> */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg,transparent,transparent 22px,rgba(168,85,247,0.025) 22px,rgba(168,85,247,0.025) 23px)',
          }}
        />
        {/* Overlay sombre 80% pour lisibilité */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(5,5,5,0.90) 0%, rgba(15,5,25,0.78) 60%, rgba(5,5,5,0.92) 100%)',
          }}
        />
      </div>

      {/* ── Contenu ── */}
      <div className="relative z-10 flex h-full flex-col gap-5">

        {/* En-tête */}
        <div className="flex items-start justify-between">
          <span className="font-mono text-[9px] tracking-[0.24em] text-white/20 uppercase">
            PROJECT_01
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[9px] tracking-[0.14em] text-white/30 uppercase"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.04)' }}
          >
            Eden Productions · 2022–2025
          </span>
        </div>

        {/* Titre + sous-titre */}
        <div>
          <h3 className="mb-1 text-[17px] font-extrabold uppercase leading-tight tracking-tight text-white/90">
            Post-Production TV & Flux
          </h3>
          <p className="text-[11px] font-light tracking-[0.08em] text-slate-600">
            3 années d&apos;expertise · Mixage & Sound Design
          </p>
        </div>

        {/* Tracklist en 2 colonnes */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 flex-1">
          {TV_TRACKLIST.map(({ title, genre }) => (
            <div key={title} className="flex items-baseline gap-1.5">
              <span className="min-w-0 truncate font-mono text-[10px] font-medium tracking-[0.06em] text-slate-300 uppercase">
                {title}
              </span>
              <span className="shrink-0 text-[9px] text-white/20">·</span>
              <span className="shrink-0 font-mono text-[9px] tracking-[0.05em] text-white/30 uppercase">
                {genre}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="https://eden-productions.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit items-center gap-2 cursor-pointer"
          animate={{ opacity: hovered ? 1 : 0.3, x: hovered ? 0 : -3 }}
          transition={{ duration: 0.22 }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="font-mono text-[10px] font-semibold tracking-[0.22em] text-[#a855f7] uppercase">
            Visiter le site de production
          </span>
          <motion.span
            animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            className="text-[#a855f7]"
          >
            <ArrowUpRight size={12} />
          </motion.span>
        </motion.a>
      </div>
    </motion.article>
  );
}

/* ─── Carte secondaire standard ─── */
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [spot,    setSpot]    = useState({ x: 50, y: 50 });

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);

  return (
    <motion.article
      variants={cardVariant}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={onMove}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-5"
      style={{
        minHeight: 185,
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: hovered
          ? '0 0 0 1px rgba(168,85,247,0.18), 0 8px 50px rgba(124,58,237,0.22), 0 -4px 24px rgba(168,85,247,0.10)'
          : '0 0 32px rgba(124,58,237,0.06), 0 -1px 12px rgba(168,85,247,0.04)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(300px circle at ${spot.x}% ${spot.y}%, rgba(168,85,247,0.08) 0%, transparent 65%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: '1px',
          background: `radial-gradient(260px circle at ${spot.x}% ${spot.y}%, rgba(168,85,247,0.40) 0%, transparent 65%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
        {project.imageSrc ? (
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            className="object-cover opacity-25 transition-opacity duration-500 group-hover:opacity-35"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg,transparent,transparent 22px,rgba(168,85,247,0.035) 22px,rgba(168,85,247,0.035) 23px)',
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg,rgba(5,5,5,0.88) 0%,rgba(5,5,5,0.60) 55%,rgba(5,5,5,0.82) 100%)' }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[9px] tracking-[0.24em] text-white/18 uppercase">{project.index}</span>
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[9px] tracking-[0.14em] text-white/28 uppercase"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.04)' }}
          >
            {project.category}
          </span>
        </div>

        <div>
          <motion.h3
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="mb-1 text-[15px] font-extrabold uppercase leading-tight tracking-tight text-white/90"
          >
            {project.title}
          </motion.h3>
          <p className="mb-4 text-[11px] font-light tracking-[0.08em] text-slate-600">{project.subtitle}</p>

          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: hovered ? 1 : 0.25, x: hovered ? 0 : -3 }}
            transition={{ duration: 0.22 }}
          >
            <span className="font-mono text-[10px] font-semibold tracking-[0.26em] text-[#a855f7] uppercase">
              Voir la vidéo
            </span>
            <motion.span
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="text-[#a855f7]"
            >
              <ArrowRight size={11} />
            </motion.span>
          </motion.div>

          <p className="mt-2.5 font-mono text-[9px] tracking-[0.16em] text-white/14">{project.year}</p>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Section ─── */
export default function ProjectGrid() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 pb-28 pt-0 sm:px-8">
      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {/* Master Card col-span-2 */}
        <div className="md:col-span-2">
          <MasterCard />
        </div>

        {/* Cartes secondaires */}
        {SECONDARY_PROJECTS.map((project) => (
          <div key={project.id} className="md:col-span-1">
            <ProjectCard project={project} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
