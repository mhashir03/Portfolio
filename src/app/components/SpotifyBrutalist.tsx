'use client';

import React, { useEffect, useState } from 'react';

type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
};

type Track = {
  title: string;
  artist: string;
  albumImageUrl?: string;
  songUrl?: string;
};

const mono: React.CSSProperties = { fontFamily: 'var(--font-mono-sp)' };

export default function SpotifyBrutalist() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [topTracks,  setTopTracks]  = useState<Track[]>([]);
  const [progress,   setProgress]   = useState(0);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    let alive = true;

    async function fetchNowPlaying() {
      try {
        const res = await fetch('/api/spotify');
        if (!res.ok || !alive) return;
        const data: NowPlaying = await res.json();
        if (!alive) return;
        setNowPlaying(data);
        if (data.durationMs && data.progressMs != null) {
          setProgress(data.progressMs / data.durationMs);
        }
      } catch { /* silent */ }
    }

    async function fetchTopTracks() {
      try {
        const res = await fetch('/api/spotify/top-tracks');
        if (!res.ok || !alive) return;
        const data = await res.json();
        if (alive && data.success && data.topTracks) {
          setTopTracks(data.topTracks);
        }
      } catch { /* silent */ }
    }

    Promise.all([fetchNowPlaying(), fetchTopTracks()]).finally(() => {
      if (alive) setLoading(false);
    });

    const id = setInterval(fetchNowPlaying, 5000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  /* Smooth progress between polls while playing */
  useEffect(() => {
    if (!nowPlaying?.isPlaying || !nowPlaying.durationMs) return;
    const start = Date.now();
    const startMs = nowPlaying.progressMs ?? 0;
    const duration = nowPlaying.durationMs;
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(1, (startMs + elapsed) / duration));
    }, 500);
    return () => clearInterval(id);
  }, [nowPlaying?.isPlaying, nowPlaying?.progressMs, nowPlaying?.durationMs, nowPlaying?.title]);

  const hasTrack = !!nowPlaying?.title;
  const isLive   = nowPlaying?.isPlaying;

  return (
    <div style={{ border: '1px solid var(--br-line)', padding: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
            background: isLive ? '#1DB954' : 'var(--br-ink3)',
            animation: isLive ? 'brPulse 1.5s infinite' : 'none',
          }} />
          <span style={{ ...mono, fontSize: 11, color: 'var(--br-ink3)', letterSpacing: '.09em' }}>
            {loading ? 'CONNECTING…' : isLive ? 'NOW PLAYING' : hasTrack ? 'PAUSED' : 'NOT PLAYING'}
          </span>
        </div>
        <a
          className="br-text-link br-spotify-profile"
          href="https://open.spotify.com/user/mooshie77627"
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...mono, fontSize: 10, color: 'var(--br-ink3)', textDecoration: 'none', letterSpacing: '.06em' }}
        >
          PROFILE ↗
        </a>
      </div>

      {/* Now playing */}
      {hasTrack ? (
        <a
          className="br-spotify-now"
          href={nowPlaying!.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none', color: 'inherit', marginBottom: 24 }}
        >
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
            {nowPlaying!.albumImageUrl ? (
              <img
                src={nowPlaying!.albumImageUrl}
                alt=""
                width={64}
                height={64}
                style={{ flexShrink: 0, border: '1px solid var(--br-line)' }}
              />
            ) : (
              <div style={{ width: 64, height: 64, flexShrink: 0, background: 'var(--br-line2)', border: '1px solid var(--br-line)' }} />
            )}
            <div style={{ minWidth: 0 }}>
              <div className="br-spotify-now-title" style={{ fontWeight: 700, fontSize: 15, color: 'var(--br-ink)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color var(--transition-fast)' }}>
                {nowPlaying!.title}
              </div>
              <div style={{ ...mono, fontSize: 11, color: 'var(--br-ink3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nowPlaying!.artist}
              </div>
            </div>
          </div>
          {nowPlaying!.durationMs ? (
            <div style={{ height: 3, background: 'var(--br-line2)', position: 'relative' }}>
              <div style={{
                height: '100%',
                width: `${progress * 100}%`,
                background: isLive ? '#1DB954' : 'var(--br-ink3)',
                transition: 'width .4s linear',
              }} />
            </div>
          ) : null}
        </a>
      ) : !loading ? (
        <p style={{ ...mono, fontSize: 11, color: 'var(--br-ink3)', margin: '0 0 24px', letterSpacing: '.04em' }}>
          Nothing playing right now.
        </p>
      ) : null}

      {/* Top tracks this month */}
      {topTracks.length > 0 && (
        <>
          <div style={{ borderTop: '1px solid var(--br-line2)', paddingTop: 18, marginBottom: 14 }}>
            <span style={{ ...mono, fontSize: 10, color: 'var(--br-accent)', letterSpacing: '.1em' }}>
              TOP THIS MONTH
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {topTracks.map((track, i) => (
              <a
                key={`${track.title}-${i}`}
                className="br-spotify-track"
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '28px 32px 1fr',
                  gap: 10,
                  alignItems: 'center',
                  padding: '8px 6px',
                  margin: '0 -6px',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderBottom: i < topTracks.length - 1 ? '1px solid var(--br-line2)' : 'none',
                }}
              >
                <span style={{ ...mono, fontSize: 10, color: 'var(--br-ink3)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {track.albumImageUrl ? (
                  <img src={track.albumImageUrl} alt="" width={32} height={32} style={{ border: '1px solid var(--br-line2)' }} />
                ) : (
                  <div style={{ width: 32, height: 32, background: 'var(--br-line2)' }} />
                )}
                <div style={{ minWidth: 0 }}>
                  <div className="br-spotify-track-title" style={{ fontSize: 13, fontWeight: 600, color: 'var(--br-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color var(--transition-fast)' }}>
                    {track.title}
                  </div>
                  <div style={{ ...mono, fontSize: 10, color: 'var(--br-ink3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {track.artist}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
