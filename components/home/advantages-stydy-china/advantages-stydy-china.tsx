'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { GraduationCap, Brain, DollarSign, Globe, Rocket, BookOpen } from 'lucide-react'
import { BackgroundElements } from './background-elements'
import { CTA } from '@/components/shared'

// Define icons to use for each reason
const icons = [
  GraduationCap,
  Brain,
  DollarSign,
  Globe,
  Rocket,
  BookOpen
]

// Define colors for each reason
const colors = [
  "blue",
  "purple",
  "green",
  "orange",
  "red",
  "indigo"
]

interface ReasonProps {
  title: string
  description: string
  icon: React.ElementType
  color: string
  index: number
}

const Reason = ({ title, description, icon: Icon, color, index }: ReasonProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const reasonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768)
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    )

    if (reasonRef.current) {
      observer.observe(reasonRef.current)
    }

    return () => {
      if (reasonRef.current) {
        observer.unobserve(reasonRef.current)
      }
    }
  }, [])

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' }
    }
    return colorMap[color] || colorMap.blue
  }

  const { bg, text } = getColorClasses(color)

  return (
    <div
      ref={reasonRef}
      className={`flex-1 min-w-[calc(100%-2rem)] md:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1.75rem)]
                shadow-md ${!isMobile ? 'hover:shadow-xl hover:border-blue-200' : ''} rounded-xl border border-blue-100
                bg-white p-6 transition-all duration-300
                transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ 
        transitionDelay: `${index * 100}ms`,
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className={`w-14 h-14 rounded-lg ${bg} flex items-center justify-center mb-6`}>
        <Icon className={`w-7 h-7 ${text}`} />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  )
}

export function AdvantagesStudyChina({ lang }: { lang: string }) {
  const t = useTranslations('pages.home.components.advantagesStudyChina')
  const [reasons, setReasons] = useState<any[]>([])
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const [isBadgeVisible, setIsBadgeVisible] = useState(false)
  const [isCTAVisible, setIsCTAVisible] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Map the icons, colors, and translations together
    const reasonsData = []
    for (let i = 1; i <= 6; i++) {
      reasonsData.push({
        title: t(`reasons.${i}.title`),
        description: t(`reasons.${i}.description`),
        icon: icons[(i - 1) % icons.length],
        color: colors[(i - 1) % colors.length]
      })
    }
    setReasons(reasonsData)
  }, [t])

  useEffect(() => {
    // Set up observers for scroll animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    }

    const createObserver = (
      ref: React.RefObject<HTMLDivElement>, 
      setVisibility: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibility(true)
            observer.unobserve(entry.target)
          }
        })
      }, observerOptions)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return observer
    }

    const badgeObserver = createObserver(badgeRef as React.RefObject<HTMLDivElement>, setIsBadgeVisible)
    const titleObserver = createObserver(titleRef as React.RefObject<HTMLDivElement>, setIsTitleVisible)
    const ctaObserver = createObserver(ctaRef as React.RefObject<HTMLDivElement>, setIsCTAVisible)

    return () => {
      if (badgeRef.current) badgeObserver.unobserve(badgeRef.current)
      if (titleRef.current) titleObserver.unobserve(titleRef.current)
      if (ctaRef.current) ctaObserver.unobserve(ctaRef.current)
    }
  }, [])

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <BackgroundElements />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Badge */}
        <div 
          ref={badgeRef}
          className="flex justify-center mb-4"
        >
          <div 
            className={`bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold
                      transform transition-all duration-300 ${isBadgeVisible ? 'translate-y-0 opacity-100' : 'translate-y-(-10px) opacity-0'}`}
          >
            {t('badge')}
          </div>
        </div>
        
        {/* Section Title */}
        <div 
          ref={titleRef}
          className={`text-center mb-12 transition-opacity duration-500 ${isTitleVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 transition-transform duration-500 transform"
            style={{ 
              transform: isTitleVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '100ms' 
            }}
          >
            {t('title.main')} <span className="text-blue-600">{t('title.highlight')}</span>
          </h2>
          <p 
            className="text-lg text-gray-600 max-w-3xl mx-auto transition-transform duration-500 transform"
            style={{ 
              transform: isTitleVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '200ms' 
            }}
          >
            {t('subtitle')}
          </p>
        </div>
        
        {/* Reasons Flex Container */}
        <div className="flex flex-wrap gap-8 mb-12">
          {reasons.map((reason, index) => (
            <Reason
              key={index}
              title={reason.title}
              description={reason.description}
              icon={reason.icon}
              color={reason.color}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`transition-all duration-500 transform ${isCTAVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <CTA 
            lang={lang} 
          />
        </div>
      </div>
    </section>
  )
} 