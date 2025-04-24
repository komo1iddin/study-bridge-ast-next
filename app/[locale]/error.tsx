"use client"

import { PageError } from "@/components/common/error-boundary"

/**
 * Error boundary for the [locale] route
 * This will catch and display errors that occur in the [locale] layout or page
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <PageError error={error} reset={reset} />
}
