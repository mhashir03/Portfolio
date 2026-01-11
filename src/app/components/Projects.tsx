'use client';

import React, { useState } from 'react';
import ProjectCaseStudy from './ProjectCaseStudy';

const projects = [
  {
    title: 'Ozzy',
    badge: '🏆 Winner',
    badgeContext: 'HackSLU 2025',
    description: 'Voice assistance mobile app using OpenAI Whisper API to help users with speech difficulties communicate more effectively through real-time speech recognition and clarification.',
    tech: ['React Native', 'TypeScript', 'Expo', 'OpenAI Whisper API'],
    github: 'https://github.com/mhashir03/Ozzy',
    live: 'https://www.useozzy.com/',
    liveLabel: 'Website',
    featured: true,
    caseStudy: {
      overview: 'Mobile app that helps users with speech difficulties communicate more effectively. Uses OpenAI Whisper API for speech recognition and text-to-speech for clear playback. Built for HackSLU 2025\'s Assistive Technology track.',
      problem: 'People with speech difficulties face communication challenges leading to social isolation. Traditional communication aids are expensive, complex, or not readily available.',
      solution: 'Real-time communication assistant using OpenAI Whisper API to capture and clarify speech, then provides clear text-to-speech playback. Features accessibility-first design with multiple language support.',
      keyFeatures: [
        'OpenAI Whisper API handles speech recognition, even for unclear speech',
        'Real-time processing from speech to text to speech output',
        'High-quality text-to-speech for clear communication',
        'Accessibility-first design with large buttons and simple navigation',
        'Works on both iOS and Android using React Native'
      ],
      techStackTable: [
        { layer: 'Framework', technology: 'React Native & Expo' },
        { layer: 'Language', technology: 'TypeScript' },
        { layer: 'Speech Recognition', technology: 'OpenAI Whisper API' },
        { layer: 'Audio', technology: 'Expo AV & Expo Speech' }
      ],
      thoughtProcess: [
        'I chose OpenAI Whisper API because it handles unclear speech really well',
        'Designed the UI with accessibility in mind from the start, using large buttons and clear navigation',
        'Built real-time audio processing using Expo AV',
        'Added text-to-speech with multiple voice options so users can choose what works best'
      ],
      challenges: [
        'Getting the OpenAI Whisper API integrated with good error handling',
        'Making it fast enough for real-time use without losing accuracy',
        'Building an interface that works for people with different needs',
        'Getting everything done in 24 hours for the hackathon'
      ],
      lessons: [
        'Accessibility needs to be built in from the beginning, not added later',
        'APIs like Whisper handle tricky cases way better than simpler solutions',
        'Real-time processing means you have to optimize every API call',
        'Testing with real users shows you problems you never would have thought of'
      ],
      timeline: '24 hours (Hackathon)',
      role: 'Full-stack Developer & Designer'
    },
  },
  {
    title: 'Kira',
    badge: '⭐ Featured',
    badgeContext: 'Google DevFest WashU 2025',
    description: 'AI-powered medical triage application combining voice recognition with Google Gemini AI to help users understand symptoms and assess potential health conditions.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Google Gemini AI'],
    github: 'https://github.com/mhashir03/Kira',
    live: 'https://www.usekiraapp.com/',
    liveLabel: 'Website',
    featured: true,
    caseStudy: {
      overview: 'AI-powered medical triage app combining voice recognition with Google Gemini AI. Uses speech-to-text to capture symptoms, then provides analysis including possible conditions and recommended specialists.',
      problem: 'People lack accessible health information and often turn to unreliable sources. Traditional symptom checkers are text-based and intimidating.',
      solution: 'Voice-first medical triage app using Google Gemini AI for symptom analysis. Provides structured results with clear disclaimers in a modern glassmorphism UI.',
      keyFeatures: [
        'Voice input that converts speech to text',
        'Google Gemini AI analyzes symptoms and suggests possible conditions',
        'Shows results with conditions, recommended specialists, and important disclaimers',
        'Modern glassmorphism design that feels friendly, not clinical',
        'Real-time feedback so users know the AI is working'
      ],
      techStackTable: [
        { layer: 'Framework', technology: 'Next.js with React' },
        { layer: 'Language', technology: 'TypeScript' },
        { layer: 'AI Integration', technology: 'Google Gemini API' },
        { layer: 'Voice Recognition', technology: 'Web Speech API' }
      ],
      thoughtProcess: [
        'Went with voice input because it feels more natural than typing',
        'Picked Google Gemini AI because it understands medical context really well',
        'Spent time crafting prompts so the AI gives useful medical information',
        'Designed the UI to feel friendly and approachable, not like a hospital website'
      ],
      challenges: [
        'Getting the Gemini API working with good error handling and parsing responses',
        'Finding the right balance between being helpful and including proper medical disclaimers',
        'Figuring out the right prompts so the AI gives consistent, useful medical info',
        'Making sure the voice recognition works across different browsers'
      ],
      lessons: [
        'Voice input makes medical apps way more accessible to people',
        'You have to really think about your prompts when using AI for medical stuff',
        'Health apps need clear disclaimers and the UX has to be extra careful',
        'Showing users that something is happening makes the app feel much faster'
      ],
      timeline: '24 hours (Hackathon)',
      role: 'Full-stack Developer & Designer'
    },
  },
  {
    title: 'Midas Core',
    company: 'JPMorgan Chase',
    companyUrl: 'https://www.jpmorganchase.com/',
    description: 'Real-time transaction processing system using Spring Boot and Apache Kafka with validation, database audit trails, and REST APIs.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'JPA', 'REST'],
    github: 'https://github.com/mhashir03/Midas-Core',
    caseStudy: {
      overview: 'Midas Core is the backend component responsible for receiving, validating, and recording financial transactions. It integrates with external services for incentive calculations and exposes REST APIs for balance queries.',
      architecture: `┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Kafka     │────▶│ Midas Core  │────▶│  H2 Database│
│  (Messages) │     │  (Spring)   │     │   (SQL)     │
└─────────────┘     └──────┬──────┘     └─────────────┘
                          │
                          ▼
                   ┌─────────────┐
                   │ Incentive   │
                   │    API      │
                   └─────────────┘`,
      keyFeatures: [
        'Kafka consumer processes transactions asynchronously from message queue',
        'Validates transactions by checking sender and recipient exist and have sufficient balance',
        'Stores all transactions in database using JPA with proper relationships',
        'Integrates with external API to calculate incentive rewards',
        'REST API endpoint to query user balances'
      ],
      techStackTable: [
        { layer: 'Framework', technology: 'Spring Boot 3.2.5' },
        { layer: 'Messaging', technology: 'Apache Kafka (Spring Kafka 3.1.4)' },
        { layer: 'Database', technology: 'H2 (in-memory), Spring Data JPA' },
        { layer: 'API', technology: 'REST, JSON serialization' },
        { layer: 'Build', technology: 'Maven' }
      ],
      apiEndpoints: [
        { method: 'GET', endpoint: '/balance?userId={id}', description: 'Returns user balance as JSON' }
      ],
      challenges: [
        'Keeping data consistent across a distributed system with Kafka',
        'Building robust error handling and recovery mechanisms',
        'Creating audit trails that are complete but don\'t slow things down',
        'Making sure the APIs are secure and meet financial industry requirements'
      ],
      lessons: [
        'In financial systems, you absolutely cannot compromise on data integrity and auditability',
        'Event-driven architectures with Kafka scale really well',
        'You need really solid error handling for production financial systems',
        'Good documentation and clear code matter even more when dealing with money'
      ],
      role: 'Backend Developer'
    },
  },
  {
    title: 'Property Recommendation System',
    company: 'Automax AI',
    companyUrl: 'https://www.automax.ai/',
    description: 'ML-based system for recommending comparable properties for real estate appraisals with explainable AI and multiple model support.',
    tech: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Machine Learning'],
    github: 'https://github.com/mhashir03/property-recommendation-system',
    caseStudy: {
      overview: 'ML-based system that finds and ranks comparable properties for real estate appraisals. Uses multiple models (Random Forest, Gradient Boosting, SVM) with explainable AI features.',
      problem: 'Finding comparable properties is manual and time-consuming. The process lacks transparency and consistency.',
      solution: 'Automated ML system using multiple algorithms with explainable AI. Provides detailed explanations for each recommendation using feature importance analysis.',
      keyFeatures: [
        'Built feature engineering that combines property data, location info, and text descriptions',
        'Tried multiple ML models including Random Forest, Gradient Boosting, SVM, and ensemble methods',
        'Added explainable AI so appraisers can see why properties are recommended',
        'Evaluated using multiple metrics like precision, recall, F1, MAP, and NDCG',
        'Can generate recommendations in real-time with customizable output'
      ],
      techStackTable: [
        { layer: 'Language', technology: 'Python' },
        { layer: 'ML Framework', technology: 'scikit-learn' },
        { layer: 'Data Processing', technology: 'pandas, NumPy' },
        { layer: 'Models', technology: 'Random Forest, Gradient Boosting, SVM, Ensemble' }
      ],
      thoughtProcess: [
        'Started by figuring out what actually makes properties comparable',
        'Built a feature engineering pipeline that handles numbers, categories, and text',
        'Tried different ML algorithms and ended up using ensemble methods',
        'Added explainability features so appraisers can see why each property was recommended'
      ],
      challenges: [
        'Figuring out what actually makes properties comparable when there are so many factors',
        'Dealing with missing data without making the recommendations worse',
        'Making the explanations clear enough that appraisers actually trust them',
        'Making sure the recommendations make sense to people who do this for a living'
      ],
      lessons: [
        'Understanding the real estate domain was way more important than which algorithm I picked',
        'How I engineered the features mattered more than the specific ML model',
        'Explainable AI is crucial when professionals need to trust your recommendations',
        'Validating against what experts think helped make sure the system actually works in practice'
      ],
      role: 'ML Engineer'
    },
  },
  {
    title: 'Multimodal PA Pipeline',
    company: 'Mandolin',
    companyUrl: 'https://www.mandolin.com/',
    description: 'Automated pipeline that extracts information from unstructured medical referral packages using OCR and NLP, then fills structured PA PDF forms.',
    tech: ['Python', 'Tesseract OCR', 'PyPDF2', 'pdfplumber', 'NLP'],
    github: 'https://github.com/mhashir03/Multimodal-PA-Pipeline',
    caseStudy: {
      overview: 'Automated pipeline that extracts information from unstructured medical referral packages using OCR and NLP, then fills structured PA PDF forms. Includes advanced OCR preprocessing, confidence scoring, and comprehensive reporting.',
      problem: 'Prior authorization forms require extracting information from unstructured medical documents and manually filling structured PDF forms. This is time-consuming, error-prone, and creates bottlenecks.',
      solution: 'End-to-end automated pipeline combining advanced OCR with image preprocessing, pattern matching for medical fields, and intelligent PDF form filling. Supports both widget-based and non-widget forms with confidence scoring.',
      keyFeatures: [
        'Dual-mode extraction that tries to read PDF text first, then falls back to OCR for scanned docs',
        'Image preprocessing to clean up scans before OCR (grayscale, noise reduction, thresholding)',
        'Smart field matching using regex patterns and fuzzy matching to find the right fields',
        'Confidence scores so users know how reliable the extracted data is',
        'Works with both fillable PDF forms and static PDFs that need text overlay',
        'Generates reports showing what fields are missing and why'
      ],
      techStackTable: [
        { layer: 'Language', technology: 'Python 3.8+' },
        { layer: 'OCR Engine', technology: 'Tesseract OCR' },
        { layer: 'PDF Processing', technology: 'PyPDF2, pdfplumber' },
        { layer: 'Image Processing', technology: 'OpenCV, PIL/Pillow' }
      ],
      architecture: `input_data/
├── Patient A/
│   ├── PA.pdf                 # Structured PA form to fill
│   └── referral_package.pdf   # Unstructured referral documents
└── output/
    ├── PA_filled.pdf          # Completed PA form
    ├── missing_fields.txt     # Missing fields report
    └── processing_report.md   # Comprehensive processing report`,
      thoughtProcess: [
        'Built a system that tries to extract text from PDFs directly, then uses OCR if that doesn\'t work',
        'Added image preprocessing to clean up scans before running OCR, which made a huge difference',
        'Created regex patterns to find common medical fields like patient info and ICD codes',
        'Built a matching system that scores how confident it is about each field it finds'
      ],
      challenges: [
        'Getting OCR to work well on really poor quality scanned documents',
        'Pulling structured info out of messy, unstructured medical text',
        'Matching extracted data to form fields when the field names are all different',
        'Making it work with both fillable PDFs and static PDFs that need text overlay'
      ],
      lessons: [
        'Preprocessing images before OCR makes a huge difference, especially on bad scans',
        'Trying to extract text directly first, then falling back to OCR, is way more reliable',
        'Confidence scores help users know what to double-check and what they can trust',
        'When automating healthcare stuff, you have to be extra careful about accuracy'
      ],
      role: 'ML Engineer'
    },
  },
  {
    title: 'Logitech Anti-Recoil Script',
    description: 'A Lua macro script for Logitech Gaming Software that provides precise mouse input automation for recoil compensation in FPS games.',
    tech: ['Lua', 'Logitech G HUB API', 'Input Automation'],
    github: 'https://github.com/mhashir03/Recoil-Script',
    caseStudy: {
      overview: 'Lua macro script for Logitech Gaming Software that provides precise mouse input automation. Demonstrates event-driven programming, hardware API integration, and millisecond-level timing control.',
      problem: 'FPS games require precise recoil control that can be difficult to master consistently. Manual compensation varies and can be inconsistent.',
      solution: 'Lua script that interfaces with Logitech\'s hardware API to simulate precise, consistent mouse movements. Uses event-driven programming to detect input combinations and apply calculated compensation.',
      keyFeatures: [
        'Event-driven system that responds to specific mouse and keyboard combinations',
        'Precise timing control down to milliseconds for realistic movement',
        'Detects multiple inputs at once like Caps Lock, right-click, and left-click',
        'Calculates relative mouse movements in controlled patterns',
        'Integrates directly with Logitech G HUB API'
      ],
      techStackTable: [
        { layer: 'Language', technology: 'Lua' },
        { layer: 'Platform', technology: 'Logitech Gaming Software / G Hub' },
        { layer: 'API', technology: 'Logitech G HUB Scripting API' }
      ],
      thoughtProcess: [
        'Spent time reading through Logitech\'s API docs to understand what was possible',
        'Built an event-driven system that watches for specific input combinations',
        'Added Caps Lock checking so users can easily turn it on and off',
        'Tweaked the movement values and timing over and over until it felt natural'
      ],
      challenges: [
        'Getting the timing right down to the millisecond so it feels natural',
        'Tracking multiple inputs happening at the same time',
        'Making the movement patterns feel human, not robotic',
        'Working around the limitations of what Logitech\'s API can actually do'
      ],
      lessons: [
        'You really have to dig into the API docs when working with hardware APIs',
        'Event-driven programming works great for this kind of input automation',
        'Getting the timing right is everything if you want it to feel realistic',
        'Managing state gets complicated when you\'re watching multiple inputs at once'
      ],
      role: 'Developer'
    },
  },
];

const featuredProjects = projects.filter(p => p.featured);
const otherProjects = projects.filter(p => !p.featured);

const ProjectCard = ({ 
  project, 
  index, 
  isExpanded, 
  onClick 
}: { 
  project: typeof projects[0]; 
  index: number; 
  isExpanded?: boolean;
  onClick: () => void;
}) => (
  <article 
    className={`project-card ${project.featured ? 'card-featured' : ''} project-card-clickable`}
    style={isExpanded ? { 
      animationDelay: `${index * 0.08}s`,
    } : undefined}
    onClick={onClick}
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
        onClick={(e) => e.stopPropagation()}
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
          onClick={(e) => e.stopPropagation()}
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
          onClick={(e) => e.stopPropagation()}
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
    <div className="project-card-hint">
      <span className="text-xs text-[--color-text-muted]">Click to read case study →</span>
    </div>
  </article>
);

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };

  const handleCloseCaseStudy = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="section">
        <div className="container">
          <div className="section-header">
            <p className="section-title">Projects</p>
            <h2>Things I've Built</h2>
          </div>
          
          {/* Featured Projects */}
          <div className="projects-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={index}
                onClick={() => handleProjectClick(project)}
              />
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
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  index={index} 
                  isExpanded={showAll}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectCaseStudy
          project={selectedProject}
          isOpen={true}
          onClose={handleCloseCaseStudy}
        />
      )}
    </>
  );
};

export default Projects;
