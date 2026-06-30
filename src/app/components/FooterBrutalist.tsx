'use client';

import React from 'react';

export default function FooterBrutalist() {
  return (
    <footer style={{ borderTop: '1px solid var(--br-line)', padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-ink3)', background: 'var(--br-bg)' }}>
      <span>&copy; 2026 MUHAMMAD HASHIR</span>
      <a className="br-text-link" href="https://github.com/mhashir03/Portfolio" target="_blank" rel="noopener noreferrer"
        style={{ color: 'var(--br-ink3)', textDecoration: 'none' }}>
        VIEW SOURCE ↗
      </a>
    </footer>
  );
}
