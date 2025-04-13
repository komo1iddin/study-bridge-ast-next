"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Award, Globe, MapPin, Trophy, Calendar } from "lucide-react"
import type { University } from "@/components/universities/data"

interface OverviewSectionProps {
  university: University
  lang: string
}

export function OverviewSection({ university, lang }: OverviewSectionProps) {
  // Get localized content if available
  const description = typeof university.description === 'object' 
    ? university.description[lang] || university.description['en'] 
    : university.description;

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">University Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-slate-700 leading-relaxed">
              {description}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {university.foundedYear && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Founded</h3>
                  <p className="font-semibold text-slate-800">{university.foundedYear}</p>
                </div>
              </div>
            )}

            {university.ranking && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
                <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Ranking</h3>
                  <p className="font-semibold text-slate-800">#{university.ranking}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
              <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
                <Globe className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Location</h3>
                <p className="font-semibold text-slate-800">{university.city}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Information Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Key Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Location</h3>
                <p className="font-semibold text-slate-800">{university.city}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
              <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                <Trophy className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Ranking</h3>
                <p className="font-semibold text-slate-800">Top 86 in Asia</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
              <div className="flex-shrink-0 bg-emerald-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500">Academic Year</h3>
                <p className="font-semibold text-slate-800">September - June</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 