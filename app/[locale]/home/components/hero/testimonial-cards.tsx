'use client'

import React, { useRef } from 'react'
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
  const isInView = useInView(containerRef, { once: true })
  const t = useTranslations('pages.home.testimonials.testimonialCards')
  
  // Get testimonials from translations
  const testimonials = t.raw('students') as TestimonialData[]
  
  // Make sure we have enough testimonials to create a continuous, smooth scroll without gaps
  const extendedTestimonials = [...testimonials, ...testimonials]
  
  // Create two equal columns of cards
  const leftColumnCards = extendedTestimonials.filter((_, idx) => idx % 2 === 0)
  const rightColumnCards = extendedTestimonials.filter((_, idx) => idx % 2 === 1)

  return (
    <div
      ref={containerRef}
      className={cn('relative h-full w-full overflow-hidden', isInView ? 'opacity-100' : 'opacity-0')}
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        transition: "opacity 0.5s ease-in-out"
      }}
    >
      <style jsx global>{`
        @keyframes scrollDown1 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-900px); }
        }
        
        @keyframes scrollDown2 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-500px); }
        }
        
        @keyframes scrollDown3 {
          0% { transform: translateY(-250px); }
          100% { transform: translateY(-750px); }
        }
        
        .scroll-animation-mobile {
          animation: scrollDown1 35s linear infinite;
          will-change: transform;
        }
        
        .scroll-animation-left {
          animation: scrollDown2 30s linear infinite;
          will-change: transform;
        }
        
        .scroll-animation-right {
          animation: scrollDown3 30s linear infinite;
          will-change: transform;
        }
      `}</style>
      
      {/* Mobile view - single column scrolling */}
      <div 
        className={cn(
          'sm:hidden absolute left-0 w-full h-full overflow-hidden'
        )}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 5%, black 15%, black 85%, rgba(0, 0, 0, 0.8) 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 5%, black 15%, black 85%, rgba(0, 0, 0, 0.8) 95%, transparent 100%)'
        }}
      >
        <div
          className="px-2 scroll-animation-mobile"
          style={{
            willChange: "transform",
            transform: "translateZ(0)"
          }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={`mobile-${testimonial.id}-${index}`} 
              testimonial={testimonial} 
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Left column container with padding - desktop only */}
      <div 
        className={cn(
          'hidden sm:block absolute left-0 w-[calc(50%+1rem)] pr-6 h-full overflow-hidden'
        )}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 5%, black 15%, black 85%, rgba(0, 0, 0, 0.8) 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 5%, black 15%, black 85%, rgba(0, 0, 0, 0.8) 95%, transparent 100%)'
        }}
      >
        {/* Scrolling content */}
        <div
          className="pr-2 scroll-animation-left"
          style={{
            willChange: "transform",
            transform: "translateZ(0)"
          }}
        >
          {leftColumnCards.map((testimonial, index) => (
            <TestimonialCard 
              key={`${testimonial.id}-${index}`} 
              testimonial={testimonial} 
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Right column container with padding - desktop only */}
      <div 
        className={cn(
          'hidden sm:block absolute right-0 w-[calc(50%+1rem)] pl-6 h-full overflow-hidden'
        )}
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 5%, black 15%, black 85%, rgba(0, 0, 0, 0.8) 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 5%, black 15%, black 85%, rgba(0, 0, 0, 0.8) 95%, transparent 100%)'
        }}
      >
        {/* Scrolling content */}
        <div
          className="pl-2 scroll-animation-right"
          style={{
            willChange: "transform",
            transform: "translateZ(0)"
          }}
        >
          {rightColumnCards.map((testimonial, index) => (
            <TestimonialCard 
              key={`${testimonial.id}-${index}`} 
              testimonial={testimonial}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  testimonial: TestimonialData
  isInView: boolean
}

const TestimonialCard = ({ testimonial, isInView }: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm mb-4 p-3 sm:p-4 border border-gray-100',
        isInView ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-300'
      )}
      style={{
        transform: "translateZ(0)"
      }}
    >
      <div className={cn('flex items-center gap-2 sm:gap-3 mb-2')}>
        <Image
          src={testimonial.imageUrl}
          alt={testimonial.name}
          width={40}
          height={40}
          className={cn(
            'w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white shadow-sm'
          )}
        />
        <div>
          <h3 className={cn('font-semibold text-gray-800 text-xs sm:text-sm')}>
            {testimonial.name}
          </h3>
          <p className={cn('text-blue-600 text-xs')}>{testimonial.university}</p>
        </div>
      </div>
      <p className={cn('text-gray-600 text-xs sm:text-sm')}>{testimonial.comment}</p>
    </div>
  )
}

export default TestimonialCards 