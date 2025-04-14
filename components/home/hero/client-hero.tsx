'use client'

import React, { useState, useEffect } from 'react'
import { LazyMotion, domAnimation, m, MotionConfig } from 'framer-motion'
import { useTranslations } from 'next-intl'
import TypingBadge from './typing-badge'
import TestimonialCards from './testimonial-cards'
import HeroButtons from './hero-buttons'
import ApplicationForm from './application-form'
import { StatItem } from './stat-item'
import { cn } from '@/lib/utils'
import { Building2, Users, Clock, BookOpen } from 'lucide-react'

// Define the type for rich text elements
type RichTextElements = {
  highlight: (chunks: React.ReactNode) => JSX.Element;
  underline: (chunks: React.ReactNode) => JSX.Element;
  br: () => JSX.Element;
}

// Animation variants
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

const DECORATIVE_VARIANTS = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, delay: 0.3 }
  }
}

export function ClientHeroSection() {
  const t = useTranslations('pages.home.hero')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Wait for hydration to complete before animations
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Statistics data
  const statistics = [
    { key: 'universities', icon: Building2 },
    { key: 'students', icon: Users },
    { key: 'experience', icon: Clock },
    { key: 'programs', icon: BookOpen }
  ]

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <m.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          className="relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 pt-1 pb-8 md:pt-4 md:pb-12 lg:pt-8 lg:pb-20 relative px-4 md:px-6 lg:px-0">
            {/* Left Content */}
            <div className="lg:col-span-7 z-10 flex flex-col items-center lg:items-start">
              <m.div variants={ITEM_VARIANTS} className="w-full flex justify-center lg:justify-start">
                <TypingBadge />
              </m.div>

              <m.h1
                variants={ITEM_VARIANTS}
                className={cn(
                  'text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 sm:mt-6 leading-tight text-center lg:text-left'
                )}
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {t.rich('title', {
                  highlight: (chunks) => <span className="text-blue-600">{chunks}</span>,
                  underline: (chunks) => (
                    <span className="relative">
                      {chunks}
                      <span className="absolute bottom-2 left-0 w-full h-2 bg-amber-300/40 -z-10"></span>
                    </span>
                  ),
                  br: () => <br />
                })}
              </m.h1>

              <m.p
                variants={ITEM_VARIANTS}
                className={cn(
                  'mt-4 sm:mt-6 text-gray-600 text-sm sm:text-lg leading-relaxed max-w-lg text-center lg:text-left mx-auto lg:mx-0'
                )}
              >
                {t('subtitle')}
              </m.p>

              <m.div variants={ITEM_VARIANTS}>
                <HeroButtons 
                  onOpenForm={() => setIsFormOpen(true)} 
                  leaveRequestText={t('leaveRequest')}
                  viewUniversitiesText={t('viewUniversities')}
                />
              </m.div>

              <m.div
                variants={ITEM_VARIANTS}
                className={cn(
                  'flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12'
                )}
              >
                {statistics.map((stat, index) => (
                  <StatItem
                    key={stat.key}
                    value={t(`stats.${stat.key}.value`)}
                    label={t(`stats.${stat.key}.label`)}
                    delay={0.1 * (index + 1)}
                  />
                ))}
              </m.div>
            </div>

            {/* Right Side - Scrolling Testimonials */}
            <m.div 
              variants={ITEM_VARIANTS}
              className="lg:col-span-5 relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[600px] mt-4 lg:mt-0"
              style={{ willChange: "transform" }} // Add will-change for GPU acceleration
            >
              <TestimonialCards />

              {/* Decorative elements */}
              <m.div 
                variants={DECORATIVE_VARIANTS}
                className="absolute top-[10%] right-[10%] w-20 h-20 md:w-32 md:h-32 bg-blue-100/50 rounded-full hidden sm:block"
              />
              <m.div 
                variants={DECORATIVE_VARIANTS}
                className="absolute bottom-[20%] right-[30%] w-10 h-10 md:w-16 md:h-16 bg-amber-100/40 rounded-full hidden sm:block"
              />
            </m.div>
          </div>

          {/* Application Form Dialog */}
          <ApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
        </m.div>
      </MotionConfig>
    </LazyMotion>
  )
} 