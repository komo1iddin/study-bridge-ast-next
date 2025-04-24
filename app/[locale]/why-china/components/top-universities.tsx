"use client"

import { useTranslations } from "next-intl"
import { LucideIcon, BookOpen, Globe, Award, GraduationCap } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface TopUniversitiesProps {
  className?: string
}

interface University {
  name: string
  worldRanking: string
  location: string
  slug?: string
}

export function TopUniversities({ className }: TopUniversitiesProps) {
  const t = useTranslations("pages.whyChina")
  
  // Sample university data (would usually come from API/CMS)
  const universities: University[] = [
    {
      name: "Tsinghua University",
      worldRanking: "#25",
      location: "Beijing",
      slug: "tsinghua-university"
    },
    {
      name: "Peking University",
      worldRanking: "#34",
      location: "Beijing",
      slug: "peking-university"
    },
    {
      name: "Fudan University",
      worldRanking: "#51",
      location: "Shanghai",
      slug: "fudan-university"
    },
    {
      name: "Shanghai Jiao Tong University",
      worldRanking: "#62",
      location: "Shanghai",
      slug: "shanghai-jiao-tong-university"
    },
    {
      name: "Zhejiang University",
      worldRanking: "#67",
      location: "Hangzhou",
      slug: "zhejiang-university"
    }
  ]

  return (
    <section className={`w-full py-12 md:py-24 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("topUniversities.title")}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            {t("topUniversities.subtitle")}
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("topUniversities.columns.university")}</TableHead>
                <TableHead>{t("topUniversities.columns.worldRanking")}</TableHead>
                <TableHead>{t("topUniversities.columns.location")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {universities.map((university, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {university.slug ? (
                      <Link href={`/universities/${university.slug}`} className="text-blue-600 hover:underline">
                        {university.name}
                      </Link>
                    ) : (
                      university.name
                    )}
                  </TableCell>
                  <TableCell>{university.worldRanking}</TableCell>
                  <TableCell>{university.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link href="/universities">
              {t("topUniversities.viewAll")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
} 