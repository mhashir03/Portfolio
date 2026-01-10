'use client';

import React, { useState } from 'react';

const projects = [
  {
    title: 'Ozzy',
    badge: '🏆 Winner',
    badgeContext: 'HackSLU 2025',
    description: 'Mobile app helping users with speech difficulties communicate more effectively.',
    tech: ['React Native', 'TypeScript', 'Expo'],
    github: 'https://github.com/mhashir03/Ozzy',
    live: 'https://devpost.com/software/ozzy',
    liveLabel: 'Devpost',
    featured: true,
  },
  {
    title: 'Kira',
    badge: '⭐ Featured',
    badgeContext: 'Google DevFest WashU 2025',
    description: 'Web app helping users understand symptoms and assess potential health concerns.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/mhashir03/Kira',
    live: 'https://www.usekiraapp.com/',
    liveLabel: 'Website',
    featured: true,
  },
  {
    title: 'Midas Core',
    company: 'JPMorgan Chase',
    companyUrl: 'https://www.jpmorganchase.com/',
    description: 'Real-time transaction processing system using Spring Boot and Apache Kafka with validation, database audit trails, and REST APIs.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'JPA', 'REST'],
    github: 'https://github.com/mhashir03/Midas-Core',
  },
  {
    title: 'Property Recommendation System',
    company: 'Automax AI',
    companyUrl: 'https://www.automax.ai/',
    description: 'ML-based system for recommending comparable properties for real estate appraisals.',
    tech: ['Python', 'pandas', 'NumPy'],
    github: 'https://github.com/mhashir03/property-recommendation-system',
  },
  {
    title: 'Multimodal PA Pipeline',
    company: 'Mandolin',
    companyUrl: 'https://www.mandolin.com/',
    description: 'Automated workflow using OCR to extract data and fill prior authorization PDFs.',
    tech: ['Python', 'OCR', 'PyTorch', 'NLP'],
    github: 'https://github.com/mhashir03/Multimodal-PA-Pipeline',
  },
];

const featuredProjects = projects.filter(p => p.featured);
const otherProjects = projects.filter(p => !p.featured);

const ProjectCard = ({ project, index, isExpanded }: { project: typeof projects[0]; index: number; isExpanded?: boolean }) => (
  <article 
    className={`project-card ${project.featured ? 'card-featured' : ''}`}
    style={isExpanded ? { 
      animationDelay: `${index * 0.08}s`,
    } : undefined}
  >
    {project.badge && (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="project-badge">{project.badge}</span>
        {project.badgeContext && (
          <span className="text-xs text-[--color-text-muted]">{project.badgeContext}</span>
        )}
      </div>
    )}
    
    {project.company && (
      <a 
        href={project.companyUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="project-company"
      >
        {project.company} ↗
      </a>
    )}
    
    <h3 className="project-title">{project.title}</h3>
    
    <p className="project-description">{project.description}</p>
    
    <div className="project-tags">
      {project.tech.map((tech) => (
        <span key={tech} className="tag">{tech}</span>
      ))}
    </div>
    
    <div className="project-links">
      {project.github && (
        <a 
          href={project.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="project-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      )}
      {project.live && (
        <a 
          href={project.live} 
          target="_blank" 
          rel="noopener noreferrer"
          className="project-link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          {project.liveLabel || 'Live'}
        </a>
      )}
    </div>
  </article>
);

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-title">Projects</p>
          <h2>Things I've Built</h2>
        </div>
        
        {/* Featured Projects */}
        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="projects-expand-container">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="projects-expand-btn"
          >
            <span>{showAll ? 'Show Less' : 'View All Projects'}</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className={`projects-expand-icon ${showAll ? 'rotated' : ''}`}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
        
        {/* Expandable Projects */}
        <div className={`projects-expandable ${showAll ? 'expanded' : ''}`}>
          <div className="projects-grid">
            {otherProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} isExpanded={showAll} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
