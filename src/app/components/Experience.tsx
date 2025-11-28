import React from 'react';

const experiences = [
  {
    color: '#321B0F',
    company: 'JP Morgan Chase & Co.',
    role: 'Software Engineer',
    timeframe: 'Nov 2025',
    location: 'Manhattan, New York',
    summary: 'Built a transaction processing system with Kafka and Spring Boot for JPMC SWE Program.',
  },
  {
    color: '#04122c',
    company: 'Open Politic',
    role: 'Co‑Founder',
    timeframe: 'Oct 2025 – Dec 2025',
    location: 'St. Louis, Missouri',
    summary: 'Built a full-stack U.S. policy search platform with Next.js and Spring Boot.',
  },
  {
    color: '#00e2fb',
    company: "Where's Religion?",
    role: 'Software Engineer',
    timeframe: 'Aug 2025 – Dec 2025',
    location: 'St. Louis, Missouri',
    summary: 'Developing cross-platform features with React Native and TypeScript on AWS.',
  },
  {
    color: '#033ca5',
    company: 'Saint Louis University',
    role: 'Teaching Assistant · Operating Systems',
    timeframe: 'Aug 2025 – Dec 2025',
    location: 'St. Louis, Missouri',
    summary: 'Holding office hours and grading assignments in C.',
  },
  {
    color: '#2afccf',
    company: 'Headstarter',
    role: 'Software Engineer Intern',
    timeframe: 'Jun 2025 – Aug 2025',
    location: 'Long Island, New York',
    summary: <>Built ML pipelines with Computer Vision and OCR for <a href="https://www.mandolin.com/" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">Mandolin</a> and <a href="https://www.automax.ai/" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">Automax AI</a>.</>,
  },
  {
    color: '#fff600',
    company: 'GEEZ Creationz',
    role: 'Software Engineer Intern',
    timeframe: 'Jun 2023 – Aug 2023',
    location: 'St. Louis, Missouri',
    summary: 'Launched the company website with React to drive client acquisition.',
  },
];

const Experience = () => {
  return (
    <div className="bento-item bento-item-wide experience-bento bento-experience">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">Experience</span>
      </div>
      <div className="terminal-content">
        <p>
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"> ./experience --timeline</span>
        </p>
        <div className="terminal-output experience-timeline minimal">
          {experiences.map((experience) => (
            <div className="timeline-row" key={experience.company}>
              <div className="timeline-bullet">
                <span
                  className="timeline-dot"
                  style={{ backgroundColor: experience.color }}
                />
              </div>
              <div className="timeline-content">
                <div className="timeline-line">
                  <div>
                    <div className="timeline-company">{experience.company}</div>
                    <div className="timeline-role subtle">{experience.role}</div>
                    <ul className="timeline-points">
                      <li>{experience.summary}</li>
                    </ul>
                  </div>
                  <div className="timeline-date">{experience.timeframe}</div>
                </div>
                <div className="timeline-location subtle">{experience.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;