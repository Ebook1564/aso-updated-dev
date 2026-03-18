import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import NotificationPopup from "@/components/NotificationPopup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OPTIAPP | Premium ASO Intelligence",
  description: "Guaranteed App Store & Play Store keyword dominance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 bg-background min-h-screen flex flex-col`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col relative">
              {children}
          </main>
          <ThemeToggle />
          <NotificationPopup />
        </Providers>
      </body>
    </html>
  );
}
