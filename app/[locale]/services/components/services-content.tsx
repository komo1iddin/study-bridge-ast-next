"use client"

import { useTranslations } from "next-intl"
import { Locale } from "@/i18n/navigation"

import { HeroSection } from "./hero-section"
import { ServicesSection } from "./services-section"
import { ExpensesSection } from "./expenses-section"
import { NotesSection } from "./notes-section"
import SectionHeader from "@/components/ui/section-header"

interface ServicesContentProps {
  lang: Locale
}

export function ServicesContent({ lang }: ServicesContentProps) {
  const t = useTranslations("pages.services")
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="flex flex-col gap-16">
          {/* Services Section */}
          <section>
            <SectionHeader
              title={t("sections.services.title")}
              subtitle={t("sections.services.subtitle")}
              className="mb-8"
            />
            <ServicesSection hideHeader />
          </section>

          {/* Expenses Section */}
          <section>
            <SectionHeader
              title={t("sections.expenses.title")}
              subtitle={t("sections.expenses.subtitle")}
              className="mb-8"
            />
            <ExpensesSection hideHeader />
          </section>

          {/* Notes Section */}
          <section>
            <SectionHeader
              title={t("sections.notes.title")}
              subtitle={t("sections.notes.subtitle")}
              className="mb-8"
            />
            <NotesSection hideHeader />
          </section>
        </div>
      </div>
      

    </div>
  )
}