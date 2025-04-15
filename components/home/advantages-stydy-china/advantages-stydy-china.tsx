'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { GraduationCap, Brain, DollarSign, Globe, Rocket, BookOpen } from 'lucide-react'
import { BackgroundElements } from './background-elements'
import { CTA } from '@/components/shared'
import { cn } from '@/lib/utils'

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

// Cache color classes to avoid recalculation
const colorClassMap: Record<string, { bg: string, text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' }
}

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
  const [isHovered, setIsHovered] = useState(false)
  const reasonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768)
    checkIfMobile()
    
    // Add resize listener with throttle
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkIfMobile, 100);
    };
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
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
        threshold: 0.2,
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

  const { bg, text } = colorClassMap[color] || colorClassMap.blue

  return (
    <div
      ref={reasonRef}
      className={cn(
        "flex-1 min-w-[calc(100%-2rem)] md:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1.75rem)]",
        "shadow-md rounded-xl border border-blue-100 bg-white p-6",
        !isMobile && "hover-card"
      )}
      style={{ 
        transform: `translateZ(0) ${isVisible ? 'translateY(0)' : 'translateY(10px)'}`,
        opacity: isVisible ? 1 : 0,
        transitionProperty: 'transform, opacity',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-out',
        transitionDelay: `${index * 100}ms`,
        backfaceVisibility: 'hidden',
      }}
      onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
      onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
    >
      <div 
        className={cn(
          "w-14 h-14 rounded-lg flex items-center justify-center mb-6",
          bg
        )}
      >
        <Icon className={`w-7 h-7 ${text}`} />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600">
        {description}
      </p>
      
      {/* Performance optimized hover effect overlay */}
      {!isMobile && (
        <div 
          className={cn(
            "absolute inset-0 rounded-xl pointer-events-none",
            "transition-opacity duration-200",
            "border border-blue-200 shadow-xl",
            "opacity-0",
            isHovered && "opacity-100"
          )}
          aria-hidden="true"
          style={{ transform: 'translateZ(0)' }}
        />
      )}
    </div>
  )
}

export function AdvantagesStudyChina({ lang }: { lang: string }) {
  const t = useTranslations('pages.home.components.advantagesStudyChina')
  const [reasons, setReasons] = useState<any[]>([])
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const [isBadgeVisible, setIsBadgeVisible] = useState(false)
  const [isCTAVisible, setIsCTAVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
    // Single observer for all animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        const target = entry.target;
        
        if (target.id === 'advantages-badge') {
          setIsBadgeVisible(true);
        } else if (target.id === 'advantages-title') {
          setIsTitleVisible(true);
        } else if (target.id === 'advantages-cta') {
          setIsCTAVisible(true);
        }
        
        observer.unobserve(target);
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px'
    });

    // Observer elements
    if (sectionRef.current) {
      const badgeElement = sectionRef.current.querySelector('#advantages-badge');
      const titleElement = sectionRef.current.querySelector('#advantages-title');
      const ctaElement = sectionRef.current.querySelector('#advantages-cta');
      
      if (badgeElement) observer.observe(badgeElement);
      if (titleElement) observer.observe(titleElement);
      if (ctaElement) observer.observe(ctaElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16 lg:py-20 overflow-hidden">
      <style jsx global>{`
        .hover-card {
          position: relative;
          isolation: isolate;
          will-change: transform;
        }
        .hover-card:hover {
          transform: translateZ(0) scale(1.01);
          transition: transform 200ms ease-out;
        }
      `}</style>
      
      <BackgroundElements />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Badge */}
        <div 
          id="advantages-badge"
          className="flex justify-center mb-4"
        >
          <div 
            className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold transform"
            style={{
              opacity: isBadgeVisible ? 1 : 0,
              transition: 'opacity 300ms ease-out, transform 300ms ease-out',
              transform: isBadgeVisible ? 'translateZ(0) translateY(0)' : 'translateZ(0) translateY(-10px)'
            }}
          >
            {t('badge')}
          </div>
        </div>
        
        {/* Section Title */}
        <div 
          id="advantages-title"
          className="text-center mb-12"
          style={{
            opacity: isTitleVisible ? 1 : 0,
            transition: 'opacity 500ms ease-out'
          }}
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ 
              transform: isTitleVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 500ms ease-out',
              transitionDelay: '100ms' 
            }}
          >
            {t('title.main')} <span className="text-blue-600">{t('title.highlight')}</span>
          </h2>
          <p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            style={{ 
              transform: isTitleVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 500ms ease-out',
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
          id="advantages-cta"
          style={{
            opacity: isCTAVisible ? 1 : 0,
            transform: isCTAVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 500ms ease-out, transform 500ms ease-out',
          }}
        >
          <CTA 
            lang={lang} 
          />
        </div>
      </div>
    </section>
  )
} 