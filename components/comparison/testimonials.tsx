'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { SectionHeader } from './section-header'

interface TestimonialsProps {
  namespace: string
}

export function Testimonials({ namespace }: TestimonialsProps) {
  const t = useTranslations(namespace)
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  }

  // Get testimonials from translations
  const getTestimonials = () => {
    try {
      return Array.from({ length: 3 }).map((_, i) => ({
        name: t(`testimonials.${i}.name`, { default: `Student ${i+1}` }),
        image: t(`testimonials.${i}.image`, { default: '/placeholder.svg?height=100&width=100' }),
        quote: t(`testimonials.${i}.quote`, { default: 'Student testimonial about studying in China' }),
        university: t(`testimonials.${i}.university`, { default: 'University Name' })
      }))
    } catch (e) {
      // Fallback data
      return Array.from({ length: 3 }).map((_, i) => ({
        name: `Student ${i+1}`,
        image: '/placeholder.svg?height=100&width=100',
        quote: 'Student testimonial about studying in China',
        university: 'University Name'
      }))
    }
  }

  const testimonials = getTestimonials()

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <SectionHeader namespace={namespace} path="testimonials" />

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 p-6 flex flex-col items-center">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-white" />
                <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-50 transition-colors duration-300">{testimonial.name}</h3>
                <p className="text-blue-100">{testimonial.university}</p>
                
                {/* Decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-6 overflow-hidden">
                  <div className="absolute -bottom-5 left-0 w-full h-10 bg-white opacity-10 rounded-full" />
                </div>
              </div>
              <div className="p-6 relative">
                <svg className="absolute top-0 right-6 transform -translate-y-1/2 text-blue-600 w-10 h-10 opacity-20" 
                  viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.507.144l.138-1.142c.5-.075 1.05-.14 1.647-.198 1.275-.128 2.256-.144 2.933-.048.563.07 1.063.227 1.5.473.433.245.783.56 1.05.944.266.383.45.81.55 1.276.095.465.145.936.145 1.413 0 .505-.056.98-.167 1.423-.11.443-.27.83-.47 1.163-.212.344-.48.625-.804.84-.312.204-.674.358-1.084.462-.547.137-1.116.21-1.7.212-1.095.003-1.853-.234-2.278-.704-.426-.47-.638-1.103-.638-1.893 0-.465.085-.872.26-1.223.17-.35.456-.638.856-.864.4-.227.86-.337 1.382-.337.435 0 .822.1 1.162.3.34.2.615.488.822.866.208.377.312.82.312 1.325zm6.96 0c0-.88-.23-1.618-.69-2.217-.326-.41-.77-.683-1.327-.812-.56-.128-1.068-.137-1.548-.028-.16.037-.327.085-.5.144l.136-1.142c.484-.074 1.034-.14 1.65-.198 1.273-.128 2.254-.144 2.93-.048.564.07 1.063.226 1.5.473.435.245.785.56 1.05.944.265.382.45.81.548 1.276.1.464.15.935.15 1.412 0 .505-.055.98-.165 1.423-.11.445-.275.83-.48 1.164-.21.344-.48.625-.803.84-.313.204-.674.358-1.085.462-.546.137-1.113.21-1.7.212-1.09.003-1.85-.234-2.27-.704-.43-.47-.64-1.102-.64-1.893 0-.466.08-.873.26-1.223.17-.35.45-.638.85-.864.4-.227.86-.337 1.38-.337.44 0 .83.1 1.17.3.34.2.61.488.82.866.2.377.31.82.31 1.325z" />
                </svg>
                <blockquote className="italic text-gray-700 mt-2 relative z-10">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 