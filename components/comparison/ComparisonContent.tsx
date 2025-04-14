'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import {
  Award,
  Building,
  GraduationCap,
  Globe,
  Briefcase,
  DollarSign,
  Check,
  ChevronRight,
  Lightbulb,
  Zap,
  Clock,
  X
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ComparisonSection } from '@/components/home/comparison-section'
import { cn } from '@/lib/utils'

interface ComparisonContentProps {
  lang: string
}

export function ComparisonContent({ lang }: ComparisonContentProps) {
  const t = useTranslations('pages.comparison')
  const [activeTab, setActiveTab] = useState('academic')

  // Animations
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

  const detailedComparison: Record<string, any[]> = {
    academic: getDetailedComparison('academic'),
    financial: getDetailedComparison('financial'),
    living: getDetailedComparison('living'),
    career: getDetailedComparison('career'),
    cultural: getDetailedComparison('cultural'),
  }

  const testimonials = getTestimonials()
  const keyDifferences = getKeyDifferences()
  const funFacts = getFunFacts()

  const TabIcon = tabs.find((tab) => tab.id === activeTab)?.icon || GraduationCap

  return (
    <>
      {/* Page Header */}
      <section className="w-full py-12 md:py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="px-3 py-1 bg-blue-200 text-blue-800 border-blue-300">
              {t('pageHeader.badge', { default: 'Comparison' })}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter max-w-3xl">
              {t('pageHeader.title', { default: 'China vs Local Education: Complete Comparison' })}
            </h1>
            <p className="max-w-[800px] text-gray-600 md:text-xl">
              {t('pageHeader.description', { default: 'Compare the advantages of studying in China vs local education options' })}
            </p>
          </div>
        </div>
      </section>

      {/* Main Comparison Section from the home page */}
      <ComparisonSection />

      {/* Detailed Comparison Tabs */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
              {t('detailedComparison.badge', { default: 'Detailed' })}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t('detailedComparison.title', { default: 'Comprehensive Comparison' })}
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-xl">
              {t('detailedComparison.subtitle', { default: 'Detailed comparison of education systems in China and locally' })}
            </p>
          </div>

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

          {/* Tab Content */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <TabIcon className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold">{tabs.find((tab) => tab.id === activeTab)?.label}</h3>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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

              {detailedComparison[activeTab]?.map((item, index) => (
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
          </div>
        </div>
      </section>

      {/* Key Differences */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
              {t('keyDifferences.badge', { default: 'Key Differences' })}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t('keyDifferences.title', { default: 'Important Differences' })}
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-xl">
              {t('keyDifferences.subtitle', { default: 'The most significant differences between education systems' })}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold">{difference.title}</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-red-600 text-xs font-bold">CN</span>
                          </div>
                          <h4 className="font-semibold">{t('keyDifferences.china', { default: 'China' })}</h4>
                        </div>
                        <p>{difference.china}</p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-600 text-xs font-bold">
                              {t('keyDifferences.localCode', { default: 'LC' })}
                            </span>
                          </div>
                          <h4 className="font-semibold">{t('keyDifferences.local', { default: 'Local' })}</h4>
                        </div>
                        <p>{difference.uzbekistan}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
              {t('testimonials.badge', { default: 'Experiences' })}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t('testimonials.title', { default: 'Student Testimonials' })}
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-xl">
              {t('testimonials.subtitle', { default: 'Hear from students who experienced both education systems' })}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden mb-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                  <p className="text-blue-100">{testimonial.university}</p>
                </div>
                <div className="p-6">
                  <blockquote className="italic text-gray-700">"{testimonial.quote}"</blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">
              {t('funFacts.badge', { default: 'Fun Facts' })}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t('funFacts.title', { default: 'Interesting Facts About Studying in China' })}
            </h2>
            <p className="max-w-[800px] text-muted-foreground md:text-xl">
              {t('funFacts.subtitle', { default: 'Interesting information you should know about studying in China' })}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                custom={index}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-full p-3 mt-1">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      {t('funFacts.factTitle', { number: index + 1, default: `Fun Fact #${index + 1}` })}
                    </h4>
                    <p>{fact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t('cta.title', { default: 'Don\'t Miss Your Opportunity to Study in China' })}
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                {t('cta.description', { default: 'Our experts will help you choose the right university and guide you through the application process.' })}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button 
                size="lg" 
                variant="secondary"
                asChild
              >
                <Link href={`/${lang}/#contact`}>
                  {t('cta.primaryButton', { default: 'Apply Now' })}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href={`/${lang}/contact`}>
                  {t('cta.secondaryButton', { default: 'Contact Us' })}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 