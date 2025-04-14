'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  DollarSign,
  Building,
  Briefcase,
  Globe,
  Check,
  X
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { SectionHeader } from './section-header'
import { cn } from '@/lib/utils'

interface DetailedComparisonProps {
  namespace: string
}

export function DetailedComparison({ namespace }: DetailedComparisonProps) {
  const t = useTranslations(namespace)
  const [activeTab, setActiveTab] = useState('academic')

  // Use tabs from translations or fallback
  const tabs = [
    { id: 'academic', label: t('tabs.academic', { default: 'Academic' }), icon: GraduationCap },
    { id: 'financial', label: t('tabs.financial', { default: 'Financial' }), icon: DollarSign },
    { id: 'living', label: t('tabs.living', { default: 'Living' }), icon: Building },
    { id: 'career', label: t('tabs.career', { default: 'Career' }), icon: Briefcase },
    { id: 'cultural', label: t('tabs.cultural', { default: 'Cultural' }), icon: Globe },
  ]

  // Use dynamic data from translations with fallbacks for demo
  const getDetailedComparison = (category: string) => {
    try {
      return Array.from({ length: 5 }).map((_, i) => ({
        aspect: t(`comparison.${category}.${i}.aspect`, { default: `Aspect ${i+1}` }),
        china: t(`comparison.${category}.${i}.china`, { default: `China advantage ${i+1}` }),
        uzbekistan: t(`comparison.${category}.${i}.uzbekistan`, { default: `Local option ${i+1}` }),
        chinaAdvantage: t.raw(`comparison.${category}.${i}.chinaAdvantage`) !== 'false'
      }))
    } catch (e) {
      // Fallback data if translations are not available
      return Array.from({ length: 5 }).map((_, i) => ({
        aspect: `Aspect ${i+1}`,
        china: `China advantage ${i+1}`,
        uzbekistan: `Local option ${i+1}`,
        chinaAdvantage: true
      }))
    }
  }
  
  const detailedComparison = {
    academic: getDetailedComparison('academic'),
    financial: getDetailedComparison('financial'),
    living: getDetailedComparison('living'),
    career: getDetailedComparison('career'),
    cultural: getDetailedComparison('cultural'),
  }

  const TabIcon = tabs.find((tab) => tab.id === activeTab)?.icon || GraduationCap

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <SectionHeader namespace={namespace} path="detailedComparison" />

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content with improved mobile view */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <TabIcon className="h-6 w-6 text-blue-600" />
            <h3 className="text-2xl font-bold">{tabs.find((tab) => tab.id === activeTab)?.label}</h3>
          </div>

          {/* Desktop view */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hidden md:block">
            <div className="grid grid-cols-12 bg-blue-600 text-white">
              <div className="col-span-4 p-4 font-semibold">
                {t('detailedComparison.table.aspect', { default: 'Aspect' })}
              </div>
              <div className="col-span-4 p-4 font-semibold border-l border-blue-500">
                {t('detailedComparison.table.china', { default: 'China' })}
              </div>
              <div className="col-span-4 p-4 font-semibold border-l border-blue-500">
                {t('detailedComparison.table.local', { default: 'Local' })}
              </div>
            </div>

            {detailedComparison[activeTab as keyof typeof detailedComparison]?.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-12 border-b border-gray-200",
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                )}
              >
                <div className="col-span-4 p-4 font-medium">{item.aspect}</div>
                <div
                  className={cn(
                    "col-span-4 p-4 border-l border-gray-200",
                    item.chinaAdvantage ? "text-green-600 font-medium" : ""
                  )}
                >
                  <div className="flex items-start gap-2">
                    {item.chinaAdvantage && <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />}
                    <span>{item.china}</span>
                  </div>
                </div>
                <div
                  className={cn(
                    "col-span-4 p-4 border-l border-gray-200",
                    !item.chinaAdvantage ? "text-green-600 font-medium" : ""
                  )}
                >
                  <div className="flex items-start gap-2">
                    {!item.chinaAdvantage && <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />}
                    <span>{item.uzbekistan}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile view - card-based alternative */}
          <div className="md:hidden space-y-4">
            {detailedComparison[activeTab as keyof typeof detailedComparison]?.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              >
                <div className="bg-blue-600 text-white p-3 font-medium">
                  {item.aspect}
                </div>
                <div className="p-4 space-y-4">
                  <div className={cn(
                    "p-3 rounded-lg",
                    item.chinaAdvantage ? "bg-green-50 border-l-4 border-green-500" : "bg-gray-50 border-l-4 border-gray-300"
                  )}>
                    <h4 className="font-semibold flex items-center gap-2 mb-1 text-sm">
                      {item.chinaAdvantage ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400" />
                      )}
                      {t('detailedComparison.table.china', { default: 'China' })}
                    </h4>
                    <p className="text-sm">{item.china}</p>
                  </div>
                  
                  <div className={cn(
                    "p-3 rounded-lg",
                    !item.chinaAdvantage ? "bg-green-50 border-l-4 border-green-500" : "bg-gray-50 border-l-4 border-gray-300"
                  )}>
                    <h4 className="font-semibold flex items-center gap-2 mb-1 text-sm">
                      {!item.chinaAdvantage ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400" />
                      )}
                      {t('detailedComparison.table.local', { default: 'Local' })}
                    </h4>
                    <p className="text-sm">{item.uzbekistan}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 