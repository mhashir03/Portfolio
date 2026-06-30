'use client';

import React from 'react';
import TickerLive from './TickerLive';

export default function HeroBrutalist() {
  function goTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - 60;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: 'calc(100svh - 58px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'var(--br-bg)',
        color: 'var(--br-ink)',
        fontFamily: 'var(--font-archivo)',
      }}
    >
      <TickerLive />

      {/* ── Top metadata ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '28px 28px 0',
        fontFamily: 'var(--font-mono-sp)', fontSize: 11,
        color: 'var(--br-ink3)', letterSpacing: '.08em',
        flexWrap: 'wrap', gap: 6,
      }}>
        <span>FULL-STACK SOFTWARE ENGINEER</span>
        <span>B.S. CS &middot; SAINT LOUIS UNIVERSITY</span>
      </div>

      {/* ── Description + CTA — floats bottom-right above the name ── */}
      <div style={{
        marginTop: 'auto',
        alignSelf: 'flex-end',
        maxWidth: 400,
        padding: '0 28px',
        marginBottom: 'calc(20vw * 0.9)',
      }}>
        <p style={{
          fontSize: 'clamp(15px, 1.7vw, 21px)', lineHeight: 1.5,
          color: 'var(--br-ink)', margin: '0 0 22px', fontWeight: 500,
        }}>
          Full-stack dev. New grad. Open to full-time roles.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button
            className="br-btn-accent"
            onClick={() => goTo('projects')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'var(--br-accent)', color: 'var(--br-on-accent)',
              fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: 13,
              letterSpacing: '.03em', padding: '12px 20px',
              border: '1px solid var(--br-accent)', cursor: 'pointer',
            }}
          >
            VIEW PROJECTS &#8600;
          </button>
          <a
            className="br-btn-outline"
            href="/Muhammad_Hashir_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'transparent', color: 'var(--br-ink)',
              fontFamily: 'var(--font-archivo)', fontWeight: 700, fontSize: 13,
              letterSpacing: '.03em', padding: '12px 20px',
              border: '1px solid var(--br-ink3)', textDecoration: 'none',
            }}
          >
            RESUME &#8599;
          </a>
        </div>
      </div>

      {/* ── HASHIR. — anchored bottom-left, fills width ── */}
      <h1 style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        fontWeight: 900,
        fontSize: '20vw',
        lineHeight: 0.82,
        letterSpacing: '-.055em',
        margin: 0,
        textTransform: 'uppercase',
        padding: '0 20px 0 20px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontFamily: 'var(--font-archivo)',
        color: 'var(--br-ink)',
      }}>
        HASHIR
        <span style={{ color: 'var(--br-accent)', animation: 'brBlink 1s step-end infinite' }}>
          .
        </span>
      </h1>
    </section>
  );
}
