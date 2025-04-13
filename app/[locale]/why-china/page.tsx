import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { HeroSection } from "@/components/why-china/hero-section"
import { FactsSection } from "@/components/why-china/facts-section"
import { Statistics } from "@/components/why-china/statistics"
import { Benefits } from "@/components/why-china/benefits"
import { TopUniversities } from "@/components/why-china/top-universities"
import { StudyOptions } from "@/components/why-china/study-options"
import { CostComparison } from "@/components/why-china/cost-comparison"
import { CtaSection } from "@/components/why-china/cta-section"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale
  const t = await getTranslations({ locale, namespace: "whyChina.meta" })
  
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function WhyChinaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Facts Section */}
        <FactsSection />
        
        {/* Statistics Section */}
        <Statistics />
        
        {/* Benefits Section */}
        <Benefits />
        
        {/* Top Universities Section */}
        <TopUniversities />
        
        {/* Study Options Section */}
        <StudyOptions />
        
        {/* Cost Comparison Section */}
        <CostComparison />
        
        {/* CTA Section */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  )
}
