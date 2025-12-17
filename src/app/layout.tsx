// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashGate from "@/components/ui/SplashGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myshatravels.com"),
  title: {
    default: "Mysha Travels – Curated Travel Packages & Seamless Trips",
    template: "%s | Mysha Travels",
  },
  description:
    "Discover handpicked travel packages, custom itineraries, visa help, and 24×7 support. Plan your next adventure with Mysha Travels.",
  keywords: [
    "travel packages",
    "custom itineraries",
    "visa assistance",
    "group tours",
    "holiday planning",
    "India travel",
  ],
  authors: [{ name: "Krishna Kumar P S" }],
  creator: "Krishna Kumar P S",
  publisher: "Mysha Travels",
  applicationName: "Mysha Travels",
  category: "Travel",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Mysha Travels",
    url: "https://myshatravels.com/",
    title: "Mysha Travels – Curated Travel Packages & Seamless Trips",
    description:
      "Handpicked packages, flexible services, and honest guidance—so you can just enjoy the trip.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Mysha Travels – Curated Travel Packages & Seamless Trips",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mysha Travels – Curated Travel Packages & Seamless Trips",
    description:
      "Handpicked packages, flexible services, and honest guidance—so you can just enjoy the trip.",
    images: ["/og.jpg"],
    creator: "@your_handle",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  themeColor: "#0E7490",
  viewport: { width: "device-width", initialScale: 1, maximumScale: 5 },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Mysha Travels",
    url: "https://myshatravels.com/",
    logo: "https://myshatravels.com/icon-512.png",
    sameAs: [
      "https://facebook.com/yourpage",
      "https://www.instagram.com/yourpage",
    ],
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    founder: { "@type": "Person", name: "Krishna Kumar P S" },
  };

  return (
    <html lang="en" className="bg-bg text-text" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}
      >
        <SplashGate>{children}</SplashGate>

        {/* JSON-LD for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
