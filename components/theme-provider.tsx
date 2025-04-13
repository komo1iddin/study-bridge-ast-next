"use client"

import { useEffect } from "react"
import { usePreferencesStore } from "@/store/usePreferencesStore"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = usePreferencesStore()
  
  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove existing classes
    root.classList.remove("light", "dark")
    
    // Add the appropriate class based on the theme preference
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])
  
  return children
}
