import React, { useState } from 'react';
import SpotifyNowPlaying from './Spotify';

const About = () => {
  const [isMoviesHovered, setIsMoviesHovered] = useState(false);
  const [isChessHovered, setIsChessHovered] = useState(false);
  const [isReadingHovered, setIsReadingHovered] = useState(false);

  return (
    <div className="bento-item">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">About Me & Music</span>
      </div>
      <div className="terminal-content">
        <div className="flex flex-col md:flex-row gap-4">
          {/* About Me Section */}
          <div className="flex-1">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> cat about-me.txt</span>
            </p>
            
            <div className="terminal-output">
              <p className="mb-1 text-sm">Code. Tennis. Films. Chess. Books. Not necessarily in that order. 3AM coding sessions fueled by house music. Currently on a mission to perfect my tennis serve and get to a 4.0 DUPR in pickleball. Let's talk about that ending in Shutter Island...</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs bg-[#1f2937] rounded-full text-[#8b949e]">Tennis</span>
                <span className="px-2 py-1 text-xs bg-[#1f2937] rounded-full text-[#8b949e]">Pickleball</span>
                <div className="relative inline-block">
                  <a 
                    href="https://letterboxd.com/hashirs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-2 py-1 text-xs bg-[#1f2937] rounded-full text-[#8b949e] inline-block no-underline hover:no-underline cursor-pointer transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-[#2d3748] hover:to-[#374151] hover:scale-105 hover:shadow-[0_0_8px_rgba(100,100,100,0.3)]"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={() => setIsMoviesHovered(true)}
                    onMouseLeave={() => setIsMoviesHovered(false)}
                  >
                    Movies
                    {isMoviesHovered && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-[#0d1117] text-[#e6edf3] text-xs rounded whitespace-nowrap shadow-md z-10">
                        View my Letterboxd profile
                      </div>
                    )}
                  </a>
                </div>
                <div className="relative inline-block">
                  <a 
                    href="https://www.chess.com/member/HashirSJ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-2 py-1 text-xs bg-[#1f2937] rounded-full text-[#8b949e] inline-block no-underline hover:no-underline cursor-pointer transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-[#2d3748] hover:to-[#374151] hover:scale-105 hover:shadow-[0_0_8px_rgba(100,100,100,0.3)]"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={() => setIsChessHovered(true)}
                    onMouseLeave={() => setIsChessHovered(false)}
                  >
                    Chess
                    {isChessHovered && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-[#0d1117] text-[#e6edf3] text-xs rounded whitespace-nowrap shadow-md z-10">
                        View my Chess.com profile
                      </div>
                    )}
                  </a>
                </div>
                <div className="relative inline-block">
                  <a 
                    href="https://www.goodreads.com/sendlejendle" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-2 py-1 text-xs bg-[#1f2937] rounded-full text-[#8b949e] inline-block no-underline hover:no-underline cursor-pointer transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-[#2d3748] hover:to-[#374151] hover:scale-105 hover:shadow-[0_0_8px_rgba(100,100,100,0.3)]"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={() => setIsReadingHovered(true)}
                    onMouseLeave={() => setIsReadingHovered(false)}
                  >
                    Reading
                    {isReadingHovered && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-[#0d1117] text-[#e6edf3] text-xs rounded whitespace-nowrap shadow-md z-10">
                        View my Goodreads profile
                      </div>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Spotify Section */}
        <SpotifyNowPlaying />
      </div>
    </div>
  );
};

export default About; 