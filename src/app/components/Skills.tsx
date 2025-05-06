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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <div className="text-[#e6edf3] font-bold mb-1">Languages:</div>
              <div className="flex flex-wrap">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">C/C++</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">R</span>
              </div>
            </div>

            <div>
              <div className="text-[#e6edf3] font-bold mb-1">Frameworks:</div>
              <div className="flex flex-wrap">
                <span className="skill-tag">React Native</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">Expo</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">Langchain</span>
              </div>
            </div>

            <div>
              <div className="text-[#e6edf3] font-bold mb-1">Libraries:</div>
              <div className="flex flex-wrap">
                <span className="skill-tag">Streamlit</span>
                <span className="skill-tag">Lucide</span>
                <span className="skill-tag">Beautiful Soup</span>
                <span className="skill-tag">Framer Motion</span>
                <span className="skill-tag">Radix</span>
                <span className="skill-tag">Shadcn</span>
                <span className="skill-tag">OpenAI</span>
                <span className="skill-tag">Ollama</span>
                <span className="skill-tag">Gemini</span>
              </div>
            </div>
            
            <div>
              <div className="text-[#e6edf3] font-bold mb-1">Developer Tools:</div>
              <div className="flex flex-wrap">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Gradle</span>
                <span className="skill-tag">JUnit</span>
                <span className="skill-tag">Selenium</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">LaTeX</span>
                <span className="skill-tag">Linux</span>
                <span className="skill-tag">GitHub Actions</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">Slack</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills; 