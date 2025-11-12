import React from 'react';

const Education = () => {
  return (
    <div className="bento-item bento-education">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">Education</span>
      </div>
      <div className="terminal-content">
        <p>
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"> cat education.json</span>
        </p>
        <div className="terminal-output">
          <pre className="whitespace-pre-wrap">
{`{
  "university": "Saint Louis University",
  "location": "St. Louis, MO",
  "degree": "Computer Science",
  "graduation": "May 2026",
  "courses": [
    "Data Structures (C++)",
    "Algorithms (C++)",
    "Databases (SQL)",
    "Operating Systems (C)",
    "Distributed Computing (C)",
    "Software Engineering (Java)",
    "Object-Oriented Programming (Java)"
  ]
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Education; 