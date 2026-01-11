'use client';

import React, { useEffect } from 'react';

interface CaseStudyData {
  problem?: string;
  solution?: string;
  overview?: string;
  architecture?: string;
  thoughtProcess?: string[];
  challenges?: string[];
  keyFeatures?: string[];
  technologies?: string[];
  techStackTable?: { layer: string; technology: string }[];
  projectStructure?: string;
  apiEndpoints?: { method: string; endpoint: string; description: string }[];
  lessons?: string[];
  timeline?: string;
  role?: string;
}

interface ProjectCaseStudyProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    live?: string;
    liveLabel?: string;
    badge?: string;
    badgeContext?: string;
    company?: string;
    companyUrl?: string;
    caseStudy?: CaseStudyData;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const caseStudy = project.caseStudy || {};

  return (
    <div 
      className="case-study-overlay"
      onClick={onClose}
    >
      <div 
        className="case-study-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="case-study-header">
          <div className="case-study-header-content">
            {project.badge && (
              <div className="flex items-center gap-2 flex-wrap mb-2">
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
                className="project-company mb-2"
              >
                {project.company} ↗
              </a>
            )}
            <h2 className="case-study-title">{project.title}</h2>
            <p className="case-study-subtitle">{project.description}</p>
          </div>
          <button 
            className="case-study-close"
            onClick={onClose}
            aria-label="Close case study"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="case-study-content">
          {/* Tech Stack */}
          {(!caseStudy.techStackTable || caseStudy.techStackTable.length === 0) && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">Tech Stack</h3>
              <div className="case-study-tags">
                {project.tech.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* Problem */}
          {caseStudy.problem && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">The Problem</h3>
              <p className="case-study-text">{caseStudy.problem}</p>
            </div>
          )}

          {/* Solution */}
          {caseStudy.solution && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">The Solution</h3>
              <p className="case-study-text">{caseStudy.solution}</p>
            </div>
          )}

          {/* Overview */}
          {caseStudy.overview && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">Overview</h3>
              <p className="case-study-text">{caseStudy.overview}</p>
            </div>
          )}

          {/* Architecture */}
          {caseStudy.architecture && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">Architecture</h3>
              <pre className="case-study-code-block">{caseStudy.architecture}</pre>
            </div>
          )}

          {/* Tech Stack Table */}
          {caseStudy.techStackTable && caseStudy.techStackTable.length > 0 && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">Tech Stack</h3>
              <table className="case-study-table">
                <thead>
                  <tr>
                    <th className="case-study-table-header">Layer</th>
                    <th className="case-study-table-header">Technology</th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudy.techStackTable.map((row, index) => (
                    <tr key={index}>
                      <td className="case-study-table-cell">{row.layer}</td>
                      <td className="case-study-table-cell">{row.technology}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Project Structure */}
          {caseStudy.projectStructure && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">Project Structure</h3>
              <pre className="case-study-code-block">{caseStudy.projectStructure}</pre>
            </div>
          )}

          {/* API Endpoints */}
          {caseStudy.apiEndpoints && caseStudy.apiEndpoints.length > 0 && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">API Endpoints</h3>
              <table className="case-study-table">
                <thead>
                  <tr>
                    <th className="case-study-table-header">Method</th>
                    <th className="case-study-table-header">Endpoint</th>
                    <th className="case-study-table-header">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudy.apiEndpoints.map((endpoint, index) => (
                    <tr key={index}>
                      <td className="case-study-table-cell">{endpoint.method}</td>
                      <td className="case-study-table-cell"><code className="case-study-inline-code">{endpoint.endpoint}</code></td>
                      <td className="case-study-table-cell">{endpoint.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Thought Process */}
          {caseStudy.thoughtProcess && caseStudy.thoughtProcess.length > 0 && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">My Thought Process</h3>
              <ul className="case-study-list">
                {caseStudy.thoughtProcess.map((thought, index) => (
                  <li key={index} className="case-study-list-item">
                    {thought}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Features */}
          {caseStudy.keyFeatures && caseStudy.keyFeatures.length > 0 && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">Key Features</h3>
              <ul className="case-study-list">
                {caseStudy.keyFeatures.map((feature, index) => (
                  <li key={index} className="case-study-list-item">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {caseStudy.challenges && caseStudy.challenges.length > 0 && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">Challenges & Solutions</h3>
              <ul className="case-study-list">
                {caseStudy.challenges.map((challenge, index) => (
                  <li key={index} className="case-study-list-item">
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lessons Learned */}
          {caseStudy.lessons && caseStudy.lessons.length > 0 && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">Lessons Learned</h3>
              <ul className="case-study-list">
                {caseStudy.lessons.map((lesson, index) => (
                  <li key={index} className="case-study-list-item">
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Project Details */}
          {(caseStudy.timeline || caseStudy.role) && (
            <div className="case-study-section">
              <h3 className="case-study-section-title">Project Details</h3>
              <div className="case-study-details">
                {caseStudy.role && (
                  <div className="case-study-detail-item">
                    <span className="case-study-detail-label">Role:</span>
                    <span className="case-study-detail-value">{caseStudy.role}</span>
                  </div>
                )}
                {caseStudy.timeline && (
                  <div className="case-study-detail-item">
                    <span className="case-study-detail-label">Timeline:</span>
                    <span className="case-study-detail-value">{caseStudy.timeline}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Links */}
        <div className="case-study-footer">
          <div className="case-study-links">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="case-study-link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            )}
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="case-study-link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                {project.liveLabel || 'View Live'}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCaseStudy;
