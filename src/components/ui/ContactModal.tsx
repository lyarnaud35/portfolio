'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const CONTACTS = [
  {
    label: 'Email',
    value: 'lyarnaud35@gmail.com',
    href: 'mailto:lyarnaud35@gmail.com',
    icon: (
      <svg className="w-7 h-7 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
      </svg>
    ),
  },
  {
    label: 'Téléphone',
    value: '06 62 31 30 27',
    href: 'tel:+33662313027',
    icon: (
      <svg className="w-7 h-7 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Arnaud Ly',
    href: 'https://www.linkedin.com/in/arnaud-ly-5b54a6232',
    icon: (
      <svg className="w-7 h-7 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-md border border-white/20 rounded-2xl p-10 md:p-14 shadow-[0_0_90px_0px_rgba(168,85,247,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermeture */}
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors duration-200"
            >
              <X size={24} />
            </button>

            {/* Titre */}
            <h2
              className="font-extrabold uppercase leading-none tracking-tighter text-white mb-12"
              style={{
                fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              }}
            >
              Contact
            </h2>

            {/* Liens */}
            <div className="flex flex-col gap-10">
              {CONTACTS.map(({ label, value, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-6 text-gray-300 transition-all duration-300 hover:text-[#a855f7] hover:translate-x-2"
                >
                  <span className="transition-colors duration-300">{icon}</span>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-1 group-hover:text-[#a855f7]/60 transition-colors duration-300">
                      {label}
                    </span>
                    <span
                      className="font-light leading-none"
                      style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
                    >
                      {value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
