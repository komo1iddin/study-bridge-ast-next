"use client"

import { memo, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { ErrorBoundary } from "./error-boundary"

const CtaSection = () => {
  const t = useTranslations("home.cta")

  // Memoize navigation handlers for better performance
  const handleProgramsClick = useCallback(() => {
    // Analytics tracking could be added here
    console.log("Programs button clicked")
  }, [])

  const handleContactClick = useCallback(() => {
    // Analytics tracking could be added here
    console.log("Contact button clicked")
  }, [])

  // Safely get the image alt text with fallback
  const getImageAlt = () => {
    try {
      return t("imageAlt")
    } catch (error) {
      return "Students in a Chinese university"
    }
  }

  return (
    <ErrorBoundary>
      <section 
        className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white" 
        aria-labelledby="cta-heading"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 
                id="cta-heading" 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              >
                {t("title")}
              </h2>
              <p className="md:text-xl">{t("subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  asChild 
                  onClick={handleProgramsClick}
                >
                  <Link href="/programs">
                    {t("programs")}
                    <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                  asChild
                  onClick={handleContactClick}
                >
                  <Link href="/#contact">{t("button")}</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <Image
                src="/placeholder.svg?height=600&width=800"
                width={800}
                height={600}
                alt={getImageAlt()}
                className="w-full rounded-xl object-cover shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  )
}

export default memo(CtaSection)
