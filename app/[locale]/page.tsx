import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { ChevronRight, GraduationCap, Building2, Users, Clock, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { HeroSection } from "@/components/home/hero"

export default async function Home(props: {
  params: { locale: string };
}) {
  // In Next.js 15, await the entire params object first
  const params = await props.params;
  const { locale } = params;
  
  const t = await getTranslations({ locale, namespace: "home" })

  // Sample statistics data
  const statistics = [
    { value: "100+", label: t("stats.universities"), icon: Building2 },
    { value: "5000+", label: t("stats.students"), icon: Users },
    { value: "10+", label: t("stats.experience"), icon: Clock },
    { value: "200+", label: t("stats.programs"), icon: BookOpen },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section - Using the new component */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center min-h-[calc(100vh-4rem)]">
          <div className="container mx-auto px-4 md:px-6">
            <HeroSection />
          </div>
        </section>

        {/* Key Statistics */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {statistics.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card
                    key={index}
                    className="border-2 border-blue-100 transition-all duration-200 hover:border-blue-600"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("services.title")}
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("services.subtitle")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2">
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      <h3 className="text-xl font-bold">{t("services.application")}</h3>
                    </div>
                    <p className="text-white/80">{t("services.applicationDesc")}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      <h3 className="text-xl font-bold">{t("services.visa")}</h3>
                    </div>
                    <p className="text-white/80">{t("services.visaDesc")}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      <h3 className="text-xl font-bold">{t("services.accommodation")}</h3>
                    </div>
                    <p className="text-white/80">{t("services.accommodationDesc")}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-0 text-white">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      <h3 className="text-xl font-bold">{t("services.guidance")}</h3>
                    </div>
                    <p className="text-white/80">{t("services.guidanceDesc")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
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
    </div>
  )
}
