import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { GlobalErrorBoundary } from '@/components/common/error-boundary';

// Configure Inter font
const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

// Raleway is loaded via external Google Fonts link (see <head>)

export const metadata: Metadata = {
  title: 'Study Bridge',
  description: 'Find your perfect university in China',
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
              {/* Google Fonts link for Raleway */}
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* Define CSS variable for Raleway */}
        <style>{`:root { --font-raleway: 'Raleway', Arial, sans-serif; }`}</style>
      </head>
      <body className="min-h-screen bg-white font-sans">
        <GlobalErrorBoundary>
          {children}
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}