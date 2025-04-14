"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  GraduationCap, 
  Building2, 
  UsersRound, 
  Landmark, 
  GraduationCapIcon,
  Trophy,
  Wifi,
  Book,
  Utensils,
  Dumbbell,
  MusicIcon,
  Bed
} from "lucide-react"
import type { University } from "@/components/universities/data"

interface FeaturesSectionProps {
  university: University
  lang: string
}

export function FeaturesSection({ university, lang }: FeaturesSectionProps) {
  // In a real app, these would come from the backend
  const universityFeatures = {
    programs: {
      title: "Academic Programs",
      description: "Diverse range of undergraduate and graduate programs",
      icon: GraduationCap,
      stats: [
        { value: "150+", label: "Undergraduate Programs" },
        { value: "120+", label: "Graduate Programs" },
        { value: "50+", label: "Research Centers" }
      ]
    },
    campus: {
      title: "Campus Facilities",
      description: "Modern campus with state-of-the-art facilities",
      icon: Building2,
      list: [
        { icon: Wifi, label: "Campus-wide WiFi" },
        { icon: Book, label: "Modern Libraries" },
        { icon: Utensils, label: "Dining Facilities" },
        { icon: Dumbbell, label: "Sports Complexes" },
        { icon: MusicIcon, label: "Cultural Centers" },
        { icon: Bed, label: "Student Housing" }
      ]
    },
    faculty: {
      title: "Faculty & Staff",
      description: "Experienced faculty members and dedicated staff",
      icon: UsersRound,
      stats: [
        { value: "2,500+", label: "Faculty Members" },
        { value: "65%", label: "With Doctoral Degrees" },
        { value: "18:1", label: "Student-Faculty Ratio" }
      ]
    },
    ranking: {
      title: "Rankings & Accreditation",
      description: "Internationally recognized institution",
      icon: Trophy,
      stats: [
        { value: "Top 100", label: "Global University Rankings" },
        { value: "5 Star", label: "QS Rating" },
        { value: "A+", label: "Academic Excellence Rating" }
      ]
    }
  }

  const FeatureCard = ({ feature }: { feature: any }) => {
    const Icon = feature.icon
    
    return (
      <Card className="border-slate-200 transition-all hover:border-primary/60 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-3">
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-slate-800">{feature.title}</CardTitle>
              <CardDescription className="mt-1 text-sm text-slate-600">
                {feature.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {feature.stats && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {feature.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <p className="text-lg font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
          
          {feature.list && (
            <div className="mt-2 grid grid-cols-2 gap-3">
              {feature.list.map((item: any, index: number) => {
                const ItemIcon = item.icon
                return (
                  <div key={index} className="flex items-center gap-2">
                    <ItemIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-slate-700">{item.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Features & Facilities</h2>
        <p className="text-slate-600 mt-1">
          Everything you need to know about what makes this university special
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard feature={universityFeatures.programs} />
        <FeatureCard feature={universityFeatures.campus} />
        <FeatureCard feature={universityFeatures.faculty} />
        <FeatureCard feature={universityFeatures.ranking} />
      </div>

      <div className="mt-8 bg-slate-50 p-5 rounded-lg border border-slate-100">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">About This University</h3>
            <p className="mt-2 text-slate-700">
              Founded in 1965, this university has established itself as a leading institution of higher education with a global reputation for academic excellence, innovative research, and a commitment to producing graduates who make a positive impact on society. The university offers a diverse range of undergraduate and graduate programs across various disciplines, supported by state-of-the-art facilities and a distinguished faculty.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 