"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, GraduationCap, Library } from "lucide-react"
import type { University } from "@/components/universities/data"

interface StatsCardProps {
  university: University
  t: any
  lang: string
}

export function StatsCard({ university, t, lang }: StatsCardProps) {
  // Stats data to match the image
  const stats = [
    {
      key: "internationalStudents",
      label: "Xalqaro talabalar",
      value: "20%",
      icon: Users
    },
    {
      key: "acceptanceRate",
      label: "Qabul darajasi",
      value: "65%",
      icon: GraduationCap
    },
    {
      key: "graduationRate",
      label: "Bitirish darajasi",
      value: "94%",
      icon: Award
    },
    {
      key: "facultyStudentRatio",
      label: "O'qituvchi-talaba nisbati",
      value: "1:12",
      icon: Library
    }
  ];

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="border-b p-4">
          <h3 className="font-semibold text-lg text-slate-800">Universitet statistikasi</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.key} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <stat.icon className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-slate-600">{stat.label}</span>
                </div>
                <div className="font-semibold text-slate-900">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 