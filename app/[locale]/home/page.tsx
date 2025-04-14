import { OurTeam, OurPartners } from '@/components/home'
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

interface HomePageProps {
  params: {
    locale: string
  }
}

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'pages.home' })

  return {
    title: t('metadata.title', { default: 'Study in China - Your Trusted Partner' }),
    description: t('metadata.description', { default: 'Find the best universities and programs for studying in China with expert guidance' }),
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const t = await getTranslations('pages.home')
  const locale = params.locale

  return (
    <main className="min-h-screen">
      {/* Hero section would go here */}

      {/* Our Team section */}
      <OurTeam lang={locale} />

      {/* Our Partners section */}
      <OurPartners lang={locale} />

      {/* Other home page sections would go here */}
    </main>
  )
} 