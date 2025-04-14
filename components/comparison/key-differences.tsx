'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Award, Zap, Clock, DollarSign } from 'lucide-react'

import { SectionHeader } from './section-header'
import { cn } from '@/lib/utils'

interface KeyDifferencesProps {
  namespace: string
}

export function KeyDifferences({ namespace }: KeyDifferencesProps) {
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

  // Get key differences from translations
  const getKeyDifferences = () => {
    try {
      return Array.from({ length: 4 }).map((_, i) => {
        const icons = [Award, Zap, Clock, DollarSign]
        return {
          title: t(`keyDifferences.${i}.title`, { default: `Difference ${i+1}` }),
          china: t(`keyDifferences.${i}.china`, { default: `China advantage ${i+1}` }),
          uzbekistan: t(`keyDifferences.${i}.uzbekistan`, { default: `Local option ${i+1}` }),
          icon: icons[i % icons.length]
        }
      })
    } catch (e) {
      // Fallback data
      return Array.from({ length: 4 }).map((_, i) => {
        const icons = [Award, Zap, Clock, DollarSign]
        return {
          title: `Difference ${i+1}`,
          china: `China advantage ${i+1}`,
          uzbekistan: `Local option ${i+1}`,
          icon: icons[i % icons.length]
        }
      })
    }
  }

  const keyDifferences = getKeyDifferences()

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container px-4 md:px-6">
        <SectionHeader namespace={namespace} path="keyDifferences" />

        <div className="grid gap-8 md:grid-cols-2">
          {keyDifferences.map((difference, index) => {
            const Icon = difference.icon
            return (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="bg-blue-100 rounded-full p-3">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{difference.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                          <span className="text-red-600 text-xs font-bold">CN</span>
                        </div>
                        <h4 className="font-semibold text-red-800">{t('keyDifferences.china', { default: 'China' })}</h4>
                      </div>
                      <p className="text-gray-700">{difference.china}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 text-xs font-bold">
                            {t('keyDifferences.localCode', { default: 'LC' })}
                          </span>
                        </div>
                        <h4 className="font-semibold text-green-800">{t('keyDifferences.local', { default: 'Local' })}</h4>
                      </div>
                      <p className="text-gray-700">{difference.uzbekistan}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 