"use client"

import { useState } from "react"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { HeroSection } from "@/components/programs/hero-section"
import { Filters } from "@/components/programs/filters"
import { FeaturedPrograms, Program } from "@/components/programs/featured-programs"
import { Categories } from "@/components/programs/categories"
import { AllPrograms } from "@/components/programs/all-programs"
import { ApplicationProcess } from "@/components/programs/application-process"
import { CtaSection } from "@/components/programs/cta-section"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "programs.meta" })
  
  return {
    title: t("title"),
    description: t("description"),
  }
}

// Sample program data
const programs = [
  {
    id: "business-management",
    title: "Biznes boshqaruvi",
    university: "Shanghai Jiao Tong University",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    category: "business",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: "computer-science",
    title: "Kompyuter fanlari",
    university: "Tsinghua University",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    category: "it",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: "medicine",
    title: "Tibbiyot",
    university: "Peking University",
    level: "Bakalavr",
    duration: "5 yil",
    language: "Ingliz",
    category: "medicine",
    scholarship: false,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "civil-engineering",
    title: "Fuqarolik muhandisligi",
    university: "Zhejiang University",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    category: "engineering",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "finance",
    title: "Moliya",
    university: "Fudan University",
    level: "Magistr",
    duration: "2 yil",
    language: "Ingliz",
    category: "business",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: true,
  },
  {
    id: "artificial-intelligence",
    title: "Sun'iy intellekt",
    university: "Nanjing University",
    level: "Magistr",
    duration: "2 yil",
    language: "Ingliz",
    category: "it",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "traditional-chinese-medicine",
    title: "An'anaviy xitoy tibbiyoti",
    university: "Shanghai University of TCM",
    level: "Bakalavr",
    duration: "5 yil",
    language: "Xitoy",
    category: "medicine",
    scholarship: true,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
  {
    id: "mechanical-engineering",
    title: "Mexanika muhandisligi",
    university: "Harbin Institute of Technology",
    level: "Bakalavr",
    duration: "4 yil",
    language: "Ingliz",
    category: "engineering",
    scholarship: false,
    image: "/placeholder.svg?height=300&width=400",
    featured: false,
  },
]

export default function ProgramsPage() {
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
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
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
      </main>

      <Footer />
    </div>
  )
}
