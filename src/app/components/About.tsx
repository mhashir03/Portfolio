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
            
            <div className="interactive-cards">
              <button
                onClick={() => togglePanel('music')}
                className={`interactive-card music-card ${rightPanel === 'music' ? 'active' : ''}`}
              >
                <span className="interactive-card-icon">🎧</span>
                <span className="interactive-card-content">
                  <span className="interactive-card-label">Now Playing</span>
                  <span className="interactive-card-cta">See what I'm listening to →</span>
                </span>
              </button>
              
              <button
                onClick={handleQuoteClick}
                className={`interactive-card quotes-card ${showQuote ? 'active' : ''}`}
              >
                <span className="interactive-card-icon">💭</span>
                <span className="interactive-card-content">
                  <span className="interactive-card-label">Words I Live By</span>
                  <span className="interactive-card-cta">{showQuote ? 'Click for another →' : 'Discover my favorite quotes →'}</span>
                </span>
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
                <div className="relative overflow-visible pt-10 pr-10">
                  <button
                    onClick={() => setRightPanel('none')}
                    className="close-btn close-btn-green"
                    aria-label="Close panel"
                  >
                    <span className="close-btn-icon">✕</span>
                  </button>
                  <TennisGame />
                </div>
              )}
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
