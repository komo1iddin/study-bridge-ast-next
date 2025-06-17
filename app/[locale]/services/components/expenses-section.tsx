"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Building, CreditCard, Plane, FileCheck, Activity, ShieldCheck, MapPin, ShoppingBag, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import SectionHeader from "@/components/ui/section-header"

interface ExpenseCardProps {
  icon: React.ElementType
  name: string
  amountLabel: string
  country: "uzbekistan" | "china"
}

interface ExpensesSectionProps {
  hideHeader?: boolean
}

// Static expense data moved outside component
type ExpenseData = { icon: React.ElementType; key: string }

const UZBEKISTAN_EXPENSES: ExpenseData[] = [
  { icon: Building, key: "visa" },
  { icon: CreditCard, key: "bankStatement" },
  { icon: Plane, key: "flightTickets" },
  { icon: FileCheck, key: "documents" },
] as const

const CHINA_EXPENSES: ExpenseData[] = [
  { icon: Activity, key: "medicalCheckup" },
  { icon: ShieldCheck, key: "insurance" },
  { icon: MapPin, key: "residentPermit" },
  { icon: ShoppingBag, key: "dailyExpenses" },
  { icon: Plane, key: "airportPickup" },
] as const

export function ExpensesSection({ hideHeader = false }: ExpensesSectionProps) {
  const t = useTranslations("pages.services.expensesSection")
  const tUz = useTranslations("pages.services.expensesSection.uzbekistan")
  const tChina = useTranslations("pages.services.expensesSection.china")

  return (
    <section id="expenses" className="py-6 md:py-8 mb-10">
      {!hideHeader && (
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          alignment="center"
        />
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Uzbekistan Expenses */}
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 transition-all duration-200 hover:shadow-lg h-full">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-xl">🇺🇿</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t("uzbekistanTitle")}</h3>
                <p className="text-blue-100 text-sm">{t("notIncludedNote")}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 p-6">
            <ul className="flex-1 space-y-3">
              {UZBEKISTAN_EXPENSES.map((expense) => (
                <li 
                  key={expense.key}
                  className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 transition-all duration-200 hover:bg-blue-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <expense.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-900">{tUz(`title.${expense.key}`)}</span>
                  </div>
                  <span className="px-3 py-1 bg-white rounded-full text-blue-700 font-semibold text-sm shadow-sm">
                    {tUz(`amounts.${expense.key}`)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">{t("totalEstimated")}</span>
              </div>
              <span className="text-xl font-bold text-blue-700">{tUz("amounts.total")}</span>
            </div>
          </div>
        </div>

        {/* China Expenses */}
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-red-100 transition-all duration-200 hover:shadow-lg h-full">
          <div className="bg-gradient-to-r from-red-500 to-red-600 py-4 px-6">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-xl">🇨🇳</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t("chinaTitle")}</h3>
                <p className="text-red-100 text-sm">{t("notIncludedNote")}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 p-6">
            <ul className="flex-1 space-y-3">
              {CHINA_EXPENSES.map((expense) => (
                <li 
                  key={expense.key}
                  className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100 transition-all duration-200 hover:bg-red-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <expense.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-900">{tChina(`title.${expense.key}`)}</span>
                  </div>
                  <span className="px-3 py-1 bg-white rounded-full text-red-700 font-semibold text-sm shadow-sm">
                    {tChina(`amounts.${expense.key}`)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-red-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-red-600" />
                <span className="font-medium text-gray-900">{t("totalEstimated")}</span>
              </div>
              <span className="text-xl font-bold text-red-700">{tChina("amounts.total")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}