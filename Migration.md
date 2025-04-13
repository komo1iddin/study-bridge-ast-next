
# Astro to Next.js Migration Plan

## Phase 1: Project Setup & Analysis (1-2 days)

### 1.1 Initialize Next.js Project
```bash
npx create-next-app@latest astrostudy-nextjs --typescript --tailwind --eslint --app --src-dir
cd astrostudy-nextjs
```

### 1.2 Install Required Dependencies
```bash
npm install sharp lucide-react class-variance-authority clsx tailwind-merge zod cmdk next-intl
```

### 1.3 Project Structure Setup
```bash
# Create equivalent structure
mkdir -p src/{components,lib,utils,types,layouts,assets,data}
mkdir -p public/{images,icons,fonts}
```

### 1.4 Configure TypeScript
Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Phase 2: Internationalization Setup (2-3 days)

### 2.1 Configure `next-intl` for i18n
Create `next.config.mjs`:
```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config) {
    // Keep original optimization features
    config.optimization.splitChunks.cacheGroups = {
      icons: {
        test: /[\\/]node_modules[\\/]lucide-react/,
        name: 'icons',
        chunks: 'all',
      },
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all',
      },
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
```

### 2.2 Create Language Configuration
Create `src/i18n/config.ts`:
```typescript
export const defaultLocale = 'uz';
export const locales = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
  '/': '/',
  '/universities': {
    uz: '/universitetlar',
    ru: '/universiteti',
    en: '/universities',
  },
  // Map all paths from current site
} as const;
```

### 2.3 Configure Middleware
Create `src/middleware.ts`:
```typescript
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales, pathnames } from './i18n/config';

export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

### 2.4 Create Translation Files
Move translations from Astro:
```bash
mkdir -p src/i18n/messages
# Create translation files for each language
touch src/i18n/messages/{uz,ru,en}.json
```

## Phase 3: Component Migration Strategy (5-7 days)

### 3.1 UI Component Migration Plan

Create a component inventory spreadsheet tracking:
- Component name
- Client/Server rendering
- Dependencies
- Migration priority
- Status

### 3.2 Set Up Base UI Components

Start with basic UI components in `src/components/ui`:

```typescript
// src/components/ui/button.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### 3.3 Create Utils for CSS Class Handling

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 3.4 Transition Strategy for Complex Components

1. **Server Components First**: Convert static components to Server Components
2. **Client Component Boundaries**: Define use-client boundaries for interactive components

Example server component conversion:
```typescript
// src/components/features/universities/UniversityCard.tsx
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface UniversityCardProps {
  name: string
  image: string
  location: string
  programs: string[]
  rating: number
}

export default function UniversityCard({
  name,
  image,
  location,
  programs,
  rating
}: UniversityCardProps) {
  return (
    <div className="rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{location}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {programs.slice(0, 3).map((program) => (
            <span key={program} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              {program}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="text-amber-500">★</span>
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
          <Button size="sm">View Details</Button>
        </div>
      </div>
    </div>
  )
}
```

Example client component conversion:
```typescript
// src/components/shared/navigation/MobileNav.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  currentPath: string
  links: {
    href: string
    label: string
  }[]
}

export default function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-white p-4">
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-gray-600"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
```

## Phase 4: Page Layout & Routing (3-4 days)

### 4.1 Create Main Layout
```tsx
// src/app/[locale]/layout.tsx
import "./globals.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { notFound } from "next/navigation"
import { useMessages } from "next-intl"
import { locales } from "@/i18n/config"
import Header from "@/components/shared/navigation/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

type Props = {
  params: { locale: string }
  children: React.ReactNode
}

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: {
      template: "%s | Study Bridge",
      default: "Study Bridge - Education Opportunities",
    },
    description: "We help you enroll in top Chinese universities. Language courses, bachelor, master degrees.",
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale as any)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
```

### 4.2 Create home page
```tsx
// src/app/[locale]/page.tsx
import { Metadata } from "next"
import { useTranslations } from "next-intl"
import Hero from "@/components/features/home/Hero"
import FeaturedUniversities from "@/components/features/home/FeaturedUniversities"
import StudyPrograms from "@/components/features/home/StudyPrograms"
import Testimonials from "@/components/features/home/Testimonials"
import FAQ from "@/components/features/home/FAQ"
import CTA from "@/components/shared/CTA"

export const metadata: Metadata = {
  title: "Study in China - Education Opportunities",
  description: "We help you enroll in top Chinese universities. Language courses, bachelor, master degrees.",
}

export default function Home() {
  const t = useTranslations("home")
  
  return (
    <>
      <Hero />
      <FeaturedUniversities />
      <StudyPrograms />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}
```

### 4.3 Dynamic Routes Migration

Convert Astro's `[lang]/[...slug].astro` to Next.js equivalent:

```tsx
// src/app/[locale]/universities/[slug]/page.tsx
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useTranslations } from "next-intl"
import { getUniversityBySlug, getAllUniversitySlugs } from "@/lib/universities"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const university = await getUniversityBySlug(params.slug)
  
  if (!university) {
    return {
      title: "University Not Found",
    }
  }
  
  return {
    title: university.name,
    description: university.description,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllUniversitySlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function UniversityPage({ params }: Props) {
  const university = await getUniversityBySlug(params.slug)
  const t = useTranslations("university")
  
  if (!university) {
    notFound()
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="relative h-80 w-full mb-8">
        <Image
          src={university.coverImage}
          alt={university.name}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">{university.name}</h1>
      {/* Rest of university details */}
    </div>
  )
}
```

## Phase 5: Data Handling (2-3 days)

### 5.1 Move Static Data
For content previously in Astro `.md` files:

```typescript
// src/lib/universities.ts
import { promises as fs } from "fs"
import path from "path"
import { cache } from "react"
import { z } from "zod"

const universitySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  location: z.string(),
  description: z.string(),
  programs: z.array(z.string()),
  rating: z.number(),
  coverImage: z.string(),
  gallery: z.array(z.string()),
  features: z.array(z.string()),
  founded: z.number().optional(),
  website: z.string().optional(),
})

export type University = z.infer<typeof universitySchema>

export const getUniversities = cache(async () => {
  const filePath = path.join(process.cwd(), "src/data/universities.json")
  const data = await fs.readFile(filePath, "utf8")
  
  const universities = JSON.parse(data)
  return universities.map(university => universitySchema.parse(university))
})

export async function getUniversityBySlug(slug: string) {
  const universities = await getUniversities()
  return universities.find(university => university.slug === slug)
}

export async function getAllUniversitySlugs() {
  const universities = await getUniversities()
  return universities.map(university => university.slug)
}
```

### 5.2 API Routes for Dynamic Data

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = contactSchema.parse(body)
    
    // Example: Send email or store in database
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid data" }, { status: 400 })
  }
}
```

## Phase 6: Animation & Interactive Elements (3-4 days)

### 6.1 Replace AOS with Framer Motion
Install Framer Motion:

```bash
npm install framer-motion
```

Create motion components:
```tsx
// src/components/ui/motion.tsx
"use client"

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface MotionDivProps extends HTMLMotionProps<"div"> {
  className?: string
}

export function FadeIn({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SlideIn({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
```

### 6.2 Create Custom Hooks for Animations

```typescript
// src/hooks/useScrollAnimation.ts
"use client"

import { useRef, useEffect, useState } from "react"

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return { ref, isVisible }
}
```

## Phase 7: State Management (1-2 days)

### 7.1 Migrate from nanostores to React Context/Zustand

```typescript
// src/lib/store.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AppState {
  language: string
  darkMode: boolean
  setLanguage: (language: string) => void
  toggleDarkMode: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: "uz",
      darkMode: false,
      setLanguage: (language) => set({ language }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "app-storage",
    }
  )
)
```

## Phase 8: Image Optimization (2-3 days)

### 8.1 Migrate to next/image
For all image tags:

```tsx
// Before (Astro)
<img src={image.src} alt={image.alt} loading="lazy" />

// After (Next.js)
<Image 
  src={image.src} 
  alt={image.alt} 
  width={image.width} 
  height={image.height} 
  quality={80}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 8.2 Create Image Utility Components

```tsx
// src/components/ui/optimized-image.tsx
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
  sizes = "100vw",
  ...props
}: OptimizedImageProps) {
  if (fill) {
    return (
      <div className={cn("relative", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
          {...props}
        />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      {...props}
    />
  )
}
```

## Phase 9: Progressive Migration Strategy (Ongoing)

### 9.1 Side-by-side Development
For incremental migration:

1. Set up a process to migrate one page/feature at a time
2. Maintain feature parity between Astro and Next.js versions
3. Create a spreadsheet tracking each component/page migration status
4. Test both versions simultaneously

### 9.2 Content Migration Checklist
For each page:

- [ ] Static content migrated
- [ ] Interactive elements working
- [ ] Animations functioning
- [ ] Mobile responsiveness
- [ ] i18n translations complete
- [ ] SEO metadata
- [ ] Performance metrics checked

## Phase 10: Performance Optimization (2-3 days)

### 10.1 Configure Font Loading
```tsx
// src/app/[locale]/layout.tsx
import { Inter, Roboto } from "next/font/google"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
})

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      {/* ... */}
    </html>
  )
}
```

### 10.2 Implement Route Segments

```typescript
// src/app/[locale]/(universities)/universities/page.tsx
// src/app/[locale]/(students)/applications/page.tsx
// src/app/[locale]/(marketing)/about/page.tsx
```

### 10.3 Configure Next.js Bundle Analyzer

```bash
npm install --save-dev @next/bundle-analyzer
```

## Phase 11: Testing (2-3 days)

### 11.1 Set Up Jest for Unit Testing
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### 11.2 Create Basic Test Example
```tsx
// src/components/ui/button.test.tsx
import { render, screen } from "@testing-library/react"
import { Button } from "./button"

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })
})
```

## Phase 12: Deployment (1-2 days)

### 12.1 Vercel Configuration
```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["fra1"],
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400"
        }
      ]
    }
  ]
}
```

### 12.2 Final Checklist Before Launch
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility check
- [ ] Cross-browser testing
- [ ] 404 and error pages
- [ ] Analytics integration
- [ ] SEO verification

## Phase 13: Post-Launch Monitoring (Ongoing)

### 13.1 Implement Monitoring
```tsx
// src/app/[locale]/layout.tsx
import Script from "next/script"

// Add to layout
<Script
  id="web-vitals"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      function sendToAnalytics(metric) {
        const body = JSON.stringify(metric);
        const url = 'https://vitals.vercel-analytics.com/v1/vitals';
        navigator.sendBeacon(url, body);
      }
      
      addEventListener('CLS', sendToAnalytics);
      addEventListener('FID', sendToAnalytics);
      addEventListener('LCP', sendToAnalytics);
    `,
  }}
/>
```

### 13.2 Performance Comparison Analysis
Document performance metrics before and after migration:
- First Contentful Paint
- Largest Contentful Paint
- Time to Interactive
- Total Bundle Size
- Core Web Vitals

This comprehensive migration plan covers all aspects of moving from Astro to Next.js while maintaining the site's functionality and improving performance.
