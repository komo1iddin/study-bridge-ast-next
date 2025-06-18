"use client"

import CTA from "@/components/common/cta"

interface CtaSectionProps {
  className?: string
  lang: string
}

export function CtaSection({ className, lang }: CtaSectionProps) {
  return (
    <section className={`w-full pt-4 md:pt-6 lg:pt-8 pb-12 md:pb-16 lg:pb-20 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <CTA lang={lang} />
      </div>
    </section>
  )
} 