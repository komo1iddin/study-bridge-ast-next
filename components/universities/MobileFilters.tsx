'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Filter } from 'lucide-react'
import FilterSidebar from './FilterSidebar'
import type { Filters } from './data'

interface MobileFiltersProps {
  filters: Filters
  cities: string[]
  onFilterChange: (key: keyof Filters, value: string) => void
  onResetFilters: () => void
}

const MobileFilters = ({ filters, cities, onFilterChange, onResetFilters }: MobileFiltersProps) => {
  const [open, setOpen] = React.useState(false)
  const t = useTranslations('universities')

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
          <Filter className="mr-2 h-4 w-4" />
          {t('filters.title')}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>{t('filters.title')}</SheetTitle>
        </SheetHeader>
        <FilterSidebar 
          filters={filters}
          cities={cities}
          onFilterChange={(key, value) => {
            onFilterChange(key, value)
            // Don't close the sheet on filter change
          }}
          onResetFilters={() => {
            onResetFilters()
            // Don't close the sheet on reset
          }}
        />
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilters 