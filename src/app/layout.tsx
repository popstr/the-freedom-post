import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
  title: 'The Freedom Post',
  description: 'Content Management System for The Freedom Post',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />
        </head>
        <body
          className={`min-h-screen bg-white text-black ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
            <header className="flex justify-between items-center py-6 border-b border-gray-200">
              <Link href={`/content`}>
                <Image src="/logo.png" alt="The Freedom Post" width={220} height={120} />
              </Link>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-700 transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-emerald-900 rounded-md hover:bg-gray-700 transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton showName={true} />
                </SignedIn>
              </div>
            </header>
            <main className="py-8">{children}</main>
          </div>
          <footer className="border-t border-gray-200 text-center text-sm text-gray-600 py-6">
            © {new Date().getFullYear()} The Freedom Post
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
