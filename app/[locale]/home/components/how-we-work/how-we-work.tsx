"use client"

import React from 'react'
import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { useTranslations } from 'next-intl'
import { UserRound, Files, Languages, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/ui/section-header'

// Define interface for component props
interface HowWeWorkProps {
  className?: string
}

// Steps with their icons - we can later fetch this from an API if needed
const stepsWithIcons = [
  { icon: UserRound },
  { icon: Files },
  { icon: Languages },
  { icon: Send }
]

// Memoized Step component to prevent unnecessary re-renders
const Step = memo(({ index, Icon, isVisible, setStepVisible }: { 
  index: number, 
  Icon: React.ComponentType<any>, 
  isVisible: boolean,
  setStepVisible: (index: number) => void 
}) => {
  const stepRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('pages.home.howWeWork.steps')
  const [isNumberVisible, setIsNumberVisible] = useState(false)
  const step = index + 1
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setStepVisible(index)
            
            // Small delay for number
            setTimeout(() => {
              setIsNumberVisible(true)
            }, 200)
            
            observer.unobserve(entry.target)
          }
        })
      }, 
      { threshold: 0.2, rootMargin: '0px 0px 50px 0px' }
    )
    
    if (stepRef.current) {
      observer.observe(stepRef.current)
    }
    
    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current)
      }
    }
  }, [index, setStepVisible])
  
  return (
    <div 
      ref={stepRef}
      className={`group relative bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl 
                 transition-all duration-300 border border-gray-100 hover:border-blue-200 
                 z-10 w-full md:flex-1 md:min-w-[calc(25%-24px)]
                 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ 
        transitionDelay: `${Math.min(index * 80, 240)}ms`, // Limit maximum delay
        transitionDuration: '400ms',
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div 
        className={`absolute -top-4 -left-4 transition-all duration-300 transform
                   ${isNumberVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        style={{ transitionDelay: `${Math.min(150 + index * 80, 400)}ms` }}
      >
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
          {step}
        </div>
      </div>
      
      <div className="flex flex-col items-center text-center pt-4">
        <div 
          className="p-3 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-500 transition-colors duration-300"
        >
          <Icon 
            className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300"
          />
        </div>
        
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
          {t(`step${step}.title`)}
        </h3>
        
        <p className="text-sm md:text-base text-gray-600 leading-snug">
          {t(`step${step}.description`)}
        </p>
      </div>
    </div>
  )
})

// Set component display name for debugging
Step.displayName = 'Step'

export default function HowWeWork({ className }: HowWeWorkProps) {
  const t = useTranslations('pages.home')
  const [features] = useState<any[]>([]) // Start with empty
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [isLineVisible, setIsLineVisible] = useState(false)
  const [isInView, setIsInView] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  
  // Check if section is in viewport - with proper cleanup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px 200px 0px' }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])
  
  // Set up observer for progress line animation only when section is in view
  useEffect(() => {
    if (!isInView || !progressLineRef.current) return
    
    // Delay animation for smoother appearance
    const timer = setTimeout(() => {
      setIsLineVisible(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [isInView])
  
  // Memoized handler for step visibility
  const handleStepVisible = useCallback((stepIndex: number) => {
    setVisibleSteps(prev => {
      if (prev.includes(stepIndex)) return prev
      return [...prev, stepIndex]
    })
  }, [])

  return (
    <section 
      ref={sectionRef}
      className={cn("w-full py-10 md:py-16 lg:py-20", className)}
    >
      {isInView ? (
        <div className="container px-4 md:px-6">
          {/* Section Title */}
          <SectionHeader
            title={t('howWeWork.title')}
            subtitle={t('howWeWork.subtitle')}
            alignment="center"
          />
          
          {/* Steps */}
          <div 
            ref={progressLineRef}
            className={`flex flex-col md:flex-row flex-wrap gap-8 relative w-full mx-auto
                       transition-opacity duration-500 ${visibleSteps.length > 0 ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Progress Line - Desktop */}
            <div 
              className={`hidden md:block absolute top-[45%] left-0 right-0 h-0.5 bg-gray-200 z-0
                         transition-transform duration-1000 ease-out origin-left
                         ${isLineVisible ? 'scale-x-100' : 'scale-x-0'}`}
            />
            
            {/* Progress Line - Mobile */}
            <div 
              className={`md:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 z-0
                         transition-transform duration-1000 ease-out origin-top
                         ${isLineVisible ? 'scale-y-100' : 'scale-y-0'}`}
            />
            
            {features.length > 0 ? (
              features.map((feature, index) => {
                const Icon = stepsWithIcons[index % stepsWithIcons.length].icon
                return (
                  <Step 
                    key={index} 
                    index={index} 
                    Icon={Icon} 
                    isVisible={visibleSteps.includes(index)}
                    setStepVisible={handleStepVisible}
                  />
                )
              })
            ) : (
              // Fallback to static translations
              [0, 1, 2, 3].map((index) => {
                const Icon = stepsWithIcons[index].icon
                return (
                  <Step 
                    key={index} 
                    index={index} 
                    Icon={Icon} 
                    isVisible={visibleSteps.includes(index)}
                    setStepVisible={handleStepVisible}
                  />
                )
              })
            )}
          </div>
        </div>
      ) : (
        // Placeholder for the section when it's not yet in view
        <div className="container px-4 md:px-6">
          <div className="h-[200px] md:h-[300px]"></div>
        </div>
      )}
    </section>
  )
} 