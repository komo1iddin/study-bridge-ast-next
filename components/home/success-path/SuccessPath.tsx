'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Colors for steps
const stepColors = [
  "#2563eb", // Blue
  "#C82220", // Red
  "#16a34a", // Green
  "#003c91", // Dark Blue
  "#1e293b", // Slate
  "#0051df"  // Primary Blue
]

const SuccessPath = () => {
  const t = useTranslations('home.successPath')
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
    <section className="relative bg-gradient-to-b from-white via-blue-50/30 to-white py-12 md:py-20 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 mb-8">{t('subtitle')}</p>
        </div>

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
        <div className="text-center mt-12 md:mt-16">
          <Button 
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Link href="/student-path">{t('detailsButtonText')}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

interface StepItemProps {
  step: {
    id: number
    title: string
    description: string
    benefits: string[]
  }
  index: number
  isLast: boolean
  visibleSteps: number[]
  setVisibleSteps: React.Dispatch<React.SetStateAction<number[]>>
}

const StepItem = ({ step, index, isLast, visibleSteps, setVisibleSteps }: StepItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  
  useEffect(() => {
    if (isInView && !visibleSteps.includes(step.id)) {
      setVisibleSteps(prev => [...prev, step.id])
    }
  }, [isInView, step.id, visibleSteps, setVisibleSteps])

  const stepColor = stepColors[index % stepColors.length]
  const isVisible = visibleSteps.includes(step.id)

  return (
    <div 
      ref={ref}
      className="relative"
      data-step-id={step.id}
    >
      <motion.div 
        className="flex items-start gap-6 md:gap-8 mb-8 md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {/* Step Number and Line */}
        <div className="hidden md:flex flex-col items-center">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
            style={{ backgroundColor: stepColor }}
          >
            {step.id}
          </div>
          {!isLast && (
            <div className="w-0.5 h-24 md:h-32 bg-gray-200"></div>
          )}
        </div>

        {/* Step Content */}
        <div className="flex-1">
          <div 
            className="bg-white rounded-xl p-5 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ borderLeftColor: stepColor, borderLeftWidth: '4px' }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: stepColor }}>
                {step.id}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4 mt-5 md:mt-6">
              {step.benefits.map((benefit, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" style={{ color: stepColor }} />
                  <span className="text-gray-700 text-sm md:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SuccessPath 