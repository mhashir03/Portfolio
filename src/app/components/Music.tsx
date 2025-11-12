import React from 'react';
import SpotifyNowPlaying from './Spotify';

const Music = () => {
  return (
    <div className="bento-item bento-music">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">Music</span>
      </div>
      <div className="terminal-content">
        <SpotifyNowPlaying className="mt-0" />
      </div>
    </div>
  );
};

export default Music;

