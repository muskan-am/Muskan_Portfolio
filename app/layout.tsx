import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muskan Kesharwani | Full Stack Developer",
  description:
    "Portfolio of Muskan Kesharwani, a Full Stack Developer specializing in Next.js, React, Node.js, PostgreSQL, MongoDB and modern web applications.",
  keywords: [
    "Muskan Kesharwani",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Muskan Kesharwani" }],
  creator: "Muskan Kesharwani",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://muskan-kesharwani.vercel.app",
    title: "Muskan Kesharwani | Full Stack Developer",
    description:
      "Portfolio of Muskan Kesharwani, a Full Stack Developer specializing in Next.js, React, Node.js, PostgreSQL, MongoDB and modern web applications.",
    siteName: "Muskan Kesharwani Portfolio",
    images: [
      {
        url: "/images/muskan-profile.jpg",
        width: 1200,
        height: 630,
        alt: "Muskan Kesharwani - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muskan Kesharwani | Full Stack Developer",
    description:
      "Portfolio of Muskan Kesharwani, a Full Stack Developer specializing in Next.js, React, Node.js, PostgreSQL, MongoDB and modern web applications.",
    images: ["/images/muskan-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
        {children}
      </body>
    </html>
  );
}
