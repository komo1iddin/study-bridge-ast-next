import { StrapiImage, StrapiMedia } from '../types/strapi'

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'

// Define the image format type
type ImageFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

// Define the formats object type
type ImageFormats = {
  thumbnail?: ImageFormat
  small?: ImageFormat
  medium?: ImageFormat
  large?: ImageFormat
  [key: string]: ImageFormat | undefined
}

/**
 * Get the full URL for a Strapi image
 * @param image The Strapi image object
 * @returns The full URL or null if no image
 */
export function getStrapiImageUrl(image: StrapiImage | null): string | null {
  if (!image || !image.data || !image.data.attributes) {
    return null
  }
  
  const { url } = image.data.attributes
  // If the URL is already absolute, return it
  if (url.startsWith('http')) {
    return url
  }
  
  // Otherwise, prepend the API URL
  return `${API_URL}${url}`
}

/**
 * Get the full URL for a Strapi image of specific format
 * @param image The Strapi image object
 * @param format The desired format (thumbnail, small, medium, large)
 * @returns The full URL or null if no image or format
 */
export function getStrapiImageUrlForFormat(
  image: StrapiImage | null, 
  format: 'thumbnail' | 'small' | 'medium' | 'large' = 'thumbnail'
): string | null {
  if (!image || !image.data || !image.data.attributes || !image.data.attributes.formats) {
    return null
  }
  
  const formats = image.data.attributes.formats as ImageFormats
  if (!formats[format]) {
    // If requested format doesn't exist, return the original
    return getStrapiImageUrl(image)
  }
  
  const formatUrl = formats[format]!.url
  // If the URL is already absolute, return it
  if (formatUrl.startsWith('http')) {
    return formatUrl
  }
  
  // Otherwise, prepend the API URL
  return `${API_URL}${formatUrl}`
}

/**
 * Get all images from a Strapi media collection
 * @param media The Strapi media collection
 * @returns Array of image URLs or empty array if no media
 */
export function getStrapiMediaUrls(media: StrapiMedia | null): string[] {
  if (!media || !media.data) {
    return []
  }
  
  return media.data.map(item => {
    const url = item.attributes.url
    // If the URL is already absolute, return it
    if (url.startsWith('http')) {
      return url
    }
    // Otherwise, prepend the API URL
    return `${API_URL}${url}`
  })
} 