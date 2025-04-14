"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Bed, Wifi, ShowerHead, Utensils, Lock } from "lucide-react"
import type { University } from "@/components/universities/data"

interface DormsSectionProps {
  university: University
  lang: string
}

export function DormsSection({ university, lang }: DormsSectionProps) {
  // Mock dormitory data
  const dormCategories = [
    {
      id: "international",
      name: "International Dorms",
      dorms: [
        {
          id: "international-1",
          name: "International Student Hall 1",
          description: "Modern accommodation specifically designed for international students, featuring single and double rooms with private bathrooms.",
          image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          features: [
            { icon: Bed, name: "Single & Double Rooms" },
            { icon: Wifi, name: "High-Speed WiFi" },
            { icon: ShowerHead, name: "Private Bathrooms" },
            { icon: Utensils, name: "Shared Kitchen" },
            { icon: Lock, name: "24/7 Security" }
          ],
          price: "$1,500 - $2,200 per semester"
        },
        {
          id: "international-2",
          name: "Global Village Residences",
          description: "Apartment-style living with 2-4 bedroom units, designed to promote cultural exchange among international students.",
          image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          features: [
            { icon: Bed, name: "2-4 Bedroom Apartments" },
            { icon: Wifi, name: "High-Speed WiFi" },
            { icon: ShowerHead, name: "Shared Bathrooms" },
            { icon: Utensils, name: "Full Kitchen" },
            { icon: Lock, name: "Card Access Control" }
          ],
          price: "$1,800 - $2,500 per semester"
        }
      ]
    },
    {
      id: "graduate",
      name: "Graduate Housing",
      dorms: [
        {
          id: "graduate-1",
          name: "Graduate Towers",
          description: "Premium accommodation for graduate students, offering quiet study environments and networking opportunities.",
          image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          features: [
            { icon: Bed, name: "Studio & 1-Bedroom" },
            { icon: Wifi, name: "High-Speed WiFi" },
            { icon: ShowerHead, name: "Private Bathrooms" },
            { icon: Utensils, name: "Kitchenette" },
            { icon: Lock, name: "Biometric Security" }
          ],
          price: "$2,200 - $3,000 per semester"
        }
      ]
    },
    {
      id: "offcampus",
      name: "Off-Campus Options",
      dorms: [
        {
          id: "offcampus-1",
          name: "University-Affiliated Apartments",
          description: "Off-campus apartments managed by the university, located within walking distance or with shuttle service to campus.",
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          features: [
            { icon: Bed, name: "Various Room Options" },
            { icon: Wifi, name: "Internet Available" },
            { icon: ShowerHead, name: "Private Bathrooms" },
            { icon: Utensils, name: "Full Kitchen" },
            { icon: Lock, name: "Building Security" }
          ],
          price: "$1,200 - $2,000 per semester"
        },
        {
          id: "offcampus-2",
          name: "Private Rentals",
          description: "University housing office can assist with finding private rentals in the surrounding area that meet student needs.",
          image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          features: [
            { icon: Bed, name: "Various Options" },
            { icon: Wifi, name: "Setup Required" },
            { icon: ShowerHead, name: "Varies by Property" },
            { icon: Utensils, name: "Usually Available" },
            { icon: Lock, name: "Varies by Property" }
          ],
          price: "$800 - $1,800 per semester"
        }
      ]
    }
  ];

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Accommodation Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <p className="text-slate-600">
            {university.name} offers various accommodation options to suit different needs and preferences.
            All university dormitories include basic furniture, utilities, and internet access.
          </p>
        </div>

        <Tabs defaultValue="international" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {dormCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {dormCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              {category.dorms.map((dorm) => (
                <div key={dorm.id} className="bg-slate-50 rounded-lg overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="h-64 relative">
                      <Image
                        src={dorm.image}
                        alt={dorm.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-slate-900">{dorm.name}</h3>
                      <p className="mt-2 mb-4 text-slate-600">{dorm.description}</p>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {dorm.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <feature.icon className="h-4 w-4 text-blue-500" />
                            <span>{feature.name}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-500">Price Range:</span>
                          <span className="font-medium text-blue-600">{dorm.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
} 