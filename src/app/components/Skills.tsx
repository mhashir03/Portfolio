import React from 'react';

const Skills = () => {
  return (
    <div className="bento-item">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">Skills</span>
      </div>
      <div className="terminal-content">
        <p>
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"> ls -la ./skills/</span>
        </p>
        
        <div className="terminal-output">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <div className="text-[#e6edf3] font-bold mb-2">Languages:</div>
              <div className="flex flex-wrap gap-1">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">C/C++</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">R</span> 
                <span className="skill-tag">SQL (Postgres)</span>
              </div>
            </div>

            <div>
              <div className="text-[#e6edf3] font-bold mb-2">Frameworks:</div>
              <div className="flex flex-wrap gap-1">
                <span className="skill-tag">React Native</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">Expo</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">Langchain</span>
              </div>
            </div>

            <div>
              <div className="text-[#e6edf3] font-bold mb-2">AI/ML:</div>
              <div className="flex flex-wrap gap-1">
                <span className="skill-tag">pandas</span>
                <span className="skill-tag">numpy</span>
                <span className="skill-tag">joblib</span>
                <span className="skill-tag">scikit-learn</span>
                <span className="skill-tag">matplotlib</span>
                <span className="skill-tag">seaborn</span>
                <span className="skill-tag">Beautiful Soup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 