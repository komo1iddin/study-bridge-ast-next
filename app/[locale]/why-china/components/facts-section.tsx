"use client"

import { useTranslations } from "next-intl"
import { Trophy, BarChart, Users, Award } from "lucide-react"

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

  return (
    <section className={`w-full py-12 md:py-24 bg-blue-600 text-white ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("facts.title")}
          </h2>
          <p className="max-w-[700px] text-blue-100 md:text-xl">
            {t("facts.subtitle")}
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {factsWithIcons.map((fact, index) => {
            const Icon = fact.icon
            return (
              <Card
                key={index}
                className="border-0 bg-white/10 backdrop-blur-sm text-white"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold">{fact.value}</div>
                  <p className="text-sm text-blue-100">{fact.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 