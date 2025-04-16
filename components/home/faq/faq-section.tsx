import { getContentItems } from '@/lib/decap-cms'
import { HomeFAQ } from '@/types/content'
import { HomeFAQSection } from '.'

interface FAQSectionProps {
  lang: string
}

export async function FAQSection({ lang }: FAQSectionProps) {
  // Fetch FAQs from CMS
  const faqs = getContentItems<HomeFAQ>('home-faqs', lang)
  
  // If no FAQs available, use fallback data
  const faqItems = faqs.length > 0 ? faqs : getFallbackFAQs()
  
  return <HomeFAQSection faqs={faqItems} />
}

// Fallback data in case CMS content is not available
function getFallbackFAQs(): HomeFAQ[] {
  return [
    {
      id: "visa",
      category: "application",
      question: "How do I apply for a Chinese student visa from Uzbekistan?",
      answer: "To apply for a Chinese student visa (X1 or X2) from Uzbekistan, you'll need your admission letter, JW201/JW202 form from the university, a valid passport, visa application form, passport photos, medical examination report, and proof of financial capability. Submit these to the Chinese Embassy in Tashkent. Processing typically takes 7-10 business days."
    },
    {
      id: "documents",
      category: "application",
      question: "What documents do I need to prepare for university applications in China?",
      answer: "You'll need your high school/bachelor's diploma with transcript (notarized and translated), passport copy, application form, study plan or personal statement, recommendation letters, passport photos, medical examination report, and language proficiency certificates (HSK for Chinese programs, IELTS/TOEFL for English programs). All documents must be translated to Chinese or English."
    },
    {
      id: "scholarships",
      category: "financial",
      question: "What scholarships are available for Uzbek students in China?",
      answer: "Uzbek students can apply for various scholarships, including the Chinese Government Scholarship (CSC), Confucius Institute Scholarship, provincial government scholarships, university-specific scholarships, and bilateral scholarships under Uzbekistan-China agreements. The CSC scholarship is the most comprehensive, covering tuition, accommodation, and monthly stipend."
    },
    {
      id: "living-costs",
      category: "financial",
      question: "What are the living costs for Uzbek students in China?",
      answer: "Monthly living costs for Uzbek students in China range from $300-600, varying by city. Beijing and Shanghai are more expensive ($500-700) than smaller cities ($300-450). This includes food ($150-250), accommodation in university dormitories ($80-200), transportation ($30-50), and personal expenses. International students typically spend less than Chinese residents due to subsidized on-campus housing."
    },
    {
      id: "language",
      category: "academic",
      question: "Do I need to know Chinese to study in China?",
      answer: "It depends on your program. Many universities offer programs taught entirely in English, especially at the master's and doctoral levels. For Chinese-taught programs, you'll need HSK level 4-5. Regardless of your program language, learning basic Chinese is recommended for daily life. Most universities offer free or subsidized Chinese language courses for international students."
    },
    {
      id: "recognition",
      category: "academic",
      question: "Are Chinese degrees recognized in Uzbekistan?",
      answer: "Yes, degrees from accredited Chinese universities are recognized in Uzbekistan through bilateral education agreements between the two countries. To ensure recognition, your chosen university should be on the Ministry of Education of China's official list. After graduation, you'll need to get your degree authenticated by the Chinese Ministry of Education and then by the Uzbek Embassy in China."
    },
    {
      id: "work",
      category: "life",
      question: "Can Uzbek students work while studying in China?",
      answer: "International students, including those from Uzbekistan, can work part-time on campus and off-campus with permission. You can work up to 20 hours per week during semesters and full-time during official holidays. For off-campus work, you need approval from both your university and the immigration authorities. Many students find opportunities as language tutors, translators, or in international businesses."
    },
    {
      id: "accommodation",
      category: "life",
      question: "What accommodation options are available for international students in China?",
      answer: "Most international students in China stay in university dormitories, which are affordable ($80-200 monthly) and convenient. Dormitories usually offer single or shared rooms with basic amenities. Off-campus apartments are another option, costing $300-700 depending on the city and location. Many universities help students find suitable off-campus housing if dormitories are full."
    }
  ]
} 