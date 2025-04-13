"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { CheckCircle2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StudyOptionsProps {
  className?: string
}

export function StudyOptions({ className }: StudyOptionsProps) {
  const t = useTranslations("whyChina.studyOptions")
  
  const tabOptions = ["bachelor", "master", "phd", "language"]
  
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-slate-50 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="mx-auto py-12">
          <Tabs defaultValue="bachelor" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              {tabOptions.map((option) => (
                <TabsTrigger key={option} value={option}>
                  {t(`tabs.${option}.title`)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {tabOptions.map((option) => (
              <TabsContent key={option} value={option} className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="text-2xl font-bold">{t(`tabs.${option}.heading`)}</h3>
                        <p className="mt-2 text-muted-foreground">
                          {t(`tabs.${option}.description`)}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {(t.raw(`tabs.${option}.features`) as string[]).map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <CheckCircle2 className="mr-2 h-4 w-4 text-blue-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=300&width=400"
                          width={400}
                          height={300}
                          alt={t(`tabs.${option}.heading`)}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
} 