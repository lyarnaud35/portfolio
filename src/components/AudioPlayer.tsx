'use client';

import { useAudio } from '@/context/AudioContext';
import { motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
  artist?: string;
}

export default function AudioPlayer({ src, title, artist }: AudioPlayerProps) {
  const { play, pause, isPlaying, currentTrack, progress, seek } = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<import('wavesurfer.js').default | null>(null);
  const [wsReady, setWsReady] = useState(false);
  const [wsProgress, setWsProgress] = useState(0);

  const isActive = currentTrack?.src === src;

  // Initialisation wavesurfer uniquement si visible
  useEffect(() => {
    if (!waveRef.current) return;

    let ws: import('wavesurfer.js').default;

    import('wavesurfer.js').then(({ default: WaveSurfer }) => {
      ws = WaveSurfer.create({
        container: waveRef.current!,
        waveColor: 'rgba(100,116,139,0.5)',
        progressColor: '#00f5ff',
        cursorColor: 'transparent',
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        height: 48,
        interact: false,
        url: src,
      });

      ws.on('ready', () => setWsReady(true));
      ws.on('timeupdate', (t) => {
        if (ws.getDuration()) setWsProgress(t / ws.getDuration());
      });

      wsRef.current = ws;
    });

    return () => {
      ws?.destroy();
      wsRef.current = null;
      setWsReady(false);
    };
  }, [src]);

  // Synchroniser wavesurfer avec le lecteur global
  useEffect(() => {
    const ws = wsRef.current;
    if (!ws || !wsReady || !isActive) return;
    ws.seekTo(Math.min(Math.max(progress, 0), 1));
  }, [progress, wsReady, isActive]);

  const handleToggle = useCallback(() => {
    if (isActive && isPlaying) {
      pause();
    } else {
      play({ src, title, artist });
    }
  }, [isActive, isPlaying, play, pause, src, title, artist]);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      if (isActive) seek(pct);
      else play({ src, title, artist });
    },
    [isActive, seek, play, src, title, artist],
  );

  const displayProgress = isActive ? progress : wsProgress;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 p-5"
      style={{ background: 'rgba(15,15,26,0.8)' }}
    >
      {/* Halo actif */}
      {isActive && isPlaying && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(0,245,255,0.2), 0 0 40px rgba(0,245,255,0.06)' }}
        />
      )}

      {/* En-tête */}
      <div className="mb-4 flex items-center justify-between">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-[#e2e8f0]">{title}</h3>
          {artist && (
            <p className="truncate text-xs text-[#64748b]">{artist}</p>
          )}
        </div>

        <button
          onClick={handleToggle}
          aria-label={isActive && isPlaying ? 'Pause' : 'Lecture'}
          className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#00f5ff]/25 bg-[#00f5ff]/10 text-[#00f5ff] transition-all duration-200 hover:bg-[#00f5ff]/25 hover:shadow-[0_0_16px_#00f5ff44]"
        >
          {isActive && isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>

      {/* Waveform wavesurfer */}
      <div
        ref={waveRef}
        onClick={handleSeek}
        className="cursor-pointer"
      />

      {/* Barre de fallback pendant le chargement */}
      {!wsReady && (
        <div className="h-12 overflow-hidden rounded-sm">
          <div className="flex h-full items-center gap-0.5">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-white/10"
                style={{ height: `${30 + Math.sin(i * 0.5) * 25 + Math.random() * 20}%` }}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
