"use client"

import { useEffect } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = window.document.documentElement
    
    // Ensure only light theme is applied
    root.classList.remove("dark")
    root.classList.add("light")
    root.setAttribute('data-theme', 'light')
    
    // Set color scheme meta tag
    const meta = document.createElement('meta');
    meta.name = 'color-scheme';
    meta.content = 'light';
    document.head.appendChild(meta);
    
    return () => {
      // Cleanup if needed
      document.head.removeChild(meta);
    };
  }, [])
  
  return children
}
