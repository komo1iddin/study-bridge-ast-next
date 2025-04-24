"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

interface CtaSectionProps {
  className?: string
}

export function CtaSection({ className }: CtaSectionProps) {
  const t = useTranslations("pages.programs")
  
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto max-w-[700px] md:text-xl">
              {t("cta.description")}
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/apply">
                {t("cta.applyNow")}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/#contact">
                {t("cta.contactUs")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}