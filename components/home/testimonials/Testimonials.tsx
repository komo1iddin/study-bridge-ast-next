"use client"

import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768

interface TestimonialsProps {
  className?: string
}

// Define the Testimonial interface
interface Testimonial {
  id: string
  name: string
  university: string
  image: string
  quote: {
    [locale: string]: string
  }
  rating: number
  featured: boolean
}

// Sample testimonials data - in a real app, this would come from an API
const sampleTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ali Abdullaev',
    university: 'Tsinghua University',
    image: '/images/testimonials/placeholder.jpeg',
    quote: {
      en: 'Study Bridge helped me get into my dream university with a full scholarship! Their guidance was invaluable.',
      ru: 'Study Bridge помог мне поступить в университет моей мечты с полной стипендией! Их руководство было бесценным.',
      uz: "Study Bridge to'liq stipendiya bilan o'z orzuidagi universitetimga kirishimga yordam berdi! Ularning yo'l-yo'riqlari juda muhim edi."
    },
    rating: 5,
    featured: true
  },
  {
    id: '2',
    name: 'Maria Li',
    university: 'Zhejiang University',
    image: '/images/testimonials/placeholder.jpeg',
    quote: {
      en: 'The application process was smooth and efficient thanks to Study Bridge. They were with me every step of the way.',
      ru: 'Процесс подачи заявки был гладким и эффективным благодаря Study Bridge. Они были со мной на каждом этапе пути.',
      uz: "Study Bridge tufayli ariza topshirish jarayoni oson va samarali bo'ldi. Ular har bir bosqichda men bilan birga edilar."
    },
    rating: 5,
    featured: true
  },
  {
    id: '3',
    name: 'Ahmed Rashidov',
    university: 'Fudan University',
    image: '/images/testimonials/placeholder.jpeg',
    quote: {
      en: "Study Bridge made my dream of studying in China a reality. Their team's expertise and support were exceptional.",
      ru: 'Study Bridge сделал мою мечту об учебе в Китае реальностью. Опыт и поддержка их команды были исключительными.',
      uz: "Study Bridge Xitoyda o'qish orzumni ro'yobga chiqardi. Ularning jamoasining tajribasi va yordami ajoyib edi."
    },
    rating: 4,
    featured: true
  }
]

export default function Testimonials({ className }: TestimonialsProps) {
  const t = useTranslations('pages.home')
  const locale = useLocale()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
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
    // In a real app, this would be an API call
    // For now, we'll use the sample data
    setTestimonials(sampleTestimonials)
  }, [])
  
  return (
    <section className={cn("w-full py-12 md:py-24 lg:py-32 bg-white", className)}>
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <motion.div 
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-10"
          style={{ willChange: "opacity, transform" }}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('testimonials.title')}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('testimonials.subtitle')}
            </p>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1, // Stagger the animations
                ease: "easeOut" 
              }}
              style={{ 
                willChange: "opacity, transform",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden"
              }}
            >
              <div className={cn(
                "bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-2xl shadow-lg border border-blue-100 h-full flex flex-col transition-all duration-300",
                !isMobile && "hover:shadow-xl hover:-translate-y-1"
              )}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-slate-800">{testimonial.name}</h3>
                    <p className="text-sm text-slate-600">{testimonial.university}</p>
                  </div>
                </div>
                
                <p className="text-slate-700 mb-4 flex-grow">"{testimonial.quote[locale] || testimonial.quote.en}"</p>
                
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={cn(
                        "w-4 h-4", 
                        i < testimonial.rating 
                          ? "text-amber-400 fill-amber-400" 
                          : "text-gray-200"
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 