import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/language-context";
import VisitTracker from "@/components/VisitTracker";
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
  metadataBase: new URL("https://carriertrust.eu"),

  title: {
    default: "CarrierTrust — EU Logistics Reviews, Risk Index & Carrier Reputation",
    template: "%s | CarrierTrust",
  },

  description:
    "CarrierTrust is the European logistics trust platform for cargo transportation, freight forwarding, carrier reviews, risk index and company verification.",

  keywords: [
    "carriertrust",
    "cargo transportation europe",
    "freight forwarding reviews",
    "logistics company reviews",
    "carrier reviews europe",
    "transport company reviews",
    "logistics trust score",
    "carrier risk index",
    "cargo company verification",
    "freight forwarder reputation",
    "european logistics platform",
  ],

  applicationName: "CarrierTrust",
  category: "business",
  creator: "CarrierTrust",
  publisher: "CarrierTrust",

  alternates: {
    canonical: "https://carriertrust.eu",
    languages: {
      en: "https://carriertrust.eu",
      de: "https://carriertrust.eu",
      fr: "https://carriertrust.eu",
      es: "https://carriertrust.eu",
      it: "https://carriertrust.eu",
      ru: "https://carriertrust.eu",
      "x-default": "https://carriertrust.eu",
    },
  },

  openGraph: {
    title: "CarrierTrust — EU Logistics Reviews, Risk Index & Carrier Reputation",
    description:
      "European trust platform for cargo transportation, freight forwarding, carrier reviews, risk index and company verification.",
    url: "https://carriertrust.eu",
    siteName: "CarrierTrust",
    type: "website",
    locale: "en_EU",
  },

  twitter: {
    card: "summary_large_image",
    title: "CarrierTrust — EU Logistics Reviews, Risk Index & Carrier Reputation",
    description:
      "European trust platform for cargo transportation, freight forwarding, carrier reviews, risk index and company verification.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900`}
      >
        <LanguageProvider>
          <VisitTracker />

          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),transparent)]" />
            <div className="absolute left-[8%] top-[8%] h-[24rem] w-[24rem] rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute bottom-[8%] right-[8%] h-[20rem] w-[20rem] rounded-full bg-teal-400/20 blur-3xl" />
            <div className="absolute right-[14%] top-[28%] h-[16rem] w-[16rem] rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>

          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />

            <main className="flex-1 pt-[1.8rem] sm:pt-[2.4rem] lg:pt-0">
              {children}
            </main>

            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}