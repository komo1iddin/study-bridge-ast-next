"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

interface CtaSectionProps {
  className?: string
  imageUrl?: string
}

export function CtaSection({ className, imageUrl = "/placeholder.svg?height=600&width=800" }: CtaSectionProps) {
  const t = useTranslations("pages.whyChina")
  
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("cta.title")}
            </h2>
            <p className="md:text-xl">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/programs">
                  {t("cta.viewPrograms")}
                  <ChevronRight className="ml-2 h-4 w-4" />
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
          <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
            <Image
              src={imageUrl}
              width={800}
              height={600}
              alt="Students in a Chinese university"
              className="w-full rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 