'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoHeroProps {
  src: string;
  subtitle: string;
}

export default function VideoHero({ src, subtitle }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
    // Tiny delay so CSS transitions fire after first paint
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className='relative w-full h-screen overflow-hidden'>
      <style>{`
        @keyframes slideFromLeft {
          from { transform: translateX(-8vw); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideFromRight {
          from { transform: translateX(8vw);  opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(12px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .hero-adam {
          animation: slideFromLeft 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
        .hero-thor {
          animation: slideFromRight 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }
        .hero-sub {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s both;
        }
        .hero-scroll {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s both;
        }
      `}</style>

      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className='absolute inset-0 w-full h-full object-cover object-top'
      />

      {/* Overlay */}
      <div
        className='absolute inset-0'
        style={{ background: 'linear-gradient(to bottom, rgba(7,7,7,0.35) 0%, rgba(7,7,7,0.5) 50%, rgba(7,7,7,0.88) 100%)' }}
      />

      {/* Text block */}
      <div className='absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16 lg:px-24'>
        {/* ADAM — solid cream, left-aligned */}
        <div
          className={`hero-adam leading-none select-none`}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(5.5rem, 16vw, 15rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: '#EDE8E0',
            lineHeight: 0.9,
          }}
        >
          ADAM
        </div>

        {/* THOR — outlined gold, pushed right */}
        <div
          className={`hero-thor leading-none select-none`}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(5.5rem, 16vw, 15rem)',
            fontWeight: 300,
            letterSpacing: '-0.03em',
            color: 'transparent',
            WebkitTextStroke: '1.5px #C5A05A',
            lineHeight: 0.9,
            paddingLeft: 'clamp(2rem, 8vw, 10rem)',
          }}
        >
          THOR
        </div>

        {/* Subtitle */}
        <div
          className='hero-sub mt-8 flex items-center gap-4'
        >
          <div style={{ width: '32px', height: '1px', background: '#C5A05A' }} />
          <span style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#C5A05A',
          }}>
            {subtitle}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2'>
        <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', color: '#575757', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <svg width='16' height='16' viewBox='0 0 24 24' fill='none'>
          <path d='M12 5v14M6 13l6 6 6-6' stroke='#575757' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </div>
    </section>
  );
}
