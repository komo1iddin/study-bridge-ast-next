"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Program } from "./featured-programs"

interface AllProgramsProps {
  className?: string
  programs: Program[]
  filteredPrograms?: Program[]
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

export function AllPrograms({ className, programs, filteredPrograms }: AllProgramsProps) {
  const t = useTranslations("pages.programs.allPrograms")
  
  // Use filtered programs if provided, otherwise use all programs
  const displayPrograms = filteredPrograms || programs
  
  return (
    <section id="all-programs" className={`w-full py-12 md:py-16 bg-slate-50 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
            <p className="text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="grid gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayPrograms.map((program) => (
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
                      {t("viewDetails")} →
                    </span>
                    {program.scholarship && (
                      <Badge className="bg-blue-600">{t("scholarshipAvailable")}</Badge>
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