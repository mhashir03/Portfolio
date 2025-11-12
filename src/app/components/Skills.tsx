import React from 'react';

const Skills = () => {
  return (
    <div className="bento-item bento-skills">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-[#e6edf3] font-bold mb-2">Languages:</div>
              <div className="flex flex-wrap gap-1">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">C/C++</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>

            <div>
              <div className="text-[#e6edf3] font-bold mb-2">Frameworks:</div>
              <div className="flex flex-wrap gap-1">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">React Native</span>
                <span className="skill-tag">Expo</span>
                <span className="skill-tag">Spring Boot</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">LangChain</span>
              </div>
            </div>

            <div>
              <div className="text-[#e6edf3] font-bold mb-2">Data &amp; ML:</div>
              <div className="flex flex-wrap gap-1">
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">NumPy</span>
                <span className="skill-tag">scikit-learn</span>
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">OpenCV</span>
                <span className="skill-tag">spaCy</span>
                <span className="skill-tag">matplotlib</span>
                <span className="skill-tag">seaborn</span>
                <span className="skill-tag">BeautifulSoup</span>
                <span className="skill-tag">joblib</span>
              </div>
            </div>

            <div>
              <div className="text-[#e6edf3] font-bold mb-2">DevOps & Cloud:</div>
              <div className="flex flex-wrap gap-1">
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">GitHub Actions (CI/CD)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 