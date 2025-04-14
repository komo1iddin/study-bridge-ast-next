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
    <section className={cn("w-full py-12 md:py-24 lg:py-32", className)}>
      <div className="container px-4 md:px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('missionStats.title')}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('missionStats.subtitle')}
            </p>
          </div>
        </div>
        
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

        {/* Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="relative group h-full"
              style={{
                transform: 'translateZ(0)', // Force GPU acceleration
                willChange: 'transform, opacity',
                transitionDelay: `${index * 50}ms` // Use CSS instead of data-aos
              }}
            >
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 blur transition-all duration-300",
                !isMobile && "group-hover:opacity-100"
              )}></div>
              <div className={cn(
                "relative bg-white rounded-2xl p-8 shadow-md border border-blue-100 transition-all duration-300 h-full flex flex-col",
                !isMobile && "hover:border-blue-200 group-hover:translate-y-[-2px] group-hover:shadow-xl"
              )}>
                <div className={cn(
                  "text-blue-600 mb-4 transition-transform duration-300",
                  !isMobile && "group-hover:scale-110"
                )}>
                  <advantage.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t(`missionStats.advantages.${advantage.translationKey}.title`)}
                </h3>
                <p className="text-gray-600 flex-grow mt-auto">
                  {t(`missionStats.advantages.${advantage.translationKey}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 