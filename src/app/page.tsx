'use client';

import React, { useEffect } from 'react';
import Header from './components/Header';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Quotes from './components/Quotes';
import About from './components/About';
import Leadership from './components/Leadership';
import Projects from './components/Projects';
import Footer from './components/Footer';

export default function Home() {
  useEffect(() => {
    // Import cycleQuotes function dynamically
    import('./quotes').then(module => {
      module.cycleQuotes();
    });
  }, []);

  return (
    <div className="terminal-container">
      {/* Header Section */}
      <Header />

      {/* Bento Grid Layout */}
      <div className="bento-grid">
        {/* Experience Section */}
        <Experience />

        {/* Education Section */}
        <Education />

        {/* Skills Section */}
        <Skills />

        {/* Matrix Digital Rain Section */}
        <Quotes />

        {/* About Me Section */}
        <About />

        {/* Leadership Section */}
        <Leadership />

        {/* Projects Section - Large Item */}
        <Projects />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
