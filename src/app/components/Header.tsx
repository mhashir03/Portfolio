import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
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
              Hey there! I'm <span className="text-[#58a6ff] font-bold">Hashir</span>, studying CS @ Saint Louis University.
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
                <div className="flex gap-2 flex-wrap">
                  <a 
                    href="/Muhammad_Hashir_Resume.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.75 bg-[#11161f] text-[#e6edf3] rounded-md border border-[#2b313b] shadow-[0_4px_10px_rgba(15,23,42,0.35)] hover:bg-[#161d28] hover:border-[#3b82f6] hover:shadow-[0_6px_16px_rgba(59,130,246,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6] transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <span className="font-mono text-sm">view_resume.pdf</span>
                  </a>
                  <a
                    href="/Muhammad_Hashir_Resume.pdf"
                    download
                    className="inline-flex items-center gap-2 px-3.5 py-1.75 bg-[#11161f] text-[#e6edf3] rounded-md border border-[#2b313b] shadow-[0_4px_10px_rgba(15,23,42,0.35)] hover:bg-[#161d28] hover:border-[#3b82f6] hover:shadow-[0_6px_16px_rgba(59,130,246,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6] transition-all duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                      />
                    </svg>
                    <span className="font-mono text-sm font-semibold tracking-wide">download_resume.pdf</span>
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
 ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
                                            
> Developer | Student | Creator <
`}
              <span className="cursor-blink"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header; 