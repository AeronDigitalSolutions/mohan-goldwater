import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MGWBL — Mohan Goldwater Breweries Limited | Brewing Excellence Since 1969",
  description:
    "Mohan Goldwater Breweries Limited — one of India's most advanced beverage manufacturing companies. Proudly partnering with Carlsberg to produce world-class beers with cutting-edge technology and zero effluent discharge.",
  keywords: [
    "MGWBL",
    "Mohan Goldwater Breweries",
    "brewery",
    "Carlsberg India",
    "Tuborg",
    "beer manufacturing",
    "Unnao",
    "beverage manufacturing",
  ],
  openGraph: {
    title: "MGWBL — Brewing Excellence Since 1969",
    description:
      "One of India's most advanced beverage manufacturing companies. Proudly partnering with Carlsberg.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#050505" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-primary-900 text-foreground">
        {children}
      </body>
    </html>
  );
}
