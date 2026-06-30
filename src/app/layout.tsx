import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import IntroGate from "./components/IntroGate";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-sp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HASHIR",
  description: "swe, portfolio, personal website",
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
    <html
      lang="en"
      data-br-theme="dark"
      className={`scroll-smooth ${GeistSans.variable} ${archivo.variable} ${spaceMono.variable}`}
    >
      <body className={GeistSans.className}>
        <main className="min-h-screen">
          <IntroGate>{children}</IntroGate>
        </main>
      </body>
    </html>
  );
}
