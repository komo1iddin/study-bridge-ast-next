"use client"

import { 
  GraduationCap, DollarSign, Globe, 
  Building2, Languages, PenTool, LucideIcon 
} from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

import { Card, CardContent } from "@/components/ui/card"

interface BenefitsProps {
  className?: string
}

export function Benefits({ className }: BenefitsProps) {
  const t = useTranslations("pages.whyChina")
  
  // Map of icon names to icon components
  const iconMap = {
    GraduationCap,
    DollarSign,
    Globe,
    Building2,
    Languages,
    PenTool
  }
  
  // Get benefits from translations
  const benefits = t.raw("benefits.items") as Array<{ title: string, description: string }>

  // Assign icons to benefits
  const iconNames = [GraduationCap, DollarSign, Globe, Building2, Languages, PenTool]
  const benefitsWithIcons = benefits.map((benefit, index) => ({
    ...benefit,
    icon: iconNames[index % iconNames.length]
  }))
  
  // Colors for icons based on index
  const iconColors = [
    "text-blue-600",
    "text-purple-600", 
    "text-amber-600",
    "text-green-600",
    "text-sky-600",
    "text-indigo-600",
  ]
  
  // Border colors for cards
  const borderColors = [
    "border-blue-200",
    "border-purple-200",
    "border-amber-200",
    "border-green-200",
    "border-sky-200",
    "border-indigo-200",
  ]

  return (
    <section className={`w-full py-12 md:py-24 bg-gray-50 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("benefits.title")}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            {t("benefits.subtitle")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefitsWithIcons.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card 
                key={index}
                className={cn(
                  "border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
                  borderColors[index % borderColors.length]
                )}
              >
                <CardContent className="p-6">
                  <div className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm mb-4",
                    "ring-1 ring-inset ring-gray-100/50"
                  )}>
                    <Icon className={cn("h-7 w-7", iconColors[index % iconColors.length])} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-500">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 