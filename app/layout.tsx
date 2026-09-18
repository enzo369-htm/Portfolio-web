import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import SiteBackdrop from "@/components/SiteBackdrop";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const shareTech = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-share",
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
      className={`${orbitron.variable} ${shareTech.variable} dark`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-void text-bone font-body">
        <SiteBackdrop />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
