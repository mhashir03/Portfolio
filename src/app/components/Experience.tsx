'use client';

import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const experiences = [
  {
    company: "TheHealthApp",
    role: 'Software Engineer',
    timeframe: 'Spring 2026',
    location: 'St. Louis, MO',
    summary: 'Building a health platform with ML-powered assessments for patients.',
  },
  {
    company: "Where's Religion?",
    role: 'Software Engineer',
    timeframe: 'Fall 2025',
    location: 'St. Louis, MO',
    summary: 'Developed cross-platform features with React Native and TypeScript on AWS.',
  },
  {
    company: 'Saint Louis University',
    role: 'Teaching Assistant · Operating Systems',
    timeframe: 'Fall 2025',
    location: 'St. Louis, MO',
    summary: 'Held office hours and grading assignments in C.',
  },
  {
    company: 'Headstarter',
    role: 'Software Engineer Fellow',
    timeframe: 'Summer 2025',
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
    company: 'GEEZ Creationz',
    role: 'Software Engineer Intern',
    timeframe: 'Summer 2023',
    location: 'Remote',
    summary: 'Launched the company website with React to drive client acquisition.',
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
