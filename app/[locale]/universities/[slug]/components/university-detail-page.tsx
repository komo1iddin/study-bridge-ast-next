"use client"

import { useState, useEffect } from "react"
import { Home } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import type { University } from "@/components/universities/data"

// Import section components
import { HeaderCard } from "./components/header-card"
import { OverviewSection } from "./components/overview-section"
import { ProgramsSection } from "./components/programs-section"
import { AdmissionSection } from "./components/admission-section"
import { FacilitiesSection } from "./components/facilities-section"
import { ImagesSection } from "./components/images-section"
import { DormsSection } from "./components/dorms-section"
import { FAQSection } from "./components/faq-section"
import { BackgroundDecoration } from "./components/background-decoration"

// Import sidebar components
import { ApplicationCard } from "./components/sidebar/application-card"
import { StatsCard } from "./components/sidebar/stats-card"
import { ContactCard } from "./components/sidebar/contact-card"

interface UniversityDetailPageProps {
  university: University
  lang?: string
}

// Define valid tabs as a constant
const VALID_TABS = ["overview", "programs", "admission", "facilities", "images", "dorms", "faq"]

export function UniversityDetailPage({ university, lang = "en" }: UniversityDetailPageProps) {
  // Get translations
  const t = useTranslations("university-detail")
  const searchParams = useSearchParams()
  
  // State
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  
  // Check URL for active tab on mount and when search params change
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const tabName = hash.replace("#", "")
      if (isValidTab(tabName)) {
        setActiveTab(tabName)
      }
    }
    setIsLoading(false)
  }, [searchParams])
  
  // Validate tab name
  const isValidTab = (tab: string): boolean => {
    return VALID_TABS.includes(tab)
  }
  
  // Tab change handler
  const handleTabChange = (tab: string) => {
    if (isValidTab(tab)) {
      setActiveTab(tab)
      
      // Update URL hash for shareable links
      window.location.hash = tab
    }
  }
  
  // Helper function to navigate to images tab
  const showImages = () => {
    handleTabChange("images")
  }
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-blue-200 rounded w-3/4 mx-auto"></div>
            <div className="h-10 bg-blue-200 rounded w-1/2 mx-auto"></div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded"></div>
              <div className="h-3 bg-slate-200 rounded w-5/6"></div>
              <div className="h-3 bg-slate-200 rounded w-4/6"></div>
            </div>
            <div className="text-blue-600 font-medium">{t('loading')}</div>
          </div>
        </div>
      </div>
    )
  }
  
  // Check if university data is valid
  const isUniversityValid = Boolean(university && university.id && university.name)
  
  if (!isUniversityValid) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-destructive font-medium">{t('error')}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 relative overflow-hidden">
      <BackgroundDecoration />

      <div className="w-full max-w-7xl mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap pb-2">
          <Home className="h-3.5 w-3.5 flex-shrink-0" />
          <span>/</span>
          <span>{t('breadcrumb.universities')}</span>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate">{university.name}</span>
        </div>

        <main className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            <HeaderCard 
              university={university}
              activeTab={activeTab}
              lang={lang}
              t={t}
              onTabChange={handleTabChange}
            />

            {/* Render active section content */}
            {activeTab === "overview" && (
              <OverviewSection university={university} lang={lang} />
            )}
            {activeTab === "programs" && (
              <ProgramsSection university={university} lang={lang} />
            )}
            {activeTab === "admission" && (
              <AdmissionSection university={university} lang={lang} />
            )}
            {activeTab === "facilities" && (
              <FacilitiesSection university={university} lang={lang} />
            )}
            {activeTab === "images" && (
              <ImagesSection university={university} lang={lang} />
            )}
            {activeTab === "dorms" && (
              <DormsSection university={university} lang={lang} />
            )}
            {activeTab === "faq" && (
              <FAQSection university={university} lang={lang} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <ApplicationCard university={university} t={t} lang={lang} />
            <StatsCard university={university} t={t} lang={lang} />
            <ContactCard university={university} t={t} lang={lang} />
            
            {/* Button to view gallery */}
            <button 
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={showImages}
            >
              {t('viewGallery')}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
} 