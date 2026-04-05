import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AInsekt Farm — Circular Economy Reinvented",
  description: "AInsekt Farm łączy hodowlę owadów BSF i Swierszcza Kubańskiego, energię OZE, mining BTC, AI i blockchain w jeden zamknięty obieg. Series Seed / Pre-A · 8–10M USD.",
  metadataBase: new URL("https://ainsektfarm.com"),
  openGraph: {
    title: "AInsekt Farm — Circular Economy Reinvented",
    description: "Hodowla owadów · Energia OZE · BTC Mining · Token AINS · Blockchain AgroAI. Ukraina · Estonia · Polska.",
    url: "https://ainsektfarm.com",
    siteName: "AInsekt Farm",
    images: [{ url: "/preview.webp", width: 1200, height: 630, alt: "AInsekt Farm" }],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AInsekt Farm — Circular Economy Reinvented",
    description: "Hodowla owadów · Energia OZE · BTC Mining · Token AINS · Blockchain AgroAI.",
    images: ["/preview.webp"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
