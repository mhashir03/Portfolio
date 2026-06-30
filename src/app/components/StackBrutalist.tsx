'use client';

import React from 'react';

const STACK = [
  { label: 'LANGUAGES',  items: 'Python · TypeScript · JavaScript · Java · C/C++ · SQL' },
  { label: 'FRONTEND',   items: 'React.js · Next.js · React Native · Expo · Tailwind CSS' },
  { label: 'BACKEND',    items: 'Spring Boot · Spring Data JPA · REST APIs · Apache Kafka' },
  { label: 'DATABASES',  items: 'SQL · MongoDB' },
  { label: 'CLOUD',      items: 'Docker · AWS · GitHub Actions · Git' },
  { label: 'TOOLS',      items: 'Cursor · Claude Code · Trello' },
  { label: 'DATA & ML',  items: 'Pandas · NumPy · scikit-learn · PyTorch · OpenCV · spaCy · BeautifulSoup · LangChain' },
];

export default function StackBrutalist() {
  return (
    <section id="stack" style={{ padding: '80px 0', borderTop: '1px solid var(--br-line)', background: 'var(--br-bg)', color: 'var(--br-ink)', fontFamily: 'var(--font-archivo)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 13, color: 'var(--br-accent)' }}>04</span>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-ink3)', letterSpacing: '.12em' }}>THE STACK</span>
        </div>

        <h2 style={{ fontWeight: 900, fontSize: 'clamp(36px,6vw,72px)', lineHeight: .9, letterSpacing: '-.04em', margin: '0 0 36px', textTransform: 'uppercase' }}>
          Tools of<br />the trade.
        </h2>

        <div style={{ borderTop: '2px solid var(--br-line)' }}>
          {STACK.map(({ label, items }) => (
            <div
              key={label}
              style={{ display: 'grid', gridTemplateColumns: '130px 1fr', borderBottom: '1px solid var(--br-line)', padding: '18px 0', alignItems: 'baseline', gap: 12 }}
            >
              <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-accent)', letterSpacing: '.1em' }}>{label}</span>
              <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 13, color: 'var(--br-ink)', lineHeight: 1.65 }}>{items}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
