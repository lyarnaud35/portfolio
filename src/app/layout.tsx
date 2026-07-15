import PersistentPlayer from '@/components/PersistentPlayer';
import { AudioProvider } from '@/context/AudioContext';
import type { Metadata } from 'next';
import { Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Arnaud Ly — Mixeur & Sound Designer',
  description:
    "Portfolio d'Arnaud Ly : mixeur son, sound designer (France 5, France Bleu), ProTools certifié.",
  openGraph: {
    title: 'Arnaud Ly — Portfolio',
    description: 'Mixage · Sound Design · Post-Production Audio',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Clash Display — Fontshare CDN (600 + 700) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@600,700&display=swap"
        />
      </head>
      <body
        className="min-h-full"
        style={{ fontFamily: 'var(--font-space), system-ui, sans-serif' }}
      >
        <AudioProvider>
          {children}
          <PersistentPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
