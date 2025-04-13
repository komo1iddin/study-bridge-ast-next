"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { GraduationCap, Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const t = useTranslations("navbar")
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Define navigation items to avoid repetition
  const navItems = [
    { href: "/", label: t("home") },
    { href: "/programs", label: t("programs") },
    { href: "/#services", label: t("services") },
    { href: "/why-china", label: t("whyChina") },
    { href: "/#testimonials", label: t("testimonials") },
    { href: "/#about", label: t("aboutUs") },
    { href: "/#contact", label: t("contact") }
  ]

  const isActive = (href: string): boolean => {
    if (href === "/") return pathname === href
    return pathname?.startsWith(href)
  }

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled 
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm" 
          : "bg-background/80 backdrop-blur-sm"
      )}
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
                  "text-sm font-medium transition-colors",
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
      
      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out", 
          isMenuOpen ? "max-h-screen" : "max-h-0"
        )}
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-base font-medium transition-colors",
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
    </header>
  )
}
