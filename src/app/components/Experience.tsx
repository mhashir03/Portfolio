import React from 'react';

const Experience = () => {
  return (
    <div className="bento-item bento-item-wide">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">Experience</span>
      </div>
      <div className="terminal-content">
        <p>
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"> ls -la ./experience/</span>
        </p>
        <div className="terminal-output">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <span className="text-[#58a6ff]">Aug 2024 - Dec 2024</span>
              <div className="text-[#e6edf3] font-bold">Software Engineer</div>
              <p className="text-[#8b949e]">Open Source @ SLU</p>
              <ul className="list-disc ml-6 text-[#8b949e] mt-1">
                <li>Contributed to DADS project across 8 sprints, delivering features on CI/CD and Agile workflows</li>
                <li>Spearheaded React.js front-end redesign for improved scalability and responsive UI/UX</li>
                <li>Optimized PostgreSQL queries with indexing, boosting retrieval efficiency by 5%</li>
              </ul>
              <div className="flex flex-wrap mt-2">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">PostgreSQL</span>
              </div>
            </div>

            <div className="flex-1">
              <p className="mb-1">
                <span className="terminal-prompt">$</span>
                <span className="terminal-command"> echo $EXPERIENCE_STATS</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
                  <span className="text-[#e6edf3] block text-sm">Projects Completed</span>
                  <span className="text-[#58a6ff] text-lg font-bold">5+</span>
                </div>
                <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
                  <span className="text-[#e6edf3] block text-sm">Technologies Used</span>
                  <span className="text-[#58a6ff] text-lg font-bold">20+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience; 