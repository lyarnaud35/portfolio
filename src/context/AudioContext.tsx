'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

interface Track {
  src: string;
  title: string;
  artist?: string;
}

interface AudioContextValue {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  play: (track: Track) => void;
  pause: () => void;
  toggle: () => void;
  seek: (pct: number) => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const getAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) {
      const el = new Audio();
      el.addEventListener('timeupdate', () => {
        if (el.duration) setProgress(el.currentTime / el.duration);
      });
      el.addEventListener('loadedmetadata', () => setDuration(el.duration));
      el.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const play = useCallback(
    (track: Track) => {
      const audio = getAudio();
      if (currentTrack?.src !== track.src) {
        audio.src = track.src;
        setCurrentTrack(track);
        setProgress(0);
      }
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    },
    [currentTrack, getAudio],
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else if (currentTrack) play(currentTrack);
  }, [isPlaying, currentTrack, play, pause]);

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = pct * audio.duration;
    }
  }, []);

  return (
    <AudioCtx.Provider
      value={{ currentTrack, isPlaying, progress, duration, play, pause, toggle, seek }}
    >
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio doit être utilisé dans <AudioProvider>');
  return ctx;
}
