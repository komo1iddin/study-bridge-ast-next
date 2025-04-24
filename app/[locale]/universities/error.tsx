"use client"

import { PageError } from "@/components/common/error-boundary"

/**
 * Error boundary for the universities route
 * This will catch and display errors that occur in the universities page
 */
export default function UniversitiesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <PageError error={error} reset={reset} />
}
