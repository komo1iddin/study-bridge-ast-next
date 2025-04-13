"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { GraduationCap, Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "@/components/language-switcher"

export default function Navbar() {
  const t = useTranslations("navbar")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="inline-block font-bold">EduChina</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t("home")}
            </Link>
            <Link href="/programs" className="text-sm font-medium transition-colors hover:text-primary">
              {t("programs")}
            </Link>
            <Link href="/#services" className="text-sm font-medium transition-colors hover:text-primary">
              {t("services")}
            </Link>
            <Link href="/why-china" className="text-sm font-medium transition-colors hover:text-primary">
              {t("whyChina")}
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              {t("testimonials")}
            </Link>
            <Link href="/#about" className="text-sm font-medium transition-colors hover:text-primary">
              {t("aboutUs")}
            </Link>
            <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-primary">
              {t("contact")}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button variant="outline" size="sm" className="hidden sm:flex mr-2">
              <Phone className="mr-2 h-4 w-4" />
              +998 90 123 45 67
            </Button>
            <LanguageSwitcher />
            <Button className="hidden md:flex">{t("applyNow")}</Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </nav>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-blue-50 hover:text-blue-600"
              onClick={toggleMenu}
            >
              {t("home")}
            </Link>
            <Link
              href="/programs"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-blue-50 hover:text-blue-600"
              onClick={toggleMenu}
            >
              {t("programs")}
            </Link>
            <Link
              href="/#services"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-blue-50 hover:text-blue-600"
              onClick={toggleMenu}
            >
              {t("services")}
            </Link>
            <Link
              href="/why-china"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-blue-50 hover:text-blue-600"
              onClick={toggleMenu}
            >
              {t("whyChina")}
            </Link>
            <Link
              href="/#testimonials"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-blue-50 hover:text-blue-600"
              onClick={toggleMenu}
            >
              {t("testimonials")}
            </Link>
            <Link
              href="/#about"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-blue-50 hover:text-blue-600"
              onClick={toggleMenu}
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/#contact"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-blue-50 hover:text-blue-600"
              onClick={toggleMenu}
            >
              {t("contact")}
            </Link>
            <div className="pt-4">
              <Button className="w-full">{t("applyNow")}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
