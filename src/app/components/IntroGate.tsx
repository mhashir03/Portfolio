'use client';

import React, { useEffect, useState } from 'react';

const NAME = 'HASHIR';
const TYPE_MS = 180;   // delay between letters
const HOLD_MS = 300;   // pause once fully typed
const EXIT_MS = 600;   // overlay fade-out duration

type Phase = 'typing' | 'exiting' | 'done';

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setTyped(NAME);
      setPhase('done');
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const timers: number[] = [];
    let i = 0;
    const typeTimer = window.setInterval(() => {
      i += 1;
      setTyped(NAME.slice(0, i));
      if (i >= NAME.length) {
        window.clearInterval(typeTimer);
        timers.push(window.setTimeout(() => setPhase('exiting'), HOLD_MS));
        timers.push(
          window.setTimeout(() => {
            setPhase('done');
            document.body.style.overflow = prevOverflow;
          }, HOLD_MS + EXIT_MS),
        );
      }
    }, TYPE_MS);

    return () => {
      window.clearInterval(typeTimer);
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const revealed = phase === 'exiting' || phase === 'done';

  return (
    <>
      <div
        style={{
          opacity: revealed ? 1 : 0,
          transition: `opacity ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {children}
      </div>

      {phase !== 'done' && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            overflow: 'hidden',
            pointerEvents: phase === 'exiting' ? 'none' : 'auto',
          }}
        >
          {/* Background panel — the only thing that fades, revealing the page behind */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--br-bg)',
              opacity: phase === 'exiting' ? 0 : 1,
              transition: `opacity ${EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          />

          {/* HASHIR. — stays fixed and fully opaque, perfectly aligned with the hero title */}
          <h1
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              fontWeight: 900,
              fontSize: '20vw',
              lineHeight: 0.82,
              letterSpacing: '-.055em',
              margin: 0,
              textTransform: 'uppercase',
              padding: '0 20px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              fontFamily: 'var(--font-archivo)',
              color: 'var(--br-ink)',
            }}
          >
            {typed}
            <span style={{ color: 'var(--br-accent)', animation: 'brBlink 1s step-end infinite' }}>
              .
            </span>
          </h1>
        </div>
      )}
    </>
  );
}
