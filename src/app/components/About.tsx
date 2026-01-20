'use client';

import React, { useState, useEffect } from 'react';
import MiniChess from './MiniChess';
import SpotifyNowPlaying from './Spotify';
import LocationCard from './LocationCard';
import { quotes } from '../quotes';

type RightPanel = 'none' | 'music' | 'chess';

const About = () => {
  const [rightPanel, setRightPanel] = useState<RightPanel>('none');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);

  const togglePanel = (panel: 'music' | 'chess') => {
    setRightPanel(current => current === panel ? 'none' : panel);
  };

  // Auto-cycle quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setQuoteVisible(true);
      }, 200);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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
              Currently studying for my Salesforce Admin certification while working on <a href="https://oss-slu.github.io/projects/health_app/about" target="_blank" rel="noopener noreferrer" className="text-[--color-accent] hover:underline">TheHealthApp</a>, a health platform with ML-powered assessments.
              When I'm not coding, I enjoy playing{' '}
              <button
                onClick={() => togglePanel('chess')}
                className="chess-link"
                title="♟️ Challenge me!"
              >
                chess
              </button>
              {' '}and{' '}
              <button
                onClick={() => togglePanel('music')}
                className="spotify-link"
                title="🎵 See what I'm listening to"
              >
                listening to music
              </button>
              .
            </p>
            
            <div className="interactive-cards">
              <LocationCard />
            </div>

            {/* Quote display */}
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
              {rightPanel === 'chess' && (
                <div className="relative overflow-visible pt-10 pr-10">
                  <button
                    onClick={() => setRightPanel('none')}
                    className="close-btn close-btn-purple"
                    aria-label="Close panel"
                  >
                    <span className="close-btn-icon">✕</span>
                  </button>
                  <MiniChess />
                </div>
              )}
              {rightPanel === 'music' && (
                <div className="relative overflow-visible pt-10 pr-10">
                  <button
                    onClick={() => setRightPanel('none')}
                    className="close-btn close-btn-spotify"
                    aria-label="Close panel"
                  >
                    <span className="close-btn-icon">✕</span>
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
