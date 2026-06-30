'use client';

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const experiences = [
  {
    company: 'The Health App',
    role: 'Software Developer',
    timeframe: 'Jan 2026 – May 2026',
    location: 'St. Louis, MO',
    summary: 'Built React Testing Library and Vitest suite achieving 85%+ authentication test coverage. Developed multilingual health questionnaire with React, Tailwind, and i18next supporting 5 languages.',
  },
  {
    company: 'Saint Louis University',
    role: 'Teaching Assistant — Operating Systems',
    timeframe: 'Aug 2025 – Dec 2025',
    location: 'St. Louis, MO',
    summary: 'Graded 500+ Operating Systems labs and assignments whilst holding weekly office hours for 28 students.',
  },
  {
    company: "Where's Religion?",
    role: 'Software Developer',
    timeframe: 'Aug 2025 – Dec 2025',
    location: 'St. Louis, MO',
    summary: 'Built cross-platform features serving 1,000+ users. Implemented CI/CD with Docker, AWS, and GitHub Actions. Migrated legacy user data to MongoDB with zero downtime.',
  },
  {
    company: 'Headstarter',
    role: 'Software Engineer Fellow',
    timeframe: 'Jun 2025 – Aug 2025',
    location: 'Remote',
    summaryJsx: (
      <>
        Built AI software for healthcare and real estate startups supporting 1M+ users. Developed OCR + NLP pipeline for{' '}
        <a href="https://www.mandolin.com/" target="_blank" rel="noopener noreferrer" className="text-[--color-accent] hover:underline">Mandolin</a>
        {' '}and recommendation engine for{' '}
        <a href="https://www.automax.ai/" target="_blank" rel="noopener noreferrer" className="text-[--color-accent] hover:underline">Automax AI</a>.
      </>
    ),
  },
];

const Experience = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-header scroll-reveal" data-delay="0">
          <p className="section-title">Experience</p>
          <h2>Where I've Worked</h2>
        </div>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <article 
              key={exp.company} 
              className="timeline-item scroll-reveal"
              data-delay={Math.min(index + 1, 5)}
            >
              <div className="timeline-date">{exp.timeframe}</div>
              
              <div className="timeline-content">
                <h3 className="timeline-company">{exp.company}</h3>
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
