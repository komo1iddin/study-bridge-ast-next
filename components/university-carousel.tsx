"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin, Award } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { ErrorBoundary } from "./error-boundary"

interface University {
  id: number
  name: string
  location: string
  ranking: string
  image: string
  programs: number
}

const universities: University[] = [
  {
    id: 1,
    name: "Tsinghua University",
    location: "Beijing",
    ranking: "#14 World Ranking",
    image: "/placeholder.svg?height=300&width=400",
    programs: 120,
  },
  {
    id: 2,
    name: "Peking University",
    location: "Beijing",
    ranking: "#16 World Ranking",
    image: "/placeholder.svg?height=300&width=400",
    programs: 110,
  },
  {
    id: 3,
    name: "Fudan University",
    location: "Shanghai",
    ranking: "#31 World Ranking",
    image: "/placeholder.svg?height=300&width=400",
    programs: 95,
  },
  {
    id: 4,
    name: "Shanghai Jiao Tong University",
    location: "Shanghai",
    ranking: "#59 World Ranking",
    image: "/placeholder.svg?height=300&width=400",
    programs: 105,
  },
  {
    id: 5,
    name: "Zhejiang University",
    location: "Hangzhou",
    ranking: "#45 World Ranking",
    image: "/placeholder.svg?height=300&width=400",
    programs: 100,
  },
  {
    id: 6,
    name: "Nanjing University",
    location: "Nanjing",
    ranking: "#122 World Ranking",
    image: "/placeholder.svg?height=300&width=400",
    programs: 85,
  },
]

// Memoized UniversityCard component for better performance
const UniversityCard = memo(({ university }: { university: University }) => {
  return (
    <Card
      className="flex-1 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative h-48">
        <Image
          src={university.image || "/placeholder.svg"}
          alt={`Campus of ${university.name}`}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{university.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
          <span>{university.location}</span>
        </div>
        <div className="flex items-center text-sm text-blue-600 mt-1">
          <Award className="h-4 w-4 mr-1" aria-hidden="true" />
          <span>{university.ranking}</span>
        </div>
        <div className="mt-2 text-sm">{university.programs} programs</div>
      </CardContent>
    </Card>
  );
});

UniversityCard.displayName = "UniversityCard";

const UniversityCarousel = () => {
  const t = useTranslations("home.universities")
  const isMobile = useMobile()
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const itemsPerPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(universities.length / itemsPerPage)

  // Memoize handlers for better performance
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }, [totalPages])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }, [totalPages])

  // Memoize the goToSlide function
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, nextSlide])

  return (
    <ErrorBoundary>
      <div className="relative w-full overflow-hidden" aria-roledescription="carousel">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter">{t("title")}</h2>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevSlide} 
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextSlide} 
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${100 * totalPages}%`,
          }}
          aria-live="polite"
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div 
              key={pageIndex} 
              className="flex gap-4 w-full" 
              style={{ width: `${100 / totalPages}%` }}
              role="group"
              aria-label={`Slide ${pageIndex + 1} of ${totalPages}`}
              aria-hidden={currentIndex !== pageIndex}
            >
              {universities.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage).map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-1" role="tablist">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={currentIndex === index}
              role="tab"
            />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default memo(UniversityCarousel)
