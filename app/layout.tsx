import type { Metadata } from "next";
import {
  Sofia_Sans_Extra_Condensed,
  Newsreader,
  Schibsted_Grotesk,
} from "next/font/google";
import "./globals.css";

const displayFont = Sofia_Sans_Extra_Condensed({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-display",
  display: "swap",
});

const readingFont = Newsreader({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-reading",
  display: "swap",
});

const uiFont = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Last Word",
  description:
    "An unofficial, fan-built archive of how big transfer sagas ended.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${displayFont.variable} ${readingFont.variable} ${uiFont.variable}`}
    >
      <body className="paper-grain">{children}</body>
    </html>
  );
}