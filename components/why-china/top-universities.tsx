"use client"

import { ChevronRight, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface TopUniversitiesProps {
  className?: string
}

// Sample university rankings - in a real app, this would come from an API or database
const topUniversities = [
  { name: "Tsinghua University", rank: "#14", city: "Beijing" },
  { name: "Peking University", rank: "#16", city: "Beijing" },
  { name: "Fudan University", rank: "#31", city: "Shanghai" },
  { name: "Shanghai Jiao Tong University", rank: "#59", city: "Shanghai" },
  { name: "Zhejiang University", rank: "#45", city: "Hangzhou" },
]

export function TopUniversities({ className }: TopUniversitiesProps) {
  const t = useTranslations("whyChina.topUniversities")
  
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {t("title")}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
          <div className="relative overflow-hidden rounded-xl border bg-background p-2">
            <div className="grid grid-cols-3 gap-2 text-center text-sm font-medium">
              <div className="bg-blue-600 text-white rounded-lg py-3">{t("columns.university")}</div>
              <div className="bg-blue-600 text-white rounded-lg py-3">{t("columns.worldRanking")}</div>
              <div className="bg-blue-600 text-white rounded-lg py-3">{t("columns.location")}</div>
            </div>
            {topUniversities.map((uni, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 text-center text-sm mt-2 hover:bg-muted rounded-lg transition-colors"
              >
                <div className="py-3 font-medium">{uni.name}</div>
                <div className="py-3">{uni.rank}</div>
                <div className="py-3 flex items-center justify-center gap-1">
                  <MapPin className="h-3 w-3 text-blue-600" />
                  {uni.city}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/programs">
                {t("viewAll")}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 