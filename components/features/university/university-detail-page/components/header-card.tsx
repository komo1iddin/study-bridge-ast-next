"use client"

import { MapPin, Users, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { University } from "@/components/universities/data"

interface HeaderCardProps {
  university: University
  activeTab: string
  lang: string
  t: any
  onTabChange: (tab: string) => void
}

export function HeaderCard({ university, activeTab, lang, t, onTabChange }: HeaderCardProps) {
  // Get localized content
  const description = typeof university.description === 'object' 
    ? university.description[lang] || university.description['en'] 
    : university.description;

  const students = typeof university.studentsCount === 'object'
    ? university.studentsCount[lang] || (university.studentsCount as any).en
    : university.studentsCount;

  // Define tabs using translations
  const tabs = [
    { value: "overview", label: t('tabs.overview') },
    { value: "programs", label: t('tabs.programs') },
    { value: "admission", label: t('tabs.admission') },
    { value: "facilities", label: t('tabs.facilities') },
    { value: "images", label: t('tabs.images') },
    { value: "dorms", label: t('tabs.dorms') },
    { value: "faq", label: t('tabs.faq') }
  ];

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 md:p-8 text-white relative">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {university.featured && (
              <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                {t('badges.featured')}
              </span>
            )}
            {university.hasGrants && (
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                {t('badges.grantsAvailable')}
              </span>
            )}
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              {t('badges.rank').replace('{rank}', String(university.ranking || 'N/A'))}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold">{university.name}</h1>
            <p className="text-white/80 mt-2 text-base">
              {description}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-3">
              {university.educationType && university.educationType.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {university.educationType.map((type, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center rounded-full bg-indigo-50/10 border border-white/20 px-2.5 py-0.5 text-xs font-medium text-white"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-4 text-base">
              {students && (
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5" />
                  <span>{students} {t('students')}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5" />
                <span>{university.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="p-0">
        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <div className="p-2 bg-slate-100">
            <Select defaultValue={activeTab} onValueChange={onTabChange}>
              <SelectTrigger className="w-full bg-white border border-slate-200 rounded-md shadow-sm focus:outline-none text-slate-800 font-medium">
                <SelectValue placeholder={t('selectSection')} />
              </SelectTrigger>
              <SelectContent>
                {tabs.map((tab) => (
                  <SelectItem key={tab.value} value={tab.value}>
                    {tab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:block">
          <Tabs 
            value={activeTab} 
            onValueChange={onTabChange}
            className="w-full"
          >
            <TabsList className="flex bg-slate-100 rounded-none h-auto p-0 w-full">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="py-3 px-4 rounded-none flex-1 text-center whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-slate-600 data-[state=active]:font-medium data-[state=inactive]:text-slate-600 data-[state=inactive]:hover:bg-slate-50"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
} 