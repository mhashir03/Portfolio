// Computer science quotes to cycle through
const quotes = [
  {
    text: "Software is a great combination between artistry and engineering.",
    author: "Bill Gates (Co-founder of Microsoft)"
  },
  {
    text: "One of my most productive days was throwing away 1,000 lines of code.",
    author: "Ken Thompson (Co-creator of Unix)"
  },
  {
    text: "The cleaner your code is, the faster you can write new features.",
    author: "James Gosling (Creator of Java)"
  },
  {
    text: "Code is read much more often than it is written.",
    author: "Guido van Rossum (Creator of Python)"
  },
  {
    text: "The best code is no code at all.",
    author: "Anders Hejlsberg (Creator of C#)"
  },
  {
    text: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.",
    author: "Mark Zuckerberg (Co-founder of Facebook)"
  },
  {
    text: "The best ideas are fragile, and if you try to explain them too soon, they die.",
    author: "Paul Graham (Co-founder of Y Combinator)"
  },
  {
    text: "Don’t optimize prematurely. Write your code first, then make it fast — if you need to.",
    author: "Dan Abramov (Co-author of Redux, React Core team)"
  }
];

// Function to cycle quotes
function cycleQuotes() {
  // If not in browser environment, return
  if (typeof window === 'undefined') return;
  
  const quoteContainer = document.querySelector('.quote-container');
  const quoteText = document.querySelector('.typing-quote span');
  const quoteAuthor = document.querySelector('.quote-author');
  
  if (!quoteContainer || !quoteText || !quoteAuthor) return;
  
  let currentQuoteIndex = 0;
  
  // Initialize with the first quote
  quoteText.textContent = `"${quotes[0].text}"`;
  quoteAuthor.textContent = `— ${quotes[0].author}`;
  
  // Change quote every 12 seconds
  setInterval(() => {
    // Transition out
    quoteContainer.setAttribute('data-state', 'transition-out');
    
    // After animation completes, change quote and transition in
    setTimeout(() => {
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      quoteText.textContent = `"${quotes[currentQuoteIndex].text}"`;
      quoteAuthor.textContent = `— ${quotes[currentQuoteIndex].author}`;
      
      // Reset to default state
      quoteContainer.removeAttribute('data-state');
      
      // Reset animations by removing and re-adding classes
      quoteText.parentElement.classList.remove('typing-quote');
      quoteAuthor.classList.remove('quote-author-animate');
      
      // Force reflow
      void quoteText.parentElement.offsetWidth;
      
      // Add classes back
      quoteText.parentElement.classList.add('typing-quote');
      quoteAuthor.classList.add('quote-author-animate');
    }, 1000); // 1 second for fade out
    
  }, 12000); // 12 seconds between quotes
}

// Export for use in page component
export { cycleQuotes, quotes }; 