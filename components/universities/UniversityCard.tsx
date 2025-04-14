'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Award, Calendar, Users, Globe, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { University } from './data'

interface UniversityCardProps {
  university: University
}

const UniversityCard = ({ university }: UniversityCardProps) => {
  const t = useTranslations('pages.universities')

  // Format large numbers with commas
  const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return "N/A"
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const {
    id,
    name,
    logo,
    city,
    description,
    educationType,
    hasGrants,
    featured,
    ranking,
    foundedYear,
    studentsCount,
  } = university

  const defaultLogo = "/placeholder-university.svg"

  return (
    <div 
      className={cn(
        "w-full border rounded-lg shadow-sm overflow-hidden bg-white transition-all hover:shadow-md hover:-translate-y-0.5",
        featured && "border-blue-200"
      )}
    >
      <div className="flex flex-col md:flex-row md:min-h-[260px]">
        {/* University Logo */}
        <div className="relative md:w-1/3 h-40 md:h-auto flex items-center justify-center p-3 bg-white">
          <div className="relative w-[150px] md:w-[210px] h-[150px] md:h-[210px]">
            <Image
              src={logo || defaultLogo}
              alt={name}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 150px, 210px"
            />
          </div>
          {featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-blue-600 text-white text-xs md:text-sm">
                {t('card.featured')}
              </Badge>
            </div>
          )}
        </div>

        {/* University Information */}
        <div className="p-3 md:p-4 md:w-2/3 flex flex-col justify-between">
          <div className="flex-grow">
            <div className="flex items-start justify-between mb-2 gap-2">
              <h3 className="text-lg md:text-xl font-bold line-clamp-2">{name}</h3>
              {ranking && (
                <Badge variant="outline" className="border-blue-300 text-blue-700 whitespace-nowrap text-xs md:text-sm">
                  {t('card.ranking')}: #{ranking}
                </Badge>
              )}
            </div>

            <p className="text-slate-500 text-xs md:text-sm mb-2">
              {city}
            </p>

            <p className="text-slate-600 text-xs md:text-sm line-clamp-3 mb-3">
              {description}
            </p>

            <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3">
              {hasGrants && (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs md:text-sm">
                  {t('card.grants')}
                </Badge>
              )}
              
              {educationType?.map((type) => (
                <Badge key={type} variant="outline" className="bg-slate-50 text-xs md:text-sm">
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 mt-4 flex flex-col md:flex-row justify-between gap-3">
            <div className="grid grid-cols-2 md:flex gap-2 md:gap-3">
              {foundedYear && (
                <div className="flex flex-col items-center justify-center p-2 rounded-md bg-slate-50/70 min-w-[60px]">
                  <span className="text-xs text-slate-500">{t('card.founded')}</span>
                  <span className="text-xs md:text-sm font-semibold">{foundedYear}</span>
                </div>
              )}
              
              {studentsCount && (
                <div className="flex flex-col items-center justify-center p-2 rounded-md bg-slate-50/70 min-w-[60px]">
                  <span className="text-xs text-slate-500">{t('card.students')}</span>
                  <span className="text-xs md:text-sm font-semibold">{formatNumber(studentsCount)}</span>
                </div>
              )}
            </div>

            <Button 
              size="sm" 
              className="whitespace-nowrap group bg-blue-600 hover:bg-blue-700 text-white"
              asChild
            >
              <Link href={`/universities/${id}`}>
                {t('card.details')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniversityCard 