"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Book, Dumbbell, Coffee, Wifi, Laptop, Home } from "lucide-react"
import type { University } from "@/components/universities/data"

interface FacilitiesSectionProps {
  university: University
  lang: string
}

export function FacilitiesSection({ university, lang }: FacilitiesSectionProps) {
  // Mock facilities data
  const facilitiesCategories = [
    {
      id: "academic",
      name: "Academic",
      icon: Book,
      facilities: [
        {
          id: "library",
          name: "University Library",
          description: "Our library houses over 1 million books and provides access to thousands of digital resources. Open 24/7 with study spaces and computer labs.",
          image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "labs",
          name: "Research Laboratories",
          description: "State-of-the-art research labs equipped with the latest technology for scientific research and experimentation.",
          image: "https://images.unsplash.com/photo-1581093458791-9fab4145a7f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "classrooms",
          name: "Modern Classrooms",
          description: "Spacious, air-conditioned classrooms equipped with multimedia facilities and interactive whiteboards.",
          image: "https://images.unsplash.com/photo-1555116505-38ab61800975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: "recreational",
      name: "Recreational",
      icon: Dumbbell,
      facilities: [
        {
          id: "gym",
          name: "Sports Complex",
          description: "Our sports complex includes a modern gym, swimming pool, indoor courts for basketball, volleyball, and badminton, and outdoor fields for football and tennis.",
          image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "student-center",
          name: "Student Center",
          description: "A hub for student activities, featuring spaces for club meetings, events, and relaxation.",
          image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    },
    {
      id: "amenities",
      name: "Amenities",
      icon: Coffee,
      facilities: [
        {
          id: "cafeteria",
          name: "Dining Facilities",
          description: "Multiple cafeterias and cafes across campus offering a variety of local and international cuisine at affordable prices.",
          image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "wifi",
          name: "Campus-wide WiFi",
          description: "High-speed internet access throughout the campus, available to all students and staff.",
          image: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
          id: "medical",
          name: "Health Center",
          description: "On-campus medical facility providing basic healthcare services and emergency care to students and staff.",
          image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Campus Facilities</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {facilitiesCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                <category.icon className="h-4 w-4" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {facilitiesCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid gap-6">
                {category.facilities.map((facility) => (
                  <div key={facility.id} className="flex flex-col md:flex-row gap-4 bg-slate-50 p-4 rounded-lg">
                    <div className="md:w-1/3 h-48 md:h-auto relative rounded-md overflow-hidden">
                      <Image
                        src={facility.image}
                        alt={facility.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-lg font-medium text-slate-900">{facility.name}</h3>
                      <p className="mt-2 text-slate-600">{facility.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
} 