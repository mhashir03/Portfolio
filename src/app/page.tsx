'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { quotes } from './quotes';
import SpotifyNowPlaying from './components/Spotify';

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
      <section className="terminal-section bento-item-featured">
        <div className="terminal-header">
          <span className="terminal-prompt">~</span>
          <span className="ml-2 text-[#e6edf3]">whoami</span>
        </div>
        <div className="terminal-content">
          <div className="flex flex-col md:flex-row gap-4 h-full">
            <div className="flex-1">
              <p>
                <span className="terminal-prompt">$</span>
                <span className="terminal-command"> echo $GREETING</span>
              </p>
              <div className="terminal-output">
                Hey there! I'm <span className="text-[#58a6ff] font-bold">Hashir</span>, a Computer Science student who loves finding simple solutions to everyday problems.
              </div>
              
              <p className="mt-3">
                <span className="terminal-prompt">$</span>
                <span className="terminal-command"> cat contact.txt</span>
              </p>
              <div className="terminal-output">
                <div>Email: <a href="mailto:mhashir0318@gmail.com" className="terminal-link">mhashir0318@gmail.com</a></div>
                <div>
                  LinkedIn: <a href="https://linkedin.com/in/muhammad-hashir03" target="_blank" rel="noopener noreferrer" className="terminal-link">linkedin.com/in/muhammad-hashir03</a>
                </div>
                <div>
                  GitHub: <a href="https://github.com/mhashir03" target="_blank" rel="noopener noreferrer" className="terminal-link">github.com/mhashir03</a>
                </div>
                <div className="mt-3">
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
        {/* Experience Section */}
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

        {/* Education Section */}
        <div className="bento-item">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">Education</span>
          </div>
          <div className="terminal-content">
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
  "graduation": "May 2026",
  "courses": [
    "Data Structures",
    "Operating Systems",
    "Object Oriented Software Design",
    "Object Oriented Programming",
    "Computer Organization & Architecture",
    "Foundations of Statistics"
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Skills Section */}
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

        {/* Matrix Digital Rain Section */}
        <div className="bento-item">
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

        {/* About Me Section */}
        <div className="bento-item">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">About</span>
          </div>
          <div className="terminal-content">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> cat about-me.txt</span>
            </p>
            
            <div className="terminal-output">
              <p className="mb-1">I'm a problem solver at heart who loves building things that make a difference. My journey in tech started with a simple "Hello World" and has evolved into a passion for creating elegant solutions to complex problems.</p>
              <p>When I'm not coding, I enjoy:</p>
              <ul className="list-disc ml-5">
                <li>Playing tennis</li>
                <li>Watching 90s movies</li>
                <li>Exploring new coffee shops</li>
                <li>Reading philosophy</li>
              </ul>
              
              {/* Spotify Now Playing Section */}
              <SpotifyNowPlaying />
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="bento-item bento-item-wide bento-item-full-width">
          <div className="terminal-header">
            <span className="terminal-prompt">~</span>
            <span className="ml-2 text-[#e6edf3]">Leadership</span>
          </div>
          <div className="terminal-content">
            <p>
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> cat leadership.txt</span>
            </p>
            
            <div className="terminal-output">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="mb-1">
                    <span className="text-[#e6edf3] font-bold">STLCC MUSLIM STUDENT ASSOCIATION</span>
                  </div>
                  <div className="text-[#8b949e] mb-1">Founder & President | 2023</div>
                  <ul className="list-disc ml-6 text-[#8b949e] mt-1">
                    <li>Built a community from scratch, organizing regular events with 25+ attendees</li>
                    <li>Managed a $2,000+ annual budget for events and activities</li>
                    <li>Collaborated with 3 other campuses for cross-campus events</li>
                    <li>Increased membership through targeted outreach campaigns via Instagram, flyers, and word of mouth</li>
                  </ul>
                </div>
                
                <div className="flex-1">
                  <p className="mb-1">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-command"> cat ./testimonial.txt</span>
                  </p>
                  <div className="bg-[#161b22] p-4 rounded border border-[#30363d] text-[#8b949e] italic">
                    "As someone who had the honor of delivering a guest halaqah at STLCC, I was truly impressed by the vibrant and welcoming community Hashir built from the ground up. There was no Muslim Student Association before him, yet through his leadership, vision, and dedication, he laid the foundation for something impactful and lasting."
                    <div className="text-[#58a6ff] mt-2">— Sheikh Huzaifa Hamirani</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section - Large Item */}
        <div className="bento-item bento-item-large bento-item-full-width">
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
                  <h3 className="project-title">Personal Website</h3>
                  <p className="text-[#8b949e]">This website is a portfolio that highlights my experience, projects, and skills</p>
                  <div className="flex flex-wrap mt-2">
                    <span className="skill-tag">Next.js</span>
                    <span className="skill-tag">TypeScript</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">React.js</span>
                    <span className="skill-tag">Tailwind CSS</span>
                  </div>
                  <a href="https://github.com/mhashir03/Portfolio" target="_blank" rel="noopener noreferrer" className="terminal-link block mt-2">View on GitHub →</a>
                </div>
                </div>
                
                <div className="project-card">
                  <h3 className="project-title">Scrapefy</h3>
                  <p className="text-[#8b949e]">AI-powered web scraper that extracts and analyzes content from websites</p>
                  <div className="flex flex-wrap mt-2">
                    <span className="skill-tag">Python</span>
                    <span className="skill-tag">Langchain</span>
                    <span className="skill-tag">Selenium</span>
                    <span className="skill-tag">Streamlit</span>
                    <span className="skill-tag">BeautifulSoup</span>
                  </div>
                  <a href="https://github.com/mhashir03/Scrapefy" target="_blank" rel="noopener noreferrer" className="terminal-link block mt-2">View on GitHub →</a>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
    </div>
  );
}
