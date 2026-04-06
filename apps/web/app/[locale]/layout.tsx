import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

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
  description: "AInsekt Farm combines BSF + Cricket protein, renewable energy, BTC Mining, Token AINS and AgroAI Blockchain. Series Seed · 8–10M USD.",
  metadataBase: new URL("https://ainsektfarm.com"),
  openGraph: {
    title: "AInsekt Farm — Circular Economy Reinvented",
    description: "BSF + Cricket · Renewable Energy · BTC Mining · Token AINS · AgroAI Blockchain.",
    url: "https://ainsektfarm.com",
    siteName: "AInsekt Farm",
    images: [{ url: "/preview.webp", width: 1200, height: 630, alt: "AInsekt Farm" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AInsekt Farm — Circular Economy Reinvented",
    description: "BSF + Cricket · Renewable Energy · BTC Mining · Token AINS · AgroAI Blockchain.",
    images: ["/preview.webp"],
  },
  icons: { icon: "/favicon.ico" },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
