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
  const [hasAnimated, setHasAnimated] = useState(false)
  const [countersInitialized, setCountersInitialized] = useState(false)
  
  // Check if mobile device - using throttled resize listener
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    
    // Initial check
    checkIfMobile()
    
    // Throttle resize events for better performance
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkIfMobile, 100)
    }
    
    // Use passive event listener for better performance
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])
  
  useEffect(() => {
    // More performant counter animation implementation
    const initCounters = () => {
      if (countersInitialized) return
      
      const counterElements = statsGridRef.current?.querySelectorAll('.counter-value')
      if (!counterElements) return
      
      setCountersInitialized(true)
      
      counterElements.forEach(element => {
        if (element instanceof HTMLElement) {
          const target = parseInt(element.dataset.target?.replace(/\D/g, '') || '0')
          
          // Reduce animation complexity
          const frames = 12 // Use even fewer frames for better performance
          const duration = 1000 // Faster animation
          const frameStep = Math.ceil(duration / frames)
          const valueStep = target / frames
          
          // Start with reasonable value instead of 0
          let current = Math.floor(target * 0.2)
          element.textContent = current.toLocaleString() + '+'
          
          // Counter loop with frame skipping for performance
          let frameCount = 0
          
          const updateCounter = () => {
            if (frameCount < frames) {
              frameCount++
              current = Math.min(Math.floor(target * 0.2 + (valueStep * frameCount)), target)
              element.textContent = current.toLocaleString() + '+'
              
              // Use requestAnimationFrame with frame skipping for smoother performance
              if (frameCount < frames) {
                setTimeout(() => requestAnimationFrame(updateCounter), frameStep)
              }
            }
          }
          
          // Start animation after a small delay to ensure browser isn't overloaded
          setTimeout(updateCounter, 100)
        }
      })
    }
    
    // Use Intersection Observer with proper options
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            // Delay counter animation until after the grid items have appeared
            const timer = setTimeout(() => {
              initCounters()
            }, 300)
            
            return () => clearTimeout(timer)
          }
        })
      },
      {
        threshold: 0.15, // Lower threshold so it triggers a bit earlier
        rootMargin: '0px 0px 100px 0px' // Preload a bit before it's visible
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
  }, [hasAnimated, countersInitialized])
  
  return (
    <section className={cn("section-spacing", className)}>
      <div className="section-container">
        {/* Section Title */}
        <SectionHeader
          title={t('missionStats.title')}
          subtitle={t('missionStats.subtitle')}
          alignment="center"
        />
        
        {/* Stats Grid - Apply fade-in animation to avoid layout shifts */}
        <div 
          ref={statsGridRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-gap-lg content-block stats-grid",
            hasAnimated ? "opacity-100" : "opacity-0"
          )}
          style={{ 
            transition: "opacity 0.5s ease-out",
            willChange: hasAnimated ? "auto" : "opacity"
          }}
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-2xl card-padding shadow-md border border-blue-100 transition-all duration-300 flex flex-col h-full",
                !isMobile && "hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
              )}
              style={{
                transitionDelay: `${Math.min(index * 50, 200)}ms`, // Cap delay for better performance
                transform: 'translateZ(0)'
              }}
            >
              <div className="flex items-start flex-gap mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex-grow min-h-[60px] flex flex-col">
                  <div 
                    className="h4 text-gray-900 counter-value tabular-nums" 
                    data-target={stat.value}
                  >
                    {/* Start with a reasonable initial value for perceived performance */}
                    {Math.floor(stat.value * 0.2).toLocaleString()}+
                  </div>
                  <div className="body-sm text-gray-500 whitespace-pre-line">
                    {t(`missionStats.stats.${stat.translationKey}.label`)}
                  </div>
                </div>
              </div>
              <p className="body-sm text-gray-600 mt-auto">
                {t(`missionStats.stats.${stat.translationKey}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* Advantages Grid - Conditionally render once near viewport */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-gap">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-xl card-padding shadow-md border border-blue-100 transition-all duration-300 hover:shadow-lg",
                // Add staggered entrance animation
                hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8" 
              )}
              style={{
                transition: "opacity 0.4s ease, transform 0.4s ease",
                transitionDelay: `${Math.min(300 + index * 100, 500)}ms` // Cap maximum delay
              }}
            >
              <div className="flex items-center flex-gap-sm mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <advantage.icon className="w-5 h-5" />
                </div>
                <h3 className="h5 text-gray-900">
                  {t(`missionStats.advantages.${advantage.translationKey}.title`)}
                </h3>
              </div>
              <p className="body text-gray-600">
                {t(`missionStats.advantages.${advantage.translationKey}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 