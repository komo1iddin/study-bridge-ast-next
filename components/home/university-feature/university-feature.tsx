'use client'

import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Hand, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

import { UniversityCard } from './university-card'
import { BackgroundDecoration } from './background-decoration'
import type { UniversityFeatureItem } from './types'

const AUTOPLAY_DELAY = 4000
const LOADING_DELAY = 300
const ANIMATION_INTERVAL = 2000
const MOBILE_BREAKPOINT = 768
const CAROUSEL_SPEED = 20

interface UniversityFeatureProps {
  universities: UniversityFeatureItem[]
  lang: string
}

export function UniversityFeature({ universities, lang }: UniversityFeatureProps) {
  // Get translations
  const t = useTranslations('universityFeature')

  // State
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [visibleUniversities, setVisibleUniversities] = useState<UniversityFeatureItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [swipeAnimationActive, setSwipeAnimationActive] = useState(true)

  // Refs
  const autoplayRef = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false })
  )

  // Initialize carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    skipSnaps: false,
    inViewThreshold: 0.7,
    dragFree: false,
    containScroll: "trimSnaps",
    watchDrag: true
  }, [autoplayRef.current])

  // Effects
  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    // Load universities with delay for loading effect
    setLoading(true)
    const timer = setTimeout(() => {
      try {
        setVisibleUniversities(universities || [])
        setLoading(false)
      } catch (err) {
        setError(t('error'))
        setLoading(false)
      }
    }, LOADING_DELAY)

    // Start swipe animation
    const animInterval = setInterval(() => {
      setSwipeAnimationActive(prev => !prev)
    }, ANIMATION_INTERVAL)

    // Initialize carousel after DOM is ready
    if (emblaApi) {
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      })
      emblaApi.scrollTo(0)
    }

    return () => {
      window.removeEventListener('resize', checkIfMobile)
      clearTimeout(timer)
      clearInterval(animInterval)
    }
  }, [emblaApi, universities, t])

  // Navigation functions
  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="w-full bg-[#F5F9FB] py-12 relative">
      <BackgroundDecoration />
      <div className="w-full max-w-[1920px] mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            {t('leadingUniversities')}
          </h2>
          <p className="text-gray-600">
            {t('discoverText')}
          </p>
        </div>

        {/* Swipe Indicator */}
        <div className="flex justify-end mb-4">
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 bg-white backdrop-blur-sm rounded-full shadow-sm transition-transform duration-700",
              swipeAnimationActive ? "translate-x-2" : "-translate-x-2"
            )}
          >
            <Hand className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold">
              {t('swipeToSlide')}
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mb-8 pb-6">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="min-w-[280px] md:min-w-[320px] lg:min-w-[300px] xl:min-w-[320px] px-2 pb-4"
                  >
                    <div className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-t-2xl" />
                      <div className="p-4 bg-white rounded-b-2xl">
                        <div className="h-6 bg-gray-200 rounded mb-2" />
                        <div className="h-4 bg-gray-200 rounded mb-4 w-2/3" />
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded" />
                          ))}
                        </div>
                        <div className="h-10 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                ))
              ) : visibleUniversities.length > 0 ? (
                visibleUniversities.map((university) => (
                  <div
                    key={university.id}
                    className="min-w-[280px] md:min-w-[320px] lg:min-w-[300px] xl:min-w-[320px] px-2 pb-4"
                  >
                    <UniversityCard
                      university={university}
                      lang={lang}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-10 w-full">
                  <p className="text-gray-500">{t('error')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          {!isMobile && visibleUniversities.length > 0 && (
            <div className="absolute -bottom-2 left-4 flex items-center gap-2 z-10">
              <button
                onClick={scrollPrev}
                className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={scrollNext}
                className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href={`/${lang}/universities`}
            className={cn(
              "inline-flex items-center justify-center",
              "px-6 py-3 rounded-lg",
              "bg-primary text-white font-medium",
              "hover:bg-primary/90 transition-colors duration-200",
              "md:hidden" // Mobile version
            )}
          >
            {t('viewAll')}
          </Link>
          <Link
            href={`/${lang}/universities`}
            className={cn(
              "hidden md:inline-flex items-center justify-center",
              "px-8 py-4 rounded-lg",
              "bg-primary text-white font-medium",
              "hover:bg-primary/90 transition-colors duration-200"
            )}
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>

      {error && (
        <div className="text-center text-red-500 p-4">
          {error}
        </div>
      )}
    </div>
  )
} 