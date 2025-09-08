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

          {/* Headstarter */}
            <div className="flex-1">
              <span className="text-[#58a6ff]">May 2025 - Aug 2025</span>
              <div className="text-[#e6edf3] font-bold">Software Engineering Resident</div>
              <div className="text-[#8b949e] flex items-center">
                <span>Headstarter</span>
                <span className="mx-1">·</span>
                <span className="text-[#8b949e]">Long Island, New York</span>
              </div>
              <ul className="list-disc ml-6 text-[#8b949e] mt-1">
                <li>Built ML pipelines with Computer Vision and OCR serving 1M+ users across healthcare and fintech sectors</li>
                <li>Shipped 2 production-ready prototypes for 2 startups, tested by 200+ users with iterative feedback</li>
                <li>Mentored by engineers from Google, Meta, Microsoft, Amazon, Apple, NVIDIA, Palantir, and OpenAI</li>
              </ul>
              <div className="flex flex-wrap mt-2">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">pandas</span>
                <span className="skill-tag">numpy</span>
                <span className="skill-tag">scikit-learn</span>
                <span className="skill-tag">matplotlib</span>
                <span className="skill-tag">seaborn</span>
                <span className="skill-tag">joblib</span>
              </div>
            </div>
            
            {/* Geez Creationz */}
            <div className="flex-1">
              <span className="text-[#58a6ff]">May 2023 - August 2023</span>
              <div className="text-[#e6edf3] font-bold">Software Engineer Intern</div>
              <div className="text-[#8b949e] flex items-center">
                <span>Geez Creationz</span>
                <span className="mx-1">·</span>
                <span className="text-[#8b949e]">St. Louis, Missouri</span>
              </div>
              <ul className="list-disc ml-6 text-[#8b949e] mt-1">
                <li>Collaborated in a 3-person Agile team to design and develop the official GEEZ Creationz website</li>
                <li>Boosted client acquisition by 70%, contributing to $300K+ in new business within 6 months</li>
                <li>Delivered a fully responsive site across 12 weekly sprints using TypeScript and React.js</li>
              </ul>
              <div className="flex flex-wrap mt-2">
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">Next.js</span>
              </div>
            </div>
          </div>

          {/* Additional Experiences Row */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">

            {/* Where's Religion? */}
            <div className="flex-1">
              <span className="text-[#58a6ff]">August 2025 - Present</span>
              <div className="text-[#e6edf3] font-bold">Software Engineer</div>
              <div className="text-[#8b949e] flex items-center">
                <span>Where's Religion?</span>
                <span className="mx-1">·</span>
                <span className="text-[#8b949e]">St. Louis, Missouri</span>
              </div>
              <ul className="list-disc ml-6 text-[#8b949e] mt-1">
                <li>Contributing to cross-platform app with 1,000+ users using TypeScript, React.js, React Native, TailwindCSS</li>
                <li>Deploying with Docker, AWS S3, and GitHub Actions in an Agile workflow following SDLC</li>
                <li>Collaborating with open-source team on code reviews, design, and performance improvements</li>
              </ul>
              <div className="flex flex-wrap mt-2">
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Tailwind CSS</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">React Native</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS S3</span>
              </div>
            </div>

            {/* TA for Operating Systems */}
            <div className="flex-1">
              <span className="text-[#58a6ff]">August 2025 - Present</span>
              <div className="text-[#e6edf3] font-bold">Teaching Assistant</div>
              <div className="text-[#8b949e] flex items-center">
                <span>Saint Louis University</span>
                <span className="mx-1">·</span>
                <span className="text-[#8b949e]">St. Louis, Missouri</span>
              </div>
              <ul className="list-disc ml-6 text-[#8b949e] mt-1">
                <li>Responsible for grading 500+ Operating Systems assignments for 28 students in C and other OS topics</li>
                <li>Hold weekly office hours for 28 students, clarifying processes, threads, synchronization, and memory management</li>
                <li>Guiding students through debugging multi-threaded C programs, reinforcing difficult topics</li>
              </ul>
              <div className="flex flex-wrap mt-2">
                <span className="skill-tag">C</span>
                <span className="skill-tag">Linux</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="mb-1">
              <span className="terminal-prompt">$</span>
              <span className="terminal-command"> echo $EXPERIENCE_STATS</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
                <span className="text-[#e6edf3] block text-sm">Projects Completed</span>
                <span className="text-[#58a6ff] text-lg font-bold">10+</span>
              </div>
              <div className="bg-[#161b22] p-2 rounded border border-[#30363d]">
                <span className="text-[#e6edf3] block text-sm">Technologies Used</span>
                <span className="text-[#58a6ff] text-lg font-bold">25+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience; 