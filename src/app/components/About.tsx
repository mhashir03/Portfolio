import React from 'react';
import SpotifyNowPlaying from './Spotify';

const About = () => {
  return (
    <div className="bento-item">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">About</span>
      </div>
      <div className="terminal-content">
        <p>
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"> cat about-me.txt</span>
        </p>
        
        <div className="terminal-output">
          <p className="mb-1">I'm a problem solver at heart who loves building things that make a difference. My journey in tech started with a simple "Hello World" and has evolved into a passion for creating elegant solutions to complex problems.</p>
          <p>When I'm not coding, I enjoy:</p>
          <ul className="list-disc ml-5">
            <li>Playing tennis</li>
            <li>Watching 90s movies</li>
            <li>Exploring new coffee shops</li>
            <li>Reading philosophy</li>
          </ul>
          
          {/* Spotify Now Playing Section */}
          <SpotifyNowPlaying />
        </div>
      </div>
    </div>
  );
};

export default About; 