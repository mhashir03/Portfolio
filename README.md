# Terminal-Themed Portfolio

A modern, responsive portfolio website with a terminal/code-inspired aesthetic built using Next.js and Tailwind CSS.

## ✨ Features

- **Terminal-inspired UI**: Command-line interface aesthetic with a modern twist
- **Responsive Design**: Looks great on all devices (mobile, tablet, desktop)
- **Dark Theme**: Easy on the eyes with a dark code editor-like color scheme
- **Fast Performance**: Built with Next.js for optimal loading speed
- **Easy to Customize**: Simple structure to update with your own information
- **SEO Friendly**: Built-in metadata optimization for better search engine visibility

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [React](https://reactjs.org/) - JavaScript library for building user interfaces

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mhashir03/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Customization

### Personal Information

Edit the `src/app/page.tsx` file to update:
- Your name and introduction
- Contact information
- Education details
- Work experience
- Projects
- Skills
- Leadership experience

### Styling

- Global styles are in `src/app/globals.css`
- Terminal theme colors can be adjusted in `tailwind.config.ts`

## 📤 Deployment

### Deploying to Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

1. Create an account on Vercel if you don't have one
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Run the following command in your project directory:
   ```bash
   vercel
   ```
4. Follow the prompts to deploy your application

### Other Deployment Options

#### Netlify

1. Create a `netlify.toml` file in the root of your project:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   ```
2. Push your code to GitHub
3. Import your repository on Netlify
4. Configure the build settings and deploy

#### GitHub Pages

For GitHub Pages, you'll need to export your Next.js app as static HTML:

1. Update your `next.config.js` to include:
   ```js
   module.exports = {
     output: 'export',
   }
   ```
2. Build and export your app:
   ```bash
   npm run build
   ```
3. The static files will be in the `out` directory, which you can deploy to GitHub Pages

#### Custom Domain

To use a custom domain:

1. Purchase a domain from a domain registrar (Namecheap, GoDaddy, Google Domains, etc.)
2. Configure DNS settings to point to your hosting provider
3. Set up the custom domain in your hosting provider's dashboard
4. Add SSL certificate for HTTPS (most providers offer this for free)

## 🧪 Testing

```bash
npm run test
# or
yarn test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Platform](https://vercel.com)

---

Made with ❤️ by [Muhammad Hashir](https://github.com/mhashir03)
