"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  className?: string
  imageUrl?: string
}

export function HeroSection({ className, imageUrl = "/placeholder.svg?height=600&width=800" }: HeroSectionProps) {
  const t = useTranslations("pages.whyChina")
  
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-blue-100 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {t("hero.title")}
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/programs">
                  {t("hero.viewPrograms")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#contact">
                  {t("hero.requestInfo")}
                </Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
            <Image
              src={imageUrl}
              width={800}
              height={600}
              alt="Chinese university campus with students"
              className="w-full rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
} 