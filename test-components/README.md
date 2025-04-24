# Test Components

This directory contains test components that are used for development and testing purposes. These components are not part of the main application routes and are separated to improve code organization.

## Structure

- `home-components/`: Test components for home page features
- `university-components/`: Test components for university list features
- `universitydetail/`: Test components for university detail features

## Usage

To use these test components, import them directly from this directory:

```tsx
import { TestComponent } from '@/test-components/home-components/TestComponent';
```

## Benefits

Moving test components out of the main app routes provides several benefits:

1. **Cleaner Production Routes**: Keeps the main app directory focused on production code
2. **Better Organization**: Separates test code from production code
3. **Improved Build Performance**: Prevents test components from being included in production builds
4. **Easier Maintenance**: Makes it easier to find and update test components

## Adding New Test Components

When adding new test components, follow these guidelines:

1. Place them in the appropriate subdirectory based on their purpose
2. Use descriptive names that indicate what they're testing
3. Document any special setup or usage requirements
