'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { educationTypes, rankingRanges, type Filters } from './data'

interface FilterSidebarProps {
  filters: Filters
  cities: string[]
  onFilterChange: (key: keyof Filters, value: string) => void
  onResetFilters: () => void
}

const FilterSidebar = ({ filters, cities, onFilterChange, onResetFilters }: FilterSidebarProps) => {
  const t = useTranslations('universities')

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">{t('filters.title')}</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-xs"
          onClick={onResetFilters}
        >
          {t('filters.reset')}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Education Type */}
        <div className="space-y-2">
          <Label htmlFor="educationType">{t('filters.educationType')}</Label>
          <Select 
            value={filters.educationType} 
            onValueChange={(value) => onFilterChange('educationType', value)}
          >
            <SelectTrigger id="educationType">
              <SelectValue placeholder={t('filters.all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters.all')}</SelectItem>
              {educationTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">{t('filters.city')}</Label>
          <Select 
            value={filters.city} 
            onValueChange={(value) => onFilterChange('city', value)}
          >
            <SelectTrigger id="city">
              <SelectValue placeholder={t('filters.all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters.all')}</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ranking */}
        <div className="space-y-2">
          <Label htmlFor="ranking">{t('filters.ranking')}</Label>
          <Select 
            value={filters.ranking} 
            onValueChange={(value) => onFilterChange('ranking', value)}
          >
            <SelectTrigger id="ranking">
              <SelectValue placeholder={t('filters.all')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('filters.all')}</SelectItem>
              {rankingRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grants */}
        <div className="flex items-center justify-between">
          <Label htmlFor="grants" className="cursor-pointer">
            {t('filters.hasGrants')}
          </Label>
          <Switch 
            id="grants" 
            checked={filters.hasGrants === 'true'}
            onCheckedChange={(checked) => 
              onFilterChange('hasGrants', checked ? 'true' : 'all')
            }
          />
        </div>

        {/* Featured */}
        <div className="flex items-center justify-between">
          <Label htmlFor="featured" className="cursor-pointer">
            {t('filters.featured')}
          </Label>
          <Switch 
            id="featured" 
            checked={filters.featured === 'true'}
            onCheckedChange={(checked) => 
              onFilterChange('featured', checked ? 'true' : 'all')
            }
          />
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">{t('sidebar.needHelp')}</h3>
        <p className="text-xs text-blue-700 mb-3">{t('sidebar.contactUs')}</p>
        <Button size="sm" variant="default" className="w-full bg-blue-600 hover:bg-blue-700">
          {t('sidebar.getConsultation')}
        </Button>
      </div>
    </div>
  )
}

export default FilterSidebar 