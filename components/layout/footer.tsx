"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  MessageCircle, 
  Send,
  Users,
  BookOpen,
  Landmark,
  FileText
} from "lucide-react"
import { cn } from '@/lib/utils'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Navigation types
type NavigationItem = {
  name: string
  href: string
  icon?: React.ElementType
}

export default function Footer() {
  const t = useTranslations("footer")
  const currentYear = new Date().getFullYear()

  // Navigation structure based on the legacy Astro footer
  const navigation = {
    main: [
      { name: t('navigation.about'), href: '/about', icon: Users },
      { name: t('navigation.programs'), href: '/programs', icon: BookOpen },
      { name: t('navigation.universities'), href: '/universities', icon: Landmark },
      { name: t('navigation.blog'), href: '/blog', icon: FileText },
      { name: t('navigation.contact'), href: '/contact', icon: Phone }
    ],
    resources: [
      { name: t('resources.scholarships'), href: '/scholarships' },
      { name: t('resources.visaSupport'), href: '/visa-support' },
      { name: t('resources.languageCourses'), href: '/language-courses' },
      { name: t('resources.faq'), href: '/faq' }
    ],
    social: [
      {
        name: 'Instagram',
        href: 'https://instagram.com/studybridge.uz',
        icon: Instagram
      },
      {
        name: 'Telegram',
        href: 'https://t.me/studybridgeuz',
        icon: MessageCircle
      }
    ]
  }

  return (
    <footer className={cn('bg-white border-t border-gray-100')}>
      <div className={cn('container mx-auto px-4 py-10')}>
        <div className={cn('flex flex-col md:flex-row md:items-start md:justify-between gap-10')}>
          {/* Brand and Social */}
          <div className={cn('flex-1 min-w-[220px] flex flex-col gap-4')}>
            <div className={cn('flex items-center gap-2 mb-2')}>
              <GraduationCap className={cn('h-7 w-7 text-blue-600')} />
              <span className={cn('text-xl font-bold text-blue-600')}>Study Bridge</span>
            </div>
            
            <p className={cn('text-gray-600 text-sm leading-relaxed')}>
              {t('company.description')}
            </p>
            
            <div className={cn('flex gap-3 mt-2')}>
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-center h-10 w-10 rounded-full bg-white shadow hover:shadow-md text-gray-600 hover:text-blue-600 transition'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation and Resources */}
          <div className={cn('flex-[2] flex flex-col sm:flex-row gap-8')}>
            <div>
              <h3 className={cn('text-base font-semibold text-gray-900 mb-3')}>
                {t('navigation.title')}
              </h3>
              <ul className={cn('space-y-2')}>
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2'
                      )}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={cn('text-base font-semibold text-gray-900 mb-3')}>
                {t('resources.title')}
              </h3>
              <ul className={cn('space-y-2')}>
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-gray-600 hover:text-blue-600 transition-colors duration-200'
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact and Newsletter */}
          <div className={cn('flex-1 min-w-[220px] flex flex-col gap-4')}>
            <h3 className={cn('text-base font-semibold text-gray-900 mb-3')}>
              {t('contact.title')}
            </h3>
            
            <ul className={cn('space-y-2 text-gray-600 text-sm')}>
              <li className={cn('flex items-center gap-2')}>
                <Phone className={cn('h-4 w-4 text-blue-600')} />
                <a href="tel:+998903595454" className={cn('hover:text-blue-600 transition-colors duration-200')}>
                  +998 90 359 54 54
                </a>
              </li>
              <li className={cn('flex items-center gap-2')}>
                <Mail className={cn('h-4 w-4 text-blue-600')} />
                <a href={`mailto:${'info@studybridge.uz'}`} className={cn('hover:text-blue-600 transition-colors duration-200')}>
                  info@studybridge.uz
                </a>
              </li>
              <li className={cn('flex items-center gap-2')}>
                <MapPin className={cn('h-4 w-4 text-blue-600')} />
                <span>{t('contact.address')}</span>
              </li>
            </ul>
            
            {/* Newsletter */}
            <div className={cn('mt-4')}>
              <h4 className={cn('text-sm font-semibold text-gray-800 mb-2')}>
                {t('newsletter.title')}
              </h4>
              <form className={cn('flex items-center gap-2')}>
                <Input
                  type="email"
                  required
                  placeholder={t('newsletter.placeholder')}
                  className={cn(
                    'rounded-full border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-200'
                  )}
                />
                <Button
                  type="submit"
                  className={cn(
                    'rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm'
                  )}
                  aria-label={t('newsletter.button')}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className={cn('mt-1 text-xs text-gray-500')}>
                {t('newsletter.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={cn('mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-2')}>
          <p className={cn('text-xs text-gray-500')}>&copy; {currentYear} Study Bridge. {t('copyright.rights')}</p>
          <div className={cn('flex gap-4 text-xs text-gray-500')}>
            <a href="tel:+998903595454" className={cn('hover:text-blue-600 transition-colors duration-200')}>+998 90 359 54 54</a>
            <Link
              href="/privacy"
              className={cn('hover:text-blue-600 transition-colors duration-200')}>
              {t('copyright.privacy')}
            </Link>
            <Link
              href="/terms"
              className={cn('hover:text-blue-600 transition-colors duration-200')}>
              {t('copyright.terms')}
            </Link>
            <Link
              href="/sitemap"
              className={cn('hover:text-blue-600 transition-colors duration-200')}>
              {t('copyright.sitemap')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 