'use client';

import { useEffect, useRef } from 'react';

export interface VideoSplashProps {
  onComplete: () => void;
  muted?: boolean;
}

export default function VideoSplashLoader({ onComplete, muted = false }: VideoSplashProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    video.play().catch(console.error);
  }, [muted]);

  return (
    <video
      ref={videoRef}
      src="/splash-intro.mp4"
      autoPlay
      muted={muted}
      playsInline
      onEnded={onComplete}
      className="h-full w-full object-cover"
    />
  );
}
