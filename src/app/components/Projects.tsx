import React from 'react';

const Projects = () => {
  return (
    <div className="bento-item bento-item-large bento-item-full-width bento-projects">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">Projects</span>
      </div>
      <div className="terminal-content">
        <p>
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"> find ./projects -type f -name "*.md" | xargs cat</span>
        </p>
        
        <div className="terminal-output">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="project-card">
              <div className="flex flex-col mb-2">
                <h3 className="project-title mb-1">Property Recommendation System</h3>
                <div className="inline-flex items-center">
                  <a href="https://www.automax.ai/" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] text-sm hover:underline">Automax AI</a>
                </div>
              </div>
              <p className="text-[#8b949e]">ML based system for recommending comparable properties for real estate appraisals.</p>
              <div className="flex flex-wrap mt-2">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">pandas</span>
                <span className="skill-tag">numpy</span>
              </div>
              <a href="https://github.com/mhashir03/property-recommendation-system" target="_blank" rel="noopener noreferrer" className="terminal-link block mt-2">View on GitHub →</a>
            </div>

            <div className="project-card">
              <div className="flex flex-col mb-2">
                <h3 className="project-title mb-1">Ozzy</h3>
                <div className="inline-flex items-center">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-[#f0883e] to-[#f5af19] text-[#0d1117] text-xs font-bold py-1 px-3 rounded-md flex items-center animate-pulse">
                      <span className="mr-1">🏆</span>
                      <span className="font-mono tracking-wider">WINNER</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f0883e] to-[#f5af19] rounded-md blur-sm opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  <span className="text-[#58a6ff] ml-2 text-sm">HackSLU 2025</span>
                </div>
              </div>
              <p className="text-[#8b949e]">Mobile app designed to help users with speech difficulties communicate more effectively</p>
              <div className="flex flex-wrap mt-2">
                <span className="skill-tag">React Native</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Expo</span>
              </div>
              <div className="flex space-x-4 mt-2">
                <a href="https://github.com/mhashir03/Ozzy" target="_blank" rel="noopener noreferrer" className="terminal-link">View on GitHub →</a>
                <a href="https://devpost.com/software/ozzy" target="_blank" rel="noopener noreferrer" className="terminal-link">Devpost →</a>
              </div>
            </div>

            <div className="project-card">
              <div className="flex flex-col mb-2">
                <h3 className="project-title mb-1">Kira</h3>
                <div className="inline-flex items-center">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-[#f0883e] to-[#f5af19] text-[#0d1117] text-xs font-bold py-1 px-3 rounded-md flex items-center animate-pulse">
                      <span className="mr-1">🏆</span>
                      <span className="font-mono tracking-wider">FEATURED</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f0883e] to-[#f5af19] rounded-md blur-sm opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  <span className="text-[#58a6ff] ml-2 text-sm">Google DevFest 2025</span>
                </div>
              </div>
              <p className="text-[#8b949e]">Web app designed to help users understand their symptoms and assess potential health</p>
              <div className="flex flex-wrap mt-2">
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">React.js</span>
              </div>
              <div className="flex space-x-4 mt-2">
                <a href="https://github.com/mhashir03/Kira" target="_blank" rel="noopener noreferrer" className="terminal-link">View on GitHub →</a>
                <a href="https://www.usekiraapp.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">Website →</a>
              </div>
            </div>

            <div className="project-card">
              <div className="flex flex-col mb-2">
                <h3 className="project-title mb-1">Multimodal PA Pipeline</h3>
                <div className="inline-flex items-center">
                  <a href="https://www.mandolin.com/" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] text-sm hover:underline">Mandolin</a>
                </div>
              </div>
              <p className="text-[#8b949e]">Automated workflow that OCRs medical referral packets, extracts structured data, and fills prior authorization PDFs.</p>
              <div className="flex flex-wrap mt-2">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">OCR</span>
                <span className="skill-tag">NLP</span>
                <span className="skill-tag">PyTorch</span>
              </div>
              <a href="https://github.com/mhashir03/Multimodal-PA-Pipeline" target="_blank" rel="noopener noreferrer" className="terminal-link block mt-2">View on GitHub →</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects; 