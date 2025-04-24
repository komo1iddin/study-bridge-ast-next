"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * PageError component that can be used in Next.js error.tsx files
 * This provides a consistent error UI for page-level errors
 */
export default function PageError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Page-level error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-red-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-red-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || "An unexpected error occurred"}
          {error.digest && (
            <span className="block mt-2 text-sm text-gray-500">
              Error ID: {error.digest}
            </span>
          )}
        </p>
        <div className="flex gap-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => window.location.href = "/"}
          >
            Go Home
          </Button>
          <Button
            className="w-full"
            onClick={reset}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
