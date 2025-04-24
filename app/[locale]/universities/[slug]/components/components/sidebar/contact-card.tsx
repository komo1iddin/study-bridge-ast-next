"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail, Phone } from "lucide-react"
import type { University } from "@/components/universities/data"

interface ContactCardProps {
  university: University
  t: any
  lang: string
}

export function ContactCard({ university, t, lang }: ContactCardProps) {
  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardContent className="p-5">
        <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
        
        <div className="space-y-3">
          {university.city && (
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-1">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-800">{university.city}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-1">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <a 
                href={`mailto:info@${university.name.toLowerCase().replace(/\s+/g, '')}.edu`} 
                className="text-blue-600 hover:underline"
              >
                info@{university.name.toLowerCase().replace(/\s+/g, '')}.edu
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-1">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 