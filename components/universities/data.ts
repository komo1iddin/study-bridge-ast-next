// Export education types for filter options
export const EDUCATION_TYPES = [
  { value: "bachelor", label: "Bachelor" },
  { value: "master", label: "Master's" },
  { value: "1+2", label: "1+2 Program" },
  { value: "language", label: "Language Course" },
]

// Create alias for educationTypes for backward compatibility
export const educationTypes = EDUCATION_TYPES

export const RANKING_RANGES_OPTIONS = [
  { value: "1-5", label: "Top 5" },
  { value: "6-10", label: "6-10" },
  { value: "11-20", label: "11-20" },
  { value: "21+", label: "21+" },
]

// Create alias for rankingRanges for backward compatibility
export const rankingRanges = RANKING_RANGES_OPTIONS

export interface University {
  id: string | number;
  name: string;
  logo?: string;
  image?: string;
  city: string;
  description: string;
  educationType?: string[];
  hasGrants?: boolean;
  featured?: boolean;
  ranking?: number;
  foundedYear?: number;
  studentsCount?: number;
  internationalStudents?: number;
}

export type Filters = {
  educationType: string
  city: string
  hasGrants: string
  ranking: string
  featured: string
}

export const RANKING_RANGES = {
  '1-5': { min: 1, max: 5 },
  '6-10': { min: 6, max: 10 },
  '11-20': { min: 11, max: 20 },
  '21+': { min: 21, max: Infinity }
} as const

export const DEFAULT_FILTERS: Filters = {
  educationType: "all",
  city: "all",
  hasGrants: "all",
  ranking: "all",
  featured: "all",
}

export const ITEMS_PER_PAGE = 4; 