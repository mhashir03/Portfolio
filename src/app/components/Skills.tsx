import React from 'react';

const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-title">Skills</p>
          <h2>Technologies I Use</h2>
        </div>
        
        <div className="bento-main">
          {/* Box 1 - Languages (Hero) */}
          <div className="bento-box box-1">
            <span className="bento-eyebrow">Core Stack</span>
            <h3 className="bento-heading">Languages</h3>
            <div className="bento-chips">
              <span>Python</span>
              <span>Java</span>
              <span>C/C++</span>
              <span>TypeScript</span>
              <span>JavaScript</span>
              <span>SQL</span>
            </div>
          </div>

          {/* Box 2 - Years stat */}
          <div className="bento-box box-2">
            <span className="bento-stat-large">3+</span>
            <span className="bento-stat-label">Years<br/>Coding</span>
          </div>

          {/* Box 3 - Frameworks */}
          <div className="bento-box box-3">
            <span className="bento-eyebrow-dark">Building Interfaces</span>
            <h3 className="bento-heading-dark">Frameworks</h3>
            <div className="bento-chips bento-chips-dark">
              <span>React.js</span>
              <span>Next.js</span>
              <span>React Native</span>
              <span>Spring Boot</span>
              <span>Tailwind</span>
              <span>LangChain</span>
            </div>
          </div>

          {/* Box 4 - Data & ML */}
          <div className="bento-box box-4">
            <span className="bento-eyebrow">Intelligence Layer</span>
            <h3 className="bento-heading">Data & ML</h3>
            <div className="bento-chips">
              <span>Pandas</span>
              <span>NumPy</span>
              <span>scikit-learn</span>
              <span>PyTorch</span>
              <span>OpenCV</span>
              <span>spaCy</span>
            </div>
          </div>

          {/* Box 5 - Tools stat */}
          <div className="bento-box box-5">
            <span className="bento-stat-large">20+</span>
            <span className="bento-stat-label">Tools<br/></span>
          </div>

          {/* Box 6 - DevOps */}
          <div className="bento-box box-6">
            <span className="bento-eyebrow">Infrastructure</span>
            <h3 className="bento-heading">DevOps & Cloud</h3>
            <div className="bento-chips">
              <span>Docker</span>
              <span>AWS</span>
              <span>MongoDB</span>
              <span>Kafka</span>
              <span>CI/CD</span>
              <span>Git</span>
              <span>Trello</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
