'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { 
  StepItem, 
  SectionHeader, 
  Background, 
  CallToAction 
} from './components'

export function SuccessPath() {
  const t = useTranslations('pages.home.successPath')
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  
  // Get steps from translations
  const steps = [
    {
      id: 1,
      title: t('steps.1.title'),
      description: t('steps.1.description'),
      benefits: [
        t('steps.1.benefits.0'),
        t('steps.1.benefits.1'),
        t('steps.1.benefits.2'),
        t('steps.1.benefits.3')
      ]
    },
    {
      id: 2,
      title: t('steps.2.title'),
      description: t('steps.2.description'),
      benefits: [
        t('steps.2.benefits.0'),
        t('steps.2.benefits.1'),
        t('steps.2.benefits.2'),
        t('steps.2.benefits.3')
      ]
    },
    {
      id: 3,
      title: t('steps.3.title'),
      description: t('steps.3.description'),
      benefits: [
        t('steps.3.benefits.0'),
        t('steps.3.benefits.1'),
        t('steps.3.benefits.2'),
        t('steps.3.benefits.3')
      ]
    },
    {
      id: 4,
      title: t('steps.4.title'),
      description: t('steps.4.description'),
      benefits: [
        t('steps.4.benefits.0'),
        t('steps.4.benefits.1'),
        t('steps.4.benefits.2'),
        t('steps.4.benefits.3')
      ]
    },
    {
      id: 5,
      title: t('steps.5.title'),
      description: t('steps.5.description'),
      benefits: [
        t('steps.5.benefits.0'),
        t('steps.5.benefits.1'),
        t('steps.5.benefits.2'),
        t('steps.5.benefits.3')
      ]
    },
    {
      id: 6,
      title: t('steps.6.title'),
      description: t('steps.6.description'),
      benefits: [
        t('steps.6.benefits.0'),
        t('steps.6.benefits.1'),
        t('steps.6.benefits.2'),
        t('steps.6.benefits.3')
      ]
    }
  ]

  return (
    <section className="relative py-10 md:py-16 lg:py-20 overflow-hidden">
      {/* Background decorations */}
      <Background />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeader 
          title={t('title')} 
          subtitle={t('subtitle')} 
        />

        {/* Steps Timeline */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          {steps.map((step, index) => (
            <StepItem 
              key={step.id}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
              visibleSteps={visibleSteps}
              setVisibleSteps={setVisibleSteps}
            />
          ))}
        </div>

        {/* CTA Section */}
        <CallToAction buttonText={t('detailsButtonText')} />
      </div>
    </section>
  )
} 