import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topnav from "./components/Topnav";
import Bottomnav from "./components/Bottomnav";

export const metadata: Metadata = {
  title: "NovusMovies",
  description: "Get movie titles news and many more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Topnav />
        {children}
        <Bottomnav />
      </body>
    </html>
  );
}
