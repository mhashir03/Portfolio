# Hashir's Personal Portfolio

This is my personal portfolio website with a terminal/code-inspired aesthetic built using Next.js and Tailwind CSS. 

## Overview

I created this portfolio to showcase my skills and projects in a unique way that reflects my passion for coding. The terminal theme represents my comfort with command-line interfaces and technical environments.

https://www.hashir.fyi

## Technical Implementation

- **Custom Terminal Emulator**: Built from scratch with React hooks for state management
- **Spotify API Integration**: Real-time display of currently playing tracks using Spotify Web API
- **Performance Optimized**: Achieves 98+ Lighthouse performance score
- **Type-Safe Codebase**: Fully typed with TypeScript for robust error prevention
- **Responsive Design System**: Fluid layout using CSS Grid and Flexbox with Tailwind CSS
- **Server-Side Rendering**: Utilizes Next.js SSR for optimal loading performance

## Core Technologies

- Next.js 15 (React 19)
- TypeScript
- JavaScript
- Tailwind CSS
- Vercel Edge Functions
- Spotify Web API

## Development

### Prerequisites

- Node.js 16.0.0+
- npm or yarn
- Spotify Developer Account (for API access)

### Quick Start

```bash
# Clone repository
git clone https://github.com/mhashir03/portfolio.git

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Add your Spotify API credentials to .env.local:
# SPOTIFY_CLIENT_ID=your_client_id
# SPOTIFY_CLIENT_SECRET=your_client_secret
# SPOTIFY_REFRESH_TOKEN=your_refresh_token

# Run development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

## Performance Metrics

- **Lighthouse Score**: 98/100 (Performance)
- **First Contentful Paint**: ~0.6s
- **TTI**: ~1.2s
- **Bundle Size**: <100KB gzipped

## License

This project is my personal portfolio. While the code is publicly available for inspiration, please don't create direct copies. Create something unique that represents your own skills and personality!

---

Built by [Muhammad Hashir](https://github.com/mhashir03)
