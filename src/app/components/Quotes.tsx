import React from 'react';

const Quotes = () => {
  return (
    <div className="bento-item bento-quotes">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">Quotes</span>
      </div>
      <div className="terminal-content">
        <p className="mb-2">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"> ./wisdom.sh</span>
        </p>
        
        <div className="terminal-output">
          <div className="quote-container h-48 flex flex-col justify-center">
            <div className="typing-quote mb-2 overflow-hidden whitespace-pre-wrap" style={{ minHeight: '6rem' }}>
              <span className="text-[#e6edf3]">"Software is a great combination between artistry and engineering."</span>
            </div>
            <div className="quote-author text-right text-[#58a6ff] opacity-0 quote-author-animate">
              — Bill Gates (Co-founder of Microsoft)
            </div>
            <div className="cursor-line mt-4 typing-text-delay-6 hidden">
              <span className="terminal-prompt">$</span>
              <span className="cursor-typing-blink"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes; 