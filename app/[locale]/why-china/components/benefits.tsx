"use client"

import { 
  GraduationCap, DollarSign, Globe, 
  Building2, Languages, PenTool, LucideIcon 
} from "lucide-react"
import { useTranslations } from "next-intl"

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
                className="border-2 border-blue-100 transition-all duration-200 hover:border-blue-600"
              >
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
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