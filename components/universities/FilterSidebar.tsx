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
        <h2 className="text-lg font-semibold text-gray-900">{t('filters.title')}</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50/80 text-xs font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
          onClick={onResetFilters}
        >
          {t('filters.reset')}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Education Type */}
        <div className="space-y-2.5">
          <Label htmlFor="educationType" className="text-sm font-medium text-gray-700">{t('filters.educationType')}</Label>
          <Select 
            value={filters.educationType} 
            onValueChange={(value) => onFilterChange('educationType', value)}
          >
            <SelectTrigger id="educationType" className="bg-white border-gray-200 ring-offset-white focus:ring-2 focus:ring-black focus:ring-offset-2">
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
        <div className="space-y-2.5">
          <Label htmlFor="city" className="text-sm font-medium text-gray-700">{t('filters.city')}</Label>
          <Select 
            value={filters.city} 
            onValueChange={(value) => onFilterChange('city', value)}
          >
            <SelectTrigger id="city" className="bg-white border-gray-200 ring-offset-white focus:ring-2 focus:ring-black focus:ring-offset-2">
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
        <div className="space-y-2.5">
          <Label htmlFor="ranking" className="text-sm font-medium text-gray-700">{t('filters.ranking')}</Label>
          <Select 
            value={filters.ranking} 
            onValueChange={(value) => onFilterChange('ranking', value)}
          >
            <SelectTrigger id="ranking" className="bg-white border-gray-200 ring-offset-white focus:ring-2 focus:ring-black focus:ring-offset-2">
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
        <div className="flex items-center justify-between py-1">
          <Label htmlFor="grants" className="cursor-pointer text-sm font-medium text-gray-700">
            {t('filters.hasGrants')}
          </Label>
          <Switch 
            id="grants" 
            checked={filters.hasGrants === 'true'}
            onCheckedChange={(checked) => 
              onFilterChange('hasGrants', checked ? 'true' : 'all')
            }
            className="data-[state=checked]:bg-blue-600 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center justify-between py-1">
          <Label htmlFor="featured" className="cursor-pointer text-sm font-medium text-gray-700">
            {t('filters.featured')}
          </Label>
          <Switch 
            id="featured" 
            checked={filters.featured === 'true'}
            onCheckedChange={(checked) => 
              onFilterChange('featured', checked ? 'true' : 'all')
            }
            className="data-[state=checked]:bg-blue-600 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          />
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">{t('sidebar.needHelp')}</h3>
        <p className="text-xs text-blue-700/90 mb-3">{t('sidebar.contactUs')}</p>
        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-sm font-medium focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
          {t('sidebar.getConsultation')}
        </Button>
      </div>
    </div>
  )
}

export default FilterSidebar 