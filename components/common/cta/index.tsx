'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ApplicationFormModal from '@/components/common/application-form-modal'

interface CTAProps {
  className?: string
  lang: string
  linkHref?: string // Optional custom link path, defaults to `/${lang}/why-china`
  useModal?: boolean // Whether to use modal or navigate to linkHref
}

export default function CTA({ className, lang, linkHref, useModal = true }: CTAProps) {
  const t = useTranslations('pages.home.cta')
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  return (
    <div 
      className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 md:p-10 shadow-xl 
                 ${className || ''}`}
      style={{ 
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, box-shadow',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out'
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'translateZ(0) scale(1.01)';
        target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'translateZ(0) scale(1)';
        target.style.boxShadow = '';
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          {t('title')}
        </h3>
        <p className="text-lg mb-6 text-blue-100">
          {t('subtitle')}
        </p>
        {useModal ? (
          <>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50" 
              style={{
                transform: 'translateZ(0)',
                transition: 'background-color 0.2s ease, transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateZ(0) scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(0)';
              }}
              onClick={() => setIsFormOpen(true)}
            >
              {t('button')}
            </Button>
            
            <ApplicationFormModal
              open={isFormOpen}
              onOpenChange={setIsFormOpen}
              onSubmitSuccess={() => setIsFormOpen(false)}
            />
          </>
        ) : (
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50" 
            style={{
              transform: 'translateZ(0)',
              transition: 'background-color 0.2s ease, transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateZ(0) scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(0)';
            }}
            asChild
          >
            <Link href={linkHref || `/${lang}/why-china`}>
              {t('button')}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
} 