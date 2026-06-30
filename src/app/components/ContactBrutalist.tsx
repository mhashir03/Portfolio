'use client';

import React, { useState } from 'react';

export default function ContactBrutalist() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText('mhashir0318@gmail.com')
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      })
      .catch(() => {
        window.location.href = 'mailto:mhashir0318@gmail.com';
      });
  }

  return (
    <section id="contact" style={{ padding: '80px 0 120px', borderTop: '1px solid var(--br-line)', background: 'var(--br-bg)', color: 'var(--br-ink)', fontFamily: 'var(--font-archivo)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 13, color: 'var(--br-accent)' }}>05</span>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-ink3)', letterSpacing: '.12em' }}>CONTACT</span>
        </div>

        <h2 style={{ fontWeight: 900, fontSize: 'clamp(42px,9vw,120px)', lineHeight: .84, letterSpacing: '-.055em', margin: '0 0 36px', textTransform: 'uppercase' }}>
          Let&rsquo;s build<br />something<br />
          <span style={{ color: 'var(--br-accent)' }}>great.</span>
        </h2>

        {/* Click-to-copy email */}
        <div
          className="br-copy-box"
          onClick={copyEmail}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 18, border: '1px solid var(--br-line)', padding: '18px 24px', cursor: 'pointer', marginBottom: 28, maxWidth: '100%' }}
        >
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 'clamp(13px,1.8vw,19px)', color: copied ? 'var(--br-accent)' : 'var(--br-ink)', transition: 'color .2s', wordBreak: 'break-all' }}>
            {copied ? 'COPIED ✓' : 'mhashir0318@gmail.com'}
          </span>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-ink3)', borderLeft: '1px solid var(--br-line)', paddingLeft: 18, flexShrink: 0, whiteSpace: 'nowrap' }}>
            {copied ? '' : '↗ CLICK TO COPY'}
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <a className="br-link-chip" href="https://linkedin.com/in/muhammad-hashir03" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, color: 'var(--br-ink2)', border: '1px solid var(--br-line)', padding: '10px 16px', textDecoration: 'none' }}>
            LINKEDIN ↗
          </a>
          <a className="br-link-chip" href="https://github.com/mhashir03" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, color: 'var(--br-ink2)', border: '1px solid var(--br-line)', padding: '10px 16px', textDecoration: 'none' }}>
            GITHUB ↗
          </a>
          <a className="br-link-chip br-link-chip--accent" href="/Muhammad_Hashir_Resume.pdf" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, fontWeight: 700, color: 'var(--br-on-accent)', background: 'var(--br-accent)', border: '1px solid var(--br-accent)', padding: '10px 16px', textDecoration: 'none' }}>
            DOWNLOAD RESUME ↗
          </a>
        </div>
      </div>
    </section>
  );
}
