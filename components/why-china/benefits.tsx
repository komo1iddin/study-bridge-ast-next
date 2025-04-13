"use client"

import { 
  Award, DollarSign, Globe, Briefcase, 
  BookOpen, Users, LucideIcon 
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

interface BenefitsProps {
  className?: string
}

export function Benefits({ className }: BenefitsProps) {
  const t = useTranslations("whyChina.benefits")
  
  // Icon mapping based on benefit title keywords
  const getIconForBenefit = (title: string): LucideIcon => {
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes("education") || lowerTitle.includes("quality") || 
        lowerTitle.includes("ta'lim") || lowerTitle.includes("образование")) {
      return Award
    } else if (lowerTitle.includes("price") || lowerTitle.includes("cost") || 
              lowerTitle.includes("narx") || lowerTitle.includes("цен")) {
      return DollarSign
    } else if (lowerTitle.includes("diploma") || lowerTitle.includes("international") || 
              lowerTitle.includes("diplom") || lowerTitle.includes("диплом")) {
      return Globe
    } else if (lowerTitle.includes("career") || lowerTitle.includes("karyera") || 
              lowerTitle.includes("карьер")) {
      return Briefcase
    } else if (lowerTitle.includes("language") || lowerTitle.includes("chinese") || 
              lowerTitle.includes("til") || lowerTitle.includes("язык")) {
      return BookOpen
    } else if (lowerTitle.includes("cultural") || lowerTitle.includes("experience") || 
              lowerTitle.includes("madaniy") || lowerTitle.includes("культур")) {
      return Users
    }
    
    // Default icon
    return Award
  }
  
  // Get benefits from translations
  const benefits = t.raw("items") as Array<{ title: string, description: string }>

  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t("title")}
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = getIconForBenefit(benefit.title)
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <h3 className="text-xl font-bold">{benefit.title}</h3>
                    </div>
                    <p className="text-white/80">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 