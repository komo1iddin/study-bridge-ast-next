import { SpeedInsights } from "@vercel/speed-insights/next"
import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { GraduationCap } from "lucide-react"
import { Metadata } from "next"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ClientHeroSection } from "@/components/home/hero/client-hero"
import { SuccessPath } from "@/components/home/success-path"
import { AdvantagesStudyChina } from "@/components/home/advantages-stydy-china"
import { UniversityFeature } from "@/components/home/university-feature/university-feature"
import { OurTeam, OurPartners, HowWeWork, MissionStats, Testimonials, ComparisonStudyBridge } from "@/components/home"
import { getContentItems } from '@/lib/decap-cms'
import type { University } from '@/types/content'
import type { UniversityFeatureItem } from '@/components/home/university-feature/types'
import { SeamlessBackground } from '@/components/shared'

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
          className="w-full flex items-center justify-center py-16 md:py-24 lg:py-32"
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
        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {t("cta.title")}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {t("cta.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/#contact">
                      {t("cta.button")}
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/programs">{t("cta.programs")}</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <Image
                  src="/placeholder.svg?height=500&width=700"
                  width={700}
                  height={500}
                  alt={t("cta.imageAlt")}
                  className="w-full rounded-xl object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  )
}
