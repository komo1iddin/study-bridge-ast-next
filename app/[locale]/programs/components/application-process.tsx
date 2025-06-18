"use client"

import { useTranslations } from "next-intl"
import { FileSpreadsheet, FolderInput, ClipboardList, Clock, MailOpen, Plane } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface ApplicationProcessProps {
  className?: string
}

export function ApplicationProcess({ className }: ApplicationProcessProps) {
  const t = useTranslations("pages.programs")
  
  // Step icons
  const stepIcons = [FileSpreadsheet, FolderInput, ClipboardList, Clock, MailOpen, Plane]
  
  // Get steps from translations
  const steps = t.raw("applicationProcess.steps") as Array<{ title: string, description: string }>
  
  // Add icons to steps
  const stepsWithIcons = steps.map((step, index) => ({
    ...step,
    icon: stepIcons[index % stepIcons.length]
  }))
  
  return (
    <section className={`w-full pt-12 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("applicationProcess.title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("applicationProcess.subtitle")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 pt-12 md:grid-cols-2 lg:grid-cols-3">
          {stepsWithIcons.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-100 opacity-80"></div>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">
                      <span className="text-blue-600">{index + 1}.</span> {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
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