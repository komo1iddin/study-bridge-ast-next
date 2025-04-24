import { createNavigation } from 'next-intl/navigation';

export const locales = ['uz', 'ru', 'en'] as const;
export const defaultLocale = 'uz' as const;

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'always'
}); 