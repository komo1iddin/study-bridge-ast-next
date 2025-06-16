'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { UniversityCard } from './university-card'
import { RANKING_RANGES, ITEMS_PER_PAGE_OPTIONS, type Filters } from './data'
import type { University } from '@/types/content'
import { Button } from '@/components/ui/button'
import { ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Constants
const SCROLL_THRESHOLD = 500

interface UniversityListProps {
  universities: University[]
  filters: Filters
  onFilterChange: (key: keyof Filters, value: string) => void
}

export function UniversityList({ universities, filters, onFilterChange }: UniversityListProps) {
  // Get translations for the page
  const t = useTranslations('pages.universities')
  
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([])
  const [currentPage, setCurrentPage] = useState(1)
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
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [universities, filters])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Pagination calculations
  const itemsPerPage = parseInt(filters.itemsPerPage)
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUniversities = filteredUniversities.slice(startIndex, endIndex)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    scrollToTop()
  }

  return (
    <div>
      {/* List header with counts and items per page selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 hidden sm:block">
          {t('list.title')}
        </h2>
        <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500">
          {filteredUniversities.length} {t('list.found')}
          </div>
          <Select
            value={filters.itemsPerPage}
            onValueChange={(value) => onFilterChange('itemsPerPage', value)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={t('list.itemsPerPage')} />
            </SelectTrigger>
            <SelectContent>
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} {t('list.perPage')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* University cards */}
      {filteredUniversities.length > 0 ? (
        <div className="flex flex-col gap-4 sm:gap-6">
          {currentUniversities.map((university) => (
            <UniversityCard 
              key={`${university.id}-${university.name}`}
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

      {/* Pagination */}
      {filteredUniversities.length > itemsPerPage && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {t('list.page')} {currentPage} {t('list.of')} {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[32px]"
                >
                  {page}
                </Button>
              ))}
            </div>

          <Button 
            variant="outline" 
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
          >
              <ChevronRight className="h-4 w-4" />
          </Button>
          </div>
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