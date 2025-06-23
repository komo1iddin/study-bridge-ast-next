import React from 'react';
import type { Metadata } from 'next';
import { Inter, Raleway } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { GlobalErrorBoundary } from '@/components/common/error-boundary';

// Configure Inter font
const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

// Configure Raleway font
const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

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
    <html lang="en" className={`${inter.variable} ${raleway.variable} font-sans`}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="min-h-screen bg-white font-sans">
        <GlobalErrorBoundary>
          {children}
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}