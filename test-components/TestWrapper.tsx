"use client"

import React from "react"
import { ErrorBoundary } from "@/components/common/error-boundary"

interface TestWrapperProps {
  title: string
  description?: string
  children: React.ReactNode
}

/**
 * TestWrapper component
 * A utility component for testing components in isolation with proper error boundaries
 */
export function TestWrapper({ title, description, children }: TestWrapperProps) {
  return (
    <div className="p-6 border rounded-lg mb-8">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      
      <ErrorBoundary>
        <div className="mt-4">
          {children}
        </div>
      </ErrorBoundary>
    </div>
  )
}

/**
 * TestErrorTrigger component
 * A utility component for testing error boundaries
 */
export function TestErrorTrigger({ message = "Test error" }: { message?: string }) {
  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="mb-2 text-red-700 font-medium">Error Trigger</p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={() => {
          throw new Error(message)
        }}
      >
        Trigger Error
      </button>
    </div>
  )
}
