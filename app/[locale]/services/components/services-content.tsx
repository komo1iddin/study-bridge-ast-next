"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { HeroSection } from "./hero-section"
import { ServicesSection } from "./services-section"
import { ExpensesSection } from "./expenses-section"
import { NotesSection } from "./notes-section"
import { Locale } from "@/i18n/navigation"
import SectionHeader from "@/components/ui/section-header"

interface ServicesContentProps {
  lang: Locale
}

export function ServicesContent({ lang }: ServicesContentProps) {
  const t = useTranslations("pages.services")
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="container px-4 md:px-6 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href={`/${lang}`} className="hover:text-blue-600 transition-colors">
              {t("breadcrumb.home")}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-medium">
              {t("breadcrumb.services")}
            </span>
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container px-4 md:px-6 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col gap-32">
          {/* Services Section */}
          <section>
            <SectionHeader
              title={t("sections.services.title")}
              subtitle={t("sections.services.subtitle")}
            />
            <ServicesSection hideHeader />
          </section>

          {/* Expenses Section */}
          <section>
            <SectionHeader
              title={t("sections.expenses.title")}
              subtitle={t("sections.expenses.subtitle")}
            />
            <ExpensesSection hideHeader />
          </section>

          {/* Notes Section */}
          <section>
            <SectionHeader
              title={t("sections.notes.title")}
              subtitle={t("sections.notes.subtitle")}
            />
            <NotesSection hideHeader />
          </section>
        </div>
      </div>
      

    </div>
  )
}