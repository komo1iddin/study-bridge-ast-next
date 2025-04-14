"use client"

import React from 'react'
import { useState, useEffect } from 'react'
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

  // This would be replaced with actual API fetch in a real implementation
  // For now, we'll use a simulated empty result and fall back to hardcoded steps
  useEffect(() => {
    // This is where we would fetch features from API
    // For now, we're simulating an empty result
    setFeatures([])
  }, [])

  return (
    <section className={cn("w-full py-12 md:py-24 lg:py-32", className)}>
      <div className="container px-4 md:px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('howWeWork.title')}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('howWeWork.subtitle')}
            </p>
          </div>
        </div>
        
        {/* Steps */}
        <div className="flex flex-col md:flex-row flex-wrap gap-8 relative max-w-sm md:max-w-none mx-auto">
          {/* Progress Line - Desktop */}
          <div className="hidden md:block absolute top-[45%] left-0 right-0 h-0.5 bg-gray-200 z-0" />
          
          {/* Progress Line - Mobile */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 z-0" />
          
          {features.length > 0 ? (
            features.map((feature, index) => {
              const Icon = stepsWithIcons[index % stepsWithIcons.length].icon
              
              return (
                <div key={index} className="group relative bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 z-10 flex-1 min-w-[calc(25%-24px)]">
                  <div className="absolute -top-4 -left-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center text-center pt-4">
                    <div className="p-3 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-500 transition-colors duration-300">
                      <Icon 
                        className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <>
              {/* Fallback to static translations */}
              {[1, 2, 3, 4].map((step, index) => {
                const Icon = stepsWithIcons[index].icon
                
                return (
                  <div key={index} className="group relative bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 z-10 flex-1 min-w-[calc(25%-24px)]">
                    <div className="absolute -top-4 -left-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">{step}</div>
                    </div>
                    <div className="flex flex-col items-center text-center pt-4">
                      <div className="p-3 bg-blue-100 rounded-full mb-3 group-hover:bg-blue-500 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" />
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
              })}
            </>
          )}
        </div>
      </div>
    </section>
  )
} 