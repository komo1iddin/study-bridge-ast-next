"use client"

import { useTranslations } from "next-intl"
import { Trophy, BarChart, Users, Award } from "lucide-react"
import { cn } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"

interface FactsSectionProps {
  className?: string
}

export function FactsSection({ className }: FactsSectionProps) {
  const t = useTranslations("pages.whyChina")
  
  // Get facts from translations
  const factsData = t.raw("facts.items") as Array<{ value: string, label: string }>
  
  // Assign icons to facts
  const iconMap = [Trophy, BarChart, Users, Award]
  const factsWithIcons = factsData.map((fact, index) => ({
    ...fact,
    icon: iconMap[index % iconMap.length]
  }))
  
  // Colors for icons based on index
  const iconColors = [
    "text-blue-600",
    "text-purple-600", 
    "text-amber-600",
    "text-green-600",
  ]
  
  // Gradient backgrounds for cards
  const gradients = [
    "from-blue-50 to-indigo-50",
    "from-purple-50 to-pink-50",
    "from-amber-50 to-orange-50",
    "from-green-50 to-teal-50",
  ]
  
  // Border colors for cards
  const borderColors = [
    "border-blue-200",
    "border-purple-200",
    "border-amber-200",
    "border-green-200",
  ]

  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
            {t("facts.title")}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            {t("facts.subtitle")}
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {factsWithIcons.map((fact, index) => {
            const Icon = fact.icon
            return (
              <Card
                key={index}
                className={cn(
                  "group relative border bg-gradient-to-br shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
                  gradients[index % gradients.length],
                  borderColors[index % borderColors.length]
                )}
                data-aos="fade-up" 
                data-aos-delay={100 * index}
              >
                <CardContent className="p-6 text-center">
                  <div className={cn(
                    "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm",
                    "ring-1 ring-inset ring-gray-100/50"
                  )}>
                    <Icon className={cn("h-7 w-7", iconColors[index % iconColors.length])} />
                  </div>
                  <div className={cn("text-3xl font-bold", iconColors[index % iconColors.length])}>
                    {fact.value}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{fact.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 