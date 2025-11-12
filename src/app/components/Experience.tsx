import React from 'react';

const experiences = [
  {
    color: '#04122c',
    company: 'Open Politic',
    role: 'Co‑Founder',
    timeframe: 'Oct 2025 – Present',
    location: 'St. Louis, Missouri',
    summary: 'Making government policy accessible and searchable for everyone.',
  },
  {
    color: '#00e2fb',
    company: "Where's Religion?",
    role: 'Software Engineer Intern',
    timeframe: 'Aug 2025 – Present',
    location: 'St. Louis, Missouri',
    summary: 'Helping 1,000+ organizers find their people—on every screen.',
  },
  {
    color: '#033ca5',
    company: 'Saint Louis University',
    role: 'Teaching Assistant · Operating Systems',
    timeframe: 'Aug 2025 – Present',
    location: 'St. Louis, Missouri',
    summary: 'Lead labs and office hours, helping classmates untangle operating systems bugs.',
  },
  {
    color: '#2afccf',
    company: 'Headstarter',
    role: 'Software Engineer Intern',
    timeframe: 'Jun 2025 – Aug 2025',
    location: 'Long Island, New York',
    summary: 'Taught machines to read documents so humans don’t have to.',
  },
  {
    color: '#fff600',
    company: 'GEEZ Creationz',
    role: 'Software Engineer Intern',
    timeframe: 'Jun 2023 – Aug 2023',
    location: 'St. Louis, Missouri',
    summary: 'Launched the site and helped turn clicks into clients.',
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