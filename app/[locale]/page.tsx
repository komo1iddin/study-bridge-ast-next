import { SpeedInsights } from "@vercel/speed-insights/next"
import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { GraduationCap } from "lucide-react"
import { Metadata } from "next"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ClientHeroSection } from "./home/components/hero/client-hero"
import { SuccessPath } from "./home/components/success-path"
import { AdvantagesStudyChina } from "./home/components/advantages-study-china"
import { UniversityFeature } from "./home/components/university-feature/university-feature"
import { OurTeam, OurPartners, HowWeWork, MissionStats, Testimonials, ComparisonStudyBridge, FAQSection } from "./home/components"
import { getContentItems } from '@/lib/decap-cms'
import type { University } from '@/types/content'
import type { UniversityFeatureItem } from './home/components/university-feature/types'
import { SeamlessBackground } from '@/components/common'

export async function generateMetadata(
  { params: propsParams }: { params: { locale: string } }
): Promise<Metadata> {
  const params = await propsParams;
  const t = await getTranslations({ locale: params.locale, namespace: "pages.home" })

  return {
    title: t("metadata.title", { default: "Study in China - Your Trusted Partner" }),
    description: t("metadata.description", { default: "Find the best universities and programs to study in China with expert guidance" })
  }
}

export default async function Home(props: {
  params: { locale: string };
}) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "pages.home" })

  // Fetch universities from CMS
  const cmsUniversities = getContentItems<University>('universities', locale)
  // Map to UniversityFeatureItem
  const featureUniversities: UniversityFeatureItem[] = cmsUniversities.map(u => ({
    id: String(u.id),
    name: u.name,
    location: u.city,
    image: u.image?.startsWith('/') ? u.image : `/${u.image}`,
    logo: u.logo?.startsWith('/') ? u.logo : `/${u.logo}`,
    slug: u.slug,
    rating: u.ranking,
    programs: u.educationType?.length,
    students: u.studentsCount,
    faculties: u.faculties || [], // Use university faculties if available
  }))

  return (
    <div className="flex min-h-screen flex-col relative">
      <SeamlessBackground />
      <Navbar />
      <main className="flex-1">
        {/* Hero Section - Wrapped in Suspense */}
        <section 
          className="w-full flex items-center justify-center py-10 md:py-16 lg:py-20"
          style={{ minHeight: 'calc(90vh - 4rem)' }}
        >
          <div className="container mx-auto px-4 md:px-6">
            <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center">Loading hero...</div>}>
              <ClientHeroSection />
            </Suspense>
          </div>
        </section>
        {/* Advantages Study China Section */}
        <AdvantagesStudyChina lang={locale} />
        {/* Replace the Key Statistics with MissionStats component */}
        <MissionStats />
        {/* Featured Universities */}
        <UniversityFeature 
          universities={featureUniversities}
          lang={locale}
        />
        {/* Comparison Section */}
        <ComparisonStudyBridge />
        {/* Success Path Section */}
        <SuccessPath />
        {/* How We Work Section */}
        <HowWeWork />
        {/* Testimonials Section */}
        <Testimonials />
        {/* Team Section */}
        <OurTeam lang={locale} />
        {/* Our Partners Section */}
        <OurPartners lang={locale} />
        {/* FAQ Section */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <FAQSection lang={locale} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  )
}
