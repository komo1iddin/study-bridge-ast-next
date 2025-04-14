import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';

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
    <html lang="en">
      <head>
        {/* Netlify Identity Widget - REMOVED */}
        {/* <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script> */}
      </head>
      <body className={cn('')}>
        {children}
        
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