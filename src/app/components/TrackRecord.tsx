'use client';

import React, { useEffect, useState } from 'react';

const EXPERIENCES = [
  {
    timeframe: "SPRING '26",
    org: 'The Health App',
    role: 'Software Developer',
    impact: 'Shipped tested, multilingual health platform features as part of a 3-person Agile team building tools to help patients understand their health.',
  },
  {
    timeframe: "FALL '25",
    org: 'Saint Louis University',
    role: 'Teaching Assistant — Operating Systems',
    impact: 'Supported 28 students through weekly office hours while grading 500+ Operating Systems labs and assignments in C.',
  },
  {
    timeframe: "FALL '25",
    org: "Where's Religion?",
    role: 'Software Developer',
    impact: 'Delivered cross-platform features for 1,000+ users and production infrastructure including CI/CD and a zero-downtime MongoDB migration.',
  },
  {
    timeframe: "SUMMER '25",
    org: 'Headstarter',
    role: 'Software Engineer Fellow',
    impact: 'Built production AI software for healthcare and real estate startups, including OCR/NLP pipelines and recommendation systems serving 1M+ users.',
  },
];

export default function TrackRecord() {
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const check = () => setWide(window.innerWidth >= 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="track" style={{ padding: '80px 0', borderTop: '1px solid var(--br-line)', background: 'var(--br-bg)', color: 'var(--br-ink)', fontFamily: 'var(--font-archivo)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 13, color: 'var(--br-accent)' }}>02</span>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-ink3)', letterSpacing: '.12em' }}>EXPERIENCE</span>
        </div>

        <h2 style={{ fontWeight: 900, fontSize: 'clamp(36px,6vw,72px)', lineHeight: .9, letterSpacing: '-.04em', margin: '0 0 36px', textTransform: 'uppercase' }}>
          Where I&rsquo;ve<br />worked.
        </h2>

        {/* Desktop: table header */}
        {wide && (
          <div style={{ display: 'grid', gridTemplateColumns: '110px 160px 200px 1fr', borderBottom: '2px solid var(--br-line)', paddingBottom: 10, fontFamily: 'var(--font-mono-sp)', fontSize: 10, color: 'var(--br-ink3)', letterSpacing: '.1em' }}>
            <span>WINDOW</span><span>ORG</span><span>ROLE</span><span>IMPACT</span>
          </div>
        )}

        {EXPERIENCES.map((ex, i) => (
          wide ? (
            /* Desktop row */
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 160px 200px 1fr', borderBottom: '1px solid var(--br-line2)', padding: '18px 0', alignItems: 'start', gap: 8 }}>
              <div style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, color: 'var(--br-accent)' }}>{ex.timeframe}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--br-ink)' }}>{ex.org}</div>
              <div style={{ fontSize: 14, color: 'var(--br-ink2)' }}>{ex.role}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--br-ink2)' }}>{ex.impact}</div>
            </div>
          ) : (
            /* Mobile card */
            <div key={i} style={{ borderBottom: '1px solid var(--br-line2)', padding: '20px 0' }}>
              <div style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-accent)', marginBottom: 6 }}>{ex.timeframe}</div>
              <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--br-ink)', marginBottom: 2 }}>{ex.org}</div>
              <div style={{ fontSize: 13, color: 'var(--br-ink3)', marginBottom: 8 }}>{ex.role}</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--br-ink2)' }}>{ex.impact}</div>
            </div>
          )
        ))}
      </div>
    </section>
  );
}
