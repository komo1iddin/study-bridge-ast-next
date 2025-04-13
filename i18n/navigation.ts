export const locales = ['uz', 'ru', 'en'] as const;
export const defaultLocale = 'uz' as const;

// Note: In next-intl v4, you can simply re-export the middleware config
// and import Link directly from next/link since it's not needed to 
// create specialized navigation utilities if you're not using localized pathnames
export const config = {
  locales,
  defaultLocale,
  localePrefix: 'always',
}; 