'use client';

import React, { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: 'PROJECTS',   id: 'projects' },
  { label: 'EXPERIENCE', id: 'track'    },
  { label: 'ABOUT ME',   id: 'about'    },
  { label: 'CONTACT',    id: 'contact'  },
];

export default function NavBrutalist() {
  const [active,   setActive]       = useState('hero');
  const [theme,    setTheme]        = useState<'dark'|'light'>('dark');
  const [narrow,   setNarrow]       = useState(false);

  useEffect(() => {
    // Persist theme
    const saved = localStorage.getItem('br-theme');
    if (saved === 'light' || saved === 'dark') applyTheme(saved);
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');

    const onScroll = () => {
      const ids = ['hero', 'projects', 'track', 'about', 'stack', 'contact'];
      let cur = 'hero';
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) cur = id;
      });
      setActive(cur);
    };

    const onResize = () => setNarrow(window.innerWidth < 600);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll(); onResize();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  function applyTheme(t: 'dark' | 'light') {
    setTheme(t);
    document.documentElement.setAttribute('data-br-theme', t);
    localStorage.setItem('br-theme', t);
  }

  function goTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'var(--br-bg)', borderBottom: '1px solid var(--br-line)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', height: 58, gap: 20,
        fontFamily: 'var(--font-archivo)',
      }}>
        {/* Logo */}
        <button
          className="br-nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}
        >
          <span className="br-nav-logo-dot" style={{ width: 13, height: 13, background: 'var(--br-accent)', flexShrink: 0, display: 'block' }} />
          <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: '-.03em', color: 'var(--br-ink)' }}>
            HASHIR
          </span>
        </button>

        {/* Nav links */}
        {!narrow && (
          <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                className={`br-nav-link${active === id ? ' br-nav-link--active' : ''}`}
                onClick={() => goTo(id)}
                style={{
                  background: 'none', border: 0, padding: '4px 0', cursor: 'pointer',
                  fontFamily: 'var(--font-mono-sp)', fontSize: 11, letterSpacing: '.08em',
                  color: active === id ? 'var(--br-ink)' : 'var(--br-ink3)',
                  borderBottom: `1px solid ${active === id ? 'var(--br-ink)' : 'transparent'}`,
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        )}

        {/* Theme toggle */}
        <div style={{ display: 'flex', flexShrink: 0, border: '1px solid var(--br-line)', overflow: 'hidden' }}>
          {(['dark', 'light'] as const).map(t => (
            <button
              key={t}
              className={`br-theme-btn${theme === t ? ' br-theme-btn--active' : ''}`}
              onClick={() => applyTheme(t)}
              style={{
                padding: '7px 13px', border: 0, cursor: 'pointer',
                fontFamily: 'var(--font-mono-sp)', fontSize: 11, letterSpacing: '.05em',
                background: theme === t ? 'var(--br-ink)' : 'transparent',
                color:      theme === t ? 'var(--br-bg)'  : 'var(--br-ink2)',
                borderLeft: t === 'light' ? '1px solid var(--br-line)' : 'none',
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
    </>
  );
}
