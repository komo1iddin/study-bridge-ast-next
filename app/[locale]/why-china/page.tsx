import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { HeroSection } from "./components/hero-section"
import { Statistics } from "./components/statistics"
import { Benefits } from "./components/benefits"
import { TopUniversities } from "./components/top-universities"
import { CostComparison } from "./components/cost-comparison"
import { StudyOptions } from "./components/study-options"
import { FactsSection } from "./components/facts-section"
import { CtaSection } from "./components/cta-section"

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: "pages.whyChina" })
  
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  }
}

interface WhyChinaPageProps {
  params: {
    locale: string
  }
}

export default function WhyChinaPage({ params }: WhyChinaPageProps) {
  const { locale } = params;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Statistics Section */}
        <Statistics />
        
        {/* Benefits Section */}
        <Benefits />
        
        {/* Top Universities Section */}
        <TopUniversities />
        
        {/* Cost Comparison Section */}
        <CostComparison />
        
        {/* Study Options Section */}
        <StudyOptions />
        
        {/* Facts Section */}
        <FactsSection />

        {/* CTA Section */}
        <CtaSection lang={locale} />
      </main>

      <Footer />
    </div>
  )
}
