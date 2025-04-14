'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ChevronRight, GraduationCap, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { UniversityFeatureItem } from './types'

interface UniversityCardProps {
  university: UniversityFeatureItem
  lang: string
  className?: string
}

export function UniversityCard({ university, lang, className }: UniversityCardProps) {
  const t = useTranslations('universityFeature')
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  const handleMoreInfo = () => {
    router.push(`/${lang}/universities/${university.slug || university.id}`)
  }

  return (
    <div 
      ref={cardRef}
      className={cn(
        "overflow-hidden group transition-all duration-500 rounded-xl max-w-[300px] w-full",
        "border border-gray-200",
        "bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.9),rgba(255,255,255,0.8))]",
        "backdrop-blur-[10px]",
        "shadow-[0_1px_3px_0px_rgba(0,0,0,0.06)]",
        "hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
        "hover:border-[rgba(59,130,246,0.2)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
      style={{ 
        transform: 'translateZ(0)', 
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image 
          src={university.image} 
          alt={university.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col relative min-h-[280px]">
        {/* Logo */}
        <div className="absolute -top-8 left-4 sm:left-5 bg-white/90 p-1.5 rounded-full shadow-lg">
          <Image 
            src={university.logo} 
            alt={`${university.name} logo`}
            width={56}
            height={56}
            className="rounded-full object-contain"
          />
        </div>
        
        {/* Watermark */}
        <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none overflow-hidden">
          <Image 
            src={university.logo} 
            alt=""
            width={160}
            height={160}
            className="object-contain translate-x-1/3 translate-y-1/3"
          />
        </div>

        {/* Title section */}
        <div className="pl-14 sm:pl-16 pt-3 h-[50px] sm:h-[60px]">
          <h3 className="text-sm sm:text-base font-bold tracking-tight text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
            {university.name}
          </h3>
        </div>

        <div className="h-px bg-gradient-to-r from-gray-200 via-gray-200 to-transparent my-2 sm:my-3" />

        {/* Location section */}
        <div className="h-[28px] sm:h-[32px] mb-2">
          <div className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-gray-700">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
            </div>
            <span className="line-clamp-1">{university.location}</span>
          </div>
        </div>

        {/* Faculties section */}
        <div className="h-[80px] sm:h-[90px] overflow-y-auto mb-3">
          <div className="text-xs sm:text-sm font-semibold mb-2 flex items-center gap-2 text-gray-700">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
            </div>
            <span>{t('faculties')}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {university.faculties.map((faculty, index) => (
              <div 
                key={index}
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium border border-gray-200"
              >
                {faculty}
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <button 
          onClick={handleMoreInfo}
          className="w-full flex items-center justify-center gap-1.5 text-primary hover:text-gray-800 hover:bg-gray-100 transition-colors rounded-xl py-2 sm:py-2.5 text-xs sm:text-sm font-medium group"
        >
          {t('moreInfo')}
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
} 