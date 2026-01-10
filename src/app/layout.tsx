import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Hashir",
  description: "Software Engineer building impactful products. CS @ Saint Louis University.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable}`}>
      <body className={GeistSans.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
