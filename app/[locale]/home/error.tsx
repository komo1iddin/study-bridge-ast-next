"use client"

import { PageError } from "@/components/common/error-boundary"

/**
 * Error boundary for the home route
 * This will catch and display errors that occur in the home page
 */
export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <PageError error={error} reset={reset} />
}
