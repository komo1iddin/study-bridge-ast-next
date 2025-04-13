import { redirect } from "next/navigation"
import { defaultLocale } from "@/i18n/navigation"

export default function RootPage() {
  // This ensures we redirect to the default locale using the configuration
  redirect(`/${defaultLocale}`)
}
