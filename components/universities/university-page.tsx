'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { BackgroundDecoration } from './background-decoration'
import { UniversityList } from './university-list'
import { MobileFilters } from './mobile-filters'
import { FilterSidebar } from './filter-sidebar'
import { DEFAULT_FILTERS, type Filters } from './data'
import type { University } from '@/types/content'

// Loading delay constant
const LOADING_DELAY = 800

interface UniversityPageProps {
  universities: University[]
  cities: string[]
}

export function UniversityPage({ universities, cities }: UniversityPageProps) {
  // Get translations for the page
  const t = useTranslations('pages.universities')

  // Set up state
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Initialize component
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, LOADING_DELAY)
    
    return () => clearTimeout(timer)
  }, [])

  // Filter change handler
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }))
  }

  // Reset all filters
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 relative overflow-hidden">
      <BackgroundDecoration />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/" className="flex items-center hover:text-slate-700">
              <Home className="h-3.5 w-3.5" />
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{t('breadcrumb.universities')}</span>
          </div>
          
          {/* Mobile filters */}
          <div className="lg:hidden mb-6">
            <MobileFilters
              filters={filters}
              cities={cities}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
            />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block sticky top-8 h-fit md:w-64 lg:w-72 xl:w-80">
              <FilterSidebar
                filters={filters}
                cities={cities}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
              />
            </aside>
            
            {/* Main content */}
            <main className="flex-1 max-w-full lg:max-w-[calc(100%-20rem)] xl:max-w-[calc(100%-22rem)]">
              {isLoading ? (
                <div className="space-y-6 animate-pulse">
                  {/* Skeleton loading for list header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="h-8 bg-slate-200 rounded w-48 hidden sm:block"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="h-4 bg-slate-200 rounded w-40"></div>
                    </div>
                  </div>
                  
                  {/* Skeleton loading for university cards */}
                  <div className="flex flex-col gap-4 sm:gap-6">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="w-full border rounded-lg shadow-sm overflow-hidden bg-white">
                        <div className="flex flex-col md:flex-row md:min-h-[260px]">
                          {/* Logo skeleton */}
                          <div className="relative md:w-1/3 h-40 md:h-auto bg-slate-200"></div>
                          
                          {/* Content skeleton */}
                          <div className="p-3 md:p-4 md:w-2/3">
                            <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/3 mb-3"></div>
                            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-2/3 mb-4"></div>
                            
                            <div className="flex gap-2 mb-4">
                              <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                              <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                            </div>
                            
                            <div className="border-t pt-4 mt-4 flex justify-between">
                              <div className="flex gap-2">
                                <div className="h-10 bg-slate-200 rounded w-16"></div>
                                <div className="h-10 bg-slate-200 rounded w-16"></div>
                              </div>
                              <div className="h-10 bg-slate-200 rounded w-28"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <UniversityList
                  universities={universities}
                  filters={filters}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add default export for backward compatibility
export default UniversityPage 