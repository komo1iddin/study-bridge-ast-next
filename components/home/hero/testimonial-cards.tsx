'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type TestimonialData = {
  id: number
  name: string
  university: string
  comment: string
  imageUrl: string
}

// TODO: Consider fetching testimonials from an API or CMS
const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: 'Алишер К.',
    university: 'Пекинский Университет',
    comment: 'Лучшее решение в моей жизни! Уже 2 года учусь в Китае.',
    imageUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Малика Н.',
    university: 'Шанхайский Университет',
    comment: 'Получила стипендию благодаря агентству!',
    imageUrl:
      'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Рустам Д.',
    university: 'Университет Фудань',
    comment: 'Теперь работаю в международной компании в Китае!',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Нодира И.',
    university: 'Чжэцзянский Университет',
    comment: 'Прекрасная поддержка от команды на каждом этапе!',
    imageUrl:
      'https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Азиз Т.',
    university: 'Нанкинский Университет',
    comment: 'Уже второй год изучаю медицину в Китае!',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Сабина М.',
    university: 'Тяньцзиньский Университет',
    comment: 'Получила полную стипендию! Очень благодарна!',
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 7,
    name: 'Темур П.',
    university: 'Уханьский Университет',
    comment: 'Изучаю IT и стажируюсь в китайской компании!',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop'
  }
]

// Make sure we have enough testimonials to create a continuous, smooth scroll without gaps
const extendedTestimonials = [...testimonials, ...testimonials]

const TestimonialCards = () => {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })
  
  // Create two equal columns of cards
  const leftColumnCards = extendedTestimonials.filter((_, idx) => idx % 2 === 0)
  const rightColumnCards = extendedTestimonials.filter((_, idx) => idx % 2 === 1)

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn('relative h-full w-full overflow-hidden')}
      style={{
        willChange: "opacity",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden"
      }}
    >
      {/* Mobile view - single column scrolling */}
      <motion.div 
        className={cn(
          'sm:hidden absolute left-0 w-full h-full overflow-hidden'
        )}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        <motion.div
          animate={{ y: [0, -900] }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
          className="px-2"
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
        </motion.div>
      </motion.div>

      {/* Left column container with padding - desktop only */}
      <motion.div 
        className={cn(
          'hidden sm:block absolute left-0 w-[calc(50%+1rem)] pr-6 h-full overflow-hidden'
        )}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        {/* Scrolling content */}
        <motion.div
          animate={{ y: [0, -500] }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
          className="pr-2"
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
        </motion.div>
      </motion.div>

      {/* Right column container with padding - desktop only */}
      <motion.div 
        className={cn(
          'hidden sm:block absolute right-0 w-[calc(50%+1rem)] pl-6 h-full overflow-hidden'
        )}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        {/* Scrolling content */}
        <motion.div
          animate={{ y: [-250, -750] }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
          className="pl-2"
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
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

interface TestimonialCardProps {
  testimonial: TestimonialData
  isInView: boolean
}

const TestimonialCard = ({ testimonial, isInView }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-white rounded-lg shadow-sm mb-4 p-3 sm:p-4 border border-gray-100'
      )}
      style={{
        willChange: "transform, opacity",
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
    </motion.div>
  )
}

export default TestimonialCards 