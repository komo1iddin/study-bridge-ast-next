"use client"

import { useTranslations, useLocale } from "next-intl"

interface CostComparisonProps {
  className?: string
}

// Sample cost comparison data - in a real app, this would come from an API or database
const costComparison = [
  { country: "AQSh", tuition: "$25,000-$50,000", living: "$15,000-$25,000", total: "$40,000-$75,000" },
  { country: "Buyuk Britaniya", tuition: "$20,000-$35,000", living: "$12,000-$20,000", total: "$32,000-$55,000" },
  { country: "Avstraliya", tuition: "$20,000-$40,000", living: "$10,000-$20,000", total: "$30,000-$60,000" },
  { country: "Kanada", tuition: "$15,000-$35,000", living: "$8,000-$15,000", total: "$23,000-$50,000" },
  { country: "Xitoy", tuition: "$3,000-$10,000", living: "$3,000-$6,000", total: "$6,000-$16,000" },
]

// Country name translations for different locales
const countryTranslations: Record<string, Record<string, string>> = {
  "AQSh": {
    "en": "USA",
    "ru": "США",
    "uz": "AQSh"
  },
  "Buyuk Britaniya": {
    "en": "United Kingdom",
    "ru": "Великобритания",
    "uz": "Buyuk Britaniya"
  },
  "Avstraliya": {
    "en": "Australia",
    "ru": "Австралия",
    "uz": "Avstraliya"
  },
  "Kanada": {
    "en": "Canada",
    "ru": "Канада",
    "uz": "Kanada"
  },
  "Xitoy": {
    "en": "China",
    "ru": "Китай",
    "uz": "Xitoy"
  }
}

export function CostComparison({ className }: CostComparisonProps) {
  const t = useTranslations("whyChina.costComparison")
  const locale = useLocale() as string
  
  // Translate country names based on current locale
  const getCountryName = (country: string) => {
    return countryTranslations[country]?.[locale] || country
  }
  
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
        <div className="mx-auto max-w-5xl py-12">
          <div className="relative overflow-hidden rounded-xl border bg-background p-2">
            <div className="grid grid-cols-4 gap-2 text-center text-sm font-medium">
              <div className="bg-blue-600 text-white rounded-lg py-3">{t("columns.country")}</div>
              <div className="bg-blue-600 text-white rounded-lg py-3">{t("columns.tuition")}</div>
              <div className="bg-blue-600 text-white rounded-lg py-3">{t("columns.living")}</div>
              <div className="bg-blue-600 text-white rounded-lg py-3">{t("columns.total")}</div>
            </div>
            {costComparison.map((country, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-2 text-center text-sm mt-2 hover:bg-muted rounded-lg transition-colors ${
                  country.country === "Xitoy" ? "bg-blue-50" : ""
                }`}
              >
                <div className="py-3 font-medium">{getCountryName(country.country)}</div>
                <div className="py-3">{country.tuition}</div>
                <div className="py-3">{country.living}</div>
                <div className="py-3 font-medium">{country.total}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t("disclaimer")}
          </div>
        </div>
      </div>
    </section>
  )
} 