"use server"

import type React from "react"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export async function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "ru" }, { locale: "en" }]
}

export async function generateMetadata(props: { params: { locale: string } }) {
  // In Next.js 15, await the entire params object first
  const params = await props.params;
  const { locale } = params;
  
  const t = await getTranslations({ locale, namespace: "home" })

  return {
    title: "EduChina - Educational Agency",
    description: t("hero.subtitle"),
  }
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // In Next.js 15, await the entire params object first
  const params = await props.params;
  const { locale } = params;
  
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = ["uz", "ru", "en"].includes(locale)
  if (!isValidLocale) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  // Use a static HTML element to avoid hydration mismatch
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            {props.children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
