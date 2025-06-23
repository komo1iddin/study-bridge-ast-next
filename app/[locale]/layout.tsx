"use server"

import type React from "react"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from 'next'
import "../globals.css"
import messages from "@/messages"
import FacebookPixelClient from "@/components/analytics/FacebookPixelClient"

export async function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "ru" }, { locale: "en" }]
}

export async function generateMetadata(
  { params: propsParams }: { params: { locale: string } }
): Promise<Metadata> {
  const params = await propsParams; 
  const { locale } = params;
  
  const t = await getTranslations({ locale, namespace: "pages.home" })

  return {
    title: "Study Bridge - Educational Agency",
    description: t("hero.subtitle"),
    generator: "Next.js",
    // Force light theme
    themeColor: '#ffffff',
    colorScheme: 'light',
  }
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const params = await props.params;
  const { locale } = params;
  
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = ["uz", "ru", "en"].includes(locale)
  if (!isValidLocale) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  // Get messages from our modular translation system
  const localeMessages = messages[locale as keyof typeof messages]
  if (!localeMessages) notFound()

  return (
    <>
      <NextIntlClientProvider locale={locale} messages={localeMessages}>
        {/* Facebook Pixel */}
        <FacebookPixelClient />
        {props.children}
      </NextIntlClientProvider>
    </>
  )
}
