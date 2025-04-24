"use client"

import React from "react"
import { HeroTest } from "@/test-components/home-components/HeroTest"
import { GlobalErrorBoundary } from "@/components/common/error-boundary"
import { TestWrapper, TestErrorTrigger } from "@/test-components/TestWrapper"
import Link from "next/link"

/**
 * Test page that demonstrates the usage of test components and error boundaries
 * This page is separate from the main application routes
 */
export default function TestPage() {
  return (
    <GlobalErrorBoundary>
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Component Testing Page</h1>
          <p className="text-gray-600 mb-4">
            This page demonstrates the usage of test components and error boundaries.
            Test components are now organized in a dedicated directory structure outside the main app routes.
          </p>
          <div className="flex gap-4 mb-8">
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="grid gap-8">
          <TestWrapper 
            title="Hero Component Test"
            description="This tests the Hero component with error boundary protection"
          >
            <HeroTest />
          </TestWrapper>

          <TestWrapper
            title="Error Boundary Test"
            description="Tests the error boundary functionality at different levels"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Component Level Error</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This error will be caught by the component's error boundary
                </p>
                <TestErrorTrigger message="Component level error" />
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Page Level Error</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This error will be caught by the page's error boundary
                </p>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => {
                    throw new Error("Page level error triggered by button click")
                  }}
                >
                  Trigger Page Error
                </button>
              </div>
            </div>
          </TestWrapper>
          
          <TestWrapper
            title="Component Organization"
            description="Demonstrates the new component organization structure"
          >
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium mb-2">New Structure Benefits</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cleaner production routes</li>
                <li>Better separation of concerns</li>
                <li>Improved maintainability</li>
                <li>Consistent error handling</li>
                <li>Easier testing and development</li>
              </ul>
            </div>
          </TestWrapper>
        </div>
      </div>
    </GlobalErrorBoundary>
  )
}
