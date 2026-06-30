'use client';

import React, { useState } from 'react';

/* ── Data ─────────────────────────────────────────────────── */
const PROJECTS = [
  {
    n: '01', title: 'OZZY', org: 'HACKSLU 2025', badge: 'MOST INNOVATIVE', year: '2025', featured: true,
    overview: 'React Native app built in 24 hours that helps users with speech difficulties communicate. Designed the complete frontend, brand identity, and logo, with secure Whisper API integration for real-time speech processing.',
    features: [
      'Designed the complete React Native frontend and created Ozzy\'s brand identity and logo',
      'Integrated Whisper API with secure API calls for real-time speech processing',
      'Won Most Innovative Project at HackSLU 2025 among 3-person teams in under 24 hours',
      'Cross-platform iOS + Android via React Native & Expo',
    ],
    tech: ['React Native', 'TypeScript', 'Expo', 'Whisper API'],
    stack: [
      { l: 'Framework', t: 'React Native & Expo' },
      { l: 'Language',  t: 'TypeScript' },
      { l: 'Speech AI', t: 'OpenAI Whisper API' },
      { l: 'Audio',     t: 'Expo AV & Expo Speech' },
    ],
    github: 'https://github.com/mhashir03/Ozzy',
    live:   'https://ozzy-website-git-main-mhashir03s-projects.vercel.app/',
  },
  {
    n: '02', title: 'KIRA', org: 'DEVFEST WASHU 2025', badge: 'TOP 10', year: '2025', featured: true,
    overview: 'AI-powered medical triage web app built with Next.js, React, and Gemini API. Responsive frontend with voice input and real-time AI symptom analysis — pivoted mid-hackathon to earn Top 10 among 40+ teams in under 24 hours.',
    features: [
      'Built AI-powered medical triage application using Next.js, React, and Gemini API',
      'Developed responsive frontend with voice input and real-time AI symptom analysis workflows',
      'Pivoted mid-hackathon, earning Top 10 among 40+ teams in under 24 hours',
      'Results include specialist recommendations and clear medical disclaimers',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini AI'],
    stack: [
      { l: 'Framework', t: 'Next.js + React' },
      { l: 'Language',  t: 'TypeScript' },
      { l: 'AI',        t: 'Google Gemini API' },
      { l: 'Voice',     t: 'Web Speech API' },
    ],
    github: 'https://github.com/mhashir03/Kira',
    live:   'https://kira-f8ypdssba-mhashir03s-projects.vercel.app/',
  },
  {
    n: '03', title: 'OPEN POLITIC', org: 'FALL 2025', badge: null, year: '2025', featured: true,
    overview: 'Full-stack platform for searching and exploring U.S. legislation. Led Scrum ceremonies for a 5-person team while developing the Next.js/React frontend and integrating Congress.gov REST APIs.',
    features: [
      'Led Scrum ceremonies for a 5-person team while developing the Next.js/React frontend using Trello',
      'Integrated Congress.gov REST APIs powering real-time policy search and filtering',
      'Containerized application with Docker and collaborated on backend integration and deployment workflows',
    ],
    tech: ['Next.js', 'Spring Boot', 'MongoDB', 'Docker'],
    stack: [
      { l: 'Frontend', t: 'Next.js + React' },
      { l: 'Backend',  t: 'Spring Boot' },
      { l: 'Database', t: 'MongoDB' },
      { l: 'DevOps',   t: 'Docker + CI/CD' },
    ],
    github: 'https://github.com/ngup1/PolicyMe',
    live:   null,
  },
  {
    n: '04', title: 'MIDAS CORE', org: 'JPMORGAN CHASE', badge: null, year: '2025',
    overview: 'Real-time financial transaction processor built to JPMorgan engineering standards. Spring Boot service consumes from Kafka, validates transactions, writes full audit trails via JPA, and exposes REST balance APIs.',
    features: [
      'Kafka consumer processes transactions asynchronously at scale',
      'Full validation: checks sender/recipient existence and sufficient balance',
      'Complete JPA audit trail with proper relational model and constraints',
      'External incentive API integration for reward calculations',
    ],
    tech: ['Java', 'Spring Boot', 'Apache Kafka', 'JPA', 'REST'],
    stack: [
      { l: 'Framework', t: 'Spring Boot 3.2.5' },
      { l: 'Messaging', t: 'Apache Kafka' },
      { l: 'Database',  t: 'H2 + Spring Data JPA' },
      { l: 'Build',     t: 'Maven' },
    ],
    github: 'https://github.com/mhashir03/Midas-Core',
    live:   null,
  },
  {
    n: '05', title: 'PROP. REC. SYS.', org: 'AUTOMAX AI', badge: null, year: '2025',
    overview: 'ML system that finds and ranks comparable properties for real estate appraisals. Benchmarks Random Forest, Gradient Boosting, and SVM, then adds an explainability layer so appraisers can trust every recommendation.',
    features: [
      'Ensemble approach: RF, GBM, and SVM benchmarked then combined',
      'Feature engineering across property data, location, and text descriptions',
      'Explainable AI — feature importance scores per recommendation',
      'Evaluated on precision, recall, F1, MAP, and NDCG',
    ],
    tech: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'ML'],
    stack: [
      { l: 'Language', t: 'Python' },
      { l: 'ML',       t: 'scikit-learn' },
      { l: 'Data',     t: 'pandas, NumPy' },
      { l: 'Models',   t: 'RF, GBM, SVM, Ensemble' },
    ],
    github: 'https://github.com/mhashir03/property-recommendation-system',
    live:   null,
  },
  {
    n: '06', title: 'PA PIPELINE', org: 'MANDOLIN', badge: null, year: '2025',
    overview: 'End-to-end pipeline that reads unstructured medical referral PDFs via OCR + NLP and fills structured PA forms automatically. Includes image preprocessing, confidence scoring, and missing-field reports.',
    features: [
      'Dual-mode: direct PDF text extraction first, Tesseract OCR fallback for scans',
      'Image preprocessing (grayscale, denoising, thresholding) before OCR',
      'Regex + fuzzy matching maps extracted fields to form fields',
      'Confidence scores flag which fields need human review',
    ],
    tech: ['Python', 'Tesseract OCR', 'PyPDF2', 'pdfplumber', 'NLP'],
    stack: [
      { l: 'Language', t: 'Python 3.8+' },
      { l: 'OCR',      t: 'Tesseract' },
      { l: 'PDF',      t: 'PyPDF2, pdfplumber' },
      { l: 'Imaging',  t: 'OpenCV, PIL/Pillow' },
    ],
    github: 'https://github.com/mhashir03/Multimodal-PA-Pipeline',
    live:   null,
  },
  {
    n: '07', title: 'RECOIL SCRIPT', org: 'PERSONAL', badge: null, year: '2023',
    overview: 'Lua macro for Logitech G HUB that interfaces with hardware API for precise, consistent mouse movement automation. Event-driven architecture with millisecond-level timing, Caps Lock toggle, and multi-input detection.',
    features: [
      'Event-driven: watches for specific mouse + keyboard combinations',
      'Millisecond-level timing for natural-feeling movement patterns',
      'Caps Lock toggle for instant on/off mid-session',
      'Direct Logitech G HUB Scripting API integration',
    ],
    tech: ['Lua', 'Logitech G HUB API', 'Input Automation'],
    stack: [
      { l: 'Language', t: 'Lua' },
      { l: 'Platform', t: 'Logitech G HUB' },
      { l: 'API',      t: 'G HUB Scripting API' },
      { l: 'Domain',   t: 'Input Automation' },
    ],
    github: 'https://github.com/mhashir03/Recoil-Script',
    live:   null,
  },
];

/* ── Component ────────────────────────────────────────────── */
export default function WorkBrutalist() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAll,  setShowAll]  = useState(false);

  const visible = showAll ? PROJECTS : PROJECTS.filter(p => p.featured);

  function toggle(n: string) {
    setExpanded(prev => (prev === n ? null : n));
  }

  return (
    <section id="projects" style={{ padding: '80px 0 60px', borderTop: '1px solid var(--br-line)', background: 'var(--br-bg)', color: 'var(--br-ink)', fontFamily: 'var(--font-archivo)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>

        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 13, color: 'var(--br-accent)' }}>01</span>
          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-ink3)', letterSpacing: '.12em' }}>PROJECTS</span>
        </div>

        <h2 style={{ fontWeight: 900, fontSize: 'clamp(36px,6vw,72px)', lineHeight: .9, letterSpacing: '-.04em', margin: '0 0 36px', textTransform: 'uppercase' }}>
          What I&rsquo;ve<br />Built.
        </h2>

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 1fr 64px', borderBottom: '2px solid var(--br-line)', paddingBottom: 10, fontFamily: 'var(--font-mono-sp)', fontSize: 10, color: 'var(--br-ink3)', letterSpacing: '.1em' }}>
          <span>#</span><span>PROJECT</span><span>CONTEXT</span><span style={{ textAlign: 'right' }}>YR</span>
        </div>

        {visible.map(p => {
          const isOpen = expanded === p.n;
          return (
            <article key={p.n} className={`br-project${isOpen ? ' br-project--open' : ''}`} style={{ borderBottom: '1px solid var(--br-line)', background: isOpen ? 'var(--br-panel)' : 'transparent', transition: 'background .2s', position: 'relative', overflow: 'hidden' }}>

              {/* Ghost number */}
              <div className="br-project-ghost" style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-58%)', fontWeight: 900, fontSize: 'clamp(80px,14vw,200px)', color: 'var(--br-ink)', opacity: isOpen ? .07 : .04, pointerEvents: 'none', userSelect: 'none', lineHeight: 1, letterSpacing: '-.06em', transition: 'opacity .3s' }}>
                {p.n}
              </div>

              {/* Clickable row */}
              <div
                className="br-project-row"
                onClick={() => toggle(p.n)}
                style={{ display: 'grid', gridTemplateColumns: '44px 1fr 1fr 64px', alignItems: 'start', padding: '18px 0', cursor: 'pointer', borderLeft: `3px solid ${isOpen ? 'var(--br-accent)' : 'transparent'}`, transition: 'border-color .2s', gap: 8, position: 'relative', zIndex: 1 }}
              >
                <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, color: 'var(--br-ink3)', paddingLeft: 10, paddingTop: 3 }}>{p.n}</span>
                <div style={{ paddingRight: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 'clamp(17px,2.2vw,23px)', letterSpacing: '-.02em' }}>{p.title}</span>
                    {p.badge && (
                      <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 10, fontWeight: 700, padding: '3px 8px', background: 'var(--br-accent)', color: 'var(--br-on-accent)', whiteSpace: 'nowrap' }}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 10, color: 'var(--br-ink3)', border: '1px solid var(--br-line2)', padding: '2px 7px' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, color: 'var(--br-ink3)', paddingTop: 3 }}>{p.org}</div>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'flex-end', gap: 6, paddingTop: 3 }}>
                  <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, color: 'var(--br-ink3)' }}>{p.year}</span>
                  <span className="br-project-arrow" style={{ fontSize: 15, color: 'var(--br-accent)', fontWeight: 700 }}>{isOpen ? '↑' : '↓'}</span>
                </div>
              </div>

              {/* Hover peek — hints at hidden detail */}
              {!isOpen && (
                <div className="br-project-peek">
                  <p className="br-project-peek-text">{p.overview}</p>
                </div>
              )}

              {/* Expanded detail */}
              {isOpen && (
                <div style={{ padding: '4px 0 28px 57px', animation: 'brRise .22s ease' }}>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--br-ink2)', maxWidth: 680, margin: '0 0 20px', paddingRight: 20 }}>{p.overview}</p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', borderTop: '1px solid var(--br-line2)' }}>
                    {/* Features */}
                    <div style={{ padding: '18px 20px 18px 0', borderRight: '1px solid var(--br-line2)' }}>
                      <div style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 10, color: 'var(--br-ink3)', letterSpacing: '.1em', marginBottom: 14 }}>KEY FEATURES</div>
                      {p.features.map((f, fi) => (
                        <div key={fi} style={{ display: 'flex', gap: 10, marginBottom: 9, alignItems: 'start' }}>
                          <span style={{ color: 'var(--br-accent)', fontWeight: 700, lineHeight: 1.5, fontSize: 13, flexShrink: 0 }}>—</span>
                          <span style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--br-ink)' }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    {/* Stack */}
                    <div style={{ padding: '18px 0 18px 20px' }}>
                      <div style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 10, color: 'var(--br-ink3)', letterSpacing: '.1em', marginBottom: 14 }}>STACK</div>
                      {p.stack.map((r, ri) => (
                        <div key={ri} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 8, marginBottom: 8 }}>
                          <span style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 11, color: 'var(--br-ink3)' }}>{r.l}</span>
                          <span style={{ fontSize: 13, color: 'var(--br-ink)' }}>{r.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
                    {p.github && (
                      <a className="br-link-chip" href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, color: 'var(--br-ink2)', border: '1px solid var(--br-line)', padding: '8px 14px', textDecoration: 'none' }}>GITHUB ↗</a>
                    )}
                    {p.live && (
                      <a className="br-link-chip br-link-chip--accent" href={p.live} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono-sp)', fontSize: 12, color: 'var(--br-on-accent)', background: 'var(--br-accent)', border: '1px solid var(--br-accent)', padding: '8px 14px', textDecoration: 'none', fontWeight: 700 }}>WEBSITE ↗</a>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}

        {!showAll && (
          <button
            className="br-expand-btn"
            onClick={() => setShowAll(true)}
            style={{
              display: 'block', width: '100%', marginTop: 28,
              padding: '16px 24px', cursor: 'pointer',
              fontFamily: 'var(--font-mono-sp)', fontSize: 12, letterSpacing: '.08em',
              background: 'transparent', color: 'var(--br-ink2)',
              border: '1px solid var(--br-line)',
            }}
          >
            VIEW ALL PROJECTS ↓
          </button>
        )}

        {showAll && (
          <button
            className="br-expand-btn"
            onClick={() => {
              setShowAll(false);
              if (expanded && !PROJECTS.find(p => p.featured && p.n === expanded)) {
                setExpanded(null);
              }
            }}
            style={{
              display: 'block', width: '100%', marginTop: 28,
              padding: '16px 24px', cursor: 'pointer',
              fontFamily: 'var(--font-mono-sp)', fontSize: 12, letterSpacing: '.08em',
              background: 'transparent', color: 'var(--br-ink2)',
              border: '1px solid var(--br-line)',
            }}
          >
            SHOW FEWER PROJECTS ↑
          </button>
        )}
      </div>
    </section>
  );
}
