'use client';

import React, { useEffect, useState } from 'react';
import SpotifyBrutalist from './SpotifyBrutalist';

const QUOTES = [
  { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
  { text: 'Any fool can write code a computer understands. Good programmers write code that humans understand.', author: 'Martin Fowler' },
  { text: 'The best code is no code at all.', author: 'Jeff Atwood' },
];

export default function OffHours() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [visible,  setVisible]  = useState(true);
  const [wide,     setWide]     = useState(true);

  useEffect(() => {
    const check = () => setWide(window.innerWidth >= 680);
    check();
    window.addEventListener('resize', check);

    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setQuoteIdx(i => (i + 1) % QUOTES.length);
        setVisible(true);
      }, 220);
    }, 8000);

    return () => {
      window.removeEventListener('resize', check);
      clearInterval(timer);
    };
  }, []);

  const q = QUOTES[quoteIdx];

  return (
    <section id="about" style={{ padding: '80px 0', borderTop: '1px solid var(--br-line)', background: 'var(--br-bg)', color: 'var(--br-ink)', fontFamily: 'var(--font-archivo)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 13, color: 'var(--br-accent)' }}>03</span>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-ink3)', letterSpacing: '.12em' }}>ABOUT ME</span>
        </div>

        <h2 style={{ fontWeight: 900, fontSize: 'clamp(36px,6vw,72px)', lineHeight: .9, letterSpacing: '-.04em', margin: '0 0 36px', textTransform: 'uppercase' }}>
          When I'm<br />not coding.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr 1.3fr' : '1fr', gap: 44, alignItems: 'start' }}>

          {/* Left: bio + quote */}
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.68, color: 'var(--br-ink2)', margin: '0 0 30px' }}>
              I'm either playing pickleball or at the gym. I also love to go on walks around new parks and trails whilst listening to music.
            </p>
            <div style={{ borderLeft: '3px solid var(--br-accent)', padding: '14px 20px', opacity: visible ? 1 : 0, transition: 'opacity .22s' }}>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--br-ink)', margin: '0 0 10px', fontStyle: 'italic' }}>
                &ldquo;{q.text}&rdquo;
              </p>
              <p style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-accent)', margin: 0 }}>
                &mdash; {q.author}
              </p>
            </div>
          </div>

          {/* Right: Spotify */}
          <SpotifyBrutalist />
        </div>
      </div>
    </section>
  );
}
