'use client';

import React, { useState, useEffect } from 'react';
import TennisGame from './TennisGame';
import MiniChess from './MiniChess';
import SpotifyNowPlaying from './Spotify';
import { quotes } from '../quotes';

type RightPanel = 'none' | 'tennis' | 'music' | 'chess';

const About = () => {
  const [rightPanel, setRightPanel] = useState<RightPanel>('none');
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  const togglePanel = (panel: 'tennis' | 'music' | 'chess') => {
    setRightPanel(current => current === panel ? 'none' : panel);
  };

  const handleQuoteClick = () => {
    if (showQuote) {
      // Cycle to next quote
      setQuoteVisible(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setQuoteVisible(true);
      }, 200);
    } else {
      setShowQuote(true);
    }
  };

  // Auto-cycle quotes when visible
  useEffect(() => {
    if (!showQuote) return;
    
    const interval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setQuoteVisible(true);
      }, 200);
    }, 8000);

    return () => clearInterval(interval);
  }, [showQuote]);

  const quote = quotes[currentQuoteIndex];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-title">About</p>
          <h2>A Bit About Me</h2>
        </div>
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
          {/* Left side - About content */}
          <div className="about-content flex-1">
            <p className="about-text">
              Recently completed JP Morgan's Software Engineering program and built Midas Core.
              When I'm not coding, you'll find me playing{' '}
              <button
                onClick={() => togglePanel('chess')}
                className="chess-link"
                title="♟️ Challenge me!"
              >
                chess
              </button>
              {' '}or on the{' '}
              <button
                onClick={() => togglePanel('tennis')}
                className="tennis-link"
                title="🎾 Click to play!"
              >
                tennis court
              </button>
              .
            </p>
            
            <div className="interests">
              <button
                onClick={() => togglePanel('music')}
                className={`interest-link transition-all ${rightPanel === 'music' ? 'ring-2 ring-[--color-spotify] ring-offset-2 ring-offset-[--color-bg]' : ''}`}
                title="See what I'm listening to"
              >
                <span>🎵</span>
                <span>Music</span>
              </button>
              {/* Hidden quote easter egg */}
              <button
                onClick={handleQuoteClick}
                className="interest-link quote-easter-egg transition-all"
                title={showQuote ? "Click for another quote" : "✨"}
              >
                <span className="quote-icon">💭</span>
              </button>
            </div>

            {/* Quote reveal */}
            {showQuote && (
              <div 
                className="quote-easter-egg-reveal"
                style={{
                  opacity: quoteVisible ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <p className="quote-ee-text">"{quote.text}"</p>
                <p className="quote-ee-author">— {quote.author}</p>
              </div>
            )}
          </div>
          
          {/* Right side - Interactive panels */}
          {rightPanel !== 'none' && (
            <div 
              key={rightPanel}
              className={`mt-8 lg:mt-0 flex-shrink-0 overflow-visible ${rightPanel === 'chess' ? 'lg:w-auto' : 'lg:w-96'}`}
              style={{
                animation: 'fadeSlideIn 0.3s ease-out',
              }}
            >
              {rightPanel === 'tennis' && (
                <div className="relative overflow-visible">
                  <button
                    onClick={() => setRightPanel('none')}
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[--color-bg] border border-[--color-border] text-[--color-text-muted] hover:text-[--color-text-primary] hover:border-[--color-text-muted] transition-colors flex items-center justify-center text-sm z-20 shadow-lg"
                    aria-label="Close panel"
                  >
                    ✕
                  </button>
                  <TennisGame />
                </div>
              )}
              {rightPanel === 'chess' && (
                <div className="relative overflow-visible">
                  <button
                    onClick={() => setRightPanel('none')}
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[--color-bg] border border-[--color-border] text-[--color-text-muted] hover:text-[--color-text-primary] hover:border-[--color-text-muted] transition-colors flex items-center justify-center text-sm z-20 shadow-lg"
                    aria-label="Close panel"
                  >
                    ✕
                  </button>
                  <MiniChess />
                </div>
              )}
              {rightPanel === 'music' && (
                <div className="relative overflow-visible">
                  <button
                    onClick={() => setRightPanel('none')}
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[--color-bg] border border-[--color-border] text-[--color-text-muted] hover:text-[--color-text-primary] hover:border-[--color-text-muted] transition-colors flex items-center justify-center text-sm z-20 shadow-lg"
                    style={{ top: '-42px', right: '-42px' }}
                    aria-label="Close panel"
                  >
                    ✕
                  </button>
                  <div className="p-4 rounded-xl bg-[--color-bg-card] border border-[--color-border]">
                    <SpotifyNowPlaying />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
