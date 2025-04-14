"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { GraduationCap, Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"
import { cn } from "@/lib/utils"

// Throttle function to limit how often a function runs
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export default function Navbar() {
  const t = useTranslations("navbar")
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Throttled scroll handler to prevent excessive updates
  const handleScroll = useCallback(
    throttle(() => {
      setScrolled(window.scrollY > 10)
    }, 100), // Only run at most once every 100ms
    []
  )

  // Handle scroll effect for navbar with throttling
  useEffect(() => {
    // Set initial scroll state
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    setIsMounted(true)
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Add a slight delay to ensure body scroll lock happens after the menu appears
      const timer = setTimeout(() => {
        document.body.style.overflow = 'hidden'
      }, 10)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  // Define navigation items to avoid repetition
  const navItems = [
    { href: "/", label: t("home") },
    { href: "/programs", label: t("programs") },
    { href: "/universities", label: t("universities") },
    { href: "/#services", label: t("services") },
    { href: "/why-china", label: t("whyChina") },
    { href: "/comparison", label: t("comparison") },
    { href: "/#testimonials", label: t("testimonials") },
    { href: "/#about", label: t("aboutUs") },
    { href: "/#contact", label: t("contact") }
  ]

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === href
    return pathname?.startsWith(href)
  }

  // Avoid rendering transitions until client-side hydration is complete
  const shouldRenderTransitions = isMounted

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full",
        shouldRenderTransitions ? "transition-all duration-200" : "",
        scrolled 
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
          : "bg-background/80 backdrop-blur-sm",
        isMenuOpen ? "menu-open" : ""
      )}
      style={{ 
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: scrolled ? 'transform, backdrop-filter, background' : 'auto'
      }}
      aria-label="Main navigation"
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2" aria-label="EduChina home">
            <GraduationCap className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <span className="inline-block font-bold">EduChina</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={cn(
                  "text-sm font-medium",
                  shouldRenderTransitions ? "transition-colors" : "",
                  isActive(item.href) 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button variant="outline" size="sm" className="hidden sm:flex mr-2">
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>+998 90 123 45 67</span>
            </Button>
            <LanguageSwitcher />
            <Button className="hidden md:flex">{t("applyNow")}</Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 
                (t("closeMenu") ?? "Close menu") : 
                (t("openMenu") ?? "Open menu")}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </nav>
        </div>
      </div>
      
      {/* Mobile menu - using a combination of approaches for better compatibility */}
      <div 
        id="mobile-menu"
        className={cn(
          "md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-sm z-40",
          shouldRenderTransitions 
            ? "transition-all duration-300 ease-in-out" 
            : "",
          isMenuOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible translate-y-4 pointer-events-none"
        )}
        style={{ 
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          willChange: isMenuOpen ? 'opacity, visibility, transform' : 'auto',
          height: isMenuOpen ? 'calc(100vh - 64px)' : '0'
        }}
      >
        <div className="h-full overflow-y-auto overscroll-contain pb-safe border-t">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  shouldRenderTransitions ? "transition-colors" : "",
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "hover:bg-blue-50 hover:text-blue-600"
                )}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button className="w-full">{t("applyNow")}</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
