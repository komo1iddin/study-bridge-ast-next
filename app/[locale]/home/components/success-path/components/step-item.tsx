'use client'

import React, { useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import StepBenefit from './step-benefit'
import { cn } from '@/lib/utils'

const STEP_COLORS = [
  "#2563eb", // Blue
  "#C82220", // Red
  "#16a34a", // Green
  "#003c91", // Dark Blue
  "#1e293b", // Slate
  "#0051df"  // Primary Blue
]

interface StepItemProps {
  step: {
    id: number
    title: string
    description: string
    benefits: string[]
  }
  index: number
  isLast: boolean
  visibleSteps: number[]
  setVisibleSteps: React.Dispatch<React.SetStateAction<number[]>>
}

const StepItem = ({ step, index, isLast, visibleSteps, setVisibleSteps }: StepItemProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  useEffect(() => {
    if (isInView && !visibleSteps.includes(step.id)) {
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, step.id])
      }, 50)
    }
  }, [isInView, step.id, visibleSteps, setVisibleSteps])

  const stepColor = STEP_COLORS[index % STEP_COLORS.length]
  const isVisible = visibleSteps.includes(step.id)

  return (
    <div 
      ref={ref}
      className="relative"
      data-step-id={step.id}
    >
      <div 
        className={cn(
          "flex items-start gap-6 md:gap-8 mb-8 md:mb-12 transition-all duration-400",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        )}
        style={{
          transitionDelay: `${index * 80}ms`,
          willChange: "opacity, transform"
        }}
      >
        {/* Step Number and Line */}
        <div className="hidden md:flex flex-col items-center">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
            style={{ backgroundColor: stepColor }}
          >
            {step.id}
          </div>
          {!isLast && (
            <div className="w-0.5 h-24 md:h-32 bg-gray-200"></div>
          )}
        </div>

        {/* Step Content */}
        <div className="flex-1">
          <div 
            className="bg-white rounded-xl p-5 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ 
              borderLeftColor: stepColor, 
              borderLeftWidth: '4px'
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: stepColor }}>
                {step.id}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4 mt-5 md:mt-6">
              {step.benefits.map((benefit, i) => (
                <StepBenefit 
                  key={i}
                  benefit={benefit}
                  stepColor={stepColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepItem 