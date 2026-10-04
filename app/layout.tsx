import type { Metadata } from "next";
import { Fraunces, Newsreader } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enzo Federico - Portfolio",
  description: "Growth Operator y Backend de negocios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-void text-bone font-body">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
