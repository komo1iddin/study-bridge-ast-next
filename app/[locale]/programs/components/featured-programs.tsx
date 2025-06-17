"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample program data type
export type Program = {
  id: string
  title: string
  university: string
  level: string
  duration: string
  language: string
  category: string
  scholarship: boolean
  image: string
  featured: boolean
}

interface FeaturedProgramsProps {
  className?: string
  programs: Program[]
}

// Function to get category color
const getCategoryColor = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'business': return 'from-blue-400/80 via-blue-500/50 to-cyan-400/80';
    case 'it': return 'from-purple-400/80 via-purple-500/50 to-pink-400/80';
    case 'medicine': return 'from-green-400/80 via-green-500/50 to-emerald-400/80';
    case 'engineering': return 'from-orange-400/80 via-orange-500/50 to-amber-400/80';
    default: return 'from-gray-400/80 via-gray-500/50 to-slate-400/80';
  }
};

// Function to get category icon
const getCategoryIcon = (category: string): string => {
  switch (category.toLowerCase()) {
    case 'business': return '💼';
    case 'it': return '💻';
    case 'medicine': return '🩺';
    case 'engineering': return '🔧';
    default: return '📚';
  }
};

export function FeaturedPrograms({ className, programs }: FeaturedProgramsProps) {
  const t = useTranslations("pages.programs")
  
  // Filter featured programs
  const featuredPrograms = programs.filter((program) => program.featured)
  
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("featuredPrograms.title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("featuredPrograms.subtitle")}
            </p>
          </div>
        </div>
        <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredPrograms.map((program) => (
            <Link href={`/programs/${program.id}`} key={program.id} className="group">
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg h-full">
                <div className={`h-1.5 bg-gradient-to-r ${getCategoryColor(program.category)} group-hover:opacity-90 transition-opacity duration-200`} />
                <CardContent className="grid gap-2 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="line-clamp-1 text-xl font-bold">{program.title}</h3>
                      <p className="line-clamp-1 text-sm text-muted-foreground">{program.university}</p>
                    </div>
                    <span className="text-2xl ml-2" role="img" aria-label={program.category}>
                      {getCategoryIcon(program.category)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline">{program.level}</Badge>
                    <Badge variant="outline">{program.duration}</Badge>
                    <Badge variant="outline">{program.language}</Badge>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-sm font-medium text-blue-600 underline-offset-4 hover:underline">
                      {t("featuredPrograms.viewDetails")} →
                    </span>
                    {program.scholarship && (
                      <Badge className="bg-blue-600">{t("featuredPrograms.scholarshipAvailable")}</Badge>
                    )}
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