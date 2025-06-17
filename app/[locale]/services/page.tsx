import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Locale } from "@/i18n/navigation"

import { ServicesContent } from "./components"


export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "pages.services" })
  
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  }
}

export default function ServicesPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return (
    <main>
              <ServicesContent lang={locale as Locale} />
    </main>
  )
}