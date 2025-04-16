"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { HomeFAQ } from "@/types/content"

interface HomeFAQSectionProps {
  faqs: HomeFAQ[]
}

export function HomeFAQSection({ faqs }: HomeFAQSectionProps) {
  const t = useTranslations("components.home.faq")
  
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
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>
      
      {categories.map(category => (
        <Card key={category.id} className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {category.items.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left font-medium text-slate-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-blue-50 border-blue-100">
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    </div>
  );
}
