"use client"

import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { 
  Users, 
  School, 
  GraduationCap, 
  Globe,
  TrendingUp,
  Wallet,
  BookOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/ui/section-header'

interface MissionStatsProps {
  className?: string
}

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768

// Define the stats data
const stats = [
  { 
    value: 2000, 
    translationKey: 'students', 
    icon: Users 
  },
  { 
    value: 20, 
    translationKey: 'universities', 
    icon: School 
  },
  { 
    value: 100, 
    translationKey: 'programs', 
    icon: GraduationCap 
  },
  { 
    value: 8, 
    translationKey: 'countries', 
    icon: Globe 
  }
]

// Define the advantages data
const advantages = [
  {
    translationKey: 'education',
    icon: TrendingUp
  },
  {
    translationKey: 'price',
    icon: Wallet
  },
  {
    translationKey: 'opportunity',
    icon: BookOpen
  }
]

export default function MissionStats({ className }: MissionStatsProps) {
  const t = useTranslations('pages.home')
  const statsGridRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if mobile device
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  useEffect(() => {
    // Animation for counter - optimized for performance
    const initCounters = () => {
      const counterElements = statsGridRef.current?.querySelectorAll('.counter-value')
      
      if (!counterElements) return
      
      counterElements.forEach(element => {
        if (element instanceof HTMLElement) {
          const target = parseInt(element.dataset.target?.replace(/\D/g, '') || '0')
          const duration = 1500 // Slightly longer duration to reduce CPU usage
          const frames = 20 // Reduced number of frames to improve performance
          const frameStep = duration / frames
          const valueStep = target / frames
          let current = 0
          let frame = 0
          
          // Use fewer animation frames for better performance
          const updateCounter = () => {
            frame++
            if (frame <= frames) {
              current = Math.ceil(valueStep * frame)
              element.textContent = Math.min(current, target).toLocaleString() + '+'
              
              // Schedule next frame with less frequent updates
              setTimeout(updateCounter, frameStep)
            } else {
              element.textContent = target.toLocaleString() + '+'
            }
          }
          
          updateCounter()
        }
      })
    }
    
    // Use Intersection Observer to trigger counter animation when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Small delay to help with overall page performance
            setTimeout(() => {
              initCounters()
            }, 100)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2, // Higher threshold to ensure element is more visible
        rootMargin: '0px' // Reduced margin
      }
    )
    
    if (statsGridRef.current) {
      observer.observe(statsGridRef.current)
    }
    
    return () => {
      if (statsGridRef.current) {
        observer.unobserve(statsGridRef.current)
      }
    }
  }, [])
  
  return (
    <section className={cn("w-full py-10 md:py-16 lg:py-20", className)}>
      <div className="container px-4 md:px-6">
        {/* Section Title */}
        <SectionHeader
          title={t('missionStats.title')}
          subtitle={t('missionStats.subtitle')}
          alignment="center"
        />
        
        {/* Stats Grid */}
        <div 
          ref={statsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 stats-grid"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-2xl p-6 shadow-md border border-blue-100 transition-all duration-300 flex flex-col h-full",
                !isMobile && "hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
              )}
              style={{
                transform: 'translateZ(0)', // Force GPU acceleration
                willChange: 'transform',
                transitionDelay: `${index * 50}ms` // Use CSS instead of data-aos
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex-grow min-h-[60px] flex flex-col">
                  <div 
                    className="text-3xl font-bold text-gray-900 counter-value tabular-nums" 
                    data-target={stat.value}
                  >
                    0+
                  </div>
                  <div className="text-sm font-medium text-gray-500 whitespace-pre-line">
                    {t(`missionStats.stats.${stat.translationKey}.label`)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-auto">
                {t(`missionStats.stats.${stat.translationKey}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-blue-100 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <advantage.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t(`missionStats.advantages.${advantage.translationKey}.title`)}
                </h3>
              </div>
              <p className="text-gray-600">
                {t(`missionStats.advantages.${advantage.translationKey}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 