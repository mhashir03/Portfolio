import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center text-[#8b949e] py-4 mt-4">
      <div className="flex justify-center space-x-6 mb-2">
        <a href="mailto:mhashir0318@gmail.com" className="terminal-link">Email</a>
        <a href="https://linkedin.com/in/muhammad-hashir03" target="_blank" rel="noopener noreferrer" className="terminal-link">LinkedIn</a>
        <a href="https://github.com/mhashir03" target="_blank" rel="noopener noreferrer" className="terminal-link">GitHub</a>
      </div>
      <p>© {new Date().getFullYear()} Hashir. All rights reserved.</p>
      <p className="text-xs mt-1">
        <span className="terminal-prompt">$</span> Made with 
        <span className="text-[#f85149]"> ♥</span> and lots of 
        <span className="text-[#3fb950]"> code</span>
      </p>
    </footer>
  );
};

export default Footer; 