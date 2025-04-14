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

interface OurPartnersProps {
  lang?: string
}

const OurPartners = ({ lang = 'en' }: OurPartnersProps) => {
  const t = useTranslations('pages.home.components.ourPartners')
  
  // State
  const [isMobile, setIsMobile] = useState(false)
  const [swipeAnimationActive, setSwipeAnimationActive] = useState(true)
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
    [AutoPlay({ delay: 4000, stopOnInteraction: true })]
  )
  
  // Setup responsive behavior and animations
  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768)
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    // Swipe animation toggle
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
    <section className="w-full bg-[#F5F9FB] py-12 relative">
      <BackgroundDecoration />
      <div className="w-full max-w-[1920px] mx-auto px-4 relative z-10">
        <SectionHeader 
          title={t('title')}
          subtitle={t('description')}
        />

        <div className="flex justify-end mb-4">
          <div className={`flex items-center gap-2 px-4 py-2 bg-white backdrop-blur-sm rounded-full shadow-sm transition-transform duration-700 ${
            swipeAnimationActive ? "translate-x-2" : "-translate-x-2"
          }`}>
            <Hand className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold">
              {t('swipeToSlide')}
            </span>
          </div>
        </div>

        <div className="relative mb-8 pb-6">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
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
            <div className="absolute -bottom-2 left-4 hidden md:flex items-center gap-2 z-10">
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

        <div className="text-center mt-12">
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