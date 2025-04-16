"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { HomeFAQ } from "@/types/content"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

interface HomeFAQSectionProps {
  faqs: HomeFAQ[]
}

export function HomeFAQSection({ faqs }: HomeFAQSectionProps) {
  const t = useTranslations("components.home.faq")
  const [openItems, setOpenItems] = useState<string[]>([])
  
  // Group FAQs by category
  const [categories] = useState(() => {
    const categoryMap = new Map<string, HomeFAQ[]>();
    
    faqs.forEach(faq => {
      if (!categoryMap.has(faq.category)) {
        categoryMap.set(faq.category, []);
      }
      categoryMap.get(faq.category)?.push(faq);
    });
    
    // Sort FAQs by order within each category if available
    categoryMap.forEach((items, category) => {
      categoryMap.set(
        category,
        items.sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          return 0;
        })
      );
    });
    
    return Array.from(categoryMap.entries()).map(([category, items]) => ({
      id: category,
      title: t(`categories.${category}`, { default: category }),
      items
    }));
  });

  const toggleItem = (id: string) => {
    setOpenItems(current => 
      current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id]
    )
  }
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>
      
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
            <div className="bg-white rounded-lg shadow">
              {category.items.map((faq) => (
                <div key={faq.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                    aria-expanded={openItems.includes(faq.id)}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown 
                      className={cn(
                        "h-5 w-5 text-gray-500 transition-transform duration-200",
                        openItems.includes(faq.id) ? "transform rotate-180" : ""
                      )}
                    />
                  </button>
                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
