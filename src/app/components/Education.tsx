import React from 'react';

const courses = [
  'Data Structures',
  'Algorithms',
  'Databases',
  'Operating Systems',
  'Distributed Computing',
  'Software Engineering',
  'Object-Oriented Programming',
];

const Education = () => {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-title">Education</p>
          <h2>Where I Studied</h2>
        </div>
        
        <div className="education-card">
          <h3 className="education-school">Saint Louis University</h3>
          <p className="education-degree">Computer Science</p>
          <p className="education-meta">St. Louis, MO · Expected May 2026</p>
          
          <div className="education-courses">
            {courses.map((course) => (
              <span key={course} className="tag">{course}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
