"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Program } from "@/app/[locale]/programs/page"

interface FeaturedProgramsProps {
  className?: string
  programs: Program[]
}

export function FeaturedPrograms({ className, programs }: FeaturedProgramsProps) {
  const t = useTranslations("programs.featuredPrograms")
  
  // Filter featured programs
  const featuredPrograms = programs.filter((program) => program.featured)
  
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredPrograms.map((program) => (
            <Link href={`/programs/${program.id}`} key={program.id} className="group">
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
                <div className="relative">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    width={400}
                    height={200}
                    className="aspect-[2/1] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {program.scholarship && (
                    <Badge className="absolute right-2 top-2 bg-blue-600">{t("scholarshipAvailable")}</Badge>
                  )}
                </div>
                <CardContent className="grid gap-2 p-4">
                  <h3 className="line-clamp-1 text-xl font-bold">{program.title}</h3>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{program.university}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline">{program.level}</Badge>
                    <Badge variant="outline">{program.duration}</Badge>
                    <Badge variant="outline">{program.language}</Badge>
                  </div>
                  <div className="pt-4">
                    <span className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline">
                      {t("viewDetails")} →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 