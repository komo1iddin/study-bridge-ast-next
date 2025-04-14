'use client'

import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'

interface PageHeaderProps {
  namespace: string
}

export function PageHeader({ namespace }: PageHeaderProps) {
  const t = useTranslations(namespace)
  
  return (
    <section className="w-full py-12 md:py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3 py-1 bg-blue-200 text-blue-800 border-blue-300">
            {t('pageHeader.badge', { default: 'Comparison' })}
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl">
            {t('pageHeader.title', { default: 'China vs Local Education: Complete Comparison' })}
          </h1>
          <p className="max-w-[800px] text-gray-600 md:text-xl">
            {t('pageHeader.description', { default: 'Compare the advantages of studying in China vs local education options' })}
          </p>
        </div>
      </div>
    </section>
  )
} 