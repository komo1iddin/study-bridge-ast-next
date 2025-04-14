'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CTAProps {
  namespace: string // e.g. 'pages.home.whyChina'
  className?: string
  lang: string
  linkHref?: string // Optional custom link path, defaults to `/${lang}/why-china`
}

export default function CTA({ namespace, className, lang, linkHref }: CTAProps) {
  const t = useTranslations(namespace)
  
  return (
    <div 
      className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 md:p-10 shadow-xl ${className || ''}`}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {t('cta.title')}
        </h3>
        <p className="text-lg mb-6 text-blue-100">
          {t('cta.description')}
        </p>
        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
          <Link href={linkHref || `/${lang}/why-china`}>
            {t('cta.button')}
          </Link>
        </Button>
      </div>
    </div>
  )
} 