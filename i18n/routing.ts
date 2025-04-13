import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['uz', 'ru', 'en'] as const;
export const defaultLocale = 'uz' as const;

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  defaultLocale,
  localePrefix: 'always'
}); 