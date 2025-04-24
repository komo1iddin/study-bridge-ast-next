# Code Organization Guide

This guide explains the improved code organization structure implemented in the Study Bridge project.

## Component Structure

We've reorganized the components directory to improve maintainability and separation of concerns:

### 1. Common Components

Located in `/components/common/`, these are reusable components used across the application:

- **error-boundary**: Error handling components
- **language-switcher**: Internationalization components
- **theme**: Theme-related components
- **examples**: Example implementations for reference

### 2. Layout Components

Located in `/components/layout/`, these components define the application layout:

- **navbar**: Navigation components
- **footer**: Footer components

### 3. UI Components

Located in `/components/ui/`, these are the basic UI building blocks:

- Buttons, inputs, cards, etc.
- Based on a design system

### 4. Page-specific Components

These components are organized by the page they belong to:

- `/app/[locale]/home/components/`
- `/app/[locale]/programs/components/`
- `/app/[locale]/universities/components/`
- `/app/[locale]/why-china/components/`

## Testing Components

We've moved test components out of the main app routes to improve organization:

- `/test-components/`: Contains all test components
- `/app/test/`: A dedicated route for testing components

### Test Utilities

- **TestWrapper**: A wrapper component for testing components in isolation
- **TestErrorTrigger**: A utility component for testing error boundaries

## Error Handling Structure

We've implemented a comprehensive error handling strategy:

- **Global Error Boundary**: In the root layout
- **Page-level Error Boundaries**: In each route's error.tsx file
- **Component-level Error Boundaries**: For individual components

## Benefits of the New Structure

1. **Cleaner Production Routes**: Keeps the main app directory focused on production code
2. **Better Separation of Concerns**: Components are organized by their purpose and scope
3. **Improved Maintainability**: Easier to find and update components
4. **Consistent Error Handling**: Standardized approach to error handling
5. **Easier Testing**: Dedicated structure for testing components

## Next.js Best Practices

This organization follows Next.js best practices:

1. **App Router Structure**: Properly organized routes with layout, page, and error files
2. **Server vs. Client Components**: Clear distinction between server and client components
3. **Internationalization**: Well-structured i18n implementation
4. **Error Handling**: Comprehensive error handling at multiple levels
5. **Component Reusability**: Components organized by reusability and purpose

## Migration Guide

If you need to move components from the old structure to the new structure:

1. Identify the component's purpose and scope
2. Move it to the appropriate directory in the new structure
3. Update imports in all files that use the component
4. Test to ensure everything works correctly
