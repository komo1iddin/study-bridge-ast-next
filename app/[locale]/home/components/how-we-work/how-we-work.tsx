"use client"

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { UserRound, Files, Languages, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

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

export default function HowWeWork({ className }: HowWeWorkProps) {
  const t = useTranslations('pages.home')
  const [features, setFeatures] = useState<any[]>([])
  const [isTitleVisible, setIsTitleVisible] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const [isLineVisible, setIsLineVisible] = useState(false)
  
  const titleRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  
  // This would be replaced with actual API fetch in a real implementation
  // For now, we'll use a simulated empty result and fall back to hardcoded steps
  useEffect(() => {
    // This is where we would fetch features from API
    // For now, we're simulating an empty result
    setFeatures([])
  }, [])
  
  // Set up observers for scroll animations
  useEffect(() => {
    // Options for the IntersectionObserver
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px'
    }
    
    // Observer for the title section
    const titleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true)
          titleObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)
    
    // Observer for the progress line
    const lineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsLineVisible(true)
          }, 400) // Delay line animation to appear after steps start animating
          lineObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    
    // Initialize observers
    if (titleRef.current) {
      titleObserver.observe(titleRef.current)
    }
    
    if (progressLineRef.current) {
      lineObserver.observe(progressLineRef.current)
    }
    
    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current)
      if (progressLineRef.current) lineObserver.unobserve(progressLineRef.current)
    }
  }, [])
  
  // Function to handle step visibility
  const handleStepVisible = (stepIndex: number) => {
    if (!visibleSteps.includes(stepIndex)) {
      setVisibleSteps(prev => [...prev, stepIndex])
    }
  }
  
  // Step component with Intersection Observer
  const Step = ({ index, Icon }: { index: number, Icon: React.ComponentType<any> }) => {
    const stepRef = useRef<HTMLDivElement>(null)
    const [isNumberVisible, setIsNumberVisible] = useState(false)
    
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            handleStepVisible(index)
            setTimeout(() => {
              setIsNumberVisible(true)
            }, 300)
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.3 })
      
      if (stepRef.current) {
        observer.observe(stepRef.current)
      }
      
      return () => {
        if (stepRef.current) observer.unobserve(stepRef.current)
      }
    }, [])
    
    const isVisible = visibleSteps.includes(index)
    const step = index + 1
    
    return (
      <div 
        ref={stepRef}
        className={`group relative bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl 
                   transition-all duration-300 border border-gray-100 hover:border-blue-200 
                   z-10 w-full md:flex-1 md:min-w-[calc(25%-24px)]
                   transform transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ 
          transitionDelay: `${index * 100}ms`,
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div 
          className={`absolute -top-4 -left-4 transition-all duration-300 transform
                     ${isNumberVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          style={{ transitionDelay: `${200 + index * 100}ms` }}
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
            {t(`howWeWork.steps.step${step}.title`)}
          </h3>
          
          <p className="text-sm md:text-base text-gray-600 leading-snug">
            {t(`howWeWork.steps.step${step}.description`)}
          </p>
        </div>
      </div>
    )
  }

  return (
    <section className={cn("w-full py-10 md:py-16 lg:py-20", className)}>
      <div className="container px-4 md:px-6">
        {/* Section Title */}
        <div 
          ref={titleRef}
          className={`flex flex-col items-center justify-center space-y-4 text-center mb-10
                     transition-opacity duration-500 ${isTitleVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="space-y-2">
            <h2 
              className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl
                         transform transition-all duration-500`}
              style={{ 
                transform: isTitleVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                transitionDelay: '100ms' 
              }}
            >
              {t('howWeWork.title')}
            </h2>
            
            <p 
              className={`max-w-[900px] text-muted-foreground md:text-xl/relaxed 
                        lg:text-base/relaxed xl:text-xl/relaxed
                        transition-all duration-500 transform`}
              style={{ 
                opacity: isTitleVisible ? 1 : 0,
                transform: isTitleVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '200ms' 
              }}
            >
              {t('howWeWork.subtitle')}
            </p>
          </div>
        </div>
        
        {/* Steps */}
        <div 
          ref={progressLineRef}
          className={`flex flex-col md:flex-row flex-wrap gap-8 relative w-full mx-auto
                     transition-opacity duration-500 ${visibleSteps.length > 0 ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Progress Line - Desktop */}
          <div 
            className={`hidden md:block absolute top-[45%] left-0 right-0 h-0.5 bg-gray-200 z-0
                       transition-transform duration-1000 origin-left
                       ${isLineVisible ? 'scale-x-100' : 'scale-x-0'}`}
          />
          
          {/* Progress Line - Mobile */}
          <div 
            className={`md:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 z-0
                       transition-transform duration-1000 origin-top
                       ${isLineVisible ? 'scale-y-100' : 'scale-y-0'}`}
          />
          
          {features.length > 0 ? (
            features.map((feature, index) => {
              const Icon = stepsWithIcons[index % stepsWithIcons.length].icon
              return <Step key={index} index={index} Icon={Icon} />
            })
          ) : (
            // Fallback to static translations
            [0, 1, 2, 3].map((index) => {
              const Icon = stepsWithIcons[index].icon
              return <Step key={index} index={index} Icon={Icon} />
            })
          )}
        </div>
      </div>
    </section>
  )
} 