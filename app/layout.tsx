import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { GlobalErrorBoundary } from '@/components/common/error-boundary';
import { ThemeProvider } from '@/components/common/theme';
import { ThemeScript } from '@/components/common/theme/theme-script';

export const metadata: Metadata = {
  title: 'Study Bridge',
  description: 'Find your perfect university in China',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        {/* Netlify Identity Widget - REMOVED */}
        {/* <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script> */}
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ThemeProvider>
          <GlobalErrorBoundary>
            {children}
          </GlobalErrorBoundary>
        </ThemeProvider>
        
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