"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Building, CreditCard, Plane, FileCheck, Activity, ShieldCheck, MapPin, ShoppingBag } from "lucide-react"
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

// Static expense data moved outside component to avoid re-creation on every render
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="expenses" className="py-12 md:py-16 lg:py-20">
      {!hideHeader && (
        <SectionHeader
          title={t("title")}
          subtitle={t("subtitle")}
          alignment="center"
          className="mb-16"
        />
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Uzbekistan Expenses */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="h-full"
        >
          <div className="relative h-full rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-blue-600" />

            {/* Flag decoration */}
            <div className="absolute top-6 right-6 w-16 h-16 opacity-5" aria-hidden="true">
              <div className="w-full h-2/3 bg-blue-600"></div>
              <div className="w-full h-1/3 bg-green-600"></div>
              <div className="w-full h-1/3 bg-red-600"></div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
                  <span className="text-2xl">🇺🇿</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{t("uzbekistanTitle")}</h3>
                  <p className="text-sm text-gray-500">{t("notIncludedNote")}</p>
                </div>
              </div>

              <motion.ul
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {UZBEKISTAN_EXPENSES.map((expense) => (
                  <ExpenseCard
                    key={expense.key}
                    icon={expense.icon}
                    name={tUz(`title.${expense.key}`)}
                    amountLabel={tUz(`amounts.${expense.key}`)}
                    country="uzbekistan"
                  />
                ))}
              </motion.ul>

              <motion.div
                className="mt-8 pt-6 border-t border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{t("totalEstimated")}</span>
                  <span className="text-xl font-bold text-blue-700">{tUz("amounts.total")}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* China Expenses */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="h-full"
        >
          <div className="relative h-full rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-600" />

            {/* Flag decoration */}
            <div className="absolute top-6 right-6 w-16 h-16 opacity-5" aria-hidden="true">
              <div className="w-full h-1/2 bg-red-600"></div>
              <div className="w-full h-1/2 bg-yellow-500"></div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-red-100 rounded-xl text-red-600">
                  <span className="text-2xl">🇨🇳</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{t("chinaTitle")}</h3>
                  <p className="text-sm text-gray-500">{t("notIncludedNote")}</p>
                </div>
              </div>

              <motion.ul
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {CHINA_EXPENSES.map((expense) => (
                  <ExpenseCard
                    key={expense.key}
                    icon={expense.icon}
                    name={tChina(`title.${expense.key}`)}
                    amountLabel={tChina(`amounts.${expense.key}`)}
                    country="china"
                  />
                ))}
              </motion.ul>

              <motion.div
                className="mt-8 pt-6 border-t border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{t("totalEstimated")}</span>
                  <span className="text-xl font-bold text-red-700">{tChina("amounts.total")}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ExpenseCard({ icon: Icon, name, amountLabel, country }: ExpenseCardProps) {
  const isUzbekistan = country === "uzbekistan";
  const accentLightBg = isUzbekistan ? "bg-blue-50" : "bg-red-50";
  const accentText = isUzbekistan ? "text-blue-700" : "text-red-700";

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      }}
      className={
        cn(
          "group relative flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 hover:shadow-md transition-shadow", 
          isUzbekistan ? "hover:border-blue-200" : "hover:border-red-200"
        )
      }
      whileHover={{ y: -2 }}
    >
      {/* accent bar */}
      <span className={cn("absolute left-0 top-0 h-full w-1.5 rounded-l-2xl", isUzbekistan ? "bg-blue-500" : "bg-red-500")} aria-hidden="true" />

      <div className="flex items-center gap-4 flex-1">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", accentLightBg, accentText)}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-medium text-gray-800 truncate">{name}</span>
      </div>
      <span className={cn("ml-auto px-3 py-0.5 rounded-full text-sm font-semibold", accentLightBg, accentText)}>
        {amountLabel}
      </span>
    </motion.li>
  )
}