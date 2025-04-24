"use client"

import { PageError } from "@/components/common/error-boundary"

/**
 * Error boundary for the programs route
 * This will catch and display errors that occur in the programs page
 */
export default function ProgramsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <PageError error={error} reset={reset} />
}
