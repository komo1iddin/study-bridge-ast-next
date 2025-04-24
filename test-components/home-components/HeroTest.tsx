"use client"

import React from "react"
import { ErrorBoundary } from "@/components/common/error-boundary"

/**
 * Test component for the Hero section
 * This demonstrates how to use the ErrorBoundary component in a test component
 */
export function HeroTest() {
  return (
    <ErrorBoundary>
      <div className="p-6 border rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Hero Section Test</h2>
        <p className="mb-4">This is a test component for the Hero section.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Default State</h3>
            <div className="h-40 bg-blue-100 rounded flex items-center justify-center">
              Hero Content
            </div>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Error State</h3>
            <ErrorBoundary>
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => {
                  throw new Error("Test error in Hero component")
                }}
              >
                Trigger Error
              </button>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
