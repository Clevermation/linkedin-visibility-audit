import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LinkedIn Visibility Audit — Clevermation",
  description:
    "Finden Sie in 60 Sekunden heraus, wie sichtbar Ihr Unternehmen auf LinkedIn wirklich ist — und was Sie morgen ändern können.",
  openGraph: {
    title: "Wie sichtbar ist Ihr Unternehmen auf LinkedIn?",
    description:
      "Kostenloser AI-Audit: Score, Analyse und konkrete Empfehlungen in 60 Sekunden.",
    url: "https://linkedin-audit.clevermation.com",
    siteName: "Clevermation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
