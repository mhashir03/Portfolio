import React from 'react';

const Leadership = () => {
  return (
    <div className="bento-item bento-item-wide bento-item-full-width">
      <div className="terminal-header">
        <span className="terminal-prompt">~</span>
        <span className="ml-2 text-[#e6edf3]">Leadership</span>
      </div>
      <div className="terminal-content">
        <p>
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"> cat leadership.txt</span>
        </p>
        
        <div className="terminal-output">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="mb-1">
                <span className="text-[#e6edf3] font-bold">STLCC MUSLIM STUDENT ASSOCIATION</span>
              </div>
              <div className="text-[#8b949e] mb-1">Founder & President | 2023</div>
              <ul className="list-disc ml-6 text-[#8b949e] mt-1">
                <li>Built a community from scratch, organizing regular events with 25+ attendees</li>
                <li>Managed a $2,000+ annual budget for events and activities</li>
                <li>Collaborated with 3 other campuses for cross-campus events</li>
                <li>Increased membership through targeted outreach campaigns via Instagram, flyers, and word of mouth</li>
              </ul>
            </div>
            
            <div className="flex-1">
              <p className="mb-1">
                <span className="terminal-prompt">$</span>
                <span className="terminal-command"> cat ./testimonial.txt</span>
              </p>
              <div className="bg-[#161b22] p-4 rounded border border-[#30363d] text-[#8b949e] italic">
                "As someone who had the honor of delivering a guest halaqah at STLCC, I was truly impressed by the vibrant and welcoming community Hashir built from the ground up. There was no Muslim Student Association before him, yet through his leadership, vision, and dedication, he laid the foundation for something impactful and lasting."
                <div className="text-[#58a6ff] mt-2">— Sheikh Huzaifa Hamirani</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership; 