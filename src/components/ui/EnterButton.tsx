'use client';

import { motion } from 'framer-motion';

export interface EnterButtonProps {
  onClick: () => void;
}

export default function EnterButton({ onClick }: EnterButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505]"
    >
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.97 }}
        className="group cursor-pointer bg-transparent px-6 py-4 uppercase text-white/40 transition-colors duration-300 hover:text-white hover:drop-shadow-[0_0_10px_#a855f7]"
        style={{
          fontSize: '0.85rem',
          fontWeight: 500,
          letterSpacing: '0.2em',
        }}
      >
        Entrer dans le studio
      </motion.button>
    </motion.div>
  );
}
