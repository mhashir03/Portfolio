import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="terminal-container">
      {/* Header Section */}
      <section className="terminal-section bento-item-featured">
        <div className="terminal-header">
          <span className="terminal-prompt">~</span>
          <span className="ml-2 text-[#e6edf3]">whoami</span>
        </div>
        <div className="terminal-content terminal-content-fill">
          <div className="flex flex-col md:flex-row gap-6 h-full">
            <div className="flex-1">
              <p>
                <span className="terminal-prompt">$</span>
                <span className="terminal-command"> echo $GREETING</span>
              </p>
              <div className="terminal-output">
                Hey there! I'm <span className="text-[#58a6ff] font-bold">Hashir</span>, a Computer Science student who loves finding simple solutions to everyday problems.
              </div>
              
              <p className="mt-4">
                <span className="terminal-prompt">$</span>
                <span className="terminal-command"> cat contact.txt</span>
              </p>
              <div className="terminal-output">
                <div>Email: mhashir0318@gmail.com</div>
                <div>
                  LinkedIn: <a href="https://linkedin.com/in/muhammad-hashir03" target="_blank" rel="noopener noreferrer" className="terminal-link">linkedin.com/in/muhammad-hashir03</a>
                </div>
                <div>
                  GitHub: <a href="https://github.com/mhashir03" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/mhashir03</a>
                </div>
                <div className="mt-4">
                  <p className="mb-1">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command"> less resume.pdf</span>
                  </p>
                  <div className="flex">
                    <a 
                      href="/Muhammad_Hashir_Resume.pdf" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 bg-[#0d1117] text-[#e6edf3] rounded border border-[#30363d] hover:bg-[#161b22] hover:border-[#58a6ff] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <span className="font-mono text-sm">view_resume.pdf</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center md:justify-end">
              <div className="ascii-art text-center md:text-right">
{`
 ██╗  ██╗ █████╗ ███████╗██╗  ██╗██╗██████╗ 
 ██║  ██║██╔══██╗██╔════╝██║  ██║██║██╔══██╗
 ███████║███████║███████╗███████║██║██████╔╝
 ██╔══██║██╔══██║╚════██║██╔══██║██║██╔══██╗
 ██║  ██║██║  ██║███████║██║  ██║██║██║  ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
                                            
> Developer | Student | Creator <
`}
                <span className="cursor-blink"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="bento-grid">
        {/* Education Section */}
        <div className="bento-item">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">Education</span>
          </div>
          <div className="terminal-content terminal-content-fill">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> cat education.json</span>
            </p>
            <div className="terminal-output">
              <pre className="whitespace-pre-wrap">
{`{
  "university": "Saint Louis University",
  "location": "St. Louis, MO",
  "degree": "Computer Science",
  "graduation": "December 2025",
  "courses": [
    "Data Structures",
    "Software Design",
    "Operating Systems",
    "Object Oriented Programming"
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bento-item bento-item-tall">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">Experience</span>
          </div>
          <div className="terminal-content terminal-content-fill">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> ls -la ./experience/</span>
            </p>
            <div className="terminal-output">
              <div className="mb-4">
                <span className="text-[#58a6ff]">Aug 2024-Present</span>
                <div className="text-[#e6edf3] font-bold">Software Engineer</div>
                <p className="text-[#8b949e]">Open Source @ SLU</p>
                <ul className="list-disc ml-6 text-[#8b949e] mt-2">
                  <li>Redesigned frontend architecture with React.js</li>
                  <li>Improved query performance with PostgreSQL optimizations</li>
                  <li>Collaborated with students to expand system functionality</li>
                </ul>
                <div className="flex flex-wrap mt-3">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">React.js</span>
                  <span className="skill-tag">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="bento-item">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">About</span>
          </div>
          <div className="terminal-content terminal-content-fill">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> cat about-me.txt</span>
            </p>
            
            <div className="terminal-output">
              <p className="mb-2">I'm a problem solver at heart who loves building things that make a difference. My journey in tech started with a simple "Hello World" and has evolved into a passion for creating elegant solutions to complex problems.</p>
              <p>When I'm not coding, I enjoy:</p>
              <ul className="list-disc ml-6">
                <li>Playing tennis</li>
                <li>Watching 90s movies</li>
                <li>Exploring new coffee shops</li>
                <li>Reading philosophy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bento-item">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">Skills</span>
          </div>
          <div className="terminal-content terminal-content-fill">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> ls -la ./skills/</span>
            </p>
            
            <div className="terminal-output">
              <div className="mb-2">
                <div className="text-[#e6edf3] font-bold mb-1">Languages:</div>
                <div className="flex flex-wrap">
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Java</span>
                  <span className="skill-tag">C/C++</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">JavaScript</span>
                </div>
              </div>
              
              <div>
                <div className="text-[#e6edf3] font-bold mb-1">Tools & Frameworks:</div>
                <div className="flex flex-wrap">
                  <span className="skill-tag">React.js</span>
                  <span className="skill-tag">Next.js</span>
                  <span className="skill-tag">Tailwind CSS</span>
                  <span className="skill-tag">PostgreSQL</span>
                  <span className="skill-tag">Docker</span>
                  <span className="skill-tag">Git</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="bento-item">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">Leadership</span>
          </div>
          <div className="terminal-content terminal-content-fill">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> cat leadership.txt</span>
            </p>
            
            <div className="terminal-output">
              <div className="mb-1">
                <span className="text-[#e6edf3] font-bold">STLCC MUSLIM STUDENT ASSOCIATION</span>
              </div>
              <div className="text-[#8b949e] mb-1">Founder & President | 2022-2023</div>
              <p className="text-[#8b949e]">Built a community from scratch, organized events with 50+ attendees, and managed a $2,000+ budget</p>
            </div>
          </div>
        </div>

        {/* Projects Section - Large Item */}
        <div className="bento-item bento-item-large">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">Projects</span>
          </div>
          <div className="terminal-content terminal-content-fill">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> find ./projects -type f -name "*.md" | xargs cat</span>
            </p>
            
            <div className="terminal-output">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="project-card">
                  <h3 className="project-title">Personal Website</h3>
                  <p className="text-[#8b949e]">This website is a portfolio of my projects and skills</p>
                  <div className="flex flex-wrap mt-2">
                    <span className="skill-tag">TypeScript</span>
                    <span className="skill-tag">React</span>
                    <span className="skill-tag">Next.js</span>
                    <span className="skill-tag">Tailwind CSS</span>
                  </div>
                  <a href="https://github.com/mhashir03/Portfolio" target="_blank" rel="noopener noreferrer" className="terminal-link text-sm block mt-2">View on GitHub →</a>
                </div>
                
                <div className="project-card">
                  <h3 className="project-title">Scrapefy</h3>
                  <p className="text-[#8b949e]">AI-powered web scraper that extracts and analyzes content from websites</p>
                  <div className="flex flex-wrap mt-2">
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">Selenium</span>
                    <span className="skill-tag">Ollama</span>
                  </div>
                  <a href="https://github.com/mhashir03/Scrapefy" target="_blank" rel="noopener noreferrer" className="terminal-link text-sm block mt-2">View on GitHub →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status - Fun Element */}
        <div className="bento-item">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">Status</span>
          </div>
          <div className="terminal-content terminal-content-fill">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> uptime</span>
            </p>
            
            <div className="terminal-output">
              <p className="mb-2">
                <span className="text-[#3fb950]">●</span> Currently: <span className="text-[#e6edf3]">Looking for Summer 2025 Internships</span>
              </p>
              <p className="mb-2">
                <span className="text-[#3fb950]">●</span> Learning: <span className="text-[#e6edf3]">Java for Object Oriented Software Design and C for Operating Systems</span>
              </p>
              <p>
                <span className="text-[#3fb950]">●</span> Working on: <span className="text-[#e6edf3]">Building more meaningful projects and learning more about AI</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-[#8b949e] py-6 mt-6">
        <div className="flex justify-center space-x-6 mb-4">
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
    </div>
  );
}
