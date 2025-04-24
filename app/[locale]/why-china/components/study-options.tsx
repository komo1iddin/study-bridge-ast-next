"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { GraduationCap, BookOpen, Users, Award } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

interface StudyOptionsProps {
  className?: string
}

export function StudyOptions({ className }: StudyOptionsProps) {
  const t = useTranslations("pages.whyChina")
  const [activeTab, setActiveTab] = useState("bachelor")
  
  const tabData = [
    {
      id: "bachelor",
      icon: GraduationCap,
    },
    {
      id: "master",
      icon: Award,
    },
    {
      id: "phd",
      icon: Users,
    },
    {
      id: "language",
      icon: BookOpen,
    }
  ]
  
  return (
    <section className={`w-full py-12 md:py-24 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("studyOptions.title")}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            {t("studyOptions.subtitle")}
          </p>
        </div>
        
        <Tabs defaultValue="bachelor" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-4 h-auto mb-12">
            {tabData.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Icon className="h-4 w-4" />
                  <span>{t(`studyOptions.tabs.${tab.id}.title`)}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>
          
          {tabData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{t(`studyOptions.tabs.${tab.id}.heading`)}</h3>
                    <p className="text-gray-500">{t(`studyOptions.tabs.${tab.id}.description`)}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                          </div>
                          <span>{t(`studyOptions.tabs.${tab.id}.features.${i}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
} 