import { getContentItems } from '@/lib/decap-cms'
import { HomeFAQ } from '@/types/content'
import { HomeFAQSection } from '.'

interface FAQSectionProps {
  lang: string
}

export async function FAQSection({ lang }: FAQSectionProps) {
  // Fetch FAQs from CMS
  const faqs = getContentItems<HomeFAQ>('home-faqs', lang)
  
  // Use the fetched content directly
  return <HomeFAQSection faqs={faqs} />
} 