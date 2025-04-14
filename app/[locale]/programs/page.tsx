import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { HeroSection } from "@/components/programs/hero-section"
import ProgramsClient from "@/components/programs/programs-client"
import { getPrograms } from "@/lib/sanity/api"
import { Locale } from "@/i18n/navigation"

type Props = {
  params: { locale: Locale }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const locale = params.locale
  
  try {
    const t = await getTranslations({ locale, namespace: "programs" })
    return {
      title: t("meta.title"),
      description: t("meta.description"),
    }
  } catch {
    return {
      title: "Programs",
      description: "Study programs in China"
    }
  }
}

export default async function ProgramsPage({ params }: Props) {
  // Fetch programs from Sanity
  const programs = await getPrograms()
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Render the client component for filtering and program lists */}
        <ProgramsClient programs={programs} />
      </main>

      <Footer />
    </div>
  )
}
