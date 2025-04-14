'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'

import { SectionHeader } from './section-header'

interface FunFactsProps {
  namespace: string
}

export function FunFacts({ namespace }: FunFactsProps) {
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

  // Get fun facts from translations
  const getFunFacts = () => {
    try {
      return Array.from({ length: 5 }).map((_, i) => 
        t(`funFacts.${i}`, { default: `Fun fact ${i+1} about studying in China` })
      )
    } catch (e) {
      // Fallback data
      return Array.from({ length: 5 }).map((_, i) => 
        `Fun fact ${i+1} about studying in China`
      )
    }
  }

  const funFacts = getFunFacts()

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container px-4 md:px-6">
        <SectionHeader namespace={namespace} path="funFacts" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {funFacts.map((fact, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              custom={index}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-blue-50 group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 rounded-full p-3 mt-1 group-hover:bg-blue-200 transition-colors duration-300">
                  <Lightbulb className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {t('funFacts.factTitle', { number: index + 1, default: `Fun Fact #${index + 1}` })}
                  </h4>
                  <p className="text-gray-700">{fact}</p>
                  
                  {/* Subtle decorative element */}
                  <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent mt-3 transition-all duration-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}