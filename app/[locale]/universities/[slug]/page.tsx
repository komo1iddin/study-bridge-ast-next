import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { UniversityDetailPage as UniversityDetail } from '@/components/features/university/university-detail-page/university-detail-page'
import { getContentItem, getContentItems } from '@/lib/decap-cms'
import type { University } from '@/types/content'

interface PageProps {
  params: {
    locale: string
    slug: string
  }
}

export async function generateStaticParams() {
  // Get all slugs from all locales
  const locales = ['en', 'ru', 'uz']
  const params = []

  for (const locale of locales) {
    const universities = getContentItems<University>('universities', locale)
    const slugs = universities.map(university => ({
      slug: university.slug,
      locale
    }))
    params.push(...slugs)
  }

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params)
  const { locale, slug } = resolvedParams
  
  // Get university data
  const university = getContentItem<University>('universities', slug, locale)
  
  if (!university) {
    return {
      title: 'University Not Found',
    }
  }
  
  return {
    title: university.name,
    description: university.description,
  }
}

export default async function UniversityPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params)
  const { locale, slug } = resolvedParams
  
  // Get university data
  const university = getContentItem<University>('universities', slug, locale)
  
  if (!university) {
    notFound()
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <UniversityDetail university={university} lang={locale} />
      </Suspense>
      <Footer />
    </div>
  )
} 