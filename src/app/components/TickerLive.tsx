'use client';

import React, { useCallback, useEffect, useState } from 'react';

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%&*';

type SpotifyData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
};

function stlTime() {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: 'America/Chicago',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

function scrambleTo(target: string, progress: number) {
  return target
    .split('')
    .map((ch, i) => {
      if (ch === ' ' || ch === '·' || ch === '—' || ch === '×' || ch === '%' || ch === '.') return ch;
      const threshold = (i + 1) / target.length;
      if (progress >= threshold) return ch;
      return CHARSET[Math.floor(Math.random() * CHARSET.length)];
    })
    .join('');
}

export default function TickerLive() {
  const [time,      setTime]      = useState('');
  const [line,      setLine]      = useState('');
  const [scramble,  setScramble]  = useState(0);
  const [spotify,   setSpotify]   = useState<SpotifyData | null>(null);
  const [sessionId] = useState(() => Math.random().toString(16).slice(2, 8).toUpperCase());

  const buildLine = useCallback(() => {
    if (spotify?.isPlaying && spotify.title) {
      return `♫ ${spotify.artist} — ${spotify.title}`;
    }
    const scroll = typeof window !== 'undefined'
      ? Math.min(100, Math.round((window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100))
      : 0;
    const theme = document.documentElement.getAttribute('data-br-theme') ?? 'dark';
    const w = window.innerWidth;
    const h = window.innerHeight;
    const pool = [
      `NODE ${sessionId} · STL 38.627°N`,
      `VIEWPORT ${w}×${h} · SCROLL ${scroll}%`,
      `${theme.toUpperCase()} MODE · ${w > 768 ? 'DESKTOP' : 'MOBILE'} SIGNAL`,
      spotify?.title ? `LAST ♫ ${spotify.artist} — ${spotify.title}` : 'NO AUDIO SIGNAL',
    ];
    return pool[Math.floor(Date.now() / 9000) % pool.length];
  }, [spotify, sessionId]);

  useEffect(() => {
    setTime(stlTime());
    const id = setInterval(() => setTime(stlTime()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let alive = true;
    async function poll() {
      try {
        const res = await fetch('/api/spotify');
        if (!res.ok || !alive) return;
        const data: SpotifyData = await res.json();
        if (alive) setSpotify(data);
      } catch { /* silent */ }
    }
    poll();
    const id = setInterval(poll, 30_000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  useEffect(() => {
    const next = buildLine();
    setLine(next);
    setScramble(0);
    let start: number | null = null;
    let raf: number;
    const duration = 700;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setScramble(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const rotate = setInterval(() => {
      const n = buildLine();
      setLine(n);
      setScramble(0);
      start = null;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    }, 9000);
    return () => { clearInterval(rotate); cancelAnimationFrame(raf); };
  }, [buildLine]);

  const displayLine = scramble < 1 ? scrambleTo(line, scramble) : line;

  return (
    <div style={{ display: 'flex', background: 'var(--br-accent)' }}>
      <div style={{
        flexShrink: 0,
        padding: '10px 16px',
        borderRight: '1px solid rgba(255,255,255,.22)',
        fontFamily: 'var(--font-mono-sp)', fontSize: 12,
        color: 'var(--br-on-accent)', letterSpacing: '.04em',
      }}>
        {time || '––:––:––'} CST
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 14px',
        overflow: 'hidden',
        height: 38,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono-sp)',
          fontSize: 11,
          color: 'var(--br-on-accent)',
          letterSpacing: '.06em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {displayLine}
        </span>
      </div>
    </div>
  );
}
