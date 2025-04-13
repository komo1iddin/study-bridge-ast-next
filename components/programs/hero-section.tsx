"use client"

import { useTranslations } from "next-intl"

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  const t = useTranslations("programs.hero")
  
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("title")}</h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 