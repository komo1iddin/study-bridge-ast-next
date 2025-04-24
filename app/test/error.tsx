"use client"

import { PageError } from "@/components/common/error-boundary"

/**
 * Error boundary for the test route
 * This will catch and display errors that occur in the test page
 */
export default function TestError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <PageError error={error} reset={reset} />
}
