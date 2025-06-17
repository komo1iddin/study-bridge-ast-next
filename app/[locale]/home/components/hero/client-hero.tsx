'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { LazyMotion, domAnimation, m, MotionConfig } from 'framer-motion'
import { useTranslations } from 'next-intl'
import TypingBadge from './typing-badge'
import { StatItem } from './stat-item'
import { cn } from '@/lib/utils'
import { Building2, Users, Clock, BookOpen } from 'lucide-react'

// Dynamically import heavier components
const TestimonialCards = dynamic(() => import('./testimonial-cards'), {
  ssr: false,
  loading: () => <div className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[600px] bg-gray-50/50 animate-pulse rounded-lg"></div>
})

const HeroButtons = dynamic(() => import('./hero-buttons'))
const ApplicationForm = dynamic(() => import('./application-form'))

// Define the type for rich text elements
type RichTextElements = {
  highlight: (chunks: React.ReactNode) => React.ReactElement;
  underline: (chunks: React.ReactNode) => React.ReactElement;
  br: () => React.ReactElement;
}

// Optimized animation variants - reduced complexity
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Reduced stagger time
      delayChildren: 0.03  // Reduced delay
    }
  }
}

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 10 }, // Reduced distance
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 } // Shorter duration
  }
}

const DECORATIVE_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95 }, // Less dramatic scale
  visible: { 
    opacity: 0.8, // Lower opacity for better performance
    scale: 1,
    transition: { duration: 0.4, delay: 0.15 } // Shorter duration
  }
}

export function ClientHeroSection() {
  const t = useTranslations('pages.home.hero')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isAboveFold, setIsAboveFold] = useState(true) // Track if component is above fold

  // Wait for hydration to complete before animations
  useEffect(() => {
    // Set mounted state after a short delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Check if hero section is above fold to optimize rendering
  useEffect(() => {
    const checkVisibility = () => {
      setIsAboveFold(window.scrollY < window.innerHeight)
    }
    
    window.addEventListener('scroll', checkVisibility, { passive: true })
    return () => window.removeEventListener('scroll', checkVisibility)
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
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            perspective: 1000,
            willChange: "transform"
          }}
        >
          <div className="section-container grid grid-cols-1 lg:grid-cols-12 grid-gap lg:gap-8 pt-1 pb-8 md:pt-4 md:pb-12 lg:pt-8 lg:pb-20 relative">
            {/* Left Content */}
            <div className="lg:col-span-7 z-10 flex flex-col items-center lg:items-start">
              <m.div 
                variants={ITEM_VARIANTS} 
                className="w-full flex justify-center lg:justify-start"
              >
                <TypingBadge />
              </m.div>

              <m.h1
                variants={ITEM_VARIANTS}
                className={cn(
                  'h1 mt-4 sm:mt-6 text-center lg:text-left'
                )}
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
                  'body-lg mt-4 sm:mt-6 text-gray-600 max-w-lg text-center lg:text-left mx-auto lg:mx-0'
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
                  'flex flex-wrap justify-center lg:justify-start flex-gap-sm sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12'
                )}
              >
                {statistics.map((stat, index) => (
                  <StatItem
                    key={stat.key}
                    value={t(`stats.${stat.key}.value`)}
                    label={t(`stats.${stat.key}.label`)}
                    delay={0.05 * (index + 1)} // Reduced delay
                  />
                ))}
              </m.div>
            </div>

            {/* Right Side - Scrolling Testimonials - Only render if it's likely to be in viewport */}
            {isAboveFold && (
              <m.div 
                variants={ITEM_VARIANTS}
                className="lg:col-span-5 relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[600px] mt-4 lg:mt-0"
              >
                <TestimonialCards />

                {/* Reduced decorative elements */}
                {isMounted && (
                  <>
                    <m.div 
                      variants={DECORATIVE_VARIANTS}
                      className="absolute top-[10%] right-[10%] w-20 h-20 md:w-32 md:h-32 bg-blue-100/40 rounded-full hidden sm:block"
                    />
                    <m.div 
                      variants={DECORATIVE_VARIANTS}
                      className="absolute bottom-[20%] right-[30%] w-10 h-10 md:w-16 md:h-16 bg-amber-100/30 rounded-full hidden sm:block"
                    />
                  </>
                )}
              </m.div>
            )}
          </div>

          {/* Application Form Dialog - Only loaded when needed */}
          {isFormOpen && (
            <ApplicationForm open={isFormOpen} onOpenChange={setIsFormOpen} />
          )}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  )
} 