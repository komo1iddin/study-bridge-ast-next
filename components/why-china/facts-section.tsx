"use client"

import { 
  BarChart3, Building2, Globe, Award,
  LucideIcon
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

interface FactsSectionProps {
  className?: string
}

export function FactsSection({ className }: FactsSectionProps) {
  const t = useTranslations("whyChina.facts")
  
  // Icon mapping for facts
  const iconMap: LucideIcon[] = [BarChart3, Building2, Globe, Award]
  
  // Get facts from translations
  const facts = t.raw("items") as Array<{ value: string, label: string }>
  
  // Add icons to facts
  const factsWithIcons = facts.map((fact, index) => ({
    ...fact,
    icon: iconMap[index % iconMap.length]
  }))
  
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
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {factsWithIcons.map((fact, index) => {
            const Icon = fact.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{fact.value}</div>
                  <p className="text-sm text-muted-foreground">{fact.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 