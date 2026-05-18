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
  title: "AInsekt Farm — Biogas 400 kW · FEnIKS · Poland",
  description: "400 kW biogas CHP plant in Poland — 91% agricultural substrate · 15-year FIT · FEnIKS grant 85% · CAPEX €2.8M · COD September 2029. Optional Phase II (BSF insect farm) and Phase III (AI Compute).",
  metadataBase: new URL("https://ainsektfarm.com"),
  openGraph: {
    title: "AInsekt Farm — Biogas 400 kW · FEnIKS · Poland",
    description: "400 kW biogas · 91% agricultural substrate · 15-year FIT · FEnIKS 85% (€2.38M) · Year 1 EBITDA €287K · Payback ~18 months · COD Sep 2029.",
    url: "https://ainsektfarm.com",
    siteName: "AInsekt Farm",
    images: [{ url: "/preview.webp", width: 1200, height: 630, alt: "AInsekt Farm" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AInsekt Farm — Biogas 400 kW · FEnIKS · Poland",
    description: "400 kW biogas · 91% agricultural substrate · 15-year FIT · FEnIKS 85% · COD Sep 2029.",
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
