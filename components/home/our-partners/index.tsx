'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { Hand, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/ui/section-header'
import PartnerCardItem from './components/partner-card-item'
import BackgroundDecoration from './components/background-decoration'
import { partners } from './data/partners'
import useEmblaCarousel from 'embla-carousel-react'
import AutoPlay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'

interface OurPartnersProps {
  lang?: string
}

// Breakpoint for mobile devices
const MOBILE_BREAKPOINT = 768

const OurPartners = ({ lang = 'en' }: OurPartnersProps) => {
  const t = useTranslations('pages.home.components.ourPartners')
  
  // State
  const [isMobile, setIsMobile] = useState(false)
  const [swipeAnimationActive, setSwipeAnimationActive] = useState(true)
  const [isSectionVisible, setIsSectionVisible] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isCarouselVisible, setIsCarouselVisible] = useState(false)
  const [isButtonVisible, setIsButtonVisible] = useState(false)
  
  // Refs for Intersection Observer
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  
  // Check if mobile at mount - before initializing carousel
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    checkIfMobile()
  }, [])
  
  // Create autoplay only for desktop
  // @ts-ignore - Ignoring type conflicts
  const autoplayPlugin = !isMobile 
    ? AutoPlay({ delay: 4000, stopOnInteraction: true })
    : null
  
  // Initialize carousel with conditional autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      slidesToScroll: 1,
      skipSnaps: false,
      dragFree: true,
      containScroll: "trimSnaps",
      breakpoints: {
        "(min-width: 320px)": { slidesToScroll: 1 },
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1024px)": { slidesToScroll: 3 },
        "(min-width: 1280px)": { slidesToScroll: 4 }
      }
    },
    autoplayPlugin ? [autoplayPlugin] : []
  )
  
  // Set up Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px'
    }

    // Observer for the entire section
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true)
          sectionObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observer for the header
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsHeaderVisible(true)
          }, 100)
          headerObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observer for the carousel
    const carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsCarouselVisible(true)
          }, 200)
          carouselObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observer for the button
    const buttonObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsButtonVisible(true)
          }, 300)
          buttonObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Initialize observers
    if (sectionRef.current) sectionObserver.observe(sectionRef.current)
    if (headerRef.current) headerObserver.observe(headerRef.current)
    if (carouselRef.current) carouselObserver.observe(carouselRef.current)
    if (buttonRef.current) buttonObserver.observe(buttonRef.current)

    return () => {
      if (sectionRef.current) sectionObserver.unobserve(sectionRef.current)
      if (headerRef.current) headerObserver.unobserve(headerRef.current)
      if (carouselRef.current) carouselObserver.unobserve(carouselRef.current)
      if (buttonRef.current) buttonObserver.unobserve(buttonRef.current)
    }
  }, [])
  
  // Setup responsive behavior and animations
  useEffect(() => {
    // Check if mobile for responsive UI
    const checkIfMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    // Swipe animation toggle - with reduced frequency
    const animInterval = setInterval(() => {
      setSwipeAnimationActive(prev => !prev)
    }, 2000)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
      clearInterval(animInterval)
    }
  }, [])
  
  // Carousel navigation functions
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  
  return (
    <section 
      ref={sectionRef}
      className={cn(
        "w-full py-12 relative",
        "transition-opacity duration-700",
        isSectionVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <BackgroundDecoration />
      <div className="w-full max-w-[1920px] mx-auto px-4 relative z-10">
        <div
          ref={headerRef}
          className={cn(
            "transition-all duration-700 transform",
            isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <SectionHeader 
            title={t('title')}
            subtitle={t('description')}
          />
        </div>

        <div 
          className={cn(
            "flex justify-end mb-4",
            "transition-all duration-700",
            isCarouselVisible ? "opacity-100" : "opacity-0"
          )}
        >
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

        <div 
          ref={carouselRef}
          className={cn(
            "relative mb-8 pb-6",
            "transition-all duration-700 transform",
            isCarouselVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
              {partners.map((partner) => (
                <div 
                  key={partner.id}
                  className="min-w-[280px] md:min-w-[320px] lg:min-w-[300px] xl:min-w-[320px] px-2 pb-4"
                >
                  <PartnerCardItem partner={partner} />
                </div>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div 
              className={cn(
                "absolute -bottom-2 left-4 hidden md:flex items-center gap-2 z-10",
                "transition-all duration-700",
                isCarouselVisible ? "opacity-100" : "opacity-0"
              )}
              style={{ transform: 'translateZ(0)' }}
            >
              <button 
                onClick={scrollPrev}
                className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-all duration-200 hover:scale-110"
                style={{ willChange: 'background-color, transform' }}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button 
                onClick={scrollNext}
                className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-all duration-200 hover:scale-110"
                style={{ willChange: 'background-color, transform' }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div 
          ref={buttonRef}
          className={cn(
            "text-center mt-12",
            "transition-all duration-700 transform",
            isButtonVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <Button asChild className="hidden md:inline-flex">
            <Link href={`/${lang}/partners`}>
              {t('viewAllPartners')}
            </Link>
          </Button>
          <Button asChild className="md:hidden inline-flex">
            <Link href={`/${lang}/partners`}>
              {t('viewAllPartners')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default OurPartners 