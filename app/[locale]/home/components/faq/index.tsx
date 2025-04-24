"use client"

import { useState, useRef } from "react"
import { useTranslations } from "next-intl"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { HomeFAQ } from "@/types/content"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface HomeFAQSectionProps {
  faqs: HomeFAQ[]
}

export function HomeFAQSection({ faqs }: HomeFAQSectionProps) {
  const t = useTranslations("components.home.faq")
  const [openItem, setOpenItem] = useState<string | null>(null)
  
  // Group FAQs by category but only for ordering purposes
  const [orderedFaqs] = useState(() => {
    // Sort FAQs by category and then by order within each category
    return faqs.sort((a, b) => {
      // First sort by category name
      const categoryCompare = a.category.localeCompare(b.category);
      if (categoryCompare !== 0) return categoryCompare;
      
      // Then sort by order within category
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return 0;
    });
  });

  const toggleItem = (id: string) => {
    setOpenItem(current => current === id ? null : id)
  }
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        {orderedFaqs.map((faq) => (
          <div key={faq.id} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleItem(faq.id)}
              className={cn(
                "flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none transition-colors duration-200",
                openItem === faq.id ? "bg-gray-50" : ""
              )}
              aria-expanded={openItem === faq.id}
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              <motion.div
                animate={{ rotate: openItem === faq.id ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openItem === faq.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 pt-1 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-blue-700 mb-2">{t("contact.title")}</h3>
            <p className="text-slate-600">{t("contact.description")}</p>
          </div>
          <Button className="shrink-0" size="lg">
            <Mail className="mr-2 h-4 w-4" />
            {t("contact.button")}
          </Button>
        </div>
      </div>
    </div>
  );
}
