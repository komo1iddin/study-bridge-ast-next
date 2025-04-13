"use client"

import { useState } from "react"

import { HeroSection } from "@/components/programs/hero-section"
import { Filters } from "@/components/programs/filters"
import { FeaturedPrograms } from "@/components/programs/featured-programs"
import { Categories } from "@/components/programs/categories"
import { AllPrograms } from "@/components/programs/all-programs"
import { ApplicationProcess } from "@/components/programs/application-process"
import { CtaSection } from "@/components/programs/cta-section"
import { Program } from "@/app/[locale]/programs/page"

interface ProgramsContentProps {
  programs: Program[]
}

export function ProgramsContent({ programs }: ProgramsContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  
  // Filter programs based on search query and filters
  const filteredPrograms = programs.filter((program) => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.university.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Category filter
    const matchesCategory = selectedCategory === "all" || program.category === selectedCategory
    
    // Level filter
    const matchesLevel = selectedLevel === "all" || 
      program.level.toLowerCase() === selectedLevel.toLowerCase()
    
    // Language filter
    const matchesLanguage = selectedLanguage === "all" || 
      (selectedLanguage === "english" && program.language === "Ingliz") ||
      (selectedLanguage === "chinese" && program.language === "Xitoy")
    
    return matchesSearch && matchesCategory && matchesLevel && matchesLanguage
  })
  
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Filters Section */}
      <Filters 
        onSearch={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onLevelChange={setSelectedLevel}
        onLanguageChange={setSelectedLanguage}
      />
      
      {/* Featured Programs Section */}
      <FeaturedPrograms programs={programs} />
      
      {/* Categories Section */}
      <Categories />
      
      {/* All Programs Section */}
      <AllPrograms programs={programs} filteredPrograms={filteredPrograms} />
      
      {/* Application Process Section */}
      <ApplicationProcess />
      
      {/* CTA Section */}
      <CtaSection />
    </>
  )
} 