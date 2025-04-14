'use client'

import { lazy, Suspense } from 'react'
import { useTranslations } from 'next-intl'

import { ComparisonSection } from '@/components/home/comparison-section'
import { PageHeader } from './page-header'
import { DetailedComparison } from './detailed-comparison'
import { KeyDifferences } from './key-differences'
import { Testimonials } from './testimonials'
import { FunFacts } from './fun-facts'
import { CTASection } from './cta-section'

// Dynamic import for expensive components if needed
// const KeyDifferences = lazy(() => import('./key-differences').then(mod => ({ default: mod.KeyDifferences })))
// const FunFacts = lazy(() => import('./fun-facts').then(mod => ({ default: mod.FunFacts })))

interface ComparisonContentProps {
  lang: string
}

export function ComparisonContent({ lang }: ComparisonContentProps) {
  const namespace = 'pages.comparison'
  
  return (
    <>
      <PageHeader namespace={namespace} />
      
      {/* Main Comparison Section from the home page */}
      <ComparisonSection />
      
      {/* Detailed Comparison with tabs and mobile-optimized view */}
      <DetailedComparison namespace={namespace} />
      
      {/* Key Differences with improved card design */}
      <KeyDifferences namespace={namespace} />
      
      {/* Testimonials with improved card design */}
      <Testimonials namespace={namespace} />
      
      {/* Fun Facts with improved card design */}
      <FunFacts namespace={namespace} />
      
      {/* CTA Section */}
      <CTASection namespace={namespace} lang={lang} />
    </>
  )
} 