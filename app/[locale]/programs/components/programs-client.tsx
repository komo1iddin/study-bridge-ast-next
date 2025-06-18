"use client"

import { useState } from "react"

import { Filters } from "./filters"
import { FeaturedPrograms, Program } from "./featured-programs"
import { Categories } from "./categories"
import { AllPrograms } from "./all-programs"
import { ApplicationProcess } from "./application-process"
import { CtaSection } from "./cta-section"

interface ProgramsClientProps {
  programs: Program[]
  lang: string
}

export default function ProgramsClient({ programs, lang }: ProgramsClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")

  // Filter programs based on search query and filters
  const filteredPrograms = programs.filter((program) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.university.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory =
      selectedCategory === "all" || program.category === selectedCategory

    // Level filter
    const matchesLevel =
      selectedLevel === "all" ||
      program.level.toLowerCase() === selectedLevel.toLowerCase()

    // Language filter
    const matchesLanguage =
      selectedLanguage === "all" ||
      (selectedLanguage === "english" && program.language === "Ingliz") ||
      (selectedLanguage === "chinese" && program.language === "Xitoy")

    return matchesSearch && matchesCategory && matchesLevel && matchesLanguage
  })

  return (
    <>
      {/* Filters Section */}
      <Filters
        onSearchChange={setSearchQuery}
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
      <CtaSection lang={lang} />
    </>
  )
} 