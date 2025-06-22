'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Hand, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/ui/section-header'

import { UniversityCard } from './university-card'
import { BackgroundDecoration } from './background-decoration'
import type { UniversityFeatureItem } from './types'

const AUTOPLAY_DELAY = 5000
const LOADING_DELAY = 300
const ANIMATION_INTERVAL = 4000
const MOBILE_BREAKPOINT = 768
const CAROUSEL_SPEED = 20

// Debounce function to prevent excessive resize handler calls
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>) {
    const context = this;
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

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

  // Refs for Intersection Observer
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Check if mobile at mount - do this before creating carousel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    }
    checkMobile()
  }, [])

  // Initialize carousel only after we've checked for mobile
  // @ts-ignore - Ignoring type conflicts
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    skipSnaps: false,
    inViewThreshold: 0.7,
    dragFree: false,
    containScroll: "trimSnaps",
    watchDrag: true
  })

  // Handle resize with simple mobile check
  const handleResize = useCallback(() => {
    const wasMobile = isMobile
    const isMobileNow = window.innerWidth <= MOBILE_BREAKPOINT
    
    // Only update if the device type changed
    if (wasMobile !== isMobileNow) {
      setIsMobile(isMobileNow)
      
      // We need to reload the page when transitioning between mobile and desktop
      // since embla-carousel doesn't support adding/removing plugins dynamically
      window.location.reload()
    }
  }, [isMobile])

  // Create a debounced resize handler
  const debouncedResize = useCallback(
    debounce(handleResize, 150),
    [handleResize]
  )

  // Effects
  useEffect(() => {
    // Listen for resize events
    window.addEventListener('resize', debouncedResize)

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

    // Start swipe animation - with reduced frequency
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
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timer)
      clearInterval(animInterval)
    }
  }, [emblaApi, universities, t, debouncedResize])

  // Navigation functions
  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div 
      ref={sectionRef}
      className={cn(
        "w-full py-10 md:py-16 lg:py-20 relative",
        "transition-opacity duration-700",
        "opacity-100 translate-y-0"
      )}
      style={{ 
        transform: 'translateZ(0)', 
        backfaceVisibility: 'hidden' 
      }}
    >
      <BackgroundDecoration />
      <div className="w-full max-w-[1920px] mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={cn(
            "transition-all duration-700 transform",
            "opacity-100 translate-y-0"
          )}
        >
          <SectionHeader
            title={t('leadingUniversities')}
            subtitle={t('discoverText')}
          />
        </div>

        {/* Swipe Indicator - GPU accelerated */}
        <div className={cn(
          "flex justify-end mb-4",
          "transition-all duration-700",
          "opacity-100 translate-y-0"
        )}>
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 bg-white backdrop-blur-sm rounded-full shadow-sm transition-transform duration-700",
              swipeAnimationActive ? "translate-x-2" : "-translate-x-2"
            )}
            style={{ 
              transform: 'translateZ(0)', 
              willChange: 'transform' 
            }}
          >
            <Hand className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold">
              {t('swipeToSlide')}
            </span>
          </div>
        </div>

        {/* Carousel with GPU acceleration */}
        <div 
          ref={carouselRef}
          className={cn(
            "relative mb-8 pb-6",
            "transition-all duration-700 transform",
            "opacity-100 translate-y-0"
          )}
          style={{ 
            transform: 'translateZ(0)', 
            backfaceVisibility: 'hidden' 
          }}
        >
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing" 
            ref={emblaRef}
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          >
            <div className="flex">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="min-w-[280px] md:min-w-[320px] lg:min-w-[300px] xl:min-w-[320px] px-2 pb-4 h-[520px] flex"
                  >
                    <div className="animate-pulse w-full bg-white rounded-xl">
                      <div className="bg-gray-200 h-48 rounded-t-xl" />
                      <div className="p-4 bg-white rounded-b-xl flex flex-col h-[calc(520px-12rem)]">
                        <div className="h-6 bg-gray-200 rounded mb-2" />
                        <div className="h-4 bg-gray-200 rounded mb-4 w-2/3" />
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded" />
                          ))}
                        </div>
                        <div className="mt-auto h-10 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                ))
              ) : visibleUniversities.length > 0 ? (
                visibleUniversities.map((university, index) => (
                  <div
                    key={`${university.id}-${index}`}
                    className="min-w-[280px] md:min-w-[320px] lg:min-w-[300px] xl:min-w-[320px] px-2 pb-4 h-[520px] flex"
                  >
                    <UniversityCard
                      university={university}
                      lang={lang}
                      className="w-full"
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
            <div 
              className={cn(
                "absolute -bottom-2 left-4 flex items-center gap-2 z-10",
                "transition-all duration-700",
                "opacity-100 translate-y-0"
              )}
              style={{
                transform: 'translateZ(0)'
              }}
            >
              <button
                onClick={scrollPrev}
                className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-colors duration-200"
                style={{ willChange: 'background-color, transform' }}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={scrollNext}
                className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-colors duration-200"
                style={{ willChange: 'background-color, transform' }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div 
          ref={buttonRef}
          className={cn(
            "text-center mt-12",
            "transition-all duration-700 transform",
            "opacity-100 translate-y-0"
          )}
        >
          <Link
            href={`/${lang}/universities`}
            className={cn(
              "inline-flex items-center justify-center",
              "px-6 py-3 rounded-lg",
              "bg-primary text-white font-medium",
              "hover:bg-primary/90 transition-colors duration-200",
              "md:hidden" // Mobile version
            )}
            style={{ transform: 'translateZ(0)' }}
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
            style={{ transform: 'translateZ(0)' }}
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