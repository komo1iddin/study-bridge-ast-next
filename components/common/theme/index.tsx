"use client"

import { useEffect, useState } from "react"
import { usePreferencesStore } from "@/store/usePreferencesStore"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = usePreferencesStore()
  const [mounted, setMounted] = useState(false)

  // Set mounted state on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const currentTheme = theme === "system" ? systemTheme : theme

    // Remove all theme classes first
    root.classList.remove("light", "dark")
    // Add the current theme class
    root.classList.add(currentTheme)
    
    // Update data-theme attribute for CSS variable scoping
    root.setAttribute("data-theme", currentTheme)
    
    // Update color-scheme meta tag
    const existingMeta = document.querySelector('meta[name="color-scheme"]')
    if (existingMeta) {
      existingMeta.setAttribute('content', currentTheme)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'color-scheme'
      meta.content = currentTheme
      document.head.appendChild(meta)
    }
  }, [theme, mounted])

  // Prevent rendering until mounted on client to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  return <>{children}</>
}
