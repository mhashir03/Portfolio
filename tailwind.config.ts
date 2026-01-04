import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Include default colors
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
    },
    extend: {
      maxWidth: {
        '6xl': '72rem',
      },
      colors: {
        // Onyx - Primary (backgrounds)
        onyx: {
          DEFAULT: '#131316',
          50: '#2a2a32',
          100: '#212127',
          200: '#1a1a1f',
          300: '#131316',
        },
        // Pale Slate - Secondary
        slate: {
          DEFAULT: '#b2b2bd',
          50: '#d4d4dc',
          100: '#c3c3cd',
          200: '#b2b2bd',
          300: '#9a9aa6',
          400: '#7a7a85',
        },
        // Alabaster Grey - Third
        alabaster: {
          DEFAULT: '#e5dfdc',
          50: '#f5f2f0',
          100: '#ece8e5',
          200: '#e5dfdc',
          300: '#d6d0cd',
        },
        // Dark Amethyst - Accent
        amethyst: {
          DEFAULT: '#29143e',
          50: '#c4a1e8',
          100: '#9b6fc7',
          200: '#6b3d9e',
          300: '#4a2873',
          400: '#29143e',
        },
        terminal: {
          bg: '#131316',
          header: '#1a1a1f',
          text: '#e5dfdc',
          muted: '#7a7a85',
          link: '#9b6fc7',
          accent: '#c4a1e8',
          success: '#9b6fc7',
          danger: '#e85c5c',
          border: '#3a3a42',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config; 