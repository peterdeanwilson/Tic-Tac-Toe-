import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* global navigation bar */}
        <nav className="w-full flex justify-center gap-6 py-4 border-b-2 border-black mb-6 text-black">
        <Link href="/">
          <button className="px-4 py-2 border-2 border-black bg-white font-bold hover:bg-gray-200 text-black">
            Play Game
          </button>
        </Link>

        <Link href="/leaderboard">
          <button className="px-4 py-2 border-2 border-black bg-white font-bold hover:bg-gray-200 text-black">
            Leaderboard
          </button>
        </Link>
      </nav>


        {children}
      </body>
    </html>
  );
}
