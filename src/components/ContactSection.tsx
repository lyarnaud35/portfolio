'use client';

import { motion } from 'framer-motion';
import { GitFork, Link2, Mail } from 'lucide-react';

const SOCIALS = [
  { label: 'Email', href: 'mailto:arnaud@example.com', icon: Mail },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/arnaud-ly', icon: Link2 },
  { label: 'GitHub', href: 'https://github.com/arnaud-ly', icon: GitFork },
];

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="mb-3 font-mono text-xs tracking-[0.4em] text-[#00f5ff] uppercase">Contact</p>
        <h2 className="mb-4 text-4xl font-bold text-[#e2e8f0] sm:text-5xl">
          Travaillons ensemble
        </h2>
        <p className="mx-auto mb-12 max-w-md text-sm leading-relaxed text-[#64748b]">
          Projet audiovisuel, architecture logicielle, ou les deux à la fois —
          discutons-en.
        </p>

        <div className="flex items-center justify-center gap-4">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0f0f1a] px-5 py-3 text-sm text-[#64748b] transition-colors duration-200 hover:border-[#00f5ff]/30 hover:text-[#00f5ff]"
            >
              <Icon size={15} />
              {label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Séparateur bas de page */}
      <div className="mt-24 border-t border-white/5 pt-8 text-center font-mono text-xs text-[#64748b]">
        © {new Date().getFullYear()} Arnaud Ly · Sculpteur de son & Architecte Logiciel
      </div>
    </section>
  );
}
