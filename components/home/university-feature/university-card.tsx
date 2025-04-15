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

  const handleMoreInfo = () => {
    router.push(`/${lang}/universities/${university.slug || university.id}`)
  }

  return (
    <div 
      ref={cardRef}
      className={cn(
        "overflow-hidden group transition-all duration-500 rounded-xl max-w-[300px] w-full h-[500px]",
        "border border-gray-200",
        "bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.9),rgba(255,255,255,0.8))]",
        "backdrop-blur-[10px]",
        "shadow-[0_1px_3px_0px_rgba(0,0,0,0.06)]",
        "hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
        "hover:border-[rgba(59,130,246,0.2)]",
        "opacity-100 translate-y-0",
        "flex flex-col",
        className
      )}
      style={{ 
        transform: 'translateZ(0)', 
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden flex-shrink-0">
        <Image 
          src={university.image} 
          alt={university.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col relative flex-grow">
        {/* Logo */}
        <div className="absolute -top-8 left-4 sm:left-5 bg-white/90 p-1.5 rounded-full shadow-lg w-[70px] h-[70px] flex items-center justify-center">
          {university.logo ? (
            <div className="w-[56px] h-[56px] rounded-full overflow-hidden bg-white flex items-center justify-center">
              <Image 
                src={university.logo} 
                alt={`${university.name} logo`}
                width={56}
                height={56}
                className="object-contain w-[48px] h-[48px]"
              />
            </div>
          ) : (
            <div className="w-[56px] h-[56px] rounded-full bg-gray-200 flex items-center justify-center" />
          )}
        </div>
        
        {/* Watermark */}
        {university.logo && (
          <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none overflow-hidden">
            <Image 
              src={university.logo} 
              alt=""
              width={160}
              height={160}
              className="object-contain translate-x-1/3 translate-y-1/3"
            />
          </div>
        )}

        {/* Title section */}
        <div className="text-center pt-3 pb-4 flex items-center justify-center min-h-[60px]">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-800 group-hover:text-primary transition-colors line-clamp-2 mx-auto leading-tight">
            {university.name}
          </h3>
        </div>

        <div className="h-px bg-gradient-to-r from-gray-200 via-gray-200 to-transparent mb-4" />

        {/* Location section */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-50">
              <MapPin className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm font-medium line-clamp-1">{university.location}</span>
          </div>
        </div>

        {/* Faculties section */}
        <div className="overflow-hidden mb-4 flex-grow">
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-50">
              <GraduationCap className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm font-medium">{t('faculties')}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {university.faculties.slice(0, 4).map((faculty, index) => (
              <div 
                key={index}
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors rounded-full px-3 py-1.5 text-xs font-medium border border-gray-200 text-center truncate"
              >
                <span className="truncate block">{faculty.replace('School of ', '')}</span>
              </div>
            ))}
            {university.faculties.length > 4 && (
              <div className="col-span-2 text-center text-xs text-primary font-medium mt-2">
                +{university.faculties.length - 4} more
              </div>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="mt-auto">
          <button 
            onClick={handleMoreInfo}
            className="w-full flex items-center justify-center gap-1.5 text-primary hover:text-gray-800 hover:bg-gray-100 transition-colors rounded-xl py-2.5 text-sm font-medium group"
          >
            {t('moreInfo')}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
} 