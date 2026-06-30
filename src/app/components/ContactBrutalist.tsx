'use client';

import React, { useEffect, useState } from 'react';

function buildEmail(): string {
  const local = String.fromCharCode(109, 104, 97, 115, 104, 105, 114, 48, 51, 49, 56);
  const domain = String.fromCharCode(103, 109, 97, 105, 108, 46, 99, 111, 109);
  return `${local}${String.fromCharCode(64)}${domain}`;
}

export default function ContactBrutalist() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState<{ local: string; domain: string } | null>(null);

  useEffect(() => {
    const full = buildEmail();
    const [local, domain] = full.split(String.fromCharCode(64));
    setEmail({ local, domain });
  }, []);

  function copyEmail() {
    const full = buildEmail();
    navigator.clipboard.writeText(full)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      })
      .catch(() => {
        window.location.href = `mailto:${full}`;
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
          role="button"
          tabIndex={0}
          aria-label={email ? `Copy email ${email.local} at ${email.domain}` : 'Copy email address'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              copyEmail();
            }
          }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 18, border: '1px solid var(--br-line)', padding: '18px 24px', cursor: 'pointer', marginBottom: 28, maxWidth: '100%' }}
        >
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 'clamp(13px,1.8vw,19px)', color: copied ? 'var(--br-accent)' : 'var(--br-ink)', transition: 'color .2s', wordBreak: 'break-all' }}>
            {copied ? (
              'COPIED ✓'
            ) : email ? (
              <>
                <span>{email.local}</span>
                <span aria-hidden="true">{String.fromCharCode(64)}</span>
                <span>{email.domain}</span>
              </>
            ) : (
              <span aria-hidden="true" style={{ letterSpacing: '.15em', color: 'var(--br-ink3)' }}>················</span>
            )}
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
          <a className="br-link-chip br-link-chip--accent" href="/Muhammad_Hashir_Resume.pdf" download="Muhammad_Hashir_Resume.pdf"
            style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, fontWeight: 700, color: 'var(--br-on-accent)', background: 'var(--br-accent)', border: '1px solid var(--br-accent)', padding: '10px 16px', textDecoration: 'none' }}>
            DOWNLOAD RESUME ↓
          </a>
        </div>
      </div>
    </section>
  );
}
