/**
 * Error handling utilities for the application
 * These utilities help with consistent error handling across the application
 */

/**
 * Safe data fetching wrapper
 * Wraps a data fetching function with error handling
 * 
 * @param fetchFn - The data fetching function to wrap
 * @param fallbackData - Optional fallback data to return in case of error
 * @param errorHandler - Optional custom error handler
 * @returns The result of the fetch function or the fallback data
 */
export async function safeFetch<T>(
  fetchFn: () => Promise<T>,
  fallbackData?: T,
  errorHandler?: (error: Error) => void
): Promise<T | undefined> {
  try {
    return await fetchFn();
  } catch (error) {
    // Log the error
    console.error("Data fetching error:", error);
    
    // Call the custom error handler if provided
    if (errorHandler && error instanceof Error) {
      errorHandler(error);
    }
    
    // Return fallback data if provided
    return fallbackData;
  }
}

/**
 * Format error message for display
 * 
 * @param error - The error to format
 * @returns A user-friendly error message
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Create a custom error with additional metadata
 * 
 * @param message - The error message
 * @param code - Optional error code
 * @param metadata - Optional additional metadata
 * @returns A custom error with metadata
 */
export function createAppError(
  message: string,
  code?: string,
  metadata?: Record<string, unknown>
): Error & { code?: string; metadata?: Record<string, unknown> } {
  const error = new Error(message) as Error & { 
    code?: string; 
    metadata?: Record<string, unknown> 
  };
  
  if (code) {
    error.code = code;
  }
  
  if (metadata) {
    error.metadata = metadata;
  }
  
  return error;
}
