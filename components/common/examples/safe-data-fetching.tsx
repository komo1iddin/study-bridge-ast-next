"use server"

import { safeFetch, formatErrorMessage } from "@/lib/error-utils"
import { ErrorBoundary } from "@/components/common/error-boundary"

interface University {
  id: string
  name: string
  location: string
}

/**
 * Example function that demonstrates safe data fetching with error handling
 */
export async function getUniversitiesWithErrorHandling() {
  // Use the safeFetch utility to handle errors gracefully
  const universities = await safeFetch<University[]>(
    async () => {
      // Simulating a data fetch that might fail
      const response = await fetch('https://api.example.com/universities')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch universities: ${response.status}`)
      }
      
      return response.json()
    },
    // Fallback data in case of error
    [
      { id: "1", name: "Sample University", location: "Beijing" },
      { id: "2", name: "Example University", location: "Shanghai" }
    ],
    // Custom error handler
    (error) => {
      console.error("University fetch error:", error)
      // You could also log to an error reporting service here
    }
  )
  
  return universities
}

/**
 * Client component that uses the safe data fetching function
 */
export function UniversityListWithErrorHandling({
  universities
}: {
  universities: University[] | undefined
}) {
  if (!universities || universities.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700">No universities found. Please try again later.</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Universities</h3>
      <ul className="divide-y">
        {universities.map((university) => (
          <li key={university.id} className="py-3">
            <div className="font-medium">{university.name}</div>
            <div className="text-sm text-gray-500">{university.location}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Example page component that demonstrates error handling with data fetching
 */
export async function UniversityPageExample() {
  const universities = await getUniversitiesWithErrorHandling()
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Universities</h2>
      
      <ErrorBoundary>
        <UniversityListWithErrorHandling universities={universities} />
      </ErrorBoundary>
    </div>
  )
}
