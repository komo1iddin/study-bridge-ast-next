"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GraduationCap, Info } from "lucide-react"
import type { University } from "@/components/universities/data"

interface ProgramsSectionProps {
  university: University
  lang: string
}

export function ProgramsSection({ university, lang }: ProgramsSectionProps) {
  // Mock programs data - in a real app, this would come from the API
  const programs = [
    "Civil Engineering",
    "Computer Science and Technology",
    "Business Administration",
    "Architecture",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Chemical Engineering",
    "Biotechnology"
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-slate-800">Academic Programs</CardTitle>
        <CardDescription>Available programs and specializations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div className="grid gap-4 md:grid-cols-2">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100"
            >
              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">{program}</h3>
                <p className="text-slate-600 text-sm mt-1">
                  Bachelor's, Master's, and PhD programs available
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">Program Information</h3>
              <p className="text-slate-600 mt-1 text-sm">
                For detailed program information, curriculum, and credit requirements, please contact the university directly.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 