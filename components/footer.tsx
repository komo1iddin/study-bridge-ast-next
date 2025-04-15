"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react"
import { cn } from '@/lib/utils'

export default function Footer() {
  const t = useTranslations("footer")
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('bg-slate-900 text-white')}>
      <div className={cn('container mx-auto px-4 py-12')}>
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8')}>
          {/* Logo and About */}
          <div className={cn('space-y-4')}>
            <div className={cn('flex items-center space-x-2')}>
              <GraduationCap className={cn('h-6 w-6 text-blue-400')} />
              <span className={cn('text-xl font-bold')}>Study Bridge</span>
            </div>
            <p className={cn('text-slate-300 text-sm')}>
              Your trusted partner for studying in China
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className={cn('text-lg font-semibold mb-4')}>{t('navigation.home')}</h3>
            <ul className={cn('space-y-2')}>
              <li>
                <Link href="/" className={cn('text-slate-300 hover:text-white transition')}>
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link href="/programs" className={cn('text-slate-300 hover:text-white transition')}>
                  {t('navigation.programs')}
                </Link>
              </li>
              <li>
                <Link href="/#services" className={cn('text-slate-300 hover:text-white transition')}>
                  {t('navigation.services')}
                </Link>
              </li>
              <li>
                <Link href="/about" className={cn('text-slate-300 hover:text-white transition')}>
                  {t('navigation.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className={cn('text-slate-300 hover:text-white transition')}>
                  {t('navigation.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={cn('text-lg font-semibold mb-4')}>{t('legal.privacyPolicy')}</h3>
            <ul className={cn('space-y-2')}>
              <li>
                <Link href="/privacy" className={cn('text-slate-300 hover:text-white transition')}>
                  {t('legal.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className={cn('text-slate-300 hover:text-white transition')}>
                  {t('legal.termsOfService')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={cn('text-lg font-semibold mb-4')}>{t('contact.title')}</h3>
            <ul className={cn('space-y-3')}>
              <li className={cn('flex items-start')}>
                <MapPin className={cn('h-5 w-5 text-blue-400 mr-2 mt-0.5')} />
                <span className={cn('text-slate-300')}>Tashkent, Uzbekistan</span>
              </li>
              <li className={cn('flex items-center')}>
                <Phone className={cn('h-5 w-5 text-blue-400 mr-2')} />
                <span className={cn('text-slate-300')}>+998 90 123 45 67</span>
              </li>
              <li className={cn('flex items-center')}>
                <Mail className={cn('h-5 w-5 text-blue-400 mr-2')} />
                <span className={cn('text-slate-300')}>info@educhina.uz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright and Social */}
        <div className={cn('border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center')}>
          <p className={cn('text-slate-400 text-sm')}>
            {t('copyright', { year: currentYear })}
          </p>
          <div className={cn('flex space-x-4 mt-4 md:mt-0')}>
            <a href="#" className={cn('text-slate-400 hover:text-blue-400 transition')}>Facebook</a>
            <a href="#" className={cn('text-slate-400 hover:text-blue-400 transition')}>Twitter</a>
            <a href="#" className={cn('text-slate-400 hover:text-blue-400 transition')}>Instagram</a>
            <a href="#" className={cn('text-slate-400 hover:text-blue-400 transition')}>LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
} 