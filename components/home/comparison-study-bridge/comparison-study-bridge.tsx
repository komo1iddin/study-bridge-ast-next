'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768

interface ComparisonStudyBridgeProps {
  className?: string
}

export function ComparisonStudyBridge({ className }: ComparisonStudyBridgeProps) {
  const t = useTranslations('pages.home.comparison')
  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Mount effect to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
    
    // Check if mobile
    const checkIfMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  // Animation variants - optimized for performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Reduced from 0.1
        delayChildren: 0.1 // Reduced from 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3 // Reduced from 0.5
      }
    }
  }

  const ComparisonTable = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
      {/* Other Options Column */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-gray-200 rounded-xl p-6 order-2 md:order-1"
        style={{
          willChange: "opacity, transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-700 mb-2">{t('alternatives.title')}</h3>
          <p className="text-gray-500 text-sm">{t('alternatives.description')}</p>
        </div>
        
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="flex items-start gap-3">
              <XCircle className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
              <span className="text-gray-600">{t(`alternatives.points.${index + 1}`)}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      
      {/* Our Service Column - Highlighted */}
      <motion.div
        variants={itemVariants}
        className={cn(
          "bg-white border-2 border-blue-200 rounded-xl p-8 shadow-lg relative z-10 -mt-4 md:mt-[-2rem] order-1 md:order-2",
          !isMobile && "hover:shadow-xl"
        )}
        style={{
          willChange: "opacity, transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-blue-600 text-white text-xs font-bold uppercase py-1 px-3 rounded-full">
            {t('ourService.badge')}
          </span>
        </div>
        
        <div className="text-center mb-6 pt-2">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">{t('ourService.title')}</h3>
          <p className="text-blue-700 text-sm">{t('ourService.description')}</p>
        </div>
        
        <ul className="space-y-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
              <span className="text-gray-800 font-medium">{t(`ourService.points.${index + 1}`)}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      
      {/* Self Application Column */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-gray-200 rounded-xl p-6 order-3"
        style={{
          willChange: "opacity, transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-700 mb-2">{t('selfApplication.title')}</h3>
          <p className="text-gray-500 text-sm">{t('selfApplication.description')}</p>
        </div>
        
        <ul className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="flex items-start gap-3">
              <XCircle className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
              <span className="text-gray-600">{t(`selfApplication.points.${index + 1}`)}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )

  // If not mounted yet, return a non-animated version to prevent flashing/disappearing
  if (!isMounted) {
    return (
      <section className={cn("w-full py-10 md:py-16 lg:py-20", className)}>
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t('title.main')} <span className="text-blue-600">{t('title.highlight')}</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
          <div>
            <ComparisonTable />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn("w-full py-10 md:py-16 lg:py-20", className)}>
      <div className="container px-4 md:px-6">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: "opacity, transform", transform: "translateZ(0)" }}
        >
          <h2 className="text-3xl font-bold mb-4">
            {t('title.main')} <span className="text-blue-600">{t('title.highlight')}</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>
        
        {/* Comparison Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: "opacity", transform: "translateZ(0)" }}
        >
          <ComparisonTable />
        </motion.div>
      </div>
    </section>
  )
} 