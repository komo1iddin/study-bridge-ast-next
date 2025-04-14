# OurTeam and OurPartners Components

This document outlines the React components converted from the legacy Astro codebase.

## Components Overview

### OurTeam

A component that displays team members with their photos and positions, as well as company values.

**Features:**
- Responsive grid layout (2 columns on mobile, 4 on desktop)
- Image optimization with Next.js Image component
- Animation-ready with data-aos attributes
- Internationalization support via next-intl

### OurPartners

A carousel component that displays partner universities.

**Features:**
- Embla Carousel integration with autoplay
- Responsive design
- Interactive navigation buttons
- Swipe animation hint
- Smooth background decoration
- Internationalization support via next-intl

## Usage

```jsx
import { OurTeam, OurPartners } from '@/components/home'

export default function HomePage() {
  // The lang prop determines which translations to use
  // It should match one of the supported locales ('en', 'ru', 'uz')
  return (
    <>
      <OurTeam lang="en" />
      <OurPartners lang="en" />
    </>
  )
}
```

## Translation Structure

Translations are organized in the `messages` directory:

```
messages/
└── pages/
    └── home/
        └── components/
            ├── ourTeam/
            │   ├── en.json
            │   ├── ru.json
            │   └── uz.json
            └── ourPartners/
                ├── en.json
                ├── ru.json
                └── uz.json
```

## Hydration Safety

Both components implement hydration-safe practices to avoid React hydration errors:

1. **Client Components**: Both components are marked with 'use client' to ensure proper hydration.

2. **Responsive Implementation**: 
   - The `OurPartners` component uses `useEffect` to initialize the mobile check and animations on the client-side only.
   - State for mobile detection is initialized with a default value that works on both server and client.

3. **Classname Handling**: 
   - The `cn()` utility is used to combine classnames safely.
   - Conditional classes are applied in a consistent manner.

4. **Carousel Implementation**:
   - The Embla Carousel is initialized with `useEmblaCarousel` which is hydration-safe.
   - Carousel state is safely managed between server and client renders.

5. **Image Handling**:
   - Next.js Image component is used to ensure consistent rendering.
   - Width and height are explicitly defined to prevent layout shifts.

## Customization

### Changing Team Members

Modify the `teamMembers` array in `components/home/our-team/index.tsx`:

```js
const teamMembers = [
  {
    name: "New Member Name",
    position: t('positions.position1'),
    image: "/images/team/New_Member.jpg"
  },
  // Add more members...
]
```

### Changing Partners

Modify the `partners` array in `components/home/our-partners/data/partners.ts`:

```ts
export const partners: Partner[] = [
  {
    id: 1,
    name: "New University Name",
    logo: "/images/partners/new-university-logo.png"
  },
  // Add more partners...
]
```

## Dependencies

- next-intl: For internationalization
- embla-carousel-react: For the partners carousel
- embla-carousel-autoplay: For autoplay functionality
- lucide-react: For icons
- tailwindcss: For styling 