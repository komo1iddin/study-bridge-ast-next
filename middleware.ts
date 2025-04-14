import createMiddleware from "next-intl/middleware"
import { locales, defaultLocale } from "@/i18n/navigation"

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  defaultLocale,
  localePrefix: "always",
})

// Skip all paths that should not be internationalized
export const config = {
  matcher: ['/((?!api|_next|admin|.*\\..*).*)']
}
