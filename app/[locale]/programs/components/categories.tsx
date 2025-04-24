"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { Briefcase, Code, Stethoscope, Wrench, ChevronRight } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CategoriesProps {
  className?: string
}

export function Categories({ className }: CategoriesProps) {
  const t = useTranslations("pages.programs")
  
  // Category data with icons
  const categories = [
    {
      id: "business",
      icon: Briefcase,
    },
    {
      id: "it",
      icon: Code,
    },
    {
      id: "medicine",
      icon: Stethoscope,
    },
    {
      id: "engineering",
      icon: Wrench,
    },
  ]
  
  return (
    <section className={`w-full py-12 md:py-24 lg:py-32 bg-slate-50 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("categories.title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("categories.subtitle")}
            </p>
          </div>
        </div>
        <div className="grid gap-6 pt-12 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.id} className="transition-all duration-200 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">{t(`categories.${category.id}.title`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`categories.${category.id}.description`)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="text-blue-600">
                    <Link href={`/programs?category=${category.id}`}>
                      {t("categories.viewPrograms")}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
} 