'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

type TestimonialData = {
  id: number
  name: string
  university: string
  comment: string
  imageUrl: string
}

const TestimonialCards = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const t = useTranslations('pages.home.testimonials.testimonialCards')
  const [isClient, setIsClient] = useState(false)
  
  // Run animations only after hydration to prevent layout shifts
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Get testimonials from translations
  const testimonials = t.raw('students') as TestimonialData[]
  
  // Use fewer duplicates for better performance
  const duplicateCount = 2
  
  // Create columns with fewer duplicate cards
  const leftColumnCards = [...testimonials]
    .filter((_, idx) => idx % 2 === 0)
    .slice(0, Math.min(4, testimonials.length)) // Limit to 4 for performance
    .flatMap(card => Array(duplicateCount).fill(card))
  
  const rightColumnCards = [...testimonials]
    .filter((_, idx) => idx % 2 === 1)
    .slice(0, Math.min(4, testimonials.length)) // Limit to 4 for performance
    .flatMap(card => Array(duplicateCount).fill(card))

  // Only use what's needed for mobile view
  const mobileCards = testimonials
    .slice(0, Math.min(6, testimonials.length)) // Limit to 6 for mobile
    .flatMap(card => Array(duplicateCount).fill(card))

  // Helper to reduce duplicated styles
  const maskGradient = {
    maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 5%, black 15%, black 85%, rgba(0, 0, 0, 0.8) 95%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 5%, black 15%, black 85%, rgba(0, 0, 0, 0.8) 95%, transparent 100%)'
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-full w-full overflow-hidden', 
        isInView && isClient ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        transition: "opacity 0.5s ease-in-out"
      }}
    >
      {isClient && (
        <style jsx global>{`
          /* Optimized animations with reduced complexity */
          @media (max-width: 640px) {
            @keyframes scrollDown1 {
              0% { transform: translateY(0); }
              100% { transform: translateY(-${mobileCards.length * 70}px); }
            }
            
            .scroll-animation-mobile {
              animation: scrollDown1 40s linear infinite;
              animation-play-state: running;
            }
          }
          
          @media (min-width: 641px) {
            @keyframes scrollDown2 {
              0% { transform: translateY(0); }
              100% { transform: translateY(-${leftColumnCards.length * 80}px); }
            }
            
            @keyframes scrollDown3 {
              0% { transform: translateY(-${rightColumnCards.length * 40}px); }
              100% { transform: translateY(-${rightColumnCards.length * 80}px); }
            }
            
            .scroll-animation-left {
              animation: scrollDown2 45s linear infinite;
              animation-play-state: running;
            }
            
            .scroll-animation-right {
              animation: scrollDown3 50s linear infinite;
              animation-play-state: running;
            }
          }
          
          /* Pause animations when offscreen for performance */
          .testimonial-container:not(.in-viewport) .scroll-animation-mobile,
          .testimonial-container:not(.in-viewport) .scroll-animation-left,
          .testimonial-container:not(.in-viewport) .scroll-animation-right {
            animation-play-state: paused;
          }
        `}</style>
      )}
      
      {/* Add a class to control animation pause state */}
      <div className={`testimonial-container ${isInView ? 'in-viewport' : ''}`}>
        {/* Mobile view - single column scrolling */}
        <div 
          className={cn('sm:hidden absolute left-0 w-full h-full overflow-hidden')}
          style={maskGradient}
        >
          <div className="px-2 scroll-animation-mobile">
            {mobileCards.map((testimonial, index) => (
              <TestimonialCard 
                key={`mobile-${testimonial.id}-${index}`} 
                testimonial={testimonial}
                priority={index < 2} // Only prioritize the first couple of cards
              />
            ))}
          </div>
        </div>

        {/* Left column container with padding - desktop only */}
        <div 
          className={cn('hidden sm:block absolute left-0 w-[calc(50%+1rem)] pr-6 h-full overflow-hidden')}
          style={maskGradient}
        >
          {/* Scrolling content */}
          <div className="pr-2 scroll-animation-left">
            {leftColumnCards.map((testimonial, index) => (
              <TestimonialCard 
                key={`left-${testimonial.id}-${index}`} 
                testimonial={testimonial}
                priority={index < 2} // Only prioritize the first couple of cards
              />
            ))}
          </div>
        </div>

        {/* Right column container with padding - desktop only */}
        <div 
          className={cn('hidden sm:block absolute right-0 w-[calc(50%+1rem)] pl-6 h-full overflow-hidden')}
          style={maskGradient}
        >
          {/* Scrolling content */}
          <div className="pl-2 scroll-animation-right">
            {rightColumnCards.map((testimonial, index) => (
              <TestimonialCard 
                key={`right-${testimonial.id}-${index}`} 
                testimonial={testimonial}
                priority={index < 2} // Only prioritize the first couple of cards
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  testimonial: TestimonialData
  priority?: boolean
}

const TestimonialCard = ({ testimonial, priority = false }: TestimonialCardProps) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm mb-4 p-3 sm:p-4 border border-gray-100 transition-opacity duration-300"
    >
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <Image
          src={testimonial.imageUrl}
          alt={testimonial.name}
          width={40}
          height={40}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div>
          <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">
            {testimonial.name}
          </h3>
          <p className="text-blue-600 text-xs">{testimonial.university}</p>
        </div>
      </div>
      <p className="text-gray-600 text-xs sm:text-sm">{testimonial.comment}</p>
    </div>
  )
}

export default TestimonialCards 