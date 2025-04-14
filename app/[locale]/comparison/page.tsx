import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { ComparisonContent } from '@/components/comparison/comparison-content'

interface PageProps {
  params: { locale: string };
}

// Generate metadata for the page
export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  // Await the params object before accessing properties
  const params = await props.params;
  const locale = params.locale;
  
  // Explicitly type the options object
  const translationOptions: { locale: string; namespace: string } = {
    locale,
    namespace: "pages.comparison",
  };
  
  // Call getTranslations directly, relying on i18n/request.ts config
  const t = await getTranslations(translationOptions)

  return {
    title: t("metadata.title"),
    description: t("metadata.description")
  }
}

// Server component to ensure proper SEO and initial rendering
export default async function ComparisonPage(props: PageProps) {
  // Await the params object before accessing properties
  const params = await props.params;
  const locale = params.locale;
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ComparisonContent lang={locale} />
      </main>
      <Footer />
    </div>
  )
} 