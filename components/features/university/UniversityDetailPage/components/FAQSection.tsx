"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import type { University } from "@/components/universities/data"

interface FAQSectionProps {
  university: University
  lang: string
}

export function FAQSection({ university, lang }: FAQSectionProps) {
  // Mock FAQ data - in a real app, this would come from the API
  const faqs = [
    {
      id: "application",
      question: "What is the application process for international students?",
      answer: "The application process for international students involves selecting a program, preparing required documents (including academic transcripts, language test scores, and personal statement), submitting an online application, and waiting for the admissions committee's decision."
    },
    {
      id: "deadlines",
      question: "What are the application deadlines?",
      answer: "For Fall semester (starting in September), the application deadline is typically May 15 for international students. For Spring semester (starting in February), applications are due by November 15."
    },
    {
      id: "scholarships",
      question: "Are scholarships available for international students?",
      answer: `Yes, ${university.name} offers various scholarships for international students based on academic merit, financial need, and country of origin. Scholarship applications should be submitted alongside your program application for consideration.`
    },
    {
      id: "housing",
      question: "Is accommodation guaranteed for international students?",
      answer: "On-campus accommodation is guaranteed for all first-year international students who apply before the housing deadline. After the first year, students may choose to continue living on campus or move to off-campus housing."
    },
    {
      id: "language",
      question: "Do I need to know Chinese to study at this university?",
      answer: "For programs taught in English, knowledge of Chinese is not required for admission. However, basic Chinese language skills will be helpful for daily life. The university offers free Chinese language courses for international students."
    },
    {
      id: "visa",
      question: "How do I obtain a student visa?",
      answer: "After receiving your admission letter, you'll need to apply for a student visa (X1 or X2) at the Chinese embassy or consulate in your country. The university will provide you with the necessary documents, including the JW201 or JW202 form."
    },
    {
      id: "fees",
      question: "What are the tuition fees and living costs?",
      answer: "Tuition fees vary by program, typically ranging from $3,000 to $10,000 per year for international students. Living costs, including accommodation, food, and personal expenses, are approximately $300-500 per month depending on lifestyle."
    },
    {
      id: "transfer",
      question: "Can I transfer credits from another university?",
      answer: "Yes, the university accepts transfer credits from accredited institutions. The admissions committee will evaluate your transcript and determine which credits can be transferred to your program."
    }
  ];

  // Group FAQs by category for better organization
  const categories = [
    { id: "admission", title: "Admission & Application", items: ["application", "deadlines", "transfer"] },
    { id: "financial", title: "Financial Information", items: ["scholarships", "fees"] },
    { id: "life", title: "Student Life", items: ["housing", "language", "visa"] }
  ];

  // Function to get FAQs by category
  const getFAQsByCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return [];
    return faqs.filter(faq => category.items.includes(faq.id));
  };

  return (
    <div className="space-y-6">
      {categories.map(category => (
        <Card key={category.id} className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {getFAQsByCategory(category.id).map((faq) => (
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
              <h3 className="text-lg font-medium text-blue-700 mb-2">Still have questions?</h3>
              <p className="text-slate-600">
                Contact our international student office for more information about admission requirements, programs, or campus life.
              </p>
            </div>
            <Button className="shrink-0" size="lg">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 