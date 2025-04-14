'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import UniversityCard from './UniversityCard'
import { RANKING_RANGES, ITEMS_PER_PAGE, type University, type Filters } from './data'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'

interface UniversityListProps {
  universities: University[]
  filters: Filters
}

const UniversityList = ({ universities, filters }: UniversityListProps) => {
  // Get translations for the page
  const t = useTranslations('pages.universities')
  
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([])
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Apply filters
  useEffect(() => {
    let result = [...universities]

    // Filter by education type
    if (filters.educationType !== 'all') {
      result = result.filter(uni => 
        uni.educationType?.includes(filters.educationType)
      )
    }

    // Filter by city
    if (filters.city !== 'all') {
      result = result.filter(uni => uni.city === filters.city)
    }

    // Filter by grants
    if (filters.hasGrants === 'true') {
      result = result.filter(uni => uni.hasGrants)
    }

    // Filter by ranking
    if (filters.ranking !== 'all') {
      const range = RANKING_RANGES[filters.ranking as keyof typeof RANKING_RANGES]
      result = result.filter(uni => 
        uni.ranking && uni.ranking >= range.min && uni.ranking <= range.max
      )
    }

    // Filter by featured
    if (filters.featured === 'true') {
      result = result.filter(uni => uni.featured)
    }

    // Sort results (featured first, then by ranking)
    result.sort((a, b) => {
      // First sort by featured
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then sort by ranking (if both have rankings)
      if (a.ranking && b.ranking) {
        return a.ranking - b.ranking
      }
      
      // Put universities with rankings before those without
      if (a.ranking && !b.ranking) return -1
      if (!a.ranking && b.ranking) return 1
      
      // Default to alphabetical
      return a.name.localeCompare(b.name)
    })

    setFilteredUniversities(result)
    // Reset visible count on filter change
    setVisibleCount(ITEMS_PER_PAGE)
  }, [universities, filters])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* List header with counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 hidden sm:block">
          {t('list.title')}
        </h2>
        <div className="text-sm text-gray-500">
          {filteredUniversities.length} {t('list.found')}
        </div>
      </div>

      {/* University cards */}
      {filteredUniversities.length > 0 ? (
        <div className="flex flex-col gap-4 sm:gap-6">
          {filteredUniversities.slice(0, visibleCount).map((university) => (
            <UniversityCard 
              key={university.id}
              university={university}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-lg border shadow-sm">
          <p className="text-gray-500 mb-4">{t('list.noResults')}</p>
          <Button variant="outline" onClick={() => {}}>
            {t('filters.reset')}
          </Button>
        </div>
      )}

      {/* Load more button */}
      {filteredUniversities.length > visibleCount && (
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={loadMore}
            className="px-8"
          >
            {t('list.loadMore')}
          </Button>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white hover:bg-blue-700 shadow-md rounded-full h-10 w-10"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}

export default UniversityList 