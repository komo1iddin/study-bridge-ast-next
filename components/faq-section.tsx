"use client"

import { useTranslations } from "next-intl"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  const t = useTranslations("home.faq")

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cost">
              <AccordionTrigger className="text-left">{t("questions.cost.question")}</AccordionTrigger>
              <AccordionContent>{t("questions.cost.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="scholarship">
              <AccordionTrigger className="text-left">{t("questions.scholarship.question")}</AccordionTrigger>
              <AccordionContent>{t("questions.scholarship.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="language">
              <AccordionTrigger className="text-left">{t("questions.language.question")}</AccordionTrigger>
              <AccordionContent>{t("questions.language.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="visa">
              <AccordionTrigger className="text-left">{t("questions.visa.question")}</AccordionTrigger>
              <AccordionContent>{t("questions.visa.answer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="work">
              <AccordionTrigger className="text-left">{t("questions.work.question")}</AccordionTrigger>
              <AccordionContent>{t("questions.work.answer")}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
