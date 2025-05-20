import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Hashir",
  description: "Software Engineer / Student / Creator",
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0d1117] text-[#e6edf3]">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
