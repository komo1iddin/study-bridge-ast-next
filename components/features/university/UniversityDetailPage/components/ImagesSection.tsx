"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { University } from "@/components/universities/data"

interface ImagesSectionProps {
  university: University
  lang: string
}

export function ImagesSection({ university, lang }: ImagesSectionProps) {
  // State for the lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Mock gallery data - in a real app, this would come from the API
  const galleryCategories = [
    {
      id: "campus",
      name: "Campus",
      images: [
        {
          src: "https://images.unsplash.com/photo-1576495169018-bd2414046c6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          alt: "University main building",
          width: 800,
          height: 600
        },
        {
          src: "https://images.unsplash.com/photo-1612761327123-ff1c2ffcca1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          alt: "University library",
          width: 800,
          height: 600
        },
        {
          src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          alt: "University garden",
          width: 800,
          height: 600
        },
        {
          src: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          alt: "University entrance",
          width: 800,
          height: 600
        }
      ]
    },
    {
      id: "facilities",
      name: "Facilities",
      images: [
        {
          src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          alt: "University sports center",
          width: 800,
          height: 600
        },
        {
          src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          alt: "University cafeteria",
          width: 800,
          height: 600
        },
        {
          src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          alt: "University computer lab",
          width: 800,
          height: 600
        }
      ]
    },
    {
      id: "students",
      name: "Student Life",
      images: [
        {
          src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          alt: "Students studying",
          width: 800,
          height: 600
        },
        {
          src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          alt: "Students in a workshop",
          width: 800,
          height: 600
        }
      ]
    }
  ];

  // Combined array of all images for the lightbox
  const allImages = galleryCategories.flatMap(category => category.images)
  
  // Handle image click to open lightbox
  const openLightbox = (categoryIndex: number, imageIndex: number) => {
    // Calculate the absolute index in the flattened array
    let absoluteIndex = 0
    for (let i = 0; i < categoryIndex; i++) {
      absoluteIndex += galleryCategories[i].images.length
    }
    absoluteIndex += imageIndex
    
    setCurrentImageIndex(absoluteIndex)
    setLightboxOpen(true)
  }
  
  // Navigation functions for lightbox
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    )
  }
  
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">University Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="campus" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {galleryCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {galleryCategories.map((category, categoryIndex) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.images.map((image, imageIndex) => (
                    <div 
                      key={imageIndex} 
                      className="aspect-video relative overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openLightbox(categoryIndex, imageIndex)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-screen-lg p-0 border-none bg-transparent">
          <div className="relative">
            <button 
              onClick={() => setLightboxOpen(false)} 
              className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-xl">
              {allImages[currentImageIndex] && (
                <Image
                  src={allImages[currentImageIndex].src}
                  alt={allImages[currentImageIndex].alt}
                  fill
                  className="object-contain bg-black/90"
                />
              )}
            </div>
            
            <button 
              onClick={goToPrevious} 
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={goToNext} 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 