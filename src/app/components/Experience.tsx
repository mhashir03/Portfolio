import React from 'react';

const experiences = [
  {
    color: '#29143e',
    company: "Where's Religion?",
    role: 'Software Engineer',
    timeframe: 'Aug – Dec 2025',
    location: 'St. Louis, MO',
    summary: 'Developed cross-platform features with React Native and TypeScript on AWS.',
  },
  {
    color: '#7a7a85',
    company: 'Saint Louis University',
    role: 'Teaching Assistant · Operating Systems',
    timeframe: 'Aug – Dec 2025',
    location: 'St. Louis, MO',
    summary: 'Held office hours and grading assignments in C.',
  },
  {
    color: '#c4a1e8',
    company: 'Headstarter',
    role: 'Software Engineer Fellow',
    timeframe: 'Jun – Aug 2025',
    location: 'Remote',
    summaryJsx: (
      <>
        Built ML pipelines with Computer Vision and OCR for{' '}
        <a href="https://www.mandolin.com/" target="_blank" rel="noopener noreferrer" className="text-[--color-accent] hover:underline">Mandolin</a>
        {' '}and{' '}
        <a href="https://www.automax.ai/" target="_blank" rel="noopener noreferrer" className="text-[--color-accent] hover:underline">Automax AI</a>.
      </>
    ),
  },
  {
    color: '#e5dfdc',
    company: 'GEEZ Creationz',
    role: 'Software Engineer Intern',
    timeframe: 'Jun – Aug 2023',
    location: 'Remote',
    summary: 'Launched the company website with React to drive client acquisition.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-title">Experience</p>
          <h2>Where I've Worked</h2>
        </div>
        
        <div className="timeline">
          {experiences.map((exp) => (
            <article key={exp.company} className="timeline-item">
              <div className="timeline-date">{exp.timeframe}</div>
              
              <div className="timeline-content">
                <h3 className="timeline-company">
                  <span 
                    className="timeline-dot" 
                    style={{ backgroundColor: exp.color }}
                  />
                  {exp.company}
                </h3>
                <p className="timeline-role">{exp.role}</p>
                <p className="timeline-location">{exp.location}</p>
                <p className="timeline-summary">
                  {exp.summaryJsx || exp.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
