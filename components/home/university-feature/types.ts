export interface UniversityFeatureItem {
  id: string
  name: string
  location: string
  image: string
  logo: string
  slug: string
  rating?: number
  programs?: number
  students?: number
  faculties: string[]
} 