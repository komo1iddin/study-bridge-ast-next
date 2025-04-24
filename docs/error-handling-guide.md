# Error Handling Guide

This guide explains the error handling strategy implemented in the Study Bridge project.

## Error Handling Components

### 1. Error Boundaries

We've implemented several levels of error boundaries to catch and handle errors gracefully:

- **GlobalErrorBoundary**: Wraps the entire application to catch any uncaught errors
- **Page-level Error Boundaries**: Each route has its own error.tsx file to handle errors specific to that route
- **Component-level Error Boundaries**: Individual components can be wrapped with ErrorBoundary for more granular error handling

### 2. Error Utilities

The `lib/error-utils.ts` file provides utility functions for consistent error handling:

- `safeFetch`: A wrapper for data fetching operations that provides error handling and fallback data
- `formatErrorMessage`: Formats error messages for display
- `createAppError`: Creates custom errors with additional metadata

## Implementation Examples

### Global Error Handling

The root layout (`app/layout.tsx`) wraps all content with the GlobalErrorBoundary:

```tsx
<body>
  <GlobalErrorBoundary>
    {children}
  </GlobalErrorBoundary>
</body>
```

### Page-level Error Handling

Each route has an `error.tsx` file that uses the PageError component:

```tsx
// app/[locale]/error.tsx
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <PageError error={error} reset={reset} />
}
```

### Component-level Error Handling

Individual components can be wrapped with the ErrorBoundary component:

```tsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### Safe Data Fetching

Use the safeFetch utility for data fetching operations:

```tsx
const data = await safeFetch(
  async () => {
    const response = await fetch('/api/data')
    if (!response.ok) throw new Error('Failed to fetch data')
    return response.json()
  },
  fallbackData, // Optional fallback data
  (error) => {
    // Optional custom error handler
    console.error('Fetch error:', error)
  }
)
```

## Best Practices

1. **Use Error Boundaries Strategically**: Place error boundaries at key points in your component tree to prevent the entire UI from crashing
2. **Provide Fallback UI**: Always provide a user-friendly fallback UI when an error occurs
3. **Log Errors**: Log errors to help with debugging and monitoring
4. **Handle Data Fetching Errors**: Use safeFetch for all data fetching operations
5. **Reset Error State**: Provide a way for users to recover from errors (e.g., retry button)

## Testing Error Handling

The `/app/test` route provides examples of how to test error handling at different levels. Use the TestWrapper and TestErrorTrigger components to test error scenarios.
