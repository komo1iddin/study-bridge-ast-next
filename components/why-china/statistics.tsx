"use client"

import { 
  Building2, Users, Globe, Award, 
  BarChart3, LucideIcon 
} from "lucide-react"
import { useTranslations } from "next-intl"

import { Card, CardContent } from "@/components/ui/card"

interface StatisticsProps {
  className?: string
}

type StatItem = {
  value: string
  label: string
  icon: LucideIcon
}

export function Statistics({ className }: StatisticsProps) {
  const t = useTranslations("whyChina.statistics")
  
  // Map of icon names to icon components
  const iconMap = {
    Building2,
    Users,
    Globe,
    Award,
    BarChart3
  }
  
  // Get statistics from translations
  const statistics = t.raw("items") as Array<{ value: string, label: string }>

  // Assign icons to statistics
  const iconNames = [Building2, Users, Globe, Award]
  const statsWithIcons = statistics.map((stat, index) => ({
    ...stat,
    icon: iconNames[index % iconNames.length]
  }))

  return (
    <section className={`w-full py-12 md:py-16 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsWithIcons.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="border-2 border-blue-100 transition-all duration-200 hover:border-blue-600"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 