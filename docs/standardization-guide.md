# Study Bridge Design System Standardization Guide

This guide documents the standardized design system for the Study Bridge website to ensure consistency across all pages and components.

## Typography System

The typography system provides consistent text styling across the application. Use these classes instead of manually specifying font sizes, weights, and line heights.

### Heading Styles

| Class | Description |
|-------|-------------|
| `.h1` | Largest heading style for page titles and major headlines |
| `.h2` | Second-level heading for section headlines |
| `.h3` | Third-level heading for subsections |
| `.h4` | Fourth-level heading for component titles |
| `.h5` | Fifth-level heading for minor component titles |
| `.h6` | Smallest heading style for detailed component parts |

### Body Text Styles

| Class | Description |
|-------|-------------|
| `.body-lg` | Large body text style for feature descriptions |
| `.body` | Standard body text style for general content |
| `.body-sm` | Small body text style for secondary content |
| `.body-xs` | Extra small body text for details and captions |

### Special Text Styles

| Class | Description |
|-------|-------------|
| `.caption` | Caption text for images and supplementary info |
| `.overline` | All caps text for labels and categories |
| `.badge-text` | Text style for badges and tags |
| `.button-text` | Text style for buttons |
| `.link` | Text style for hyperlinks |

## Spacing System

The spacing system provides consistent margins, padding and layout spacing across the application.

### Section Spacing

| Class | Description |
|-------|-------------|
| `.section-spacing` | Standard vertical spacing for page sections |
| `.section-spacing-sm-top` | Section spacing with smaller top padding (after hero sections) |
| `.section-container` | Container with standard horizontal padding and maximum width |
| `.content-block` | Standard vertical margins for content blocks within sections |

### Card & Component Spacing

| Class | Description |
|-------|-------------|
| `.card-padding` | Consistent padding for card elements |

### Grid Spacing

| Class | Description |
|-------|-------------|
| `.grid-gap-sm` | Small grid gap spacing |
| `.grid-gap` | Standard grid gap spacing |
| `.grid-gap-lg` | Large grid gap spacing |

### Flexbox Spacing

| Class | Description |
|-------|-------------|
| `.flex-gap-sm` | Small gap for flex containers |
| `.flex-gap` | Standard gap for flex containers |
| `.flex-gap-lg` | Large gap for flex containers |

### Stack Spacing

| Class | Description |
|-------|-------------|
| `.stack-sm > * + *` | Small vertical spacing between stacked elements |
| `.stack > * + *` | Standard vertical spacing between stacked elements |
| `.stack-lg > * + *` | Large vertical spacing between stacked elements |
| `.form-stack > * + *` | Specialized spacing for form elements |

## Implementation Guidelines

1. **Adopting Typography Classes**:
   - Replace direct styling like `text-xl font-bold` with the appropriate typography class like `h4`
   - Use heading classes for actual headings and semantic hierarchy

2. **Adopting Spacing Classes**:
   - Replace direct padding/margin with standardized spacing classes
   - Use section-container for consistent page layout
   - Use grid-gap and flex-gap instead of gap-x utilities

3. **Breaking Changes**:
   - This standardization removes some custom spacing/sizing to ensure consistency
   - Any component using custom padding/margins should be updated to use these new classes

## Best Practices

- Always use typography classes rather than direct font styling
- Always use section-container for page sections
- Maintain responsive behavior by using the built-in responsive variants in these utility classes
- When composing components, check for existing patterns before creating new ones

## Testing

When making changes:
1. Test on multiple device sizes
2. Ensure spacing is consistent with other sections
3. Verify text scaling works properly on different viewports 