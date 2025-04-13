'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { GraduationCap, Brain, DollarSign, Globe, Rocket, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { BackgroundElements } from './BackgroundElements'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Define icons to use for each reason
const icons = [
  GraduationCap,
  Brain,
  DollarSign,
  Globe,
  Rocket,
  BookOpen
]

// Define colors for each reason
const colors = [
  "blue",
  "purple",
  "green",
  "orange",
  "red",
  "indigo"
]

interface ReasonProps {
  title: string
  description: string
  icon: React.ElementType
  color: string
  index: number
}

const Reason = ({ title, description, icon: Icon, color, index }: ReasonProps) => {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' }
    }
    return colorMap[color] || colorMap.blue
  }

  const { bg, text } = getColorClasses(color)

  return (
    <motion.div
      className="flex-1 min-w-[calc(100%-2rem)] md:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1.75rem)]
                shadow-md hover:shadow-xl rounded-xl border border-blue-100 hover:border-blue-200
                bg-gradient-to-br from-white/90 to-white/80 backdrop-blur-md
                p-6 transition-all duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className={`w-14 h-14 rounded-lg ${bg} flex items-center justify-center mb-6`}>
        <Icon className={`w-7 h-7 ${text}`} />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600">
        {description}
      </p>
    </motion.div>
  )
}

export function WhyChina({ lang }: { lang: string }) {
  const t = useTranslations('home.whyChina')
  const [reasons, setReasons] = useState<any[]>([])

  useEffect(() => {
    // Map the icons, colors, and translations together
    const reasonsData = []
    for (let i = 1; i <= 6; i++) {
      reasonsData.push({
        title: t(`reasons.${i}.title`),
        description: t(`reasons.${i}.description`),
        icon: icons[(i - 1) % icons.length],
        color: colors[(i - 1) % colors.length]
      })
    }
    setReasons(reasonsData)
  }, [t])

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <BackgroundElements />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title.main')} <span className="text-blue-600">{t('title.highlight')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        
        {/* Reasons Flex Container */}
        <div className="flex flex-wrap gap-8 mb-12">
          {reasons.map((reason, index) => (
            <Reason
              key={index}
              title={reason.title}
              description={reason.description}
              icon={reason.icon}
              color={reason.color}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 md:p-10 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('cta.title')}
            </h3>
            <p className="text-lg mb-6 text-blue-100">
              {t('cta.description')}
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
              <Link href={`/${lang}/why-china`}>
                {t('cta.button')}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 