"use client"

import { useTranslations } from "next-intl"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface CostComparisonProps {
  className?: string
}

// Sample cost comparison data
const costData = [
  {
    country: "China",
    tuition: "$2,000 - $10,000",
    living: "$3,000 - $6,000",
    total: "$5,000 - $16,000"
  },
  {
    country: "USA",
    tuition: "$20,000 - $50,000",
    living: "$10,000 - $20,000",
    total: "$30,000 - $70,000"
  },
  {
    country: "UK",
    tuition: "$15,000 - $40,000",
    living: "$12,000 - $18,000",
    total: "$27,000 - $58,000"
  },
  {
    country: "Australia",
    tuition: "$15,000 - $35,000",
    living: "$10,000 - $15,000",
    total: "$25,000 - $50,000"
  },
  {
    country: "Canada",
    tuition: "$10,000 - $30,000",
    living: "$8,000 - $12,000",
    total: "$18,000 - $42,000"
  }
]

export function CostComparison({ className }: CostComparisonProps) {
  const t = useTranslations("pages.whyChina")
  
  return (
    <section className={`w-full py-12 md:py-24 bg-gray-50 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("costComparison.title")}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            {t("costComparison.subtitle")}
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 text-white">
                <TableHead className="text-white">{t("costComparison.columns.country")}</TableHead>
                <TableHead className="text-white">{t("costComparison.columns.tuition")}</TableHead>
                <TableHead className="text-white">{t("costComparison.columns.living")}</TableHead>
                <TableHead className="text-white">{t("costComparison.columns.total")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costData.map((item, index) => (
                <TableRow 
                  key={index}
                  className={item.country === "China" ? "bg-blue-50" : undefined}
                >
                  <TableCell className="font-bold">
                    {item.country}
                  </TableCell>
                  <TableCell>{item.tuition}</TableCell>
                  <TableCell>{item.living}</TableCell>
                  <TableCell className="font-bold">{item.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <p className="text-sm text-gray-500 mt-4 text-center">
          {t("costComparison.disclaimer")}
        </p>
      </div>
    </section>
  )
} 