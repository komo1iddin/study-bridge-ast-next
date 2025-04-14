'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CTASectionProps {
  namespace: string
  lang: string
}

export function CTASection({ namespace, lang }: CTASectionProps) {
  const t = useTranslations(namespace)
  
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('cta.title', { default: 'Don\'t Miss Your Opportunity to Study in China' })}
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl">
              {t('cta.description', { default: 'Our experts will help you choose the right university and guide you through the application process.' })}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button 
              size="lg" 
              variant="secondary"
              className="group"
              asChild
            >
              <Link href={`/${lang}/#contact`} className="flex items-center">
                {t('cta.primaryButton', { default: 'Apply Now' })}
                <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 transition-colors duration-300"
              asChild
            >
              <Link href={`/${lang}/contact`}>
                {t('cta.secondaryButton', { default: 'Contact Us' })}
              </Link>
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 mix-blend-overlay">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white to-transparent rounded-full transform rotate-45" />
          </div>
        </div>
      </div>
    </section>
  )
} 