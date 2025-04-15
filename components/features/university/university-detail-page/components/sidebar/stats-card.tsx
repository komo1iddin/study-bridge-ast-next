"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, GraduationCap, Library, BookOpen } from "lucide-react"
import type { University } from "@/components/universities/data"

interface StatsCardProps {
  university: University
  t: any
  lang: string
}

export function StatsCard({ university, t, lang }: StatsCardProps) {
  // Basic stats that are always shown
  const baseStats = [
    {
      key: "internationalStudents",
      label: t?.stats?.internationalStudents || "International Students",
      value: university.internationalStudents ? university.internationalStudents.toString() : "N/A",
      icon: Users
    },
    {
      key: "students",
      label: t?.stats?.totalStudents || "Total Students",
      value: university.studentsCount ? university.studentsCount.toString() : "N/A",
      icon: GraduationCap
    },
    {
      key: "ranking",
      label: t?.stats?.ranking || "Ranking",
      value: university.ranking ? `#${university.ranking}` : "N/A",
      icon: Award
    }
  ];
  
  // Add faculties count if available
  let stats = [...baseStats];
  
  if (university.faculties && university.faculties.length > 0) {
    stats.push({
      key: "faculties",
      label: t?.stats?.faculties || "Faculties",
      value: university.faculties.length.toString(),
      icon: BookOpen
    });
  } else {
    // Default stat if no faculties
    stats.push({
      key: "foundedYear",
      label: t?.stats?.founded || "Founded",
      value: university.foundedYear ? university.foundedYear.toString() : "N/A",
      icon: Library
    });
  }

  return (
    <Card className="border-none shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div className="border-b p-4">
          <h3 className="font-semibold text-lg text-slate-800">
            {t?.stats?.title || "University Statistics"}
          </h3>
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