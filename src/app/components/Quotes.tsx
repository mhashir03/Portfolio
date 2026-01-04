'use client';

import React, { useState, useEffect } from 'react';
import { quotes } from '../quotes';

const Quotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const quote = quotes[currentQuote];

  return (
    <section id="quotes" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-title">Inspiration</p>
          <h2>Words I Live By</h2>
        </div>
        
        <div 
          className="quote-container"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <p className="quote-text">"{quote.text}"</p>
          <p className="quote-author">— {quote.author}</p>
        </div>
      </div>
    </section>
  );
};

export default Quotes;
