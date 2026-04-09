import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohamed.work"),
  title: "Mohamed Abdelazem — Frontend Developer",
  description:
    "Frontend Developer with production experience in React and Vue, focused on performance optimization, TypeScript, accessible design, and full RTL/LTR internationalization support.",
  keywords: [
    "Frontend Developer",
    "React",
    "Vue",
    "Next.js",
    "TypeScript",
    "Performance",
    "Accessibility",
    "i18n",
    "RTL",
  ],
  authors: [{ name: "Mohamed Abdelazem" }],
  creator: "Mohamed Abdelazem",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohamed.work",
    title: "Mohamed Abdelazem — Frontend Developer",
    description:
      "React & Vue developer focused on performance optimization, TypeScript, accessible design, and full RTL/LTR internationalization support.",
    siteName: "Mohamed Abdelazem",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Abdelazem — Frontend Developer",
    description:
      "React & Vue developer focused on performance optimization, TypeScript, accessible design, and full RTL/LTR internationalization support.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Abdelazem",
  jobTitle: "Frontend Developer",
  url: "https://mohamed.work",
  email: "hello@mohamed.work",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Damietta",
    addressCountry: "EG",
  },
  sameAs: [
    "https://github.com/mo-abdelazem",
    "https://linkedin.com/in/mo-abdelazem",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
