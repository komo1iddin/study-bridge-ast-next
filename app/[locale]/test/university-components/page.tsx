"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Import section components
import { HeaderCard } from '@/app/[locale]/universities/[slug]/components/components/header-card'
import { OverviewSection } from '@/app/[locale]/universities/[slug]/components/components/overview-section'
import { ProgramsSection } from '@/app/[locale]/universities/[slug]/components/components/programs-section'
import { AdmissionSection } from '@/app/[locale]/universities/[slug]/components/components/admission-section'
import { FacilitiesSection } from '@/app/[locale]/universities/[slug]/components/components/facilities-section'
import { ImagesSection } from '@/app/[locale]/universities/[slug]/components/components/images-section'
import { DormsSection } from '@/app/[locale]/universities/[slug]/components/components/dorms-section'
import { FAQSection } from '@/app/[locale]/universities/[slug]/components/components/faq-section'
import { BackgroundDecoration } from '@/app/[locale]/universities/[slug]/components/components/background-decoration'

// Import sidebar components
import { ApplicationCard } from '@/app/[locale]/universities/[slug]/components/components/sidebar/application-card'
import { StatsCard } from '@/app/[locale]/universities/[slug]/components/components/sidebar/stats-card'
import { ContactCard } from '@/app/[locale]/universities/[slug]/components/components/sidebar/contact-card'

// Mock university data for testing
const mockUniversity = {
  id: "1",
  name: "Beijing University of Technology",
  logo: "/universities/beijing-tech.png",
  image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  city: "Beijing",
  description: "Beijing University of Technology is a comprehensive research university located in the capital of China. It offers various undergraduate and graduate programs focusing on engineering, science, economics, management, humanities, law, and education.",
  educationType: ["Bachelor", "Master", "PhD"],
  hasGrants: true,
  featured: true,
  ranking: 25,
  foundedYear: 1960,
  studentsCount: 25000,
  internationalStudents: 2500
}

export default function TestUniversityComponents() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeComponent, setActiveComponent] = useState("all")
  
  const t = useTranslations('university-detail')

  // Function to handle tab changes for the HeaderCard component
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  // Available components for testing
  const components = [
    { value: "all", label: "Full Page" },
    { value: "header", label: "Header Card" },
    { value: "overview", label: "Overview Section" },
    { value: "programs", label: "Programs Section" },
    { value: "admission", label: "Admission Section" },
    { value: "facilities", label: "Facilities Section" },
    { value: "images", label: "Images Section" },
    { value: "dorms", label: "Dormitories Section" },
    { value: "faq", label: "FAQ Section" },
    { value: "application", label: "Application Card" },
    { value: "stats", label: "Stats Card" },
    { value: "contact", label: "Contact Card" }
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 relative">
      <BackgroundDecoration />
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8 relative z-10">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>University Component Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-64">
                <Select value={activeComponent} onValueChange={setActiveComponent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select component to test" />
                  </SelectTrigger>
                  <SelectContent>
                    {components.map((component) => (
                      <SelectItem key={component.value} value={component.value}>
                        {component.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Individual Component Test Sections */}
        {activeComponent === "all" && (
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
              <HeaderCard 
                university={mockUniversity}
                activeTab={activeTab}
                lang="en"
                t={t}
                onTabChange={handleTabChange}
              />

              {/* Render active section content */}
              {activeTab === "overview" && (
                <OverviewSection university={mockUniversity} lang="en" />
              )}
              {activeTab === "programs" && (
                <ProgramsSection university={mockUniversity} lang="en" />
              )}
              {activeTab === "admission" && (
                <AdmissionSection university={mockUniversity} lang="en" />
              )}
              {activeTab === "facilities" && (
                <FacilitiesSection university={mockUniversity} lang="en" />
              )}
              {activeTab === "images" && (
                <ImagesSection university={mockUniversity} lang="en" />
              )}
              {activeTab === "dorms" && (
                <DormsSection university={mockUniversity} lang="en" />
              )}
              {activeTab === "faq" && (
                <FAQSection university={mockUniversity} lang="en" />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              <ApplicationCard university={mockUniversity} t={t} lang="en" />
              <StatsCard university={mockUniversity} t={t} lang="en" />
              <ContactCard university={mockUniversity} t={t} lang="en" />
              
              {/* Button to view gallery */}
              <Button 
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => handleTabChange("images")}
              >
                {t('viewGallery')}
              </Button>
            </div>
          </div>
        )}
        
        {activeComponent === "header" && (
          <HeaderCard 
            university={mockUniversity}
            activeTab={activeTab}
            lang="en"
            t={t}
            onTabChange={handleTabChange}
          />
        )}
        
        {activeComponent === "overview" && (
          <OverviewSection university={mockUniversity} lang="en" />
        )}
        
        {activeComponent === "programs" && (
          <ProgramsSection university={mockUniversity} lang="en" />
        )}
        
        {activeComponent === "admission" && (
          <AdmissionSection university={mockUniversity} lang="en" />
        )}
        
        {activeComponent === "facilities" && (
          <FacilitiesSection university={mockUniversity} lang="en" />
        )}
        
        {activeComponent === "images" && (
          <ImagesSection university={mockUniversity} lang="en" />
        )}
        
        {activeComponent === "dorms" && (
          <DormsSection university={mockUniversity} lang="en" />
        )}
        
        {activeComponent === "faq" && (
          <FAQSection university={mockUniversity} lang="en" />
        )}
        
        {activeComponent === "application" && (
          <div className="max-w-sm mx-auto">
            <ApplicationCard university={mockUniversity} t={t} lang="en" />
          </div>
        )}
        
        {activeComponent === "stats" && (
          <div className="max-w-sm mx-auto">
            <StatsCard university={mockUniversity} t={t} lang="en" />
          </div>
        )}
        
        {activeComponent === "contact" && (
          <div className="max-w-sm mx-auto">
            <ContactCard university={mockUniversity} t={t} lang="en" />
          </div>
        )}
      </div>
    </div>
  )
} 