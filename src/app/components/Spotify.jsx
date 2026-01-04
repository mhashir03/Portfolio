'use client';

import React, { useEffect, useState } from 'react';

const SpotifyNowPlaying = () => {
  const [data, setData] = useState(null);
  const [recentTracks, setRecentTracks] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [activeTab, setActiveTab] = useState('recently-played');
  const [loading, setLoading] = useState(true);

  // Fetch recently played tracks
  const fetchRecentTracks = async () => {
    try {
      const response = await fetch('/api/spotify/recently-played');
      const result = await response.json();
      if (result.success && result.recentTracks) {
        setRecentTracks(result.recentTracks);
      }
    } catch (error) {
      console.error('Error fetching recently played tracks:', error);
    }
  };

  // Fetch top tracks
  const fetchTopTracks = async () => {
    try {
      const response = await fetch('/api/spotify/top-tracks');
      const result = await response.json();
      if (result.success && result.topTracks) {
        setTopTracks(result.topTracks);
      }
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  // Fetch now playing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify');
        const result = await response.json();
        
        if (data?.songUrl !== result?.songUrl) {
          fetchRecentTracks();
        }
        
        setData(result);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchRecentTracks();
    fetchTopTracks();
  }, []);

  const SpotifyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );

  const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-[--color-text-muted]">
        <div className="text-[--color-spotify]">
          <SpotifyIcon />
        </div>
        <span>Loading...</span>
      </div>
    );
  }

  const renderTracks = (tracks) => (
    <div className="flex flex-col gap-2 mt-4">
      {tracks.map((track, index) => (
        <a 
          key={index}
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg bg-[--color-bg-elevated] border border-[--color-border-subtle] hover:border-[--color-border] transition-all group"
        >
          {track.albumImageUrl && (
            <img 
              src={track.albumImageUrl} 
              alt={`${track.title} album art`}
              className="w-10 h-10 rounded"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[--color-text-primary] group-hover:text-[--color-accent] text-sm font-medium truncate transition-colors">
              {track.title}
            </p>
            <p className="text-xs text-[--color-text-muted] truncate">{track.artist}</p>
          </div>
          <div className="text-[--color-text-muted] group-hover:text-[--color-spotify] transition-colors">
            <ExternalLinkIcon />
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <div>
      {/* Header with Spotify link */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[--color-spotify]">
          <SpotifyIcon />
          <span className="text-sm font-medium">
            {data?.isPlaying ? 'Now Playing' : 'Not Playing'}
          </span>
        </div>
        <a 
          href="https://open.spotify.com/user/mooshie77627" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs text-[--color-text-muted] hover:text-[--color-accent] transition-colors"
        >
          View Profile →
        </a>
      </div>

      {/* Now Playing Card */}
      {data?.isPlaying && (
        <a 
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-lg bg-[--color-bg-elevated] border border-[--color-border-subtle] hover:border-[--color-spotify] mb-4 transition-all group"
        >
          <div className="flex items-center gap-4">
            {data.albumImageUrl && (
              <img
                src={data.albumImageUrl}
                alt={`${data.title} album art`}
                className="w-14 h-14 rounded-lg shadow-lg"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[--color-text-primary] font-semibold group-hover:text-[--color-accent] transition-colors truncate">
                {data.title}
              </p>
              <p className="text-sm text-[--color-text-muted] truncate">{data.artist}</p>
            </div>
            <div className="text-[--color-text-muted] group-hover:text-[--color-spotify] transition-colors">
              <ExternalLinkIcon />
            </div>
          </div>
        </a>
      )}

      {/* Tabs */}
      {(recentTracks.length > 0 || topTracks.length > 0) && (
        <div>
          <div className="flex gap-1 border-b border-[--color-border-subtle]">
            <button
              onClick={() => setActiveTab('recently-played')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'recently-played'
                  ? 'text-[--color-text-primary] border-b-2 border-[--color-accent]'
                  : 'text-[--color-text-muted] hover:text-[--color-text-secondary]'
              }`}
            >
              Recently Played
            </button>
            <button
              onClick={() => setActiveTab('top-tracks')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'top-tracks'
                  ? 'text-[--color-text-primary] border-b-2 border-[--color-accent]'
                  : 'text-[--color-text-muted] hover:text-[--color-text-secondary]'
              }`}
            >
              Top Tracks
            </button>
          </div>
          
          {activeTab === 'recently-played' && recentTracks.length > 0 && renderTracks(recentTracks)}
          {activeTab === 'top-tracks' && topTracks.length > 0 && renderTracks(topTracks)}
        </div>
      )}
    </div>
  );
};

export default SpotifyNowPlaying;
