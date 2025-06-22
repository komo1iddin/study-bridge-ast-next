import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { GlobalErrorBoundary } from '@/components/common/error-boundary';

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Study Bridge',
  description: 'Find your perfect university in China',
  // Force light theme
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" data-theme="light">
      <head>
        {/* Force light theme on all browsers */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        {/* Netlify Identity Widget - REMOVED */}
        {/* <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script> */}
      </head>
      <body className={cn(inter.className, 'min-h-screen bg-white')}>
        <GlobalErrorBoundary>
          {children}
        </GlobalErrorBoundary>
        
        {/* Script to redirect to admin after login - REMOVED */}
        {/* <script dangerouslySetInnerHTML={{
          __html: `
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `
        }} /> */}
      </body>
    </html>
  );
}