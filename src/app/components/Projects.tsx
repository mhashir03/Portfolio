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
      overview: 'Ozzy is a mobile application designed to help users with speech difficulties communicate more effectively. The app uses advanced speech recognition via OpenAI\'s Whisper API to capture and clarify spoken words, then provides clear audible playback using text-to-speech technology. Built for HackSLU 2025\'s Assistive Technology track, Ozzy bridges the gap between spoken words and clear communication.',
      problem: 'Many individuals face communication challenges due to speech impediments, neurological conditions, or language barriers. These challenges lead to frustration during everyday conversations, social isolation, reduced independence, and decreased quality of life. Traditional communication aids are often expensive, complex, or not readily available when needed.',
      solution: 'A real-time communication assistant that captures speech through advanced audio recording, processes and clarifies speech using OpenAI\'s Whisper API (which handles slurred or unclear speech), and provides clear, audible playback using high-quality text-to-speech. The app features an accessibility-first design with intuitive interface, multiple language support, and adaptive theming.',
      keyFeatures: [
        'Advanced Speech Recognition — OpenAI Whisper API for converting speech to text with special handling for slurred or unclear speech',
        'Real-time Processing — Quick turnaround from speech capture to enhanced output',
        'Text-to-Speech Playback — High-quality voice synthesis for clear communication',
        'Multiple Language Support — Use in various languages to assist diverse users',
        'Accessibility-First Design — Intuitive interface designed for users of all abilities with large buttons and clear navigation',
        'Dark/Light Mode — Adaptive theming with context API for comfortable viewing in any environment',
        'Cross-Platform — React Native & Expo for iOS and Android support',
        'Audio Recording & Playback — Expo AV for seamless audio handling'
      ],
      techStackTable: [
        { layer: 'Framework', technology: 'React Native & Expo' },
        { layer: 'Language', technology: 'TypeScript' },
        { layer: 'Speech Recognition', technology: 'OpenAI Whisper API' },
        { layer: 'Audio Recording', technology: 'Expo AV' },
        { layer: 'Text-to-Speech', technology: 'Expo Speech' },
        { layer: 'Navigation', technology: 'React Navigation' },
        { layer: 'State Management', technology: 'Context API for theming' }
      ],
      thoughtProcess: [
        'Identified the problem: communication challenges leading to social isolation and reduced independence',
        'Researched existing communication aids and identified their limitations (cost, complexity, availability)',
        'Chose OpenAI Whisper API for its advanced speech recognition capabilities, especially for unclear speech',
        'Designed an accessibility-first UI with large buttons, clear navigation, and intuitive controls',
        'Implemented real-time audio recording using Expo AV for seamless capture',
        'Integrated Whisper API for speech-to-text conversion with error handling',
        'Added text-to-speech using Expo Speech with multiple voice options',
        'Created adaptive theming system (dark/light mode) using Context API',
        'Implemented multiple language support to serve diverse user needs',
        'Tested with potential users during hackathon to ensure interface was intuitive',
        'Optimized for quick processing to enable real-time communication assistance'
      ],
      challenges: [
        'Integrating OpenAI Whisper API with proper error handling and API key management',
        'Achieving real-time processing while maintaining accuracy for unclear speech',
        'Finding the right balance between features and simplicity for accessibility',
        'Ensuring the app worked smoothly across different devices and screen sizes',
        'Implementing text-to-speech that felt natural and clear for communication',
        'Creating an interface that was accessible to users with different abilities and needs',
        'Handling audio recording permissions and device compatibility',
        'Optimizing API calls to minimize latency while maintaining quality',
        'Building within 24-hour hackathon constraints while maintaining code quality'
      ],
      lessons: [
        'Accessibility should be a core consideration from the start, not an afterthought - it shapes the entire design',
        'Advanced APIs like Whisper can handle edge cases (slurred speech) that simpler solutions cannot',
        'Real-time processing requires careful optimization of API calls and audio handling',
        'User testing early and often revealed issues we wouldn\'t have caught otherwise',
        'Adaptive theming and multiple language support significantly expand the user base',
        'Cross-platform development with React Native/Expo enables rapid iteration',
        'Sometimes the simplest solution is the most effective - focusing on core functionality first',
        'Building for a specific user group (people with speech difficulties) requires deep empathy and understanding',
        'Hackathon constraints force prioritization - focusing on what matters most for users',
        'Clear communication is fundamental to human connection - technology can bridge gaps when designed thoughtfully'
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
      overview: 'Kira is an AI-powered medical triage application that combines voice recognition with Google\'s advanced Gemini AI to help users understand their symptoms and assess potential health conditions. The app uses speech-to-text to capture detailed symptom descriptions, then leverages Gemini\'s language understanding to provide comprehensive analysis including symptom summaries, possible conditions, recommended specialists, and medical guidance.',
      problem: 'Many people experience health symptoms but lack accessible, reliable information to understand what they might mean. They often turn to unreliable sources or feel overwhelmed by medical jargon. Traditional symptom checkers are text-based and can be intimidating, while voice-based solutions are more natural and accessible.',
      solution: 'A voice-first medical triage application that uses speech recognition to capture natural symptom descriptions, then processes them through Google\'s Gemini AI for comprehensive analysis. The app provides structured results including symptom summaries, possible conditions, appropriate medical specialists, and clear disclaimers, all presented in a modern glassmorphism UI that feels approachable rather than clinical.',
      keyFeatures: [
        'Voice Symptom Analysis — Speech-to-text for capturing detailed symptom descriptions through natural speech',
        'Google Gemini AI Integration — Advanced language understanding for rapid symptom analysis with structured prompting',
        'Comprehensive Results — Symptom summary, possible conditions, recommended specialists, and medical disclaimers',
        'Glassmorphism Design — Modern UI with gradient accents and beautiful visual design',
        'Real-Time Feedback — Clear status indicators during AI processing',
        'Responsive Design — Optimized experience across all devices and browsers',
        'Custom Prompt Engineering — Medically-relevant outputs with structured response handling',
        'Robust Error Handling — Graceful degradation with fallback mechanisms'
      ],
      techStackTable: [
        { layer: 'Framework', technology: 'Next.js with React' },
        { layer: 'Language', technology: 'TypeScript' },
        { layer: 'Styling', technology: 'Tailwind CSS with custom medical theme' },
        { layer: 'AI Integration', technology: 'Google Generative AI API (Gemini)' },
        { layer: 'Voice Recognition', technology: 'Web Speech API (Speech-to-Text)' },
        { layer: 'State Management', technology: 'React hooks and context' },
        { layer: 'UI Components', technology: 'Custom components with glassmorphism design' }
      ],
      thoughtProcess: [
        'Recognized the need for accessible health information that doesn\'t replace medical advice',
        'Chose voice-first approach for natural, accessible symptom input using Web Speech API',
        'Selected Google Gemini AI for its advanced language understanding and medical context capabilities',
        'Designed custom prompt engineering for medically-relevant, structured outputs',
        'Created glassmorphism UI design to feel modern and approachable, not clinical',
        'Implemented real-time feedback and status indicators for better UX during AI processing',
        'Built robust error handling with fallback mechanisms for API failures',
        'Designed response parsing system to handle structured data display',
        'Ensured the UI was calming and approachable, not clinical or intimidating',
        'Included comprehensive disclaimers to emphasize informational nature, not diagnostic',
        'Optimized for responsive design across all devices and browsers'
      ],
      challenges: [
        'Integrating Google Gemini API with proper error handling and response parsing',
        'Balancing helpful information with appropriate medical disclaimers and legal considerations',
        'Creating custom prompt engineering for consistent, medically-relevant AI responses',
        'Implementing robust speech-to-text with browser compatibility and permission handling',
        'Designing glassmorphism UI that feels modern yet trustworthy for medical context',
        'Handling API rate limits and optimizing response processing for real-time feedback',
        'Ensuring graceful degradation when AI API calls fail or timeout',
        'Creating structured response parsing with fallback mechanisms for varied AI outputs',
        'Balancing user experience with medical accuracy and appropriate disclaimers',
        'Optimizing for cross-browser compatibility, especially for Web Speech API'
      ],
      lessons: [
        'Voice-first interfaces make medical apps more accessible and natural to use',
        'Advanced AI models like Gemini require careful prompt engineering for domain-specific outputs',
        'When dealing with health information, clarity and appropriate disclaimers are crucial for legal and ethical reasons',
        'Glassmorphism design can make medical apps feel modern and approachable without losing trust',
        'Real-time feedback during AI processing significantly improves perceived performance',
        'Robust error handling and fallback mechanisms are essential when integrating third-party AI APIs',
        'Custom prompt engineering is key to getting structured, medically-relevant responses from general-purpose AI',
        'User experience in health apps requires extra care and empathy - the interface matters as much as the information',
        'Next.js provides excellent performance out of the box, which is crucial for real-time AI interactions',
        'Sometimes the most important feature is how information is presented, not just what information is presented',
        'Cross-browser compatibility testing is essential when using newer APIs like Web Speech API'
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
        'Kafka Consumer — Asynchronous transaction ingestion via message queue',
        'Transaction Validation — Verifies sender/recipient existence and sufficient balance',
        'Database Persistence — Records transactions with JPA entity relationships',
        'Incentive Integration — Calls external REST API to calculate recipient rewards',
        'Balance API — Exposes /balance endpoint for querying user balances'
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
        'Ensuring data consistency in a distributed system',
        'Implementing proper error handling and recovery',
        'Creating audit trails that were both comprehensive and performant',
        'Designing APIs that were secure and followed financial industry standards'
      ],
      lessons: [
        'In financial systems, data integrity and auditability are non-negotiable',
        'Event-driven architectures with Kafka provide excellent scalability',
        'Comprehensive error handling is critical in production systems',
        'Documentation and code clarity are especially important in financial applications'
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
      overview: 'A machine learning-based recommendation system that uses advanced feature engineering and multiple ML models to find and rank comparable properties for real estate appraisals. The system provides detailed explanations for each recommendation using feature importance analysis, making it both accurate and interpretable for appraisers.',
      problem: 'Real estate appraisals require finding comparable properties, which is traditionally a manual, time-consuming process. Appraisers need to identify properties with similar characteristics (location, size, features) to determine accurate property values, but this process lacks transparency and consistency.',
      solution: 'A comprehensive ML system that automatically identifies comparable properties using multiple algorithms (Random Forest, Gradient Boosting, SVM, and ensemble methods). The system includes explainable AI features that provide detailed explanations for each recommendation, helping appraisers understand why properties are considered comparable.',
      keyFeatures: [
        'Advanced Feature Engineering — Combines property characteristics, location data, and textual descriptions using TF-IDF',
        'Multiple ML Models — Support for Random Forest, Gradient Boosting, SVM, and ensemble methods',
        'Explainable AI — Detailed explanations for each recommendation using feature importance analysis',
        'Comprehensive Evaluation — Multiple metrics including precision, recall, F1, MAP, NDCG, and similarity scores',
        'Real-time Predictions — Generate recommendations for any property in the dataset with configurable output',
        'Feature Impact Analysis — Shows which factors drive each recommendation with quantitative scores'
      ],
      techStackTable: [
        { layer: 'Language', technology: 'Python' },
        { layer: 'ML Framework', technology: 'scikit-learn' },
        { layer: 'Data Processing', technology: 'pandas, NumPy' },
        { layer: 'Models', technology: 'Random Forest, Gradient Boosting, SVM, Ensemble' },
        { layer: 'Feature Engineering', technology: 'TF-IDF, Categorical Encoding, Scaling' },
        { layer: 'Evaluation', technology: 'Precision, Recall, F1, MAP, NDCG' },
        { layer: 'Serialization', technology: 'joblib' }
      ],
      thoughtProcess: [
        'Analyzed the key factors that make properties comparable (location, size, features, structure type, etc.)',
        'Designed a comprehensive feature engineering pipeline combining numerical, categorical, and textual data',
        'Explored multiple ML algorithms to find the best recommendation approach',
        'Implemented ensemble methods to combine the strengths of different models',
        'Built explainability features to help appraisers understand recommendations',
        'Created comprehensive evaluation metrics to measure model performance across multiple dimensions',
        'Designed a flexible system that supports real-time predictions with configurable parameters',
        'Validated recommendations against expert appraiser knowledge and domain expertise'
      ],
      challenges: [
        'Defining what makes properties truly comparable across multiple dimensions',
        'Handling missing or incomplete property data while maintaining recommendation quality',
        'Balancing multiple factors (location, size, features, price) in similarity calculations',
        'Creating meaningful explanations that appraisers can understand and trust',
        'Ensuring recommendations matched expert appraiser intuition while being data-driven',
        'Optimizing feature engineering to capture both explicit and implicit property similarities',
        'Evaluating model performance across multiple metrics (precision, recall, ranking quality)'
      ],
      lessons: [
        'Domain expertise is crucial when building ML systems - understanding the problem deeply matters more than the algorithm',
        'Feature engineering often matters more than the specific algorithm chosen - combining multiple data types is key',
        'Explainable AI is essential for gaining user trust, especially in professional domains like real estate',
        'Multiple evaluation metrics provide different perspectives - precision/recall for classification, MAP/NDCG for ranking',
        'Ensemble methods can combine strengths of different models, but add complexity',
        'Validation against expert judgment is essential - ML systems need to align with domain knowledge',
        'Data quality is foundational - proper handling of missing data and outliers significantly impacts results'
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
      overview: 'A comprehensive Python-based automated pipeline that extracts critical information from unstructured, high-resolution medical referral packets using OCR and NLP, then automatically fills structured, widget-based PA PDF forms. The system includes advanced OCR preprocessing, intelligent field matching, confidence scoring, and comprehensive reporting capabilities.',
      problem: 'Prior authorization forms in healthcare require extracting information from unstructured medical referral packages (PDFs, scanned documents) and manually filling structured PA PDF forms. This process is time-consuming, error-prone, and creates significant bottlenecks in healthcare workflows, especially when dealing with high-resolution scanned documents or poor-quality images.',
      solution: 'An end-to-end automated pipeline that combines advanced OCR with image preprocessing, pattern matching for medical fields, intelligent PDF form filling (supporting both widget-based and non-widget forms), and comprehensive reporting. The system includes confidence scoring, missing field analysis, and graceful error handling to ensure reliability in production healthcare environments.',
      keyFeatures: [
        'Dual-Mode Extraction — Direct PDF text extraction with OCR fallback for scanned documents',
        'Advanced OCR Preprocessing — Image preprocessing pipeline (grayscale, noise reduction, adaptive thresholding, morphological operations)',
        'Intelligent Field Matching — Pattern matching with regex for common medical fields and fuzzy matching for form fields',
        'Confidence Scoring — Quality assessment for extracted data with confidence levels (high/medium/low)',
        'Widget & Non-Widget Support — Handles both AcroForm fields and static PDFs with text overlay',
        'Comprehensive Reporting — Detailed processing reports with extraction results, missing fields analysis, and actionable recommendations',
        'Batch Processing — Process multiple patients simultaneously with summary reports',
        'Error Handling — Graceful degradation with detailed error reporting and logging'
      ],
      techStackTable: [
        { layer: 'Language', technology: 'Python 3.8+' },
        { layer: 'OCR Engine', technology: 'Tesseract OCR' },
        { layer: 'PDF Processing', technology: 'PyPDF2, pdfplumber' },
        { layer: 'Image Processing', technology: 'OpenCV, PIL/Pillow' },
        { layer: 'NLP', technology: 'Pattern matching, regex' },
        { layer: 'Data Processing', technology: 'JSON, file I/O' },
        { layer: 'Reporting', technology: 'Markdown, text file generation' }
      ],
      architecture: `input_data/
├── Patient A/
│   ├── PA.pdf                 # Structured PA form to fill
│   └── referral_package.pdf   # Unstructured referral documents
└── output/
    ├── PA_filled.pdf          # Completed PA form
    ├── missing_fields.txt     # Missing fields report
    ├── processing_report.md   # Comprehensive processing report
    └── extracted_referral_data.json  # Raw extraction results`,
      thoughtProcess: [
        'Identified the pain points in the prior authorization process and analyzed document types',
        'Researched OCR technologies (Tesseract) suitable for medical documents with varying quality',
        'Designed a dual-mode extraction system (direct PDF text + OCR fallback) for maximum reliability',
        'Implemented advanced image preprocessing pipeline to improve OCR accuracy on poor-quality scans',
        'Created pattern matching system for common medical fields (patient info, ICD codes, medications)',
        'Built intelligent field matching with confidence scoring to handle variations in field names',
        'Designed support for both widget-based (AcroForm) and non-widget PDFs with text overlay',
        'Implemented comprehensive reporting system with missing fields analysis and recommendations',
        'Created batch processing capabilities for handling multiple patients efficiently',
        'Added extensive error handling and logging for production reliability'
      ],
      challenges: [
        'Handling various document formats and layouts with inconsistent structures',
        'Ensuring OCR accuracy on poor-quality scanned documents and handwritten text',
        'Extracting structured information from unstructured medical text with domain-specific terminology',
        'Matching extracted data to form fields with varying naming conventions',
        'Validating extracted data accuracy before form submission in healthcare context',
        'Supporting both widget-based and non-widget PDF forms with different filling strategies',
        'Creating meaningful confidence scores that accurately reflect data quality',
        'Dealing with edge cases like missing fields, low confidence data, and document variations',
        'Building robust error handling for production healthcare environments where accuracy is critical'
      ],
      lessons: [
        'OCR accuracy is highly dependent on document quality - advanced preprocessing (grayscale, noise reduction, thresholding) significantly improves results',
        'Dual-mode extraction (direct PDF text + OCR fallback) provides better reliability than OCR alone',
        'Pattern matching with regex is effective for structured medical fields, but requires domain expertise',
        'Confidence scoring helps users understand data quality and prioritize manual review',
        'Supporting multiple PDF types (widget vs non-widget) requires different technical approaches',
        'Comprehensive reporting with actionable recommendations is crucial for user adoption',
        'Error handling and graceful degradation are essential when automating critical healthcare workflows',
        'Testing with real-world documents revealed many edge cases that weren\'t apparent initially',
        'Batch processing requires careful resource management and progress tracking',
        'Automation in healthcare requires extra care around accuracy, validation, and audit trails'
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
      overview: 'A Lua scripting project that interfaces with Logitech Gaming Software (LGS) and G Hub APIs to create precise mouse input automation. The script demonstrates event-driven programming, hardware API integration, and millisecond-level timing control for input simulation.',
      problem: 'FPS games require precise recoil control that can be difficult to master consistently. Manual recoil compensation varies between players and can be inconsistent, especially during extended gameplay sessions.',
      solution: 'A Lua macro script that interfaces with Logitech\'s hardware API to simulate precise, consistent mouse movements. The script uses event-driven programming to detect specific input combinations and applies calculated compensation movements with millisecond-level timing precision.',
      keyFeatures: [
        'Event-Driven Architecture — Responds to specific mouse button and keyboard state combinations',
        'Precise Timing Control — Millisecond-level sleep intervals for accurate movement simulation',
        'Multi-Input Detection — Monitors Caps Lock state, right-click (ADS), and left-click (fire) simultaneously',
        'Relative Movement Calculation — Applies downward and lateral movements in a controlled pattern',
        'Hardware API Integration — Direct integration with Logitech Gaming Software/G Hub APIs',
        'State Management — Proper handling of button press/release states and key lock detection'
      ],
      techStackTable: [
        { layer: 'Language', technology: 'Lua' },
        { layer: 'Platform', technology: 'Logitech Gaming Software / G Hub' },
        { layer: 'API', technology: 'Logitech G HUB Scripting API' },
        { layer: 'Input Handling', technology: 'Mouse/Keyboard event detection' },
        { layer: 'Timing', technology: 'Sleep functions for precise delays' }
      ],
      thoughtProcess: [
        'Researched Logitech\'s scripting API documentation to understand available functions',
        'Analyzed the timing requirements for realistic recoil compensation patterns',
        'Designed an event-driven system that responds to specific input combinations',
        'Implemented state checking for Caps Lock to provide an on/off toggle mechanism',
        'Created nested repeat loops to handle simultaneous button press detection',
        'Fine-tuned movement values and sleep intervals for natural-feeling compensation',
        'Tested different movement patterns to find the most effective approach'
      ],
      challenges: [
        'Achieving precise timing with millisecond-level accuracy for natural movement',
        'Handling multiple simultaneous input states (Caps Lock, right-click, left-click)',
        'Creating movement patterns that feel natural rather than robotic',
        'Understanding Logitech\'s API limitations and available functions',
        'Balancing compensation strength without over-correcting',
        'Ensuring the script only activates under specific conditions'
      ],
      lessons: [
        'Hardware API integration requires careful study of documentation and available functions',
        'Event-driven programming is powerful for input automation scenarios',
        'Precise timing control is crucial for realistic input simulation',
        'State management becomes complex when monitoring multiple inputs simultaneously',
        'Testing and iteration are essential for fine-tuning automation scripts',
        'Understanding the underlying mechanics (recoil patterns) helps create better solutions'
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
